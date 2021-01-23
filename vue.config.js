module.exports = {
  devServer: {
    proxy: "http://lvh.me:8080/",
  },
  outputDir: "/home/alola/Desktop/Soul-Arena/server/public/main",
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Soul-Arena — Your #1 Box-Clicking Multiplayer Game";
      return args;
    });
  },
};
