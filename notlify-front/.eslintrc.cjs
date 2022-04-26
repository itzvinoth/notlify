/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
	root: true,
	extends: [
		"plugin:vue/vue3-essential",
		"eslint:recommended",
		"@vue/eslint-config-prettier",
	],
	rules: {
		"vue/html-indent": ["error", "tab"],
		indent: ["error", "tab"],
	},
	env: {
		"vue/setup-compiler-macros": true,
	},
};
