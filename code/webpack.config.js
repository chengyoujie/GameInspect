var path = require("path")
const webpack = require("webpack")

module.exports = {
     mode:"development",//生产环境
    // mode:"production",//发布环境
    // devtool: false,
    devtool: 'cheap-module-source-map',
    watch:true,
    watchOptions:{
        aggregateTimeout: 300,
        poll:1000,
        ignored:path.join(__dirname, 'node_modules')
    },
    entry:{//入口文件
        engine:["./src/engine/EngineManager.ts"],
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        },
        extensions: ["*", ".ts", ".js", ".json"]
    },
    output:{
        path: path.resolve(__dirname, "./dist"),
        filename: "js/[name].js"
    },
    plugins: [
        new webpack.DefinePlugin({
            global:"window"
        }),
    ],
    module: {
        rules: [
            {
                test:/\.tsx?$/,
                loader:'ts-loader',
                options:{
                    configFile:path.join(__dirname, "tsconfig.json")
                }
            },
            {
                test:/\.(txt|vert|frag)$/,
                use:"raw-loader"
                    
            },
            
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".vert", ".frag", ".txt", ".jpg", ".png"]
    }

}