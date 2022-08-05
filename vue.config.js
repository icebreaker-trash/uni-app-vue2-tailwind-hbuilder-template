if (process.env.NODE_ENV === "development") {
  process.env.TAILWIND_MODE = "watch";
}

const isH5 = process.env.UNI_PLATFORM === "h5";
const isApp = process.env.UNI_PLATFORM === "app";

const WeappTailwindcssDisabled = isH5 || isApp;

const {
  UniAppWeappTailwindcssWebpackPluginV4,
} = require("weapp-tailwindcss-webpack-plugin");

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
const config = {
  //....
  configureWebpack: {
    plugins: [
      new UniAppWeappTailwindcssWebpackPluginV4({
        disabled: WeappTailwindcssDisabled,
      }),
    ],
  },
  //....
};

module.exports = config;
