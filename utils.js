const transpose = m => m[0].map((x,i) => m.map(x => x[i]))

// http://stackoverflow.com/questions/15298912/javascript-generating-combinations-from-n-arrays-with-m-elements
const cartesian = (arg) => {
    var r = [], max = arg.length-1;
    function helper(arr, i) {
        for (var j=0, l=arg[i].length; j<l; j++) {
            var a = arr.slice(0); // clone arr
            a.push(arg[i][j]);
            if (i==max)
                r.push(a);
            else
                helper(a, i+1);
        }
    }
    helper([], 0);
    return r;
};

const buildContext = (dynamicVars, keys) => {
  return dynamicVars.reduce((acc, cur, i) => {
    acc[keys[i]] = cur;
    return acc;
  }, {});
}

const fileName = (path) => {
  // TODO fix this hacky fn
  const file = path.split("/").pop();
  return file.slice(0, -3);
}

module.exports = {
  transpose: transpose,
  cartesian: cartesian,
  buildContext: buildContext,
  fileName: fileName
}