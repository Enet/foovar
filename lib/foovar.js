'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _StylusExpression = require('./StylusExpression.js');

var _StylusExpression2 = _interopRequireDefault(_StylusExpression);

var _FoovarValue = require('./FoovarValue.js');

var _FoovarValue2 = _interopRequireDefault(_FoovarValue);

var _convertToPlainObject = require('./convertToPlainObject');

var _convertToPlainObject2 = _interopRequireDefault(_convertToPlainObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nibProperties = ['has-canvas', 'called-from', '-string', 'require-color', 'require-unit', 'require-string', 'radians-to-degrees', 'degrees-to-radians', 'remove-unit', 'percent-to-decimal', 'fade-out', 'fade-in', 'add-property-function', 'add-property', 'prefix-classes', '-apply-border-radius', 'border-radius', 'color-image', 'flex-version', '-flex-obsolete-direction', '-flex-obsolete-wrap', 'flex-direction', 'flex-wrap', 'flex-flow', 'flex-grow', 'flex-basis', 'flex-shrink', '-convert-justify', 'justify-content', 'align-content', '-convert-alignment', 'align-items', 'align-self', 'support-for-ie', 'vendor-prefixes', 'pos-in-stops', 'normalize-stops', 'join-stops', 'std-stop', 'linear-gradient', 'linear-gradient-image', 'iconic-stroke', 'normalize-base', 'normalize-html5', 'normalize-links', 'normalize-text', 'normalize-embed', 'normalize-groups', 'normalize-forms', 'normalize-tables', 'normalize-css', '-pos', 'global-reset', 'nested-reset', 'reset-box-model', 'reset-font', 'reset-body', 'reset-table', 'reset-table-cell', 'reset-html5', 'no-wrap', 'hide-text', 'replace-text', 'shadow-stroke', 'is-width', 'vendor-value', 'box-shadow', 'user-select', 'column-count', 'column-gap', 'column-rule', 'column-rule-color', 'column-rule-width', 'column-rule-style', 'column-width', 'column-span', 'column-fill', 'legacy-bg-values', 'background-clip', 'background-origin', 'background-size', 'transform-origin', 'transform-style', 'border-image', 'transition-property', 'transition-duration', 'transition-timing-function', 'transition-delay', 'backface-visibility', 'perspective-origin', 'text-size-adjust', 'box-sizing', 'box-orient', 'box-flex-group', 'box-ordinal-group', 'box-align', 'box-pack', 'box-direction', 'animation-name', 'animation-duration', 'animation-delay', 'animation-direction', 'animation-iteration-count', 'animation-timing-function', 'animation-play-state', 'animation-fill-mode', 'tab-size', 'overflow-scrolling', 'text-overflow', 'font-smoothing', 'input-placeholder', 'background-image', 'list-style', 'list-style-image', 'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black', 'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkgrey', 'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'greenyellow', 'grey', 'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightgrey', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple', 'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'transparent', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen', 'rebeccapurple', 'embedurl', 'vendors', 'abs', 'min', 'max', 'PI', 'sin', 'cos', 'ceil', 'floor', 'round', 'sum', 'avg', 'odd', 'even', 'light', 'dark', 'desaturate', 'saturate', 'darken', 'lighten', 'spin', 'mix', 'invert', 'complement', 'grayscale', 'tint', 'shade', 'last', 'keys', 'values', 'join', '$stylus_mixin_cache', 'cache', 'percentage', 'index', 'border', 'clearfix', 'display', 'order', 'flex', 'image', 'overflow', 'fixed', 'absolute', 'relative', 'whitespace', 'ellipsis', 'vendor', 'transform', 'transition', 'perspective', 'opacity', 'animation', 'hyphens', 'appearance', 'placeholder', 'background', 'cursor', 'size'];

module.exports = function foovarFuncFactory(globalOptions) {
  var _this = this;
  globalOptions = globalOptions || {};

  return function foovarFunc(outPath, options) {
    var _this2 = this;

    var TEST = process.env.BABEL_ENV === '__foovar_internal_test__';
    outPath = new _StylusExpression2.default(outPath).unwrap();
    if (outPath.constructorName !== 'String') {
      console.error('foovar outPath arg must be string');
      return;
    }
    outPath = outPath.val.trim();
    var fullPath = /^\//.test(outPath) ? outPath : _path2.default.resolve(process.cwd(), outPath);

    var localOptions = optionsResolver(options);
    var include = localOptions.include,
        exclude = localOptions.exclude,
        nib = localOptions.nib,
        silent = localOptions.silent,
        types = localOptions.types,
        noGeneratedLog = localOptions.noGeneratedLog,
        compress = localOptions.compress,
        plainObject = localOptions.plainObject,
        propertyCase = localOptions.propertyCase;


    var incReg = localOptions.hasOwnProperty('include') ? include && include.constructorName === 'String' && new RegExp(include.val) : globalOptions.include;
    var excReg = localOptions.hasOwnProperty('exclude') ? exclude && exclude.constructorName === 'String' && new RegExp(exclude.val) : globalOptions.exclude;
    var excNib = localOptions.hasOwnProperty('nib') ? nib && nib.val : globalOptions.nib;
    var isSilent = localOptions.hasOwnProperty('silent') ? silent && silent.val : globalOptions.silent;
    var typesPath = localOptions.hasOwnProperty('types') ? types && types.val : globalOptions.types;
    if (typesPath) {
      typesPath = /^\//.test(typesPath) ? typesPath : _path2.default.resolve(process.cwd(), typesPath);
    }
    var noGen = localOptions.hasOwnProperty('noGen') ? noGeneratedLog && noGeneratedLog.val : globalOptions.noGen;
    var comp = localOptions.hasOwnProperty('compress') ? compress && !!compress.val : !!globalOptions.compress;
    _FoovarValue2.default.case = localOptions.hasOwnProperty('propertyCase') ? propertyCase && propertyCase.val : globalOptions.propertyCase;

    var FoovarValueCase = _FoovarValue2.default.case && '\'' + _FoovarValue2.default.case + '\'';

    if (!localOptions.hasOwnProperty('plainObject')) {
      plainObject = { val: globalOptions.plainObject || null };
    }

    var plain = void 0;
    if (plainObject == null || plainObject.val == null) {
      plain = false;
    } else {
      switch (plainObject.val) {
        case 'css':
        case 'type':
        case 'tree':
          plain = '\'' + plainObject.val + '\'';
          break;
        default:
          plain = "'value'";
      }
    }

    _mkdirp2.default.sync(_path2.default.dirname(fullPath));
    var ignoreKeys = ['column', 'filename', 'lineno', 'mixin', 'preserve', 'property', 'quote', 'rest'];

    var replacer = function replacer(k, v) {
      return ~ignoreKeys.indexOf(k) ? void 0 : v;
    };
    var body = Object.keys(this.global.scope.locals).map(function (k) {
      return [k, _this2.global.scope.locals[k]];
    }).filter(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          k = _ref2[0],
          v = _ref2[1];

      if (v instanceof Function) return false;
      if (v && v.constructor && v.constructor.name === 'Function') return false;
      if (incReg && !incReg.test(k)) return false;
      if (excReg && excReg.test(k)) return false;
      if (excNib && nibProperties.indexOf(k) !== -1) return false;

      return true;
    }).map(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          k = _ref4[0],
          v = _ref4[1];

      var foovarValueStr = 'new F(new S(' + JSON.stringify(v, replacer, 0) + ',true),{case:' + FoovarValueCase + '})';
      if (plain) {
        foovarValueStr = 'p(' + foovarValueStr + ',{from:' + plain + '})';
      }
      return '\'' + _FoovarValue2.default.resolvePropertyKey(k) + '\':' + foovarValueStr.replace(/^(.+)$/gm, '$1');
    }).join(comp ? ',' : ',\n');

    var requirePathForFoovarValue = TEST ? '\'' + _path2.default.resolve(process.cwd(), 'src/FoovarValue.js') + '\'' : '\'foovar/lib/FoovarValue\'';
    var requirePathForStylusExpression = TEST ? '\'' + _path2.default.resolve(process.cwd(), 'src/StylusExpression.js') + '\'' : '\'foovar/lib/StylusExpression\'';
    var requirePathForConvertToPlainObject = TEST ? '\'' + _path2.default.resolve(process.cwd(), 'src/convertToPlainObject.js') + '\'' : '\'foovar/lib/convertToPlainObject\'';
    var requireConvertToPlainObject = plain ? 'var p=require(' + requirePathForConvertToPlainObject + ');' : '';
    var setPropertyCase = 'F.case=' + (FoovarValueCase || null);
    var codeStr = '(function(){var F=require(' + requirePathForFoovarValue + ');' + setPropertyCase + ';F.silent=' + !!isSilent + ';var S=require(' + requirePathForStylusExpression + ');' + requireConvertToPlainObject + 'module.exports={' + (comp ? '' : '\n') + body + '};})();';
    var typesStr = '';

    if (plain === '\'tree\'') {
      var execFn = new Function('require', 'module', codeStr);
      var m = {};
      var r = 0;
      execFn(function () {
        return [_FoovarValue2.default, _StylusExpression2.default, _convertToPlainObject2.default][r++];
      }, m);
      codeStr = 'export default ' + JSON.stringify(m.exports) + ';';

      if (typesPath) {
        var walk = function walk(value) {
          if (value === null) {
            typesStr += 'null, ';
          } else if (value === undefined) {
            typesStr += 'undefined, ';
          } else if (value instanceof Array) {
            typesStr += '[';
            value.forEach(function (item) {
              return walk(item);
            });
            if (value.length) {
              typesStr = typesStr.slice(0, -2);
            }
            typesStr += '], ';
          } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
            typesStr += '{';
            var removeComma = false;
            for (var v in value) {
              removeComma = true;
              typesStr += '"' + v + '": ';
              walk(value[v]);
            }
            if (removeComma) {
              typesStr = typesStr.slice(0, -2);
            }
            typesStr += '}, ';
          } else {
            typesStr += (typeof typesStr === 'undefined' ? 'undefined' : _typeof(typesStr)) + ', ';
          }
        };
        walk(m.exports);
        typesStr = ['type StylusScope = ' + typesStr.slice(0, -2) + ';', 'declare const stylusScope: StylusScope;', 'export default stylusScope;'].join('\n');
      }
    }

    if (typeof globalOptions.writeFile === 'function') {
      globalOptions.writeFile(fullPath, codeStr);
      typesPath && globalOptions.writeFile(typesPath, typesStr);
    } else {
      _fs2.default.writeFileSync(fullPath, codeStr, 'utf8');
      typesPath && _fs2.default.writeFileSync(typesPath, typesStr, 'utf8');
    }
    if (!noGen) {
      console.log('foovar: generated ' + fullPath);
    }
  };
};

function optionsResolver(options) {
  options = new _StylusExpression2.default(options || new this.renderer.nodes.Object()).unwrap();
  if (options.constructorName !== 'Object') {
    console.error('foovar options arg must be object');
    return {};
  }
  return Object.keys(options.vals).reduce(function (unwrapped, k) {
    unwrapped[k] = options.vals[k] && new _StylusExpression2.default(options.vals[k]).unwrap();
    return unwrapped;
  }, {});
}