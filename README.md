# 个人主页（苹果官网风格 · 深色）

双击 `index.html` 即可在浏览器中打开查看。

## 文件结构
- `index.html`  — 页面骨架（一般不用改）
- `style.css`   — 样式（苹果风格深色，可调颜色/圆角/动画）
- `render.js`   — 渲染逻辑（一般不用改）
- `data.js`     — **所有内容数据都在这里，手动更新此文件即可**

## 如何更新内容
用记事本/VS Code 打开 `data.js`，修改对应字段后保存，刷新浏览器即可：

| 想改什么 | 改哪一行 |
|---|---|
| 姓名 / 职称 / 头像图片 | `name` / `role` / `avatar` |
| 个人简介 | `profile`（多行用 `\n` 分段，注意每行开头结尾的引号） |
| 邮箱 / 办公地址 | `contact` 里的 `email`、`office` |
| 论文 | `papers` 里每条：`authors` 作者、`title` 标题、`journal` 期刊、`year` 年份、`detail` 卷期页码、`note` 收录情况 |
| 项目 | `projects` 里每条：`name` 名称、`number` 批准号、`fund` 经费、`time` 时间、`status` 状态 |
| 荣誉 | `honors` 里每条一行字符串 |

## 添加头像
- 把照片放到本文件夹，命名如 `photo.jpg`
- 在 `data.js` 中把 `avatar` 改为 `"photo.jpg"`

## 常见修改示例
- 加亮某篇论文（第一作者/通讯）：在该论文条目里加 `"highlight": true`
- 新增一条项目：在 `projects` 数组最后一条后面加逗号，再粘贴一条 `{...}`
- 注意：条目与条目之间必须用英文逗号 `,` 隔开，最后一条后不要加逗号
