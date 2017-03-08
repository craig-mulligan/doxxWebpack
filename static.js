const marked = require('marked');
const pick = require('lodash/pick');
const values = require('lodash/values')
const utils = require('./utils');

const req = require.context('./pages', true, /(md)$/);

const dicts = require("./config").dicts;
const routes = {}

req.keys().map((key) => {
  const instance = req(key)()
  if (instance.attributes.dynamic) {
    const dynamicVars = instance.attributes.dynamic.variables
    // only get dicts that are declared in front-matter
    const dynamicDict = pick(dicts, dynamicVars)
    // get all possible combinations of dicts
    const combos = utils.cartesian(values(dynamicDict))
    // generate page for every combo
    combos.map(a => {
      const context = utils.buildContext(a, dynamicVars)
      path = a.map(p => p.id).join('/')
      routes[path] = marked(instance.compile(context))
    })
  } else {
    routes[utils.fileName(key)] = marked(instance.compile())
  }
});

module.exports = function render(locals) {
  return Promise.resolve(routes);
};
