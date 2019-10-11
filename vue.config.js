module.exports = {
  css: {
    loaderOptions: {
      css: {
        // options here will be passed to css-loader
        rules: [
          {
            test: /\.scss$/,
            use: ['vue-style-loader', 'css-loader', 'sass-loader']
          }
        ]
      },
      postcss: {
        // post-css loader options
      },
      sass: {
        data: `
          @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700&display=swap');
          @import "@/scss/main.scss";
          `
      }
    }
  }
}
