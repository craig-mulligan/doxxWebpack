const marked = require('marked');
const pick = require('lodash/pick');
const values = require('lodash/values')
const utils = require('./utils');

const req = require.context('./pages', true, /(md)$/);
const dicts = require("./config").dicts;

getRoutes = (locals) => {
  return (dicts) => {
    return req.keys().reduce((acc, key) => {
      const instance = req(key)()
      if (instance.attributes.dynamic) {
        if (dicts.lenght < 0) {
          throw new Error('You have set a dynamic without supplying dictionaries');
        }
        const dynamicVars = instance.attributes.dynamic.variables
        // only get dicts that are declared in front-matter
        const dynamicDict = pick(dicts, dynamicVars)
        // get all possible combinations of dicts
        const combos = utils.cartesian(values(dynamicDict))
        // generate page for every combo
        combos.map(a => {
          Object.assign(locals, utils.buildContext(a, dynamicVars))
          path = a.map(p => p.id).join('/')
          acc[path] = marked(instance.compile(locals))
        })
      } else {
        acc[utils.fileName(key)] = marked(instance.compile(locals))
      }
      return acc
    }, {});
  }
}


module.exports = function render(config) {
  return Promise.resolve(getRoutes(config.locals)(config.dicts));
};
