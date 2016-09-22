'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _StylusExpression = require('./StylusExpression.js');

var _StylusExpression2 = _interopRequireDefault(_StylusExpression);

var _case = require('case');

var _case2 = _interopRequireDefault(_case);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FoovarValue = function () {
  function FoovarValue(stylusExpression) {
    _classCallCheck(this, FoovarValue);

    var fn = function fn() {
      return fn.value;
    };

    fn.exp = stylusExpression;
    var foovarProto = Object.getPrototypeOf(this);
    Object.setPrototypeOf(foovarProto, Object.getPrototypeOf(fn));
    Object.setPrototypeOf(fn, foovarProto);
    return fn;
  }

  _createClass(FoovarValue, [{
    key: 'value',
    get: function get() {
      var _this = this;

      var exp = this.exp.unwrap();
      if (exp.isUnary()) {
        return this.constructor.resolveValue(exp);
      } else {
        return exp.nodes.map(function (raw) {
          return new _this.constructor(new _StylusExpression2.default(raw, exp.fromJson).unwrap());
        });
      }
    }
  }, {
    key: 'type',
    get: function get() {
      var exp = this.exp.unwrap();
      if (exp.isUnary()) {
        return this.constructor.resolveType(exp);
      } else {
        return exp.isList ? 'list' : 'tuple';
      }
    }
  }, {
    key: 'css',
    get: function get() {
      var exp = this.exp.unwrap();
      if (exp.isUnary()) {
        return this.constructor.genCss(exp);
      } else {
        return void 0;
      }
    }
  }], [{
    key: 'genCss',
    value: function genCss(exp) {
      switch (exp.constructorName) {
        case 'Unit':
          return this.genUnitCss(exp);
        case 'String':
          return this.genStringCss(exp);
        case 'RGBA':
          return this.genRgbaCss(exp);
        case 'HSLA':
          return this.genHslaCss(exp);
        case 'Call':
          switch (exp.name) {
            case 'cubic-bezier':
              return this.genCubicBezierCss(exp);
            default:
              console.error('Can\'t generate CSS string: stylus.nodes.Call ' + exp.name);
              return;
          }
        case 'Object':
          return void 0;
        default:
          console.error('Can\'t generate CSS string: ' + exp.constructorName);
      }
    }
  }, {
    key: 'genUnitCss',
    value: function genUnitCss(exp) {
      return '' + exp.val + exp.type;
    }
  }, {
    key: 'genStringCss',
    value: function genStringCss(exp) {
      return exp.val;
    }
  }, {
    key: 'genRgbaCss',
    value: function genRgbaCss(exp) {
      if (exp.raw) {
        return exp.raw;
      } else {
        var vals = this.resolveValue(exp);
        return 'rgba(' + vals.join(',') + ')';
      }
    }
  }, {
    key: 'genHslaCss',
    value: function genHslaCss(exp) {
      var vals = this.resolveValue(exp);
      var units = ['', '%', '%', ''];
      return 'hsla(' + vals.map(function (v, i) {
        return v + units[i];
      }).join(',') + ')';
    }
  }, {
    key: 'genCubicBezierCss',
    value: function genCubicBezierCss(exp) {
      return 'cubic-bezier(' + this.resolveValue(exp).join(',') + ')';
    }
  }, {
    key: 'resolveType',
    value: function resolveType(exp) {
      switch (exp.constructorName) {
        case 'Unit':
          return exp.type || void 0;
        case 'String':
          return 'string';
        case 'RGBA':
          return 'rgba';
        case 'HSLA':
          return 'hsla';
        case 'Object':
          return 'hash';
        case 'Call':
          switch (exp.name) {
            case 'cubic-bezier':
              return exp.name;
            default:
              console.error('Can\'t resolve type: stylus.nodes.Call ' + exp.name);
              return;
          }
        default:
          console.error('Can\'t resolve type: ' + exp.constructorName);
      }
    }
  }, {
    key: 'resolveValue',
    value: function resolveValue(exp) {
      switch (exp.constructorName) {
        case 'Unit':
        case 'String':
          return exp.val;
        case 'RGBA':
          return this.resolveRgbaValue(exp);
        case 'HSLA':
          return this.resolveHslaValue(exp);
        case 'Object':
          return this.resolveObjectValue(exp);
        case 'Call':
          switch (exp.name) {
            case 'cubic-bezier':
              return this.resolveCubicBezireValue(exp);
            default:
              console.error('Can\'t resolve value: stylus.nodes.Call ' + this.name);
              return;
          }
        default:
          console.error('Can\'t resolve value: ' + exp.constructorName);
      }
    }
  }, {
    key: 'resolveRgbaValue',
    value: function resolveRgbaValue(exp) {
      var r = exp.r;
      var g = exp.g;
      var b = exp.b;
      var a = exp.a;

      return [r, g, b, a];
    }
  }, {
    key: 'resolveHslaValue',
    value: function resolveHslaValue(exp) {
      var h = exp.h;
      var s = exp.s;
      var l = exp.l;
      var a = exp.a;

      return [h, s, l, a];
    }
  }, {
    key: 'resolveObjectValue',
    value: function resolveObjectValue(exp) {
      var _this2 = this;

      return Object.entries(exp.vals).reduce(function (o, _ref) {
        var _ref2 = _slicedToArray(_ref, 2);

        var k = _ref2[0];
        var v = _ref2[1];

        o[_case2.default.camel(k)] = new _this2(new _StylusExpression2.default(v, exp.fromJson));
        return o;
      }, {});
    }
  }, {
    key: 'resolveCubicBezireValue',
    value: function resolveCubicBezireValue(exp) {
      var _this3 = this;

      return exp.args.nodes.map(function (raw) {
        return new _this3(new _StylusExpression2.default(raw, exp.fromJson).unwrap())();
      });
    }
  }]);

  return FoovarValue;
}();

exports.default = FoovarValue;