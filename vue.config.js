module.exports = {
    devServer: {
        proxy: {
            "/": {
                target: "http://localhost:3000"
            }
        }
    },
    outputDir: "/home/alola/Desktop/Soul-Arena/server/public/main",
}