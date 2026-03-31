# Portfolio V3 — IMA @ NYU Shanghai

纯静态网站，零依赖，可直接部署到 GitHub Pages。

## 文件结构
```
index.html    ← 页面结构（一般不需要改）
style.css     ← 所有样式（一般不需要改）
app.js        ← 逻辑/动画（一般不需要改）
projects.js   ← ⭐ 你的数据，只改这个！
```

---

## 添加 / 删除项目

只需编辑 `projects.js` 中的 `PROJECTS` 数组。

### 添加新项目（复制模版）：
```js
{
  id: "my-project",           // 唯一ID，小写无空格，用于URL
  title: "My Project",
  year: "2025",
  category: "Installation",
  medium: "Arduino · p5.js",
  role: "Solo",
  shortDesc: "一句话描述，显示在首页列表。",
  fullDesc: `详细描述，支持多段落。

空一行就是新段落。`,
  details: [
    "展览地点和时间",
    "技术细节",
    "合作者"
  ],
  coverColor: "#1a1410",      // 没有图片时显示的颜色
  coverImg: "",               // 封面图片URL，留空用颜色
  images: [],                 // 详情页图库，填URL数组
  link: "",                   // 项目链接
  github: ""                  // 源码链接
},
```

### 删除项目：
直接删除 `PROJECTS` 数组里对应的那个 `{...}` 对象即可。

---

## 修改个人信息

在 `projects.js` 底部找到 `ABOUT` 对象：

```js
const ABOUT = {
  name: "Your Name",           // 真实姓名
  nameDisplay: "YOUR NAME",    // 大写展示名（header/footer）
  program: "IMA · NYU Shanghai · Class of 2026",
  lead: "一句话介绍自己",
  bio: ["第一段", "第二段"],   // 关于页面正文
  tools: ["p5.js", "Arduino", ...],
  photo: "",                   // 照片URL，留空显示占位符
  email: "your@email.com",
  github: "https://github.com/...",
  instagram: "",
  linkedin: "",
  arena: ""
};
```

---

## 部署到 GitHub Pages

1. 新建 GitHub 仓库（Public）
2. 上传四个文件：`index.html` `style.css` `app.js` `projects.js`
3. Settings → Pages → Source: `main` / `root` → Save
4. 访问 `https://你的用户名.github.io/仓库名/`

---

## 功能说明

| 功能 | 说明 |
|---|---|
| 动态背景 | Canvas 粒子 + 金色连线 + 缓慢漂移的光晕 |
| 自定义光标 | 跟随光标的金色圆环，hover时放大 |
| 项目详情页 | SPA路由，点击项目卡片无刷新跳转 |
| Hash路由 | URL自动变为 `#echo-chamber`，可分享直链 |
| 上下翻项目 | 详情页底部 Prev / Next 导航 |
| 滚动淡入 | 所有内容块滚动到视口时淡入 |
| 响应式 | 适配手机/平板 |
