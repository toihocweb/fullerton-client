const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          "@primary-color": "#c5901c",
          "@link-color": "#1DA57A",
        },
      },
    },
  ],
};
