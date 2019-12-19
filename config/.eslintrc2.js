/**
 * lint-stated
 * git commit前代码检测规则
 */

module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parser": "babel-eslint",
  "globals": {
    "window": true,
    "document": true,
    "module": true,
    "require": true,
  },
  "parserOptions": {
    "sourceType": "module"
  },
  "plugins": ["html"],
  "rules": {
    "react/prop-types": 0,
    "no-console": 0,  // 禁用console检测
    'no-alert': 2, // 禁止 alert，要用写 eslint disable
    'no-debugger': 2, // 禁止 debugger，防止上线
    "react/display-name": 0,
    "no-unused-vars": 2,  // 未使用变量检测开启
    "no-undef": 2,  // 未定义变量检测开启
    "no-empty": 2,  // 禁止出现空语句块
    "no-irregular-whitespace": 2,  // 禁止在字符串和注释之外不规则的空白
    "default-case": 2,  // 要求switch语句中有default分支
    "eqeqeq": 2,  // 要求使用===和!==
    "indent": [2, 2, { "SwitchCase": 1 }],  // 强制使用一致的缩进
    "max-len": [2, 200],  // 强制一行的最大长度
    "max-lines": [2, 1000],  // 强制最大行数
    "spaced-comment": 2,  // //或/*使用一致的空格
    "no-const-assign": 2,  // 禁止修改const声明的变量
    "no-var": 2,  // 要求使用let或const而不是var
    "quotes": [2, "single", "avoid-escape"],  // 强制使用一致的反勾号、双引号或单引号
    "brace-style": [2, "1tbs", { "allowSingleLine": true }],  // if while function 后面的{必须与if在同一行，java风格
    "key-spacing": [2, { "beforeColon": false, "afterColon": true }],  // 强制在对象字面量的属性中键和值之间使用一致的间距
    "space-unary-ops": [2, { "words": true, "nonwords": false }],  // 强制在一元操作符前后使用一致的空格
    "no-mixed-spaces-and-tabs": 2,  // 不允许空格和 tab 混合缩进
    "no-multi-spaces": 2, // 不能用多余的空格
    "no-multiple-empty-lines": [2, {"max": 2}], // 空行最多不能超过2行
    "no-spaced-func": 2, // 函数调用时 函数名与()之间不能有空格
    "no-trailing-spaces": 2, // 一行结束后面不要有空格
    "no-unneeded-ternary": 2, // 禁止不必要的嵌套 var isYes = answer === 1 ? true : false
    "prefer-const": 2,  // 更喜欢用const
    "comma-dangle": [2, "always-multiline"],  // 要求或禁止末尾逗号
    "comma-spacing": [2, { "before": false, "after": true }],  // 强制在逗号前后使用一致的空格
    "no-extra-boolean-cast": 2, // 禁止不必要的布尔转换
    "no-extra-semi": 2, // 禁止不必要的分号
  },
  "env": {
    "es6": true,
    "browser": true,
    "node": true
  },
  "globals": { log: false },
  "settings": {
    "react": {
      "version": "detect" // React version. "detect" automatically picks the version you have installed.                                               
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.                                              
      // default to latest and warns if missing                                             
      // It will default to "detect" in the future                 
    }
  }

}