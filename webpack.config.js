var path = require("path");
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

module.exports = {
    entry: "./app.js",
    output: {
      path: "dist",
      filename: "bundle.js",
      libraryTarget: 'umd'
    },
    node: {
      fs: "empty"
    },
    resolve: {
      alias: {
        'hb' : './node_modules/handlebars/runtime.js'
      },
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
                    ""," .md"
                  ],
                  debug: true,
                  compat: true
                }
              },
              'frontmatter-loader'
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
