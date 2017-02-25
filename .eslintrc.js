module.exports = {
  "extends": [
   "standard"
  ],
  "plugins": [
    "standard"
  ],
  "env": {
    "browser": true,
    "es6": true,
    "commonjs": true,
    "jasmine": true
  },
  "ecmaFeatures": {
    "modules": true
  },
  "globals": {
    "jQuery": true
  },
  "rules": {
    "semi": 0,
    "eol-last": 0,
    "spaced-comment": 0,
    "angular/controller-as-vm": 0,
    "angular/module-getter": 0,
    "angular/module-setter": 0,
    "space-before-function-paren": [
      0
    ]/*,
     "anonymous": "never",
     "named": "never"*/
  }
};