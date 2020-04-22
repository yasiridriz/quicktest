module.exports = {
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            'handlebars-loader', // handlebars loader expects raw resource string
            'extract-loader',
            'css-loader',
          ],
        },
      ],
    },
  };