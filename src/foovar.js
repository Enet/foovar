import path from 'path';
import mkdirp from 'mkdirp';
import fs from 'fs';
import StylusExpression from './StylusExpression.js';
import FoovarValue from './FoovarValue.js';
import convertToPlainObject from './convertToPlainObject';

const nibProperties = [
  'has-canvas', 'called-from', '-string', 'require-color', 'require-unit', 'require-string', 'radians-to-degrees',
  'degrees-to-radians', 'remove-unit', 'percent-to-decimal', 'fade-out', 'fade-in', 'add-property-function',
  'add-property', 'prefix-classes', '-apply-border-radius', 'border-radius', 'color-image', 'flex-version',
  '-flex-obsolete-direction', '-flex-obsolete-wrap', 'flex-direction', 'flex-wrap', 'flex-flow', 'flex-grow',
  'flex-basis', 'flex-shrink', '-convert-justify', 'justify-content', 'align-content', '-convert-alignment',
  'align-items', 'align-self', 'support-for-ie', 'vendor-prefixes', 'pos-in-stops', 'normalize-stops',
  'join-stops', 'std-stop', 'linear-gradient', 'linear-gradient-image', 'iconic-stroke', 'normalize-base',
  'normalize-html5', 'normalize-links', 'normalize-text', 'normalize-embed', 'normalize-groups', 'normalize-forms',
  'normalize-tables', 'normalize-css', '-pos', 'global-reset', 'nested-reset', 'reset-box-model', 'reset-font',
  'reset-body', 'reset-table', 'reset-table-cell', 'reset-html5', 'no-wrap', 'hide-text', 'replace-text',
  'shadow-stroke', 'is-width', 'vendor-value', 'box-shadow', 'user-select', 'column-count', 'column-gap',
  'column-rule', 'column-rule-color', 'column-rule-width', 'column-rule-style', 'column-width', 'column-span',
  'column-fill', 'legacy-bg-values', 'background-clip', 'background-origin', 'background-size', 'transform-origin',
  'transform-style', 'border-image', 'transition-property', 'transition-duration', 'transition-timing-function',
  'transition-delay', 'backface-visibility', 'perspective-origin', 'text-size-adjust', 'box-sizing',
  'box-orient', 'box-flex-group', 'box-ordinal-group', 'box-align', 'box-pack', 'box-direction', 'animation-name',
  'animation-duration', 'animation-delay', 'animation-direction', 'animation-iteration-count', 'animation-timing-function',
  'animation-play-state', 'animation-fill-mode', 'tab-size', 'overflow-scrolling', 'text-overflow',
  'font-smoothing', 'input-placeholder', 'background-image', 'list-style', 'list-style-image',
  'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black', 'blanchedalmond',
  'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue',
  'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkgrey',
  'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon',
  'darkseagreen', 'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet',
  'deeppink', 'deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen',
  'fuchsia', 'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'greenyellow', 'grey',
  'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen',
  'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgreen',
  'lightgrey', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey',
  'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine',
  'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen',
  'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite',
  'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen',
  'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue',
  'purple', 'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell',
  'sienna', 'silver', 'skyblue', 'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue',
  'tan', 'teal', 'thistle', 'tomato', 'transparent', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke',
  'yellow', 'yellowgreen', 'rebeccapurple', 'embedurl', 'vendors', 'abs', 'min', 'max', 'PI', 'sin',
  'cos', 'ceil', 'floor', 'round', 'sum', 'avg', 'odd', 'even', 'light', 'dark', 'desaturate', 'saturate',
  'darken', 'lighten', 'spin', 'mix', 'invert', 'complement', 'grayscale', 'tint', 'shade', 'last',
  'keys', 'values', 'join', '$stylus_mixin_cache', 'cache', 'percentage', 'index', 'border', 'clearfix',
  'display', 'order', 'flex', 'image', 'overflow', 'fixed', 'absolute', 'relative', 'whitespace', 'ellipsis',
  'vendor', 'transform', 'transition', 'perspective', 'opacity', 'animation', 'hyphens', 'appearance',
  'placeholder', 'background', 'cursor', 'size'
];

