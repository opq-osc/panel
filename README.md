# panel(OPQBot WebUI)

## 使用方法

### 1 使用编译完成的

下载 [releases](https://github.com/opq-osc/panel/releases) 中编译完成的压缩包 解压到 OPQBot/WebUI 目录即可

WebUI 地址 :OPQBot 的 IP:端口

> 例如 http://192.168.11.111:8888

```
OPQBot
├── CodecScripts/
├── CoreConf.conf*
├── CronSchedules/
├── Logs/
├── OPQBot*
├── Plugins/
├── UsersConf/
├── WebPlugins/
└── WebUI/
    ├── css/
    ├── fonts/
    ├── img/
    ├── index.html
    ├── js/
    ├── manifest.json
    ├── precache-manifest.847e8499c54d7476aa0832f73f2b7bc1.js
    ├── robots.txt
    └── service-worker.js
```

### 2 自行编译

1. 安装 Nodejs
2. `npm install`
3. `npm run build`

**用打包生成的 WebUI 文件夹替换 OPQBot 里的 WebUI 文件夹**

> 可能出现的疑问
>
> ```markdown
> 1.如果我改变了 OPQBot 的端口，需要相应地改变 Panel 的端口吗?
> 答:不需要
> ```

## 相关网址

[Vue 官网](https://cn.vuejs.org)  
[Nodejs 官网](https://nodejs.org/)
