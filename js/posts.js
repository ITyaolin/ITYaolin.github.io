/* ============================================================
 * 文章数据
 * 新增文章：在下方数组里追加一条记录即可，字段说明：
 *   id      唯一标识，用于 post.html?id=xxx 定位
 *   title   标题
 *   date    发布日期，格式 YYYY-MM-DD
 *   tags    标签数组（用于筛选）
 *   summary 卡片上显示的摘要
 *   content Markdown 文本，支持：# 标题、**加粗**、*斜体*、
 *           `行内代码`、~~~代码块~~~、- 列表、1. 列表、
 *           > 引用、--- 分隔线、[链接](url)、![图片](url)
 * ============================================================ */

const POSTS = [
  {
    id: "hello-world",
    title: "你好，世界：我的第一篇博客",
    date: "2025-08-27",
    tags: ["生活", "随想"],
    cover: "img/banner-slime.jpg",
    summary: "为什么写博客？记录、整理与分享，这是我开启写作之旅的第一篇。",
    content: `欢迎来到我的博客。这里是记录我学习、工作与生活碎片的角落。

## 为什么写博客

- **记录所学**：很多东西不写下来，过一阵就会忘；
- **整理思路**：能写清楚一件事，才说明真正理解它；
- **分享交流**：希望我的经验也能帮到别人。

> 写作是最好的思考方式。

## 我会写些什么

主要围绕以下几个方面：

1. 前端开发与工程实践
2. 工具与效率（Git、命令行、编辑器）
3. 读书笔记与生活随想

## 关于本站

本站是一个**纯静态**博客：只用 HTML、CSS 和 JavaScript 构建，没有框架、没有数据库，也不需要服务器，打开 \`index.html\` 就能浏览全部内容。

欢迎常来逛逛，也欢迎给我留言交流 😄`
  },
  {
    id: "static-blog",
    title: "用纯 HTML/CSS/JS 搭建一个静态博客",
    date: "2025-08-20",
    tags: ["前端", "教程"],
    cover: "img/banner-okayu.jpg",
    summary: "不依赖任何框架和服务器，几个文件就能拥有一个属于自己的博客。",
    content: `之前一直想拥有一个自己的博客，又不想引入复杂的框架。于是我用最朴素的方案完成了它：**一个纯静态站点**，零构建、零依赖。

## 目录结构

整个站点只有几个文件：

~~~text
index.html    文章列表（首页）
post.html     文章详情页
about.html    关于页
css/style.css 全部样式
js/posts.js   文章数据
js/app.js     渲染逻辑
~~~

## 怎么运作

1. 所有文章以 **Markdown** 文本存放在 \`posts.js\` 中；
2. 打开页面时，\`app.js\` 读取数据并渲染成 HTML；
3. 详情页通过 URL 参数 \`post.html?id=xxx\` 定位文章；
4. 搜索与标签筛选都是**纯前端**完成，无需请求后端。

## 好处

- 加载快、零依赖、易于部署（GitHub Pages / 任意静态托管）；
- 全文都在本地，随时可以备份；
- 想加新文章，只需要往 \`posts.js\` 里追加一条记录。

> 简单，往往是最可靠的。`
  },
  {
    id: "markdown-cheatsheet",
    title: "Markdown 语法速查手册",
    date: "2025-08-12",
    tags: ["工具"],
    cover: "img/banner-muse.jpg",
    summary: "常用 Markdown 语法一页速查，本文即用本站渲染器演示。",
    content: `Markdown 是目前最流行的轻量标记语言。下面以本站渲染器为准，整理常用语法。

## 标题

- 一级标题：\`# 标题\`
- 二级标题：\`## 标题\`
- 三级标题：\`### 标题\`

## 强调与删除线

- 加粗：\`**文字**\`
- 斜体：\`*文字*\`
- 删除线：\`~~文字~~\`
- 行内代码：\`code\`

## 列表

无序列表用 \`-\`，有序列表用 \`1.\`：

- 苹果
- 香蕉

1. 第一步
2. 第二步

## 引用与分隔线

> 这是一段引用文字。

---

## 代码块

用三个反引号（本站也支持 \`~~~\`）包围，并可用语言名高亮：

~~~js
function greet(name) {
  return \`你好，\${name}！\`;
}
~~~

## 链接与图片

- 链接：\`[文字](https://example.com)\`
- 图片：\`![描述](图片地址)\``
  },
  {
    id: "css-grid",
    title: "CSS Grid 布局入门",
    date: "2025-08-05",
    tags: ["前端"],
    cover: "img/hero.jpg",
    summary: "Grid 是新一代的二维布局系统，比 Flexbox 更适合做整体页面布局。",
    content: `CSS Grid 是新一代的二维布局系统，比 Flexbox 更适合做**整体页面**的布局。

## 最简单的网格

~~~css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
~~~

上面的代码会生成 **三列等宽** 的网格，列间距 16px。

## 常用属性速记

- \`grid-template-columns\`：定义列
- \`grid-template-rows\`：定义行
- \`gap\`：行与列的间距
- \`grid-column / grid-row\`：让元素跨列、跨行

## 一个自适应的例子

~~~css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
}
~~~

当容器变窄时，列数会自动减少，**响应式布局**就是这么简单。

> 布局之前先问自己：这是行还是面？是行用 Flexbox，是面用 Grid。`
  },
  {
    id: "js-closure",
    title: "一文搞懂 JavaScript 闭包",
    date: "2025-07-28",
    tags: ["前端", "JavaScript"],
    cover: "img/portrait-lamy.jpg",
    summary: "闭包 = 函数 + 它出生时所在的作用域。理解它，就理解了变量的生命周期。",
    content: `闭包（Closure）是 JavaScript 中最重要、也最容易被误解的概念之一。

## 什么是闭包

简单说：**闭包 = 函数 + 它出生时所在的作用域**。当一个函数记住了它定义时的环境，即使离开那个环境，它依然能访问那些变量。

## 经典例子

~~~js
function createCounter() {
  let count = 0;
  return function () {
    count += 1;
    return count;
  };
}

const counter = createCounter();
counter(); // 1
counter(); // 2
~~~

这里的内部函数"记住"了 \`count\`，外部无法直接访问它，只能通过返回的函数来操作——这也是一种**数据封装**。

## 常见用途

1. 封装私有状态（上面的计数器）；
2. 函数工厂（按参数生成不同行为的函数）；
3. 在循环中保存变量（配合 \`let\`，或旧代码里的 IIFE）。

## 注意事项

闭包会让变量一直存活在内存中，滥用可能造成**内存泄漏**，不再需要时及时释放引用即可。

> 理解闭包，就是理解 JavaScript 的变量生命周期。`
  },
  {
    id: "git-guide",
    title: "给新手的 Git 简明指南",
    date: "2025-07-15",
    tags: ["工具", "教程"],
    cover: "img/portrait-nao.jpg",
    summary: "从安装配置到提交推送，一篇讲清 Git 最常用的工作流。",
    content: `Git 是现代开发者的必修课。这篇是给新手的简明上手指南。

## 安装与配置

确认安装后，先设置身份信息：

~~~bash
git config --global user.name "你的名字"
git config --global user.email "you@example.com"
~~~

## 提交三步曲

每一次提交都遵循这个流程：

1. \`git add .\` —— 把改动加入暂存区
2. \`git commit -m "描述改了什么"\` —— 提交
3. \`git push\` —— 推送到远程仓库

## 常用命令速查

- \`git status\`：查看工作区状态
- \`git log\`：查看提交历史
- \`git branch\`：查看分支
- \`git checkout -b 新分支名\`：新建并切换分支
- \`git merge 分支名\`：合并分支

## 几点建议

- 提交信息写清楚"**做了什么**"，而不是"改了代码"；
- 原子提交：一次提交只做一件事；
- 开工前先 \`git pull\`，避免冲突。

> 多练习，命令自然就熟了。`
  }
];