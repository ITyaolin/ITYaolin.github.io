"use strict";

/* ================= 工具函数（纯函数，供各页面共用） ================= */

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日";
}

function todayISO() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
}

/* 阅读时长：中文约 400 字/分钟，英文约 180 词/分钟 */
function readingMinutes(text) {
  const cjk = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  const words = (text.match(/[A-Za-z0-9]+/g) || []).length;
  return Math.max(1, Math.ceil(cjk / 400 + words / 180));
}

/* ================= Markdown 轻量渲染器 ================= */
/* 支持：标题、加粗/斜体/删除线、行内代码、代码块(``` 或 ~~~)、
   有序/无序列表、引用、分隔线、链接、图片 */

function renderMarkdown(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  let html = "";
  let listType = null; // "ul" | "ol" | null
  let inQuote = false;
  let inCode = false;
  let codeLang = "";
  let codeBuf = [];

  function inline(s) {
    // 先把行内代码保护起来，避免被其他规则二次处理
    const codes = [];
    s = s.replace(/`([^`]+)`/g, function (m, c) {
      codes.push(c);
      return "\u0000" + (codes.length - 1) + "\u0000";
    });
    s = s
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/~~([^~]+)~~/g, "<del>$1</del>")
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy">')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    s = s.replace(/\u0000(\d+)\u0000/g, function (m, n) {
      return "<code>" + codes[+n] + "</code>";
    });
    return s;
  }

  function closeList() {
    if (listType) {
      html += "</" + listType + ">";
      listType = null;
    }
  }

  function closeQuote() {
    if (inQuote) {
      html += "</blockquote>";
      inQuote = false;
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];

    // 围栏代码块
    if (/^(```|~~~)/.test(raw)) {
      if (!inCode) {
        closeList();
        closeQuote();
        inCode = true;
        codeLang = raw.slice(3).trim();
        codeBuf = [];
      } else {
        inCode = false;
        html +=
          '<pre><code class="lang-' + (codeLang || "text") + '">' +
          codeBuf.join("\n") +
          "</code></pre>";
      }
      continue;
    }
    if (inCode) {
      codeBuf.push(escapeHtml(raw));
      continue;
    }

    const line = escapeHtml(raw);

    // 空行
    if (/^\s*$/.test(line)) {
      closeList();
      closeQuote();
      continue;
    }

    // 标题
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      const lv = h[1].length;
      closeList();
      closeQuote();
      html += "<h" + lv + ">" + inline(h[2]) + "</h" + lv + ">";
      continue;
    }

    // 分隔线
    if (/^(-{3,}|\*{3,})$/.test(line)) {
      closeList();
      closeQuote();
      html += "<hr>";
      continue;
    }

    // 引用（连续的多行合并为一个 blockquote）
    if (/^&gt;\s?/.test(line)) {
      closeList();
      if (!inQuote) {
        inQuote = true;
        html += "<blockquote>";
      }
      html += "<p>" + inline(line.replace(/^&gt;\s?/, "")) + "</p>";
      continue;
    }
    closeQuote();

    // 列表
    const ul = line.match(/^\s*[-*+]\s+(.*)$/);
    const ol = line.match(/^\s*\d+[.)]\s+(.*)$/);
    if (ul || ol) {
      const t = ul ? "ul" : "ol";
      if (listType !== t) {
        closeList();
        listType = t;
        html += "<" + t + ">";
      }
      html += "<li>" + inline((ul || ol)[1]) + "</li>";
      continue;
    }
    closeList();

    // 普通段落
    html += "<p>" + inline(line) + "</p>";
  }

  closeList();
  closeQuote();
  if (inCode) {
    html +=
      '<pre><code class="lang-' + (codeLang || "text") + '">' +
      codeBuf.join("\n") +
      "</code></pre>";
  }
  return html;
}

/* 从 Markdown 文本提取纯文本摘要 */
function plainText(md) {
  return md
    .replace(/^```[\s\S]*?```$/gm, "")
    .replace(/^~~~[\s\S]*?~~~$/gm, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/[*_~`#>-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function autoSummary(md, max) {
  const text = plainText(md);
  const len = max || 96;
  return text.length > len ? text.slice(0, len) + "…" : text || "（无摘要）";
}