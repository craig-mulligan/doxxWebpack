const webpack = require("webpack");
const config = require("./webpack.config.js");
const hb = require("handlebars/runtime");
var helpers = require('handlebars-helpers')({
  handlebars: hb
});

webpack(config, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.log(err)
  }
  console.log("done")
});
