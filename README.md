# 有一点想笑

以舞蹈、影像和日常为主题的个人作品集。黑白灰与冷蓝配色，克制的滚动动效。Next.js 16 + React 19 + Tailwind CSS 4 + Framer Motion，完整静态前端，不需要数据库或密钥。

## 本地运行

安装 Node.js 22.13 或更新版本。在项目目录运行：

```sh
npm ci
npm run dev
```

打开 http://127.0.0.1:3000 。结束时在终端按 Ctrl+C。

## 构建及部署

```sh
npm run build
```

构建产物位于 out/，可放到任意静态网站托管服务。不要双击 index.html 直接浏览，应通过 HTTP 服务访问；例如有 Python 时运行 `python -m http.server 8080 --directory out`，再打开 http://localhost:8080 。

## 内容替换

- `content/memories.ts`：昵称、记录开始日期、个人介绍、标签、视频列表、时间线、相册、日常记录。
- `public/media/`：图片和视频文件。数据中使用 `/media/文件名` 引用；建议照片宽度 1200–1800 像素，视频使用 H.264 MP4。
- `components/memory-book.tsx`：页面结构及交互、首页文案、幕后手记。
- `app/globals.css`：配色、布局、手机适配。
- `app/layout.tsx`：浏览器标题、描述。

首页以锚点导航串联六个板块。照片支持分类、灯箱、左右箭头和 Esc 关闭；视频使用浏览器原生控制条。幕后入口演示密码为 0520，可在 site.password 中修改。修改演示密码时请同步入口提示文字。

## 范围说明

照片、人物昵称、日期和故事均为示例。视频是本地自然风景测试短片，并非真实舞蹈录像。没有真实登录、上传、后台编辑或数据存储。所有内容都在静态文件中；演示密码只打开幕后手记，不隐藏或保护素材，不应当作真实鉴权。

默认尊重系统的减少动态效果设置。记录天数按访客本地日历日期计算已过去天数，起始日为第 0 天。

## 示例素材来源

图片来自 Unsplash，原始摄影师及页面如下；这些图片仅用于原型占位，不代表网站人物。

- seaside.jpg：Prescott Horn — https://unsplash.com/photos/hgmLpfDOlVs
- flowers.jpg：Alsu Vershinina — https://unsplash.com/photos/5s63ixeUpg4
- coffee.jpg：Esra Afşar — https://unsplash.com/photos/DEXHV1ujoag
- dance.jpg：Knight Duong — https://unsplash.com/photos/NNORtUpWt-M
- coast.jpg：Mario Amé — https://unsplash.com/photos/qj9w4kYPPqQ
- sample.mp4：MDN CC0 测试素材 — https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4

本次提供本地完整项目和 out/ 静态产物，尚未完成线上发布。若自行部署，只需 Next.js 静态构建产物。附带的组件库可按后续需求使用。





## GitHub 与 Vercel 上线

计划仓库：`Red-nosed-clown/youyidianxiangxiao`，私有。仓库尚需 GitHub 授权后创建和推送；这里不是已经上线的链接。

Vercel 导入该仓库时使用：

- Framework Preset：Next.js
- Root Directory：项目根目录
- Install Command：npm ci
- Build Command：npm run build
- Output Directory：保留框架默认识别；项目已设置 output: export
- 环境变量：无需配置

连接成功后，主分支的新提交可自动触发部署。实际访问地址以 Vercel 成功部署后的结果为准。仓库私有不等于网站私有，网站里的演示代码也不提供真实访问保护。

参考：https://vercel.com/docs/frameworks/full-stack/nextjs