module.exports = function foovarFuncFactory(globalOptions) {
  var _this = this;
  globalOptions = globalOptions || {};

  return function foovarFunc(outPath, options) {
    const TEST = process.env.BABEL_ENV === '__foovar_internal_test__';
    outPath = new StylusExpression(outPath).unwrap();
    if (outPath.constructorName !== 'String') {
      console.error('foovar outPath arg must be string');
      return;
    }
    outPath = outPath.val.trim();
    const fullPath = /^\//.test(outPath) ? outPath : path.resolve(process.cwd(), outPath);

    var localOptions = optionsResolver(options);
    let { include, exclude, nib, noGeneratedLog, compress, plainObject, propertyCase } = localOptions;

    const incReg = localOptions.hasOwnProperty('include')
      ? include && include.constructorName === 'String' && new RegExp(include.val)
      : globalOptions.include;
    const excReg = localOptions.hasOwnProperty('exclude')
      ? exclude && exclude.constructorName === 'String' && new RegExp(exclude.val)
      : globalOptions.exclude;
    const excNib = localOptions.hasOwnProperty('nib')
      ? nib && nib.val
      : globalOptions.nib;
    const noGen = localOptions.hasOwnProperty('noGen')
      ? noGeneratedLog && noGeneratedLog.val
      : globalOptions.noGen;
    const comp = localOptions.hasOwnProperty('compress')
      ? compress && !!compress.val
      : !!globalOptions.compress;
    FoovarValue.case = localOptions.hasOwnProperty('propertyCase')
      ? propertyCase && propertyCase.val
      : globalOptions.propertyCase;

    const FoovarValueCase = FoovarValue.case && `'${ FoovarValue.case }'`;

    if (!localOptions.hasOwnProperty('plainObject')) {
      plainObject = {val: globalOptions.plainObject || null};
    }

    let plain;
    if (plainObject == null || plainObject.val == null) {
      plain = false;
    } else {
      switch (plainObject.val) {
      case 'css':
      case 'type':
      case 'tree':
        plain = `'${ plainObject.val }'`;
        break;
      default:
        plain = "'value'";
      }
    }

    mkdirp.sync(path.dirname(fullPath));
    const ignoreKeys = [
      'column',
      'filename',
      'lineno',
      'mixin',
      'preserve',
      'property',
      'quote',
      'rest',
    ];

    const replacer = (k, v) => {
      return ~ignoreKeys.indexOf(k) ? void 0 : v;
    };
    const body = Object.keys(this.global.scope.locals)
      .map(k => [k, this.global.scope.locals[k]])
      .filter(([k, v]) => {
        if (v instanceof Function) return false;
        if (v && v.constructor && v.constructor.name === 'Function') return false;
        if (incReg && !incReg.test(k)) return false;
        if (excReg && excReg.test(k)) return false;
        if (excNib && nibProperties.indexOf(k) !== -1) return false;

        return true;
      })
      .map(([k, v]) => {
        let foovarValueStr = `new F(new S(${ JSON.stringify(v, replacer, 0) },true),{case:${ FoovarValueCase }})`;
        if (plain) {
          foovarValueStr = `p(${ foovarValueStr },{from:${ plain }})`;
        }
        return `'${ FoovarValue.resolvePropertyKey(k) }':${ foovarValueStr.replace(/^(.+)$/gm , '$1')}`;
      })
      .join(comp ? ',' : ',\n');

    const requirePathForFoovarValue = TEST ? `'${ path.resolve(process.cwd(), 'src/FoovarValue.js') }'` : '\'foovar/lib/FoovarValue\'';
    const requirePathForStylusExpression = TEST ? `'${ path.resolve(process.cwd(), 'src/StylusExpression.js') }'` : '\'foovar/lib/StylusExpression\'';
    const requirePathForConvertToPlainObject = TEST ? `'${ path.resolve(process.cwd(), 'src/convertToPlainObject.js') }'` : '\'foovar/lib/convertToPlainObject\'';
    const requireConvertToPlainObject = plain ? `var p=require(${requirePathForConvertToPlainObject});` : '';
    const setPropertyCase = `F.case=${FoovarValueCase || null};`;
    let codeStr = `(function(){var F=require(${requirePathForFoovarValue});${setPropertyCase}var S=require(${requirePathForStylusExpression});${requireConvertToPlainObject}module.exports={${ comp ? '' : '\n' }${ body }};})();`;

    if (plain === `'tree'`) {
      const execFn = new Function('require', 'module', codeStr);
      const m = {};
      let r = 0;
      execFn(function () {
        return [FoovarValue, StylusExpression, convertToPlainObject][r++];
      }, m);
      codeStr = JSON.stringify(m.exports);
    }


    if (typeof globalOptions.writeFile === 'function') {
      globalOptions.writeFile(fullPath, codeStr);
    } else {
      fs.writeFileSync(fullPath, codeStr, 'utf8');
    }
    if (!noGen) { console.log(`foovar: generated ${ fullPath }`); }
  };
};

function optionsResolver(options) {
  options = new StylusExpression(options || new this.renderer.nodes.Object()).unwrap();
  if (options.constructorName !== 'Object') {
    console.error('foovar options arg must be object');
    return {};
  }
  return Object.keys(options.vals).reduce((unwrapped, k) => {
    unwrapped[k] = options.vals[k] && new StylusExpression(options.vals[k]).unwrap();
    return unwrapped;
  }, {});
}
