const foovarExports = function(globalOptions) {
  return function(stylus) {
    stylus.define('foovar', require('./foovar.js')(globalOptions));
  };
};

module.exports = foovarExports;
