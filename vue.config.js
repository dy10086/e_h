module.exports =  {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.0.103:3000',
                changeOrigin: true
            }
        }
    }
}