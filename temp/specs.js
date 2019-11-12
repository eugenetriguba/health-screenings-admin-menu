/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./temp/specs_entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./config/env_test.json":
/*!******************************!*\
  !*** ./config/env_test.json ***!
  \******************************/
/*! exports provided: name, description, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"test\",\"description\":\"Add here any environment specific stuff you like.\"}");

/***/ }),

/***/ "./src/hello_world/hello_world.js":
/*!****************************************!*\
  !*** ./src/hello_world/hello_world.js ***!
  \****************************************/
/*! exports provided: greet, bye */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "greet", function() { return greet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bye", function() { return bye; });
const greet = () => {
  return "Hello World!";
};
const bye = () => {
  return "See ya!";
};

/***/ }),

/***/ "./src/hello_world/hello_world.spec.js":
/*!*********************************************!*\
  !*** ./src/hello_world/hello_world.spec.js ***!
  \*********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var chai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chai */ "chai");
/* harmony import */ var chai__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chai__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hello_world__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hello_world */ "./src/hello_world/hello_world.js");
/* harmony import */ var env__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! env */ "./config/env_test.json");
var env__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! env */ "./config/env_test.json", 1);



describe("hello world", () => {
  it("greets", () => {
    Object(chai__WEBPACK_IMPORTED_MODULE_0__["expect"])(Object(_hello_world__WEBPACK_IMPORTED_MODULE_1__["greet"])()).to.equal("Hello World!");
  });
  it("says goodbye", () => {
    Object(chai__WEBPACK_IMPORTED_MODULE_0__["expect"])(Object(_hello_world__WEBPACK_IMPORTED_MODULE_1__["bye"])()).to.equal("See ya!");
  });
  it("should load test environment variables", () => {
    Object(chai__WEBPACK_IMPORTED_MODULE_0__["expect"])(env__WEBPACK_IMPORTED_MODULE_2__.name).to.equal("test");
    Object(chai__WEBPACK_IMPORTED_MODULE_0__["expect"])(env__WEBPACK_IMPORTED_MODULE_2__.description).to.equal("Add here any environment specific stuff you like.");
  });
  it("babel features should work", () => {
    const a = {
      a: 1
    };
    const b = { ...a,
      b: 2
    };
    Object(chai__WEBPACK_IMPORTED_MODULE_0__["expect"])(b).to.eql({
      a: 1,
      b: 2
    });
  });
});

/***/ }),

/***/ "./temp/specs_entry.js":
/*!*****************************!*\
  !*** ./temp/specs_entry.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_hello_world_hello_world_spec_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/hello_world/hello_world.spec.js */ "./src/hello_world/hello_world.spec.js");


/***/ }),

/***/ "chai":
/*!***********************!*\
  !*** external "chai" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("chai");

/***/ })

/******/ });
//# sourceMappingURL=specs.js.map