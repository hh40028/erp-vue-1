const webpack = require('webpack')
module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",

                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })
        ]
    },
    productionSourceMap: false,
    lintOnSave: false,
    publicPath: './',
    runtimeCompiler: true
};
