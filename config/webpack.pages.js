const HtmlWebpackPlugin = require('html-webpack-plugin')

function createPages(template, filename) {
    return new HtmlWebpackPlugin({
      template: template,
      filename: filename
    })
  }


const htmlPages = [
    createPages('./src/index.html', './index.html'), // промо
    createPages('./src/pages/articles.html', './pages/articles.html'),
    createPages('./src/pages/guides.html', './pages/guides.html'),
    createPages('./src/pages/tests.html', './pages/tests.html'),
    createPages('./src/pages/mainpage.html', './pages/mainpage.html'), //заглкшка
    createPages('./src/pages/articles/article1.html', './pages/articles/article1.html'),
    createPages('./src/pages/articles/article2.html', './pages/articles/article2.html'),
    createPages('./src/pages/articles/article3.html', './pages/articles/article3.html'),
    createPages('./src/pages/guides/guid1.html', './pages/guides/guid1.html'),
    createPages('./src/pages/guides/guid2.html', './pages/guides/guid2.html'),
    createPages('./src/pages/guides/guide3.html', './pages/guides/guide3.html'),
    createPages('./src/pages/tests/test1.html', './pages/tests/test1.html')
]


module.exports = htmlPages

