# uni-app-vue2-tailwind-hbuilder-template

- [uni-app-vue2-tailwind-hbuilder-template](#uni-app-vue2-tailwind-hbuilder-template)
  - [从 0 到 1 的搭建过程](#从-0-到-1-的搭建过程)
    - [新建一个`uni-app`项目](#新建一个uni-app项目)
    - [添加 `postcss.config.js`](#添加-postcssconfigjs)
    - [添加 `tailwind.config.js`](#添加-tailwindconfigjs)
    - [`App.vue` 中添加](#appvue-中添加)
  - [Related projects](#related-projects)
    - [CLI 工具](#cli-工具)
    - [模板 template](#模板-template)
    - [预设 tailwindcss preset](#预设-tailwindcss-preset)
  - [Bugs & Issues](#bugs--issues)

这是一个使用 `hbuilderx` + `uni-app` + `vue2` + `tailwind` 构建的小程序模板。可以直接在 `hbuilderx` 中导入运行。

## 从 0 到 1 的搭建过程

### 新建一个`uni-app`项目

在这个项目里，添加 `.gitignore`,`package.json`,`vue.config.js` 文件

`.gitignore` 中，把 `node_modules`,`unpackage`,`.hbuilderx` 这一类不像被添加到 `git` 的添加进去。
```txt
unpackage
node_modules
.hbuilderx
```

然后我们 `npm init -y` 在项目根目录创建一个 `package.json`，并安装依赖：

```json
  "devDependencies": {
    "@dcloudio/uni-cli-i18n": "^2.0.1-34920220630001",
    "@dcloudio/uni-cli-shared": "^2.0.1-34920220630001",
    "@dcloudio/vue-cli-plugin-uni": "^2.0.1-34920220630001",
    "autoprefixer": "9",
    "postcss": "7",
    "postcss-comment": "^2.0.0",
    "postcss-rem-to-responsive-pixel": "^5.1.3",
    "tailwindcss": "npm:@tailwindcss/postcss7-compat",
    "weapp-tailwindcss-webpack-plugin": "^1.6.8",
    "webpack": "npm:webpack@webpack-4"
  }
```

这是一个 `vue2` 项目，所以这样安装，`vue3` 使用 `vite/webpack` 的有所不同。

然后添加 `vue.config.js` 文件，注册 `weapp-tailwindcss-webpack-plugin`:

```js
const {
  UniAppWeappTailwindcssWebpackPluginV4,
} = require("weapp-tailwindcss-webpack-plugin");

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
const config = {
  //....
  configureWebpack: {
    plugins: [new UniAppWeappTailwindcssWebpackPluginV4()],
  },
  //....
};

module.exports = config;
```

### 添加 `postcss.config.js`

这里我们和 `uni-app` 的 `cli` 项目保持一致，以免在 `merge options` 时遇到未知问题。

```js
const path = require("path");

module.exports = {
  parser: require("postcss-comment"),
  plugins: [
    require("postcss-import")({
      resolve(id, basedir, importOptions) {
        if (id.startsWith("~@/")) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(3));
        } else if (id.startsWith("@/")) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(2));
        } else if (id.startsWith("/") && !id.startsWith("//")) {
          return path.resolve(process.env.UNI_INPUT_DIR, id.substr(1));
        }
        return id;
      },
    }),
    require("autoprefixer")({
      remove: process.env.UNI_PLATFORM !== "h5",
    }),
    require("tailwindcss")({
      config: path.resolve(__dirname, "./tailwind.config.js"),
    }),
    // rem 转 rpx
    require("postcss-rem-to-responsive-pixel/postcss7")({
      rootValue: 32,
      propList: ["*"],
      transformUnit: "rpx",
    }),
    require("@dcloudio/vue-cli-plugin-uni/packages/postcss"),
  ],
};

```

这里特别注意，在声明所有路径时，必须声明为绝对路径!!!

因为 `hbuilderx` 有一个奇葩的读取配置策略，如果不是绝对路径，会读取 `'\HBuilderX\plugins\uniapp-cli\'` 目录下的文件，这直接导致配置打不开，导致项目挂了。

### 添加 `tailwind.config.js`

```js
const path = require("path");
const resolve = (p) => {
  return path.resolve(__dirname, p);
};
// https://github.com/sonofmagic/weapp-tailwindcss-webpack-plugin/blob/main/demo/uni-app/tailwind.config.js
/** @type {import('@types/tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  mode: "jit",
  purge: {
    content: [
      resolve("./index.html"),
      resolve("./pages/**/*.{vue,js,ts,jsx,tsx,wxml}"),
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};

```

同样，`content` 也必须为绝对路径。

### `App.vue` 中添加

```html
<style lang="scss">
/*每个页面公共css */
@import "tailwindcss/base";
@import "tailwindcss/utilities";
</style>
```

现在，你就可以在 `hbuilder` 中愉快的使用 `tailwindcss` 了！

## Related projects

### CLI 工具

[weapp-ide-cli](https://github.com/sonofmagic/utils/tree/main/packages/weapp-ide-cli): 一个微信开发者工具命令行，快速方便的直接启动 ide 进行登录，开发，预览，上传代码等等功能。

### 模板 template

[uni-app-vite-vue3-tailwind-vscode-template](https://github.com/sonofmagic/uni-app-vite-vue3-tailwind-vscode-template)

[uni-app-vue3-tailwind-vscode-template](https://github.com/sonofmagic/uni-app-vue3-tailwind-vscode-template)

[uni-app-vue2-tailwind-vscode-template](https://github.com/sonofmagic/uni-app-vue2-tailwind-vscode-template)

[weapp-native-mina-tailwindcss-template](https://github.com/sonofmagic/weapp-native-mina-tailwindcss-template)

### 预设 tailwindcss preset

[tailwindcss-miniprogram-preset](https://github.com/sonofmagic/tailwindcss-miniprogram-preset)

## Bugs & Issues

目前这个插件正在快速的开发中，如果遇到 `Bug` 或者想提出 `Issue`

[欢迎提交到此处](https://github.com/sonofmagic/weapp-tailwindcss-webpack-plugin/issues)