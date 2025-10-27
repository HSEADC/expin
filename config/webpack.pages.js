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
    createPages('./src/pages/articles/article4.html', './pages/articles/article4.html'),
    createPages('./src/pages/articles/article5.html', './pages/articles/article5.html'),
    createPages('./src/pages/articles/article6.html', './pages/articles/article6.html'),
    createPages('./src/pages/articles/article7.html', './pages/articles/article7.html'),
    createPages('./src/pages/articles/article8.html', './pages/articles/article8.html'),
    createPages('./src/pages/articles/article9.html', './pages/articles/article9.html'),
    createPages('./src/pages/articles/article10.html', './pages/articles/article10.html'),
    createPages('./src/pages/articles/article11.html', './pages/articles/article11.html'),
    createPages('./src/pages/articles/article12.html', './pages/articles/article12.html'),
    createPages('./src/pages/articles/article13.html', './pages/articles/article13.html'),
    createPages('./src/pages/articles/article14.html', './pages/articles/article14.html'),
    createPages('./src/pages/articles/article15.html', './pages/articles/article15.html'),
    createPages('./src/pages/articles/article16.html', './pages/articles/article16.html'),
    createPages('./src/pages/articles/article17.html', './pages/articles/article17.html'),
    createPages('./src/pages/articles/article18.html', './pages/articles/article18.html'),
    createPages('./src/pages/articles/article19.html', './pages/articles/article19.html'),
    createPages('./src/pages/articles/article20.html', './pages/articles/article20.html'),
    createPages('./src/pages/articles/article21.html', './pages/articles/article21.html'),
    createPages('./src/pages/articles/article22.html', './pages/articles/article22.html'),
    createPages('./src/pages/articles/article23.html', './pages/articles/article23.html'),
    createPages('./src/pages/articles/article24.html', './pages/articles/article24.html'),
    createPages('./src/pages/articles/article25.html', './pages/articles/article25.html'),
    createPages('./src/pages/articles/article26.html', './pages/articles/article26.html'),
    createPages('./src/pages/articles/article27.html', './pages/articles/article27.html'),
    createPages('./src/pages/guides/guid1.html', './pages/guides/guid1.html'),
    createPages('./src/pages/guides/guid2.html', './pages/guides/guid2.html'),
    createPages('./src/pages/guides/guid4.html', './pages/guides/guid4.html'),
    createPages('./src/pages/guides/guide3.html', './pages/guides/guide3.html'),
    createPages('./src/pages/tests/test1.html', './pages/tests/test1.html'),
    createPages('./src/pages/tests/test-quiz.html', './pages/tests/test-quiz.html'),
    createPages('./src/pages/styleguide.html', './pages/styleguide.html')
    
]


module.exports = htmlPages

