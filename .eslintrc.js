module.exports = {
  "extends": "airbnb-base",
  "plugins": ["jest"],
  "env": {
    "jest/globals": true
  },
  "ignorePatterns": ["dist/", "node_modules/", "coverage/"],
  "rules": {
    "linebreak-style": "off"
  }
};
