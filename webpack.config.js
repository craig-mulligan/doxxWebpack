var path = require("path");
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

module.exports = {
    entry: {
      static: "./static.js"
    },
    output: {
      path: "dist",
      filename: "[name].js",
      libraryTarget: 'commonjs2'
    },
    resolve: {
      extensions: [ ".webpack.js", ".web.js", ".js", ".json", ".md"]
    },
    module: {
        loaders: [{
            test: /\.md$/,
            use: [
              {
                loader: 'handlebars-loader',
                query: {
                  partialDirs: [
                    path.join(__dirname, 'shared')
                  ],
                  extensions: [
                    ".handlebars", ".hbs", "", ".md"
                  ],
                  // debug: true
                }
              },
              "front-matter"
            ]
        }]
    },
    plugins: [
      new StaticSiteGeneratorPlugin({

        locals: {
          // Properties here are merged into `locals`
          // passed to the exported render function
          greet: 'Hello'
        }
      })
    ]
};
