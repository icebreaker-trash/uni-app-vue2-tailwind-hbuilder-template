if (process.env.NODE_ENV === "development") {
  process.env.TAILWIND_MODE = "watch";
}
const { WeappTailwindcssDisabled } = require("./platform");

const {
  UniAppWeappTailwindcssWebpackPluginV5,
} = require("weapp-tailwindcss-webpack-plugin");

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
const config = {
  //....
  configureWebpack: {
    plugins: [
      new UniAppWeappTailwindcssWebpackPluginV5({
        disabled: WeappTailwindcssDisabled,
        customReplaceDictionary: 'simple'
      }),
    ],
  },
  //....
};

module.exports = config;
