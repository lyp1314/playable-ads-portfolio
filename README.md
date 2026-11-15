# Ora Playables 作品集说明

三则原创可试玩广告（Playable Ads）演示，以及一个中英双语展示页。适合作为接单作品集：结构对标常见渠道规范，美术、文案和代码均为原创，没有使用 Scenario 案例库中的素材或源码。

## 目录

```
index.html                 作品集展示页（iframe 内嵌三个 Demo）
README.md                  本说明
demos/chroma-wells.html    排序谜题
demos/bolt-haven.html      拔钉救援
demos/lumen-tiles.html     三消
screenshots/               自测截图
recordings/                自测录屏 mp4 / gif
tests/record.mjs           Playwright 自测与录屏脚本
tests/report.json          最近一次自测结果
```

本地预览（不要用 `file://` 打开 iframe 页，相对路径会出问题）：

```bash
python3 -m http.server 8080 --directory .
# 浏览器打开 http://127.0.0.1:8080/
```

## 三个 Demo

| 文件 | 玩法 | 高光 | 逻辑分辨率 | 体积（以文件实测为准） |
| --- | --- | --- | --- | --- |
| `demos/chroma-wells.html` | 倒球分类，两局 | 进入 Deep Well，倒满一井爆光 | 720×1280，9:16 自适应 | 24.5 KB（25,055 字节） |
| `demos/bolt-haven.html` | 按序拔螺栓救人 | 石块砸在木架上 | 同上 | 21.5 KB（21,968 字节） |
| `demos/lumen-tiles.html` | 三消破蜡封，12 步 | 四连/五连触发 AURORA 慢动作 | 同上 | 24.1 KB（24,721 字节） |

共同约定：

- 单文件 HTML，无外链图片/字体/音频，运行时不应再发网络请求。
- 首触前停表，提示手循环示范；音效在首次点击后用 Web Audio 合成。
- 2.5 秒无操作再次出示提示手；10 秒无操作进入结束卡。
- 结束卡分胜利（CLEARED）和差一点（ALMOST），带 Install 与 Replay。游玩过程中底部也有常驻 Install。
- 店铺地址写在每个文件顶部的 `STORE_URL`，演示默认指向 `./index.html`。接单时改成 App Store / Google Play 链接。

## CTA 适配层

三个文件使用同一套调用顺序（实现各自内联，便于单文件投放）：

1. Meta / Moloco：`FbPlayableAd.onCTAClick()`
2. Google：`ExitApi.exit()`
3. AppLovin / Unity / 通用 MRAID：`mraid.open(绝对店铺地址)`；若 `getState() === "loading"` 则等到 `ready`
4. 以上都没有时：`window.open(store)`，方便本地与作品集预览

如需 Mintegral（`install()` + `gameReady` / `gameStart` / `gameEnd`）、Liftoff（`postMessage("download")`）或 Pangle（`openAppStore()`），按客户渠道在适配层追加分支即可，不要把游戏逻辑直接绑到某一家 SDK。

## 各平台打包要点

这些是投放侧的常见上限，以各网络当前文档为准，送审前用官方预览工具再测一遍。

| 网络 | 常见包格式 | 常见体积上限 | Install | 启动时要注意 |
| --- | --- | --- | --- | --- |
| Meta | ZIP，内含 HTML | ZIP 5 MB，其中 HTML 2 MB | `FbPlayableAd.onCTAClick()` | 通常立即开播 |
| Google（App Campaigns） | ZIP | 5 MB | `ExitApi.exit()` | 通常立即开播，竖屏 |
| AppLovin / Unity / 通用 MRAID | 单 HTML | 5 MB | `mraid.open(store)` | 等广告可见再动；有的渠道首次点击只用来启动 |
| Moloco | 单 HTML | 5 MB | 与 Meta 类似的 CTA 调用 | 通常立即开播 |
| Mintegral | 单 HTML | 5 MB | `install()` | 需回报 ready / start / end |
| Liftoff | ZIP | 5 MB | `postMessage("download")` | 结束卡出现时通知 |
| Pangle | ZIP + `config.json` | 5 MB | `openAppStore()` | 先加载渠道 playable 脚本 |

送审前建议自检：

- 单文件或 ZIP 内自洽，抓包应没有广告外的资源请求。
- 音效不要自动播，等用户第一次点击。
- 提供静音按钮，且静音不应当成一次「开局操作」。
- Install 必须走到该渠道要求的函数，而不是只 `window.open`。
- 低端安卓机、竖屏/横屏字面盒都要点得中、画得下。
- 演示包里的店铺链接要在正式文件里换成真实商店地址。

本仓库三个 Demo 均远小于 2 MB，可以直接作为 Meta HTML 的体量起点。若以后加入音画素材，先压成 WebP / 短 MP3 再 base64 内联，并预留压缩后的余量。

## 如何部署展示页（不要用本说明代替实际上传）

作品集展示页是静态站点，适合 GitHub Pages、Netlify 或 itch.io。以下只说明步骤，不会替你注册账号或公开发布。

### GitHub Pages

1. 新建一个 Git 仓库，把本目录（至少 `index.html`、`demos/`）提交上去。
2. 在仓库 Settings → Pages 中，选 GitHub Actions 或「Deploy from a branch」，分支选 `main`，目录选 `/`（根目录）。
3. 如果仓库名不是 `username.github.io`，站点地址一般是 `https://<user>.github.io/<repo>/`。
4. Demo 与 iframe 使用相对路径，只要保持目录结构不变即可。

### Netlify

1. 登录 Netlify，选择「Import an existing project」或「Deploy manually」把本目录拖进去。
2. 构建命令留空，发布目录设为站点根（即包含 `index.html` 的那一层）。
3. 发布后用 Netlify 分配的域名或自定义域名打开即可。

### itch.io

1. 把 `index.html`、`demos/` 以及你希望附带的 `README.md`、`recordings/` 打成 zip（不要把 `node_modules` 打进去）。
2. 在 itch.io 新建页面，Kind of project 选 HTML。
3. 上传 zip，将「This file will be played in the browser」勾在含 `index.html` 的压缩包上。
4. 在嵌入选项里勾选可被 iframe 播放，视口建议用竖屏比例（例如 390×844 或 720×1280 的缩放）。
5. itch 的「试玩」嵌入和广告网络的投放包是两件事：投放仍要按上一节把单个 Demo HTML/ZIP 交给渠道。

## 自测与录屏

在已安装 Node.js、Google Chrome、ffmpeg 的机器上：

```bash
npm install --no-fund --no-audit playwright-core
node tests/record.mjs
```

脚本会启动本地静态服务，用无头 Chrome 按提示手自动点完三个 Demo，检查控制台错误，并写出：

- `screenshots/<demo>-01-hint.png` 开场提示
- `screenshots/<demo>-02-play.png` 游玩中
- `screenshots/<demo>-04-endcard.png` 结束卡
- `recordings/<demo>.mp4` 全程
- `recordings/<demo>.gif` 前 12 秒预览
- `tests/report.json` 结果摘要

## 授权与使用

演示仅用于作品集展示。若要投放真实产品：替换店铺链接与品牌、确认音乐与角色的授权覆盖广告用途，并在目标网络的官方预览工具中过审。
