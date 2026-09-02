# 李建刚 · Academic Homepage

个人学术主页（GitHub Pages）。纯静态站点：HTML + CSS + 原生 JavaScript，无构建步骤、无第三方依赖，双击 `index.html` 即可本地预览。

在线地址：https://ljiangang412-ai.github.io/profile/

## 页面结构

| 文件 | 说明 |
|---|---|
| `index.html` | 首页：Hero · Research Focus · AI × Planning · Selected Research · Research Projects · Policy Impact · About · Academic Service · Join the Group · Contact |
| `profile.html` | 完整个人学术简历（简介、研究方向、项目、代表性论文、政策咨询、获奖、兼职、教学、联系方式） |
| `publications.html` | 全部论文，按年份分组，可按语言 / 方向标签筛选 |
| `join.html` | 加入课题组：聚焦方向、课题组优势、学生竞赛获奖、联系与申请 |
| `data.js` | **所有内容数据都在这里，更新内容只需改这个文件** |
| `render.js` | 渲染逻辑（导航、各模块、滚动显现、数字 count-up），一般无需修改 |
| `style.css` | 样式（Modern Academic / Editorial；配色 Navy · Off-white · Soft Blue） |
| `fonts/` | 自托管字体（Source Serif 4 + 思源宋体子集用于标题，Instrument Sans 用于西文正文；均为 OFL 开源授权，无需外部字体 CDN） |

## 如何更新内容

用 VS Code / 记事本打开 `data.js`，修改对应字段后保存、刷新页面即可。

| 想改什么 | 改哪里 |
|---|---|
| 头衔 / 单位 / 首屏一句话定位 | `role` · `affiliation` · `tagline` |
| 首屏重点方向（人工智能与城乡规划） | `core` |
| 首屏数字条 | `stats`（`value` 为数字，页面会做 count-up） |
| 首页精简简介 / 简历页完整简介 | `bioShort` / `bioFull`（数组，每项一段） |
| 研究方向卡片 | `focus`（`featured: true` 的卡片视觉权重更高） |
| AI × Planning 模块 | `ai`（`flow` 为流程节点，`directions` 为三个方向） |
| 论文 | `papers`：`selected: true` 会在首页展示；`tags` 为方向标签；`doi` 没有就留空 `""`，**不要编造** |
| 科研项目 | `projects`：`featured: true` 为首页重点卡片；`homepage: false` 只在简历页显示；`fund` 只在简历页显示 |
| 政策咨询 | `policy`（`steps` 为四步流程） |
| 获奖 | `honors`（以“指导学生”开头的条目会同时出现在课题组页） |
| 学术兼职 / 审稿期刊 | `service.roles` / `service.journals` |
| 加入课题组 | `recruiting` |
| 邮箱 / 办公地址 / 外部链接 | `contact` / `links`（只填有真实链接的账号） |

注意：条目之间用英文逗号 `,` 隔开，最后一条后不要加逗号；字符串内如出现英文双引号需写成 `\"`。

## 字体说明

标题使用衬线体（西文 Source Serif 4，中文思源宋体），正文使用无衬线体（西文 Instrument Sans，中文跟随系统：PingFang / 微软雅黑）。字体文件放在 `fonts/`，已做子集化（中文宋体只包含站点用到的字 + 1000 个常用字，约 380 KB）。如果日后标题里出现子集之外的生僻字，该字会自动回退到系统宋体，不影响显示；需要时可按 `fonts/LICENSE.md` 中的命令重新生成子集。

## 添加头像（可选）

当前首屏使用 SVG“Spatial Intelligence”图形，不依赖照片。如需在简历页等位置加入照片，把图片放到本文件夹并在 `data.js` 的 `avatar` 中填写文件名（如 `"photo.jpg"`），再在对应页面引用即可。

## 部署

推送到 `main` 分支后 GitHub Pages 自动发布。所有资源均为相对路径，可在任意子路径下正常工作。
