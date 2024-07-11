import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {
    languageOptions: 
    { globals: globals.browser },
    env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'standard',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    // Tambahkan aturan khusus Anda di sini
  },
  },
  pluginJs.configs.recommended,
];