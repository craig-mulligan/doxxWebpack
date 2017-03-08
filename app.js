const marked = require('marked');
const _ = require('lodash');
const req = require.context('./test', true, /(md)$/);
const utils = require('./utils');
const dicts = require("./config").dicts
const routes = {}

req.keys().map((key) => {
  const instance = req(key)()
  if (instance.attributes.dynamic) {
    const dynamicVars = instance.attributes.dynamic.variables
    // only get dicts that are declared in front-matter
    const dynamicDict = _.pick(dicts, dynamicVars)
    // get all possible combinations of dicts
    const combos = utils.cartesian(_.values(dynamicDict))
    // generate page for every combo
    combos.map(a => {
      const context = utils.buildContext(a, dynamicVars)
      path = a.map(p => p.id).join('/')
      routes[path] = marked(instance.fn(context))
    })
  } else {
    routes[utils.fileName(key)] = marked(instance.fn())
  }
});

module.exports = function render(locals) {
  return Promise.resolve(routes);
};
