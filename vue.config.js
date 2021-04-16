const path = require('path');        
const CompressionPlugin = require("compression-webpack-plugin")
function resolve(dir) {
    return path.join(__dirname, dir)  
}
module.exports = {
    chainWebpack: (config) => {
        
        config.resolve.alias
            //set第一个参数：设置的别名，第二个参数：设置的路径
            .set('@', resolve('./src'))
            .set('assets', resolve('./src/assets'))
            .set('components', resolve('./src/components'))
            .set('views', resolve('./src/views'))
            .set('network', resolve('./src/network'))
            .set('common', resolve('./src/common'))
            //生产环境，开启js\css压缩
            if (process.env.NODE_ENV === 'production') {
                config.plugin('compressionPlugin').use(new CompressionPlugin({
                test: /\.js$|.\css|.\less/, // 匹配文件名
                threshold: 10240, // 对超过10k的数据压缩
                deleteOriginalAssets: false // 不删除源文件
                }))
            }
    },

    pages: {
        index: {
            entry:'src/main.js',
            title:'CloudMusic'
        }
    },

    productionSourceMap: false
}