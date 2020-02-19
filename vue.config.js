module.exports = {
  productionSourceMap:false,
  devServer: {
      // 设置主机地址
      // host: 'http://192.168.10.146',
      // 设置默认端口
      port: 8080,
      //默认打开浏览器
      open: true,
      // 设置代理
      proxy: {
          '/api': {
              target: 'http://localhost:9000',//真实的api地址
              // 如果要代理 websockets
              ws: true,
              changeOrigin: true,
              pathRewrite: {
                  '^/api': ''
              }
          }
      }
  }
}