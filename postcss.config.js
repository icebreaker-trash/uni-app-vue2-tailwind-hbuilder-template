// Error: ENOENT: no such file or directory, open 'D:\HBuilderX\plugins\uniapp-cli\tailwind.config.js'

const path = require("path");
const {
	WeappTailwindcssDisabled,
	isWeapp
} = require("./platform");

module.exports = {
	plugins: [
		require("autoprefixer")({
			remove: process.env.UNI_PLATFORM !== "h5",
		}),
		require("tailwindcss")({
			config: path.resolve(__dirname, "./tailwind.config.js"),
		}),
		// rem 转 rpx
		WeappTailwindcssDisabled ?
			undefined :
			require("postcss-rem-to-responsive-pixel/postcss7")({
				rootValue: 32,
				propList: ["*"],
				transformUnit: "rpx",
				replace: isWeapp
			}),
		WeappTailwindcssDisabled ? require('@dcloudio/vue-cli-plugin-uni/packages/postcss') : undefined
	],
};
