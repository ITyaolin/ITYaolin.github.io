"use strict";

/* ============================================================
 * 全局动态效果
 * - 滚动进入视口时元素显现（reveal）
 * - 点击页面任意处迸发小火花 ✨🌸💗🎀
 * ============================================================ */

(function () {
  var REVEAL_SEL =
    ".stat-card, .carousel, .toolbar, .about section, .post-head, .post-cover, .post-nav, .post-toc, .site-footer, .side-card";

  var els = Array.prototype.slice.call(document.querySelectorAll(REVEAL_SEL));

  if ("IntersectionObserver" in window && els.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("revealed");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add("revealed"); });
  }

  /* 樱花飘落（Sakura 风格背景动画，花瓣为纯 CSS 形状） */
  var PETAL_CONTAINER = document.createElement("div");
  PETAL_CONTAINER.className = "sakura-petals";
  PETAL_CONTAINER.setAttribute("aria-hidden", "true");
  document.body.appendChild(PETAL_CONTAINER);
  var PETALS_N = 16;
  for (var i = 0; i < PETALS_N; i++) {
    var p = document.createElement("span");
    p.className = "petal";
    p.style.left = (Math.random() * 100).toFixed(1) + "%";
    p.style.setProperty("--w", (9 + Math.random() * 8).toFixed(1) + "px");
    p.style.setProperty("--h", (13 + Math.random() * 8).toFixed(1) + "px");
    p.style.animationDuration = (9 + Math.random() * 14).toFixed(1) + "s";
    p.style.animationDelay = (-Math.random() * 22).toFixed(1) + "s";
    p.style.opacity = (0.30 + Math.random() * 0.40).toFixed(2);
    PETAL_CONTAINER.appendChild(p);
  }

  /* 导航栏滚动效果（DeepSeek 风格：滚动后玻璃药丸淡入 + 收窄） */
  var dsNav = document.querySelector(".ds-header-bar");
  if (dsNav) {
    function navOnScroll() {
      dsNav.classList.toggle("is-scrolled", window.scrollY > 24);
    }
    window.addEventListener("scroll", navOnScroll, { passive: true });
    navOnScroll();
  }

  /* 点击火花（SVG 星形，非 emoji） */
  var SPARK_SVG =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2 L13.6 9.5 L21 12 L13.6 14.5 L12 22 L10.4 14.5 L3 12 L10.4 9.5 Z"/></svg>';
  var SPARK_COLORS = ["#e28aa6", "#d5b078", "#f7cfd9", "#e8a9bd"];
  document.addEventListener("click", function (e) {
    var n = 3 + Math.floor(Math.random() * 4);
    for (var k = 0; k < n; k++) {
      var s = document.createElement("span");
      s.className = "click-spark";
      s.innerHTML = SPARK_SVG;
      s.style.left = e.clientX + (Math.random() * 44 - 22) + "px";
      s.style.top = e.clientY + (Math.random() * 44 - 22) + "px";
      s.style.color = SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)];
      s.style.width = (12 + Math.random() * 12).toFixed(1) + "px";
      s.style.height = s.style.width;
      s.style.transform =
        "translate(-50%,-50%) rotate(" + (Math.random() * 90 - 45).toFixed(0) + "deg)";
      document.body.appendChild(s);
      (function (el) {
        setTimeout(function () { el.remove(); }, 750);
      })(s);
    }
  });

  /* 一言 · 打字机 */
  var hitoEls = Array.prototype.slice.call(document.querySelectorAll(".hitokoto"));
  var HITO_LOCAL = [
    "心之所向，素履以往。",
    "温柔的人，运气都不会太差。",
    "慢慢来，比较快。",
    "世界以痛吻我，要我报之以歌。",
    "保持热爱，奔赴山海。",
    "越是黑暗的夜，星光越温柔。"
  ];
  function randLocal() {
    return HITO_LOCAL[Math.floor(Math.random() * HITO_LOCAL.length)];
  }
  function fetchHito() {
    var ctrl = ("AbortController" in window) ? new AbortController() : null;
    var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, 8000) : null;
    return fetch("https://v1.hitokoto.cn/?encode=json&c=a&c=c&lang=cn", ctrl ? { signal: ctrl.signal } : {})
      .then(function (r) { return r.json(); })
      .then(function (j) { return (j && j.hitokoto) || randLocal(); })
      .catch(function () { return randLocal(); })
      .then(function (txt) { if (timer) clearTimeout(timer); return txt; });
  }
  function typeHito(el, text, done) {
    el.textContent = "";
    el.classList.add("typing");
    var i = 0;
    var timer = setInterval(function () {
      el.textContent = text.slice(0, ++i);
      if (i >= text.length) {
        clearInterval(timer);
        el.classList.remove("typing");
        if (done) done();
      }
    }, 65);
  }
  function hitoLoop(el, delay) {
    setTimeout(function () {
      fetchHito().then(function (txt) {
        typeHito(el, txt, function () {
          setTimeout(function () {
            el.classList.add("fading");
            setTimeout(function () {
              el.classList.remove("fading");
              hitoLoop(el, 500);
            }, 700);
          }, 6200);
        });
      });
    }, delay);
  }
  hitoEls.forEach(function (el, n) {
    el.textContent = "「…」";
    hitoLoop(el, 900 + n * 1500);
  });
})();