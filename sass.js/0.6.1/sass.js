/*! sass.js - v0.6.1 - libsass v3.1.0 - 2015-01-05 */
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Sass = factory();
  }
}(this, function () {// Note: Some Emscripten settings will significantly limit the speed of the generated code.
// Note: Some Emscripten settings may limit the speed of the generated code.
// The Module object: Our interface to the outside world. We import
// and export values on it, and do the work to get that through
// closure compiler if necessary. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(Module) { ..generated code.. }
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to do an eval in order to handle the closure compiler
// case, where this code here is minified but Module was defined
// elsewhere (e.g. case 4 above). We also need to check if Module
// already exists (e.g. case 3 above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module;
if (!Module) Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');
// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = {};
for (var key in Module) {
  if (Module.hasOwnProperty(key)) {
    moduleOverrides[key] = Module[key];
  }
}
// The environment setup code below is customized to use Module.
// *** Environment setup code ***
var ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof require === 'function';
var ENVIRONMENT_IS_WEB = typeof window === 'object';
var ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
if (ENVIRONMENT_IS_NODE) {
  // Expose functionality in the same simple way that the shells work
  // Note that we pollute the global namespace here, otherwise we break in node
  Module['print'] = function print(x) {
    process['stdout'].write(x + '\n');
  };
  Module['printErr'] = function printErr(x) {
    process['stderr'].write(x + '\n');
  };
  var nodeFS = require('fs');
  var nodePath = require('path');
  Module['read'] = function read(filename, binary) {
    filename = nodePath['normalize'](filename);
    var ret = nodeFS['readFileSync'](filename);
    // The path is absolute if the normalized version is the same as the resolved.
    if (!ret && filename != nodePath['resolve'](filename)) {
      filename = path.join(__dirname, '..', 'src', filename);
      ret = nodeFS['readFileSync'](filename);
    }
    if (ret && !binary) ret = ret.toString();
    return ret;
  };
  Module['readBinary'] = function readBinary(filename) { return Module['read'](filename, true) };
  Module['load'] = function load(f) {
    globalEval(read(f));
  };
  Module['arguments'] = process['argv'].slice(2);
  
}
else if (ENVIRONMENT_IS_SHELL) {
  Module['print'] = print;
  if (typeof printErr != 'undefined') Module['printErr'] = printErr; // not present in v8 or older sm
  if (typeof read != 'undefined') {
    Module['read'] = read;
  } else {
    Module['read'] = function read() { throw 'no read() available (jsc?)' };
  }
  Module['readBinary'] = function readBinary(f) {
    return read(f, 'binary');
  };
  if (typeof scriptArgs != 'undefined') {
    Module['arguments'] = scriptArgs;
  } else if (typeof arguments != 'undefined') {
    Module['arguments'] = arguments;
  }
  this['Module'] = Module;
  eval("if (typeof gc === 'function' && gc.toString().indexOf('[native code]') > 0) var gc = undefined"); // wipe out the SpiderMonkey shell 'gc' function, which can confuse closure (uses it as a minified name, and it is then initted to a non-falsey value unexpectedly)
}
else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  Module['read'] = function read(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
  };
  if (typeof arguments != 'undefined') {
    Module['arguments'] = arguments;
  }
  if (typeof console !== 'undefined') {
    Module['print'] = function print(x) {
      console.log(x);
    };
    Module['printErr'] = function printErr(x) {
      console.log(x);
    };
  } else {
    // Probably a worker, and without console.log. We can do very little here...
    var TRY_USE_DUMP = false;
    Module['print'] = (TRY_USE_DUMP && (typeof(dump) !== "undefined") ? (function(x) {
      dump(x);
    }) : (function(x) {
      // self.postMessage(x); // enable this if you want stdout to be sent as messages
    }));
  }
  if (ENVIRONMENT_IS_WEB) {
    this['Module'] = Module;
  } else {
    Module['load'] = importScripts;
  }
}
else {
  // Unreachable because SHELL is dependant on the others
  throw 'Unknown runtime environment. Where are we?';
}
function globalEval(x) {
  eval.call(null, x);
}
if (!Module['load'] == 'undefined' && Module['read']) {
  Module['load'] = function load(f) {
    globalEval(Module['read'](f));
  };
}
if (!Module['print']) {
  Module['print'] = function(){};
}
if (!Module['printErr']) {
  Module['printErr'] = Module['print'];
}
if (!Module['arguments']) {
  Module['arguments'] = [];
}
// *** Environment setup code ***
// Closure helpers
Module.print = Module['print'];
Module.printErr = Module['printErr'];
// Callbacks
Module['preRun'] = [];
Module['postRun'] = [];
// Merge back in the overrides
for (var key in moduleOverrides) {
  if (moduleOverrides.hasOwnProperty(key)) {
    Module[key] = moduleOverrides[key];
  }
}
// === Auto-generated preamble library stuff ===
//========================================
// Runtime code shared with compiler
//========================================
var Runtime = {
  stackSave: function () {
    return STACKTOP;
  },
  stackRestore: function (stackTop) {
    STACKTOP = stackTop;
  },
  forceAlign: function (target, quantum) {
    quantum = quantum || 4;
    if (quantum == 1) return target;
    if (isNumber(target) && isNumber(quantum)) {
      return Math.ceil(target/quantum)*quantum;
    } else if (isNumber(quantum) && isPowerOfTwo(quantum)) {
      return '(((' +target + ')+' + (quantum-1) + ')&' + -quantum + ')';
    }
    return 'Math.ceil((' + target + ')/' + quantum + ')*' + quantum;
  },
  isNumberType: function (type) {
    return type in Runtime.INT_TYPES || type in Runtime.FLOAT_TYPES;
  },
  isPointerType: function isPointerType(type) {
  return type[type.length-1] == '*';
},
  isStructType: function isStructType(type) {
  if (isPointerType(type)) return false;
  if (isArrayType(type)) return true;
  if (/<?{ ?[^}]* ?}>?/.test(type)) return true; // { i32, i8 } etc. - anonymous struct types
  // See comment in isStructPointerType()
  return type[0] == '%';
},
  INT_TYPES: {"i1":0,"i8":0,"i16":0,"i32":0,"i64":0},
  FLOAT_TYPES: {"float":0,"double":0},
  or64: function (x, y) {
    var l = (x | 0) | (y | 0);
    var h = (Math.round(x / 4294967296) | Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  and64: function (x, y) {
    var l = (x | 0) & (y | 0);
    var h = (Math.round(x / 4294967296) & Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  xor64: function (x, y) {
    var l = (x | 0) ^ (y | 0);
    var h = (Math.round(x / 4294967296) ^ Math.round(y / 4294967296)) * 4294967296;
    return l + h;
  },
  getNativeTypeSize: function (type) {
    switch (type) {
      case 'i1': case 'i8': return 1;
      case 'i16': return 2;
      case 'i32': return 4;
      case 'i64': return 8;
      case 'float': return 4;
      case 'double': return 8;
      default: {
        if (type[type.length-1] === '*') {
          return Runtime.QUANTUM_SIZE; // A pointer
        } else if (type[0] === 'i') {
          var bits = parseInt(type.substr(1));
          assert(bits % 8 === 0);
          return bits/8;
        } else {
          return 0;
        }
      }
    }
  },
  getNativeFieldSize: function (type) {
    return Math.max(Runtime.getNativeTypeSize(type), Runtime.QUANTUM_SIZE);
  },
  dedup: function dedup(items, ident) {
  var seen = {};
  if (ident) {
    return items.filter(function(item) {
      if (seen[item[ident]]) return false;
      seen[item[ident]] = true;
      return true;
    });
  } else {
    return items.filter(function(item) {
      if (seen[item]) return false;
      seen[item] = true;
      return true;
    });
  }
},
  set: function set() {
  var args = typeof arguments[0] === 'object' ? arguments[0] : arguments;
  var ret = {};
  for (var i = 0; i < args.length; i++) {
    ret[args[i]] = 0;
  }
  return ret;
},
  STACK_ALIGN: 8,
  getAlignSize: function (type, size, vararg) {
    // we align i64s and doubles on 64-bit boundaries, unlike x86
    if (vararg) return 8;
    if (!vararg && (type == 'i64' || type == 'double')) return 8;
    if (!type) return Math.min(size, 8); // align structures internally to 64 bits
    return Math.min(size || (type ? Runtime.getNativeFieldSize(type) : 0), Runtime.QUANTUM_SIZE);
  },
  calculateStructAlignment: function calculateStructAlignment(type) {
    type.flatSize = 0;
    type.alignSize = 0;
    var diffs = [];
    var prev = -1;
    var index = 0;
    type.flatIndexes = type.fields.map(function(field) {
      index++;
      var size, alignSize;
      if (Runtime.isNumberType(field) || Runtime.isPointerType(field)) {
        size = Runtime.getNativeTypeSize(field); // pack char; char; in structs, also char[X]s.
        alignSize = Runtime.getAlignSize(field, size);
      } else if (Runtime.isStructType(field)) {
        if (field[1] === '0') {
          // this is [0 x something]. When inside another structure like here, it must be at the end,
          // and it adds no size
          // XXX this happens in java-nbody for example... assert(index === type.fields.length, 'zero-length in the middle!');
          size = 0;
          if (Types.types[field]) {
            alignSize = Runtime.getAlignSize(null, Types.types[field].alignSize);
          } else {
            alignSize = type.alignSize || QUANTUM_SIZE;
          }
        } else {
          size = Types.types[field].flatSize;
          alignSize = Runtime.getAlignSize(null, Types.types[field].alignSize);
        }
      } else if (field[0] == 'b') {
        // bN, large number field, like a [N x i8]
        size = field.substr(1)|0;
        alignSize = 1;
      } else if (field[0] === '<') {
        // vector type
        size = alignSize = Types.types[field].flatSize; // fully aligned
      } else if (field[0] === 'i') {
        // illegal integer field, that could not be legalized because it is an internal structure field
        // it is ok to have such fields, if we just use them as markers of field size and nothing more complex
        size = alignSize = parseInt(field.substr(1))/8;
        assert(size % 1 === 0, 'cannot handle non-byte-size field ' + field);
      } else {
        assert(false, 'invalid type for calculateStructAlignment');
      }
      if (type.packed) alignSize = 1;
      type.alignSize = Math.max(type.alignSize, alignSize);
      var curr = Runtime.alignMemory(type.flatSize, alignSize); // if necessary, place this on aligned memory
      type.flatSize = curr + size;
      if (prev >= 0) {
        diffs.push(curr-prev);
      }
      prev = curr;
      return curr;
    });
    if (type.name_ && type.name_[0] === '[') {
      // arrays have 2 elements, so we get the proper difference. then we scale here. that way we avoid
      // allocating a potentially huge array for [999999 x i8] etc.
      type.flatSize = parseInt(type.name_.substr(1))*type.flatSize/2;
    }
    type.flatSize = Runtime.alignMemory(type.flatSize, type.alignSize);
    if (diffs.length == 0) {
      type.flatFactor = type.flatSize;
    } else if (Runtime.dedup(diffs).length == 1) {
      type.flatFactor = diffs[0];
    }
    type.needsFlattening = (type.flatFactor != 1);
    return type.flatIndexes;
  },
  generateStructInfo: function (struct, typeName, offset) {
    var type, alignment;
    if (typeName) {
      offset = offset || 0;
      type = (typeof Types === 'undefined' ? Runtime.typeInfo : Types.types)[typeName];
      if (!type) return null;
      if (type.fields.length != struct.length) {
        printErr('Number of named fields must match the type for ' + typeName + ': possibly duplicate struct names. Cannot return structInfo');
        return null;
      }
      alignment = type.flatIndexes;
    } else {
      var type = { fields: struct.map(function(item) { return item[0] }) };
      alignment = Runtime.calculateStructAlignment(type);
    }
    var ret = {
      __size__: type.flatSize
    };
    if (typeName) {
      struct.forEach(function(item, i) {
        if (typeof item === 'string') {
          ret[item] = alignment[i] + offset;
        } else {
          // embedded struct
          var key;
          for (var k in item) key = k;
          ret[key] = Runtime.generateStructInfo(item[key], type.fields[i], alignment[i]);
        }
      });
    } else {
      struct.forEach(function(item, i) {
        ret[item[1]] = alignment[i];
      });
    }
    return ret;
  },
  dynCall: function (sig, ptr, args) {
    if (args && args.length) {
      if (!args.splice) args = Array.prototype.slice.call(args);
      args.splice(0, 0, ptr);
      return Module['dynCall_' + sig].apply(null, args);
    } else {
      return Module['dynCall_' + sig].call(null, ptr);
    }
  },
  functionPointers: [],
  addFunction: function (func) {
    for (var i = 0; i < Runtime.functionPointers.length; i++) {
      if (!Runtime.functionPointers[i]) {
        Runtime.functionPointers[i] = func;
        return 2*(1 + i);
      }
    }
    throw 'Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.';
  },
  removeFunction: function (index) {
    Runtime.functionPointers[(index-2)/2] = null;
  },
  getAsmConst: function (code, numArgs) {
    // code is a constant string on the heap, so we can cache these
    if (!Runtime.asmConstCache) Runtime.asmConstCache = {};
    var func = Runtime.asmConstCache[code];
    if (func) return func;
    var args = [];
    for (var i = 0; i < numArgs; i++) {
      args.push(String.fromCharCode(36) + i); // $0, $1 etc
    }
    return Runtime.asmConstCache[code] = eval('(function(' + args.join(',') + '){ ' + Pointer_stringify(code) + ' })'); // new Function does not allow upvars in node
  },
  warnOnce: function (text) {
    if (!Runtime.warnOnce.shown) Runtime.warnOnce.shown = {};
    if (!Runtime.warnOnce.shown[text]) {
      Runtime.warnOnce.shown[text] = 1;
      Module.printErr(text);
    }
  },
  funcWrappers: {},
  getFuncWrapper: function (func, sig) {
    assert(sig);
    if (!Runtime.funcWrappers[func]) {
      Runtime.funcWrappers[func] = function dynCall_wrapper() {
        return Runtime.dynCall(sig, func, arguments);
      };
    }
    return Runtime.funcWrappers[func];
  },
  UTF8Processor: function () {
    var buffer = [];
    var needed = 0;
    this.processCChar = function (code) {
      code = code & 0xFF;
      if (buffer.length == 0) {
        if ((code & 0x80) == 0x00) {        // 0xxxxxxx
          return String.fromCharCode(code);
        }
        buffer.push(code);
        if ((code & 0xE0) == 0xC0) {        // 110xxxxx
          needed = 1;
        } else if ((code & 0xF0) == 0xE0) { // 1110xxxx
          needed = 2;
        } else {                            // 11110xxx
          needed = 3;
        }
        return '';
      }
      if (needed) {
        buffer.push(code);
        needed--;
        if (needed > 0) return '';
      }
      var c1 = buffer[0];
      var c2 = buffer[1];
      var c3 = buffer[2];
      var c4 = buffer[3];
      var ret;
      if (buffer.length == 2) {
        ret = String.fromCharCode(((c1 & 0x1F) << 6)  | (c2 & 0x3F));
      } else if (buffer.length == 3) {
        ret = String.fromCharCode(((c1 & 0x0F) << 12) | ((c2 & 0x3F) << 6)  | (c3 & 0x3F));
      } else {
        // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        var codePoint = ((c1 & 0x07) << 18) | ((c2 & 0x3F) << 12) |
                        ((c3 & 0x3F) << 6)  | (c4 & 0x3F);
        ret = String.fromCharCode(
          Math.floor((codePoint - 0x10000) / 0x400) + 0xD800,
          (codePoint - 0x10000) % 0x400 + 0xDC00);
      }
      buffer.length = 0;
      return ret;
    }
    this.processJSString = function processJSString(string) {
      string = unescape(encodeURIComponent(string));
      var ret = [];
      for (var i = 0; i < string.length; i++) {
        ret.push(string.charCodeAt(i));
      }
      return ret;
    }
  },
  stackAlloc: function (size) { var ret = STACKTOP;STACKTOP = (STACKTOP + size)|0;STACKTOP = (((STACKTOP)+7)&-8); return ret; },
  staticAlloc: function (size) { var ret = STATICTOP;STATICTOP = (STATICTOP + size)|0;STATICTOP = (((STATICTOP)+7)&-8); return ret; },
  dynamicAlloc: function (size) { var ret = DYNAMICTOP;DYNAMICTOP = (DYNAMICTOP + size)|0;DYNAMICTOP = (((DYNAMICTOP)+7)&-8); if (DYNAMICTOP >= TOTAL_MEMORY) enlargeMemory();; return ret; },
  alignMemory: function (size,quantum) { var ret = size = Math.ceil((size)/(quantum ? quantum : 8))*(quantum ? quantum : 8); return ret; },
  makeBigInt: function (low,high,unsigned) { var ret = (unsigned ? ((+((low>>>0)))+((+((high>>>0)))*(+4294967296))) : ((+((low>>>0)))+((+((high|0)))*(+4294967296)))); return ret; },
  GLOBAL_BASE: 8,
  QUANTUM_SIZE: 4,
  __dummy__: 0
}
//========================================
// Runtime essentials
//========================================
var __THREW__ = 0; // Used in checking for thrown exceptions.
var ABORT = false; // whether we are quitting the application. no code should run after this. set in exit() and abort()
var EXITSTATUS = 0;
var undef = 0;
// tempInt is used for 32-bit signed values or smaller. tempBigInt is used
// for 32-bit unsigned values or more than 32 bits. TODO: audit all uses of tempInt
var tempValue, tempInt, tempBigInt, tempInt2, tempBigInt2, tempPair, tempBigIntI, tempBigIntR, tempBigIntS, tempBigIntP, tempBigIntD, tempDouble, tempFloat;
var tempI64, tempI64b;
var tempRet0, tempRet1, tempRet2, tempRet3, tempRet4, tempRet5, tempRet6, tempRet7, tempRet8, tempRet9;
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed: ' + text);
  }
}
var globalScope = this;
// C calling interface. A convenient way to call C functions (in C files, or
// defined with extern "C").
//
// Note: LLVM optimizations can inline and remove functions, after which you will not be
//       able to call them. Closure can also do so. To avoid that, add your function to
//       the exports using something like
//
//         -s EXPORTED_FUNCTIONS='["_main", "_myfunc"]'
//
// @param ident      The name of the C function (note that C++ functions will be name-mangled - use extern "C")
// @param returnType The return type of the function, one of the JS types 'number', 'string' or 'array' (use 'number' for any C pointer, and
//                   'array' for JavaScript arrays and typed arrays; note that arrays are 8-bit).
// @param argTypes   An array of the types of arguments for the function (if there are no arguments, this can be ommitted). Types are as in returnType,
//                   except that 'array' is not possible (there is no way for us to know the length of the array)
// @param args       An array of the arguments to the function, as native JS values (as in returnType)
//                   Note that string arguments will be stored on the stack (the JS string will become a C string on the stack).
// @return           The return value, as a native JS value (as in returnType)
function ccall(ident, returnType, argTypes, args) {
  return ccallFunc(getCFunc(ident), returnType, argTypes, args);
}
Module["ccall"] = ccall;
// Returns the C function with a specified identifier (for C++, you need to do manual name mangling)
function getCFunc(ident) {
  try {
    var func = Module['_' + ident]; // closure exported function
    if (!func) func = eval('_' + ident); // explicit lookup
  } catch(e) {
  }
  assert(func, 'Cannot call unknown function ' + ident + ' (perhaps LLVM optimizations or closure removed it?)');
  return func;
}
// Internal function that does a C call using a function, not an identifier
function ccallFunc(func, returnType, argTypes, args) {
  var stack = 0;
  function toC(value, type) {
    if (type == 'string') {
      if (value === null || value === undefined || value === 0) return 0; // null string
      value = intArrayFromString(value);
      type = 'array';
    }
    if (type == 'array') {
      if (!stack) stack = Runtime.stackSave();
      var ret = Runtime.stackAlloc(value.length);
      writeArrayToMemory(value, ret);
      return ret;
    }
    return value;
  }
  function fromC(value, type) {
    if (type == 'string') {
      return Pointer_stringify(value);
    }
    assert(type != 'array');
    return value;
  }
  var i = 0;
  var cArgs = args ? args.map(function(arg) {
    return toC(arg, argTypes[i++]);
  }) : [];
  var ret = fromC(func.apply(null, cArgs), returnType);
  if (stack) Runtime.stackRestore(stack);
  return ret;
}
// Returns a native JS wrapper for a C function. This is similar to ccall, but
// returns a function you can call repeatedly in a normal way. For example:
//
//   var my_function = cwrap('my_c_function', 'number', ['number', 'number']);
//   alert(my_function(5, 22));
//   alert(my_function(99, 12));
//
function cwrap(ident, returnType, argTypes) {
  var func = getCFunc(ident);
  return function() {
    return ccallFunc(func, returnType, argTypes, Array.prototype.slice.call(arguments));
  }
}
Module["cwrap"] = cwrap;
// Sets a value in memory in a dynamic way at run-time. Uses the
// type data. This is the same as makeSetValue, except that
// makeSetValue is done at compile-time and generates the needed
// code then, whereas this function picks the right code at
// run-time.
// Note that setValue and getValue only do *aligned* writes and reads!
// Note that ccall uses JS types as for defining types, while setValue and
// getValue need LLVM types ('i8', 'i32') - this is a lower-level operation
function setValue(ptr, value, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': HEAP8[(ptr)]=value; break;
      case 'i8': HEAP8[(ptr)]=value; break;
      case 'i16': HEAP16[((ptr)>>1)]=value; break;
      case 'i32': HEAP32[((ptr)>>2)]=value; break;
      case 'i64': (tempI64 = [value>>>0,(tempDouble=value,(+(Math_abs(tempDouble))) >= (+1) ? (tempDouble > (+0) ? ((Math_min((+(Math_floor((tempDouble)/(+4294967296)))), (+4294967295)))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/(+4294967296))))))>>>0) : 0)],HEAP32[((ptr)>>2)]=tempI64[0],HEAP32[(((ptr)+(4))>>2)]=tempI64[1]); break;
      case 'float': HEAPF32[((ptr)>>2)]=value; break;
      case 'double': HEAPF64[((ptr)>>3)]=value; break;
      default: abort('invalid type for setValue: ' + type);
    }
}
Module['setValue'] = setValue;
// Parallel to setValue.
function getValue(ptr, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': return HEAP8[(ptr)];
      case 'i8': return HEAP8[(ptr)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP32[((ptr)>>2)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      default: abort('invalid type for setValue: ' + type);
    }
  return null;
}
Module['getValue'] = getValue;
var ALLOC_NORMAL = 0; // Tries to use _malloc()
var ALLOC_STACK = 1; // Lives for the duration of the current function call
var ALLOC_STATIC = 2; // Cannot be freed
var ALLOC_DYNAMIC = 3; // Cannot be freed except through sbrk
var ALLOC_NONE = 4; // Do not allocate
Module['ALLOC_NORMAL'] = ALLOC_NORMAL;
Module['ALLOC_STACK'] = ALLOC_STACK;
Module['ALLOC_STATIC'] = ALLOC_STATIC;
Module['ALLOC_DYNAMIC'] = ALLOC_DYNAMIC;
Module['ALLOC_NONE'] = ALLOC_NONE;
// allocate(): This is for internal use. You can use it yourself as well, but the interface
//             is a little tricky (see docs right below). The reason is that it is optimized
//             for multiple syntaxes to save space in generated code. So you should
//             normally not use allocate(), and instead allocate memory using _malloc(),
//             initialize it with setValue(), and so forth.
// @slab: An array of data, or a number. If a number, then the size of the block to allocate,
//        in *bytes* (note that this is sometimes confusing: the next parameter does not
//        affect this!)
// @types: Either an array of types, one for each byte (or 0 if no type at that position),
//         or a single type which is used for the entire block. This only matters if there
//         is initial data - if @slab is a number, then this does not matter at all and is
//         ignored.
// @allocator: How to allocate memory, see ALLOC_*
function allocate(slab, types, allocator, ptr) {
  var zeroinit, size;
  if (typeof slab === 'number') {
    zeroinit = true;
    size = slab;
  } else {
    zeroinit = false;
    size = slab.length;
  }
  var singleType = typeof types === 'string' ? types : null;
  var ret;
  if (allocator == ALLOC_NONE) {
    ret = ptr;
  } else {
    ret = [_malloc, Runtime.stackAlloc, Runtime.staticAlloc, Runtime.dynamicAlloc][allocator === undefined ? ALLOC_STATIC : allocator](Math.max(size, singleType ? 1 : types.length));
  }
  if (zeroinit) {
    var ptr = ret, stop;
    assert((ret & 3) == 0);
    stop = ret + (size & ~3);
    for (; ptr < stop; ptr += 4) {
      HEAP32[((ptr)>>2)]=0;
    }
    stop = ret + size;
    while (ptr < stop) {
      HEAP8[((ptr++)|0)]=0;
    }
    return ret;
  }
  if (singleType === 'i8') {
    if (slab.subarray || slab.slice) {
      HEAPU8.set(slab, ret);
    } else {
      HEAPU8.set(new Uint8Array(slab), ret);
    }
    return ret;
  }
  var i = 0, type, typeSize, previousType;
  while (i < size) {
    var curr = slab[i];
    if (typeof curr === 'function') {
      curr = Runtime.getFunctionIndex(curr);
    }
    type = singleType || types[i];
    if (type === 0) {
      i++;
      continue;
    }
    if (type == 'i64') type = 'i32'; // special case: we have one i32 here, and one i32 later
    setValue(ret+i, curr, type);
    // no need to look up size unless type changes, so cache it
    if (previousType !== type) {
      typeSize = Runtime.getNativeTypeSize(type);
      previousType = type;
    }
    i += typeSize;
  }
  return ret;
}
Module['allocate'] = allocate;
function Pointer_stringify(ptr, /* optional */ length) {
  // TODO: use TextDecoder
  // Find the length, and check for UTF while doing so
  var hasUtf = false;
  var t;
  var i = 0;
  while (1) {
    t = HEAPU8[(((ptr)+(i))|0)];
    if (t >= 128) hasUtf = true;
    else if (t == 0 && !length) break;
    i++;
    if (length && i == length) break;
  }
  if (!length) length = i;
  var ret = '';
  if (!hasUtf) {
    var MAX_CHUNK = 1024; // split up into chunks, because .apply on a huge string can overflow the stack
    var curr;
    while (length > 0) {
      curr = String.fromCharCode.apply(String, HEAPU8.subarray(ptr, ptr + Math.min(length, MAX_CHUNK)));
      ret = ret ? ret + curr : curr;
      ptr += MAX_CHUNK;
      length -= MAX_CHUNK;
    }
    return ret;
  }
  var utf8 = new Runtime.UTF8Processor();
  for (i = 0; i < length; i++) {
    t = HEAPU8[(((ptr)+(i))|0)];
    ret += utf8.processCChar(t);
  }
  return ret;
}
Module['Pointer_stringify'] = Pointer_stringify;
// Given a pointer 'ptr' to a null-terminated UTF16LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.
function UTF16ToString(ptr) {
  var i = 0;
  var str = '';
  while (1) {
    var codeUnit = HEAP16[(((ptr)+(i*2))>>1)];
    if (codeUnit == 0)
      return str;
    ++i;
    // fromCharCode constructs a character from a UTF-16 code unit, so we can pass the UTF16 string right through.
    str += String.fromCharCode(codeUnit);
  }
}
Module['UTF16ToString'] = UTF16ToString;
// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF16LE form. The copy will require at most (str.length*2+1)*2 bytes of space in the HEAP.
function stringToUTF16(str, outPtr) {
  for(var i = 0; i < str.length; ++i) {
    // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    HEAP16[(((outPtr)+(i*2))>>1)]=codeUnit;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP16[(((outPtr)+(str.length*2))>>1)]=0;
}
Module['stringToUTF16'] = stringToUTF16;
// Given a pointer 'ptr' to a null-terminated UTF32LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.
function UTF32ToString(ptr) {
  var i = 0;
  var str = '';
  while (1) {
    var utf32 = HEAP32[(((ptr)+(i*4))>>2)];
    if (utf32 == 0)
      return str;
    ++i;
    // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
    if (utf32 >= 0x10000) {
      var ch = utf32 - 0x10000;
      str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
    } else {
      str += String.fromCharCode(utf32);
    }
  }
}
Module['UTF32ToString'] = UTF32ToString;
// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF32LE form. The copy will require at most (str.length+1)*4 bytes of space in the HEAP,
// but can use less, since str.length does not return the number of characters in the string, but the number of UTF-16 code units in the string.
function stringToUTF32(str, outPtr) {
  var iChar = 0;
  for(var iCodeUnit = 0; iCodeUnit < str.length; ++iCodeUnit) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    var codeUnit = str.charCodeAt(iCodeUnit); // possibly a lead surrogate
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) {
      var trailSurrogate = str.charCodeAt(++iCodeUnit);
      codeUnit = 0x10000 + ((codeUnit & 0x3FF) << 10) | (trailSurrogate & 0x3FF);
    }
    HEAP32[(((outPtr)+(iChar*4))>>2)]=codeUnit;
    ++iChar;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP32[(((outPtr)+(iChar*4))>>2)]=0;
}
Module['stringToUTF32'] = stringToUTF32;
function demangle(func) {
  try {
    // Special-case the entry point, since its name differs from other name mangling.
    if (func == 'Object._main' || func == '_main') {
      return 'main()';
    }
    if (typeof func === 'number') func = Pointer_stringify(func);
    if (func[0] !== '_') return func;
    if (func[1] !== '_') return func; // C function
    if (func[2] !== 'Z') return func;
    switch (func[3]) {
      case 'n': return 'operator new()';
      case 'd': return 'operator delete()';
    }
    var i = 3;
    // params, etc.
    var basicTypes = {
      'v': 'void',
      'b': 'bool',
      'c': 'char',
      's': 'short',
      'i': 'int',
      'l': 'long',
      'f': 'float',
      'd': 'double',
      'w': 'wchar_t',
      'a': 'signed char',
      'h': 'unsigned char',
      't': 'unsigned short',
      'j': 'unsigned int',
      'm': 'unsigned long',
      'x': 'long long',
      'y': 'unsigned long long',
      'z': '...'
    };
    function dump(x) {
      //return;
      if (x) Module.print(x);
      Module.print(func);
      var pre = '';
      for (var a = 0; a < i; a++) pre += ' ';
      Module.print (pre + '^');
    }
    var subs = [];
    function parseNested() {
      i++;
      if (func[i] === 'K') i++; // ignore const
      var parts = [];
      while (func[i] !== 'E') {
        if (func[i] === 'S') { // substitution
          i++;
          var next = func.indexOf('_', i);
          var num = func.substring(i, next) || 0;
          parts.push(subs[num] || '?');
          i = next+1;
          continue;
        }
        if (func[i] === 'C') { // constructor
          parts.push(parts[parts.length-1]);
          i += 2;
          continue;
        }
        var size = parseInt(func.substr(i));
        var pre = size.toString().length;
        if (!size || !pre) { i--; break; } // counter i++ below us
        var curr = func.substr(i + pre, size);
        parts.push(curr);
        subs.push(curr);
        i += pre + size;
      }
      i++; // skip E
      return parts;
    }
    var first = true;
    function parse(rawList, limit, allowVoid) { // main parser
      limit = limit || Infinity;
      var ret = '', list = [];
      function flushList() {
        return '(' + list.join(', ') + ')';
      }
      var name;
      if (func[i] === 'N') {
        // namespaced N-E
        name = parseNested().join('::');
        limit--;
        if (limit === 0) return rawList ? [name] : name;
      } else {
        // not namespaced
        if (func[i] === 'K' || (first && func[i] === 'L')) i++; // ignore const and first 'L'
        var size = parseInt(func.substr(i));
        if (size) {
          var pre = size.toString().length;
          name = func.substr(i + pre, size);
          i += pre + size;
        }
      }
      first = false;
      if (func[i] === 'I') {
        i++;
        var iList = parse(true);
        var iRet = parse(true, 1, true);
        ret += iRet[0] + ' ' + name + '<' + iList.join(', ') + '>';
      } else {
        ret = name;
      }
      paramLoop: while (i < func.length && limit-- > 0) {
        //dump('paramLoop');
        var c = func[i++];
        if (c in basicTypes) {
          list.push(basicTypes[c]);
        } else {
          switch (c) {
            case 'P': list.push(parse(true, 1, true)[0] + '*'); break; // pointer
            case 'R': list.push(parse(true, 1, true)[0] + '&'); break; // reference
            case 'L': { // literal
              i++; // skip basic type
              var end = func.indexOf('E', i);
              var size = end - i;
              list.push(func.substr(i, size));
              i += size + 2; // size + 'EE'
              break;
            }
            case 'A': { // array
              var size = parseInt(func.substr(i));
              i += size.toString().length;
              if (func[i] !== '_') throw '?';
              i++; // skip _
              list.push(parse(true, 1, true)[0] + ' [' + size + ']');
              break;
            }
            case 'E': break paramLoop;
            default: ret += '?' + c; break paramLoop;
          }
        }
      }
      if (!allowVoid && list.length === 1 && list[0] === 'void') list = []; // avoid (void)
      return rawList ? list : ret + flushList();
    }
    return parse();
  } catch(e) {
    return func;
  }
}
function demangleAll(text) {
  return text.replace(/__Z[\w\d_]+/g, function(x) { var y = demangle(x); return x === y ? x : (x + ' [' + y + ']') });
}
function stackTrace() {
  var stack = new Error().stack;
  return stack ? demangleAll(stack) : '(no stack trace available)'; // Stack trace is not available at least on IE10 and Safari 6.
}
// Memory management
var PAGE_SIZE = 4096;
function alignMemoryPage(x) {
  return (x+4095)&-4096;
}
var HEAP;
var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
var STATIC_BASE = 0, STATICTOP = 0, staticSealed = false; // static area
var STACK_BASE = 0, STACKTOP = 0, STACK_MAX = 0; // stack area
var DYNAMIC_BASE = 0, DYNAMICTOP = 0; // dynamic area handled by sbrk
function enlargeMemory() {
  abort('Cannot enlarge memory arrays in asm.js. Either (1) compile with -s TOTAL_MEMORY=X with X higher than the current value ' + TOTAL_MEMORY + ', or (2) set Module.TOTAL_MEMORY before the program runs.');
}
var TOTAL_STACK = Module['TOTAL_STACK'] || 5242880;
var TOTAL_MEMORY = Module['TOTAL_MEMORY'] || 16777216;
var FAST_MEMORY = Module['FAST_MEMORY'] || 2097152;
var totalMemory = 4096;
while (totalMemory < TOTAL_MEMORY || totalMemory < 2*TOTAL_STACK) {
  if (totalMemory < 16*1024*1024) {
    totalMemory *= 2;
  } else {
    totalMemory += 16*1024*1024
  }
}
if (totalMemory !== TOTAL_MEMORY) {
  Module.printErr('increasing TOTAL_MEMORY to ' + totalMemory + ' to be more reasonable');
  TOTAL_MEMORY = totalMemory;
}
// Initialize the runtime's memory
// check for full engine support (use string 'subarray' to avoid closure compiler confusion)
assert(typeof Int32Array !== 'undefined' && typeof Float64Array !== 'undefined' && !!(new Int32Array(1)['subarray']) && !!(new Int32Array(1)['set']),
       'Cannot fallback to non-typed array case: Code is too specialized');
var buffer = new ArrayBuffer(TOTAL_MEMORY);
HEAP8 = new Int8Array(buffer);
HEAP16 = new Int16Array(buffer);
HEAP32 = new Int32Array(buffer);
HEAPU8 = new Uint8Array(buffer);
HEAPU16 = new Uint16Array(buffer);
HEAPU32 = new Uint32Array(buffer);
HEAPF32 = new Float32Array(buffer);
HEAPF64 = new Float64Array(buffer);
// Endianness check (note: assumes compiler arch was little-endian)
HEAP32[0] = 255;
assert(HEAPU8[0] === 255 && HEAPU8[3] === 0, 'Typed arrays 2 must be run on a little-endian system');
Module['HEAP'] = HEAP;
Module['HEAP8'] = HEAP8;
Module['HEAP16'] = HEAP16;
Module['HEAP32'] = HEAP32;
Module['HEAPU8'] = HEAPU8;
Module['HEAPU16'] = HEAPU16;
Module['HEAPU32'] = HEAPU32;
Module['HEAPF32'] = HEAPF32;
Module['HEAPF64'] = HEAPF64;
function callRuntimeCallbacks(callbacks) {
  while(callbacks.length > 0) {
    var callback = callbacks.shift();
    if (typeof callback == 'function') {
      callback();
      continue;
    }
    var func = callback.func;
    if (typeof func === 'number') {
      if (callback.arg === undefined) {
        Runtime.dynCall('v', func);
      } else {
        Runtime.dynCall('vi', func, [callback.arg]);
      }
    } else {
      func(callback.arg === undefined ? null : callback.arg);
    }
  }
}
var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the runtime has exited
var runtimeInitialized = false;
function preRun() {
  // compatibility - merge in anything from Module['preRun'] at this time
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPRERUN__);
}
function ensureInitRuntime() {
  if (runtimeInitialized) return;
  runtimeInitialized = true;
  callRuntimeCallbacks(__ATINIT__);
}
function preMain() {
  callRuntimeCallbacks(__ATMAIN__);
}
function exitRuntime() {
  callRuntimeCallbacks(__ATEXIT__);
}
function postRun() {
  // compatibility - merge in anything from Module['postRun'] at this time
  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPOSTRUN__);
}
function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}
Module['addOnPreRun'] = Module.addOnPreRun = addOnPreRun;
function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}
Module['addOnInit'] = Module.addOnInit = addOnInit;
function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}
Module['addOnPreMain'] = Module.addOnPreMain = addOnPreMain;
function addOnExit(cb) {
  __ATEXIT__.unshift(cb);
}
Module['addOnExit'] = Module.addOnExit = addOnExit;
function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}
Module['addOnPostRun'] = Module.addOnPostRun = addOnPostRun;
// Tools
// This processes a JS string into a C-line array of numbers, 0-terminated.
// For LLVM-originating strings, see parser.js:parseLLVMString function
function intArrayFromString(stringy, dontAddNull, length /* optional */) {
  var ret = (new Runtime.UTF8Processor()).processJSString(stringy);
  if (length) {
    ret.length = length;
  }
  if (!dontAddNull) {
    ret.push(0);
  }
  return ret;
}
Module['intArrayFromString'] = intArrayFromString;
function intArrayToString(array) {
  var ret = [];
  for (var i = 0; i < array.length; i++) {
    var chr = array[i];
    if (chr > 0xFF) {
      chr &= 0xFF;
    }
    ret.push(String.fromCharCode(chr));
  }
  return ret.join('');
}
Module['intArrayToString'] = intArrayToString;
// Write a Javascript array to somewhere in the heap
function writeStringToMemory(string, buffer, dontAddNull) {
  var array = intArrayFromString(string, dontAddNull);
  var i = 0;
  while (i < array.length) {
    var chr = array[i];
    HEAP8[(((buffer)+(i))|0)]=chr;
    i = i + 1;
  }
}
Module['writeStringToMemory'] = writeStringToMemory;
function writeArrayToMemory(array, buffer) {
  for (var i = 0; i < array.length; i++) {
    HEAP8[(((buffer)+(i))|0)]=array[i];
  }
}
Module['writeArrayToMemory'] = writeArrayToMemory;
function writeAsciiToMemory(str, buffer, dontAddNull) {
  for (var i = 0; i < str.length; i++) {
    HEAP8[(((buffer)+(i))|0)]=str.charCodeAt(i);
  }
  if (!dontAddNull) HEAP8[(((buffer)+(str.length))|0)]=0;
}
Module['writeAsciiToMemory'] = writeAsciiToMemory;
function unSign(value, bits, ignore, sig) {
  if (value >= 0) {
    return value;
  }
  return bits <= 32 ? 2*Math.abs(1 << (bits-1)) + value // Need some trickery, since if bits == 32, we are right at the limit of the bits JS uses in bitshifts
                    : Math.pow(2, bits)         + value;
}
function reSign(value, bits, ignore, sig) {
  if (value <= 0) {
    return value;
  }
  var half = bits <= 32 ? Math.abs(1 << (bits-1)) // abs is needed if bits == 32
                        : Math.pow(2, bits-1);
  if (value >= half && (bits <= 32 || value > half)) { // for huge values, we can hit the precision limit and always get true here. so don't do that
                                                       // but, in general there is no perfect solution here. With 64-bit ints, we get rounding and errors
                                                       // TODO: In i64 mode 1, resign the two parts separately and safely
    value = -2*half + value; // Cannot bitshift half, as it may be at the limit of the bits JS uses in bitshifts
  }
  return value;
}
if (!Math['imul']) Math['imul'] = function imul(a, b) {
  var ah  = a >>> 16;
  var al = a & 0xffff;
  var bh  = b >>> 16;
  var bl = b & 0xffff;
  return (al*bl + ((ah*bl + al*bh) << 16))|0;
};
Math.imul = Math['imul'];
var Math_abs = Math.abs;
var Math_cos = Math.cos;
var Math_sin = Math.sin;
var Math_tan = Math.tan;
var Math_acos = Math.acos;
var Math_asin = Math.asin;
var Math_atan = Math.atan;
var Math_atan2 = Math.atan2;
var Math_exp = Math.exp;
var Math_log = Math.log;
var Math_sqrt = Math.sqrt;
var Math_ceil = Math.ceil;
var Math_floor = Math.floor;
var Math_pow = Math.pow;
var Math_imul = Math.imul;
var Math_fround = Math.fround;
var Math_min = Math.min;
// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// PRE_RUN_ADDITIONS (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
function addRunDependency(id) {
  runDependencies++;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
}
Module['addRunDependency'] = addRunDependency;
function removeRunDependency(id) {
  runDependencies--;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}
Module['removeRunDependency'] = removeRunDependency;
Module["preloadedImages"] = {}; // maps url to image data
Module["preloadedAudios"] = {}; // maps url to audio data
var memoryInitializer = null;
// === Body ===
STATIC_BASE = 8;
STATICTOP = STATIC_BASE + 54088;
var _stdout;
var _stdout=_stdout=allocate([0,0,0,0,0,0,0,0], "i8", ALLOC_STATIC);
var _stdin;
var _stdin=_stdin=allocate([0,0,0,0,0,0,0,0], "i8", ALLOC_STATIC);
var _stderr;
var _stderr=_stderr=allocate([0,0,0,0,0,0,0,0], "i8", ALLOC_STATIC);
/* global initializers */ __ATINIT__.push({ func: function() { runPostSets() } },{ func: function() { __GLOBAL__I_a() } },{ func: function() { __GLOBAL__I_a324() } },{ func: function() { __GLOBAL__I_a785() } },{ func: function() { __GLOBAL__I_a1328() } },{ func: function() { __GLOBAL__I_a1698() } });
var ___fsmu8;
var ___dso_handle;
var ___dso_handle=___dso_handle=allocate([0,0,0,0,0,0,0,0], "i8", ALLOC_STATIC);
var __ZTVN10__cxxabiv120__si_class_type_infoE;
__ZTVN10__cxxabiv120__si_class_type_infoE=allocate([0,0,0,0,48,152,0,0,82,1,0,0,254,0,0,0,60,0,0,0,178,1,0,0,4,0,0,0,4,0,0,0,30,0,0,0,32,0,0,0,0,0,0,0,0,0,0,0], "i8", ALLOC_STATIC);
var __ZTVN10__cxxabiv119__pointer_type_infoE;
__ZTVN10__cxxabiv119__pointer_type_infoE=allocate([0,0,0,0,64,152,0,0,82,1,0,0,206,0,0,0,60,0,0,0,178,1,0,0,60,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "i8", ALLOC_STATIC);
var __ZTVN10__cxxabiv117__class_type_infoE;
__ZTVN10__cxxabiv117__class_type_infoE=allocate([0,0,0,0,96,152,0,0,82,1,0,0,172,0,0,0,60,0,0,0,178,1,0,0,4,0,0,0,16,0,0,0,6,0,0,0,62,0,0,0,0,0,0,0,0,0,0,0], "i8", ALLOC_STATIC);
var __ZTIc;
__ZTIc=allocate([240,110,0,0,72,111,0,0], "i8", ALLOC_STATIC);
var __ZN4Sass7ContextC1ENS0_4DataE;
var __ZN4Sass7ContextD1Ev;
var __ZN4Sass13ContextualizeC1ERNS_7ContextEPNS_4EvalEPNS_11EnvironmentIPNS_8AST_NodeEEEPNS_9BacktraceEPNS_8SelectorESD_;
var __ZN4Sass13ContextualizeD1Ev;
var __ZN4Sass10Sass_ErrorC1ENS0_4TypeENSt3__112basic_stringIcNS2_11char_traitsIcEENS2_9allocatorIcEEEENS_8PositionES8_;
var __ZN4Sass4EvalC1ERNS_7ContextEPNS_11EnvironmentIPNS_8AST_NodeEEEPNS_9BacktraceE;
var __ZN4Sass4EvalD1Ev;
var __ZN4Sass6ExpandC1ERNS_7ContextEPNS_4EvalEPNS_13ContextualizeEPNS_11EnvironmentIPNS_8AST_NodeEEEPNS_9BacktraceE;
var __ZN4Sass6ExtendC1ERNS_7ContextERNS_10Subset_MapINSt3__112basic_stringIcNS4_11char_traitsIcEENS4_9allocatorIcEEEENS4_4pairIPNS_16Complex_SelectorEPNS_17Compound_SelectorEEEEE;
var __ZN4Sass7InspectC1EPNS_7ContextE;
var __ZN4Sass7InspectD1Ev;
var __ZN4Sass17Output_CompressedC1EPNS_7ContextE;
var __ZN4Sass17Output_CompressedD1Ev;
var __ZN4Sass13Output_NestedC1EbPNS_7ContextE;
var __ZN4Sass13Output_NestedD1Ev;
var __ZN4Sass19Remove_PlaceholdersC1ERNS_7ContextE;
var __ZN4Sass9SourceMapC1ERKNSt3__112basic_stringIcNS1_11char_traitsIcEENS1_9allocatorIcEEEE;
var __ZN4Sass9To_StringC1EPNS_7ContextE;
var __ZN4Sass9To_StringD1Ev;
var __ZNSt3__119__shared_weak_countD2Ev;
var __ZNSt3__113random_deviceC1ERKNS_12basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEE;
var __ZNSt3__113random_deviceD1Ev;
var __ZNSt13runtime_errorC1EPKc;
var __ZNSt13runtime_errorD1Ev;
var __ZNSt12length_errorD1Ev;
var __ZNSt12out_of_rangeD1Ev;
var __ZNSt14overflow_errorD1Ev;
var __ZNSt3__16localeC1Ev;
var __ZNSt3__16localeC1ERKS0_;
var __ZNSt3__16localeD1Ev;
var __ZNSt8bad_castC1Ev;
var __ZNSt8bad_castD1Ev;
/* memory initializer */ allocate([0,0,0,0,0,0,36,64,0,0,0,0,0,0,89,64,0,0,0,0,0,136,195,64,0,0,0,0,132,215,151,65,0,128,224,55,121,195,65,67,23,110,5,181,181,184,147,70,245,249,63,233,3,79,56,77,50,29,48,249,72,119,130,90,60,191,115,127,221,79,21,117,88,43,0,0,0,0,0,0,36,108,105,109,105,116,0,0,74,117,108,0,0,0,0,0,116,114,97,110,115,112,97,114,101,110,116,0,0,0,0,0,109,111,99,99,97,115,105,110,0,0,0,0,0,0,0,0,114,97,110,100,111,109,40,36,108,105,109,105,116,58,102,97,108,115,101,41,0,0,0,0,74,117,110,0,0,0,0,0,109,105,115,116,121,114,111,115,101,0,0,0,0,0,0,0,32,33,105,109,112,111,114,116,97,110,116,0,0,0,0,0,109,97,120,40,36,120,49,44,32,36,120,50,46,46,46,41,0,0,0,0,0,0,0,0,65,112,114,0,0,0,0,0,109,105,110,116,99,114,101,97,109,0,0,0,0,0,0,0,96,32,111,110,108,121,32,116,97,107,101,115,32,110,117,109,101,114,105,99,32,97,114,103,117,109,101,110,116,115,0,0,77,97,114,0,0,0,0,0,111,110,108,121,32,85,84,70,45,56,32,100,111,99,117,109,101,110,116,115,32,97,114,101,32,99,117,114,114,101,110,116,108,121,32,115,117,112,112,111,114,116,101,100,59,32,121,111,117,114,32,100,111,99,117,109,101,110,116,32,97,112,112,101,97,114,115,32,116,111,32,98,101,32,0,0,0,0,0,0,109,105,100,110,105,103,104,116,98,108,117,101,0,0,0,0,96,0,0,0,0,0,0,0,70,101,98,0,0,0,0,0,71,66,45,49,56,48,51,48,0,0,0,0,0,0,0,0,109,101,100,105,117,109,118,105,111,108,101,116,114,101,100,0,36,120,50,0,0,0,0,0,74,97,110,0,0,0,0,0,66,79,67,85,45,49,0,0,98,108,117,101,0,0,0,0,109,101,100,105,117,109,116,117,114,113,117,111,105,115,101,0,36,120,49,0,0,0,0,0,114,103,98,40,36,114,101,100,44,32,36,103,114,101,101,110,44,32,36,98,108,117,101,41,0,0,0,0,0,0,0,0,68,101,99,101,109,98,101,114,0,0,0,0,0,0,0,0,83,67,83,85,0,0,0,0,109,101,100,105,117,109,115,112,114,105,110,103,103,114,101,101,110,0,0,0,0,0,0,0,116,111,112,45,108,101,118,101,108,32,64,105,109,112,111,114,116,32,100,105,114,101,99,116,105,118,101,32,109,117,115,116,32,98,101,32,116,101,114,109,105,110,97,116,101,100,32,98,121,32,39,59,39,0,0,0,91,109,93,0,0,0,0,0,109,105,110,40,36,120,49,44,32,36,120,50,46,46,46,41,0,0,0,0,0,0,0,0,32,111,102,32,0,0,0,0,78,111,118,101,109,98,101,114,0,0,0,0,0,0,0,0,85,84,70,45,69,66,67,68,73,67,0,0,0,0,0,0,109,101,100,105,117,109,115,108,97,116,101,98,108,117,101,0,32,68,69,66,85,71,58,32,0,0,0,0,0,0,0,0,117,110,115,117,112,112,111,114,116,101,100,32,108,111,99,97,108,101,32,102,111,114,32,115,116,97,110,100,97,114,100,32,105,110,112,117,116,0,0,0,97,98,115,40,36,118,97,108,117,101,41,0,0,0,0,0,116,117,114,110,0,0,0,0,58,0,0,0,0,0,0,0,79,99,116,111,98,101,114,0,85,84,70,45,49,0,0,0,109,101,100,105,117,109,115,101,97,103,114,101,101,110,0,0,102,108,111,111,114,40,36,118,97,108,117,101,41,0,0,0,83,101,112,116,101,109,98,101,114,0,0,0,0,0,0,0,34,39,47,92,42,40,41,0,85,84,70,45,55,0,0,0,109,101,100,105,117,109,112,117,114,112,108,101,0,0,0,0,58,58,102,105,114,115,116,45,108,105,110,101,0,0,0,0,99,101,105,108,40,36,118,97,108,117,101,41,0,0,0,0,46,99,115,115,0,0,0,0,64,109,101,100,105,97,32,0,65,117,103,117,115,116,0,0,34,39,47,92,42,0,0,0,85,84,70,45,51,50,32,40,98,105,103,32,101,110,100,105,97,110,41,0,0,0,0,0,44,0,0,0,0,0,0,0,109,101,100,105,117,109,111,114,99,104,105,100,0,0,0,0,114,111,117,110,100,40,36,118,97,108,117,101,41,0,0,0,74,117,108,121,0,0,0,0,125,0,0,0,0,0,0,0,85,84,70,45,51,50,32,40,108,105,116,116,108,101,32,101,110,100,105,97,110,41,0,0,109,101,100,105,117,109,98,108,117,101,0,0,0,0,0,0,96,32,109,117,115,116,32,98,101,32,117,110,105,116,108,101,115,115,0,0,0,0,0,0,74,117,110,101,0,0,0,0,85,84,70,45,49,54,32,40,108,105,116,116,108,101,32,101,110,100,105,97,110,41,0,0,67,111,109,112,97,114,105,110,103,32,117,110,107,110,111,119,110,32,110,111,100,101,32,116,121,112,101,115,46,32,65,32,110,101,119,32,116,121,112,101,32,119,97,115,32,112,114,111,98,97,98,108,121,32,97,100,100,101,100,32,97,110,100,32,116,104,105,115,32,109,101,116,104,111,100,32,119,97,115,110,39,116,32,105,109,112,108,101,109,101,110,116,101,100,32,102,111,114,32,105,116,46,0,0,109,101,100,105,117,109,97,113,117,97,109,97,114,105,110,101,0,0,0,0,0,0,0,0,97,114,103,117,109,101,110,116,32,36,118,97,108,117,101,32,111,102,32,96,0,0,0,0,77,97,121,0,0,0,0,0,58,102,117,108,108,115,99,114,101,101,110,0,0,0,0,0,85,84,70,45,49,54,32,40,98,105,103,32,101,110,100,105,97,110,41,0,0,0,0,0,109,97,114,111,111,110,0,0,36,118,97,108,117,101,0,0,65,112,114,105,108,0,0,0,58,109,97,116,99,104,101,115,0,0,0,0,0,0,0,0,85,84,70,45,56,0,0,0,109,97,103,101,110,116,97,0,112,101,114,99,101,110,116,97,103,101,40,36,118,97,108,117,101,41,0,0,0,0,0,0,77,97,114,99,104,0,0,0,58,110,116,104,45,108,97,115,116,45,99,111,108,117,109,110,0,0,0,0,0,0,0,0,117,110,99,108,111,115,101,100,32,112,97,114,101,110,116,104,101,115,105,115,32,105,110,32,64,115,117,112,112,111,114,116,115,32,100,101,99,108,97,114,97,116,105,111,110,0,0,0,108,105,110,101,110,0,0,0,98,108,97,110,99,104,101,100,97,108,109,111,110,100,0,0,116,111,45,108,111,119,101,114,45,99,97,115,101,40,36,115,116,114,105,110,103,41,0,0,97,114,114,97,121,45,62,116,97,103,32,61,61,32,74,83,79,78,95,65,82,82,65,89,0,0,0,0,0,0,0,0,70,101,98,114,117,97,114,121,0,0,0,0,0,0,0,0,58,110,116,104,45,99,111,108,117,109,110,0,0,0,0,0,64,115,117,112,112,111,114,116,115,32,100,101,99,108,97,114,97,116,105,111,110,32,101,120,112,101,99,116,101,100,32,39,40,39,0,0,0,0,0,0,46,46,0,0,0,0,0,0,108,105,109,101,103,114,101,101,110,0,0,0,0,0,0,0,110,101,115,116,101,100,32,115,101,108,101,99,116,111,114,115,32,109,97,121,32,110,111,116,32,98,101,32,101,120,116,101,110,100,101,100,0,0,0,0,116,111,45,117,112,112,101,114,45,99,97,115,101,40,36,115,116,114,105,110,103,41,0,0,74,97,110,117,97,114,121,0,58,110,116,104,45,108,97,115,116,45,109,97,116,99,104,0,101,120,112,101,99,116,101,100,32,64,115,117,112,112,111,114,116,115,32,99,111,110,100,105,116,105,111,110,32,40,101,46,103,46,32,40,100,105,115,112,108,97,121,58,32,102,108,101,120,98,111,120,41,41,0,0,97,114,103,117,109,101,110,116,32,0,0,0,0,0,0,0,108,105,109,101,0,0,0,0,58,0,0,0,0,0,0,0,58,0,0,0,0,0,0,0,114,97,100,0,0,0,0,0,36,101,110,100,45,97,116,0,44,0,0,0,0,0,0,0,59,0,0,0,0,0,0,0,98,97,115,105,99,95,115,116,114,105,110,103,0,0,0,0,58,110,116,104,45,109,97,116,99,104,0,0,0,0,0,0,101,120,112,101,99,116,101,100,32,39,123,39,32,105,110,32,102,101,97,116,117,114,101,32,113,117,101,114,121,0,0,0,108,105,103,104,116,121,101,108,108,111,119,0,0,0,0,0,36,115,116,97,114,116,45,97,116,0,0,0,0,0,0,0,68,0,0,0,101,0,0,0,99,0,0,0,0,0,0,0,58,98,108,97,110,107,0,0,117,110,99,108,111,115,101,100,32,112,97,114,101,110,116,104,101,115,105,115,32,105,110,32,109,101,100,105,97,32,113,117,101,114,121,32,101,120,112,114,101,115,115,105,111,110,0,0,108,105,103,104,116,115,116,101,101,108,98,108,117,101,0,0,58,102,105,114,115,116,45,108,105,110,101,0,0,0,0,0,115,116,114,45,115,108,105,99,101,40,36,115,116,114,105,110,103,44,32,36,115,116,97,114,116,45,97,116,44,32,36,101,110,100,45,97,116,58,45,49,41,0,0,0,0,0,0,0,105,110,118,97,108,105,100,32,116,111,112,45,108,101,118,101,108,32,101,120,112,114,101,115,115,105,111,110,0,0,0,0,64,115,117,112,112,111,114,116,115,32,0,0,0,0,0,0,78,0,0,0,111,0,0,0,118,0,0,0,0,0,0,0,58,117,115,101,114,45,101,114,114,111,114,0,0,0,0,0,109,101,100,105,97,32,102,101,97,116,117,114,101,32,114,101,113,117,105,114,101,100,32,105,110,32,109,101,100,105,97,32,113,117,101,114,121,32,101,120,112,114,101,115,115,105,111,110,0,0,0,0,0,0,0,0,33,105,109,112,111,114,116,97,110,116,0,0,0,0,0,0,108,105,103,104,116,115,108,97,116,101,103,114,97,121,0,0,36,115,117,98,115,116,114,105,110,103,0,0,0,0,0,0,79,0,0,0,99,0,0,0,116,0,0,0,0,0,0,0,58,112,108,97,99,101,104,111,108,100,101,114,45,115,104,111,119,110,0,0,0,0,0,0,109,101,100,105,97,32,113,117,101,114,121,32,101,120,112,114,101,115,115,105,111,110,32,109,117,115,116,32,98,101,103,105,110,32,119,105,116,104,32,39,40,39,0,0,0,0,0,0,108,105,103,104,116,115,108,97,116,101,103,114,101,121,0,0,32,0,0,0,0,0,0,0,115,116,114,45,105,110,100,101,120,40,36,115,116,114,105,110,103,44,32,36,115,117,98,115,116,114,105,110,103,41,0,0,83,0,0,0,101,0,0,0,112,0,0,0,0,0,0,0,58,102,117,116,117,114,101,0,101,120,112,101,99,116,101,100,32,39,123,39,32,105,110,32,109,101,100,105,97,32,113,117,101,114,121,0,0,0,0,0,108,105,103,104,116,115,107,121,98,108,117,101,0,0,0,0,36,105,110,100,101,120,0,0,65,0,0,0,117,0,0,0,103,0,0,0,0,0,0,0,58,112,97,115,116,0,0,0,101,120,112,101,99,116,101,100,32,39,123,39,32,97,102,116,101,114,32,116,104,101,32,117,112,112,101,114,32,98,111,117,110,100,32,105,110,32,64,101,97,99,104,32,100,105,114,101,99,116,105,118,101,0,0,0,108,105,103,104,116,115,101,97,103,114,101,101,110,0,0,0,36,105,110,115,101,114,116,0,74,0,0,0,117,0,0,0,108,0,0,0,0,0,0,0,58,99,117,114,114,101,110,116,0,0,0,0,0,0,0,0,101,120,112,101,99,116,101,100,32,39,105,110,39,32,107,101,121,119,111,114,100,32,105,110,32,64,101,97,99,104,32,100,105,114,101,99,116,105,118,101,0,0,0,0,0,0,0,0,108,105,103,104,116,115,97,108,109,111,110,0,0,0,0,0,115,116,114,45,105,110,115,101,114,116,40,36,115,116,114,105,110,103,44,32,36,105,110,115,101,114,116,44,32,36,105,110,100,101,120,41,0,0,0,0,74,0,0,0,117,0,0,0,110,0,0,0,0,0,0,0,58,105,110,118,97,108,105,100,45,100,114,111,112,45,116,97,114,103,101,116,0,0,0,0,64,101,97,99,104,32,100,105,114,101,99,116,105,118,101,32,114,101,113,117,105,114,101,115,32,97,110,32,105,116,101,114,97,116,105,111,110,32,118,97,114,105,97,98,108,101,0,0,108,105,103,104,116,112,105,110,107,0,0,0,0,0,0,0,98,108,97,99,107,0,0,0,117,116,102,56,58,58,105,110,118,97,108,105,100,95,99,111,100,101,95,112,111,105,110,116,0,0,0,0,0,0,0,0,77,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,58,118,97,108,105,100,45,100,114,111,112,45,116,97,114,103,101,116,0,0,0,0,0,0,101,120,112,101,99,116,101,100,32,39,123,39,32,97,102,116,101,114,32,116,104,101,32,117,112,112,101,114,32,98,111,117,110,100,32,105,110,32,64,102,111,114,32,100,105,114,101,99,116,105,118,101,0,0,0,0,46,46,92,0,0,0,0,0,108,105,103,104,116,103,114,101,101,110,0,0,0,0,0,0,115,101,108,101,99,116,111,114,32,103,114,111,117,112,115,32,109,97,121,32,110,111,116,32,98,101,32,101,120,116,101,110,100,101,100,0,0,0,0,0,117,116,102,56,58,58,110,111,116,95,101,110,111,117,103,104,95,114,111,111,109,0,0,0,65,0,0,0,112,0,0,0,114,0,0,0,0,0,0,0,58,97,99,116,105,118,101,45,100,114,111,112,45,116,97,114,103,101,116,0,0,0,0,0,101,120,112,101,99,116,101,100,32,39,116,104,114,111,117,103,104,39,32,111,114,32,39,116,111,39,32,107,101,121,119,111,114,100,32,105,110,32,64,102,111,114,32,100,105,114,101,99,116,105,118,101,0,0,0,0,32,112,114,111,118,105,100,101,100,32,109,111,114,101,32,116,104,97,110,32,111,110,99,101,32,105,110,32,99,97,108,108,32,116,111,32,0,0,0,0,108,105,103,104,116,103,114,97,121,0,0,0,0,0,0,0,64,100,101,98,117,103,91,102,93,0,0,0,0,0,0,0,32,111,102,32,0,0,0,0,103,114,97,100,0,0,0,0,117,116,102,56,58,58,105,110,118,97,108,105,100,95,117,116,102,56,0,0,0,0,0,0,58,32,0,0,0,0,0,0,32,123,125,0,0,0,0,0,77,0,0,0,97,0,0,0,114,0,0,0,0,0,0,0,58,115,99,111,112,101,0,0,101,120,112,101,99,116,101,100,32,39,102,114,111,109,39,32,107,101,121,119,111,114,100,32,105,110,32,64,102,111,114,32,100,105,114,101,99,116,105,118,101,0,0,0,0,0,0,0,108,105,103,104,116,103,114,101,121,0,0,0,0,0,0,0,64,102,111,114,32,100,105,114,101,99,116,105,118,101,32,114,101,113,117,105,114,101,115,32,97,110,32,105,116,101,114,97,116,105,111,110,32,118,97,114,105,97,98,108,101,0,0,0,115,116,114,45,108,101,110,103,116,104,40,36,115,116,114,105,110,103,41,0,0,0,0,0,70,0,0,0,101,0,0,0,98,0,0,0,0,0,0,0,58,108,111,99,97,108,45,108,105,110,107,0,0,0,0,0,108,105,103,104,116,103,111,108,100,101,110,114,111,100,121,101,108,108,111,119,0,0,0,0,58,58,97,102,116,101,114,0,101,120,112,101,99,116,101,100,32,39,123,39,32,97,102,116,101,114,32,64,101,108,115,101,0,0,0,0,0,0,0,0,113,117,111,116,101,40,36,115,116,114,105,110,103,41,0,0,116,111,112,45,108,101,118,101,108,32,100,105,114,101,99,116,105,118,101,32,109,117,115,116,32,98,101,32,116,101,114,109,105,110,97,116,101,100,32,98,121,32,39,59,39,0,0,0,32,125,10,0,0,0,0,0,74,0,0,0,97,0,0,0,110,0,0,0,0,0,0,0,58,97,110,121,45,108,105,110,107,0,0,0,0,0,0,0,108,105,103,104,116,99,121,97,110,0,0,0,0,0,0,0,101,120,112,101,99,116,101,100,32,39,123,39,32,97,102,116,101,114,32,116,104,101,32,112,114,101,100,105,99,97,116,101,32,102,111,114,32,64,105,102,0,0,0,0,0,0,0,0,36,115,116,114,105,110,103,0,68,0,0,0,101,0,0,0,99,0,0,0,101,0,0,0,109,0,0,0,98,0,0,0,101,0,0,0,114,0,0,0,0,0,0,0,0,0,0,0,58,110,116,104,45,108,97,115,116,45,99,104,105,108,100,0,108,105,103,104,116,99,111,114,97,108,0,0,0,0,0,0,117,110,116,101,114,109,105,110,97,116,101,100,32,105,110,116,101,114,112,111,108,97,110,116,32,105,110,115,105,100,101,32,105,110,116,101,114,112,111,108,97,116,101,100,32,105,100,101,110,116,105,102,105,101,114,32,0,0,0,0,0,0,0,0,64,115,117,112,112,111,114,116,115,32,0,0,0,0,0,0,117,110,113,117,111,116,101,40,36,115,116,114,105,110,103,41,0,0,0,0,0,0,0,0,78,0,0,0,111,0,0,0,118,0,0,0,101,0,0,0,109,0,0,0,98,0,0,0,101,0,0,0,114,0,0,0,0,0,0,0,0,0,0,0,58,105,110,100,101,116,101,114,109,105,110,97,116,101,0,0,108,105,103,104,116,98,108,117,101,0,0,0,0,0,0,0,105,101,45,104,101,120,45,115,116,114,40,36,99,111,108,111,114,41,0,0,0,0,0,0,79,0,0,0,99,0,0,0,116,0,0,0,111,0,0,0,98,0,0,0,101,0,0,0,114,0,0,0,0,0,0,0,58,99,104,101,99,107,101,100,0,0,0,0,0,0,0,0,108,101,109,111,110,99,104,105,102,102,111,110,0,0,0,0,101,114,114,111,114,32,112,97,114,115,105,110,103,32,105,110,116,101,114,112,111,108,97,116,101,100,32,118,97,108,117,101,0,0,0,0,0,0,0,0,110,111,116,32,101,110,111,117,103,104,32,97,114,103,117,109,101,110,116,115,32,102,111,114,32,96,99,104,97,110,103,101,45,99,111,108,111,114,96,0,83,0,0,0,101,0,0,0,112,0,0,0,116,0,0,0,101,0,0,0,109,0,0,0,98,0,0,0,101,0,0,0,114,0,0,0,0,0,0,0,58,100,105,115,97,98,108,101,100,0,0,0,0,0,0,0,108,97,119,110,103,114,101,101,110,0,0,0,0,0,0,0,117,110,116,101,114,109,105,110,97,116,101,100,32,105,110,116,101,114,112,111,108,97,110,116,32,105,110,115,105,100,101,32,73,69,32,102,117,110,99,116,105,111,110,32,0,0,0,0,99,97,110,110,111,116,32,115,112,101,99,105,102,121,32,98,111,116,104,32,82,71,66,32,97,110,100,32,72,83,76,32,118,97,108,117,101,115,32,102,111,114,32,96,99,104,97,110,103,101,45,99,111,108,111,114,96,0,0,0,0,0,0,0,65,0,0,0,117,0,0,0,103,0,0,0,117,0,0,0,115,0,0,0,116,0,0,0,0,0,0,0,0,0,0,0,58,101,110,97,98,108,101,100,0,0,0,0,0,0,0,0,108,97,118,101,110,100,101,114,98,108,117,115,104,0,0,0,117,110,116,101,114,109,105,110,97,116,101,100,32,105,110,116,101,114,112,111,108,97,110,116,32,105,110,115,105,100,101,32,115,116,114,105,110,103,32,99,111,110,115,116,97,110,116,32,0,0,0,0,0,0,0,0,46,46,46,0,0,0,0,0,98,105,115,113,117,101,0,0,99,104,97,110,103,101,45,99,111,108,111,114,40,36,99,111,108,111,114,44,32,36,114,101,100,58,32,102,97,108,115,101,44,32,36,103,114,101,101,110,58,32,102,97,108,115,101,44,32,36,98,108,117,101,58,32,102,97,108,115,101,44,32,36,104,117,101,58,32,102,97,108,115,101,44,32,36,115,97,116,117,114,97,116,105,111,110,58,32,102,97,108,115,101,44,32,36,108,105,103,104,116,110,101,115,115,58,32,102,97,108,115,101,44,32,36,97,108,112,104,97,58,32,102,97,108,115,101,41,0,0,0,0,0,0,0,47,100,101,118,47,117,114,97,110,100,111,109,0,0,0,0,74,0,0,0,117,0,0,0,108,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,95,95,110,101,120,116,95,112,114,105,109,101,32,111,118,101,114,102,108,111,119,0,0,0,58,100,105,114,0,0,0,0,46,46,47,0,0,0,0,0,108,97,118,101,110,100,101,114,0,0,0,0,0,0,0,0,101,114,114,111,114,32,114,101,97,100,105,110,103,32,118,97,108,117,101,115,32,97,102,116,101,114,32,0,0,0,0,0,64,114,101,116,117,114,110,32,109,97,121,32,111,110,108,121,32,98,101,32,117,115,101,100,32,119,105,116,104,105,110,32,97,32,102,117,110,99,116,105,111,110,0,0,0,0,0,0,110,111,116,32,101,110,111,117,103,104,32,97,114,103,117,109,101,110,116,115,32,102,111,114,32,96,115,99,97,108,101,45,99,111,108,111,114,96,0,0,74,0,0,0,117,0,0,0,110,0,0,0,101,0,0,0,0,0,0,0,0,0,0,0,58,114,101,97,100,45,119,114,105,116,101,0,0,0,0,0,107,104,97,107,105,0,0,0,33,105,109,112,111,114,116,97,110,116,0,0,0,0,0,0,112,97,114,97,109,101,116,101,114,32,0,0,0,0,0,0,69,114,114,111,114,58,32,0,111,110,108,121,32,0,0,0,32,108,105,110,101,32,0,0,100,101,103,0,0,0,0,0,9,0,0,0,0,0,0,0,99,97,110,110,111,116,32,115,112,101,99,105,102,121,32,98,111,116,104,32,82,71,66,32,97,110,100,32,72,83,76,32,118,97,108,117,101,115,32,102,111,114,32,96,115,99,97,108,101,45,99,111,108,111,114,96,0,0,0,0,0,0,0,0,58,0,0,0,0,0,0,0,47,47,0,0,0,0,0,0,58,114,101,97,100,45,111,110,108,121,0,0,0,0,0,0,105,118,111,114,121,0,0,0,85,82,73,32,105,115,32,109,105,115,115,105,110,103,32,39,41,39,0,0,0,0,0,0,115,99,97,108,101,45,99,111,108,111,114,40,36,99,111,108,111,114,44,32,36,114,101,100,58,32,102,97,108,115,101,44,32,36,103,114,101,101,110,58,32,102,97,108,115,101,44,32,36,98,108,117,101,58,32,102,97,108,115,101,44,32,36,104,117,101,58,32,102,97,108,115,101,44,32,36,115,97,116,117,114,97,116,105,111,110,58,32,102,97,108,115,101,44,32,36,108,105,103,104,116,110,101,115,115,58,32,102,97,108,115,101,44,32,36,97,108,112,104,97,58,32,102,97,108,115,101,41,0,0,0,0,0,0,0,0,65,0,0,0,112,0,0,0,114,0,0,0,105,0,0,0,108,0,0,0,0,0,0,0,58,111,112,116,105,111,110,97,108,0,0,0,0,0,0,0,105,110,100,105,103,111,0,0,58,97,102,116,101,114,0,0,109,97,108,102,111,114,109,101,100,32,85,82,76,0,0,0,32,110,111,116,32,0,0,0,110,111,116,32,101,110,111,117,103,104,32,97,114,103,117,109,101,110,116,115,32,102,111,114,32,96,97,100,106,117,115,116,45,99,111,108,111,114,96,0,116,111,112,45,108,101,118,101,108,32,64,100,101,98,117,103,32,100,105,114,101,99,116,105,118,101,32,109,117,115,116,32,98,101,32,116,101,114,109,105,110,97,116,101,100,32,98,121,32,39,59,39,0,0,0,0,109,97,112,0,0,0,0,0,32,123,10,0,0,0,0,0,77,0,0,0,97,0,0,0,114,0,0,0,99,0,0,0,104,0,0,0,0,0,0,0,58,114,101,113,117,105,114,101,100,0,0,0,0,0,0,0,105,110,100,105,97,110,114,101,100,0,0,0,0,0,0,0,100,97,110,103,108,105,110,103,32,101,120,112,114,101,115,115,105,111,110,32,105,110,32,85,82,76,0,0,0,0,0,0,99,97,110,110,111,116,32,115,112,101,99,105,102,121,32,98,111,116,104,32,82,71,66,32,97,110,100,32,72,83,76,32,118,97,108,117,101,115,32,102,111,114,32,96,97,100,106,117,115,116,45,99,111,108,111,114,96,0,0,0,0,0,0,0,70,0,0,0,101,0,0,0,98,0,0,0,114,0,0,0,117,0,0,0,97,0,0,0,114,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,58,111,117,116,45,111,102,45,114,97,110,103,101,0,0,0,104,111,116,112,105,110,107,0,99,111,109,109,101,110,116,32,105,110,32,85,82,76,0,0,64,109,101,100,105,97,32,0,102,97,108,115,101,0,0,0,97,100,106,117,115,116,45,99,111,108,111,114,40,36,99,111,108,111,114,44,32,36,114,101,100,58,32,102,97,108,115,101,44,32,36,103,114,101,101,110,58,32,102,97,108,115,101,44,32,36,98,108,117,101,58,32,102,97,108,115,101,44,32,36,104,117,101,58,32,102,97,108,115,101,44,32,36,115,97,116,117,114,97,116,105,111,110,58,32,102,97,108,115,101,44,32,36,108,105,103,104,116,110,101,115,115,58,32,102,97,108,115,101,44,32,36,97,108,112,104,97,58,32,102,97,108,115,101,41,0,0,0,0,0,0,0,111,114,100,105,110,97,108,32,97,114,103,117,109,101,110,116,115,32,109,117,115,116,32,112,114,101,99,101,100,101,32,110,97,109,101,100,32,97,114,103,117,109,101,110,116,115,0,0,74,0,0,0,97,0,0,0,110,0,0,0,117,0,0,0,97,0,0,0,114,0,0,0,121,0,0,0,0,0,0,0,58,105,110,45,114,97,110,103,101,0,0,0,0,0,0,0,104,111,110,101,121,100,101,119,0,0,0,0,0,0,0,0,117,110,99,108,111,115,101,100,32,112,97,114,101,110,116,104,101,115,105,115,0,0,0,0,116,114,117,101,0,0,0,0,102,97,100,101,45,111,117,116,40,36,99,111,108,111,114,44,32,36,97,109,111,117,110,116,41,0,0,0,0,0,0,0,111,114,100,105,110,97,108,32,97,114,103,117,109,101,110,116,115,32,109,117,115,116,32,112,114,101,99,101,100,101,32,118,97,114,105,97,98,108,101,45,108,101,110,103,116,104,32,97,114,103,117,109,101,110,116,115,0,0,0,0,0,0,0,0,58,105,110,118,97,108,105,100,0,0,0,0,0,0,0,0,103,114,101,101,110,121,101,108,108,111,119,0,0,0,0,0,47,0,0,0,0,0,0,0,114,103,98,97,40,0,0,0,116,114,97,110,115,112,97,114,101,110,116,105,122,101,40,36,99,111,108,111,114,44,32,36,97,109,111,117,110,116,41,0,102,117,110,99,116,105,111,110,115,32,97,110,100,32,109,105,120,105,110,115,32,109,97,121,32,111,110,108,121,32,98,101,32,99,97,108,108,101,100,32,119,105,116,104,32,111,110,101,32,107,101,121,119,111,114,100,32,97,114,103,117,109,101,110,116,0,0,0,0,0,0,0,80,77,0,0,0,0,0,0,58,118,97,108,105,100,0,0,103,114,101,101,110,0,0,0,42,0,0,0,0,0,0,0,116,114,97,110,115,112,97,114,101,110,116,0,0,0,0,0,102,97,100,101,45,105,110,40,36,99,111,108,111,114,44,32,36,97,109,111,117,110,116,41,0,0,0,0,0,0,0,0,111,110,108,121,32,107,101,121,119,111,114,100,32,97,114,103,117,109,101,110,116,115,32,109,97,121,32,102,111,108,108,111,119,32,118,97,114,105,97,98,108,101,32,97,114,103,117,109,101,110,116,115,0,0,0,0,65,77,0,0,0,0,0,0,58,100,101,102,97,117,108,116,0,0,0,0,0,0,0,0,103,114,97,121,0,0,0,0,43,0,0,0,0,0,0,0,48,46,48,0,0,0,0,0,98,101,105,103,101,0,0,0,111,112,97,99,105,102,121,40,36,99,111,108,111,114,44,32,36,97,109,111,117,110,116,41,0,0,0,0,0,0,0,0,32,97,110,100,32,0,0,0,102,117,110,99,116,105,111,110,115,32,97,110,100,32,109,105,120,105,110,115,32,109,97,121,32,111,110,108,121,32,98,101,32,99,97,108,108,101,100,32,119,105,116,104,32,111,110,101,32,118,97,114,105,97,98,108,101,45,108,101,110,103,116,104,32,97,114,103,117,109,101,110,116,0,0,0,0,0,0,0,58,110,111,116,0,0,0,0,103,114,101,121,0,0,0,0,46,0,0,0,0,0,0,0,109,97,112,58,58,97,116,58,32,32,107,101,121,32,110,111,116,32,102,111,117,110,100,0,48,0,0,0,0,0,0,0,111,112,97,99,105,116,121,40,0,0,0,0,0,0,0,0,110,97,109,101,100,32,97,114,103,117,109,101,110,116,115,32,109,117,115,116,32,112,114,101,99,101,100,101,32,118,97,114,105,97,98,108,101,45,108,101,110,103,116,104,32,97,114,103,117,109,101,110,116,0,0,0,80,0,0,0,77,0,0,0,0,0,0,0,0,0,0,0,58,101,109,112,116,121,0,0,103,111,108,100,101,110,114,111,100,0,0,0,0,0,0,0,34,32,105,110,32,109,97,112,32,0,0,0,0,0,0,0,64,101,114,114,111,114,91,102,93,0,0,0,0,0,0,0,45,48,0,0,0,0,0,0,32,104,97,115,32,110,111,32,112,97,114,97,109,101,116,101,114,32,110,97,109,101,100,32,0,0,0,0,0,0,0,0,102,114,111,109,0,0,0,0,112,120,0,0,0,0,0,0,110,97,109,101,115,0,0,0,97,108,112,104,97,40,0,0,85,110,97,98,108,101,32,116,111,32,97,108,108,111,99,97,116,101,32,109,101,109,111,114,121,58,32,0,0,0,0,0,47,42,0,0,0,0,0,0,65,0,0,0,77,0,0,0,0,0,0,0,0,0,0,0,58,111,110,108,121,45,111,102,45,116,121,112,101,0,0,0,103,111,108,100,0,0,0,0,68,117,112,108,105,99,97,116,101,32,107,101,121,32,34,0,48,46,0,0,0,0,0,0,111,112,97,99,105,116,121,40,36,99,111,108,111,114,41,0,115,116,114,105,110,103,0,0,58,111,110,108,121,45,99,104,105,108,100,0,0,0,0,0,103,104,111,115,116,119,104,105,116,101,0,0,0,0,0,0,58,58,98,101,102,111,114,101,0,0,0,0,0,0,0,0,105,110,118,97,108,105,100,32,115,121,110,116,97,120,0,0,45,48,46,0,0,0,0,0,97,108,112,104,97,40,36,99,111,108,111,114,41,0,0,0,116,111,112,45,108,101,118,101,108,32,64,101,114,114,111,114,32,100,105,114,101,99,116,105,118,101,32,109,117,115,116,32,98,101,32,116,101,114,109,105,110,97,116,101,100,32,98,121,32,39,59,39,0,0,0,0,32,42,47,0,0,0,0,0,58,108,97,115,116,45,111,102,45,116,121,112,101,0,0,0,32,0,0,0,0,0,0,0,103,97,105,110,115,98,111,114,111,0,0,0,0,0,0,0,115,116,121,108,101,32,100,101,99,108,97,114,97,116,105,111,110,32,109,117,115,116,32,99,111,110,116,97,105,110,32,97,32,118,97,108,117,101,0,0,32,105,115,32,110,111,116,32,97,32,118,97,108,105,100,32,67,83,83,32,118,97,108,117,101,0,0,0,0,0,0,0,105,110,118,101,114,116,40,0,118,97,108,117,101,45,62,112,97,114,101,110,116,32,61,61,32,78,85,76,76,0,0,0,110,117,109,98,101,114,0,0,58,102,105,114,115,116,45,111,102,45,116,121,112,101,0,0,102,117,99,104,115,105,97,0,34,32,109,117,115,116,32,98,101,32,102,111,108,108,111,119,101,100,32,98,121,32,97,32,39,58,39,0,0,0,0,0,105,110,118,101,114,116,40,36,99,111,108,111,114,41,0,0,109,97,112,58,58,97,116,58,32,32,107,101,121,32,110,111,116,32,102,111,117,110,100,0,58,108,97,115,116,45,99,104,105,108,100,0,0,0,0,0,102,111,114,101,115,116,103,114,101,101,110,0,0,0,0,0,112,114,111,112,101,114,116,121,32,34,0,0,0,0,0,0,99,111,109,112,108,101,109,101,110,116,40,36,99,111,108,111,114,41,0,0,0,0,0,0,58,110,116,104,45,108,97,115,116,45,111,102,45,116,121,112,101,0,0,0,0,0,0,0,102,108,111,114,97,108,119,104,105,116,101,0,0,0,0,0,105,110,118,97,108,105,100,32,112,114,111,112,101,114,116,121,32,110,97,109,101,0,0,0,32,37,32,0,0,0,0,0,103,114,97,121,115,99,97,108,101,40,0,0,0,0,0,0,58,110,116,104,45,111,102,45,116,121,112,101,0,0,0,0,102,105,114,101,98,114,105,99,107,0,0,0,0,0,0,0,105,110,118,97,108,105,100,32,115,101,108,101,99,116,111,114,32,102,111,114,32,64,101,120,116,101,110,100,0,0,0,0,103,114,97,121,115,99,97,108,101,40,36,99,111,108,111,114,41,0,0,0,0,0,0,0,87,97,114,110,105,110,103,32,105,110,32,67,32,102,117,110,99,116,105,111,110,58,32,0,58,110,116,104,45,108,97,115,116,45,111,102,45,99,104,105,108,100,0,0,0,0,0,0,100,111,100,103,101,114,98,108,117,101,0,0,0,0,0,0,64,99,111,110,116,101,110,116,32,109,97,121,32,111,110,108,121,32,98,101,32,117,115,101,100,32,119,105,116,104,105,110,32,97,32,109,105,120,105,110,0,0,0,0,0,0,0,0,32,42,32,0,0,0,0,0,97,122,117,114,101,0,0,0,100,101,115,97,116,117,114,97,116,101,40,36,99,111,108,111,114,44,32,36,97,109,111,117,110,116,41,0,0,0,0,0,96,32,109,117,115,116,32,98,101,32,98,101,116,119,101,101,110,32,0,0,0,0,0,0,69,114,114,111,114,32,105,110,32,67,32,102,117,110,99,116,105,111,110,58,32,0,0,0,58,110,116,104,45,99,104,105,108,100,0,0,0,0,0,0,47,47,0,0,0,0,0,0,100,105,109,103,114,97,121,0,111,110,108,121,32,118,97,114,105,97,98,108,101,32,100,101,99,108,97,114,97,116,105,111,110,115,32,97,110,100,32,99,111,110,116,114,111,108,32,100,105,114,101,99,116,105,118,101,115,32,97,114,101,32,97,108,108,111,119,101,100,32,105,110,115,105,100,101,32,102,117,110,99,116,105,111,110,115,0,0,32,45,32,0,0,0,0,0,117,112,112,101,114,32,98,111,117,110,100,32,111,102,32,96,64,102,111,114,96,32,100,105,114,101,99,116,105,118,101,32,109,117,115,116,32,98,101,32,110,117,109,101,114,105,99,0,41,0,0,0,0,0,0,0,32,112,108,117,115,32,110,117,108,108,34,46,0,0,0,0,58,114,111,111,116,0,0,0,100,105,109,103,114,101,121,0,64,105,109,112,111,114,116,32,100,105,114,101,99,116,105,118,101,115,32,97,114,101,32,110,111,116,32,97,108,108,111,119,101,100,32,105,110,115,105,100,101,32,109,105,120,105,110,115,32,97,110,100,32,102,117,110,99,116,105,111,110,115,0,0,87,65,82,78,73,78,71,58,32,0,0,0,0,0,0,0,32,43,32,0,0,0,0,0,111,110,0,0,0,0,0,0,36,0,0,0,0,0,0,0,78,111,116,32,101,110,111,117,103,104,32,115,112,97,99,101,0,0,0,0,0,0,0,0,112,116,0,0,0,0,0,0,109,97,112,112,105,110,103,115,0,0,0,0,0,0,0,0,115,97,116,117,114,97,116,101,40,0,0,0,0,0,0,0,69,114,114,111,114,58,32,0,10,0,0,0,0,0,0,0,105,110,118,97,108,105,100,32,110,117,108,108,32,111,112,101,114,97,116,105,111,110,58,32,34,0,0,0,0,0,0,0,58,116,97,114,103,101,116,0,100,101,101,112,115,107,121,98,108,117,101,0,0,0,0,0,110,111,110,45,116,101,114,109,105,110,97,108,32,115,116,97,116,101,109,101,110,116,32,111,114,32,100,101,99,108,97,114,97,116,105,111,110,32,109,117,115,116,32,101,110,100,32,119,105,116,104,32,39,59,39,0,115,98,45,62,115,116,97,114,116,32,60,61,32,115,98,45,62,99,117,114,32,38,38,32,115,116,114,108,101,110,40,115,98,45,62,115,116,97,114,116,41,32,61,61,32,40,115,105,122,101,95,116,41,40,115,98,45,62,99,117,114,32,45,32,115,98,45,62,115,116,97,114,116,41,0,0,0,0,0,0,115,97,116,117,114,97,116,101,40,36,99,111,108,111,114,44,32,36,97,109,111,117,110,116,58,32,102,97,108,115,101,41,0,0,0,0,0,0,0,0,34,46,0,0,0,0,0,0,58,102,105,114,115,116,0,0,100,101,101,112,112,105,110,107,0,0,0,0,0,0,0,0,58,98,101,102,111,114,101,0,117,110,116,101,114,109,105,110,97,116,101,100,32,97,116,116,114,105,98,117,116,101,32,115,101,108,101,99,116,111,114,32,102,111,114,32,0,0,0,0,32,60,32,0,0,0,0,0,100,97,114,107,101,110,40,36,99,111,108,111,114,44,32,36,97,109,111,117,110,116,41,0,116,111,112,45,108,101,118,101,108,32,64,119,97,114,110,32,100,105,114,101,99,116,105,118,101,32,109,117,115,116,32,98,101,32,116,101,114,109,105,110,97,116,101,100,32,98,121,32,39,59,39,0,0,0,0,0,108,111,99,97,108,101,32,110,111,116,32,115,117,112,112,111,114,116,101,100,0,0,0,0,105,110,118,97,108,105,100,32,110,117,108,108,32,111,112,101,114,97,116,105,111,110,58,32,34,110,117,108,108,32,112,108,117,115,32,0,0,0,0,0,44,32,0,0,0,0,0,0,103,101,110,101,114,105,99,0,58,102,111,99,117,115,0,0,64,109,101,100,105,97,32,0,100,97,114,107,118,105,111,108,101,116,0,0,0,0,0,0,101,120,112,101,99,116,101,100,32,97,32,115,116,114,105,110,103,32,99,111,110,115,116,97,110,116,32,111,114,32,105,100,101,110,116,105,102,105,101,114,32,105,110,32,97,116,116,114,105,98,117,116,101,32,115,101,108,101,99,116,111,114,32,102,111,114,32,0,0,0,0,0,37,46,49,54,103,0,0,0,36,97,109,111,117,110,116,0,111,98,106,101,99,116,45,62,116,97,103,32,61,61,32,74,83,79,78,95,79,66,74,69,67,84,0,0,0,0,0,0,105,110,118,97,108,105,100,32,111,112,101,114,97,110,100,115,32,102,111,114,32,109,111,100,117,108,111,0,0,0,0,0,58,104,111,118,101,114,0,0,100,97,114,107,116,117,114,113,117,111,105,115,101,0,0,0,105,110,118,97,108,105,100,32,111,112,101,114,97,116,111,114,32,105,110,32,97,116,116,114,105,98,117,116,101,32,115,101,108,101,99,116,111,114,32,102,111,114,32,0,0,0,0,0,91,10,0,0,0,0,0,0,32,62,32,0,0,0,0,0,108,105,103,104,116,101,110,40,36,99,111,108,111,114,44,32,36,97,109,111,117,110,116,41,0,0,0,0,0,0,0,0,37,0,0,0,73,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,32,0,0,0,37,0,0,0,112,0,0,0,0,0,0,0,105,110,118,97,108,105,100,32,111,112,101,114,97,110,100,115,32,102,111,114,32,109,117,108,116,105,112,108,105,99,97,116,105,111,110,0,0,0,0,0,58,102,105,114,115,116,45,99,104,105,108,100,0,0,0,0,100,97,114,107,115,108,97,116,101,103,114,97,121,0,0,0,105,110,118,97,108,105,100,32,97,116,116,114,105,98,117,116,101,32,110,97,109,101,32,105,110,32,97,116,116,114,105,98,117,116,101,32,115,101,108,101,99,116,111,114,0,0,0,0,91,93,0,0,0,0,0,0,97,108,112,104,97,32,99,104,97,110,110,101,108,115,32,109,117,115,116,32,98,101,32,101,113,117,97,108,32,119,104,101,110,32,99,111,109,98,105,110,105,110,103,32,99,111,108,111,114,115,0,0,0,0,0,0,37,73,58,37,77,58,37,83,32,37,112,0,0,0,0,0,58,108,97,110,103,0,0,0,100,97,114,107,115,108,97,116,101,103,114,101,121,0,0,0,117,110,114,101,99,111,103,110,105,122,101,100,32,112,115,101,117,100,111,45,99,108,97,115,115,32,111,114,32,112,115,101,117,100,111,45,101,108,101,109,101,110,116,0,0,0,0,0,10,0,0,0,0,0,0,0,97,100,106,117,115,116,45,104,117,101,40,36,99,111,108,111,114,44,32,36,100,101,103,114,101,101,115,41,0,0,0,0,99,97,110,110,111,116,32,100,105,118,105,100,101,32,97,32,110,117,109,98,101,114,32,98,121,32,97,32,99,111,108,111,114,0,0,0,0,0,0,0,37,0,0,0,97,0,0,0,32,0,0,0,37,0,0,0,98,0,0,0,32,0,0,0,37,0,0,0,100,0,0,0,32,0,0,0,37,0,0,0,72,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,32,0,0,0,37,0,0,0,89,0,0,0,0,0,0,0,0,0,0,0,58,97,99,116,105,118,101,0,100,97,114,107,115,108,97,116,101,98,108,117,101,0,0,0,46,46,46,41,0,0,0,0,44,10,0,0,0,0,0,0,108,105,103,104,116,110,101,115,115,40,36,99,111,108,111,114,41,0,0,0,0,0,0,0,47,0,0,0,0,0,0,0,37,97,32,37,98,32,37,100,32,37,72,58,37,77,58,37,83,32,37,89,0,0,0,0,58,118,105,115,105,116,101,100,0,0,0,0,0,0,0,0,100,97,114,107,115,101,97,103,114,101,101,110,0,0,0,0,117,110,116,101,114,109,105,110,97,116,101,100,32,97,114,103,117,109,101,110,116,32,116,111,32,0,0,0,0,0,0,0,58,32,0,0,0,0,0,0,32,97,110,100,32,0,0,0,97,113,117,97,109,97,114,105,110,101,0,0,0,0,0,0,96,32,111,102,32,96,0,0,45,0,0,0,0,0,0,0,37,0,0,0,72,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,0,0,0,0,0,0,0,0,58,108,105,110,107,0,0,0,47,46,0,0,0,0,0,0,100,97,114,107,115,97,108,109,111,110,0,0,0,0,0,0,110,101,103,97,116,101,100,32,115,101,108,101,99,116,111,114,32,105,115,32,109,105,115,115,105,110,103,32,39,41,39,0,123,10,0,0,0,0,0,0,108,111,119,101,114,32,98,111,117,110,100,32,111,102,32,96,64,102,111,114,96,32,100,105,114,101,99,116,105,118,101,32,109,117,115,116,32,98,101,32,110,117,109,101,114,105,99,0,91,98,117,105,108,116,45,105,110,32,102,117,110,99,116,105,111,110,93,0,0,0,0,0,115,97,116,117,114,97,116,105,111,110,40,36,99,111,108,111,114,41,0,0,0,0,0,0,114,101,113,117,105,114,101,100,32,112,97,114,97,109,101,116,101,114,115,32,109,117,115,116,32,112,114,101,99,101,100,101,32,111,112,116,105,111,110,97,108,32,112,97,114,97,109,101,116,101,114,115,0,0,0,0,99,97,110,110,111,116,32,97,100,100,32,111,114,32,115,117,98,116,114,97,99,116,32,110,117,109,98,101,114,115,32,119,105,116,104,32,105,110,99,111,109,112,97,116,105,98,108,101,32,117,110,105,116,115,0,0,37,72,58,37,77,58,37,83,0,0,0,0,0,0,0,0,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,45,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,0,0,0,100,97,114,107,114,101,100,0,105,110,118,97,108,105,100,32,115,101,108,101,99,116,111,114,32,97,102,116,101,114,32,0,115,116,100,58,58,98,97,100,95,97,108,108,111,99,0,0,123,125,0,0,0,0,0,0,9,0,0,0,0,0,0,0,100,97,114,107,111,114,99,104,105,100,0,0,0,0,0,0,73,110,118,97,108,105,100,32,85,84,70,45,56,0,0,0,109,109,0,0,0,0,0,0,115,111,117,114,99,101,115,67,111,110,116,101,110,116,0,0,85,110,107,110,111,119,110,32,101,114,114,111,114,32,111,99,99,117,114,114,101,100,0,0,100,101,103,0,0,0,0,0,114,101,113,117,105,114,101,100,32,112,97,114,97,109,101,116,101,114,115,32,109,117,115,116,32,112,114,101,99,101,100,101,32,118,97,114,105,97,98,108,101,45,108,101,110,103,116,104,32,112,97,114,97,109,101,116].concat([101,114,115,0,0,0,0,0,32,42,47,0,0,0,0,0,100,105,118,105,115,105,111,110,32,98,121,32,122,101,114,111,0,0,0,0,0,0,0,0,37,0,0,0,109,0,0,0,47,0,0,0,37,0,0,0,100,0,0,0,47,0,0,0,37,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,123,0,0,0,0,0,0,0,97,108,105,99,101,98,108,117,101,0,0,0,0,0,0,0,101,120,112,101,99,116,101,100,32,97,32,39,123,39,32,97,102,116,101,114,32,116,104,101,32,115,101,108,101,99,116,111,114,0,0,0,0,0,0,0,116,114,117,101,0,0,0,0,64,99,111,110,116,101,110,116,59,0,0,0,0,0,0,0,104,117,101,40,36,99,111,108,111,114,41,0,0,0,0,0,102,117,110,99,116,105,111,110,115,32,97,110,100,32,109,105,120,105,110,115,32,99,97,110,110,111,116,32,104,97,118,101,32,109,111,114,101,32,116,104,97,110,32,111,110,101,32,118,97,114,105,97,98,108,101,45,108,101,110,103,116,104,32,112,97,114,97,109,101,116,101,114,0,0,0,0,0,0,0,0,73,110,102,105,110,105,116,121,0,0,0,0,0,0,0,0,37,109,47,37,100,47,37,121,0,0,0,0,0,0,0,0,32,9,10,11,12,13,0,0,100,97,114,107,111,114,97,110,103,101,0,0,0,0,0,0,101,120,112,101,99,116,101,100,32,97,32,39,123,39,32,97,102,116,101,114,32,110,97,109,101,115,112,97,99,101,100,32,112,114,111,112,101,114,116,121,0,0,0,0,0,0,0,0,110,117,108,108,0,0,0,0,64,105,110,99,108,117,100,101,32,0,0,0,0,0,0,0,59,0,0,0,0,0,0,0,104,115,108,97,40,36,104,117,101,44,32,36,115,97,116,117,114,97,116,105,111,110,44,32,36,108,105,103,104,116,110,101,115,115,44,32,36,97,108,112,104,97,41,0,0,0,0,0,116,111,112,45,108,101,118,101,108,32,64,105,110,99,108,117,100,101,32,100,105,114,101,99,116,105,118,101,32,109,117,115,116,32,98,101,32,116,101,114,109,105,110,97,116,101,100,32,98,121,32,39,59,39,0,0,111,112,116,105,111,110,97,108,32,112,97,114,97,109,101,116,101,114,115,32,109,97,121,32,110,111,116,32,98,101,32,99,111,109,98,105,110,101,100,32,119,105,116,104,32,118,97,114,105,97,98,108,101,45,108,101,110,103,116,104,32,112,97,114,97,109,101,116,101,114,115,0,99,97,110,110,111,116,32,99,111,109,112,97,114,101,32,110,117,109,98,101,114,115,32,119,105,116,104,32,105,110,99,111,109,112,97,116,105,98,108,101,32,117,110,105,116,115,0,0,47,42,32,108,105,110,101,32,0,0,0,0,0,0,0,0,32,123,32,0,0,0,0,0,100,97,114,107,111,108,105,118,101,103,114,101,101,110,0,0,32,105,110,32,97,115,115,105,103,110,109,101,110,116,32,115,116,97,116,101,109,101,110,116,0,0,0,0,0,0,0,0,116,97,103,95,105,115,95,118,97,108,105,100,40,110,111,100,101,45,62,116,97,103,41,0,64,102,117,110,99,116,105,111,110,32,0,0,0,0,0,0,100,97,114,107,109,97,103,101,110,116,97,0,0,0,0,0,36,108,105,103,104,116,110,101,115,115,0,0,0,0,0,0,101,108,101,109,101,110,116,45,62,112,97,114,101,110,116,32,61,61,32,78,85,76,76,0,109,97,121,32,111,110,108,121,32,99,111,109,112,97,114,101,32,110,117,109,98,101,114,115,0,0,0,0,0,0,0,0,102,0,0,0,97,0,0,0,108,0,0,0,115,0,0,0,101,0,0,0,0,0,0,0,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,48,49,50,51,52,53,54,55,56,57,43,47,0,0,0,0,0,0,0,0,101,120,112,101,99,116,101,100,32,39,58,39,32,97,102,116,101,114,32,0,0,0,0,0,79,117,116,32,111,102,32,109,101,109,111,114,121,46,10,0,64,109,105,120,105,110,32,0,37,112,0,0,0,0,0,0,36,115,97,116,117,114,97,116,105,111,110,0,0,0,0,0,102,97,108,115,101,0,0,0,100,97,114,107,107,104,97,107,105,0,0,0,0,0,0,0,105,110,118,97,108,105,100,32,110,97,109,101,32,105,110,32,64,105,110,99,108,117,100,101,32,100,105,114,101,99,116,105,118,101,0,0,0,0,0,0,116,0,0,0,114,0,0,0,117,0,0,0,101,0,0,0,0,0,0,0,0,0,0,0,45,43,48,49,50,51,52,53,54,55,56,57,46,0,0,0,42,47,0,0,0,0,0,0,100,97,114,107,103,114,101,101,110,0,0,0,0,0,0,0,101,120,112,101,99,116,101,100,32,97,32,118,97,114,105,97,98,108,101,32,110,97,109,101,32,40,101,46,103,46,32,36,120,41,32,111,114,32,39,41,39,32,102,111,114,32,116,104,101,32,112,97,114,97,109,101,116,101,114,32,108,105,115,116,32,102,111,114,32,0,0,0,48,49,50,51,52,53,54,55,56,57,65,66,67,68,69,70,0,0,0,0,0,0,0,0,59,0,0,0,0,0,0,0,104,115,108,40,36,104,117,101,44,32,36,115,97,116,117,114,97,116,105,111,110,44,32,36,108,105,103,104,116,110,101,115,115,41,0,0,0,0,0,0,116,114,117,101,0,0,0,0,32,10,13,9,0,0,0,0,44,0,0,0,0,0,0,0,100,97,114,107,103,114,97,121,0,0,0,0,0,0,0,0,32,109,117,115,116,32,98,101,103,105,110,32,119,105,116,104,32,97,32,39,123,39,0,0,64,119,104,105,108,101,32,0,100,97,114,107,103,114,101,121,0,0,0,0,0,0,0,0,36,119,101,105,103,104,116,0,45,46,0,0,0,0,0,0,64,99,111,110,116,101,110,116,0,0,0,0,0,0,0,0,58,32,0,0,0,0,0,0,32,0,0,0,0,0,0,0,97,113,117,97,0,0,0,0,97,114,103,117,109,101,110,116,32,96,0,0,0,0,0,0,46,0,0,0,0,0,0,0,64,101,120,116,101,110,100,0,46,47,0,0,0,0,0,0,100,97,114,107,103,111,108,100,101,110,114,111,100,0,0,0,98,111,100,121,32,102,111,114,32,0,0,0,0,0,0,0,102,97,108,115,101,0,0,0,44,32,0,0,0,0,0,0,99,111,110,116,101,110,116,115,32,111,102,32,110,97,109,101,115,112,97,99,101,100,32,112,114,111,112,101,114,116,105,101,115,32,109,117,115,116,32,114,101,115,117,108,116,32,105,110,32,115,116,121,108,101,32,100,101,99,108,97,114,97,116,105,111,110,115,32,111,110,108,121,0,0,0,0,0,0,0,0,117,110,98,111,117,110,100,32,118,97,114,105,97,98,108,101,32,0,0,0,0,0,0,0,64,114,101,116,117,114,110,0,100,97,114,107,99,121,97,110,0,0,0,0,0,0,0,0,34,46,0,0,0,0,0,0,117,116,102,56,95,118,97,108,105,100,97,116,101,40,115,116,114,41,0,0,0,0,0,0,64,101,97,99,104,32,0,0,66,97,99,107,116,114,97,99,101,58,0,0,0,0,0,0,103,105,118,101,110,32,0,0,100,97,114,107,98,108,117,101,0,0,0,0,0,0,0,0,112,99,0,0,0,0,0,0,115,111,117,114,99,101,115,0,46,99,115,115,0,0,0,0,109,105,120,40,36,99,111,108,111,114,45,49,44,32,36,99,111,108,111,114,45,50,44,32,36,119,101,105,103,104,116,58,32,53,48,37,41,0,0,0,105,111,115,95,98,97,115,101,58,58,99,108,101,97,114,0,105,110,116,101,114,110,97,108,32,101,114,114,111,114,58,32,115,117,98,115,101,116,32,109,97,112,32,107,101,121,115,32,109,97,121,32,110,111,116,32,98,101,32,101,109,112,116,121,0,0,0,0,0,0,0,0,10,13,0,0,0,0,0,0,96,32,103,105,118,101,110,32,119,114,111,110,103,32,110,117,109,98,101,114,32,111,102,32,97,114,103,117,109,101,110,116,115,0,0,0,0,0,0,0,39,0,0,0,0,0,0,0,108,105,115,116,0,0,0,0,73,110,118,97,108,105,100,32,102,117,110,99,116,105,111,110,32,110,97,109,101,32,34,0,32,116,111,32,0,0,0,0,99,121,97,110,0,0,0,0,98,108,117,101,40,36,99,111,108,111,114,41,0,0,0,0,114,98,0,0,0,0,0,0,111,118,101,114,108,111,97,100,101,100,32,102,117,110,99,116,105,111,110,32,96,0,0,0,34,0,0,0,0,0,0,0,97,114,103,108,105,115,116,0,110,111,116,0,0,0,0,0,32,116,104,114,111,117,103,104,32,0,0,0,0,0,0,0,99,114,105,109,115,111,110,0,103,114,101,101,110,40,36,99,111,108,111,114,41,0,0,0,116,111,112,45,108,101,118,101,108,32,118,97,114,105,97,98,108,101,32,98,105,110,100,105,110,103,32,109,117,115,116,32,98,101,32,116,101,114,109,105,110,97,116,101,100,32,98,121,32,39,59,39,0,0,0,0,115,116,100,58,58,98,97,100,95,99,97,115,116,0,0,0,119,97,114,110,105,110,103,32,105,110,32,67,32,102,117,110,99,116,105,111,110,32,0,0,10,0,0,0,0,0,0,0,114,97,110,100,111,109,95,100,101,118,105,99,101,32,102,97,105,108,101,100,32,116,111,32,111,112,101,110,32,0,0,0,117,114,108,40,0,0,0,0,115,112,97,99,101,0,0,0,111,114,0,0,0,0,0,0,32,102,114,111,109,32,0,0,66,111,116,104,32,116,104,101,32,99,117,114,114,101,110,116,32,110,111,100,101,32,97,110,100,32,114,104,115,32,109,117,115,116,32,98,101,32,99,111,108,108,101,99,116,105,111,110,115,46,0,0,0,0,0,0,99,111,114,110,115,105,108,107,0,0,0,0,0,0,0,0,114,101,100,40,36,99,111,108,111,114,41,0,0,0,0,0,106,115,111,110,46,99,112,112,0,0,0,0,0,0,0,0,96,69,120,112,97,110,100,96,32,100,111,101,115,110,39,116,32,104,97,110,100,108,101,32,0,0,0,0,0,0,0,0,58,32,0,0,0,0,0,0,64,105,109,112,111,114,116,0,109,97,112,0,0,0,0,0,110,117,109,98,101,114,0,0,99,111,109,109,97,0,0,0,115,116,114,105,110,103,0,0,97,110,100,0,0,0,0,0,108,111,119,101,114,32,98,111,117,110,100,32,111,102,32,96,64,102,111,114,96,32,100,105,114,101,99,116,105,118,101,32,109,117,115,116,32,98,101,32,110,117,109,101,114,105,99,0,32,123,10,0,0,0,0,0,64,102,111,114,32,0,0,0,96,32,109,117,115,116,32,98,101,32,97,32,0,0,0,0,99,111,114,110,102,108,111,119,101,114,98,108,117,101,0,0,117,0,0,0,0,0,0,0,36,99,111,108,111,114,0,0,117,110,105,113,117,101,45,105,100,40,41,0,0,0,0,0,67,0,0,0,0,0,0,0,117,110,107,110,111,119,110,32,105,110,116,101,114,110,97,108,32,101,114,114,111,114,59,32,112,108,101,97,115,101,32,99,111,110,116,97,99,116,32,116,104,101,32,76,105,98,83,97,115,115,32,109,97,105,110,116,97,105,110,101,114,115,0,0,102,97,108,115,101,0,0,0,101,114,114,111,114,32,105,110,32,67,32,102,117,110,99,116,105,111,110,32,0,0,0,0,64,105,110,99,108,117,100,101,32,0,0,0,0,0,0,0,110,117,108,108,0,0,0,0,105,110,115,112,101,99,116,40,36,118,97,108,117,101,41,0,118,97,114,105,97,98,108,101,45,108,101,110,103,116,104,32,97,114,103,117,109,101,110,116,32,109,97,121,32,110,111,116,32,98,101,32,112,97,115,115,101,100,32,98,121,32,110,97,109,101,0,0,0,0,0,0,32,100,101,102,105,110,105,116,105,111,110,0,0,0,0,0,47,0,0,0,0,0,0,0,36,111,110,108,121,45,112,97,116,104,0,0,0,0,0,0,36,112,97,116,104,0,0,0,105,109,97,103,101,45,117,114,108,40,36,112,97,116,104,44,32,36,111,110,108,121,45,112,97,116,104,58,32,102,97,108,115,101,44,32,36,99,97,99,104,101,45,98,117,115,116,101,114,58,32,102,97,108,115,101,41,0,0,0,0,0,0,0,99,111,108,111,114,0,0,0,99,111,114,97,108,0,0,0,36,105,102,45,102,97,108,115,101,0,0,0,0,0,0,0,64,99,104,97,114,115,101,116,32,34,85,84,70,45,56,34,59,10,0,0,0,0,0,0,114,103,98,97,40,36,99,111,108,111,114,44,32,36,97,108,112,104,97,41,0,0,0,0,118,101,99,116,111,114,0,0,109,105,120,105,110,32,0,0,36,99,111,110,100,105,116,105,111,110,0,0,0,0,0,0,32,100,105,100,32,110,111,116,32,114,101,116,117,114,110,32,97,32,118,97,108,117,101,0,105,102,40,36,99,111,110,100,105,116,105,111,110,44,32,36,105,102,45,116,114,117,101,44,32,36,105,102,45,102,97,108,115,101,41,0,0,0,0,0,43,0,0,0,0,0,0,0,110,111,116,40,36,118,97,108,117,101,41,0,0,0,0,0,91,98,117,105,108,116,45,105,110,32,102,117,110,99,116,105,111,110,93,0,0,0,0,0,117,110,111,114,100,101,114,101,100,95,109,97,112,58,58,97,116,58,32,107,101,121,32,110,111,116,32,102,111,117,110,100,0,0,0,0,0,0,0,0,99,97,108,108,40,36,110,97,109,101,44,32,36,97,114,103,115,46,46,46,41,0,0,0,105,110,118,97,108,105,100,32,110,97,109,101,32,105,110,32,0,0,0,0,0,0,0,0,91,102,93,0,0,0,0,0,102,101,97,116,117,114,101,45,101,120,105,115,116,115,40,36,110,97,109,101,41,0,0,0,32,42,47,0,0,0,0,0,91,109,93,0,0,0,0,0,47,42,35,32,115,111,117,114,99,101,77,97,112,112,105,110,103,85,82,76,61,0,0,0,109,105,120,105,110,45,101,120,105,115,116,115,40,36,110,97,109,101,41,0,0,0,0,0,100,97,116,97,58,97,112,112,108,105,99,97,116,105,111,110,47,106,115,111,110,59,98,97,115,101,54,52,44,0,0,0,91,102,93,0,0,0,0,0,10,0,0,0,0,0,0,0,102,117,110,99,116,105,111,110,45,101,120,105,115,116,115,40,36,110,97,109,101,41,0,0,99,104,111,99,111,108,97,116,101,0,0,0,0,0,0,0,91,67,79,76,79,82,32,84,65,66,76,69,93,0,0,0,103,108,111,98,97,108,45,118,97,114,105,97,98,108,101,45,101,120,105,115,116,115,40,36,110,97,109,101,41,0,0,0,36,97,108,112,104,97,0,0,70,105,108,101,32,116,111,32,114,101,97,100,32,110,111,116,32,102,111,117,110,100,32,111,114,32,117,110,114,101,97,100,97,98,108,101,58,32,0,0,37,46,48,76,102,0,0,0,64,99,111,110,116,101,110,116,91,109,93,0,0,0,0,0,115,116,100,111,117,116,0,0,96,0,0,0,0,0,0,0,36,110,97,109,101,0,0,0,64,109,105,120,105,110,32,0,115,116,100,105,110,0,0,0,118,97,114,105,97,98,108,101,45,101,120,105,115,116,115,40,36,110,97,109,101,41,0,0,36,110,117,109,98,101,114,45,50,0,0,0,0,0,0,0,101,120,112,101,99,116,105,110,103,32,97,110,111,116,104,101,114,32,117,114,108,32,111,114,32,113,117,111,116,101,100,32,112,97,116,104,32,105,110,32,64,105,109,112,111,114,116,32,108,105,115,116,0,0,0,0,32,9,10,11,12,13,0,0,36,110,117,109,98,101,114,45,49,0,0,0,0,0,0,0,116,114,97,110,115,112,97,114,101,110,116,0,0,0,0,0,64,100,101,98,117,103,32,0,99,111,109,112,97,114,97,98,108,101,40,36,110,117,109,98,101,114,45,49,44,32,36,110,117,109,98,101,114,45,50,41,0,0,0,0,0,0,0,0,114,101,98,101,99,99,97,112,117,114,112,108,101,0,0,0,105,110,0,0,0,0,0,0,117,110,105,116,108,101,115,115,40,36,110,117,109,98,101,114,41,0,0,0,0,0,0,0,117,110,111,114,100,101,114,101,100,95,109,97,112,58,58,97,116,58,32,107,101,121,32,110,111,116,32,102,111,117,110,100,0,0,0,0,0,0,0,0,121,101,108,108,111,119,103,114,101,101,110,0,0,0,0,0,36,110,117,109,98,101,114,0,121,101,108,108,111,119,0,0,117,110,105,116,40,36,110,117,109,98,101,114,41,0,0,0,99,104,97,114,116,114,101,117,115,101,0,0,0,0,0,0,119,104,105,116,101,115,109,111,107,101,0,0,0,0,0,0,118,101,114,115,105,111,110,0,99,111,108,111,114,0,0,0,114,103,98,97,40,36,114,101,100,44,32,36,103,114,101,101,110,44,32,36,98,108,117,101,44,32,36,97,108,112,104,97,41,0,0,0,0,0,0,0,119,104,105,116,101,0,0,0,109,111,110,101,121,95,103,101,116,32,101,114,114,111,114,0,116,121,112,101,45,111,102,40,36,118,97,108,117,101,41,0,119,104,101,97,116,0,0,0,44,32,105,110,32,102,117,110,99,116,105,111,110,32,96,0,36,97,114,103,115,0,0,0,61,0,0,0,0,0,0,0,118,105,111,108,101,116,0,0,107,101,121,119,111,114,100,115,40,36,97,114,103,115,41,0,115,121,115,116,101,109,0,0,116,117,114,113,117,111,105,115,101,0,0,0,0,0,0,0,32,111,110,108,121,32,116,97,107,101,115,32,0,0,0,0,36,107,101,121,115,0,0,0,64,105,109,112,111,114,116,32,100,105,114,101,99,116,105,118,101,32,114,101,113,117,105,114,101,115,32,97,32,117,114,108,32,111,114,32,113,117,111,116,101,100,32,112,97,116,104,0,46,46,46,0,0,0,0,0,116,111,109,97,116,111,0,0,109,97,112,45,114,101,109,111,118,101,40,36,109,97,112,44,32,36,107,101,121,115,46,46,46,41,0,0,0,0,0,0,116,104,105,115,116,108,101,0,64,101,114,114,111,114,32,0,46,0,0,0,0,0,0,0,36,109,97,112,50,0,0,0,116,101,97,108,0,0,0,0,36,109,97,112,49,0,0,0,116,97,110,0,0,0,0,0,109,97,112,45,109,101,114,103,101,40,36,109,97,112,49,44,32,36,109,97,112,50,41,0,115,116,101,101,108,98,108,117,101,0,0,0,0,0,0,0,109,97,112,45,118,97,108,117,101,115,40,36,109,97,112,41,0,0,0,0,0,0,0,0,99,97,100,101,116,98,108,117,101,0,0,0,0,0,0,0,83,97,116,0,0,0,0,0,115,112,114,105,110,103,103,114,101,101,110,0,0,0,0,0,109,97,112,45,107,101,121,115,40,36,109,97,112,41,0,0,70,114,105,0,0,0,0,0,105,111,115,116,114,101,97,109,0,0,0,0,0,0,0,0,115,110,111,119,0,0,0,0,37,76,102,0,0,0,0,0,91,99,32,102,117,110,99,116,105,111,110,93,0,0,0,0,96,0,0,0,0,0,0,0,32,105,115,32,109,105,115,115,105,110,103,32,105,110,32,99,97,108,108,32,116,111,32,0,115,108,97,116,101,103,114,97,121,0,0,0,0,0,0,0,109,97,112,45,104,97,115,45,107,101,121,40,36,109,97,112,44,32,36,107,101,121,41,0,84,104,117,0,0,0,0,0,97,110,116,105,113,117,101,119,104,105,116,101,0,0,0,0,102,117,110,99,116,105,111,110,32,0,0,0,0,0,0,0,64,101,114,114,111,114,0,0,87,101,100,0,0,0,0,0,115,108,97,116,101,103,114,101,121,0,0,0,0,0,0,0,47,46,47,0,0,0,0,0,84,117,101,0,0,0,0,0,115,108,97,116,101,98,108,117,101,0,0,0,0,0,0,0,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,48,49,50,51,52,53,54,55,56,57,43,47,0,0,0,0,0,0,0,0,109,97,112,45,103,101,116,40,36,109,97,112,44,32,36,107,101,121,41,0,0,0,0,0,10,67,117,114,114,101,110,116,32,100,105,114,58,32,0,0,77,111,110,0,0,0,0,0,115,107,121,98,108,117,101,0,84,104,101,32,110,111,100,101,32,116,111,32,99,111,110,118,101,114,116,39,115,32,99,104,105,108,100,114,101,110,32,109,117,115,116,32,98,101,32,111,110,108,121,32,99,111,109,98,105,110,97,116,111,114,115,32,111,114,32,115,101,108,101,99,116,111,114,115,46,0,0,0,108,105,115,116,95,115,101,112,97,114,97,116,111,114,40,36,108,105,115,116,41,0,0,0,83,117,110,0,0,0,0,0,115,105,108,118,101,114,0,0,64,119,97,114,110,32,0,0,36,118,97,108,117,101,115,0,83,97,116,117,114,100,97,121,0,0,0,0,0,0,0,0,115,105,101,110,110,97,0,0,99,111,109,112,97,99,116,40,36,118,97,108,117,101,115,46,46,46,41,0,0,0,0,0,70,114,105,100,97,121,0,0,115,101,97,115,104,101,108,108,0,0,0,0,0,0,0,0,45,0,0,0,0,0,0,0,36,108,105,115,116,115,0,0,84,104,117,114,115,100,97,121,0,0,0,0,0,0,0,0,115,101,97,103,114,101,101,110,0,0,0,0,0,0,0,0,122,105,112,40,36,108,105,115,116,115,46,46,46,41,0,0,98,117,114,108,121,119,111,111,100,0,0,0,0,0,0,0,87,101,100,110,101,115,100,97,121,0,0,0,0,0,0,0,115,97,110,100,121,98,114,111,119,110,0,0,0,0,0,0,32,9,10,11,12,13,0,0,36,98,108,117,101,0,0,0,84,117,101,115,100,97,121,0,115,97,108,109,111,110,0,0,44,32,105,110,32,109,105,120,105,110,32,96,0,0,0,0,97,112,112,101,110,100,40,36,108,105,115,116,44,32,36,118,97,108,44,32,36,115,101,112,97,114,97,116,111,114,58,32,97,117,116,111,41,0,0,0,114,101,113,117,105,114,101,100,32,112,97,114,97,109,101,116,101,114,32,0,0,0,0,0,77,111,110,100,97,121,0,0,115,97,100,100,108,101,98,114,111,119,110,0,0,0,0,0,42,91,102,93,0,0,0,0,96,32,109,117,115,116,32,98,101,32,96,115,112,97,99,101,96,44,32,96,99,111,109,109,97,96,44,32,111,114,32,96,97,117,116,111,96,0,0,0,64,100,101,98,117,103,0,0,83,117,110,100,97,121,0,0,114,111,121,97,108,98,108,117,101,0,0,0,0,0,0,0,97,114,103,117,109,101,110,116,32,96,36,115,101,112,97,114,97,116,111,114,96,32,111,102,32,96,0,0,0,0,0,0,114,111,115,121,98,114,111,119,110,0,0,0,0,0,0,0,58,58,0,0,0,0,0,0,97,117,116,111,0,0,0,0,102,105,108,101,32,116,111,32,105,109,112,111,114,116,32,110,111,116,32,102,111,117,110,100,32,111,114,32,117,110,114,101,97,100,97,98,108,101,58,32,0,0,0,0,0,0,0,0,83,0,0,0,97,0,0,0,116,0,0,0,0,0,0,0,114,101,100,0,0,0,0,0,99,111,109,109,97,0,0,0,70,0,0,0,114,0,0,0,105,0,0,0,0,0,0,0,117,112,112,101,114,32,98,111,117,110,100,32,111,102,32,96,64,102,111,114,96,32,100,105,114,101,99,116,105,118,101,32,109,117,115,116,32,98,101,32,110,117,109,101,114,105,99,0,112,117,114,112,108,101,0,0,115,112,97,99,101,0,0,0,84,0,0,0,104,0,0,0,117,0,0,0,0,0,0,0,112,111,119,100,101,114,98,108,117,101,0,0,0,0,0,0,36,115,101,112,97,114,97,116,111,114,0,0,0,0,0,0,87,0,0,0,101,0,0,0,100,0,0,0,0,0,0,0,112,108,117,109,0,0,0,0,112,105,110,107,0,0,0,0,36,108,105,115,116,50,0,0,84,0,0,0,117,0,0,0,101,0,0,0,0,0,0,0,32,97,114,103,117,109,101,110,116,115,59,32,0,0,0,0,35,0,0,0,0,0,0,0,73,110,118,97,108,105,100,32,99,111,100,101,32,112,111,105,110,116,0,0,0,0,0,0,99,109,0,0,0,0,0,0,36,108,105,115,116,49,0,0,102,105,108,101,0,0,0,0,98,114,111,119,110,0,0,0,77,0,0,0,111,0,0,0,110,0,0,0,0,0,0,0,112,101,114,117,0,0,0,0,106,111,105,110,40,36,108,105,115,116,49,44,32,36,108,105,115,116,50,44,32,36,115,101,112,97,114,97,116,111,114,58,32,97,117,116,111,41,0,0,117,110,115,112,101,99,105,102,105,101,100,32,105,111,115,116,114,101,97,109,95,99,97,116,101,103,111,114,121,32,101,114,114,111,114,0,0,0,0,0,36,103,114,101,101,110,0,0,83,0,0,0,117,0,0,0,110,0,0,0,0,0,0,0,46,115,97,115,115,0,0,0,112,101,97,99,104,112,117,102,102,0,0,0,0,0,0,0,110,111,32,109,105,120,105,110,32,110,97,109,101,100,32,0,105,110,100,101,120,40,36,108,105,115,116,44,32,36,118,97,108,117,101,41,0,0,0,0,112,114,111,118,105,100,101,100,32,109,111,114,101,32,116,104,97,110,32,111,110,99,101,32,105,110,32,99,97,108,108,32,116,111,32,0,0,0,0,0,83,0,0,0,97,0,0,0,116,0,0,0,117,0,0,0,114,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,112,97,112,97,121,97,119,104,105,112,0,0,0,0,0,0,105,102,91,102,93,0,0,0,115,101,116,45,110,116,104,40,36,108,105,115,116,44,32,36,110,44,32,36,118,97,108,117,101,41,0,0,0,0,0,0,64,119,97,114,110,0,0,0,70,0,0,0,114,0,0,0,105,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,112,97,108,101,118,105,111,108,101,116,114,101,100,0,0,0,105,110,100,101,120,32,111,117,116,32,111,102,32,98,111,117,110,100,115,32,102,111,114,32,96,0,0,0,0,0,0,0,84,0,0,0,104,0,0,0,117,0,0,0,114,0,0,0,115,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,112,97,108,101,116,117,114,113,117,111,105,115,101,0,0,0,58,58,102,105,114,115,116,45,108,101,116,116,101,114,0,0,96,32,109,117,115,116,32,110,111,116,32,98,101,32,101,109,112,116,121,0,0,0,0,0,117,114,108,0,0,0,0,0,87,0,0,0,101,0,0,0,100,0,0,0,110,0,0,0,101,0,0,0,115,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,114,103,98,97,40,0,0,0,112,97,108,101,103,114,101,101,110,0,0,0,0,0,0,0,84,104,101,32,110,111,100,101,32,116,111,32,99,111,110,118,101,114,116,32,116,111,32,97,32,67,111,109,112,108,101,120,95,83,101,108,101,99,116,111,114,42,32,109,117,115,116,32,98,101,32,97,32,99,111,108,108,101,99,116,105,111,110,32,116,121,112,101,32,111,114,32,110,105,108,46,0,0,0,0,97,114,103,117,109,101,110,116,32,96,36,108,105,115,116,96,32,111,102,32,96,0,0,0,84,0,0,0,117,0,0,0,101,0,0,0,115,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,118,97,114,105,97,98,108,101,45,108,101,110,103,116,104,32,112,97,114,97,109,101,116,101,114,32,109,97,121,32,110,111,116,32,104,97,118,101,32,97,32,100,101,102,97,117,108,116,32,118,97,108,117,101,0,0,112,97,108,101,103,111,108,100,101,110,114,111,100,0,0,0,32,33,100,101,102,97,117,108,116,0,0,0,0,0,0,0,96,32,109,117,115,116,32,98,101,32,110,111,110,45,122,101,114,111,0,0,0,0,0,0,77,0,0,0,111,0,0,0,110,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,111,114,99,104,105,100,0,0,97,114,103,117,109,101,110,116,32,96,36,110,96,32,111,102,32,96,0,0,0,0,0,0,83,0,0,0,117,0,0,0,110,0,0,0,100,0,0,0,97,0,0,0,121,0,0,0,0,0,0,0,0,0,0,0,111,114,97,110,103,101,114,101,100,0,0,0,0,0,0,0,111,114,97,110,103,101,0,0,110,116,104,40,36,108,105,115,116,44,32,36,110,41,0,0,68,101,99,0,0,0,0,0,98,108,117,101,118,105,111,108,101,116,0,0,0,0,0,0,111,108,105,118,101,100,114,97,98,0,0,0,0,0,0,0,36,108,105,115,116,0,0,0,78,111,118,0,0,0,0,0,46,115,99,115,115,0,0,0,111,108,105,118,101,0,0,0,91,102,93,0,0,0,0,0,108,101,110,103,116,104,40,36,108,105,115,116,41,0,0,0,99,97,110,110,111,116,32,98,101,32,117,115,101,100,32,97,115,32,110,97,109,101,100,32,97,114,103,117,109,101,110,116,0,0,0,0,0,0,0,0,79,99,116,0,0,0,0,0,111,108,100,108,97,99,101,0,91,102,93,0,0,0,0,0,96,32,109,117,115,116,32,98,101,32,97,110,32,105,110,116,101,103,101,114,0,0,0,0,58,58,0,0,0,0,0,0,83,101,112,0,0,0,0,0,110,97,118,121,0,0,0,0,97,114,103,117,109,101,110,116,32,36,108,105,109,105,116,32,111,102,32,96,0,0,0,0,65,117,103,0,0,0,0,0,110,97,118,97,106,111,119,104,105,116,101,0,0,0,0,0,58,102,105,114,115,116,45,108,101,116,116,101,114,0,0,0,58,0,0,0,0,0,0,0,42,0,0,0,0,0,0,0,115,98,95,102,105,110,105,115,104,0,0,0,0,0,0,0,101,109,105,116,95,118,97,108,117,101,95,105,110,100,101,110,116,101,100,0,0,0,0,0,101,109,105,116,95,115,116,114,105,110,103,0,0,0,0,0,101,109,105,116,95,118,97,108,117,101,0,0,0,0,0,0,106,115,111,110,95,97,112,112,101,110,100,95,101,108,101,109,101,110,116,0,0,0,0,0,106,115,111,110,95,97,112,112,101,110,100,95,109,101,109,98,101,114,0,0,0,0,0,0,48,49,50,51,52,53,54,55,56,57,0,0,0,0,0,0,48,49,50,51,52,53,54,55,56,57,0,0,0,0,0,0,37,0,0,0,89,0,0,0,45,0,0,0,37,0,0,0,109,0,0,0,45,0,0,0,37,0,0,0,100,0,0,0,37,0,0,0,72,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,37,0,0,0,72,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,0,0,0,0,37,0,0,0,73,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,32,0,0,0,37,0,0,0,112,0,0,0,0,0,0,0,37,0,0,0,109,0,0,0,47,0,0,0,37,0,0,0,100,0,0,0,47,0,0,0,37,0,0,0,121,0,0,0,37,0,0,0,72,0,0,0,58,0,0,0,37,0,0,0,77,0,0,0,58,0,0,0,37,0,0,0,83,0,0,0,37,72,58,37,77,58,37,83,37,72,58,37,77,0,0,0,37,73,58,37,77,58,37,83,32,37,112,0,0,0,0,0,37,89,45,37,109,45,37,100,37,109,47,37,100,47,37,121,37,72,58,37,77,58,37,83,37,0,0,0,0,0,0,0,37,112,0,0,0,0,0,0,0,0,0,0,136,138,0,0,36,2,0,0,156,1,0,0,122,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,152,138,0,0,224,1,0,0,24,1,0,0,126,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,168,138,0,0,66,0,0,0,72,0,0,0,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,184,138,0,0,66,0,0,0,90,1,0,0,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,200,138,0,0,228,0,0,0,182,0,0,0,30,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,216,138,0,0,228,0,0,0,94,1,0,0,30,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,232,138,0,0,228,0,0,0,26,2,0,0,30,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,139,0,0,140,0,0,0,220,0,0,0,40,0,0,0,4,0,0,0,54,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,139,0,0,86,1,0,0,14,0,0,0,40,0,0,0,2,0,0,0,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,80,139,0,0,136,0,0,0,38,1,0,0,40,0,0,0,18,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,112,139,0,0,198,2,0,0,6,1,0,0,40,0,0,0,12,0,0,0,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,140,0,0,6,2,0,0,142,1,0,0,40,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,140,0,0,26,1,0,0,92,0,0,0,40,0,0,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,80,140,0,0,146,0,0,0,246,0,0,0,40,0,0,0,102,0,0,0,76,0,0,0,106,0,0,0,52,0,0,0,12,0,0,0,36,0,0,0,4,0,0,0,248,255,255,255,80,140,0,0,32,1,0,0,4,0,0,0,122,0,0,0,8,0,0,0,2,0,0,0,68,1,0,0,106,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,120,140,0,0,170,0,0,0,186,2,0,0,40,0,0,0,22,0,0,0,78,0,0,0,108,0,0,0,62,0,0,0,80,0,0,0,2,0,0,0,2,0,0,0,248,255,255,255,120,140,0,0,66,0,0,0,22,1,0,0,128,1,0,0,34,1,0,0,86,0,0,0,74,1,0,0,132,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,160,140,0,0,216,0,0,0,144,2,0,0,40,0,0,0,50,0,0,0,36,0,0,0,50,1,0,0,126,2,0,0,166,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,176,140,0,0,230,0,0,0,62,0,0,0,40,0,0,0,230,0,0,0,82,0,0,0,62,1,0,0,168,1,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,192,140,0,0,4,2,0,0,2,0,0,0,40,0,0,0,58,0,0,0,62,0,0,0,194,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,224,140,0,0,116,1,0,0,240,1,0,0,40,0,0,0,16,0,0,0,56,0,0,0,70,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,141,0,0,62,1,0,0,104,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,141,0,0,184,0,0,0,4,1,0,0,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,141,0,0,42,0,0,0,202,1,0,0,40,0,0,0,52,0,0,0,50,0,0,0,86,0,0,0,40,0,0,0,96,0,0,0,8,0,0,0,6,0,0,0,54,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,56,141,0,0,34,0,0,0,80,0,0,0,40,0,0,0,42,0,0,0,46,0,0,0,90,0,0,0,44,0,0,0,88,0,0,0,4,0,0,0,2,0,0,0,60,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,88,141,0,0,220,1,0,0,100,1,0,0,40,0,0,0,30,0,0,0,28,0,0,0,20,0,0,0,24,0,0,0,104,0,0,0,26,0,0,0,18,0,0,0,34,0,0,0,32,0,0,0,16,0,0,0,82,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,120,141,0,0,146,2,0,0,14,2,0,0,40,0,0,0,6,0,0,0,46,0,0,0,40,0,0,0,42,0,0,0,72,0,0,0,44,0,0,0,38,0,0,0,66,0,0,0,50,0,0,0,48,0,0,0,92,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,152,141,0,0,68,0,0,0,8,0,0,0,40,0,0,0,20,0,0,0,16,0,0,0,52,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,168,141,0,0,28,0,0,0,32,1,0,0,40,0,0,0,22,0,0,0,22,0,0,0,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,184,141,0,0,244,1,0,0,142,2,0,0,40,0,0,0,10,0,0,0,16,0,0,0,30,0,0,0,132,1,0,0,2,1,0,0,10,0,0,0,28,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,216,141,0,0,206,1,0,0,2,1,0,0,40,0,0,0,8,0,0,0,4,0,0,0,28,0,0,0,236,0,0,0,44,1,0,0,8,0,0,0,118,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,248,141,0,0,206,1,0,0,20,0,0,0,40,0,0,0,14,0,0,0,12,0,0,0,18,0,0,0,170,0,0,0,138,0,0,0,14,0,0,0,146,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,142,0,0,206,1,0,0,94,2,0,0,40,0,0,0,2,0,0,0,6,0,0,0,26,0,0,0,66,1,0,0,212,0,0,0,12,0,0,0,196,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,56,142,0,0,206,1,0,0,40,2,0,0,40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,72,142,0,0,62,2,0,0,18,1,0,0,40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,88,142,0,0,206,1,0,0,130,1,0,0,40,0,0,0,6,0,0,0,30,0,0,0,10,0,0,0,14,0,0,0,206,2,0,0,34,0,0,0,110,4,0,0,42,0,0,0,222,3,0,0,42,0,0,0,26,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,120,142,0,0,176,0,0,0,142,0,0,0,40,0,0,0,188,3,0,0,46,0,0,0,64,4,0,0,62,0,0,0,174,2,0,0,46,0,0,0,22,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,152,142,0,0,30,2,0,0,14,1,0,0,172,0,0,0,2,1,0,0,76,0,0,0,14,0,0,0,110,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,168,142,0,0,158,0,0,0,158,2,0,0,234,0,0,0,36,1,0,0,76,0,0,0,14,0,0,0,204,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,208,142,0,0,98,1,0,0,242,0,0,0,230,1,0,0,206,3,0,0,122,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,56,0,0,0,0,0,0,0,224,142,0,0,162,2,0,0,222,1,0,0,200,255,255,255,200,255,255,255,224,142,0,0,108,1,0,0,238,0,0,0,0,0,0,0,0,0,0,0,60,0,0,0,0,0,0,0,240,142,0,0,58,1,0,0,102,2,0,0,196,255,255,255,196,255,255,255,240,142,0,0,188,1,0,0,70,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,143,0,0,212,0,0,0,136,1,0,0,72,0,0,0,2,1,0,0,76,0,0,0,14,0,0,0,98,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,40,143,0,0,114,0,0,0,194,2,0,0,56,0,0,0,248,255,255,255,40,143,0,0,52,2,0,0,54,0,0,0,192,255,255,255,192,255,255,255,40,143,0,0,160,2,0,0,232,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,56,143,0,0,206,1,0,0,74,0,0,0,40,0,0,0,2,0,0,0,6,0,0,0,26,0,0,0,66,1,0,0,212,0,0,0,12,0,0,0,196,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,72,143,0,0,206,1,0,0,196,2,0,0,40,0,0,0,2,0,0,0,6,0,0,0,26,0,0,0,66,1,0,0,212,0,0,0,12,0,0,0,196,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,88,143,0,0,54,2,0,0,180,2,0,0,178,0,0,0,88,0,0,0,26,0,0,0,26,0,0,0,232,0,0,0,6,1,0,0,78,0,0,0,138,1,0,0,210,0,0,0,50,2,0,0,54,0,0,0,134,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,104,143,0,0,108,0,0,0,254,1,0,0,230,2,0,0,28,0,0,0,10,0,0,0,18,0,0,0,80,0,0,0,90,0,0,0,86,0,0,0,30,0,0,0,56,1,0,0,88,1,0,0,92,0,0,0,62,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,112,143,0,0,18,2,0,0,250,0,0,0,178,0,0,0,88,0,0,0,20,0,0,0,38,0,0,0,232,0,0,0,6,1,0,0,78,0,0,0,42,1,0,0,210,0,0,0,142,3,0,0,54,0,0,0,214,0,0,0,0,0,0,0,0,0,0,0,108,0,0,0,0,0,0,0,160,143,0,0,192,1,0,0,136,2,0,0,148,255,255,255,148,255,255,255,160,143,0,0,144,1,0,0,166,1,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,208,143,0,0,112,1,0,0,236,1,0,0,252,255,255,255,252,255,255,255,208,143,0,0,124,0,0,0,48,2,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,232,143,0,0,64,1,0,0,0,2,0,0,252,255,255,255,252,255,255,255,232,143,0,0,154,1,0,0,44,1,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0,144,0,0,222,0,0,0,200,2,0,0,248,255,255,255,248,255,255,255,0,144,0,0,138,2,0,0,164,0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,24,144,0,0,100,2,0,0,50,1,0,0,248,255,255,255,248,255,255,255,24,144,0,0,112,2,0,0,196,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,144,0,0,176,2,0,0,66,2,0,0,150,3,0,0,82,0,0,0,32,0,0,0,50,0,0,0,76,1,0,0,6,1,0,0,78,0,0,0,10,1,0,0,210,0,0,0,56,4,0,0,54,0,0,0,148,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,144,0,0,46,1,0,0,182,2,0,0,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,128,144,0,0,80,1,0,0,208,1,0,0,8,0,0,0,28,0,0,0,10,0,0,0,18,0,0,0,56,0,0,0,90,0,0,0,86,0,0,0,30,0,0,0,56,1,0,0,88,1,0,0,12,0,0,0,144,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,144,144,0,0,186,1,0,0,54,1,0,0,114,0,0,0,88,0,0,0,20,0,0,0,38,0,0,0,10,0,0,0,6,1,0,0,78,0,0,0,42,1,0,0,210,0,0,0,142,3,0,0,90,0,0,0,108,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,192,144,0,0,72,1,0,0,170,1,0,0,40,0,0,0,64,0,0,0,188,0,0,0,144,3,0,0,0,1,0,0,24,2,0,0,100,1,0,0,130,0,0,0,70,3,0,0,126,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,224,144,0,0,244,0,0,0,46,0,0,0,40,0,0,0,26,1,0,0,186,0,0,0,208,1,0,0])
.concat([76,1,0,0,246,1,0,0,80,0,0,0,126,1,0,0,160,2,0,0,50,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,145,0,0,82,2,0,0,248,0,0,0,40,0,0,0,14,0,0,0,136,0,0,0,154,2,0,0,118,3,0,0,248,2,0,0,158,0,0,0,84,0,0,0,172,1,0,0,54,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,32,145,0,0,78,2,0,0,200,1,0,0,40,0,0,0,20,1,0,0,24,1,0,0,100,2,0,0,222,0,0,0,88,1,0,0,64,3,0,0,156,0,0,0,204,3,0,0,222,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,88,145,0,0,138,1,0,0,24,2,0,0,22,0,0,0,28,0,0,0,10,0,0,0,18,0,0,0,80,0,0,0,90,0,0,0,86,0,0,0,246,0,0,0,164,0,0,0,250,3,0,0,92,0,0,0,62,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,104,145,0,0,16,0,0,0,246,1,0,0,78,1,0,0,88,0,0,0,20,0,0,0,38,0,0,0,232,0,0,0,6,1,0,0,78,0,0,0,16,1,0,0,24,0,0,0,126,2,0,0,54,0,0,0,214,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,136,145,0,0,42,1,0,0,234,1,0,0,46,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,152,145,0,0,84,1,0,0,210,1,0,0,134,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,168,145,0,0,178,0,0,0,102,1,0,0,120,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,184,145,0,0,114,0,0,0,2,2,0,0,126,0,0,0,22,1,0,0,50,0,0,0,176,0,0,0,80,0,0,0,24,0,0,0,142,0,0,0,84,0,0,0,74,0,0,0,94,0,0,0,56,0,0,0,104,0,0,0,2,0,0,0,200,0,0,0,254,0,0,0,28,1,0,0,120,0,0,0,88,1,0,0,134,0,0,0,132,0,0,0,100,0,0,0,122,0,0,0,244,0,0,0,8,0,0,0,232,0,0,0,178,0,0,0,158,0,0,0,250,0,0,0,182,0,0,0,78,1,0,0,164,0,0,0,112,0,0,0,226,0,0,0,116,0,0,0,46,0,0,0,128,0,0,0,190,0,0,0,26,1,0,0,76,1,0,0,236,0,0,0,188,0,0,0,6,1,0,0,62,1,0,0,30,1,0,0,14,0,0,0,72,1,0,0,66,1,0,0,108,0,0,0,234,0,0,0,154,0,0,0,216,0,0,0,252,0,0,0,70,1,0,0,64,0,0,0,28,0,0,0,24,1,0,0,220,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,200,145,0,0,10,0,0,0,10,0,0,0,60,2,0,0,4,3,0,0,12,0,0,0,152,2,0,0,248,0,0,0,40,1,0,0,36,4,0,0,88,0,0,0,80,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,216,145,0,0,172,1,0,0,232,0,0,0,188,0,0,0,52,0,0,0,88,3,0,0,60,3,0,0,190,0,0,0,74,1,0,0,20,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,146,0,0,10,0,0,0,10,0,0,0,60,2,0,0,4,3,0,0,12,0,0,0,152,2,0,0,248,0,0,0,40,1,0,0,36,4,0,0,88,0,0,0,80,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,146,0,0,78,1,0,0,204,1,0,0,18,2,0,0,128,4,0,0,232,2,0,0,72,1,0,0,146,2,0,0,76,0,0,0,122,4,0,0,88,0,0,0,80,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,56,146,0,0,98,0,0,0,10,1,0,0,168,0,0,0,52,3,0,0,86,2,0,0,26,3,0,0,120,4,0,0,198,0,0,0,50,3,0,0,240,0,0,0,146,2,0,0,114,0,0,0,146,0,0,0,34,0,0,0,168,0,0,0,120,3,0,0,220,255,255,255,56,146,0,0,8,3,0,0,30,1,0,0,60,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,88,146,0,0,86,2,0,0,86,0,0,0,254,1,0,0,226,0,0,0,234,3,0,0,6,0,0,0,136,3,0,0,18,1,0,0,70,0,0,0,240,0,0,0,146,2,0,0,114,0,0,0,146,0,0,0,28,0,0,0,36,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,104,146,0,0,10,0,0,0,10,0,0,0,60,2,0,0,4,3,0,0,12,0,0,0,152,2,0,0,248,0,0,0,40,1,0,0,36,4,0,0,100,0,0,0,150,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,120,146,0,0,104,1,0,0,240,0,0,0,172,0,0,0,102,4,0,0,42,0,0,0,204,3,0,0,242,3,0,0,90,1,0,0,136,1,0,0,240,0,0,0,146,2,0,0,114,0,0,0,146,0,0,0,70,4,0,0,90,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,136,146,0,0,10,0,0,0,10,0,0,0,60,2,0,0,4,3,0,0,12,0,0,0,152,2,0,0,248,0,0,0,40,1,0,0,36,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,144,146,0,0,84,0,0,0,76,2,0,0,118,2,0,0,240,0,0,0,94,2,0,0,98,3,0,0,130,0,0,0,58,1,0,0,112,4,0,0,88,0,0,0,80,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,160,146,0,0,242,1,0,0,110,2,0,0,196,0,0,0,104,3,0,0,212,2,0,0,236,3,0,0,216,1,0,0,38,1,0,0,52,2,0,0,240,0,0,0,146,2,0,0,114,0,0,0,146,0,0,0,14,2,0,0,166,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,176,146,0,0,176,1,0,0,50,2,0,0,34,1,0,0,86,0,0,0,56,0,0,0,112,3,0,0,94,0,0,0,148,0,0,0,6,1,0,0,12,1,0,0,80,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,192,146,0,0,150,1,0,0,108,2,0,0,160,0,0,0,140,1,0,0,224,1,0,0,194,0,0,0,210,0,0,0,44,0,0,0,188,2,0,0,88,0,0,0,80,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,208,146,0,0,92,3,0,0,162,1,0,0,228,1,0,0,52,0,0,0,46,0,0,0,6,1,0,0,130,2,0,0,250,1,0,0,26,3,0,0,128,0,0,0,92,0,0,0,194,1,0,0,208,2,0,0,244,2,0,0,180,1,0,0,10,1,0,0,212,3,0,0,122,1,0,0,122,3,0,0,202,0,0,0,0,3,0,0,30,3,0,0,124,2,0,0,194,3,0,0,128,1,0,0,26,1,0,0,160,3,0,0,58,0,0,0,30,0,0,0,64,1,0,0,66,1,0,0,130,3,0,0,252,0,0,0,214,3,0,0,212,2,0,0,82,0,0,0,94,2,0,0,18,0,0,0,222,3,0,0,2,2,0,0,56,3,0,0,46,2,0,0,174,3,0,0,164,1,0,0,34,3,0,0,190,2,0,0,180,0,0,0,240,3,0,0,96,3,0,0,138,0,0,0,120,1,0,0,104,1,0,0,12,3,0,0,162,3,0,0,204,0,0,0,198,3,0,0,202,1,0,0,150,2,0,0,218,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,224,146,0,0,70,1,0,0,50,0,0,0,112,3,0,0,44,2,0,0,252,2,0,0,162,2,0,0,4,1,0,0,174,0,0,0,94,4,0,0,88,0,0,0,80,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,146,0,0,126,1,0,0,22,1,0,0,52,2,0,0,18,1,0,0,160,4,0,0,16,4,0,0,98,1,0,0,140,0,0,0,198,1,0,0,88,0,0,0,80,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,147,0,0,154,2,0,0,58,2,0,0,108,2,0,0,144,2,0,0,18,4,0,0,54,4,0,0,210,3,0,0,150,0,0,0,228,1,0,0,144,0,0,0,66,3,0,0,114,0,0,0,32,0,0,0,186,2,0,0,142,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,147,0,0,16,2,0,0,152,2,0,0,138,3,0,0,252,0,0,0,180,0,0,0,78,3,0,0,168,1,0,0,186,0,0,0,94,1,0,0,88,0,0,0,80,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,32,147,0,0,10,0,0,0,10,0,0,0,2,3,0,0,86,4,0,0,160,2,0,0,46,4,0,0,98,2,0,0,4,0,0,0,80,1,0,0,240,0,0,0,146,2,0,0,114,0,0,0,146,0,0,0,34,0,0,0,168,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,147,0,0,114,1,0,0,168,0,0,0,182,3,0,0,190,3,0,0,246,0,0,0,18,0,0,0,8,2,0,0,218,0,0,0,10,1,0,0,88,0,0,0,80,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,147,0,0,46,2,0,0,172,2,0,0,100,0,0,0,100,0,0,0,44,4,0,0,124,3,0,0,132,4,0,0,102,1,0,0,12,2,0,0,240,0,0,0,28,3,0,0,114,0,0,0,146,0,0,0,134,0,0,0,160,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,80,147,0,0,20,1,0,0,162,0,0,0,12,0,0,0,230,2,0,0,238,1,0,0,54,1,0,0,74,2,0,0,228,0,0,0,250,2,0,0,88,0,0,0,80,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,147,0,0,154,3,0,0,24,0,0,0,96,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,104,147,0,0,250,2,0,0,174,0,0,0,70,0,0,0,106,2,0,0,44,0,0,0,208,3,0,0,218,1,0,0,146,3,0,0,188,2,0,0,190,1,0,0,74,2,0,0,34,2,0,0,120,2,0,0,192,2,0,0,174,2,0,0,58,1,0,0,216,3,0,0,8,1,0,0,40,1,0,0,228,3,0,0,216,0,0,0,34,0,0,0,116,1,0,0,48,2,0,0,196,2,0,0,166,0,0,0,228,0,0,0,46,3,0,0,254,2,0,0,246,2,0,0,104,3,0,0,4,2,0,0,102,3,0,0,228,1,0,0,124,0,0,0,18,1,0,0,132,3,0,0,80,2,0,0,140,0,0,0,232,0,0,0,80,3,0,0,22,1,0,0,220,3,0,0,48,1,0,0,176,0,0,0,124,1,0,0,234,3,0,0,16,1,0,0,200,0,0,0,28,1,0,0,248,3,0,0,242,3,0,0,198,0,0,0,214,2,0,0,236,1,0,0,154,1,0,0,206,1,0,0,254,0,0,0,238,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,120,147,0,0,38,1,0,0,252,1,0,0,122,1,0,0,234,0,0,0,216,2,0,0,22,0,0,0,162,0,0,0,126,0,0,0,68,4,0,0,142,4,0,0,48,2,0,0,138,3,0,0,136,4,0,0,0,1,0,0,80,3,0,0,34,3,0,0,24,3,0,0,162,3,0,0,20,0,0,0,246,1,0,0,78,2,0,0,22,2,0,0,236,0,0,0,208,0,0,0,14,3,0,0,132,3,0,0,4,2,0,0,186,0,0,0,66,1,0,0,94,3,0,0,206,0,0,0,90,3,0,0,156,3,0,0,182,0,0,0,192,2,0,0,244,1,0,0,154,0,0,0,110,1,0,0,164,1,0,0,240,2,0,0,240,1,0,0,126,3,0,0,156,1,0,0,156,0,0,0,176,3,0,0,118,0,0,0,42,3,0,0,164,0,0,0,112,1,0,0,162,1,0,0,170,2,0,0,208,3,0,0,184,1,0,0,90,0,0,0,114,2,0,0,32,4,0,0,48,1,0,0,92,3,0,0,36,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,136,147,0,0,164,1,0,0,118,2,0,0,182,2,0,0,84,4,0,0,66,2,0,0,178,0,0,0,54,3,0,0,72,0,0,0,10,4,0,0,88,0,0,0,80,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,152,147,0,0,152,1,0,0,226,0,0,0,234,0,0,0,104,2,0,0,130,4,0,0,66,3,0,0,212,0,0,0,88,0,0,0,218,1,0,0,88,0,0,0,80,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,168,147,0,0,238,1,0,0,118,1,0,0,78,2,0,0,10,3,0,0,216,0,0,0,188,1,0,0,172,0,0,0,82,1,0,0,228,0,0,0,88,0,0,0,80,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,184,147,0,0,180,0,0,0,90,0,0,0,194,2,0,0,166,0,0,0,136,2,0,0,0,2,0,0,134,3,0,0,34,1,0,0,254,2,0,0,240,0,0,0,174,1,0,0,114,0,0,0,146,0,0,0,184,3,0,0,102,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,200,147,0,0,16,1,0,0,124,1,0,0,50,0,0,0,128,3,0,0,194,1,0,0,234,1,0,0,28,4,0,0,184,0,0,0,118,1,0,0,88,0,0,0,124,0,0,0,66,2,0,0,228,255,255,255,200,147,0,0,216,2,0,0,94,0,0,0,252,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,232,147,0,0,26,1,0,0,200,0,0,0,22,2,0,0,138,4,0,0,220,3,0,0,6,4,0,0,236,1,0,0,184,0,0,0,144,0,0,0,54,0,0,0,106,4,0,0,146,1,0,0,192,1,0,0,224,3,0,0,76,2,0,0,40,4,0,0,52,1,0,0,158,1,0,0,38,3,0,0,44,1,0,0,218,0,0,0,222,2,0,0,154,4,0,0,4,0,0,0,186,3,0,0,102,1,0,0,240,3,0,0,76,0,0,0,164,4,0,0,230,3,0,0,20,1,0,0,98,0,0,0,200,3,0,0,148,2,0,0,120,3,0,0,100,2,0,0,12,4,0,0,178,1,0,0,122,1,0,0,26,2,0,0,184,2,0,0,152,4,0,0,238,2,0,0,212,1,0,0,36,3,0,0,24,1,0,0,204,1,0,0,32,3,0,0,108,4,0,0,246,3,0,0,8,4,0,0,112,2,0,0,174,3,0,0,72,3,0,0,42,2,0,0,160,3,0,0,158,2,0,0,82,2,0,0,58,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,248,147,0,0,248,1,0,0,114,2,0,0,128,3,0,0,114,4,0,0,160,1,0,0,152,3,0,0,68,3,0,0,192,0,0,0,16,1,0,0,176,0,0,0,136,0,0,0,96,1,0,0,0,1,0,0,128,1,0,0,84,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,148,0,0,168,1,0,0,124,2,0,0,62,0,0,0,74,0,0,0,64,3,0,0,84,2,0,0,148,3,0,0,94,1,0,0,38,4,0,0,240,0,0,0,224,2,0,0,52,1,0,0,146,0,0,0,194,2,0,0,46,0,0,0,200,2,0,0,220,255,255,255,8,148,0,0,142,1,0,0,184,2,0,0,48,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,148,0,0,56,3,0,0,198,0,0,0,132,1,0,0,176,0,0,0,132,2,0,0,126,4,0,0,28,3,0,0,172,2,0,0,138,1,0,0,248,2,0,0,8,1,0,0,88,2,0,0,82,0,0,0,116,0,0,0,198,3,0,0,108,0,0,0,2,3,0,0,110,2,0,0,10,2,0,0,244,3,0,0,82,1,0,0,242,1,0,0,90,2,0,0,96,4,0,0,72,0,0,0,34,1,0,0,30,0,0,0,124,4,0,0,154,3,0,0,100,1,0,0,182,1,0,0,122,2,0,0,194,3,0,0,130,2,0,0,228,3,0,0,62,4,0,0,128,0,0,0,114,0,0,0,86,1,0,0,148,1,0,0,146,4,0,0,136,0,0,0,158,4,0,0,220,1,0,0,90,4,0,0,196,1,0,0,104,4,0,0,164,2,0,0,32,1,0,0,34,4,0,0,32,0,0,0,140,3,0,0,226,2,0,0,122,0,0,0,48,4,0,0,168,0,0,0,254,1,0,0,40,3,0,0,172,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,56,148,0,0,116,0,0,0,106,1,0,0,124,3,0,0,146,3,0,0,218,3,0,0,96,1,0,0,230,1,0,0,104,1,0,0,90,1,0,0,88,0,0,0,80,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,72,148,0,0,250,1,0,0,12,0,0,0,134,3,0,0,32,2,0,0,46,0,0,0,34,2,0,0,196,2,0,0,230,0,0,0,72,4,0,0,240,0,0,0,56,1,0,0,130,1,0,0,146,0,0,0,192,3,0,0,34,0,0,0,56,2,0,0,220,255,255,255,72,148,0,0,26,0,0,0,194,0,0,0,68,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,104,148,0,0,192,0,0,0,56,1,0,0,174,0,0,0,140,2,0,0,28,2,0,0,68,1,0,0,230,0,0,0,118,0,0,0,54,2,0,0,88,0,0,0,80,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,120,148,0,0,130,0,0,0,36,1,0,0,20,2,0,0,198,0,0,0,66,0,0,0,150,4,0,0,72,2,0,0,32,0,0,0,108,2,0,0,88,0,0,0,80,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,136,148,0,0,18,0,0,0,84,2,0,0,108,3,0,0,118,4,0,0,68,0,0,0,62,1,0,0,108,3,0,0,26,0,0,0,168,3,0,0,240,0,0,0,146,2,0,0,114,0,0,0,146,0,0,0,34,0,0,0,168,0,0,0,220,255,255,255,136,148,0,0,170,0,0,0,214,1,0,0,12,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,168,148,0,0,112,0,0,0,166,2,0,0,242,2,0,0,202,3,0,0,82,3,0,0,8,0,0,0,60,4,0,0,166,0,0,0,180,2,0,0,240,0,0,0,146,2,0,0,114,0,0,0,146,0,0,0,34,0,0,0,168,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,184,148,0,0,182,1,0,0,156,2,0,0,94,3,0,0,74,3,0,0,96,3,0,0,202,1,0,0,80,2,0,0,98,0,0,0,50,1,0,0,44,0,0,0,150,0,0,0,44,0,0,0,28,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,200,148,0,0,236,0,0,0,78,0,0,0,78,3,0,0,60,1,0,0,24,2,0,0,50,4,0,0,138,0,0,0,146,0,0,0,118,2,0,0,240,0,0,0,146,2,0,0,114,0,0,0,146,0,0,0,34,0,0,0,168,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,216,148,0,0,20,0,0,0,194,1,0,0,56,0,0,0,82,3,0,0,58,3,0,0,212,1,0,0,102,0,0,0,200,1,0,0,42,3,0,0,40,2,0,0,74,3,0,0,186,3,0,0,122,2,0,0,82,1,0,0,170,1,0,0,110,2,0,0,238,3,0,0,72,1,0,0,90,2,0,0,162,1,0,0,136,2,0,0,144,2,0,0,42,2,0,0,212,0,0,0,98,2,0,0,148,3,0,0,210,0,0,0,96,2,0,0,182,0,0,0,28,2,0,0,36,1,0,0,100,3,0,0,148,1,0,0,68,1,0,0,184,0,0,0,224,1,0,0,224,3,0,0,68,3,0,0,232,2,0,0,152,3,0,0,72,3,0,0,14,2,0,0,114,1,0,0,38,3,0,0,84,1,0,0,44,1,0,0,234,2,0,0,60,0,0,0,52,3,0,0,68,2,0,0,132,0,0,0,20,3,0,0,120,0,0,0,116,0,0,0,56,0,0,0,20,1,0,0,166,1,0,0,230,3,0,0,38,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,232,148,0,0,146,1,0,0,160,1,0,0,94,1,0,0,76,4,0,0,126,1,0,0,176,2,0,0,30,4,0,0,96,0,0,0,64,0,0,0,100,0,0,0,182,0,0,0,44,0,0,0,28,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,248,148,0,0,154,0,0,0,148,2,0,0,214,0,0,0,174,1,0,0,214,3,0,0,116,3,0,0,22,3,0,0,46,1,0,0,42,1,0,0,100,0,0,0,118,0,0,0,38,0,0,0,28,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,149,0,0,72,2,0,0,76,0,0,0,158,1,0,0,104,0,0,0,138,2,0,0,8,3,0,0,58,0,0,0,196,0,0,0,92,4,0,0,100,0,0,0,150,0,0,0,44,0,0,0,28,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,149,0,0,152,2,0,0,40,1,0,0,130,2,0,0,128,2,0,0,52,1,0,0,146,0,0,0,22,3,0,0,168,3,0,0,238,1,0,0,42,0,0,0,30,2,0,0,138,2,0,0,208,0,0,0,108,0,0,0,240,1,0,0,106,3,0,0,40,3,0,0,210,1,0,0,134,1,0,0,76,3,0,0,36,0,0,0,142,0,0,0,244,1,0,0,186,0,0,0,250,0,0,0,150,0,0,0,98,1,0,0,164,0,0,0,6,2,0,0,166,2,0,0,114,2,0,0,164,3,0,0,188,1,0,0,102,1,0,0,218,0,0,0,38,2,0,0,160,1,0,0,240,2,0,0,58,2,0,0,12,2,0,0,126,0,0,0,80,1,0,0,16,2,0,0,98,3,0,0,176,3,0,0,86,2,0,0,18,3,0,0,158,2,0,0,54,1,0,0,24,3,0,0,162,2,0,0,16,3,0,0,42,1,0,0,138,1,0,0,218,3,0,0,142,3,0,0,48,0,0,0,156,1,0,0,70,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,40,149,0,0,34,1,0,0,138,0,0,0,62,2,0,0,60,0,0,0,124,1,0,0,10,0,0,0,78,1,0,0,6,0,0,0,118,3,0,0,220,0,0,0,54,1,0,0,230,0,0,0,224,255,255,255,40,149,0,0,10,2,0,0,180,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,72,149,0,0,26,0,0,0,148,0,0,0,188,3,0,0,166,1,0,0,40,1,0,0,74,1,0,0,56,2,0,0,52,0,0,0,2,1,0,0,240,0,0,0,146,2,0,0,114,0,0,0,146,0,0,0,34,0,0,0,168,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,88,149,0,0,192,2,0,0,134,0,0,0,72,2,0,0,224,0,0,0,150,1,0,0,204,2,0,0,214,1,0,0,8,1,0,0,80,0,0,0,100,0,0,0,150,0,0,0,44,0,0,0,28,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,104,149,0,0,96,0,0,0,92,1,0,0,30,1,0,0,16,3,0,0,154,2,0,0,92,1,0,0,20,3,0,0,152,0,0,0,140,4,0,0,240,0,0,0,146,2,0,0,114,0,0,0,146,0,0,0,34,0,0,0,168,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,120,149,0,0,92,2,0,0,212,1,0,0,206,2,0,0,162,4,0,0,128,2,0,0,102,0,0,0,14,4,0,0,14,1,0,0,210,2,0,0,38,0,0,0,150,0,0,0,120,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,136,149,0,0,56,2,0,0,58,0,0,0,104,2,0,0,82,4,0,0,78,0,0,0,130,3,0,0,146,0,0,0,138,0,0,0,196,3,0,0,240,0,0,0,184,2,0,0,114,0,0,0,146,0,0,0,106,0,0,0,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,152,149,0,0,10,0,0,0,10,0,0,0,60,2,0,0,4,3,0,0,12,0,0,0,152,2,0,0,248,0,0,0,40,1,0,0,36,4,0,0,100,0,0,0,150,0,0,0,44,0,0,0,28,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,168,149,0,0,160,0,0,0,168,2,0,0,92,2,0,0,106,3,0,0,248,1,0,0,182,3,0,0,64,1,0,0,80,1,0,0,178,3,0,0,100,0,0,0,150,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,184,149,0,0,128,0,0,0,190,0,0,0,66,0,0,0,2,4,0,0,76,3,0,0,92,2,0,0,6,2,0,0,34,0,0,0,30,1,0,0,100,0,0,0,116,1,0,0,56,0,0,0,124,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,104,150,0,0,148,1,0,0,32,2,0,0,240,0,0,0,244,2,0,0,204,0,0,0,232,1,0,0,26,0,0,0,112,1,0,0,200,0,0,0,100,0,0,0,78,1,0,0,36,0,0,0,28,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,120,150,0,0,128,2,0,0,152,0,0,0,14,1,0,0,166,2,0,0,170,0,0,0,248,3,0,0,38,2,0,0,106,0,0,0,224,2,0,0,240,0,0,0,202,2,0,0,114,0,0,0,146,0,0,0,4,4,0,0,110,0,0,0,216,255,255,255,120,150,0,0,90,3,0,0,52,0,0,0,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,152,150,0,0,140,2,0,0,128,1,0,0,32,0,0,0,56,1,0,0,226,3,0,0,144,1,0,0,132,1,0,0,54,1,0,0,78,4,0,0,62,0,0,0,214,0,0,0,156,2,0,0,224,255,255,255,152,150,0,0,70,0,0,0,204,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,184,150,0,0,72,0,0,0,132,0,0,0,158,1,0,0,2,0,0,0,116,2,0,0,24,0,0,0,198,1,0,0,236,0,0,0,242,0,0,0,226,3,0,0,94,0,0,0,24,1,0,0,192,0,0,0,16,0,0,0,88,2,0,0,152,0,0,0,114,3,0,0,144,0,0,0,178,3,0,0,150,1,0,0,246,0,0,0,26,2,0,0,82,2,0,0,106,1,0,0,32,2,0,0,168,2,0,0,142,2,0,0,96,0,0,0,236,2,0,0,38,0,0,0,60,3,0,0,134,0,0,0,64,0,0,0,170,3,0,0,190,0,0,0,232,3,0,0,68,0,0,0,204,2,0,0,64,2,0,0,178,1,0,0,44,3,0,0,102,2,0,0,140,2,0,0,86,3,0,0,164,2,0,0,202,3,0,0,238,0,0,0,0,2,0,0,176,1,0,0,158,3,0,0,148,0,0,0,184,3,0,0,180,3,0,0,184,1,0,0,84,2,0,0,118,0,0,0,110,0,0,0,110,1,0,0,84,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,200,150,0,0,188,0,0,0,52,1,0,0,252,2,0,0,254,0,0,0,62,0,0,0,236,2,0,0,48,0,0,0,82,0,0,0,174,0,0,0,240,0,0,0,146,2,0,0,114,0,0,0,146,0,0,0,96,2,0,0,158,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,216,150,0,0,170,2,0,0,166,0,0,0,220,1,0,0,16,0,0,0,46,2,0,0,100,4,0,0,84,1,0,0,240,0,0,0,40,2,0,0,240,0,0,0,146,2,0,0,114,0,0,0,146,0,0,0,34,0,0,0,168,0,0,0,220,255,255,255,216,150,0,0,170,0,0,0,8,2,0,0,44,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,248,150,0,0,190,1,0,0,44,2,0,0,244,3,0,0,150,3,0,0,84,0,0,0,14,1,0,0,142,2,0,0,210,0,0,0,124,0,0,0,50,1,0,0,80,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,151,0,0,144,4,0,0,30,0,0,0,144,0,0,0,142,1,0,0,58,4,0,0,210,1,0,0,42,4,0,0,26,4,0,0,228,2,0,0,110,3,0,0,124,2,0,0,20,4,0,0,242,0,0,0,202,0,0,0,68,2,0,0,252,3,0,0,66,4,0,0,122,3,0,0,58,3,0,0,156,2,0,0,6,3,0,0,120,1,0,0,38,0,0,0,116,1,0,0,166,3,0,0,106,2,0,0,150,0,0,0,150,2,0,0,148,0,0,0,244,0,0,0,112,0,0,0,18,2,0,0,52,4,0,0,206,1,0,0,198,2,0,0,36,1,0,0,134,2,0,0,166,4,0,0,70,2,0,0,86,3,0,0,98,4,0,0,182,2,0,0,96,0,0,0,176,1,0,0,106,1,0,0,22,4,0,0,192,0,0,0,36,2,0,0,238,3,0,0,40,0,0,0,80,4,0,0,74,4,0,0,140,0,0,0,102,2,0,0,30,2,0,0,154,1,0,0,252,1,0,0,250,1,0,0,22,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,151,0,0,34,2,0,0,38,0,0,0,40,0,0,0,170,3,0,0,180,3,0,0,114,3,0,0,220,2,0,0,60,0,0,0,180,1,0,0,240,0,0,0,146,2,0,0,114,0,0,0,146,0,0,0,34,0,0,0,168,0,0,0,220,255,255,255,24,151,0,0,44,2,0,0,32,0,0,0,214,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,56,151,0,0,150,0,0,0,64,2,0,0,10,3,0,0,208,1,0,0,226,1,0,0,190,1,0,0,28,1,0,0,206,0,0,0,242,2,0,0,148,1,0,0,80,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,72,151,0,0,174,1,0,0,68,2,0,0,86,0,0,0,212,3,0,0,88,0,0,0,0,4,0,0,202,2,0,0,238,0,0,0,132,0,0,0,88,0,0,0,80,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,88,151,0,0,110,0,0,0,106,2,0,0,2,1,0,0,84,3,0,0,48,3,0,0,120,2,0,0,50,0,0,0,114,1,0,0,14,0,0,0,88,0,0,0,80,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,104,151,0,0,234,1,0,0,10,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,112,151,0,0,210,3,0,0,10,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,120,151,0,0,112,0,0,0,10,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,128,151,0,0,170,0,0,0,10,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,136,151,0,0,44,2,0,0,10,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,144,151,0,0,214,1,0,0,10,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,152,151,0,0,206,0,0,0,10,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,160,151,0,0,90,3,0,0,10,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,176,151,0,0,184,1,0,0,36,0,0,0,140,3,0,0,164,3,0,0,46,3,0,0,234,2,0,0,114,1,0,0,108,1,0,0,58,2,0,0,186,1,0,0,228,255,255,255,176,151,0,0,118,1,0,0,150,2,0,0,156,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,208,151,0,0,120,0,0,0,174,2,0,0,54,2,0,0,62,2,0,0,24,4,0,0,116,2,0,0,18,3,0,0,0,1,0,0,158,0,0,0,88,0,0,0,80,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,224,151,0,0,74,2,0,0,198,1,0,0,60,2,0,0,4,3,0,0,12,0,0,0,152,2,0,0,248,0,0,0,40,1,0,0,36,4,0,0,240,0,0,0,146,2,0,0,114,0,0,0,146,0,0,0,34,0,0,0,168,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,151,0,0,88,2,0,0,210,0,0,0,6,0,0,0,216,3,0,0,188,0,0,0,130,1,0,0,190,2,0,0,52,1,0,0,44,0,0,0,88,0,0,0,80,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,152,0,0,74,1,0,0,10,2,0,0,116,3,0,0,220,0,0,0,158,3,0,0,64,2,0,0,2,0,0,0,222,0,0,0,250,0,0,0,88,0,0,0,80,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,152,0,0,82,1,0,0,134,1,0,0,60,0,0,0,178,1,0,0,84,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,32,152,0,0,82,1,0,0,226,1,0,0,60,0,0,0,178,1,0,0,4,0,0,0,30,0,0,0,42,0,0,0,34,0,0,0,0,0,0,0,0,0,0,0,118,0,0,0,0,0,0,0,99,0,0,0,0,0,0,0,83,116,57,116,121,112,101,95,105,110,102,111,0,0,0,0,83,116,57,101,120,99,101,112,116,105,111,110,0,0,0,0,83,116,57,98,97,100,95,97,108,108,111,99,0,0,0,0,83,116,56,98,97,100,95,99,97,115,116,0,0,0,0,0,83,116,49,52,111,118,101,114,102,108,111,119,95,101,114,114,111,114,0,0,0,0,0,0,83,116,49,51,114,117,110,116,105,109,101,95,101,114,114,111,114,0,0,0,0,0,0,0,83,116,49,50,111,117,116,95,111,102,95,114,97,110,103,101,0,0,0,0,0,0,0,0,83,116,49,50,108,101,110,103,116,104,95,101,114,114,111,114,0,0,0,0,0,0,0,0,83,116,49,49,108,111,103,105,99,95,101,114,114,111,114,0,80,75,99,0,0,0,0,0,78,83,116,51,95,95,49,57,116,105,109,101,95,98,97,115,101,69,0,0,0,0,0,0,78,83,116,51,95,95,49,57,109,111,110,101,121,95,112,117,116,73,119,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,0,0,78,83,116,51,95,95,49,57,109,111,110,101,121,95,112,117,116,73,99,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,0,0,78,83,116,51,95,95,49,57,109,111,110,101,121,95,103,101,116,73,119,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,0,0,78,83,116,51,95,95,49,57,109,111,110,101,121,95,103,101,116,73,99,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,0,0,78,83,116,51,95,95,49,57,98,97,115,105,99,95,105,111,115,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,57,98,97,115,105,99,95,105,111,115,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,57,95,95,110,117,109,95,112,117,116,73,119,69,69,0,0,0,78,83,116,51,95,95,49,57,95,95,110,117,109,95,112,117,116,73,99,69,69,0,0,0,78,83,116,51,95,95,49,57,95,95,110,117,109,95,103,101,116,73,119,69,69,0,0,0,78,83,116,51,95,95,49,57,95,95,110,117,109,95,103,101,116,73,99,69,69,0,0,0,78,83,116,51,95,95,49,56,116,105,109,101,95,112,117,116,73,119,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,0,0,0,78,83,116,51,95,95,49,56,116,105,109,101,95,112,117,116,73,99,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,0,0,0,78,83,116,51,95,95,49,56,116,105,109,101,95,103,101,116,73,119,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,0,0,0,78,83,116,51,95,95,49,56,116,105,109,101,95,103,101,116,73,99,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,0,0,0,78,83,116,51,95,95,49,56,110,117,109,112,117,110,99,116,73,119,69,69,0,0,0,0,78,83,116,51,95,95,49,56,110,117,109,112,117,110,99,116,73,99,69,69,0,0,0,0,78,83,116,51,95,95,49,56,109,101,115,115,97,103,101,115,73,119,69,69,0,0,0,0,78,83,116,51,95,95,49,56,109,101,115,115,97,103,101,115,73,99,69,69,0,0,0,0,78,83,116,51,95,95,49,56,105,111,115,95,98,97,115,101,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,56,105,111,115,95,98,97,115,101,55,102,97,105,108,117,114,101,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,55,110,117,109,95,112,117,116,73,119,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,0,0,0,0,78,83,116,51,95,95,49,55,110,117,109,95,112,117,116,73,99,78,83,95,49,57,111,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,0,0,0,0,78,83,116,51,95,95,49,55,110,117,109,95,103,101,116,73,119,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,69,69,0,0,0,0,0,78,83,116,51,95,95,49,55,110,117,109,95,103,101,116,73,99,78,83,95,49,57,105,115,116,114,101,97,109,98,117,102,95,105,116,101,114,97,116,111,114,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,69,69,0,0,0,0,0,78,83,116,51,95,95,49,55,99,111,108,108,97,116,101,73,119,69,69,0,0,0,0,0,78,83,116,51,95,95,49,55,99,111,108,108,97,116,101,73,99,69,69,0,0,0,0,0,78,83,116,51,95,95,49,55,99,111,100,101,99,118,116,73,119,99,49,49,95,95,109,98,115,116,97,116,101,95,116,69,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,55,99,111,100,101,99,118,116,73,99,99,49,49,95,95,109,98,115,116,97,116,101,95,116,69,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,55,99,111,100,101,99,118,116,73,68,115,99,49,49,95,95,109,98,115,116,97,116,101,95,116,69,69,0,0,0,0,0,0,78,83,116,51,95,95,49,55,99,111,100,101,99,118,116,73,68,105,99,49,49,95,95,109,98,115,116,97,116,101,95,116,69,69,0,0,0,0,0,0,78,83,116,51,95,95,49,54,108,111,99,97,108,101,53,102,97,99,101,116,69,0,0,0,78,83,116,51,95,95,49,54,108,111,99,97,108,101,53,95,95,105,109,112,69,0,0,0,78,83,116,51,95,95,49,53,99,116,121,112,101,73,119,69,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,53,99,116,121,112,101,73,99,69,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,50,52,95,95,103,101,110,101,114,105,99,95,101,114,114,111,114,95,99,97,116,101,103,111,114,121,69,0,0,0,0,0,0,78,83,116,51,95,95,49,50,51,95,95,115,121,115,116,101,109,95,101,114,114,111,114,95,99,97,116,101,103,111,114,121,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,50,49,95,95,98,97,115,105,99,95,115,116,114,105,110,103,95,99,111,109,109,111,110,73,76,98,49,69,69,69,0,0,0,78,83,116,51,95,95,49,50,48,95,95,116,105,109,101,95,103,101,116,95,99,95,115,116,111,114,97,103,101,73,119,69,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,50,48,95,95,116,105,109,101,95,103,101,116,95,99,95,115,116,111,114,97,103,101,73,99,69,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,50,48,95,95,115,104,97,114,101,100,95,112,116,114,95,101,109,112,108,97,99,101,73,78,83,95,53,100,101,113,117,101,73,78,52,83,97,115,115,52,78,111,100,101,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,83,51,95,69,69,69,69,78,83,52,95,73,83,54,95,69,69,69,69,0,0,0,78,83,116,51,95,95,49,49,57,98,97,115,105,99,95,111,115,116,114,105,110,103,115,116,114,101,97,109,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,99,69,69,69,69,0,0,0,78,83,116,51,95,95,49,49,57,98,97,115,105,99,95,105,115,116,114,105,110,103,115,116,114,101,97,109,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,99,69,69,69,69,0,0,0,78,83,116,51,95,95,49,49,57,95,95,115,104,97,114,101,100,95,119,101,97,107,95,99,111,117,110,116,69,0,0,0,78,83,116,51,95,95,49,49,57,95,95,105,111,115,116,114,101,97,109,95,99,97,116,101,103,111,114,121,69,0,0,0,78,83,116,51,95,95,49,49,56,98,97,115,105,99,95,115])
.concat([116,114,105,110,103,115,116,114,101,97,109,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,99,69,69,69,69,0,0,0,0,78,83,116,51,95,95,49,49,55,95,95,119,105,100,101,110,95,102,114,111,109,95,117,116,102,56,73,76,106,51,50,69,69,69,0,0,0,0,0,0,78,83,116,51,95,95,49,49,54,95,95,110,97,114,114,111,119,95,116,111,95,117,116,102,56,73,76,106,51,50,69,69,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,53,98,97,115,105,99,95,115,116,114,105,110,103,98,117,102,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,99,69,69,69,69,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,53,98,97,115,105,99,95,115,116,114,101,97,109,98,117,102,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,53,98,97,115,105,99,95,115,116,114,101,97,109,98,117,102,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,52,101,114,114,111,114,95,99,97,116,101,103,111,114,121,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,52,98,97,115,105,99,95,105,111,115,116,114,101,97,109,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,0,78,83,116,51,95,95,49,49,52,98,97,115,105,99,95,105,102,115,116,114,101,97,109,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,0,78,83,116,51,95,95,49,49,52,95,95,115,104,97,114,101,100,95,99,111,117,110,116,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,52,95,95,110,117,109,95,112,117,116,95,98,97,115,101,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,52,95,95,110,117,109,95,103,101,116,95,98,97,115,101,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,51,109,101,115,115,97,103,101,115,95,98,97,115,101,69,0,78,83,116,51,95,95,49,49,51,98,97,115,105,99,95,111,115,116,114,101,97,109,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,0,0,78,83,116,51,95,95,49,49,51,98,97,115,105,99,95,111,115,116,114,101,97,109,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,0,0,78,83,116,51,95,95,49,49,51,98,97,115,105,99,95,105,115,116,114,101,97,109,73,119,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,119,69,69,69,69,0,0,78,83,116,51,95,95,49,49,51,98,97,115,105,99,95,105,115,116,114,101,97,109,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,0,0,78,83,116,51,95,95,49,49,51,98,97,115,105,99,95,102,105,108,101,98,117,102,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,69,69,0,0,78,83,116,51,95,95,49,49,50,115,121,115,116,101,109,95,101,114,114,111,114,69,0,0,78,83,116,51,95,95,49,49,50,99,111,100,101,99,118,116,95,98,97,115,101,69,0,0,78,83,116,51,95,95,49,49,50,98,97,115,105,99,95,115,116,114,105,110,103,73,99,78,83,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,78,83,95,57,97,108,108,111,99,97,116,111,114,73,99,69,69,69,69,0,0,78,83,116,51,95,95,49,49,50,95,95,100,111,95,109,101,115,115,97,103,101,69,0,0,78,83,116,51,95,95,49,49,49,95,95,115,116,100,111,117,116,98,117,102,73,119,69,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,49,95,95,115,116,100,111,117,116,98,117,102,73,99,69,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,49,95,95,109,111,110,101,121,95,112,117,116,73,119,69,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,49,95,95,109,111,110,101,121,95,112,117,116,73,99,69,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,49,95,95,109,111,110,101,121,95,103,101,116,73,119,69,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,49,95,95,109,111,110,101,121,95,103,101,116,73,99,69,69,0,0,0,0,0,0,0,0,78,83,116,51,95,95,49,49,48,109,111,110,101,121,112,117,110,99,116,73,119,76,98,49,69,69,69,0,0,0,0,0,78,83,116,51,95,95,49,49,48,109,111,110,101,121,112,117,110,99,116,73,119,76,98,48,69,69,69,0,0,0,0,0,78,83,116,51,95,95,49,49,48,109,111,110,101,121,112,117,110,99,116,73,99,76,98,49,69,69,69,0,0,0,0,0,78,83,116,51,95,95,49,49,48,109,111,110,101,121,112,117,110,99,116,73,99,76,98,48,69,69,69,0,0,0,0,0,78,83,116,51,95,95,49,49,48,109,111,110,101,121,95,98,97,115,101,69,0,0,0,0,78,83,116,51,95,95,49,49,48,99,116,121,112,101,95,98,97,115,101,69,0,0,0,0,78,83,116,51,95,95,49,49,48,95,95,116,105,109,101,95,112,117,116,69,0,0,0,0,78,83,116,51,95,95,49,49,48,95,95,115,116,100,105,110,98,117,102,73,119,69,69,0,78,83,116,51,95,95,49,49,48,95,95,115,116,100,105,110,98,117,102,73,99,69,69,0,78,52,117,116,102,56,57,101,120,99,101,112,116,105,111,110,69,0,0,0,0,0,0,0,78,52,117,116,102,56,49,56,105,110,118,97,108,105,100,95,99,111,100,101,95,112,111,105,110,116,69,0,0,0,0,0,78,52,117,116,102,56,49,53,110,111,116,95,101,110,111,117,103,104,95,114,111,111,109,69,0,0,0,0,0,0,0,0,78,52,117,116,102,56,49,50,105,110,118,97,108,105,100,95,117,116,102,56,69,0,0,0,78,52,83,97,115,115,57,84,111,95,83,116,114,105,110,103,69,0,0,0,0,0,0,0,78,52,83,97,115,115,57,83,116,97,116,101,109,101,110,116,69,0,0,0,0,0,0,0,78,52,83,97,115,115,57,80,97,114,97,109,101,116,101,114,69,0,0,0,0,0,0,0,78,52,83,97,115,115,57,79,112,101,114,97,116,105,111,110,73,118,69,69,0,0,0,0,78,52,83,97,115,115,57,79,112,101,114,97,116,105,111,110,73,80,78,83,95,57,83,116,97,116,101,109,101,110,116,69,69,69,0,0,0,0,0,0,78,52,83,97,115,115,57,79,112,101,114,97,116,105,111,110,73,80,78,83,95,56,83,101,108,101,99,116,111,114,69,69,69,0,0,0,0,0,0,0,78,52,83,97,115,115,57,79,112,101,114,97,116,105,111,110,73,80,78,83,95,49,48,69,120,112,114,101,115,115,105,111,110,69,69,69,0,0,0,0,78,52,83,97,115,115,57,79,112,101,114,97,116,105,111,110,73,80,49,48,83,97,115,115,95,86,97,108,117,101,69,69,0,0,0,0,0,0,0,0,78,52,83,97,115,115,57,79,112,101,114,97,116,105,111,110,73,78,83,116,51,95,95,49,49,50,98,97,115,105,99,95,115,116,114,105,110,103,73,99,78,83,49,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,78,83,49,95,57,97,108,108,111,99,97,116,111,114,73,99,69,69,69,69,69,69,0,0,0,0,0,78,52,83,97,115,115,57,72,97,115,95,66,108,111,99,107,69,0,0,0,0,0,0,0,78,52,83,97,115,115,57,69,120,116,101,110,115,105,111,110,69,0,0,0,0,0,0,0,78,52,83,97,115,115,57,65,114,103,117,109,101,110,116,115,69,0,0,0,0,0,0,0,78,52,83,97,115,115,56,86,97,114,105,97,98,108,101,69,0,0,0,0,0,0,0,0,78,52,83,97,115,115,56,83,101,108,101,99,116,111,114,69,0,0,0,0,0,0,0,0,78,52,83,97,115,115,56,65,114,103,117,109,101,110,116,69,0,0,0,0,0,0,0,0,78,52,83,97,115,115,56,65,83,84,95,78,111,100,101,69,0,0,0,0,0,0,0,0,78,52,83,97,115,115,55,87,97,114,110,105,110,103,69,0,78,52,83,97,115,115,55,84,101,120,116,117,97,108,69,0,78,52,83,97,115,115,55,82,117,108,101,115,101,116,69,0,78,52,83,97,115,115,55,80,114,111,112,115,101,116,69,0,78,52,83,97,115,115,55,73,110,115,112,101,99,116,69,0,78,52,83,97,115,115,55,67,111,110,116,101,110,116,69,0,78,52,83,97,115,115,55,67,111,109,109,101,110,116,69,0,78,52,83,97,115,115,55,66,111,111,108,101,97,110,69,0,78,52,83,97,115,115,55,65,116,95,82,117,108,101,69,0,78,52,83,97,115,115,54,83,116,114,105,110,103,69,0,0,78,52,83,97,115,115,54,82,101,116,117,114,110,69,0,0,78,52,83,97,115,115,54,78,117,109,98,101,114,69,0,0,78,52,83,97,115,115,54,73,109,112,111,114,116,69,0,0,78,52,83,97,115,115,54,72,97,115,104,101,100,69,0,0,78,52,83,97,115,115,54,69,120,116,101,110,100,69,0,0,78,52,83,97,115,115,54,69,120,112,97,110,100,69,0,0,78,52,83,97,115,115,53,87,104,105,108,101,69,0,0,0,78,52,83,97,115,115,53,69,114,114,111,114,69,0,0,0,78,52,83,97,115,115,53,68,101,98,117,103,69,0,0,0,78,52,83,97,115,115,53,67,111,108,111,114,69,0,0,0,78,52,83,97,115,115,53,66,108,111,99,107,69,0,0,0,78,52,83,97,115,115,52,84,111,95,67,69,0,0,0,0,78,52,83,97,115,115,52,78,117,108,108,69,0,0,0,0,78,52,83,97,115,115,52,76,105,115,116,69,0,0,0,0,78,52,83,97,115,115,52,69,118,97,108,69,0,0,0,0,78,52,83,97,115,115,52,69,97,99,104,69,0,0,0,0,78,52,83,97,115,115,51,77,97,112,69,0,0,0,0,0,78,52,83,97,115,115,51,70,111,114,69,0,0,0,0,0,78,52,83,97,115,115,50,73,102,69,0,0,0,0,0,0,78,52,83,97,115,115,50,51,70,101,97,116,117,114,101,95,81,117,101,114,121,95,67,111,110,100,105,116,105,111,110,69,0,0,0,0,0,0,0,0,78,52,83,97,115,115,50,50,77,101,100,105,97,95,81,117,101,114,121,95,69,120,112,114,101,115,115,105,111,110,69,0,78,52,83,97,115,115,50,48,83,101,108,101,99,116,111,114,95,80,108,97,99,101,104,111,108,100,101,114,69,0,0,0,78,52,83,97,115,115,50,48,70,117,110,99,116,105,111,110,95,67,97,108,108,95,83,99,104,101,109,97,69,0,0,0,78,52,83,97,115,115,49,57,82,101,109,111,118,101,95,80,108,97,99,101,104,111,108,100,101,114,115,69,0,0,0,0,78,52,83,97,115,115,49,56,83,101,108,101,99,116,111,114,95,82,101,102,101,114,101,110,99,101,69,0,0,0,0,0,78,52,83,97,115,115,49,56,83,101,108,101,99,116,111,114,95,81,117,97,108,105,102,105,101,114,69,0,0,0,0,0,78,52,83,97,115,115,49,56,65,116,116,114,105,98,117,116,101,95,83,101,108,101,99,116,111,114,69,0,0,0,0,0,78,52,83,97,115,115,49,55,79,117,116,112,117,116,95,67,111,109,112,114,101,115,115,101,100,69,0,0,0,0,0,0,78,52,83,97,115,115,49,55,67,111,109,112,111,117,110,100,95,83,101,108,101,99,116,111,114,69,0,0,0,0,0,0,78,52,83,97,115,115,49,55,66,105,110,97,114,121,95,69,120,112,114,101,115,115,105,111,110,69,0,0,0,0,0,0,78,52,83,97,115,115,49,54,87,114,97,112,112,101,100,95,83,101,108,101,99,116,111,114,69,0,0,0,0,0,0,0,78,52,83,97,115,115,49,54,85,110,97,114,121,95,69,120,112,114,101,115,115,105,111,110,69,0,0,0,0,0,0,0,78,52,83,97,115,115,49,54,67,111,109,112,108,101,120,95,83,101,108,101,99,116,111,114,69,0,0,0,0,0,0,0,78,52,83,97,115,115,49,53,83,116,114,105,110,103,95,67,111,110,115,116,97,110,116,69,0,0,0,0,0,0,0,0,78,52,83,97,115,115,49,53,83,105,109,112,108,101,95,83,101,108,101,99,116,111,114,69,0,0,0,0,0,0,0,0,78,52,83,97,115,115,49,53,83,101,108,101,99,116,111,114,95,83,99,104,101,109,97,69,0,0,0,0,0,0,0,0,78,52,83,97,115,115,49,53,80,115,101,117,100,111,95,83,101,108,101,99,116,111,114,69,0,0,0,0,0,0,0,0,78,52,83,97,115,115,49,52,79,112,101,114,97,116,105,111,110,95,67,82,84,80,73,118,78,83,95,55,73,110,115,112,101,99,116,69,69,69,0,0,78,52,83,97,115,115,49,52,79,112,101,114,97,116,105,111,110,95,67,82,84,80,73,118,78,83,95,54,69,120,116,101,110,100,69,69,69,0,0,0,78,52,83,97,115,115,49,52,79,112,101,114,97,116,105,111,110,95,67,82,84,80,73,118,78,83,95,49,57,82,101,109,111,118,101,95,80,108,97,99,101,104,111,108,100,101,114,115,69,69,69,0,0,0,0,0,78,52,83,97,115,115,49,52,79,112,101,114,97,116,105,111,110,95,67,82,84,80,73,118,78,83,95,49,55,79,117,116,112,117,116,95,67,111,109,112,114,101,115,115,101,100,69,69,69,0,0,0,0,0,0,0,78,52,83,97,115,115,49,52,79,112,101,114,97,116,105,111,110,95,67,82,84,80,73,118,78,83,95,49,51,79,117,116,112,117,116,95,78,101,115,116,101,100,69,69,69,0,0,0,78,52,83,97,115,115,49,52,79,112,101,114,97,116,105,111,110,95,67,82,84,80,73,80,78,83,95,57,83,116,97,116,101,109,101,110,116,69,78,83,95,54,69,120,112,97,110,100,69,69,69,0,0,0,0,0,78,52,83,97,115,115,49,52,79,112,101,114,97,116,105,111,110,95,67,82,84,80,73,80,78,83,95,56,83,101,108,101,99,116,111,114,69,78,83,95,49,51,67,111,110,116,101,120,116,117,97,108,105,122,101,69,69,69,0,0,0,0,0,0,78,52,83,97,115,115,49,52,79,112,101,114,97,116,105,111,110,95,67,82,84,80,73,80,78,83,95,49,48,69,120,112,114,101,115,115,105,111,110,69,78,83,95,52,69,118,97,108,69,69,69,0,0,0,0,0,78,52,83,97,115,115,49,52,79,112,101,114,97,116,105,111,110,95,67,82,84,80,73,80,49,48,83,97,115,115,95,86,97,108,117,101,78,83,95,52,84,111,95,67,69,69,69,0,78,52,83,97,115,115,49,52,79,112,101,114,97,116,105,111,110,95,67,82,84,80,73,78,83,116,51,95,95,49,49,50,98,97,115,105,99,95,115,116,114,105,110,103,73,99,78,83,49,95,49,49,99,104,97,114,95,116,114,97,105,116,115,73,99,69,69,78,83,49,95,57,97,108,108,111,99,97,116,111,114,73,99,69,69,69,69,78,83,95,57,84,111,95,83,116,114,105,110,103,69,69,69,0,78,52,83,97,115,115,49,51,84,121,112,101,95,83,101,108,101,99,116,111,114,69,0,0,78,52,83,97,115,115,49,51,83,116,114,105,110,103,95,83,99,104,101,109,97,69,0,0,78,52,83,97,115,115,49,51,83,101,108,101,99,116,111,114,95,76,105,115,116,69,0,0,78,52,83,97,115,115,49,51,79,117,116,112,117,116,95,78,101,115,116,101,100,69,0,0,78,52,83,97,115,115,49,51,70,117,110,99,116,105,111,110,95,67,97,108,108,69,0,0,78,52,83,97,115,115,49,51,70,101,97,116,117,114,101,95,81,117,101,114,121,69,0,0,78,52,83,97,115,115,49,51,70,101,97,116,117,114,101,95,66,108,111,99,107,69,0,0,78,52,83,97,115,115,49,51,67,111,110,116,101,120,116,117,97,108,105,122,101,69,0,0,78,52,83,97,115,115,49,49,77,101,100,105,97,95,81,117,101,114,121,69,0,0,0,0,78,52,83,97,115,115,49,49,77,101,100,105,97,95,66,108,111,99,107,69,0,0,0,0,78,52,83,97,115,115,49,49,73,109,112,111,114,116,95,83,116,117,98,69,0,0,0,0,78,52,83,97,115,115,49,49,68,101,99,108,97,114,97,116,105,111,110,69,0,0,0,0,78,52,83,97,115,115,49,48,86,101,99,116,111,114,105,122,101,100,73,80,78,83,95,57,83,116,97,116,101,109,101,110,116,69,69,69,0,0,0,0,78,52,83,97,115,115,49,48,86,101,99,116,111,114,105,122,101,100,73,80,78,83,95,57,80,97,114,97,109,101,116,101,114,69,69,69,0,0,0,0,78,52,83,97,115,115,49,48,86,101,99,116,111,114,105,122,101,100,73,80,78,83,95,56,65,114,103,117,109,101,110,116,69,69,69,0,0,0,0,0,78,52,83,97,115,115,49,48,86,101,99,116,111,114,105,122,101,100,73,80,78,83,95,50,51,70,101,97,116,117,114,101,95,81,117,101,114,121,95,67,111,110,100,105,116,105,111,110,69,69,69,0,0,0,0,0,78,52,83,97,115,115,49,48,86,101,99,116,111,114,105,122,101,100,73,80,78,83,95,50,50,77,101,100,105,97,95,81,117,101,114,121,95,69,120,112,114,101,115,115,105,111,110,69,69,69,0,0,0,0,0,0,78,52,83,97,115,115,49,48,86,101,99,116,111,114,105,122,101,100,73,80,78,83,95,49,54,67,111,109,112,108,101,120,95,83,101,108,101,99,116,111,114,69,69,69,0,0,0,0,78,52,83,97,115,115,49,48,86,101,99,116,111,114,105,122,101,100,73,80,78,83,95,49,53,83,105,109,112,108,101,95,83,101,108,101,99,116,111,114,69,69,69,0,0,0,0,0,78,52,83,97,115,115,49,48,86,101,99,116,111,114,105,122,101,100,73,80,78,83,95,49,48,69,120,112,114,101,115,115,105,111,110,69,69,69,0,0,78,52,83,97,115,115,49,48,83,97,115,115,95,69,114,114,111,114,69,0,0,0,0,0,78,52,83,97,115,115,49,48,80,97,114,97,109,101,116,101,114,115,69,0,0,0,0,0,78,52,83,97,115,115,49,48,77,105,120,105,110,95,67,97,108,108,69,0,0,0,0,0,78,52,83,97,115,115,49,48,69,120,112,114,101,115,115,105,111,110,69,0,0,0,0,0,78,52,83,97,115,115,49,48,68,101,102,105,110,105,116,105,111,110,69,0,0,0,0,0,78,52,83,97,115,115,49,48,65,115,115,105,103,110,109,101,110,116,69,0,0,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,50,51,95,95,102,117,110,100,97,109,101,110,116,97,108,95,116,121,112,101,95,105,110,102,111,69,0,78,49,48,95,95,99,120,120,97,98,105,118,49,50,49,95,95,118,109,105,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,50,48,95,95,115,105,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,57,95,95,112,111,105,110,116,101,114,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,55,95,95,112,98,97,115,101,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,55,95,95,99,108,97,115,115,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,0,0,0,78,49,48,95,95,99,120,120,97,98,105,118,49,49,54,95,95,115,104,105,109,95,116,121,112,101,95,105,110,102,111,69,0,0,0,0,0,0,0,0,68,110,0,0,0,0,0,0,240,110,0,0,64,111,0,0,0,0,0,0,80,111,0,0,0,0,0,0,96,111,0,0,0,0,0,0,112,111,0,0,128,138,0,0,0,0,0,0,0,0,0,0,128,111,0,0,128,138,0,0,0,0,0,0,0,0,0,0,144,111,0,0,184,138,0,0,0,0,0,0,0,0,0,0,168,111,0,0,128,138,0,0,0,0,0,0,0,0,0,0,192,111,0,0,232,138,0,0,0,0,0,0,0,0,0,0,216,111,0,0,232,138,0,0,0,0,0,0,0,0,0,0,240,111,0,0,128,138,0,0,0,0,0,0,0,0,0,0,0,112,0,0,1,0,0,0,0,0,0,0,0,0,0,0,8,112,0,0,24,111,0,0,32,112,0,0,0,0,0,0,2,0,0,0,56,142,0,0,2,0,0,0,160,144,0,0,0,0,0,0,24,111,0,0,104,112,0,0,0,0,0,0,2,0,0,0,56,142,0,0,2,0,0,0,168,144,0,0,0,0,0,0,24,111,0,0,176,112,0,0,0,0,0,0,2,0,0,0,56,142,0,0,2,0,0,0,176,144,0,0,0,0,0,0,24,111,0,0,248,112,0,0,0,0,0,0,2,0,0,0,56,142,0,0,2,0,0,0,184,144,0,0,0,0,0,0,0,0,0,0,64,113,0,0,0,141,0,0,0,0,0,0,0,0,0,0,112,113,0,0,0,141,0,0,0,0,0,0,24,111,0,0,160,113,0,0,0,0,0,0,1,0,0,0,184,143,0,0,0,0,0,0,24,111,0,0,184,113,0,0,0,0,0,0,1,0,0,0,184,143,0,0,0,0,0,0,24,111,0,0,208,113,0,0,0,0,0,0,1,0,0,0,192,143,0,0,0,0,0,0,24,111,0,0,232,113,0,0,0,0,0,0,1,0,0,0,192,143,0,0,0,0,0,0,24,111,0,0,0,114,0,0,0,0,0,0,2,0,0,0,56,142,0,0,2,0,0,0,80,145,0,0,0,8,0,0,24,111,0,0,72,114,0,0,0,0,0,0,2,0,0,0,56,142,0,0,2,0,0,0,80,145,0,0,0,8,0,0,24,111,0,0,144,114,0,0,0,0,0,0,3,0,0,0,56,142,0,0,2,0,0,0,8,139,0,0,2,0,0,0,192,142,0,0,0,8,0,0,24,111,0,0,216,114,0,0,0,0,0,0,3,0,0,0,56,142,0,0,2,0,0,0,8,139,0,0,2,0,0,0,200,142,0,0,0,8,0,0,0,0,0,0,32,115,0,0,56,142,0,0,0,0,0,0,0,0,0,0,56,115,0,0,56,142,0,0,0,0,0,0,24,111,0,0,80,115,0,0,0,0,0,0,2,0,0,0,56,142,0,0,2,0,0,0,200,143,0,0,2,0,0,0,24,111,0,0,104,115,0,0,0,0,0,0,2,0,0,0,56,142,0,0,2,0,0,0,200,143,0,0,2,0,0,0,0,0,0,0,128,115,0,0,0,0,0,0,152,115,0,0,64,144,0,0,0,0,0,0,24,111,0,0,184,115,0,0,0,0,0,0,2,0,0,0,56,142,0,0,2,0,0,0,176,139,0,0,0,0,0,0,24,111,0,0,0,116,0,0,0,0,0,0,2,0,0,0,56,142,0,0,2,0,0,0,200,139,0,0,0,0,0,0,24,111,0,0,72,116,0,0,0,0,0,0,2,0,0,0,56,142,0,0,2,0,0,0,224,139,0,0,0,0,0,0,24,111,0,0,144,116,0,0,0,0,0,0,2,0,0,0,56,142,0,0,2,0,0,0,248,139,0,0,0,0,0,0,0,0,0,0,216,116,0,0,56,142,0,0,0,0,0,0,0,0,0,0,240,116,0,0,56,142,0,0,0,0,0,0,24,111,0,0,8,117,0,0,0,0,0,0,2,0,0,0,56,142,0,0,2,0,0,0,80,144,0,0,2,0,0,0,24,111,0,0,48,117,0,0,0,0,0,0,2,0,0,0,56,142,0,0,2,0,0,0,80,144,0,0,2,0,0,0,24,111,0,0,88,117,0,0,0,0,0,0,2,0,0,0,56,142,0,0,2,0,0,0,80,144,0,0,2,0,0,0,24,111,0,0,128,117,0,0,0,0,0,0,2,0,0,0,56,142,0,0,2,0,0,0,80,144,0,0,2,0,0,0,0,0,0,0,168,117,0,0,176,143,0,0,0,0,0,0,0,0,0,0,192,117,0,0,56,142,0,0,0,0,0,0,24,111,0,0,216,117,0,0,0,0,0,0,2,0,0,0,56,142,0,0,2,0,0,0,72,145,0,0,2,0,0,0,24,111,0,0,240,117,0,0,0,0,0,0,2,0,0,0,56,142,0,0,2,0,0,0,72,145,0,0,2,0,0,0,0,0,0,0,8,118,0,0,112,144,0,0,0,0,0,0,0,0,0,0,48,118,0,0,112,144,0,0,0,0,0,0,0,0,0,0,88,118,0,0,0,0,0,0,128,118,0,0,0,0,0,0,168,118,0,0,0,0,0,0,208,118,0,0,0,143,0,0,0,0,0,0,0,0,0,0,40,119,0,0,232,143,0,0,0,0,0,0,0,0,0,0,112,119,0,0,24,144,0,0,0,0,0,0,24,111,0,0,184,119,0,0,0,0,0,0,1,0,0,0,176,143,0,0,0,0,0,0,0,0,0,0,216,119,0,0,112,144,0,0,0,0,0,0,0,0,0,0,248,119,0,0,128,143,0,0,0,0,0,0,0,0,0,0,64,120,0,0,24,142,0,0,0,0,0,0,0,0,0,0,104,120,0,0,24,142,0,0,0,0,0,0,0,0,0,0,144,120,0,0,112,143,0,0,0,0,0,0,0,0,0,0,216,120,0,0,0,0,0,0,16,121,0,0,0,0,0,0,72,121,0,0,24,111,0,0,104,121,0,0,3,0,0,0,2,0,0,0,24,144,0,0,2,0,0,0,232,143,0,0,2,8,0,0,0,0,0,0,152,121,0,0,24,144,0,0,0,0,0,0,0,0,0,0,200,121,0,0,0,0,0,0,232,121,0,0,0,0,0,0,8,122,0,0,0,0,0,0,40,122,0,0,24,111,0,0,64,122,0,0,0,0,0,0,1,0,0,0,144,139,0,0,3,244,255,255,24,111,0,0,112,122,0,0,0,0,0,0,1,0,0,0,160,139,0,0,3,244,255,255,24,111,0,0,160,122,0,0,0,0,0,0,1,0,0,0,144,139,0,0,3,244,255,255,24,111,0,0,208,122,0,0,0,0,0,0,1,0,0,0,160,139,0,0,3,244,255,255,0,0,0,0,0,123,0,0,112,143,0,0,0,0,0,0,0,0,0,0,48,123,0,0,184,138,0,0,0,0,0,0,0,0,0,0,72,123,0,0,24,111,0,0,96,123,0,0,0,0,0,0,1,0,0,0,184,142,0,0,0,0,0,0,0,0,0,0,160,123,0,0,120,143,0,0,0,0,0,0,0,0,0,0,184,123,0,0,104,143,0,0,0,0,0,0,0,0,0,0,216,123,0,0,112,143,0,0,0,0,0,0,0,0,0,0,248,123,0,0,0,0,0,0,24,124,0,0,0,0,0,0,56,124,0,0,0,0,0,0,88,124,0,0,24,111,0,0,120,124,0,0,0,0,0,0,2,0,0,0,56,142,0,0,2,0,0,0,64,145,0,0,2,0,0,0,24,111,0,0,152,124,0,0,0,0,0,0,2,0,0,0,56,142,0,0,2,0,0,0,64,145,0,0,2,0,0,0,24,111,0,0,184,124,0,0,0,0,0,0,2,0,0,0,56,142,0,0,2,0,0,0,64,145,0,0,2,0,0,0,24,111,0,0,216,124,0,0,0,0,0,0,2,0,0,0,56,142,0,0,2,0,0,0,64,145,0,0,2,0,0,0,0,0,0,0,248,124,0,0,0,0,0,0,16,125,0,0,0,0,0,0,40,125,0,0,0,0,0,0,64,125,0,0,104,143,0,0,0,0,0,0,0,0,0,0,88,125,0,0,112,143,0,0,0,0,0,0,0,0,0,0,112,125,0,0,128,138,0,0,0,0,0,0,0,0,0,0,136,125,0,0,120,145,0,0,0,0,0,0,0,0,0,0,168,125,0,0,120,145,0,0,0,0,0,0,0,0,0,0,200,125,0,0,120,145,0,0,0,0,0,0,0,0,0,0,224,125,0,0,88,150,0,0,0,0,0,0,0,0,0,0,248,125,0,0,136,146,0,0,0,0,0,0,0,0,0,0,16,126,0,0,136,146,0,0,0,0,0,0,0,0,0,0,40,126,0,0,0,0,0,0,64,126,0,0,0,0,0,0,104,126,0,0,0,0,0,0,144,126,0,0,0,0,0,0,184,126,0,0,0,0,0,0,224,126,0,0,0,0,0,0,56,127,0,0,200,145,0,0,0,0,0,0,0,0,0,0,80,127,0,0,200,145,0,0,0,0,0,0,24,111,0,0,104,127,0,0,0,0,0,0,2,0,0,0,224,151,0,0,2,0,0,0,120,151,0,0,2,36,0,0,0,0,0,0,128,127,0,0,224,151,0,0,0,0,0,0,0,0,0,0,152,127,0,0,136,146,0,0,0,0,0,0,0,0,0,0,176,127,0,0,224,151,0,0,0,0,0,0,0,0,0,0,200,127,0,0,0,0,0,0,224,127,0,0,200,145,0,0,0,0,0,0,0,0,0,0,240,127,0,0,224,151,0,0,0,0,0,0,0,0,0,0,0,128,0,0,24,146,0,0,0,0,0,0,0,0,0,0,16,128,0,0,24,146,0,0,0,0,0,0,0,0,0,0,32,128,0,0,200,149,0,0,0,0,0,0,0,0,0,0,48,128,0,0,200,145,0,0,0,0,0,0,0,0,0,0,64,128,0,0,200,145,0,0,0,0,0,0,0,0,0,0,80,128,0,0,224,151,0,0,0,0,0,0,0,0,0,0,96,128,0,0,24,146,0,0,0,0,0,0,0,0,0,0,112,128,0,0,224,151,0,0,0,0,0,0,0,0,0,0,128,128,0,0,200,145,0,0,0,0,0,0,0,0,0,0,144,128,0,0,224,151,0,0,0,0,0,0,0,0,0,0,160,128,0,0,200,145,0,0,0,0,0,0,0,0,0,0,176,128,0,0,0,0,0,0,192,128,0,0,216,149,0,0,0,0,0,0,0,0,0,0,208,128,0,0,24,150,0,0,0,0,0,0,0,0,0,0,224,128,0,0,24,146,0,0,0,0,0,0,0,0,0,0,240,128,0,0,200,145,0,0,0,0,0,0,0,0,0,0,0,129,0,0,200,145,0,0,0,0,0,0,0,0,0,0,16,129,0,0,224,151,0,0,0,0,0,0,24,111,0,0,32,129,0,0,0,0,0,0,2,0,0,0,200,145,0,0,2,0,0,0,104,151,0,0,2,28,0,0,0,0,0,0,48,129,0,0,72,150,0,0,0,0,0,0,0,0,0,0,64,129,0,0,224,151,0,0,0,0,0,0,24,111,0,0,80,129,0,0,0,0,0,0,2,0,0,0,224,151,0,0,2,0,0,0,160,151,0,0,2,36,0,0,0,0,0,0,96,129,0,0,56,150,0,0,0,0,0,0,0,0,0,0,112,129,0,0,24,146,0,0,0,0,0,0,24,111,0,0,128,129,0,0,0,0,0,0,2,0,0,0,224,151,0,0,2,0,0,0,96,147,0,0,2,36,0,0,0,0,0,0,144,129,0,0,24,146,0,0,0,0,0,0,0,0,0,0,160,129,0,0,200,145,0,0,0,0,0,0,24,111,0,0,176,129,0,0,0,0,0,0,2,0,0,0,224,151,0,0,2,0,0,0,128,151,0,0,2,36,0,0,0,0,0,0,216,129,0,0,224,151,0,0,0,0,0,0,0,0,0,0,248,129,0,0,152,149,0,0,0,0,0,0,0,0,0,0,24,130,0,0,224,151,0,0,0,0,0,0,0,0,0,0,56,130,0,0,232,149,0,0,0,0,0,0,0,0,0,0,88,130,0,0,152,149,0,0,0,0,0,0,0,0,0,0,120,130,0,0,152,149,0,0,0,0,0,0,0,0,0,0,152,130,0,0,152,149,0,0,0,0,0,0,0,0,0,0,184,130,0,0,248,149,0,0,0,0,0,0,24,111,0,0,216,130,0,0,0,0,0,0,2,0,0,0,104,146,0,0,2,0,0,0,152,151,0,0,2,32,0,0,0,0,0,0,248,130,0,0,224,151,0,0,0,0,0,0,0,0,0,0,24,131,0,0,152,149,0,0,0,0,0,0,0,0,0,0,56,131,0,0,224,151,0,0,0,0,0,0,0,0,0,0,88,131,0,0,104,146,0,0,0,0,0,0,0,0,0,0,120,131,0,0,32,147,0,0,0,0,0,0,0,0,0,0,152,131,0,0,104,146,0,0,0,0,0,0,0,0,0,0,184,131,0,0,104,146,0,0,0,0,0,0,0,0,0,0,216,131,0,0,152,149,0,0,0,0,0,0,0,0,0,0,248,131,0,0,232,145,0,0,0,0,0,0,0,0,0,0,32,132,0,0,232,145,0,0,0,0,0,0,0,0,0,0,72,132,0,0,232,145,0,0,0,0,0,0,0,0,0,0,128,132,0,0,232,145,0,0,0,0,0,0,0,0,0,0,184,132,0,0,232,145,0,0,0,0,0,0,0,0,0,0,232,132,0,0,240,145,0,0,0,0,0,0,0,0,0,0,32,133,0,0,248,145,0,0,0,0,0,0,0,0,0,0,96,133,0,0,0,146,0,0,0,0,0,0,0,0,0,0,152,133,0,0,8,146,0,0,0,0,0,0,0,0,0,0,200,133,0,0,16,146,0,0,0,0,0,0,0,0,0,0,48,134,0,0,152,149,0,0,0,0,0,0,24,111,0,0,72,134,0,0,0,0,0,0,2,0,0,0,32,147,0,0,2,0,0,0,160,151,0,0,2,40,0,0,24,111,0,0,96,134,0,0,0,0,0,0,2,0,0,0,104,146,0,0,2,0,0,0,144,151,0,0,2,32,0,0,0,0,0,0,120,134,0,0,8,150,0,0,0,0,0,0,0,0,0,0,144,134,0,0,224,151,0,0,0,0,0,0,24,111,0,0,168,134,0,0,0,0,0,0,2,0,0,0,224,151,0,0,2,0,0,0,128,151,0,0,2,36,0,0,0,0,0,0,192,134,0,0,24,146,0,0,0,0,0,0,0,0,0,0,216,134,0,0,40,150,0,0,0,0,0,0,24,111,0,0,240,134,0,0,0,0,0,0,2,0,0,0,224,151,0,0,2,0,0,0,136,151,0,0,2,36,0,0,0,0,0,0,8,135,0,0,24,146,0,0,0,0,0,0,0,0,0,0,32,135,0,0,200,145,0,0,0,0,0,0,0,0,0,0,56,135,0,0,200,145,0,0,0,0,0,0,0,0,0,0,80,135,0,0,0,0,0,0,120,135,0,0,0,0,0,0,160,135,0,0,0,0,0,0,200,135,0,0,0,0,0,0,0,136,0,0,0,0,0,0,56,136,0,0,0,0,0,0,104,136,0,0,0,0,0,0,152,136,0,0,0,0,0,0,192,136,0,0,24,111,0,0,216,136,0,0,0,0,0,0,2,0,0,0,136,146,0,0,2,0,0,0,112,151,0,0,2,28,0,0,0,0,0,0,240,136,0,0,24,146,0,0,0,0,0,0,0,0,0,0,8,137,0,0,136,146,0,0,0,0,0,0,0,0,0,0,32,137,0,0,24,146,0,0,0,0,0,0,0,0,0,0,56,137,0,0,200,145,0,0,0,0,0,0,0,0,0,0,80,137,0,0,112,152,0,0,0,0,0,0,0,0,0,0,120,137,0,0,96,152,0,0,0,0,0,0,0,0,0,0,160,137,0,0,96,152,0,0,0,0,0,0,0,0,0,0,200,137,0,0,80,152,0,0,0,0,0,0,0,0,0,0,240,137,0,0,112,152,0,0,0,0,0,0,0,0,0,0,24,138,0,0,112,152,0,0,0,0,0,0,0,0,0,0,64,138,0,0,120,138,0,0,0,0,0,0,240,110,0,0,104,138,0,0,56,0,0,0,0,0,0,0,232,143,0,0,64,1,0,0,0,2,0,0,200,255,255,255,200,255,255,255,232,143,0,0,154,1,0,0,44,1,0,0,60,0,0,0,0,0,0,0,24,144,0,0,100,2,0,0,50,1,0,0,196,255,255,255,196,255,255,255,24,144,0,0,112,2,0,0,196,0,0,0,64,0,0,0,0,0,0,0,24,144,0,0,100,2,0,0,50,1,0,0,192,255,255,255,192,255,255,255,24,144,0,0,112,2,0,0,196,0,0,0,108,0,0,0,0,0,0,0,24,144,0,0,100,2,0,0,50,1,0,0,148,255,255,255,148,255,255,255,24,144,0,0,112,2,0,0,196,0,0,0,48,49,50,51,52,53,54,55,56,57,97,98,99,100,101,102,65,66,67,68,69,70,120,88,43,45,112,80,105,73,110,78,0,0,0,0,0,0,0,0,1,0,0,0,11,0,0,0,13,0,0,0,17,0,0,0,19,0,0,0,23,0,0,0,29,0,0,0,31,0,0,0,37,0,0,0,41,0,0,0,43,0,0,0,47,0,0,0,53,0,0,0,59,0,0,0,61,0,0,0,67,0,0,0,71,0,0,0,73,0,0,0,79,0,0,0,83,0,0,0,89,0,0,0,97,0,0,0,101,0,0,0,103,0,0,0,107,0,0,0,109,0,0,0,113,0,0,0,121,0,0,0,127,0,0,0,131,0,0,0,137,0,0,0,139,0,0,0,143,0,0,0,149,0,0,0,151,0,0,0,157,0,0,0,163,0,0,0,167,0,0,0,169,0,0,0,173,0,0,0,179,0,0,0,181,0,0,0,187,0,0,0,191,0,0,0,193,0,0,0,197,0,0,0,199,0,0,0,209,0,0,0,0,0,0,0,2,0,0,0,3,0,0,0,5,0,0,0,7,0,0,0,11,0,0,0,13,0,0,0,17,0,0,0,19,0,0,0,23,0,0,0,29,0,0,0,31,0,0,0,37,0,0,0,41,0,0,0,43,0,0,0,47,0,0,0,53,0,0,0,59,0,0,0,61,0,0,0,67,0,0,0,71,0,0,0,73,0,0,0,79,0,0,0,83,0,0,0,89,0,0,0,97,0,0,0,101,0,0,0,103,0,0,0,107,0,0,0,109,0,0,0,113,0,0,0,127,0,0,0,131,0,0,0,137,0,0,0,139,0,0,0,149,0,0,0,151,0,0,0,157,0,0,0,163,0,0,0,167,0,0,0,173,0,0,0,179,0,0,0,181,0,0,0,191,0,0,0,193,0,0,0,197,0,0,0,199,0,0,0,211,0,0,0,0,0,0,0,0,0,110,64,0,0,0,0,0,0,111,64,0,0,0,0,0,224,111,64,0,0,0,0,0,0,240,63,0,0,0,0,0,64,111,64,0,0,0,0,0,96,109,64,0,0,0,0,0,224,106,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,0,0,0,0,0,0,0,224,111,64,0,0,0,0,0,224,111,64,0,0,0,0,0,0,240,63,0,0,0,0,0,192,95,64,0,0,0,0,0,224,111,64,0,0,0,0,0,128,106,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,110,64,0,0,0,0,0,224,111,64,0,0,0,0,0,224,111,64,0,0,0,0,0,0,240,63,0,0,0,0,0,160,110,64,0,0,0,0,0,160,110,64,0,0,0,0,0,128,107,64,0,0,0,0,0,0,240,63,0,0,0,0,0,224,111,64,0,0,0,0,0,128,108,64,0,0,0,0,0,128,104,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,63,0,0,0,0,0,224,111,64,0,0,0,0,0,96,109,64,0,0,0,0,0,160,105,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,224,111,64,0,0,0,0,0,0,240,63,0,0,0,0,0,64,97,64,0,0,0,0,0,128,69,64,0,0,0,0,0,64,108,64,0,0,0,0,0,0,240,63,0,0,0,0,0,160,100,64,0,0,0,0,0,0,69,64,0,0,0,0,0,0,69,64,0,0,0,0,0,0,240,63,0,0,0,0,0,192,107,64,0,0,0,0,0,0,103,64,0,0,0,0,0,224,96,64,0,0,0,0,0,0,240,63,0,0,0,0,0,192,87,64,0,0,0,0,0,192,99,64,0,0,0,0,0,0,100,64,0,0,0,0,0,0,240,63,0,0,0,0,0,192,95,64,0,0,0,0,0,224,111,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,63,0,0,0,0,0,64,106,64,0,0,0,0,0,64,90,64,0,0,0,0,0,0,62,64,0,0,0,0,0,0,240,63,0,0,0,0,0,224,111,64,0,0,0,0,0,192,95,64,0,0,0,0,0,0,84,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,89,64,0,0,0,0,0,160,98,64,0,0,0,0,0,160,109,64,0,0,0,0,0,0,240,63,0,0,0,0,0,224,111,64,0,0,0,0,0,0,111,64,0,0,0,0,0,128,107,64,0,0,0,0,0,0,240,63,0,0,0,0,0,128,107,64,0,0,0,0,0,0,52,64,0,0,0,0,0,0,78,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,0,0,0,0,0,0,0,224,111,64,0,0,0,0,0,224,111,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,97,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,0,0,0,0,0,0,0,96,97,64,0,0,0,0,0,96,97,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,103,64,0,0,0,0,0,192,96,64,0,0,0,0,0,0,38,64,0,0,0,0,0,0,240,63,0,0,0,0,0,32,101,64,0,0,0,0,0,32,101,64,0,0,0,0,0,32,101,64,0,0,0,0,0,0,240,63,0,0,0,0,0,32,101,64,0,0,0,0,0,32,101,64,0,0,0,0,0,32,101,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,0,0,0,0,0,0,0,0,89,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,63,0,0,0,0,0,160,103,64,0,0,0,0,0,224,102,64,0,0,0,0,0,192,90,64,0,0,0,0,0,0,240,63,0,0,0,0,0,96,97,64,0,0,0,0,0,0,0,0,0,0,0,0,0,96,97,64,0,0,0,0,0,0,240,63,0,0,0,0,0,64,85,64,0,0,0,0,0,192,90,64,0,0,0,0,0,128,71,64,0,0,0,0,0,0,240,63,0,0,0,0,0,224,111,64,0,0,0,0,0,128,97,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,63,0,0,0,0,0,32,99,64,0,0,0,0,0,0,73,64,0,0,0,0,0,128,105,64,0,0,0,0,0,0,240,63,0,0,0,0,0,96,97,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,63,0,0,0,0,0,32,109,64,0,0,0,0,0,192,98,64,0,0,0,0,0,128,94,64,0,0,0,0,0,0,240,63,0,0,0,0,0,224,97,64,0,0,0,0,0,128,103,64,0,0,0,0,0,224,97,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,82,64,0,0,0,0,0,128,78,64,0,0,0,0,0,96,97,64,0,0,0,0,0,0,240,63,0,0,0,0,0,128,71,64,0,0,0,0,0,192,83,64,0,0,0,0,0,192,83,64,0,0,0,0,0,0,240,63,0,0,0,0,0,128,71,64,0,0,0,0,0,192,83,64,0,0,0,0,0,192,83,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,0,0,0,0,0,0,0,192,105,64,0,0,0,0,0,32,106,64,0,0,0,0,0,0,240,63,0,0,0,0,0,128,98,64,0,0,0,0,0,0,0,0,0,0,0,0,0,96,106,64,0,0,0,0,0,0,240,63,0,0,0,0,0,224,111,64,0,0,0,0,0,0,52,64,0,0,0,0,0,96,98,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,0,0,0,0,0,0,0,224,103,64,0,0,0,0,0,224,111,64])
.concat([0,0,0,0,0,0,240,63,0,0,0,0,0,64,90,64,0,0,0,0,0,64,90,64,0,0,0,0,0,64,90,64,0,0,0,0,0,0,240,63,0,0,0,0,0,64,90,64,0,0,0,0,0,64,90,64,0,0,0,0,0,64,90,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,62,64,0,0,0,0,0,0,98,64,0,0,0,0,0,224,111,64,0,0,0,0,0,0,240,63,0,0,0,0,0,64,102,64,0,0,0,0,0,0,65,64,0,0,0,0,0,0,65,64,0,0,0,0,0,0,240,63,0,0,0,0,0,224,111,64,0,0,0,0,0,64,111,64,0,0,0,0,0,0,110,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,65,64,0,0,0,0,0,96,97,64,0,0,0,0,0,0,65,64,0,0,0,0,0,0,240,63,0,0,0,0,0,224,111,64,0,0,0,0,0,0,0,0,0,0,0,0,0,224,111,64,0,0,0,0,0,0,240,63,0,0,0,0,0,128,107,64,0,0,0,0,0,128,107,64,0,0,0,0,0,128,107,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,111,64,0,0,0,0,0,0,111,64,0,0,0,0,0,224,111,64,0,0,0,0,0,0,240,63,0,0,0,0,0,224,111,64,0,0,0,0,0,224,106,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,63,0,0,0,0,0,64,107,64,0,0,0,0,0,160,100,64,0,0,0,0,0,0,64,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,96,64,0,0,0,0,0,0,96,64,0,0,0,0,0,0,96,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,96,64,0,0,0,0,0,0,96,64,0,0,0,0,0,0,96,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,63,0,0,0,0,0,160,101,64,0,0,0,0,0,224,111,64,0,0,0,0,0,128,71,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,110,64,0,0,0,0,0,224,111,64,0,0,0,0,0,0,110,64,0,0,0,0,0,0,240,63,0,0,0,0,0,224,111,64,0,0,0,0,0,64,90,64,0,0,0,0,0,128,102,64,0,0,0,0,0,0,240,63,0,0,0,0,0,160,105,64,0,0,0,0,0,0,87,64,0,0,0,0,0,0,87,64,0,0,0,0,0,0,240,63,0,0,0,0,0,192,82,64,0,0,0,0,0,0,0,0,0,0,0,0,0,64,96,64,0,0,0,0,0,0,240,63,0,0,0,0,0,224,111,64,0,0,0,0,0,224,111,64,0,0,0,0,0,0,110,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,110,64,0,0,0,0,0,192,108,64,0,0,0,0,0,128,97,64,0,0,0,0,0,0,240,63,0,0,0,0,0,192,108,64,0,0,0,0,0,192,108,64,0,0,0,0,0,64,111,64,0,0,0,0,0,0,240,63,0,0,0,0,0,224,111,64,0,0,0,0,0,0,110,64,0,0,0,0,0,160,110,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,95,64,0,0,0,0,0,128,111,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,63,0,0,0,0,0,224,111,64,0,0,0,0,0,64,111,64,0,0,0,0,0,160,105,64,0,0,0,0,0,0,240,63,0,0,0,0,0,160,101,64,0,0,0,0,0,0,107,64,0,0,0,0,0,192,108,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,110,64,0,0,0,0,0,0,96,64,0,0,0,0,0,0,96,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,108,64,0,0,0,0,0,224,111,64,0,0,0,0,0,224,111,64,0,0,0,0,0,0,240,63,0,0,0,0,0,64,111,64,0,0,0,0,0,64,111,64,0,0,0,0,0,64,106,64,0,0,0,0,0,0,240,63,0,0,0,0,0,96,106,64,0,0,0,0,0,96,106,64,0,0,0,0,0,96,106,64,0,0,0,0,0,0,240,63,0,0,0,0,0,96,106,64,0,0,0,0,0,96,106,64,0,0,0,0,0,96,106,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,98,64,0,0,0,0,0,192,109,64,0,0,0,0,0,0,98,64,0,0,0,0,0,0,240,63,0,0,0,0,0,224,111,64,0,0,0,0,0,192,102,64,0,0,0,0,0,32,104,64,0,0,0,0,0,0,240,63,0,0,0,0,0,224,111,64,0,0,0,0,0,0,100,64,0,0,0,0,0,128,94,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,64,64,0,0,0,0,0,64,102,64,0,0,0,0,0,64,101,64,0,0,0,0,0,0,240,63,0,0,0,0,0,224,96,64,0,0,0,0,0,192,105,64,0,0,0,0,0,64,111,64,0,0,0,0,0,0,240,63,0,0,0,0,0,192,93,64,0,0,0,0,0,0,97,64,0,0,0,0,0,32,99,64,0,0,0,0,0,0,240,63,0,0,0,0,0,192,93,64,0,0,0,0,0,0,97,64,0,0,0,0,0,32,99,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,102,64,0,0,0,0,0,128,104,64,0,0,0,0,0,192,107,64,0,0,0,0,0,0,240,63,0,0,0,0,0,224,111,64,0,0,0,0,0,224,111,64,0,0,0,0,0,0,108,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,0,0,0,0,0,0,0,224,111,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,63,0,0,0,0,0,0,73,64,0,0,0,0,0,160,105,64,0,0,0,0,0,0,73,64,0,0,0,0,0,0,240,63,0,0,0,0,0,64,111,64,0,0,0,0,0,0,110,64,0,0,0,0,0,192,108,64,0,0,0,0,0,0,240,63,0,0,0,0,0,224,111,64,0,0,0,0,0,0,0,0,0,0,0,0,0,224,111,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,96,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,63,0,0,0,0,0,128,89,64,0,0,0,0,0,160,105,64,0,0,0,0,0,64,101,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,160,105,64,0,0,0,0,0,0,240,63,0,0,0,0,0,64,103,64,0,0,0,0,0,64,85,64,0,0,0,0,0,96,106,64,0,0,0,0,0,0,240,63,0,0,0,0,0,96,98,64,0,0,0,0,0,0,92,64,0,0,0,0,0,96,107,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,78,64,0,0,0,0,0,96,102,64,0,0,0,0,0,64,92,64,0,0,0,0,0,0,240,63,0,0,0,0,0,192,94,64,0,0,0,0,0,0,90,64,0,0,0,0,0,192,109,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,0,0,0,0,0,0,0,64,111,64,0,0,0,0,0,64,99,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,82,64,0,0,0,0,0,32,106,64,0,0,0,0,0,128,105,64,0,0,0,0,0,0,240,63,0,0,0,0,0,224,104,64,0,0,0,0,0,0,53,64,0,0,0,0,0,160,96,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,57,64,0,0,0,0,0,0,57,64,0,0,0,0,0,0,92,64,0,0,0,0,0,0,240,63,0,0,0,0,0,160,110,64,0,0,0,0,0,224,111,64,0,0,0,0,0,64,111,64,0,0,0,0,0,0,240,63,0,0,0,0,0,224,111,64,0,0,0,0,0,128,108,64,0,0,0,0,0,32,108,64,0,0,0,0,0,0,240,63,0,0,0,0,0,224,111,64,0,0,0,0,0,128,108,64,0,0,0,0,0,160,102,64,0,0,0,0,0,0,240,63,0,0,0,0,0,224,111,64,0,0,0,0,0,192,107,64,0,0,0,0,0,160,101,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,64,0,0,0,0,0,0,240,63,0,0,0,0,0,160,111,64,0,0,0,0,0,160,110,64,0,0,0,0,0,192,108,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,96,64,0,0,0,0,0,0,96,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,63,0,0,0,0,0,192,90,64,0,0,0,0,0,192,97,64,0,0,0,0,0,128,65,64,0,0,0,0,0,0,240,63,0,0,0,0,0,224,111,64,0,0,0,0,0,160,100,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,63,0,0,0,0,0,224,111,64,0,0,0,0,0,64,81,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,63,0,0,0,0,0,64,107,64,0,0,0,0,0,0,92,64,0,0,0,0,0,192,106,64,0,0,0,0,0,0,240,63,0,0,0,0,0,192,109,64,0,0,0,0,0,0,109,64,0,0,0,0,0,64,101,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,99,64,0,0,0,0,0,96,111,64,0,0,0,0,0,0,99,64,0,0,0,0,0,0,240,63,0,0,0,0,0,224,101,64,0,0,0,0,0,192,109,64,0,0,0,0,0,192,109,64,0,0,0,0,0,0,240,63,0,0,0,0,0,96,107,64,0,0,0,0,0,0,92,64,0,0,0,0,0,96,98,64,0,0,0,0,0,0,240,63,0,0,0,0,0,224,111,64,0,0,0,0,0,224,109,64,0,0,0,0,0,160,106,64,0,0,0,0,0,0,240,63,0,0,0,0,0,224,111,64,0,0,0,0,0,64,107,64,0,0,0,0,0,32,103,64,0,0,0,0,0,0,240,63,0,0,0,0,0,160,105,64,0,0,0,0,0,160,96,64,0,0,0,0,0,128,79,64,0,0,0,0,0,0,240,63,0,0,0,0,0,224,111,64,0,0,0,0,0,0,104,64,0,0,0,0,0,96,105,64,0,0,0,0,0,0,240,63,0,0,0,0,0,160,107,64,0,0,0,0,0,0,100,64,0,0,0,0,0,160,107,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,102,64,0,0,0,0,0,0,108,64,0,0,0,0,0,192,108,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,96,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,64,0,0,0,0,0,0,240,63,0,0,0,0,0,224,111,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,63,0,0,0,0,0,128,103,64,0,0,0,0,0,224,97,64,0,0,0,0,0,224,97,64,0,0,0,0,0,0,240,63,0,0,0,0,0,64,80,64,0,0,0,0,0,64,90,64,0,0,0,0,0,32,108,64,0,0,0,0,0,0,240,63,0,0,0,0,0,96,97,64,0,0,0,0,0,64,81,64,0,0,0,0,0,0,51,64,0,0,0,0,0,0,240,63,0,0,0,0,0,64,111,64,0,0,0,0,0,0,96,64,0,0,0,0,0,128,92,64,0,0,0,0,0,0,240,63,0,0,0,0,0,128,110,64,0,0,0,0,0,128,100,64,0,0,0,0,0,0,88,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,71,64,0,0,0,0,0,96,97,64,0,0,0,0,0,192,85,64,0,0,0,0,0,0,240,63,0,0,0,0,0,224,111,64,0,0,0,0,0,160,110,64,0,0,0,0,0,192,109,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,100,64,0,0,0,0,0,128,84,64,0,0,0,0,0,128,70,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,104,64,0,0,0,0,0,0,104,64,0,0,0,0,0,0,104,64,0,0,0,0,0,0,240,63,0,0,0,0,0,224,96,64,0,0,0,0,0,192,105,64,0,0,0,0,0,96,109,64,0,0,0,0,0,0,240,63,0,0,0,0,0,128,90,64,0,0,0,0,0,128,86,64,0,0,0,0,0,160,105,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,92,64,0,0,0,0,0,0,96,64,0,0,0,0,0,0,98,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,92,64,0,0,0,0,0,0,96,64,0,0,0,0,0,0,98,64,0,0,0,0,0,0,240,63,0,0,0,0,0,224,111,64,0,0,0,0,0,64,111,64,0,0,0,0,0,64,111,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,0,0,0,0,0,0,0,224,111,64,0,0,0,0,0,192,95,64,0,0,0,0,0,0,240,63,0,0,0,0,0,128,81,64,0,0,0,0,0,64,96,64,0,0,0,0,0,128,102,64,0,0,0,0,0,0,240,63,0,0,0,0,0,64,106,64,0,0,0,0,0,128,102,64,0,0,0,0,0,128,97,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,64,0,0,0,0,0,0,96,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,107,64,0,0,0,0,0,224,103,64,0,0,0,0,0,0,107,64,0,0,0,0,0,0,240,63,0,0,0,0,0,224,111,64,0,0,0,0,0,192,88,64,0,0,0,0,0,192,81,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,80,64,0,0,0,0,0,0,108,64,0,0,0,0,0,0,106,64,0,0,0,0,0,0,240,63,0,0,0,0,0,192,109,64,0,0,0,0,0,64,96,64,0,0,0,0,0,192,109,64,0,0,0,0,0,0,240,63,0,0,0,0,0,160,110,64,0,0,0,0,0,192,107,64,0,0,0,0,0,96,102,64,0,0,0,0,0,0,240,63,0,0,0,0,0,224,111,64,0,0,0,0,0,224,111,64,0,0,0,0,0,224,111,64,0,0,0,0,0,0,240,63,0,0,0,0,0,160,110,64,0,0,0,0,0,160,110,64,0,0,0,0,0,160,110,64,0,0,0,0,0,0,240,63,0,0,0,0,0,224,111,64,0,0,0,0,0,224,111,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,63,0,0,0,0,0,64,99,64,0,0,0,0,0,160,105,64,0,0,0,0,0,0,73,64,0,0,0,0,0,0,240,63,0,0,0,0,0,128,89,64,0,0,0,0,0,128,73,64,0,0,0,0,0,32,99,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,254,175,64,240,3,0,0,0,0,0,0,8,14,0,0,0,0,0,0,184,62,0,0,0,0,0,0,0,48,0,0,0,0,0,0,64,3,0,0,0,0,0,0,80,27,0,0,0,0,0,0,240,54,0,0,0,0,0,0,40,62,0,0,0,0,0,0,152,41,0,0,0,0,0,0,144,3,0,0,0,0,0,0,56,52,0,0,0,0,0,0,160,47,0,0,0,0,0,0,96,59,0,0,0,0,0,0,232,1,0,0,0,0,0,0,0,49,0,0,0,0,0,0,200,65,0,0,0,0,0,0,232,51,0,0,0,0,0,0,200,46,0,0,0,0,0,0,120,2,0,0,0,0,0,0,200,0,0,0,0,0,0,0,176,40,0,0,0,0,0,0,208,44,0,0,0,0,0,0,0,3,0,0,0,0,0,0,184,51,0,0,0,0,0,0,48,53,0,0,0,0,0,0,192,53,0,0,0,0,0,0,248,52,0,0,0,0,0,0,216,23,0,0,0,0,0,0,176,58,0,0,0,0,0,0,112,52,0,0,0,0,0,0,176,6,0,0,0,0,0,0,240,5,0,0,0,0,0,0,176,52,0,0,0,0,0,0,152,17,0,0,0,0,0,0,48,22,0,0,0,0,0,0,240,19,0,0,0,0,0,0,104,57,0,0,0,0,0,0,144,13,0,0,0,0,0,0,184,10,0,0,0,0,0,0,104,38,0,0,0,0,0,0,112,5,0,0,0,0,0,0,176,56,0,0,0,0,0,0,48,56,0,0,0,0,0,0,176,15,0,0,0,0,0,0,16,30,0,0,0,0,0,0,200,28,0,0,0,0,0,0,80,54,0,0,0,0,0,0,64,36,0,0,0,0,0,0,232,49,0,0,0,0,0,0,40,8,0,0,0,0,0,0,128,9,0,0,0,0,0,0,136,56,0,0,0,0,0,0,8,37,0,0,0,0,0,0,240,50,0,0,0,0,0,0,120,29,0,0,0,0,0,0,144,54,0,0,0,0,0,0,168,32,0,0,0,0,0,0,240,56,0,0,0,0,0,0,176,55,0,0,0,0,0,0,72,23,0,0,0,0,0,0,80,15,0,0,0,0,0,0,112,55,0,0,0,0,0,0,56,63,0,0,0,0,0,0,240,26,0,0,0,0,0,0,0,25,0,0,0,0,0,0,48,58,0,0,0,0,0,0,216,34,0,0,0,0,0,0,120,50,0,0,0,0,0,0,112,24,0,0,0,0,0,0,0,59,0,0,0,0,0,0,48,55,0,0,0,0,0,0,104,51,0,0,0,0,0,0,136,0,0,0,0,0,0,0,40,66,0,0,0,0,0,0,112,28,0,0,0,0,0,0,40,33,0,0,0,0,0,0,208,59,0,0,0,0,0,0,64,119,104,105,108,101,0,0,239,187,191,0,0,0,0,0,247,100,76,0,0,0,0,0,64,109,105,120,105,110,0,0,64,109,101,100,105,97,0,0,102,97,108,115,101,0,0,0,64,101,114,114,111,114,0,0,64,100,101,98,117,103,0,0,64,119,97,114,110,0,0,0,116,114,117,101,0,0,0,0,14,254,255,0,0,0,0,0,111,110,108,121,0,0,0,0,110,117,108,108,0,0,0,0,102,114,111,109,0,0,0,0,101,118,101,110,0,0,0,0,64,101,108,115,101,0,0,0,46,46,46,0,0,0,0,0,64,101,97,99,104,0,0,0,99,97,108,99,40,0,0,0,117,114,108,40,0,0,0,0,111,100,100,0,0,0,0,0,110,111,116,0,0,0,0,0,64,102,111,114,0,0,0,0,97,110,100,0,0,0,0,0,116,111,0,0,0,0,0,0,125,0,0,0,0,0,0,0,111,114,0,0,0,0,0,0,105,110,0,0,0,0,0,0,64,105,102,0,0,0,0,0,33,61,0,0,0,0,0,0,60,61,0,0,0,0,0,0,62,61,0,0,0,0,0,0,60,0,0,0,0,0,0,0,62,0,0,0,0,0,0,0,61,61,0,0,0,0,0,0,105,102,0,0,0,0,0,0,232,3,0,0,0,0,0,0,45,119,101,98,107,105,116,45,99,97,108,99,40,0,0,0,221,115,102,115,0,0,0,0,58,110,111,116,40,0,0,0,101,120,112,114,101,115,115,105,111,110,0,0,0,0,0,0,255,254,0,0,0,0,0,0,0,0,254,255,0,0,0,0,255,254,0,0,0,0,0,0,254,255,0,0,0,0,0,0,105,109,112,111,114,116,97,110,116,0,0,0,0,0,0,0,64,115,117,112,112,111,114,116,115,0,0,0,0,0,0,0,111,112,116,105,111,110,97,108,0,0,0,0,0,0,0,0,45,109,111,122,45,99,97,108,99,40,0,0,0,0,0,0,132,49,149,51,0,0,0,0,64,102,117,110,99,116,105,111,110,0,0,0,0,0,0,0,36,61,0,0,0,0,0,0,43,47,118,56,45,0,0,0,43,47,118,47,0,0,0,0,43,47,118,43,0,0,0,0,43,47,118,57,0,0,0,0,43,47,118,56,0,0,0,0,126,61,0,0,0,0,0,0,116,104,114,111,117,103,104,0,47,47,0,0,0,0,0,0,64,105,110,99,108,117,100,101,0,0,0,0,0,0,0,0,35,123,0,0,0,0,0,0,100,101,102,97,117,108,116,0,64,99,111,110,116,101,110,116,0,0,0,0,0,0,0,0,64,99,104,97,114,115,101,116,0,0,0,0,0,0,0,0,94,61,0,0,0,0,0,0,42,47,0,0,0,0,0,0,42,61,0,0,0,0,0,0,47,42,0,0,0,0,0,0,45,43,0,0,0,0,0,0,64,114,101,116,117,114,110,0,112,114,111,103,105,100,0,0,124,61,0,0,0,0,0,0,64,105,109,112,111,114,116,0,103,108,111,98,97,108,0,0,64,101,120,116,101,110,100,0,251,238,40,0,0,0,0,0,232,57,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,8,0,0,0,6,0,0,0,10,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,240,63,82,184,30,133,235,81,4,64,0,0,0,0,0,0,24,64,102,102,102,102,102,102,57,64,0,0,0,0,0,0,82,64,0,0,0,0,0,0,88,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,76,38,147,201,100,50,217,63,0,0,0,0,0,0,240,63,185,92,46,151,203,229,2,64,0,0,0,0,0,0,36,64,22,139,197,98,177,88,60,64,185,92,46,151,203,229,66,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,85,85,85,85,85,85,197,63,24,75,126,177,228,23,219,63,0,0,0,0,0,0,240,63,239,238,238,238,238,238,16,64,0,0,0,0,0,0,40,64,0,0,0,0,0,0,48,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,10,133,66,161,80,40,164,63,154,153,153,153,153,153,185,63,144,199,227,241,120,60,206,63,0,0,0,0,0,0,240,63,172,213,106,181,90,173,6,64,144,199,227,241,120,60,14,64,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,28,199,113,28,199,113,140,63,101,135,169,203,237,15,162,63,85,85,85,85,85,85,181,63,62,233,147,62,233,147,214,63,0,0,0,0,0,0,240,63,85,85,85,85,85,85,245,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,85,85,85,85,85,85,133,63,24,75,126,177,228,23,155,63,0,0,0,0,0,0,176,63,239,238,238,238,238,238,208,63,0,0,0,0,0,0,232,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,114,28,199,113,28,199,241,63,57,157,82,162,70,223,145,63,23,108,193,22,108,193,102,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,205,204,204,204,204,204,236,63,0,0,0,0,0,0,240,63,26,39,23,146,191,21,144,63,123,20,174,71,225,122,100,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,248,193,99,26,220,165,76,64,76,73,139,171,187,212,79,64,0,0,0,0,0,0,240,63,24,45,68,84,251,33,249,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,63,0,0,0,0,0,128,118,64,0,0,0,0,0,0,121,64,24,45,68,84,251,33,25,64,0,0,0,0,0,0,240,63,96,40,0,0,136,57,0,0,128,45,0,0,144,37,0,0,8,30,0,0,248,24,0,0,144,17,0,0,72,11,0,0,224,5,0,0,200,1,0,0,224,65,0,0,8,62,0,0,112,59,0,0,200,56,0,0,0,55,0,0,16,53,0,0,56,51,0,0,200,49,0,0,240,48,0,0,248,47,0,0,152,47,0,0,160,46,0,0,80,46,0,0,176,45,0,0,64,45,0,0,16,45,0,0,88,44,0,0,240,43,0,0,232,42,0,0,144,42,0,0,56,41,0,0,120,39,0,0,56,39,0,0,232,37,0,0,80,37,0,0,232,36,0,0,248,35,0,0,96,35,0,0,136,34,0,0,216,33,0,0,224,32,0,0,16,32,0,0,40,31,0,0,120,30,0,0,192,29,0,0,72,29,0,0,248,28,0,0,168,28,0,0,72,28,0,0,184,27,0,0,24,27,0,0,208,26,0,0,16,26,0,0,128,25,0,0,224,24,0,0,80,24,0,0,184,23,0,0,24,23,0,0,8,22,0,0,96,21,0,0,160,20,0,0,208,19,0,0,32,19,0,0,112,18,0,0,64,17,0,0,144,16,0,0,248,15,0,0,160,15,0,0,240,14,0,0,112,14,0,0,200,13,0,0,80,13,0,0,176,12,0,0,216,11,0,0,56,11,0,0,168,10,0,0,64,10,0,0,216,9,0,0,104,9,0,0,240,8,0,0,8,8,0,0,160,7,0,0,40,7,0,0,120,6,0,0,216,5,0,0,104,5,0,0,56,5,0,0,216,4,0,0,40,4,0,0,224,3,0,0,112,3,0,0,48,3,0,0,184,2,0,0,32,2,0,0,208,1,0,0,160,1,0,0,112,1,0,0,232,0,0,0,168,0,0,0,120,0,0,0,200,66,0,0,160,66,0,0,104,66,0,0,24,66,0,0,240,65,0,0,192,65,0,0,176,65,0,0,112,65,0,0,24,65,0,0,72,64,0,0,216,63,0,0,128,63,0,0,32,63,0,0,152,62,0,0,32,62,0,0,160,61,0,0,152,61,0,0,104,61,0,0,72,61,0,0,248,60,0,0,152,60,0,0,104,60,0,0,24,60,0,0,184,59,0,0,144,59,0,0,80,59,0,0,32,59,0,0,248,58,0,0,208,58,0,0,96,58,0,0,216,57,0,0,184,57,0,0,88,57,0,0,24,57,0,0,224,56,0,0,160,56,0,0,128,56,0,0,112,56,0,0,80,56,0,0,40,56,0,0,200,55,0,0,168,55,0,0,128,55,0,0,88,55,0,0,16,55,0,0,232,54,0,0,208,54,0,0,120,54,0,0,56,54,0,0,0,0,0,0])
, "i8", ALLOC_NONE, Runtime.GLOBAL_BASE)
var tempDoublePtr = Runtime.alignMemory(allocate(12, "i8", ALLOC_STATIC), 8);
assert(tempDoublePtr % 8 == 0);
function copyTempFloat(ptr) { // functions, because inlining this code increases code size too much
  HEAP8[tempDoublePtr] = HEAP8[ptr];
  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];
  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];
  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];
}
function copyTempDouble(ptr) {
  HEAP8[tempDoublePtr] = HEAP8[ptr];
  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];
  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];
  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];
  HEAP8[tempDoublePtr+4] = HEAP8[ptr+4];
  HEAP8[tempDoublePtr+5] = HEAP8[ptr+5];
  HEAP8[tempDoublePtr+6] = HEAP8[ptr+6];
  HEAP8[tempDoublePtr+7] = HEAP8[ptr+7];
}
  function ___gxx_personality_v0() {
    }
  function ___cxa_bad_typeid() {
  Module['printErr']('missing function: __cxa_bad_typeid'); abort(-1);
  }
  function ___cxa_pure_virtual() {
      ABORT = true;
      throw 'Pure virtual function called!';
    }
  function __ZSt18uncaught_exceptionv() { // std::uncaught_exception()
      return !!__ZSt18uncaught_exceptionv.uncaught_exception;
    }function ___cxa_begin_catch(ptr) {
      __ZSt18uncaught_exceptionv.uncaught_exception--;
      return ptr;
    }
  function __exit(status) {
      // void _exit(int status);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/exit.html
      Module['exit'](status);
    }function _exit(status) {
      __exit(status);
    }function __ZSt9terminatev() {
      _exit(-1234);
    }
  Module["_memcpy"] = _memcpy;var _llvm_memcpy_p0i8_p0i8_i32=_memcpy;
  function ___cxa_allocate_exception(size) {
      return _malloc(size);
    }
  function ___cxa_free_exception(ptr) {
      try {
        return _free(ptr);
      } catch(e) { // XXX FIXME
      }
    }
  function _llvm_eh_exception() {
      return HEAP32[((_llvm_eh_exception.buf)>>2)];
    }
  function ___cxa_is_number_type(type) {
      var isNumber = false;
      try { if (type == __ZTIi) isNumber = true } catch(e){}
      try { if (type == __ZTIj) isNumber = true } catch(e){}
      try { if (type == __ZTIl) isNumber = true } catch(e){}
      try { if (type == __ZTIm) isNumber = true } catch(e){}
      try { if (type == __ZTIx) isNumber = true } catch(e){}
      try { if (type == __ZTIy) isNumber = true } catch(e){}
      try { if (type == __ZTIf) isNumber = true } catch(e){}
      try { if (type == __ZTId) isNumber = true } catch(e){}
      try { if (type == __ZTIe) isNumber = true } catch(e){}
      try { if (type == __ZTIc) isNumber = true } catch(e){}
      try { if (type == __ZTIa) isNumber = true } catch(e){}
      try { if (type == __ZTIh) isNumber = true } catch(e){}
      try { if (type == __ZTIs) isNumber = true } catch(e){}
      try { if (type == __ZTIt) isNumber = true } catch(e){}
      return isNumber;
    }function ___cxa_does_inherit(definiteType, possibilityType, possibility) {
      if (possibility == 0) return false;
      if (possibilityType == 0 || possibilityType == definiteType)
        return true;
      var possibility_type_info;
      if (___cxa_is_number_type(possibilityType)) {
        possibility_type_info = possibilityType;
      } else {
        var possibility_type_infoAddr = HEAP32[((possibilityType)>>2)] - 8;
        possibility_type_info = HEAP32[((possibility_type_infoAddr)>>2)];
      }
      switch (possibility_type_info) {
      case 0: // possibility is a pointer
        // See if definite type is a pointer
        var definite_type_infoAddr = HEAP32[((definiteType)>>2)] - 8;
        var definite_type_info = HEAP32[((definite_type_infoAddr)>>2)];
        if (definite_type_info == 0) {
          // Also a pointer; compare base types of pointers
          var defPointerBaseAddr = definiteType+8;
          var defPointerBaseType = HEAP32[((defPointerBaseAddr)>>2)];
          var possPointerBaseAddr = possibilityType+8;
          var possPointerBaseType = HEAP32[((possPointerBaseAddr)>>2)];
          return ___cxa_does_inherit(defPointerBaseType, possPointerBaseType, possibility);
        } else
          return false; // one pointer and one non-pointer
      case 1: // class with no base class
        return false;
      case 2: // class with base class
        var parentTypeAddr = possibilityType + 8;
        var parentType = HEAP32[((parentTypeAddr)>>2)];
        return ___cxa_does_inherit(definiteType, parentType, possibility);
      default:
        return false; // some unencountered type
      }
    }
  function ___resumeException(ptr) {
      if (HEAP32[((_llvm_eh_exception.buf)>>2)] == 0) HEAP32[((_llvm_eh_exception.buf)>>2)]=ptr;
      throw ptr;;
    }function ___cxa_find_matching_catch(thrown, throwntype) {
      if (thrown == -1) thrown = HEAP32[((_llvm_eh_exception.buf)>>2)];
      if (throwntype == -1) throwntype = HEAP32[(((_llvm_eh_exception.buf)+(4))>>2)];
      var typeArray = Array.prototype.slice.call(arguments, 2);
      // If throwntype is a pointer, this means a pointer has been
      // thrown. When a pointer is thrown, actually what's thrown
      // is a pointer to the pointer. We'll dereference it.
      if (throwntype != 0 && !___cxa_is_number_type(throwntype)) {
        var throwntypeInfoAddr= HEAP32[((throwntype)>>2)] - 8;
        var throwntypeInfo= HEAP32[((throwntypeInfoAddr)>>2)];
        if (throwntypeInfo == 0)
          thrown = HEAP32[((thrown)>>2)];
      }
      // The different catch blocks are denoted by different types.
      // Due to inheritance, those types may not precisely match the
      // type of the thrown object. Find one which matches, and
      // return the type of the catch block which should be called.
      for (var i = 0; i < typeArray.length; i++) {
        if (___cxa_does_inherit(typeArray[i], throwntype, thrown))
          return ((asm["setTempRet0"](typeArray[i]),thrown)|0);
      }
      // Shouldn't happen unless we have bogus data in typeArray
      // or encounter a type for which emscripten doesn't have suitable
      // typeinfo defined. Best-efforts match just in case.
      return ((asm["setTempRet0"](throwntype),thrown)|0);
    }function ___cxa_throw(ptr, type, destructor) {
      if (!___cxa_throw.initialized) {
        try {
          HEAP32[((__ZTVN10__cxxabiv119__pointer_type_infoE)>>2)]=0; // Workaround for libcxxabi integration bug
        } catch(e){}
        try {
          HEAP32[((__ZTVN10__cxxabiv117__class_type_infoE)>>2)]=1; // Workaround for libcxxabi integration bug
        } catch(e){}
        try {
          HEAP32[((__ZTVN10__cxxabiv120__si_class_type_infoE)>>2)]=2; // Workaround for libcxxabi integration bug
        } catch(e){}
        ___cxa_throw.initialized = true;
      }
      HEAP32[((_llvm_eh_exception.buf)>>2)]=ptr
      HEAP32[(((_llvm_eh_exception.buf)+(4))>>2)]=type
      HEAP32[(((_llvm_eh_exception.buf)+(8))>>2)]=destructor
      if (!("uncaught_exception" in __ZSt18uncaught_exceptionv)) {
        __ZSt18uncaught_exceptionv.uncaught_exception = 1;
      } else {
        __ZSt18uncaught_exceptionv.uncaught_exception++;
      }
      throw ptr;;
    }
  function _memchr(ptr, chr, num) {
      chr = unSign(chr);
      for (var i = 0; i < num; i++) {
        if (HEAP8[(ptr)] == chr) return ptr;
        ptr++;
      }
      return 0;
    }
  Module["_memmove"] = _memmove;var _llvm_memmove_p0i8_p0i8_i32=_memmove;
  Module["_memcmp"] = _memcmp;
  function ___cxa_end_catch() {
      if (___cxa_end_catch.rethrown) {
        ___cxa_end_catch.rethrown = false;
        return;
      }
      // Clear state flag.
      asm['setThrew'](0);
      // Clear type.
      HEAP32[(((_llvm_eh_exception.buf)+(4))>>2)]=0
      // Call destructor if one is registered then clear it.
      var ptr = HEAP32[((_llvm_eh_exception.buf)>>2)];
      var destructor = HEAP32[(((_llvm_eh_exception.buf)+(8))>>2)];
      if (destructor) {
        Runtime.dynCall('vi', destructor, [ptr]);
        HEAP32[(((_llvm_eh_exception.buf)+(8))>>2)]=0
      }
      // Free ptr if it isn't null.
      if (ptr) {
        ___cxa_free_exception(ptr);
        HEAP32[((_llvm_eh_exception.buf)>>2)]=0
      }
    }
  var _llvm_memcpy_p0i8_p0i8_i64=_memcpy;
  function _llvm_lifetime_start() {}
  function _llvm_lifetime_end() {}
  Module["_memset"] = _memset;var _llvm_memset_p0i8_i32=_memset;
  Module["_strlen"] = _strlen;
  function ___cxa_bad_cast() {
  Module['printErr']('missing function: __cxa_bad_cast'); abort(-1);
  }
  function _llvm_eh_typeid_for(type) {
      return type;
    }
  function ___cxa_rethrow() {
      ___cxa_end_catch.rethrown = true;
      throw HEAP32[((_llvm_eh_exception.buf)>>2)];;
    }
  var _llvm_memset_p0i8_i64=_memset;
  function _atexit(func, arg) {
      __ATEXIT__.unshift({ func: func, arg: arg });
    }var ___cxa_atexit=_atexit;
  function _strdup(ptr) {
      var len = _strlen(ptr);
      var newStr = _malloc(len + 1);
      (_memcpy(newStr, ptr, len)|0);
      HEAP8[(((newStr)+(len))|0)]=0;
      return newStr;
    }
  Module["_strcpy"] = _strcpy;
  function _fmod(x, y) {
      return x % y;
    }
  function _isspace(chr) {
      return (chr == 32) || (chr >= 9 && chr <= 13);
    }
  var ___errno_state=0;function ___setErrNo(value) {
      // For convenient setting and returning of errno.
      HEAP32[((___errno_state)>>2)]=value
      return value;
    }
  var ERRNO_CODES={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86};function __parseInt(str, endptr, base, min, max, bits, unsign) {
      // Skip space.
      while (_isspace(HEAP8[(str)])) str++;
      // Check for a plus/minus sign.
      var multiplier = 1;
      if (HEAP8[(str)] == 45) {
        multiplier = -1;
        str++;
      } else if (HEAP8[(str)] == 43) {
        str++;
      }
      // Find base.
      var finalBase = base;
      if (!finalBase) {
        if (HEAP8[(str)] == 48) {
          if (HEAP8[((str+1)|0)] == 120 ||
              HEAP8[((str+1)|0)] == 88) {
            finalBase = 16;
            str += 2;
          } else {
            finalBase = 8;
            str++;
          }
        }
      } else if (finalBase==16) {
        if (HEAP8[(str)] == 48) {
          if (HEAP8[((str+1)|0)] == 120 ||
              HEAP8[((str+1)|0)] == 88) {
            str += 2;
          }
        }
      }
      if (!finalBase) finalBase = 10;
      // Get digits.
      var chr;
      var ret = 0;
      while ((chr = HEAP8[(str)]) != 0) {
        var digit = parseInt(String.fromCharCode(chr), finalBase);
        if (isNaN(digit)) {
          break;
        } else {
          ret = ret * finalBase + digit;
          str++;
        }
      }
      // Apply sign.
      ret *= multiplier;
      // Set end pointer.
      if (endptr) {
        HEAP32[((endptr)>>2)]=str
      }
      // Unsign if needed.
      if (unsign) {
        if (Math.abs(ret) > max) {
          ret = max;
          ___setErrNo(ERRNO_CODES.ERANGE);
        } else {
          ret = unSign(ret, bits);
        }
      }
      // Validate range.
      if (ret > max || ret < min) {
        ret = ret > max ? max : min;
        ___setErrNo(ERRNO_CODES.ERANGE);
      }
      if (bits == 64) {
        return ((asm["setTempRet0"]((tempDouble=ret,(+(Math_abs(tempDouble))) >= (+1) ? (tempDouble > (+0) ? ((Math_min((+(Math_floor((tempDouble)/(+4294967296)))), (+4294967295)))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/(+4294967296))))))>>>0) : 0)),ret>>>0)|0);
      }
      return ret;
    }function _strtol(str, endptr, base) {
      return __parseInt(str, endptr, base, -2147483648, 2147483647, 32);  // LONG_MIN, LONG_MAX.
    }
  var _ceilf=Math_ceil;
  var ctlz_i8 = allocate([8,7,6,6,5,5,5,5,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "i8", ALLOC_STATIC); 
  Module["_llvm_ctlz_i32"] = _llvm_ctlz_i32;
  var ERRNO_MESSAGES={0:"Success",1:"Not super-user",2:"No such file or directory",3:"No such process",4:"Interrupted system call",5:"I/O error",6:"No such device or address",7:"Arg list too long",8:"Exec format error",9:"Bad file number",10:"No children",11:"No more processes",12:"Not enough core",13:"Permission denied",14:"Bad address",15:"Block device required",16:"Mount device busy",17:"File exists",18:"Cross-device link",19:"No such device",20:"Not a directory",21:"Is a directory",22:"Invalid argument",23:"Too many open files in system",24:"Too many open files",25:"Not a typewriter",26:"Text file busy",27:"File too large",28:"No space left on device",29:"Illegal seek",30:"Read only file system",31:"Too many links",32:"Broken pipe",33:"Math arg out of domain of func",34:"Math result not representable",35:"File locking deadlock error",36:"File or path name too long",37:"No record locks available",38:"Function not implemented",39:"Directory not empty",40:"Too many symbolic links",42:"No message of desired type",43:"Identifier removed",44:"Channel number out of range",45:"Level 2 not synchronized",46:"Level 3 halted",47:"Level 3 reset",48:"Link number out of range",49:"Protocol driver not attached",50:"No CSI structure available",51:"Level 2 halted",52:"Invalid exchange",53:"Invalid request descriptor",54:"Exchange full",55:"No anode",56:"Invalid request code",57:"Invalid slot",59:"Bad font file fmt",60:"Device not a stream",61:"No data (for no delay io)",62:"Timer expired",63:"Out of streams resources",64:"Machine is not on the network",65:"Package not installed",66:"The object is remote",67:"The link has been severed",68:"Advertise error",69:"Srmount error",70:"Communication error on send",71:"Protocol error",72:"Multihop attempted",73:"Cross mount point (not really error)",74:"Trying to read unreadable message",75:"Value too large for defined data type",76:"Given log. name not unique",77:"f.d. invalid for this operation",78:"Remote address changed",79:"Can   access a needed shared lib",80:"Accessing a corrupted shared lib",81:".lib section in a.out corrupted",82:"Attempting to link in too many libs",83:"Attempting to exec a shared library",84:"Illegal byte sequence",86:"Streams pipe error",87:"Too many users",88:"Socket operation on non-socket",89:"Destination address required",90:"Message too long",91:"Protocol wrong type for socket",92:"Protocol not available",93:"Unknown protocol",94:"Socket type not supported",95:"Not supported",96:"Protocol family not supported",97:"Address family not supported by protocol family",98:"Address already in use",99:"Address not available",100:"Network interface is not configured",101:"Network is unreachable",102:"Connection reset by network",103:"Connection aborted",104:"Connection reset by peer",105:"No buffer space available",106:"Socket is already connected",107:"Socket is not connected",108:"Can't send after socket shutdown",109:"Too many references",110:"Connection timed out",111:"Connection refused",112:"Host is down",113:"Host is unreachable",114:"Socket already connected",115:"Connection already in progress",116:"Stale file handle",122:"Quota exceeded",123:"No medium (in tape drive)",125:"Operation canceled",130:"Previous owner died",131:"State not recoverable"};
  var PATH={splitPath:function (filename) {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },normalizeArray:function (parts, allowAboveRoot) {
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        // if the path is allowed to go above the root, restore leading ..s
        if (allowAboveRoot) {
          for (; up--; up) {
            parts.unshift('..');
          }
        }
        return parts;
      },normalize:function (path) {
        var isAbsolute = path.charAt(0) === '/',
            trailingSlash = path.substr(-1) === '/';
        // Normalize the path
        path = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },dirname:function (path) {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          // No dirname whatsoever
          return '.';
        }
        if (dir) {
          // It has a dirname, strip trailing slash
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },basename:function (path) {
        // EMSCRIPTEN return '/'' for '/', not an empty string
        if (path === '/') return '/';
        var lastSlash = path.lastIndexOf('/');
        if (lastSlash === -1) return path;
        return path.substr(lastSlash+1);
      },extname:function (path) {
        return PATH.splitPath(path)[3];
      },join:function () {
        var paths = Array.prototype.slice.call(arguments, 0);
        return PATH.normalize(paths.join('/'));
      },join2:function (l, r) {
        return PATH.normalize(l + '/' + r);
      },resolve:function () {
        var resolvedPath = '',
          resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? arguments[i] : FS.cwd();
          // Skip empty and invalid entries
          if (typeof path !== 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            continue;
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = path.charAt(0) === '/';
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter(function(p) {
          return !!p;
        }), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      },relative:function (from, to) {
        from = PATH.resolve(from).substr(1);
        to = PATH.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '') break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      }};
  var TTY={ttys:[],init:function () {
        // https://github.com/kripken/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process['stdin']['setEncoding']('utf8');
        // }
      },shutdown:function () {
        // https://github.com/kripken/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process['stdin']['pause']();
        // }
      },register:function (dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },stream_ops:{open:function (stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          stream.tty = tty;
          stream.seekable = false;
        },close:function (stream) {
          // flush any pending line data
          if (stream.tty.output.length) {
            stream.tty.ops.put_char(stream.tty, 10);
          }
        },read:function (stream, buffer, offset, length, pos /* ignored */) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset+i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },write:function (stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
          }
          for (var i = 0; i < length; i++) {
            try {
              stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        }},default_tty_ops:{get_char:function (tty) {
          if (!tty.input.length) {
            var result = null;
            if (ENVIRONMENT_IS_NODE) {
              result = process['stdin']['read']();
              if (!result) {
                if (process['stdin']['_readableState'] && process['stdin']['_readableState']['ended']) {
                  return null;  // EOF
                }
                return undefined;  // no data available
              }
            } else if (typeof window != 'undefined' &&
              typeof window.prompt == 'function') {
              // Browser.
              result = window.prompt('Input: ');  // returns null on cancel
              if (result !== null) {
                result += '\n';
              }
            } else if (typeof readline == 'function') {
              // Command line.
              result = readline();
              if (result !== null) {
                result += '\n';
              }
            }
            if (!result) {
              return null;
            }
            tty.input = intArrayFromString(result, true);
          }
          return tty.input.shift();
        },put_char:function (tty, val) {
          if (val === null || val === 10) {
            Module['print'](tty.output.join(''));
            tty.output = [];
          } else {
            tty.output.push(TTY.utf8.processCChar(val));
          }
        }},default_tty1_ops:{put_char:function (tty, val) {
          if (val === null || val === 10) {
            Module['printErr'](tty.output.join(''));
            tty.output = [];
          } else {
            tty.output.push(TTY.utf8.processCChar(val));
          }
        }}};
  var MEMFS={ops_table:null,CONTENT_OWNING:1,CONTENT_FLEXIBLE:2,CONTENT_FIXED:3,mount:function (mount) {
        return MEMFS.createNode(null, '/', 16384 | 0777, 0);
      },createNode:function (parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          // no supported
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (!MEMFS.ops_table) {
          MEMFS.ops_table = {
            dir: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                lookup: MEMFS.node_ops.lookup,
                mknod: MEMFS.node_ops.mknod,
                mknod: MEMFS.node_ops.mknod,
                rename: MEMFS.node_ops.rename,
                unlink: MEMFS.node_ops.unlink,
                rmdir: MEMFS.node_ops.rmdir,
                readdir: MEMFS.node_ops.readdir,
                symlink: MEMFS.node_ops.symlink
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek
              }
            },
            file: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek,
                read: MEMFS.stream_ops.read,
                write: MEMFS.stream_ops.write,
                allocate: MEMFS.stream_ops.allocate,
                mmap: MEMFS.stream_ops.mmap
              }
            },
            link: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                readlink: MEMFS.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: FS.chrdev_stream_ops
            },
          };
        }
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.contents = [];
          node.contentMode = MEMFS.CONTENT_FLEXIBLE;
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        // add the new node to the parent
        if (parent) {
          parent.contents[name] = node;
        }
        return node;
      },ensureFlexible:function (node) {
        if (node.contentMode !== MEMFS.CONTENT_FLEXIBLE) {
          var contents = node.contents;
          node.contents = Array.prototype.slice.call(contents);
          node.contentMode = MEMFS.CONTENT_FLEXIBLE;
        }
      },node_ops:{getattr:function (node) {
          var attr = {};
          // device numbers reuse inode numbers.
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.contents.length;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
          //       but this is not required by the standard.
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },setattr:function (node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== undefined) {
            MEMFS.ensureFlexible(node);
            var contents = node.contents;
            if (attr.size < contents.length) contents.length = attr.size;
            else while (attr.size > contents.length) contents.push(0);
          }
        },lookup:function (parent, name) {
          throw FS.genericErrors[ERRNO_CODES.ENOENT];
        },mknod:function (parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },rename:function (old_node, new_dir, new_name) {
          // if we're overwriting a directory at new_name, make sure it's empty.
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
              }
            }
          }
          // do the internal rewiring
          delete old_node.parent.contents[old_node.name];
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          old_node.parent = new_dir;
        },unlink:function (parent, name) {
          delete parent.contents[name];
        },rmdir:function (parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
          }
          delete parent.contents[name];
        },readdir:function (node) {
          var entries = ['.', '..']
          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue;
            }
            entries.push(key);
          }
          return entries;
        },symlink:function (parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 0777 | 40960, 0);
          node.link = oldpath;
          return node;
        },readlink:function (node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          return node.link;
        }},stream_ops:{read:function (stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (size > 8 && contents.subarray) { // non-trivial, and typed array
            buffer.set(contents.subarray(position, position + size), offset);
          } else
          {
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          }
          return size;
        },write:function (stream, buffer, offset, length, position, canOwn) {
          var node = stream.node;
          node.timestamp = Date.now();
          var contents = node.contents;
          if (length && contents.length === 0 && position === 0 && buffer.subarray) {
            // just replace it with the new data
            if (canOwn && offset === 0) {
              node.contents = buffer; // this could be a subarray of Emscripten HEAP, or allocated from some other source.
              node.contentMode = (buffer.buffer === HEAP8.buffer) ? MEMFS.CONTENT_OWNING : MEMFS.CONTENT_FIXED;
            } else {
              node.contents = new Uint8Array(buffer.subarray(offset, offset+length));
              node.contentMode = MEMFS.CONTENT_FIXED;
            }
            return length;
          }
          MEMFS.ensureFlexible(node);
          var contents = node.contents;
          while (contents.length < position) contents.push(0);
          for (var i = 0; i < length; i++) {
            contents[position + i] = buffer[offset + i];
          }
          return length;
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.contents.length;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          stream.ungotten = [];
          stream.position = position;
          return position;
        },allocate:function (stream, offset, length) {
          MEMFS.ensureFlexible(stream.node);
          var contents = stream.node.contents;
          var limit = offset + length;
          while (limit > contents.length) contents.push(0);
        },mmap:function (stream, buffer, offset, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          // Only make a new copy when MAP_PRIVATE is specified.
          if ( !(flags & 2) &&
                (contents.buffer === buffer || contents.buffer === buffer.buffer) ) {
            // We can't emulate MAP_SHARED when the file is not backed by the buffer
            // we're mapping to (e.g. the HEAP buffer).
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            // Try to avoid unnecessary slices.
            if (position > 0 || position + length < contents.length) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length);
              } else {
                contents = Array.prototype.slice.call(contents, position, position + length);
              }
            }
            allocated = true;
            ptr = _malloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOMEM);
            }
            buffer.set(contents, ptr);
          }
          return { ptr: ptr, allocated: allocated };
        }}};
  var IDBFS={dbs:{},indexedDB:function () {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },DB_VERSION:20,DB_STORE_NAME:"FILE_DATA",mount:function (mount) {
        return MEMFS.mount.apply(null, arguments);
      },syncfs:function (mount, populate, callback) {
        IDBFS.getLocalSet(mount, function(err, local) {
          if (err) return callback(err);
          IDBFS.getRemoteSet(mount, function(err, remote) {
            if (err) return callback(err);
            var src = populate ? remote : local;
            var dst = populate ? local : remote;
            IDBFS.reconcile(src, dst, callback);
          });
        });
      },reconcile:function (src, dst, callback) {
        var total = 0;
        var create = {};
        for (var key in src.files) {
          if (!src.files.hasOwnProperty(key)) continue;
          var e = src.files[key];
          var e2 = dst.files[key];
          if (!e2 || e.timestamp > e2.timestamp) {
            create[key] = e;
            total++;
          }
        }
        var remove = {};
        for (var key in dst.files) {
          if (!dst.files.hasOwnProperty(key)) continue;
          var e = dst.files[key];
          var e2 = src.files[key];
          if (!e2) {
            remove[key] = e;
            total++;
          }
        }
        if (!total) {
          // early out
          return callback(null);
        }
        var completed = 0;
        function done(err) {
          if (err) return callback(err);
          if (++completed >= total) {
            return callback(null);
          }
        };
        // create a single transaction to handle and IDB reads / writes we'll need to do
        var db = src.type === 'remote' ? src.db : dst.db;
        var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readwrite');
        transaction.onerror = function transaction_onerror() { callback(this.error); };
        var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
        for (var path in create) {
          if (!create.hasOwnProperty(path)) continue;
          var entry = create[path];
          if (dst.type === 'local') {
            // save file to local
            try {
              if (FS.isDir(entry.mode)) {
                FS.mkdir(path, entry.mode);
              } else if (FS.isFile(entry.mode)) {
                var stream = FS.open(path, 'w+', 0666);
                FS.write(stream, entry.contents, 0, entry.contents.length, 0, true /* canOwn */);
                FS.close(stream);
              }
              done(null);
            } catch (e) {
              return done(e);
            }
          } else {
            // save file to IDB
            var req = store.put(entry, path);
            req.onsuccess = function req_onsuccess() { done(null); };
            req.onerror = function req_onerror() { done(this.error); };
          }
        }
        for (var path in remove) {
          if (!remove.hasOwnProperty(path)) continue;
          var entry = remove[path];
          if (dst.type === 'local') {
            // delete file from local
            try {
              if (FS.isDir(entry.mode)) {
                // TODO recursive delete?
                FS.rmdir(path);
              } else if (FS.isFile(entry.mode)) {
                FS.unlink(path);
              }
              done(null);
            } catch (e) {
              return done(e);
            }
          } else {
            // delete file from IDB
            var req = store.delete(path);
            req.onsuccess = function req_onsuccess() { done(null); };
            req.onerror = function req_onerror() { done(this.error); };
          }
        }
      },getLocalSet:function (mount, callback) {
        var files = {};
        function isRealDir(p) {
          return p !== '.' && p !== '..';
        };
        function toAbsolute(root) {
          return function(p) {
            return PATH.join2(root, p);
          }
        };
        var check = FS.readdir(mount.mountpoint)
          .filter(isRealDir)
          .map(toAbsolute(mount.mountpoint));
        while (check.length) {
          var path = check.pop();
          var stat, node;
          try {
            var lookup = FS.lookupPath(path);
            node = lookup.node;
            stat = FS.stat(path);
          } catch (e) {
            return callback(e);
          }
          if (FS.isDir(stat.mode)) {
            check.push.apply(check, FS.readdir(path)
              .filter(isRealDir)
              .map(toAbsolute(path)));
            files[path] = { mode: stat.mode, timestamp: stat.mtime };
          } else if (FS.isFile(stat.mode)) {
            files[path] = { contents: node.contents, mode: stat.mode, timestamp: stat.mtime };
          } else {
            return callback(new Error('node type not supported'));
          }
        }
        return callback(null, { type: 'local', files: files });
      },getDB:function (name, callback) {
        // look it up in the cache
        var db = IDBFS.dbs[name];
        if (db) {
          return callback(null, db);
        }
        var req;
        try {
          req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        req.onupgradeneeded = function req_onupgradeneeded() {
          db = req.result;
          db.createObjectStore(IDBFS.DB_STORE_NAME);
        };
        req.onsuccess = function req_onsuccess() {
          db = req.result;
          // add to the cache
          IDBFS.dbs[name] = db;
          callback(null, db);
        };
        req.onerror = function req_onerror() {
          callback(this.error);
        };
      },getRemoteSet:function (mount, callback) {
        var files = {};
        IDBFS.getDB(mount.mountpoint, function(err, db) {
          if (err) return callback(err);
          var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readonly');
          transaction.onerror = function transaction_onerror() { callback(this.error); };
          var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
          store.openCursor().onsuccess = function store_openCursor_onsuccess(event) {
            var cursor = event.target.result;
            if (!cursor) {
              return callback(null, { type: 'remote', db: db, files: files });
            }
            files[cursor.key] = cursor.value;
            cursor.continue();
          };
        });
      }};
  var NODEFS={isWindows:false,staticInit:function () {
        NODEFS.isWindows = !!process.platform.match(/^win/);
      },mount:function (mount) {
        assert(ENVIRONMENT_IS_NODE);
        return NODEFS.createNode(null, '/', NODEFS.getMode(mount.opts.root), 0);
      },createNode:function (parent, name, mode, dev) {
        if (!FS.isDir(mode) && !FS.isFile(mode) && !FS.isLink(mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var node = FS.createNode(parent, name, mode);
        node.node_ops = NODEFS.node_ops;
        node.stream_ops = NODEFS.stream_ops;
        return node;
      },getMode:function (path) {
        var stat;
        try {
          stat = fs.lstatSync(path);
          if (NODEFS.isWindows) {
            // On Windows, directories return permission bits 'rw-rw-rw-', even though they have 'rwxrwxrwx', so 
            // propagate write bits to execute bits.
            stat.mode = stat.mode | ((stat.mode & 146) >> 1);
          }
        } catch (e) {
          if (!e.code) throw e;
          throw new FS.ErrnoError(ERRNO_CODES[e.code]);
        }
        return stat.mode;
      },realPath:function (node) {
        var parts = [];
        while (node.parent !== node) {
          parts.push(node.name);
          node = node.parent;
        }
        parts.push(node.mount.opts.root);
        parts.reverse();
        return PATH.join.apply(null, parts);
      },flagsToPermissionStringMap:{0:"r",1:"r+",2:"r+",64:"r",65:"r+",66:"r+",129:"rx+",193:"rx+",514:"w+",577:"w",578:"w+",705:"wx",706:"wx+",1024:"a",1025:"a",1026:"a+",1089:"a",1090:"a+",1153:"ax",1154:"ax+",1217:"ax",1218:"ax+",4096:"rs",4098:"rs+"},flagsToPermissionString:function (flags) {
        if (flags in NODEFS.flagsToPermissionStringMap) {
          return NODEFS.flagsToPermissionStringMap[flags];
        } else {
          return flags;
        }
      },node_ops:{getattr:function (node) {
          var path = NODEFS.realPath(node);
          var stat;
          try {
            stat = fs.lstatSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          // node.js v0.10.20 doesn't report blksize and blocks on Windows. Fake them with default blksize of 4096.
          // See http://support.microsoft.com/kb/140365
          if (NODEFS.isWindows && !stat.blksize) {
            stat.blksize = 4096;
          }
          if (NODEFS.isWindows && !stat.blocks) {
            stat.blocks = (stat.size+stat.blksize-1)/stat.blksize|0;
          }
          return {
            dev: stat.dev,
            ino: stat.ino,
            mode: stat.mode,
            nlink: stat.nlink,
            uid: stat.uid,
            gid: stat.gid,
            rdev: stat.rdev,
            size: stat.size,
            atime: stat.atime,
            mtime: stat.mtime,
            ctime: stat.ctime,
            blksize: stat.blksize,
            blocks: stat.blocks
          };
        },setattr:function (node, attr) {
          var path = NODEFS.realPath(node);
          try {
            if (attr.mode !== undefined) {
              fs.chmodSync(path, attr.mode);
              // update the common node structure mode as well
              node.mode = attr.mode;
            }
            if (attr.timestamp !== undefined) {
              var date = new Date(attr.timestamp);
              fs.utimesSync(path, date, date);
            }
            if (attr.size !== undefined) {
              fs.truncateSync(path, attr.size);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },lookup:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          var mode = NODEFS.getMode(path);
          return NODEFS.createNode(parent, name, mode);
        },mknod:function (parent, name, mode, dev) {
          var node = NODEFS.createNode(parent, name, mode, dev);
          // create the backing node for this in the fs root as well
          var path = NODEFS.realPath(node);
          try {
            if (FS.isDir(node.mode)) {
              fs.mkdirSync(path, node.mode);
            } else {
              fs.writeFileSync(path, '', { mode: node.mode });
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          return node;
        },rename:function (oldNode, newDir, newName) {
          var oldPath = NODEFS.realPath(oldNode);
          var newPath = PATH.join2(NODEFS.realPath(newDir), newName);
          try {
            fs.renameSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },unlink:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.unlinkSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },rmdir:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.rmdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },readdir:function (node) {
          var path = NODEFS.realPath(node);
          try {
            return fs.readdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },symlink:function (parent, newName, oldPath) {
          var newPath = PATH.join2(NODEFS.realPath(parent), newName);
          try {
            fs.symlinkSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },readlink:function (node) {
          var path = NODEFS.realPath(node);
          try {
            return fs.readlinkSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        }},stream_ops:{open:function (stream) {
          var path = NODEFS.realPath(stream.node);
          try {
            if (FS.isFile(stream.node.mode)) {
              stream.nfd = fs.openSync(path, NODEFS.flagsToPermissionString(stream.flags));
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },close:function (stream) {
          try {
            if (FS.isFile(stream.node.mode) && stream.nfd) {
              fs.closeSync(stream.nfd);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },read:function (stream, buffer, offset, length, position) {
          // FIXME this is terrible.
          var nbuffer = new Buffer(length);
          var res;
          try {
            res = fs.readSync(stream.nfd, nbuffer, 0, length, position);
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          if (res > 0) {
            for (var i = 0; i < res; i++) {
              buffer[offset + i] = nbuffer[i];
            }
          }
          return res;
        },write:function (stream, buffer, offset, length, position) {
          // FIXME this is terrible.
          var nbuffer = new Buffer(buffer.subarray(offset, offset + length));
          var res;
          try {
            res = fs.writeSync(stream.nfd, nbuffer, 0, length, position);
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          return res;
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              try {
                var stat = fs.fstatSync(stream.nfd);
                position += stat.size;
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES[e.code]);
              }
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          stream.position = position;
          return position;
        }}};
  var _stdin=allocate(1, "i32*", ALLOC_STATIC);
  var _stdout=allocate(1, "i32*", ALLOC_STATIC);
  var _stderr=allocate(1, "i32*", ALLOC_STATIC);
  function _fflush(stream) {
      // int fflush(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fflush.html
      // we don't currently perform any user-space buffering of data
    }var FS={root:null,mounts:[],devices:[null],streams:[null],nextInode:1,nameTable:null,currentPath:"/",initialized:false,ignorePermissions:true,ErrnoError:null,genericErrors:{},handleFSError:function (e) {
        if (!(e instanceof FS.ErrnoError)) throw e + ' : ' + stackTrace();
        return ___setErrNo(e.errno);
      },lookupPath:function (path, opts) {
        path = PATH.resolve(FS.cwd(), path);
        opts = opts || { recurse_count: 0 };
        if (opts.recurse_count > 8) {  // max recursive lookup of 8
          throw new FS.ErrnoError(ERRNO_CODES.ELOOP);
        }
        // split the path
        var parts = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), false);
        // start at the root
        var current = FS.root;
        var current_path = '/';
        for (var i = 0; i < parts.length; i++) {
          var islast = (i === parts.length-1);
          if (islast && opts.parent) {
            // stop resolving
            break;
          }
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
          // jump to the mount's root node if this is a mountpoint
          if (FS.isMountpoint(current)) {
            current = current.mount.root;
          }
          // follow symlinks
          // by default, lookupPath will not follow a symlink if it is the final path component.
          // setting opts.follow = true will override this behavior.
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH.resolve(PATH.dirname(current_path), link);
              var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count });
              current = lookup.node;
              if (count++ > 40) {  // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
                throw new FS.ErrnoError(ERRNO_CODES.ELOOP);
              }
            }
          }
        }
        return { path: current_path, node: current };
      },getPath:function (node) {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length-1] !== '/' ? mount + '/' + path : mount + path;
          }
          path = path ? node.name + '/' + path : node.name;
          node = node.parent;
        }
      },hashName:function (parentid, name) {
        var hash = 0;
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },hashAddNode:function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },hashRemoveNode:function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },lookupNode:function (parent, name) {
        var err = FS.mayLookup(parent);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        // if we failed to find it in the cache, call into the VFS
        return FS.lookup(parent, name);
      },createNode:function (parent, name, mode, rdev) {
        if (!FS.FSNode) {
          FS.FSNode = function(parent, name, mode, rdev) {
            this.id = FS.nextInode++;
            this.name = name;
            this.mode = mode;
            this.node_ops = {};
            this.stream_ops = {};
            this.rdev = rdev;
            this.parent = null;
            this.mount = null;
            if (!parent) {
              parent = this;  // root node sets parent to itself
            }
            this.parent = parent;
            this.mount = parent.mount;
            FS.hashAddNode(this);
          };
          // compatibility
          var readMode = 292 | 73;
          var writeMode = 146;
          FS.FSNode.prototype = {};
          // NOTE we must use Object.defineProperties instead of individual calls to
          // Object.defineProperty in order to make closure compiler happy
          Object.defineProperties(FS.FSNode.prototype, {
            read: {
              get: function() { return (this.mode & readMode) === readMode; },
              set: function(val) { val ? this.mode |= readMode : this.mode &= ~readMode; }
            },
            write: {
              get: function() { return (this.mode & writeMode) === writeMode; },
              set: function(val) { val ? this.mode |= writeMode : this.mode &= ~writeMode; }
            },
            isFolder: {
              get: function() { return FS.isDir(this.mode); },
            },
            isDevice: {
              get: function() { return FS.isChrdev(this.mode); },
            },
          });
        }
        return new FS.FSNode(parent, name, mode, rdev);
      },destroyNode:function (node) {
        FS.hashRemoveNode(node);
      },isRoot:function (node) {
        return node === node.parent;
      },isMountpoint:function (node) {
        return node.mounted;
      },isFile:function (mode) {
        return (mode & 61440) === 32768;
      },isDir:function (mode) {
        return (mode & 61440) === 16384;
      },isLink:function (mode) {
        return (mode & 61440) === 40960;
      },isChrdev:function (mode) {
        return (mode & 61440) === 8192;
      },isBlkdev:function (mode) {
        return (mode & 61440) === 24576;
      },isFIFO:function (mode) {
        return (mode & 61440) === 4096;
      },isSocket:function (mode) {
        return (mode & 49152) === 49152;
      },flagModes:{"r":0,"rs":1052672,"r+":2,"w":577,"wx":705,"xw":705,"w+":578,"wx+":706,"xw+":706,"a":1089,"ax":1217,"xa":1217,"a+":1090,"ax+":1218,"xa+":1218},modeStringToFlags:function (str) {
        var flags = FS.flagModes[str];
        if (typeof flags === 'undefined') {
          throw new Error('Unknown file open mode: ' + str);
        }
        return flags;
      },flagsToPermissionString:function (flag) {
        var accmode = flag & 2097155;
        var perms = ['r', 'w', 'rw'][accmode];
        if ((flag & 512)) {
          perms += 'w';
        }
        return perms;
      },nodePermissions:function (node, perms) {
        if (FS.ignorePermissions) {
          return 0;
        }
        // return 0 if any user, group or owner bits are set.
        if (perms.indexOf('r') !== -1 && !(node.mode & 292)) {
          return ERRNO_CODES.EACCES;
        } else if (perms.indexOf('w') !== -1 && !(node.mode & 146)) {
          return ERRNO_CODES.EACCES;
        } else if (perms.indexOf('x') !== -1 && !(node.mode & 73)) {
          return ERRNO_CODES.EACCES;
        }
        return 0;
      },mayLookup:function (dir) {
        return FS.nodePermissions(dir, 'x');
      },mayCreate:function (dir, name) {
        try {
          var node = FS.lookupNode(dir, name);
          return ERRNO_CODES.EEXIST;
        } catch (e) {
        }
        return FS.nodePermissions(dir, 'wx');
      },mayDelete:function (dir, name, isdir) {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var err = FS.nodePermissions(dir, 'wx');
        if (err) {
          return err;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return ERRNO_CODES.ENOTDIR;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return ERRNO_CODES.EBUSY;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return ERRNO_CODES.EISDIR;
          }
        }
        return 0;
      },mayOpen:function (node, flags) {
        if (!node) {
          return ERRNO_CODES.ENOENT;
        }
        if (FS.isLink(node.mode)) {
          return ERRNO_CODES.ELOOP;
        } else if (FS.isDir(node.mode)) {
          if ((flags & 2097155) !== 0 ||  // opening for write
              (flags & 512)) {
            return ERRNO_CODES.EISDIR;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },MAX_OPEN_FDS:4096,nextfd:function (fd_start, fd_end) {
        fd_start = fd_start || 1;
        fd_end = fd_end || FS.MAX_OPEN_FDS;
        for (var fd = fd_start; fd <= fd_end; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(ERRNO_CODES.EMFILE);
      },getStream:function (fd) {
        return FS.streams[fd];
      },createStream:function (stream, fd_start, fd_end) {
        if (!FS.FSStream) {
          FS.FSStream = function(){};
          FS.FSStream.prototype = {};
          // compatibility
          Object.defineProperties(FS.FSStream.prototype, {
            object: {
              get: function() { return this.node; },
              set: function(val) { this.node = val; }
            },
            isRead: {
              get: function() { return (this.flags & 2097155) !== 1; }
            },
            isWrite: {
              get: function() { return (this.flags & 2097155) !== 0; }
            },
            isAppend: {
              get: function() { return (this.flags & 1024); }
            }
          });
        }
        if (stream.__proto__) {
          // reuse the object
          stream.__proto__ = FS.FSStream.prototype;
        } else {
          var newStream = new FS.FSStream();
          for (var p in stream) {
            newStream[p] = stream[p];
          }
          stream = newStream;
        }
        var fd = FS.nextfd(fd_start, fd_end);
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },closeStream:function (fd) {
        FS.streams[fd] = null;
      },chrdev_stream_ops:{open:function (stream) {
          var device = FS.getDevice(stream.node.rdev);
          // override node's stream ops with the device's
          stream.stream_ops = device.stream_ops;
          // forward the open call
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
        },llseek:function () {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }},major:function (dev) {
        return ((dev) >> 8);
      },minor:function (dev) {
        return ((dev) & 0xff);
      },makedev:function (ma, mi) {
        return ((ma) << 8 | (mi));
      },registerDevice:function (dev, ops) {
        FS.devices[dev] = { stream_ops: ops };
      },getDevice:function (dev) {
        return FS.devices[dev];
      },syncfs:function (populate, callback) {
        if (typeof(populate) === 'function') {
          callback = populate;
          populate = false;
        }
        var completed = 0;
        var total = FS.mounts.length;
        function done(err) {
          if (err) {
            return callback(err);
          }
          if (++completed >= total) {
            callback(null);
          }
        };
        // sync all mounts
        for (var i = 0; i < FS.mounts.length; i++) {
          var mount = FS.mounts[i];
          if (!mount.type.syncfs) {
            done(null);
            continue;
          }
          mount.type.syncfs(mount, populate, done);
        }
      },mount:function (type, opts, mountpoint) {
        var lookup;
        if (mountpoint) {
          lookup = FS.lookupPath(mountpoint, { follow: false });
          mountpoint = lookup.path;  // use the absolute path
        }
        var mount = {
          type: type,
          opts: opts,
          mountpoint: mountpoint,
          root: null
        };
        // create a root node for the fs
        var root = type.mount(mount);
        root.mount = mount;
        mount.root = root;
        // assign the mount info to the mountpoint's node
        if (lookup) {
          lookup.node.mount = mount;
          lookup.node.mounted = true;
          // compatibility update FS.root if we mount to /
          if (mountpoint === '/') {
            FS.root = mount.root;
          }
        }
        // add to our cached list of mounts
        FS.mounts.push(mount);
        return root;
      },lookup:function (parent, name) {
        return parent.node_ops.lookup(parent, name);
      },mknod:function (path, mode, dev) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var err = FS.mayCreate(parent, name);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },create:function (path, mode) {
        mode = mode !== undefined ? mode : 0666;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },mkdir:function (path, mode) {
        mode = mode !== undefined ? mode : 0777;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },mkdev:function (path, mode, dev) {
        if (typeof(dev) === 'undefined') {
          dev = mode;
          mode = 0666;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },symlink:function (oldpath, newpath) {
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        var newname = PATH.basename(newpath);
        var err = FS.mayCreate(parent, newname);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },rename:function (old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        // parents must exist
        var lookup, old_dir, new_dir;
        try {
          lookup = FS.lookupPath(old_path, { parent: true });
          old_dir = lookup.node;
          lookup = FS.lookupPath(new_path, { parent: true });
          new_dir = lookup.node;
        } catch (e) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        // need to be part of the same mount
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(ERRNO_CODES.EXDEV);
        }
        // source must exist
        var old_node = FS.lookupNode(old_dir, old_name);
        // old path should not be an ancestor of the new path
        var relative = PATH.relative(old_path, new_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        // new path should not be an ancestor of the old path
        relative = PATH.relative(new_path, old_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
        }
        // see if the new path already exists
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
          // not fatal
        }
        // early out if nothing needs to change
        if (old_node === new_node) {
          return;
        }
        // we'll need to delete the old entry
        var isdir = FS.isDir(old_node.mode);
        var err = FS.mayDelete(old_dir, old_name, isdir);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        // need delete permissions if we'll be overwriting.
        // need create permissions if new doesn't already exist.
        err = new_node ?
          FS.mayDelete(new_dir, new_name, isdir) :
          FS.mayCreate(new_dir, new_name);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        // if we are going to change the parent, check write permissions
        if (new_dir !== old_dir) {
          err = FS.nodePermissions(old_dir, 'w');
          if (err) {
            throw new FS.ErrnoError(err);
          }
        }
        // remove the node from the lookup hash
        FS.hashRemoveNode(old_node);
        // do the underlying fs rename
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
        } catch (e) {
          throw e;
        } finally {
          // add the node back to the hash (in case node_ops.rename
          // changed its name)
          FS.hashAddNode(old_node);
        }
      },rmdir:function (path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, true);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
      },readdir:function (path) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
        }
        return node.node_ops.readdir(node);
      },unlink:function (path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, false);
        if (err) {
          // POSIX says unlink should set EPERM, not EISDIR
          if (err === ERRNO_CODES.EISDIR) err = ERRNO_CODES.EPERM;
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
      },readlink:function (path) {
        var lookup = FS.lookupPath(path, { follow: false });
        var link = lookup.node;
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        return link.node_ops.readlink(link);
      },stat:function (path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return node.node_ops.getattr(node);
      },lstat:function (path) {
        return FS.stat(path, true);
      },chmod:function (path, mode, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        node.node_ops.setattr(node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          timestamp: Date.now()
        });
      },lchmod:function (path, mode) {
        FS.chmod(path, mode, true);
      },fchmod:function (fd, mode) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        FS.chmod(stream.node, mode);
      },chown:function (path, uid, gid, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        node.node_ops.setattr(node, {
          timestamp: Date.now()
          // we ignore the uid / gid for now
        });
      },lchown:function (path, uid, gid) {
        FS.chown(path, uid, gid, true);
      },fchown:function (fd, uid, gid) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        FS.chown(stream.node, uid, gid);
      },truncate:function (path, len) {
        if (len < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var err = FS.nodePermissions(node, 'w');
        if (err) {
          throw new FS.ErrnoError(err);
        }
        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now()
        });
      },ftruncate:function (fd, len) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        FS.truncate(stream.node, len);
      },utime:function (path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },open:function (path, flags, mode, fd_start, fd_end) {
        flags = typeof flags === 'string' ? FS.modeStringToFlags(flags) : flags;
        mode = typeof mode === 'undefined' ? 0666 : mode;
        if ((flags & 64)) {
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path === 'object') {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072)
            });
            node = lookup.node;
          } catch (e) {
            // ignore
          }
        }
        // perhaps we need to create the node
        if ((flags & 64)) {
          if (node) {
            // if O_CREAT and O_EXCL are set, error out if the node already exists
            if ((flags & 128)) {
              throw new FS.ErrnoError(ERRNO_CODES.EEXIST);
            }
          } else {
            // node doesn't exist, try to create it
            node = FS.mknod(path, mode, 0);
          }
        }
        if (!node) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        // can't truncate a device
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        // check permissions
        var err = FS.mayOpen(node, flags);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        // do truncation if necessary
        if ((flags & 512)) {
          FS.truncate(node, 0);
        }
        // we've already handled these, don't pass down to the underlying vfs
        flags &= ~(128 | 512);
        // register the stream with the filesystem
        var stream = FS.createStream({
          node: node,
          path: FS.getPath(node),  // we want the absolute path to the node
          flags: flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        }, fd_start, fd_end);
        // call the new stream's open function
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {};
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
            Module['printErr']('read file: ' + path);
          }
        }
        return stream;
      },close:function (stream) {
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
      },llseek:function (stream, offset, whence) {
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        return stream.stream_ops.llseek(stream, offset, whence);
      },read:function (stream, buffer, offset, length, position) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var seeking = true;
        if (typeof position === 'undefined') {
          position = stream.position;
          seeking = false;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },write:function (stream, buffer, offset, length, position, canOwn) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var seeking = true;
        if (typeof position === 'undefined') {
          position = stream.position;
          seeking = false;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        if (stream.flags & 1024) {
          // seek to the end before writing in append mode
          FS.llseek(stream, 0, 2);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;
        return bytesWritten;
      },allocate:function (stream, offset, length) {
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },mmap:function (stream, buffer, offset, length, position, prot, flags) {
        // TODO if PROT is PROT_WRITE, make sure we have write access
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(ERRNO_CODES.EACCES);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
        }
        return stream.stream_ops.mmap(stream, buffer, offset, length, position, prot, flags);
      },ioctl:function (stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTTY);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },readFile:function (path, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'r';
        opts.encoding = opts.encoding || 'binary';
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === 'utf8') {
          ret = '';
          var utf8 = new Runtime.UTF8Processor();
          for (var i = 0; i < length; i++) {
            ret += utf8.processCChar(buf[i]);
          }
        } else if (opts.encoding === 'binary') {
          ret = buf;
        } else {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        FS.close(stream);
        return ret;
      },writeFile:function (path, data, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'w';
        opts.encoding = opts.encoding || 'utf8';
        var stream = FS.open(path, opts.flags, opts.mode);
        if (opts.encoding === 'utf8') {
          var utf8 = new Runtime.UTF8Processor();
          var buf = new Uint8Array(utf8.processJSString(data));
          FS.write(stream, buf, 0, buf.length, 0);
        } else if (opts.encoding === 'binary') {
          FS.write(stream, data, 0, data.length, 0);
        } else {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        FS.close(stream);
      },cwd:function () {
        return FS.currentPath;
      },chdir:function (path) {
        var lookup = FS.lookupPath(path, { follow: true });
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
        }
        var err = FS.nodePermissions(lookup.node, 'x');
        if (err) {
          throw new FS.ErrnoError(err);
        }
        FS.currentPath = lookup.path;
      },createDefaultDirectories:function () {
        FS.mkdir('/tmp');
      },createDefaultDevices:function () {
        // create /dev
        FS.mkdir('/dev');
        // setup /dev/null
        FS.registerDevice(FS.makedev(1, 3), {
          read: function() { return 0; },
          write: function() { return 0; }
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3));
        // setup /dev/tty and /dev/tty1
        // stderr needs to print output using Module['printErr']
        // so we register a second tty just for it.
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0));
        // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },createStandardStreams:function () {
        // TODO deprecate the old functionality of a single
        // input / output callback and that utilizes FS.createDevice
        // and instead require a unique set of stream ops
        // by default, we symlink the standard streams to the
        // default tty devices. however, if the standard streams
        // have been overwritten we create a unique device for
        // them instead.
        if (Module['stdin']) {
          FS.createDevice('/dev', 'stdin', Module['stdin']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }
        if (Module['stdout']) {
          FS.createDevice('/dev', 'stdout', null, Module['stdout']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }
        if (Module['stderr']) {
          FS.createDevice('/dev', 'stderr', null, Module['stderr']);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        }
        // open default streams for the stdin, stdout and stderr devices
        var stdin = FS.open('/dev/stdin', 'r');
        HEAP32[((_stdin)>>2)]=stdin.fd;
        assert(stdin.fd === 1, 'invalid handle for stdin (' + stdin.fd + ')');
        var stdout = FS.open('/dev/stdout', 'w');
        HEAP32[((_stdout)>>2)]=stdout.fd;
        assert(stdout.fd === 2, 'invalid handle for stdout (' + stdout.fd + ')');
        var stderr = FS.open('/dev/stderr', 'w');
        HEAP32[((_stderr)>>2)]=stderr.fd;
        assert(stderr.fd === 3, 'invalid handle for stderr (' + stderr.fd + ')');
      },ensureErrnoError:function () {
        if (FS.ErrnoError) return;
        FS.ErrnoError = function ErrnoError(errno) {
          this.errno = errno;
          for (var key in ERRNO_CODES) {
            if (ERRNO_CODES[key] === errno) {
              this.code = key;
              break;
            }
          }
          this.message = ERRNO_MESSAGES[errno];
          this.stack = stackTrace();
        };
        FS.ErrnoError.prototype = new Error();
        FS.ErrnoError.prototype.constructor = FS.ErrnoError;
        // Some errors may happen quite a bit, to avoid overhead we reuse them (and suffer a lack of stack info)
        [ERRNO_CODES.ENOENT].forEach(function(code) {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = '<generic error, no stack>';
        });
      },staticInit:function () {
        FS.ensureErrnoError();
        FS.nameTable = new Array(4096);
        FS.root = FS.createNode(null, '/', 16384 | 0777, 0);
        FS.mount(MEMFS, {}, '/');
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
      },init:function (input, output, error) {
        assert(!FS.init.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
        FS.init.initialized = true;
        FS.ensureErrnoError();
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        Module['stdin'] = input || Module['stdin'];
        Module['stdout'] = output || Module['stdout'];
        Module['stderr'] = error || Module['stderr'];
        FS.createStandardStreams();
      },quit:function () {
        FS.init.initialized = false;
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },getMode:function (canRead, canWrite) {
        var mode = 0;
        if (canRead) mode |= 292 | 73;
        if (canWrite) mode |= 146;
        return mode;
      },joinPath:function (parts, forceRelative) {
        var path = PATH.join.apply(null, parts);
        if (forceRelative && path[0] == '/') path = path.substr(1);
        return path;
      },absolutePath:function (relative, base) {
        return PATH.resolve(base, relative);
      },standardizePath:function (path) {
        return PATH.normalize(path);
      },findObject:function (path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (ret.exists) {
          return ret.object;
        } else {
          ___setErrNo(ret.error);
          return null;
        }
      },analyzePath:function (path, dontResolveLastLink) {
        // operate from within the context of the symlink's target
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false, exists: false, error: 0, name: null, path: null, object: null,
          parentExists: false, parentPath: null, parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        };
        return ret;
      },createFolder:function (parent, name, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.mkdir(path, mode);
      },createPath:function (parent, path, canRead, canWrite) {
        parent = typeof parent === 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
            // ignore EEXIST
          }
          parent = current;
        }
        return current;
      },createFile:function (parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.create(path, mode);
      },createDataFile:function (parent, name, data, canRead, canWrite, canOwn) {
        var path = name ? PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name) : parent;
        var mode = FS.getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data === 'string') {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
            data = arr;
          }
          // make sure we can write to the file
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 'w');
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
        return node;
      },createDevice:function (parent, name, input, output) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        // Create a fake device that a set of stream ops to emulate
        // the old behavior.
        FS.registerDevice(dev, {
          open: function(stream) {
            stream.seekable = false;
          },
          close: function(stream) {
            // flush any pending line data
            if (output && output.buffer && output.buffer.length) {
              output(10);
            }
          },
          read: function(stream, buffer, offset, length, pos /* ignored */) {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES.EIO);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset+i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write: function(stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset+i]);
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES.EIO);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },createLink:function (parent, name, target, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        return FS.symlink(target, path);
      },forceLoadFile:function (obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        var success = true;
        if (typeof XMLHttpRequest !== 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else if (Module['read']) {
          // Command-line.
          try {
            // WARNING: Can't read binary files in V8's d8 or tracemonkey's js, as
            //          read() will try to parse UTF8.
            obj.contents = intArrayFromString(Module['read'](obj.url), true);
          } catch (e) {
            success = false;
          }
        } else {
          throw new Error('Cannot load without read() or XMLHttpRequest.');
        }
        if (!success) ___setErrNo(ERRNO_CODES.EIO);
        return success;
      },createLazyFile:function (parent, name, url, canRead, canWrite) {
        if (typeof XMLHttpRequest !== 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          // Lazy chunked Uint8Array (implements get and length from Uint8Array). Actual getting is abstracted away for eventual reuse.
          function LazyUint8Array() {
            this.lengthKnown = false;
            this.chunks = []; // Loaded chunks. Index is the chunk number
          }
          LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
            if (idx > this.length-1 || idx < 0) {
              return undefined;
            }
            var chunkOffset = idx % this.chunkSize;
            var chunkNum = Math.floor(idx / this.chunkSize);
            return this.getter(chunkNum)[chunkOffset];
          }
          LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
            this.getter = getter;
          }
          LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
              // Find length
              var xhr = new XMLHttpRequest();
              xhr.open('HEAD', url, false);
              xhr.send(null);
              if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
              var datalength = Number(xhr.getResponseHeader("Content-length"));
              var header;
              var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
              var chunkSize = 1024*1024; // Chunk size in bytes
              if (!hasByteServing) chunkSize = datalength;
              // Function to get a range from the remote URL.
              var doXHR = (function(from, to) {
                if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
                if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
                // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, false);
                if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
                // Some hints to the browser that we want binary data.
                if (typeof Uint8Array != 'undefined') xhr.responseType = 'arraybuffer';
                if (xhr.overrideMimeType) {
                  xhr.overrideMimeType('text/plain; charset=x-user-defined');
                }
                xhr.send(null);
                if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
                if (xhr.response !== undefined) {
                  return new Uint8Array(xhr.response || []);
                } else {
                  return intArrayFromString(xhr.responseText || '', true);
                }
              });
              var lazyArray = this;
              lazyArray.setDataGetter(function(chunkNum) {
                var start = chunkNum * chunkSize;
                var end = (chunkNum+1) * chunkSize - 1; // including this byte
                end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
                if (typeof(lazyArray.chunks[chunkNum]) === "undefined") {
                  lazyArray.chunks[chunkNum] = doXHR(start, end);
                }
                if (typeof(lazyArray.chunks[chunkNum]) === "undefined") throw new Error("doXHR failed!");
                return lazyArray.chunks[chunkNum];
              });
              this._length = datalength;
              this._chunkSize = chunkSize;
              this.lengthKnown = true;
          }
          var lazyArray = new LazyUint8Array();
          Object.defineProperty(lazyArray, "length", {
              get: function() {
                  if(!this.lengthKnown) {
                      this.cacheLength();
                  }
                  return this._length;
              }
          });
          Object.defineProperty(lazyArray, "chunkSize", {
              get: function() {
                  if(!this.lengthKnown) {
                      this.cacheLength();
                  }
                  return this._chunkSize;
              }
          });
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        // This is a total hack, but I want to get this lazy file code out of the
        // core of MEMFS. If we want to keep this lazy file concept I feel it should
        // be its own thin LAZYFS proxying calls to MEMFS.
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        // override each stream op with one that tries to force load the lazy file first
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach(function(key) {
          var fn = node.stream_ops[key];
          stream_ops[key] = function forceLoadLazyFile() {
            if (!FS.forceLoadFile(node)) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
            return fn.apply(null, arguments);
          };
        });
        // use a custom read function
        stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
          if (!FS.forceLoadFile(node)) {
            throw new FS.ErrnoError(ERRNO_CODES.EIO);
          }
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (contents.slice) { // normal array
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        };
        node.stream_ops = stream_ops;
        return node;
      },createPreloadedFile:function (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn) {
        Browser.init();
        // TODO we should allow people to just pass in a complete filename instead
        // of parent and name being that we just join them anyways
        var fullname = name ? PATH.resolve(PATH.join2(parent, name)) : parent;
        function processData(byteArray) {
          function finish(byteArray) {
            if (!dontCreateFile) {
              FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
            }
            if (onload) onload();
            removeRunDependency('cp ' + fullname);
          }
          var handled = false;
          Module['preloadPlugins'].forEach(function(plugin) {
            if (handled) return;
            if (plugin['canHandle'](fullname)) {
              plugin['handle'](byteArray, fullname, finish, function() {
                if (onerror) onerror();
                removeRunDependency('cp ' + fullname);
              });
              handled = true;
            }
          });
          if (!handled) finish(byteArray);
        }
        addRunDependency('cp ' + fullname);
        if (typeof url == 'string') {
          Browser.asyncLoad(url, function(byteArray) {
            processData(byteArray);
          }, onerror);
        } else {
          processData(url);
        }
      },indexedDB:function () {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },DB_NAME:function () {
        return 'EM_FS_' + window.location.pathname;
      },DB_VERSION:20,DB_STORE_NAME:"FILE_DATA",saveFilesToDB:function (paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
          console.log('creating db');
          var db = openRequest.result;
          db.createObjectStore(FS.DB_STORE_NAME);
        };
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          var transaction = db.transaction([FS.DB_STORE_NAME], 'readwrite');
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var putRequest = files.put(FS.analyzePath(path).object.contents, path);
            putRequest.onsuccess = function putRequest_onsuccess() { ok++; if (ok + fail == total) finish() };
            putRequest.onerror = function putRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      },loadFilesFromDB:function (paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = onerror; // no database to load from
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          try {
            var transaction = db.transaction([FS.DB_STORE_NAME], 'readonly');
          } catch(e) {
            onerror(e);
            return;
          }
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var getRequest = files.get(path);
            getRequest.onsuccess = function getRequest_onsuccess() {
              if (FS.analyzePath(path).exists) {
                FS.unlink(path);
              }
              FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
              ok++;
              if (ok + fail == total) finish();
            };
            getRequest.onerror = function getRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      }};function _getcwd(buf, size) {
      // char *getcwd(char *buf, size_t size);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/getcwd.html
      if (size == 0) {
        ___setErrNo(ERRNO_CODES.EINVAL);
        return 0;
      }
      var cwd = FS.cwd();
      if (size < cwd.length + 1) {
        ___setErrNo(ERRNO_CODES.ERANGE);
        return 0;
      } else {
        writeAsciiToMemory(cwd, buf);
        return buf;
      }
    }
  function _stat(path, buf, dontResolveLastLink) {
      // http://pubs.opengroup.org/onlinepubs/7908799/xsh/stat.html
      // int stat(const char *path, struct stat *buf);
      // NOTE: dontResolveLastLink is a shortcut for lstat(). It should never be
      //       used in client code.
      path = typeof path !== 'string' ? Pointer_stringify(path) : path;
      try {
        var stat = dontResolveLastLink ? FS.lstat(path) : FS.stat(path);
        HEAP32[((buf)>>2)]=stat.dev;
        HEAP32[(((buf)+(4))>>2)]=0;
        HEAP32[(((buf)+(8))>>2)]=stat.ino;
        HEAP32[(((buf)+(12))>>2)]=stat.mode
        HEAP32[(((buf)+(16))>>2)]=stat.nlink
        HEAP32[(((buf)+(20))>>2)]=stat.uid
        HEAP32[(((buf)+(24))>>2)]=stat.gid
        HEAP32[(((buf)+(28))>>2)]=stat.rdev
        HEAP32[(((buf)+(32))>>2)]=0;
        HEAP32[(((buf)+(36))>>2)]=stat.size
        HEAP32[(((buf)+(40))>>2)]=4096
        HEAP32[(((buf)+(44))>>2)]=stat.blocks
        HEAP32[(((buf)+(48))>>2)]=Math.floor(stat.atime.getTime() / 1000)
        HEAP32[(((buf)+(52))>>2)]=0
        HEAP32[(((buf)+(56))>>2)]=Math.floor(stat.mtime.getTime() / 1000)
        HEAP32[(((buf)+(60))>>2)]=0
        HEAP32[(((buf)+(64))>>2)]=Math.floor(stat.ctime.getTime() / 1000)
        HEAP32[(((buf)+(68))>>2)]=0
        HEAP32[(((buf)+(72))>>2)]=stat.ino
        return 0;
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }
  Module["_tolower"] = _tolower;
  function _close(fildes) {
      // int close(int fildes);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/close.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        FS.close(stream);
        return 0;
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }
  function _fsync(fildes) {
      // int fsync(int fildes);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fsync.html
      var stream = FS.getStream(fildes);
      if (stream) {
        // We write directly to the file system, so there's nothing to do here.
        return 0;
      } else {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
    }function _fclose(stream) {
      // int fclose(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fclose.html
      _fsync(stream);
      return _close(stream);
    }
  var _mkport=undefined;var SOCKFS={mount:function (mount) {
        return FS.createNode(null, '/', 16384 | 0777, 0);
      },createSocket:function (family, type, protocol) {
        var streaming = type == 1;
        if (protocol) {
          assert(streaming == (protocol == 6)); // if SOCK_STREAM, must be tcp
        }
        // create our internal socket structure
        var sock = {
          family: family,
          type: type,
          protocol: protocol,
          server: null,
          peers: {},
          pending: [],
          recv_queue: [],
          sock_ops: SOCKFS.websocket_sock_ops
        };
        // create the filesystem node to store the socket structure
        var name = SOCKFS.nextname();
        var node = FS.createNode(SOCKFS.root, name, 49152, 0);
        node.sock = sock;
        // and the wrapping stream that enables library functions such
        // as read and write to indirectly interact with the socket
        var stream = FS.createStream({
          path: name,
          node: node,
          flags: FS.modeStringToFlags('r+'),
          seekable: false,
          stream_ops: SOCKFS.stream_ops
        });
        // map the new stream to the socket structure (sockets have a 1:1
        // relationship with a stream)
        sock.stream = stream;
        return sock;
      },getSocket:function (fd) {
        var stream = FS.getStream(fd);
        if (!stream || !FS.isSocket(stream.node.mode)) {
          return null;
        }
        return stream.node.sock;
      },stream_ops:{poll:function (stream) {
          var sock = stream.node.sock;
          return sock.sock_ops.poll(sock);
        },ioctl:function (stream, request, varargs) {
          var sock = stream.node.sock;
          return sock.sock_ops.ioctl(sock, request, varargs);
        },read:function (stream, buffer, offset, length, position /* ignored */) {
          var sock = stream.node.sock;
          var msg = sock.sock_ops.recvmsg(sock, length);
          if (!msg) {
            // socket is closed
            return 0;
          }
          buffer.set(msg.buffer, offset);
          return msg.buffer.length;
        },write:function (stream, buffer, offset, length, position /* ignored */) {
          var sock = stream.node.sock;
          return sock.sock_ops.sendmsg(sock, buffer, offset, length);
        },close:function (stream) {
          var sock = stream.node.sock;
          sock.sock_ops.close(sock);
        }},nextname:function () {
        if (!SOCKFS.nextname.current) {
          SOCKFS.nextname.current = 0;
        }
        return 'socket[' + (SOCKFS.nextname.current++) + ']';
      },websocket_sock_ops:{createPeer:function (sock, addr, port) {
          var ws;
          if (typeof addr === 'object') {
            ws = addr;
            addr = null;
            port = null;
          }
          if (ws) {
            // for sockets that've already connected (e.g. we're the server)
            // we can inspect the _socket property for the address
            if (ws._socket) {
              addr = ws._socket.remoteAddress;
              port = ws._socket.remotePort;
            }
            // if we're just now initializing a connection to the remote,
            // inspect the url property
            else {
              var result = /ws[s]?:\/\/([^:]+):(\d+)/.exec(ws.url);
              if (!result) {
                throw new Error('WebSocket URL must be in the format ws(s)://address:port');
              }
              addr = result[1];
              port = parseInt(result[2], 10);
            }
          } else {
            // create the actual websocket object and connect
            try {
              var url = 'ws://' + addr + ':' + port;
              // the node ws library API is slightly different than the browser's
              var opts = ENVIRONMENT_IS_NODE ? {headers: {'websocket-protocol': ['binary']}} : ['binary'];
              // If node we use the ws library.
              var WebSocket = ENVIRONMENT_IS_NODE ? require('ws') : window['WebSocket'];
              ws = new WebSocket(url, opts);
              ws.binaryType = 'arraybuffer';
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EHOSTUNREACH);
            }
          }
          var peer = {
            addr: addr,
            port: port,
            socket: ws,
            dgram_send_queue: []
          };
          SOCKFS.websocket_sock_ops.addPeer(sock, peer);
          SOCKFS.websocket_sock_ops.handlePeerEvents(sock, peer);
          // if this is a bound dgram socket, send the port number first to allow
          // us to override the ephemeral port reported to us by remotePort on the
          // remote end.
          if (sock.type === 2 && typeof sock.sport !== 'undefined') {
            peer.dgram_send_queue.push(new Uint8Array([
                255, 255, 255, 255,
                'p'.charCodeAt(0), 'o'.charCodeAt(0), 'r'.charCodeAt(0), 't'.charCodeAt(0),
                ((sock.sport & 0xff00) >> 8) , (sock.sport & 0xff)
            ]));
          }
          return peer;
        },getPeer:function (sock, addr, port) {
          return sock.peers[addr + ':' + port];
        },addPeer:function (sock, peer) {
          sock.peers[peer.addr + ':' + peer.port] = peer;
        },removePeer:function (sock, peer) {
          delete sock.peers[peer.addr + ':' + peer.port];
        },handlePeerEvents:function (sock, peer) {
          var first = true;
          var handleOpen = function () {
            try {
              var queued = peer.dgram_send_queue.shift();
              while (queued) {
                peer.socket.send(queued);
                queued = peer.dgram_send_queue.shift();
              }
            } catch (e) {
              // not much we can do here in the way of proper error handling as we've already
              // lied and said this data was sent. shut it down.
              peer.socket.close();
            }
          };
          function handleMessage(data) {
            assert(typeof data !== 'string' && data.byteLength !== undefined);  // must receive an ArrayBuffer
            data = new Uint8Array(data);  // make a typed array view on the array buffer
            // if this is the port message, override the peer's port with it
            var wasfirst = first;
            first = false;
            if (wasfirst &&
                data.length === 10 &&
                data[0] === 255 && data[1] === 255 && data[2] === 255 && data[3] === 255 &&
                data[4] === 'p'.charCodeAt(0) && data[5] === 'o'.charCodeAt(0) && data[6] === 'r'.charCodeAt(0) && data[7] === 't'.charCodeAt(0)) {
              // update the peer's port and it's key in the peer map
              var newport = ((data[8] << 8) | data[9]);
              SOCKFS.websocket_sock_ops.removePeer(sock, peer);
              peer.port = newport;
              SOCKFS.websocket_sock_ops.addPeer(sock, peer);
              return;
            }
            sock.recv_queue.push({ addr: peer.addr, port: peer.port, data: data });
          };
          if (ENVIRONMENT_IS_NODE) {
            peer.socket.on('open', handleOpen);
            peer.socket.on('message', function(data, flags) {
              if (!flags.binary) {
                return;
              }
              handleMessage((new Uint8Array(data)).buffer);  // copy from node Buffer -> ArrayBuffer
            });
            peer.socket.on('error', function() {
              // don't throw
            });
          } else {
            peer.socket.onopen = handleOpen;
            peer.socket.onmessage = function peer_socket_onmessage(event) {
              handleMessage(event.data);
            };
          }
        },poll:function (sock) {
          if (sock.type === 1 && sock.server) {
            // listen sockets should only say they're available for reading
            // if there are pending clients.
            return sock.pending.length ? (64 | 1) : 0;
          }
          var mask = 0;
          var dest = sock.type === 1 ?  // we only care about the socket state for connection-based sockets
            SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport) :
            null;
          if (sock.recv_queue.length ||
              !dest ||  // connection-less sockets are always ready to read
              (dest && dest.socket.readyState === dest.socket.CLOSING) ||
              (dest && dest.socket.readyState === dest.socket.CLOSED)) {  // let recv return 0 once closed
            mask |= (64 | 1);
          }
          if (!dest ||  // connection-less sockets are always ready to write
              (dest && dest.socket.readyState === dest.socket.OPEN)) {
            mask |= 4;
          }
          if ((dest && dest.socket.readyState === dest.socket.CLOSING) ||
              (dest && dest.socket.readyState === dest.socket.CLOSED)) {
            mask |= 16;
          }
          return mask;
        },ioctl:function (sock, request, arg) {
          switch (request) {
            case 21531:
              var bytes = 0;
              if (sock.recv_queue.length) {
                bytes = sock.recv_queue[0].data.length;
              }
              HEAP32[((arg)>>2)]=bytes;
              return 0;
            default:
              return ERRNO_CODES.EINVAL;
          }
        },close:function (sock) {
          // if we've spawned a listen server, close it
          if (sock.server) {
            try {
              sock.server.close();
            } catch (e) {
            }
            sock.server = null;
          }
          // close any peer connections
          var peers = Object.keys(sock.peers);
          for (var i = 0; i < peers.length; i++) {
            var peer = sock.peers[peers[i]];
            try {
              peer.socket.close();
            } catch (e) {
            }
            SOCKFS.websocket_sock_ops.removePeer(sock, peer);
          }
          return 0;
        },bind:function (sock, addr, port) {
          if (typeof sock.saddr !== 'undefined' || typeof sock.sport !== 'undefined') {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);  // already bound
          }
          sock.saddr = addr;
          sock.sport = port || _mkport();
          // in order to emulate dgram sockets, we need to launch a listen server when
          // binding on a connection-less socket
          // note: this is only required on the server side
          if (sock.type === 2) {
            // close the existing server if it exists
            if (sock.server) {
              sock.server.close();
              sock.server = null;
            }
            // swallow error operation not supported error that occurs when binding in the
            // browser where this isn't supported
            try {
              sock.sock_ops.listen(sock, 0);
            } catch (e) {
              if (!(e instanceof FS.ErrnoError)) throw e;
              if (e.errno !== ERRNO_CODES.EOPNOTSUPP) throw e;
            }
          }
        },connect:function (sock, addr, port) {
          if (sock.server) {
            throw new FS.ErrnoError(ERRNO_CODS.EOPNOTSUPP);
          }
          // TODO autobind
          // if (!sock.addr && sock.type == 2) {
          // }
          // early out if we're already connected / in the middle of connecting
          if (typeof sock.daddr !== 'undefined' && typeof sock.dport !== 'undefined') {
            var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
            if (dest) {
              if (dest.socket.readyState === dest.socket.CONNECTING) {
                throw new FS.ErrnoError(ERRNO_CODES.EALREADY);
              } else {
                throw new FS.ErrnoError(ERRNO_CODES.EISCONN);
              }
            }
          }
          // add the socket to our peer list and set our
          // destination address / port to match
          var peer = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
          sock.daddr = peer.addr;
          sock.dport = peer.port;
          // always "fail" in non-blocking mode
          throw new FS.ErrnoError(ERRNO_CODES.EINPROGRESS);
        },listen:function (sock, backlog) {
          if (!ENVIRONMENT_IS_NODE) {
            throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
          }
          if (sock.server) {
             throw new FS.ErrnoError(ERRNO_CODES.EINVAL);  // already listening
          }
          var WebSocketServer = require('ws').Server;
          var host = sock.saddr;
          sock.server = new WebSocketServer({
            host: host,
            port: sock.sport
            // TODO support backlog
          });
          sock.server.on('connection', function(ws) {
            if (sock.type === 1) {
              var newsock = SOCKFS.createSocket(sock.family, sock.type, sock.protocol);
              // create a peer on the new socket
              var peer = SOCKFS.websocket_sock_ops.createPeer(newsock, ws);
              newsock.daddr = peer.addr;
              newsock.dport = peer.port;
              // push to queue for accept to pick up
              sock.pending.push(newsock);
            } else {
              // create a peer on the listen socket so calling sendto
              // with the listen socket and an address will resolve
              // to the correct client
              SOCKFS.websocket_sock_ops.createPeer(sock, ws);
            }
          });
          sock.server.on('closed', function() {
            sock.server = null;
          });
          sock.server.on('error', function() {
            // don't throw
          });
        },accept:function (listensock) {
          if (!listensock.server) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          var newsock = listensock.pending.shift();
          newsock.stream.flags = listensock.stream.flags;
          return newsock;
        },getname:function (sock, peer) {
          var addr, port;
          if (peer) {
            if (sock.daddr === undefined || sock.dport === undefined) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
            }
            addr = sock.daddr;
            port = sock.dport;
          } else {
            // TODO saddr and sport will be set for bind()'d UDP sockets, but what
            // should we be returning for TCP sockets that've been connect()'d?
            addr = sock.saddr || 0;
            port = sock.sport || 0;
          }
          return { addr: addr, port: port };
        },sendmsg:function (sock, buffer, offset, length, addr, port) {
          if (sock.type === 2) {
            // connection-less sockets will honor the message address,
            // and otherwise fall back to the bound destination address
            if (addr === undefined || port === undefined) {
              addr = sock.daddr;
              port = sock.dport;
            }
            // if there was no address to fall back to, error out
            if (addr === undefined || port === undefined) {
              throw new FS.ErrnoError(ERRNO_CODES.EDESTADDRREQ);
            }
          } else {
            // connection-based sockets will only use the bound
            addr = sock.daddr;
            port = sock.dport;
          }
          // find the peer for the destination address
          var dest = SOCKFS.websocket_sock_ops.getPeer(sock, addr, port);
          // early out if not connected with a connection-based socket
          if (sock.type === 1) {
            if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
            } else if (dest.socket.readyState === dest.socket.CONNECTING) {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
          }
          // create a copy of the incoming data to send, as the WebSocket API
          // doesn't work entirely with an ArrayBufferView, it'll just send
          // the entire underlying buffer
          var data;
          if (buffer instanceof Array || buffer instanceof ArrayBuffer) {
            data = buffer.slice(offset, offset + length);
          } else {  // ArrayBufferView
            data = buffer.buffer.slice(buffer.byteOffset + offset, buffer.byteOffset + offset + length);
          }
          // if we're emulating a connection-less dgram socket and don't have
          // a cached connection, queue the buffer to send upon connect and
          // lie, saying the data was sent now.
          if (sock.type === 2) {
            if (!dest || dest.socket.readyState !== dest.socket.OPEN) {
              // if we're not connected, open a new connection
              if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
                dest = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
              }
              dest.dgram_send_queue.push(data);
              return length;
            }
          }
          try {
            // send the actual data
            dest.socket.send(data);
            return length;
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
        },recvmsg:function (sock, length) {
          // http://pubs.opengroup.org/onlinepubs/7908799/xns/recvmsg.html
          if (sock.type === 1 && sock.server) {
            // tcp servers should not be recv()'ing on the listen socket
            throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
          }
          var queued = sock.recv_queue.shift();
          if (!queued) {
            if (sock.type === 1) {
              var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
              if (!dest) {
                // if we have a destination address but are not connected, error out
                throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
              }
              else if (dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
                // return null if the socket has closed
                return null;
              }
              else {
                // else, our socket is in a valid state but truly has nothing available
                throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
              }
            } else {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
          }
          // queued.data will be an ArrayBuffer if it's unadulterated, but if it's
          // requeued TCP data it'll be an ArrayBufferView
          var queuedLength = queued.data.byteLength || queued.data.length;
          var queuedOffset = queued.data.byteOffset || 0;
          var queuedBuffer = queued.data.buffer || queued.data;
          var bytesRead = Math.min(length, queuedLength);
          var res = {
            buffer: new Uint8Array(queuedBuffer, queuedOffset, bytesRead),
            addr: queued.addr,
            port: queued.port
          };
          // push back any unread data for TCP connections
          if (sock.type === 1 && bytesRead < queuedLength) {
            var bytesRemaining = queuedLength - bytesRead;
            queued.data = new Uint8Array(queuedBuffer, queuedOffset + bytesRead, bytesRemaining);
            sock.recv_queue.unshift(queued);
          }
          return res;
        }}};function _send(fd, buf, len, flags) {
      var sock = SOCKFS.getSocket(fd);
      if (!sock) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      // TODO honor flags
      return _write(fd, buf, len);
    }
  function _pwrite(fildes, buf, nbyte, offset) {
      // ssize_t pwrite(int fildes, const void *buf, size_t nbyte, off_t offset);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/write.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        var slab = HEAP8;
        return FS.write(stream, slab, buf, nbyte, offset);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _write(fildes, buf, nbyte) {
      // ssize_t write(int fildes, const void *buf, size_t nbyte);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/write.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        var slab = HEAP8;
        return FS.write(stream, slab, buf, nbyte);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _fwrite(ptr, size, nitems, stream) {
      // size_t fwrite(const void *restrict ptr, size_t size, size_t nitems, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fwrite.html
      var bytesToWrite = nitems * size;
      if (bytesToWrite == 0) return 0;
      var bytesWritten = _write(stream, ptr, bytesToWrite);
      if (bytesWritten == -1) {
        var streamObj = FS.getStream(stream);
        if (streamObj) streamObj.error = true;
        return 0;
      } else {
        return Math.floor(bytesWritten / size);
      }
    }
  function _recv(fd, buf, len, flags) {
      var sock = SOCKFS.getSocket(fd);
      if (!sock) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      // TODO honor flags
      return _read(fd, buf, len);
    }
  function _pread(fildes, buf, nbyte, offset) {
      // ssize_t pread(int fildes, void *buf, size_t nbyte, off_t offset);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/read.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        var slab = HEAP8;
        return FS.read(stream, slab, buf, nbyte, offset);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _read(fildes, buf, nbyte) {
      // ssize_t read(int fildes, void *buf, size_t nbyte);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/read.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        var slab = HEAP8;
        return FS.read(stream, slab, buf, nbyte);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _fread(ptr, size, nitems, stream) {
      // size_t fread(void *restrict ptr, size_t size, size_t nitems, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fread.html
      var bytesToRead = nitems * size;
      if (bytesToRead == 0) {
        return 0;
      }
      var bytesRead = 0;
      var streamObj = FS.getStream(stream);
      if (!streamObj) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return 0;
      }
      while (streamObj.ungotten.length && bytesToRead > 0) {
        HEAP8[((ptr++)|0)]=streamObj.ungotten.pop()
        bytesToRead--;
        bytesRead++;
      }
      var err = _read(stream, ptr, bytesToRead);
      if (err == -1) {
        if (streamObj) streamObj.error = true;
        return 0;
      }
      bytesRead += err;
      if (bytesRead < bytesToRead) streamObj.eof = true;
      return Math.floor(bytesRead / size);
    }
  function _lseek(fildes, offset, whence) {
      // off_t lseek(int fildes, off_t offset, int whence);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/lseek.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        return FS.llseek(stream, offset, whence);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _fseek(stream, offset, whence) {
      // int fseek(FILE *stream, long offset, int whence);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fseek.html
      var ret = _lseek(stream, offset, whence);
      if (ret == -1) {
        return -1;
      }
      stream = FS.getStream(stream);
      stream.eof = false;
      return 0;
    }var _fseeko=_fseek;
  function _ftell(stream) {
      // long ftell(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/ftell.html
      stream = FS.getStream(stream);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      if (FS.isChrdev(stream.node.mode)) {
        ___setErrNo(ERRNO_CODES.ESPIPE);
        return -1;
      } else {
        return stream.position;
      }
    }var _ftello=_ftell;
  function _open(path, oflag, varargs) {
      // int open(const char *path, int oflag, ...);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/open.html
      var mode = HEAP32[((varargs)>>2)];
      path = Pointer_stringify(path);
      try {
        var stream = FS.open(path, oflag, mode);
        return stream.fd;
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _fopen(filename, mode) {
      // FILE *fopen(const char *restrict filename, const char *restrict mode);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fopen.html
      var flags;
      mode = Pointer_stringify(mode);
      if (mode[0] == 'r') {
        if (mode.indexOf('+') != -1) {
          flags = 2;
        } else {
          flags = 0;
        }
      } else if (mode[0] == 'w') {
        if (mode.indexOf('+') != -1) {
          flags = 2;
        } else {
          flags = 1;
        }
        flags |= 64;
        flags |= 512;
      } else if (mode[0] == 'a') {
        if (mode.indexOf('+') != -1) {
          flags = 2;
        } else {
          flags = 1;
        }
        flags |= 64;
        flags |= 1024;
      } else {
        ___setErrNo(ERRNO_CODES.EINVAL);
        return 0;
      }
      var ret = _open(filename, flags, allocate([0x1FF, 0, 0, 0], 'i32', ALLOC_STACK));  // All creation permissions.
      return (ret == -1) ? 0 : ret;
    }
  var _floor=Math_floor;
  function _toupper(chr) {
      if (chr >= 97 && chr <= 122) {
        return chr - 97 + 65;
      } else {
        return chr;
      }
    }
  function ___cxa_get_exception_ptr(ptr) {
      return ptr;
    }
  var _ceil=Math_ceil;
  function _trunc(x) {
      return (x < 0) ? Math.ceil(x) : Math.floor(x);
    }
  var _fabs=Math_abs;
  function _round(x) {
      return (x < 0) ? -Math.round(-x) : Math.round(x);
    }
  function ___assert_fail(condition, filename, line, func) {
      ABORT = true;
      throw 'Assertion failed: ' + Pointer_stringify(condition) + ', at: ' + [filename ? Pointer_stringify(filename) : 'unknown filename', line, func ? Pointer_stringify(func) : 'unknown function'] + ' at ' + stackTrace();
    }
  function __reallyNegative(x) {
      return x < 0 || (x === 0 && (1/x) === -Infinity);
    }function __formatString(format, varargs) {
      var textIndex = format;
      var argIndex = 0;
      function getNextArg(type) {
        // NOTE: Explicitly ignoring type safety. Otherwise this fails:
        //       int x = 4; printf("%c\n", (char)x);
        var ret;
        if (type === 'double') {
          ret = HEAPF64[(((varargs)+(argIndex))>>3)];
        } else if (type == 'i64') {
          ret = [HEAP32[(((varargs)+(argIndex))>>2)],
                 HEAP32[(((varargs)+(argIndex+8))>>2)]];
          argIndex += 8; // each 32-bit chunk is in a 64-bit block
        } else {
          type = 'i32'; // varargs are always i32, i64, or double
          ret = HEAP32[(((varargs)+(argIndex))>>2)];
        }
        argIndex += Math.max(Runtime.getNativeFieldSize(type), Runtime.getAlignSize(type, null, true));
        return ret;
      }
      var ret = [];
      var curr, next, currArg;
      while(1) {
        var startTextIndex = textIndex;
        curr = HEAP8[(textIndex)];
        if (curr === 0) break;
        next = HEAP8[((textIndex+1)|0)];
        if (curr == 37) {
          // Handle flags.
          var flagAlwaysSigned = false;
          var flagLeftAlign = false;
          var flagAlternative = false;
          var flagZeroPad = false;
          var flagPadSign = false;
          flagsLoop: while (1) {
            switch (next) {
              case 43:
                flagAlwaysSigned = true;
                break;
              case 45:
                flagLeftAlign = true;
                break;
              case 35:
                flagAlternative = true;
                break;
              case 48:
                if (flagZeroPad) {
                  break flagsLoop;
                } else {
                  flagZeroPad = true;
                  break;
                }
              case 32:
                flagPadSign = true;
                break;
              default:
                break flagsLoop;
            }
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
          }
          // Handle width.
          var width = 0;
          if (next == 42) {
            width = getNextArg('i32');
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
          } else {
            while (next >= 48 && next <= 57) {
              width = width * 10 + (next - 48);
              textIndex++;
              next = HEAP8[((textIndex+1)|0)];
            }
          }
          // Handle precision.
          var precisionSet = false;
          if (next == 46) {
            var precision = 0;
            precisionSet = true;
            textIndex++;
            next = HEAP8[((textIndex+1)|0)];
            if (next == 42) {
              precision = getNextArg('i32');
              textIndex++;
            } else {
              while(1) {
                var precisionChr = HEAP8[((textIndex+1)|0)];
                if (precisionChr < 48 ||
                    precisionChr > 57) break;
                precision = precision * 10 + (precisionChr - 48);
                textIndex++;
              }
            }
            next = HEAP8[((textIndex+1)|0)];
          } else {
            var precision = 6; // Standard default.
          }
          // Handle integer sizes. WARNING: These assume a 32-bit architecture!
          var argSize;
          switch (String.fromCharCode(next)) {
            case 'h':
              var nextNext = HEAP8[((textIndex+2)|0)];
              if (nextNext == 104) {
                textIndex++;
                argSize = 1; // char (actually i32 in varargs)
              } else {
                argSize = 2; // short (actually i32 in varargs)
              }
              break;
            case 'l':
              var nextNext = HEAP8[((textIndex+2)|0)];
              if (nextNext == 108) {
                textIndex++;
                argSize = 8; // long long
              } else {
                argSize = 4; // long
              }
              break;
            case 'L': // long long
            case 'q': // int64_t
            case 'j': // intmax_t
              argSize = 8;
              break;
            case 'z': // size_t
            case 't': // ptrdiff_t
            case 'I': // signed ptrdiff_t or unsigned size_t
              argSize = 4;
              break;
            default:
              argSize = null;
          }
          if (argSize) textIndex++;
          next = HEAP8[((textIndex+1)|0)];
          // Handle type specifier.
          switch (String.fromCharCode(next)) {
            case 'd': case 'i': case 'u': case 'o': case 'x': case 'X': case 'p': {
              // Integer.
              var signed = next == 100 || next == 105;
              argSize = argSize || 4;
              var currArg = getNextArg('i' + (argSize * 8));
              var origArg = currArg;
              var argText;
              // Flatten i64-1 [low, high] into a (slightly rounded) double
              if (argSize == 8) {
                currArg = Runtime.makeBigInt(currArg[0], currArg[1], next == 117);
              }
              // Truncate to requested size.
              if (argSize <= 4) {
                var limit = Math.pow(256, argSize) - 1;
                currArg = (signed ? reSign : unSign)(currArg & limit, argSize * 8);
              }
              // Format the number.
              var currAbsArg = Math.abs(currArg);
              var prefix = '';
              if (next == 100 || next == 105) {
                if (argSize == 8 && i64Math) argText = i64Math.stringify(origArg[0], origArg[1], null); else
                argText = reSign(currArg, 8 * argSize, 1).toString(10);
              } else if (next == 117) {
                if (argSize == 8 && i64Math) argText = i64Math.stringify(origArg[0], origArg[1], true); else
                argText = unSign(currArg, 8 * argSize, 1).toString(10);
                currArg = Math.abs(currArg);
              } else if (next == 111) {
                argText = (flagAlternative ? '0' : '') + currAbsArg.toString(8);
              } else if (next == 120 || next == 88) {
                prefix = (flagAlternative && currArg != 0) ? '0x' : '';
                if (argSize == 8 && i64Math) {
                  if (origArg[1]) {
                    argText = (origArg[1]>>>0).toString(16);
                    var lower = (origArg[0]>>>0).toString(16);
                    while (lower.length < 8) lower = '0' + lower;
                    argText += lower;
                  } else {
                    argText = (origArg[0]>>>0).toString(16);
                  }
                } else
                if (currArg < 0) {
                  // Represent negative numbers in hex as 2's complement.
                  currArg = -currArg;
                  argText = (currAbsArg - 1).toString(16);
                  var buffer = [];
                  for (var i = 0; i < argText.length; i++) {
                    buffer.push((0xF - parseInt(argText[i], 16)).toString(16));
                  }
                  argText = buffer.join('');
                  while (argText.length < argSize * 2) argText = 'f' + argText;
                } else {
                  argText = currAbsArg.toString(16);
                }
                if (next == 88) {
                  prefix = prefix.toUpperCase();
                  argText = argText.toUpperCase();
                }
              } else if (next == 112) {
                if (currAbsArg === 0) {
                  argText = '(nil)';
                } else {
                  prefix = '0x';
                  argText = currAbsArg.toString(16);
                }
              }
              if (precisionSet) {
                while (argText.length < precision) {
                  argText = '0' + argText;
                }
              }
              // Add sign if needed
              if (currArg >= 0) {
                if (flagAlwaysSigned) {
                  prefix = '+' + prefix;
                } else if (flagPadSign) {
                  prefix = ' ' + prefix;
                }
              }
              // Move sign to prefix so we zero-pad after the sign
              if (argText.charAt(0) == '-') {
                prefix = '-' + prefix;
                argText = argText.substr(1);
              }
              // Add padding.
              while (prefix.length + argText.length < width) {
                if (flagLeftAlign) {
                  argText += ' ';
                } else {
                  if (flagZeroPad) {
                    argText = '0' + argText;
                  } else {
                    prefix = ' ' + prefix;
                  }
                }
              }
              // Insert the result into the buffer.
              argText = prefix + argText;
              argText.split('').forEach(function(chr) {
                ret.push(chr.charCodeAt(0));
              });
              break;
            }
            case 'f': case 'F': case 'e': case 'E': case 'g': case 'G': {
              // Float.
              var currArg = getNextArg('double');
              var argText;
              if (isNaN(currArg)) {
                argText = 'nan';
                flagZeroPad = false;
              } else if (!isFinite(currArg)) {
                argText = (currArg < 0 ? '-' : '') + 'inf';
                flagZeroPad = false;
              } else {
                var isGeneral = false;
                var effectivePrecision = Math.min(precision, 20);
                // Convert g/G to f/F or e/E, as per:
                // http://pubs.opengroup.org/onlinepubs/9699919799/functions/printf.html
                if (next == 103 || next == 71) {
                  isGeneral = true;
                  precision = precision || 1;
                  var exponent = parseInt(currArg.toExponential(effectivePrecision).split('e')[1], 10);
                  if (precision > exponent && exponent >= -4) {
                    next = ((next == 103) ? 'f' : 'F').charCodeAt(0);
                    precision -= exponent + 1;
                  } else {
                    next = ((next == 103) ? 'e' : 'E').charCodeAt(0);
                    precision--;
                  }
                  effectivePrecision = Math.min(precision, 20);
                }
                if (next == 101 || next == 69) {
                  argText = currArg.toExponential(effectivePrecision);
                  // Make sure the exponent has at least 2 digits.
                  if (/[eE][-+]\d$/.test(argText)) {
                    argText = argText.slice(0, -1) + '0' + argText.slice(-1);
                  }
                } else if (next == 102 || next == 70) {
                  argText = currArg.toFixed(effectivePrecision);
                  if (currArg === 0 && __reallyNegative(currArg)) {
                    argText = '-' + argText;
                  }
                }
                var parts = argText.split('e');
                if (isGeneral && !flagAlternative) {
                  // Discard trailing zeros and periods.
                  while (parts[0].length > 1 && parts[0].indexOf('.') != -1 &&
                         (parts[0].slice(-1) == '0' || parts[0].slice(-1) == '.')) {
                    parts[0] = parts[0].slice(0, -1);
                  }
                } else {
                  // Make sure we have a period in alternative mode.
                  if (flagAlternative && argText.indexOf('.') == -1) parts[0] += '.';
                  // Zero pad until required precision.
                  while (precision > effectivePrecision++) parts[0] += '0';
                }
                argText = parts[0] + (parts.length > 1 ? 'e' + parts[1] : '');
                // Capitalize 'E' if needed.
                if (next == 69) argText = argText.toUpperCase();
                // Add sign.
                if (currArg >= 0) {
                  if (flagAlwaysSigned) {
                    argText = '+' + argText;
                  } else if (flagPadSign) {
                    argText = ' ' + argText;
                  }
                }
              }
              // Add padding.
              while (argText.length < width) {
                if (flagLeftAlign) {
                  argText += ' ';
                } else {
                  if (flagZeroPad && (argText[0] == '-' || argText[0] == '+')) {
                    argText = argText[0] + '0' + argText.slice(1);
                  } else {
                    argText = (flagZeroPad ? '0' : ' ') + argText;
                  }
                }
              }
              // Adjust case.
              if (next < 97) argText = argText.toUpperCase();
              // Insert the result into the buffer.
              argText.split('').forEach(function(chr) {
                ret.push(chr.charCodeAt(0));
              });
              break;
            }
            case 's': {
              // String.
              var arg = getNextArg('i8*');
              var argLength = arg ? _strlen(arg) : '(null)'.length;
              if (precisionSet) argLength = Math.min(argLength, precision);
              if (!flagLeftAlign) {
                while (argLength < width--) {
                  ret.push(32);
                }
              }
              if (arg) {
                for (var i = 0; i < argLength; i++) {
                  ret.push(HEAPU8[((arg++)|0)]);
                }
              } else {
                ret = ret.concat(intArrayFromString('(null)'.substr(0, argLength), true));
              }
              if (flagLeftAlign) {
                while (argLength < width--) {
                  ret.push(32);
                }
              }
              break;
            }
            case 'c': {
              // Character.
              if (flagLeftAlign) ret.push(getNextArg('i8'));
              while (--width > 0) {
                ret.push(32);
              }
              if (!flagLeftAlign) ret.push(getNextArg('i8'));
              break;
            }
            case 'n': {
              // Write the length written so far to the next parameter.
              var ptr = getNextArg('i32*');
              HEAP32[((ptr)>>2)]=ret.length
              break;
            }
            case '%': {
              // Literal percent sign.
              ret.push(curr);
              break;
            }
            default: {
              // Unknown specifiers remain untouched.
              for (var i = startTextIndex; i < textIndex + 2; i++) {
                ret.push(HEAP8[(i)]);
              }
            }
          }
          textIndex += 2;
          // TODO: Support a/A (hex float) and m (last error) specifiers.
          // TODO: Support %1${specifier} for arg selection.
        } else {
          ret.push(curr);
          textIndex += 1;
        }
      }
      return ret;
    }function _snprintf(s, n, format, varargs) {
      // int snprintf(char *restrict s, size_t n, const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      var result = __formatString(format, varargs);
      var limit = (n === undefined) ? result.length
                                    : Math.min(result.length, Math.max(n - 1, 0));
      if (s < 0) {
        s = -s;
        var buf = _malloc(limit+1);
        HEAP32[((s)>>2)]=buf;
        s = buf;
      }
      for (var i = 0; i < limit; i++) {
        HEAP8[(((s)+(i))|0)]=result[i];
      }
      if (limit < n || (n === undefined)) HEAP8[(((s)+(i))|0)]=0;
      return result.length;
    }
  function _sprintf(s, format, varargs) {
      // int sprintf(char *restrict s, const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      return _snprintf(s, undefined, format, varargs);
    }
  function _isalpha(chr) {
      return (chr >= 97 && chr <= 122) ||
             (chr >= 65 && chr <= 90);
    }
  function _isxdigit(chr) {
      return (chr >= 48 && chr <= 57) ||
             (chr >= 97 && chr <= 102) ||
             (chr >= 65 && chr <= 70);
    }
  function _isalnum(chr) {
      return (chr >= 48 && chr <= 57) ||
             (chr >= 97 && chr <= 122) ||
             (chr >= 65 && chr <= 90);
    }
  function _pthread_mutex_lock() {}
  function _pthread_mutex_unlock() {}
  function ___cxa_guard_acquire(variable) {
      if (!HEAP8[(variable)]) { // ignore SAFE_HEAP stuff because llvm mixes i64 and i8 here
        HEAP8[(variable)]=1;
        return 1;
      }
      return 0;
    }
  function ___cxa_guard_release() {}
  function _pthread_cond_broadcast() {
      return 0;
    }
  function _pthread_cond_wait() {
      return 0;
    }
  function _ungetc(c, stream) {
      // int ungetc(int c, FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/ungetc.html
      stream = FS.getStream(stream);
      if (!stream) {
        return -1;
      }
      if (c === -1) {
        // do nothing for EOF character
        return c;
      }
      c = unSign(c & 0xFF);
      stream.ungotten.push(c);
      stream.eof = false;
      return c;
    }
  function _fgetc(stream) {
      // int fgetc(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fgetc.html
      var streamObj = FS.getStream(stream);
      if (!streamObj) return -1;
      if (streamObj.eof || streamObj.error) return -1;
      var ret = _fread(_fgetc.ret, 1, 1, stream);
      if (ret == 0) {
        return -1;
      } else if (ret == -1) {
        streamObj.error = true;
        return -1;
      } else {
        return HEAPU8[((_fgetc.ret)|0)];
      }
    }var _getc=_fgetc;
  function ___errno_location() {
      return ___errno_state;
    }
  function _strerror_r(errnum, strerrbuf, buflen) {
      if (errnum in ERRNO_MESSAGES) {
        if (ERRNO_MESSAGES[errnum].length > buflen - 1) {
          return ___setErrNo(ERRNO_CODES.ERANGE);
        } else {
          var msg = ERRNO_MESSAGES[errnum];
          writeAsciiToMemory(msg, strerrbuf);
          return 0;
        }
      } else {
        return ___setErrNo(ERRNO_CODES.EINVAL);
      }
    }function _strerror(errnum) {
      if (!_strerror.buffer) _strerror.buffer = _malloc(256);
      _strerror_r(errnum, _strerror.buffer, 256);
      return _strerror.buffer;
    }
  function _abort() {
      Module['abort']();
    }
  function _sysconf(name) {
      // long sysconf(int name);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/sysconf.html
      switch(name) {
        case 30: return PAGE_SIZE;
        case 132:
        case 133:
        case 12:
        case 137:
        case 138:
        case 15:
        case 235:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 149:
        case 13:
        case 10:
        case 236:
        case 153:
        case 9:
        case 21:
        case 22:
        case 159:
        case 154:
        case 14:
        case 77:
        case 78:
        case 139:
        case 80:
        case 81:
        case 79:
        case 82:
        case 68:
        case 67:
        case 164:
        case 11:
        case 29:
        case 47:
        case 48:
        case 95:
        case 52:
        case 51:
        case 46:
          return 200809;
        case 27:
        case 246:
        case 127:
        case 128:
        case 23:
        case 24:
        case 160:
        case 161:
        case 181:
        case 182:
        case 242:
        case 183:
        case 184:
        case 243:
        case 244:
        case 245:
        case 165:
        case 178:
        case 179:
        case 49:
        case 50:
        case 168:
        case 169:
        case 175:
        case 170:
        case 171:
        case 172:
        case 97:
        case 76:
        case 32:
        case 173:
        case 35:
          return -1;
        case 176:
        case 177:
        case 7:
        case 155:
        case 8:
        case 157:
        case 125:
        case 126:
        case 92:
        case 93:
        case 129:
        case 130:
        case 131:
        case 94:
        case 91:
          return 1;
        case 74:
        case 60:
        case 69:
        case 70:
        case 4:
          return 1024;
        case 31:
        case 42:
        case 72:
          return 32;
        case 87:
        case 26:
        case 33:
          return 2147483647;
        case 34:
        case 1:
          return 47839;
        case 38:
        case 36:
          return 99;
        case 43:
        case 37:
          return 2048;
        case 0: return 2097152;
        case 3: return 65536;
        case 28: return 32768;
        case 44: return 32767;
        case 75: return 16384;
        case 39: return 1000;
        case 89: return 700;
        case 71: return 256;
        case 40: return 255;
        case 2: return 100;
        case 180: return 64;
        case 25: return 20;
        case 5: return 16;
        case 6: return 6;
        case 73: return 4;
        case 84: return 1;
      }
      ___setErrNo(ERRNO_CODES.EINVAL);
      return -1;
    }
  function ___cxa_guard_abort() {}
  var _isxdigit_l=_isxdigit;
  function _isdigit(chr) {
      return chr >= 48 && chr <= 57;
    }var _isdigit_l=_isdigit;
  function __getFloat(text) {
      return /^[+-]?[0-9]*\.?[0-9]+([eE][+-]?[0-9]+)?/.exec(text);
    }function __scanString(format, get, unget, varargs) {
      if (!__scanString.whiteSpace) {
        __scanString.whiteSpace = {};
        __scanString.whiteSpace[32] = 1;
        __scanString.whiteSpace[9] = 1;
        __scanString.whiteSpace[10] = 1;
        __scanString.whiteSpace[11] = 1;
        __scanString.whiteSpace[12] = 1;
        __scanString.whiteSpace[13] = 1;
      }
      // Supports %x, %4x, %d.%d, %lld, %s, %f, %lf.
      // TODO: Support all format specifiers.
      format = Pointer_stringify(format);
      var soFar = 0;
      if (format.indexOf('%n') >= 0) {
        // need to track soFar
        var _get = get;
        get = function get() {
          soFar++;
          return _get();
        }
        var _unget = unget;
        unget = function unget() {
          soFar--;
          return _unget();
        }
      }
      var formatIndex = 0;
      var argsi = 0;
      var fields = 0;
      var argIndex = 0;
      var next;
      mainLoop:
      for (var formatIndex = 0; formatIndex < format.length;) {
        if (format[formatIndex] === '%' && format[formatIndex+1] == 'n') {
          var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
          argIndex += Runtime.getAlignSize('void*', null, true);
          HEAP32[((argPtr)>>2)]=soFar;
          formatIndex += 2;
          continue;
        }
        if (format[formatIndex] === '%') {
          var nextC = format.indexOf('c', formatIndex+1);
          if (nextC > 0) {
            var maxx = 1;
            if (nextC > formatIndex+1) {
              var sub = format.substring(formatIndex+1, nextC);
              maxx = parseInt(sub);
              if (maxx != sub) maxx = 0;
            }
            if (maxx) {
              var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
              argIndex += Runtime.getAlignSize('void*', null, true);
              fields++;
              for (var i = 0; i < maxx; i++) {
                next = get();
                HEAP8[((argPtr++)|0)]=next;
              }
              formatIndex += nextC - formatIndex + 1;
              continue;
            }
          }
        }
        // handle %[...]
        if (format[formatIndex] === '%' && format.indexOf('[', formatIndex+1) > 0) {
          var match = /\%([0-9]*)\[(\^)?(\]?[^\]]*)\]/.exec(format.substring(formatIndex));
          if (match) {
            var maxNumCharacters = parseInt(match[1]) || Infinity;
            var negateScanList = (match[2] === '^');
            var scanList = match[3];
            // expand "middle" dashs into character sets
            var middleDashMatch;
            while ((middleDashMatch = /([^\-])\-([^\-])/.exec(scanList))) {
              var rangeStartCharCode = middleDashMatch[1].charCodeAt(0);
              var rangeEndCharCode = middleDashMatch[2].charCodeAt(0);
              for (var expanded = ''; rangeStartCharCode <= rangeEndCharCode; expanded += String.fromCharCode(rangeStartCharCode++));
              scanList = scanList.replace(middleDashMatch[1] + '-' + middleDashMatch[2], expanded);
            }
            var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
            argIndex += Runtime.getAlignSize('void*', null, true);
            fields++;
            for (var i = 0; i < maxNumCharacters; i++) {
              next = get();
              if (negateScanList) {
                if (scanList.indexOf(String.fromCharCode(next)) < 0) {
                  HEAP8[((argPtr++)|0)]=next;
                } else {
                  unget();
                  break;
                }
              } else {
                if (scanList.indexOf(String.fromCharCode(next)) >= 0) {
                  HEAP8[((argPtr++)|0)]=next;
                } else {
                  unget();
                  break;
                }
              }
            }
            // write out null-terminating character
            HEAP8[((argPtr++)|0)]=0;
            formatIndex += match[0].length;
            continue;
          }
        }      
        // remove whitespace
        while (1) {
          next = get();
          if (next == 0) return fields;
          if (!(next in __scanString.whiteSpace)) break;
        }
        unget();
        if (format[formatIndex] === '%') {
          formatIndex++;
          var suppressAssignment = false;
          if (format[formatIndex] == '*') {
            suppressAssignment = true;
            formatIndex++;
          }
          var maxSpecifierStart = formatIndex;
          while (format[formatIndex].charCodeAt(0) >= 48 &&
                 format[formatIndex].charCodeAt(0) <= 57) {
            formatIndex++;
          }
          var max_;
          if (formatIndex != maxSpecifierStart) {
            max_ = parseInt(format.slice(maxSpecifierStart, formatIndex), 10);
          }
          var long_ = false;
          var half = false;
          var longLong = false;
          if (format[formatIndex] == 'l') {
            long_ = true;
            formatIndex++;
            if (format[formatIndex] == 'l') {
              longLong = true;
              formatIndex++;
            }
          } else if (format[formatIndex] == 'h') {
            half = true;
            formatIndex++;
          }
          var type = format[formatIndex];
          formatIndex++;
          var curr = 0;
          var buffer = [];
          // Read characters according to the format. floats are trickier, they may be in an unfloat state in the middle, then be a valid float later
          if (type == 'f' || type == 'e' || type == 'g' ||
              type == 'F' || type == 'E' || type == 'G') {
            next = get();
            while (next > 0 && (!(next in __scanString.whiteSpace)))  {
              buffer.push(String.fromCharCode(next));
              next = get();
            }
            var m = __getFloat(buffer.join(''));
            var last = m ? m[0].length : 0;
            for (var i = 0; i < buffer.length - last + 1; i++) {
              unget();
            }
            buffer.length = last;
          } else {
            next = get();
            var first = true;
            // Strip the optional 0x prefix for %x.
            if ((type == 'x' || type == 'X') && (next == 48)) {
              var peek = get();
              if (peek == 120 || peek == 88) {
                next = get();
              } else {
                unget();
              }
            }
            while ((curr < max_ || isNaN(max_)) && next > 0) {
              if (!(next in __scanString.whiteSpace) && // stop on whitespace
                  (type == 's' ||
                   ((type === 'd' || type == 'u' || type == 'i') && ((next >= 48 && next <= 57) ||
                                                                     (first && next == 45))) ||
                   ((type === 'x' || type === 'X') && (next >= 48 && next <= 57 ||
                                     next >= 97 && next <= 102 ||
                                     next >= 65 && next <= 70))) &&
                  (formatIndex >= format.length || next !== format[formatIndex].charCodeAt(0))) { // Stop when we read something that is coming up
                buffer.push(String.fromCharCode(next));
                next = get();
                curr++;
                first = false;
              } else {
                break;
              }
            }
            unget();
          }
          if (buffer.length === 0) return 0;  // Failure.
          if (suppressAssignment) continue;
          var text = buffer.join('');
          var argPtr = HEAP32[(((varargs)+(argIndex))>>2)];
          argIndex += Runtime.getAlignSize('void*', null, true);
          switch (type) {
            case 'd': case 'u': case 'i':
              if (half) {
                HEAP16[((argPtr)>>1)]=parseInt(text, 10);
              } else if (longLong) {
                (tempI64 = [parseInt(text, 10)>>>0,(tempDouble=parseInt(text, 10),(+(Math_abs(tempDouble))) >= (+1) ? (tempDouble > (+0) ? ((Math_min((+(Math_floor((tempDouble)/(+4294967296)))), (+4294967295)))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/(+4294967296))))))>>>0) : 0)],HEAP32[((argPtr)>>2)]=tempI64[0],HEAP32[(((argPtr)+(4))>>2)]=tempI64[1]);
              } else {
                HEAP32[((argPtr)>>2)]=parseInt(text, 10);
              }
              break;
            case 'X':
            case 'x':
              HEAP32[((argPtr)>>2)]=parseInt(text, 16)
              break;
            case 'F':
            case 'f':
            case 'E':
            case 'e':
            case 'G':
            case 'g':
            case 'E':
              // fallthrough intended
              if (long_) {
                HEAPF64[((argPtr)>>3)]=parseFloat(text)
              } else {
                HEAPF32[((argPtr)>>2)]=parseFloat(text)
              }
              break;
            case 's':
              var array = intArrayFromString(text);
              for (var j = 0; j < array.length; j++) {
                HEAP8[(((argPtr)+(j))|0)]=array[j]
              }
              break;
          }
          fields++;
        } else if (format[formatIndex].charCodeAt(0) in __scanString.whiteSpace) {
          next = get();
          while (next in __scanString.whiteSpace) {
            if (next <= 0) break mainLoop;  // End of input.
            next = get();
          }
          unget(next);
          formatIndex++;
        } else {
          // Not a specifier.
          next = get();
          if (format[formatIndex].charCodeAt(0) !== next) {
            unget(next);
            break mainLoop;
          }
          formatIndex++;
        }
      }
      return fields;
    }function _sscanf(s, format, varargs) {
      // int sscanf(const char *restrict s, const char *restrict format, ... );
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/scanf.html
      var index = 0;
      function get() { return HEAP8[(((s)+(index++))|0)]; };
      function unget() { index--; };
      return __scanString(format, get, unget, varargs);
    }
  function _catopen() { throw 'TODO: ' + aborter }
  function _catgets() { throw 'TODO: ' + aborter }
  function _catclose() { throw 'TODO: ' + aborter }
  function _newlocale(mask, locale, base) {
      return _malloc(4);
    }
  function _freelocale(locale) {
      _free(locale);
    }
  function _isascii(chr) {
      return chr >= 0 && (chr & 0x80) == 0;
    }
  function ___ctype_b_loc() {
      // http://refspecs.freestandards.org/LSB_3.0.0/LSB-Core-generic/LSB-Core-generic/baselib---ctype-b-loc.html
      var me = ___ctype_b_loc;
      if (!me.ret) {
        var values = [
          0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,8195,8194,8194,8194,8194,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,24577,49156,49156,49156,
          49156,49156,49156,49156,49156,49156,49156,49156,49156,49156,49156,49156,55304,55304,55304,55304,55304,55304,55304,55304,
          55304,55304,49156,49156,49156,49156,49156,49156,49156,54536,54536,54536,54536,54536,54536,50440,50440,50440,50440,50440,
          50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,50440,49156,49156,49156,49156,49156,
          49156,54792,54792,54792,54792,54792,54792,50696,50696,50696,50696,50696,50696,50696,50696,50696,50696,50696,50696,50696,
          50696,50696,50696,50696,50696,50696,50696,49156,49156,49156,49156,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
          0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ];
        var i16size = 2;
        var arr = _malloc(values.length * i16size);
        for (var i = 0; i < values.length; i++) {
          HEAP16[(((arr)+(i * i16size))>>1)]=values[i]
        }
        me.ret = allocate([arr + 128 * i16size], 'i16*', ALLOC_NORMAL);
      }
      return me.ret;
    }
  function ___ctype_tolower_loc() {
      // http://refspecs.freestandards.org/LSB_3.1.1/LSB-Core-generic/LSB-Core-generic/libutil---ctype-tolower-loc.html
      var me = ___ctype_tolower_loc;
      if (!me.ret) {
        var values = [
          128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,
          158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,
          188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,
          218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,
          248,249,250,251,252,253,254,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,
          33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,97,98,99,100,101,102,103,
          104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,91,92,93,94,95,96,97,98,99,100,101,102,103,
          104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,
          134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,
          164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,
          194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,
          224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,
          254,255
        ];
        var i32size = 4;
        var arr = _malloc(values.length * i32size);
        for (var i = 0; i < values.length; i++) {
          HEAP32[(((arr)+(i * i32size))>>2)]=values[i]
        }
        me.ret = allocate([arr + 128 * i32size], 'i32*', ALLOC_NORMAL);
      }
      return me.ret;
    }
  function ___ctype_toupper_loc() {
      // http://refspecs.freestandards.org/LSB_3.1.1/LSB-Core-generic/LSB-Core-generic/libutil---ctype-toupper-loc.html
      var me = ___ctype_toupper_loc;
      if (!me.ret) {
        var values = [
          128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,
          158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,
          188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,
          218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,
          248,249,250,251,252,253,254,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,
          33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,
          73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,
          81,82,83,84,85,86,87,88,89,90,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,
          145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,
          175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,
          205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,
          235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255
        ];
        var i32size = 4;
        var arr = _malloc(values.length * i32size);
        for (var i = 0; i < values.length; i++) {
          HEAP32[(((arr)+(i * i32size))>>2)]=values[i]
        }
        me.ret = allocate([arr + 128 * i32size], 'i32*', ALLOC_NORMAL);
      }
      return me.ret;
    }
  function __isLeapYear(year) {
        return year%4 === 0 && (year%100 !== 0 || year%400 === 0);
    }
  function __arraySum(array, index) {
      var sum = 0;
      for (var i = 0; i <= index; sum += array[i++]);
      return sum;
    }
  var __MONTH_DAYS_LEAP=[31,29,31,30,31,30,31,31,30,31,30,31];
  var __MONTH_DAYS_REGULAR=[31,28,31,30,31,30,31,31,30,31,30,31];function __addDays(date, days) {
      var newDate = new Date(date.getTime());
      while(days > 0) {
        var leap = __isLeapYear(newDate.getFullYear());
        var currentMonth = newDate.getMonth();
        var daysInCurrentMonth = (leap ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR)[currentMonth];
        if (days > daysInCurrentMonth-newDate.getDate()) {
          // we spill over to next month
          days -= (daysInCurrentMonth-newDate.getDate()+1);
          newDate.setDate(1);
          if (currentMonth < 11) {
            newDate.setMonth(currentMonth+1)
          } else {
            newDate.setMonth(0);
            newDate.setFullYear(newDate.getFullYear()+1);
          }
        } else {
          // we stay in current month 
          newDate.setDate(newDate.getDate()+days);
          return newDate;
        }
      }
      return newDate;
    }function _strftime(s, maxsize, format, tm) {
      // size_t strftime(char *restrict s, size_t maxsize, const char *restrict format, const struct tm *restrict timeptr);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/strftime.html
      var date = {
        tm_sec: HEAP32[((tm)>>2)],
        tm_min: HEAP32[(((tm)+(4))>>2)],
        tm_hour: HEAP32[(((tm)+(8))>>2)],
        tm_mday: HEAP32[(((tm)+(12))>>2)],
        tm_mon: HEAP32[(((tm)+(16))>>2)],
        tm_year: HEAP32[(((tm)+(20))>>2)],
        tm_wday: HEAP32[(((tm)+(24))>>2)],
        tm_yday: HEAP32[(((tm)+(28))>>2)],
        tm_isdst: HEAP32[(((tm)+(32))>>2)]
      };
      var pattern = Pointer_stringify(format);
      // expand format
      var EXPANSION_RULES_1 = {
        '%c': '%a %b %d %H:%M:%S %Y',     // Replaced by the locale's appropriate date and time representation - e.g., Mon Aug  3 14:02:01 2013
        '%D': '%m/%d/%y',                 // Equivalent to %m / %d / %y
        '%F': '%Y-%m-%d',                 // Equivalent to %Y - %m - %d
        '%h': '%b',                       // Equivalent to %b
        '%r': '%I:%M:%S %p',              // Replaced by the time in a.m. and p.m. notation
        '%R': '%H:%M',                    // Replaced by the time in 24-hour notation
        '%T': '%H:%M:%S',                 // Replaced by the time
        '%x': '%m/%d/%y',                 // Replaced by the locale's appropriate date representation
        '%X': '%H:%M:%S',                 // Replaced by the locale's appropriate date representation
      };
      for (var rule in EXPANSION_RULES_1) {
        pattern = pattern.replace(new RegExp(rule, 'g'), EXPANSION_RULES_1[rule]);
      }
      var WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      function leadingSomething(value, digits, character) {
        var str = typeof value === 'number' ? value.toString() : (value || '');
        while (str.length < digits) {
          str = character[0]+str;
        }
        return str;
      };
      function leadingNulls(value, digits) {
        return leadingSomething(value, digits, '0');
      };
      function compareByDay(date1, date2) {
        function sgn(value) {
          return value < 0 ? -1 : (value > 0 ? 1 : 0);
        };
        var compare;
        if ((compare = sgn(date1.getFullYear()-date2.getFullYear())) === 0) {
          if ((compare = sgn(date1.getMonth()-date2.getMonth())) === 0) {
            compare = sgn(date1.getDate()-date2.getDate());
          }
        }
        return compare;
      };
      function getFirstWeekStartDate(janFourth) {
          switch (janFourth.getDay()) {
            case 0: // Sunday
              return new Date(janFourth.getFullYear()-1, 11, 29);
            case 1: // Monday
              return janFourth;
            case 2: // Tuesday
              return new Date(janFourth.getFullYear(), 0, 3);
            case 3: // Wednesday
              return new Date(janFourth.getFullYear(), 0, 2);
            case 4: // Thursday
              return new Date(janFourth.getFullYear(), 0, 1);
            case 5: // Friday
              return new Date(janFourth.getFullYear()-1, 11, 31);
            case 6: // Saturday
              return new Date(janFourth.getFullYear()-1, 11, 30);
          }
      };
      function getWeekBasedYear(date) {
          var thisDate = __addDays(new Date(date.tm_year+1900, 0, 1), date.tm_yday);
          var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
          var janFourthNextYear = new Date(thisDate.getFullYear()+1, 0, 4);
          var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
          var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
          if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
            // this date is after the start of the first week of this year
            if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
              return thisDate.getFullYear()+1;
            } else {
              return thisDate.getFullYear();
            }
          } else { 
            return thisDate.getFullYear()-1;
          }
      };
      var EXPANSION_RULES_2 = {
        '%a': function(date) {
          return WEEKDAYS[date.tm_wday].substring(0,3);
        },
        '%A': function(date) {
          return WEEKDAYS[date.tm_wday];
        },
        '%b': function(date) {
          return MONTHS[date.tm_mon].substring(0,3);
        },
        '%B': function(date) {
          return MONTHS[date.tm_mon];
        },
        '%C': function(date) {
          var year = date.tm_year+1900;
          return leadingNulls(Math.floor(year/100),2);
        },
        '%d': function(date) {
          return leadingNulls(date.tm_mday, 2);
        },
        '%e': function(date) {
          return leadingSomething(date.tm_mday, 2, ' ');
        },
        '%g': function(date) {
          // %g, %G, and %V give values according to the ISO 8601:2000 standard week-based year. 
          // In this system, weeks begin on a Monday and week 1 of the year is the week that includes 
          // January 4th, which is also the week that includes the first Thursday of the year, and 
          // is also the first week that contains at least four days in the year. 
          // If the first Monday of January is the 2nd, 3rd, or 4th, the preceding days are part of 
          // the last week of the preceding year; thus, for Saturday 2nd January 1999, 
          // %G is replaced by 1998 and %V is replaced by 53. If December 29th, 30th, 
          // or 31st is a Monday, it and any following days are part of week 1 of the following year. 
          // Thus, for Tuesday 30th December 1997, %G is replaced by 1998 and %V is replaced by 01.
          return getWeekBasedYear(date).toString().substring(2);
        },
        '%G': function(date) {
          return getWeekBasedYear(date);
        },
        '%H': function(date) {
          return leadingNulls(date.tm_hour, 2);
        },
        '%I': function(date) {
          return leadingNulls(date.tm_hour < 13 ? date.tm_hour : date.tm_hour-12, 2);
        },
        '%j': function(date) {
          // Day of the year (001-366)
          return leadingNulls(date.tm_mday+__arraySum(__isLeapYear(date.tm_year+1900) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, date.tm_mon-1), 3);
        },
        '%m': function(date) {
          return leadingNulls(date.tm_mon+1, 2);
        },
        '%M': function(date) {
          return leadingNulls(date.tm_min, 2);
        },
        '%n': function() {
          return '\n';
        },
        '%p': function(date) {
          if (date.tm_hour > 0 && date.tm_hour < 13) {
            return 'AM';
          } else {
            return 'PM';
          }
        },
        '%S': function(date) {
          return leadingNulls(date.tm_sec, 2);
        },
        '%t': function() {
          return '\t';
        },
        '%u': function(date) {
          var day = new Date(date.tm_year+1900, date.tm_mon+1, date.tm_mday, 0, 0, 0, 0);
          return day.getDay() || 7;
        },
        '%U': function(date) {
          // Replaced by the week number of the year as a decimal number [00,53]. 
          // The first Sunday of January is the first day of week 1; 
          // days in the new year before this are in week 0. [ tm_year, tm_wday, tm_yday]
          var janFirst = new Date(date.tm_year+1900, 0, 1);
          var firstSunday = janFirst.getDay() === 0 ? janFirst : __addDays(janFirst, 7-janFirst.getDay());
          var endDate = new Date(date.tm_year+1900, date.tm_mon, date.tm_mday);
          // is target date after the first Sunday?
          if (compareByDay(firstSunday, endDate) < 0) {
            // calculate difference in days between first Sunday and endDate
            var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth()-1)-31;
            var firstSundayUntilEndJanuary = 31-firstSunday.getDate();
            var days = firstSundayUntilEndJanuary+februaryFirstUntilEndMonth+endDate.getDate();
            return leadingNulls(Math.ceil(days/7), 2);
          }
          return compareByDay(firstSunday, janFirst) === 0 ? '01': '00';
        },
        '%V': function(date) {
          // Replaced by the week number of the year (Monday as the first day of the week) 
          // as a decimal number [01,53]. If the week containing 1 January has four 
          // or more days in the new year, then it is considered week 1. 
          // Otherwise, it is the last week of the previous year, and the next week is week 1. 
          // Both January 4th and the first Thursday of January are always in week 1. [ tm_year, tm_wday, tm_yday]
          var janFourthThisYear = new Date(date.tm_year+1900, 0, 4);
          var janFourthNextYear = new Date(date.tm_year+1901, 0, 4);
          var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
          var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
          var endDate = __addDays(new Date(date.tm_year+1900, 0, 1), date.tm_yday);
          if (compareByDay(endDate, firstWeekStartThisYear) < 0) {
            // if given date is before this years first week, then it belongs to the 53rd week of last year
            return '53';
          } 
          if (compareByDay(firstWeekStartNextYear, endDate) <= 0) {
            // if given date is after next years first week, then it belongs to the 01th week of next year
            return '01';
          }
          // given date is in between CW 01..53 of this calendar year
          var daysDifference;
          if (firstWeekStartThisYear.getFullYear() < date.tm_year+1900) {
            // first CW of this year starts last year
            daysDifference = date.tm_yday+32-firstWeekStartThisYear.getDate()
          } else {
            // first CW of this year starts this year
            daysDifference = date.tm_yday+1-firstWeekStartThisYear.getDate();
          }
          return leadingNulls(Math.ceil(daysDifference/7), 2);
        },
        '%w': function(date) {
          var day = new Date(date.tm_year+1900, date.tm_mon+1, date.tm_mday, 0, 0, 0, 0);
          return day.getDay();
        },
        '%W': function(date) {
          // Replaced by the week number of the year as a decimal number [00,53]. 
          // The first Monday of January is the first day of week 1; 
          // days in the new year before this are in week 0. [ tm_year, tm_wday, tm_yday]
          var janFirst = new Date(date.tm_year, 0, 1);
          var firstMonday = janFirst.getDay() === 1 ? janFirst : __addDays(janFirst, janFirst.getDay() === 0 ? 1 : 7-janFirst.getDay()+1);
          var endDate = new Date(date.tm_year+1900, date.tm_mon, date.tm_mday);
          // is target date after the first Monday?
          if (compareByDay(firstMonday, endDate) < 0) {
            var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth()-1)-31;
            var firstMondayUntilEndJanuary = 31-firstMonday.getDate();
            var days = firstMondayUntilEndJanuary+februaryFirstUntilEndMonth+endDate.getDate();
            return leadingNulls(Math.ceil(days/7), 2);
          }
          return compareByDay(firstMonday, janFirst) === 0 ? '01': '00';
        },
        '%y': function(date) {
          // Replaced by the last two digits of the year as a decimal number [00,99]. [ tm_year]
          return (date.tm_year+1900).toString().substring(2);
        },
        '%Y': function(date) {
          // Replaced by the year as a decimal number (for example, 1997). [ tm_year]
          return date.tm_year+1900;
        },
        '%z': function(date) {
          // Replaced by the offset from UTC in the ISO 8601:2000 standard format ( +hhmm or -hhmm ),
          // or by no characters if no timezone is determinable. 
          // For example, "-0430" means 4 hours 30 minutes behind UTC (west of Greenwich). 
          // If tm_isdst is zero, the standard time offset is used. 
          // If tm_isdst is greater than zero, the daylight savings time offset is used. 
          // If tm_isdst is negative, no characters are returned. 
          // FIXME: we cannot determine time zone (or can we?)
          return '';
        },
        '%Z': function(date) {
          // Replaced by the timezone name or abbreviation, or by no bytes if no timezone information exists. [ tm_isdst]
          // FIXME: we cannot determine time zone (or can we?)
          return '';
        },
        '%%': function() {
          return '%';
        }
      };
      for (var rule in EXPANSION_RULES_2) {
        if (pattern.indexOf(rule) >= 0) {
          pattern = pattern.replace(new RegExp(rule, 'g'), EXPANSION_RULES_2[rule](date));
        }
      }
      var bytes = intArrayFromString(pattern, false);
      if (bytes.length > maxsize) {
        return 0;
      } 
      writeArrayToMemory(bytes, s);
      return bytes.length-1;
    }var _strftime_l=_strftime;
  function __parseInt64(str, endptr, base, min, max, unsign) {
      var isNegative = false;
      // Skip space.
      while (_isspace(HEAP8[(str)])) str++;
      // Check for a plus/minus sign.
      if (HEAP8[(str)] == 45) {
        str++;
        isNegative = true;
      } else if (HEAP8[(str)] == 43) {
        str++;
      }
      // Find base.
      var ok = false;
      var finalBase = base;
      if (!finalBase) {
        if (HEAP8[(str)] == 48) {
          if (HEAP8[((str+1)|0)] == 120 ||
              HEAP8[((str+1)|0)] == 88) {
            finalBase = 16;
            str += 2;
          } else {
            finalBase = 8;
            ok = true; // we saw an initial zero, perhaps the entire thing is just "0"
          }
        }
      } else if (finalBase==16) {
        if (HEAP8[(str)] == 48) {
          if (HEAP8[((str+1)|0)] == 120 ||
              HEAP8[((str+1)|0)] == 88) {
            str += 2;
          }
        }
      }
      if (!finalBase) finalBase = 10;
      var start = str;
      // Get digits.
      var chr;
      while ((chr = HEAP8[(str)]) != 0) {
        var digit = parseInt(String.fromCharCode(chr), finalBase);
        if (isNaN(digit)) {
          break;
        } else {
          str++;
          ok = true;
        }
      }
      if (!ok) {
        ___setErrNo(ERRNO_CODES.EINVAL);
        return ((asm["setTempRet0"](0),0)|0);
      }
      // Set end pointer.
      if (endptr) {
        HEAP32[((endptr)>>2)]=str
      }
      try {
        var numberString = isNegative ? '-'+Pointer_stringify(start, str - start) : Pointer_stringify(start, str - start);
        i64Math.fromString(numberString, finalBase, min, max, unsign);
      } catch(e) {
        ___setErrNo(ERRNO_CODES.ERANGE); // not quite correct
      }
      return ((asm["setTempRet0"](((HEAP32[(((tempDoublePtr)+(4))>>2)])|0)),((HEAP32[((tempDoublePtr)>>2)])|0))|0);
    }function _strtoull(str, endptr, base) {
      return __parseInt64(str, endptr, base, 0, '18446744073709551615', true);  // ULONG_MAX.
    }var _strtoull_l=_strtoull;
  function _strtoll(str, endptr, base) {
      return __parseInt64(str, endptr, base, '-9223372036854775808', '9223372036854775807');  // LLONG_MIN, LLONG_MAX.
    }var _strtoll_l=_strtoll;
  function _uselocale(locale) {
      return 0;
    }
  var _llvm_va_start=undefined;
  function _asprintf(s, format, varargs) {
      return _sprintf(-s, format, varargs);
    }function _vasprintf(s, format, va_arg) {
      return _asprintf(s, format, HEAP32[((va_arg)>>2)]);
    }
  function _llvm_va_end() {}
  function _vsnprintf(s, n, format, va_arg) {
      return _snprintf(s, n, format, HEAP32[((va_arg)>>2)]);
    }
  function _vsscanf(s, format, va_arg) {
      return _sscanf(s, format, HEAP32[((va_arg)>>2)]);
    }
  function _sbrk(bytes) {
      // Implement a Linux-like 'memory area' for our 'process'.
      // Changes the size of the memory area by |bytes|; returns the
      // address of the previous top ('break') of the memory area
      // We control the "dynamic" memory - DYNAMIC_BASE to DYNAMICTOP
      var self = _sbrk;
      if (!self.called) {
        DYNAMICTOP = alignMemoryPage(DYNAMICTOP); // make sure we start out aligned
        self.called = true;
        assert(Runtime.dynamicAlloc);
        self.alloc = Runtime.dynamicAlloc;
        Runtime.dynamicAlloc = function() { abort('cannot dynamically allocate, sbrk now has control') };
      }
      var ret = DYNAMICTOP;
      if (bytes != 0) self.alloc(bytes);
      return ret;  // Previous break location.
    }
  function _time(ptr) {
      var ret = Math.floor(Date.now()/1000);
      if (ptr) {
        HEAP32[((ptr)>>2)]=ret
      }
      return ret;
    }
  function ___cxa_call_unexpected(exception) {
      Module.printErr('Unexpected exception thrown, this is not properly supported - aborting');
      ABORT = true;
      throw exception;
    }
  var Browser={mainLoop:{scheduler:null,shouldPause:false,paused:false,queue:[],pause:function () {
          Browser.mainLoop.shouldPause = true;
        },resume:function () {
          if (Browser.mainLoop.paused) {
            Browser.mainLoop.paused = false;
            Browser.mainLoop.scheduler();
          }
          Browser.mainLoop.shouldPause = false;
        },updateStatus:function () {
          if (Module['setStatus']) {
            var message = Module['statusMessage'] || 'Please wait...';
            var remaining = Browser.mainLoop.remainingBlockers;
            var expected = Browser.mainLoop.expectedBlockers;
            if (remaining) {
              if (remaining < expected) {
                Module['setStatus'](message + ' (' + (expected - remaining) + '/' + expected + ')');
              } else {
                Module['setStatus'](message);
              }
            } else {
              Module['setStatus']('');
            }
          }
        }},isFullScreen:false,pointerLock:false,moduleContextCreatedCallbacks:[],workers:[],init:function () {
        if (!Module["preloadPlugins"]) Module["preloadPlugins"] = []; // needs to exist even in workers
        if (Browser.initted || ENVIRONMENT_IS_WORKER) return;
        Browser.initted = true;
        try {
          new Blob();
          Browser.hasBlobConstructor = true;
        } catch(e) {
          Browser.hasBlobConstructor = false;
          console.log("warning: no blob constructor, cannot create blobs with mimetypes");
        }
        Browser.BlobBuilder = typeof MozBlobBuilder != "undefined" ? MozBlobBuilder : (typeof WebKitBlobBuilder != "undefined" ? WebKitBlobBuilder : (!Browser.hasBlobConstructor ? console.log("warning: no BlobBuilder") : null));
        Browser.URLObject = typeof window != "undefined" ? (window.URL ? window.URL : window.webkitURL) : undefined;
        if (!Module.noImageDecoding && typeof Browser.URLObject === 'undefined') {
          console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");
          Module.noImageDecoding = true;
        }
        // Support for plugins that can process preloaded files. You can add more of these to
        // your app by creating and appending to Module.preloadPlugins.
        //
        // Each plugin is asked if it can handle a file based on the file's name. If it can,
        // it is given the file's raw data. When it is done, it calls a callback with the file's
        // (possibly modified) data. For example, a plugin might decompress a file, or it
        // might create some side data structure for use later (like an Image element, etc.).
        var imagePlugin = {};
        imagePlugin['canHandle'] = function imagePlugin_canHandle(name) {
          return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name);
        };
        imagePlugin['handle'] = function imagePlugin_handle(byteArray, name, onload, onerror) {
          var b = null;
          if (Browser.hasBlobConstructor) {
            try {
              b = new Blob([byteArray], { type: Browser.getMimetype(name) });
              if (b.size !== byteArray.length) { // Safari bug #118630
                // Safari's Blob can only take an ArrayBuffer
                b = new Blob([(new Uint8Array(byteArray)).buffer], { type: Browser.getMimetype(name) });
              }
            } catch(e) {
              Runtime.warnOnce('Blob constructor present but fails: ' + e + '; falling back to blob builder');
            }
          }
          if (!b) {
            var bb = new Browser.BlobBuilder();
            bb.append((new Uint8Array(byteArray)).buffer); // we need to pass a buffer, and must copy the array to get the right data range
            b = bb.getBlob();
          }
          var url = Browser.URLObject.createObjectURL(b);
          var img = new Image();
          img.onload = function img_onload() {
            assert(img.complete, 'Image ' + name + ' could not be decoded');
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            Module["preloadedImages"][name] = canvas;
            Browser.URLObject.revokeObjectURL(url);
            if (onload) onload(byteArray);
          };
          img.onerror = function img_onerror(event) {
            console.log('Image ' + url + ' could not be decoded');
            if (onerror) onerror();
          };
          img.src = url;
        };
        Module['preloadPlugins'].push(imagePlugin);
        var audioPlugin = {};
        audioPlugin['canHandle'] = function audioPlugin_canHandle(name) {
          return !Module.noAudioDecoding && name.substr(-4) in { '.ogg': 1, '.wav': 1, '.mp3': 1 };
        };
        audioPlugin['handle'] = function audioPlugin_handle(byteArray, name, onload, onerror) {
          var done = false;
          function finish(audio) {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = audio;
            if (onload) onload(byteArray);
          }
          function fail() {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = new Audio(); // empty shim
            if (onerror) onerror();
          }
          if (Browser.hasBlobConstructor) {
            try {
              var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
            } catch(e) {
              return fail();
            }
            var url = Browser.URLObject.createObjectURL(b); // XXX we never revoke this!
            var audio = new Audio();
            audio.addEventListener('canplaythrough', function() { finish(audio) }, false); // use addEventListener due to chromium bug 124926
            audio.onerror = function audio_onerror(event) {
              if (done) return;
              console.log('warning: browser could not fully decode audio ' + name + ', trying slower base64 approach');
              function encode64(data) {
                var BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
                var PAD = '=';
                var ret = '';
                var leftchar = 0;
                var leftbits = 0;
                for (var i = 0; i < data.length; i++) {
                  leftchar = (leftchar << 8) | data[i];
                  leftbits += 8;
                  while (leftbits >= 6) {
                    var curr = (leftchar >> (leftbits-6)) & 0x3f;
                    leftbits -= 6;
                    ret += BASE[curr];
                  }
                }
                if (leftbits == 2) {
                  ret += BASE[(leftchar&3) << 4];
                  ret += PAD + PAD;
                } else if (leftbits == 4) {
                  ret += BASE[(leftchar&0xf) << 2];
                  ret += PAD;
                }
                return ret;
              }
              audio.src = 'data:audio/x-' + name.substr(-3) + ';base64,' + encode64(byteArray);
              finish(audio); // we don't wait for confirmation this worked - but it's worth trying
            };
            audio.src = url;
            // workaround for chrome bug 124926 - we do not always get oncanplaythrough or onerror
            Browser.safeSetTimeout(function() {
              finish(audio); // try to use it even though it is not necessarily ready to play
            }, 10000);
          } else {
            return fail();
          }
        };
        Module['preloadPlugins'].push(audioPlugin);
        // Canvas event setup
        var canvas = Module['canvas'];
        canvas.requestPointerLock = canvas['requestPointerLock'] ||
                                    canvas['mozRequestPointerLock'] ||
                                    canvas['webkitRequestPointerLock'];
        canvas.exitPointerLock = document['exitPointerLock'] ||
                                 document['mozExitPointerLock'] ||
                                 document['webkitExitPointerLock'] ||
                                 function(){}; // no-op if function does not exist
        canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
        function pointerLockChange() {
          Browser.pointerLock = document['pointerLockElement'] === canvas ||
                                document['mozPointerLockElement'] === canvas ||
                                document['webkitPointerLockElement'] === canvas;
        }
        document.addEventListener('pointerlockchange', pointerLockChange, false);
        document.addEventListener('mozpointerlockchange', pointerLockChange, false);
        document.addEventListener('webkitpointerlockchange', pointerLockChange, false);
        if (Module['elementPointerLock']) {
          canvas.addEventListener("click", function(ev) {
            if (!Browser.pointerLock && canvas.requestPointerLock) {
              canvas.requestPointerLock();
              ev.preventDefault();
            }
          }, false);
        }
      },createContext:function (canvas, useWebGL, setInModule, webGLContextAttributes) {
        var ctx;
        try {
          if (useWebGL) {
            var contextAttributes = {
              antialias: false,
              alpha: false
            };
            if (webGLContextAttributes) {
              for (var attribute in webGLContextAttributes) {
                contextAttributes[attribute] = webGLContextAttributes[attribute];
              }
            }
            var errorInfo = '?';
            function onContextCreationError(event) {
              errorInfo = event.statusMessage || errorInfo;
            }
            canvas.addEventListener('webglcontextcreationerror', onContextCreationError, false);
            try {
              ['experimental-webgl', 'webgl'].some(function(webglId) {
                return ctx = canvas.getContext(webglId, contextAttributes);
              });
            } finally {
              canvas.removeEventListener('webglcontextcreationerror', onContextCreationError, false);
            }
          } else {
            ctx = canvas.getContext('2d');
          }
          if (!ctx) throw ':(';
        } catch (e) {
          Module.print('Could not create canvas: ' + [errorInfo, e]);
          return null;
        }
        if (useWebGL) {
          // Set the background of the WebGL canvas to black
          canvas.style.backgroundColor = "black";
          // Warn on context loss
          canvas.addEventListener('webglcontextlost', function(event) {
            alert('WebGL context lost. You will need to reload the page.');
          }, false);
        }
        if (setInModule) {
          Module.ctx = ctx;
          Module.useWebGL = useWebGL;
          Browser.moduleContextCreatedCallbacks.forEach(function(callback) { callback() });
          Browser.init();
        }
        return ctx;
      },destroyContext:function (canvas, useWebGL, setInModule) {},fullScreenHandlersInstalled:false,lockPointer:undefined,resizeCanvas:undefined,requestFullScreen:function (lockPointer, resizeCanvas) {
        Browser.lockPointer = lockPointer;
        Browser.resizeCanvas = resizeCanvas;
        if (typeof Browser.lockPointer === 'undefined') Browser.lockPointer = true;
        if (typeof Browser.resizeCanvas === 'undefined') Browser.resizeCanvas = false;
        var canvas = Module['canvas'];
        function fullScreenChange() {
          Browser.isFullScreen = false;
          if ((document['webkitFullScreenElement'] || document['webkitFullscreenElement'] ||
               document['mozFullScreenElement'] || document['mozFullscreenElement'] ||
               document['fullScreenElement'] || document['fullscreenElement']) === canvas) {
            canvas.cancelFullScreen = document['cancelFullScreen'] ||
                                      document['mozCancelFullScreen'] ||
                                      document['webkitCancelFullScreen'];
            canvas.cancelFullScreen = canvas.cancelFullScreen.bind(document);
            if (Browser.lockPointer) canvas.requestPointerLock();
            Browser.isFullScreen = true;
            if (Browser.resizeCanvas) Browser.setFullScreenCanvasSize();
          } else if (Browser.resizeCanvas){
            Browser.setWindowedCanvasSize();
          }
          if (Module['onFullScreen']) Module['onFullScreen'](Browser.isFullScreen);
        }
        if (!Browser.fullScreenHandlersInstalled) {
          Browser.fullScreenHandlersInstalled = true;
          document.addEventListener('fullscreenchange', fullScreenChange, false);
          document.addEventListener('mozfullscreenchange', fullScreenChange, false);
          document.addEventListener('webkitfullscreenchange', fullScreenChange, false);
        }
        canvas.requestFullScreen = canvas['requestFullScreen'] ||
                                   canvas['mozRequestFullScreen'] ||
                                   (canvas['webkitRequestFullScreen'] ? function() { canvas['webkitRequestFullScreen'](Element['ALLOW_KEYBOARD_INPUT']) } : null);
        canvas.requestFullScreen();
      },requestAnimationFrame:function requestAnimationFrame(func) {
        if (typeof window === 'undefined') { // Provide fallback to setTimeout if window is undefined (e.g. in Node.js)
          setTimeout(func, 1000/60);
        } else {
          if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = window['requestAnimationFrame'] ||
                                           window['mozRequestAnimationFrame'] ||
                                           window['webkitRequestAnimationFrame'] ||
                                           window['msRequestAnimationFrame'] ||
                                           window['oRequestAnimationFrame'] ||
                                           window['setTimeout'];
          }
          window.requestAnimationFrame(func);
        }
      },safeCallback:function (func) {
        return function() {
          if (!ABORT) return func.apply(null, arguments);
        };
      },safeRequestAnimationFrame:function (func) {
        return Browser.requestAnimationFrame(function() {
          if (!ABORT) func();
        });
      },safeSetTimeout:function (func, timeout) {
        return setTimeout(function() {
          if (!ABORT) func();
        }, timeout);
      },safeSetInterval:function (func, timeout) {
        return setInterval(function() {
          if (!ABORT) func();
        }, timeout);
      },getMimetype:function (name) {
        return {
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'png': 'image/png',
          'bmp': 'image/bmp',
          'ogg': 'audio/ogg',
          'wav': 'audio/wav',
          'mp3': 'audio/mpeg'
        }[name.substr(name.lastIndexOf('.')+1)];
      },getUserMedia:function (func) {
        if(!window.getUserMedia) {
          window.getUserMedia = navigator['getUserMedia'] ||
                                navigator['mozGetUserMedia'];
        }
        window.getUserMedia(func);
      },getMovementX:function (event) {
        return event['movementX'] ||
               event['mozMovementX'] ||
               event['webkitMovementX'] ||
               0;
      },getMovementY:function (event) {
        return event['movementY'] ||
               event['mozMovementY'] ||
               event['webkitMovementY'] ||
               0;
      },mouseX:0,mouseY:0,mouseMovementX:0,mouseMovementY:0,calculateMouseEvent:function (event) { // event should be mousemove, mousedown or mouseup
        if (Browser.pointerLock) {
          // When the pointer is locked, calculate the coordinates
          // based on the movement of the mouse.
          // Workaround for Firefox bug 764498
          if (event.type != 'mousemove' &&
              ('mozMovementX' in event)) {
            Browser.mouseMovementX = Browser.mouseMovementY = 0;
          } else {
            Browser.mouseMovementX = Browser.getMovementX(event);
            Browser.mouseMovementY = Browser.getMovementY(event);
          }
          // check if SDL is available
          if (typeof SDL != "undefined") {
          	Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
          	Browser.mouseY = SDL.mouseY + Browser.mouseMovementY;
          } else {
          	// just add the mouse delta to the current absolut mouse position
          	// FIXME: ideally this should be clamped against the canvas size and zero
          	Browser.mouseX += Browser.mouseMovementX;
          	Browser.mouseY += Browser.mouseMovementY;
          }        
        } else {
          // Otherwise, calculate the movement based on the changes
          // in the coordinates.
          var rect = Module["canvas"].getBoundingClientRect();
          var x, y;
          if (event.type == 'touchstart' ||
              event.type == 'touchend' ||
              event.type == 'touchmove') {
            var t = event.touches.item(0);
            if (t) {
              x = t.pageX - (window.scrollX + rect.left);
              y = t.pageY - (window.scrollY + rect.top);
            } else {
              return;
            }
          } else {
            x = event.pageX - (window.scrollX + rect.left);
            y = event.pageY - (window.scrollY + rect.top);
          }
          // the canvas might be CSS-scaled compared to its backbuffer;
          // SDL-using content will want mouse coordinates in terms
          // of backbuffer units.
          var cw = Module["canvas"].width;
          var ch = Module["canvas"].height;
          x = x * (cw / rect.width);
          y = y * (ch / rect.height);
          Browser.mouseMovementX = x - Browser.mouseX;
          Browser.mouseMovementY = y - Browser.mouseY;
          Browser.mouseX = x;
          Browser.mouseY = y;
        }
      },xhrLoad:function (url, onload, onerror) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function xhr_onload() {
          if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            onload(xhr.response);
          } else {
            onerror();
          }
        };
        xhr.onerror = onerror;
        xhr.send(null);
      },asyncLoad:function (url, onload, onerror, noRunDep) {
        Browser.xhrLoad(url, function(arrayBuffer) {
          assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
          onload(new Uint8Array(arrayBuffer));
          if (!noRunDep) removeRunDependency('al ' + url);
        }, function(event) {
          if (onerror) {
            onerror();
          } else {
            throw 'Loading data file "' + url + '" failed.';
          }
        });
        if (!noRunDep) addRunDependency('al ' + url);
      },resizeListeners:[],updateResizeListeners:function () {
        var canvas = Module['canvas'];
        Browser.resizeListeners.forEach(function(listener) {
          listener(canvas.width, canvas.height);
        });
      },setCanvasSize:function (width, height, noUpdates) {
        var canvas = Module['canvas'];
        canvas.width = width;
        canvas.height = height;
        if (!noUpdates) Browser.updateResizeListeners();
      },windowedWidth:0,windowedHeight:0,setFullScreenCanvasSize:function () {
        var canvas = Module['canvas'];
        this.windowedWidth = canvas.width;
        this.windowedHeight = canvas.height;
        canvas.width = screen.width;
        canvas.height = screen.height;
        // check if SDL is available   
        if (typeof SDL != "undefined") {
        	var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        	flags = flags | 0x00800000; // set SDL_FULLSCREEN flag
        	HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        }
        Browser.updateResizeListeners();
      },setWindowedCanvasSize:function () {
        var canvas = Module['canvas'];
        canvas.width = this.windowedWidth;
        canvas.height = this.windowedHeight;
        // check if SDL is available       
        if (typeof SDL != "undefined") {
        	var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        	flags = flags & ~0x00800000; // clear SDL_FULLSCREEN flag
        	HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        }
        Browser.updateResizeListeners();
      }};
_llvm_eh_exception.buf = allocate(12, "void*", ALLOC_STATIC);
___errno_state = Runtime.staticAlloc(4); HEAP32[((___errno_state)>>2)]=0;
FS.staticInit();__ATINIT__.unshift({ func: function() { if (!Module["noFSInit"] && !FS.init.initialized) FS.init() } });__ATMAIN__.push({ func: function() { FS.ignorePermissions = false } });__ATEXIT__.push({ func: function() { FS.quit() } });Module["FS_createFolder"] = FS.createFolder;Module["FS_createPath"] = FS.createPath;Module["FS_createDataFile"] = FS.createDataFile;Module["FS_createPreloadedFile"] = FS.createPreloadedFile;Module["FS_createLazyFile"] = FS.createLazyFile;Module["FS_createLink"] = FS.createLink;Module["FS_createDevice"] = FS.createDevice;
__ATINIT__.unshift({ func: function() { TTY.init() } });__ATEXIT__.push({ func: function() { TTY.shutdown() } });TTY.utf8 = new Runtime.UTF8Processor();
if (ENVIRONMENT_IS_NODE) { var fs = require("fs"); NODEFS.staticInit(); }
__ATINIT__.push({ func: function() { SOCKFS.root = FS.mount(SOCKFS, {}, null); } });
_fgetc.ret = allocate([0], "i8", ALLOC_STATIC);
Module["requestFullScreen"] = function Module_requestFullScreen(lockPointer, resizeCanvas) { Browser.requestFullScreen(lockPointer, resizeCanvas) };
  Module["requestAnimationFrame"] = function Module_requestAnimationFrame(func) { Browser.requestAnimationFrame(func) };
  Module["setCanvasSize"] = function Module_setCanvasSize(width, height, noUpdates) { Browser.setCanvasSize(width, height, noUpdates) };
  Module["pauseMainLoop"] = function Module_pauseMainLoop() { Browser.mainLoop.pause() };
  Module["resumeMainLoop"] = function Module_resumeMainLoop() { Browser.mainLoop.resume() };
  Module["getUserMedia"] = function Module_getUserMedia() { Browser.getUserMedia() }
STACK_BASE = STACKTOP = Runtime.alignMemory(STATICTOP);
staticSealed = true; // seal the static portion of memory
STACK_MAX = STACK_BASE + 5242880;
DYNAMIC_BASE = DYNAMICTOP = Runtime.alignMemory(STACK_MAX);
assert(DYNAMIC_BASE < TOTAL_MEMORY, "TOTAL_MEMORY not big enough for stack");
 var cttz_i8 = allocate([8,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,7,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0], "i8", ALLOC_DYNAMIC);
var Math_min = Math.min;
function invoke_iiiiiiii(index,a1,a2,a3,a4,a5,a6,a7) {
  try {
    return Module["dynCall_iiiiiiii"](index,a1,a2,a3,a4,a5,a6,a7);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_iiiiiiddi(index,a1,a2,a3,a4,a5,a6,a7,a8) {
  try {
    return Module["dynCall_iiiiiiddi"](index,a1,a2,a3,a4,a5,a6,a7,a8);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_viiiii(index,a1,a2,a3,a4,a5) {
  try {
    Module["dynCall_viiiii"](index,a1,a2,a3,a4,a5);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_vi(index,a1) {
  try {
    Module["dynCall_vi"](index,a1);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_viiidii(index,a1,a2,a3,a4,a5,a6) {
  try {
    Module["dynCall_viiidii"](index,a1,a2,a3,a4,a5,a6);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_vii(index,a1,a2) {
  try {
    Module["dynCall_vii"](index,a1,a2);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_iiiiiii(index,a1,a2,a3,a4,a5,a6) {
  try {
    return Module["dynCall_iiiiiii"](index,a1,a2,a3,a4,a5,a6);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_ii(index,a1) {
  try {
    return Module["dynCall_ii"](index,a1);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_iddddiii(index,a1,a2,a3,a4,a5,a6,a7) {
  try {
    return Module["dynCall_iddddiii"](index,a1,a2,a3,a4,a5,a6,a7);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_id(index,a1) {
  try {
    return Module["dynCall_id"](index,a1);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_iiiiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11) {
  try {
    return Module["dynCall_iiiiiiiiiiii"](index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_viiiddddii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9) {
  try {
    Module["dynCall_viiiddddii"](index,a1,a2,a3,a4,a5,a6,a7,a8,a9);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_iiii(index,a1,a2,a3) {
  try {
    return Module["dynCall_iiii"](index,a1,a2,a3);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_viiiiiiiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15) {
  try {
    Module["dynCall_viiiiiiiiiiiiiii"](index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_viiiiid(index,a1,a2,a3,a4,a5,a6) {
  try {
    Module["dynCall_viiiiid"](index,a1,a2,a3,a4,a5,a6);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_viiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8) {
  try {
    Module["dynCall_viiiiiiii"](index,a1,a2,a3,a4,a5,a6,a7,a8);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_viiiiii(index,a1,a2,a3,a4,a5,a6) {
  try {
    Module["dynCall_viiiiii"](index,a1,a2,a3,a4,a5,a6);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_ddd(index,a1,a2) {
  try {
    return Module["dynCall_ddd"](index,a1,a2);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_fiii(index,a1,a2,a3) {
  try {
    return Module["dynCall_fiii"](index,a1,a2,a3);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_di(index,a1) {
  try {
    return Module["dynCall_di"](index,a1);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_v(index) {
  try {
    Module["dynCall_v"](index);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_iid(index,a1,a2) {
  try {
    return Module["dynCall_iid"](index,a1,a2);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_viiiiiii(index,a1,a2,a3,a4,a5,a6,a7) {
  try {
    Module["dynCall_viiiiiii"](index,a1,a2,a3,a4,a5,a6,a7);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_viiiiiid(index,a1,a2,a3,a4,a5,a6,a7) {
  try {
    Module["dynCall_viiiiiid"](index,a1,a2,a3,a4,a5,a6,a7);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_viiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9) {
  try {
    Module["dynCall_viiiiiiiii"](index,a1,a2,a3,a4,a5,a6,a7,a8,a9);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_viiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10) {
  try {
    Module["dynCall_viiiiiiiiii"](index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_iii(index,a1,a2) {
  try {
    return Module["dynCall_iii"](index,a1,a2);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_diii(index,a1,a2,a3) {
  try {
    return Module["dynCall_diii"](index,a1,a2,a3);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_dii(index,a1,a2) {
  try {
    return Module["dynCall_dii"](index,a1,a2);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_i(index) {
  try {
    return Module["dynCall_i"](index);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_iiiiii(index,a1,a2,a3,a4,a5) {
  try {
    return Module["dynCall_iiiiii"](index,a1,a2,a3,a4,a5);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_viii(index,a1,a2,a3) {
  try {
    Module["dynCall_viii"](index,a1,a2,a3);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_idi(index,a1,a2) {
  try {
    return Module["dynCall_idi"](index,a1,a2);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_iiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8) {
  try {
    return Module["dynCall_iiiiiiiii"](index,a1,a2,a3,a4,a5,a6,a7,a8);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_iiiii(index,a1,a2,a3,a4) {
  try {
    return Module["dynCall_iiiii"](index,a1,a2,a3,a4);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function invoke_viiii(index,a1,a2,a3,a4) {
  try {
    Module["dynCall_viiii"](index,a1,a2,a3,a4);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}
function asmPrintInt(x, y) {
  Module.print('int ' + x + ',' + y);// + ' ' + new Error().stack);
}
function asmPrintFloat(x, y) {
  Module.print('float ' + x + ',' + y);// + ' ' + new Error().stack);
}
// EMSCRIPTEN_START_ASM
var asm=(function(global,env,buffer){"use asm";var a=new global.Int8Array(buffer);var b=new global.Int16Array(buffer);var c=new global.Int32Array(buffer);var d=new global.Uint8Array(buffer);var e=new global.Uint16Array(buffer);var f=new global.Uint32Array(buffer);var g=new global.Float32Array(buffer);var h=new global.Float64Array(buffer);var i=env.STACKTOP|0;var j=env.STACK_MAX|0;var k=env.tempDoublePtr|0;var l=env.ABORT|0;var m=env.cttz_i8|0;var n=env.ctlz_i8|0;var o=env.___fsmu8|0;var p=env.__ZTIc|0;var q=env._stdout|0;var r=env.__ZTVN10__cxxabiv119__pointer_type_infoE|0;var s=env.___dso_handle|0;var t=env.__ZTVN10__cxxabiv117__class_type_infoE|0;var u=env._stdin|0;var v=env.__ZTVN10__cxxabiv120__si_class_type_infoE|0;var w=env._stderr|0;var x=+env.NaN;var y=+env.Infinity;var z=0;var A=0;var B=0;var C=0;var D=0,E=0,F=0,G=0,H=0.0,I=0,J=0,K=0,L=0.0;var M=0;var N=0;var O=0;var P=0;var Q=0;var R=0;var S=0;var T=0;var U=0;var V=0;var W=global.Math.floor;var X=global.Math.abs;var Y=global.Math.sqrt;var Z=global.Math.pow;var _=global.Math.cos;var $=global.Math.sin;var aa=global.Math.tan;var ab=global.Math.acos;var ac=global.Math.asin;var ad=global.Math.atan;var ae=global.Math.atan2;var af=global.Math.exp;var ag=global.Math.log;var ah=global.Math.ceil;var ai=global.Math.imul;var aj=env.abort;var ak=env.assert;var al=env.asmPrintInt;var am=env.asmPrintFloat;var an=env.min;var ao=env.invoke_iiiiiiii;var ap=env.invoke_iiiiiiddi;var aq=env.invoke_viiiii;var ar=env.invoke_vi;var as=env.invoke_viiidii;var at=env.invoke_vii;var au=env.invoke_iiiiiii;var av=env.invoke_ii;var aw=env.invoke_iddddiii;var ax=env.invoke_id;var ay=env.invoke_iiiiiiiiiiii;var az=env.invoke_viiiddddii;var aA=env.invoke_iiii;var aB=env.invoke_viiiiiiiiiiiiiii;var aC=env.invoke_viiiiid;var aD=env.invoke_viiiiiiii;var aE=env.invoke_viiiiii;var aF=env.invoke_ddd;var aG=env.invoke_fiii;var aH=env.invoke_di;var aI=env.invoke_v;var aJ=env.invoke_iid;var aK=env.invoke_viiiiiii;var aL=env.invoke_viiiiiid;var aM=env.invoke_viiiiiiiii;var aN=env.invoke_viiiiiiiiii;var aO=env.invoke_iii;var aP=env.invoke_diii;var aQ=env.invoke_dii;var aR=env.invoke_i;var aS=env.invoke_iiiiii;var aT=env.invoke_viii;var aU=env.invoke_idi;var aV=env.invoke_iiiiiiiii;var aW=env.invoke_iiiii;var aX=env.invoke_viiii;var aY=env._llvm_lifetime_end;var aZ=env._lseek;var a_=env.__scanString;var a$=env._fclose;var a0=env._pthread_mutex_lock;var a1=env.___cxa_end_catch;var a2=env._strtoull;var a3=env._fflush;var a4=env._strtol;var a5=env.__isLeapYear;var a6=env._fwrite;var a7=env._send;var a8=env._isspace;var a9=env._read;var ba=env._ceil;var bb=env.___cxa_bad_cast;var bc=env._fsync;var bd=env.___cxa_guard_abort;var be=env._newlocale;var bf=env.___gxx_personality_v0;var bg=env._pthread_cond_wait;var bh=env.___cxa_rethrow;var bi=env._fmod;var bj=env.___resumeException;var bk=env._round;var bl=env._memchr;var bm=env._llvm_va_end;var bn=env._vsscanf;var bo=env._snprintf;var bp=env._fgetc;var bq=env._ceilf;var br=env.__getFloat;var bs=env._atexit;var bt=env.___cxa_free_exception;var bu=env._close;var bv=env.___setErrNo;var bw=env._isxdigit;var bx=env._ftell;var by=env._exit;var bz=env._sprintf;var bA=env._asprintf;var bB=env.___ctype_b_loc;var bC=env._freelocale;var bD=env._catgets;var bE=env.___cxa_is_number_type;var bF=env._getcwd;var bG=env.___cxa_does_inherit;var bH=env.___cxa_guard_acquire;var bI=env.___cxa_begin_catch;var bJ=env._recv;var bK=env.__parseInt64;var bL=env._trunc;var bM=env.__ZSt18uncaught_exceptionv;var bN=env.___cxa_call_unexpected;var bO=env.___cxa_get_exception_ptr;var bP=env.__exit;var bQ=env._strftime;var bR=env.___cxa_throw;var bS=env._llvm_eh_exception;var bT=env._toupper;var bU=env._pread;var bV=env._fopen;var bW=env._open;var bX=env.__arraySum;var bY=env._sysconf;var bZ=env._isalnum;var b_=env._isalpha;var b$=env.___cxa_find_matching_catch;var b0=env._strdup;var b1=env.__formatString;var b2=env._pthread_cond_broadcast;var b3=env.__ZSt9terminatev;var b4=env._isascii;var b5=env._pthread_mutex_unlock;var b6=env._sbrk;var b7=env.___errno_location;var b8=env._strerror;var b9=env._catclose;var ca=env._llvm_lifetime_start;var cb=env.__parseInt;var cc=env.___cxa_guard_release;var cd=env._ungetc;var ce=env._uselocale;var cf=env._vsnprintf;var cg=env._sscanf;var ch=env.___assert_fail;var ci=env._fread;var cj=env._abort;var ck=env._isdigit;var cl=env._strtoll;var cm=env.__reallyNegative;var cn=env.__addDays;var co=env._fabs;var cp=env._floor;var cq=env._fseek;var cr=env.___cxa_bad_typeid;var cs=env._write;var ct=env.___cxa_allocate_exception;var cu=env._stat;var cv=env.___cxa_pure_virtual;var cw=env._vasprintf;var cx=env._catopen;var cy=env.___ctype_toupper_loc;var cz=env.___ctype_tolower_loc;var cA=env._llvm_eh_typeid_for;var cB=env._pwrite;var cC=env._strerror_r;var cD=env._time;var cE=0.0;
// EMSCRIPTEN_START_FUNCS
function Le(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;b=i;i=i+16|0;d=b|0;e=b+8|0;f=a+36|0;g=a+40|0;h=d|0;j=d+8|0;k=d;d=a+32|0;while(1){a=c[f>>2]|0;l=c7[c[(c[a>>2]|0)+20>>2]&31](a,c[g>>2]|0,h,j,e)|0;a=(c[e>>2]|0)-k|0;if((a6(h|0,1,a|0,c[d>>2]|0)|0)!=(a|0)){m=-1;n=8;break}if((l|0)==2){m=-1;n=6;break}else if((l|0)!=1){n=4;break}}if((n|0)==8){i=b;return m|0}else if((n|0)==6){i=b;return m|0}else if((n|0)==4){m=((a3(c[d>>2]|0)|0)!=0)<<31>>31;i=b;return m|0}return 0}function Lf(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0;if((a[b+44|0]&1)!=0){g=a6(e|0,1,f|0,c[b+32>>2]|0)|0;return g|0}h=b;if((f|0)>0){i=e;j=0}else{g=0;return g|0}while(1){if((c3[c[(c[h>>2]|0)+52>>2]&2047](b,d[i]|0)|0)==-1){g=j;k=9;break}e=j+1|0;if((e|0)<(f|0)){i=i+1|0;j=e}else{g=e;k=7;break}}if((k|0)==9){return g|0}else if((k|0)==7){return g|0}return 0}function Lg(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;e=i;i=i+32|0;f=e|0;g=e+8|0;h=e+16|0;j=e+24|0;k=(d|0)==-1;L1:do{if(!k){a[g]=d;if((a[b+44|0]&1)!=0){if((a6(g|0,1,1,c[b+32>>2]|0)|0)==1){break}else{l=-1}i=e;return l|0}m=f|0;c[h>>2]=m;n=g+1|0;o=b+36|0;p=b+40|0;q=f+8|0;r=f;s=b+32|0;t=g;while(1){u=c[o>>2]|0;v=da[c[(c[u>>2]|0)+12>>2]&31](u,c[p>>2]|0,t,n,j,m,q,h)|0;if((c[j>>2]|0)==(t|0)){l=-1;w=17;break}if((v|0)==3){w=7;break}u=(v|0)==1;if(v>>>0>=2>>>0){l=-1;w=13;break}v=(c[h>>2]|0)-r|0;if((a6(m|0,1,v|0,c[s>>2]|0)|0)!=(v|0)){l=-1;w=15;break}if(u){t=u?c[j>>2]|0:t}else{break L1}}if((w|0)==7){if((a6(t|0,1,1,c[s>>2]|0)|0)==1){break}else{l=-1}i=e;return l|0}else if((w|0)==13){i=e;return l|0}else if((w|0)==15){i=e;return l|0}else if((w|0)==17){i=e;return l|0}}}while(0);l=k?0:d;i=e;return l|0}function Lh(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;f=i;i=i+8|0;g=f|0;h=b|0;c[h>>2]=19840;j=b+4|0;Q_(j);TI(b+8|0,0,24)|0;c[h>>2]=20728;c[b+32>>2]=d;c[b+40>>2]=e;c[b+48>>2]=-1;a[b+52|0]=0;Q$(g,j);e=(z=0,aO(268,g|0,50512)|0);if(z){z=0;k=b$(-1,-1)|0;l=M;Q0(g);c[h>>2]=19840;Q0(j);bj(k|0)}d=e;m=b+36|0;c[m>>2]=d;n=b+44|0;c[n>>2]=cM[c[(c[e>>2]|0)+24>>2]&511](d)|0;d=c[m>>2]|0;a[b+53|0]=(cM[c[(c[d>>2]|0)+28>>2]&511](d)|0)&1;if((c[n>>2]|0)<=8){Q0(g);i=f;return}z=0;ar(64,728);if(!z){Q0(g);i=f;return}else{z=0;k=b$(-1,-1)|0;l=M;Q0(g);c[h>>2]=19840;Q0(j);bj(k|0)}}function Li(a){a=a|0;c[a>>2]=19840;Q0(a+4|0);return}function Lj(a){a=a|0;c[a>>2]=19840;Q0(a+4|0);Tw(a);return}function Lk(b,d){b=b|0;d=d|0;var e=0,f=0,g=0;e=Q2(d,50512)|0;d=e;f=b+36|0;c[f>>2]=d;g=b+44|0;c[g>>2]=cM[c[(c[e>>2]|0)+24>>2]&511](d)|0;d=c[f>>2]|0;a[b+53|0]=(cM[c[(c[d>>2]|0)+28>>2]&511](d)|0)&1;if((c[g>>2]|0)<=8){return}Qk(728);return}function Ll(a){a=a|0;return Lo(a,0)|0}function Lm(a){a=a|0;return Lo(a,1)|0}function Ln(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;e=i;i=i+32|0;f=e|0;g=e+8|0;h=e+16|0;j=e+24|0;k=b+52|0;l=(a[k]&1)!=0;if((d|0)==-1){if(l){m=-1;i=e;return m|0}n=c[b+48>>2]|0;a[k]=(n|0)!=-1|0;m=n;i=e;return m|0}n=b+48|0;L8:do{if(l){a[h]=c[n>>2];o=c[b+36>>2]|0;p=f|0;q=da[c[(c[o>>2]|0)+12>>2]&31](o,c[b+40>>2]|0,h,h+1|0,j,p,f+8|0,g)|0;if((q|0)==3){a[p]=c[n>>2];c[g>>2]=f+1}else if((q|0)==2|(q|0)==1){m=-1;i=e;return m|0}q=b+32|0;while(1){o=c[g>>2]|0;if(o>>>0<=p>>>0){break L8}r=o-1|0;c[g>>2]=r;if((cd(a[r]|0,c[q>>2]|0)|0)==-1){m=-1;break}}i=e;return m|0}}while(0);c[n>>2]=d;a[k]=1;m=d;i=e;return m|0}function Lo(b,e){b=b|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0;f=i;i=i+32|0;g=f|0;h=f+8|0;j=f+16|0;k=f+24|0;l=b+52|0;if((a[l]&1)!=0){m=b+48|0;n=c[m>>2]|0;if(!e){o=n;i=f;return o|0}c[m>>2]=-1;a[l]=0;o=n;i=f;return o|0}n=c[b+44>>2]|0;l=(n|0)>1?n:1;L8:do{if((l|0)>0){n=b+32|0;m=0;while(1){p=bp(c[n>>2]|0)|0;if((p|0)==-1){o=-1;break}a[g+m|0]=p;m=m+1|0;if((m|0)>=(l|0)){break L8}}i=f;return o|0}}while(0);L15:do{if((a[b+53|0]&1)==0){m=b+40|0;n=b+36|0;p=g|0;q=h+1|0;r=b+32|0;s=l;while(1){t=c[m>>2]|0;u=t;v=c[u>>2]|0;w=c[u+4>>2]|0;u=c[n>>2]|0;x=g+s|0;y=da[c[(c[u>>2]|0)+16>>2]&31](u,t,p,x,j,h,q,k)|0;if((y|0)==2){o=-1;z=25;break}else if((y|0)==3){z=14;break}else if((y|0)!=1){A=s;break L15}y=c[m>>2]|0;c[y>>2]=v;c[y+4>>2]=w;if((s|0)==8){o=-1;z=28;break}w=bp(c[r>>2]|0)|0;if((w|0)==-1){o=-1;z=24;break}a[x]=w;s=s+1|0}if((z|0)==25){i=f;return o|0}else if((z|0)==24){i=f;return o|0}else if((z|0)==28){i=f;return o|0}else if((z|0)==14){a[h]=a[p]|0;A=s;break}}else{a[h]=a[g|0]|0;A=l}}while(0);do{if(e){l=a[h]|0;c[b+48>>2]=l&255;B=l}else{l=b+32|0;k=A;while(1){if((k|0)<=0){z=21;break}j=k-1|0;if((cd(d[g+j|0]|0|0,c[l>>2]|0)|0)==-1){o=-1;z=31;break}else{k=j}}if((z|0)==31){i=f;return o|0}else if((z|0)==21){B=a[h]|0;break}}}while(0);o=B&255;i=f;return o|0}function Lp(){KX(0);bs(122,51264,s|0)|0;return}function Lq(a){a=a|0;return}function Lr(a){a=a|0;var b=0;b=a+4|0;K=c[b>>2]|0,c[b>>2]=K+1,K;return}function Ls(a){a=a|0;var b=0,d=0;b=a+4|0;if(((K=c[b>>2]|0,c[b>>2]=K+ -1,K)|0)!=0){d=0;return d|0}cI[c[(c[a>>2]|0)+8>>2]&1023](a);d=1;return d|0}function Lt(a){a=a|0;var b=0;b=a+4|0;K=c[b>>2]|0,c[b>>2]=K+1,K;return}function Lu(a){a=a|0;var b=0;b=a+4|0;if(((K=c[b>>2]|0,c[b>>2]=K+ -1,K)|0)!=0){return}cI[c[(c[a>>2]|0)+8>>2]&1023](a|0);b=a+8|0;if(((K=c[b>>2]|0,c[b>>2]=K+ -1,K)|0)!=0){return}cI[c[(c[a>>2]|0)+16>>2]&1023](a);return}function Lv(a,b){a=a|0;b=b|0;return 0}function Lw(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0;e=i;i=i+16|0;f=e|0;if((a[d]&1)==0){g=d+1|0}else{g=c[d+8>>2]|0}h=bW(g|0,0,(g=i,i=i+1|0,i=i+7&-8,c[g>>2]=0,g)|0)|0;i=g;c[b>>2]=h;if((h|0)>=1){i=e;return}h=c[(b7()|0)>>2]|0;Mu(f,12408,d);d=f;if((a[d]&1)==0){j=f+1|0}else{j=c[f+8>>2]|0}z=0;at(534,h|0,j|0);if(!z){if((a[d]&1)==0){i=e;return}Tw(c[f+8>>2]|0);i=e;return}else{z=0;e=b$(-1,-1)|0;if((a[d]&1)==0){bj(e|0)}Tw(c[f+8>>2]|0);bj(e|0)}}function Lx(a){a=a|0;z=0,av(96,c[a>>2]|0)|0;if(!z){return}else{z=0;a=b$(-1,-1,0)|0;fi(a)}}function Ly(a){a=a|0;var b=0,d=0;b=i;i=i+8|0;d=b|0;a9(c[a>>2]|0,d|0,4)|0;i=b;return c[d>>2]|0}function Lz(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;c[a>>2]=17768;d=TJ(b|0)|0;e=Tv(d+13|0)|0;c[e+4>>2]=d;c[e>>2]=d;f=e+12|0;c[a+4>>2]=f;c[e+8>>2]=0;TF(f|0,b|0,d+1|0)|0;return}function LA(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=17768;b=a+4|0;d=(c[b>>2]|0)-4|0;if(((K=c[d>>2]|0,c[d>>2]=K+ -1,K)-1|0)>=0){e=a;Tw(e);return}Tx((c[b>>2]|0)-12|0);e=a;Tw(e);return}function LB(a){a=a|0;var b=0;c[a>>2]=17768;b=a+4|0;a=(c[b>>2]|0)-4|0;if(((K=c[a>>2]|0,c[a>>2]=K+ -1,K)-1|0)>=0){return}Tx((c[b>>2]|0)-12|0);return}function LC(a){a=a|0;return c[a+4>>2]|0}function LD(b,d){b=b|0;d=d|0;var e=0,f=0,g=0;c[b>>2]=17672;if((a[d]&1)==0){e=d+1|0}else{e=c[d+8>>2]|0}d=TJ(e|0)|0;f=Tv(d+13|0)|0;c[f+4>>2]=d;c[f>>2]=d;g=f+12|0;c[b+4>>2]=g;c[f+8>>2]=0;TF(g|0,e|0,d+1|0)|0;return}function LE(a,b){a=a|0;b=b|0;var d=0,e=0,f=0;c[a>>2]=17672;d=TJ(b|0)|0;e=Tv(d+13|0)|0;c[e+4>>2]=d;c[e>>2]=d;f=e+12|0;c[a+4>>2]=f;c[e+8>>2]=0;TF(f|0,b|0,d+1|0)|0;return}function LF(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=17672;b=a+4|0;d=(c[b>>2]|0)-4|0;if(((K=c[d>>2]|0,c[d>>2]=K+ -1,K)-1|0)>=0){e=a;Tw(e);return}Tx((c[b>>2]|0)-12|0);e=a;Tw(e);return}function LG(a){a=a|0;var b=0;c[a>>2]=17672;b=a+4|0;a=(c[b>>2]|0)-4|0;if(((K=c[a>>2]|0,c[a>>2]=K+ -1,K)-1|0)>=0){return}Tx((c[b>>2]|0)-12|0);return}function LH(a){a=a|0;return c[a+4>>2]|0}function LI(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=17768;b=a+4|0;d=(c[b>>2]|0)-4|0;if(((K=c[d>>2]|0,c[d>>2]=K+ -1,K)-1|0)>=0){e=a;Tw(e);return}Tx((c[b>>2]|0)-12|0);e=a;Tw(e);return}function LJ(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=17768;b=a+4|0;d=(c[b>>2]|0)-4|0;if(((K=c[d>>2]|0,c[d>>2]=K+ -1,K)-1|0)>=0){e=a;Tw(e);return}Tx((c[b>>2]|0)-12|0);e=a;Tw(e);return}function LK(a){a=a|0;var b=0,d=0,e=0;c[a>>2]=17672;b=a+4|0;d=(c[b>>2]|0)-4|0;if(((K=c[d>>2]|0,c[d>>2]=K+ -1,K)-1|0)>=0){e=a;Tw(e);return}Tx((c[b>>2]|0)-12|0);e=a;Tw(e);return}function LL(a){a=a|0;return}function LM(a,b,d){a=a|0;b=b|0;d=d|0;c[a>>2]=d;c[a+4>>2]=b;return}function LN(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;e=i;i=i+8|0;f=e|0;c8[c[(c[a>>2]|0)+12>>2]&511](f,a,b);if((c[f+4>>2]|0)!=(c[d+4>>2]|0)){g=0;i=e;return g|0}g=(c[f>>2]|0)==(c[d>>2]|0);i=e;return g|0}function LO(a,b,d){a=a|0;b=b|0;d=d|0;var e=0;if((c[b+4>>2]|0)!=(a|0)){e=0;return e|0}e=(c[b>>2]|0)==(d|0);return e|0}function LP(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;d=b8(e|0)|0;e=TJ(d|0)|0;if(e>>>0>4294967279>>>0){L4(0)}if(e>>>0<11>>>0){a[b]=e<<1;f=b+1|0;TF(f|0,d|0,e)|0;g=f+e|0;a[g]=0;return}else{h=e+16&-16;i=Tu(h)|0;c[b+8>>2]=i;c[b>>2]=h|1;c[b+4>>2]=e;f=i;TF(f|0,d|0,e)|0;g=f+e|0;a[g]=0;return}}function LQ(a){a=a|0;return 8640}function LR(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;d=b8(e|0)|0;e=TJ(d|0)|0;if(e>>>0>4294967279>>>0){L4(0)}if(e>>>0<11>>>0){a[b]=e<<1;f=b+1|0;TF(f|0,d|0,e)|0;g=f+e|0;a[g]=0;return}else{h=e+16&-16;i=Tu(h)|0;c[b+8>>2]=i;c[b>>2]=h|1;c[b+4>>2]=e;f=i;TF(f|0,d|0,e)|0;g=f+e|0;a[g]=0;return}}function LS(a){a=a|0;return}function LT(a){a=a|0;return 14272}function LU(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;d=b8(e|0)|0;e=TJ(d|0)|0;if(e>>>0>4294967279>>>0){L4(0)}if(e>>>0<11>>>0){a[b]=e<<1;f=b+1|0;TF(f|0,d|0,e)|0;g=f+e|0;a[g]=0;return}else{h=e+16&-16;i=Tu(h)|0;c[b+8>>2]=i;c[b>>2]=h|1;c[b+4>>2]=e;f=i;TF(f|0,d|0,e)|0;g=f+e|0;a[g]=0;return}}function LV(b,d,e){b=b|0;d=d|0;e=e|0;do{if((a[53968]|0)==0){if((bH(53968)|0)==0){break}c[12318]=19232}}while(0);c[b>>2]=e;c[b+4>>2]=49272;return}function LW(a){a=a|0;return}function LX(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;g=i;h=f;j=i;i=i+12|0;i=i+7&-8;k=e|0;l=c[k>>2]|0;do{if((l|0)!=0){m=d[h]|0;if((m&1|0)==0){n=m>>>1}else{n=c[f+4>>2]|0}if((n|0)==0){o=l}else{Mh(f,11632,2)|0;o=c[k>>2]|0}m=c[e+4>>2]|0;c8[c[(c[m>>2]|0)+24>>2]&511](j,m,o);m=j;p=a[m]|0;if((p&1)==0){q=j+1|0}else{q=c[j+8>>2]|0}r=p&255;if((r&1|0)==0){s=r>>>1}else{s=c[j+4>>2]|0}z=0,aA(80,f|0,q|0,s|0)|0;if(!z){if((a[m]&1)==0){break}Tw(c[j+8>>2]|0);break}else{z=0}r=b$(-1,-1)|0;if((a[m]&1)==0){bj(r|0)}Tw(c[j+8>>2]|0);bj(r|0)}}while(0);j=b;c[j>>2]=c[h>>2];c[j+4>>2]=c[h+4>>2];c[j+8>>2]=c[h+8>>2];TI(h|0,0,12)|0;i=g;return}function LY(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0;f=i;i=i+32|0;g=d;d=i;i=i+8|0;c[d>>2]=c[g>>2];c[d+4>>2]=c[g+4>>2];g=f|0;h=f+16|0;j=TJ(e|0)|0;if(j>>>0>4294967279>>>0){L4(0)}if(j>>>0<11>>>0){a[h]=j<<1;k=h+1|0}else{l=j+16&-16;m=Tu(l)|0;c[h+8>>2]=m;c[h>>2]=l|1;c[h+4>>2]=j;k=m}TF(k|0,e|0,j)|0;a[k+j|0]=0;z=0;aT(194,g|0,d|0,h|0);do{if(!z){z=0;at(122,b|0,g|0);if(z){z=0;j=b$(-1,-1)|0;k=j;j=M;if((a[g]&1)==0){n=j;o=k;break}Tw(c[g+8>>2]|0);n=j;o=k;break}if((a[g]&1)!=0){Tw(c[g+8>>2]|0)}if((a[h]&1)==0){p=b|0;c[p>>2]=20224;q=b+8|0;r=d;s=q;t=r|0;u=c[t>>2]|0;v=r+4|0;w=c[v>>2]|0;x=s|0;c[x>>2]=u;y=s+4|0;c[y>>2]=w;i=f;return}Tw(c[h+8>>2]|0);p=b|0;c[p>>2]=20224;q=b+8|0;r=d;s=q;t=r|0;u=c[t>>2]|0;v=r+4|0;w=c[v>>2]|0;x=s|0;c[x>>2]=u;y=s+4|0;c[y>>2]=w;i=f;return}else{z=0;k=b$(-1,-1)|0;n=M;o=k}}while(0);if((a[h]&1)==0){A=o;B=0;C=A;D=n;bj(C|0)}Tw(c[h+8>>2]|0);A=o;B=0;C=A;D=n;bj(C|0)}function LZ(a){a=a|0;LG(a|0);Tw(a);return}function L_(a){a=a|0;LG(a|0);return}function L$(b,d){b=b|0;d=d|0;var e=0,f=0,g=0;e=i;i=i+8|0;f=e|0;e=ct(16)|0;g=e;do{if((a[53976]|0)==0){if((bH(53976)|0)==0){break}c[12320]=19280}}while(0);c[f>>2]=b;c[f+4>>2]=49280;z=0;aT(320,g|0,f|0,d|0);if(!z){bR(e|0,36928,302)}else{z=0;d=b$(-1,-1)|0;bt(e|0);bj(d|0)}}function L0(a){a=a|0;Tw(a);return}function L1(a){a=a|0;Tw(a);return}function L2(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0;if(a>>>0<212>>>0){b=39440;d=48;L2:while(1){e=d;while(1){if((e|0)==0){break L2}f=(e|0)/2|0;if((c[b+(f<<2)>>2]|0)>>>0<a>>>0){break}else{e=f}}b=b+(f+1<<2)|0;d=e-1-f|0}g=c[b>>2]|0;return g|0}if(a>>>0>4294967291>>>0){b=ct(8)|0;z=0;at(402,b|0,4680);if(!z){c[b>>2]=17640;bR(b|0,35496,186);return 0}else{z=0;f=b$(-1,-1)|0;bt(b|0);bj(f|0)}}f=(a>>>0)/210|0;b=f*210|0;d=a-b|0;a=39248;h=48;L17:while(1){i=h;while(1){if((i|0)==0){break L17}j=(i|0)/2|0;if((c[a+(j<<2)>>2]|0)>>>0<d>>>0){break}else{i=j}}a=a+(j+1<<2)|0;h=i-1-j|0}j=a-39248>>2;a=f;f=j;h=(c[39248+(j<<2)>>2]|0)+b|0;L24:while(1){b=5;while(1){j=c[39440+(b<<2)>>2]|0;d=(h>>>0)/(j>>>0)|0;if(d>>>0<j>>>0){g=h;k=148;break L24}e=b+1|0;if((h|0)==(ai(d,j)|0)){break}if(e>>>0<47>>>0){b=e}else{k=21;break}}L30:do{if((k|0)==21){k=0;if(h>>>0<44521>>>0){g=h;k=170;break L24}b=211;i=(h>>>0)/211|0;while(1){if((h|0)==(ai(i,b)|0)){break L30}e=b+10|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=165;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+12|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=135;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+16|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=169;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+18|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=152;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+22|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=124;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+28|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=162;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+30|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=132;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+36|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=134;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+40|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=168;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+42|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=138;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+46|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=126;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+52|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=130;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+58|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=167;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+60|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=136;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+66|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=123;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+70|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=151;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+72|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=122;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+78|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=166;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+82|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=160;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+88|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=163;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+96|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=164;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+100|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=131;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+102|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=128;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+106|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=133;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+108|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=125;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+112|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=150;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+120|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=137;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+126|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=147;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+130|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=144;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+136|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=145;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+138|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=141;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+142|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=146;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+148|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=143;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+150|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=121;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+156|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=142;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+162|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=149;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+166|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=161;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+168|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=156;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+172|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=157;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+178|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=171;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+180|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=154;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+186|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=155;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+190|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=158;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+192|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=159;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+196|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=153;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+198|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=139;break L24}if((h|0)==(ai(j,e)|0)){break L30}e=b+208|0;j=(h>>>0)/(e>>>0)|0;if(j>>>0<e>>>0){g=h;k=140;break L24}d=b+210|0;if((h|0)==(ai(j,e)|0)){break L30}e=(h>>>0)/(d>>>0)|0;if(e>>>0<d>>>0){g=h;k=129;break L24}else{b=d;i=e}}}}while(0);i=f+1|0;b=(i|0)==48;e=b?0:i;i=(b&1)+a|0;a=i;f=e;h=(c[39248+(e<<2)>>2]|0)+(i*210|0)|0}if((k|0)==161){return g|0}else if((k|0)==162){return g|0}else if((k|0)==163){return g|0}else if((k|0)==164){return g|0}else if((k|0)==165){return g|0}else if((k|0)==166){return g|0}else if((k|0)==167){return g|0}else if((k|0)==168){return g|0}else if((k|0)==169){return g|0}else if((k|0)==170){return g|0}else if((k|0)==171){return g|0}else if((k|0)==146){return g|0}else if((k|0)==147){return g|0}else if((k|0)==148){return g|0}else if((k|0)==149){return g|0}else if((k|0)==150){return g|0}else if((k|0)==151){return g|0}else if((k|0)==152){return g|0}else if((k|0)==153){return g|0}else if((k|0)==154){return g|0}else if((k|0)==155){return g|0}else if((k|0)==156){return g|0}else if((k|0)==157){return g|0}else if((k|0)==158){return g|0}else if((k|0)==159){return g|0}else if((k|0)==160){return g|0}else if((k|0)==131){return g|0}else if((k|0)==132){return g|0}else if((k|0)==133){return g|0}else if((k|0)==134){return g|0}else if((k|0)==135){return g|0}else if((k|0)==136){return g|0}else if((k|0)==137){return g|0}else if((k|0)==138){return g|0}else if((k|0)==139){return g|0}else if((k|0)==140){return g|0}else if((k|0)==141){return g|0}else if((k|0)==142){return g|0}else if((k|0)==143){return g|0}else if((k|0)==144){return g|0}else if((k|0)==145){return g|0}else if((k|0)==121){return g|0}else if((k|0)==122){return g|0}else if((k|0)==123){return g|0}else if((k|0)==124){return g|0}else if((k|0)==125){return g|0}else if((k|0)==126){return g|0}else if((k|0)==128){return g|0}else if((k|0)==129){return g|0}else if((k|0)==130){return g|0}return 0}function L3(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0;e;if((c[a>>2]|0)==1){do{bg(50264,50240)|0;}while((c[a>>2]|0)==1)}if((c[a>>2]|0)!=0){f;return}c[a>>2]=1;z=0,av(348,50240)|0;do{if(!z){z=0;ar(d|0,b|0);if(z){z=0;break}z=0,av(12,50240)|0;if(z){z=0;break}c[a>>2]=-1;z=0,av(348,50240)|0;if(z){z=0;break}z=0,av(148,50264)|0;if(z){z=0;break}return}else{z=0}}while(0);b=b$(-1,-1,0)|0;bI(b|0)|0;z=0,av(12,50240)|0;do{if(!z){c[a>>2]=0;z=0,av(348,50240)|0;if(z){z=0;break}z=0,av(148,50264)|0;if(z){z=0;break}z=0;aI(8);if(z){z=0;break}}else{z=0}}while(0);a=b$(-1,-1)|0;z=0;aI(2);if(!z){bj(a|0)}else{z=0;a=b$(-1,-1,0)|0;fi(a)}}function L4(a){a=a|0;var b=0;a=ct(8)|0;z=0;at(156,a|0,1888);if(!z){c[a>>2]=17736;bR(a|0,35544,550)}else{z=0;b=b$(-1,-1)|0;bt(a|0);bj(b|0)}}function L5(a){a=a|0;var b=0;a=ct(8)|0;z=0;at(156,a|0,1888);if(!z){c[a>>2]=17704;bR(a|0,35528,10)}else{z=0;b=b$(-1,-1)|0;bt(a|0);bj(b|0)}}function L6(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0;e=d;if((a[e]&1)==0){f=b;c[f>>2]=c[e>>2];c[f+4>>2]=c[e+4>>2];c[f+8>>2]=c[e+8>>2];return}e=c[d+8>>2]|0;f=c[d+4>>2]|0;if(f>>>0>4294967279>>>0){L4(0)}if(f>>>0<11>>>0){a[b]=f<<1;g=b+1|0}else{d=f+16&-16;h=Tu(d)|0;c[b+8>>2]=h;c[b>>2]=d|1;c[b+4>>2]=f;g=h}TF(g|0,e|0,f)|0;a[g+f|0]=0;return}function L7(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;if(e>>>0>4294967279>>>0){L4(0)}if(e>>>0<11>>>0){a[b]=e<<1;f=b+1|0;TF(f|0,d|0,e)|0;g=f+e|0;a[g]=0;return}else{h=e+16&-16;i=Tu(h)|0;c[b+8>>2]=i;c[b>>2]=h|1;c[b+4>>2]=e;f=i;TF(f|0,d|0,e)|0;g=f+e|0;a[g]=0;return}}function L8(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;if(d>>>0>4294967279>>>0){L4(0)}if(d>>>0<11>>>0){a[b]=d<<1;f=b+1|0}else{g=d+16&-16;h=Tu(g)|0;c[b+8>>2]=h;c[b>>2]=g|1;c[b+4>>2]=d;f=h}TI(f|0,e|0,d|0)|0;a[f+d|0]=0;return}function L9(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,i=0,j=0,k=0,l=0;g=a[d]|0;h=g&255;if((h&1|0)==0){i=h>>>1}else{i=c[d+4>>2]|0}if(i>>>0<e>>>0){L5(0)}if((g&1)==0){j=d+1|0}else{j=c[d+8>>2]|0}d=j+e|0;j=i-e|0;e=j>>>0<f>>>0?j:f;if(e>>>0>4294967279>>>0){L4(0)}if(e>>>0<11>>>0){a[b]=e<<1;k=b+1|0;TF(k|0,d|0,e)|0;l=k+e|0;a[l]=0;return}else{f=e+16&-16;j=Tu(f)|0;c[b+8>>2]=j;c[b>>2]=f|1;c[b+4>>2]=e;k=j;TF(k|0,d|0,e)|0;l=k+e|0;a[l]=0;return}}function Ma(b){b=b|0;if((a[b]&1)==0){return}Tw(c[b+8>>2]|0);return}function Mb(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;if((b|0)==(d|0)){return b|0}e=a[d]|0;if((e&1)==0){f=d+1|0}else{f=c[d+8>>2]|0}g=e&255;if((g&1|0)==0){h=g>>>1}else{h=c[d+4>>2]|0}d=b;g=b;e=a[g]|0;if((e&1)==0){i=10;j=e}else{e=c[b>>2]|0;i=(e&-2)-1|0;j=e&255}if(i>>>0<h>>>0){e=j&255;if((e&1|0)==0){k=e>>>1}else{k=c[b+4>>2]|0}Mi(b,i,h-i|0,k,0,k,h,f);return b|0}if((j&1)==0){l=d+1|0}else{l=c[b+8>>2]|0}TG(l|0,f|0,h|0)|0;a[l+h|0]=0;if((a[g]&1)==0){a[g]=h<<1;return b|0}else{c[b+4>>2]=h;return b|0}return 0}function Mc(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;e=TJ(d|0)|0;f=b;g=b;h=a[g]|0;if((h&1)==0){i=10;j=h}else{h=c[b>>2]|0;i=(h&-2)-1|0;j=h&255}if(i>>>0<e>>>0){h=j&255;if((h&1|0)==0){k=h>>>1}else{k=c[b+4>>2]|0}Mi(b,i,e-i|0,k,0,k,e,d);return b|0}if((j&1)==0){l=f+1|0}else{l=c[b+8>>2]|0}TG(l|0,d|0,e|0)|0;a[l+e|0]=0;if((a[g]&1)==0){a[g]=e<<1;return b|0}else{c[b+4>>2]=e;return b|0}return 0}function Md(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;f=b;g=a[f]|0;h=g&255;if((h&1|0)==0){i=h>>>1}else{i=c[b+4>>2]|0}if(i>>>0<d>>>0){Me(b,d-i|0,e)|0;return}if((g&1)==0){a[b+1+d|0]=0;a[f]=d<<1;return}else{a[(c[b+8>>2]|0)+d|0]=0;c[b+4>>2]=d;return}}function Me(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0;if((d|0)==0){return b|0}f=b;g=a[f]|0;if((g&1)==0){h=10;i=g}else{g=c[b>>2]|0;h=(g&-2)-1|0;i=g&255}g=i&255;if((g&1|0)==0){j=g>>>1}else{j=c[b+4>>2]|0}if((h-j|0)>>>0<d>>>0){Mj(b,h,d-h+j|0,j,j,0,0);k=a[f]|0}else{k=i}if((k&1)==0){l=b+1|0}else{l=c[b+8>>2]|0}TI(l+j|0,e|0,d|0)|0;e=j+d|0;if((a[f]&1)==0){a[f]=e<<1}else{c[b+4>>2]=e}a[l+e|0]=0;return b|0}function Mf(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;if(d>>>0>4294967279>>>0){L4(0)}e=b;f=b;g=a[f]|0;if((g&1)==0){h=10;i=g}else{g=c[b>>2]|0;h=(g&-2)-1|0;i=g&255}g=i&255;if((g&1|0)==0){j=g>>>1}else{j=c[b+4>>2]|0}g=j>>>0>d>>>0?j:d;if(g>>>0<11>>>0){k=11}else{k=g+16&-16}g=k-1|0;if((g|0)==(h|0)){return}if((g|0)==10){l=e+1|0;m=c[b+8>>2]|0;n=1;o=0}else{do{if(g>>>0>h>>>0){p=Tu(k)|0}else{d=(z=0,av(316,k|0)|0);if(!z){p=d;break}else{z=0}d=b$(-1,-1,0)|0;bI(d|0)|0;a1();return}}while(0);h=i&1;if(h<<24>>24==0){q=e+1|0}else{q=c[b+8>>2]|0}l=p;m=q;n=h<<24>>24!=0;o=1}h=i&255;if((h&1|0)==0){r=h>>>1}else{r=c[b+4>>2]|0}TF(l|0,m|0,r+1|0)|0;if(n){Tw(m)}if(o){c[b>>2]=k|1;c[b+4>>2]=j;c[b+8>>2]=l;return}else{a[f]=j<<1;return}}function Mg(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;e=b;f=a[e]|0;if((f&1)==0){g=(f&255)>>>1;h=10}else{g=c[b+4>>2]|0;h=(c[b>>2]&-2)-1|0}if((g|0)==(h|0)){Mj(b,h,1,h,h,0,0);i=a[e]|0}else{i=f}if((i&1)==0){a[e]=(g<<1)+2;j=b+1|0;k=g+1|0;l=j+g|0;a[l]=d;m=j+k|0;a[m]=0;return}else{e=c[b+8>>2]|0;i=g+1|0;c[b+4>>2]=i;j=e;k=i;l=j+g|0;a[l]=d;m=j+k|0;a[m]=0;return}}function Mh(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0;f=b;g=a[f]|0;if((g&1)==0){h=10;i=g}else{g=c[b>>2]|0;h=(g&-2)-1|0;i=g&255}g=i&255;if((g&1|0)==0){j=g>>>1}else{j=c[b+4>>2]|0}if((h-j|0)>>>0<e>>>0){Mi(b,h,e-h+j|0,j,j,0,e,d);return b|0}if((e|0)==0){return b|0}if((i&1)==0){k=b+1|0}else{k=c[b+8>>2]|0}TF(k+j|0,d|0,e)|0;d=j+e|0;if((a[f]&1)==0){a[f]=d<<1}else{c[b+4>>2]=d}a[k+d|0]=0;return b|0}function Mi(b,d,e,f,g,h,i,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;if((-18-d|0)>>>0<e>>>0){L4(0)}if((a[b]&1)==0){k=b+1|0}else{k=c[b+8>>2]|0}do{if(d>>>0<2147483623>>>0){l=e+d|0;m=d<<1;n=l>>>0<m>>>0?m:l;if(n>>>0<11>>>0){o=11;break}o=n+16&-16}else{o=-17}}while(0);e=Tu(o)|0;if((g|0)!=0){TF(e|0,k|0,g)|0}if((i|0)!=0){TF(e+g|0,j|0,i)|0}j=f-h|0;if((j|0)!=(g|0)){TF(e+(i+g)|0,k+(h+g)|0,j-g|0)|0}if((d|0)==10){p=b+8|0;c[p>>2]=e;q=o|1;r=b|0;c[r>>2]=q;s=j+i|0;t=b+4|0;c[t>>2]=s;u=e+s|0;a[u]=0;return}Tw(k);p=b+8|0;c[p>>2]=e;q=o|1;r=b|0;c[r>>2]=q;s=j+i|0;t=b+4|0;c[t>>2]=s;u=e+s|0;a[u]=0;return}function Mj(b,d,e,f,g,h,i){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;if((-17-d|0)>>>0<e>>>0){L4(0)}if((a[b]&1)==0){j=b+1|0}else{j=c[b+8>>2]|0}do{if(d>>>0<2147483623>>>0){k=e+d|0;l=d<<1;m=k>>>0<l>>>0?l:k;if(m>>>0<11>>>0){n=11;break}n=m+16&-16}else{n=-17}}while(0);e=Tu(n)|0;if((g|0)!=0){TF(e|0,j|0,g)|0}m=f-h|0;if((m|0)!=(g|0)){TF(e+(i+g)|0,j+(h+g)|0,m-g|0)|0}if((d|0)==10){o=b+8|0;c[o>>2]=e;p=n|1;q=b|0;c[q>>2]=p;return}Tw(j);o=b+8|0;c[o>>2]=e;p=n|1;q=b|0;c[q>>2]=p;return}function Mk(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;g=b;h=a[g]|0;i=h&255;if((i&1|0)==0){j=i>>>1}else{j=c[b+4>>2]|0}if(j>>>0<d>>>0){L5(0);return 0}if((h&1)==0){k=10;l=h}else{h=c[b>>2]|0;k=(h&-2)-1|0;l=h&255}if((k-j|0)>>>0<f>>>0){Mi(b,k,j+f-k|0,j,d,0,f,e);return b|0}if((f|0)==0){return b|0}if((l&1)==0){m=b+1|0}else{m=c[b+8>>2]|0}l=j-d|0;k=m+d|0;if((j|0)==(d|0)){n=e}else{do{if(k>>>0>e>>>0){o=e}else{if((m+j|0)>>>0<=e>>>0){o=e;break}o=e+f|0}}while(0);TG(m+(f+d)|0,k|0,l|0)|0;n=o}TG(k|0,n|0,f|0)|0;n=j+f|0;if((a[g]&1)==0){a[g]=n<<1}else{c[b+4>>2]=n}a[m+n|0]=0;return b|0}function Ml(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0;if(e>>>0>1073741807>>>0){L4(0)}if(e>>>0<2>>>0){a[b]=e<<1;f=b+4|0;g=SX(f,d,e)|0;h=f+(e<<2)|0;c[h>>2]=0;return}else{i=e+4&-4;j=Tu(i<<2)|0;c[b+8>>2]=j;c[b>>2]=i|1;c[b+4>>2]=e;f=j;g=SX(f,d,e)|0;h=f+(e<<2)|0;c[h>>2]=0;return}}function Mm(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0;if(d>>>0>1073741807>>>0){L4(0)}if(d>>>0<2>>>0){a[b]=d<<1;f=b+4|0;g=SZ(f,e,d)|0;h=f+(d<<2)|0;c[h>>2]=0;return}else{i=d+4&-4;j=Tu(i<<2)|0;c[b+8>>2]=j;c[b>>2]=i|1;c[b+4>>2]=d;f=j;g=SZ(f,e,d)|0;h=f+(d<<2)|0;c[h>>2]=0;return}}function Mn(b){b=b|0;if((a[b]&1)==0){return}Tw(c[b+8>>2]|0);return}function Mo(a,b){a=a|0;b=b|0;return Mp(a,b,SW(b)|0)|0}function Mp(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0;f=b;g=a[f]|0;if((g&1)==0){h=1;i=g}else{g=c[b>>2]|0;h=(g&-2)-1|0;i=g&255}if(h>>>0<e>>>0){g=i&255;if((g&1|0)==0){j=g>>>1}else{j=c[b+4>>2]|0}Ms(b,h,e-h|0,j,0,j,e,d);return b|0}if((i&1)==0){k=b+4|0}else{k=c[b+8>>2]|0}SY(k,d,e)|0;c[k+(e<<2)>>2]=0;if((a[f]&1)==0){a[f]=e<<1;return b|0}else{c[b+4>>2]=e;return b|0}return 0}function Mq(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;if(d>>>0>1073741807>>>0){L4(0)}e=b;f=a[e]|0;if((f&1)==0){g=1;h=f}else{f=c[b>>2]|0;g=(f&-2)-1|0;h=f&255}f=h&255;if((f&1|0)==0){i=f>>>1}else{i=c[b+4>>2]|0}f=i>>>0>d>>>0?i:d;if(f>>>0<2>>>0){j=2}else{j=f+4&-4}f=j-1|0;if((f|0)==(g|0)){return}if((f|0)==1){k=b+4|0;l=c[b+8>>2]|0;m=1;n=0}else{d=j<<2;do{if(f>>>0>g>>>0){o=Tu(d)|0}else{p=(z=0,av(316,d|0)|0);if(!z){o=p;break}else{z=0}p=b$(-1,-1,0)|0;bI(p|0)|0;a1();return}}while(0);d=h&1;if(d<<24>>24==0){q=b+4|0}else{q=c[b+8>>2]|0}k=o;l=q;m=d<<24>>24!=0;n=1}d=k;k=h&255;if((k&1|0)==0){r=k>>>1}else{r=c[b+4>>2]|0}SX(d,l,r+1|0)|0;if(m){Tw(l)}if(n){c[b>>2]=j|1;c[b+4>>2]=i;c[b+8>>2]=d;return}else{a[e]=i<<1;return}}function Mr(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;e=b;f=a[e]|0;if((f&1)==0){g=(f&255)>>>1;h=1}else{g=c[b+4>>2]|0;h=(c[b>>2]&-2)-1|0}if((g|0)==(h|0)){Mt(b,h,1,h,h,0,0);i=a[e]|0}else{i=f}if((i&1)==0){a[e]=(g<<1)+2;j=b+4|0;k=g+1|0;l=j+(g<<2)|0;c[l>>2]=d;m=j+(k<<2)|0;c[m>>2]=0;return}else{e=c[b+8>>2]|0;i=g+1|0;c[b+4>>2]=i;j=e;k=i;l=j+(g<<2)|0;c[l>>2]=d;m=j+(k<<2)|0;c[m>>2]=0;return}}function Ms(b,d,e,f,g,h,i,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;if((1073741806-d|0)>>>0<e>>>0){L4(0)}if((a[b]&1)==0){k=b+4|0}else{k=c[b+8>>2]|0}do{if(d>>>0<536870887>>>0){l=e+d|0;m=d<<1;n=l>>>0<m>>>0?m:l;if(n>>>0<2>>>0){o=2;break}o=n+4&-4}else{o=1073741807}}while(0);e=Tu(o<<2)|0;if((g|0)!=0){SX(e,k,g)|0}if((i|0)!=0){SX(e+(g<<2)|0,j,i)|0}j=f-h|0;if((j|0)!=(g|0)){SX(e+(i+g<<2)|0,k+(h+g<<2)|0,j-g|0)|0}if((d|0)==1){p=b+8|0;c[p>>2]=e;q=o|1;r=b|0;c[r>>2]=q;s=j+i|0;t=b+4|0;c[t>>2]=s;u=e+(s<<2)|0;c[u>>2]=0;return}Tw(k);p=b+8|0;c[p>>2]=e;q=o|1;r=b|0;c[r>>2]=q;s=j+i|0;t=b+4|0;c[t>>2]=s;u=e+(s<<2)|0;c[u>>2]=0;return}function Mt(b,d,e,f,g,h,i){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;if((1073741807-d|0)>>>0<e>>>0){L4(0)}if((a[b]&1)==0){j=b+4|0}else{j=c[b+8>>2]|0}do{if(d>>>0<536870887>>>0){k=e+d|0;l=d<<1;m=k>>>0<l>>>0?l:k;if(m>>>0<2>>>0){n=2;break}n=m+4&-4}else{n=1073741807}}while(0);e=Tu(n<<2)|0;if((g|0)!=0){SX(e,j,g)|0}m=f-h|0;if((m|0)!=(g|0)){SX(e+(i+g<<2)|0,j+(h+g<<2)|0,m-g|0)|0}if((d|0)==1){o=b+8|0;c[o>>2]=e;p=n|1;q=b|0;c[q>>2]=p;return}Tw(j);o=b+8|0;c[o>>2]=e;p=n|1;q=b|0;c[q>>2]=p;return}function Mu(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;g=b;TI(g|0,0,12)|0;h=TJ(e|0)|0;i=f;j=f;k=d[j]|0;if((k&1|0)==0){l=k>>>1}else{l=c[f+4>>2]|0}k=l+h|0;do{if(k>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}}else{if(k>>>0<11>>>0){a[g]=h<<1;m=b+1|0}else{n=k+16&-16;o=(z=0,av(316,n|0)|0);if(z){z=0;break}c[b+8>>2]=o;c[b>>2]=n|1;c[b+4>>2]=h;m=o}TF(m|0,e|0,h)|0;a[m+h|0]=0;if((a[j]&1)==0){p=i+1|0}else{p=c[f+8>>2]|0}z=0,aA(80,b|0,p|0,l|0)|0;if(z){z=0;break}return}}while(0);l=b$(-1,-1)|0;if((a[g]&1)==0){bj(l|0)}Tw(c[b+8>>2]|0);bj(l|0)}function Mv(b,d){b=b|0;d=d|0;var e=0,f=0,g=0;e=i;i=i+8|0;f=e|0;g=(c[b+24>>2]|0)==0;if(g){c[b+16>>2]=d|1}else{c[b+16>>2]=d}if(((g&1|d)&c[b+20>>2]|0)==0){i=e;return}e=ct(16)|0;do{if((a[53960]|0)==0){if((bH(53960)|0)==0){break}c[12316]=19464;bs(212,49264,s|0)|0}}while(0);b=TP(49264,0,32)|0;c[f>>2]=b|1;c[f+4>>2]=M;z=0;aT(320,e|0,f|0,12016);if(!z){c[e>>2]=18416;bR(e|0,36104,184)}else{z=0;f=b$(-1,-1)|0;bt(e|0);bj(f|0)}}function Mw(a){a=a|0;var b=0,d=0,e=0,f=0;c[a>>2]=18392;b=c[a+40>>2]|0;d=a+32|0;e=a+36|0;L1:do{if((b|0)!=0){f=b;while(1){f=f-1|0;z=0;aT(c[(c[d>>2]|0)+(f<<2)>>2]|0,0,a|0,c[(c[e>>2]|0)+(f<<2)>>2]|0);if(z){z=0;break}if((f|0)==0){break L1}}f=b$(-1,-1,0)|0;fi(f)}}while(0);Q0(a+28|0);Tp(c[d>>2]|0);Tp(c[e>>2]|0);Tp(c[a+48>>2]|0);Tp(c[a+60>>2]|0);return}function Mx(a,b){a=a|0;b=b|0;Q$(a,b+28|0);return}function My(a,b){a=a|0;b=b|0;c[a+24>>2]=b;c[a+16>>2]=(b|0)==0;c[a+20>>2]=0;c[a+4>>2]=4098;c[a+12>>2]=0;c[a+8>>2]=6;TI(a+32|0,0,40)|0;Q_(a+28|0);return}function Mz(a){a=a|0;c[a>>2]=19840;Q0(a+4|0);Tw(a);return}function MA(a){a=a|0;c[a>>2]=19840;Q0(a+4|0);return}function MB(a,b){a=a|0;b=b|0;return}function MC(a,b,c){a=a|0;b=b|0;c=c|0;return a|0}function MD(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;g=a;c[g>>2]=0;c[g+4>>2]=0;g=a+8|0;c[g>>2]=-1;c[g+4>>2]=-1;return}function ME(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;e=i;b=d;d=i;i=i+16|0;c[d>>2]=c[b>>2];c[d+4>>2]=c[b+4>>2];c[d+8>>2]=c[b+8>>2];c[d+12>>2]=c[b+12>>2];b=a;c[b>>2]=0;c[b+4>>2]=0;b=a+8|0;c[b>>2]=-1;c[b+4>>2]=-1;i=e;return}function MF(a){a=a|0;return 0}function MG(a){a=a|0;return 0}function MH(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;f=b;if((e|0)<=0){g=0;return g|0}h=b+12|0;i=b+16|0;j=d;d=0;while(1){k=c[h>>2]|0;if(k>>>0<(c[i>>2]|0)>>>0){c[h>>2]=k+1;l=a[k]|0}else{k=cM[c[(c[f>>2]|0)+40>>2]&511](b)|0;if((k|0)==-1){g=d;m=11;break}l=k&255}a[j]=l;k=d+1|0;if((k|0)<(e|0)){j=j+1|0;d=k}else{g=k;m=10;break}}if((m|0)==10){return g|0}else if((m|0)==11){return g|0}return 0}function MI(a){a=a|0;return-1|0}function MJ(a){a=a|0;var b=0,e=0;if((cM[c[(c[a>>2]|0)+36>>2]&511](a)|0)==-1){b=-1;return b|0}e=a+12|0;a=c[e>>2]|0;c[e>>2]=a+1;b=d[a]|0;return b|0}function MK(a,b){a=a|0;b=b|0;return-1|0}function ML(b,e,f){b=b|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;g=b;if((f|0)<=0){h=0;return h|0}i=b+24|0;j=b+28|0;k=0;l=e;while(1){e=c[i>>2]|0;if(e>>>0<(c[j>>2]|0)>>>0){m=a[l]|0;c[i>>2]=e+1;a[e]=m}else{if((c3[c[(c[g>>2]|0)+52>>2]&2047](b,d[l]|0)|0)==-1){h=k;n=10;break}}m=k+1|0;if((m|0)<(f|0)){k=m;l=l+1|0}else{h=m;n=8;break}}if((n|0)==8){return h|0}else if((n|0)==10){return h|0}return 0}function MM(a,b){a=a|0;b=b|0;return-1|0}function MN(a){a=a|0;c[a>>2]=19768;Q0(a+4|0);Tw(a);return}function MO(a){a=a|0;c[a>>2]=19768;Q0(a+4|0);return}function MP(a,b){a=a|0;b=b|0;return}function MQ(a,b,c){a=a|0;b=b|0;c=c|0;return a|0}function MR(a,b,d,e,f,g){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;g=a;c[g>>2]=0;c[g+4>>2]=0;g=a+8|0;c[g>>2]=-1;c[g+4>>2]=-1;return}function MS(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;e=i;b=d;d=i;i=i+16|0;c[d>>2]=c[b>>2];c[d+4>>2]=c[b+4>>2];c[d+8>>2]=c[b+8>>2];c[d+12>>2]=c[b+12>>2];b=a;c[b>>2]=0;c[b+4>>2]=0;b=a+8|0;c[b>>2]=-1;c[b+4>>2]=-1;i=e;return}function MT(a){a=a|0;return 0}function MU(a){a=a|0;return 0}function MV(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;e=a;if((d|0)<=0){f=0;return f|0}g=a+12|0;h=a+16|0;i=b;b=0;while(1){j=c[g>>2]|0;if(j>>>0<(c[h>>2]|0)>>>0){c[g>>2]=j+4;k=c[j>>2]|0}else{j=cM[c[(c[e>>2]|0)+40>>2]&511](a)|0;if((j|0)==-1){f=b;l=9;break}else{k=j}}c[i>>2]=k;j=b+1|0;if((j|0)<(d|0)){i=i+4|0;b=j}else{f=j;l=8;break}}if((l|0)==9){return f|0}else if((l|0)==8){return f|0}return 0}function MW(a){a=a|0;return-1|0}function MX(a){a=a|0;var b=0,d=0;if((cM[c[(c[a>>2]|0)+36>>2]&511](a)|0)==-1){b=-1;return b|0}d=a+12|0;a=c[d>>2]|0;c[d>>2]=a+4;b=c[a>>2]|0;return b|0}function MY(a,b){a=a|0;b=b|0;return-1|0}function MZ(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;e=a;if((d|0)<=0){f=0;return f|0}g=a+24|0;h=a+28|0;i=0;j=b;while(1){b=c[g>>2]|0;if(b>>>0<(c[h>>2]|0)>>>0){k=c[j>>2]|0;c[g>>2]=b+4;c[b>>2]=k}else{if((c3[c[(c[e>>2]|0)+52>>2]&2047](a,c[j>>2]|0)|0)==-1){f=i;l=9;break}}k=i+1|0;if((k|0)<(d|0)){i=k;j=j+4|0}else{f=k;l=8;break}}if((l|0)==9){return f|0}else if((l|0)==8){return f|0}return 0}function M_(a,b){a=a|0;b=b|0;return-1|0}function M$(a){a=a|0;Mw(a+8|0);Tw(a);return}function M0(a){a=a|0;Mw(a+8|0);return}function M1(a){a=a|0;var b=0,d=0;b=a;d=c[(c[a>>2]|0)-12>>2]|0;Mw(b+(d+8)|0);Tw(b+d|0);return}function M2(a){a=a|0;Mw(a+((c[(c[a>>2]|0)-12>>2]|0)+8)|0);return}function M3(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;d=i;i=i+8|0;e=d|0;f=b;g=c[(c[f>>2]|0)-12>>2]|0;h=b;if((c[h+(g+24)>>2]|0)==0){i=d;return b|0}j=e|0;a[j]=0;c[e+4>>2]=b;do{if((c[h+(g+16)>>2]|0)==0){k=c[h+(g+72)>>2]|0;do{if((k|0)==0){l=5}else{z=0,av(70,k|0)|0;if(!z){l=5;break}else{z=0}m=b$(-1,-1,0)|0;n=m}}while(0);if((l|0)==5){a[j]=1;k=c[h+((c[(c[f>>2]|0)-12>>2]|0)+24)>>2]|0;m=(z=0,av(c[(c[k>>2]|0)+24>>2]|0,k|0)|0);if(!z){if((m|0)!=-1){break}m=c[(c[f>>2]|0)-12>>2]|0;z=0;at(460,h+m|0,c[h+(m+16)>>2]|1|0);if(!z){break}else{z=0}}else{z=0}m=b$(-1,-1,0)|0;Nh(e);n=m}bI(n|0)|0;m=c[(c[f>>2]|0)-12>>2]|0;k=h+(m+16)|0;c[k>>2]=c[k>>2]|1;if((c[h+(m+20)>>2]&1|0)==0){a1();i=d;return b|0}z=0;aI(8);if(!z){return 0}else{z=0}m=b$(-1,-1)|0;z=0;aI(2);if(!z){bj(m|0)}else{z=0;m=b$(-1,-1,0)|0;fi(m);return 0}}}while(0);Nh(e);i=d;return b|0}function M4(a){a=a|0;var b=0;b=a+16|0;c[b>>2]=c[b>>2]|1;if((c[a+20>>2]&1|0)==0){return}else{bh()}}function M5(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;e=a+4|0;c[e>>2]=0;f=a;g=c[(c[f>>2]|0)-12>>2]|0;h=a;i=c[h+(g+16)>>2]|0;do{if((i|0)==0){j=c[h+(g+72)>>2]|0;if((j|0)==0){k=g}else{z=0,av(70,j|0)|0;if(z){z=0;break}k=c[(c[f>>2]|0)-12>>2]|0}if((c[h+(k+16)>>2]|0)!=0){l=k;m=16;break}j=c[h+(k+24)>>2]|0;n=(z=0,aA(c[(c[j>>2]|0)+32>>2]|0,j|0,b|0,d|0)|0);if(z){z=0;break}c[e>>2]=n;if((n|0)==(d|0)){return a|0}n=c[(c[f>>2]|0)-12>>2]|0;z=0;at(460,h+n|0,c[h+(n+16)>>2]|6|0);if(z){z=0;break}return a|0}else{z=0;at(460,h+g|0,i|4|0);if(z){z=0;break}l=c[(c[f>>2]|0)-12>>2]|0;m=16}}while(0);do{if((m|0)==16){z=0;at(460,h+l|0,c[h+(l+16)>>2]|4|0);if(z){z=0;break}return a|0}}while(0);l=b$(-1,-1,0)|0;bI(l|0)|0;l=c[(c[f>>2]|0)-12>>2]|0;f=h+(l+16)|0;c[f>>2]=c[f>>2]|1;if((c[h+(l+20)>>2]&1|0)==0){a1();return a|0}z=0;aI(8);if(!z){return 0}else{z=0}a=b$(-1,-1)|0;z=0;aI(2);if(!z){bj(a|0)}else{z=0;a=b$(-1,-1,0)|0;fi(a);return 0}return 0}function M6(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0;d=i;i=i+16|0;e=d|0;f=a;c[f>>2]=0;c[f+4>>2]=0;f=a+8|0;c[f>>2]=-1;c[f+4>>2]=-1;f=b;g=c[(c[f>>2]|0)-12>>2]|0;h=b;b=c[h+(g+16)>>2]|0;do{if((b|0)==0){j=c[h+(g+72)>>2]|0;if((j|0)==0){k=g}else{z=0,av(70,j|0)|0;if(z){z=0;break}k=c[(c[f>>2]|0)-12>>2]|0}if((c[h+(k+16)>>2]|0)!=0){i=d;return}j=c[h+(k+24)>>2]|0;z=0;aE(c[(c[j>>2]|0)+16>>2]|0,e|0,j|0,0,0,1,8);if(z){z=0;break}j=a;l=e;c[j>>2]=c[l>>2];c[j+4>>2]=c[l+4>>2];c[j+8>>2]=c[l+8>>2];c[j+12>>2]=c[l+12>>2];i=d;return}else{z=0;at(460,h+g|0,b|4|0);if(z){z=0;break}i=d;return}}while(0);b=b$(-1,-1,0)|0;bI(b|0)|0;b=c[(c[f>>2]|0)-12>>2]|0;f=h+(b+16)|0;c[f>>2]=c[f>>2]|1;if((c[h+(b+20)>>2]&1|0)==0){a1();i=d;return}z=0;aI(8);if(z){z=0}d=b$(-1,-1)|0;z=0;aI(2);if(!z){bj(d|0)}else{z=0;d=b$(-1,-1,0)|0;fi(d)}}function M7(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;f=i;i=i+16|0;g=f|0;h=a;j=c[(c[h>>2]|0)-12>>2]|0;k=a;l=c[k+(j+16)>>2]|0;do{if((l|0)==0){m=c[k+(j+72)>>2]|0;if((m|0)==0){n=j}else{z=0,av(70,m|0)|0;if(z){z=0;break}n=c[(c[h>>2]|0)-12>>2]|0}if((c[k+(n+16)>>2]|0)!=0){i=f;return a|0}m=c[k+(n+24)>>2]|0;z=0;aE(c[(c[m>>2]|0)+16>>2]|0,g|0,m|0,b|0,d|0,e|0,8);if(z){z=0;break}m=g+8|0;if(!((c[m>>2]|0)==(-1|0)&(c[m+4>>2]|0)==(-1|0))){i=f;return a|0}m=c[(c[h>>2]|0)-12>>2]|0;z=0;at(460,k+m|0,c[k+(m+16)>>2]|4|0);if(z){z=0;break}i=f;return a|0}else{z=0;at(460,k+j|0,l|4|0);if(z){z=0;break}i=f;return a|0}}while(0);l=b$(-1,-1,0)|0;bI(l|0)|0;l=c[(c[h>>2]|0)-12>>2]|0;h=k+(l+16)|0;c[h>>2]=c[h>>2]|1;if((c[k+(l+20)>>2]&1|0)==0){a1();i=f;return a|0}z=0;aI(8);if(!z){return 0}else{z=0}a=b$(-1,-1)|0;z=0;aI(2);if(!z){bj(a|0)}else{z=0;a=b$(-1,-1,0)|0;fi(a);return 0}return 0}function M8(a){a=a|0;Mw(a+8|0);Tw(a);return}function M9(a){a=a|0;Mw(a+8|0);return}function Na(a){a=a|0;var b=0,d=0;b=a;d=c[(c[a>>2]|0)-12>>2]|0;Mw(b+(d+8)|0);Tw(b+d|0);return}function Nb(a){a=a|0;Mw(a+((c[(c[a>>2]|0)-12>>2]|0)+8)|0);return}function Nc(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0;d=i;i=i+8|0;e=d|0;f=b;g=c[(c[f>>2]|0)-12>>2]|0;h=b;if((c[h+(g+24)>>2]|0)==0){i=d;return b|0}j=e|0;a[j]=0;c[e+4>>2]=b;do{if((c[h+(g+16)>>2]|0)==0){k=c[h+(g+72)>>2]|0;do{if((k|0)==0){l=5}else{z=0,av(224,k|0)|0;if(!z){l=5;break}else{z=0}m=b$(-1,-1,0)|0;n=m}}while(0);if((l|0)==5){a[j]=1;k=c[h+((c[(c[f>>2]|0)-12>>2]|0)+24)>>2]|0;m=(z=0,av(c[(c[k>>2]|0)+24>>2]|0,k|0)|0);if(!z){if((m|0)!=-1){break}m=c[(c[f>>2]|0)-12>>2]|0;z=0;at(460,h+m|0,c[h+(m+16)>>2]|1|0);if(!z){break}else{z=0}}else{z=0}m=b$(-1,-1,0)|0;Nr(e);n=m}bI(n|0)|0;m=c[(c[f>>2]|0)-12>>2]|0;k=h+(m+16)|0;c[k>>2]=c[k>>2]|1;if((c[h+(m+20)>>2]&1|0)==0){a1();i=d;return b|0}z=0;aI(8);if(!z){return 0}else{z=0}m=b$(-1,-1)|0;z=0;aI(2);if(!z){bj(m|0)}else{z=0;m=b$(-1,-1,0)|0;fi(m);return 0}}}while(0);Nr(e);i=d;return b|0}function Nd(a){a=a|0;Mw(a+4|0);Tw(a);return}function Ne(a){a=a|0;Mw(a+4|0);return}function Nf(a){a=a|0;var b=0,d=0;b=a;d=c[(c[a>>2]|0)-12>>2]|0;Mw(b+(d+4)|0);Tw(b+d|0);return}function Ng(a){a=a|0;Mw(a+((c[(c[a>>2]|0)-12>>2]|0)+4)|0);return}function Nh(a){a=a|0;var b=0,d=0,e=0,f=0;b=a+4|0;a=c[b>>2]|0;d=c[(c[a>>2]|0)-12>>2]|0;e=a;if((c[e+(d+24)>>2]|0)==0){return}if((c[e+(d+16)>>2]|0)!=0){return}if((c[e+(d+4)>>2]&8192|0)==0){return}if(bM()|0){return}d=c[b>>2]|0;e=c[d+((c[(c[d>>2]|0)-12>>2]|0)+24)>>2]|0;d=(z=0,av(c[(c[e>>2]|0)+24>>2]|0,e|0)|0);do{if(!z){if((d|0)!=-1){return}e=c[b>>2]|0;a=c[(c[e>>2]|0)-12>>2]|0;f=e;z=0;at(460,f+a|0,c[f+(a+16)>>2]|1|0);if(z){z=0;break}return}else{z=0}}while(0);b=b$(-1,-1,0)|0;bI(b|0)|0;z=0;aI(2);if(!z){return}else{z=0;b=b$(-1,-1,0)|0;fi(b)}}function Ni(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0;e=i;i=i+40|0;f=e|0;g=e+8|0;h=e+16|0;j=e+24|0;k=e+32|0;l=h|0;a[l]=0;c[h+4>>2]=b;m=b;n=c[(c[m>>2]|0)-12>>2]|0;o=b;do{if((c[o+(n+16)>>2]|0)==0){p=c[o+(n+72)>>2]|0;do{if((p|0)==0){q=4}else{z=0,av(70,p|0)|0;if(!z){q=4;break}else{z=0}r=b$(-1,-1,0)|0;s=r}}while(0);if((q|0)==4){a[l]=1;Q$(j,o+((c[(c[m>>2]|0)-12>>2]|0)+28)|0);p=(z=0,aO(268,j|0,50464)|0);if(!z){r=p;Q0(j);t=c[(c[m>>2]|0)-12>>2]|0;u=c[o+(t+24)>>2]|0;v=o+t|0;w=o+(t+76)|0;x=c[w>>2]|0;y=x&255;L10:do{if((x|0)==-1){Q$(g,o+(t+28)|0);A=(z=0,aO(268,g|0,50816)|0);do{if(!z){B=(z=0,aO(c[(c[A>>2]|0)+28>>2]|0,A|0,32)|0);if(z){z=0;break}Q0(g);c[w>>2]=B<<24>>24;C=B;q=10;break L10}else{z=0}}while(0);A=b$(-1,-1,0)|0;B=M;Q0(g);D=B;E=A}else{C=y;q=10}}while(0);if((q|0)==10){y=c[(c[p>>2]|0)+24>>2]|0;c[f>>2]=u;z=0;aE(y|0,k|0,r|0,f|0,v|0,C|0,d|0);if(!z){if((c[k>>2]|0)!=0){break}y=c[(c[m>>2]|0)-12>>2]|0;z=0;at(460,o+y|0,c[o+(y+16)>>2]|5|0);if(!z){break}else{z=0}}else{z=0}y=b$(-1,-1,0)|0;D=M;E=y}F=E}else{z=0;y=b$(-1,-1,0)|0;Q0(j);F=y}Nh(h);s=F}bI(s|0)|0;y=c[(c[m>>2]|0)-12>>2]|0;w=o+(y+16)|0;c[w>>2]=c[w>>2]|1;if((c[o+(y+20)>>2]&1|0)==0){a1();i=e;return b|0}z=0;aI(8);if(!z){return 0}else{z=0}y=b$(-1,-1)|0;z=0;aI(2);if(!z){bj(y|0)}else{z=0;y=b$(-1,-1,0)|0;fi(y);return 0}}}while(0);Nh(h);i=e;return b|0}function Nj(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0;e=i;i=i+40|0;f=e|0;g=e+8|0;h=e+16|0;j=e+24|0;k=e+32|0;l=h|0;a[l]=0;c[h+4>>2]=b;m=b;n=c[(c[m>>2]|0)-12>>2]|0;o=b;do{if((c[o+(n+16)>>2]|0)==0){p=c[o+(n+72)>>2]|0;do{if((p|0)==0){q=4}else{z=0,av(70,p|0)|0;if(!z){q=4;break}else{z=0}r=b$(-1,-1,0)|0;s=r}}while(0);if((q|0)==4){a[l]=1;Q$(j,o+((c[(c[m>>2]|0)-12>>2]|0)+28)|0);p=(z=0,aO(268,j|0,50464)|0);if(!z){r=p;Q0(j);t=c[(c[m>>2]|0)-12>>2]|0;u=c[o+(t+24)>>2]|0;v=o+t|0;w=o+(t+76)|0;x=c[w>>2]|0;y=x&255;L10:do{if((x|0)==-1){Q$(g,o+(t+28)|0);A=(z=0,aO(268,g|0,50816)|0);do{if(!z){B=(z=0,aO(c[(c[A>>2]|0)+28>>2]|0,A|0,32)|0);if(z){z=0;break}Q0(g);c[w>>2]=B<<24>>24;C=B;q=10;break L10}else{z=0}}while(0);A=b$(-1,-1,0)|0;B=M;Q0(g);D=B;E=A}else{C=y;q=10}}while(0);if((q|0)==10){y=c[(c[p>>2]|0)+24>>2]|0;c[f>>2]=u;z=0;aE(y|0,k|0,r|0,f|0,v|0,C|0,d|0);if(!z){if((c[k>>2]|0)!=0){break}y=c[(c[m>>2]|0)-12>>2]|0;z=0;at(460,o+y|0,c[o+(y+16)>>2]|5|0);if(!z){break}else{z=0}}else{z=0}y=b$(-1,-1,0)|0;D=M;E=y}F=E}else{z=0;y=b$(-1,-1,0)|0;Q0(j);F=y}Nh(h);s=F}bI(s|0)|0;y=c[(c[m>>2]|0)-12>>2]|0;w=o+(y+16)|0;c[w>>2]=c[w>>2]|1;if((c[o+(y+20)>>2]&1|0)==0){a1();i=e;return b|0}z=0;aI(8);if(!z){return 0}else{z=0}y=b$(-1,-1)|0;z=0;aI(2);if(!z){bj(y|0)}else{z=0;y=b$(-1,-1,0)|0;fi(y);return 0}}}while(0);Nh(h);i=e;return b|0}function Nk(b,d){b=b|0;d=+d;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0;e=i;i=i+40|0;f=e|0;g=e+8|0;h=e+16|0;j=e+24|0;k=e+32|0;l=h|0;a[l]=0;c[h+4>>2]=b;m=b;n=c[(c[m>>2]|0)-12>>2]|0;o=b;do{if((c[o+(n+16)>>2]|0)==0){p=c[o+(n+72)>>2]|0;do{if((p|0)==0){q=4}else{z=0,av(70,p|0)|0;if(!z){q=4;break}else{z=0}r=b$(-1,-1,0)|0;s=r}}while(0);if((q|0)==4){a[l]=1;Q$(j,o+((c[(c[m>>2]|0)-12>>2]|0)+28)|0);p=(z=0,aO(268,j|0,50464)|0);if(!z){r=p;Q0(j);t=c[(c[m>>2]|0)-12>>2]|0;u=c[o+(t+24)>>2]|0;v=o+t|0;w=o+(t+76)|0;x=c[w>>2]|0;y=x&255;L10:do{if((x|0)==-1){Q$(g,o+(t+28)|0);A=(z=0,aO(268,g|0,50816)|0);do{if(!z){B=(z=0,aO(c[(c[A>>2]|0)+28>>2]|0,A|0,32)|0);if(z){z=0;break}Q0(g);c[w>>2]=B<<24>>24;C=B;q=10;break L10}else{z=0}}while(0);A=b$(-1,-1,0)|0;B=M;Q0(g);D=B;E=A}else{C=y;q=10}}while(0);if((q|0)==10){y=c[(c[p>>2]|0)+32>>2]|0;c[f>>2]=u;z=0;aC(y|0,k|0,r|0,f|0,v|0,C|0,+d);if(!z){if((c[k>>2]|0)!=0){break}y=c[(c[m>>2]|0)-12>>2]|0;z=0;at(460,o+y|0,c[o+(y+16)>>2]|5|0);if(!z){break}else{z=0}}else{z=0}y=b$(-1,-1,0)|0;D=M;E=y}F=E}else{z=0;y=b$(-1,-1,0)|0;Q0(j);F=y}Nh(h);s=F}bI(s|0)|0;y=c[(c[m>>2]|0)-12>>2]|0;w=o+(y+16)|0;c[w>>2]=c[w>>2]|1;if((c[o+(y+20)>>2]&1|0)==0){a1();i=e;return b|0}z=0;aI(8);if(!z){return 0}else{z=0}y=b$(-1,-1)|0;z=0;aI(2);if(!z){bj(y|0)}else{z=0;y=b$(-1,-1,0)|0;fi(y);return 0}}}while(0);Nh(h);i=e;return b|0}function Nl(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;e=i;i=i+8|0;f=e|0;g=f|0;a[g]=0;c[f+4>>2]=b;h=b;j=c[(c[h>>2]|0)-12>>2]|0;k=b;do{if((c[k+(j+16)>>2]|0)==0){l=c[k+(j+72)>>2]|0;do{if((l|0)==0){m=4}else{z=0,av(70,l|0)|0;if(!z){m=4;break}else{z=0}n=b$(-1,-1,0)|0;o=n}}while(0);if((m|0)==4){a[g]=1;l=c[k+((c[(c[h>>2]|0)-12>>2]|0)+24)>>2]|0;n=l;do{if((l|0)==0){p=n;m=9}else{q=l+24|0;r=c[q>>2]|0;if((r|0)==(c[l+28>>2]|0)){s=(z=0,aO(c[(c[l>>2]|0)+52>>2]|0,n|0,d&255|0)|0);if(!z){t=s}else{z=0;break}}else{c[q>>2]=r+1;a[r]=d;t=d&255}p=(t|0)==-1?0:n;m=9}}while(0);if((m|0)==9){if((p|0)!=0){break}n=c[(c[h>>2]|0)-12>>2]|0;z=0;at(460,k+n|0,c[k+(n+16)>>2]|1|0);if(!z){break}else{z=0}}n=b$(-1,-1,0)|0;Nh(f);o=n}bI(o|0)|0;n=c[(c[h>>2]|0)-12>>2]|0;l=k+(n+16)|0;c[l>>2]=c[l>>2]|1;if((c[k+(n+20)>>2]&1|0)==0){a1();i=e;return b|0}z=0;aI(8);if(!z){return 0}else{z=0}n=b$(-1,-1)|0;z=0;aI(2);if(!z){bj(n|0)}else{z=0;n=b$(-1,-1,0)|0;fi(n);return 0}}}while(0);Nh(f);i=e;return b|0}function Nm(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0;f=i;i=i+8|0;g=f|0;h=g|0;a[h]=0;c[g+4>>2]=b;j=b;k=c[(c[j>>2]|0)-12>>2]|0;l=b;do{if((c[l+(k+16)>>2]|0)==0){m=c[l+(k+72)>>2]|0;do{if((m|0)==0){n=4}else{z=0,av(70,m|0)|0;if(!z){n=4;break}else{z=0}o=b$(-1,-1,0)|0;p=o}}while(0);if((n|0)==4){a[h]=1;if((e|0)==0){break}m=c[l+((c[(c[j>>2]|0)-12>>2]|0)+24)>>2]|0;o=(z=0,aA(c[(c[m>>2]|0)+48>>2]|0,m|0,d|0,e|0)|0);if(!z){if((o|0)==(e|0)){break}o=c[(c[j>>2]|0)-12>>2]|0;z=0;at(460,l+o|0,c[l+(o+16)>>2]|1|0);if(!z){break}else{z=0}}else{z=0}o=b$(-1,-1,0)|0;Nh(g);p=o}bI(p|0)|0;o=c[(c[j>>2]|0)-12>>2]|0;m=l+(o+16)|0;c[m>>2]=c[m>>2]|1;if((c[l+(o+20)>>2]&1|0)==0){a1();i=f;return b|0}z=0;aI(8);if(!z){return 0}else{z=0}o=b$(-1,-1)|0;z=0;aI(2);if(!z){bj(o|0)}else{z=0;o=b$(-1,-1,0)|0;fi(o);return 0}}}while(0);Nh(g);i=f;return b|0}function Nn(a){a=a|0;Mw(a+4|0);Tw(a);return}function No(a){a=a|0;Mw(a+4|0);return}function Np(a){a=a|0;var b=0,d=0;b=a;d=c[(c[a>>2]|0)-12>>2]|0;Mw(b+(d+4)|0);Tw(b+d|0);return}function Nq(a){a=a|0;Mw(a+((c[(c[a>>2]|0)-12>>2]|0)+4)|0);return}function Nr(a){a=a|0;var b=0,d=0,e=0,f=0;b=a+4|0;a=c[b>>2]|0;d=c[(c[a>>2]|0)-12>>2]|0;e=a;if((c[e+(d+24)>>2]|0)==0){return}if((c[e+(d+16)>>2]|0)!=0){return}if((c[e+(d+4)>>2]&8192|0)==0){return}if(bM()|0){return}d=c[b>>2]|0;e=c[d+((c[(c[d>>2]|0)-12>>2]|0)+24)>>2]|0;d=(z=0,av(c[(c[e>>2]|0)+24>>2]|0,e|0)|0);do{if(!z){if((d|0)!=-1){return}e=c[b>>2]|0;a=c[(c[e>>2]|0)-12>>2]|0;f=e;z=0;at(460,f+a|0,c[f+(a+16)>>2]|1|0);if(z){z=0;break}return}else{z=0}}while(0);b=b$(-1,-1,0)|0;bI(b|0)|0;z=0;aI(2);if(!z){return}else{z=0;b=b$(-1,-1,0)|0;fi(b)}}function Ns(a){a=a|0;return 14600}function Nt(a,b,c){a=a|0;b=b|0;c=c|0;if((c|0)==1){L7(a,15952,35);return}else{LP(a,b|0,c);return}}function Nu(a){a=a|0;LL(a|0);return}function Nv(a){a=a|0;L_(a|0);Tw(a);return}function Nw(a){a=a|0;L_(a|0);return}function Nx(a){a=a|0;Mw(a);Tw(a);return}function Ny(a){a=a|0;LL(a|0);Tw(a);return}function Nz(a){a=a|0;Lq(a|0);Tw(a);return}function NA(a){a=a|0;Lq(a|0);return}function NB(a){a=a|0;Lq(a|0);return}function NC(b,c,d,e,f){b=b|0;c=c|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0;L1:do{if((e|0)==(f|0)){g=c}else{b=c;h=e;while(1){if((b|0)==(d|0)){i=-1;j=8;break}k=a[b]|0;l=a[h]|0;if(k<<24>>24<l<<24>>24){i=-1;j=10;break}if(l<<24>>24<k<<24>>24){i=1;j=11;break}k=b+1|0;l=h+1|0;if((l|0)==(f|0)){g=k;break L1}else{b=k;h=l}}if((j|0)==8){return i|0}else if((j|0)==11){return i|0}else if((j|0)==10){return i|0}}}while(0);i=(g|0)!=(d|0)|0;return i|0}function ND(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0;d=e;g=f-d|0;if(g>>>0>4294967279>>>0){L4(b)}if(g>>>0<11>>>0){a[b]=g<<1;h=b+1|0}else{i=g+16&-16;j=Tu(i)|0;c[b+8>>2]=j;c[b>>2]=i|1;c[b+4>>2]=g;h=j}if((e|0)==(f|0)){k=h;a[k]=0;return}j=f+(-d|0)|0;d=h;g=e;while(1){a[d]=a[g]|0;e=g+1|0;if((e|0)==(f|0)){break}else{d=d+1|0;g=e}}k=h+j|0;a[k]=0;return}function NE(b,c,d){b=b|0;c=c|0;d=d|0;var e=0,f=0,g=0,h=0;if((c|0)==(d|0)){e=0;return e|0}else{f=c;g=0}while(1){c=(a[f]|0)+(g<<4)|0;b=c&-268435456;h=(b>>>24|b)^c;c=f+1|0;if((c|0)==(d|0)){e=h;break}else{f=c;g=h}}return e|0}function NF(a){a=a|0;Lq(a|0);Tw(a);return}function NG(a){a=a|0;Lq(a|0);return}function NH(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0;L1:do{if((e|0)==(f|0)){g=b;h=6}else{a=b;i=e;while(1){if((a|0)==(d|0)){j=-1;break L1}k=c[a>>2]|0;l=c[i>>2]|0;if((k|0)<(l|0)){j=-1;break L1}if((l|0)<(k|0)){j=1;break L1}k=a+4|0;l=i+4|0;if((l|0)==(f|0)){g=k;h=6;break}else{a=k;i=l}}}}while(0);if((h|0)==6){j=(g|0)!=(d|0)|0}return j|0}function NI(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0;d=e;g=f-d|0;h=g>>2;if(h>>>0>1073741807>>>0){L4(b)}if(h>>>0<2>>>0){a[b]=g>>>1;i=b+4|0}else{g=h+4&-4;j=Tu(g<<2)|0;c[b+8>>2]=j;c[b>>2]=g|1;c[b+4>>2]=h;i=j}if((e|0)==(f|0)){k=i;c[k>>2]=0;return}j=(f-4+(-d|0)|0)>>>2;d=i;h=e;while(1){c[d>>2]=c[h>>2];e=h+4|0;if((e|0)==(f|0)){break}else{d=d+4|0;h=e}}k=i+(j+1<<2)|0;c[k>>2]=0;return}function NJ(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0;if((b|0)==(d|0)){e=0;return e|0}else{f=b;g=0}while(1){b=(c[f>>2]|0)+(g<<4)|0;a=b&-268435456;h=(a>>>24|a)^b;b=f+4|0;if((b|0)==(d|0)){e=h;break}else{f=b;g=h}}return e|0}function NK(a){a=a|0;Lq(a|0);Tw(a);return}function NL(a){a=a|0;Lq(a|0);return}function NM(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0;k=i;i=i+112|0;l=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[l>>2];l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=k|0;m=k+16|0;n=k+32|0;o=k+40|0;p=k+48|0;q=k+56|0;r=k+64|0;s=k+72|0;t=k+80|0;u=k+104|0;if((c[g+4>>2]&1|0)==0){c[n>>2]=-1;v=c[(c[d>>2]|0)+16>>2]|0;w=e|0;c[p>>2]=c[w>>2];c[q>>2]=c[f>>2];c$[v&127](o,d,p,q,g,h,n);q=c[o>>2]|0;c[w>>2]=q;w=c[n>>2]|0;if((w|0)==0){a[j]=0}else if((w|0)==1){a[j]=1}else{a[j]=1;c[h>>2]=4}c[b>>2]=q;i=k;return}Mx(r,g);q=r|0;r=c[q>>2]|0;if((c[12704]|0)==-1){x=9}else{c[m>>2]=50816;c[m+4>>2]=532;c[m+8>>2]=0;z=0;aT(92,50816,m|0,602);if(!z){x=9}else{z=0}}do{if((x|0)==9){m=(c[12705]|0)-1|0;w=c[r+8>>2]|0;do{if((c[r+12>>2]|0)-w>>2>>>0>m>>>0){n=c[w+(m<<2)>>2]|0;if((n|0)==0){break}o=n;Ls(c[q>>2]|0)|0;Mx(s,g);n=s|0;p=c[n>>2]|0;if((c[12608]|0)==-1){x=15}else{c[l>>2]=50432;c[l+4>>2]=532;c[l+8>>2]=0;z=0;aT(92,50432,l|0,602);if(!z){x=15}else{z=0}}do{if((x|0)==15){d=(c[12609]|0)-1|0;v=c[p+8>>2]|0;do{if((c[p+12>>2]|0)-v>>2>>>0>d>>>0){y=c[v+(d<<2)>>2]|0;if((y|0)==0){break}A=y;Ls(c[n>>2]|0)|0;B=t|0;C=y;z=0;at(c[(c[C>>2]|0)+24>>2]|0,B|0,A|0);do{if(!z){y=t+12|0;z=0;at(c[(c[C>>2]|0)+28>>2]|0,y|0,A|0);if(z){z=0;D=y;break}c[u>>2]=c[f>>2];y=(z=0,ao(120,e|0,u|0,B|0,t+24|0,o|0,h|0,1)|0);if(!z){a[j]=(y|0)==(B|0)|0;c[b>>2]=c[e>>2];Ma(t+12|0);Ma(t|0);i=k;return}else{z=0;y=b$(-1,-1)|0;E=M;Ma(t+12|0);Ma(t|0);F=y;G=E;H=F;I=0;J=H;K=G;bj(J|0)}}else{z=0;D=B}}while(0);A=b$(-1,-1)|0;C=A;A=M;if((B|0)==(D|0)){F=C;G=A;H=F;I=0;J=H;K=G;bj(J|0)}else{L=D}while(1){E=L-12|0;Ma(E);if((E|0)==(B|0)){F=C;G=A;break}else{L=E}}H=F;I=0;J=H;K=G;bj(J|0)}}while(0);d=ct(4)|0;S$(d);z=0;aT(126,d|0,35480,118);if(z){z=0;break}}}while(0);o=b$(-1,-1)|0;p=M;Ls(c[n>>2]|0)|0;F=o;G=p;H=F;I=0;J=H;K=G;bj(J|0)}}while(0);m=ct(4)|0;S$(m);z=0;aT(126,m|0,35480,118);if(z){z=0;break}}}while(0);L=b$(-1,-1)|0;D=M;Ls(c[q>>2]|0)|0;F=L;G=D;H=F;I=0;J=H;K=G;bj(J|0)}function NN(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0;l=i;i=i+104|0;m=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[m>>2];m=(g-f|0)/12|0;n=l|0;do{if(m>>>0>100>>>0){o=To(m)|0;if((o|0)!=0){p=o;q=o;break}z=0;aI(4);if(!z){p=0;q=0;break}else{z=0}o=b$(-1,-1)|0;r=M;s=o;bj(s|0)}else{p=n;q=0}}while(0);n=(f|0)==(g|0);if(n){t=m;u=0}else{o=m;m=0;v=p;w=f;while(1){x=d[w]|0;if((x&1|0)==0){y=x>>>1}else{y=c[w+4>>2]|0}if((y|0)==0){a[v]=2;A=m+1|0;B=o-1|0}else{a[v]=1;A=m;B=o}x=w+12|0;if((x|0)==(g|0)){t=B;u=A;break}else{o=B;m=A;v=v+1|0;w=x}}}w=b|0;b=e|0;e=h;v=0;A=u;u=t;L19:while(1){t=c[w>>2]|0;do{if((t|0)==0){C=0}else{if((c[t+12>>2]|0)!=(c[t+16>>2]|0)){C=t;break}m=(z=0,av(c[(c[t>>2]|0)+36>>2]|0,t|0)|0);if(z){z=0;D=6;break L19}if((m|0)==-1){c[w>>2]=0;C=0;break}else{C=c[w>>2]|0;break}}}while(0);t=(C|0)==0;m=c[b>>2]|0;if((m|0)==0){E=C;F=0}else{do{if((c[m+12>>2]|0)==(c[m+16>>2]|0)){B=(z=0,av(c[(c[m>>2]|0)+36>>2]|0,m|0)|0);if(z){z=0;D=6;break L19}if((B|0)!=-1){G=m;break}c[b>>2]=0;G=0}else{G=m}}while(0);E=c[w>>2]|0;F=G}H=(F|0)==0;if(!((t^H)&(u|0)!=0)){D=81;break}m=c[E+12>>2]|0;if((m|0)==(c[E+16>>2]|0)){B=(z=0,av(c[(c[E>>2]|0)+36>>2]|0,E|0)|0);if(z){z=0;D=6;break}I=B&255}else{I=a[m]|0}if(k){J=I}else{m=(z=0,aO(c[(c[e>>2]|0)+12>>2]|0,h|0,I|0)|0);if(!z){J=m}else{z=0;D=6;break}}do{if(n){K=A;L=u}else{m=v+1|0;L48:do{if(k){B=u;o=A;y=p;x=0;N=f;while(1){do{if((a[y]|0)==1){O=N;if((a[O]&1)==0){P=N+1|0}else{P=c[N+8>>2]|0}if(J<<24>>24!=(a[P+v|0]|0)){a[y]=0;Q=x;R=o;S=B-1|0;break}T=d[O]|0;if((T&1|0)==0){U=T>>>1}else{U=c[N+4>>2]|0}if((U|0)!=(m|0)){Q=1;R=o;S=B;break}a[y]=2;Q=1;R=o+1|0;S=B-1|0}else{Q=x;R=o;S=B}}while(0);T=N+12|0;if((T|0)==(g|0)){V=S;W=R;X=Q;break L48}B=S;o=R;y=y+1|0;x=Q;N=T}}else{N=u;x=A;y=p;o=0;B=f;while(1){do{if((a[y]|0)==1){T=B;if((a[T]&1)==0){Y=B+1|0}else{Y=c[B+8>>2]|0}O=(z=0,aO(c[(c[e>>2]|0)+12>>2]|0,h|0,a[Y+v|0]|0)|0);if(z){z=0;D=5;break L19}if(J<<24>>24!=O<<24>>24){a[y]=0;Z=o;_=x;$=N-1|0;break}O=d[T]|0;if((O&1|0)==0){aa=O>>>1}else{aa=c[B+4>>2]|0}if((aa|0)!=(m|0)){Z=1;_=x;$=N;break}a[y]=2;Z=1;_=x+1|0;$=N-1|0}else{Z=o;_=x;$=N}}while(0);O=B+12|0;if((O|0)==(g|0)){V=$;W=_;X=Z;break L48}N=$;x=_;y=y+1|0;o=Z;B=O}}}while(0);if(!X){K=W;L=V;break}m=c[w>>2]|0;B=m+12|0;o=c[B>>2]|0;if((o|0)==(c[m+16>>2]|0)){y=c[(c[m>>2]|0)+40>>2]|0;z=0,av(y|0,m|0)|0;if(z){z=0;D=6;break L19}}else{c[B>>2]=o+1}if((W+V|0)>>>0<2>>>0|n){K=W;L=V;break}o=v+1|0;B=W;m=p;y=f;while(1){do{if((a[m]|0)==2){x=d[y]|0;if((x&1|0)==0){ab=x>>>1}else{ab=c[y+4>>2]|0}if((ab|0)==(o|0)){ac=B;break}a[m]=0;ac=B-1|0}else{ac=B}}while(0);x=y+12|0;if((x|0)==(g|0)){K=ac;L=V;break}else{B=ac;m=m+1|0;y=x}}}}while(0);v=v+1|0;A=K;u=L}if((D|0)==5){L=b$(-1,-1)|0;ad=M;ae=L}else if((D|0)==6){L=b$(-1,-1)|0;ad=M;ae=L}else if((D|0)==81){do{if((E|0)==0){af=0;D=87}else{if((c[E+12>>2]|0)!=(c[E+16>>2]|0)){af=E;D=87;break}L=(z=0,av(c[(c[E>>2]|0)+36>>2]|0,E|0)|0);if(z){z=0;break}if((L|0)==-1){c[w>>2]=0;af=0;D=87;break}else{af=c[w>>2]|0;D=87;break}}}while(0);L115:do{if((D|0)==87){w=(af|0)==0;do{if(H){D=93}else{if((c[F+12>>2]|0)!=(c[F+16>>2]|0)){if(w){break}else{D=95;break}}E=(z=0,av(c[(c[F>>2]|0)+36>>2]|0,F|0)|0);if(z){z=0;break L115}if((E|0)==-1){c[b>>2]=0;D=93;break}else{if(w^(F|0)==0){break}else{D=95;break}}}}while(0);if((D|0)==93){if(w){D=95}}if((D|0)==95){c[j>>2]=c[j>>2]|2}L131:do{if(n){D=100}else{E=f;L=p;while(1){if((a[L]|0)==2){ag=E;break L131}u=E+12|0;if((u|0)==(g|0)){D=100;break L131}E=u;L=L+1|0}}}while(0);if((D|0)==100){c[j>>2]=c[j>>2]|4;ag=g}if((q|0)==0){i=l;return ag|0}Tp(q);i=l;return ag|0}}while(0);ag=b$(-1,-1)|0;ad=M;ae=ag}if((q|0)==0){r=ad;s=ae;bj(s|0)}Tp(q);r=ad;s=ae;bj(s|0);return 0}function NO(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];NP(a,0,j,k,f,g,h);i=b;return}function NP(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0;e=i;i=i+72|0;l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[l>>2];l=e|0;m=e+32|0;n=e+40|0;o=e+56|0;p=o;q=i;i=i+4|0;i=i+7&-8;r=i;i=i+160|0;s=i;i=i+4|0;i=i+7&-8;t=i;i=i+4|0;i=i+7&-8;u=c[h+4>>2]&74;if((u|0)==8){v=16}else if((u|0)==0){v=0}else if((u|0)==64){v=8}else{v=10}u=l|0;Ov(n,h,u,m);TI(p|0,0,12)|0;h=o;z=0;aT(78,o|0,10,0);L6:do{if(!z){if((a[p]&1)==0){l=h+1|0;w=l;x=l;y=o+8|0}else{l=o+8|0;w=c[l>>2]|0;x=h+1|0;y=l}c[q>>2]=w;l=r|0;c[s>>2]=l;c[t>>2]=0;A=f|0;B=g|0;C=o|0;D=o+4|0;E=a[m]|0;F=w;G=c[A>>2]|0;L12:while(1){do{if((G|0)==0){H=0}else{if((c[G+12>>2]|0)!=(c[G+16>>2]|0)){H=G;break}I=(z=0,av(c[(c[G>>2]|0)+36>>2]|0,G|0)|0);if(z){z=0;J=34;break L12}if((I|0)!=-1){H=G;break}c[A>>2]=0;H=0}}while(0);K=(H|0)==0;I=c[B>>2]|0;do{if((I|0)==0){J=21}else{if((c[I+12>>2]|0)!=(c[I+16>>2]|0)){if(K){L=I;N=0;break}else{O=F;P=I;Q=0;break L12}}R=(z=0,av(c[(c[I>>2]|0)+36>>2]|0,I|0)|0);if(z){z=0;J=34;break L12}if((R|0)==-1){c[B>>2]=0;J=21;break}else{R=(I|0)==0;if(K^R){L=I;N=R;break}else{O=F;P=I;Q=R;break L12}}}}while(0);if((J|0)==21){J=0;if(K){O=F;P=0;Q=1;break}else{L=0;N=1}}I=d[p]|0;R=(I&1|0)==0;if(((c[q>>2]|0)-F|0)==((R?I>>>1:c[D>>2]|0)|0)){if(R){S=I>>>1;T=I>>>1}else{I=c[D>>2]|0;S=I;T=I}z=0;aT(78,o|0,S<<1|0,0);if(z){z=0;J=34;break}if((a[p]&1)==0){U=10}else{U=(c[C>>2]&-2)-1|0}z=0;aT(78,o|0,U|0,0);if(z){z=0;J=34;break}if((a[p]&1)==0){V=x}else{V=c[y>>2]|0}c[q>>2]=V+T;W=V}else{W=F}I=H+12|0;R=c[I>>2]|0;X=H+16|0;if((R|0)==(c[X>>2]|0)){Y=(z=0,av(c[(c[H>>2]|0)+36>>2]|0,H|0)|0);if(z){z=0;J=34;break}Z=Y&255}else{Z=a[R]|0}if((N5(Z,v,W,q,t,E,n,l,s,u)|0)!=0){O=W;P=L;Q=N;break}R=c[I>>2]|0;if((R|0)==(c[X>>2]|0)){X=c[(c[H>>2]|0)+40>>2]|0;z=0,av(X|0,H|0)|0;if(!z){F=W;G=H;continue}else{z=0;J=34;break}}else{c[I>>2]=R+1;F=W;G=H;continue}}if((J|0)==34){G=b$(-1,-1)|0;_=M;$=G;Ma(o);Ma(n);bj($|0)}G=d[n]|0;if((G&1|0)==0){aa=G>>>1}else{aa=c[n+4>>2]|0}do{if((aa|0)!=0){G=c[s>>2]|0;if((G-r|0)>=160){break}F=c[t>>2]|0;c[s>>2]=G+4;c[G>>2]=F}}while(0);F=(z=0,aW(44,O|0,c[q>>2]|0,j|0,v|0)|0);if(z){z=0;break}c[k>>2]=F;Qo(n,l,c[s>>2]|0,j);do{if(K){ab=0}else{if((c[H+12>>2]|0)!=(c[H+16>>2]|0)){ab=H;break}F=(z=0,av(c[(c[H>>2]|0)+36>>2]|0,H|0)|0);if(z){z=0;break L6}if((F|0)!=-1){ab=H;break}c[A>>2]=0;ab=0}}while(0);A=(ab|0)==0;L75:do{if(Q){J=62}else{do{if((c[P+12>>2]|0)==(c[P+16>>2]|0)){l=(z=0,av(c[(c[P>>2]|0)+36>>2]|0,P|0)|0);if(z){z=0;break L6}if((l|0)!=-1){break}c[B>>2]=0;J=62;break L75}}while(0);if(!(A^(P|0)==0)){break}ac=b|0;c[ac>>2]=ab;Ma(o);Ma(n);i=e;return}}while(0);do{if((J|0)==62){if(A){break}ac=b|0;c[ac>>2]=ab;Ma(o);Ma(n);i=e;return}}while(0);c[j>>2]=c[j>>2]|2;ac=b|0;c[ac>>2]=ab;Ma(o);Ma(n);i=e;return}else{z=0}}while(0);e=b$(-1,-1)|0;_=M;$=e;Ma(o);Ma(n);bj($|0)}function NQ(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];NR(a,0,j,k,f,g,h);i=b;return}function NR(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0;e=i;i=i+72|0;l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[l>>2];l=e|0;m=e+32|0;n=e+40|0;o=e+56|0;p=o;q=i;i=i+4|0;i=i+7&-8;r=i;i=i+160|0;s=i;i=i+4|0;i=i+7&-8;t=i;i=i+4|0;i=i+7&-8;u=c[h+4>>2]&74;if((u|0)==8){v=16}else if((u|0)==0){v=0}else if((u|0)==64){v=8}else{v=10}u=l|0;Ov(n,h,u,m);TI(p|0,0,12)|0;h=o;z=0;aT(78,o|0,10,0);L6:do{if(!z){if((a[p]&1)==0){l=h+1|0;w=l;x=l;y=o+8|0}else{l=o+8|0;w=c[l>>2]|0;x=h+1|0;y=l}c[q>>2]=w;l=r|0;c[s>>2]=l;c[t>>2]=0;A=f|0;B=g|0;C=o|0;D=o+4|0;E=a[m]|0;F=w;G=c[A>>2]|0;L12:while(1){do{if((G|0)==0){H=0}else{if((c[G+12>>2]|0)!=(c[G+16>>2]|0)){H=G;break}I=(z=0,av(c[(c[G>>2]|0)+36>>2]|0,G|0)|0);if(z){z=0;J=34;break L12}if((I|0)!=-1){H=G;break}c[A>>2]=0;H=0}}while(0);K=(H|0)==0;I=c[B>>2]|0;do{if((I|0)==0){J=21}else{if((c[I+12>>2]|0)!=(c[I+16>>2]|0)){if(K){L=I;N=0;break}else{O=F;P=I;Q=0;break L12}}R=(z=0,av(c[(c[I>>2]|0)+36>>2]|0,I|0)|0);if(z){z=0;J=34;break L12}if((R|0)==-1){c[B>>2]=0;J=21;break}else{R=(I|0)==0;if(K^R){L=I;N=R;break}else{O=F;P=I;Q=R;break L12}}}}while(0);if((J|0)==21){J=0;if(K){O=F;P=0;Q=1;break}else{L=0;N=1}}I=d[p]|0;R=(I&1|0)==0;if(((c[q>>2]|0)-F|0)==((R?I>>>1:c[D>>2]|0)|0)){if(R){S=I>>>1;T=I>>>1}else{I=c[D>>2]|0;S=I;T=I}z=0;aT(78,o|0,S<<1|0,0);if(z){z=0;J=34;break}if((a[p]&1)==0){U=10}else{U=(c[C>>2]&-2)-1|0}z=0;aT(78,o|0,U|0,0);if(z){z=0;J=34;break}if((a[p]&1)==0){V=x}else{V=c[y>>2]|0}c[q>>2]=V+T;W=V}else{W=F}I=H+12|0;R=c[I>>2]|0;X=H+16|0;if((R|0)==(c[X>>2]|0)){Y=(z=0,av(c[(c[H>>2]|0)+36>>2]|0,H|0)|0);if(z){z=0;J=34;break}Z=Y&255}else{Z=a[R]|0}if((N5(Z,v,W,q,t,E,n,l,s,u)|0)!=0){O=W;P=L;Q=N;break}R=c[I>>2]|0;if((R|0)==(c[X>>2]|0)){X=c[(c[H>>2]|0)+40>>2]|0;z=0,av(X|0,H|0)|0;if(!z){F=W;G=H;continue}else{z=0;J=34;break}}else{c[I>>2]=R+1;F=W;G=H;continue}}if((J|0)==34){G=b$(-1,-1)|0;_=M;$=G;Ma(o);Ma(n);bj($|0)}G=d[n]|0;if((G&1|0)==0){aa=G>>>1}else{aa=c[n+4>>2]|0}do{if((aa|0)!=0){G=c[s>>2]|0;if((G-r|0)>=160){break}F=c[t>>2]|0;c[s>>2]=G+4;c[G>>2]=F}}while(0);F=(z=0,aW(6,O|0,c[q>>2]|0,j|0,v|0)|0);G=M;if(z){z=0;break}c[k>>2]=F;c[k+4>>2]=G;Qo(n,l,c[s>>2]|0,j);do{if(K){ab=0}else{if((c[H+12>>2]|0)!=(c[H+16>>2]|0)){ab=H;break}G=(z=0,av(c[(c[H>>2]|0)+36>>2]|0,H|0)|0);if(z){z=0;break L6}if((G|0)!=-1){ab=H;break}c[A>>2]=0;ab=0}}while(0);A=(ab|0)==0;L75:do{if(Q){J=62}else{do{if((c[P+12>>2]|0)==(c[P+16>>2]|0)){l=(z=0,av(c[(c[P>>2]|0)+36>>2]|0,P|0)|0);if(z){z=0;break L6}if((l|0)!=-1){break}c[B>>2]=0;J=62;break L75}}while(0);if(!(A^(P|0)==0)){break}ac=b|0;c[ac>>2]=ab;Ma(o);Ma(n);i=e;return}}while(0);do{if((J|0)==62){if(A){break}ac=b|0;c[ac>>2]=ab;Ma(o);Ma(n);i=e;return}}while(0);c[j>>2]=c[j>>2]|2;ac=b|0;c[ac>>2]=ab;Ma(o);Ma(n);i=e;return}else{z=0}}while(0);e=b$(-1,-1)|0;_=M;$=e;Ma(o);Ma(n);bj($|0)}function NS(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];NT(a,0,j,k,f,g,h);i=b;return}function NT(e,f,g,h,j,k,l){e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0;f=i;i=i+72|0;m=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[m>>2];m=h;h=i;i=i+4|0;i=i+7&-8;c[h>>2]=c[m>>2];m=f|0;n=f+32|0;o=f+40|0;p=f+56|0;q=p;r=i;i=i+4|0;i=i+7&-8;s=i;i=i+160|0;t=i;i=i+4|0;i=i+7&-8;u=i;i=i+4|0;i=i+7&-8;v=c[j+4>>2]&74;if((v|0)==8){w=16}else if((v|0)==0){w=0}else if((v|0)==64){w=8}else{w=10}v=m|0;Ov(o,j,v,n);TI(q|0,0,12)|0;j=p;z=0;aT(78,p|0,10,0);L6:do{if(!z){if((a[q]&1)==0){m=j+1|0;x=m;y=m;A=p+8|0}else{m=p+8|0;x=c[m>>2]|0;y=j+1|0;A=m}c[r>>2]=x;m=s|0;c[t>>2]=m;c[u>>2]=0;B=g|0;C=h|0;D=p|0;E=p+4|0;F=a[n]|0;G=x;H=c[B>>2]|0;L12:while(1){do{if((H|0)==0){I=0}else{if((c[H+12>>2]|0)!=(c[H+16>>2]|0)){I=H;break}J=(z=0,av(c[(c[H>>2]|0)+36>>2]|0,H|0)|0);if(z){z=0;K=34;break L12}if((J|0)!=-1){I=H;break}c[B>>2]=0;I=0}}while(0);L=(I|0)==0;J=c[C>>2]|0;do{if((J|0)==0){K=21}else{if((c[J+12>>2]|0)!=(c[J+16>>2]|0)){if(L){N=J;O=0;break}else{P=G;Q=J;R=0;break L12}}S=(z=0,av(c[(c[J>>2]|0)+36>>2]|0,J|0)|0);if(z){z=0;K=34;break L12}if((S|0)==-1){c[C>>2]=0;K=21;break}else{S=(J|0)==0;if(L^S){N=J;O=S;break}else{P=G;Q=J;R=S;break L12}}}}while(0);if((K|0)==21){K=0;if(L){P=G;Q=0;R=1;break}else{N=0;O=1}}J=d[q]|0;S=(J&1|0)==0;if(((c[r>>2]|0)-G|0)==((S?J>>>1:c[E>>2]|0)|0)){if(S){T=J>>>1;U=J>>>1}else{J=c[E>>2]|0;T=J;U=J}z=0;aT(78,p|0,T<<1|0,0);if(z){z=0;K=34;break}if((a[q]&1)==0){V=10}else{V=(c[D>>2]&-2)-1|0}z=0;aT(78,p|0,V|0,0);if(z){z=0;K=34;break}if((a[q]&1)==0){W=y}else{W=c[A>>2]|0}c[r>>2]=W+U;X=W}else{X=G}J=I+12|0;S=c[J>>2]|0;Y=I+16|0;if((S|0)==(c[Y>>2]|0)){Z=(z=0,av(c[(c[I>>2]|0)+36>>2]|0,I|0)|0);if(z){z=0;K=34;break}_=Z&255}else{_=a[S]|0}if((N5(_,w,X,r,u,F,o,m,t,v)|0)!=0){P=X;Q=N;R=O;break}S=c[J>>2]|0;if((S|0)==(c[Y>>2]|0)){Y=c[(c[I>>2]|0)+40>>2]|0;z=0,av(Y|0,I|0)|0;if(!z){G=X;H=I;continue}else{z=0;K=34;break}}else{c[J>>2]=S+1;G=X;H=I;continue}}if((K|0)==34){H=b$(-1,-1)|0;$=M;aa=H;Ma(p);Ma(o);bj(aa|0)}H=d[o]|0;if((H&1|0)==0){ab=H>>>1}else{ab=c[o+4>>2]|0}do{if((ab|0)!=0){H=c[t>>2]|0;if((H-s|0)>=160){break}G=c[u>>2]|0;c[t>>2]=H+4;c[H>>2]=G}}while(0);G=(z=0,aW(8,P|0,c[r>>2]|0,k|0,w|0)|0);if(z){z=0;break}b[l>>1]=G;Qo(o,m,c[t>>2]|0,k);do{if(L){ac=0}else{if((c[I+12>>2]|0)!=(c[I+16>>2]|0)){ac=I;break}G=(z=0,av(c[(c[I>>2]|0)+36>>2]|0,I|0)|0);if(z){z=0;break L6}if((G|0)!=-1){ac=I;break}c[B>>2]=0;ac=0}}while(0);B=(ac|0)==0;L75:do{if(R){K=62}else{do{if((c[Q+12>>2]|0)==(c[Q+16>>2]|0)){m=(z=0,av(c[(c[Q>>2]|0)+36>>2]|0,Q|0)|0);if(z){z=0;break L6}if((m|0)!=-1){break}c[C>>2]=0;K=62;break L75}}while(0);if(!(B^(Q|0)==0)){break}ad=e|0;c[ad>>2]=ac;Ma(p);Ma(o);i=f;return}}while(0);do{if((K|0)==62){if(B){break}ad=e|0;c[ad>>2]=ac;Ma(p);Ma(o);i=f;return}}while(0);c[k>>2]=c[k>>2]|2;ad=e|0;c[ad>>2]=ac;Ma(p);Ma(o);i=f;return}else{z=0}}while(0);f=b$(-1,-1)|0;$=M;aa=f;Ma(p);Ma(o);bj(aa|0)}function NU(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];NV(a,0,j,k,f,g,h);i=b;return}function NV(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0;e=i;i=i+72|0;l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[l>>2];l=e|0;m=e+32|0;n=e+40|0;o=e+56|0;p=o;q=i;i=i+4|0;i=i+7&-8;r=i;i=i+160|0;s=i;i=i+4|0;i=i+7&-8;t=i;i=i+4|0;i=i+7&-8;u=c[h+4>>2]&74;if((u|0)==8){v=16}else if((u|0)==0){v=0}else if((u|0)==64){v=8}else{v=10}u=l|0;Ov(n,h,u,m);TI(p|0,0,12)|0;h=o;z=0;aT(78,o|0,10,0);L6:do{if(!z){if((a[p]&1)==0){l=h+1|0;w=l;x=l;y=o+8|0}else{l=o+8|0;w=c[l>>2]|0;x=h+1|0;y=l}c[q>>2]=w;l=r|0;c[s>>2]=l;c[t>>2]=0;A=f|0;B=g|0;C=o|0;D=o+4|0;E=a[m]|0;F=w;G=c[A>>2]|0;L12:while(1){do{if((G|0)==0){H=0}else{if((c[G+12>>2]|0)!=(c[G+16>>2]|0)){H=G;break}I=(z=0,av(c[(c[G>>2]|0)+36>>2]|0,G|0)|0);if(z){z=0;J=34;break L12}if((I|0)!=-1){H=G;break}c[A>>2]=0;H=0}}while(0);K=(H|0)==0;I=c[B>>2]|0;do{if((I|0)==0){J=21}else{if((c[I+12>>2]|0)!=(c[I+16>>2]|0)){if(K){L=I;N=0;break}else{O=F;P=I;Q=0;break L12}}R=(z=0,av(c[(c[I>>2]|0)+36>>2]|0,I|0)|0);if(z){z=0;J=34;break L12}if((R|0)==-1){c[B>>2]=0;J=21;break}else{R=(I|0)==0;if(K^R){L=I;N=R;break}else{O=F;P=I;Q=R;break L12}}}}while(0);if((J|0)==21){J=0;if(K){O=F;P=0;Q=1;break}else{L=0;N=1}}I=d[p]|0;R=(I&1|0)==0;if(((c[q>>2]|0)-F|0)==((R?I>>>1:c[D>>2]|0)|0)){if(R){S=I>>>1;T=I>>>1}else{I=c[D>>2]|0;S=I;T=I}z=0;aT(78,o|0,S<<1|0,0);if(z){z=0;J=34;break}if((a[p]&1)==0){U=10}else{U=(c[C>>2]&-2)-1|0}z=0;aT(78,o|0,U|0,0);if(z){z=0;J=34;break}if((a[p]&1)==0){V=x}else{V=c[y>>2]|0}c[q>>2]=V+T;W=V}else{W=F}I=H+12|0;R=c[I>>2]|0;X=H+16|0;if((R|0)==(c[X>>2]|0)){Y=(z=0,av(c[(c[H>>2]|0)+36>>2]|0,H|0)|0);if(z){z=0;J=34;break}Z=Y&255}else{Z=a[R]|0}if((N5(Z,v,W,q,t,E,n,l,s,u)|0)!=0){O=W;P=L;Q=N;break}R=c[I>>2]|0;if((R|0)==(c[X>>2]|0)){X=c[(c[H>>2]|0)+40>>2]|0;z=0,av(X|0,H|0)|0;if(!z){F=W;G=H;continue}else{z=0;J=34;break}}else{c[I>>2]=R+1;F=W;G=H;continue}}if((J|0)==34){G=b$(-1,-1)|0;_=M;$=G;Ma(o);Ma(n);bj($|0)}G=d[n]|0;if((G&1|0)==0){aa=G>>>1}else{aa=c[n+4>>2]|0}do{if((aa|0)!=0){G=c[s>>2]|0;if((G-r|0)>=160){break}F=c[t>>2]|0;c[s>>2]=G+4;c[G>>2]=F}}while(0);F=(z=0,aW(4,O|0,c[q>>2]|0,j|0,v|0)|0);if(z){z=0;break}c[k>>2]=F;Qo(n,l,c[s>>2]|0,j);do{if(K){ab=0}else{if((c[H+12>>2]|0)!=(c[H+16>>2]|0)){ab=H;break}F=(z=0,av(c[(c[H>>2]|0)+36>>2]|0,H|0)|0);if(z){z=0;break L6}if((F|0)!=-1){ab=H;break}c[A>>2]=0;ab=0}}while(0);A=(ab|0)==0;L75:do{if(Q){J=62}else{do{if((c[P+12>>2]|0)==(c[P+16>>2]|0)){l=(z=0,av(c[(c[P>>2]|0)+36>>2]|0,P|0)|0);if(z){z=0;break L6}if((l|0)!=-1){break}c[B>>2]=0;J=62;break L75}}while(0);if(!(A^(P|0)==0)){break}ac=b|0;c[ac>>2]=ab;Ma(o);Ma(n);i=e;return}}while(0);do{if((J|0)==62){if(A){break}ac=b|0;c[ac>>2]=ab;Ma(o);Ma(n);i=e;return}}while(0);c[j>>2]=c[j>>2]|2;ac=b|0;c[ac>>2]=ab;Ma(o);Ma(n);i=e;return}else{z=0}}while(0);e=b$(-1,-1)|0;_=M;$=e;Ma(o);Ma(n);bj($|0)}function NW(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];NX(a,0,j,k,f,g,h);i=b;return}function NX(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0;e=i;i=i+72|0;l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[l>>2];l=e|0;m=e+32|0;n=e+40|0;o=e+56|0;p=o;q=i;i=i+4|0;i=i+7&-8;r=i;i=i+160|0;s=i;i=i+4|0;i=i+7&-8;t=i;i=i+4|0;i=i+7&-8;u=c[h+4>>2]&74;if((u|0)==8){v=16}else if((u|0)==0){v=0}else if((u|0)==64){v=8}else{v=10}u=l|0;Ov(n,h,u,m);TI(p|0,0,12)|0;h=o;z=0;aT(78,o|0,10,0);L6:do{if(!z){if((a[p]&1)==0){l=h+1|0;w=l;x=l;y=o+8|0}else{l=o+8|0;w=c[l>>2]|0;x=h+1|0;y=l}c[q>>2]=w;l=r|0;c[s>>2]=l;c[t>>2]=0;A=f|0;B=g|0;C=o|0;D=o+4|0;E=a[m]|0;F=w;G=c[A>>2]|0;L12:while(1){do{if((G|0)==0){H=0}else{if((c[G+12>>2]|0)!=(c[G+16>>2]|0)){H=G;break}I=(z=0,av(c[(c[G>>2]|0)+36>>2]|0,G|0)|0);if(z){z=0;J=34;break L12}if((I|0)!=-1){H=G;break}c[A>>2]=0;H=0}}while(0);K=(H|0)==0;I=c[B>>2]|0;do{if((I|0)==0){J=21}else{if((c[I+12>>2]|0)!=(c[I+16>>2]|0)){if(K){L=I;N=0;break}else{O=F;P=I;Q=0;break L12}}R=(z=0,av(c[(c[I>>2]|0)+36>>2]|0,I|0)|0);if(z){z=0;J=34;break L12}if((R|0)==-1){c[B>>2]=0;J=21;break}else{R=(I|0)==0;if(K^R){L=I;N=R;break}else{O=F;P=I;Q=R;break L12}}}}while(0);if((J|0)==21){J=0;if(K){O=F;P=0;Q=1;break}else{L=0;N=1}}I=d[p]|0;R=(I&1|0)==0;if(((c[q>>2]|0)-F|0)==((R?I>>>1:c[D>>2]|0)|0)){if(R){S=I>>>1;T=I>>>1}else{I=c[D>>2]|0;S=I;T=I}z=0;aT(78,o|0,S<<1|0,0);if(z){z=0;J=34;break}if((a[p]&1)==0){U=10}else{U=(c[C>>2]&-2)-1|0}z=0;aT(78,o|0,U|0,0);if(z){z=0;J=34;break}if((a[p]&1)==0){V=x}else{V=c[y>>2]|0}c[q>>2]=V+T;W=V}else{W=F}I=H+12|0;R=c[I>>2]|0;X=H+16|0;if((R|0)==(c[X>>2]|0)){Y=(z=0,av(c[(c[H>>2]|0)+36>>2]|0,H|0)|0);if(z){z=0;J=34;break}Z=Y&255}else{Z=a[R]|0}if((N5(Z,v,W,q,t,E,n,l,s,u)|0)!=0){O=W;P=L;Q=N;break}R=c[I>>2]|0;if((R|0)==(c[X>>2]|0)){X=c[(c[H>>2]|0)+40>>2]|0;z=0,av(X|0,H|0)|0;if(!z){F=W;G=H;continue}else{z=0;J=34;break}}else{c[I>>2]=R+1;F=W;G=H;continue}}if((J|0)==34){G=b$(-1,-1)|0;_=M;$=G;Ma(o);Ma(n);bj($|0)}G=d[n]|0;if((G&1|0)==0){aa=G>>>1}else{aa=c[n+4>>2]|0}do{if((aa|0)!=0){G=c[s>>2]|0;if((G-r|0)>=160){break}F=c[t>>2]|0;c[s>>2]=G+4;c[G>>2]=F}}while(0);F=(z=0,aW(36,O|0,c[q>>2]|0,j|0,v|0)|0);if(z){z=0;break}c[k>>2]=F;Qo(n,l,c[s>>2]|0,j);do{if(K){ab=0}else{if((c[H+12>>2]|0)!=(c[H+16>>2]|0)){ab=H;break}F=(z=0,av(c[(c[H>>2]|0)+36>>2]|0,H|0)|0);if(z){z=0;break L6}if((F|0)!=-1){ab=H;break}c[A>>2]=0;ab=0}}while(0);A=(ab|0)==0;L75:do{if(Q){J=62}else{do{if((c[P+12>>2]|0)==(c[P+16>>2]|0)){l=(z=0,av(c[(c[P>>2]|0)+36>>2]|0,P|0)|0);if(z){z=0;break L6}if((l|0)!=-1){break}c[B>>2]=0;J=62;break L75}}while(0);if(!(A^(P|0)==0)){break}ac=b|0;c[ac>>2]=ab;Ma(o);Ma(n);i=e;return}}while(0);do{if((J|0)==62){if(A){break}ac=b|0;c[ac>>2]=ab;Ma(o);Ma(n);i=e;return}}while(0);c[j>>2]=c[j>>2]|2;ac=b|0;c[ac>>2]=ab;Ma(o);Ma(n);i=e;return}else{z=0}}while(0);e=b$(-1,-1)|0;_=M;$=e;Ma(o);Ma(n);bj($|0)}function NY(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];NZ(a,0,j,k,f,g,h);i=b;return}function NZ(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0;e=i;i=i+72|0;l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[l>>2];l=e|0;m=e+32|0;n=e+40|0;o=e+56|0;p=o;q=i;i=i+4|0;i=i+7&-8;r=i;i=i+160|0;s=i;i=i+4|0;i=i+7&-8;t=i;i=i+4|0;i=i+7&-8;u=c[h+4>>2]&74;if((u|0)==0){v=0}else if((u|0)==8){v=16}else if((u|0)==64){v=8}else{v=10}u=l|0;Ov(n,h,u,m);TI(p|0,0,12)|0;h=o;z=0;aT(78,o|0,10,0);L6:do{if(!z){if((a[p]&1)==0){l=h+1|0;w=l;x=l;y=o+8|0}else{l=o+8|0;w=c[l>>2]|0;x=h+1|0;y=l}c[q>>2]=w;l=r|0;c[s>>2]=l;c[t>>2]=0;A=f|0;B=g|0;C=o|0;D=o+4|0;E=a[m]|0;F=w;G=c[A>>2]|0;L12:while(1){do{if((G|0)==0){H=0}else{if((c[G+12>>2]|0)!=(c[G+16>>2]|0)){H=G;break}I=(z=0,av(c[(c[G>>2]|0)+36>>2]|0,G|0)|0);if(z){z=0;J=34;break L12}if((I|0)!=-1){H=G;break}c[A>>2]=0;H=0}}while(0);K=(H|0)==0;I=c[B>>2]|0;do{if((I|0)==0){J=21}else{if((c[I+12>>2]|0)!=(c[I+16>>2]|0)){if(K){L=I;N=0;break}else{O=F;P=I;Q=0;break L12}}R=(z=0,av(c[(c[I>>2]|0)+36>>2]|0,I|0)|0);if(z){z=0;J=34;break L12}if((R|0)==-1){c[B>>2]=0;J=21;break}else{R=(I|0)==0;if(K^R){L=I;N=R;break}else{O=F;P=I;Q=R;break L12}}}}while(0);if((J|0)==21){J=0;if(K){O=F;P=0;Q=1;break}else{L=0;N=1}}I=d[p]|0;R=(I&1|0)==0;if(((c[q>>2]|0)-F|0)==((R?I>>>1:c[D>>2]|0)|0)){if(R){S=I>>>1;T=I>>>1}else{I=c[D>>2]|0;S=I;T=I}z=0;aT(78,o|0,S<<1|0,0);if(z){z=0;J=34;break}if((a[p]&1)==0){U=10}else{U=(c[C>>2]&-2)-1|0}z=0;aT(78,o|0,U|0,0);if(z){z=0;J=34;break}if((a[p]&1)==0){V=x}else{V=c[y>>2]|0}c[q>>2]=V+T;W=V}else{W=F}I=H+12|0;R=c[I>>2]|0;X=H+16|0;if((R|0)==(c[X>>2]|0)){Y=(z=0,av(c[(c[H>>2]|0)+36>>2]|0,H|0)|0);if(z){z=0;J=34;break}Z=Y&255}else{Z=a[R]|0}if((N5(Z,v,W,q,t,E,n,l,s,u)|0)!=0){O=W;P=L;Q=N;break}R=c[I>>2]|0;if((R|0)==(c[X>>2]|0)){X=c[(c[H>>2]|0)+40>>2]|0;z=0,av(X|0,H|0)|0;if(!z){F=W;G=H;continue}else{z=0;J=34;break}}else{c[I>>2]=R+1;F=W;G=H;continue}}if((J|0)==34){G=b$(-1,-1)|0;_=M;$=G;Ma(o);Ma(n);bj($|0)}G=d[n]|0;if((G&1|0)==0){aa=G>>>1}else{aa=c[n+4>>2]|0}do{if((aa|0)!=0){G=c[s>>2]|0;if((G-r|0)>=160){break}F=c[t>>2]|0;c[s>>2]=G+4;c[G>>2]=F}}while(0);F=(z=0,aW(24,O|0,c[q>>2]|0,j|0,v|0)|0);G=M;if(z){z=0;break}c[k>>2]=F;c[k+4>>2]=G;Qo(n,l,c[s>>2]|0,j);do{if(K){ab=0}else{if((c[H+12>>2]|0)!=(c[H+16>>2]|0)){ab=H;break}G=(z=0,av(c[(c[H>>2]|0)+36>>2]|0,H|0)|0);if(z){z=0;break L6}if((G|0)!=-1){ab=H;break}c[A>>2]=0;ab=0}}while(0);A=(ab|0)==0;L75:do{if(Q){J=62}else{do{if((c[P+12>>2]|0)==(c[P+16>>2]|0)){l=(z=0,av(c[(c[P>>2]|0)+36>>2]|0,P|0)|0);if(z){z=0;break L6}if((l|0)!=-1){break}c[B>>2]=0;J=62;break L75}}while(0);if(!(A^(P|0)==0)){break}ac=b|0;c[ac>>2]=ab;Ma(o);Ma(n);i=e;return}}while(0);do{if((J|0)==62){if(A){break}ac=b|0;c[ac>>2]=ab;Ma(o);Ma(n);i=e;return}}while(0);c[j>>2]=c[j>>2]|2;ac=b|0;c[ac>>2]=ab;Ma(o);Ma(n);i=e;return}else{z=0}}while(0);e=b$(-1,-1)|0;_=M;$=e;Ma(o);Ma(n);bj($|0)}function N_(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];N$(a,0,j,k,f,g,h);i=b;return}function N$(b,e,f,h,j,k,l){b=b|0;e=e|0;f=f|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0.0,ag=0,ah=0;e=i;i=i+80|0;m=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[m>>2];m=h;h=i;i=i+4|0;i=i+7&-8;c[h>>2]=c[m>>2];m=e+32|0;n=e+40|0;o=e+48|0;p=e+64|0;q=p;r=i;i=i+4|0;i=i+7&-8;s=i;i=i+160|0;t=i;i=i+4|0;i=i+7&-8;u=i;i=i+4|0;i=i+7&-8;v=i;i=i+1|0;i=i+7&-8;w=i;i=i+1|0;i=i+7&-8;x=e|0;Ow(o,j,x,m,n);TI(q|0,0,12)|0;j=p;z=0;aT(78,p|0,10,0);L1:do{if(!z){if((a[q]&1)==0){y=j+1|0;A=y;B=y;C=p+8|0}else{y=p+8|0;A=c[y>>2]|0;B=j+1|0;C=y}c[r>>2]=A;y=s|0;c[t>>2]=y;c[u>>2]=0;a[v]=1;a[w]=69;D=f|0;E=h|0;F=p|0;G=p+4|0;H=a[m]|0;I=a[n]|0;J=A;K=c[D>>2]|0;L7:while(1){do{if((K|0)==0){L=0}else{if((c[K+12>>2]|0)!=(c[K+16>>2]|0)){L=K;break}N=(z=0,av(c[(c[K>>2]|0)+36>>2]|0,K|0)|0);if(z){z=0;O=30;break L7}if((N|0)!=-1){L=K;break}c[D>>2]=0;L=0}}while(0);P=(L|0)==0;N=c[E>>2]|0;do{if((N|0)==0){O=17}else{if((c[N+12>>2]|0)!=(c[N+16>>2]|0)){if(P){Q=N;R=0;break}else{S=J;T=N;U=0;break L7}}V=(z=0,av(c[(c[N>>2]|0)+36>>2]|0,N|0)|0);if(z){z=0;O=30;break L7}if((V|0)==-1){c[E>>2]=0;O=17;break}else{V=(N|0)==0;if(P^V){Q=N;R=V;break}else{S=J;T=N;U=V;break L7}}}}while(0);if((O|0)==17){O=0;if(P){S=J;T=0;U=1;break}else{Q=0;R=1}}N=d[q]|0;V=(N&1|0)==0;if(((c[r>>2]|0)-J|0)==((V?N>>>1:c[G>>2]|0)|0)){if(V){W=N>>>1;X=N>>>1}else{N=c[G>>2]|0;W=N;X=N}z=0;aT(78,p|0,W<<1|0,0);if(z){z=0;O=30;break}if((a[q]&1)==0){Y=10}else{Y=(c[F>>2]&-2)-1|0}z=0;aT(78,p|0,Y|0,0);if(z){z=0;O=30;break}if((a[q]&1)==0){Z=B}else{Z=c[C>>2]|0}c[r>>2]=Z+X;_=Z}else{_=J}N=L+12|0;V=c[N>>2]|0;$=L+16|0;if((V|0)==(c[$>>2]|0)){aa=(z=0,av(c[(c[L>>2]|0)+36>>2]|0,L|0)|0);if(z){z=0;O=30;break}ab=aa&255}else{ab=a[V]|0}if((Ox(ab,v,w,_,r,H,I,o,y,t,u,x)|0)!=0){S=_;T=Q;U=R;break}V=c[N>>2]|0;if((V|0)==(c[$>>2]|0)){$=c[(c[L>>2]|0)+40>>2]|0;z=0,av($|0,L|0)|0;if(!z){J=_;K=L;continue}else{z=0;O=30;break}}else{c[N>>2]=V+1;J=_;K=L;continue}}if((O|0)==30){K=b$(-1,-1)|0;ac=M;ad=K;Ma(p);Ma(o);bj(ad|0)}K=d[o]|0;if((K&1|0)==0){ae=K>>>1}else{ae=c[o+4>>2]|0}do{if((ae|0)!=0){if((a[v]&1)==0){break}K=c[t>>2]|0;if((K-s|0)>=160){break}J=c[u>>2]|0;c[t>>2]=K+4;c[K>>2]=J}}while(0);af=(z=0,+(+aG(2,S|0,c[r>>2]|0,k|0)));if(z){z=0;break}g[l>>2]=af;Qo(o,y,c[t>>2]|0,k);do{if(P){ag=0}else{if((c[L+12>>2]|0)!=(c[L+16>>2]|0)){ag=L;break}J=(z=0,av(c[(c[L>>2]|0)+36>>2]|0,L|0)|0);if(z){z=0;break L1}if((J|0)!=-1){ag=L;break}c[D>>2]=0;ag=0}}while(0);D=(ag|0)==0;L71:do{if(U){O=59}else{do{if((c[T+12>>2]|0)==(c[T+16>>2]|0)){y=(z=0,av(c[(c[T>>2]|0)+36>>2]|0,T|0)|0);if(z){z=0;break L1}if((y|0)!=-1){break}c[E>>2]=0;O=59;break L71}}while(0);if(!(D^(T|0)==0)){break}ah=b|0;c[ah>>2]=ag;Ma(p);Ma(o);i=e;return}}while(0);do{if((O|0)==59){if(D){break}ah=b|0;c[ah>>2]=ag;Ma(p);Ma(o);i=e;return}}while(0);c[k>>2]=c[k>>2]|2;ah=b|0;c[ah>>2]=ag;Ma(p);Ma(o);i=e;return}else{z=0}}while(0);e=b$(-1,-1)|0;ac=M;ad=e;Ma(p);Ma(o);bj(ad|0)}function N0(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];N1(a,0,j,k,f,g,h);i=b;return}function N1(b,e,f,g,j,k,l){b=b|0;e=e|0;f=f|0;g=g|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0.0,ag=0,ah=0;e=i;i=i+80|0;m=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[m>>2];m=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[m>>2];m=e+32|0;n=e+40|0;o=e+48|0;p=e+64|0;q=p;r=i;i=i+4|0;i=i+7&-8;s=i;i=i+160|0;t=i;i=i+4|0;i=i+7&-8;u=i;i=i+4|0;i=i+7&-8;v=i;i=i+1|0;i=i+7&-8;w=i;i=i+1|0;i=i+7&-8;x=e|0;Ow(o,j,x,m,n);TI(q|0,0,12)|0;j=p;z=0;aT(78,p|0,10,0);L1:do{if(!z){if((a[q]&1)==0){y=j+1|0;A=y;B=y;C=p+8|0}else{y=p+8|0;A=c[y>>2]|0;B=j+1|0;C=y}c[r>>2]=A;y=s|0;c[t>>2]=y;c[u>>2]=0;a[v]=1;a[w]=69;D=f|0;E=g|0;F=p|0;G=p+4|0;H=a[m]|0;I=a[n]|0;J=A;K=c[D>>2]|0;L7:while(1){do{if((K|0)==0){L=0}else{if((c[K+12>>2]|0)!=(c[K+16>>2]|0)){L=K;break}N=(z=0,av(c[(c[K>>2]|0)+36>>2]|0,K|0)|0);if(z){z=0;O=30;break L7}if((N|0)!=-1){L=K;break}c[D>>2]=0;L=0}}while(0);P=(L|0)==0;N=c[E>>2]|0;do{if((N|0)==0){O=17}else{if((c[N+12>>2]|0)!=(c[N+16>>2]|0)){if(P){Q=N;R=0;break}else{S=J;T=N;U=0;break L7}}V=(z=0,av(c[(c[N>>2]|0)+36>>2]|0,N|0)|0);if(z){z=0;O=30;break L7}if((V|0)==-1){c[E>>2]=0;O=17;break}else{V=(N|0)==0;if(P^V){Q=N;R=V;break}else{S=J;T=N;U=V;break L7}}}}while(0);if((O|0)==17){O=0;if(P){S=J;T=0;U=1;break}else{Q=0;R=1}}N=d[q]|0;V=(N&1|0)==0;if(((c[r>>2]|0)-J|0)==((V?N>>>1:c[G>>2]|0)|0)){if(V){W=N>>>1;X=N>>>1}else{N=c[G>>2]|0;W=N;X=N}z=0;aT(78,p|0,W<<1|0,0);if(z){z=0;O=30;break}if((a[q]&1)==0){Y=10}else{Y=(c[F>>2]&-2)-1|0}z=0;aT(78,p|0,Y|0,0);if(z){z=0;O=30;break}if((a[q]&1)==0){Z=B}else{Z=c[C>>2]|0}c[r>>2]=Z+X;_=Z}else{_=J}N=L+12|0;V=c[N>>2]|0;$=L+16|0;if((V|0)==(c[$>>2]|0)){aa=(z=0,av(c[(c[L>>2]|0)+36>>2]|0,L|0)|0);if(z){z=0;O=30;break}ab=aa&255}else{ab=a[V]|0}if((Ox(ab,v,w,_,r,H,I,o,y,t,u,x)|0)!=0){S=_;T=Q;U=R;break}V=c[N>>2]|0;if((V|0)==(c[$>>2]|0)){$=c[(c[L>>2]|0)+40>>2]|0;z=0,av($|0,L|0)|0;if(!z){J=_;K=L;continue}else{z=0;O=30;break}}else{c[N>>2]=V+1;J=_;K=L;continue}}if((O|0)==30){K=b$(-1,-1)|0;ac=M;ad=K;Ma(p);Ma(o);bj(ad|0)}K=d[o]|0;if((K&1|0)==0){ae=K>>>1}else{ae=c[o+4>>2]|0}do{if((ae|0)!=0){if((a[v]&1)==0){break}K=c[t>>2]|0;if((K-s|0)>=160){break}J=c[u>>2]|0;c[t>>2]=K+4;c[K>>2]=J}}while(0);af=(z=0,+(+aP(4,S|0,c[r>>2]|0,k|0)));if(z){z=0;break}h[l>>3]=af;Qo(o,y,c[t>>2]|0,k);do{if(P){ag=0}else{if((c[L+12>>2]|0)!=(c[L+16>>2]|0)){ag=L;break}J=(z=0,av(c[(c[L>>2]|0)+36>>2]|0,L|0)|0);if(z){z=0;break L1}if((J|0)!=-1){ag=L;break}c[D>>2]=0;ag=0}}while(0);D=(ag|0)==0;L71:do{if(U){O=59}else{do{if((c[T+12>>2]|0)==(c[T+16>>2]|0)){y=(z=0,av(c[(c[T>>2]|0)+36>>2]|0,T|0)|0);if(z){z=0;break L1}if((y|0)!=-1){break}c[E>>2]=0;O=59;break L71}}while(0);if(!(D^(T|0)==0)){break}ah=b|0;c[ah>>2]=ag;Ma(p);Ma(o);i=e;return}}while(0);do{if((O|0)==59){if(D){break}ah=b|0;c[ah>>2]=ag;Ma(p);Ma(o);i=e;return}}while(0);c[k>>2]=c[k>>2]|2;ah=b|0;c[ah>>2]=ag;Ma(p);Ma(o);i=e;return}else{z=0}}while(0);e=b$(-1,-1)|0;ac=M;ad=e;Ma(p);Ma(o);bj(ad|0)}function N2(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];N3(a,0,j,k,f,g,h);i=b;return}function N3(b,e,f,g,j,k,l){b=b|0;e=e|0;f=f|0;g=g|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0.0,ag=0,ah=0;e=i;i=i+80|0;m=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[m>>2];m=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[m>>2];m=e+32|0;n=e+40|0;o=e+48|0;p=e+64|0;q=p;r=i;i=i+4|0;i=i+7&-8;s=i;i=i+160|0;t=i;i=i+4|0;i=i+7&-8;u=i;i=i+4|0;i=i+7&-8;v=i;i=i+1|0;i=i+7&-8;w=i;i=i+1|0;i=i+7&-8;x=e|0;Ow(o,j,x,m,n);TI(q|0,0,12)|0;j=p;z=0;aT(78,p|0,10,0);L1:do{if(!z){if((a[q]&1)==0){y=j+1|0;A=y;B=y;C=p+8|0}else{y=p+8|0;A=c[y>>2]|0;B=j+1|0;C=y}c[r>>2]=A;y=s|0;c[t>>2]=y;c[u>>2]=0;a[v]=1;a[w]=69;D=f|0;E=g|0;F=p|0;G=p+4|0;H=a[m]|0;I=a[n]|0;J=A;K=c[D>>2]|0;L7:while(1){do{if((K|0)==0){L=0}else{if((c[K+12>>2]|0)!=(c[K+16>>2]|0)){L=K;break}N=(z=0,av(c[(c[K>>2]|0)+36>>2]|0,K|0)|0);if(z){z=0;O=30;break L7}if((N|0)!=-1){L=K;break}c[D>>2]=0;L=0}}while(0);P=(L|0)==0;N=c[E>>2]|0;do{if((N|0)==0){O=17}else{if((c[N+12>>2]|0)!=(c[N+16>>2]|0)){if(P){Q=N;R=0;break}else{S=J;T=N;U=0;break L7}}V=(z=0,av(c[(c[N>>2]|0)+36>>2]|0,N|0)|0);if(z){z=0;O=30;break L7}if((V|0)==-1){c[E>>2]=0;O=17;break}else{V=(N|0)==0;if(P^V){Q=N;R=V;break}else{S=J;T=N;U=V;break L7}}}}while(0);if((O|0)==17){O=0;if(P){S=J;T=0;U=1;break}else{Q=0;R=1}}N=d[q]|0;V=(N&1|0)==0;if(((c[r>>2]|0)-J|0)==((V?N>>>1:c[G>>2]|0)|0)){if(V){W=N>>>1;X=N>>>1}else{N=c[G>>2]|0;W=N;X=N}z=0;aT(78,p|0,W<<1|0,0);if(z){z=0;O=30;break}if((a[q]&1)==0){Y=10}else{Y=(c[F>>2]&-2)-1|0}z=0;aT(78,p|0,Y|0,0);if(z){z=0;O=30;break}if((a[q]&1)==0){Z=B}else{Z=c[C>>2]|0}c[r>>2]=Z+X;_=Z}else{_=J}N=L+12|0;V=c[N>>2]|0;$=L+16|0;if((V|0)==(c[$>>2]|0)){aa=(z=0,av(c[(c[L>>2]|0)+36>>2]|0,L|0)|0);if(z){z=0;O=30;break}ab=aa&255}else{ab=a[V]|0}if((Ox(ab,v,w,_,r,H,I,o,y,t,u,x)|0)!=0){S=_;T=Q;U=R;break}V=c[N>>2]|0;if((V|0)==(c[$>>2]|0)){$=c[(c[L>>2]|0)+40>>2]|0;z=0,av($|0,L|0)|0;if(!z){J=_;K=L;continue}else{z=0;O=30;break}}else{c[N>>2]=V+1;J=_;K=L;continue}}if((O|0)==30){K=b$(-1,-1)|0;ac=M;ad=K;Ma(p);Ma(o);bj(ad|0)}K=d[o]|0;if((K&1|0)==0){ae=K>>>1}else{ae=c[o+4>>2]|0}do{if((ae|0)!=0){if((a[v]&1)==0){break}K=c[t>>2]|0;if((K-s|0)>=160){break}J=c[u>>2]|0;c[t>>2]=K+4;c[K>>2]=J}}while(0);af=(z=0,+(+aP(2,S|0,c[r>>2]|0,k|0)));if(z){z=0;break}h[l>>3]=af;Qo(o,y,c[t>>2]|0,k);do{if(P){ag=0}else{if((c[L+12>>2]|0)!=(c[L+16>>2]|0)){ag=L;break}J=(z=0,av(c[(c[L>>2]|0)+36>>2]|0,L|0)|0);if(z){z=0;break L1}if((J|0)!=-1){ag=L;break}c[D>>2]=0;ag=0}}while(0);D=(ag|0)==0;L71:do{if(U){O=59}else{do{if((c[T+12>>2]|0)==(c[T+16>>2]|0)){y=(z=0,av(c[(c[T>>2]|0)+36>>2]|0,T|0)|0);if(z){z=0;break L1}if((y|0)!=-1){break}c[E>>2]=0;O=59;break L71}}while(0);if(!(D^(T|0)==0)){break}ah=b|0;c[ah>>2]=ag;Ma(p);Ma(o);i=e;return}}while(0);do{if((O|0)==59){if(D){break}ah=b|0;c[ah>>2]=ag;Ma(p);Ma(o);i=e;return}}while(0);c[k>>2]=c[k>>2]|2;ah=b|0;c[ah>>2]=ag;Ma(p);Ma(o);i=e;return}else{z=0}}while(0);e=b$(-1,-1)|0;ac=M;ad=e;Ma(p);Ma(o);bj(ad|0)}function N4(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0;e=i;i=i+64|0;l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[l>>2];l=e|0;m=e+16|0;n=e+48|0;o=i;i=i+4|0;i=i+7&-8;p=i;i=i+12|0;i=i+7&-8;q=i;i=i+4|0;i=i+7&-8;r=i;i=i+160|0;s=i;i=i+4|0;i=i+7&-8;t=i;i=i+4|0;i=i+7&-8;TI(n|0,0,12)|0;u=p;z=0;at(438,o|0,h|0);if(z){z=0;h=b$(-1,-1)|0;v=M;w=h;Ma(n);x=w;y=0;A=x;B=v;bj(A|0)}h=o|0;o=c[h>>2]|0;if((c[12704]|0)==-1){C=4}else{c[l>>2]=50816;c[l+4>>2]=532;c[l+8>>2]=0;z=0;aT(92,50816,l|0,602);if(!z){C=4}else{z=0}}L7:do{if((C|0)==4){l=(c[12705]|0)-1|0;D=c[o+8>>2]|0;do{if((c[o+12>>2]|0)-D>>2>>>0>l>>>0){E=c[D+(l<<2)>>2]|0;if((E|0)==0){break}F=E;G=m|0;H=c[(c[E>>2]|0)+32>>2]|0;z=0,aW(H|0,F|0,39208,39234,G|0)|0;if(z){z=0;break L7}Ls(c[h>>2]|0)|0;TI(u|0,0,12)|0;F=p;z=0;aT(78,p|0,10,0);L13:do{if(!z){if((a[u]&1)==0){H=F+1|0;I=H;J=H;K=p+8|0}else{H=p+8|0;I=c[H>>2]|0;J=F+1|0;K=H}c[q>>2]=I;H=r|0;c[s>>2]=H;c[t>>2]=0;E=f|0;L=g|0;N=p|0;O=p+4|0;P=I;Q=c[E>>2]|0;L19:while(1){do{if((Q|0)==0){R=0}else{if((c[Q+12>>2]|0)!=(c[Q+16>>2]|0)){R=Q;break}S=(z=0,av(c[(c[Q>>2]|0)+36>>2]|0,Q|0)|0);if(z){z=0;C=40;break L19}if((S|0)!=-1){R=Q;break}c[E>>2]=0;R=0}}while(0);S=(R|0)==0;T=c[L>>2]|0;do{if((T|0)==0){C=25}else{if((c[T+12>>2]|0)!=(c[T+16>>2]|0)){if(S){break}else{U=P;break L19}}V=(z=0,av(c[(c[T>>2]|0)+36>>2]|0,T|0)|0);if(z){z=0;C=40;break L19}if((V|0)==-1){c[L>>2]=0;C=25;break}else{if(S^(T|0)==0){break}else{U=P;break L19}}}}while(0);if((C|0)==25){C=0;if(S){U=P;break}}T=d[u]|0;V=(T&1|0)==0;if(((c[q>>2]|0)-P|0)==((V?T>>>1:c[O>>2]|0)|0)){if(V){W=T>>>1;X=T>>>1}else{T=c[O>>2]|0;W=T;X=T}z=0;aT(78,p|0,W<<1|0,0);if(z){z=0;C=40;break}if((a[u]&1)==0){Y=10}else{Y=(c[N>>2]&-2)-1|0}z=0;aT(78,p|0,Y|0,0);if(z){z=0;C=40;break}if((a[u]&1)==0){Z=J}else{Z=c[K>>2]|0}c[q>>2]=Z+X;_=Z}else{_=P}T=R+12|0;V=c[T>>2]|0;$=R+16|0;if((V|0)==(c[$>>2]|0)){aa=(z=0,av(c[(c[R>>2]|0)+36>>2]|0,R|0)|0);if(z){z=0;C=40;break}ab=aa&255}else{ab=a[V]|0}if((N5(ab,16,_,q,t,0,n,H,s,G)|0)!=0){U=_;break}V=c[T>>2]|0;if((V|0)==(c[$>>2]|0)){$=c[(c[R>>2]|0)+40>>2]|0;z=0,av($|0,R|0)|0;if(!z){P=_;Q=R;continue}else{z=0;C=40;break}}else{c[T>>2]=V+1;P=_;Q=R;continue}}if((C|0)==40){Q=b$(-1,-1)|0;ac=M;ad=Q;break}a[U+3|0]=0;do{if((a[53952]|0)==0){if((bH(53952)|0)==0){break}Q=(z=0,aA(64,2147483647,12792,0)|0);if(!z){c[12314]=Q;break}else{z=0;Q=b$(-1,-1)|0;ac=M;ad=Q;break L13}}}while(0);Q=(z=0,aW(26,U|0,c[12314]|0,11216,(P=i,i=i+8|0,c[P>>2]=k,P)|0)|0);i=P;if(z){z=0;C=41;break}if((Q|0)!=1){c[j>>2]=4}Q=c[E>>2]|0;do{if((Q|0)==0){ae=0}else{if((c[Q+12>>2]|0)!=(c[Q+16>>2]|0)){ae=Q;break}P=(z=0,av(c[(c[Q>>2]|0)+36>>2]|0,Q|0)|0);if(z){z=0;C=41;break L13}if((P|0)!=-1){ae=Q;break}c[E>>2]=0;ae=0}}while(0);E=(ae|0)==0;Q=c[L>>2]|0;do{if((Q|0)==0){C=70}else{if((c[Q+12>>2]|0)!=(c[Q+16>>2]|0)){if(!E){break}af=b|0;c[af>>2]=ae;Ma(p);Ma(n);i=e;return}P=(z=0,av(c[(c[Q>>2]|0)+36>>2]|0,Q|0)|0);if(z){z=0;C=41;break L13}if((P|0)==-1){c[L>>2]=0;C=70;break}if(!(E^(Q|0)==0)){break}af=b|0;c[af>>2]=ae;Ma(p);Ma(n);i=e;return}}while(0);do{if((C|0)==70){if(E){break}af=b|0;c[af>>2]=ae;Ma(p);Ma(n);i=e;return}}while(0);c[j>>2]=c[j>>2]|2;af=b|0;c[af>>2]=ae;Ma(p);Ma(n);i=e;return}else{z=0;C=41}}while(0);if((C|0)==41){G=b$(-1,-1)|0;ac=M;ad=G}Ma(p);v=ac;w=ad;Ma(n);x=w;y=0;A=x;B=v;bj(A|0)}}while(0);l=ct(4)|0;S$(l);z=0;aT(126,l|0,35480,118);if(z){z=0;break}}}while(0);ad=b$(-1,-1)|0;ac=M;Ls(c[h>>2]|0)|0;v=ac;w=ad;Ma(n);x=w;y=0;A=x;B=v;bj(A|0)}function N5(b,e,f,g,h,i,j,k,l,m){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0;n=c[g>>2]|0;o=(n|0)==(f|0);do{if(o){p=(a[m+24|0]|0)==b<<24>>24;if(!p){if((a[m+25|0]|0)!=b<<24>>24){break}}c[g>>2]=f+1;a[f]=p?43:45;c[h>>2]=0;q=0;return q|0}}while(0);p=d[j]|0;if((p&1|0)==0){r=p>>>1}else{r=c[j+4>>2]|0}if((r|0)!=0&b<<24>>24==i<<24>>24){i=c[l>>2]|0;if((i-k|0)>=160){q=0;return q|0}k=c[h>>2]|0;c[l>>2]=i+4;c[i>>2]=k;c[h>>2]=0;q=0;return q|0}k=m+26|0;i=m;while(1){l=i+1|0;if((a[i]|0)==b<<24>>24){s=i;break}if((l|0)==(k|0)){s=k;break}else{i=l}}i=s-m|0;if((i|0)>23){q=-1;return q|0}do{if((e|0)==8|(e|0)==10){if((i|0)<(e|0)){break}else{q=-1}return q|0}else if((e|0)==16){if((i|0)<22){break}if(o){q=-1;return q|0}if((n-f|0)>=3){q=-1;return q|0}if((a[n-1|0]|0)!=48){q=-1;return q|0}c[h>>2]=0;m=a[39208+i|0]|0;s=c[g>>2]|0;c[g>>2]=s+1;a[s]=m;q=0;return q|0}}while(0);f=a[39208+i|0]|0;c[g>>2]=n+1;a[n]=f;c[h>>2]=(c[h>>2]|0)+1;q=0;return q|0}function N6(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;f=i;i=i+16|0;g=f|0;h=g;c[h>>2]=e;c[h+4>>2]=0;h=ce(b|0)|0;b=bn(a|0,d|0,g|0)|0;if((h|0)==0){i=f;return b|0}z=0,av(40,h|0)|0;if(!z){i=f;return b|0}else{z=0;b=b$(-1,-1,0)|0;fi(b);return 0}return 0}function N7(a){a=a|0;Lq(a|0);Tw(a);return}function N8(a){a=a|0;Lq(a|0);return}function N9(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0;k=i;i=i+112|0;l=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[l>>2];l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=k|0;m=k+16|0;n=k+32|0;o=k+40|0;p=k+48|0;q=k+56|0;r=k+64|0;s=k+72|0;t=k+80|0;u=k+104|0;if((c[g+4>>2]&1|0)==0){c[n>>2]=-1;v=c[(c[d>>2]|0)+16>>2]|0;w=e|0;c[p>>2]=c[w>>2];c[q>>2]=c[f>>2];c$[v&127](o,d,p,q,g,h,n);q=c[o>>2]|0;c[w>>2]=q;w=c[n>>2]|0;if((w|0)==0){a[j]=0}else if((w|0)==1){a[j]=1}else{a[j]=1;c[h>>2]=4}c[b>>2]=q;i=k;return}Mx(r,g);q=r|0;r=c[q>>2]|0;if((c[12702]|0)==-1){x=9}else{c[m>>2]=50808;c[m+4>>2]=532;c[m+8>>2]=0;z=0;aT(92,50808,m|0,602);if(!z){x=9}else{z=0}}do{if((x|0)==9){m=(c[12703]|0)-1|0;w=c[r+8>>2]|0;do{if((c[r+12>>2]|0)-w>>2>>>0>m>>>0){n=c[w+(m<<2)>>2]|0;if((n|0)==0){break}o=n;Ls(c[q>>2]|0)|0;Mx(s,g);n=s|0;p=c[n>>2]|0;if((c[12606]|0)==-1){x=15}else{c[l>>2]=50424;c[l+4>>2]=532;c[l+8>>2]=0;z=0;aT(92,50424,l|0,602);if(!z){x=15}else{z=0}}do{if((x|0)==15){d=(c[12607]|0)-1|0;v=c[p+8>>2]|0;do{if((c[p+12>>2]|0)-v>>2>>>0>d>>>0){y=c[v+(d<<2)>>2]|0;if((y|0)==0){break}A=y;Ls(c[n>>2]|0)|0;B=t|0;C=y;z=0;at(c[(c[C>>2]|0)+24>>2]|0,B|0,A|0);do{if(!z){y=t+12|0;z=0;at(c[(c[C>>2]|0)+28>>2]|0,y|0,A|0);if(z){z=0;D=y;break}c[u>>2]=c[f>>2];y=(z=0,ao(78,e|0,u|0,B|0,t+24|0,o|0,h|0,1)|0);if(!z){a[j]=(y|0)==(B|0)|0;c[b>>2]=c[e>>2];Mn(t+12|0);Mn(t|0);i=k;return}else{z=0;y=b$(-1,-1)|0;E=M;Mn(t+12|0);Mn(t|0);F=y;G=E;H=F;I=0;J=H;K=G;bj(J|0)}}else{z=0;D=B}}while(0);A=b$(-1,-1)|0;C=A;A=M;if((B|0)==(D|0)){F=C;G=A;H=F;I=0;J=H;K=G;bj(J|0)}else{L=D}while(1){E=L-12|0;Mn(E);if((E|0)==(B|0)){F=C;G=A;break}else{L=E}}H=F;I=0;J=H;K=G;bj(J|0)}}while(0);d=ct(4)|0;S$(d);z=0;aT(126,d|0,35480,118);if(z){z=0;break}}}while(0);o=b$(-1,-1)|0;p=M;Ls(c[n>>2]|0)|0;F=o;G=p;H=F;I=0;J=H;K=G;bj(J|0)}}while(0);m=ct(4)|0;S$(m);z=0;aT(126,m|0,35480,118);if(z){z=0;break}}}while(0);L=b$(-1,-1)|0;D=M;Ls(c[q>>2]|0)|0;F=L;G=D;H=F;I=0;J=H;K=G;bj(J|0)}function Oa(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0;l=i;i=i+104|0;m=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[m>>2];m=(g-f|0)/12|0;n=l|0;do{if(m>>>0>100>>>0){o=To(m)|0;if((o|0)!=0){p=o;q=o;break}z=0;aI(4);if(!z){p=0;q=0;break}else{z=0}o=b$(-1,-1)|0;r=M;s=o;bj(s|0)}else{p=n;q=0}}while(0);n=(f|0)==(g|0);if(n){t=m;u=0}else{o=m;m=0;v=p;w=f;while(1){x=d[w]|0;if((x&1|0)==0){y=x>>>1}else{y=c[w+4>>2]|0}if((y|0)==0){a[v]=2;A=m+1|0;B=o-1|0}else{a[v]=1;A=m;B=o}x=w+12|0;if((x|0)==(g|0)){t=B;u=A;break}else{o=B;m=A;v=v+1|0;w=x}}}w=b|0;b=e|0;e=h;v=0;A=u;u=t;L19:while(1){t=c[w>>2]|0;do{if((t|0)==0){C=0}else{m=c[t+12>>2]|0;if((m|0)==(c[t+16>>2]|0)){B=(z=0,av(c[(c[t>>2]|0)+36>>2]|0,t|0)|0);if(!z){D=B}else{z=0;E=6;break L19}}else{D=c[m>>2]|0}if((D|0)==-1){c[w>>2]=0;C=0;break}else{C=c[w>>2]|0;break}}}while(0);t=(C|0)==0;m=c[b>>2]|0;if((m|0)==0){F=C;G=0}else{B=c[m+12>>2]|0;if((B|0)==(c[m+16>>2]|0)){o=(z=0,av(c[(c[m>>2]|0)+36>>2]|0,m|0)|0);if(!z){H=o}else{z=0;E=6;break}}else{H=c[B>>2]|0}if((H|0)==-1){c[b>>2]=0;I=0}else{I=m}F=c[w>>2]|0;G=I}J=(G|0)==0;if(!((t^J)&(u|0)!=0)){E=82;break}t=c[F+12>>2]|0;if((t|0)==(c[F+16>>2]|0)){m=(z=0,av(c[(c[F>>2]|0)+36>>2]|0,F|0)|0);if(!z){K=m}else{z=0;E=6;break}}else{K=c[t>>2]|0}if(k){L=K}else{t=(z=0,aO(c[(c[e>>2]|0)+28>>2]|0,h|0,K|0)|0);if(!z){L=t}else{z=0;E=6;break}}do{if(n){N=A;O=u}else{t=v+1|0;L51:do{if(k){m=u;B=A;o=p;y=0;x=f;while(1){do{if((a[o]|0)==1){P=x;if((a[P]&1)==0){Q=x+4|0}else{Q=c[x+8>>2]|0}if((L|0)!=(c[Q+(v<<2)>>2]|0)){a[o]=0;R=y;S=B;T=m-1|0;break}U=d[P]|0;if((U&1|0)==0){V=U>>>1}else{V=c[x+4>>2]|0}if((V|0)!=(t|0)){R=1;S=B;T=m;break}a[o]=2;R=1;S=B+1|0;T=m-1|0}else{R=y;S=B;T=m}}while(0);U=x+12|0;if((U|0)==(g|0)){W=T;X=S;Y=R;break L51}m=T;B=S;o=o+1|0;y=R;x=U}}else{x=u;y=A;o=p;B=0;m=f;while(1){do{if((a[o]|0)==1){U=m;if((a[U]&1)==0){Z=m+4|0}else{Z=c[m+8>>2]|0}P=(z=0,aO(c[(c[e>>2]|0)+28>>2]|0,h|0,c[Z+(v<<2)>>2]|0)|0);if(z){z=0;E=5;break L19}if((L|0)!=(P|0)){a[o]=0;_=B;$=y;aa=x-1|0;break}P=d[U]|0;if((P&1|0)==0){ab=P>>>1}else{ab=c[m+4>>2]|0}if((ab|0)!=(t|0)){_=1;$=y;aa=x;break}a[o]=2;_=1;$=y+1|0;aa=x-1|0}else{_=B;$=y;aa=x}}while(0);P=m+12|0;if((P|0)==(g|0)){W=aa;X=$;Y=_;break L51}x=aa;y=$;o=o+1|0;B=_;m=P}}}while(0);if(!Y){N=X;O=W;break}t=c[w>>2]|0;m=t+12|0;B=c[m>>2]|0;if((B|0)==(c[t+16>>2]|0)){o=c[(c[t>>2]|0)+40>>2]|0;z=0,av(o|0,t|0)|0;if(z){z=0;E=6;break L19}}else{c[m>>2]=B+4}if((X+W|0)>>>0<2>>>0|n){N=X;O=W;break}B=v+1|0;m=X;t=p;o=f;while(1){do{if((a[t]|0)==2){y=d[o]|0;if((y&1|0)==0){ac=y>>>1}else{ac=c[o+4>>2]|0}if((ac|0)==(B|0)){ad=m;break}a[t]=0;ad=m-1|0}else{ad=m}}while(0);y=o+12|0;if((y|0)==(g|0)){N=ad;O=W;break}else{m=ad;t=t+1|0;o=y}}}}while(0);v=v+1|0;A=N;u=O}if((E|0)==82){do{if((F|0)==0){ae=1;E=89}else{O=c[F+12>>2]|0;if((O|0)==(c[F+16>>2]|0)){u=(z=0,av(c[(c[F>>2]|0)+36>>2]|0,F|0)|0);if(!z){af=u}else{z=0;break}}else{af=c[O>>2]|0}if((af|0)==-1){c[w>>2]=0;ae=1;E=89;break}else{ae=(c[w>>2]|0)==0;E=89;break}}}while(0);L118:do{if((E|0)==89){do{if(J){E=95}else{w=c[G+12>>2]|0;if((w|0)==(c[G+16>>2]|0)){af=(z=0,av(c[(c[G>>2]|0)+36>>2]|0,G|0)|0);if(!z){ag=af}else{z=0;break L118}}else{ag=c[w>>2]|0}if((ag|0)==-1){c[b>>2]=0;E=95;break}else{if(ae^(G|0)==0){break}else{E=97;break}}}}while(0);if((E|0)==95){if(ae){E=97}}if((E|0)==97){c[j>>2]=c[j>>2]|2}L134:do{if(n){E=102}else{w=f;af=p;while(1){if((a[af]|0)==2){ah=w;break L134}F=w+12|0;if((F|0)==(g|0)){E=102;break L134}w=F;af=af+1|0}}}while(0);if((E|0)==102){c[j>>2]=c[j>>2]|4;ah=g}if((q|0)==0){i=l;return ah|0}Tp(q);i=l;return ah|0}}while(0);ah=b$(-1,-1)|0;ai=M;aj=ah}else if((E|0)==5){ah=b$(-1,-1)|0;ai=M;aj=ah}else if((E|0)==6){E=b$(-1,-1)|0;ai=M;aj=E}if((q|0)==0){r=ai;s=aj;bj(s|0)}Tp(q);r=ai;s=aj;bj(s|0);return 0}function Ob(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];Oc(a,0,j,k,f,g,h);i=b;return}function Oc(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0;e=i;i=i+144|0;l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[l>>2];l=e|0;m=e+104|0;n=e+112|0;o=e+128|0;p=o;q=i;i=i+4|0;i=i+7&-8;r=i;i=i+160|0;s=i;i=i+4|0;i=i+7&-8;t=i;i=i+4|0;i=i+7&-8;u=c[h+4>>2]&74;if((u|0)==0){v=0}else if((u|0)==64){v=8}else if((u|0)==8){v=16}else{v=10}u=l|0;Oy(n,h,u,m);TI(p|0,0,12)|0;h=o;z=0;aT(78,o|0,10,0);L6:do{if(!z){if((a[p]&1)==0){l=h+1|0;w=l;x=l;y=o+8|0}else{l=o+8|0;w=c[l>>2]|0;x=h+1|0;y=l}c[q>>2]=w;l=r|0;c[s>>2]=l;c[t>>2]=0;A=f|0;B=g|0;C=o|0;D=o+4|0;E=c[m>>2]|0;F=w;G=c[A>>2]|0;L12:while(1){do{if((G|0)==0){H=0}else{I=c[G+12>>2]|0;if((I|0)==(c[G+16>>2]|0)){J=(z=0,av(c[(c[G>>2]|0)+36>>2]|0,G|0)|0);if(!z){K=J}else{z=0;L=35;break L12}}else{K=c[I>>2]|0}if((K|0)!=-1){H=G;break}c[A>>2]=0;H=0}}while(0);N=(H|0)==0;I=c[B>>2]|0;do{if((I|0)==0){L=22}else{J=c[I+12>>2]|0;if((J|0)==(c[I+16>>2]|0)){O=(z=0,av(c[(c[I>>2]|0)+36>>2]|0,I|0)|0);if(!z){P=O}else{z=0;L=35;break L12}}else{P=c[J>>2]|0}if((P|0)==-1){c[B>>2]=0;L=22;break}else{J=(I|0)==0;if(N^J){Q=I;R=J;break}else{S=F;T=I;U=J;break L12}}}}while(0);if((L|0)==22){L=0;if(N){S=F;T=0;U=1;break}else{Q=0;R=1}}I=d[p]|0;J=(I&1|0)==0;if(((c[q>>2]|0)-F|0)==((J?I>>>1:c[D>>2]|0)|0)){if(J){V=I>>>1;W=I>>>1}else{I=c[D>>2]|0;V=I;W=I}z=0;aT(78,o|0,V<<1|0,0);if(z){z=0;L=35;break}if((a[p]&1)==0){X=10}else{X=(c[C>>2]&-2)-1|0}z=0;aT(78,o|0,X|0,0);if(z){z=0;L=35;break}if((a[p]&1)==0){Y=x}else{Y=c[y>>2]|0}c[q>>2]=Y+W;Z=Y}else{Z=F}I=H+12|0;J=c[I>>2]|0;O=H+16|0;if((J|0)==(c[O>>2]|0)){_=(z=0,av(c[(c[H>>2]|0)+36>>2]|0,H|0)|0);if(!z){$=_}else{z=0;L=35;break}}else{$=c[J>>2]|0}if((Ou($,v,Z,q,t,E,n,l,s,u)|0)!=0){S=Z;T=Q;U=R;break}J=c[I>>2]|0;if((J|0)==(c[O>>2]|0)){O=c[(c[H>>2]|0)+40>>2]|0;z=0,av(O|0,H|0)|0;if(!z){F=Z;G=H;continue}else{z=0;L=35;break}}else{c[I>>2]=J+4;F=Z;G=H;continue}}if((L|0)==35){G=b$(-1,-1)|0;aa=M;ab=G;Ma(o);Ma(n);bj(ab|0)}G=d[n]|0;if((G&1|0)==0){ac=G>>>1}else{ac=c[n+4>>2]|0}do{if((ac|0)!=0){G=c[s>>2]|0;if((G-r|0)>=160){break}F=c[t>>2]|0;c[s>>2]=G+4;c[G>>2]=F}}while(0);F=(z=0,aW(44,S|0,c[q>>2]|0,j|0,v|0)|0);if(z){z=0;break}c[k>>2]=F;Qo(n,l,c[s>>2]|0,j);do{if(N){ad=0}else{F=c[H+12>>2]|0;if((F|0)==(c[H+16>>2]|0)){G=(z=0,av(c[(c[H>>2]|0)+36>>2]|0,H|0)|0);if(!z){ae=G}else{z=0;break L6}}else{ae=c[F>>2]|0}if((ae|0)!=-1){ad=H;break}c[A>>2]=0;ad=0}}while(0);A=(ad|0)==0;do{if(U){L=64}else{l=c[T+12>>2]|0;if((l|0)==(c[T+16>>2]|0)){F=(z=0,av(c[(c[T>>2]|0)+36>>2]|0,T|0)|0);if(!z){af=F}else{z=0;break L6}}else{af=c[l>>2]|0}if((af|0)==-1){c[B>>2]=0;L=64;break}if(!(A^(T|0)==0)){break}ag=b|0;c[ag>>2]=ad;Ma(o);Ma(n);i=e;return}}while(0);do{if((L|0)==64){if(A){break}ag=b|0;c[ag>>2]=ad;Ma(o);Ma(n);i=e;return}}while(0);c[j>>2]=c[j>>2]|2;ag=b|0;c[ag>>2]=ad;Ma(o);Ma(n);i=e;return}else{z=0}}while(0);e=b$(-1,-1)|0;aa=M;ab=e;Ma(o);Ma(n);bj(ab|0)}function Od(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];Oe(a,0,j,k,f,g,h);i=b;return}function Oe(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0;e=i;i=i+144|0;l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[l>>2];l=e|0;m=e+104|0;n=e+112|0;o=e+128|0;p=o;q=i;i=i+4|0;i=i+7&-8;r=i;i=i+160|0;s=i;i=i+4|0;i=i+7&-8;t=i;i=i+4|0;i=i+7&-8;u=c[h+4>>2]&74;if((u|0)==8){v=16}else if((u|0)==0){v=0}else if((u|0)==64){v=8}else{v=10}u=l|0;Oy(n,h,u,m);TI(p|0,0,12)|0;h=o;z=0;aT(78,o|0,10,0);L6:do{if(!z){if((a[p]&1)==0){l=h+1|0;w=l;x=l;y=o+8|0}else{l=o+8|0;w=c[l>>2]|0;x=h+1|0;y=l}c[q>>2]=w;l=r|0;c[s>>2]=l;c[t>>2]=0;A=f|0;B=g|0;C=o|0;D=o+4|0;E=c[m>>2]|0;F=w;G=c[A>>2]|0;L12:while(1){do{if((G|0)==0){H=0}else{I=c[G+12>>2]|0;if((I|0)==(c[G+16>>2]|0)){J=(z=0,av(c[(c[G>>2]|0)+36>>2]|0,G|0)|0);if(!z){K=J}else{z=0;L=35;break L12}}else{K=c[I>>2]|0}if((K|0)!=-1){H=G;break}c[A>>2]=0;H=0}}while(0);N=(H|0)==0;I=c[B>>2]|0;do{if((I|0)==0){L=22}else{J=c[I+12>>2]|0;if((J|0)==(c[I+16>>2]|0)){O=(z=0,av(c[(c[I>>2]|0)+36>>2]|0,I|0)|0);if(!z){P=O}else{z=0;L=35;break L12}}else{P=c[J>>2]|0}if((P|0)==-1){c[B>>2]=0;L=22;break}else{J=(I|0)==0;if(N^J){Q=I;R=J;break}else{S=F;T=I;U=J;break L12}}}}while(0);if((L|0)==22){L=0;if(N){S=F;T=0;U=1;break}else{Q=0;R=1}}I=d[p]|0;J=(I&1|0)==0;if(((c[q>>2]|0)-F|0)==((J?I>>>1:c[D>>2]|0)|0)){if(J){V=I>>>1;W=I>>>1}else{I=c[D>>2]|0;V=I;W=I}z=0;aT(78,o|0,V<<1|0,0);if(z){z=0;L=35;break}if((a[p]&1)==0){X=10}else{X=(c[C>>2]&-2)-1|0}z=0;aT(78,o|0,X|0,0);if(z){z=0;L=35;break}if((a[p]&1)==0){Y=x}else{Y=c[y>>2]|0}c[q>>2]=Y+W;Z=Y}else{Z=F}I=H+12|0;J=c[I>>2]|0;O=H+16|0;if((J|0)==(c[O>>2]|0)){_=(z=0,av(c[(c[H>>2]|0)+36>>2]|0,H|0)|0);if(!z){$=_}else{z=0;L=35;break}}else{$=c[J>>2]|0}if((Ou($,v,Z,q,t,E,n,l,s,u)|0)!=0){S=Z;T=Q;U=R;break}J=c[I>>2]|0;if((J|0)==(c[O>>2]|0)){O=c[(c[H>>2]|0)+40>>2]|0;z=0,av(O|0,H|0)|0;if(!z){F=Z;G=H;continue}else{z=0;L=35;break}}else{c[I>>2]=J+4;F=Z;G=H;continue}}if((L|0)==35){G=b$(-1,-1)|0;aa=M;ab=G;Ma(o);Ma(n);bj(ab|0)}G=d[n]|0;if((G&1|0)==0){ac=G>>>1}else{ac=c[n+4>>2]|0}do{if((ac|0)!=0){G=c[s>>2]|0;if((G-r|0)>=160){break}F=c[t>>2]|0;c[s>>2]=G+4;c[G>>2]=F}}while(0);F=(z=0,aW(6,S|0,c[q>>2]|0,j|0,v|0)|0);G=M;if(z){z=0;break}c[k>>2]=F;c[k+4>>2]=G;Qo(n,l,c[s>>2]|0,j);do{if(N){ad=0}else{G=c[H+12>>2]|0;if((G|0)==(c[H+16>>2]|0)){F=(z=0,av(c[(c[H>>2]|0)+36>>2]|0,H|0)|0);if(!z){ae=F}else{z=0;break L6}}else{ae=c[G>>2]|0}if((ae|0)!=-1){ad=H;break}c[A>>2]=0;ad=0}}while(0);A=(ad|0)==0;do{if(U){L=64}else{l=c[T+12>>2]|0;if((l|0)==(c[T+16>>2]|0)){G=(z=0,av(c[(c[T>>2]|0)+36>>2]|0,T|0)|0);if(!z){af=G}else{z=0;break L6}}else{af=c[l>>2]|0}if((af|0)==-1){c[B>>2]=0;L=64;break}if(!(A^(T|0)==0)){break}ag=b|0;c[ag>>2]=ad;Ma(o);Ma(n);i=e;return}}while(0);do{if((L|0)==64){if(A){break}ag=b|0;c[ag>>2]=ad;Ma(o);Ma(n);i=e;return}}while(0);c[j>>2]=c[j>>2]|2;ag=b|0;c[ag>>2]=ad;Ma(o);Ma(n);i=e;return}else{z=0}}while(0);e=b$(-1,-1)|0;aa=M;ab=e;Ma(o);Ma(n);bj(ab|0)}function Of(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];Og(a,0,j,k,f,g,h);i=b;return}function Og(e,f,g,h,j,k,l){e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0;f=i;i=i+144|0;m=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[m>>2];m=h;h=i;i=i+4|0;i=i+7&-8;c[h>>2]=c[m>>2];m=f|0;n=f+104|0;o=f+112|0;p=f+128|0;q=p;r=i;i=i+4|0;i=i+7&-8;s=i;i=i+160|0;t=i;i=i+4|0;i=i+7&-8;u=i;i=i+4|0;i=i+7&-8;v=c[j+4>>2]&74;if((v|0)==8){w=16}else if((v|0)==0){w=0}else if((v|0)==64){w=8}else{w=10}v=m|0;Oy(o,j,v,n);TI(q|0,0,12)|0;j=p;z=0;aT(78,p|0,10,0);L6:do{if(!z){if((a[q]&1)==0){m=j+1|0;x=m;y=m;A=p+8|0}else{m=p+8|0;x=c[m>>2]|0;y=j+1|0;A=m}c[r>>2]=x;m=s|0;c[t>>2]=m;c[u>>2]=0;B=g|0;C=h|0;D=p|0;E=p+4|0;F=c[n>>2]|0;G=x;H=c[B>>2]|0;L12:while(1){do{if((H|0)==0){I=0}else{J=c[H+12>>2]|0;if((J|0)==(c[H+16>>2]|0)){K=(z=0,av(c[(c[H>>2]|0)+36>>2]|0,H|0)|0);if(!z){L=K}else{z=0;N=35;break L12}}else{L=c[J>>2]|0}if((L|0)!=-1){I=H;break}c[B>>2]=0;I=0}}while(0);O=(I|0)==0;J=c[C>>2]|0;do{if((J|0)==0){N=22}else{K=c[J+12>>2]|0;if((K|0)==(c[J+16>>2]|0)){P=(z=0,av(c[(c[J>>2]|0)+36>>2]|0,J|0)|0);if(!z){Q=P}else{z=0;N=35;break L12}}else{Q=c[K>>2]|0}if((Q|0)==-1){c[C>>2]=0;N=22;break}else{K=(J|0)==0;if(O^K){R=J;S=K;break}else{T=G;U=J;V=K;break L12}}}}while(0);if((N|0)==22){N=0;if(O){T=G;U=0;V=1;break}else{R=0;S=1}}J=d[q]|0;K=(J&1|0)==0;if(((c[r>>2]|0)-G|0)==((K?J>>>1:c[E>>2]|0)|0)){if(K){W=J>>>1;X=J>>>1}else{J=c[E>>2]|0;W=J;X=J}z=0;aT(78,p|0,W<<1|0,0);if(z){z=0;N=35;break}if((a[q]&1)==0){Y=10}else{Y=(c[D>>2]&-2)-1|0}z=0;aT(78,p|0,Y|0,0);if(z){z=0;N=35;break}if((a[q]&1)==0){Z=y}else{Z=c[A>>2]|0}c[r>>2]=Z+X;_=Z}else{_=G}J=I+12|0;K=c[J>>2]|0;P=I+16|0;if((K|0)==(c[P>>2]|0)){$=(z=0,av(c[(c[I>>2]|0)+36>>2]|0,I|0)|0);if(!z){aa=$}else{z=0;N=35;break}}else{aa=c[K>>2]|0}if((Ou(aa,w,_,r,u,F,o,m,t,v)|0)!=0){T=_;U=R;V=S;break}K=c[J>>2]|0;if((K|0)==(c[P>>2]|0)){P=c[(c[I>>2]|0)+40>>2]|0;z=0,av(P|0,I|0)|0;if(!z){G=_;H=I;continue}else{z=0;N=35;break}}else{c[J>>2]=K+4;G=_;H=I;continue}}if((N|0)==35){H=b$(-1,-1)|0;ab=M;ac=H;Ma(p);Ma(o);bj(ac|0)}H=d[o]|0;if((H&1|0)==0){ad=H>>>1}else{ad=c[o+4>>2]|0}do{if((ad|0)!=0){H=c[t>>2]|0;if((H-s|0)>=160){break}G=c[u>>2]|0;c[t>>2]=H+4;c[H>>2]=G}}while(0);G=(z=0,aW(8,T|0,c[r>>2]|0,k|0,w|0)|0);if(z){z=0;break}b[l>>1]=G;Qo(o,m,c[t>>2]|0,k);do{if(O){ae=0}else{G=c[I+12>>2]|0;if((G|0)==(c[I+16>>2]|0)){H=(z=0,av(c[(c[I>>2]|0)+36>>2]|0,I|0)|0);if(!z){af=H}else{z=0;break L6}}else{af=c[G>>2]|0}if((af|0)!=-1){ae=I;break}c[B>>2]=0;ae=0}}while(0);B=(ae|0)==0;do{if(V){N=64}else{m=c[U+12>>2]|0;if((m|0)==(c[U+16>>2]|0)){G=(z=0,av(c[(c[U>>2]|0)+36>>2]|0,U|0)|0);if(!z){ag=G}else{z=0;break L6}}else{ag=c[m>>2]|0}if((ag|0)==-1){c[C>>2]=0;N=64;break}if(!(B^(U|0)==0)){break}ah=e|0;c[ah>>2]=ae;Ma(p);Ma(o);i=f;return}}while(0);do{if((N|0)==64){if(B){break}ah=e|0;c[ah>>2]=ae;Ma(p);Ma(o);i=f;return}}while(0);c[k>>2]=c[k>>2]|2;ah=e|0;c[ah>>2]=ae;Ma(p);Ma(o);i=f;return}else{z=0}}while(0);f=b$(-1,-1)|0;ab=M;ac=f;Ma(p);Ma(o);bj(ac|0)}function Oh(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];Oi(a,0,j,k,f,g,h);i=b;return}function Oi(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0;e=i;i=i+144|0;l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[l>>2];l=e|0;m=e+104|0;n=e+112|0;o=e+128|0;p=o;q=i;i=i+4|0;i=i+7&-8;r=i;i=i+160|0;s=i;i=i+4|0;i=i+7&-8;t=i;i=i+4|0;i=i+7&-8;u=c[h+4>>2]&74;if((u|0)==8){v=16}else if((u|0)==0){v=0}else if((u|0)==64){v=8}else{v=10}u=l|0;Oy(n,h,u,m);TI(p|0,0,12)|0;h=o;z=0;aT(78,o|0,10,0);L6:do{if(!z){if((a[p]&1)==0){l=h+1|0;w=l;x=l;y=o+8|0}else{l=o+8|0;w=c[l>>2]|0;x=h+1|0;y=l}c[q>>2]=w;l=r|0;c[s>>2]=l;c[t>>2]=0;A=f|0;B=g|0;C=o|0;D=o+4|0;E=c[m>>2]|0;F=w;G=c[A>>2]|0;L12:while(1){do{if((G|0)==0){H=0}else{I=c[G+12>>2]|0;if((I|0)==(c[G+16>>2]|0)){J=(z=0,av(c[(c[G>>2]|0)+36>>2]|0,G|0)|0);if(!z){K=J}else{z=0;L=35;break L12}}else{K=c[I>>2]|0}if((K|0)!=-1){H=G;break}c[A>>2]=0;H=0}}while(0);N=(H|0)==0;I=c[B>>2]|0;do{if((I|0)==0){L=22}else{J=c[I+12>>2]|0;if((J|0)==(c[I+16>>2]|0)){O=(z=0,av(c[(c[I>>2]|0)+36>>2]|0,I|0)|0);if(!z){P=O}else{z=0;L=35;break L12}}else{P=c[J>>2]|0}if((P|0)==-1){c[B>>2]=0;L=22;break}else{J=(I|0)==0;if(N^J){Q=I;R=J;break}else{S=F;T=I;U=J;break L12}}}}while(0);if((L|0)==22){L=0;if(N){S=F;T=0;U=1;break}else{Q=0;R=1}}I=d[p]|0;J=(I&1|0)==0;if(((c[q>>2]|0)-F|0)==((J?I>>>1:c[D>>2]|0)|0)){if(J){V=I>>>1;W=I>>>1}else{I=c[D>>2]|0;V=I;W=I}z=0;aT(78,o|0,V<<1|0,0);if(z){z=0;L=35;break}if((a[p]&1)==0){X=10}else{X=(c[C>>2]&-2)-1|0}z=0;aT(78,o|0,X|0,0);if(z){z=0;L=35;break}if((a[p]&1)==0){Y=x}else{Y=c[y>>2]|0}c[q>>2]=Y+W;Z=Y}else{Z=F}I=H+12|0;J=c[I>>2]|0;O=H+16|0;if((J|0)==(c[O>>2]|0)){_=(z=0,av(c[(c[H>>2]|0)+36>>2]|0,H|0)|0);if(!z){$=_}else{z=0;L=35;break}}else{$=c[J>>2]|0}if((Ou($,v,Z,q,t,E,n,l,s,u)|0)!=0){S=Z;T=Q;U=R;break}J=c[I>>2]|0;if((J|0)==(c[O>>2]|0)){O=c[(c[H>>2]|0)+40>>2]|0;z=0,av(O|0,H|0)|0;if(!z){F=Z;G=H;continue}else{z=0;L=35;break}}else{c[I>>2]=J+4;F=Z;G=H;continue}}if((L|0)==35){G=b$(-1,-1)|0;aa=M;ab=G;Ma(o);Ma(n);bj(ab|0)}G=d[n]|0;if((G&1|0)==0){ac=G>>>1}else{ac=c[n+4>>2]|0}do{if((ac|0)!=0){G=c[s>>2]|0;if((G-r|0)>=160){break}F=c[t>>2]|0;c[s>>2]=G+4;c[G>>2]=F}}while(0);F=(z=0,aW(4,S|0,c[q>>2]|0,j|0,v|0)|0);if(z){z=0;break}c[k>>2]=F;Qo(n,l,c[s>>2]|0,j);do{if(N){ad=0}else{F=c[H+12>>2]|0;if((F|0)==(c[H+16>>2]|0)){G=(z=0,av(c[(c[H>>2]|0)+36>>2]|0,H|0)|0);if(!z){ae=G}else{z=0;break L6}}else{ae=c[F>>2]|0}if((ae|0)!=-1){ad=H;break}c[A>>2]=0;ad=0}}while(0);A=(ad|0)==0;do{if(U){L=64}else{l=c[T+12>>2]|0;if((l|0)==(c[T+16>>2]|0)){F=(z=0,av(c[(c[T>>2]|0)+36>>2]|0,T|0)|0);if(!z){af=F}else{z=0;break L6}}else{af=c[l>>2]|0}if((af|0)==-1){c[B>>2]=0;L=64;break}if(!(A^(T|0)==0)){break}ag=b|0;c[ag>>2]=ad;Ma(o);Ma(n);i=e;return}}while(0);do{if((L|0)==64){if(A){break}ag=b|0;c[ag>>2]=ad;Ma(o);Ma(n);i=e;return}}while(0);c[j>>2]=c[j>>2]|2;ag=b|0;c[ag>>2]=ad;Ma(o);Ma(n);i=e;return}else{z=0}}while(0);e=b$(-1,-1)|0;aa=M;ab=e;Ma(o);Ma(n);bj(ab|0)}function Oj(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];Ok(a,0,j,k,f,g,h);i=b;return}function Ok(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0;e=i;i=i+144|0;l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[l>>2];l=e|0;m=e+104|0;n=e+112|0;o=e+128|0;p=o;q=i;i=i+4|0;i=i+7&-8;r=i;i=i+160|0;s=i;i=i+4|0;i=i+7&-8;t=i;i=i+4|0;i=i+7&-8;u=c[h+4>>2]&74;if((u|0)==0){v=0}else if((u|0)==64){v=8}else if((u|0)==8){v=16}else{v=10}u=l|0;Oy(n,h,u,m);TI(p|0,0,12)|0;h=o;z=0;aT(78,o|0,10,0);L6:do{if(!z){if((a[p]&1)==0){l=h+1|0;w=l;x=l;y=o+8|0}else{l=o+8|0;w=c[l>>2]|0;x=h+1|0;y=l}c[q>>2]=w;l=r|0;c[s>>2]=l;c[t>>2]=0;A=f|0;B=g|0;C=o|0;D=o+4|0;E=c[m>>2]|0;F=w;G=c[A>>2]|0;L12:while(1){do{if((G|0)==0){H=0}else{I=c[G+12>>2]|0;if((I|0)==(c[G+16>>2]|0)){J=(z=0,av(c[(c[G>>2]|0)+36>>2]|0,G|0)|0);if(!z){K=J}else{z=0;L=35;break L12}}else{K=c[I>>2]|0}if((K|0)!=-1){H=G;break}c[A>>2]=0;H=0}}while(0);N=(H|0)==0;I=c[B>>2]|0;do{if((I|0)==0){L=22}else{J=c[I+12>>2]|0;if((J|0)==(c[I+16>>2]|0)){O=(z=0,av(c[(c[I>>2]|0)+36>>2]|0,I|0)|0);if(!z){P=O}else{z=0;L=35;break L12}}else{P=c[J>>2]|0}if((P|0)==-1){c[B>>2]=0;L=22;break}else{J=(I|0)==0;if(N^J){Q=I;R=J;break}else{S=F;T=I;U=J;break L12}}}}while(0);if((L|0)==22){L=0;if(N){S=F;T=0;U=1;break}else{Q=0;R=1}}I=d[p]|0;J=(I&1|0)==0;if(((c[q>>2]|0)-F|0)==((J?I>>>1:c[D>>2]|0)|0)){if(J){V=I>>>1;W=I>>>1}else{I=c[D>>2]|0;V=I;W=I}z=0;aT(78,o|0,V<<1|0,0);if(z){z=0;L=35;break}if((a[p]&1)==0){X=10}else{X=(c[C>>2]&-2)-1|0}z=0;aT(78,o|0,X|0,0);if(z){z=0;L=35;break}if((a[p]&1)==0){Y=x}else{Y=c[y>>2]|0}c[q>>2]=Y+W;Z=Y}else{Z=F}I=H+12|0;J=c[I>>2]|0;O=H+16|0;if((J|0)==(c[O>>2]|0)){_=(z=0,av(c[(c[H>>2]|0)+36>>2]|0,H|0)|0);if(!z){$=_}else{z=0;L=35;break}}else{$=c[J>>2]|0}if((Ou($,v,Z,q,t,E,n,l,s,u)|0)!=0){S=Z;T=Q;U=R;break}J=c[I>>2]|0;if((J|0)==(c[O>>2]|0)){O=c[(c[H>>2]|0)+40>>2]|0;z=0,av(O|0,H|0)|0;if(!z){F=Z;G=H;continue}else{z=0;L=35;break}}else{c[I>>2]=J+4;F=Z;G=H;continue}}if((L|0)==35){G=b$(-1,-1)|0;aa=M;ab=G;Ma(o);Ma(n);bj(ab|0)}G=d[n]|0;if((G&1|0)==0){ac=G>>>1}else{ac=c[n+4>>2]|0}do{if((ac|0)!=0){G=c[s>>2]|0;if((G-r|0)>=160){break}F=c[t>>2]|0;c[s>>2]=G+4;c[G>>2]=F}}while(0);F=(z=0,aW(36,S|0,c[q>>2]|0,j|0,v|0)|0);if(z){z=0;break}c[k>>2]=F;Qo(n,l,c[s>>2]|0,j);do{if(N){ad=0}else{F=c[H+12>>2]|0;if((F|0)==(c[H+16>>2]|0)){G=(z=0,av(c[(c[H>>2]|0)+36>>2]|0,H|0)|0);if(!z){ae=G}else{z=0;break L6}}else{ae=c[F>>2]|0}if((ae|0)!=-1){ad=H;break}c[A>>2]=0;ad=0}}while(0);A=(ad|0)==0;do{if(U){L=64}else{l=c[T+12>>2]|0;if((l|0)==(c[T+16>>2]|0)){F=(z=0,av(c[(c[T>>2]|0)+36>>2]|0,T|0)|0);if(!z){af=F}else{z=0;break L6}}else{af=c[l>>2]|0}if((af|0)==-1){c[B>>2]=0;L=64;break}if(!(A^(T|0)==0)){break}ag=b|0;c[ag>>2]=ad;Ma(o);Ma(n);i=e;return}}while(0);do{if((L|0)==64){if(A){break}ag=b|0;c[ag>>2]=ad;Ma(o);Ma(n);i=e;return}}while(0);c[j>>2]=c[j>>2]|2;ag=b|0;c[ag>>2]=ad;Ma(o);Ma(n);i=e;return}else{z=0}}while(0);e=b$(-1,-1)|0;aa=M;ab=e;Ma(o);Ma(n);bj(ab|0)}function Ol(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];Om(a,0,j,k,f,g,h);i=b;return}function Om(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0;e=i;i=i+144|0;l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[l>>2];l=e|0;m=e+104|0;n=e+112|0;o=e+128|0;p=o;q=i;i=i+4|0;i=i+7&-8;r=i;i=i+160|0;s=i;i=i+4|0;i=i+7&-8;t=i;i=i+4|0;i=i+7&-8;u=c[h+4>>2]&74;if((u|0)==0){v=0}else if((u|0)==8){v=16}else if((u|0)==64){v=8}else{v=10}u=l|0;Oy(n,h,u,m);TI(p|0,0,12)|0;h=o;z=0;aT(78,o|0,10,0);L6:do{if(!z){if((a[p]&1)==0){l=h+1|0;w=l;x=l;y=o+8|0}else{l=o+8|0;w=c[l>>2]|0;x=h+1|0;y=l}c[q>>2]=w;l=r|0;c[s>>2]=l;c[t>>2]=0;A=f|0;B=g|0;C=o|0;D=o+4|0;E=c[m>>2]|0;F=w;G=c[A>>2]|0;L12:while(1){do{if((G|0)==0){H=0}else{I=c[G+12>>2]|0;if((I|0)==(c[G+16>>2]|0)){J=(z=0,av(c[(c[G>>2]|0)+36>>2]|0,G|0)|0);if(!z){K=J}else{z=0;L=35;break L12}}else{K=c[I>>2]|0}if((K|0)!=-1){H=G;break}c[A>>2]=0;H=0}}while(0);N=(H|0)==0;I=c[B>>2]|0;do{if((I|0)==0){L=22}else{J=c[I+12>>2]|0;if((J|0)==(c[I+16>>2]|0)){O=(z=0,av(c[(c[I>>2]|0)+36>>2]|0,I|0)|0);if(!z){P=O}else{z=0;L=35;break L12}}else{P=c[J>>2]|0}if((P|0)==-1){c[B>>2]=0;L=22;break}else{J=(I|0)==0;if(N^J){Q=I;R=J;break}else{S=F;T=I;U=J;break L12}}}}while(0);if((L|0)==22){L=0;if(N){S=F;T=0;U=1;break}else{Q=0;R=1}}I=d[p]|0;J=(I&1|0)==0;if(((c[q>>2]|0)-F|0)==((J?I>>>1:c[D>>2]|0)|0)){if(J){V=I>>>1;W=I>>>1}else{I=c[D>>2]|0;V=I;W=I}z=0;aT(78,o|0,V<<1|0,0);if(z){z=0;L=35;break}if((a[p]&1)==0){X=10}else{X=(c[C>>2]&-2)-1|0}z=0;aT(78,o|0,X|0,0);if(z){z=0;L=35;break}if((a[p]&1)==0){Y=x}else{Y=c[y>>2]|0}c[q>>2]=Y+W;Z=Y}else{Z=F}I=H+12|0;J=c[I>>2]|0;O=H+16|0;if((J|0)==(c[O>>2]|0)){_=(z=0,av(c[(c[H>>2]|0)+36>>2]|0,H|0)|0);if(!z){$=_}else{z=0;L=35;break}}else{$=c[J>>2]|0}if((Ou($,v,Z,q,t,E,n,l,s,u)|0)!=0){S=Z;T=Q;U=R;break}J=c[I>>2]|0;if((J|0)==(c[O>>2]|0)){O=c[(c[H>>2]|0)+40>>2]|0;z=0,av(O|0,H|0)|0;if(!z){F=Z;G=H;continue}else{z=0;L=35;break}}else{c[I>>2]=J+4;F=Z;G=H;continue}}if((L|0)==35){G=b$(-1,-1)|0;aa=M;ab=G;Ma(o);Ma(n);bj(ab|0)}G=d[n]|0;if((G&1|0)==0){ac=G>>>1}else{ac=c[n+4>>2]|0}do{if((ac|0)!=0){G=c[s>>2]|0;if((G-r|0)>=160){break}F=c[t>>2]|0;c[s>>2]=G+4;c[G>>2]=F}}while(0);F=(z=0,aW(24,S|0,c[q>>2]|0,j|0,v|0)|0);G=M;if(z){z=0;break}c[k>>2]=F;c[k+4>>2]=G;Qo(n,l,c[s>>2]|0,j);do{if(N){ad=0}else{G=c[H+12>>2]|0;if((G|0)==(c[H+16>>2]|0)){F=(z=0,av(c[(c[H>>2]|0)+36>>2]|0,H|0)|0);if(!z){ae=F}else{z=0;break L6}}else{ae=c[G>>2]|0}if((ae|0)!=-1){ad=H;break}c[A>>2]=0;ad=0}}while(0);A=(ad|0)==0;do{if(U){L=64}else{l=c[T+12>>2]|0;if((l|0)==(c[T+16>>2]|0)){G=(z=0,av(c[(c[T>>2]|0)+36>>2]|0,T|0)|0);if(!z){af=G}else{z=0;break L6}}else{af=c[l>>2]|0}if((af|0)==-1){c[B>>2]=0;L=64;break}if(!(A^(T|0)==0)){break}ag=b|0;c[ag>>2]=ad;Ma(o);Ma(n);i=e;return}}while(0);do{if((L|0)==64){if(A){break}ag=b|0;c[ag>>2]=ad;Ma(o);Ma(n);i=e;return}}while(0);c[j>>2]=c[j>>2]|2;ag=b|0;c[ag>>2]=ad;Ma(o);Ma(n);i=e;return}else{z=0}}while(0);e=b$(-1,-1)|0;aa=M;ab=e;Ma(o);Ma(n);bj(ab|0)}function On(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];Oo(a,0,j,k,f,g,h);i=b;return}function Oo(b,e,f,h,j,k,l){b=b|0;e=e|0;f=f|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0.0,ai=0,aj=0,ak=0,al=0;e=i;i=i+176|0;m=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[m>>2];m=h;h=i;i=i+4|0;i=i+7&-8;c[h>>2]=c[m>>2];m=e+128|0;n=e+136|0;o=e+144|0;p=e+160|0;q=p;r=i;i=i+4|0;i=i+7&-8;s=i;i=i+160|0;t=i;i=i+4|0;i=i+7&-8;u=i;i=i+4|0;i=i+7&-8;v=i;i=i+1|0;i=i+7&-8;w=i;i=i+1|0;i=i+7&-8;x=e|0;Oz(o,j,x,m,n);TI(q|0,0,12)|0;j=p;z=0;aT(78,p|0,10,0);L1:do{if(!z){if((a[q]&1)==0){y=j+1|0;A=y;B=y;C=p+8|0}else{y=p+8|0;A=c[y>>2]|0;B=j+1|0;C=y}c[r>>2]=A;y=s|0;c[t>>2]=y;c[u>>2]=0;a[v]=1;a[w]=69;D=f|0;E=h|0;F=p|0;G=p+4|0;H=c[m>>2]|0;I=c[n>>2]|0;J=A;K=c[D>>2]|0;L7:while(1){do{if((K|0)==0){L=0}else{N=c[K+12>>2]|0;if((N|0)==(c[K+16>>2]|0)){O=(z=0,av(c[(c[K>>2]|0)+36>>2]|0,K|0)|0);if(!z){P=O}else{z=0;Q=31;break L7}}else{P=c[N>>2]|0}if((P|0)!=-1){L=K;break}c[D>>2]=0;L=0}}while(0);R=(L|0)==0;N=c[E>>2]|0;do{if((N|0)==0){Q=18}else{O=c[N+12>>2]|0;if((O|0)==(c[N+16>>2]|0)){S=(z=0,av(c[(c[N>>2]|0)+36>>2]|0,N|0)|0);if(!z){T=S}else{z=0;Q=31;break L7}}else{T=c[O>>2]|0}if((T|0)==-1){c[E>>2]=0;Q=18;break}else{O=(N|0)==0;if(R^O){U=N;V=O;break}else{W=J;X=N;Y=O;break L7}}}}while(0);if((Q|0)==18){Q=0;if(R){W=J;X=0;Y=1;break}else{U=0;V=1}}N=d[q]|0;O=(N&1|0)==0;if(((c[r>>2]|0)-J|0)==((O?N>>>1:c[G>>2]|0)|0)){if(O){Z=N>>>1;_=N>>>1}else{N=c[G>>2]|0;Z=N;_=N}z=0;aT(78,p|0,Z<<1|0,0);if(z){z=0;Q=31;break}if((a[q]&1)==0){$=10}else{$=(c[F>>2]&-2)-1|0}z=0;aT(78,p|0,$|0,0);if(z){z=0;Q=31;break}if((a[q]&1)==0){aa=B}else{aa=c[C>>2]|0}c[r>>2]=aa+_;ab=aa}else{ab=J}N=L+12|0;O=c[N>>2]|0;S=L+16|0;if((O|0)==(c[S>>2]|0)){ac=(z=0,av(c[(c[L>>2]|0)+36>>2]|0,L|0)|0);if(!z){ad=ac}else{z=0;Q=31;break}}else{ad=c[O>>2]|0}if((OA(ad,v,w,ab,r,H,I,o,y,t,u,x)|0)!=0){W=ab;X=U;Y=V;break}O=c[N>>2]|0;if((O|0)==(c[S>>2]|0)){S=c[(c[L>>2]|0)+40>>2]|0;z=0,av(S|0,L|0)|0;if(!z){J=ab;K=L;continue}else{z=0;Q=31;break}}else{c[N>>2]=O+4;J=ab;K=L;continue}}if((Q|0)==31){K=b$(-1,-1)|0;ae=M;af=K;Ma(p);Ma(o);bj(af|0)}K=d[o]|0;if((K&1|0)==0){ag=K>>>1}else{ag=c[o+4>>2]|0}do{if((ag|0)!=0){if((a[v]&1)==0){break}K=c[t>>2]|0;if((K-s|0)>=160){break}J=c[u>>2]|0;c[t>>2]=K+4;c[K>>2]=J}}while(0);ah=(z=0,+(+aG(2,W|0,c[r>>2]|0,k|0)));if(z){z=0;break}g[l>>2]=ah;Qo(o,y,c[t>>2]|0,k);do{if(R){ai=0}else{J=c[L+12>>2]|0;if((J|0)==(c[L+16>>2]|0)){K=(z=0,av(c[(c[L>>2]|0)+36>>2]|0,L|0)|0);if(!z){aj=K}else{z=0;break L1}}else{aj=c[J>>2]|0}if((aj|0)!=-1){ai=L;break}c[D>>2]=0;ai=0}}while(0);D=(ai|0)==0;do{if(Y){Q=61}else{y=c[X+12>>2]|0;if((y|0)==(c[X+16>>2]|0)){J=(z=0,av(c[(c[X>>2]|0)+36>>2]|0,X|0)|0);if(!z){ak=J}else{z=0;break L1}}else{ak=c[y>>2]|0}if((ak|0)==-1){c[E>>2]=0;Q=61;break}if(!(D^(X|0)==0)){break}al=b|0;c[al>>2]=ai;Ma(p);Ma(o);i=e;return}}while(0);do{if((Q|0)==61){if(D){break}al=b|0;c[al>>2]=ai;Ma(p);Ma(o);i=e;return}}while(0);c[k>>2]=c[k>>2]|2;al=b|0;c[al>>2]=ai;Ma(p);Ma(o);i=e;return}else{z=0}}while(0);e=b$(-1,-1)|0;ae=M;af=e;Ma(p);Ma(o);bj(af|0)}function Op(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];Oq(a,0,j,k,f,g,h);i=b;return}function Oq(b,e,f,g,j,k,l){b=b|0;e=e|0;f=f|0;g=g|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0.0,ai=0,aj=0,ak=0,al=0;e=i;i=i+176|0;m=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[m>>2];m=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[m>>2];m=e+128|0;n=e+136|0;o=e+144|0;p=e+160|0;q=p;r=i;i=i+4|0;i=i+7&-8;s=i;i=i+160|0;t=i;i=i+4|0;i=i+7&-8;u=i;i=i+4|0;i=i+7&-8;v=i;i=i+1|0;i=i+7&-8;w=i;i=i+1|0;i=i+7&-8;x=e|0;Oz(o,j,x,m,n);TI(q|0,0,12)|0;j=p;z=0;aT(78,p|0,10,0);L1:do{if(!z){if((a[q]&1)==0){y=j+1|0;A=y;B=y;C=p+8|0}else{y=p+8|0;A=c[y>>2]|0;B=j+1|0;C=y}c[r>>2]=A;y=s|0;c[t>>2]=y;c[u>>2]=0;a[v]=1;a[w]=69;D=f|0;E=g|0;F=p|0;G=p+4|0;H=c[m>>2]|0;I=c[n>>2]|0;J=A;K=c[D>>2]|0;L7:while(1){do{if((K|0)==0){L=0}else{N=c[K+12>>2]|0;if((N|0)==(c[K+16>>2]|0)){O=(z=0,av(c[(c[K>>2]|0)+36>>2]|0,K|0)|0);if(!z){P=O}else{z=0;Q=31;break L7}}else{P=c[N>>2]|0}if((P|0)!=-1){L=K;break}c[D>>2]=0;L=0}}while(0);R=(L|0)==0;N=c[E>>2]|0;do{if((N|0)==0){Q=18}else{O=c[N+12>>2]|0;if((O|0)==(c[N+16>>2]|0)){S=(z=0,av(c[(c[N>>2]|0)+36>>2]|0,N|0)|0);if(!z){T=S}else{z=0;Q=31;break L7}}else{T=c[O>>2]|0}if((T|0)==-1){c[E>>2]=0;Q=18;break}else{O=(N|0)==0;if(R^O){U=N;V=O;break}else{W=J;X=N;Y=O;break L7}}}}while(0);if((Q|0)==18){Q=0;if(R){W=J;X=0;Y=1;break}else{U=0;V=1}}N=d[q]|0;O=(N&1|0)==0;if(((c[r>>2]|0)-J|0)==((O?N>>>1:c[G>>2]|0)|0)){if(O){Z=N>>>1;_=N>>>1}else{N=c[G>>2]|0;Z=N;_=N}z=0;aT(78,p|0,Z<<1|0,0);if(z){z=0;Q=31;break}if((a[q]&1)==0){$=10}else{$=(c[F>>2]&-2)-1|0}z=0;aT(78,p|0,$|0,0);if(z){z=0;Q=31;break}if((a[q]&1)==0){aa=B}else{aa=c[C>>2]|0}c[r>>2]=aa+_;ab=aa}else{ab=J}N=L+12|0;O=c[N>>2]|0;S=L+16|0;if((O|0)==(c[S>>2]|0)){ac=(z=0,av(c[(c[L>>2]|0)+36>>2]|0,L|0)|0);if(!z){ad=ac}else{z=0;Q=31;break}}else{ad=c[O>>2]|0}if((OA(ad,v,w,ab,r,H,I,o,y,t,u,x)|0)!=0){W=ab;X=U;Y=V;break}O=c[N>>2]|0;if((O|0)==(c[S>>2]|0)){S=c[(c[L>>2]|0)+40>>2]|0;z=0,av(S|0,L|0)|0;if(!z){J=ab;K=L;continue}else{z=0;Q=31;break}}else{c[N>>2]=O+4;J=ab;K=L;continue}}if((Q|0)==31){K=b$(-1,-1)|0;ae=M;af=K;Ma(p);Ma(o);bj(af|0)}K=d[o]|0;if((K&1|0)==0){ag=K>>>1}else{ag=c[o+4>>2]|0}do{if((ag|0)!=0){if((a[v]&1)==0){break}K=c[t>>2]|0;if((K-s|0)>=160){break}J=c[u>>2]|0;c[t>>2]=K+4;c[K>>2]=J}}while(0);ah=(z=0,+(+aP(4,W|0,c[r>>2]|0,k|0)));if(z){z=0;break}h[l>>3]=ah;Qo(o,y,c[t>>2]|0,k);do{if(R){ai=0}else{J=c[L+12>>2]|0;if((J|0)==(c[L+16>>2]|0)){K=(z=0,av(c[(c[L>>2]|0)+36>>2]|0,L|0)|0);if(!z){aj=K}else{z=0;break L1}}else{aj=c[J>>2]|0}if((aj|0)!=-1){ai=L;break}c[D>>2]=0;ai=0}}while(0);D=(ai|0)==0;do{if(Y){Q=61}else{y=c[X+12>>2]|0;if((y|0)==(c[X+16>>2]|0)){J=(z=0,av(c[(c[X>>2]|0)+36>>2]|0,X|0)|0);if(!z){ak=J}else{z=0;break L1}}else{ak=c[y>>2]|0}if((ak|0)==-1){c[E>>2]=0;Q=61;break}if(!(D^(X|0)==0)){break}al=b|0;c[al>>2]=ai;Ma(p);Ma(o);i=e;return}}while(0);do{if((Q|0)==61){if(D){break}al=b|0;c[al>>2]=ai;Ma(p);Ma(o);i=e;return}}while(0);c[k>>2]=c[k>>2]|2;al=b|0;c[al>>2]=ai;Ma(p);Ma(o);i=e;return}else{z=0}}while(0);e=b$(-1,-1)|0;ae=M;af=e;Ma(p);Ma(o);bj(af|0)}function Or(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0;b=i;i=i+16|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;c[j>>2]=c[d>>2];c[k>>2]=c[e>>2];Os(a,0,j,k,f,g,h);i=b;return}function Os(b,e,f,g,j,k,l){b=b|0;e=e|0;f=f|0;g=g|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0.0,ai=0,aj=0,ak=0,al=0;e=i;i=i+176|0;m=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[m>>2];m=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[m>>2];m=e+128|0;n=e+136|0;o=e+144|0;p=e+160|0;q=p;r=i;i=i+4|0;i=i+7&-8;s=i;i=i+160|0;t=i;i=i+4|0;i=i+7&-8;u=i;i=i+4|0;i=i+7&-8;v=i;i=i+1|0;i=i+7&-8;w=i;i=i+1|0;i=i+7&-8;x=e|0;Oz(o,j,x,m,n);TI(q|0,0,12)|0;j=p;z=0;aT(78,p|0,10,0);L1:do{if(!z){if((a[q]&1)==0){y=j+1|0;A=y;B=y;C=p+8|0}else{y=p+8|0;A=c[y>>2]|0;B=j+1|0;C=y}c[r>>2]=A;y=s|0;c[t>>2]=y;c[u>>2]=0;a[v]=1;a[w]=69;D=f|0;E=g|0;F=p|0;G=p+4|0;H=c[m>>2]|0;I=c[n>>2]|0;J=A;K=c[D>>2]|0;L7:while(1){do{if((K|0)==0){L=0}else{N=c[K+12>>2]|0;if((N|0)==(c[K+16>>2]|0)){O=(z=0,av(c[(c[K>>2]|0)+36>>2]|0,K|0)|0);if(!z){P=O}else{z=0;Q=31;break L7}}else{P=c[N>>2]|0}if((P|0)!=-1){L=K;break}c[D>>2]=0;L=0}}while(0);R=(L|0)==0;N=c[E>>2]|0;do{if((N|0)==0){Q=18}else{O=c[N+12>>2]|0;if((O|0)==(c[N+16>>2]|0)){S=(z=0,av(c[(c[N>>2]|0)+36>>2]|0,N|0)|0);if(!z){T=S}else{z=0;Q=31;break L7}}else{T=c[O>>2]|0}if((T|0)==-1){c[E>>2]=0;Q=18;break}else{O=(N|0)==0;if(R^O){U=N;V=O;break}else{W=J;X=N;Y=O;break L7}}}}while(0);if((Q|0)==18){Q=0;if(R){W=J;X=0;Y=1;break}else{U=0;V=1}}N=d[q]|0;O=(N&1|0)==0;if(((c[r>>2]|0)-J|0)==((O?N>>>1:c[G>>2]|0)|0)){if(O){Z=N>>>1;_=N>>>1}else{N=c[G>>2]|0;Z=N;_=N}z=0;aT(78,p|0,Z<<1|0,0);if(z){z=0;Q=31;break}if((a[q]&1)==0){$=10}else{$=(c[F>>2]&-2)-1|0}z=0;aT(78,p|0,$|0,0);if(z){z=0;Q=31;break}if((a[q]&1)==0){aa=B}else{aa=c[C>>2]|0}c[r>>2]=aa+_;ab=aa}else{ab=J}N=L+12|0;O=c[N>>2]|0;S=L+16|0;if((O|0)==(c[S>>2]|0)){ac=(z=0,av(c[(c[L>>2]|0)+36>>2]|0,L|0)|0);if(!z){ad=ac}else{z=0;Q=31;break}}else{ad=c[O>>2]|0}if((OA(ad,v,w,ab,r,H,I,o,y,t,u,x)|0)!=0){W=ab;X=U;Y=V;break}O=c[N>>2]|0;if((O|0)==(c[S>>2]|0)){S=c[(c[L>>2]|0)+40>>2]|0;z=0,av(S|0,L|0)|0;if(!z){J=ab;K=L;continue}else{z=0;Q=31;break}}else{c[N>>2]=O+4;J=ab;K=L;continue}}if((Q|0)==31){K=b$(-1,-1)|0;ae=M;af=K;Ma(p);Ma(o);bj(af|0)}K=d[o]|0;if((K&1|0)==0){ag=K>>>1}else{ag=c[o+4>>2]|0}do{if((ag|0)!=0){if((a[v]&1)==0){break}K=c[t>>2]|0;if((K-s|0)>=160){break}J=c[u>>2]|0;c[t>>2]=K+4;c[K>>2]=J}}while(0);ah=(z=0,+(+aP(2,W|0,c[r>>2]|0,k|0)));if(z){z=0;break}h[l>>3]=ah;Qo(o,y,c[t>>2]|0,k);do{if(R){ai=0}else{J=c[L+12>>2]|0;if((J|0)==(c[L+16>>2]|0)){K=(z=0,av(c[(c[L>>2]|0)+36>>2]|0,L|0)|0);if(!z){aj=K}else{z=0;break L1}}else{aj=c[J>>2]|0}if((aj|0)!=-1){ai=L;break}c[D>>2]=0;ai=0}}while(0);D=(ai|0)==0;do{if(Y){Q=61}else{y=c[X+12>>2]|0;if((y|0)==(c[X+16>>2]|0)){J=(z=0,av(c[(c[X>>2]|0)+36>>2]|0,X|0)|0);if(!z){ak=J}else{z=0;break L1}}else{ak=c[y>>2]|0}if((ak|0)==-1){c[E>>2]=0;Q=61;break}if(!(D^(X|0)==0)){break}al=b|0;c[al>>2]=ai;Ma(p);Ma(o);i=e;return}}while(0);do{if((Q|0)==61){if(D){break}al=b|0;c[al>>2]=ai;Ma(p);Ma(o);i=e;return}}while(0);c[k>>2]=c[k>>2]|2;al=b|0;c[al>>2]=ai;Ma(p);Ma(o);i=e;return}else{z=0}}while(0);e=b$(-1,-1)|0;ae=M;af=e;Ma(p);Ma(o);bj(af|0)}function Ot(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0;e=i;i=i+136|0;l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[l>>2];l=e|0;m=e+16|0;n=e+120|0;o=i;i=i+4|0;i=i+7&-8;p=i;i=i+12|0;i=i+7&-8;q=i;i=i+4|0;i=i+7&-8;r=i;i=i+160|0;s=i;i=i+4|0;i=i+7&-8;t=i;i=i+4|0;i=i+7&-8;TI(n|0,0,12)|0;u=p;z=0;at(438,o|0,h|0);if(z){z=0;h=b$(-1,-1)|0;v=M;w=h;Ma(n);x=w;y=0;A=x;B=v;bj(A|0)}h=o|0;o=c[h>>2]|0;if((c[12702]|0)==-1){C=4}else{c[l>>2]=50808;c[l+4>>2]=532;c[l+8>>2]=0;z=0;aT(92,50808,l|0,602);if(!z){C=4}else{z=0}}L7:do{if((C|0)==4){l=(c[12703]|0)-1|0;D=c[o+8>>2]|0;do{if((c[o+12>>2]|0)-D>>2>>>0>l>>>0){E=c[D+(l<<2)>>2]|0;if((E|0)==0){break}F=E;G=m|0;H=c[(c[E>>2]|0)+48>>2]|0;z=0,aW(H|0,F|0,39208,39234,G|0)|0;if(z){z=0;break L7}Ls(c[h>>2]|0)|0;TI(u|0,0,12)|0;F=p;z=0;aT(78,p|0,10,0);L13:do{if(!z){if((a[u]&1)==0){H=F+1|0;I=H;J=H;K=p+8|0}else{H=p+8|0;I=c[H>>2]|0;J=F+1|0;K=H}c[q>>2]=I;H=r|0;c[s>>2]=H;c[t>>2]=0;E=f|0;L=g|0;N=p|0;O=p+4|0;P=I;Q=c[E>>2]|0;L19:while(1){do{if((Q|0)==0){R=0}else{S=c[Q+12>>2]|0;if((S|0)==(c[Q+16>>2]|0)){T=(z=0,av(c[(c[Q>>2]|0)+36>>2]|0,Q|0)|0);if(!z){U=T}else{z=0;C=41;break L19}}else{U=c[S>>2]|0}if((U|0)!=-1){R=Q;break}c[E>>2]=0;R=0}}while(0);S=(R|0)==0;T=c[L>>2]|0;do{if((T|0)==0){C=26}else{V=c[T+12>>2]|0;if((V|0)==(c[T+16>>2]|0)){W=(z=0,av(c[(c[T>>2]|0)+36>>2]|0,T|0)|0);if(!z){X=W}else{z=0;C=41;break L19}}else{X=c[V>>2]|0}if((X|0)==-1){c[L>>2]=0;C=26;break}else{if(S^(T|0)==0){break}else{Y=P;break L19}}}}while(0);if((C|0)==26){C=0;if(S){Y=P;break}}T=d[u]|0;V=(T&1|0)==0;if(((c[q>>2]|0)-P|0)==((V?T>>>1:c[O>>2]|0)|0)){if(V){Z=T>>>1;_=T>>>1}else{T=c[O>>2]|0;Z=T;_=T}z=0;aT(78,p|0,Z<<1|0,0);if(z){z=0;C=41;break}if((a[u]&1)==0){$=10}else{$=(c[N>>2]&-2)-1|0}z=0;aT(78,p|0,$|0,0);if(z){z=0;C=41;break}if((a[u]&1)==0){aa=J}else{aa=c[K>>2]|0}c[q>>2]=aa+_;ab=aa}else{ab=P}T=R+12|0;V=c[T>>2]|0;W=R+16|0;if((V|0)==(c[W>>2]|0)){ac=(z=0,av(c[(c[R>>2]|0)+36>>2]|0,R|0)|0);if(!z){ad=ac}else{z=0;C=41;break}}else{ad=c[V>>2]|0}if((Ou(ad,16,ab,q,t,0,n,H,s,G)|0)!=0){Y=ab;break}V=c[T>>2]|0;if((V|0)==(c[W>>2]|0)){W=c[(c[R>>2]|0)+40>>2]|0;z=0,av(W|0,R|0)|0;if(!z){P=ab;Q=R;continue}else{z=0;C=41;break}}else{c[T>>2]=V+4;P=ab;Q=R;continue}}if((C|0)==41){Q=b$(-1,-1)|0;ae=M;af=Q;break}a[Y+3|0]=0;do{if((a[53952]|0)==0){if((bH(53952)|0)==0){break}Q=(z=0,aA(64,2147483647,12792,0)|0);if(!z){c[12314]=Q;break}else{z=0;Q=b$(-1,-1)|0;ae=M;af=Q;break L13}}}while(0);Q=(z=0,aW(26,Y|0,c[12314]|0,11216,(P=i,i=i+8|0,c[P>>2]=k,P)|0)|0);i=P;if(z){z=0;C=42;break}if((Q|0)!=1){c[j>>2]=4}Q=c[E>>2]|0;do{if((Q|0)==0){ag=0}else{P=c[Q+12>>2]|0;if((P|0)==(c[Q+16>>2]|0)){H=(z=0,av(c[(c[Q>>2]|0)+36>>2]|0,Q|0)|0);if(!z){ah=H}else{z=0;C=42;break L13}}else{ah=c[P>>2]|0}if((ah|0)!=-1){ag=Q;break}c[E>>2]=0;ag=0}}while(0);E=(ag|0)==0;Q=c[L>>2]|0;do{if((Q|0)==0){C=71}else{P=c[Q+12>>2]|0;if((P|0)==(c[Q+16>>2]|0)){H=(z=0,av(c[(c[Q>>2]|0)+36>>2]|0,Q|0)|0);if(!z){ai=H}else{z=0;C=42;break L13}}else{ai=c[P>>2]|0}if((ai|0)==-1){c[L>>2]=0;C=71;break}if(!(E^(Q|0)==0)){break}aj=b|0;c[aj>>2]=ag;Ma(p);Ma(n);i=e;return}}while(0);do{if((C|0)==71){if(E){break}aj=b|0;c[aj>>2]=ag;Ma(p);Ma(n);i=e;return}}while(0);c[j>>2]=c[j>>2]|2;aj=b|0;c[aj>>2]=ag;Ma(p);Ma(n);i=e;return}else{z=0;C=42}}while(0);if((C|0)==42){G=b$(-1,-1)|0;ae=M;af=G}Ma(p);v=ae;w=af;Ma(n);x=w;y=0;A=x;B=v;bj(A|0)}}while(0);l=ct(4)|0;S$(l);z=0;aT(126,l|0,35480,118);if(z){z=0;break}}}while(0);af=b$(-1,-1)|0;ae=M;Ls(c[h>>2]|0)|0;v=ae;w=af;Ma(n);x=w;y=0;A=x;B=v;bj(A|0)}function Ou(b,e,f,g,h,i,j,k,l,m){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0;n=c[g>>2]|0;o=(n|0)==(f|0);do{if(o){p=(c[m+96>>2]|0)==(b|0);if(!p){if((c[m+100>>2]|0)!=(b|0)){break}}c[g>>2]=f+1;a[f]=p?43:45;c[h>>2]=0;q=0;return q|0}}while(0);p=d[j]|0;if((p&1|0)==0){r=p>>>1}else{r=c[j+4>>2]|0}if((r|0)!=0&(b|0)==(i|0)){i=c[l>>2]|0;if((i-k|0)>=160){q=0;return q|0}k=c[h>>2]|0;c[l>>2]=i+4;c[i>>2]=k;c[h>>2]=0;q=0;return q|0}k=m+104|0;i=m;while(1){l=i+4|0;if((c[i>>2]|0)==(b|0)){s=i;break}if((l|0)==(k|0)){s=k;break}else{i=l}}i=s-m|0;m=i>>2;if((i|0)>92){q=-1;return q|0}do{if((e|0)==8|(e|0)==10){if((m|0)<(e|0)){break}else{q=-1}return q|0}else if((e|0)==16){if((i|0)<88){break}if(o){q=-1;return q|0}if((n-f|0)>=3){q=-1;return q|0}if((a[n-1|0]|0)!=48){q=-1;return q|0}c[h>>2]=0;s=a[39208+m|0]|0;k=c[g>>2]|0;c[g>>2]=k+1;a[k]=s;q=0;return q|0}}while(0);f=a[39208+m|0]|0;c[g>>2]=n+1;a[n]=f;c[h>>2]=(c[h>>2]|0)+1;q=0;return q|0}function Ov(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;g=i;i=i+40|0;h=g|0;j=g+16|0;k=g+32|0;Mx(k,d);d=k|0;k=c[d>>2]|0;if((c[12704]|0)==-1){l=3}else{c[j>>2]=50816;c[j+4>>2]=532;c[j+8>>2]=0;z=0;aT(92,50816,j|0,602);if(!z){l=3}else{z=0}}L3:do{if((l|0)==3){j=(c[12705]|0)-1|0;m=c[k+8>>2]|0;do{if((c[k+12>>2]|0)-m>>2>>>0>j>>>0){n=c[m+(j<<2)>>2]|0;if((n|0)==0){break}o=n;p=c[(c[n>>2]|0)+32>>2]|0;z=0,aW(p|0,o|0,39208,39234,e|0)|0;if(z){z=0;break L3}o=c[d>>2]|0;if((c[12608]|0)!=-1){c[h>>2]=50432;c[h+4>>2]=532;c[h+8>>2]=0;z=0;aT(92,50432,h|0,602);if(z){z=0;break L3}}p=(c[12609]|0)-1|0;n=c[o+8>>2]|0;do{if((c[o+12>>2]|0)-n>>2>>>0>p>>>0){q=c[n+(p<<2)>>2]|0;if((q|0)==0){break}r=q;s=(z=0,av(c[(c[q>>2]|0)+16>>2]|0,r|0)|0);if(z){z=0;break L3}a[f]=s;z=0;at(c[(c[q>>2]|0)+20>>2]|0,b|0,r|0);if(z){z=0;break L3}Ls(c[d>>2]|0)|0;i=g;return}}while(0);p=ct(4)|0;S$(p);z=0;aT(126,p|0,35480,118);if(z){z=0;break L3}}}while(0);j=ct(4)|0;S$(j);z=0;aT(126,j|0,35480,118);if(z){z=0;break}}}while(0);g=b$(-1,-1)|0;Ls(c[d>>2]|0)|0;bj(g|0)}function Ow(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;h=i;i=i+40|0;j=h|0;k=h+16|0;l=h+32|0;Mx(l,d);d=l|0;l=c[d>>2]|0;if((c[12704]|0)==-1){m=3}else{c[k>>2]=50816;c[k+4>>2]=532;c[k+8>>2]=0;z=0;aT(92,50816,k|0,602);if(!z){m=3}else{z=0}}L3:do{if((m|0)==3){k=(c[12705]|0)-1|0;n=c[l+8>>2]|0;do{if((c[l+12>>2]|0)-n>>2>>>0>k>>>0){o=c[n+(k<<2)>>2]|0;if((o|0)==0){break}p=o;q=c[(c[o>>2]|0)+32>>2]|0;z=0,aW(q|0,p|0,39208,39240,e|0)|0;if(z){z=0;break L3}p=c[d>>2]|0;if((c[12608]|0)!=-1){c[j>>2]=50432;c[j+4>>2]=532;c[j+8>>2]=0;z=0;aT(92,50432,j|0,602);if(z){z=0;break L3}}q=(c[12609]|0)-1|0;o=c[p+8>>2]|0;do{if((c[p+12>>2]|0)-o>>2>>>0>q>>>0){r=c[o+(q<<2)>>2]|0;if((r|0)==0){break}s=r;t=r;u=(z=0,av(c[(c[t>>2]|0)+12>>2]|0,s|0)|0);if(z){z=0;break L3}a[f]=u;u=(z=0,av(c[(c[t>>2]|0)+16>>2]|0,s|0)|0);if(z){z=0;break L3}a[g]=u;z=0;at(c[(c[r>>2]|0)+20>>2]|0,b|0,s|0);if(z){z=0;break L3}Ls(c[d>>2]|0)|0;i=h;return}}while(0);q=ct(4)|0;S$(q);z=0;aT(126,q|0,35480,118);if(z){z=0;break L3}}}while(0);k=ct(4)|0;S$(k);z=0;aT(126,k|0,35480,118);if(z){z=0;break}}}while(0);h=b$(-1,-1)|0;Ls(c[d>>2]|0)|0;bj(h|0)}function Ox(b,e,f,g,h,i,j,k,l,m,n,o){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;var p=0,q=0,r=0,s=0,t=0;if(b<<24>>24==i<<24>>24){if((a[e]&1)==0){p=-1;return p|0}a[e]=0;i=c[h>>2]|0;c[h>>2]=i+1;a[i]=46;i=d[k]|0;if((i&1|0)==0){q=i>>>1}else{q=c[k+4>>2]|0}if((q|0)==0){p=0;return p|0}q=c[m>>2]|0;if((q-l|0)>=160){p=0;return p|0}i=c[n>>2]|0;c[m>>2]=q+4;c[q>>2]=i;p=0;return p|0}do{if(b<<24>>24==j<<24>>24){i=d[k]|0;if((i&1|0)==0){r=i>>>1}else{r=c[k+4>>2]|0}if((r|0)==0){break}if((a[e]&1)==0){p=-1;return p|0}i=c[m>>2]|0;if((i-l|0)>=160){p=0;return p|0}q=c[n>>2]|0;c[m>>2]=i+4;c[i>>2]=q;c[n>>2]=0;p=0;return p|0}}while(0);r=o+32|0;j=o;while(1){q=j+1|0;if((a[j]|0)==b<<24>>24){s=j;break}if((q|0)==(r|0)){s=r;break}else{j=q}}j=s-o|0;if((j|0)>31){p=-1;return p|0}o=a[39208+j|0]|0;if((j|0)==25|(j|0)==24){s=c[h>>2]|0;do{if((s|0)!=(g|0)){if((a[s-1|0]&95|0)==(a[f]&127|0)){break}else{p=-1}return p|0}}while(0);c[h>>2]=s+1;a[s]=o;p=0;return p|0}else if((j|0)==22|(j|0)==23){a[f]=80;s=c[h>>2]|0;c[h>>2]=s+1;a[s]=o;p=0;return p|0}else{s=a[f]|0;do{if((o&95|0)==(s<<24>>24|0)){a[f]=s|-128;if((a[e]&1)==0){break}a[e]=0;g=d[k]|0;if((g&1|0)==0){t=g>>>1}else{t=c[k+4>>2]|0}if((t|0)==0){break}g=c[m>>2]|0;if((g-l|0)>=160){break}r=c[n>>2]|0;c[m>>2]=g+4;c[g>>2]=r}}while(0);m=c[h>>2]|0;c[h>>2]=m+1;a[m]=o;if((j|0)>21){p=0;return p|0}c[n>>2]=(c[n>>2]|0)+1;p=0;return p|0}return 0}function Oy(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;f=i;i=i+40|0;g=f|0;h=f+16|0;j=f+32|0;Mx(j,b);b=j|0;j=c[b>>2]|0;if((c[12702]|0)==-1){k=3}else{c[h>>2]=50808;c[h+4>>2]=532;c[h+8>>2]=0;z=0;aT(92,50808,h|0,602);if(!z){k=3}else{z=0}}L3:do{if((k|0)==3){h=(c[12703]|0)-1|0;l=c[j+8>>2]|0;do{if((c[j+12>>2]|0)-l>>2>>>0>h>>>0){m=c[l+(h<<2)>>2]|0;if((m|0)==0){break}n=m;o=c[(c[m>>2]|0)+48>>2]|0;z=0,aW(o|0,n|0,39208,39234,d|0)|0;if(z){z=0;break L3}n=c[b>>2]|0;if((c[12606]|0)!=-1){c[g>>2]=50424;c[g+4>>2]=532;c[g+8>>2]=0;z=0;aT(92,50424,g|0,602);if(z){z=0;break L3}}o=(c[12607]|0)-1|0;m=c[n+8>>2]|0;do{if((c[n+12>>2]|0)-m>>2>>>0>o>>>0){p=c[m+(o<<2)>>2]|0;if((p|0)==0){break}q=p;r=(z=0,av(c[(c[p>>2]|0)+16>>2]|0,q|0)|0);if(z){z=0;break L3}c[e>>2]=r;z=0;at(c[(c[p>>2]|0)+20>>2]|0,a|0,q|0);if(z){z=0;break L3}Ls(c[b>>2]|0)|0;i=f;return}}while(0);o=ct(4)|0;S$(o);z=0;aT(126,o|0,35480,118);if(z){z=0;break L3}}}while(0);h=ct(4)|0;S$(h);z=0;aT(126,h|0,35480,118);if(z){z=0;break}}}while(0);f=b$(-1,-1)|0;Ls(c[b>>2]|0)|0;bj(f|0)}function Oz(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0;g=i;i=i+40|0;h=g|0;j=g+16|0;k=g+32|0;Mx(k,b);b=k|0;k=c[b>>2]|0;if((c[12702]|0)==-1){l=3}else{c[j>>2]=50808;c[j+4>>2]=532;c[j+8>>2]=0;z=0;aT(92,50808,j|0,602);if(!z){l=3}else{z=0}}L3:do{if((l|0)==3){j=(c[12703]|0)-1|0;m=c[k+8>>2]|0;do{if((c[k+12>>2]|0)-m>>2>>>0>j>>>0){n=c[m+(j<<2)>>2]|0;if((n|0)==0){break}o=n;p=c[(c[n>>2]|0)+48>>2]|0;z=0,aW(p|0,o|0,39208,39240,d|0)|0;if(z){z=0;break L3}o=c[b>>2]|0;if((c[12606]|0)!=-1){c[h>>2]=50424;c[h+4>>2]=532;c[h+8>>2]=0;z=0;aT(92,50424,h|0,602);if(z){z=0;break L3}}p=(c[12607]|0)-1|0;n=c[o+8>>2]|0;do{if((c[o+12>>2]|0)-n>>2>>>0>p>>>0){q=c[n+(p<<2)>>2]|0;if((q|0)==0){break}r=q;s=q;t=(z=0,av(c[(c[s>>2]|0)+12>>2]|0,r|0)|0);if(z){z=0;break L3}c[e>>2]=t;t=(z=0,av(c[(c[s>>2]|0)+16>>2]|0,r|0)|0);if(z){z=0;break L3}c[f>>2]=t;z=0;at(c[(c[q>>2]|0)+20>>2]|0,a|0,r|0);if(z){z=0;break L3}Ls(c[b>>2]|0)|0;i=g;return}}while(0);p=ct(4)|0;S$(p);z=0;aT(126,p|0,35480,118);if(z){z=0;break L3}}}while(0);j=ct(4)|0;S$(j);z=0;aT(126,j|0,35480,118);if(z){z=0;break}}}while(0);g=b$(-1,-1)|0;Ls(c[b>>2]|0)|0;bj(g|0)}function OA(b,e,f,g,h,i,j,k,l,m,n,o){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;i=i|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;var p=0,q=0,r=0,s=0,t=0;if((b|0)==(i|0)){if((a[e]&1)==0){p=-1;return p|0}a[e]=0;i=c[h>>2]|0;c[h>>2]=i+1;a[i]=46;i=d[k]|0;if((i&1|0)==0){q=i>>>1}else{q=c[k+4>>2]|0}if((q|0)==0){p=0;return p|0}q=c[m>>2]|0;if((q-l|0)>=160){p=0;return p|0}i=c[n>>2]|0;c[m>>2]=q+4;c[q>>2]=i;p=0;return p|0}do{if((b|0)==(j|0)){i=d[k]|0;if((i&1|0)==0){r=i>>>1}else{r=c[k+4>>2]|0}if((r|0)==0){break}if((a[e]&1)==0){p=-1;return p|0}i=c[m>>2]|0;if((i-l|0)>=160){p=0;return p|0}q=c[n>>2]|0;c[m>>2]=i+4;c[i>>2]=q;c[n>>2]=0;p=0;return p|0}}while(0);r=o+128|0;j=o;while(1){q=j+4|0;if((c[j>>2]|0)==(b|0)){s=j;break}if((q|0)==(r|0)){s=r;break}else{j=q}}j=s-o|0;o=j>>2;if((j|0)>124){p=-1;return p|0}s=a[39208+o|0]|0;do{if((o|0)==25|(o|0)==24){r=c[h>>2]|0;do{if((r|0)!=(g|0)){if((a[r-1|0]&95|0)==(a[f]&127|0)){break}else{p=-1}return p|0}}while(0);c[h>>2]=r+1;a[r]=s;p=0;return p|0}else if((o|0)==22|(o|0)==23){a[f]=80}else{b=a[f]|0;if((s&95|0)!=(b<<24>>24|0)){break}a[f]=b|-128;if((a[e]&1)==0){break}a[e]=0;b=d[k]|0;if((b&1|0)==0){t=b>>>1}else{t=c[k+4>>2]|0}if((t|0)==0){break}b=c[m>>2]|0;if((b-l|0)>=160){break}q=c[n>>2]|0;c[m>>2]=b+4;c[b>>2]=q}}while(0);m=c[h>>2]|0;c[h>>2]=m+1;a[m]=s;if((j|0)>84){p=0;return p|0}c[n>>2]=(c[n>>2]|0)+1;p=0;return p|0}function OB(a){a=a|0;Lq(a|0);Tw(a);return}function OC(a){a=a|0;Lq(a|0);return}function OD(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0;j=i;i=i+48|0;k=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[k>>2];k=j|0;l=j+16|0;m=j+24|0;n=j+32|0;if((c[f+4>>2]&1|0)==0){o=c[(c[d>>2]|0)+24>>2]|0;c[l>>2]=c[e>>2];cV[o&63](b,d,l,f,g,h&1);i=j;return}Mx(m,f);f=m|0;m=c[f>>2]|0;if((c[12608]|0)==-1){p=5}else{c[k>>2]=50432;c[k+4>>2]=532;c[k+8>>2]=0;z=0;aT(92,50432,k|0,602);if(!z){p=5}else{z=0}}do{if((p|0)==5){k=(c[12609]|0)-1|0;g=c[m+8>>2]|0;do{if((c[m+12>>2]|0)-g>>2>>>0>k>>>0){l=c[g+(k<<2)>>2]|0;if((l|0)==0){break}d=l;Ls(c[f>>2]|0)|0;o=c[l>>2]|0;if(h){cK[c[o+24>>2]&1023](n,d)}else{cK[c[o+28>>2]&1023](n,d)}d=n;o=n;l=a[o]|0;if((l&1)==0){q=d+1|0;r=q;s=q;t=n+8|0}else{q=n+8|0;r=c[q>>2]|0;s=d+1|0;t=q}q=e|0;d=n+4|0;u=r;v=l;L20:while(1){if((v&1)==0){w=s}else{w=c[t>>2]|0}l=v&255;if((u|0)==(w+((l&1|0)==0?l>>>1:c[d>>2]|0)|0)){p=28;break}l=a[u]|0;x=c[q>>2]|0;do{if((x|0)!=0){y=x+24|0;A=c[y>>2]|0;if((A|0)!=(c[x+28>>2]|0)){c[y>>2]=A+1;a[A]=l;break}A=(z=0,aO(c[(c[x>>2]|0)+52>>2]|0,x|0,l&255|0)|0);if(z){z=0;p=27;break L20}if((A|0)!=-1){break}c[q>>2]=0}}while(0);u=u+1|0;v=a[o]|0}if((p|0)==27){o=b$(-1,-1)|0;v=M;Ma(n);B=v;C=o;D=C;E=0;F=D;G=B;bj(F|0)}else if((p|0)==28){c[b>>2]=c[q>>2];Ma(n);i=j;return}}}while(0);k=ct(4)|0;S$(k);z=0;aT(126,k|0,35480,118);if(z){z=0;break}}}while(0);j=b$(-1,-1)|0;n=M;Ls(c[f>>2]|0)|0;B=n;C=j;D=C;E=0;F=D;G=B;bj(F|0)}function OE(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;d=i;i=i+80|0;j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=d|0;k=d+8|0;l=d+24|0;m=d+48|0;n=d+56|0;o=d+64|0;p=d+72|0;q=j|0;a[q]=a[17552]|0;a[q+1|0]=a[17553]|0;a[q+2|0]=a[17554]|0;a[q+3|0]=a[17555]|0;a[q+4|0]=a[17556]|0;a[q+5|0]=a[17557]|0;r=j+1|0;s=f+4|0;t=c[s>>2]|0;if((t&2048|0)==0){u=r}else{a[r]=43;u=j+2|0}if((t&512|0)==0){v=u}else{a[u]=35;v=u+1|0}a[v]=108;u=v+1|0;v=t&74;do{if((v|0)==64){a[u]=111}else if((v|0)==8){if((t&16384|0)==0){a[u]=120;break}else{a[u]=88;break}}else{a[u]=100}}while(0);u=k|0;do{if((a[53952]|0)==0){if((bH(53952)|0)==0){break}t=(z=0,aA(64,2147483647,12792,0)|0);if(!z){c[12314]=t;break}else{z=0;t=b$(-1,-1)|0;bj(t|0)}}}while(0);t=OF(u,12,c[12314]|0,q,(q=i,i=i+8|0,c[q>>2]=h,q)|0)|0;i=q;q=k+t|0;h=c[s>>2]&176;do{if((h|0)==16){s=a[u]|0;if((s<<24>>24|0)==45|(s<<24>>24|0)==43){w=k+1|0;break}if(!((t|0)>1&s<<24>>24==48)){x=22;break}s=a[k+1|0]|0;if(!((s<<24>>24|0)==120|(s<<24>>24|0)==88)){x=22;break}w=k+2|0}else if((h|0)==32){w=q}else{x=22}}while(0);if((x|0)==22){w=u}x=l|0;Mx(o,f);z=0;aK(94,u|0,w|0,q|0,x|0,m|0,n|0,o|0);if(!z){Ls(c[o>>2]|0)|0;c[p>>2]=c[e>>2];fN(b,p,x,c[m>>2]|0,c[n>>2]|0,f,g);i=d;return}else{z=0;d=b$(-1,-1)|0;Ls(c[o>>2]|0)|0;bj(d|0)}}function OF(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0;g=i;i=i+16|0;h=g|0;j=h;c[j>>2]=f;c[j+4>>2]=0;j=ce(d|0)|0;d=cf(a|0,b|0,e|0,h|0)|0;if((j|0)==0){i=g;return d|0}z=0,av(40,j|0)|0;if(!z){i=g;return d|0}else{z=0;d=b$(-1,-1,0)|0;fi(d);return 0}return 0}function OG(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0;l=i;i=i+48|0;m=l|0;n=l+16|0;o=l+32|0;p=k|0;k=c[p>>2]|0;if((c[12704]|0)!=-1){c[n>>2]=50816;c[n+4>>2]=532;c[n+8>>2]=0;L3(50816,n,602)}n=(c[12705]|0)-1|0;q=c[k+8>>2]|0;if((c[k+12>>2]|0)-q>>2>>>0<=n>>>0){r=ct(4)|0;s=r;S$(s);bR(r|0,35480,118)}k=c[q+(n<<2)>>2]|0;if((k|0)==0){r=ct(4)|0;s=r;S$(s);bR(r|0,35480,118)}r=k;s=c[p>>2]|0;if((c[12608]|0)!=-1){c[m>>2]=50432;c[m+4>>2]=532;c[m+8>>2]=0;L3(50432,m,602)}m=(c[12609]|0)-1|0;p=c[s+8>>2]|0;if((c[s+12>>2]|0)-p>>2>>>0<=m>>>0){t=ct(4)|0;u=t;S$(u);bR(t|0,35480,118)}s=c[p+(m<<2)>>2]|0;if((s|0)==0){t=ct(4)|0;u=t;S$(u);bR(t|0,35480,118)}t=s;cK[c[(c[s>>2]|0)+20>>2]&1023](o,t);u=o;m=o;p=d[m]|0;if((p&1|0)==0){v=p>>>1}else{v=c[o+4>>2]|0}L23:do{if((v|0)==0){p=c[(c[k>>2]|0)+32>>2]|0;z=0,aW(p|0,r|0,b|0,f|0,g|0)|0;if(z){z=0;w=18;break}c[j>>2]=g+(f-b)}else{c[j>>2]=g;p=a[b]|0;if((p<<24>>24|0)==45|(p<<24>>24|0)==43){n=(z=0,aO(c[(c[k>>2]|0)+28>>2]|0,r|0,p|0)|0);if(z){z=0;w=18;break}p=c[j>>2]|0;c[j>>2]=p+1;a[p]=n;x=b+1|0}else{x=b}do{if((f-x|0)>1){if((a[x]|0)!=48){y=x;break}n=x+1|0;p=a[n]|0;if(!((p<<24>>24|0)==120|(p<<24>>24|0)==88)){y=x;break}p=k;q=(z=0,aO(c[(c[p>>2]|0)+28>>2]|0,r|0,48)|0);if(z){z=0;w=18;break L23}A=c[j>>2]|0;c[j>>2]=A+1;a[A]=q;q=(z=0,aO(c[(c[p>>2]|0)+28>>2]|0,r|0,a[n]|0)|0);if(z){z=0;w=18;break L23}n=c[j>>2]|0;c[j>>2]=n+1;a[n]=q;y=x+2|0}else{y=x}}while(0);do{if((y|0)!=(f|0)){q=f-1|0;if(y>>>0<q>>>0){B=y;C=q}else{break}do{q=a[B]|0;a[B]=a[C]|0;a[C]=q;B=B+1|0;C=C-1|0;}while(B>>>0<C>>>0)}}while(0);q=(z=0,av(c[(c[s>>2]|0)+16>>2]|0,t|0)|0);if(z){z=0;w=18;break}L42:do{if(y>>>0<f>>>0){n=u+1|0;p=k;A=o+4|0;D=o+8|0;E=0;F=0;G=y;while(1){H=(a[m]&1)==0;do{if((a[(H?n:c[D>>2]|0)+F|0]|0)==0){I=F;J=E}else{if((E|0)!=(a[(H?n:c[D>>2]|0)+F|0]|0)){I=F;J=E;break}K=c[j>>2]|0;c[j>>2]=K+1;a[K]=q;K=d[m]|0;I=(F>>>0<(((K&1|0)==0?K>>>1:c[A>>2]|0)-1|0)>>>0)+F|0;J=0}}while(0);H=(z=0,aO(c[(c[p>>2]|0)+28>>2]|0,r|0,a[G]|0)|0);if(z){z=0;break}K=c[j>>2]|0;c[j>>2]=K+1;a[K]=H;H=G+1|0;if(H>>>0<f>>>0){E=J+1|0;F=I;G=H}else{break L42}}G=b$(-1,-1)|0;L=M;N=G;Ma(o);bj(N|0)}}while(0);q=g+(y-b)|0;G=c[j>>2]|0;if((q|0)==(G|0)){break}F=G-1|0;if(q>>>0<F>>>0){O=q;P=F}else{break}do{F=a[O]|0;a[O]=a[P]|0;a[P]=F;O=O+1|0;P=P-1|0;}while(O>>>0<P>>>0)}}while(0);if((w|0)==18){w=b$(-1,-1)|0;L=M;N=w;Ma(o);bj(N|0)}if((e|0)==(f|0)){Q=c[j>>2]|0;c[h>>2]=Q;Ma(o);i=l;return}else{Q=g+(e-b)|0;c[h>>2]=Q;Ma(o);i=l;return}}function OH(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;d=i;i=i+112|0;k=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[k>>2];k=d|0;l=d+8|0;m=d+32|0;n=d+80|0;o=d+88|0;p=d+96|0;q=d+104|0;c[k>>2]=37;c[k+4>>2]=0;r=k;k=r+1|0;s=f+4|0;t=c[s>>2]|0;if((t&2048|0)==0){u=k}else{a[k]=43;u=r+2|0}if((t&512|0)==0){v=u}else{a[u]=35;v=u+1|0}a[v]=108;a[v+1|0]=108;u=v+2|0;v=t&74;do{if((v|0)==8){if((t&16384|0)==0){a[u]=120;break}else{a[u]=88;break}}else if((v|0)==64){a[u]=111}else{a[u]=100}}while(0);u=l|0;do{if((a[53952]|0)==0){if((bH(53952)|0)==0){break}v=(z=0,aA(64,2147483647,12792,0)|0);if(!z){c[12314]=v;break}else{z=0;v=b$(-1,-1)|0;bj(v|0)}}}while(0);v=OF(u,22,c[12314]|0,r,(r=i,i=i+16|0,c[r>>2]=h,c[r+8>>2]=j,r)|0)|0;i=r;r=l+v|0;j=c[s>>2]&176;do{if((j|0)==16){s=a[u]|0;if((s<<24>>24|0)==45|(s<<24>>24|0)==43){w=l+1|0;break}if(!((v|0)>1&s<<24>>24==48)){x=22;break}s=a[l+1|0]|0;if(!((s<<24>>24|0)==120|(s<<24>>24|0)==88)){x=22;break}w=l+2|0}else if((j|0)==32){w=r}else{x=22}}while(0);if((x|0)==22){w=u}x=m|0;Mx(p,f);z=0;aK(94,u|0,w|0,r|0,x|0,n|0,o|0,p|0);if(!z){Ls(c[p>>2]|0)|0;c[q>>2]=c[e>>2];fN(b,q,x,c[n>>2]|0,c[o>>2]|0,f,g);i=d;return}else{z=0;d=b$(-1,-1)|0;Ls(c[p>>2]|0)|0;bj(d|0)}}function OI(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;d=i;i=i+80|0;j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=d|0;k=d+8|0;l=d+24|0;m=d+48|0;n=d+56|0;o=d+64|0;p=d+72|0;q=j|0;a[q]=a[17552]|0;a[q+1|0]=a[17553]|0;a[q+2|0]=a[17554]|0;a[q+3|0]=a[17555]|0;a[q+4|0]=a[17556]|0;a[q+5|0]=a[17557]|0;r=j+1|0;s=f+4|0;t=c[s>>2]|0;if((t&2048|0)==0){u=r}else{a[r]=43;u=j+2|0}if((t&512|0)==0){v=u}else{a[u]=35;v=u+1|0}a[v]=108;u=v+1|0;v=t&74;do{if((v|0)==64){a[u]=111}else if((v|0)==8){if((t&16384|0)==0){a[u]=120;break}else{a[u]=88;break}}else{a[u]=117}}while(0);u=k|0;do{if((a[53952]|0)==0){if((bH(53952)|0)==0){break}t=(z=0,aA(64,2147483647,12792,0)|0);if(!z){c[12314]=t;break}else{z=0;t=b$(-1,-1)|0;bj(t|0)}}}while(0);t=OF(u,12,c[12314]|0,q,(q=i,i=i+8|0,c[q>>2]=h,q)|0)|0;i=q;q=k+t|0;h=c[s>>2]&176;do{if((h|0)==16){s=a[u]|0;if((s<<24>>24|0)==45|(s<<24>>24|0)==43){w=k+1|0;break}if(!((t|0)>1&s<<24>>24==48)){x=22;break}s=a[k+1|0]|0;if(!((s<<24>>24|0)==120|(s<<24>>24|0)==88)){x=22;break}w=k+2|0}else if((h|0)==32){w=q}else{x=22}}while(0);if((x|0)==22){w=u}x=l|0;Mx(o,f);z=0;aK(94,u|0,w|0,q|0,x|0,m|0,n|0,o|0);if(!z){Ls(c[o>>2]|0)|0;c[p>>2]=c[e>>2];fN(b,p,x,c[m>>2]|0,c[n>>2]|0,f,g);i=d;return}else{z=0;d=b$(-1,-1)|0;Ls(c[o>>2]|0)|0;bj(d|0)}}function OJ(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;d=i;i=i+112|0;k=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[k>>2];k=d|0;l=d+8|0;m=d+32|0;n=d+80|0;o=d+88|0;p=d+96|0;q=d+104|0;c[k>>2]=37;c[k+4>>2]=0;r=k;k=r+1|0;s=f+4|0;t=c[s>>2]|0;if((t&2048|0)==0){u=k}else{a[k]=43;u=r+2|0}if((t&512|0)==0){v=u}else{a[u]=35;v=u+1|0}a[v]=108;a[v+1|0]=108;u=v+2|0;v=t&74;do{if((v|0)==8){if((t&16384|0)==0){a[u]=120;break}else{a[u]=88;break}}else if((v|0)==64){a[u]=111}else{a[u]=117}}while(0);u=l|0;do{if((a[53952]|0)==0){if((bH(53952)|0)==0){break}v=(z=0,aA(64,2147483647,12792,0)|0);if(!z){c[12314]=v;break}else{z=0;v=b$(-1,-1)|0;bj(v|0)}}}while(0);v=OF(u,23,c[12314]|0,r,(r=i,i=i+16|0,c[r>>2]=h,c[r+8>>2]=j,r)|0)|0;i=r;r=l+v|0;j=c[s>>2]&176;do{if((j|0)==32){w=r}else if((j|0)==16){s=a[u]|0;if((s<<24>>24|0)==45|(s<<24>>24|0)==43){w=l+1|0;break}if(!((v|0)>1&s<<24>>24==48)){x=22;break}s=a[l+1|0]|0;if(!((s<<24>>24|0)==120|(s<<24>>24|0)==88)){x=22;break}w=l+2|0}else{x=22}}while(0);if((x|0)==22){w=u}x=m|0;Mx(p,f);z=0;aK(94,u|0,w|0,r|0,x|0,n|0,o|0,p|0);if(!z){Ls(c[p>>2]|0)|0;c[q>>2]=c[e>>2];fN(b,q,x,c[n>>2]|0,c[o>>2]|0,f,g);i=d;return}else{z=0;d=b$(-1,-1)|0;Ls(c[p>>2]|0)|0;bj(d|0)}}function OK(b,d,e,f,g,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=+j;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0;d=i;i=i+152|0;k=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[k>>2];k=d|0;l=d+8|0;m=d+40|0;n=d+48|0;o=d+112|0;p=d+120|0;q=d+128|0;r=d+136|0;s=d+144|0;c[k>>2]=37;c[k+4>>2]=0;t=k;k=t+1|0;u=f+4|0;v=c[u>>2]|0;if((v&2048|0)==0){w=k}else{a[k]=43;w=t+2|0}if((v&1024|0)==0){x=w}else{a[w]=35;x=w+1|0}w=v&260;k=v>>>14;do{if((w|0)==260){if((k&1|0)==0){a[x]=97;y=0;break}else{a[x]=65;y=0;break}}else{a[x]=46;v=x+2|0;a[x+1|0]=42;if((w|0)==4){if((k&1|0)==0){a[v]=102;y=1;break}else{a[v]=70;y=1;break}}else if((w|0)==256){if((k&1|0)==0){a[v]=101;y=1;break}else{a[v]=69;y=1;break}}else{if((k&1|0)==0){a[v]=103;y=1;break}else{a[v]=71;y=1;break}}}}while(0);k=l|0;c[m>>2]=k;do{if((a[53952]|0)==0){if((bH(53952)|0)==0){break}l=(z=0,aA(64,2147483647,12792,0)|0);if(!z){c[12314]=l;break}else{z=0;l=b$(-1,-1)|0;bj(l|0)}}}while(0);l=c[12314]|0;if(y){w=OF(k,30,l,t,(A=i,i=i+16|0,c[A>>2]=c[f+8>>2],h[A+8>>3]=j,A)|0)|0;i=A;B=w}else{w=OF(k,30,l,t,(A=i,i=i+8|0,h[A>>3]=j,A)|0)|0;i=A;B=w}L38:do{if((B|0)>29){w=(a[53952]|0)==0;L41:do{if(y){do{if(w){if((bH(53952)|0)==0){break}l=(z=0,aA(64,2147483647,12792,0)|0);if(!z){c[12314]=l;break}else{z=0;l=b$(-1,-1)|0;C=M;D=l;break L41}}}while(0);l=(z=0,aW(34,m|0,c[12314]|0,t|0,(A=i,i=i+16|0,c[A>>2]=c[f+8>>2],h[A+8>>3]=j,A)|0)|0);i=A;if(!z){E=l;F=44}else{z=0;F=36}}else{do{if(w){if((bH(53952)|0)==0){break}l=(z=0,aA(64,2147483647,12792,0)|0);if(!z){c[12314]=l;break}else{z=0;l=b$(-1,-1)|0;C=M;D=l;break L41}}}while(0);l=(z=0,aW(34,m|0,c[12314]|0,t|0,(A=i,i=i+16|0,c[A>>2]=c[f+8>>2],h[A+8>>3]=j,A)|0)|0);i=A;if(!z){E=l;F=44}else{z=0;F=36}}}while(0);do{if((F|0)==44){w=c[m>>2]|0;if((w|0)!=0){G=E;H=w;I=w;break L38}z=0;aI(4);if(z){z=0;F=36;break}w=c[m>>2]|0;G=E;H=w;I=w;break L38}}while(0);if((F|0)==36){w=b$(-1,-1)|0;C=M;D=w}J=C;K=D;L=K;N=0;O=L;P=J;bj(O|0)}else{G=B;H=0;I=c[m>>2]|0}}while(0);B=I+G|0;D=c[u>>2]&176;do{if((D|0)==32){Q=B}else if((D|0)==16){u=a[I]|0;if((u<<24>>24|0)==45|(u<<24>>24|0)==43){Q=I+1|0;break}if(!((G|0)>1&u<<24>>24==48)){F=53;break}u=a[I+1|0]|0;if(!((u<<24>>24|0)==120|(u<<24>>24|0)==88)){F=53;break}Q=I+2|0}else{F=53}}while(0);if((F|0)==53){Q=I}do{if((I|0)==(k|0)){R=n|0;S=0;T=k;F=59}else{D=To(G<<1)|0;if((D|0)!=0){R=D;S=D;T=I;F=59;break}z=0;aI(4);if(z){z=0;U=0;F=58;break}R=0;S=0;T=c[m>>2]|0;F=59}}while(0);do{if((F|0)==59){z=0;at(438,q|0,f|0);if(z){z=0;U=S;F=58;break}z=0;aK(98,T|0,Q|0,B|0,R|0,o|0,p|0,q|0);if(z){z=0;m=b$(-1,-1)|0;I=M;Ls(c[q>>2]|0)|0;V=m;W=I;X=S;break}Ls(c[q>>2]|0)|0;I=e|0;c[s>>2]=c[I>>2];z=0;aK(68,r|0,s|0,R|0,c[o>>2]|0,c[p>>2]|0,f|0,g|0);if(z){z=0;U=S;F=58;break}m=c[r>>2]|0;c[I>>2]=m;c[b>>2]=m;if((S|0)!=0){Tp(S)}if((H|0)==0){i=d;return}Tp(H);i=d;return}}while(0);if((F|0)==58){F=b$(-1,-1)|0;V=F;W=M;X=U}if((X|0)!=0){Tp(X)}if((H|0)==0){J=W;K=V;L=K;N=0;O=L;P=J;bj(O|0)}Tp(H);J=W;K=V;L=K;N=0;O=L;P=J;bj(O|0)}function OL(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;f=i;i=i+16|0;g=f|0;h=g;c[h>>2]=e;c[h+4>>2]=0;h=ce(b|0)|0;b=(z=0,aA(30,a|0,d|0,g|0)|0);if(!z){if((h|0)==0){i=f;return b|0}z=0,av(40,h|0)|0;if(!z){i=f;return b|0}else{z=0;b=b$(-1,-1,0)|0;fi(b);return 0}}else{z=0;b=b$(-1,-1)|0;if((h|0)==0){bj(b|0)}z=0,av(40,h|0)|0;if(!z){bj(b|0)}else{z=0;b=b$(-1,-1,0)|0;fi(b);return 0}}return 0}function OM(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0;l=i;i=i+48|0;m=l|0;n=l+16|0;o=l+32|0;p=k|0;k=c[p>>2]|0;if((c[12704]|0)!=-1){c[n>>2]=50816;c[n+4>>2]=532;c[n+8>>2]=0;L3(50816,n,602)}n=(c[12705]|0)-1|0;q=c[k+8>>2]|0;if((c[k+12>>2]|0)-q>>2>>>0<=n>>>0){r=ct(4)|0;s=r;S$(s);bR(r|0,35480,118)}k=c[q+(n<<2)>>2]|0;if((k|0)==0){r=ct(4)|0;s=r;S$(s);bR(r|0,35480,118)}r=k;s=c[p>>2]|0;if((c[12608]|0)!=-1){c[m>>2]=50432;c[m+4>>2]=532;c[m+8>>2]=0;L3(50432,m,602)}m=(c[12609]|0)-1|0;p=c[s+8>>2]|0;if((c[s+12>>2]|0)-p>>2>>>0<=m>>>0){t=ct(4)|0;u=t;S$(u);bR(t|0,35480,118)}s=c[p+(m<<2)>>2]|0;if((s|0)==0){t=ct(4)|0;u=t;S$(u);bR(t|0,35480,118)}t=s;cK[c[(c[s>>2]|0)+20>>2]&1023](o,t);c[j>>2]=g;u=a[b]|0;do{if((u<<24>>24|0)==45|(u<<24>>24|0)==43){m=(z=0,aO(c[(c[k>>2]|0)+28>>2]|0,r|0,u|0)|0);if(z){z=0;break}p=c[j>>2]|0;c[j>>2]=p+1;a[p]=m;v=b+1|0;w=20}else{v=b;w=20}}while(0);L22:do{if((w|0)==20){u=f;L24:do{if((u-v|0)>1){if((a[v]|0)!=48){w=21;break}m=v+1|0;p=a[m]|0;if(!((p<<24>>24|0)==120|(p<<24>>24|0)==88)){w=21;break}p=k;n=(z=0,aO(c[(c[p>>2]|0)+28>>2]|0,r|0,48)|0);if(z){z=0;break L22}q=c[j>>2]|0;c[j>>2]=q+1;a[q]=n;n=v+2|0;q=(z=0,aO(c[(c[p>>2]|0)+28>>2]|0,r|0,a[m]|0)|0);if(z){z=0;break L22}m=c[j>>2]|0;c[j>>2]=m+1;a[m]=q;if(n>>>0<f>>>0){x=n}else{y=n;A=n;break}L30:while(1){q=a[x]|0;do{if((a[53952]|0)==0){if((bH(53952)|0)==0){break}m=(z=0,aA(64,2147483647,12792,0)|0);if(z){z=0;w=32;break L30}c[12314]=m}}while(0);m=(z=0,aO(222,q<<24>>24|0,c[12314]|0)|0);if(z){z=0;w=17;break}p=x+1|0;if((m|0)==0){y=x;A=n;break L24}if(p>>>0<f>>>0){x=p}else{y=p;A=n;break L24}}if((w|0)==32){n=b$(-1,-1)|0;B=M;C=n;Ma(o);bj(C|0)}else if((w|0)==17){n=b$(-1,-1)|0;B=M;C=n;Ma(o);bj(C|0)}}else{w=21}}while(0);L44:do{if((w|0)==21){if(v>>>0<f>>>0){D=v}else{y=v;A=v;break}L46:while(1){n=a[D]|0;do{if((a[53952]|0)==0){if((bH(53952)|0)==0){break}p=(z=0,aA(64,2147483647,12792,0)|0);if(z){z=0;w=40;break L46}c[12314]=p}}while(0);q=(z=0,aO(92,n<<24>>24|0,c[12314]|0)|0);if(z){z=0;w=16;break}p=D+1|0;if((q|0)==0){y=D;A=v;break L44}if(p>>>0<f>>>0){D=p}else{y=p;A=v;break L44}}if((w|0)==40){p=b$(-1,-1)|0;B=M;C=p;Ma(o);bj(C|0)}else if((w|0)==16){p=b$(-1,-1)|0;B=M;C=p;Ma(o);bj(C|0)}}}while(0);p=o;q=o;m=d[q]|0;if((m&1|0)==0){E=m>>>1}else{E=c[o+4>>2]|0}do{if((E|0)==0){m=c[j>>2]|0;F=c[(c[k>>2]|0)+32>>2]|0;z=0,aW(F|0,r|0,A|0,y|0,m|0)|0;if(z){z=0;break L22}c[j>>2]=(c[j>>2]|0)+(y-A)}else{do{if((A|0)!=(y|0)){m=y-1|0;if(A>>>0<m>>>0){G=A;H=m}else{break}do{m=a[G]|0;a[G]=a[H]|0;a[H]=m;G=G+1|0;H=H-1|0;}while(G>>>0<H>>>0)}}while(0);n=(z=0,av(c[(c[s>>2]|0)+16>>2]|0,t|0)|0);if(z){z=0;break L22}L75:do{if(A>>>0<y>>>0){m=p+1|0;F=o+4|0;I=o+8|0;J=k;K=0;L=0;N=A;while(1){O=(a[q]&1)==0;do{if((a[(O?m:c[I>>2]|0)+L|0]|0)>0){if((K|0)!=(a[(O?m:c[I>>2]|0)+L|0]|0)){P=L;Q=K;break}R=c[j>>2]|0;c[j>>2]=R+1;a[R]=n;R=d[q]|0;P=(L>>>0<(((R&1|0)==0?R>>>1:c[F>>2]|0)-1|0)>>>0)+L|0;Q=0}else{P=L;Q=K}}while(0);O=(z=0,aO(c[(c[J>>2]|0)+28>>2]|0,r|0,a[N]|0)|0);if(z){z=0;break}R=c[j>>2]|0;c[j>>2]=R+1;a[R]=O;O=N+1|0;if(O>>>0<y>>>0){K=Q+1|0;L=P;N=O}else{break L75}}N=b$(-1,-1)|0;B=M;C=N;Ma(o);bj(C|0)}}while(0);n=g+(A-b)|0;N=c[j>>2]|0;if((n|0)==(N|0)){break}L=N-1|0;if(n>>>0<L>>>0){S=n;T=L}else{break}do{L=a[S]|0;a[S]=a[T]|0;a[T]=L;S=S+1|0;T=T-1|0;}while(S>>>0<T>>>0)}}while(0);L91:do{if(y>>>0<f>>>0){q=k;p=y;while(1){L=a[p]|0;if(L<<24>>24==46){w=66;break}n=(z=0,aO(c[(c[q>>2]|0)+28>>2]|0,r|0,L|0)|0);if(z){z=0;w=14;break}L=c[j>>2]|0;c[j>>2]=L+1;a[L]=n;n=p+1|0;if(n>>>0<f>>>0){p=n}else{U=n;break L91}}if((w|0)==66){q=(z=0,av(c[(c[s>>2]|0)+12>>2]|0,t|0)|0);if(z){z=0;break L22}n=c[j>>2]|0;c[j>>2]=n+1;a[n]=q;U=p+1|0;break}else if((w|0)==14){q=b$(-1,-1)|0;B=M;C=q;Ma(o);bj(C|0)}}else{U=y}}while(0);q=c[j>>2]|0;n=c[(c[k>>2]|0)+32>>2]|0;z=0,aW(n|0,r|0,U|0,f|0,q|0)|0;if(z){z=0;break}q=(c[j>>2]|0)+(u-U)|0;c[j>>2]=q;if((e|0)==(f|0)){V=q;c[h>>2]=V;Ma(o);i=l;return}V=g+(e-b)|0;c[h>>2]=V;Ma(o);i=l;return}}while(0);l=b$(-1,-1)|0;B=M;C=l;Ma(o);bj(C|0)}function ON(b,d,e,f,g,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=+j;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0;d=i;i=i+152|0;k=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[k>>2];k=d|0;l=d+8|0;m=d+40|0;n=d+48|0;o=d+112|0;p=d+120|0;q=d+128|0;r=d+136|0;s=d+144|0;c[k>>2]=37;c[k+4>>2]=0;t=k;k=t+1|0;u=f+4|0;v=c[u>>2]|0;if((v&2048|0)==0){w=k}else{a[k]=43;w=t+2|0}if((v&1024|0)==0){x=w}else{a[w]=35;x=w+1|0}w=v&260;k=v>>>14;do{if((w|0)==260){a[x]=76;v=x+1|0;if((k&1|0)==0){a[v]=97;y=0;break}else{a[v]=65;y=0;break}}else{a[x]=46;a[x+1|0]=42;a[x+2|0]=76;v=x+3|0;if((w|0)==256){if((k&1|0)==0){a[v]=101;y=1;break}else{a[v]=69;y=1;break}}else if((w|0)==4){if((k&1|0)==0){a[v]=102;y=1;break}else{a[v]=70;y=1;break}}else{if((k&1|0)==0){a[v]=103;y=1;break}else{a[v]=71;y=1;break}}}}while(0);k=l|0;c[m>>2]=k;do{if((a[53952]|0)==0){if((bH(53952)|0)==0){break}l=(z=0,aA(64,2147483647,12792,0)|0);if(!z){c[12314]=l;break}else{z=0;l=b$(-1,-1)|0;bj(l|0)}}}while(0);l=c[12314]|0;if(y){w=OF(k,30,l,t,(A=i,i=i+16|0,c[A>>2]=c[f+8>>2],h[A+8>>3]=j,A)|0)|0;i=A;B=w}else{w=OF(k,30,l,t,(A=i,i=i+8|0,h[A>>3]=j,A)|0)|0;i=A;B=w}L38:do{if((B|0)>29){w=(a[53952]|0)==0;L40:do{if(y){do{if(w){if((bH(53952)|0)==0){break}l=(z=0,aA(64,2147483647,12792,0)|0);if(!z){c[12314]=l;break}else{z=0;l=b$(-1,-1)|0;C=M;D=l;break L40}}}while(0);l=(z=0,aW(34,m|0,c[12314]|0,t|0,(A=i,i=i+16|0,c[A>>2]=c[f+8>>2],h[A+8>>3]=j,A)|0)|0);i=A;if(!z){E=l;F=44}else{z=0;F=36}}else{do{if(w){if((bH(53952)|0)==0){break}l=(z=0,aA(64,2147483647,12792,0)|0);if(!z){c[12314]=l;break}else{z=0;l=b$(-1,-1)|0;C=M;D=l;break L40}}}while(0);l=(z=0,aW(34,m|0,c[12314]|0,t|0,(A=i,i=i+8|0,h[A>>3]=j,A)|0)|0);i=A;if(!z){E=l;F=44}else{z=0;F=36}}}while(0);do{if((F|0)==44){w=c[m>>2]|0;if((w|0)!=0){G=E;H=w;I=w;break L38}z=0;aI(4);if(z){z=0;F=36;break}w=c[m>>2]|0;G=E;H=w;I=w;break L38}}while(0);if((F|0)==36){w=b$(-1,-1)|0;C=M;D=w}J=C;K=D;L=K;N=0;O=L;P=J;bj(O|0)}else{G=B;H=0;I=c[m>>2]|0}}while(0);B=I+G|0;D=c[u>>2]&176;do{if((D|0)==32){Q=B}else if((D|0)==16){u=a[I]|0;if((u<<24>>24|0)==45|(u<<24>>24|0)==43){Q=I+1|0;break}if(!((G|0)>1&u<<24>>24==48)){F=53;break}u=a[I+1|0]|0;if(!((u<<24>>24|0)==120|(u<<24>>24|0)==88)){F=53;break}Q=I+2|0}else{F=53}}while(0);if((F|0)==53){Q=I}do{if((I|0)==(k|0)){R=n|0;S=0;T=k;F=59}else{D=To(G<<1)|0;if((D|0)!=0){R=D;S=D;T=I;F=59;break}z=0;aI(4);if(z){z=0;U=0;F=58;break}R=0;S=0;T=c[m>>2]|0;F=59}}while(0);do{if((F|0)==59){z=0;at(438,q|0,f|0);if(z){z=0;U=S;F=58;break}z=0;aK(98,T|0,Q|0,B|0,R|0,o|0,p|0,q|0);if(z){z=0;m=b$(-1,-1)|0;I=M;Ls(c[q>>2]|0)|0;V=m;W=I;X=S;break}Ls(c[q>>2]|0)|0;I=e|0;c[s>>2]=c[I>>2];z=0;aK(68,r|0,s|0,R|0,c[o>>2]|0,c[p>>2]|0,f|0,g|0);if(z){z=0;U=S;F=58;break}m=c[r>>2]|0;c[I>>2]=m;c[b>>2]=m;if((S|0)!=0){Tp(S)}if((H|0)==0){i=d;return}Tp(H);i=d;return}}while(0);if((F|0)==58){F=b$(-1,-1)|0;V=F;W=M;X=U}if((X|0)!=0){Tp(X)}if((H|0)==0){J=W;K=V;L=K;N=0;O=L;P=J;bj(O|0)}Tp(H);J=W;K=V;L=K;N=0;O=L;P=J;bj(O|0)}function OO(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0;d=i;i=i+104|0;j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=d|0;k=d+24|0;l=d+48|0;m=d+88|0;n=d+96|0;o=d+16|0;a[o]=a[17560]|0;a[o+1|0]=a[17561]|0;a[o+2|0]=a[17562]|0;a[o+3|0]=a[17563]|0;a[o+4|0]=a[17564]|0;a[o+5|0]=a[17565]|0;p=k|0;do{if((a[53952]|0)==0){if((bH(53952)|0)==0){break}q=(z=0,aA(64,2147483647,12792,0)|0);if(!z){c[12314]=q;break}else{z=0;q=b$(-1,-1)|0;bj(q|0)}}}while(0);q=OF(p,20,c[12314]|0,o,(o=i,i=i+8|0,c[o>>2]=h,o)|0)|0;i=o;o=k+q|0;h=c[f+4>>2]&176;do{if((h|0)==16){r=a[p]|0;if((r<<24>>24|0)==45|(r<<24>>24|0)==43){s=k+1|0;break}if(!((q|0)>1&r<<24>>24==48)){t=12;break}r=a[k+1|0]|0;if(!((r<<24>>24|0)==120|(r<<24>>24|0)==88)){t=12;break}s=k+2|0}else if((h|0)==32){s=o}else{t=12}}while(0);if((t|0)==12){s=p}Mx(m,f);t=m|0;m=c[t>>2]|0;do{if((c[12704]|0)!=-1){c[j>>2]=50816;c[j+4>>2]=532;c[j+8>>2]=0;z=0;aT(92,50816,j|0,602);if(!z){break}else{z=0}u=b$(-1,-1)|0;v=M;w=c[t>>2]|0;x=w|0;y=Ls(x)|0;bj(u|0)}}while(0);j=(c[12705]|0)-1|0;h=c[m+8>>2]|0;do{if((c[m+12>>2]|0)-h>>2>>>0>j>>>0){r=c[h+(j<<2)>>2]|0;if((r|0)==0){break}Ls(c[t>>2]|0)|0;A=l|0;db[c[(c[r>>2]|0)+32>>2]&63](r,p,o,A)|0;r=l+q|0;if((s|0)==(o|0)){B=r;C=e|0;D=c[C>>2]|0;E=n|0;c[E>>2]=D;fN(b,n,A,B,r,f,g);i=d;return}B=l+(s-k)|0;C=e|0;D=c[C>>2]|0;E=n|0;c[E>>2]=D;fN(b,n,A,B,r,f,g);i=d;return}}while(0);d=ct(4)|0;S$(d);z=0;aT(126,d|0,35480,118);if(z){z=0;u=b$(-1,-1)|0;v=M;w=c[t>>2]|0;x=w|0;y=Ls(x)|0;bj(u|0)}}function OP(a){a=a|0;Lq(a|0);Tw(a);return}function OQ(a){a=a|0;Lq(a|0);return}function OR(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0;j=i;i=i+48|0;k=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[k>>2];k=j|0;l=j+16|0;m=j+24|0;n=j+32|0;if((c[f+4>>2]&1|0)==0){o=c[(c[d>>2]|0)+24>>2]|0;c[l>>2]=c[e>>2];cV[o&63](b,d,l,f,g,h&1);i=j;return}Mx(m,f);f=m|0;m=c[f>>2]|0;if((c[12606]|0)==-1){p=5}else{c[k>>2]=50424;c[k+4>>2]=532;c[k+8>>2]=0;z=0;aT(92,50424,k|0,602);if(!z){p=5}else{z=0}}do{if((p|0)==5){k=(c[12607]|0)-1|0;g=c[m+8>>2]|0;do{if((c[m+12>>2]|0)-g>>2>>>0>k>>>0){l=c[g+(k<<2)>>2]|0;if((l|0)==0){break}d=l;Ls(c[f>>2]|0)|0;o=c[l>>2]|0;if(h){cK[c[o+24>>2]&1023](n,d)}else{cK[c[o+28>>2]&1023](n,d)}d=n;o=a[d]|0;if((o&1)==0){l=n+4|0;q=l;r=l;s=n+8|0}else{l=n+8|0;q=c[l>>2]|0;r=n+4|0;s=l}l=e|0;t=q;u=o;L20:while(1){if((u&1)==0){v=r}else{v=c[s>>2]|0}o=u&255;if((o&1|0)==0){w=o>>>1}else{w=c[r>>2]|0}if((t|0)==(v+(w<<2)|0)){p=31;break}o=c[t>>2]|0;x=c[l>>2]|0;do{if((x|0)!=0){y=x+24|0;A=c[y>>2]|0;if((A|0)==(c[x+28>>2]|0)){B=(z=0,aO(c[(c[x>>2]|0)+52>>2]|0,x|0,o|0)|0);if(!z){C=B}else{z=0;p=30;break L20}}else{c[y>>2]=A+4;c[A>>2]=o;C=o}if((C|0)!=-1){break}c[l>>2]=0}}while(0);t=t+4|0;u=a[d]|0}if((p|0)==31){c[b>>2]=c[l>>2];Mn(n);i=j;return}else if((p|0)==30){d=b$(-1,-1)|0;u=M;Mn(n);D=u;E=d;F=E;G=0;H=F;I=D;bj(H|0)}}}while(0);k=ct(4)|0;S$(k);z=0;aT(126,k|0,35480,118);if(z){z=0;break}}}while(0);n=b$(-1,-1)|0;p=M;Ls(c[f>>2]|0)|0;D=p;E=n;F=E;G=0;H=F;I=D;bj(H|0)}function OS(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;d=i;i=i+144|0;j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=d|0;k=d+8|0;l=d+24|0;m=d+112|0;n=d+120|0;o=d+128|0;p=d+136|0;q=j|0;a[q]=a[17552]|0;a[q+1|0]=a[17553]|0;a[q+2|0]=a[17554]|0;a[q+3|0]=a[17555]|0;a[q+4|0]=a[17556]|0;a[q+5|0]=a[17557]|0;r=j+1|0;s=f+4|0;t=c[s>>2]|0;if((t&2048|0)==0){u=r}else{a[r]=43;u=j+2|0}if((t&512|0)==0){v=u}else{a[u]=35;v=u+1|0}a[v]=108;u=v+1|0;v=t&74;do{if((v|0)==64){a[u]=111}else if((v|0)==8){if((t&16384|0)==0){a[u]=120;break}else{a[u]=88;break}}else{a[u]=100}}while(0);u=k|0;do{if((a[53952]|0)==0){if((bH(53952)|0)==0){break}t=(z=0,aA(64,2147483647,12792,0)|0);if(!z){c[12314]=t;break}else{z=0;t=b$(-1,-1)|0;bj(t|0)}}}while(0);t=OF(u,12,c[12314]|0,q,(q=i,i=i+8|0,c[q>>2]=h,q)|0)|0;i=q;q=k+t|0;h=c[s>>2]&176;do{if((h|0)==32){w=q}else if((h|0)==16){s=a[u]|0;if((s<<24>>24|0)==45|(s<<24>>24|0)==43){w=k+1|0;break}if(!((t|0)>1&s<<24>>24==48)){x=22;break}s=a[k+1|0]|0;if(!((s<<24>>24|0)==120|(s<<24>>24|0)==88)){x=22;break}w=k+2|0}else{x=22}}while(0);if((x|0)==22){w=u}x=l|0;Mx(o,f);z=0;aK(58,u|0,w|0,q|0,x|0,m|0,n|0,o|0);if(!z){Ls(c[o>>2]|0)|0;c[p>>2]=c[e>>2];OU(b,p,x,c[m>>2]|0,c[n>>2]|0,f,g);i=d;return}else{z=0;d=b$(-1,-1)|0;Ls(c[o>>2]|0)|0;bj(d|0)}}function OT(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0;l=i;i=i+48|0;m=l|0;n=l+16|0;o=l+32|0;p=k|0;k=c[p>>2]|0;if((c[12702]|0)!=-1){c[n>>2]=50808;c[n+4>>2]=532;c[n+8>>2]=0;L3(50808,n,602)}n=(c[12703]|0)-1|0;q=c[k+8>>2]|0;if((c[k+12>>2]|0)-q>>2>>>0<=n>>>0){r=ct(4)|0;s=r;S$(s);bR(r|0,35480,118)}k=c[q+(n<<2)>>2]|0;if((k|0)==0){r=ct(4)|0;s=r;S$(s);bR(r|0,35480,118)}r=k;s=c[p>>2]|0;if((c[12606]|0)!=-1){c[m>>2]=50424;c[m+4>>2]=532;c[m+8>>2]=0;L3(50424,m,602)}m=(c[12607]|0)-1|0;p=c[s+8>>2]|0;if((c[s+12>>2]|0)-p>>2>>>0<=m>>>0){t=ct(4)|0;u=t;S$(u);bR(t|0,35480,118)}s=c[p+(m<<2)>>2]|0;if((s|0)==0){t=ct(4)|0;u=t;S$(u);bR(t|0,35480,118)}t=s;cK[c[(c[s>>2]|0)+20>>2]&1023](o,t);u=o;m=o;p=d[m]|0;if((p&1|0)==0){v=p>>>1}else{v=c[o+4>>2]|0}L23:do{if((v|0)==0){p=c[(c[k>>2]|0)+48>>2]|0;z=0,aW(p|0,r|0,b|0,f|0,g|0)|0;if(z){z=0;w=18;break}c[j>>2]=g+(f-b<<2)}else{c[j>>2]=g;p=a[b]|0;if((p<<24>>24|0)==45|(p<<24>>24|0)==43){n=(z=0,aO(c[(c[k>>2]|0)+44>>2]|0,r|0,p|0)|0);if(z){z=0;w=18;break}p=c[j>>2]|0;c[j>>2]=p+4;c[p>>2]=n;x=b+1|0}else{x=b}do{if((f-x|0)>1){if((a[x]|0)!=48){y=x;break}n=x+1|0;p=a[n]|0;if(!((p<<24>>24|0)==120|(p<<24>>24|0)==88)){y=x;break}p=k;q=(z=0,aO(c[(c[p>>2]|0)+44>>2]|0,r|0,48)|0);if(z){z=0;w=18;break L23}A=c[j>>2]|0;c[j>>2]=A+4;c[A>>2]=q;q=(z=0,aO(c[(c[p>>2]|0)+44>>2]|0,r|0,a[n]|0)|0);if(z){z=0;w=18;break L23}n=c[j>>2]|0;c[j>>2]=n+4;c[n>>2]=q;y=x+2|0}else{y=x}}while(0);do{if((y|0)!=(f|0)){q=f-1|0;if(y>>>0<q>>>0){B=y;C=q}else{break}do{q=a[B]|0;a[B]=a[C]|0;a[C]=q;B=B+1|0;C=C-1|0;}while(B>>>0<C>>>0)}}while(0);q=(z=0,av(c[(c[s>>2]|0)+16>>2]|0,t|0)|0);if(z){z=0;w=18;break}L42:do{if(y>>>0<f>>>0){n=u+1|0;p=k;A=o+4|0;D=o+8|0;E=0;F=0;G=y;while(1){H=(a[m]&1)==0;do{if((a[(H?n:c[D>>2]|0)+F|0]|0)==0){I=F;J=E}else{if((E|0)!=(a[(H?n:c[D>>2]|0)+F|0]|0)){I=F;J=E;break}K=c[j>>2]|0;c[j>>2]=K+4;c[K>>2]=q;K=d[m]|0;I=(F>>>0<(((K&1|0)==0?K>>>1:c[A>>2]|0)-1|0)>>>0)+F|0;J=0}}while(0);H=(z=0,aO(c[(c[p>>2]|0)+44>>2]|0,r|0,a[G]|0)|0);if(z){z=0;break}K=c[j>>2]|0;c[j>>2]=K+4;c[K>>2]=H;H=G+1|0;if(H>>>0<f>>>0){E=J+1|0;F=I;G=H}else{break L42}}G=b$(-1,-1)|0;L=M;N=G;Ma(o);bj(N|0)}}while(0);q=g+(y-b<<2)|0;G=c[j>>2]|0;if((q|0)==(G|0)){break}F=G-4|0;if(q>>>0<F>>>0){O=q;P=F}else{break}do{F=c[O>>2]|0;c[O>>2]=c[P>>2];c[P>>2]=F;O=O+4|0;P=P-4|0;}while(O>>>0<P>>>0)}}while(0);if((w|0)==18){w=b$(-1,-1)|0;L=M;N=w;Ma(o);bj(N|0)}if((e|0)==(f|0)){Q=c[j>>2]|0;c[h>>2]=Q;Ma(o);i=l;return}else{Q=g+(e-b<<2)|0;c[h>>2]=Q;Ma(o);i=l;return}}function OU(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;k=i;i=i+16|0;l=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[l>>2];l=k|0;m=d|0;d=c[m>>2]|0;if((d|0)==0){c[b>>2]=0;i=k;return}n=g;g=e;o=n-g>>2;p=h+12|0;h=c[p>>2]|0;q=(h|0)>(o|0)?h-o|0:0;o=f;h=o-g|0;g=h>>2;do{if((h|0)>0){if((cR[c[(c[d>>2]|0)+48>>2]&127](d,e,g)|0)==(g|0)){break}c[m>>2]=0;c[b>>2]=0;i=k;return}}while(0);do{if((q|0)>0){Mm(l,q,j);if((a[l]&1)==0){r=l+4|0}else{r=c[l+8>>2]|0}g=(z=0,aA(c[(c[d>>2]|0)+48>>2]|0,d|0,r|0,q|0)|0);if(z){z=0;e=b$(-1,-1)|0;Mn(l);bj(e|0)}if((g|0)==(q|0)){Mn(l);break}c[m>>2]=0;c[b>>2]=0;Mn(l);i=k;return}}while(0);l=n-o|0;o=l>>2;do{if((l|0)>0){if((cR[c[(c[d>>2]|0)+48>>2]&127](d,f,o)|0)==(o|0)){break}c[m>>2]=0;c[b>>2]=0;i=k;return}}while(0);c[p>>2]=0;c[b>>2]=d;i=k;return}function OV(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;d=i;i=i+232|0;k=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[k>>2];k=d|0;l=d+8|0;m=d+32|0;n=d+200|0;o=d+208|0;p=d+216|0;q=d+224|0;c[k>>2]=37;c[k+4>>2]=0;r=k;k=r+1|0;s=f+4|0;t=c[s>>2]|0;if((t&2048|0)==0){u=k}else{a[k]=43;u=r+2|0}if((t&512|0)==0){v=u}else{a[u]=35;v=u+1|0}a[v]=108;a[v+1|0]=108;u=v+2|0;v=t&74;do{if((v|0)==8){if((t&16384|0)==0){a[u]=120;break}else{a[u]=88;break}}else if((v|0)==64){a[u]=111}else{a[u]=100}}while(0);u=l|0;do{if((a[53952]|0)==0){if((bH(53952)|0)==0){break}v=(z=0,aA(64,2147483647,12792,0)|0);if(!z){c[12314]=v;break}else{z=0;v=b$(-1,-1)|0;bj(v|0)}}}while(0);v=OF(u,22,c[12314]|0,r,(r=i,i=i+16|0,c[r>>2]=h,c[r+8>>2]=j,r)|0)|0;i=r;r=l+v|0;j=c[s>>2]&176;do{if((j|0)==16){s=a[u]|0;if((s<<24>>24|0)==45|(s<<24>>24|0)==43){w=l+1|0;break}if(!((v|0)>1&s<<24>>24==48)){x=22;break}s=a[l+1|0]|0;if(!((s<<24>>24|0)==120|(s<<24>>24|0)==88)){x=22;break}w=l+2|0}else if((j|0)==32){w=r}else{x=22}}while(0);if((x|0)==22){w=u}x=m|0;Mx(p,f);z=0;aK(58,u|0,w|0,r|0,x|0,n|0,o|0,p|0);if(!z){Ls(c[p>>2]|0)|0;c[q>>2]=c[e>>2];OU(b,q,x,c[n>>2]|0,c[o>>2]|0,f,g);i=d;return}else{z=0;d=b$(-1,-1)|0;Ls(c[p>>2]|0)|0;bj(d|0)}}function OW(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;d=i;i=i+144|0;j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=d|0;k=d+8|0;l=d+24|0;m=d+112|0;n=d+120|0;o=d+128|0;p=d+136|0;q=j|0;a[q]=a[17552]|0;a[q+1|0]=a[17553]|0;a[q+2|0]=a[17554]|0;a[q+3|0]=a[17555]|0;a[q+4|0]=a[17556]|0;a[q+5|0]=a[17557]|0;r=j+1|0;s=f+4|0;t=c[s>>2]|0;if((t&2048|0)==0){u=r}else{a[r]=43;u=j+2|0}if((t&512|0)==0){v=u}else{a[u]=35;v=u+1|0}a[v]=108;u=v+1|0;v=t&74;do{if((v|0)==8){if((t&16384|0)==0){a[u]=120;break}else{a[u]=88;break}}else if((v|0)==64){a[u]=111}else{a[u]=117}}while(0);u=k|0;do{if((a[53952]|0)==0){if((bH(53952)|0)==0){break}v=(z=0,aA(64,2147483647,12792,0)|0);if(!z){c[12314]=v;break}else{z=0;v=b$(-1,-1)|0;bj(v|0)}}}while(0);v=OF(u,12,c[12314]|0,q,(q=i,i=i+8|0,c[q>>2]=h,q)|0)|0;i=q;q=k+v|0;h=c[s>>2]&176;do{if((h|0)==16){s=a[u]|0;if((s<<24>>24|0)==45|(s<<24>>24|0)==43){w=k+1|0;break}if(!((v|0)>1&s<<24>>24==48)){x=22;break}s=a[k+1|0]|0;if(!((s<<24>>24|0)==120|(s<<24>>24|0)==88)){x=22;break}w=k+2|0}else if((h|0)==32){w=q}else{x=22}}while(0);if((x|0)==22){w=u}x=l|0;Mx(o,f);z=0;aK(58,u|0,w|0,q|0,x|0,m|0,n|0,o|0);if(!z){Ls(c[o>>2]|0)|0;c[p>>2]=c[e>>2];OU(b,p,x,c[m>>2]|0,c[n>>2]|0,f,g);i=d;return}else{z=0;d=b$(-1,-1)|0;Ls(c[o>>2]|0)|0;bj(d|0)}}function OX(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;d=i;i=i+240|0;k=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[k>>2];k=d|0;l=d+8|0;m=d+32|0;n=d+208|0;o=d+216|0;p=d+224|0;q=d+232|0;c[k>>2]=37;c[k+4>>2]=0;r=k;k=r+1|0;s=f+4|0;t=c[s>>2]|0;if((t&2048|0)==0){u=k}else{a[k]=43;u=r+2|0}if((t&512|0)==0){v=u}else{a[u]=35;v=u+1|0}a[v]=108;a[v+1|0]=108;u=v+2|0;v=t&74;do{if((v|0)==8){if((t&16384|0)==0){a[u]=120;break}else{a[u]=88;break}}else if((v|0)==64){a[u]=111}else{a[u]=117}}while(0);u=l|0;do{if((a[53952]|0)==0){if((bH(53952)|0)==0){break}v=(z=0,aA(64,2147483647,12792,0)|0);if(!z){c[12314]=v;break}else{z=0;v=b$(-1,-1)|0;bj(v|0)}}}while(0);v=OF(u,23,c[12314]|0,r,(r=i,i=i+16|0,c[r>>2]=h,c[r+8>>2]=j,r)|0)|0;i=r;r=l+v|0;j=c[s>>2]&176;do{if((j|0)==32){w=r}else if((j|0)==16){s=a[u]|0;if((s<<24>>24|0)==45|(s<<24>>24|0)==43){w=l+1|0;break}if(!((v|0)>1&s<<24>>24==48)){x=22;break}s=a[l+1|0]|0;if(!((s<<24>>24|0)==120|(s<<24>>24|0)==88)){x=22;break}w=l+2|0}else{x=22}}while(0);if((x|0)==22){w=u}x=m|0;Mx(p,f);z=0;aK(58,u|0,w|0,r|0,x|0,n|0,o|0,p|0);if(!z){Ls(c[p>>2]|0)|0;c[q>>2]=c[e>>2];OU(b,q,x,c[n>>2]|0,c[o>>2]|0,f,g);i=d;return}else{z=0;d=b$(-1,-1)|0;Ls(c[p>>2]|0)|0;bj(d|0)}}function OY(b,d,e,f,g,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=+j;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0;d=i;i=i+320|0;k=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[k>>2];k=d|0;l=d+8|0;m=d+40|0;n=d+48|0;o=d+280|0;p=d+288|0;q=d+296|0;r=d+304|0;s=d+312|0;c[k>>2]=37;c[k+4>>2]=0;t=k;k=t+1|0;u=f+4|0;v=c[u>>2]|0;if((v&2048|0)==0){w=k}else{a[k]=43;w=t+2|0}if((v&1024|0)==0){x=w}else{a[w]=35;x=w+1|0}w=v&260;k=v>>>14;do{if((w|0)==260){if((k&1|0)==0){a[x]=97;y=0;break}else{a[x]=65;y=0;break}}else{a[x]=46;v=x+2|0;a[x+1|0]=42;if((w|0)==256){if((k&1|0)==0){a[v]=101;y=1;break}else{a[v]=69;y=1;break}}else if((w|0)==4){if((k&1|0)==0){a[v]=102;y=1;break}else{a[v]=70;y=1;break}}else{if((k&1|0)==0){a[v]=103;y=1;break}else{a[v]=71;y=1;break}}}}while(0);k=l|0;c[m>>2]=k;do{if((a[53952]|0)==0){if((bH(53952)|0)==0){break}l=(z=0,aA(64,2147483647,12792,0)|0);if(!z){c[12314]=l;break}else{z=0;l=b$(-1,-1)|0;bj(l|0)}}}while(0);l=c[12314]|0;if(y){w=OF(k,30,l,t,(A=i,i=i+16|0,c[A>>2]=c[f+8>>2],h[A+8>>3]=j,A)|0)|0;i=A;B=w}else{w=OF(k,30,l,t,(A=i,i=i+8|0,h[A>>3]=j,A)|0)|0;i=A;B=w}L38:do{if((B|0)>29){w=(a[53952]|0)==0;L41:do{if(y){do{if(w){if((bH(53952)|0)==0){break}l=(z=0,aA(64,2147483647,12792,0)|0);if(!z){c[12314]=l;break}else{z=0;l=b$(-1,-1)|0;C=M;D=l;break L41}}}while(0);l=(z=0,aW(34,m|0,c[12314]|0,t|0,(A=i,i=i+16|0,c[A>>2]=c[f+8>>2],h[A+8>>3]=j,A)|0)|0);i=A;if(!z){E=l;F=44}else{z=0;F=36}}else{do{if(w){if((bH(53952)|0)==0){break}l=(z=0,aA(64,2147483647,12792,0)|0);if(!z){c[12314]=l;break}else{z=0;l=b$(-1,-1)|0;C=M;D=l;break L41}}}while(0);l=(z=0,aW(34,m|0,c[12314]|0,t|0,(A=i,i=i+16|0,c[A>>2]=c[f+8>>2],h[A+8>>3]=j,A)|0)|0);i=A;if(!z){E=l;F=44}else{z=0;F=36}}}while(0);do{if((F|0)==44){w=c[m>>2]|0;if((w|0)!=0){G=E;H=w;I=w;break L38}z=0;aI(4);if(z){z=0;F=36;break}w=c[m>>2]|0;G=E;H=w;I=w;break L38}}while(0);if((F|0)==36){w=b$(-1,-1)|0;C=M;D=w}J=C;K=D;L=K;N=0;O=L;P=J;bj(O|0)}else{G=B;H=0;I=c[m>>2]|0}}while(0);B=I+G|0;D=c[u>>2]&176;do{if((D|0)==32){Q=B}else if((D|0)==16){u=a[I]|0;if((u<<24>>24|0)==45|(u<<24>>24|0)==43){Q=I+1|0;break}if(!((G|0)>1&u<<24>>24==48)){F=53;break}u=a[I+1|0]|0;if(!((u<<24>>24|0)==120|(u<<24>>24|0)==88)){F=53;break}Q=I+2|0}else{F=53}}while(0);if((F|0)==53){Q=I}do{if((I|0)==(k|0)){R=n|0;S=0;T=k;F=59}else{D=To(G<<3)|0;u=D;if((D|0)!=0){R=u;S=u;T=I;F=59;break}z=0;aI(4);if(z){z=0;U=0;F=58;break}R=u;S=u;T=c[m>>2]|0;F=59}}while(0);do{if((F|0)==59){z=0;at(438,q|0,f|0);if(z){z=0;U=S;F=58;break}z=0;aK(84,T|0,Q|0,B|0,R|0,o|0,p|0,q|0);if(z){z=0;m=b$(-1,-1)|0;I=M;Ls(c[q>>2]|0)|0;V=m;W=I;X=S;break}Ls(c[q>>2]|0)|0;I=e|0;c[s>>2]=c[I>>2];z=0;aK(64,r|0,s|0,R|0,c[o>>2]|0,c[p>>2]|0,f|0,g|0);if(z){z=0;U=S;F=58;break}m=c[r>>2]|0;c[I>>2]=m;c[b>>2]=m;if((S|0)!=0){Tp(S)}if((H|0)==0){i=d;return}Tp(H);i=d;return}}while(0);if((F|0)==58){F=b$(-1,-1)|0;V=F;W=M;X=U}if((X|0)!=0){Tp(X)}if((H|0)==0){J=W;K=V;L=K;N=0;O=L;P=J;bj(O|0)}Tp(H);J=W;K=V;L=K;N=0;O=L;P=J;bj(O|0)}function OZ(b,e,f,g,h,j,k){b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0;l=i;i=i+48|0;m=l|0;n=l+16|0;o=l+32|0;p=k|0;k=c[p>>2]|0;if((c[12702]|0)!=-1){c[n>>2]=50808;c[n+4>>2]=532;c[n+8>>2]=0;L3(50808,n,602)}n=(c[12703]|0)-1|0;q=c[k+8>>2]|0;if((c[k+12>>2]|0)-q>>2>>>0<=n>>>0){r=ct(4)|0;s=r;S$(s);bR(r|0,35480,118)}k=c[q+(n<<2)>>2]|0;if((k|0)==0){r=ct(4)|0;s=r;S$(s);bR(r|0,35480,118)}r=k;s=c[p>>2]|0;if((c[12606]|0)!=-1){c[m>>2]=50424;c[m+4>>2]=532;c[m+8>>2]=0;L3(50424,m,602)}m=(c[12607]|0)-1|0;p=c[s+8>>2]|0;if((c[s+12>>2]|0)-p>>2>>>0<=m>>>0){t=ct(4)|0;u=t;S$(u);bR(t|0,35480,118)}s=c[p+(m<<2)>>2]|0;if((s|0)==0){t=ct(4)|0;u=t;S$(u);bR(t|0,35480,118)}t=s;cK[c[(c[s>>2]|0)+20>>2]&1023](o,t);c[j>>2]=g;u=a[b]|0;do{if((u<<24>>24|0)==45|(u<<24>>24|0)==43){m=(z=0,aO(c[(c[k>>2]|0)+44>>2]|0,r|0,u|0)|0);if(z){z=0;break}p=c[j>>2]|0;c[j>>2]=p+4;c[p>>2]=m;v=b+1|0;w=20}else{v=b;w=20}}while(0);L22:do{if((w|0)==20){u=f;L24:do{if((u-v|0)>1){if((a[v]|0)!=48){w=21;break}m=v+1|0;p=a[m]|0;if(!((p<<24>>24|0)==120|(p<<24>>24|0)==88)){w=21;break}p=k;n=(z=0,aO(c[(c[p>>2]|0)+44>>2]|0,r|0,48)|0);if(z){z=0;break L22}q=c[j>>2]|0;c[j>>2]=q+4;c[q>>2]=n;n=v+2|0;q=(z=0,aO(c[(c[p>>2]|0)+44>>2]|0,r|0,a[m]|0)|0);if(z){z=0;break L22}m=c[j>>2]|0;c[j>>2]=m+4;c[m>>2]=q;if(n>>>0<f>>>0){x=n}else{y=n;A=n;break}L30:while(1){q=a[x]|0;do{if((a[53952]|0)==0){if((bH(53952)|0)==0){break}m=(z=0,aA(64,2147483647,12792,0)|0);if(z){z=0;w=32;break L30}c[12314]=m}}while(0);m=(z=0,aO(222,q<<24>>24|0,c[12314]|0)|0);if(z){z=0;w=17;break}p=x+1|0;if((m|0)==0){y=x;A=n;break L24}if(p>>>0<f>>>0){x=p}else{y=p;A=n;break L24}}if((w|0)==32){n=b$(-1,-1)|0;B=M;C=n;Ma(o);bj(C|0)}else if((w|0)==17){n=b$(-1,-1)|0;B=M;C=n;Ma(o);bj(C|0)}}else{w=21}}while(0);L44:do{if((w|0)==21){if(v>>>0<f>>>0){D=v}else{y=v;A=v;break}L46:while(1){n=a[D]|0;do{if((a[53952]|0)==0){if((bH(53952)|0)==0){break}p=(z=0,aA(64,2147483647,12792,0)|0);if(z){z=0;w=40;break L46}c[12314]=p}}while(0);q=(z=0,aO(92,n<<24>>24|0,c[12314]|0)|0);if(z){z=0;w=16;break}p=D+1|0;if((q|0)==0){y=D;A=v;break L44}if(p>>>0<f>>>0){D=p}else{y=p;A=v;break L44}}if((w|0)==40){p=b$(-1,-1)|0;B=M;C=p;Ma(o);bj(C|0)}else if((w|0)==16){p=b$(-1,-1)|0;B=M;C=p;Ma(o);bj(C|0)}}}while(0);p=o;q=o;m=d[q]|0;if((m&1|0)==0){E=m>>>1}else{E=c[o+4>>2]|0}do{if((E|0)==0){m=c[j>>2]|0;F=c[(c[k>>2]|0)+48>>2]|0;z=0,aW(F|0,r|0,A|0,y|0,m|0)|0;if(z){z=0;break L22}c[j>>2]=(c[j>>2]|0)+(y-A<<2)}else{do{if((A|0)!=(y|0)){m=y-1|0;if(A>>>0<m>>>0){G=A;H=m}else{break}do{m=a[G]|0;a[G]=a[H]|0;a[H]=m;G=G+1|0;H=H-1|0;}while(G>>>0<H>>>0)}}while(0);n=(z=0,av(c[(c[s>>2]|0)+16>>2]|0,t|0)|0);if(z){z=0;break L22}L75:do{if(A>>>0<y>>>0){m=p+1|0;F=o+4|0;I=o+8|0;J=k;K=0;L=0;N=A;while(1){O=(a[q]&1)==0;do{if((a[(O?m:c[I>>2]|0)+L|0]|0)>0){if((K|0)!=(a[(O?m:c[I>>2]|0)+L|0]|0)){P=L;Q=K;break}R=c[j>>2]|0;c[j>>2]=R+4;c[R>>2]=n;R=d[q]|0;P=(L>>>0<(((R&1|0)==0?R>>>1:c[F>>2]|0)-1|0)>>>0)+L|0;Q=0}else{P=L;Q=K}}while(0);O=(z=0,aO(c[(c[J>>2]|0)+44>>2]|0,r|0,a[N]|0)|0);if(z){z=0;break}R=c[j>>2]|0;c[j>>2]=R+4;c[R>>2]=O;O=N+1|0;if(O>>>0<y>>>0){K=Q+1|0;L=P;N=O}else{break L75}}N=b$(-1,-1)|0;B=M;C=N;Ma(o);bj(C|0)}}while(0);n=g+(A-b<<2)|0;N=c[j>>2]|0;if((n|0)==(N|0)){break}L=N-4|0;if(n>>>0<L>>>0){S=n;T=L}else{break}do{L=c[S>>2]|0;c[S>>2]=c[T>>2];c[T>>2]=L;S=S+4|0;T=T-4|0;}while(S>>>0<T>>>0)}}while(0);L91:do{if(y>>>0<f>>>0){q=k;p=y;while(1){L=a[p]|0;if(L<<24>>24==46){w=66;break}n=(z=0,aO(c[(c[q>>2]|0)+44>>2]|0,r|0,L|0)|0);if(z){z=0;w=14;break}L=c[j>>2]|0;c[j>>2]=L+4;c[L>>2]=n;n=p+1|0;if(n>>>0<f>>>0){p=n}else{U=n;break L91}}if((w|0)==14){q=b$(-1,-1)|0;B=M;C=q;Ma(o);bj(C|0)}else if((w|0)==66){q=(z=0,av(c[(c[s>>2]|0)+12>>2]|0,t|0)|0);if(z){z=0;break L22}n=c[j>>2]|0;c[j>>2]=n+4;c[n>>2]=q;U=p+1|0;break}}else{U=y}}while(0);q=c[j>>2]|0;n=c[(c[k>>2]|0)+48>>2]|0;z=0,aW(n|0,r|0,U|0,f|0,q|0)|0;if(z){z=0;break}q=(c[j>>2]|0)+(u-U<<2)|0;c[j>>2]=q;if((e|0)==(f|0)){V=q;c[h>>2]=V;Ma(o);i=l;return}V=g+(e-b<<2)|0;c[h>>2]=V;Ma(o);i=l;return}}while(0);l=b$(-1,-1)|0;B=M;C=l;Ma(o);bj(C|0)}function O_(b,d,e,f,g,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;j=+j;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0;d=i;i=i+320|0;k=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[k>>2];k=d|0;l=d+8|0;m=d+40|0;n=d+48|0;o=d+280|0;p=d+288|0;q=d+296|0;r=d+304|0;s=d+312|0;c[k>>2]=37;c[k+4>>2]=0;t=k;k=t+1|0;u=f+4|0;v=c[u>>2]|0;if((v&2048|0)==0){w=k}else{a[k]=43;w=t+2|0}if((v&1024|0)==0){x=w}else{a[w]=35;x=w+1|0}w=v&260;k=v>>>14;do{if((w|0)==260){a[x]=76;v=x+1|0;if((k&1|0)==0){a[v]=97;y=0;break}else{a[v]=65;y=0;break}}else{a[x]=46;a[x+1|0]=42;a[x+2|0]=76;v=x+3|0;if((w|0)==256){if((k&1|0)==0){a[v]=101;y=1;break}else{a[v]=69;y=1;break}}else if((w|0)==4){if((k&1|0)==0){a[v]=102;y=1;break}else{a[v]=70;y=1;break}}else{if((k&1|0)==0){a[v]=103;y=1;break}else{a[v]=71;y=1;break}}}}while(0);k=l|0;c[m>>2]=k;do{if((a[53952]|0)==0){if((bH(53952)|0)==0){break}l=(z=0,aA(64,2147483647,12792,0)|0);if(!z){c[12314]=l;break}else{z=0;l=b$(-1,-1)|0;bj(l|0)}}}while(0);l=c[12314]|0;if(y){w=OF(k,30,l,t,(A=i,i=i+16|0,c[A>>2]=c[f+8>>2],h[A+8>>3]=j,A)|0)|0;i=A;B=w}else{w=OF(k,30,l,t,(A=i,i=i+8|0,h[A>>3]=j,A)|0)|0;i=A;B=w}L38:do{if((B|0)>29){w=(a[53952]|0)==0;L40:do{if(y){do{if(w){if((bH(53952)|0)==0){break}l=(z=0,aA(64,2147483647,12792,0)|0);if(!z){c[12314]=l;break}else{z=0;l=b$(-1,-1)|0;C=M;D=l;break L40}}}while(0);l=(z=0,aW(34,m|0,c[12314]|0,t|0,(A=i,i=i+16|0,c[A>>2]=c[f+8>>2],h[A+8>>3]=j,A)|0)|0);i=A;if(!z){E=l;F=44}else{z=0;F=36}}else{do{if(w){if((bH(53952)|0)==0){break}l=(z=0,aA(64,2147483647,12792,0)|0);if(!z){c[12314]=l;break}else{z=0;l=b$(-1,-1)|0;C=M;D=l;break L40}}}while(0);l=(z=0,aW(34,m|0,c[12314]|0,t|0,(A=i,i=i+8|0,h[A>>3]=j,A)|0)|0);i=A;if(!z){E=l;F=44}else{z=0;F=36}}}while(0);do{if((F|0)==44){w=c[m>>2]|0;if((w|0)!=0){G=E;H=w;I=w;break L38}z=0;aI(4);if(z){z=0;F=36;break}w=c[m>>2]|0;G=E;H=w;I=w;break L38}}while(0);if((F|0)==36){w=b$(-1,-1)|0;C=M;D=w}J=C;K=D;L=K;N=0;O=L;P=J;bj(O|0)}else{G=B;H=0;I=c[m>>2]|0}}while(0);B=I+G|0;D=c[u>>2]&176;do{if((D|0)==32){Q=B}else if((D|0)==16){u=a[I]|0;if((u<<24>>24|0)==45|(u<<24>>24|0)==43){Q=I+1|0;break}if(!((G|0)>1&u<<24>>24==48)){F=53;break}u=a[I+1|0]|0;if(!((u<<24>>24|0)==120|(u<<24>>24|0)==88)){F=53;break}Q=I+2|0}else{F=53}}while(0);if((F|0)==53){Q=I}do{if((I|0)==(k|0)){R=n|0;S=0;T=k;F=59}else{D=To(G<<3)|0;u=D;if((D|0)!=0){R=u;S=u;T=I;F=59;break}z=0;aI(4);if(z){z=0;U=0;F=58;break}R=u;S=u;T=c[m>>2]|0;F=59}}while(0);do{if((F|0)==59){z=0;at(438,q|0,f|0);if(z){z=0;U=S;F=58;break}z=0;aK(84,T|0,Q|0,B|0,R|0,o|0,p|0,q|0);if(z){z=0;m=b$(-1,-1)|0;I=M;Ls(c[q>>2]|0)|0;V=m;W=I;X=S;break}Ls(c[q>>2]|0)|0;I=e|0;c[s>>2]=c[I>>2];z=0;aK(64,r|0,s|0,R|0,c[o>>2]|0,c[p>>2]|0,f|0,g|0);if(z){z=0;U=S;F=58;break}m=c[r>>2]|0;c[I>>2]=m;c[b>>2]=m;if((S|0)!=0){Tp(S)}if((H|0)==0){i=d;return}Tp(H);i=d;return}}while(0);if((F|0)==58){F=b$(-1,-1)|0;V=F;W=M;X=U}if((X|0)!=0){Tp(X)}if((H|0)==0){J=W;K=V;L=K;N=0;O=L;P=J;bj(O|0)}Tp(H);J=W;K=V;L=K;N=0;O=L;P=J;bj(O|0)}function O$(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0;d=i;i=i+216|0;j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=d|0;k=d+24|0;l=d+48|0;m=d+200|0;n=d+208|0;o=d+16|0;a[o]=a[17560]|0;a[o+1|0]=a[17561]|0;a[o+2|0]=a[17562]|0;a[o+3|0]=a[17563]|0;a[o+4|0]=a[17564]|0;a[o+5|0]=a[17565]|0;p=k|0;do{if((a[53952]|0)==0){if((bH(53952)|0)==0){break}q=(z=0,aA(64,2147483647,12792,0)|0);if(!z){c[12314]=q;break}else{z=0;q=b$(-1,-1)|0;bj(q|0)}}}while(0);q=OF(p,20,c[12314]|0,o,(o=i,i=i+8|0,c[o>>2]=h,o)|0)|0;i=o;o=k+q|0;h=c[f+4>>2]&176;do{if((h|0)==32){r=o}else if((h|0)==16){s=a[p]|0;if((s<<24>>24|0)==45|(s<<24>>24|0)==43){r=k+1|0;break}if(!((q|0)>1&s<<24>>24==48)){t=12;break}s=a[k+1|0]|0;if(!((s<<24>>24|0)==120|(s<<24>>24|0)==88)){t=12;break}r=k+2|0}else{t=12}}while(0);if((t|0)==12){r=p}Mx(m,f);t=m|0;m=c[t>>2]|0;do{if((c[12702]|0)!=-1){c[j>>2]=50808;c[j+4>>2]=532;c[j+8>>2]=0;z=0;aT(92,50808,j|0,602);if(!z){break}else{z=0}u=b$(-1,-1)|0;v=M;w=c[t>>2]|0;x=w|0;y=Ls(x)|0;bj(u|0)}}while(0);j=(c[12703]|0)-1|0;h=c[m+8>>2]|0;do{if((c[m+12>>2]|0)-h>>2>>>0>j>>>0){s=c[h+(j<<2)>>2]|0;if((s|0)==0){break}Ls(c[t>>2]|0)|0;A=l|0;db[c[(c[s>>2]|0)+48>>2]&63](s,p,o,A)|0;s=l+(q<<2)|0;if((r|0)==(o|0)){B=s;C=e|0;D=c[C>>2]|0;E=n|0;c[E>>2]=D;OU(b,n,A,B,s,f,g);i=d;return}B=l+(r-k<<2)|0;C=e|0;D=c[C>>2]|0;E=n|0;c[E>>2]=D;OU(b,n,A,B,s,f,g);i=d;return}}while(0);d=ct(4)|0;S$(d);z=0;aT(126,d|0,35480,118);if(z){z=0;u=b$(-1,-1)|0;v=M;w=c[t>>2]|0;x=w|0;y=Ls(x)|0;bj(u|0)}}function O0(d,e,f,g,h,j,k,l,m){d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0;n=i;i=i+48|0;o=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[o>>2];o=g;g=i;i=i+4|0;i=i+7&-8;c[g>>2]=c[o>>2];o=n|0;p=n+16|0;q=n+24|0;r=n+32|0;s=n+40|0;Mx(p,h);t=p|0;p=c[t>>2]|0;do{if((c[12704]|0)!=-1){c[o>>2]=50816;c[o+4>>2]=532;c[o+8>>2]=0;z=0;aT(92,50816,o|0,602);if(!z){break}else{z=0}u=b$(-1,-1)|0;v=M;w=c[t>>2]|0;x=w|0;y=Ls(x)|0;bj(u|0)}}while(0);o=(c[12705]|0)-1|0;A=c[p+8>>2]|0;do{if((c[p+12>>2]|0)-A>>2>>>0>o>>>0){B=c[A+(o<<2)>>2]|0;if((B|0)==0){break}C=B;Ls(c[t>>2]|0)|0;c[j>>2]=0;D=f|0;L8:do{if((l|0)==(m|0)){E=67}else{F=g|0;G=B;H=B+8|0;I=B;J=e;K=r|0;L=s|0;N=q|0;O=l;P=0;L10:while(1){Q=P;while(1){if((Q|0)!=0){E=67;break L8}R=c[D>>2]|0;do{if((R|0)==0){S=0}else{if((c[R+12>>2]|0)!=(c[R+16>>2]|0)){S=R;break}if((cM[c[(c[R>>2]|0)+36>>2]&511](R)|0)!=-1){S=R;break}c[D>>2]=0;S=0}}while(0);R=(S|0)==0;T=c[F>>2]|0;L20:do{if((T|0)==0){E=20}else{do{if((c[T+12>>2]|0)==(c[T+16>>2]|0)){if((cM[c[(c[T>>2]|0)+36>>2]&511](T)|0)!=-1){break}c[F>>2]=0;E=20;break L20}}while(0);if(R){U=T}else{E=21;break L10}}}while(0);if((E|0)==20){E=0;if(R){E=21;break L10}else{U=0}}if((cR[c[(c[G>>2]|0)+36>>2]&127](C,a[O]|0,0)|0)<<24>>24==37){E=24;break}T=a[O]|0;if(T<<24>>24>-1){V=c[H>>2]|0;if((b[V+(T<<24>>24<<1)>>1]&8192)!=0){W=O;E=35;break}}X=S+12|0;T=c[X>>2]|0;Y=S+16|0;if((T|0)==(c[Y>>2]|0)){Z=(cM[c[(c[S>>2]|0)+36>>2]&511](S)|0)&255}else{Z=a[T]|0}T=c3[c[(c[I>>2]|0)+12>>2]&2047](C,Z)|0;if(T<<24>>24==(c3[c[(c[I>>2]|0)+12>>2]&2047](C,a[O]|0)|0)<<24>>24){E=62;break}c[j>>2]=4;Q=4}L38:do{if((E|0)==35){while(1){E=0;Q=W+1|0;if((Q|0)==(m|0)){_=m;break}T=a[Q]|0;if(T<<24>>24<=-1){_=Q;break}if((b[V+(T<<24>>24<<1)>>1]&8192)==0){_=Q;break}else{W=Q;E=35}}R=S;Q=U;while(1){do{if((R|0)==0){$=0}else{if((c[R+12>>2]|0)!=(c[R+16>>2]|0)){$=R;break}if((cM[c[(c[R>>2]|0)+36>>2]&511](R)|0)!=-1){$=R;break}c[D>>2]=0;$=0}}while(0);T=($|0)==0;do{if((Q|0)==0){E=48}else{if((c[Q+12>>2]|0)!=(c[Q+16>>2]|0)){if(T){aa=Q;break}else{ab=_;break L38}}if((cM[c[(c[Q>>2]|0)+36>>2]&511](Q)|0)==-1){c[F>>2]=0;E=48;break}else{if(T^(Q|0)==0){aa=Q;break}else{ab=_;break L38}}}}while(0);if((E|0)==48){E=0;if(T){ab=_;break L38}else{aa=0}}ac=$+12|0;ad=c[ac>>2]|0;ae=$+16|0;if((ad|0)==(c[ae>>2]|0)){af=(cM[c[(c[$>>2]|0)+36>>2]&511]($)|0)&255}else{af=a[ad]|0}if(af<<24>>24<=-1){ab=_;break L38}if((b[(c[H>>2]|0)+(af<<24>>24<<1)>>1]&8192)==0){ab=_;break L38}ad=c[ac>>2]|0;if((ad|0)==(c[ae>>2]|0)){cM[c[(c[$>>2]|0)+40>>2]&511]($)|0;R=$;Q=aa;continue}else{c[ac>>2]=ad+1;R=$;Q=aa;continue}}}else if((E|0)==62){E=0;Q=c[X>>2]|0;if((Q|0)==(c[Y>>2]|0)){cM[c[(c[S>>2]|0)+40>>2]&511](S)|0}else{c[X>>2]=Q+1}ab=O+1|0}else if((E|0)==24){E=0;Q=O+1|0;if((Q|0)==(m|0)){E=25;break L10}R=cR[c[(c[G>>2]|0)+36>>2]&127](C,a[Q]|0,0)|0;if((R<<24>>24|0)==69|(R<<24>>24|0)==48){ad=O+2|0;if((ad|0)==(m|0)){E=28;break L10}ag=R;ah=cR[c[(c[G>>2]|0)+36>>2]&127](C,a[ad]|0,0)|0;ai=ad}else{ag=0;ah=R;ai=Q}Q=c[(c[J>>2]|0)+36>>2]|0;c[K>>2]=S;c[L>>2]=U;c1[Q&7](q,e,r,s,h,j,k,ah,ag);c[D>>2]=c[N>>2];ab=ai+1|0}}while(0);if((ab|0)==(m|0)){E=67;break L8}O=ab;P=c[j>>2]|0}if((E|0)==25){c[j>>2]=4;aj=S;break}else if((E|0)==28){c[j>>2]=4;aj=S;break}else if((E|0)==21){c[j>>2]=4;aj=S;break}}}while(0);if((E|0)==67){aj=c[D>>2]|0}C=f|0;do{if((aj|0)!=0){if((c[aj+12>>2]|0)!=(c[aj+16>>2]|0)){break}if((cM[c[(c[aj>>2]|0)+36>>2]&511](aj)|0)!=-1){break}c[C>>2]=0}}while(0);D=c[C>>2]|0;B=(D|0)==0;P=g|0;O=c[P>>2]|0;L96:do{if((O|0)==0){E=77}else{do{if((c[O+12>>2]|0)==(c[O+16>>2]|0)){if((cM[c[(c[O>>2]|0)+36>>2]&511](O)|0)!=-1){break}c[P>>2]=0;E=77;break L96}}while(0);if(!B){break}ak=d|0;c[ak>>2]=D;i=n;return}}while(0);do{if((E|0)==77){if(B){break}ak=d|0;c[ak>>2]=D;i=n;return}}while(0);c[j>>2]=c[j>>2]|2;ak=d|0;c[ak>>2]=D;i=n;return}}while(0);n=ct(4)|0;S$(n);z=0;aT(126,n|0,35480,118);if(z){z=0;u=b$(-1,-1)|0;v=M;w=c[t>>2]|0;x=w|0;y=Ls(x)|0;bj(u|0)}}function O1(a){a=a|0;Lq(a|0);Tw(a);return}function O2(a){a=a|0;Lq(a|0);return}function O3(a){a=a|0;return 2}function O4(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0;j=i;i=i+16|0;k=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[k>>2];k=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[k>>2];k=j|0;l=j+8|0;c[k>>2]=c[d>>2];c[l>>2]=c[e>>2];O0(a,b,k,l,f,g,h,17544,17552);i=j;return}function O5(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;k=i;i=i+16|0;l=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[l>>2];l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=k|0;m=k+8|0;n=d+8|0;o=cM[c[(c[n>>2]|0)+20>>2]&511](n)|0;c[l>>2]=c[e>>2];c[m>>2]=c[f>>2];f=o;e=a[o]|0;if((e&1)==0){p=f+1|0;q=f+1|0}else{f=c[o+8>>2]|0;p=f;q=f}f=e&255;if((f&1|0)==0){r=f>>>1}else{r=c[o+4>>2]|0}O0(b,d,l,m,g,h,j,q,p+r|0);i=k;return}function O6(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0;j=i;i=i+32|0;k=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[k>>2];k=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[k>>2];k=j|0;l=j+8|0;m=j+24|0;Mx(m,f);f=m|0;m=c[f>>2]|0;do{if((c[12704]|0)!=-1){c[l>>2]=50816;c[l+4>>2]=532;c[l+8>>2]=0;z=0;aT(92,50816,l|0,602);if(!z){break}else{z=0}n=b$(-1,-1)|0;o=M;p=c[f>>2]|0;q=p|0;r=Ls(q)|0;bj(n|0)}}while(0);l=(c[12705]|0)-1|0;s=c[m+8>>2]|0;do{if((c[m+12>>2]|0)-s>>2>>>0>l>>>0){t=c[s+(l<<2)>>2]|0;if((t|0)==0){break}Ls(c[f>>2]|0)|0;u=c[e>>2]|0;v=b+8|0;w=cM[c[c[v>>2]>>2]&511](v)|0;c[k>>2]=u;u=(NN(d,k,w,w+168|0,t,g,0)|0)-w|0;if((u|0)>=168){x=4;y=0;A=d|0;B=c[A>>2]|0;C=a|0;c[C>>2]=B;i=j;return}c[h+24>>2]=((u|0)/12|0|0)%7|0;x=4;y=0;A=d|0;B=c[A>>2]|0;C=a|0;c[C>>2]=B;i=j;return}}while(0);j=ct(4)|0;S$(j);z=0;aT(126,j|0,35480,118);if(z){z=0;n=b$(-1,-1)|0;o=M;p=c[f>>2]|0;q=p|0;r=Ls(q)|0;bj(n|0)}}function O7(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0;j=i;i=i+32|0;k=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[k>>2];k=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[k>>2];k=j|0;l=j+8|0;m=j+24|0;Mx(m,f);f=m|0;m=c[f>>2]|0;do{if((c[12704]|0)!=-1){c[l>>2]=50816;c[l+4>>2]=532;c[l+8>>2]=0;z=0;aT(92,50816,l|0,602);if(!z){break}else{z=0}n=b$(-1,-1)|0;o=M;p=c[f>>2]|0;q=p|0;r=Ls(q)|0;bj(n|0)}}while(0);l=(c[12705]|0)-1|0;s=c[m+8>>2]|0;do{if((c[m+12>>2]|0)-s>>2>>>0>l>>>0){t=c[s+(l<<2)>>2]|0;if((t|0)==0){break}Ls(c[f>>2]|0)|0;u=c[e>>2]|0;v=b+8|0;w=cM[c[(c[v>>2]|0)+4>>2]&511](v)|0;c[k>>2]=u;u=(NN(d,k,w,w+288|0,t,g,0)|0)-w|0;if((u|0)>=288){x=4;y=0;A=d|0;B=c[A>>2]|0;C=a|0;c[C>>2]=B;i=j;return}c[h+16>>2]=((u|0)/12|0|0)%12|0;x=4;y=0;A=d|0;B=c[A>>2]|0;C=a|0;c[C>>2]=B;i=j;return}}while(0);j=ct(4)|0;S$(j);z=0;aT(126,j|0,35480,118);if(z){z=0;n=b$(-1,-1)|0;o=M;p=c[f>>2]|0;q=p|0;r=Ls(q)|0;bj(n|0)}}function O8(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0;b=i;i=i+32|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;l=b+24|0;Mx(l,f);f=l|0;l=c[f>>2]|0;do{if((c[12704]|0)!=-1){c[k>>2]=50816;c[k+4>>2]=532;c[k+8>>2]=0;z=0;aT(92,50816,k|0,602);if(!z){break}else{z=0}m=b$(-1,-1)|0;n=M;o=c[f>>2]|0;p=o|0;q=Ls(p)|0;bj(m|0)}}while(0);k=(c[12705]|0)-1|0;r=c[l+8>>2]|0;do{if((c[l+12>>2]|0)-r>>2>>>0>k>>>0){s=c[r+(k<<2)>>2]|0;if((s|0)==0){break}Ls(c[f>>2]|0)|0;c[j>>2]=c[e>>2];t=Pd(d,j,g,s,4)|0;if((c[g>>2]&4|0)!=0){u=4;v=0;w=d|0;x=c[w>>2]|0;y=a|0;c[y>>2]=x;i=b;return}if((t|0)<69){A=t+2e3|0}else{A=(t-69|0)>>>0<31>>>0?t+1900|0:t}c[h+20>>2]=A-1900;u=4;v=0;w=d|0;x=c[w>>2]|0;y=a|0;c[y>>2]=x;i=b;return}}while(0);b=ct(4)|0;S$(b);z=0;aT(126,b|0,35480,118);if(z){z=0;m=b$(-1,-1)|0;n=M;o=c[f>>2]|0;p=o|0;q=Ls(p)|0;bj(m|0)}}function O9(b,d,e,f,g,h,j,k,l){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,aq=0,ar=0,as=0,at=0;l=i;i=i+328|0;m=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[m>>2];m=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[m>>2];m=l|0;n=l+8|0;o=l+16|0;p=l+24|0;q=l+32|0;r=l+40|0;s=l+48|0;t=l+56|0;u=l+64|0;v=l+72|0;w=l+80|0;x=l+88|0;y=l+96|0;A=l+112|0;B=l+120|0;C=l+128|0;D=l+136|0;E=l+144|0;F=l+152|0;G=l+160|0;H=l+168|0;I=l+176|0;J=l+184|0;K=l+192|0;L=l+200|0;N=l+208|0;O=l+216|0;P=l+224|0;Q=l+232|0;R=l+240|0;S=l+248|0;T=l+256|0;U=l+264|0;V=l+272|0;W=l+280|0;X=l+288|0;Y=l+296|0;Z=l+304|0;_=l+312|0;$=l+320|0;c[h>>2]=0;Mx(A,g);aa=A|0;A=c[aa>>2]|0;do{if((c[12704]|0)!=-1){c[y>>2]=50816;c[y+4>>2]=532;c[y+8>>2]=0;z=0;aT(92,50816,y|0,602);if(!z){break}else{z=0}ab=b$(-1,-1)|0;ac=M;ad=c[aa>>2]|0;ae=ad|0;af=Ls(ae)|0;bj(ab|0)}}while(0);y=(c[12705]|0)-1|0;ag=c[A+8>>2]|0;do{if((c[A+12>>2]|0)-ag>>2>>>0>y>>>0){ah=c[ag+(y<<2)>>2]|0;if((ah|0)==0){break}ai=ah;Ls(c[aa>>2]|0)|0;L8:do{switch(k<<24>>24|0){case 106:{c[s>>2]=c[f>>2];ah=Pd(e,s,h,ai,3)|0;aj=c[h>>2]|0;if((aj&4|0)==0&(ah|0)<366){c[j+28>>2]=ah;break L8}else{c[h>>2]=aj|4;break L8}break};case 84:{aj=e|0;c[U>>2]=c[aj>>2];c[V>>2]=c[f>>2];O0(T,d,U,V,g,h,j,17496,17504);c[aj>>2]=c[T>>2];break};case 119:{c[o>>2]=c[f>>2];aj=Pd(e,o,h,ai,1)|0;ah=c[h>>2]|0;if((ah&4|0)==0&(aj|0)<7){c[j+24>>2]=aj;break L8}else{c[h>>2]=ah|4;break L8}break};case 89:{c[m>>2]=c[f>>2];ah=Pd(e,m,h,ai,4)|0;if((c[h>>2]&4|0)!=0){break L8}c[j+20>>2]=ah-1900;break};case 37:{c[$>>2]=c[f>>2];Pc(0,e,$,h,ai);break};case 112:{c[L>>2]=c[f>>2];Pb(d,j+8|0,e,L,h,ai);break};case 114:{ah=e|0;c[O>>2]=c[ah>>2];c[P>>2]=c[f>>2];O0(N,d,O,P,g,h,j,17512,17523);c[ah>>2]=c[N>>2];break};case 110:case 116:{c[K>>2]=c[f>>2];Pa(0,e,K,h,ai);break};case 77:{c[q>>2]=c[f>>2];ah=Pd(e,q,h,ai,2)|0;aj=c[h>>2]|0;if((aj&4|0)==0&(ah|0)<60){c[j+4>>2]=ah;break L8}else{c[h>>2]=aj|4;break L8}break};case 120:{aj=c[(c[d>>2]|0)+20>>2]|0;c[W>>2]=c[e>>2];c[X>>2]=c[f>>2];c$[aj&127](b,d,W,X,g,h,j);i=l;return};case 99:{aj=d+8|0;ah=cM[c[(c[aj>>2]|0)+12>>2]&511](aj)|0;aj=e|0;c[C>>2]=c[aj>>2];c[D>>2]=c[f>>2];ak=ah;al=a[ah]|0;if((al&1)==0){am=ak+1|0;an=ak+1|0}else{ak=c[ah+8>>2]|0;am=ak;an=ak}ak=al&255;if((ak&1|0)==0){ao=ak>>>1}else{ao=c[ah+4>>2]|0}O0(B,d,C,D,g,h,j,an,am+ao|0);c[aj>>2]=c[B>>2];break};case 97:case 65:{aj=c[f>>2]|0;ah=d+8|0;ak=cM[c[c[ah>>2]>>2]&511](ah)|0;c[x>>2]=aj;aj=(NN(e,x,ak,ak+168|0,ai,h,0)|0)-ak|0;if((aj|0)>=168){break L8}c[j+24>>2]=((aj|0)/12|0|0)%7|0;break};case 68:{aj=e|0;c[F>>2]=c[aj>>2];c[G>>2]=c[f>>2];O0(E,d,F,G,g,h,j,17536,17544);c[aj>>2]=c[E>>2];break};case 121:{c[n>>2]=c[f>>2];aj=Pd(e,n,h,ai,4)|0;if((c[h>>2]&4|0)!=0){break L8}if((aj|0)<69){ap=aj+2e3|0}else{ap=(aj-69|0)>>>0<31>>>0?aj+1900|0:aj}c[j+20>>2]=ap-1900;break};case 109:{c[r>>2]=c[f>>2];aj=Pd(e,r,h,ai,2)|0;ak=c[h>>2]|0;if((ak&4|0)==0&(aj|0)<13){c[j+16>>2]=aj-1;break L8}else{c[h>>2]=ak|4;break L8}break};case 82:{ak=e|0;c[R>>2]=c[ak>>2];c[S>>2]=c[f>>2];O0(Q,d,R,S,g,h,j,17504,17509);c[ak>>2]=c[Q>>2];break};case 83:{c[p>>2]=c[f>>2];ak=Pd(e,p,h,ai,2)|0;aj=c[h>>2]|0;if((aj&4|0)==0&(ak|0)<61){c[j>>2]=ak;break L8}else{c[h>>2]=aj|4;break L8}break};case 100:case 101:{aj=j+12|0;c[v>>2]=c[f>>2];ak=Pd(e,v,h,ai,2)|0;ah=c[h>>2]|0;do{if((ah&4|0)==0){if((ak-1|0)>>>0>=31>>>0){break}c[aj>>2]=ak;break L8}}while(0);c[h>>2]=ah|4;break};case 98:case 66:case 104:{ak=c[f>>2]|0;aj=d+8|0;al=cM[c[(c[aj>>2]|0)+4>>2]&511](aj)|0;c[w>>2]=ak;ak=(NN(e,w,al,al+288|0,ai,h,0)|0)-al|0;if((ak|0)>=288){break L8}c[j+16>>2]=((ak|0)/12|0|0)%12|0;break};case 88:{ak=d+8|0;al=cM[c[(c[ak>>2]|0)+24>>2]&511](ak)|0;ak=e|0;c[Z>>2]=c[ak>>2];c[_>>2]=c[f>>2];aj=al;aq=a[al]|0;if((aq&1)==0){ar=aj+1|0;as=aj+1|0}else{aj=c[al+8>>2]|0;ar=aj;as=aj}aj=aq&255;if((aj&1|0)==0){at=aj>>>1}else{at=c[al+4>>2]|0}O0(Y,d,Z,_,g,h,j,as,ar+at|0);c[ak>>2]=c[Y>>2];break};case 73:{ak=j+8|0;c[t>>2]=c[f>>2];al=Pd(e,t,h,ai,2)|0;aj=c[h>>2]|0;do{if((aj&4|0)==0){if((al-1|0)>>>0>=12>>>0){break}c[ak>>2]=al;break L8}}while(0);c[h>>2]=aj|4;break};case 70:{al=e|0;c[I>>2]=c[al>>2];c[J>>2]=c[f>>2];O0(H,d,I,J,g,h,j,17528,17536);c[al>>2]=c[H>>2];break};case 72:{c[u>>2]=c[f>>2];al=Pd(e,u,h,ai,2)|0;ak=c[h>>2]|0;if((ak&4|0)==0&(al|0)<24){c[j+8>>2]=al;break L8}else{c[h>>2]=ak|4;break L8}break};default:{c[h>>2]=c[h>>2]|4}}}while(0);c[b>>2]=c[e>>2];i=l;return}}while(0);l=ct(4)|0;S$(l);z=0;aT(126,l|0,35480,118);if(z){z=0;ab=b$(-1,-1)|0;ac=M;ad=c[aa>>2]|0;ae=ad|0;af=Ls(ae)|0;bj(ab|0)}}function Pa(d,e,f,g,h){d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;d=i;j=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[j>>2];j=e|0;e=f|0;f=h+8|0;L1:while(1){h=c[j>>2]|0;do{if((h|0)==0){k=0}else{if((c[h+12>>2]|0)!=(c[h+16>>2]|0)){k=h;break}if((cM[c[(c[h>>2]|0)+36>>2]&511](h)|0)==-1){c[j>>2]=0;k=0;break}else{k=c[j>>2]|0;break}}}while(0);h=(k|0)==0;l=c[e>>2]|0;L10:do{if((l|0)==0){m=12}else{do{if((c[l+12>>2]|0)==(c[l+16>>2]|0)){if((cM[c[(c[l>>2]|0)+36>>2]&511](l)|0)!=-1){break}c[e>>2]=0;m=12;break L10}}while(0);if(h){n=l;o=0}else{p=l;q=0;break L1}}}while(0);if((m|0)==12){m=0;if(h){p=0;q=1;break}else{n=0;o=1}}l=c[j>>2]|0;r=c[l+12>>2]|0;if((r|0)==(c[l+16>>2]|0)){s=(cM[c[(c[l>>2]|0)+36>>2]&511](l)|0)&255}else{s=a[r]|0}if(s<<24>>24<=-1){p=n;q=o;break}if((b[(c[f>>2]|0)+(s<<24>>24<<1)>>1]&8192)==0){p=n;q=o;break}r=c[j>>2]|0;l=r+12|0;t=c[l>>2]|0;if((t|0)==(c[r+16>>2]|0)){cM[c[(c[r>>2]|0)+40>>2]&511](r)|0;continue}else{c[l>>2]=t+1;continue}}o=c[j>>2]|0;do{if((o|0)==0){u=0}else{if((c[o+12>>2]|0)!=(c[o+16>>2]|0)){u=o;break}if((cM[c[(c[o>>2]|0)+36>>2]&511](o)|0)==-1){c[j>>2]=0;u=0;break}else{u=c[j>>2]|0;break}}}while(0);j=(u|0)==0;do{if(q){m=31}else{if((c[p+12>>2]|0)!=(c[p+16>>2]|0)){if(!(j^(p|0)==0)){break}i=d;return}if((cM[c[(c[p>>2]|0)+36>>2]&511](p)|0)==-1){c[e>>2]=0;m=31;break}if(!j){break}i=d;return}}while(0);do{if((m|0)==31){if(j){break}i=d;return}}while(0);c[g>>2]=c[g>>2]|2;i=d;return}function Pb(a,b,e,f,g,h){a=a|0;b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0;j=i;i=i+8|0;k=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[k>>2];k=j|0;l=a+8|0;a=cM[c[(c[l>>2]|0)+8>>2]&511](l)|0;l=d[a]|0;if((l&1|0)==0){m=l>>>1}else{m=c[a+4>>2]|0}l=d[a+12|0]|0;if((l&1|0)==0){n=l>>>1}else{n=c[a+16>>2]|0}if((m|0)==(-n|0)){c[g>>2]=c[g>>2]|4;i=j;return}c[k>>2]=c[f>>2];f=NN(e,k,a,a+24|0,h,g,0)|0;g=f-a|0;do{if((f|0)==(a|0)){if((c[b>>2]|0)!=12){break}c[b>>2]=0;i=j;return}}while(0);if((g|0)!=12){i=j;return}g=c[b>>2]|0;if((g|0)>=12){i=j;return}c[b>>2]=g+12;i=j;return}function Pc(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0;b=i;h=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[h>>2];h=d|0;d=c[h>>2]|0;do{if((d|0)==0){j=0}else{if((c[d+12>>2]|0)!=(c[d+16>>2]|0)){j=d;break}if((cM[c[(c[d>>2]|0)+36>>2]&511](d)|0)==-1){c[h>>2]=0;j=0;break}else{j=c[h>>2]|0;break}}}while(0);d=(j|0)==0;j=e|0;e=c[j>>2]|0;L8:do{if((e|0)==0){k=11}else{do{if((c[e+12>>2]|0)==(c[e+16>>2]|0)){if((cM[c[(c[e>>2]|0)+36>>2]&511](e)|0)!=-1){break}c[j>>2]=0;k=11;break L8}}while(0);if(d){l=e;m=0}else{k=12}}}while(0);if((k|0)==11){if(d){k=12}else{l=0;m=1}}if((k|0)==12){c[f>>2]=c[f>>2]|6;i=b;return}d=c[h>>2]|0;e=c[d+12>>2]|0;if((e|0)==(c[d+16>>2]|0)){n=(cM[c[(c[d>>2]|0)+36>>2]&511](d)|0)&255}else{n=a[e]|0}if((cR[c[(c[g>>2]|0)+36>>2]&127](g,n,0)|0)<<24>>24!=37){c[f>>2]=c[f>>2]|4;i=b;return}n=c[h>>2]|0;g=n+12|0;e=c[g>>2]|0;if((e|0)==(c[n+16>>2]|0)){cM[c[(c[n>>2]|0)+40>>2]&511](n)|0}else{c[g>>2]=e+1}e=c[h>>2]|0;do{if((e|0)==0){o=0}else{if((c[e+12>>2]|0)!=(c[e+16>>2]|0)){o=e;break}if((cM[c[(c[e>>2]|0)+36>>2]&511](e)|0)==-1){c[h>>2]=0;o=0;break}else{o=c[h>>2]|0;break}}}while(0);h=(o|0)==0;do{if(m){k=31}else{if((c[l+12>>2]|0)!=(c[l+16>>2]|0)){if(!(h^(l|0)==0)){break}i=b;return}if((cM[c[(c[l>>2]|0)+36>>2]&511](l)|0)==-1){c[j>>2]=0;k=31;break}if(!h){break}i=b;return}}while(0);do{if((k|0)==31){if(h){break}i=b;return}}while(0);c[f>>2]=c[f>>2]|2;i=b;return}function Pd(d,e,f,g,h){d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0;j=i;k=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[k>>2];k=d|0;d=c[k>>2]|0;do{if((d|0)==0){l=0}else{if((c[d+12>>2]|0)!=(c[d+16>>2]|0)){l=d;break}if((cM[c[(c[d>>2]|0)+36>>2]&511](d)|0)==-1){c[k>>2]=0;l=0;break}else{l=c[k>>2]|0;break}}}while(0);d=(l|0)==0;l=e|0;e=c[l>>2]|0;L8:do{if((e|0)==0){m=11}else{do{if((c[e+12>>2]|0)==(c[e+16>>2]|0)){if((cM[c[(c[e>>2]|0)+36>>2]&511](e)|0)!=-1){break}c[l>>2]=0;m=11;break L8}}while(0);if(d){n=e}else{m=12}}}while(0);if((m|0)==11){if(d){m=12}else{n=0}}if((m|0)==12){c[f>>2]=c[f>>2]|6;o=0;i=j;return o|0}d=c[k>>2]|0;e=c[d+12>>2]|0;if((e|0)==(c[d+16>>2]|0)){p=(cM[c[(c[d>>2]|0)+36>>2]&511](d)|0)&255}else{p=a[e]|0}do{if(p<<24>>24>-1){e=g+8|0;if((b[(c[e>>2]|0)+(p<<24>>24<<1)>>1]&2048)==0){break}d=g;q=(cR[c[(c[d>>2]|0)+36>>2]&127](g,p,0)|0)<<24>>24;r=c[k>>2]|0;s=r+12|0;t=c[s>>2]|0;if((t|0)==(c[r+16>>2]|0)){cM[c[(c[r>>2]|0)+40>>2]&511](r)|0;u=q;v=h;w=n}else{c[s>>2]=t+1;u=q;v=h;w=n}while(1){x=u-48|0;q=v-1|0;t=c[k>>2]|0;do{if((t|0)==0){y=0}else{if((c[t+12>>2]|0)!=(c[t+16>>2]|0)){y=t;break}if((cM[c[(c[t>>2]|0)+36>>2]&511](t)|0)==-1){c[k>>2]=0;y=0;break}else{y=c[k>>2]|0;break}}}while(0);t=(y|0)==0;if((w|0)==0){z=y;A=0}else{do{if((c[w+12>>2]|0)==(c[w+16>>2]|0)){if((cM[c[(c[w>>2]|0)+36>>2]&511](w)|0)!=-1){B=w;break}c[l>>2]=0;B=0}else{B=w}}while(0);z=c[k>>2]|0;A=B}C=(A|0)==0;if(!((t^C)&(q|0)>0)){m=41;break}s=c[z+12>>2]|0;if((s|0)==(c[z+16>>2]|0)){D=(cM[c[(c[z>>2]|0)+36>>2]&511](z)|0)&255}else{D=a[s]|0}if(D<<24>>24<=-1){o=x;m=59;break}if((b[(c[e>>2]|0)+(D<<24>>24<<1)>>1]&2048)==0){o=x;m=55;break}s=((cR[c[(c[d>>2]|0)+36>>2]&127](g,D,0)|0)<<24>>24)+(x*10|0)|0;r=c[k>>2]|0;E=r+12|0;F=c[E>>2]|0;if((F|0)==(c[r+16>>2]|0)){cM[c[(c[r>>2]|0)+40>>2]&511](r)|0;u=s;v=q;w=A;continue}else{c[E>>2]=F+1;u=s;v=q;w=A;continue}}if((m|0)==41){do{if((z|0)==0){G=0}else{if((c[z+12>>2]|0)!=(c[z+16>>2]|0)){G=z;break}if((cM[c[(c[z>>2]|0)+36>>2]&511](z)|0)==-1){c[k>>2]=0;G=0;break}else{G=c[k>>2]|0;break}}}while(0);d=(G|0)==0;L65:do{if(C){m=51}else{do{if((c[A+12>>2]|0)==(c[A+16>>2]|0)){if((cM[c[(c[A>>2]|0)+36>>2]&511](A)|0)!=-1){break}c[l>>2]=0;m=51;break L65}}while(0);if(d){o=x}else{break}i=j;return o|0}}while(0);do{if((m|0)==51){if(d){break}else{o=x}i=j;return o|0}}while(0);c[f>>2]=c[f>>2]|2;o=x;i=j;return o|0}else if((m|0)==55){i=j;return o|0}else if((m|0)==59){i=j;return o|0}}}while(0);c[f>>2]=c[f>>2]|4;o=0;i=j;return o|0}function Pe(a,b,d,e,f,g,h,j,k){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0;l=i;i=i+48|0;m=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[m>>2];m=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[m>>2];m=l|0;n=l+16|0;o=l+24|0;p=l+32|0;q=l+40|0;Mx(n,f);r=n|0;n=c[r>>2]|0;do{if((c[12702]|0)!=-1){c[m>>2]=50808;c[m+4>>2]=532;c[m+8>>2]=0;z=0;aT(92,50808,m|0,602);if(!z){break}else{z=0}s=b$(-1,-1)|0;t=M;u=c[r>>2]|0;v=u|0;w=Ls(v)|0;bj(s|0)}}while(0);m=(c[12703]|0)-1|0;x=c[n+8>>2]|0;do{if((c[n+12>>2]|0)-x>>2>>>0>m>>>0){y=c[x+(m<<2)>>2]|0;if((y|0)==0){break}A=y;Ls(c[r>>2]|0)|0;c[g>>2]=0;B=d|0;L8:do{if((j|0)==(k|0)){C=71}else{D=e|0;E=y;F=y;G=y;H=b;I=p|0;J=q|0;K=o|0;L=j;N=0;L10:while(1){O=N;while(1){if((O|0)!=0){C=71;break L8}P=c[B>>2]|0;do{if((P|0)==0){Q=0}else{R=c[P+12>>2]|0;if((R|0)==(c[P+16>>2]|0)){S=cM[c[(c[P>>2]|0)+36>>2]&511](P)|0}else{S=c[R>>2]|0}if((S|0)!=-1){Q=P;break}c[B>>2]=0;Q=0}}while(0);P=(Q|0)==0;R=c[D>>2]|0;do{if((R|0)==0){C=23}else{T=c[R+12>>2]|0;if((T|0)==(c[R+16>>2]|0)){U=cM[c[(c[R>>2]|0)+36>>2]&511](R)|0}else{U=c[T>>2]|0}if((U|0)==-1){c[D>>2]=0;C=23;break}else{if(P^(R|0)==0){V=R;break}else{C=25;break L10}}}}while(0);if((C|0)==23){C=0;if(P){C=25;break L10}else{V=0}}if((cR[c[(c[E>>2]|0)+52>>2]&127](A,c[L>>2]|0,0)|0)<<24>>24==37){C=28;break}if(cR[c[(c[F>>2]|0)+12>>2]&127](A,8192,c[L>>2]|0)|0){W=L;C=38;break}X=Q+12|0;R=c[X>>2]|0;Y=Q+16|0;if((R|0)==(c[Y>>2]|0)){Z=cM[c[(c[Q>>2]|0)+36>>2]&511](Q)|0}else{Z=c[R>>2]|0}R=c3[c[(c[G>>2]|0)+28>>2]&2047](A,Z)|0;if((R|0)==(c3[c[(c[G>>2]|0)+28>>2]&2047](A,c[L>>2]|0)|0)){C=66;break}c[g>>2]=4;O=4}L42:do{if((C|0)==66){C=0;O=c[X>>2]|0;if((O|0)==(c[Y>>2]|0)){cM[c[(c[Q>>2]|0)+40>>2]&511](Q)|0}else{c[X>>2]=O+4}_=L+4|0}else if((C|0)==28){C=0;O=L+4|0;if((O|0)==(k|0)){C=29;break L10}R=cR[c[(c[E>>2]|0)+52>>2]&127](A,c[O>>2]|0,0)|0;if((R<<24>>24|0)==69|(R<<24>>24|0)==48){T=L+8|0;if((T|0)==(k|0)){C=32;break L10}$=R;aa=cR[c[(c[E>>2]|0)+52>>2]&127](A,c[T>>2]|0,0)|0;ab=T}else{$=0;aa=R;ab=O}O=c[(c[H>>2]|0)+36>>2]|0;c[I>>2]=Q;c[J>>2]=V;c1[O&7](o,b,p,q,f,g,h,aa,$);c[B>>2]=c[K>>2];_=ab+4|0}else if((C|0)==38){while(1){C=0;O=W+4|0;if((O|0)==(k|0)){ac=k;break}if(cR[c[(c[F>>2]|0)+12>>2]&127](A,8192,c[O>>2]|0)|0){W=O;C=38}else{ac=O;break}}P=Q;O=V;while(1){do{if((P|0)==0){ad=0}else{R=c[P+12>>2]|0;if((R|0)==(c[P+16>>2]|0)){ae=cM[c[(c[P>>2]|0)+36>>2]&511](P)|0}else{ae=c[R>>2]|0}if((ae|0)!=-1){ad=P;break}c[B>>2]=0;ad=0}}while(0);R=(ad|0)==0;do{if((O|0)==0){C=53}else{T=c[O+12>>2]|0;if((T|0)==(c[O+16>>2]|0)){af=cM[c[(c[O>>2]|0)+36>>2]&511](O)|0}else{af=c[T>>2]|0}if((af|0)==-1){c[D>>2]=0;C=53;break}else{if(R^(O|0)==0){ag=O;break}else{_=ac;break L42}}}}while(0);if((C|0)==53){C=0;if(R){_=ac;break L42}else{ag=0}}T=ad+12|0;ah=c[T>>2]|0;ai=ad+16|0;if((ah|0)==(c[ai>>2]|0)){aj=cM[c[(c[ad>>2]|0)+36>>2]&511](ad)|0}else{aj=c[ah>>2]|0}if(!(cR[c[(c[F>>2]|0)+12>>2]&127](A,8192,aj)|0)){_=ac;break L42}ah=c[T>>2]|0;if((ah|0)==(c[ai>>2]|0)){cM[c[(c[ad>>2]|0)+40>>2]&511](ad)|0;P=ad;O=ag;continue}else{c[T>>2]=ah+4;P=ad;O=ag;continue}}}}while(0);if((_|0)==(k|0)){C=71;break L8}L=_;N=c[g>>2]|0}if((C|0)==25){c[g>>2]=4;ak=Q;break}else if((C|0)==29){c[g>>2]=4;ak=Q;break}else if((C|0)==32){c[g>>2]=4;ak=Q;break}}}while(0);if((C|0)==71){ak=c[B>>2]|0}A=d|0;do{if((ak|0)!=0){y=c[ak+12>>2]|0;if((y|0)==(c[ak+16>>2]|0)){al=cM[c[(c[ak>>2]|0)+36>>2]&511](ak)|0}else{al=c[y>>2]|0}if((al|0)!=-1){break}c[A>>2]=0}}while(0);B=c[A>>2]|0;y=(B|0)==0;N=e|0;L=c[N>>2]|0;do{if((L|0)==0){C=84}else{F=c[L+12>>2]|0;if((F|0)==(c[L+16>>2]|0)){am=cM[c[(c[L>>2]|0)+36>>2]&511](L)|0}else{am=c[F>>2]|0}if((am|0)==-1){c[N>>2]=0;C=84;break}if(!(y^(L|0)==0)){break}an=a|0;c[an>>2]=B;i=l;return}}while(0);do{if((C|0)==84){if(y){break}an=a|0;c[an>>2]=B;i=l;return}}while(0);c[g>>2]=c[g>>2]|2;an=a|0;c[an>>2]=B;i=l;return}}while(0);l=ct(4)|0;S$(l);z=0;aT(126,l|0,35480,118);if(z){z=0;s=b$(-1,-1)|0;t=M;u=c[r>>2]|0;v=u|0;w=Ls(v)|0;bj(s|0)}}function Pf(a){a=a|0;Lq(a|0);Tw(a);return}function Pg(a){a=a|0;Lq(a|0);return}function Ph(a){a=a|0;return 2}function Pi(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0;j=i;i=i+16|0;k=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[k>>2];k=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[k>>2];k=j|0;l=j+8|0;c[k>>2]=c[d>>2];c[l>>2]=c[e>>2];Pe(a,b,k,l,f,g,h,17464,17496);i=j;return}function Pj(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;k=i;i=i+16|0;l=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[l>>2];l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=k|0;m=k+8|0;n=d+8|0;o=cM[c[(c[n>>2]|0)+20>>2]&511](n)|0;c[l>>2]=c[e>>2];c[m>>2]=c[f>>2];f=a[o]|0;if((f&1)==0){p=o+4|0;q=o+4|0}else{e=c[o+8>>2]|0;p=e;q=e}e=f&255;if((e&1|0)==0){r=e>>>1}else{r=c[o+4>>2]|0}Pe(b,d,l,m,g,h,j,q,p+(r<<2)|0);i=k;return}function Pk(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0;j=i;i=i+32|0;k=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[k>>2];k=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[k>>2];k=j|0;l=j+8|0;m=j+24|0;Mx(m,f);f=m|0;m=c[f>>2]|0;do{if((c[12702]|0)!=-1){c[l>>2]=50808;c[l+4>>2]=532;c[l+8>>2]=0;z=0;aT(92,50808,l|0,602);if(!z){break}else{z=0}n=b$(-1,-1)|0;o=M;p=c[f>>2]|0;q=p|0;r=Ls(q)|0;bj(n|0)}}while(0);l=(c[12703]|0)-1|0;s=c[m+8>>2]|0;do{if((c[m+12>>2]|0)-s>>2>>>0>l>>>0){t=c[s+(l<<2)>>2]|0;if((t|0)==0){break}Ls(c[f>>2]|0)|0;u=c[e>>2]|0;v=b+8|0;w=cM[c[c[v>>2]>>2]&511](v)|0;c[k>>2]=u;u=(Oa(d,k,w,w+168|0,t,g,0)|0)-w|0;if((u|0)>=168){x=4;y=0;A=d|0;B=c[A>>2]|0;C=a|0;c[C>>2]=B;i=j;return}c[h+24>>2]=((u|0)/12|0|0)%7|0;x=4;y=0;A=d|0;B=c[A>>2]|0;C=a|0;c[C>>2]=B;i=j;return}}while(0);j=ct(4)|0;S$(j);z=0;aT(126,j|0,35480,118);if(z){z=0;n=b$(-1,-1)|0;o=M;p=c[f>>2]|0;q=p|0;r=Ls(q)|0;bj(n|0)}}function Pl(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0;j=i;i=i+32|0;k=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[k>>2];k=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[k>>2];k=j|0;l=j+8|0;m=j+24|0;Mx(m,f);f=m|0;m=c[f>>2]|0;do{if((c[12702]|0)!=-1){c[l>>2]=50808;c[l+4>>2]=532;c[l+8>>2]=0;z=0;aT(92,50808,l|0,602);if(!z){break}else{z=0}n=b$(-1,-1)|0;o=M;p=c[f>>2]|0;q=p|0;r=Ls(q)|0;bj(n|0)}}while(0);l=(c[12703]|0)-1|0;s=c[m+8>>2]|0;do{if((c[m+12>>2]|0)-s>>2>>>0>l>>>0){t=c[s+(l<<2)>>2]|0;if((t|0)==0){break}Ls(c[f>>2]|0)|0;u=c[e>>2]|0;v=b+8|0;w=cM[c[(c[v>>2]|0)+4>>2]&511](v)|0;c[k>>2]=u;u=(Oa(d,k,w,w+288|0,t,g,0)|0)-w|0;if((u|0)>=288){x=4;y=0;A=d|0;B=c[A>>2]|0;C=a|0;c[C>>2]=B;i=j;return}c[h+16>>2]=((u|0)/12|0|0)%12|0;x=4;y=0;A=d|0;B=c[A>>2]|0;C=a|0;c[C>>2]=B;i=j;return}}while(0);j=ct(4)|0;S$(j);z=0;aT(126,j|0,35480,118);if(z){z=0;n=b$(-1,-1)|0;o=M;p=c[f>>2]|0;q=p|0;r=Ls(q)|0;bj(n|0)}}function Pm(a,b,d,e,f,g,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0;b=i;i=i+32|0;j=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[j>>2];j=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[j>>2];j=b|0;k=b+8|0;l=b+24|0;Mx(l,f);f=l|0;l=c[f>>2]|0;do{if((c[12702]|0)!=-1){c[k>>2]=50808;c[k+4>>2]=532;c[k+8>>2]=0;z=0;aT(92,50808,k|0,602);if(!z){break}else{z=0}m=b$(-1,-1)|0;n=M;o=c[f>>2]|0;p=o|0;q=Ls(p)|0;bj(m|0)}}while(0);k=(c[12703]|0)-1|0;r=c[l+8>>2]|0;do{if((c[l+12>>2]|0)-r>>2>>>0>k>>>0){s=c[r+(k<<2)>>2]|0;if((s|0)==0){break}Ls(c[f>>2]|0)|0;c[j>>2]=c[e>>2];t=Pr(d,j,g,s,4)|0;if((c[g>>2]&4|0)!=0){u=4;v=0;w=d|0;x=c[w>>2]|0;y=a|0;c[y>>2]=x;i=b;return}if((t|0)<69){A=t+2e3|0}else{A=(t-69|0)>>>0<31>>>0?t+1900|0:t}c[h+20>>2]=A-1900;u=4;v=0;w=d|0;x=c[w>>2]|0;y=a|0;c[y>>2]=x;i=b;return}}while(0);b=ct(4)|0;S$(b);z=0;aT(126,b|0,35480,118);if(z){z=0;m=b$(-1,-1)|0;n=M;o=c[f>>2]|0;p=o|0;q=Ls(p)|0;bj(m|0)}}function Pn(b,d,e,f,g,h,j,k,l){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;var m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,aq=0,ar=0,as=0,at=0;l=i;i=i+328|0;m=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[m>>2];m=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[m>>2];m=l|0;n=l+8|0;o=l+16|0;p=l+24|0;q=l+32|0;r=l+40|0;s=l+48|0;t=l+56|0;u=l+64|0;v=l+72|0;w=l+80|0;x=l+88|0;y=l+96|0;A=l+112|0;B=l+120|0;C=l+128|0;D=l+136|0;E=l+144|0;F=l+152|0;G=l+160|0;H=l+168|0;I=l+176|0;J=l+184|0;K=l+192|0;L=l+200|0;N=l+208|0;O=l+216|0;P=l+224|0;Q=l+232|0;R=l+240|0;S=l+248|0;T=l+256|0;U=l+264|0;V=l+272|0;W=l+280|0;X=l+288|0;Y=l+296|0;Z=l+304|0;_=l+312|0;$=l+320|0;c[h>>2]=0;Mx(A,g);aa=A|0;A=c[aa>>2]|0;do{if((c[12702]|0)!=-1){c[y>>2]=50808;c[y+4>>2]=532;c[y+8>>2]=0;z=0;aT(92,50808,y|0,602);if(!z){break}else{z=0}ab=b$(-1,-1)|0;ac=M;ad=c[aa>>2]|0;ae=ad|0;af=Ls(ae)|0;bj(ab|0)}}while(0);y=(c[12703]|0)-1|0;ag=c[A+8>>2]|0;do{if((c[A+12>>2]|0)-ag>>2>>>0>y>>>0){ah=c[ag+(y<<2)>>2]|0;if((ah|0)==0){break}ai=ah;Ls(c[aa>>2]|0)|0;L8:do{switch(k<<24>>24|0){case 98:case 66:case 104:{ah=c[f>>2]|0;aj=d+8|0;ak=cM[c[(c[aj>>2]|0)+4>>2]&511](aj)|0;c[w>>2]=ah;ah=(Oa(e,w,ak,ak+288|0,ai,h,0)|0)-ak|0;if((ah|0)>=288){break L8}c[j+16>>2]=((ah|0)/12|0|0)%12|0;break};case 72:{c[u>>2]=c[f>>2];ah=Pr(e,u,h,ai,2)|0;ak=c[h>>2]|0;if((ak&4|0)==0&(ah|0)<24){c[j+8>>2]=ah;break L8}else{c[h>>2]=ak|4;break L8}break};case 73:{ak=j+8|0;c[t>>2]=c[f>>2];ah=Pr(e,t,h,ai,2)|0;aj=c[h>>2]|0;do{if((aj&4|0)==0){if((ah-1|0)>>>0>=12>>>0){break}c[ak>>2]=ah;break L8}}while(0);c[h>>2]=aj|4;break};case 120:{ah=c[(c[d>>2]|0)+20>>2]|0;c[W>>2]=c[e>>2];c[X>>2]=c[f>>2];c$[ah&127](b,d,W,X,g,h,j);i=l;return};case 97:case 65:{ah=c[f>>2]|0;ak=d+8|0;al=cM[c[c[ak>>2]>>2]&511](ak)|0;c[x>>2]=ah;ah=(Oa(e,x,al,al+168|0,ai,h,0)|0)-al|0;if((ah|0)>=168){break L8}c[j+24>>2]=((ah|0)/12|0|0)%7|0;break};case 100:case 101:{ah=j+12|0;c[v>>2]=c[f>>2];al=Pr(e,v,h,ai,2)|0;ak=c[h>>2]|0;do{if((ak&4|0)==0){if((al-1|0)>>>0>=31>>>0){break}c[ah>>2]=al;break L8}}while(0);c[h>>2]=ak|4;break};case 77:{c[q>>2]=c[f>>2];al=Pr(e,q,h,ai,2)|0;ah=c[h>>2]|0;if((ah&4|0)==0&(al|0)<60){c[j+4>>2]=al;break L8}else{c[h>>2]=ah|4;break L8}break};case 89:{c[m>>2]=c[f>>2];ah=Pr(e,m,h,ai,4)|0;if((c[h>>2]&4|0)!=0){break L8}c[j+20>>2]=ah-1900;break};case 121:{c[n>>2]=c[f>>2];ah=Pr(e,n,h,ai,4)|0;if((c[h>>2]&4|0)!=0){break L8}if((ah|0)<69){am=ah+2e3|0}else{am=(ah-69|0)>>>0<31>>>0?ah+1900|0:ah}c[j+20>>2]=am-1900;break};case 114:{ah=e|0;c[O>>2]=c[ah>>2];c[P>>2]=c[f>>2];Pe(N,d,O,P,g,h,j,17384,17428);c[ah>>2]=c[N>>2];break};case 82:{ah=e|0;c[R>>2]=c[ah>>2];c[S>>2]=c[f>>2];Pe(Q,d,R,S,g,h,j,17360,17380);c[ah>>2]=c[Q>>2];break};case 99:{ah=d+8|0;al=cM[c[(c[ah>>2]|0)+12>>2]&511](ah)|0;ah=e|0;c[C>>2]=c[ah>>2];c[D>>2]=c[f>>2];aj=a[al]|0;if((aj&1)==0){an=al+4|0;ao=al+4|0}else{ap=c[al+8>>2]|0;an=ap;ao=ap}ap=aj&255;if((ap&1|0)==0){aq=ap>>>1}else{aq=c[al+4>>2]|0}Pe(B,d,C,D,g,h,j,ao,an+(aq<<2)|0);c[ah>>2]=c[B>>2];break};case 106:{c[s>>2]=c[f>>2];ah=Pr(e,s,h,ai,3)|0;al=c[h>>2]|0;if((al&4|0)==0&(ah|0)<366){c[j+28>>2]=ah;break L8}else{c[h>>2]=al|4;break L8}break};case 88:{al=d+8|0;ah=cM[c[(c[al>>2]|0)+24>>2]&511](al)|0;al=e|0;c[Z>>2]=c[al>>2];c[_>>2]=c[f>>2];ap=a[ah]|0;if((ap&1)==0){ar=ah+4|0;as=ah+4|0}else{aj=c[ah+8>>2]|0;ar=aj;as=aj}aj=ap&255;if((aj&1|0)==0){at=aj>>>1}else{at=c[ah+4>>2]|0}Pe(Y,d,Z,_,g,h,j,as,ar+(at<<2)|0);c[al>>2]=c[Y>>2];break};case 70:{al=e|0;c[I>>2]=c[al>>2];c[J>>2]=c[f>>2];Pe(H,d,I,J,g,h,j,17296,17328);c[al>>2]=c[H>>2];break};case 83:{c[p>>2]=c[f>>2];al=Pr(e,p,h,ai,2)|0;ah=c[h>>2]|0;if((ah&4|0)==0&(al|0)<61){c[j>>2]=al;break L8}else{c[h>>2]=ah|4;break L8}break};case 119:{c[o>>2]=c[f>>2];ah=Pr(e,o,h,ai,1)|0;al=c[h>>2]|0;if((al&4|0)==0&(ah|0)<7){c[j+24>>2]=ah;break L8}else{c[h>>2]=al|4;break L8}break};case 84:{al=e|0;c[U>>2]=c[al>>2];c[V>>2]=c[f>>2];Pe(T,d,U,V,g,h,j,17328,17360);c[al>>2]=c[T>>2];break};case 109:{c[r>>2]=c[f>>2];al=Pr(e,r,h,ai,2)|0;ah=c[h>>2]|0;if((ah&4|0)==0&(al|0)<13){c[j+16>>2]=al-1;break L8}else{c[h>>2]=ah|4;break L8}break};case 68:{ah=e|0;c[F>>2]=c[ah>>2];c[G>>2]=c[f>>2];Pe(E,d,F,G,g,h,j,17432,17464);c[ah>>2]=c[E>>2];break};case 37:{c[$>>2]=c[f>>2];Pq(0,e,$,h,ai);break};case 110:case 116:{c[K>>2]=c[f>>2];Po(0,e,K,h,ai);break};case 112:{c[L>>2]=c[f>>2];Pp(d,j+8|0,e,L,h,ai);break};default:{c[h>>2]=c[h>>2]|4}}}while(0);c[b>>2]=c[e>>2];i=l;return}}while(0);l=ct(4)|0;S$(l);z=0;aT(126,l|0,35480,118);if(z){z=0;ab=b$(-1,-1)|0;ac=M;ad=c[aa>>2]|0;ae=ad|0;af=Ls(ae)|0;bj(ab|0)}}function Po(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;a=i;g=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[g>>2];g=b|0;b=d|0;d=f;L1:while(1){h=c[g>>2]|0;do{if((h|0)==0){j=1}else{k=c[h+12>>2]|0;if((k|0)==(c[h+16>>2]|0)){l=cM[c[(c[h>>2]|0)+36>>2]&511](h)|0}else{l=c[k>>2]|0}if((l|0)==-1){c[g>>2]=0;j=1;break}else{j=(c[g>>2]|0)==0;break}}}while(0);h=c[b>>2]|0;do{if((h|0)==0){m=15}else{k=c[h+12>>2]|0;if((k|0)==(c[h+16>>2]|0)){n=cM[c[(c[h>>2]|0)+36>>2]&511](h)|0}else{n=c[k>>2]|0}if((n|0)==-1){c[b>>2]=0;m=15;break}else{k=(h|0)==0;if(j^k){o=h;p=k;break}else{q=h;r=k;break L1}}}}while(0);if((m|0)==15){m=0;if(j){q=0;r=1;break}else{o=0;p=1}}h=c[g>>2]|0;k=c[h+12>>2]|0;if((k|0)==(c[h+16>>2]|0)){s=cM[c[(c[h>>2]|0)+36>>2]&511](h)|0}else{s=c[k>>2]|0}if(!(cR[c[(c[d>>2]|0)+12>>2]&127](f,8192,s)|0)){q=o;r=p;break}k=c[g>>2]|0;h=k+12|0;t=c[h>>2]|0;if((t|0)==(c[k+16>>2]|0)){cM[c[(c[k>>2]|0)+40>>2]&511](k)|0;continue}else{c[h>>2]=t+4;continue}}p=c[g>>2]|0;do{if((p|0)==0){u=1}else{o=c[p+12>>2]|0;if((o|0)==(c[p+16>>2]|0)){v=cM[c[(c[p>>2]|0)+36>>2]&511](p)|0}else{v=c[o>>2]|0}if((v|0)==-1){c[g>>2]=0;u=1;break}else{u=(c[g>>2]|0)==0;break}}}while(0);do{if(r){m=37}else{g=c[q+12>>2]|0;if((g|0)==(c[q+16>>2]|0)){w=cM[c[(c[q>>2]|0)+36>>2]&511](q)|0}else{w=c[g>>2]|0}if((w|0)==-1){c[b>>2]=0;m=37;break}if(!(u^(q|0)==0)){break}i=a;return}}while(0);do{if((m|0)==37){if(u){break}i=a;return}}while(0);c[e>>2]=c[e>>2]|2;i=a;return}function Pp(a,b,e,f,g,h){a=a|0;b=b|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0;j=i;i=i+8|0;k=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[k>>2];k=j|0;l=a+8|0;a=cM[c[(c[l>>2]|0)+8>>2]&511](l)|0;l=d[a]|0;if((l&1|0)==0){m=l>>>1}else{m=c[a+4>>2]|0}l=d[a+12|0]|0;if((l&1|0)==0){n=l>>>1}else{n=c[a+16>>2]|0}if((m|0)==(-n|0)){c[g>>2]=c[g>>2]|4;i=j;return}c[k>>2]=c[f>>2];f=Oa(e,k,a,a+24|0,h,g,0)|0;g=f-a|0;do{if((f|0)==(a|0)){if((c[b>>2]|0)!=12){break}c[b>>2]=0;i=j;return}}while(0);if((g|0)!=12){i=j;return}g=c[b>>2]|0;if((g|0)>=12){i=j;return}c[b>>2]=g+12;i=j;return}function Pq(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;a=i;g=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[g>>2];g=b|0;b=c[g>>2]|0;do{if((b|0)==0){h=1}else{j=c[b+12>>2]|0;if((j|0)==(c[b+16>>2]|0)){k=cM[c[(c[b>>2]|0)+36>>2]&511](b)|0}else{k=c[j>>2]|0}if((k|0)==-1){c[g>>2]=0;h=1;break}else{h=(c[g>>2]|0)==0;break}}}while(0);k=d|0;d=c[k>>2]|0;do{if((d|0)==0){l=14}else{b=c[d+12>>2]|0;if((b|0)==(c[d+16>>2]|0)){m=cM[c[(c[d>>2]|0)+36>>2]&511](d)|0}else{m=c[b>>2]|0}if((m|0)==-1){c[k>>2]=0;l=14;break}else{b=(d|0)==0;if(h^b){n=d;o=b;break}else{l=16;break}}}}while(0);if((l|0)==14){if(h){l=16}else{n=0;o=1}}if((l|0)==16){c[e>>2]=c[e>>2]|6;i=a;return}h=c[g>>2]|0;d=c[h+12>>2]|0;if((d|0)==(c[h+16>>2]|0)){p=cM[c[(c[h>>2]|0)+36>>2]&511](h)|0}else{p=c[d>>2]|0}if((cR[c[(c[f>>2]|0)+52>>2]&127](f,p,0)|0)<<24>>24!=37){c[e>>2]=c[e>>2]|4;i=a;return}p=c[g>>2]|0;f=p+12|0;d=c[f>>2]|0;if((d|0)==(c[p+16>>2]|0)){cM[c[(c[p>>2]|0)+40>>2]&511](p)|0}else{c[f>>2]=d+4}d=c[g>>2]|0;do{if((d|0)==0){q=1}else{f=c[d+12>>2]|0;if((f|0)==(c[d+16>>2]|0)){r=cM[c[(c[d>>2]|0)+36>>2]&511](d)|0}else{r=c[f>>2]|0}if((r|0)==-1){c[g>>2]=0;q=1;break}else{q=(c[g>>2]|0)==0;break}}}while(0);do{if(o){l=38}else{g=c[n+12>>2]|0;if((g|0)==(c[n+16>>2]|0)){s=cM[c[(c[n>>2]|0)+36>>2]&511](n)|0}else{s=c[g>>2]|0}if((s|0)==-1){c[k>>2]=0;l=38;break}if(!(q^(n|0)==0)){break}i=a;return}}while(0);do{if((l|0)==38){if(q){break}i=a;return}}while(0);c[e>>2]=c[e>>2]|2;i=a;return}function Pr(a,b,d,e,f){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0;g=i;h=b;b=i;i=i+4|0;i=i+7&-8;c[b>>2]=c[h>>2];h=a|0;a=c[h>>2]|0;do{if((a|0)==0){j=1}else{k=c[a+12>>2]|0;if((k|0)==(c[a+16>>2]|0)){l=cM[c[(c[a>>2]|0)+36>>2]&511](a)|0}else{l=c[k>>2]|0}if((l|0)==-1){c[h>>2]=0;j=1;break}else{j=(c[h>>2]|0)==0;break}}}while(0);l=b|0;b=c[l>>2]|0;do{if((b|0)==0){m=14}else{a=c[b+12>>2]|0;if((a|0)==(c[b+16>>2]|0)){n=cM[c[(c[b>>2]|0)+36>>2]&511](b)|0}else{n=c[a>>2]|0}if((n|0)==-1){c[l>>2]=0;m=14;break}else{if(j^(b|0)==0){o=b;break}else{m=16;break}}}}while(0);if((m|0)==14){if(j){m=16}else{o=0}}if((m|0)==16){c[d>>2]=c[d>>2]|6;p=0;i=g;return p|0}j=c[h>>2]|0;b=c[j+12>>2]|0;if((b|0)==(c[j+16>>2]|0)){q=cM[c[(c[j>>2]|0)+36>>2]&511](j)|0}else{q=c[b>>2]|0}b=e;if(!(cR[c[(c[b>>2]|0)+12>>2]&127](e,2048,q)|0)){c[d>>2]=c[d>>2]|4;p=0;i=g;return p|0}j=e;n=(cR[c[(c[j>>2]|0)+52>>2]&127](e,q,0)|0)<<24>>24;q=c[h>>2]|0;a=q+12|0;k=c[a>>2]|0;if((k|0)==(c[q+16>>2]|0)){cM[c[(c[q>>2]|0)+40>>2]&511](q)|0;r=n;s=f;t=o}else{c[a>>2]=k+4;r=n;s=f;t=o}while(1){u=r-48|0;o=s-1|0;f=c[h>>2]|0;do{if((f|0)==0){v=0}else{n=c[f+12>>2]|0;if((n|0)==(c[f+16>>2]|0)){w=cM[c[(c[f>>2]|0)+36>>2]&511](f)|0}else{w=c[n>>2]|0}if((w|0)==-1){c[h>>2]=0;v=0;break}else{v=c[h>>2]|0;break}}}while(0);f=(v|0)==0;if((t|0)==0){x=v;y=0}else{n=c[t+12>>2]|0;if((n|0)==(c[t+16>>2]|0)){z=cM[c[(c[t>>2]|0)+36>>2]&511](t)|0}else{z=c[n>>2]|0}if((z|0)==-1){c[l>>2]=0;A=0}else{A=t}x=c[h>>2]|0;y=A}B=(y|0)==0;if(!((f^B)&(o|0)>0)){break}f=c[x+12>>2]|0;if((f|0)==(c[x+16>>2]|0)){C=cM[c[(c[x>>2]|0)+36>>2]&511](x)|0}else{C=c[f>>2]|0}if(!(cR[c[(c[b>>2]|0)+12>>2]&127](e,2048,C)|0)){p=u;m=68;break}f=((cR[c[(c[j>>2]|0)+52>>2]&127](e,C,0)|0)<<24>>24)+(u*10|0)|0;n=c[h>>2]|0;k=n+12|0;a=c[k>>2]|0;if((a|0)==(c[n+16>>2]|0)){cM[c[(c[n>>2]|0)+40>>2]&511](n)|0;r=f;s=o;t=y;continue}else{c[k>>2]=a+4;r=f;s=o;t=y;continue}}if((m|0)==68){i=g;return p|0}do{if((x|0)==0){D=1}else{t=c[x+12>>2]|0;if((t|0)==(c[x+16>>2]|0)){E=cM[c[(c[x>>2]|0)+36>>2]&511](x)|0}else{E=c[t>>2]|0}if((E|0)==-1){c[h>>2]=0;D=1;break}else{D=(c[h>>2]|0)==0;break}}}while(0);do{if(B){m=60}else{h=c[y+12>>2]|0;if((h|0)==(c[y+16>>2]|0)){F=cM[c[(c[y>>2]|0)+36>>2]&511](y)|0}else{F=c[h>>2]|0}if((F|0)==-1){c[l>>2]=0;m=60;break}if(D^(y|0)==0){p=u}else{break}i=g;return p|0}}while(0);do{if((m|0)==60){if(D){break}else{p=u}i=g;return p|0}}while(0);c[d>>2]=c[d>>2]|2;p=u;i=g;return p|0}function Ps(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0;d=b;e=b+8|0;f=c[e>>2]|0;do{if((a[53952]|0)==0){if((bH(53952)|0)==0){break}g=(z=0,aA(64,2147483647,12792,0)|0);if(!z){c[12314]=g;break}else{z=0}g=b$(-1,-1,0)|0;h=M;i=g;j=i;fi(j)}}while(0);if((f|0)==(c[12314]|0)){k=b|0;Lq(k);Tw(d);return}z=0;ar(690,c[e>>2]|0);if(!z){k=b|0;Lq(k);Tw(d);return}else{z=0}d=b$(-1,-1,0)|0;h=M;i=d;j=i;fi(j)}function Pt(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;d=b+8|0;e=c[d>>2]|0;do{if((a[53952]|0)==0){if((bH(53952)|0)==0){break}f=(z=0,aA(64,2147483647,12792,0)|0);if(!z){c[12314]=f;break}else{z=0}f=b$(-1,-1,0)|0;g=M;h=f;i=h;fi(i)}}while(0);if((e|0)==(c[12314]|0)){j=b|0;Lq(j);return}z=0;ar(690,c[d>>2]|0);if(!z){j=b|0;Lq(j);return}else{z=0}j=b$(-1,-1,0)|0;g=M;h=j;i=h;fi(i)}function Pu(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;g=i;i=i+112|0;f=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[f>>2];f=g|0;l=g+8|0;m=l|0;n=f|0;a[n]=37;o=f+1|0;a[o]=j;p=f+2|0;a[p]=k;a[f+3|0]=0;if(k<<24>>24!=0){a[o]=k;a[p]=j}j=bQ(m|0,100,n|0,h|0,c[d+8>>2]|0)|0;d=l+j|0;l=c[e>>2]|0;if((j|0)==0){q=l;r=b|0;c[r>>2]=q;i=g;return}else{s=l;t=m}while(1){m=a[t]|0;if((s|0)==0){u=0}else{l=s+24|0;j=c[l>>2]|0;if((j|0)==(c[s+28>>2]|0)){v=c3[c[(c[s>>2]|0)+52>>2]&2047](s,m&255)|0}else{c[l>>2]=j+1;a[j]=m;v=m&255}u=(v|0)==-1?0:s}m=t+1|0;if((m|0)==(d|0)){q=u;break}else{s=u;t=m}}r=b|0;c[r>>2]=q;i=g;return}function Pv(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0;d=b;e=b+8|0;f=c[e>>2]|0;do{if((a[53952]|0)==0){if((bH(53952)|0)==0){break}g=(z=0,aA(64,2147483647,12792,0)|0);if(!z){c[12314]=g;break}else{z=0}g=b$(-1,-1,0)|0;h=M;i=g;j=i;fi(j)}}while(0);if((f|0)==(c[12314]|0)){k=b|0;Lq(k);Tw(d);return}z=0;ar(690,c[e>>2]|0);if(!z){k=b|0;Lq(k);Tw(d);return}else{z=0}d=b$(-1,-1,0)|0;h=M;i=d;j=i;fi(j)}function Pw(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0;d=b+8|0;e=c[d>>2]|0;do{if((a[53952]|0)==0){if((bH(53952)|0)==0){break}f=(z=0,aA(64,2147483647,12792,0)|0);if(!z){c[12314]=f;break}else{z=0}f=b$(-1,-1,0)|0;g=M;h=f;i=h;fi(i)}}while(0);if((e|0)==(c[12314]|0)){j=b|0;Lq(j);return}z=0;ar(690,c[d>>2]|0);if(!z){j=b|0;Lq(j);return}else{z=0}j=b$(-1,-1,0)|0;g=M;h=j;i=h;fi(i)}function Px(a,b,d,e,f,g,h,j){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;f=i;i=i+408|0;e=d;d=i;i=i+4|0;i=i+7&-8;c[d>>2]=c[e>>2];e=f|0;k=f+400|0;l=e|0;c[k>>2]=e+400;Py(b+8|0,l,k,g,h,j);j=c[k>>2]|0;k=c[d>>2]|0;if((l|0)==(j|0)){m=k;n=a|0;c[n>>2]=m;i=f;return}else{o=k;p=l}while(1){l=c[p>>2]|0;if((o|0)==0){q=0}else{k=o+24|0;d=c[k>>2]|0;if((d|0)==(c[o+28>>2]|0)){r=c3[c[(c[o>>2]|0)+52>>2]&2047](o,l)|0}else{c[k>>2]=d+4;c[d>>2]=l;r=l}q=(r|0)==-1?0:o}l=p+4|0;if((l|0)==(j|0)){m=q;break}else{o=q;p=l}}n=a|0;c[n>>2]=m;i=f;return}function Py(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;j=i;i=i+120|0;k=j|0;l=j+112|0;m=i;i=i+4|0;i=i+7&-8;n=j+8|0;o=k|0;a[o]=37;p=k+1|0;a[p]=g;q=k+2|0;a[q]=h;a[k+3|0]=0;if(h<<24>>24!=0){a[p]=h;a[q]=g}g=b|0;bQ(n|0,100,o|0,f|0,c[g>>2]|0)|0;c[l>>2]=0;c[l+4>>2]=0;c[m>>2]=n;n=(c[e>>2]|0)-d>>2;f=ce(c[g>>2]|0)|0;g=(z=0,aW(22,d|0,m|0,n|0,l|0)|0);if(z){z=0;l=b$(-1,-1)|0;if((f|0)==0){bj(l|0)}z=0,av(40,f|0)|0;if(!z){bj(l|0)}else{z=0;l=b$(-1,-1,0)|0;fi(l)}}do{if((f|0)!=0){z=0,av(40,f|0)|0;if(!z){break}else{z=0}l=b$(-1,-1,0)|0;fi(l)}}while(0);if((g|0)==-1){Qk(8568)}else{c[e>>2]=d+(g<<2);i=j;return}}function Pz(a){a=a|0;Lq(a|0);Tw(a);return}function PA(a){a=a|0;Lq(a|0);return}function PB(a){a=a|0;return 127}function PC(a){a=a|0;return 127}function PD(a,b){a=a|0;b=b|0;TI(a|0,0,12)|0;return}function PE(a,b){a=a|0;b=b|0;TI(a|0,0,12)|0;return}function PF(a,b){a=a|0;b=b|0;TI(a|0,0,12)|0;return}function PG(a,b){a=a|0;b=b|0;L8(a,1,45);return}function PH(a){a=a|0;return 0}function PI(b,c){b=b|0;c=c|0;c=b;E=67109634;a[c]=E;E=E>>8;a[c+1|0]=E;E=E>>8;a[c+2|0]=E;E=E>>8;a[c+3|0]=E;return}function PJ(b,c){b=b|0;c=c|0;c=b;E=67109634;a[c]=E;E=E>>8;a[c+1|0]=E;E=E>>8;a[c+2|0]=E;E=E>>8;a[c+3|0]=E;return}function PK(a){a=a|0;Lq(a|0);Tw(a);return}function PL(a){a=a|0;Lq(a|0);return}function PM(a){a=a|0;return 127}function PN(a){a=a|0;return 127}function PO(a,b){a=a|0;b=b|0;TI(a|0,0,12)|0;return}function PP(a,b){a=a|0;b=b|0;TI(a|0,0,12)|0;return}function PQ(a,b){a=a|0;b=b|0;TI(a|0,0,12)|0;return}function PR(a,b){a=a|0;b=b|0;L8(a,1,45);return}function PS(a){a=a|0;return 0}function PT(b,c){b=b|0;c=c|0;c=b;E=67109634;a[c]=E;E=E>>8;a[c+1|0]=E;E=E>>8;a[c+2|0]=E;E=E>>8;a[c+3|0]=E;return}function PU(b,c){b=b|0;c=c|0;c=b;E=67109634;a[c]=E;E=E>>8;a[c+1|0]=E;E=E>>8;a[c+2|0]=E;E=E>>8;a[c+3|0]=E;return}function PV(a){a=a|0;Lq(a|0);Tw(a);return}function PW(a){a=a|0;Lq(a|0);return}function PX(a){a=a|0;return 2147483647}function PY(a){a=a|0;return 2147483647}function PZ(a,b){a=a|0;b=b|0;TI(a|0,0,12)|0;return}function P_(a,b){a=a|0;b=b|0;TI(a|0,0,12)|0;return}function P$(a,b){a=a|0;b=b|0;TI(a|0,0,12)|0;return}function P0(a,b){a=a|0;b=b|0;Mm(a,1,45);return}function P1(a){a=a|0;return 0}function P2(b,c){b=b|0;c=c|0;c=b;E=67109634;a[c]=E;E=E>>8;a[c+1|0]=E;E=E>>8;a[c+2|0]=E;E=E>>8;a[c+3|0]=E;return}function P3(b,c){b=b|0;c=c|0;c=b;E=67109634;a[c]=E;E=E>>8;a[c+1|0]=E;E=E>>8;a[c+2|0]=E;E=E>>8;a[c+3|0]=E;return}function P4(a){a=a|0;Lq(a|0);Tw(a);return}function P5(a){a=a|0;Lq(a|0);return}function P6(a){a=a|0;return 2147483647}function P7(a){a=a|0;return 2147483647}function P8(a,b){a=a|0;b=b|0;TI(a|0,0,12)|0;return}function P9(a,b){a=a|0;b=b|0;TI(a|0,0,12)|0;return}function Qa(a,b){a=a|0;b=b|0;TI(a|0,0,12)|0;return}function Qb(a,b){a=a|0;b=b|0;Mm(a,1,45);return}function Qc(a){a=a|0;return 0}function Qd(b,c){b=b|0;c=c|0;c=b;E=67109634;a[c]=E;E=E>>8;a[c+1|0]=E;E=E>>8;a[c+2|0]=E;E=E>>8;a[c+3|0]=E;return}function Qe(b,c){b=b|0;c=c|0;c=b;E=67109634;a[c]=E;E=E>>8;a[c+1|0]=E;E=E>>8;a[c+2|0]=E;E=E>>8;a[c+3|0]=E;return}function Qf(a){a=a|0;Lq(a|0);Tw(a);return}function Qg(a){a=a|0;Lq(a|0);return}function Qh(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0;d=i;i=i+280|0;l=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[l>>2];l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=d|0;m=d+16|0;n=d+120|0;o=d+128|0;p=d+136|0;q=d+144|0;r=d+152|0;s=d+160|0;t=d+176|0;u=m|0;v=n|0;c[v>>2]=u;w=n+4|0;c[w>>2]=644;x=m+100|0;z=0;at(438,p|0,h|0);do{if(!z){m=p|0;y=c[m>>2]|0;if((c[12704]|0)==-1){A=4}else{c[l>>2]=50816;c[l+4>>2]=532;c[l+8>>2]=0;z=0;aT(92,50816,l|0,602);if(!z){A=4}else{z=0;A=15}}L5:do{if((A|0)==4){B=(c[12705]|0)-1|0;C=c[y+8>>2]|0;do{if((c[y+12>>2]|0)-C>>2>>>0>B>>>0){D=c[C+(B<<2)>>2]|0;if((D|0)==0){break}E=D;a[q]=0;F=f|0;c[r>>2]=c[F>>2];G=(z=0,ay(4,e|0,r|0,g|0,p|0,c[h+4>>2]|0,j|0,q|0,E|0,n|0,o|0,x|0)|0);if(z){z=0;A=15;break L5}L11:do{if(G){H=s|0;I=c[(c[D>>2]|0)+32>>2]|0;z=0,aW(I|0,E|0,17280,17290,H|0)|0;if(z){z=0;A=15;break L5}I=t|0;J=c[o>>2]|0;K=c[v>>2]|0;L=J-K|0;do{if((L|0)>98){N=To(L+2|0)|0;if((N|0)!=0){O=N;P=N;A=19;break}z=0;aI(4);if(!z){O=0;P=0;A=19}else{z=0;Q=0;A=16}}else{O=I;P=0;A=19}}while(0);do{if((A|0)==19){if((a[q]&1)==0){R=O}else{a[O]=45;R=O+1|0}if(K>>>0<J>>>0){L=s+10|0;N=s;S=R;T=K;while(1){U=a[T]|0;V=H;while(1){W=V+1|0;if((a[V]|0)==U<<24>>24){X=V;break}if((W|0)==(L|0)){X=L;break}else{V=W}}a[S]=a[17280+(X-N)|0]|0;V=T+1|0;U=S+1|0;if(V>>>0<(c[o>>2]|0)>>>0){S=U;T=V}else{Y=U;break}}}else{Y=R}a[Y]=0;T=cg(I|0,14624,(S=i,i=i+8|0,c[S>>2]=k,S)|0)|0;i=S;if((T|0)==1){if((P|0)==0){break L11}Tp(P);break L11}T=ct(8)|0;z=0;at(402,T|0,14176);if(z){z=0;S=b$(-1,-1)|0;N=M;bt(T|0);Z=N;_=S;$=P;break}z=0;aT(126,T|0,35512,540);if(z){z=0;Q=P;A=16;break}}}while(0);if((A|0)==16){I=b$(-1,-1)|0;Z=M;_=I;$=Q}I=_;H=Z;if(($|0)==0){aa=H;ab=I;break L5}Tp($);aa=H;ab=I;break L5}}while(0);E=e|0;D=c[E>>2]|0;do{if((D|0)==0){ac=0}else{if((c[D+12>>2]|0)!=(c[D+16>>2]|0)){ac=D;break}G=(z=0,av(c[(c[D>>2]|0)+36>>2]|0,D|0)|0);if(z){z=0;A=15;break L5}if((G|0)!=-1){ac=D;break}c[E>>2]=0;ac=0}}while(0);E=(ac|0)==0;D=c[F>>2]|0;do{if((D|0)==0){A=45}else{if((c[D+12>>2]|0)!=(c[D+16>>2]|0)){if(E){break}else{A=47;break}}G=(z=0,av(c[(c[D>>2]|0)+36>>2]|0,D|0)|0);if(z){z=0;A=15;break L5}if((G|0)==-1){c[F>>2]=0;A=45;break}else{if(E^(D|0)==0){break}else{A=47;break}}}}while(0);if((A|0)==45){if(E){A=47}}if((A|0)==47){c[j>>2]=c[j>>2]|2}c[b>>2]=ac;Ls(c[m>>2]|0)|0;D=c[v>>2]|0;c[v>>2]=0;if((D|0)==0){i=d;return}z=0;ar(c[w>>2]|0,D|0);if(!z){i=d;return}else{z=0;D=b$(-1,-1,0)|0;fi(D)}}}while(0);B=ct(4)|0;S$(B);z=0;aT(126,B|0,35480,118);if(z){z=0;A=15;break}}}while(0);if((A|0)==15){y=b$(-1,-1)|0;aa=M;ab=y}Ls(c[m>>2]|0)|0;y=c[v>>2]|0;c[v>>2]=0;if((y|0)==0){ad=ab;ae=aa}else{af=y;ag=ab;ah=aa;break}ai=ad;aj=0;ak=ai;al=ae;bj(ak|0)}else{z=0;y=b$(-1,-1)|0;c[v>>2]=0;af=u;ag=y;ah=M}}while(0);z=0;ar(c[w>>2]|0,af|0);if(!z){ad=ag;ae=ah;ai=ad;aj=0;ak=ai;al=ae;bj(ak|0)}else{z=0;ak=b$(-1,-1,0)|0;fi(ak)}}function Qi(a){a=a|0;return}function Qj(e,f,g,h,j,k,l,m,n,o,p){e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;n=n|0;o=o|0;p=p|0;var q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,aq=0,as=0,au=0,aw=0,ax=0,ay=0,az=0,aA=0,aB=0,aC=0,aD=0,aE=0,aF=0,aG=0,aH=0,aJ=0,aK=0,aL=0,aM=0,aO=0,aP=0,aQ=0,aR=0,aS=0,aT=0,aU=0,aV=0,aW=0,aX=0,aY=0,aZ=0,a_=0,a$=0,a0=0,a1=0,a2=0,a3=0,a4=0,a5=0,a6=0,a7=0,a8=0,a9=0,ba=0,bb=0,bc=0,bd=0,be=0,bf=0,bg=0,bh=0,bi=0,bk=0,bl=0,bm=0,bn=0,bo=0,bp=0,bq=0,br=0,bs=0,bt=0,bu=0,bv=0,bw=0,bx=0,by=0,bz=0,bA=0,bB=0,bC=0,bD=0,bE=0,bF=0,bG=0,bH=0,bI=0,bJ=0,bK=0,bL=0,bM=0,bN=0,bO=0,bP=0,bQ=0,bR=0,bS=0,bT=0,bU=0,bV=0,bW=0,bX=0,bY=0,bZ=0,b_=0,b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0,b7=0,b8=0;q=i;i=i+440|0;r=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[r>>2];r=q|0;s=q+400|0;t=q+408|0;u=q+416|0;v=q+424|0;w=v;x=i;i=i+12|0;i=i+7&-8;y=i;i=i+12|0;i=i+7&-8;A=i;i=i+12|0;i=i+7&-8;B=i;i=i+12|0;i=i+7&-8;C=i;i=i+4|0;i=i+7&-8;D=i;i=i+4|0;i=i+7&-8;E=r|0;c[s>>2]=0;TI(w|0,0,12)|0;F=x;G=y;H=A;I=B;TI(F|0,0,12)|0;TI(G|0,0,12)|0;TI(H|0,0,12)|0;TI(I|0,0,12)|0;z=0;aN(4,g|0,h|0,s|0,t|0,u|0,v|0,x|0,y|0,A|0,C|0);L1:do{if(!z){h=n|0;c[o>>2]=c[h>>2];g=e|0;J=f|0;K=s;L=m+8|0;N=A+1|0;O=A+4|0;P=A+8|0;Q=y+1|0;R=y+4|0;S=y+8|0;T=(j&512|0)!=0;U=x+1|0;V=x+4|0;W=x+8|0;X=B+1|0;Y=B+4|0;Z=B+8|0;_=K+3|0;$=v+4|0;aa=n+4|0;ab=p;ac=644;ad=E;ae=E;af=r+400|0;ag=0;ah=0;L3:while(1){ai=c[g>>2]|0;do{if((ai|0)==0){aj=0}else{if((c[ai+12>>2]|0)!=(c[ai+16>>2]|0)){aj=ai;break}ak=(z=0,av(c[(c[ai>>2]|0)+36>>2]|0,ai|0)|0);if(z){z=0;al=ad;am=ac;an=24;break L3}if((ak|0)==-1){c[g>>2]=0;aj=0;break}else{aj=c[g>>2]|0;break}}}while(0);ai=(aj|0)==0;ak=c[J>>2]|0;do{if((ak|0)==0){an=15}else{if((c[ak+12>>2]|0)!=(c[ak+16>>2]|0)){if(ai){ao=ak;break}else{ap=ac;aq=ad;as=ae;au=ag;an=274;break L3}}aw=(z=0,av(c[(c[ak>>2]|0)+36>>2]|0,ak|0)|0);if(z){z=0;al=ad;am=ac;an=24;break L3}if((aw|0)==-1){c[J>>2]=0;an=15;break}else{if(ai){ao=ak;break}else{ap=ac;aq=ad;as=ae;au=ag;an=274;break L3}}}}while(0);if((an|0)==15){an=0;if(ai){ap=ac;aq=ad;as=ae;au=ag;an=274;break}else{ao=0}}L25:do{switch(a[K+ah|0]|0){case 0:{an=43;break};case 3:{ak=a[G]|0;aw=ak&255;ax=(aw&1|0)==0?aw>>>1:c[R>>2]|0;aw=a[H]|0;ay=aw&255;az=(ay&1|0)==0?ay>>>1:c[O>>2]|0;if((ax|0)==(-az|0)){aA=ag;aB=af;aC=ae;aD=ad;aE=ac;aF=ab;break L25}ay=(ax|0)==0;ax=c[g>>2]|0;aG=c[ax+12>>2]|0;aH=c[ax+16>>2]|0;aJ=(aG|0)==(aH|0);if(!(ay|(az|0)==0)){if(aJ){az=(z=0,av(c[(c[ax>>2]|0)+36>>2]|0,ax|0)|0);if(z){z=0;al=ad;am=ac;an=24;break L3}aK=c[g>>2]|0;aL=az&255;aM=a[G]|0;aO=aK;aP=c[aK+12>>2]|0;aQ=c[aK+16>>2]|0}else{aL=a[aG]|0;aM=ak;aO=ax;aP=aG;aQ=aH}aH=aO+12|0;aK=(aP|0)==(aQ|0);if(aL<<24>>24==(a[(aM&1)==0?Q:c[S>>2]|0]|0)){if(aK){az=c[(c[aO>>2]|0)+40>>2]|0;z=0,av(az|0,aO|0)|0;if(z){z=0;al=ad;am=ac;an=24;break L3}}else{c[aH>>2]=aP+1}aH=d[G]|0;aA=((aH&1|0)==0?aH>>>1:c[R>>2]|0)>>>0>1>>>0?y:ag;aB=af;aC=ae;aD=ad;aE=ac;aF=ab;break L25}if(aK){aK=(z=0,av(c[(c[aO>>2]|0)+36>>2]|0,aO|0)|0);if(z){z=0;al=ad;am=ac;an=24;break L3}aR=aK&255}else{aR=a[aP]|0}if(aR<<24>>24!=(a[(a[H]&1)==0?N:c[P>>2]|0]|0)){an=110;break L3}aK=c[g>>2]|0;aH=aK+12|0;az=c[aH>>2]|0;if((az|0)==(c[aK+16>>2]|0)){aS=c[(c[aK>>2]|0)+40>>2]|0;z=0,av(aS|0,aK|0)|0;if(z){z=0;al=ad;am=ac;an=24;break L3}}else{c[aH>>2]=az+1}a[l]=1;az=d[H]|0;aA=((az&1|0)==0?az>>>1:c[O>>2]|0)>>>0>1>>>0?A:ag;aB=af;aC=ae;aD=ad;aE=ac;aF=ab;break L25}if(ay){if(aJ){ay=(z=0,av(c[(c[ax>>2]|0)+36>>2]|0,ax|0)|0);if(z){z=0;al=ad;am=ac;an=24;break L3}aT=ay&255;aU=a[H]|0}else{aT=a[aG]|0;aU=aw}if(aT<<24>>24!=(a[(aU&1)==0?N:c[P>>2]|0]|0)){aA=ag;aB=af;aC=ae;aD=ad;aE=ac;aF=ab;break L25}aw=c[g>>2]|0;ay=aw+12|0;az=c[ay>>2]|0;if((az|0)==(c[aw+16>>2]|0)){aH=c[(c[aw>>2]|0)+40>>2]|0;z=0,av(aH|0,aw|0)|0;if(z){z=0;al=ad;am=ac;an=24;break L3}}else{c[ay>>2]=az+1}a[l]=1;az=d[H]|0;aA=((az&1|0)==0?az>>>1:c[O>>2]|0)>>>0>1>>>0?A:ag;aB=af;aC=ae;aD=ad;aE=ac;aF=ab;break L25}if(aJ){aJ=(z=0,av(c[(c[ax>>2]|0)+36>>2]|0,ax|0)|0);if(z){z=0;al=ad;am=ac;an=24;break L3}aV=aJ&255;aW=a[G]|0}else{aV=a[aG]|0;aW=ak}if(aV<<24>>24!=(a[(aW&1)==0?Q:c[S>>2]|0]|0)){a[l]=1;aA=ag;aB=af;aC=ae;aD=ad;aE=ac;aF=ab;break L25}ak=c[g>>2]|0;aG=ak+12|0;aJ=c[aG>>2]|0;if((aJ|0)==(c[ak+16>>2]|0)){ax=c[(c[ak>>2]|0)+40>>2]|0;z=0,av(ax|0,ak|0)|0;if(z){z=0;al=ad;am=ac;an=24;break L3}}else{c[aG>>2]=aJ+1}aJ=d[G]|0;aA=((aJ&1|0)==0?aJ>>>1:c[R>>2]|0)>>>0>1>>>0?y:ag;aB=af;aC=ae;aD=ad;aE=ac;aF=ab;break};case 2:{if(!((ag|0)!=0|ah>>>0<2>>>0)){if((ah|0)==2){aX=(a[_]|0)!=0}else{aX=0}if(!(T|aX)){aA=0;aB=af;aC=ae;aD=ad;aE=ac;aF=ab;break L25}}aJ=a[F]|0;aG=c[W>>2]|0;ak=(aJ&1)==0?U:aG;L85:do{if((ah|0)==0){aY=ak;aZ=aJ;a_=aG}else{if((d[K+(ah-1)|0]|0)>>>0>=2>>>0){aY=ak;aZ=aJ;a_=aG;break}ax=aJ&255;L88:do{if((((ax&1|0)==0?ax>>>1:c[V>>2]|0)|0)==0){a$=ak;a0=aJ;a1=aG}else{az=ak;while(1){ay=a[az]|0;aw=(z=0,av(350,ay|0)|0);if(z){z=0;an=21;break L3}if((aw|0)==0){break}if((b[(c[L>>2]|0)+(ay<<1)>>1]&8192)==0){break}ay=az+1|0;aw=a[F]|0;aH=c[W>>2]|0;aK=aw&255;if((ay|0)==(((aw&1)==0?U:aH)+((aK&1|0)==0?aK>>>1:c[V>>2]|0)|0)){a$=ay;a0=aw;a1=aH;break L88}else{az=ay}}a$=az;a0=a[F]|0;a1=c[W>>2]|0}}while(0);ax=(a0&1)==0?U:a1;ay=a$-ax|0;aH=a[I]|0;aw=aH&255;aK=(aw&1|0)==0?aw>>>1:c[Y>>2]|0;if(ay>>>0>aK>>>0){aY=ax;aZ=a0;a_=a1;break}aw=(aH&1)==0?X:c[Z>>2]|0;aH=aw+aK|0;if((a$|0)==(ax|0)){aY=a$;aZ=a0;a_=a1;break}aS=aw+(aK-ay)|0;ay=ax;while(1){if((a[aS]|0)!=(a[ay]|0)){aY=ax;aZ=a0;a_=a1;break L85}aK=aS+1|0;if((aK|0)==(aH|0)){aY=a$;aZ=a0;a_=a1;break}else{aS=aK;ay=ay+1|0}}}}while(0);ak=aZ&255;L102:do{if((aY|0)==(((aZ&1)==0?U:a_)+((ak&1|0)==0?ak>>>1:c[V>>2]|0)|0)){a2=aY}else{aG=ao;aJ=aY;while(1){ay=c[g>>2]|0;do{if((ay|0)==0){a3=0}else{if((c[ay+12>>2]|0)!=(c[ay+16>>2]|0)){a3=ay;break}aS=(z=0,av(c[(c[ay>>2]|0)+36>>2]|0,ay|0)|0);if(z){z=0;an=22;break L3}if((aS|0)==-1){c[g>>2]=0;a3=0;break}else{a3=c[g>>2]|0;break}}}while(0);ay=(a3|0)==0;do{if((aG|0)==0){an=141}else{if((c[aG+12>>2]|0)!=(c[aG+16>>2]|0)){if(ay){a4=aG;break}else{a2=aJ;break L102}}az=(z=0,av(c[(c[aG>>2]|0)+36>>2]|0,aG|0)|0);if(z){z=0;an=22;break L3}if((az|0)==-1){c[J>>2]=0;an=141;break}else{if(ay){a4=aG;break}else{a2=aJ;break L102}}}}while(0);if((an|0)==141){an=0;if(ay){a2=aJ;break L102}else{a4=0}}az=c[g>>2]|0;aS=c[az+12>>2]|0;if((aS|0)==(c[az+16>>2]|0)){aH=(z=0,av(c[(c[az>>2]|0)+36>>2]|0,az|0)|0);if(z){z=0;an=22;break L3}a5=aH&255}else{a5=a[aS]|0}if(a5<<24>>24!=(a[aJ]|0)){a2=aJ;break L102}aS=c[g>>2]|0;aH=aS+12|0;az=c[aH>>2]|0;if((az|0)==(c[aS+16>>2]|0)){ax=c[(c[aS>>2]|0)+40>>2]|0;z=0,av(ax|0,aS|0)|0;if(z){z=0;an=22;break L3}}else{c[aH>>2]=az+1}az=aJ+1|0;aH=a[F]|0;aS=aH&255;if((az|0)==(((aH&1)==0?U:c[W>>2]|0)+((aS&1|0)==0?aS>>>1:c[V>>2]|0)|0)){a2=az;break}else{aG=a4;aJ=az}}}}while(0);if(!T){aA=ag;aB=af;aC=ae;aD=ad;aE=ac;aF=ab;break L25}ak=a[F]|0;aJ=ak&255;if((a2|0)==(((ak&1)==0?U:c[W>>2]|0)+((aJ&1|0)==0?aJ>>>1:c[V>>2]|0)|0)){aA=ag;aB=af;aC=ae;aD=ad;aE=ac;aF=ab}else{an=154;break L3}break};case 1:{if((ah|0)==3){ap=ac;aq=ad;as=ae;au=ag;an=274;break L3}aJ=c[g>>2]|0;ak=c[aJ+12>>2]|0;if((ak|0)==(c[aJ+16>>2]|0)){aG=(z=0,av(c[(c[aJ>>2]|0)+36>>2]|0,aJ|0)|0);if(z){z=0;al=ad;am=ac;an=24;break L3}a6=aG&255}else{a6=a[ak]|0}ak=a6<<24>>24;aG=(z=0,av(350,ak|0)|0);if(z){z=0;al=ad;am=ac;an=24;break L3}if((aG|0)==0){an=42;break L3}if((b[(c[L>>2]|0)+(ak<<1)>>1]&8192)==0){an=42;break L3}ak=c[g>>2]|0;aG=ak+12|0;aJ=c[aG>>2]|0;if((aJ|0)==(c[ak+16>>2]|0)){az=(z=0,av(c[(c[ak>>2]|0)+40>>2]|0,ak|0)|0);if(z){z=0;al=ad;am=ac;an=24;break L3}a7=az&255}else{c[aG>>2]=aJ+1;a7=a[aJ]|0}z=0;at(740,B|0,a7|0);if(!z){an=43}else{z=0;al=ad;am=ac;an=24;break L3}break};case 4:{aJ=0;aG=af;az=ae;ak=ad;aS=ac;aH=ab;L152:while(1){ax=c[g>>2]|0;do{if((ax|0)==0){a8=0}else{if((c[ax+12>>2]|0)!=(c[ax+16>>2]|0)){a8=ax;break}aK=(z=0,av(c[(c[ax>>2]|0)+36>>2]|0,ax|0)|0);if(z){z=0;a9=ak;ba=aS;an=19;break L3}if((aK|0)==-1){c[g>>2]=0;a8=0;break}else{a8=c[g>>2]|0;break}}}while(0);ax=(a8|0)==0;aK=c[J>>2]|0;do{if((aK|0)==0){an=167}else{if((c[aK+12>>2]|0)!=(c[aK+16>>2]|0)){if(ax){break}else{break L152}}aw=(z=0,av(c[(c[aK>>2]|0)+36>>2]|0,aK|0)|0);if(z){z=0;a9=ak;ba=aS;an=19;break L3}if((aw|0)==-1){c[J>>2]=0;an=167;break}else{if(ax){break}else{break L152}}}}while(0);if((an|0)==167){an=0;if(ax){break}}aK=c[g>>2]|0;aw=c[aK+12>>2]|0;if((aw|0)==(c[aK+16>>2]|0)){bb=(z=0,av(c[(c[aK>>2]|0)+36>>2]|0,aK|0)|0);if(z){z=0;a9=ak;ba=aS;an=19;break L3}bc=bb&255}else{bc=a[aw]|0}aw=bc<<24>>24;bb=(z=0,av(350,aw|0)|0);if(z){z=0;a9=ak;ba=aS;an=19;break L3}do{if((bb|0)==0){an=187}else{if((b[(c[L>>2]|0)+(aw<<1)>>1]&2048)==0){an=187;break}aK=c[o>>2]|0;if((aK|0)==(aH|0)){bd=(c[aa>>2]|0)!=644;be=c[h>>2]|0;bf=aH-be|0;bg=bf>>>0<2147483647>>>0?bf<<1:-1;bh=Tr(bd?be:0,bg)|0;if((bh|0)==0){z=0;aI(4);if(z){z=0;a9=ak;ba=aS;an=19;break L3}}do{if(bd){c[h>>2]=bh;bi=bh}else{be=c[h>>2]|0;c[h>>2]=bh;if((be|0)==0){bi=bh;break}z=0;ar(c[aa>>2]|0,be|0);if(z){z=0;an=184;break L3}bi=c[h>>2]|0}}while(0);c[aa>>2]=592;bh=bi+bf|0;c[o>>2]=bh;bk=(c[h>>2]|0)+bg|0;bl=bh}else{bk=aH;bl=aK}c[o>>2]=bl+1;a[bl]=bc;bm=aJ+1|0;bn=aG;bo=az;bp=ak;bq=aS;br=bk}}while(0);if((an|0)==187){an=0;aw=d[w]|0;if((((aw&1|0)==0?aw>>>1:c[$>>2]|0)|0)==0|(aJ|0)==0){break}if(bc<<24>>24!=(a[u]|0)){break}if((az|0)==(aG|0)){aw=az-ak|0;bb=aw>>>0<2147483647>>>0?aw<<1:-1;ax=aw>>2;if((aS|0)==644){bs=0}else{bs=ak}aw=Tr(bs,bb)|0;bh=aw;if((aw|0)==0){z=0;aI(4);if(z){z=0;a9=ak;ba=aS;an=19;break L3}}bt=bh+(bb>>>2<<2)|0;bu=bh+(ax<<2)|0;bv=bh;bw=592}else{bt=aG;bu=az;bv=ak;bw=aS}c[bu>>2]=aJ;bm=0;bn=bt;bo=bu+4|0;bp=bv;bq=bw;br=aH}bh=c[g>>2]|0;ax=bh+12|0;bb=c[ax>>2]|0;if((bb|0)==(c[bh+16>>2]|0)){aw=c[(c[bh>>2]|0)+40>>2]|0;z=0,av(aw|0,bh|0)|0;if(!z){aJ=bm;aG=bn;az=bo;ak=bp;aS=bq;aH=br;continue}else{z=0;a9=bp;ba=bq;an=19;break L3}}else{c[ax>>2]=bb+1;aJ=bm;aG=bn;az=bo;ak=bp;aS=bq;aH=br;continue}}if((ak|0)==(az|0)|(aJ|0)==0){bx=aG;by=az;bz=ak;bA=aS}else{if((az|0)==(aG|0)){bb=az-ak|0;ax=bb>>>0<2147483647>>>0?bb<<1:-1;bh=bb>>2;if((aS|0)==644){bB=0}else{bB=ak}bb=Tr(bB,ax)|0;aw=bb;if((bb|0)==0){z=0;aI(4);if(z){z=0;al=ak;am=aS;an=24;break L3}}bC=aw+(ax>>>2<<2)|0;bD=aw+(bh<<2)|0;bE=aw;bF=592}else{bC=aG;bD=az;bE=ak;bF=aS}c[bD>>2]=aJ;bx=bC;by=bD+4|0;bz=bE;bA=bF}if((c[C>>2]|0)>0){aw=c[g>>2]|0;do{if((aw|0)==0){bG=0}else{if((c[aw+12>>2]|0)!=(c[aw+16>>2]|0)){bG=aw;break}bh=(z=0,av(c[(c[aw>>2]|0)+36>>2]|0,aw|0)|0);if(z){z=0;al=bz;am=bA;an=24;break L3}if((bh|0)==-1){c[g>>2]=0;bG=0;break}else{bG=c[g>>2]|0;break}}}while(0);aw=(bG|0)==0;aJ=c[J>>2]|0;do{if((aJ|0)==0){an=220}else{if((c[aJ+12>>2]|0)!=(c[aJ+16>>2]|0)){if(aw){bH=aJ;break}else{an=227;break L3}}aS=(z=0,av(c[(c[aJ>>2]|0)+36>>2]|0,aJ|0)|0);if(z){z=0;al=bz;am=bA;an=24;break L3}if((aS|0)==-1){c[J>>2]=0;an=220;break}else{if(aw){bH=aJ;break}else{an=227;break L3}}}}while(0);if((an|0)==220){an=0;if(aw){an=227;break L3}else{bH=0}}aJ=c[g>>2]|0;aS=c[aJ+12>>2]|0;if((aS|0)==(c[aJ+16>>2]|0)){ak=(z=0,av(c[(c[aJ>>2]|0)+36>>2]|0,aJ|0)|0);if(z){z=0;al=bz;am=bA;an=24;break L3}bI=ak&255}else{bI=a[aS]|0}if(bI<<24>>24!=(a[t]|0)){an=227;break L3}aS=c[g>>2]|0;ak=aS+12|0;aJ=c[ak>>2]|0;if((aJ|0)==(c[aS+16>>2]|0)){az=c[(c[aS>>2]|0)+40>>2]|0;z=0,av(az|0,aS|0)|0;if(!z){bJ=aH;bK=bH}else{z=0;al=bz;am=bA;an=24;break L3}}else{c[ak>>2]=aJ+1;bJ=aH;bK=bH}while(1){aJ=c[g>>2]|0;do{if((aJ|0)==0){bL=0}else{if((c[aJ+12>>2]|0)!=(c[aJ+16>>2]|0)){bL=aJ;break}ak=(z=0,av(c[(c[aJ>>2]|0)+36>>2]|0,aJ|0)|0);if(z){z=0;an=20;break L3}if((ak|0)==-1){c[g>>2]=0;bL=0;break}else{bL=c[g>>2]|0;break}}}while(0);aJ=(bL|0)==0;do{if((bK|0)==0){an=243}else{if((c[bK+12>>2]|0)!=(c[bK+16>>2]|0)){if(aJ){bM=bK;break}else{an=252;break L3}}ak=(z=0,av(c[(c[bK>>2]|0)+36>>2]|0,bK|0)|0);if(z){z=0;an=20;break L3}if((ak|0)==-1){c[J>>2]=0;an=243;break}else{if(aJ){bM=bK;break}else{an=252;break L3}}}}while(0);if((an|0)==243){an=0;if(aJ){an=252;break L3}else{bM=0}}ak=c[g>>2]|0;aS=c[ak+12>>2]|0;if((aS|0)==(c[ak+16>>2]|0)){az=(z=0,av(c[(c[ak>>2]|0)+36>>2]|0,ak|0)|0);if(z){z=0;an=20;break L3}bN=az&255}else{bN=a[aS]|0}aS=bN<<24>>24;az=(z=0,av(350,aS|0)|0);if(z){z=0;an=20;break L3}if((az|0)==0){an=252;break L3}if((b[(c[L>>2]|0)+(aS<<1)>>1]&2048)==0){an=252;break L3}aS=c[o>>2]|0;if((aS|0)==(bJ|0)){az=(c[aa>>2]|0)!=644;ak=c[h>>2]|0;aG=bJ-ak|0;bh=aG>>>0<2147483647>>>0?aG<<1:-1;ax=Tr(az?ak:0,bh)|0;if((ax|0)==0){z=0;aI(4);if(z){z=0;an=20;break L3}}do{if(az){c[h>>2]=ax;bO=ax}else{ak=c[h>>2]|0;c[h>>2]=ax;if((ak|0)==0){bO=ax;break}z=0;ar(c[aa>>2]|0,ak|0);if(z){z=0;an=261;break L3}bO=c[h>>2]|0}}while(0);c[aa>>2]=592;ax=bO+aG|0;c[o>>2]=ax;bP=(c[h>>2]|0)+bh|0;bQ=ax}else{bP=bJ;bQ=aS}ax=c[g>>2]|0;az=c[ax+12>>2]|0;if((az|0)==(c[ax+16>>2]|0)){aJ=(z=0,av(c[(c[ax>>2]|0)+36>>2]|0,ax|0)|0);if(z){z=0;an=20;break L3}bR=aJ&255;bS=c[o>>2]|0}else{bR=a[az]|0;bS=bQ}c[o>>2]=bS+1;a[bS]=bR;az=(c[C>>2]|0)-1|0;c[C>>2]=az;aJ=c[g>>2]|0;ax=aJ+12|0;ak=c[ax>>2]|0;if((ak|0)==(c[aJ+16>>2]|0)){bb=c[(c[aJ>>2]|0)+40>>2]|0;z=0,av(bb|0,aJ|0)|0;if(z){z=0;an=20;break L3}}else{c[ax>>2]=ak+1}if((az|0)>0){bJ=bP;bK=bM}else{bT=bP;break}}}else{bT=aH}if((c[o>>2]|0)==(c[h>>2]|0)){an=272;break L3}else{aA=ag;aB=bx;aC=by;aD=bz;aE=bA;aF=bT}break};default:{aA=ag;aB=af;aC=ae;aD=ad;aE=ac;aF=ab}}}while(0);L308:do{if((an|0)==43){an=0;if((ah|0)==3){ap=ac;aq=ad;as=ae;au=ag;an=274;break L3}else{bU=ao}while(1){ai=c[g>>2]|0;do{if((ai|0)==0){bV=0}else{if((c[ai+12>>2]|0)!=(c[ai+16>>2]|0)){bV=ai;break}aw=(z=0,av(c[(c[ai>>2]|0)+36>>2]|0,ai|0)|0);if(z){z=0;an=23;break L3}if((aw|0)==-1){c[g>>2]=0;bV=0;break}else{bV=c[g>>2]|0;break}}}while(0);ai=(bV|0)==0;do{if((bU|0)==0){an=56}else{if((c[bU+12>>2]|0)!=(c[bU+16>>2]|0)){if(ai){bW=bU;break}else{aA=ag;aB=af;aC=ae;aD=ad;aE=ac;aF=ab;break L308}}aS=(z=0,av(c[(c[bU>>2]|0)+36>>2]|0,bU|0)|0);if(z){z=0;an=23;break L3}if((aS|0)==-1){c[J>>2]=0;an=56;break}else{if(ai){bW=bU;break}else{aA=ag;aB=af;aC=ae;aD=ad;aE=ac;aF=ab;break L308}}}}while(0);if((an|0)==56){an=0;if(ai){aA=ag;aB=af;aC=ae;aD=ad;aE=ac;aF=ab;break L308}else{bW=0}}aS=c[g>>2]|0;bh=c[aS+12>>2]|0;if((bh|0)==(c[aS+16>>2]|0)){aG=(z=0,av(c[(c[aS>>2]|0)+36>>2]|0,aS|0)|0);if(z){z=0;an=23;break L3}bX=aG&255}else{bX=a[bh]|0}bh=bX<<24>>24;aG=(z=0,av(350,bh|0)|0);if(z){z=0;an=23;break L3}if((aG|0)==0){aA=ag;aB=af;aC=ae;aD=ad;aE=ac;aF=ab;break L308}if((b[(c[L>>2]|0)+(bh<<1)>>1]&8192)==0){aA=ag;aB=af;aC=ae;aD=ad;aE=ac;aF=ab;break L308}bh=c[g>>2]|0;aG=bh+12|0;aS=c[aG>>2]|0;if((aS|0)==(c[bh+16>>2]|0)){aw=(z=0,av(c[(c[bh>>2]|0)+40>>2]|0,bh|0)|0);if(z){z=0;an=23;break L3}bY=aw&255}else{c[aG>>2]=aS+1;bY=a[aS]|0}z=0;at(740,B|0,bY|0);if(!z){bU=bW}else{z=0;an=23;break L3}}}}while(0);aH=ah+1|0;if(aH>>>0<4>>>0){ab=aF;ac=aE;ad=aD;ae=aC;af=aB;ag=aA;ah=aH}else{ap=aE;aq=aD;as=aC;au=aA;an=274;break}}L346:do{if((an|0)==42){c[k>>2]=c[k>>2]|4;bZ=0;b_=ad;b0=ac}else if((an|0)==110){c[k>>2]=c[k>>2]|4;bZ=0;b_=ad;b0=ac}else if((an|0)==19){ah=b$(-1,-1)|0;b1=M;b2=ah;b3=a9;b4=ba;break L1}else if((an|0)==20){ah=b$(-1,-1)|0;b1=M;b2=ah;b3=bz;b4=bA;break L1}else if((an|0)==21){ah=b$(-1,-1)|0;b1=M;b2=ah;b3=ad;b4=ac;break L1}else if((an|0)==22){ah=b$(-1,-1)|0;b1=M;b2=ah;b3=ad;b4=ac;break L1}else if((an|0)==23){ah=b$(-1,-1)|0;b1=M;b2=ah;b3=ad;b4=ac;break L1}else if((an|0)==24){ah=b$(-1,-1)|0;b1=M;b2=ah;b3=al;b4=am;break L1}else if((an|0)==154){c[k>>2]=c[k>>2]|4;bZ=0;b_=ad;b0=ac}else if((an|0)==184){ah=b$(-1,-1,0)|0;fi(ah);return 0}else if((an|0)==227){c[k>>2]=c[k>>2]|4;bZ=0;b_=bz;b0=bA}else if((an|0)==252){c[k>>2]=c[k>>2]|4;bZ=0;b_=bz;b0=bA}else if((an|0)==261){ah=b$(-1,-1,0)|0;fi(ah);return 0}else if((an|0)==272){c[k>>2]=c[k>>2]|4;bZ=0;b_=bz;b0=bA}else if((an|0)==274){L362:do{if((au|0)!=0){ah=au;ag=au+1|0;af=au+8|0;ae=au+4|0;ab=1;L364:while(1){L=d[ah]|0;if((L&1|0)==0){b5=L>>>1}else{b5=c[ae>>2]|0}if(ab>>>0>=b5>>>0){break L362}L=c[g>>2]|0;do{if((L|0)==0){b6=0}else{if((c[L+12>>2]|0)!=(c[L+16>>2]|0)){b6=L;break}h=(z=0,av(c[(c[L>>2]|0)+36>>2]|0,L|0)|0);if(z){z=0;an=18;break L364}if((h|0)==-1){c[g>>2]=0;b6=0;break}else{b6=c[g>>2]|0;break}}}while(0);L=(b6|0)==0;ai=c[J>>2]|0;do{if((ai|0)==0){an=292}else{if((c[ai+12>>2]|0)!=(c[ai+16>>2]|0)){if(L){break}else{an=301;break L364}}h=(z=0,av(c[(c[ai>>2]|0)+36>>2]|0,ai|0)|0);if(z){z=0;an=18;break L364}if((h|0)==-1){c[J>>2]=0;an=292;break}else{if(L){break}else{an=301;break L364}}}}while(0);if((an|0)==292){an=0;if(L){an=301;break}}ai=c[g>>2]|0;h=c[ai+12>>2]|0;if((h|0)==(c[ai+16>>2]|0)){aa=(z=0,av(c[(c[ai>>2]|0)+36>>2]|0,ai|0)|0);if(z){z=0;an=18;break}b7=aa&255}else{b7=a[h]|0}if((a[ah]&1)==0){b8=ag}else{b8=c[af>>2]|0}if(b7<<24>>24!=(a[b8+ab|0]|0)){an=301;break}h=ab+1|0;aa=c[g>>2]|0;ai=aa+12|0;$=c[ai>>2]|0;if(($|0)==(c[aa+16>>2]|0)){V=c[(c[aa>>2]|0)+40>>2]|0;z=0,av(V|0,aa|0)|0;if(!z){ab=h;continue}else{z=0;an=18;break}}else{c[ai>>2]=$+1;ab=h;continue}}if((an|0)==18){ab=b$(-1,-1)|0;b1=M;b2=ab;b3=aq;b4=ap;break L1}else if((an|0)==301){c[k>>2]=c[k>>2]|4;bZ=0;b_=aq;b0=ap;break L346}}}while(0);if((aq|0)==(as|0)){bZ=1;b_=as;b0=ap;break}c[D>>2]=0;Qo(v,aq,as,D);if((c[D>>2]|0)==0){bZ=1;b_=aq;b0=ap;break}c[k>>2]=c[k>>2]|4;bZ=0;b_=aq;b0=ap}}while(0);Ma(B);Ma(A);Ma(y);Ma(x);Ma(v);if((b_|0)==0){i=q;return bZ|0}z=0;ar(b0|0,b_|0);if(!z){i=q;return bZ|0}else{z=0;g=b$(-1,-1,0)|0;fi(g);return 0}}else{z=0;g=b$(-1,-1)|0;b1=M;b2=g;b3=E;b4=644}}while(0);Ma(B);Ma(A);Ma(y);Ma(x);Ma(v);if((b3|0)==0){bj(b2|0)}z=0;ar(b4|0,b3|0);if(!z){bj(b2|0)}else{z=0;b2=b$(-1,-1,0)|0;fi(b2);return 0}return 0}function Qk(a){a=a|0;var b=0;b=ct(8)|0;z=0;at(402,b|0,a|0);if(!z){bR(b|0,35512,540)}else{z=0;a=b$(-1,-1)|0;bt(b|0);bj(a|0)}}function Ql(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0;d=i;i=i+160|0;l=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[l>>2];l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=d|0;m=d+16|0;n=d+120|0;o=d+128|0;p=d+136|0;q=d+144|0;r=d+152|0;s=m|0;t=n|0;c[t>>2]=s;u=n+4|0;c[u>>2]=644;v=m+100|0;z=0;at(438,p|0,h|0);do{if(!z){m=p|0;w=c[m>>2]|0;if((c[12704]|0)==-1){x=4}else{c[l>>2]=50816;c[l+4>>2]=532;c[l+8>>2]=0;z=0;aT(92,50816,l|0,602);if(!z){x=4}else{z=0}}L5:do{if((x|0)==4){y=(c[12705]|0)-1|0;A=c[w+8>>2]|0;do{if((c[w+12>>2]|0)-A>>2>>>0>y>>>0){B=c[A+(y<<2)>>2]|0;if((B|0)==0){break}C=B;a[q]=0;D=f|0;E=c[D>>2]|0;c[r>>2]=E;F=(z=0,ay(4,e|0,r|0,g|0,p|0,c[h+4>>2]|0,j|0,q|0,C|0,n|0,o|0,v|0)|0);if(z){z=0;break L5}if(F){F=k;if((a[F]&1)==0){a[k+1|0]=0;a[F]=0}else{a[c[k+8>>2]|0]=0;c[k+4>>2]=0}F=B;if((a[q]&1)!=0){B=(z=0,aO(c[(c[F>>2]|0)+28>>2]|0,C|0,45)|0);if(z){z=0;break L5}z=0;at(740,k|0,B|0);if(z){z=0;break L5}}B=(z=0,aO(c[(c[F>>2]|0)+28>>2]|0,C|0,48)|0);if(z){z=0;break L5}C=c[t>>2]|0;F=c[o>>2]|0;G=F-1|0;L22:do{if(C>>>0<G>>>0){H=C;while(1){I=H+1|0;if((a[H]|0)!=B<<24>>24){J=H;break L22}if(I>>>0<G>>>0){H=I}else{J=I;break}}}else{J=C}}while(0);z=0,aA(72,k|0,J|0,F|0)|0;if(z){z=0;break L5}}C=e|0;G=c[C>>2]|0;do{if((G|0)==0){K=0}else{if((c[G+12>>2]|0)!=(c[G+16>>2]|0)){K=G;break}B=(z=0,av(c[(c[G>>2]|0)+36>>2]|0,G|0)|0);if(z){z=0;break L5}if((B|0)!=-1){K=G;break}c[C>>2]=0;K=0}}while(0);C=(K|0)==0;do{if((E|0)==0){x=33}else{if((c[E+12>>2]|0)!=(c[E+16>>2]|0)){if(C){break}else{x=35;break}}G=(z=0,av(c[(c[E>>2]|0)+36>>2]|0,E|0)|0);if(z){z=0;break L5}if((G|0)==-1){c[D>>2]=0;x=33;break}else{if(C^(E|0)==0){break}else{x=35;break}}}}while(0);if((x|0)==33){if(C){x=35}}if((x|0)==35){c[j>>2]=c[j>>2]|2}c[b>>2]=K;Ls(c[m>>2]|0)|0;E=c[t>>2]|0;c[t>>2]=0;if((E|0)==0){i=d;return}z=0;ar(c[u>>2]|0,E|0);if(!z){i=d;return}else{z=0;E=b$(-1,-1,0)|0;fi(E)}}}while(0);y=ct(4)|0;S$(y);z=0;aT(126,y|0,35480,118);if(z){z=0;break}}}while(0);w=b$(-1,-1)|0;y=w;w=M;Ls(c[m>>2]|0)|0;A=c[t>>2]|0;c[t>>2]=0;if((A|0)==0){L=w;N=y}else{O=A;P=w;Q=y;break}R=N;S=0;T=R;U=L;bj(T|0)}else{z=0;y=b$(-1,-1)|0;c[t>>2]=0;O=s;P=M;Q=y}}while(0);z=0;ar(c[u>>2]|0,O|0);if(!z){L=P;N=Q;R=N;S=0;T=R;U=L;bj(T|0)}else{z=0;T=b$(-1,-1,0)|0;fi(T)}}function Qm(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;f=b;g=d;h=a[f]|0;i=h&255;if((i&1|0)==0){j=i>>>1}else{j=c[b+4>>2]|0}if((h&1)==0){k=10;l=h}else{h=c[b>>2]|0;k=(h&-2)-1|0;l=h&255}h=e-g|0;if((e|0)==(d|0)){return b|0}if((k-j|0)>>>0<h>>>0){Mj(b,k,j+h-k|0,j,j,0,0);m=a[f]|0}else{m=l}if((m&1)==0){n=b+1|0}else{n=c[b+8>>2]|0}m=e+(j-g)|0;g=d;d=n+j|0;while(1){a[d]=a[g]|0;l=g+1|0;if((l|0)==(e|0)){break}else{g=l;d=d+1|0}}a[n+m|0]=0;m=j+h|0;if((a[f]&1)==0){a[f]=m<<1;return b|0}else{c[b+4>>2]=m;return b|0}return 0}function Qn(b,d,e,f,g,h,j,k,l,m){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;l=l|0;m=m|0;var n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0;n=i;i=i+56|0;o=n|0;p=n+16|0;q=n+32|0;r=n+40|0;s=r;t=i;i=i+12|0;i=i+7&-8;u=t;v=i;i=i+12|0;i=i+7&-8;w=v;x=i;i=i+12|0;i=i+7&-8;y=x;A=i;i=i+4|0;i=i+7&-8;B=i;i=i+12|0;i=i+7&-8;C=B;D=i;i=i+12|0;i=i+7&-8;F=D;G=i;i=i+12|0;i=i+7&-8;H=G;I=i;i=i+12|0;i=i+7&-8;J=I;if(b){b=c[d>>2]|0;if((c[12822]|0)!=-1){c[p>>2]=51288;c[p+4>>2]=532;c[p+8>>2]=0;L3(51288,p,602)}p=(c[12823]|0)-1|0;K=c[b+8>>2]|0;if((c[b+12>>2]|0)-K>>2>>>0<=p>>>0){L=ct(4)|0;M=L;S$(M);bR(L|0,35480,118)}b=c[K+(p<<2)>>2]|0;if((b|0)==0){L=ct(4)|0;M=L;S$(M);bR(L|0,35480,118)}L=b;cK[c[(c[b>>2]|0)+44>>2]&1023](q,L);M=e;E=c[q>>2]|0;a[M]=E;E=E>>8;a[M+1|0]=E;E=E>>8;a[M+2|0]=E;E=E>>8;a[M+3|0]=E;M=b;cK[c[(c[M>>2]|0)+32>>2]&1023](r,L);q=l;if((a[q]&1)==0){a[l+1|0]=0;a[q]=0}else{a[c[l+8>>2]|0]=0;c[l+4>>2]=0}z=0;at(774,l|0,0);if(z){z=0;p=b$(-1,-1,0)|0;fi(p)}c[q>>2]=c[s>>2];c[q+4>>2]=c[s+4>>2];c[q+8>>2]=c[s+8>>2];TI(s|0,0,12)|0;Ma(r);cK[c[(c[M>>2]|0)+28>>2]&1023](t,L);r=k;if((a[r]&1)==0){a[k+1|0]=0;a[r]=0}else{a[c[k+8>>2]|0]=0;c[k+4>>2]=0}z=0;at(774,k|0,0);if(z){z=0;s=b$(-1,-1,0)|0;fi(s)}c[r>>2]=c[u>>2];c[r+4>>2]=c[u+4>>2];c[r+8>>2]=c[u+8>>2];TI(u|0,0,12)|0;Ma(t);t=b;a[f]=cM[c[(c[t>>2]|0)+12>>2]&511](L)|0;a[g]=cM[c[(c[t>>2]|0)+16>>2]&511](L)|0;cK[c[(c[M>>2]|0)+20>>2]&1023](v,L);t=h;if((a[t]&1)==0){a[h+1|0]=0;a[t]=0}else{a[c[h+8>>2]|0]=0;c[h+4>>2]=0}z=0;at(774,h|0,0);if(z){z=0;u=b$(-1,-1,0)|0;fi(u)}c[t>>2]=c[w>>2];c[t+4>>2]=c[w+4>>2];c[t+8>>2]=c[w+8>>2];TI(w|0,0,12)|0;Ma(v);cK[c[(c[M>>2]|0)+24>>2]&1023](x,L);M=j;if((a[M]&1)==0){a[j+1|0]=0;a[M]=0}else{a[c[j+8>>2]|0]=0;c[j+4>>2]=0}z=0;at(774,j|0,0);if(z){z=0;v=b$(-1,-1,0)|0;fi(v)}c[M>>2]=c[y>>2];c[M+4>>2]=c[y+4>>2];c[M+8>>2]=c[y+8>>2];TI(y|0,0,12)|0;Ma(x);N=cM[c[(c[b>>2]|0)+36>>2]&511](L)|0;c[m>>2]=N;i=n;return}else{L=c[d>>2]|0;if((c[12824]|0)!=-1){c[o>>2]=51296;c[o+4>>2]=532;c[o+8>>2]=0;L3(51296,o,602)}o=(c[12825]|0)-1|0;d=c[L+8>>2]|0;if((c[L+12>>2]|0)-d>>2>>>0<=o>>>0){O=ct(4)|0;P=O;S$(P);bR(O|0,35480,118)}L=c[d+(o<<2)>>2]|0;if((L|0)==0){O=ct(4)|0;P=O;S$(P);bR(O|0,35480,118)}O=L;cK[c[(c[L>>2]|0)+44>>2]&1023](A,O);P=e;E=c[A>>2]|0;a[P]=E;E=E>>8;a[P+1|0]=E;E=E>>8;a[P+2|0]=E;E=E>>8;a[P+3|0]=E;P=L;cK[c[(c[P>>2]|0)+32>>2]&1023](B,O);A=l;if((a[A]&1)==0){a[l+1|0]=0;a[A]=0}else{a[c[l+8>>2]|0]=0;c[l+4>>2]=0}z=0;at(774,l|0,0);if(z){z=0;l=b$(-1,-1,0)|0;fi(l)}c[A>>2]=c[C>>2];c[A+4>>2]=c[C+4>>2];c[A+8>>2]=c[C+8>>2];TI(C|0,0,12)|0;Ma(B);cK[c[(c[P>>2]|0)+28>>2]&1023](D,O);B=k;if((a[B]&1)==0){a[k+1|0]=0;a[B]=0}else{a[c[k+8>>2]|0]=0;c[k+4>>2]=0}z=0;at(774,k|0,0);if(z){z=0;k=b$(-1,-1,0)|0;fi(k)}c[B>>2]=c[F>>2];c[B+4>>2]=c[F+4>>2];c[B+8>>2]=c[F+8>>2];TI(F|0,0,12)|0;Ma(D);D=L;a[f]=cM[c[(c[D>>2]|0)+12>>2]&511](O)|0;a[g]=cM[c[(c[D>>2]|0)+16>>2]&511](O)|0;cK[c[(c[P>>2]|0)+20>>2]&1023](G,O);D=h;if((a[D]&1)==0){a[h+1|0]=0;a[D]=0}else{a[c[h+8>>2]|0]=0;c[h+4>>2]=0}z=0;at(774,h|0,0);if(z){z=0;h=b$(-1,-1,0)|0;fi(h)}c[D>>2]=c[H>>2];c[D+4>>2]=c[H+4>>2];c[D+8>>2]=c[H+8>>2];TI(H|0,0,12)|0;Ma(G);cK[c[(c[P>>2]|0)+24>>2]&1023](I,O);P=j;if((a[P]&1)==0){a[j+1|0]=0;a[P]=0}else{a[c[j+8>>2]|0]=0;c[j+4>>2]=0}z=0;at(774,j|0,0);if(z){z=0;j=b$(-1,-1,0)|0;fi(j)}c[P>>2]=c[J>>2];c[P+4>>2]=c[J+4>>2];c[P+8>>2]=c[J+8>>2];TI(J|0,0,12)|0;Ma(I);N=cM[c[(c[L>>2]|0)+36>>2]&511](O)|0;c[m>>2]=N;i=n;return}}function Qo(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;g=b;h=b;i=a[h]|0;j=i&255;if((j&1|0)==0){k=j>>>1}else{k=c[b+4>>2]|0}if((k|0)==0){return}do{if((d|0)==(e|0)){l=i}else{k=e-4|0;if(k>>>0>d>>>0){m=d;n=k}else{l=i;break}do{k=c[m>>2]|0;c[m>>2]=c[n>>2];c[n>>2]=k;m=m+4|0;n=n-4|0;}while(m>>>0<n>>>0);l=a[h]|0}}while(0);if((l&1)==0){o=g+1|0}else{o=c[b+8>>2]|0}g=l&255;if((g&1|0)==0){p=g>>>1}else{p=c[b+4>>2]|0}b=e-4|0;e=a[o]|0;g=e<<24>>24;l=e<<24>>24<1|e<<24>>24==127;L22:do{if(b>>>0>d>>>0){e=o+p|0;h=o;n=d;m=g;i=l;while(1){if(!i){if((m|0)!=(c[n>>2]|0)){break}}k=(e-h|0)>1?h+1|0:h;j=n+4|0;q=a[k]|0;r=q<<24>>24;s=q<<24>>24<1|q<<24>>24==127;if(j>>>0<b>>>0){h=k;n=j;m=r;i=s}else{t=r;u=s;break L22}}c[f>>2]=4;return}else{t=g;u=l}}while(0);if(u){return}u=c[b>>2]|0;if(!(t>>>0<u>>>0|(u|0)==0)){return}c[f>>2]=4;return}function Qp(a){a=a|0;Lq(a|0);Tw(a);return}function Qq(a){a=a|0;Lq(a|0);return}function Qr(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0;d=i;i=i+600|0;l=e;e=i;i=i+4|0;i=i+7&-8;c[e>>2]=c[l>>2];l=f;f=i;i=i+4|0;i=i+7&-8;c[f>>2]=c[l>>2];l=d|0;m=d+16|0;n=d+416|0;o=d+424|0;p=d+432|0;q=d+440|0;r=d+448|0;s=d+456|0;t=d+496|0;u=m|0;v=n|0;c[v>>2]=u;w=n+4|0;c[w>>2]=644;x=m+400|0;z=0;at(438,p|0,h|0);do{if(!z){m=p|0;y=c[m>>2]|0;if((c[12702]|0)==-1){A=4}else{c[l>>2]=50808;c[l+4>>2]=532;c[l+8>>2]=0;z=0;aT(92,50808,l|0,602);if(!z){A=4}else{z=0;A=15}}L5:do{if((A|0)==4){B=(c[12703]|0)-1|0;C=c[y+8>>2]|0;do{if((c[y+12>>2]|0)-C>>2>>>0>B>>>0){D=c[C+(B<<2)>>2]|0;if((D|0)==0){break}E=D;a[q]=0;F=f|0;c[r>>2]=c[F>>2];G=(z=0,ay(2,e|0,r|0,g|0,p|0,c[h+4>>2]|0,j|0,q|0,E|0,n|0,o|0,x|0)|0);if(z){z=0;A=15;break L5}L11:do{if(G){H=s|0;I=c[(c[D>>2]|0)+48>>2]|0;z=0,aW(I|0,E|0,17264,17274,H|0)|0;if(z){z=0;A=15;break L5}I=t|0;J=c[o>>2]|0;K=c[v>>2]|0;L=J-K|0;do{if((L|0)>392){N=To((L>>2)+2|0)|0;if((N|0)!=0){O=N;P=N;A=19;break}z=0;aI(4);if(!z){O=0;P=0;A=19}else{z=0;Q=0;A=16}}else{O=I;P=0;A=19}}while(0);do{if((A|0)==19){if((a[q]&1)==0){R=O}else{a[O]=45;R=O+1|0}if(K>>>0<J>>>0){L=s+40|0;N=s;S=R;T=K;while(1){U=c[T>>2]|0;V=H;while(1){W=V+4|0;if((c[V>>2]|0)==(U|0)){X=V;break}if((W|0)==(L|0)){X=L;break}else{V=W}}a[S]=a[17264+(X-N>>2)|0]|0;V=T+4|0;U=S+1|0;if(V>>>0<(c[o>>2]|0)>>>0){S=U;T=V}else{Y=U;break}}}else{Y=R}a[Y]=0;T=cg(I|0,14624,(S=i,i=i+8|0,c[S>>2]=k,S)|0)|0;i=S;if((T|0)==1){if((P|0)==0){break L11}Tp(P);break L11}T=ct(8)|0;z=0;at(402,T|0,14176);if(z){z=0;S=b$(-1,-1)|0;N=M;bt(T|0);Z=N;_=S;$=P;break}z=0;aT(126,T|0,35512,540);if(z){z=0;Q=P;A=16;break}}}while(0);if((A|0)==16){I=b$(-1,-1)|0;Z=M;_=I;$=Q}I=_;H=Z;if(($|0)==0){aa=H;ab=I;break L5}Tp($);aa=H;ab=I;break L5}}while(0);E=e|0;D=c[E>>2]|0;do{if((D|0)==0){ac=0}else{G=c[D+12>>2]|0;if((G|0)==(c[D+16>>2]|0)){I=(z=0,av(c[(c[D>>2]|0)+36>>2]|0,D|0)|0);if(!z){ad=I}else{z=0;A=15;break L5}}else{ad=c[G>>2]|0}if((ad|0)!=-1){ac=D;break}c[E>>2]=0;ac=0}}while(0);E=(ac|0)==0;D=c[F>>2]|0;do{if((D|0)==0){A=46}else{G=c[D+12>>2]|0;if((G|0)==(c[D+16>>2]|0)){I=(z=0,av(c[(c[D>>2]|0)+36>>2]|0,D|0)|0);if(!z){ae=I}else{z=0;A=15;break L5}}else{ae=c[G>>2]|0}if((ae|0)==-1){c[F>>2]=0;A=46;break}else{if(E^(D|0)==0){break}else{A=48;break}}}}while(0);if((A|0)==46){if(E){A=48}}if((A|0)==48){c[j>>2]=c[j>>2]|2}c[b>>2]=ac;Ls(c[m>>2]|0)|0;D=c[v>>2]|0;c[v>>2]=0;if((D|0)==0){i=d;return}z=0;ar(c[w>>2]|0,D|0);if(!z){i=d;return}else{z=0;D=b$(-1,-1,0)|0;fi(D)}}}while(0);B=ct(4)|0;S$(B);z=0;aT(126,B|0,35480,118);if(z){z=0;A=15;break}}}while(0);if((A|0)==15){y=b$(-1,-1)|0;aa=M;ab=y}Ls(c[m>>2]|0)|0;y=c[v>>2]|0;c[v>>2]=0;if((y|0)==0){af=ab;ag=aa}else{ah=y;ai=ab;aj=aa;break}ak=af;al=0;am=ak;an=ag;bj(am|0)}else{z=0;y=b$(-1,-1)|0;c[v>>2]=0;ah=u;ai=y;aj=M}}while(0);z=0;ar(c[w>>2]|0,ah|0);if(!z){af=ai;ag=aj;ak=af;al=0;am=ak;an=ag;bj(am|0)}else{z=0;am=b$(-1,-1,0)|0;fi(am)}}
function zB(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,as=0,au=0,aw=0,ax=0,ay=0,az=0,aB=0,aC=0,aD=0,aF=0,aG=0,aH=0,aI=0,aJ=0,aK=0,aL=0,aM=0,aN=0,aP=0,aQ=0,aR=0,aS=0,aU=0,aV=0,aW=0,aX=0,aY=0,aZ=0,a_=0,a$=0,a0=0,a1=0,a2=0,a3=0,a4=0,a5=0,a6=0,a7=0,a8=0,a9=0,ba=0,bb=0,bc=0,bd=0,be=0;d=i;i=i+272|0;e=d|0;f=d+16|0;g=d+24|0;h=d+40|0;j=d+48|0;k=d+64|0;l=d+72|0;m=d+88|0;n=d+104|0;o=d+120|0;p=d+136|0;q=d+152|0;r=d+168|0;s=d+184|0;t=d+200|0;u=d+216|0;v=d+232|0;w=d+248|0;x=d+264|0;y=x;A=i;i=i+12|0;i=i+7&-8;B=i;i=i+12|0;i=i+7&-8;C=i;i=i+12|0;i=i+7&-8;D=i;i=i+12|0;i=i+7&-8;E=i;i=i+12|0;i=i+7&-8;F=i;i=i+12|0;i=i+7&-8;G=i;i=i+12|0;i=i+7&-8;H=i;i=i+12|0;i=i+7&-8;I=b+20|0;J=Ej(c[I>>2]|0)|0;K=(a[J]|0)==91?J+1|0:0;if((K|0)!=0){L=b+48|0;N=c[L>>2]|0;O=c[I>>2]|0;L3:do{if(O>>>0<K>>>0){P=O;Q=0;while(1){R=a[P]|0;if((R<<24>>24|0)==10){S=Q+1|0}else if((R<<24>>24|0)==0){T=Q;break L3}else{S=Q}R=P+1|0;if(R>>>0<K>>>0){P=R;Q=S}else{T=S;break}}}else{T=0}}while(0);c[L>>2]=T+N;N=J-1|0;L10:do{if(N>>>0<O>>>0){U=0}else{L=0;S=N;while(1){Q=L+1|0;if((a[S]|0)==10){U=L;break L10}P=S-1|0;if(P>>>0<O>>>0){U=Q;break}else{L=Q;S=P}}}}while(0);O=b+40|0;if((T|0)==0){V=c[O>>2]|0}else{c[O>>2]=1;V=1}c[b+52>>2]=V+U;T=K;N=J;c[O>>2]=T-N+U+V;V=b+56|0;c[V>>2]=N;c[V+4>>2]=T;c[I>>2]=K}K=l;l=b+44|0;c[K>>2]=c[l>>2];c[K+4>>2]=c[l+4>>2];c[K+8>>2]=c[l+8>>2];do{if((zN(b)|0)==0){l=Tu(48)|0;T=m+8|0;c[T>>2]=l;c[m>>2]=49;c[m+4>>2]=44;TF(l|0,9072,44)|0;a[l+44|0]=0;c[n>>2]=0;c[n+4>>2]=0;c[n+8>>2]=0;z=0;aT(362,b|0,m|0,n|0);if(!z){if((a[m]&1)==0){break}Tw(c[T>>2]|0);break}else{z=0}l=b$(-1,-1)|0;V=l;l=M;if((a[m]&1)==0){W=l;X=V;Y=X;Z=0;_=Y;$=W;bj(_|0)}Tw(c[T>>2]|0);W=l;X=V;Y=X;Z=0;_=Y;$=W;bj(_|0)}}while(0);m=b+56|0;n=m|0;V=c[n>>2]|0;l=b+60|0;T=(c[l>>2]|0)-V|0;if(T>>>0>4294967279>>>0){L4(0);return 0}if(T>>>0<11>>>0){a[o]=T<<1;aa=o+1|0}else{N=T+16&-16;U=Tu(N)|0;c[o+8>>2]=U;c[o>>2]=N|1;c[o+4>>2]=T;aa=U}TF(aa|0,V|0,T)|0;a[aa+T|0]=0;T=(z=0,av(76,c[I>>2]|0)|0);L38:do{if(!z){aa=(a[T]|0)==93?T+1|0:0;L40:do{if((aa|0)==0){V=(z=0,av(68,b|0)|0);if(z){z=0;ab=70;break L38}L124:do{if((V|0)==0){U=t;TI(U|0,0,12)|0;N=o;O=a[o]|0;J=O&255;if((J&1|0)==0){ac=J>>>1}else{ac=c[o+4>>2]|0}J=ac+43|0;do{if(J>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(J>>>0<11>>>0){a[U]=86;ad=t+1|0}else{S=ac+59&-16;L=(z=0,av(316,S|0)|0);if(z){z=0;break}c[t+8>>2]=L;c[t>>2]=S|1;c[t+4>>2]=43;ad=L}TF(ad|0,8856,43)|0;a[ad+43|0]=0;if((O&1)==0){ae=N+1|0}else{ae=c[o+8>>2]|0}z=0,aA(80,t|0,ae|0,ac|0)|0;if(z){z=0;break}c[u>>2]=0;c[u+4>>2]=0;c[u+8>>2]=0;z=0;aT(362,b|0,t|0,u|0);if(!z){if((a[U]&1)==0){break L124}Tw(c[t+8>>2]|0);break L124}else{z=0;L=b$(-1,-1)|0;S=L;L=M;if((a[U]&1)==0){af=L;ag=S;break L38}Tw(c[t+8>>2]|0);af=L;ag=S;break L38}}}while(0);N=b$(-1,-1)|0;O=M;if((a[U]&1)==0){ah=O;ai=N;ab=71;break L38}Tw(c[t+8>>2]|0);ah=O;ai=N;ab=71;break L38}}while(0);V=c[n>>2]|0;N=(c[l>>2]|0)-V|0;if(N>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;ab=70;break L38}return 0}if(N>>>0<11>>>0){O=N<<1&255;a[v]=O;aj=v+1|0;ak=O}else{O=N+16&-16;J=(z=0,av(316,O|0)|0);if(z){z=0;ab=70;break L38}c[v+8>>2]=J;S=O|1;c[v>>2]=S;c[v+4>>2]=N;aj=J;ak=S&255}TF(aj|0,V|0,N)|0;a[aj+N|0]=0;N=(z=0,av(180,b|0)|0);L161:do{if(!z){L163:do{if((N|0)==0){V=(z=0,av(270,b|0)|0);if(z){z=0;ab=138;break L161}if((V|0)!=0){V=m;S=c[V+4>>2]|0;c[x>>2]=c[V>>2];c[x+4>>2]=S;S=(z=0,aO(572,b|0,y|0)|0);if(!z){al=S;break}else{z=0;ab=138;break L161}}S=A;TI(S|0,0,12)|0;V=o;J=a[o]|0;O=J&255;if((O&1|0)==0){am=O>>>1}else{am=c[o+4>>2]|0}O=am+67|0;do{if(O>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(O>>>0<11>>>0){a[S]=-122;an=A+1|0}else{L=am+83&-16;P=(z=0,av(316,L|0)|0);if(z){z=0;break}c[A+8>>2]=P;c[A>>2]=L|1;c[A+4>>2]=67;an=P}TF(an|0,8680,67)|0;a[an+67|0]=0;if((J&1)==0){ao=V+1|0}else{ao=c[o+8>>2]|0}z=0,aA(80,A|0,ao|0,am|0)|0;if(z){z=0;break}c[B>>2]=0;c[B+4>>2]=0;c[B+8>>2]=0;z=0;aT(362,b|0,A|0,B|0);if(!z){if((a[S]&1)==0){al=0;break L163}Tw(c[A+8>>2]|0);al=0;break L163}else{z=0;P=b$(-1,-1)|0;L=P;P=M;if((a[S]&1)==0){ap=P;as=L;break L161}Tw(c[A+8>>2]|0);ap=P;as=L;break L161}}}while(0);V=b$(-1,-1)|0;J=M;if((a[S]&1)==0){au=J;aw=V;ab=139;break L161}Tw(c[A+8>>2]|0);au=J;aw=V;ab=139;break L161}else{V=c[b>>2]|0;J=(z=0,av(316,68)|0);if(z){z=0;ab=138;break L161}O=J;c[h>>2]=O;J=V+4|0;L=c[J>>2]|0;if((L|0)==(c[V+8>>2]|0)){z=0;at(498,V|0,h|0);if(z){z=0;ab=138;break L161}ax=c[h>>2]|0}else{if((L|0)==0){ay=0}else{c[L>>2]=O;ay=c[J>>2]|0}c[J>>2]=ay+4;ax=O}O=ax;L=b+28|0;L174:do{if((a[L]&1)==0){P=w;c[P>>2]=c[L>>2];c[P+4>>2]=c[L+4>>2];c[P+8>>2]=c[L+8>>2];ab=135}else{P=c[b+36>>2]|0;Q=c[b+32>>2]|0;do{if(Q>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(Q>>>0<11>>>0){a[w]=Q<<1;az=w+1|0}else{R=Q+16&-16;aB=(z=0,av(316,R|0)|0);if(z){z=0;break}c[w+8>>2]=aB;c[w>>2]=R|1;c[w+4>>2]=Q;az=aB}TF(az|0,P|0,Q)|0;a[az+Q|0]=0;ab=135;break L174}}while(0);Q=b$(-1,-1)|0;aC=M;aD=Q}}while(0);do{if((ab|0)==135){L=g;c[L>>2]=c[K>>2];c[L+4>>2]=c[K+4>>2];c[L+8>>2]=c[K+8>>2];z=0;aq(14,ax|0,w|0,g|0,m|0,1);if(!z){L=ax;if((a[w]&1)==0){al=L;break L163}Tw(c[w+8>>2]|0);al=L;break L163}else{z=0;L=b$(-1,-1)|0;S=L;L=M;if((a[w]&1)==0){aC=L;aD=S;break}Tw(c[w+8>>2]|0);aC=L;aD=S;break}}}while(0);S=c[V>>2]|0;L=c[J>>2]|0;L195:do{if((S|0)==(L|0)){aF=S}else{Q=S;while(1){P=Q+4|0;if((c[Q>>2]|0)==(ax|0)){aF=Q;break L195}if((P|0)==(L|0)){aF=L;break}else{Q=P}}}}while(0);V=aF-S>>2;Q=S+(V+1<<2)|0;P=L-Q|0;TG(S+(V<<2)|0,Q|0,P|0)|0;Q=S+((P>>2)+V<<2)|0;V=c[J>>2]|0;if((Q|0)!=(V|0)){c[J>>2]=V+(~((V-4+(-Q|0)|0)>>>2)<<2)}Tw(O);ap=aC;as=aD;break L161}}while(0);U=(z=0,av(76,c[I>>2]|0)|0);if(z){z=0;ab=138;break}Q=(a[U]|0)==93?U+1|0:0;L235:do{if((Q|0)==0){V=C;TI(V|0,0,12)|0;P=o;aB=a[o]|0;R=aB&255;if((R&1|0)==0){aG=R>>>1}else{aG=c[o+4>>2]|0}R=aG+36|0;do{if(R>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(R>>>0<11>>>0){a[V]=72;aH=C+1|0}else{aI=aG+52&-16;aJ=(z=0,av(316,aI|0)|0);if(z){z=0;break}c[C+8>>2]=aJ;c[C>>2]=aI|1;c[C+4>>2]=36;aH=aJ}TF(aH|0,8440,36)|0;a[aH+36|0]=0;if((aB&1)==0){aK=P+1|0}else{aK=c[o+8>>2]|0}z=0,aA(80,C|0,aK|0,aG|0)|0;if(z){z=0;break}c[D>>2]=0;c[D+4>>2]=0;c[D+8>>2]=0;z=0;aT(362,b|0,C|0,D|0);if(!z){if((a[V]&1)==0){break L235}Tw(c[C+8>>2]|0);break L235}else{z=0;aJ=b$(-1,-1)|0;aI=aJ;aJ=M;if((a[V]&1)==0){ap=aJ;as=aI;break L161}Tw(c[C+8>>2]|0);ap=aJ;as=aI;break L161}}}while(0);P=b$(-1,-1)|0;aB=M;if((a[V]&1)==0){au=aB;aw=P;ab=139;break L161}Tw(c[C+8>>2]|0);au=aB;aw=P;ab=139;break L161}else{P=b+48|0;aB=c[P>>2]|0;R=c[I>>2]|0;L263:do{if(R>>>0<Q>>>0){O=R;J=0;while(1){S=a[O]|0;if((S<<24>>24|0)==10){aL=J+1|0}else if((S<<24>>24|0)==0){aM=J;break L263}else{aL=J}S=O+1|0;if(S>>>0<Q>>>0){O=S;J=aL}else{aM=aL;break}}}else{aM=0}}while(0);c[P>>2]=aM+aB;V=U-1|0;L270:do{if(V>>>0<R>>>0){aN=0}else{J=0;O=V;while(1){S=J+1|0;if((a[O]|0)==10){aN=J;break L270}L=O-1|0;if(L>>>0<R>>>0){aN=S;break}else{J=S;O=L}}}}while(0);R=b+40|0;if((aM|0)==0){aP=c[R>>2]|0}else{c[R>>2]=1;aP=1}c[b+52>>2]=aP+aN;V=Q;aB=U;c[R>>2]=V-aB+aN+aP;R=m;c[R>>2]=aB;c[R+4>>2]=V;c[I>>2]=Q}}while(0);Q=c[b>>2]|0;U=(z=0,av(316,60)|0);if(z){z=0;ab=138;break}V=U;c[f>>2]=V;U=Q+4|0;R=c[U>>2]|0;if((R|0)==(c[Q+8>>2]|0)){z=0;at(498,Q|0,f|0);if(z){z=0;ab=138;break}aQ=c[f>>2]|0}else{if((R|0)==0){aR=0}else{c[R>>2]=V;aR=c[U>>2]|0}c[U>>2]=aR+4;aQ=V}V=aQ;R=aQ;aB=b+28|0;L289:do{if((a[aB]&1)==0){P=E;c[P>>2]=c[aB>>2];c[P+4>>2]=c[aB+4>>2];c[P+8>>2]=c[aB+8>>2];ab=224}else{P=c[b+36>>2]|0;O=c[b+32>>2]|0;do{if(O>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(O>>>0<11>>>0){a[E]=O<<1;aS=E+1|0}else{J=O+16&-16;L=(z=0,av(316,J|0)|0);if(z){z=0;break}c[E+8>>2]=L;c[E>>2]=J|1;c[E+4>>2]=O;aS=L}TF(aS|0,P|0,O)|0;a[aS+O|0]=0;ab=224;break L289}}while(0);O=b$(-1,-1)|0;aU=M;aV=O}}while(0);do{if((ab|0)==224){aB=F;c[aB>>2]=c[K>>2];c[aB+4>>2]=c[K+4>>2];c[aB+8>>2]=c[K+8>>2];O=o;L304:do{if((a[O]&1)==0){P=G;c[P>>2]=c[O>>2];c[P+4>>2]=c[O+4>>2];c[P+8>>2]=c[O+8>>2];ab=234}else{P=c[o+8>>2]|0;L=c[o+4>>2]|0;do{if(L>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(L>>>0<11>>>0){a[G]=L<<1;aW=G+1|0}else{J=L+16&-16;S=(z=0,av(316,J|0)|0);if(z){z=0;break}c[G+8>>2]=S;c[G>>2]=J|1;c[G+4>>2]=L;aW=S}TF(aW|0,P|0,L)|0;a[aW+L|0]=0;ab=234;break L304}}while(0);L=b$(-1,-1)|0;aX=M;aY=L}}while(0);do{if((ab|0)==234){L319:do{if((ak&1)==0){O=v;L=H;c[L>>2]=c[O>>2];c[L+4>>2]=c[O+4>>2];c[L+8>>2]=c[O+8>>2];ab=244}else{O=c[v+8>>2]|0;L=c[v+4>>2]|0;do{if(L>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(L>>>0<11>>>0){a[H]=L<<1;aZ=H+1|0}else{P=L+16&-16;S=(z=0,av(316,P|0)|0);if(z){z=0;break}c[H+8>>2]=S;c[H>>2]=P|1;c[H+4>>2]=L;aZ=S}TF(aZ|0,O|0,L)|0;a[aZ+L|0]=0;ab=244;break L319}}while(0);L=b$(-1,-1)|0;a_=M;a$=L}}while(0);do{if((ab|0)==244){L=e;c[L>>2]=c[aB>>2];c[L+4>>2]=c[aB+4>>2];c[L+8>>2]=c[aB+8>>2];z=0;aE(28,R|0,E|0,e|0,G|0,H|0,al|0);if(z){z=0;L=b$(-1,-1)|0;O=L;L=M;if((a[H]&1)==0){a_=L;a$=O;break}Tw(c[H+8>>2]|0);a_=L;a$=O;break}if((a[H]&1)!=0){Tw(c[H+8>>2]|0)}if((a[G]&1)!=0){Tw(c[G+8>>2]|0)}if((a[E]&1)!=0){Tw(c[E+8>>2]|0)}if((ak&1)==0){a0=R;break L40}Tw(c[v+8>>2]|0);a0=R;break L40}}while(0);if((a[G]&1)==0){aX=a_;aY=a$;break}Tw(c[G+8>>2]|0);aX=a_;aY=a$}}while(0);if((a[E]&1)==0){aU=aX;aV=aY;break}Tw(c[E+8>>2]|0);aU=aX;aV=aY}}while(0);R=c[Q>>2]|0;aB=c[U>>2]|0;L353:do{if((R|0)==(aB|0)){a1=R}else{O=R;while(1){L=O+4|0;if((c[O>>2]|0)==(aQ|0)){a1=O;break L353}if((L|0)==(aB|0)){a1=aB;break}else{O=L}}}}while(0);Q=a1-R>>2;O=R+(Q+1<<2)|0;L=aB-O|0;TG(R+(Q<<2)|0,O|0,L|0)|0;O=R+((L>>2)+Q<<2)|0;Q=c[U>>2]|0;if((O|0)!=(Q|0)){c[U>>2]=Q+(~((Q-4+(-O|0)|0)>>>2)<<2)}Tw(V);ap=aU;as=aV}else{z=0;ab=138}}while(0);if((ab|0)==138){N=b$(-1,-1)|0;au=M;aw=N;ab=139}if((ab|0)==139){ap=au;as=aw}if((ak&1)==0){af=ap;ag=as;break L38}Tw(c[v+8>>2]|0);af=ap;ag=as;break L38}else{N=b+48|0;O=c[N>>2]|0;Q=c[I>>2]|0;L42:do{if(Q>>>0<aa>>>0){L=Q;S=0;while(1){P=a[L]|0;if((P<<24>>24|0)==0){a2=S;break L42}else if((P<<24>>24|0)==10){a3=S+1|0}else{a3=S}P=L+1|0;if(P>>>0<aa>>>0){L=P;S=a3}else{a2=a3;break}}}else{a2=0}}while(0);c[N>>2]=a2+O;S=T-1|0;L49:do{if(S>>>0<Q>>>0){a4=0}else{L=0;V=S;while(1){U=L+1|0;if((a[V]|0)==10){a4=L;break L49}R=V-1|0;if(R>>>0<Q>>>0){a4=U;break}else{L=U;V=R}}}}while(0);Q=b+40|0;if((a2|0)==0){a5=c[Q>>2]|0}else{c[Q>>2]=1;a5=1}c[b+52>>2]=a5+a4;S=aa;O=T;c[Q>>2]=S-O+a4+a5;Q=m;c[Q>>2]=O;c[Q+4>>2]=S;c[I>>2]=aa;S=c[b>>2]|0;Q=(z=0,av(316,60)|0);if(z){z=0;ab=70;break L38}O=Q;c[k>>2]=O;Q=S+4|0;N=c[Q>>2]|0;if((N|0)==(c[S+8>>2]|0)){z=0;at(498,S|0,k|0);if(z){z=0;ab=70;break L38}a6=c[k>>2]|0}else{if((N|0)==0){a7=0}else{c[N>>2]=O;a7=c[Q>>2]|0}c[Q>>2]=a7+4;a6=O}O=a6;N=a6;V=b+28|0;L67:do{if((a[V]&1)==0){L=p;c[L>>2]=c[V>>2];c[L+4>>2]=c[V+4>>2];c[L+8>>2]=c[V+8>>2];ab=53}else{L=c[b+36>>2]|0;R=c[b+32>>2]|0;do{if(R>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(R>>>0<11>>>0){a[p]=R<<1;a8=p+1|0}else{U=R+16&-16;aB=(z=0,av(316,U|0)|0);if(z){z=0;break}c[p+8>>2]=aB;c[p>>2]=U|1;c[p+4>>2]=R;a8=aB}TF(a8|0,L|0,R)|0;a[a8+R|0]=0;ab=53;break L67}}while(0);R=b$(-1,-1)|0;a9=M;ba=R}}while(0);do{if((ab|0)==53){V=q;c[V>>2]=c[K>>2];c[V+4>>2]=c[K+4>>2];c[V+8>>2]=c[K+8>>2];R=o;L82:do{if((a[R]&1)==0){L=r;c[L>>2]=c[R>>2];c[L+4>>2]=c[R+4>>2];c[L+8>>2]=c[R+8>>2];ab=63}else{L=c[o+8>>2]|0;aB=c[o+4>>2]|0;do{if(aB>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(aB>>>0<11>>>0){a[r]=aB<<1;bb=r+1|0}else{U=aB+16&-16;P=(z=0,av(316,U|0)|0);if(z){z=0;break}c[r+8>>2]=P;c[r>>2]=U|1;c[r+4>>2]=aB;bb=P}TF(bb|0,L|0,aB)|0;a[bb+aB|0]=0;ab=63;break L82}}while(0);aB=b$(-1,-1)|0;bc=M;bd=aB}}while(0);do{if((ab|0)==63){R=s;a[R]=0;a[s+1|0]=0;aB=j;c[aB>>2]=c[V>>2];c[aB+4>>2]=c[V+4>>2];c[aB+8>>2]=c[V+8>>2];z=0;aE(28,N|0,p|0,j|0,r|0,s|0,0);if(z){z=0;aB=b$(-1,-1)|0;L=aB;aB=M;if((a[R]&1)!=0){Tw(c[s+8>>2]|0)}if((a[r]&1)==0){bc=aB;bd=L;break}Tw(c[r+8>>2]|0);bc=aB;bd=L;break}if((a[R]&1)!=0){Tw(c[s+8>>2]|0)}if((a[r]&1)!=0){Tw(c[r+8>>2]|0)}if((a[p]&1)==0){a0=N;break L40}Tw(c[p+8>>2]|0);a0=N;break L40}}while(0);if((a[p]&1)==0){a9=bc;ba=bd;break}Tw(c[p+8>>2]|0);a9=bc;ba=bd}}while(0);N=c[S>>2]|0;V=c[Q>>2]|0;L114:do{if((N|0)==(V|0)){be=N}else{R=N;while(1){L=R+4|0;if((c[R>>2]|0)==(a6|0)){be=R;break L114}if((L|0)==(V|0)){be=V;break}else{R=L}}}}while(0);S=be-N>>2;R=N+(S+1<<2)|0;L=V-R|0;TG(N+(S<<2)|0,R|0,L|0)|0;R=N+((L>>2)+S<<2)|0;S=c[Q>>2]|0;if((R|0)!=(S|0)){c[Q>>2]=S+(~((S-4+(-R|0)|0)>>>2)<<2)}Tw(O);af=a9;ag=ba;break L38}}while(0);if((a[o]&1)==0){i=d;return a0|0}Tw(c[o+8>>2]|0);i=d;return a0|0}else{z=0;ab=70}}while(0);if((ab|0)==70){a0=b$(-1,-1)|0;ah=M;ai=a0;ab=71}if((ab|0)==71){af=ah;ag=ai}if((a[o]&1)==0){W=af;X=ag;Y=X;Z=0;_=Y;$=W;bj(_|0)}Tw(c[o+8>>2]|0);W=af;X=ag;Y=X;Z=0;_=Y;$=W;bj(_|0);return 0}function zC(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=EV(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L4}else{n=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[h>>2]=i+o;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;n=i;while(1){l=h+1|0;if((a[n]|0)==10){p=h;break L11}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function zD(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=Fa(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L4}else{n=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[h>>2]=i+o;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;n=i;while(1){l=h+1|0;if((a[n]|0)==10){p=h;break L11}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function zE(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=E7(e)|0;if((f|0)==0){g=0;return g|0}h=E9(f)|0;if((h|0)==0){g=0;return g|0}f=b+48|0;i=c[f>>2]|0;j=c[d>>2]|0;L7:do{if(j>>>0<h>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L7}else{n=l}m=k+1|0;if(m>>>0<h>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[f>>2]=i+o;i=e-1|0;L14:do{if(i>>>0<j>>>0){p=0}else{f=0;n=i;while(1){l=f+1|0;if((a[n]|0)==10){p=f;break L14}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{f=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=h;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=h;g=h;return g|0}function zF(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=E9(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==0){n=l;break L4}else if((m<<24>>24|0)==10){o=l+1|0}else{o=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=o}else{n=o;break}}}else{n=0}}while(0);c[h>>2]=i+n;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;o=i;while(1){l=h+1|0;if((a[o]|0)==10){p=h;break L11}k=o-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;o=k}}}}while(0);j=b+40|0;if((n|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;n=e;c[b+40>>2]=j-n+p+q;q=b+56|0;c[q>>2]=n;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function zG(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=Fb(e)|0;do{if((f|0)==0){g=Fc(e)|0;if((g|0)==0){h=0}else{i=g;break}return h|0}else{i=f}}while(0);f=b+48|0;g=c[f>>2]|0;j=c[d>>2]|0;L5:do{if(j>>>0<i>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==0){n=l;break L5}else if((m<<24>>24|0)==10){o=l+1|0}else{o=l}m=k+1|0;if(m>>>0<i>>>0){k=m;l=o}else{n=o;break}}}else{n=0}}while(0);c[f>>2]=g+n;g=e-1|0;L12:do{if(g>>>0<j>>>0){p=0}else{f=0;o=g;while(1){l=f+1|0;if((a[o]|0)==10){p=f;break L12}k=o-1|0;if(k>>>0<j>>>0){p=l;break}else{f=l;o=k}}}}while(0);j=b+40|0;if((n|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=i;n=e;c[b+40>>2]=j-n+p+q;q=b+56|0;c[q>>2]=n;c[q+4>>2]=j;c[d>>2]=i;h=i;return h|0}function zH(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=EY(e)|0;g=(f|0)!=0?f:e;if((g|0)==0){h=0;return h|0}f=(a[g]|0)==110?g+1|0:0;if((f|0)==0){h=0;return h|0}g=b+48|0;i=c[g>>2]|0;j=c[d>>2]|0;L7:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==0){n=l;break L7}else if((m<<24>>24|0)==10){o=l+1|0}else{o=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=o}else{n=o;break}}}else{n=0}}while(0);c[g>>2]=i+n;i=e-1|0;L14:do{if(i>>>0<j>>>0){p=0}else{g=0;o=i;while(1){l=g+1|0;if((a[o]|0)==10){p=g;break L14}k=o-1|0;if(k>>>0<j>>>0){p=l;break}else{g=l;o=k}}}}while(0);j=b+40|0;if((n|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;n=e;c[b+40>>2]=j-n+p+q;q=b+56|0;c[q>>2]=n;c[q+4>>2]=j;c[d>>2]=f;h=f;return h|0}function zI(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=EW(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L4}else{n=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[h>>2]=i+o;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;n=i;while(1){l=h+1|0;if((a[n]|0)==10){p=h;break L11}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function zJ(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=Eb(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==0){n=l;break L4}else if((m<<24>>24|0)==10){o=l+1|0}else{o=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=o}else{n=o;break}}}else{n=0}}while(0);c[h>>2]=i+n;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;o=i;while(1){l=h+1|0;if((a[o]|0)==10){p=h;break L11}k=o-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;o=k}}}}while(0);j=b+40|0;if((n|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;n=e;c[b+40>>2]=j-n+p+q;q=b+56|0;c[q>>2]=n;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function zK(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=EW(e)|0;g=(f|0)!=0?f:e;if((g|0)==0){h=0;return h|0}f=Eb(g)|0;i=(f|0)!=0?f:g;if((i|0)==0){h=0;return h|0}g=(a[i]|0)==110?i+1|0:0;if((g|0)==0){h=0;return h|0}i=b+48|0;f=c[i>>2]|0;j=c[d>>2]|0;L10:do{if(j>>>0<g>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==0){n=l;break L10}else if((m<<24>>24|0)==10){o=l+1|0}else{o=l}m=k+1|0;if(m>>>0<g>>>0){k=m;l=o}else{n=o;break}}}else{n=0}}while(0);c[i>>2]=f+n;f=e-1|0;L17:do{if(f>>>0<j>>>0){p=0}else{i=0;o=f;while(1){l=i+1|0;if((a[o]|0)==10){p=i;break L17}k=o-1|0;if(k>>>0<j>>>0){p=l;break}else{i=l;o=k}}}}while(0);j=b+40|0;if((n|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=g;n=e;c[b+40>>2]=j-n+p+q;q=b+56|0;c[q>>2]=n;c[q+4>>2]=j;c[d>>2]=g;h=g;return h|0}function zL(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=EW(e)|0;g=(f|0)!=0?f:e;if((g|0)==0){h=0;return h|0}f=Eb(g)|0;if((f|0)==0){h=0;return h|0}g=b+48|0;i=c[g>>2]|0;j=c[d>>2]|0;L7:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==0){n=l;break L7}else if((m<<24>>24|0)==10){o=l+1|0}else{o=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=o}else{n=o;break}}}else{n=0}}while(0);c[g>>2]=i+n;i=e-1|0;L14:do{if(i>>>0<j>>>0){p=0}else{g=0;o=i;while(1){l=g+1|0;if((a[o]|0)==10){p=g;break L14}k=o-1|0;if(k>>>0<j>>>0){p=l;break}else{g=l;o=k}}}}while(0);j=b+40|0;if((n|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;n=e;c[b+40>>2]=j-n+p+q;q=b+56|0;c[q>>2]=n;c[q+4>>2]=j;c[d>>2]=f;h=f;return h|0}function zM(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=E7(e)|0;if((f|0)==0){g=0;return g|0}h=Ek(f)|0;if((h|0)==0){g=0;return g|0}f=b+48|0;i=c[f>>2]|0;j=c[d>>2]|0;L7:do{if(j>>>0<h>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L7}else{n=l}m=k+1|0;if(m>>>0<h>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[f>>2]=i+o;i=e-1|0;L14:do{if(i>>>0<j>>>0){p=0}else{f=0;n=i;while(1){l=f+1|0;if((a[n]|0)==10){p=f;break L14}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{f=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=h;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=h;g=h;return g|0}function zN(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=EU(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==0){n=l;break L4}else if((m<<24>>24|0)==10){o=l+1|0}else{o=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=o}else{n=o;break}}}else{n=0}}while(0);c[h>>2]=i+n;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;o=i;while(1){l=h+1|0;if((a[o]|0)==10){p=h;break L11}k=o-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;o=k}}}}while(0);j=b+40|0;if((n|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;n=e;c[b+40>>2]=j-n+p+q;q=b+56|0;c[q>>2]=n;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function zO(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=Fd(e)|0;do{if((f|0)==0){g=Fe(e)|0;if((g|0)!=0){h=g;break}g=Ff(e)|0;if((g|0)!=0){h=g;break}g=Fg(e)|0;if((g|0)!=0){h=g;break}g=Fh(e)|0;if((g|0)!=0){h=g;break}g=Fi(e)|0;if((g|0)==0){i=0}else{h=g;break}return i|0}else{h=f}}while(0);f=b+48|0;g=c[f>>2]|0;j=c[d>>2]|0;L9:do{if(j>>>0<h>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L9}else{n=l}m=k+1|0;if(m>>>0<h>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[f>>2]=g+o;g=e-1|0;L16:do{if(g>>>0<j>>>0){p=0}else{f=0;n=g;while(1){l=f+1|0;if((a[n]|0)==10){p=f;break L16}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{f=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=h;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=h;i=h;return i|0}function zP(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=e+1|0;g=(a[e]|0)==125?f:0;if((g|0)==0){h=0;return h|0}if((a[g]|0)==59){g=f;while(1){i=g+1|0;if((a[i]|0)==59){g=i}else{j=i;break}}}else{j=f}f=b+48|0;g=c[f>>2]|0;i=c[d>>2]|0;L8:do{if(i>>>0<j>>>0){k=i;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==0){n=l;break L8}else if((m<<24>>24|0)==10){o=l+1|0}else{o=l}m=k+1|0;if(m>>>0<j>>>0){k=m;l=o}else{n=o;break}}}else{n=0}}while(0);c[f>>2]=g+n;g=e-1|0;L15:do{if(g>>>0<i>>>0){p=0}else{f=0;o=g;while(1){l=f+1|0;if((a[o]|0)==10){p=f;break L15}k=o-1|0;if(k>>>0<i>>>0){p=l;break}else{f=l;o=k}}}}while(0);i=b+40|0;if((n|0)==0){q=c[i>>2]|0}else{c[i>>2]=1;q=1}c[b+52>>2]=q+p;i=j;n=e;c[b+40>>2]=i-n+p+q;q=b+56|0;c[q>>2]=n;c[q+4>>2]=i;c[d>>2]=j;h=j;return h|0}function zQ(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=Ew(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==0){n=l;break L4}else if((m<<24>>24|0)==10){o=l+1|0}else{o=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=o}else{n=o;break}}}else{n=0}}while(0);c[h>>2]=i+n;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;o=i;while(1){l=h+1|0;if((a[o]|0)==10){p=h;break L11}k=o-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;o=k}}}}while(0);j=b+40|0;if((n|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;n=e;c[b+40>>2]=j-n+p+q;q=b+56|0;c[q>>2]=n;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function zR(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=Ey(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L4}else{n=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[h>>2]=i+o;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;n=i;while(1){l=h+1|0;if((a[n]|0)==10){p=h;break L11}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function zS(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=Ez(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L4}else{n=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[h>>2]=i+o;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;n=i;while(1){l=h+1|0;if((a[n]|0)==10){p=h;break L11}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function zT(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0;f=d+20|0;if((e|0)==0){g=0;h=0;i=c[f>>2]|0}else{g=0;h=0;i=e}L3:while(1){j=(i|0)==0;if(j){k=c[f>>2]|0}else{k=i}e=Ek(Ej(k)|0)|0;L8:do{if((e|0)==0){if(j){l=c[f>>2]|0}else{l=i}d=EO(Ej(l)|0)|0;if((d|0)!=0){m=d;break}if(j){n=c[f>>2]|0}else{n=i}d=ES(Ej(n)|0)|0;if((d|0)!=0){m=d;break}if(j){o=c[f>>2]|0}else{o=i}d=ET(Ej(o)|0)|0;if((d|0)!=0){m=d;break}if(j){p=c[f>>2]|0}else{p=i}d=E7(Ej(p)|0)|0;if((d|0)!=0){q=Ek(d)|0;if((q|0)!=0){m=q;break}}if(j){r=c[f>>2]|0}else{r=i}q=E$(Ej(r)|0)|0;if((q|0)!=0){m=q;break}if(j){s=c[f>>2]|0}else{s=i}q=E0(Ej(s)|0)|0;if((q|0)!=0){m=q;break}if(j){t=c[f>>2]|0}else{t=i}q=Eg(Ej(t)|0)|0;if((q|0)!=0){m=q;break}if(j){u=c[f>>2]|0}else{u=i}q=Ej(u)|0;if((a[q]|0)==42){m=q+1|0;break}if(j){v=c[f>>2]|0}else{v=i}q=Ej(v)|0;if((a[q]|0)==40){m=q+1|0;break}if(j){w=c[f>>2]|0}else{w=i}q=Ej(w)|0;if((a[q]|0)==41){m=q+1|0;break}if(j){x=c[f>>2]|0}else{x=i}q=Ej(x)|0;if((a[q]|0)==91){m=q+1|0;break}if(j){y=c[f>>2]|0}else{y=i}q=Ej(y)|0;if((a[q]|0)==93){m=q+1|0;break}if(j){z=c[f>>2]|0}else{z=i}q=Ej(z)|0;if((a[q]|0)==43){m=q+1|0;break}if(j){A=c[f>>2]|0}else{A=i}q=Ej(A)|0;if((a[q]|0)==126){m=q+1|0;break}if(j){B=c[f>>2]|0}else{B=i}q=Ej(B)|0;if((a[q]|0)==62){m=q+1|0;break}if(j){C=c[f>>2]|0}else{C=i}q=Ej(C)|0;if((a[q]|0)==44){m=q+1|0;break}if(j){D=c[f>>2]|0}else{D=i}q=EZ(Ej(D)|0)|0;if((q|0)!=0){m=q;break}if(j){E=c[f>>2]|0}else{E=i}q=Ej(E)|0;d=EW(q)|0;F=(d|0)!=0?d:q;do{if((F|0)!=0){q=Eb(F)|0;d=(q|0)!=0?q:F;if((d|0)==0){break}if((a[d]|0)==110){m=d+1|0;break L8}}}while(0);if(j){G=c[f>>2]|0}else{G=i}F=Ej(G)|0;d=EW(F)|0;q=(d|0)!=0?d:F;if((q|0)!=0){F=Eb(q)|0;if((F|0)!=0){m=F;break}}if(j){H=c[f>>2]|0}else{H=i}F=EX(Ej(H)|0)|0;if((F|0)!=0){m=F;break}if(j){I=c[f>>2]|0}else{I=i}F=Ej(I)|0;q=(a[F]|0)==38?F+1|0:0;if((q|0)!=0){F=El(q)|0;if((F|0)!=0){m=F;break}}if(j){J=c[f>>2]|0}else{J=i}F=Ej(J)|0;if((a[F]|0)==38){m=F+1|0;break}if(j){K=c[f>>2]|0}else{K=i}F=Ej(K)|0;if((a[F]|0)==37){m=F+1|0;break}if(j){L=c[f>>2]|0}else{L=i}F=Ej(L)|0;q=Fd(F)|0;if((q|0)!=0){m=q;break}q=Fe(F)|0;if((q|0)!=0){m=q;break}q=Ff(F)|0;if((q|0)!=0){m=q;break}q=Fg(F)|0;if((q|0)!=0){m=q;break}q=Fh(F)|0;if((q|0)!=0){m=q;break}q=Fi(F)|0;if((q|0)!=0){m=q;break}if(j){M=c[f>>2]|0}else{M=i}q=Ej(M)|0;F=(a[q]|0)==46?q+1|0:0;if((F|0)!=0){q=Eh(F)|0;if((q|0)!=0){m=q;break}}if(j){N=c[f>>2]|0}else{N=i}q=Ej(N)|0;F=(a[q]|0)==35?q+1|0:0;if((F|0)!=0){q=Eh(F)|0;if((q|0)!=0){m=q;break}}if(j){O=c[f>>2]|0}else{O=i}q=Ej(O)|0;if((a[q]|0)==45){F=q;do{F=F+1|0;}while((a[F]|0)==45);q=Eh(F)|0;if((q|0)!=0){m=q;break}}if(j){P=c[f>>2]|0}else{P=i}q=E7(Ej(P)|0)|0;if((q|0)!=0){d=Eh(q)|0;if((d|0)!=0){m=d;break}}if(j){Q=c[f>>2]|0}else{Q=i}d=Eh(Ej(Q)|0)|0;if((d|0)!=0){m=d;break}if(j){R=c[f>>2]|0}else{R=i}d=E4(Ej(R)|0)|0;if((d|0)==0){break L3}else{m=d}}else{m=e}}while(0);g=m;h=(a[m-1|0]|0)==125|h;i=m}if(j){S=c[f>>2]|0}else{S=i}i=Ej(S)|0;S=a[i]|0;f=i+1|0;if((S<<24>>24|0)==59|(S<<24>>24|0)==125){T=f;U=(T|0)==0;V=U?0:g;W=b|0;c[W>>2]=V;X=b+4|0;Y=h&1;a[X]=Y;return}T=S<<24>>24==123?f:0;U=(T|0)==0;V=U?0:g;W=b|0;c[W>>2]=V;X=b+4|0;Y=h&1;a[X]=Y;return}function zU(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,as=0,at=0,au=0,aw=0,ax=0,ay=0,az=0,aB=0,aC=0;d=i;i=i+280|0;e=d|0;f=d+8|0;g=d+24|0;h=d+32|0;j=d+48|0;k=d+56|0;l=d+72|0;m=d+88|0;n=d+104|0;o=d+120|0;p=d+136|0;q=d+152|0;r=d+168|0;s=d+184|0;t=d+200|0;u=d+216|0;v=d+232|0;w=d+248|0;x=d+264|0;y=b+20|0;A=Ej(c[y>>2]|0)|0;B=(a[A]|0)==42?A+1|0:A;do{if((B|0)==0){C=4}else{if((Eo(B)|0)==0){C=4;break}D=zk(b)|0}}while(0);L4:do{if((C|0)==4){if((zl(b)|0)!=0){B=c[b>>2]|0;A=Tu(68)|0;c[j>>2]=A;E=B+4|0;F=c[E>>2]|0;if((F|0)==(c[B+8>>2]|0)){fr(B|0,j);G=c[j>>2]|0}else{if((F|0)==0){H=0}else{c[F>>2]=A;H=c[E>>2]|0}c[E>>2]=H+4;G=A}A=G;F=b+28|0;L15:do{if((a[F]&1)==0){I=k;c[I>>2]=c[F>>2];c[I+4>>2]=c[F+4>>2];c[I+8>>2]=c[F+8>>2];C=20}else{I=c[b+36>>2]|0;J=c[b+32>>2]|0;do{if(J>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(J>>>0<11>>>0){a[k]=J<<1;K=k+1|0}else{L=J+16&-16;N=(z=0,av(316,L|0)|0);if(z){z=0;break}c[k+8>>2]=N;c[k>>2]=L|1;c[k+4>>2]=J;K=N}TF(K|0,I|0,J)|0;a[K+J|0]=0;C=20;break L15}}while(0);J=b$(-1,-1)|0;O=M;P=J}}while(0);do{if((C|0)==20){F=b+44|0;J=h;c[J>>2]=c[F>>2];c[J+4>>2]=c[F+4>>2];c[J+8>>2]=c[F+8>>2];z=0;aq(14,G|0,k|0,h|0,b+56|0,0);if(!z){F=G;if((a[k]&1)==0){D=F;break L4}Tw(c[k+8>>2]|0);D=F;break L4}else{z=0;F=b$(-1,-1)|0;J=F;F=M;if((a[k]&1)==0){O=F;P=J;break}Tw(c[k+8>>2]|0);O=F;P=J;break}}}while(0);J=c[B>>2]|0;F=c[E>>2]|0;L36:do{if((J|0)==(F|0)){Q=J}else{I=J;while(1){N=I+4|0;if((c[I>>2]|0)==(G|0)){Q=I;break L36}if((N|0)==(F|0)){Q=F;break}else{I=N}}}}while(0);B=Q-J>>2;I=J+(B+1<<2)|0;N=F-I|0;TG(J+(B<<2)|0,I|0,N|0)|0;I=J+((N>>2)+B<<2)|0;B=c[E>>2]|0;if((I|0)!=(B|0)){c[E>>2]=B+(~((B-4+(-I|0)|0)>>>2)<<2)}Tw(A);R=O;S=P;T=S;U=0;V=T;W=R;bj(V|0)}if((zV(b)|0)==0){I=Tu(32)|0;B=m+8|0;c[B>>2]=I;c[m>>2]=33;c[m+4>>2]=21;TF(I|0,7432,21)|0;a[I+21|0]=0;c[n>>2]=0;c[n+4>>2]=0;c[n+8>>2]=0;z=0;aT(362,b|0,m|0,n|0);if(!z){if((a[m]&1)==0){D=0;break}Tw(c[B>>2]|0);D=0;break}else{z=0}I=b$(-1,-1)|0;N=I;I=M;if((a[m]&1)==0){R=I;S=N;T=S;U=0;V=T;W=R;bj(V|0)}Tw(c[B>>2]|0);R=I;S=N;T=S;U=0;V=T;W=R;bj(V|0)}N=c[b>>2]|0;I=Tu(68)|0;c[g>>2]=I;B=N+4|0;L=c[B>>2]|0;if((L|0)==(c[N+8>>2]|0)){fr(N|0,g);X=c[g>>2]|0}else{if((L|0)==0){Y=0}else{c[L>>2]=I;Y=c[B>>2]|0}c[B>>2]=Y+4;X=I}I=X;L=b+28|0;L64:do{if((a[L]&1)==0){Z=l;c[Z>>2]=c[L>>2];c[Z+4>>2]=c[L+4>>2];c[Z+8>>2]=c[L+8>>2];C=48}else{Z=c[b+36>>2]|0;_=c[b+32>>2]|0;do{if(_>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(_>>>0<11>>>0){a[l]=_<<1;$=l+1|0}else{aa=_+16&-16;ab=(z=0,av(316,aa|0)|0);if(z){z=0;break}c[l+8>>2]=ab;c[l>>2]=aa|1;c[l+4>>2]=_;$=ab}TF($|0,Z|0,_)|0;a[$+_|0]=0;C=48;break L64}}while(0);_=b$(-1,-1)|0;ac=M;ad=_}}while(0);do{if((C|0)==48){L=b+44|0;A=f;c[A>>2]=c[L>>2];c[A+4>>2]=c[L+4>>2];c[A+8>>2]=c[L+8>>2];z=0;aq(14,X|0,l|0,f|0,b+56|0,0);if(!z){L=X;if((a[l]&1)==0){D=L;break L4}Tw(c[l+8>>2]|0);D=L;break L4}else{z=0;L=b$(-1,-1)|0;A=L;L=M;if((a[l]&1)==0){ac=L;ad=A;break}Tw(c[l+8>>2]|0);ac=L;ad=A;break}}}while(0);A=c[N>>2]|0;L=c[B>>2]|0;L85:do{if((A|0)==(L|0)){ae=A}else{E=A;while(1){J=E+4|0;if((c[E>>2]|0)==(X|0)){ae=E;break L85}if((J|0)==(L|0)){ae=L;break}else{E=J}}}}while(0);N=ae-A>>2;E=A+(N+1<<2)|0;J=L-E|0;TG(A+(N<<2)|0,E|0,J|0)|0;E=A+((J>>2)+N<<2)|0;N=c[B>>2]|0;if((E|0)!=(N|0)){c[B>>2]=N+(~((N-4+(-E|0)|0)>>>2)<<2)}Tw(I);R=ac;S=ad;T=S;U=0;V=T;W=R;bj(V|0)}}while(0);ad=Ej(c[y>>2]|0)|0;L95:do{if((a[ad]|0)==58){ac=ad;while(1){af=ac+1|0;if((a[af]|0)==58){ac=af}else{break}}I=b+48|0;B=c[I>>2]|0;A=c[y>>2]|0;L99:do{if(A>>>0<af>>>0){L=A;ae=0;while(1){X=a[L]|0;if((X<<24>>24|0)==10){ag=ae+1|0}else if((X<<24>>24|0)==0){ah=ae;break L99}else{ag=ae}if((L|0)<(ac|0)){L=L+1|0;ae=ag}else{ah=ag;break}}}else{ah=0}}while(0);c[I>>2]=ah+B;ac=ad-1|0;L106:do{if(ac>>>0<A>>>0){ai=0}else{ae=0;L=ac;while(1){X=ae+1|0;if((a[L]|0)==10){ai=ae;break L106}l=L-1|0;if(l>>>0<A>>>0){ai=X;break}else{ae=X;L=l}}}}while(0);A=b+40|0;if((ah|0)==0){aj=c[A>>2]|0}else{c[A>>2]=1;aj=1}c[b+52>>2]=aj+ai;ac=af;B=ad;c[A>>2]=ac-B+ai+aj;A=b+56|0;c[A>>2]=B;c[A+4>>2]=ac;c[y>>2]=af}else{ac=c[b+56>>2]|0;A=(c[b+60>>2]|0)-ac|0;if(A>>>0>4294967279>>>0){L4(0);return 0}if(A>>>0<11>>>0){a[q]=A<<1;ak=q+1|0}else{B=A+16&-16;I=Tu(B)|0;c[q+8>>2]=I;c[q>>2]=B|1;c[q+4>>2]=A;ak=I}TF(ak|0,ac|0,A)|0;a[ak+A|0]=0;A=(z=0,aW(2,q|0,0,7352,10)|0);do{if(!z){ac=A;I=p;c[I>>2]=c[ac>>2];c[I+4>>2]=c[ac+4>>2];c[I+8>>2]=c[ac+8>>2];TI(ac|0,0,12)|0;ac=(z=0,aA(80,p|0,7248,27)|0);do{if(!z){B=ac;L=o;c[L>>2]=c[B>>2];c[L+4>>2]=c[B+4>>2];c[L+8>>2]=c[B+8>>2];TI(B|0,0,12)|0;c[r>>2]=0;c[r+4>>2]=0;c[r+8>>2]=0;z=0;aT(362,b|0,o|0,r|0);if(z){z=0;B=b$(-1,-1)|0;ae=B;B=M;if((a[L]&1)==0){al=B;am=ae;break}Tw(c[o+8>>2]|0);al=B;am=ae;break}if((a[L]&1)!=0){Tw(c[o+8>>2]|0)}if((a[I]&1)!=0){Tw(c[p+8>>2]|0)}if((a[q]&1)==0){break L95}Tw(c[q+8>>2]|0);break L95}else{z=0;L=b$(-1,-1)|0;al=M;am=L}}while(0);if((a[I]&1)==0){an=al;ao=am;break}Tw(c[p+8>>2]|0);an=al;ao=am}else{z=0;ac=b$(-1,-1)|0;an=M;ao=ac}}while(0);if((a[q]&1)==0){R=an;S=ao;T=S;U=0;V=T;W=R;bj(V|0)}Tw(c[q+8>>2]|0);R=an;S=ao;T=S;U=0;V=T;W=R;bj(V|0)}}while(0);do{if((a[Ej(c[y>>2]|0)|0]|0)==59){ao=Tu(48)|0;an=s+8|0;c[an>>2]=ao;c[s>>2]=49;c[s+4>>2]=38;TF(ao|0,7112,38)|0;a[ao+38|0]=0;c[t>>2]=0;c[t+4>>2]=0;c[t+8>>2]=0;z=0;aT(362,b|0,s|0,t|0);if(!z){if((a[s]&1)==0){break}Tw(c[an>>2]|0);break}else{z=0}ao=b$(-1,-1)|0;q=ao;ao=M;if((a[s]&1)==0){R=ao;S=q;T=S;U=0;V=T;W=R;bj(V|0)}Tw(c[an>>2]|0);R=ao;S=q;T=S;U=0;V=T;W=R;bj(V|0)}}while(0);s=(FB(Ej(c[y>>2]|0)|0)|0)==0;y=c[b>>2]|0;t=Tu(40)|0;c[e>>2]=t;q=y+4|0;ao=c[q>>2]|0;if((ao|0)==(c[y+8>>2]|0)){fr(y|0,e);ap=c[e>>2]|0}else{if((ao|0)==0){as=0}else{c[ao>>2]=t;as=c[q>>2]|0}c[q>>2]=as+4;ap=t}t=ap;as=ap;ao=b+28|0;e=(a[ao]&1)==0;if(s){L203:do{if(e){s=w;c[s>>2]=c[ao>>2];c[s+4>>2]=c[ao+4>>2];c[s+8>>2]=c[ao+8>>2];C=145}else{s=c[b+36>>2]|0;an=c[b+32>>2]|0;do{if(an>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(an>>>0<11>>>0){a[w]=an<<1;at=w+1|0}else{am=an+16&-16;al=(z=0,av(316,am|0)|0);if(z){z=0;break}c[w+8>>2]=al;c[w>>2]=am|1;c[w+4>>2]=an;at=al}TF(at|0,s|0,an)|0;a[at+an|0]=0;C=145;break L203}}while(0);an=b$(-1,-1)|0;au=M;aw=an}}while(0);do{if((C|0)==145){at=x;an=D+16|0;c[at>>2]=c[an>>2];c[at+4>>2]=c[an+4>>2];c[at+8>>2]=c[an+8>>2];an=(z=0,av(226,b|0)|0);do{if(!z){z=0;aE(2,as|0,w|0,x|0,D|0,an|0,0);if(z){z=0;break}if((a[w]&1)==0){i=d;return as|0}Tw(c[w+8>>2]|0);i=d;return as|0}else{z=0}}while(0);an=b$(-1,-1)|0;at=an;an=M;if((a[w]&1)==0){au=an;aw=at;break}Tw(c[w+8>>2]|0);au=an;aw=at}}while(0);w=c[y>>2]|0;x=c[q>>2]|0;L228:do{if((w|0)==(x|0)){ax=w}else{at=w;while(1){an=at+4|0;if((c[at>>2]|0)==(ap|0)){ax=at;break L228}if((an|0)==(x|0)){ax=x;break}else{at=an}}}}while(0);at=ax-w>>2;ax=w+(at+1<<2)|0;an=x-ax|0;TG(w+(at<<2)|0,ax|0,an|0)|0;ax=w+((an>>2)+at<<2)|0;at=c[q>>2]|0;if((ax|0)!=(at|0)){c[q>>2]=at+(~((at-4+(-ax|0)|0)>>>2)<<2)}Tw(t);R=au;S=aw;T=S;U=0;V=T;W=R;bj(V|0)}else{L168:do{if(e){aw=u;c[aw>>2]=c[ao>>2];c[aw+4>>2]=c[ao+4>>2];c[aw+8>>2]=c[ao+8>>2];C=122}else{aw=c[b+36>>2]|0;au=c[b+32>>2]|0;do{if(au>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(au>>>0<11>>>0){a[u]=au<<1;ay=u+1|0}else{ax=au+16&-16;at=(z=0,av(316,ax|0)|0);if(z){z=0;break}c[u+8>>2]=at;c[u>>2]=ax|1;c[u+4>>2]=au;ay=at}TF(ay|0,aw|0,au)|0;a[ay+au|0]=0;C=122;break L168}}while(0);au=b$(-1,-1)|0;az=M;aB=au}}while(0);do{if((C|0)==122){ay=v;ao=D+16|0;c[ay>>2]=c[ao>>2];c[ay+4>>2]=c[ao+4>>2];c[ay+8>>2]=c[ao+8>>2];ao=(z=0,av(238,b|0)|0);do{if(!z){z=0;aE(2,as|0,u|0,v|0,D|0,ao|0,0);if(z){z=0;break}if((a[u]&1)==0){i=d;return as|0}Tw(c[u+8>>2]|0);i=d;return as|0}else{z=0}}while(0);ao=b$(-1,-1)|0;ay=ao;ao=M;if((a[u]&1)==0){az=ao;aB=ay;break}Tw(c[u+8>>2]|0);az=ao;aB=ay}}while(0);u=c[y>>2]|0;y=c[q>>2]|0;L193:do{if((u|0)==(y|0)){aC=u}else{as=u;while(1){d=as+4|0;if((c[as>>2]|0)==(ap|0)){aC=as;break L193}if((d|0)==(y|0)){aC=y;break}else{as=d}}}}while(0);ap=aC-u>>2;aC=u+(ap+1<<2)|0;as=y-aC|0;TG(u+(ap<<2)|0,aC|0,as|0)|0;aC=u+((as>>2)+ap<<2)|0;ap=c[q>>2]|0;if((aC|0)!=(ap|0)){c[q>>2]=ap+(~((ap-4+(-aC|0)|0)>>>2)<<2)}Tw(t);R=az;S=aB;T=S;U=0;V=T;W=R;bj(V|0)}return 0}function zV(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=En(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L4}else{n=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[h>>2]=i+o;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;n=i;while(1){l=h+1|0;if((a[n]|0)==10){p=h;break L11}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function zW(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0;j=i;i=i+48|0;k=e;e=i;i=i+12|0;i=i+7&-8;c[e>>2]=c[k>>2];c[e+4>>2]=c[k+4>>2];c[e+8>>2]=c[k+8>>2];k=j|0;l=j+16|0;m=j+32|0;TF(m|0,e|0,12)|0;e=k;n=l;o=b|0;p=d;if((a[p]&1)==0){c[e>>2]=c[p>>2];c[e+4>>2]=c[p+4>>2];c[e+8>>2]=c[p+8>>2]}else{p=c[d+8>>2]|0;q=c[d+4>>2]|0;if(q>>>0>4294967279>>>0){L4(0)}if(q>>>0<11>>>0){a[e]=q<<1;r=k+1|0}else{d=q+16&-16;s=Tu(d)|0;c[k+8>>2]=s;c[k>>2]=d|1;c[k+4>>2]=q;r=s}TF(r|0,p|0,q)|0;a[r+q|0]=0}c[n>>2]=c[m>>2];c[n+4>>2]=c[m+4>>2];c[n+8>>2]=c[m+8>>2];z=0;aT(306,o|0,k|0,l|0);if(!z){if((a[e]&1)==0){t=b|0;c[t>>2]=27728;u=b+28|0;c[u>>2]=f;v=b+32|0;c[v>>2]=g;w=b+36|0;x=h&1;a[w]=x;y=12;A=0;B=12;C=0;i=j;return}Tw(c[k+8>>2]|0);t=b|0;c[t>>2]=27728;u=b+28|0;c[u>>2]=f;v=b+32|0;c[v>>2]=g;w=b+36|0;x=h&1;a[w]=x;y=12;A=0;B=12;C=0;i=j;return}else{z=0;j=b$(-1,-1)|0;if((a[e]&1)==0){bj(j|0)}Tw(c[k+8>>2]|0);bj(j|0)}}function zX(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0;d=i;i=i+32|0;e=d|0;f=d+16|0;g=d+24|0;h=g;j=i;i=i+12|0;i=i+7&-8;AB(b)|0;k=b+56|0;l=c[k+4>>2]|0;c[g>>2]=c[k>>2];c[g+4>>2]=l;c[h+4>>2]=l-1;l=b+20|0;c[l>>2]=(c[l>>2]|0)-1;l=c[b>>2]|0;g=Tu(68)|0;c[f>>2]=g;k=l+4|0;m=c[k>>2]|0;if((m|0)==(c[l+8>>2]|0)){fr(l|0,f);n=c[f>>2]|0}else{if((m|0)==0){o=0}else{c[m>>2]=g;o=c[k>>2]|0}c[k>>2]=o+4;n=g}g=n;o=n;m=b+28|0;L8:do{if((a[m]&1)==0){f=j;c[f>>2]=c[m>>2];c[f+4>>2]=c[m+4>>2];c[f+8>>2]=c[m+8>>2];p=16}else{f=c[b+36>>2]|0;q=c[b+32>>2]|0;do{if(q>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(q>>>0<11>>>0){a[j]=q<<1;r=j+1|0}else{s=q+16&-16;t=(z=0,av(316,s|0)|0);if(z){z=0;break}c[j+8>>2]=t;c[j>>2]=s|1;c[j+4>>2]=q;r=t}TF(r|0,f|0,q)|0;a[r+q|0]=0;p=16;break L8}}while(0);q=b$(-1,-1)|0;u=M;v=q}}while(0);do{if((p|0)==16){r=b+44|0;m=e;c[m>>2]=c[r>>2];c[m+4>>2]=c[r+4>>2];c[m+8>>2]=c[r+8>>2];z=0;aq(14,o|0,j|0,e|0,h|0,0);if(z){z=0;r=b$(-1,-1)|0;m=r;r=M;if((a[j]&1)==0){u=r;v=m;break}Tw(c[j+8>>2]|0);u=r;v=m;break}if((a[j]&1)==0){w=n+28|0;x=w;a[x]=1;i=d;return o|0}Tw(c[j+8>>2]|0);w=n+28|0;x=w;a[x]=1;i=d;return o|0}}while(0);o=c[l>>2]|0;l=c[k>>2]|0;L32:do{if((o|0)==(l|0)){y=o}else{d=o;while(1){x=d+4|0;if((c[d>>2]|0)==(n|0)){y=d;break L32}if((x|0)==(l|0)){y=l;break}else{d=x}}}}while(0);n=y-o>>2;y=o+(n+1<<2)|0;d=l-y|0;TG(o+(n<<2)|0,y|0,d|0)|0;y=o+((d>>2)+n<<2)|0;n=c[k>>2]|0;if((y|0)==(n|0)){Tw(g);A=v;B=0;C=A;D=u;bj(C|0)}c[k>>2]=n+(~((n-4+(-y|0)|0)>>>2)<<2);Tw(g);A=v;B=0;C=A;D=u;bj(C|0);return 0}function zY(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,aq=0,as=0,au=0,aw=0,ax=0,ay=0,az=0,aB=0,aC=0,aD=0,aE=0,aF=0,aG=0,aH=0,aI=0,aJ=0,aK=0,aL=0,aM=0,aN=0,aP=0,aQ=0,aR=0,aS=0,aU=0,aV=0;d=i;i=i+208|0;e=d|0;f=d+16|0;g=d+24|0;h=d+32|0;j=d+48|0;k=d+56|0;l=d+72|0;m=d+88|0;n=d+96|0;o=d+112|0;p=d+128|0;q=d+144|0;r=d+160|0;s=d+176|0;t=d+192|0;IJ(g,0);u=(z=0,av(226,b|0)|0);L1:do{if(!z){v=b+20|0;w=(z=0,av(76,c[v>>2]|0)|0);if(z){z=0;x=5;break}if((a[w]|0)!=58){y=u;IL(g);i=d;return y|0}w=(z=0,av(76,c[v>>2]|0)|0);if(z){z=0;x=5;break}A=(a[w]|0)==58?w+1|0:0;if((A|0)!=0){B=b+48|0;C=c[B>>2]|0;D=c[v>>2]|0;L10:do{if(D>>>0<A>>>0){E=D;F=0;while(1){G=a[E]|0;if((G<<24>>24|0)==0){H=F;break L10}else if((G<<24>>24|0)==10){I=F+1|0}else{I=F}G=E+1|0;if(G>>>0<A>>>0){E=G;F=I}else{H=I;break}}}else{H=0}}while(0);c[B>>2]=H+C;F=w-1|0;L17:do{if(F>>>0<D>>>0){J=0}else{E=0;G=F;while(1){K=E+1|0;if((a[G]|0)==10){J=E;break L17}L=G-1|0;if(L>>>0<D>>>0){J=K;break}else{E=K;G=L}}}}while(0);D=b+40|0;if((H|0)==0){N=c[D>>2]|0}else{c[D>>2]=1;N=1}c[b+52>>2]=N+J;F=A;C=w;c[D>>2]=F-C+J+N;D=b+56|0;c[D>>2]=C;c[D+4>>2]=F;c[v>>2]=A}F=(z=0,av(356,b|0)|0);if(z){z=0;x=5;break}D=c[b>>2]|0;C=(z=0,av(316,80)|0);if(z){z=0;x=5;break}B=C;c[f>>2]=B;C=D+4|0;G=c[C>>2]|0;if((G|0)==(c[D+8>>2]|0)){z=0;at(498,D|0,f|0);if(z){z=0;x=5;break}O=c[f>>2]|0}else{if((G|0)==0){P=0}else{c[G>>2]=B;P=c[C>>2]|0}c[C>>2]=P+4;O=B}B=O;G=O;E=b+28|0;L37:do{if((a[E]&1)==0){L=h;c[L>>2]=c[E>>2];c[L+4>>2]=c[E+4>>2];c[L+8>>2]=c[E+8>>2];x=38}else{L=c[b+36>>2]|0;K=c[b+32>>2]|0;do{if(K>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(K>>>0<11>>>0){a[h]=K<<1;Q=h+1|0}else{R=K+16&-16;S=(z=0,av(316,R|0)|0);if(z){z=0;break}c[h+8>>2]=S;c[h>>2]=R|1;c[h+4>>2]=K;Q=S}TF(Q|0,L|0,K)|0;a[Q+K|0]=0;x=38;break L37}}while(0);K=b$(-1,-1)|0;T=M;U=K}}while(0);do{if((x|0)==38){E=b+44|0;A=e;c[A>>2]=c[E>>2];c[A+4>>2]=c[E+4>>2];c[A+8>>2]=c[E+8>>2];z=0;aX(58,G|0,h|0,e|0,1);if(z){z=0;E=b$(-1,-1)|0;A=E;E=M;if((a[h]&1)==0){T=E;U=A;break}Tw(c[h+8>>2]|0);T=E;U=A;break}if((a[h]&1)!=0){Tw(c[h+8>>2]|0)}A=O+36|0;E=A;c[j>>2]=u;c[j+4>>2]=F;z=0,aO(726,E|0,j|0)|0;if(z){z=0;x=5;break L1}w=b+48|0;K=b+40|0;L=b+52|0;S=b+56|0;R=k+8|0;V=k|0;W=k+4|0;X=l|0;Y=l+4|0;Z=l+8|0;_=k;$=m|0;aa=m+4|0;L60:while(1){ab=(z=0,av(76,c[v>>2]|0)|0);if(z){z=0;x=4;break}ac=(a[ab]|0)==44?ab+1|0:0;if((ac|0)==0){x=88;break}ad=c[w>>2]|0;ae=c[v>>2]|0;L64:do{if(ae>>>0<ac>>>0){af=ae;ag=0;while(1){ah=a[af]|0;if((ah<<24>>24|0)==0){ai=ag;break L64}else if((ah<<24>>24|0)==10){aj=ag+1|0}else{aj=ag}ah=af+1|0;if(ah>>>0<ac>>>0){af=ah;ag=aj}else{ai=aj;break}}}else{ai=0}}while(0);c[w>>2]=ai+ad;ag=ab-1|0;L71:do{if(ag>>>0<ae>>>0){ak=0}else{af=0;ah=ag;while(1){al=af+1|0;if((a[ah]|0)==10){ak=af;break L71}am=ah-1|0;if(am>>>0<ae>>>0){ak=al;break}else{af=al;ah=am}}}}while(0);if((ai|0)==0){an=c[K>>2]|0}else{c[K>>2]=1;an=1}c[L>>2]=an+ak;ae=ac;ag=ab;c[K>>2]=ae-ag+ak+an;c[S>>2]=ag;c[S+4>>2]=ae;c[v>>2]=ac;ae=(z=0,av(76,ac|0)|0);if(z){z=0;x=4;break}if((a[ae]|0)==41){x=88;break}ae=(z=0,av(226,b|0)|0);if(z){z=0;x=4;break}ag=(z=0,av(76,c[v>>2]|0)|0);if(z){z=0;x=4;break}ad=(a[ag]|0)==58?ag+1|0:0;do{if((ad|0)==0){ah=(z=0,av(316,16)|0);if(z){z=0;x=4;break L60}c[R>>2]=ah;c[V>>2]=17;c[W>>2]=14;TF(ah|0,6968,14)|0;a[ah+14|0]=0;c[X>>2]=0;c[Y>>2]=0;c[Z>>2]=0;z=0;aT(362,b|0,k|0,l|0);if(z){z=0;x=84;break L60}if((a[_]&1)==0){break}Tw(c[R>>2]|0)}else{ah=c[w>>2]|0;af=c[v>>2]|0;L86:do{if(af>>>0<ad>>>0){am=af;al=0;while(1){ao=a[am]|0;if((ao<<24>>24|0)==10){ap=al+1|0}else if((ao<<24>>24|0)==0){aq=al;break L86}else{ap=al}ao=am+1|0;if(ao>>>0<ad>>>0){am=ao;al=ap}else{aq=ap;break}}}else{aq=0}}while(0);c[w>>2]=aq+ah;al=ag-1|0;L93:do{if(al>>>0<af>>>0){as=0}else{am=0;ao=al;while(1){au=am+1|0;if((a[ao]|0)==10){as=am;break L93}aw=ao-1|0;if(aw>>>0<af>>>0){as=au;break}else{am=au;ao=aw}}}}while(0);if((aq|0)==0){ax=c[K>>2]|0}else{c[K>>2]=1;ax=1}c[L>>2]=ax+as;af=ad;al=ag;c[K>>2]=af-al+as+ax;c[S>>2]=al;c[S+4>>2]=af;c[v>>2]=ad}}while(0);ad=(z=0,av(356,b|0)|0);if(z){z=0;x=4;break}c[$>>2]=ae;c[aa>>2]=ad;z=0,aO(726,E|0,m|0)|0;if(z){z=0;x=4;break}}if((x|0)==4){E=b$(-1,-1)|0;ay=M;az=E;break L1}else if((x|0)==88){E=c[A+40>>2]|0;L111:do{if((E|0)!=0){aa=g|0;z=0;aT(c[(c[E>>2]|0)+28>>2]|0,r|0,E|0,aa|0);if(z){z=0;x=5;break L1}$=(z=0,aW(2,r|0,0,6872,15)|0);do{if(!z){S=$;K=q;c[K>>2]=c[S>>2];c[K+4>>2]=c[S+4>>2];c[K+8>>2]=c[S+8>>2];TI(S|0,0,12)|0;S=(z=0,aA(80,q|0,6688,9)|0);do{if(!z){L=S;w=p;c[w>>2]=c[L>>2];c[w+4>>2]=c[L+4>>2];c[w+8>>2]=c[L+8>>2];TI(L|0,0,12)|0;z=0;aT(c[(c[O>>2]|0)+28>>2]|0,s|0,G|0,aa|0);do{if(!z){L=s;Z=a[L]|0;if((Z&1)==0){aB=s+1|0}else{aB=c[s+8>>2]|0}Y=Z&255;if((Y&1|0)==0){aC=Y>>>1}else{aC=c[s+4>>2]|0}Y=(z=0,aA(80,p|0,aB|0,aC|0)|0);do{if(!z){Z=Y;X=o;c[X>>2]=c[Z>>2];c[X+4>>2]=c[Z+4>>2];c[X+8>>2]=c[Z+8>>2];TI(Z|0,0,12)|0;Z=(z=0,aA(80,o|0,6536,1)|0);do{if(!z){W=Z;V=n;c[V>>2]=c[W>>2];c[V+4>>2]=c[W+4>>2];c[V+8>>2]=c[W+8>>2];TI(W|0,0,12)|0;c[t>>2]=0;c[t+4>>2]=0;c[t+8>>2]=0;z=0;aT(362,b|0,n|0,t|0);if(z){z=0;W=b$(-1,-1)|0;ad=W;W=M;if((a[V]&1)==0){aD=W;aE=ad;break}Tw(c[n+8>>2]|0);aD=W;aE=ad;break}if((a[V]&1)!=0){Tw(c[n+8>>2]|0)}if((a[X]&1)!=0){Tw(c[o+8>>2]|0)}if((a[L]&1)!=0){Tw(c[s+8>>2]|0)}if((a[w]&1)!=0){Tw(c[p+8>>2]|0)}if((a[K]&1)!=0){Tw(c[q+8>>2]|0)}if((a[r]&1)==0){break L111}Tw(c[r+8>>2]|0);break L111}else{z=0;V=b$(-1,-1)|0;aD=M;aE=V}}while(0);if((a[X]&1)==0){aF=aD;aG=aE;break}Tw(c[o+8>>2]|0);aF=aD;aG=aE}else{z=0;Z=b$(-1,-1)|0;aF=M;aG=Z}}while(0);if((a[L]&1)==0){aH=aF;aI=aG;break}Tw(c[s+8>>2]|0);aH=aF;aI=aG}else{z=0;Y=b$(-1,-1)|0;aH=M;aI=Y}}while(0);if((a[w]&1)==0){aJ=aH;aK=aI;break}Tw(c[p+8>>2]|0);aJ=aH;aK=aI}else{z=0;Y=b$(-1,-1)|0;aJ=M;aK=Y}}while(0);if((a[K]&1)==0){aL=aJ;aM=aK;break}Tw(c[q+8>>2]|0);aL=aJ;aM=aK}else{z=0;S=b$(-1,-1)|0;aL=M;aM=S}}while(0);if((a[r]&1)==0){aN=aL;aP=aM;IL(g);aQ=aP;aR=0;aS=aQ;aU=aN;bj(aS|0)}Tw(c[r+8>>2]|0);aN=aL;aP=aM;IL(g);aQ=aP;aR=0;aS=aQ;aU=aN;bj(aS|0)}}while(0);y=O;IL(g);i=d;return y|0}else if((x|0)==84){E=b$(-1,-1)|0;A=E;E=M;if((a[_]&1)==0){aN=E;aP=A;IL(g);aQ=aP;aR=0;aS=aQ;aU=aN;bj(aS|0)}Tw(c[R>>2]|0);aN=E;aP=A;IL(g);aQ=aP;aR=0;aS=aQ;aU=aN;bj(aS|0)}}}while(0);G=c[D>>2]|0;v=c[C>>2]|0;L178:do{if((G|0)==(v|0)){aV=G}else{F=G;while(1){A=F+4|0;if((c[F>>2]|0)==(O|0)){aV=F;break L178}if((A|0)==(v|0)){aV=v;break}else{F=A}}}}while(0);D=aV-G>>2;F=G+(D+1<<2)|0;R=v-F|0;TG(G+(D<<2)|0,F|0,R|0)|0;F=G+((R>>2)+D<<2)|0;D=c[C>>2]|0;if((F|0)!=(D|0)){c[C>>2]=D+(~((D-4+(-F|0)|0)>>>2)<<2)}Tw(B);aN=T;aP=U;IL(g);aQ=aP;aR=0;aS=aQ;aU=aN;bj(aS|0)}else{z=0;x=5}}while(0);if((x|0)==5){x=b$(-1,-1)|0;ay=M;az=x}aN=ay;aP=az;IL(g);aQ=aP;aR=0;aS=aQ;aU=aN;bj(aS|0);return 0}function zZ(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,aq=0,as=0,at=0,au=0,aw=0;d=i;i=i+96|0;e=d|0;f=d+8|0;g=d+16|0;h=d+32|0;j=d+40|0;k=d+56|0;l=d+64|0;m=d+80|0;n=b+20|0;do{if((a[Ej(c[n>>2]|0)|0]|0)!=59){if((a[Ej(c[n>>2]|0)|0]|0)==125){break}if((a[Ej(c[n>>2]|0)|0]|0)==123){break}if((a[Ej(c[n>>2]|0)|0]|0)==41){break}o=Ej(c[n>>2]|0)|0;p=a[45152]|0;q=p<<24>>24==0;L6:do{if(q){r=o;s=8}else{t=o;u=45152;v=p;while(1){if((a[t]|0)!=v<<24>>24){break L6}w=t+1|0;x=u+1|0;y=a[x]|0;if(y<<24>>24==0){r=w;s=8;break}else{t=w;u=x;v=y}}}}while(0);if((s|0)==8){if((r|0)!=0){break}}o=zd(b)|0;if((a[Ej(c[n>>2]|0)|0]|0)!=44){A=o;i=d;return A|0}v=c[b>>2]|0;u=Tu(64)|0;c[h>>2]=u;t=v+4|0;y=c[t>>2]|0;if((y|0)==(c[v+8>>2]|0)){fr(v|0,h);B=c[h>>2]|0}else{if((y|0)==0){C=0}else{c[y>>2]=u;C=c[t>>2]|0}c[t>>2]=C+4;B=u}u=B;y=b+28|0;L23:do{if((a[y]&1)==0){x=m;c[x>>2]=c[y>>2];c[x+4>>2]=c[y+4>>2];c[x+8>>2]=c[y+8>>2];s=52}else{x=c[b+36>>2]|0;w=c[b+32>>2]|0;do{if(w>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(w>>>0<11>>>0){a[m]=w<<1;D=m+1|0}else{E=w+16&-16;F=(z=0,av(316,E|0)|0);if(z){z=0;break}c[m+8>>2]=F;c[m>>2]=E|1;c[m+4>>2]=w;D=F}TF(D|0,x|0,w)|0;a[D+w|0]=0;s=52;break L23}}while(0);w=b$(-1,-1)|0;G=w;H=M}}while(0);do{if((s|0)==52){y=b+44|0;w=g;c[w>>2]=c[y>>2];c[w+4>>2]=c[y+4>>2];c[w+8>>2]=c[y+8>>2];z=0;aE(34,B|0,m|0,g|0,2,1,0);if(z){z=0;y=b$(-1,-1)|0;w=y;y=M;if((a[m]&1)==0){G=w;H=y;break}Tw(c[m+8>>2]|0);G=w;H=y;break}if((a[m]&1)!=0){Tw(c[m+8>>2]|0)}y=B+36|0;w=y;c[f>>2]=o;x=y+16|0;c[x>>2]=0;F=y+8|0;E=F;I=c[E>>2]|0;J=y+12|0;if((I|0)==(c[J>>2]|0)){fL(y+4|0,f);K=c[f>>2]|0}else{if((I|0)==0){L=0}else{c[I>>2]=o;L=c[E>>2]|0}c[F>>2]=L+4;K=o}I=y;cK[c[c[I>>2]>>2]&1023](w,K);N=Ej(c[n>>2]|0)|0;L52:do{if((a[N]|0)==44){O=b+48|0;P=b+40|0;Q=b+52|0;R=b+56|0;S=y+4|0;T=N;U=N;while(1){V=U+1|0;W=c[O>>2]|0;X=c[n>>2]|0;L56:do{if(X>>>0<V>>>0){Y=X;Z=0;while(1){_=a[Y]|0;if((_<<24>>24|0)==0){$=Z;break L56}else if((_<<24>>24|0)==10){aa=Z+1|0}else{aa=Z}if((Y|0)<(U|0)){Y=Y+1|0;Z=aa}else{$=aa;break}}}else{$=0}}while(0);c[O>>2]=$+W;Z=T-1|0;L63:do{if(Z>>>0<X>>>0){ab=0}else{Y=0;_=Z;while(1){ac=Y+1|0;if((a[_]|0)==10){ab=Y;break L63}ad=_-1|0;if(ad>>>0<X>>>0){ab=ac;break}else{Y=ac;_=ad}}}}while(0);if(($|0)==0){ae=c[P>>2]|0}else{c[P>>2]=1;ae=1}c[Q>>2]=ae+ab;X=V;Z=T;c[P>>2]=X-Z+ab+ae;c[R>>2]=Z;c[R+4>>2]=X;c[n>>2]=V;if(0){break L52}if((a[Ej(V)|0]|0)==59){break L52}if((a[Ej(c[n>>2]|0)|0]|0)==125){break L52}if((a[Ej(c[n>>2]|0)|0]|0)==123){break L52}if((a[Ej(c[n>>2]|0)|0]|0)==41){break L52}if((a[Ej(c[n>>2]|0)|0]|0)==58){break L52}X=Ej(c[n>>2]|0)|0;L78:do{if(q){af=X;s=81}else{Z=X;W=45152;_=p;while(1){if((a[Z]|0)!=_<<24>>24){break L78}Y=Z+1|0;ad=W+1|0;ac=a[ad]|0;if(ac<<24>>24==0){af=Y;s=81;break}else{Z=Y;W=ad;_=ac}}}}while(0);if((s|0)==81){s=0;if((af|0)!=0){break L52}}X=zd(b)|0;c[e>>2]=X;c[x>>2]=0;V=c[E>>2]|0;if((V|0)==(c[J>>2]|0)){fL(S,e);ag=c[e>>2]|0}else{if((V|0)==0){ah=0}else{c[V>>2]=X;ah=c[E>>2]|0}c[F>>2]=ah+4;ag=X}cK[c[c[I>>2]>>2]&1023](w,ag);X=Ej(c[n>>2]|0)|0;if((a[X]|0)==44){T=X;U=X}else{break}}}}while(0);A=B;i=d;return A|0}}while(0);p=c[v>>2]|0;q=c[t>>2]|0;L95:do{if((p|0)==(q|0)){ai=p}else{o=p;while(1){w=o+4|0;if((c[o>>2]|0)==(B|0)){ai=o;break L95}if((w|0)==(q|0)){ai=q;break}else{o=w}}}}while(0);v=ai-p>>2;o=p+(v+1<<2)|0;w=q-o|0;TG(p+(v<<2)|0,o|0,w|0)|0;o=p+((w>>2)+v<<2)|0;v=c[t>>2]|0;if((o|0)!=(v|0)){c[t>>2]=v+(~((v-4+(-o|0)|0)>>>2)<<2)}Tw(u);aj=G;ak=H;al=aj;am=0;an=al;ao=ak;bj(an|0)}}while(0);H=c[b>>2]|0;G=Tu(64)|0;c[k>>2]=G;ai=H+4|0;B=c[ai>>2]|0;if((B|0)==(c[H+8>>2]|0)){fr(H|0,k);ap=c[k>>2]|0}else{if((B|0)==0){aq=0}else{c[B>>2]=G;aq=c[ai>>2]|0}c[ai>>2]=aq+4;ap=G}G=ap;aq=b+28|0;L112:do{if((a[aq]&1)==0){B=l;c[B>>2]=c[aq>>2];c[B+4>>2]=c[aq+4>>2];c[B+8>>2]=c[aq+8>>2];s=24}else{B=c[b+36>>2]|0;k=c[b+32>>2]|0;do{if(k>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(k>>>0<11>>>0){a[l]=k<<1;as=l+1|0}else{n=k+16&-16;ag=(z=0,av(316,n|0)|0);if(z){z=0;break}c[l+8>>2]=ag;c[l>>2]=n|1;c[l+4>>2]=k;as=ag}TF(as|0,B|0,k)|0;a[as+k|0]=0;s=24;break L112}}while(0);k=b$(-1,-1)|0;at=k;au=M}}while(0);do{if((s|0)==24){as=b+44|0;aq=j;c[aq>>2]=c[as>>2];c[aq+4>>2]=c[as+4>>2];c[aq+8>>2]=c[as+8>>2];z=0;aE(34,ap|0,l|0,j|0,0,0,0);if(z){z=0;as=b$(-1,-1)|0;aq=as;as=M;if((a[l]&1)==0){at=aq;au=as;break}Tw(c[l+8>>2]|0);at=aq;au=as;break}as=ap;if((a[l]&1)==0){A=as;i=d;return A|0}Tw(c[l+8>>2]|0);A=as;i=d;return A|0}}while(0);A=c[H>>2]|0;H=c[ai>>2]|0;L136:do{if((A|0)==(H|0)){aw=A}else{d=A;while(1){l=d+4|0;if((c[d>>2]|0)==(ap|0)){aw=d;break L136}if((l|0)==(H|0)){aw=H;break}else{d=l}}}}while(0);ap=aw-A>>2;aw=A+(ap+1<<2)|0;d=H-aw|0;TG(A+(ap<<2)|0,aw|0,d|0)|0;aw=A+((d>>2)+ap<<2)|0;ap=c[ai>>2]|0;if((aw|0)!=(ap|0)){c[ai>>2]=ap+(~((ap-4+(-aw|0)|0)>>>2)<<2)}Tw(G);aj=at;ak=au;al=aj;am=0;an=al;ao=ak;bj(an|0);return 0}function z_(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0;b=i;i=i+16|0;d=b|0;e=z$(a)|0;f=Fn(Ej(c[a+20>>2]|0)|0)|0;if((f|0)==0){g=e;i=b;return g|0}if((Ek(f)|0)!=0){g=e;i=b;return g|0}f=d|0;c[f>>2]=0;h=d+4|0;c[h>>2]=0;j=d+8|0;c[j>>2]=0;k=0;while(1){l=(z=0,av(216,a|0)|0);if(z){z=0;m=22;break}if((l|0)==0){m=29;break}l=(z=0,av(112,a|0)|0);if(z){z=0;m=22;break}n=c[j>>2]|0;if(k>>>0<n>>>0){if((k|0)==0){o=0}else{c[k>>2]=l;o=c[h>>2]|0}p=o+4|0;c[h>>2]=p;k=p;continue}p=c[f>>2]|0;q=p;r=k-q|0;s=r>>2;t=s+1|0;if(t>>>0>1073741823>>>0){m=12;break}u=n-q|0;if(u>>2>>>0>536870910>>>0){v=1073741823;m=16}else{q=u>>1;u=q>>>0<t>>>0?t:q;if((u|0)==0){w=0;x=0}else{v=u;m=16}}if((m|0)==16){m=0;u=(z=0,av(316,v<<2|0)|0);if(z){z=0;m=22;break}w=u;x=v}u=w+(s<<2)|0;if((u|0)!=0){c[u>>2]=l}l=w+(t<<2)|0;t=p;TF(w|0,t|0,r)|0;c[f>>2]=w;c[h>>2]=l;c[j>>2]=w+(x<<2);if((p|0)==0){k=l;continue}Tw(t);k=l}do{if((m|0)==29){k=(z=0,aW(38,a|0,e|0,d|0,1)|0);if(z){z=0;m=23;break}x=c[f>>2]|0;if((x|0)==0){g=k;i=b;return g|0}w=c[h>>2]|0;if((x|0)!=(w|0)){c[h>>2]=w+(~((w-4+(-x|0)|0)>>>2)<<2)}Tw(x);g=k;i=b;return g|0}else if((m|0)==22){k=b$(-1,-1)|0;y=M;A=k}else if((m|0)==12){z=0;ar(376,0);if(z){z=0;m=23;break}return 0}}while(0);if((m|0)==23){m=b$(-1,-1)|0;y=M;A=m}m=c[f>>2]|0;if((m|0)==0){bj(A|0)}f=c[h>>2]|0;if((m|0)!=(f|0)){c[h>>2]=f+(~((f-4+(-m|0)|0)>>>2)<<2)}Tw(m);bj(A|0);return 0}function z$(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0;b=i;i=i+16|0;d=b|0;e=z2(a)|0;f=Fm(Ej(c[a+20>>2]|0)|0)|0;if((f|0)==0){g=e;i=b;return g|0}if((Ek(f)|0)!=0){g=e;i=b;return g|0}f=d|0;c[f>>2]=0;h=d+4|0;c[h>>2]=0;j=d+8|0;c[j>>2]=0;k=0;while(1){l=(z=0,av(116,a|0)|0);if(z){z=0;m=22;break}if((l|0)==0){m=29;break}l=(z=0,av(78,a|0)|0);if(z){z=0;m=22;break}n=c[j>>2]|0;if(k>>>0<n>>>0){if((k|0)==0){o=0}else{c[k>>2]=l;o=c[h>>2]|0}p=o+4|0;c[h>>2]=p;k=p;continue}p=c[f>>2]|0;q=p;r=k-q|0;s=r>>2;t=s+1|0;if(t>>>0>1073741823>>>0){m=12;break}u=n-q|0;if(u>>2>>>0>536870910>>>0){v=1073741823;m=16}else{q=u>>1;u=q>>>0<t>>>0?t:q;if((u|0)==0){w=0;x=0}else{v=u;m=16}}if((m|0)==16){m=0;u=(z=0,av(316,v<<2|0)|0);if(z){z=0;m=22;break}w=u;x=v}u=w+(s<<2)|0;if((u|0)!=0){c[u>>2]=l}l=w+(t<<2)|0;t=p;TF(w|0,t|0,r)|0;c[f>>2]=w;c[h>>2]=l;c[j>>2]=w+(x<<2);if((p|0)==0){k=l;continue}Tw(t);k=l}do{if((m|0)==22){k=b$(-1,-1)|0;y=M;A=k}else if((m|0)==12){z=0;ar(376,0);if(z){z=0;m=23;break}return 0}else if((m|0)==29){k=(z=0,aW(38,a|0,e|0,d|0,0)|0);if(z){z=0;m=23;break}x=c[f>>2]|0;if((x|0)==0){g=k;i=b;return g|0}w=c[h>>2]|0;if((x|0)!=(w|0)){c[h>>2]=w+(~((w-4+(-x|0)|0)>>>2)<<2)}Tw(x);g=k;i=b;return g|0}}while(0);if((m|0)==23){m=b$(-1,-1)|0;y=M;A=m}m=c[f>>2]|0;if((m|0)==0){bj(A|0)}f=c[h>>2]|0;if((m|0)!=(f|0)){c[h>>2]=f+(~((f-4+(-m|0)|0)>>>2)<<2)}Tw(m);bj(A|0);return 0}function z0(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=Fn(e)|0;if((f|0)==0){g=0;return g|0}h=(Ek(f)|0)!=0;i=h?0:f;if((i|0)==0){g=0;return g|0}f=b+48|0;h=c[f>>2]|0;j=c[d>>2]|0;L7:do{if(j>>>0<i>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==0){n=l;break L7}else if((m<<24>>24|0)==10){o=l+1|0}else{o=l}m=k+1|0;if(m>>>0<i>>>0){k=m;l=o}else{n=o;break}}}else{n=0}}while(0);c[f>>2]=h+n;h=e-1|0;L14:do{if(h>>>0<j>>>0){p=0}else{f=0;o=h;while(1){l=f+1|0;if((a[o]|0)==10){p=f;break L14}k=o-1|0;if(k>>>0<j>>>0){p=l;break}else{f=l;o=k}}}}while(0);j=b+40|0;if((n|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=i;n=e;c[b+40>>2]=j-n+p+q;q=b+56|0;c[q>>2]=n;c[q+4>>2]=j;c[d>>2]=i;g=i;return g|0}function z1(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0;g=i;i=i+40|0;h=g|0;j=g+8|0;k=g+24|0;l=e|0;m=(c[e+4>>2]|0)-(c[l>>2]|0)>>2;if((m|0)==0){n=d;i=g;return n|0}e=b|0;o=b+28|0;p=j;q=k;r=b+44|0;s=(f|0)==11;t=j+8|0;u=b+36|0;v=b+32|0;b=j+1|0;w=j|0;x=j+4|0;y=0;A=d;while(1){B=c[e>>2]|0;d=Tu(48)|0;c[h>>2]=d;C=B+4|0;D=c[C>>2]|0;if((D|0)==(c[B+8>>2]|0)){fr(B|0,h);E=c[h>>2]|0}else{if((D|0)==0){F=0}else{c[D>>2]=d;F=c[C>>2]|0}c[C>>2]=F+4;E=d}G=E;if((a[o]&1)==0){c[p>>2]=c[o>>2];c[p+4>>2]=c[o+4>>2];c[p+8>>2]=c[o+8>>2]}else{d=c[u>>2]|0;D=c[v>>2]|0;if(D>>>0>4294967279>>>0){H=11;break}if(D>>>0<11>>>0){a[p]=D<<1;I=b}else{J=D+16&-16;K=(z=0,av(316,J|0)|0);if(z){z=0;H=25;break}c[t>>2]=K;c[w>>2]=J|1;c[x>>2]=D;I=K}TF(I|0,d|0,D)|0;a[I+D|0]=0}c[q>>2]=c[r>>2];c[q+4>>2]=c[r+4>>2];c[q+8>>2]=c[r+8>>2];z=0;aE(14,E|0,j|0,k|0,f|0,A|0,c[(c[l>>2]|0)+(y<<2)>>2]|0);if(z){z=0;H=28;break}D=E;if((a[p]&1)!=0){Tw(c[t>>2]|0)}d=c[E+40>>2]|0;do{if(s){if((a[d+28|0]&1)==0){H=36;break}if((a[(c[E+44>>2]|0)+28|0]&1)==0){H=36;break}a[E+28|0]=1}else{H=36}}while(0);if((H|0)==36){H=0;a[d+28|0]=0;a[(c[E+44>>2]|0)+28|0]=0}K=y+1|0;if(K>>>0<m>>>0){y=K;A=D}else{n=D;H=41;break}}do{if((H|0)==41){i=g;return n|0}else if((H|0)==28){A=b$(-1,-1)|0;y=A;A=M;if((a[p]&1)==0){L=A;N=y;break}Tw(c[t>>2]|0);L=A;N=y}else if((H|0)==25){y=b$(-1,-1)|0;O=M;P=y;H=27}else if((H|0)==11){z=0;ar(106,0);if(!z){return 0}else{z=0;y=b$(-1,-1)|0;O=M;P=y;H=27;break}}}while(0);if((H|0)==27){L=O;N=P}P=c[B>>2]|0;B=c[C>>2]|0;L46:do{if((P|0)==(B|0)){Q=P}else{O=P;while(1){H=O+4|0;if((c[O>>2]|0)==(E|0)){Q=O;break L46}if((H|0)==(B|0)){Q=B;break}else{O=H}}}}while(0);E=Q-P>>2;Q=P+(E+1<<2)|0;O=B-Q|0;TG(P+(E<<2)|0,Q|0,O|0)|0;Q=P+((O>>2)+E<<2)|0;E=c[C>>2]|0;if((Q|0)==(E|0)){Tw(G);R=N;S=0;T=R;U=L;bj(T|0)}c[C>>2]=E+(~((E-4+(-Q|0)|0)>>>2)<<2);Tw(G);R=N;S=0;T=R;U=L;bj(T|0);return 0}function z2(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0;d=i;i=i+40|0;e=d|0;f=d+8|0;g=d+24|0;h=z4(b)|0;j=b+20|0;do{if((Fp(Ej(c[j>>2]|0)|0)|0)==0){if((Fq(Ej(c[j>>2]|0)|0)|0)!=0){break}if((Fs(Ej(c[j>>2]|0)|0)|0)!=0){break}if((Fr(Ej(c[j>>2]|0)|0)|0)!=0){break}if((Fu(Ej(c[j>>2]|0)|0)|0)!=0){break}if((Ft(Ej(c[j>>2]|0)|0)|0)==0){k=h}else{break}i=d;return k|0}}while(0);do{if((z5(b)|0)==0){if((z6(b)|0)!=0){l=3;break}if((z7(b)|0)!=0){l=5;break}if((z8(b)|0)!=0){l=7;break}if((z9(b)|0)!=0){l=4;break}Aa(b)|0;l=6}else{l=2}}while(0);j=z4(b)|0;m=c[b>>2]|0;n=Tu(48)|0;c[e>>2]=n;o=m+4|0;p=c[o>>2]|0;if((p|0)==(c[m+8>>2]|0)){fr(m|0,e);q=c[e>>2]|0}else{if((p|0)==0){r=0}else{c[p>>2]=n;r=c[o>>2]|0}c[o>>2]=r+4;q=n}n=q;r=b+28|0;L23:do{if((a[r]&1)==0){p=f;c[p>>2]=c[r>>2];c[p+4>>2]=c[r+4>>2];c[p+8>>2]=c[r+8>>2];s=28}else{p=c[b+36>>2]|0;e=c[b+32>>2]|0;do{if(e>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(e>>>0<11>>>0){a[f]=e<<1;t=f+1|0}else{u=e+16&-16;v=(z=0,av(316,u|0)|0);if(z){z=0;break}c[f+8>>2]=v;c[f>>2]=u|1;c[f+4>>2]=e;t=v}TF(t|0,p|0,e)|0;a[t+e|0]=0;s=28;break L23}}while(0);e=b$(-1,-1)|0;w=M;x=e}}while(0);do{if((s|0)==28){t=g;b=h+16|0;c[t>>2]=c[b>>2];c[t+4>>2]=c[b+4>>2];c[t+8>>2]=c[b+8>>2];z=0;aE(14,q|0,f|0,g|0,l|0,h|0,j|0);if(z){z=0;b=b$(-1,-1)|0;t=b;b=M;if((a[f]&1)==0){w=b;x=t;break}Tw(c[f+8>>2]|0);w=b;x=t;break}t=q;if((a[f]&1)==0){k=t;i=d;return k|0}Tw(c[f+8>>2]|0);k=t;i=d;return k|0}}while(0);k=c[m>>2]|0;m=c[o>>2]|0;L47:do{if((k|0)==(m|0)){y=k}else{d=k;while(1){f=d+4|0;if((c[d>>2]|0)==(q|0)){y=d;break L47}if((f|0)==(m|0)){y=m;break}else{d=f}}}}while(0);q=y-k>>2;y=k+(q+1<<2)|0;d=m-y|0;TG(k+(q<<2)|0,y|0,d|0)|0;y=k+((d>>2)+q<<2)|0;q=c[o>>2]|0;if((y|0)==(q|0)){Tw(n);A=x;B=0;C=A;D=w;bj(C|0)}c[o>>2]=q+(~((q-4+(-y|0)|0)>>>2)<<2);Tw(n);A=x;B=0;C=A;D=w;bj(C|0);return 0}function z3(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=Fm(e)|0;if((f|0)==0){g=0;return g|0}h=(Ek(f)|0)!=0;i=h?0:f;if((i|0)==0){g=0;return g|0}f=b+48|0;h=c[f>>2]|0;j=c[d>>2]|0;L7:do{if(j>>>0<i>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==0){n=l;break L7}else if((m<<24>>24|0)==10){o=l+1|0}else{o=l}m=k+1|0;if(m>>>0<i>>>0){k=m;l=o}else{n=o;break}}}else{n=0}}while(0);c[f>>2]=h+n;h=e-1|0;L14:do{if(h>>>0<j>>>0){p=0}else{f=0;o=h;while(1){l=f+1|0;if((a[o]|0)==10){p=f;break L14}k=o-1|0;if(k>>>0<j>>>0){p=l;break}else{f=l;o=k}}}}while(0);j=b+40|0;if((n|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=i;n=e;c[b+40>>2]=j-n+p+q;q=b+56|0;c[q>>2]=n;c[q+4>>2]=j;c[d>>2]=i;g=i;return g|0}function z4(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0;d=i;i=i+40|0;e=d|0;f=d+16|0;g=d+32|0;h=Ac(b)|0;j=b+20|0;do{if((a[Ej(c[j>>2]|0)|0]|0)!=43){k=Ej(c[j>>2]|0)|0;l=(EX(k)|0)!=0;m=l?0:k;if((m|0)==0){n=h;i=d;return n|0}if((a[m]|0)==45){break}else{n=h}i=d;return n|0}}while(0);if((Ek(Ej(c[j>>2]|0)|0)|0)!=0){n=h;i=d;return n|0}m=e|0;c[m>>2]=0;k=e+4|0;c[k>>2]=0;l=e+8|0;c[l>>2]=0;o=f|0;c[o>>2]=0;p=f+4|0;c[p>>2]=0;q=f+8|0;c[q>>2]=0;r=g|0;s=g+4|0;t=b+56|0;u=b+48|0;v=b+40|0;w=b+52|0;x=t;y=0;L11:while(1){A=(z=0,av(76,c[j>>2]|0)|0);if(z){z=0;B=53;break}C=(a[A]|0)==43?A+1|0:0;if((C|0)==0){D=(z=0,av(204,b|0)|0);if(z){z=0;B=53;break}if((D|0)==0){B=64;break}}else{D=c[u>>2]|0;E=c[j>>2]|0;L18:do{if(E>>>0<C>>>0){F=E;G=0;while(1){H=a[F]|0;if((H<<24>>24|0)==10){I=G+1|0}else if((H<<24>>24|0)==0){J=G;break L18}else{I=G}H=F+1|0;if(H>>>0<C>>>0){F=H;G=I}else{J=I;break}}}else{J=0}}while(0);c[u>>2]=J+D;G=A-1|0;L25:do{if(G>>>0<E>>>0){K=0}else{F=0;H=G;while(1){L=F+1|0;if((a[H]|0)==10){K=F;break L25}N=H-1|0;if(N>>>0<E>>>0){K=L;break}else{F=L;H=N}}}}while(0);if((J|0)==0){O=c[v>>2]|0}else{c[v>>2]=1;O=1}c[w>>2]=O+K;E=C;G=A;c[v>>2]=E-G+K+O;c[x>>2]=G;c[x+4>>2]=E;c[j>>2]=C}c[r>>2]=6376;c[s>>2]=6377;E=(z=0,aO(712,t|0,g|0)|0);if(z){z=0;B=53;break}G=E?8:9;E=c[q>>2]|0;do{if(y>>>0<E>>>0){if((y|0)==0){P=0}else{c[y>>2]=G;P=c[p>>2]|0}D=P+4|0;c[p>>2]=D;Q=D}else{D=c[o>>2]|0;H=D;F=y-H|0;N=F>>2;L=N+1|0;if(L>>>0>1073741823>>>0){B=27;break L11}R=E-H|0;if(R>>2>>>0>536870910>>>0){S=1073741823;B=31}else{H=R>>1;R=H>>>0<L>>>0?L:H;if((R|0)==0){T=0;U=0}else{S=R;B=31}}if((B|0)==31){B=0;R=(z=0,av(316,S<<2|0)|0);if(z){z=0;B=53;break L11}T=R;U=S}R=T+(N<<2)|0;if((R|0)!=0){c[R>>2]=G}R=T+(L<<2)|0;L=D;TF(T|0,L|0,F)|0;c[o>>2]=T;c[p>>2]=R;c[q>>2]=T+(U<<2);if((D|0)==0){Q=R;break}Tw(L);Q=R}}while(0);G=(z=0,av(392,b|0)|0);if(z){z=0;B=53;break}E=c[k>>2]|0;C=c[l>>2]|0;if(E>>>0<C>>>0){if((E|0)!=0){c[E>>2]=G}c[k>>2]=E+4;y=Q;continue}A=c[m>>2]|0;R=A;L=E-R|0;E=L>>2;D=E+1|0;if(D>>>0>1073741823>>>0){B=43;break}F=C-R|0;if(F>>2>>>0>536870910>>>0){V=1073741823;B=47}else{R=F>>1;F=R>>>0<D>>>0?D:R;if((F|0)==0){W=0;X=0}else{V=F;B=47}}if((B|0)==47){B=0;F=(z=0,av(316,V<<2|0)|0);if(z){z=0;B=53;break}W=F;X=V}F=W+(E<<2)|0;if((F|0)!=0){c[F>>2]=G}G=A;TF(W|0,G|0,L)|0;c[m>>2]=W;c[k>>2]=W+(D<<2);c[l>>2]=W+(X<<2);if((A|0)==0){y=Q;continue}Tw(G);y=Q}do{if((B|0)==43){z=0;ar(376,0);if(z){z=0;B=54;break}return 0}else if((B|0)==27){z=0;ar(376,0);if(z){z=0;B=54;break}return 0}else if((B|0)==53){Q=b$(-1,-1)|0;Y=M;Z=Q}else if((B|0)==64){Q=(z=0,aW(50,b|0,h|0,e|0,f|0)|0);if(z){z=0;B=54;break}y=c[o>>2]|0;X=y;if((y|0)!=0){W=c[p>>2]|0;if((y|0)!=(W|0)){c[p>>2]=W+(~((W-4+(-X|0)|0)>>>2)<<2)}Tw(y)}y=c[m>>2]|0;if((y|0)==0){n=Q;i=d;return n|0}X=c[k>>2]|0;if((y|0)!=(X|0)){c[k>>2]=X+(~((X-4+(-y|0)|0)>>>2)<<2)}Tw(y);n=Q;i=d;return n|0}}while(0);if((B|0)==54){B=b$(-1,-1)|0;Y=M;Z=B}B=c[o>>2]|0;o=B;if((B|0)!=0){Y=c[p>>2]|0;if((B|0)!=(Y|0)){c[p>>2]=Y+(~((Y-4+(-o|0)|0)>>>2)<<2)}Tw(B)}B=c[m>>2]|0;if((B|0)==0){bj(Z|0)}m=c[k>>2]|0;if((B|0)!=(m|0)){c[k>>2]=m+(~((m-4+(-B|0)|0)>>>2)<<2)}Tw(B);bj(Z|0);return 0}function z5(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=Fp(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L4}else{n=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[h>>2]=i+o;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;n=i;while(1){l=h+1|0;if((a[n]|0)==10){p=h;break L11}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function z6(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=Fq(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==0){n=l;break L4}else if((m<<24>>24|0)==10){o=l+1|0}else{o=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=o}else{n=o;break}}}else{n=0}}while(0);c[h>>2]=i+n;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;o=i;while(1){l=h+1|0;if((a[o]|0)==10){p=h;break L11}k=o-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;o=k}}}}while(0);j=b+40|0;if((n|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;n=e;c[b+40>>2]=j-n+p+q;q=b+56|0;c[q>>2]=n;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function z7(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=Fs(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L4}else{n=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[h>>2]=i+o;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;n=i;while(1){l=h+1|0;if((a[n]|0)==10){p=h;break L11}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function z8(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=Fu(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L4}else{n=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[h>>2]=i+o;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;n=i;while(1){l=h+1|0;if((a[n]|0)==10){p=h;break L11}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function z9(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=Fr(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L4}else{n=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[h>>2]=i+o;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;n=i;while(1){l=h+1|0;if((a[n]|0)==10){p=h;break L11}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function Aa(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=Ft(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L4}else{n=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[h>>2]=i+o;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;n=i;while(1){l=h+1|0;if((a[n]|0)==10){p=h;break L11}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function Ab(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0;j=i;i=i+48|0;k=e;e=i;i=i+12|0;i=i+7&-8;c[e>>2]=c[k>>2];c[e+4>>2]=c[k+4>>2];c[e+8>>2]=c[k+8>>2];k=j|0;l=j+16|0;m=j+32|0;TF(m|0,e|0,12)|0;e=k;n=l;o=b|0;p=d;if((a[p]&1)==0){c[e>>2]=c[p>>2];c[e+4>>2]=c[p+4>>2];c[e+8>>2]=c[p+8>>2]}else{p=c[d+8>>2]|0;q=c[d+4>>2]|0;if(q>>>0>4294967279>>>0){L4(0)}if(q>>>0<11>>>0){a[e]=q<<1;r=k+1|0}else{d=q+16&-16;s=Tu(d)|0;c[k+8>>2]=s;c[k>>2]=d|1;c[k+4>>2]=q;r=s}TF(r|0,p|0,q)|0;a[r+q|0]=0}c[n>>2]=c[m>>2];c[n+4>>2]=c[m+4>>2];c[n+8>>2]=c[m+8>>2];z=0;aK(10,o|0,k|0,l|0,0,0,0,0);if(!z){if((a[e]&1)==0){t=b|0;c[t>>2]=25912;u=b+36|0;c[u>>2]=f;v=b+40|0;c[v>>2]=g;w=b+44|0;c[w>>2]=h;x=12;y=0;A=12;B=0;i=j;return}Tw(c[k+8>>2]|0);t=b|0;c[t>>2]=25912;u=b+36|0;c[u>>2]=f;v=b+40|0;c[v>>2]=g;w=b+44|0;c[w>>2]=h;x=12;y=0;A=12;B=0;i=j;return}else{z=0;j=b$(-1,-1)|0;if((a[e]&1)==0){bj(j|0)}Tw(c[k+8>>2]|0);bj(j|0)}}function Ac(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,aq=0,as=0;d=i;i=i+48|0;e=d|0;f=d+16|0;g=d+32|0;h=d+40|0;j=Ag(b)|0;k=b+20|0;do{if((a[Ej(c[k>>2]|0)|0]|0)==37){if((c[j+32>>2]|0)!=4){break}if((a[(Th(j,38880,38520,0)|0)+61|0]&1)==0){break}else{l=j}i=d;return l|0}}while(0);do{if((a[Ej(c[k>>2]|0)|0]|0)!=42){if((a[Ej(c[k>>2]|0)|0]|0)==47){break}if((a[Ej(c[k>>2]|0)|0]|0)==37){break}else{l=j}i=d;return l|0}}while(0);m=e|0;c[m>>2]=0;n=e+4|0;c[n>>2]=0;o=e+8|0;c[o>>2]=0;p=f|0;c[p>>2]=0;q=f+4|0;c[q>>2]=0;r=f+8|0;c[r>>2]=0;s=b+48|0;t=b+40|0;u=b+52|0;v=b+56|0;w=v;x=g|0;y=g+4|0;A=h|0;B=h+4|0;C=0;L11:while(1){D=(z=0,av(76,c[k>>2]|0)|0);if(z){z=0;E=64;break}F=(a[D]|0)==42?D+1|0:0;do{if((F|0)==0){G=(z=0,av(76,c[k>>2]|0)|0);if(z){z=0;E=64;break L11}H=(a[G]|0)==47?G+1|0:0;if((H|0)!=0){I=c[s>>2]|0;J=c[k>>2]|0;L19:do{if(J>>>0<H>>>0){K=J;L=0;while(1){N=a[K]|0;if((N<<24>>24|0)==0){O=L;break L19}else if((N<<24>>24|0)==10){P=L+1|0}else{P=L}N=K+1|0;if(N>>>0<H>>>0){K=N;L=P}else{O=P;break}}}else{O=0}}while(0);c[s>>2]=O+I;L=G-1|0;L26:do{if(L>>>0<J>>>0){Q=0}else{K=0;N=L;while(1){R=K+1|0;if((a[N]|0)==10){Q=K;break L26}S=N-1|0;if(S>>>0<J>>>0){Q=R;break}else{K=R;N=S}}}}while(0);if((O|0)==0){T=c[t>>2]|0}else{c[t>>2]=1;T=1}c[u>>2]=T+Q;J=H;L=G;c[t>>2]=J-L+Q+T;c[w>>2]=L;c[w+4>>2]=J;c[k>>2]=H;break}J=(z=0,av(76,c[k>>2]|0)|0);if(z){z=0;E=64;break L11}L=(a[J]|0)==37?J+1|0:0;if((L|0)==0){E=123;break L11}I=c[s>>2]|0;N=c[k>>2]|0;L38:do{if(N>>>0<L>>>0){K=N;S=0;while(1){R=a[K]|0;if((R<<24>>24|0)==0){U=S;break L38}else if((R<<24>>24|0)==10){V=S+1|0}else{V=S}R=K+1|0;if(R>>>0<L>>>0){K=R;S=V}else{U=V;break}}}else{U=0}}while(0);c[s>>2]=U+I;H=J-1|0;L45:do{if(H>>>0<N>>>0){W=0}else{G=0;S=H;while(1){K=G+1|0;if((a[S]|0)==10){W=G;break L45}R=S-1|0;if(R>>>0<N>>>0){W=K;break}else{G=K;S=R}}}}while(0);if((U|0)==0){X=c[t>>2]|0}else{c[t>>2]=1;X=1}c[u>>2]=X+W;N=L;H=J;c[t>>2]=N-H+W+X;c[w>>2]=H;c[w+4>>2]=N;c[k>>2]=L}else{N=c[s>>2]|0;H=c[k>>2]|0;L55:do{if(H>>>0<F>>>0){I=H;S=0;while(1){G=a[I]|0;if((G<<24>>24|0)==0){Y=S;break L55}else if((G<<24>>24|0)==10){Z=S+1|0}else{Z=S}G=I+1|0;if(G>>>0<F>>>0){I=G;S=Z}else{Y=Z;break}}}else{Y=0}}while(0);c[s>>2]=Y+N;L=D-1|0;L62:do{if(L>>>0<H>>>0){_=0}else{J=0;S=L;while(1){I=J+1|0;if((a[S]|0)==10){_=J;break L62}G=S-1|0;if(G>>>0<H>>>0){_=I;break}else{J=I;S=G}}}}while(0);if((Y|0)==0){$=c[t>>2]|0}else{c[t>>2]=1;$=1}c[u>>2]=$+_;H=F;L=D;c[t>>2]=H-L+_+$;c[w>>2]=L;c[w+4>>2]=H;c[k>>2]=F}}while(0);c[x>>2]=6232;c[y>>2]=6233;F=(z=0,aO(712,v|0,g|0)|0);if(z){z=0;E=64;break}do{if(F){D=c[r>>2]|0;if(C>>>0<D>>>0){if((C|0)==0){aa=0}else{c[C>>2]=10;aa=c[q>>2]|0}H=aa+4|0;c[q>>2]=H;ab=H;break}H=c[p>>2]|0;L=H;N=C-L|0;S=N>>2;J=S+1|0;if(J>>>0>1073741823>>>0){E=54;break L11}G=D-L|0;if(G>>2>>>0>536870910>>>0){ac=1073741823;E=58}else{L=G>>1;G=L>>>0<J>>>0?J:L;if((G|0)==0){ad=0;ae=0}else{ac=G;E=58}}if((E|0)==58){E=0;G=(z=0,av(316,ac<<2|0)|0);if(z){z=0;E=64;break L11}ad=G;ae=ac}G=ad+(S<<2)|0;if((G|0)!=0){c[G>>2]=10}G=ad+(J<<2)|0;J=H;TF(ad|0,J|0,N)|0;c[p>>2]=ad;c[q>>2]=G;c[r>>2]=ad+(ae<<2);if((H|0)==0){ab=G;break}Tw(J);ab=G}else{c[A>>2]=6088;c[B>>2]=6089;G=(z=0,aO(712,v|0,h|0)|0);if(z){z=0;E=64;break L11}J=c[r>>2]|0;H=C>>>0<J>>>0;if(G){if(H){if((C|0)==0){af=0}else{c[C>>2]=11;af=c[q>>2]|0}G=af+4|0;c[q>>2]=G;ab=G;break}G=c[p>>2]|0;N=G;S=C-N|0;L=S>>2;D=L+1|0;if(D>>>0>1073741823>>>0){E=82;break L11}I=J-N|0;if(I>>2>>>0>536870910>>>0){ag=1073741823;E=86}else{N=I>>1;I=N>>>0<D>>>0?D:N;if((I|0)==0){ah=0;ai=0}else{ag=I;E=86}}if((E|0)==86){E=0;I=(z=0,av(316,ag<<2|0)|0);if(z){z=0;E=64;break L11}ah=I;ai=ag}I=ah+(L<<2)|0;if((I|0)!=0){c[I>>2]=11}I=ah+(D<<2)|0;D=G;TF(ah|0,D|0,S)|0;c[p>>2]=ah;c[q>>2]=I;c[r>>2]=ah+(ai<<2);if((G|0)==0){ab=I;break}Tw(D);ab=I;break}else{if(H){if((C|0)==0){aj=0}else{c[C>>2]=12;aj=c[q>>2]|0}H=aj+4|0;c[q>>2]=H;ab=H;break}H=c[p>>2]|0;I=H;D=C-I|0;G=D>>2;S=G+1|0;if(S>>>0>1073741823>>>0){E=97;break L11}L=J-I|0;if(L>>2>>>0>536870910>>>0){ak=1073741823;E=101}else{I=L>>1;L=I>>>0<S>>>0?S:I;if((L|0)==0){al=0;am=0}else{ak=L;E=101}}if((E|0)==101){E=0;L=(z=0,av(316,ak<<2|0)|0);if(z){z=0;E=64;break L11}al=L;am=ak}L=al+(G<<2)|0;if((L|0)!=0){c[L>>2]=12}L=al+(S<<2)|0;S=H;TF(al|0,S|0,D)|0;c[p>>2]=al;c[q>>2]=L;c[r>>2]=al+(am<<2);if((H|0)==0){ab=L;break}Tw(S);ab=L;break}}}while(0);F=(z=0,av(344,b|0)|0);if(z){z=0;E=64;break}L=c[n>>2]|0;S=c[o>>2]|0;if(L>>>0<S>>>0){if((L|0)!=0){c[L>>2]=F}c[n>>2]=L+4;C=ab;continue}H=c[m>>2]|0;D=H;G=L-D|0;L=G>>2;I=L+1|0;if(I>>>0>1073741823>>>0){E=113;break}J=S-D|0;if(J>>2>>>0>536870910>>>0){an=1073741823;E=117}else{D=J>>1;J=D>>>0<I>>>0?I:D;if((J|0)==0){ao=0;ap=0}else{an=J;E=117}}if((E|0)==117){E=0;J=(z=0,av(316,an<<2|0)|0);if(z){z=0;E=64;break}ao=J;ap=an}J=ao+(L<<2)|0;if((J|0)!=0){c[J>>2]=F}F=H;TF(ao|0,F|0,G)|0;c[m>>2]=ao;c[n>>2]=ao+(I<<2);c[o>>2]=ao+(ap<<2);if((H|0)==0){C=ab;continue}Tw(F);C=ab}do{if((E|0)==123){ab=(z=0,aW(50,b|0,j|0,e|0,f|0)|0);if(z){z=0;E=65;break}C=c[p>>2]|0;ap=C;if((C|0)!=0){ao=c[q>>2]|0;if((C|0)!=(ao|0)){c[q>>2]=ao+(~((ao-4+(-ap|0)|0)>>>2)<<2)}Tw(C)}C=c[m>>2]|0;if((C|0)==0){l=ab;i=d;return l|0}ap=c[n>>2]|0;if((C|0)!=(ap|0)){c[n>>2]=ap+(~((ap-4+(-C|0)|0)>>>2)<<2)}Tw(C);l=ab;i=d;return l|0}else if((E|0)==54){z=0;ar(376,0);if(z){z=0;E=65;break}return 0}else if((E|0)==82){z=0;ar(376,0);if(z){z=0;E=65;break}return 0}else if((E|0)==97){z=0;ar(376,0);if(z){z=0;E=65;break}return 0}else if((E|0)==64){ab=b$(-1,-1)|0;aq=M;as=ab}else if((E|0)==113){z=0;ar(376,0);if(z){z=0;E=65;break}return 0}}while(0);if((E|0)==65){E=b$(-1,-1)|0;aq=M;as=E}E=c[p>>2]|0;p=E;if((E|0)!=0){aq=c[q>>2]|0;if((E|0)!=(aq|0)){c[q>>2]=aq+(~((aq-4+(-p|0)|0)>>>2)<<2)}Tw(E)}E=c[m>>2]|0;if((E|0)==0){bj(as|0)}m=c[n>>2]|0;if((E|0)!=(m|0)){c[n>>2]=m+(~((m-4+(-E|0)|0)>>>2)<<2)}Tw(E);bj(as|0);return 0}function Ad(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=(EX(e)|0)!=0;g=f?0:e;if((g|0)==0){h=0;return h|0}f=(a[g]|0)==45?g+1|0:0;if((f|0)==0){h=0;return h|0}g=b+48|0;i=c[g>>2]|0;j=c[d>>2]|0;L7:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==0){n=l;break L7}else if((m<<24>>24|0)==10){o=l+1|0}else{o=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=o}else{n=o;break}}}else{n=0}}while(0);c[g>>2]=i+n;i=e-1|0;L14:do{if(i>>>0<j>>>0){p=0}else{g=0;o=i;while(1){l=g+1|0;if((a[o]|0)==10){p=g;break L14}k=o-1|0;if(k>>>0<j>>>0){p=l;break}else{g=l;o=k}}}}while(0);j=b+40|0;if((n|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;n=e;c[b+40>>2]=j-n+p+q;q=b+56|0;c[q>>2]=n;c[q+4>>2]=j;c[d>>2]=f;h=f;return h|0}function Ae(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;e=i;i=i+32|0;f=d;d=i;i=i+8|0;c[d>>2]=c[f>>2];c[d+4>>2]=c[f+4>>2];f=e|0;g=e+16|0;h=c[b>>2]|0;j=(c[b+4>>2]|0)-h|0;if(j>>>0>4294967279>>>0){L4(0);return 0}if(j>>>0<11>>>0){b=j<<1&255;a[f]=b;k=f+1|0;l=b}else{b=j+16&-16;m=Tu(b)|0;c[f+8>>2]=m;n=b|1;c[f>>2]=n;c[f+4>>2]=j;k=m;l=n&255}TF(k|0,h|0,j)|0;a[k+j|0]=0;j=c[d>>2]|0;k=(c[d+4>>2]|0)-j|0;do{if(k>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(k>>>0<11>>>0){d=k<<1&255;a[g]=d;o=g+1|0;p=d}else{d=k+16&-16;h=(z=0,av(316,d|0)|0);if(z){z=0;break}c[g+8>>2]=h;n=d|1;c[g>>2]=n;c[g+4>>2]=k;o=h;p=n&255}TF(o|0,j|0,k)|0;a[o+k|0]=0;n=f;h=l&255;if((h&1|0)==0){q=h>>>1}else{q=c[f+4>>2]|0}h=g;d=p&255;if((d&1|0)==0){r=d>>>1}else{r=c[g+4>>2]|0}L25:do{if((q|0)==(r|0)){if((l&1)==0){s=n+1|0}else{s=c[f+8>>2]|0}if((p&1)==0){t=h+1|0}else{t=c[g+8>>2]|0}if((l&1)!=0){u=(TH(s|0,t|0,q|0)|0)==0;break}if((q|0)==0){u=1;break}else{v=t;w=s;x=q}while(1){if((a[w]|0)!=(a[v]|0)){u=0;break L25}d=x-1|0;if((d|0)==0){u=1;break}else{v=v+1|0;w=w+1|0;x=d}}}else{u=0}}while(0);if((p&1)!=0){Tw(c[g+8>>2]|0)}if((l&1)==0){i=e;return u|0}Tw(c[f+8>>2]|0);i=e;return u|0}}while(0);u=b$(-1,-1)|0;if((l&1)==0){bj(u|0)}Tw(c[f+8>>2]|0);bj(u|0);return 0}function Af(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0;g=i;i=i+40|0;h=g|0;j=g+8|0;k=g+24|0;l=e|0;m=(c[e+4>>2]|0)-(c[l>>2]|0)>>2;if((m|0)==0){n=d;i=g;return n|0}e=b|0;o=b+28|0;p=j;q=k;r=f|0;f=j+8|0;s=b+36|0;t=b+32|0;b=j+1|0;u=j|0;v=j+4|0;w=0;x=d;while(1){y=c[e>>2]|0;d=Tu(48)|0;c[h>>2]=d;A=y+4|0;B=c[A>>2]|0;if((B|0)==(c[y+8>>2]|0)){fr(y|0,h);C=c[h>>2]|0}else{if((B|0)==0){D=0}else{c[B>>2]=d;D=c[A>>2]|0}c[A>>2]=D+4;C=d}E=C;if((a[o]&1)==0){c[p>>2]=c[o>>2];c[p+4>>2]=c[o+4>>2];c[p+8>>2]=c[o+8>>2]}else{d=c[s>>2]|0;B=c[t>>2]|0;if(B>>>0>4294967279>>>0){F=11;break}if(B>>>0<11>>>0){a[p]=B<<1;G=b}else{H=B+16&-16;I=(z=0,av(316,H|0)|0);if(z){z=0;F=25;break}c[f>>2]=I;c[u>>2]=H|1;c[v>>2]=B;G=I}TF(G|0,d|0,B)|0;a[G+B|0]=0}B=x+16|0;c[q>>2]=c[B>>2];c[q+4>>2]=c[B+4>>2];c[q+8>>2]=c[B+8>>2];z=0;aE(14,C|0,j|0,k|0,c[(c[r>>2]|0)+(w<<2)>>2]|0,x|0,c[(c[l>>2]|0)+(w<<2)>>2]|0);if(z){z=0;F=28;break}B=C;if((a[p]&1)!=0){Tw(c[f>>2]|0)}d=c[C+40>>2]|0;do{if((c[(c[r>>2]|0)+(w<<2)>>2]|0)==11){if((a[d+28|0]&1)==0){F=36;break}if((a[(c[C+44>>2]|0)+28|0]&1)==0){F=36;break}a[C+28|0]=1}else{F=36}}while(0);if((F|0)==36){F=0;a[d+28|0]=0;a[(c[C+44>>2]|0)+28|0]=0}I=w+1|0;if(I>>>0<m>>>0){w=I;x=B}else{n=B;F=40;break}}do{if((F|0)==25){x=b$(-1,-1)|0;J=M;K=x;F=27}else if((F|0)==28){x=b$(-1,-1)|0;w=x;x=M;if((a[p]&1)==0){L=x;N=w;break}Tw(c[f>>2]|0);L=x;N=w}else if((F|0)==11){z=0;ar(106,0);if(!z){return 0}else{z=0;w=b$(-1,-1)|0;J=M;K=w;F=27;break}}else if((F|0)==40){i=g;return n|0}}while(0);if((F|0)==27){L=J;N=K}K=c[y>>2]|0;y=c[A>>2]|0;L46:do{if((K|0)==(y|0)){O=K}else{J=K;while(1){F=J+4|0;if((c[J>>2]|0)==(C|0)){O=J;break L46}if((F|0)==(y|0)){O=y;break}else{J=F}}}}while(0);C=O-K>>2;O=K+(C+1<<2)|0;J=y-O|0;TG(K+(C<<2)|0,O|0,J|0)|0;O=K+((J>>2)+C<<2)|0;C=c[A>>2]|0;if((O|0)==(C|0)){Tw(E);P=N;Q=0;R=P;S=L;bj(R|0)}c[A>>2]=C+(~((C-4+(-O|0)|0)>>>2)<<2);Tw(E);P=N;Q=0;R=P;S=L;bj(R|0);return 0}function Ag(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0;d=i;i=i+152|0;e=d|0;f=d+8|0;g=d+16|0;h=d+24|0;j=d+40|0;k=d+56|0;l=d+72|0;m=d+88|0;n=d+104|0;o=d+120|0;p=d+136|0;q=b+20|0;r=Ej(c[q>>2]|0)|0;s=(a[r]|0)==40?r+1|0:0;if((s|0)!=0){t=b+48|0;u=c[t>>2]|0;v=c[q>>2]|0;L3:do{if(v>>>0<s>>>0){w=v;x=0;while(1){y=a[w]|0;if((y<<24>>24|0)==0){A=x;break L3}else if((y<<24>>24|0)==10){B=x+1|0}else{B=x}y=w+1|0;if(y>>>0<s>>>0){w=y;x=B}else{A=B;break}}}else{A=0}}while(0);c[t>>2]=A+u;u=r-1|0;L10:do{if(u>>>0<v>>>0){C=0}else{B=0;x=u;while(1){w=B+1|0;if((a[x]|0)==10){C=B;break L10}y=x-1|0;if(y>>>0<v>>>0){C=w;break}else{B=w;x=y}}}}while(0);v=b+40|0;if((A|0)==0){D=c[v>>2]|0}else{c[v>>2]=1;D=1}A=b+52|0;c[A>>2]=D+C;u=s;x=r;c[v>>2]=u-x+C+D;D=b+56|0;c[D>>2]=x;c[D+4>>2]=u;c[q>>2]=s;s=zY(b)|0;u=Ej(c[q>>2]|0)|0;x=(a[u]|0)==41?u+1|0:0;do{if((x|0)==0){C=Tu(32)|0;r=h+8|0;c[r>>2]=C;c[h>>2]=33;c[h+4>>2]=20;TF(C|0,5928,20)|0;a[C+20|0]=0;c[j>>2]=0;c[j+4>>2]=0;c[j+8>>2]=0;z=0;aT(362,b|0,h|0,j|0);if(!z){if((a[h]&1)==0){break}Tw(c[r>>2]|0);break}else{z=0}C=b$(-1,-1)|0;B=C;C=M;if((a[h]&1)==0){E=B;F=C;G=E;H=0;I=G;J=F;bj(I|0)}Tw(c[r>>2]|0);E=B;F=C;G=E;H=0;I=G;J=F;bj(I|0)}else{C=c[t>>2]|0;B=c[q>>2]|0;L21:do{if(B>>>0<x>>>0){r=B;y=0;while(1){w=a[r]|0;if((w<<24>>24|0)==0){K=y;break L21}else if((w<<24>>24|0)==10){L=y+1|0}else{L=y}w=r+1|0;if(w>>>0<x>>>0){r=w;y=L}else{K=L;break}}}else{K=0}}while(0);c[t>>2]=K+C;y=u-1|0;L28:do{if(y>>>0<B>>>0){N=0}else{r=0;w=y;while(1){O=r+1|0;if((a[w]|0)==10){N=r;break L28}P=w-1|0;if(P>>>0<B>>>0){N=O;break}else{r=O;w=P}}}}while(0);if((K|0)==0){Q=c[v>>2]|0}else{c[v>>2]=1;Q=1}c[A>>2]=Q+N;B=x;y=u;c[v>>2]=B-y+N+Q;c[D>>2]=y;c[D+4>>2]=B;c[q>>2]=x}}while(0);a[s+28|0]=0;if((c[s+32>>2]|0)==5){x=c[s+40>>2]|0;if((x|0)==(c[s+44>>2]|0)){R=s;i=d;return R|0}a[(c[x>>2]|0)+28|0]=0;R=s;i=d;return R|0}if((s|0)==0){cr();return 0}if((c[(c[(c[s>>2]|0)-4>>2]|0)+4>>2]|0)!=33528){R=s;i=d;return R|0}x=c[s+40>>2]|0;if((x|0)==0){R=s;i=d;return R|0}if((c[x+36>>2]|0)!=11){R=s;i=d;return R|0}a[x+28|0]=0;R=s;i=d;return R|0}if((Fw(Ej(c[q>>2]|0)|0)|0)!=0){R=Ah(b)|0;i=d;return R|0}if((Fx(Ej(c[q>>2]|0)|0)|0)!=0){R=Ai(b)|0;i=d;return R|0}s=Ej(c[q>>2]|0)|0;x=a[45168]|0;L76:do{if(x<<24>>24==0){S=s;T=45}else{D=s;Q=45168;N=x;while(1){if((a[D]|0)!=N<<24>>24){T=46;break L76}v=D+1|0;u=Q+1|0;A=a[u]|0;if(A<<24>>24==0){S=v;T=45;break}else{D=v;Q=u;N=A}}}}while(0);if((T|0)==45){if((S|0)==0){T=46}}do{if((T|0)==46){S=Ej(c[q>>2]|0)|0;x=a[45448]|0;L84:do{if(x<<24>>24==0){U=S;T=49}else{s=S;N=45448;Q=x;while(1){if((a[s]|0)!=Q<<24>>24){break L84}D=s+1|0;A=N+1|0;u=a[A]|0;if(u<<24>>24==0){U=D;T=49;break}else{s=D;N=A;Q=u}}}}while(0);if((T|0)==49){if((U|0)!=0){break}}x=Ej(c[q>>2]|0)|0;S=a[45320]|0;L91:do{if(S<<24>>24==0){V=x;T=53}else{Q=x;N=45320;s=S;while(1){if((a[Q]|0)!=s<<24>>24){break L91}u=Q+1|0;A=N+1|0;D=a[A]|0;if(D<<24>>24==0){V=u;T=53;break}else{Q=u;N=A;s=D}}}}while(0);if((T|0)==53){if((V|0)!=0){break}}if((E8(Ej(c[q>>2]|0)|0)|0)!=0){R=Ak(b)|0;i=d;return R|0}S=Eo(Ej(c[q>>2]|0)|0)|0;do{if((S|0)!=0){if((a[S]|0)==37){break}R=zk(b)|0;i=d;return R|0}}while(0);do{if((E9(Ej(c[q>>2]|0)|0)|0)!=0){if((E2(Ej(c[q>>2]|0)|0)|0)!=0){break}R=Al(b)|0;i=d;return R|0}}while(0);if((Am(b)|0)!=0){S=c[b>>2]|0;x=Tu(44)|0;c[g>>2]=x;s=S+4|0;N=c[s>>2]|0;if((N|0)==(c[S+8>>2]|0)){fr(S|0,g);W=c[g>>2]|0}else{if((N|0)==0){X=0}else{c[N>>2]=x;X=c[s>>2]|0}c[s>>2]=X+4;W=x}x=W;N=W;Q=b+28|0;L121:do{if((a[Q]&1)==0){D=k;c[D>>2]=c[Q>>2];c[D+4>>2]=c[Q+4>>2];c[D+8>>2]=c[Q+8>>2];T=79}else{D=c[b+36>>2]|0;A=c[b+32>>2]|0;do{if(A>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(A>>>0<11>>>0){a[k]=A<<1;Y=k+1|0}else{u=A+16&-16;v=(z=0,av(316,u|0)|0);if(z){z=0;break}c[k+8>>2]=v;c[k>>2]=u|1;c[k+4>>2]=A;Y=v}TF(Y|0,D|0,A)|0;a[Y+A|0]=0;T=79;break L121}}while(0);A=b$(-1,-1)|0;Z=A;_=M}}while(0);do{if((T|0)==79){Q=l;A=b+44|0;c[Q>>2]=c[A>>2];c[Q+4>>2]=c[A+4>>2];c[Q+8>>2]=c[A+8>>2];A=(z=0,av(344,b|0)|0);do{if(!z){z=0;aq(52,N|0,k|0,l|0,0,A|0);if(z){z=0;break}Q=W;if((a[k]&1)==0){R=Q;i=d;return R|0}Tw(c[k+8>>2]|0);R=Q;i=d;return R|0}else{z=0}}while(0);A=b$(-1,-1)|0;Q=A;A=M;if((a[k]&1)==0){Z=Q;_=A;break}Tw(c[k+8>>2]|0);Z=Q;_=A}}while(0);N=c[S>>2]|0;A=c[s>>2]|0;L146:do{if((N|0)==(A|0)){$=N}else{Q=N;while(1){D=Q+4|0;if((c[Q>>2]|0)==(W|0)){$=Q;break L146}if((D|0)==(A|0)){$=A;break}else{Q=D}}}}while(0);S=$-N>>2;Q=N+(S+1<<2)|0;D=A-Q|0;TG(N+(S<<2)|0,Q|0,D|0)|0;Q=N+((D>>2)+S<<2)|0;S=c[s>>2]|0;if((Q|0)!=(S|0)){c[s>>2]=S+(~((S-4+(-Q|0)|0)>>>2)<<2)}Tw(x);E=Z;F=_;G=E;H=0;I=G;J=F;bj(I|0)}if((Ao(b)|0)!=0){Q=c[b>>2]|0;S=Tu(44)|0;c[f>>2]=S;D=Q+4|0;v=c[D>>2]|0;if((v|0)==(c[Q+8>>2]|0)){fr(Q|0,f);aa=c[f>>2]|0}else{if((v|0)==0){ab=0}else{c[v>>2]=S;ab=c[D>>2]|0}c[D>>2]=ab+4;aa=S}S=aa;v=aa;u=b+28|0;L165:do{if((a[u]&1)==0){K=m;c[K>>2]=c[u>>2];c[K+4>>2]=c[u+4>>2];c[K+8>>2]=c[u+8>>2];T=108}else{K=c[b+36>>2]|0;t=c[b+32>>2]|0;do{if(t>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(t>>>0<11>>>0){a[m]=t<<1;ac=m+1|0}else{L=t+16&-16;h=(z=0,av(316,L|0)|0);if(z){z=0;break}c[m+8>>2]=h;c[m>>2]=L|1;c[m+4>>2]=t;ac=h}TF(ac|0,K|0,t)|0;a[ac+t|0]=0;T=108;break L165}}while(0);t=b$(-1,-1)|0;ad=t;ae=M}}while(0);do{if((T|0)==108){u=n;x=b+44|0;c[u>>2]=c[x>>2];c[u+4>>2]=c[x+4>>2];c[u+8>>2]=c[x+8>>2];x=(z=0,av(344,b|0)|0);do{if(!z){z=0;aq(52,v|0,m|0,n|0,1,x|0);if(z){z=0;break}u=aa;if((a[m]&1)==0){R=u;i=d;return R|0}Tw(c[m+8>>2]|0);R=u;i=d;return R|0}else{z=0}}while(0);x=b$(-1,-1)|0;u=x;x=M;if((a[m]&1)==0){ad=u;ae=x;break}Tw(c[m+8>>2]|0);ad=u;ae=x}}while(0);v=c[Q>>2]|0;x=c[D>>2]|0;L190:do{if((v|0)==(x|0)){af=v}else{u=v;while(1){s=u+4|0;if((c[u>>2]|0)==(aa|0)){af=u;break L190}if((s|0)==(x|0)){af=x;break}else{u=s}}}}while(0);Q=af-v>>2;u=v+(Q+1<<2)|0;s=x-u|0;TG(v+(Q<<2)|0,u|0,s|0)|0;u=v+((s>>2)+Q<<2)|0;Q=c[D>>2]|0;if((u|0)!=(Q|0)){c[D>>2]=Q+(~((Q-4+(-u|0)|0)>>>2)<<2)}Tw(S);E=ad;F=ae;G=E;H=0;I=G;J=F;bj(I|0)}if((Ap(b)|0)==0){R=y5(b)|0;i=d;return R|0}u=c[b>>2]|0;Q=Tu(44)|0;c[e>>2]=Q;s=u+4|0;N=c[s>>2]|0;if((N|0)==(c[u+8>>2]|0)){fr(u|0,e);ag=c[e>>2]|0}else{if((N|0)==0){ah=0}else{c[N>>2]=Q;ah=c[s>>2]|0}c[s>>2]=ah+4;ag=Q}Q=ag;N=ag;A=b+28|0;L211:do{if((a[A]&1)==0){t=o;c[t>>2]=c[A>>2];c[t+4>>2]=c[A+4>>2];c[t+8>>2]=c[A+8>>2];T=137}else{t=c[b+36>>2]|0;K=c[b+32>>2]|0;do{if(K>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(K>>>0<11>>>0){a[o]=K<<1;ai=o+1|0}else{h=K+16&-16;L=(z=0,av(316,h|0)|0);if(z){z=0;break}c[o+8>>2]=L;c[o>>2]=h|1;c[o+4>>2]=K;ai=L}TF(ai|0,t|0,K)|0;a[ai+K|0]=0;T=137;break L211}}while(0);K=b$(-1,-1)|0;aj=K;ak=M}}while(0);do{if((T|0)==137){A=p;S=b+44|0;c[A>>2]=c[S>>2];c[A+4>>2]=c[S+4>>2];c[A+8>>2]=c[S+8>>2];S=(z=0,av(344,b|0)|0);do{if(!z){z=0;aq(52,N|0,o|0,p|0,2,S|0);if(z){z=0;break}A=ag;if((a[o]&1)==0){R=A;i=d;return R|0}Tw(c[o+8>>2]|0);R=A;i=d;return R|0}else{z=0}}while(0);S=b$(-1,-1)|0;A=S;S=M;if((a[o]&1)==0){aj=A;ak=S;break}Tw(c[o+8>>2]|0);aj=A;ak=S}}while(0);N=c[u>>2]|0;S=c[s>>2]|0;L236:do{if((N|0)==(S|0)){al=N}else{A=N;while(1){D=A+4|0;if((c[A>>2]|0)==(ag|0)){al=A;break L236}if((D|0)==(S|0)){al=S;break}else{A=D}}}}while(0);u=al-N>>2;A=N+(u+1<<2)|0;D=S-A|0;TG(N+(u<<2)|0,A|0,D|0)|0;A=N+((D>>2)+u<<2)|0;u=c[s>>2]|0;if((A|0)!=(u|0)){c[s>>2]=u+(~((u-4+(-A|0)|0)>>>2)<<2)}Tw(Q);E=aj;F=ak;G=E;H=0;I=G;J=F;bj(I|0)}}while(0);R=Aj(b)|0;i=d;return R|0}function Ah(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,as=0,au=0,aw=0,ax=0,ay=0,az=0,aA=0,aB=0,aC=0,aD=0,aE=0,aF=0,aG=0,aH=0,aI=0,aJ=0,aL=0,aM=0,aN=0,aO=0,aP=0,aQ=0,aR=0,aS=0,aU=0,aV=0,aX=0,aY=0,aZ=0,a_=0,a$=0,a0=0,a1=0,a2=0,a3=0,a4=0,a5=0,a6=0,a7=0,a8=0,a9=0,ba=0,bb=0,bc=0,bd=0,be=0,bf=0,bg=0,bh=0,bi=0,bk=0,bl=0,bm=0,bn=0,bo=0,bp=0,bq=0,br=0,bs=0,bt=0,bu=0,bv=0,bw=0,bx=0,by=0,bz=0,bA=0;d=i;i=i+120|0;e=d|0;f=d+8|0;g=d+24|0;h=d+32|0;j=d+40|0;k=d+48|0;l=d+64|0;m=d+72|0;n=d+88|0;o=d+104|0;p=d+112|0;q=p;r=i;i=i+12|0;i=i+7&-8;s=i;i=i+12|0;i=i+7&-8;t=i;i=i+12|0;i=i+7&-8;u=i;i=i+8|0;v=i;i=i+68|0;i=i+7&-8;w=i;i=i+8|0;x=i;i=i+12|0;i=i+7&-8;y=i;i=i+12|0;i=i+7&-8;A=i;i=i+12|0;i=i+7&-8;B=i;i=i+12|0;i=i+7&-8;C=i;i=i+12|0;i=i+7&-8;D=i;i=i+12|0;i=i+7&-8;E=i;i=i+8|0;AC(b)|0;F=b+56|0;G=c[F>>2]|0;H=c[F+4>>2]|0;c[p>>2]=G;c[p+4>>2]=H;p=G;G=p;F=H;H=F;I=G>>>0<H>>>0;L1:do{if(I){J=a[45576]|0;if(J<<24>>24==0){K=G;while(1){L=a[K]|0;if(L<<24>>24==0){N=0;break L1}if(!(L<<24>>24==92|(K|0)==0)){N=K;break L1}L=K+1|0;if(L>>>0<H>>>0){K=L}else{N=0;break L1}}}else{O=G}while(1){K=a[O]|0;if(K<<24>>24==0){N=0;break L1}L=K<<24>>24==92?0:O;if((L|0)!=0){K=L;L=45576;P=J;while(1){if((a[K]|0)!=P<<24>>24){Q=K;R=P;break}S=K+1|0;T=L+1|0;U=a[T]|0;if(U<<24>>24==0){Q=S;R=0;break}else{K=S;L=T;P=U}}if(!(R<<24>>24!=0|(Q|0)==0)){N=O;break L1}}P=O+1|0;if(P>>>0<H>>>0){O=P}else{N=0;break}}}else{N=0}}while(0);O=(N|0)==0;N=b|0;Q=c[N>>2]|0;R=Tu(68)|0;c[o>>2]=R;J=Q+4|0;P=c[J>>2]|0;if((P|0)==(c[Q+8>>2]|0)){fr(Q|0,o);V=c[o>>2]|0}else{if((P|0)==0){W=0}else{c[P>>2]=R;W=c[J>>2]|0}c[J>>2]=W+4;V=R}R=V;W=b+28|0;P=(a[W]&1)==0;if(O){L27:do{if(P){O=r;c[O>>2]=c[W>>2];c[O+4>>2]=c[W+4>>2];c[O+8>>2]=c[W+8>>2];X=28}else{O=c[b+36>>2]|0;o=c[b+32>>2]|0;do{if(o>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(o>>>0<11>>>0){a[r]=o<<1;Y=r+1|0}else{L=o+16&-16;K=(z=0,av(316,L|0)|0);if(z){z=0;break}c[r+8>>2]=K;c[r>>2]=L|1;c[r+4>>2]=o;Y=K}TF(Y|0,O|0,o)|0;a[Y+o|0]=0;X=28;break L27}}while(0);o=b$(-1,-1)|0;Z=M;_=o}}while(0);do{if((X|0)==28){Y=b+44|0;o=n;c[o>>2]=c[Y>>2];c[o+4>>2]=c[Y+4>>2];c[o+8>>2]=c[Y+8>>2];z=0;aq(14,V|0,r|0,n|0,q|0,0);if(z){z=0;Y=b$(-1,-1)|0;o=Y;Y=M;if((a[r]&1)==0){Z=Y;_=o;break}Tw(c[r+8>>2]|0);Z=Y;_=o;break}if((a[r]&1)!=0){Tw(c[r+8>>2]|0)}a[V+28|0]=1;$=V;i=d;return $|0}}while(0);r=c[Q>>2]|0;q=c[J>>2]|0;L51:do{if((r|0)==(q|0)){aa=r}else{n=r;while(1){o=n+4|0;if((c[n>>2]|0)==(V|0)){aa=n;break L51}if((o|0)==(q|0)){aa=q;break}else{n=o}}}}while(0);n=aa-r>>2;aa=r+(n+1<<2)|0;o=q-aa|0;TG(r+(n<<2)|0,aa|0,o|0)|0;aa=r+((o>>2)+n<<2)|0;n=c[J>>2]|0;if((aa|0)!=(n|0)){c[J>>2]=n+(~((n-4+(-aa|0)|0)>>>2)<<2)}Tw(R);ab=Z;ac=_;ad=ac;ae=0;af=ad;ag=ab;bj(af|0)}L61:do{if(P){_=s;c[_>>2]=c[W>>2];c[_+4>>2]=c[W+4>>2];c[_+8>>2]=c[W+8>>2];X=51}else{_=c[b+36>>2]|0;Z=c[b+32>>2]|0;do{if(Z>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(Z>>>0<11>>>0){a[s]=Z<<1;ah=s+1|0}else{aa=Z+16&-16;n=(z=0,av(316,aa|0)|0);if(z){z=0;break}c[s+8>>2]=n;c[s>>2]=aa|1;c[s+4>>2]=Z;ah=n}TF(ah|0,_|0,Z)|0;a[ah+Z|0]=0;X=51;break L61}}while(0);Z=b$(-1,-1)|0;ai=M;aj=Z}}while(0);do{if((X|0)==51){ah=b+44|0;P=m;c[P>>2]=c[ah>>2];c[P+4>>2]=c[ah+4>>2];c[P+8>>2]=c[ah+8>>2];z=0;aK(14,V|0,s|0,m|0,0,0,0,0);if(z){z=0;P=b$(-1,-1)|0;Z=P;P=M;if((a[s]&1)==0){ai=P;aj=Z;break}Tw(c[s+8>>2]|0);ai=P;aj=Z;break}if((a[s]&1)!=0){Tw(c[s+8>>2]|0)}if(!I){$=V;i=d;return $|0}Z=a[45576]|0;P=Z<<24>>24==0;_=V+40|0;n=_;aa=t;o=u|0;r=u+4|0;q=_+16|0;Y=_+8|0;O=_+12|0;K=_+4|0;L=t+8|0;U=b+36|0;T=b+32|0;S=t+1|0;ak=t|0;al=t+4|0;am=a[45224]|0;an=am<<24>>24==0;ao=B;ap=B+1|0;as=A;au=C|0;aw=C+4|0;ax=C+8|0;ay=B+8|0;az=A+8|0;aA=B|0;aB=B+4|0;aC=w|0;aD=w+4|0;aE=x;aF=y;aG=v+28|0;aH=v+4|0;aI=x+8|0;aJ=v+8|0;aL=v+36|0;aM=x+1|0;aN=x|0;aO=x+4|0;aP=G;L86:while(1){L88:while(1){L90:do{if(P){aQ=aP;while(1){aR=a[aQ]|0;if(aR<<24>>24==0){X=177;break L86}if(!(aR<<24>>24==92|(aQ|0)==0)){aS=aQ;break L90}aR=aQ+1|0;if(aR>>>0<H>>>0){aQ=aR}else{X=177;break L86}}}else{aQ=aP;while(1){aR=a[aQ]|0;if(aR<<24>>24==0){X=177;break L86}aU=aR<<24>>24==92?0:aQ;if((aU|0)!=0){aR=aU;aU=45576;aV=Z;while(1){if((a[aR]|0)!=aV<<24>>24){aX=aR;aY=aV;break}aZ=aR+1|0;a_=aU+1|0;a$=a[a_]|0;if(a$<<24>>24==0){aX=aZ;aY=0;break}else{aR=aZ;aU=a_;aV=a$}}if(!(aY<<24>>24!=0|(aX|0)==0)){aS=aQ;break L90}}aV=aQ+1|0;if(aV>>>0<H>>>0){aQ=aV}else{X=177;break L86}}}}while(0);if((aS|0)==0){X=177;break L86}do{if(aP>>>0<aS>>>0){a0=c[N>>2]|0;aQ=Tu(68)|0;c[l>>2]=aQ;a1=a0+4|0;aV=c[a1>>2]|0;if((aV|0)==(c[a0+8>>2]|0)){fr(a0|0,l);a2=c[l>>2]|0}else{if((aV|0)==0){a3=0}else{c[aV>>2]=aQ;a3=c[a1>>2]|0}c[a1>>2]=a3+4;a2=aQ}a4=a2;aQ=a2;if((a[W]&1)==0){c[aa>>2]=c[W>>2];c[aa+4>>2]=c[W+4>>2];c[aa+8>>2]=c[W+8>>2]}else{aV=c[U>>2]|0;aU=c[T>>2]|0;if(aU>>>0>4294967279>>>0){X=77;break L86}if(aU>>>0<11>>>0){a[aa]=aU<<1;a5=S}else{aR=aU+16&-16;a$=(z=0,av(316,aR|0)|0);if(z){z=0;X=103;break L86}c[L>>2]=a$;c[ak>>2]=aR|1;c[al>>2]=aU;a5=a$}TF(a5|0,aV|0,aU)|0;a[a5+aU|0]=0}aU=k;c[aU>>2]=c[ah>>2];c[aU+4>>2]=c[ah+4>>2];c[aU+8>>2]=c[ah+8>>2];c[o>>2]=aP;c[r>>2]=aS;z=0;aq(14,aQ|0,t|0,k|0,u|0,0);if(z){z=0;a6=1;X=106;break L86}aQ=a2;c[j>>2]=aQ;c[q>>2]=0;aU=c[Y>>2]|0;aV=aU;if((aU|0)==(c[O>>2]|0)){z=0;at(14,K|0,j|0);if(z){z=0;a6=0;X=106;break L86}a7=c[j>>2]|0}else{if((aU|0)==0){a8=0}else{c[aV>>2]=aQ;a8=c[Y>>2]|0}c[Y>>2]=a8+4;a7=aQ}z=0;at(c[c[_>>2]>>2]|0,n|0,a7|0);if(z){z=0;a6=0;X=106;break L86}if((a[aa]&1)==0){break}Tw(c[L>>2]|0)}}while(0);L137:do{if(aS>>>0<H>>>0){if(an){aQ=aS;while(1){if((a[aQ]|0)==0){break L137}aV=aQ+1|0;if((aQ|0)!=0){a9=aQ;break L88}if(aV>>>0<H>>>0){aQ=aV}else{break L137}}}else{ba=aS}while(1){aQ=a[ba]|0;if(aQ<<24>>24==0){break L137}L147:do{if(aQ<<24>>24==am<<24>>24){aV=45224;aU=ba;while(1){a$=aU+1|0;aR=aV+1|0;a_=a[aR]|0;if(a_<<24>>24==0){bb=a$;bc=0;break L147}if((a[a$]|0)==a_<<24>>24){aV=aR;aU=a$}else{bb=a$;bc=a_;break}}}else{bb=ba;bc=am}}while(0);aQ=ba+1|0;if(!(bc<<24>>24!=0|(bb|0)==0)){break}if(aQ>>>0<H>>>0){ba=aQ}else{break L137}}if((ba|0)!=0){a9=ba;break L88}}}while(0);aQ=F-p|0;if(aQ>>>0>4294967279>>>0){X=161;break L86}if(aQ>>>0<11>>>0){a[ao]=aQ<<1;bd=ap}else{aU=aQ+16&-16;aV=Tu(aU)|0;c[ay>>2]=aV;c[aA>>2]=aU|1;c[aB>>2]=aQ;bd=aV}TF(bd|0,G|0,aQ)|0;a[bd+aQ|0]=0;aQ=(z=0,aW(2,B|0,0,4256,44)|0);if(z){z=0;X=172;break L86}aV=aQ;c[as>>2]=c[aV>>2];c[as+4>>2]=c[aV+4>>2];c[as+8>>2]=c[aV+8>>2];TI(aV|0,0,12)|0;c[au>>2]=0;c[aw>>2]=0;c[ax>>2]=0;z=0;aT(362,b|0,A|0,C|0);if(z){z=0;X=173;break L86}if((a[as]&1)!=0){Tw(c[az>>2]|0)}if((a[ao]&1)!=0){Tw(c[ay>>2]|0)}if(aP>>>0>=H>>>0){X=221;break L86}}c[aC>>2]=aS+2;c[aD>>2]=a9;aV=c[N>>2]|0;if((a[W]&1)==0){c[aE>>2]=c[W>>2];c[aE+4>>2]=c[W+4>>2];c[aE+8>>2]=c[W+8>>2]}else{aQ=c[U>>2]|0;aU=c[T>>2]|0;if(aU>>>0>4294967279>>>0){X=130;break}if(aU>>>0<11>>>0){a[aE]=aU<<1;be=aM}else{a_=aU+16&-16;a$=Tu(a_)|0;c[aI>>2]=a$;c[aN>>2]=a_|1;c[aO>>2]=aU;be=a$}TF(be|0,aQ|0,aU)|0;a[be+aU|0]=0}c[aF>>2]=c[ah>>2];c[aF+4>>2]=c[ah+4>>2];c[aF+8>>2]=c[ah+8>>2];z=0;aq(18,v|0,w|0,aV|0,x|0,y|0);if(z){z=0;X=151;break}aV=(z=0,av(226,v|0)|0);if(z){z=0;X=152;break}if((a[aG]&1)!=0){Tw(c[aL>>2]|0)}aU=c[aH>>2]|0;aQ=aU;if((aU|0)!=0){a$=c[aJ>>2]|0;if((aU|0)!=(a$|0)){c[aJ>>2]=a$+(~((a$-4+(-aQ|0)|0)>>>2)<<2)}Tw(aU)}if((a[aE]&1)!=0){Tw(c[aI>>2]|0)}a[aV+30|0]=1;c[h>>2]=aV;c[q>>2]=0;aU=c[Y>>2]|0;aQ=aU;if((aU|0)==(c[O>>2]|0)){fL(K,h);bf=c[h>>2]|0}else{if((aU|0)==0){bg=0}else{c[aQ>>2]=aV;bg=c[Y>>2]|0}c[Y>>2]=bg+4;bf=aV}cK[c[c[_>>2]>>2]&1023](n,bf);aV=a9+1|0;if(aV>>>0<H>>>0){aP=aV}else{X=215;break}}do{if((X|0)==173){aF=b$(-1,-1)|0;aO=aF;aF=M;if((a[as]&1)==0){bh=aF;bi=aO;X=175;break}Tw(c[az>>2]|0);bh=aF;bi=aO;X=175}else if((X|0)==221){$=V;i=d;return $|0}else if((X|0)==130){L4(0);return 0}else if((X|0)==177){if(aP>>>0>=H>>>0){$=V;i=d;return $|0}aO=c[N>>2]|0;aF=Tu(68)|0;c[g>>2]=aF;aN=aO+4|0;aM=c[aN>>2]|0;if((aM|0)==(c[aO+8>>2]|0)){fr(aO|0,g);bk=c[g>>2]|0}else{if((aM|0)==0){bl=0}else{c[aM>>2]=aF;bl=c[aN>>2]|0}c[aN>>2]=bl+4;bk=aF}aF=bk;aM=bk;L215:do{if((a[W]&1)==0){aD=D;c[aD>>2]=c[W>>2];c[aD+4>>2]=c[W+4>>2];c[aD+8>>2]=c[W+8>>2];X=193}else{aD=c[U>>2]|0;aC=c[T>>2]|0;do{if(aC>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(aC>>>0<11>>>0){a[D]=aC<<1;bm=D+1|0}else{ax=aC+16&-16;aw=(z=0,av(316,ax|0)|0);if(z){z=0;break}c[D+8>>2]=aw;c[D>>2]=ax|1;c[D+4>>2]=aC;bm=aw}TF(bm|0,aD|0,aC)|0;a[bm+aC|0]=0;X=193;break L215}}while(0);aC=b$(-1,-1)|0;bn=aC;bo=M}}while(0);do{if((X|0)==193){aC=f;c[aC>>2]=c[ah>>2];c[aC+4>>2]=c[ah+4>>2];c[aC+8>>2]=c[ah+8>>2];c[E>>2]=aP;c[E+4>>2]=H;z=0;aq(14,aM|0,D|0,f|0,E|0,0);do{if(!z){aC=bk;c[e>>2]=aC;c[q>>2]=0;aD=c[Y>>2]|0;aw=aD;if((aD|0)==(c[O>>2]|0)){z=0;at(14,K|0,e|0);if(z){z=0;bp=0;break}bq=c[e>>2]|0}else{if((aD|0)==0){br=0}else{c[aw>>2]=aC;br=c[Y>>2]|0}c[Y>>2]=br+4;bq=aC}z=0;at(c[c[_>>2]>>2]|0,n|0,bq|0);if(z){z=0;bp=0;break}if((a[D]&1)==0){$=V;i=d;return $|0}Tw(c[D+8>>2]|0);$=V;i=d;return $|0}else{z=0;bp=1}}while(0);aC=b$(-1,-1)|0;aw=aC;aC=M;if((a[D]&1)==0){if(bp){bn=aw;bo=aC;break}else{ab=aC;ac=aw}ad=ac;ae=0;af=ad;ag=ab;bj(af|0)}else{Tw(c[D+8>>2]|0);if(bp){bn=aw;bo=aC;break}else{ab=aC;ac=aw}ad=ac;ae=0;af=ad;ag=ab;bj(af|0)}}}while(0);aM=c[aO>>2]|0;aw=c[aN>>2]|0;L252:do{if((aM|0)==(aw|0)){bs=aM}else{aC=aM;while(1){aD=aC+4|0;if((c[aC>>2]|0)==(bk|0)){bs=aC;break L252}if((aD|0)==(aw|0)){bs=aw;break}else{aC=aD}}}}while(0);aO=bs-aM>>2;aC=aM+(aO+1<<2)|0;aD=aw-aC|0;TG(aM+(aO<<2)|0,aC|0,aD|0)|0;aC=aM+((aD>>2)+aO<<2)|0;aO=c[aN>>2]|0;if((aC|0)!=(aO|0)){c[aN>>2]=aO+(~((aO-4+(-aC|0)|0)>>>2)<<2)}Tw(aF);ab=bo;ac=bn;ad=ac;ae=0;af=ad;ag=ab;bj(af|0)}else if((X|0)==106){aC=b$(-1,-1)|0;aO=aC;aC=M;if((a[aa]&1)==0){if(a6){bt=aO;bu=aC;break}else{ab=aC;ac=aO}ad=ac;ae=0;af=ad;ag=ab;bj(af|0)}else{Tw(c[L>>2]|0);if(a6){bt=aO;bu=aC;break}else{ab=aC;ac=aO}ad=ac;ae=0;af=ad;ag=ab;bj(af|0)}}else if((X|0)==152){aO=b$(-1,-1)|0;aC=aO;aO=M;if((a[aG]&1)!=0){Tw(c[aL>>2]|0)}aD=c[aH>>2]|0;if((aD|0)==0){bv=aO;bw=aC;X=158;break}ax=c[aJ>>2]|0;if((aD|0)!=(ax|0)){c[aJ>>2]=ax+(~((ax-4+(-aD|0)|0)>>>2)<<2)}Tw(aD);bv=aO;bw=aC;X=158}else if((X|0)==161){L4(0);return 0}else if((X|0)==103){aC=b$(-1,-1)|0;bx=M;by=aC;X=105}else if((X|0)==215){$=V;i=d;return $|0}else if((X|0)==77){z=0;ar(106,0);if(!z){return 0}else{z=0;aC=b$(-1,-1)|0;bx=M;by=aC;X=105;break}}else if((X|0)==151){aC=b$(-1,-1)|0;bv=M;bw=aC;X=158}else if((X|0)==172){aC=b$(-1,-1)|0;bh=M;bi=aC;X=175}}while(0);if((X|0)==175){if((a[ao]&1)==0){ab=bh;ac=bi;ad=ac;ae=0;af=ad;ag=ab;bj(af|0)}Tw(c[ay>>2]|0);ab=bh;ac=bi;ad=ac;ae=0;af=ad;ag=ab;bj(af|0)}else if((X|0)==105){bt=by;bu=bx}else if((X|0)==158){if((a[aE]&1)==0){ab=bv;ac=bw;ad=ac;ae=0;af=ad;ag=ab;bj(af|0)}Tw(c[aI>>2]|0);ab=bv;ac=bw;ad=ac;ae=0;af=ad;ag=ab;bj(af|0)}aJ=c[a0>>2]|0;aH=c[a1>>2]|0;L297:do{if((aJ|0)==(aH|0)){bz=aJ}else{aL=aJ;while(1){aG=aL+4|0;if((c[aL>>2]|0)==(a2|0)){bz=aL;break L297}if((aG|0)==(aH|0)){bz=aH;break}else{aL=aG}}}}while(0);aI=bz-aJ>>2;aE=aJ+(aI+1<<2)|0;ay=aH-aE|0;TG(aJ+(aI<<2)|0,aE|0,ay|0)|0;aE=aJ+((ay>>2)+aI<<2)|0;aI=c[a1>>2]|0;if((aE|0)!=(aI|0)){c[a1>>2]=aI+(~((aI-4+(-aE|0)|0)>>>2)<<2)}Tw(a4);ab=bu;ac=bt;ad=ac;ae=0;af=ad;ag=ab;bj(af|0)}}while(0);bt=c[Q>>2]|0;Q=c[J>>2]|0;L307:do{if((bt|0)==(Q|0)){bA=bt}else{bu=bt;while(1){a4=bu+4|0;if((c[bu>>2]|0)==(V|0)){bA=bu;break L307}if((a4|0)==(Q|0)){bA=Q;break}else{bu=a4}}}}while(0);V=bA-bt>>2;bA=bt+(V+1<<2)|0;bu=Q-bA|0;TG(bt+(V<<2)|0,bA|0,bu|0)|0;bA=bt+((bu>>2)+V<<2)|0;V=c[J>>2]|0;if((bA|0)!=(V|0)){c[J>>2]=V+(~((V-4+(-bA|0)|0)>>>2)<<2)}Tw(R);ab=ai;ac=aj;ad=ac;ae=0;af=ad;ag=ab;bj(af|0);return 0}function Ai(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,as=0,au=0,aw=0,ax=0,ay=0,az=0,aA=0,aB=0,aC=0,aD=0,aE=0,aF=0,aG=0,aH=0,aI=0,aJ=0,aL=0,aM=0,aN=0,aO=0,aP=0,aQ=0,aR=0,aS=0,aT=0,aU=0,aV=0,aW=0,aY=0,aZ=0,a_=0,a$=0,a0=0,a1=0,a2=0,a3=0,a4=0,a5=0,a6=0,a7=0,a8=0,a9=0,ba=0,bb=0,bc=0,bd=0,be=0,bf=0,bg=0,bh=0,bi=0,bk=0,bl=0,bm=0,bn=0,bo=0,bp=0,bq=0,br=0,bs=0,bt=0,bu=0,bv=0,bw=0,bx=0,by=0,bz=0,bA=0,bB=0,bC=0,bD=0;d=i;i=i+384|0;e=d|0;f=d+8|0;g=d+24|0;h=d+32|0;j=d+40|0;k=d+56|0;l=d+64|0;m=d+72|0;n=d+80|0;o=d+96|0;p=d+104|0;q=d+112|0;r=d+128|0;s=d+136|0;t=d+144|0;u=d+160|0;v=d+168|0;w=d+184|0;x=d+192|0;y=d+208|0;A=d+224|0;B=d+240|0;C=d+256|0;D=d+272|0;E=d+288|0;F=d+304|0;G=d+320|0;H=d+336|0;I=d+352|0;J=d+368|0;K=b|0;L=c[K>>2]|0;N=Tu(68)|0;c[w>>2]=N;O=L+4|0;P=c[O>>2]|0;if((P|0)==(c[L+8>>2]|0)){fr(L|0,w);Q=c[w>>2]|0}else{if((P|0)==0){R=0}else{c[P>>2]=N;R=c[O>>2]|0}c[O>>2]=R+4;Q=N}N=Q;R=b+28|0;L8:do{if((a[R]&1)==0){P=x;c[P>>2]=c[R>>2];c[P+4>>2]=c[R+4>>2];c[P+8>>2]=c[R+8>>2];S=16}else{P=c[b+36>>2]|0;w=c[b+32>>2]|0;do{if(w>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(w>>>0<11>>>0){a[x]=w<<1;T=x+1|0}else{U=w+16&-16;V=(z=0,av(316,U|0)|0);if(z){z=0;break}c[x+8>>2]=V;c[x>>2]=U|1;c[x+4>>2]=w;T=V}TF(T|0,P|0,w)|0;a[T+w|0]=0;S=16;break L8}}while(0);w=b$(-1,-1)|0;W=M;X=w}}while(0);do{if((S|0)==16){T=b+44|0;w=v;c[w>>2]=c[T>>2];c[w+4>>2]=c[T+4>>2];c[w+8>>2]=c[T+8>>2];z=0;aK(14,Q|0,x|0,v|0,3,0,0,0);if(z){z=0;w=b$(-1,-1)|0;P=w;w=M;if((a[x]&1)==0){W=w;X=P;break}Tw(c[x+8>>2]|0);W=w;X=P;break}if((a[x]&1)!=0){Tw(c[x+8>>2]|0)}L30:do{if((zc(b)|0)==0){AD(b)|0;P=Q+40|0;w=P;V=c[K>>2]|0;U=Tu(68)|0;c[r>>2]=U;Y=V+4|0;Z=c[Y>>2]|0;if((Z|0)==(c[V+8>>2]|0)){fr(V|0,r);_=c[r>>2]|0}else{if((Z|0)==0){$=0}else{c[Z>>2]=U;$=c[Y>>2]|0}c[Y>>2]=$+4;_=U}U=_;L39:do{if((a[R]&1)==0){Z=D;c[Z>>2]=c[R>>2];c[Z+4>>2]=c[R+4>>2];c[Z+8>>2]=c[R+8>>2];S=97}else{Z=c[b+36>>2]|0;aa=c[b+32>>2]|0;do{if(aa>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(aa>>>0<11>>>0){a[D]=aa<<1;ab=D+1|0}else{ac=aa+16&-16;ad=(z=0,av(316,ac|0)|0);if(z){z=0;break}c[D+8>>2]=ad;c[D>>2]=ac|1;c[D+4>>2]=aa;ab=ad}TF(ab|0,Z|0,aa)|0;a[ab+aa|0]=0;S=97;break L39}}while(0);aa=b$(-1,-1)|0;ae=aa;af=M}}while(0);do{if((S|0)==97){aa=q;c[aa>>2]=c[T>>2];c[aa+4>>2]=c[T+4>>2];c[aa+8>>2]=c[T+8>>2];z=0;aq(14,_|0,D|0,q|0,b+56|0,0);do{if(!z){aa=_;c[p>>2]=aa;c[P+16>>2]=0;Z=P+8|0;ad=c[Z>>2]|0;ac=ad;if((ad|0)==(c[P+12>>2]|0)){z=0;at(14,P+4|0,p|0);if(z){z=0;ag=0;break}ah=c[p>>2]|0}else{if((ad|0)==0){ai=0}else{c[ac>>2]=aa;ai=c[Z>>2]|0}c[Z>>2]=ai+4;ah=aa}z=0;at(c[c[P>>2]>>2]|0,w|0,ah|0);if(z){z=0;ag=0;break}if((a[D]&1)==0){break L30}Tw(c[D+8>>2]|0);break L30}else{z=0;ag=1}}while(0);aa=b$(-1,-1)|0;Z=aa;aa=M;if((a[D]&1)==0){if(ag){ae=Z;af=aa;break}else{aj=aa;ak=Z}al=ak;am=0;an=al;ao=aj;bj(an|0)}else{Tw(c[D+8>>2]|0);if(ag){ae=Z;af=aa;break}else{aj=aa;ak=Z}al=ak;am=0;an=al;ao=aj;bj(an|0)}}}while(0);w=c[V>>2]|0;P=c[Y>>2]|0;L73:do{if((w|0)==(P|0)){ap=w}else{Z=w;while(1){aa=Z+4|0;if((c[Z>>2]|0)==(_|0)){ap=Z;break L73}if((aa|0)==(P|0)){ap=P;break}else{Z=aa}}}}while(0);V=ap-w>>2;Z=w+(V+1<<2)|0;aa=P-Z|0;TG(w+(V<<2)|0,Z|0,aa|0)|0;Z=w+((aa>>2)+V<<2)|0;V=c[Y>>2]|0;if((Z|0)!=(V|0)){c[Y>>2]=V+(~((V-4+(-Z|0)|0)>>>2)<<2)}Tw(U);aj=af;ak=ae;al=ak;am=0;an=al;ao=aj;bj(an|0)}else{Z=Q+40|0;V=Z;aa=c[K>>2]|0;ac=Tu(48)|0;c[u>>2]=ac;ad=aa+4|0;as=c[ad>>2]|0;if((as|0)==(c[aa+8>>2]|0)){fr(aa|0,u);au=c[u>>2]|0}else{if((as|0)==0){aw=0}else{c[as>>2]=ac;aw=c[ad>>2]|0}c[ad>>2]=aw+4;au=ac}ac=au;as=au;L90:do{if((a[R]&1)==0){ax=y;c[ax>>2]=c[R>>2];c[ax+4>>2]=c[R+4>>2];c[ax+8>>2]=c[R+8>>2];S=35}else{ax=c[b+36>>2]|0;ay=c[b+32>>2]|0;do{if(ay>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(ay>>>0<11>>>0){a[y]=ay<<1;az=y+1|0}else{aA=ay+16&-16;aB=(z=0,av(316,aA|0)|0);if(z){z=0;break}c[y+8>>2]=aB;c[y>>2]=aA|1;c[y+4>>2]=ay;az=aB}TF(az|0,ax|0,ay)|0;a[az+ay|0]=0;S=35;break L90}}while(0);ay=b$(-1,-1)|0;aC=ay;aD=M}}while(0);do{if((S|0)==35){U=A;c[U>>2]=c[T>>2];c[U+4>>2]=c[T+4>>2];c[U+8>>2]=c[T+8>>2];Y=c[b+56>>2]|0;w=(c[b+60>>2]|0)-Y|0;do{if(w>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;S=67;break}return 0}else{if(w>>>0<11>>>0){a[C]=w<<1;aE=C+1|0}else{P=w+16&-16;ay=(z=0,av(316,P|0)|0);if(z){z=0;S=67;break}c[C+8>>2]=ay;c[C>>2]=P|1;c[C+4>>2]=w;aE=ay}TF(aE|0,Y|0,w)|0;a[aE+w|0]=0;z=0;at(74,B|0,C|0);do{if(!z){ay=t;c[ay>>2]=c[U>>2];c[ay+4>>2]=c[U+4>>2];c[ay+8>>2]=c[U+8>>2];z=0;aX(2,as|0,y|0,t|0,B|0);do{if(!z){ay=au;c[s>>2]=ay;c[Z+16>>2]=0;P=Z+8|0;ax=c[P>>2]|0;aB=ax;if((ax|0)==(c[Z+12>>2]|0)){z=0;at(14,Z+4|0,s|0);if(z){z=0;aF=0;break}aG=c[s>>2]|0}else{if((ax|0)==0){aH=0}else{c[aB>>2]=ay;aH=c[P>>2]|0}c[P>>2]=aH+4;aG=ay}z=0;at(c[c[Z>>2]>>2]|0,V|0,aG|0);if(z){z=0;aF=0;break}if((a[B]&1)!=0){Tw(c[B+8>>2]|0)}if((a[C]&1)!=0){Tw(c[C+8>>2]|0)}if((a[y]&1)==0){break L30}Tw(c[y+8>>2]|0);break L30}else{z=0;aF=1}}while(0);ay=b$(-1,-1)|0;P=ay;ay=M;if((a[B]&1)==0){aI=aF;aJ=ay;aL=P;break}Tw(c[B+8>>2]|0);aI=aF;aJ=ay;aL=P}else{z=0;P=b$(-1,-1)|0;aI=1;aJ=M;aL=P}}while(0);if((a[C]&1)==0){aM=aI;aN=aJ;aO=aL;break}Tw(c[C+8>>2]|0);aM=aI;aN=aJ;aO=aL}}while(0);if((S|0)==67){U=b$(-1,-1)|0;aM=1;aN=M;aO=U}if((a[y]&1)==0){if(aM){aC=aO;aD=aN;break}else{aj=aN;ak=aO}al=ak;am=0;an=al;ao=aj;bj(an|0)}else{Tw(c[y+8>>2]|0);if(aM){aC=aO;aD=aN;break}else{aj=aN;ak=aO}al=ak;am=0;an=al;ao=aj;bj(an|0)}}}while(0);V=c[aa>>2]|0;Z=c[ad>>2]|0;L148:do{if((V|0)==(Z|0)){aP=V}else{as=V;while(1){U=as+4|0;if((c[as>>2]|0)==(au|0)){aP=as;break L148}if((U|0)==(Z|0)){aP=Z;break}else{as=U}}}}while(0);aa=aP-V>>2;as=V+(aa+1<<2)|0;U=Z-as|0;TG(V+(aa<<2)|0,as|0,U|0)|0;as=V+((U>>2)+aa<<2)|0;aa=c[ad>>2]|0;if((as|0)!=(aa|0)){c[ad>>2]=aa+(~((aa-4+(-as|0)|0)>>>2)<<2)}Tw(ac);aj=aD;ak=aC;al=ak;am=0;an=al;ao=aj;bj(an|0)}}while(0);as=b+20|0;aa=Ej(c[as>>2]|0)|0;U=(a[aa]|0)==61?aa+1|0:0;if((U|0)!=0){w=b+48|0;Y=c[w>>2]|0;P=c[as>>2]|0;L160:do{if(P>>>0<U>>>0){ay=P;aB=0;while(1){ax=a[ay]|0;if((ax<<24>>24|0)==10){aQ=aB+1|0}else if((ax<<24>>24|0)==0){aR=aB;break L160}else{aQ=aB}ax=ay+1|0;if(ax>>>0<U>>>0){ay=ax;aB=aQ}else{aR=aQ;break}}}else{aR=0}}while(0);c[w>>2]=aR+Y;aB=aa-1|0;L167:do{if(aB>>>0<P>>>0){aS=0}else{ay=0;ac=aB;while(1){ad=ay+1|0;if((a[ac]|0)==10){aS=ay;break L167}V=ac-1|0;if(V>>>0<P>>>0){aS=ad;break}else{ay=ad;ac=V}}}}while(0);P=b+40|0;if((aR|0)==0){aT=c[P>>2]|0}else{c[P>>2]=1;aT=1}c[b+52>>2]=aT+aS;aB=U;Y=aa;c[P>>2]=aB-Y+aS+aT;P=b+56|0;c[P>>2]=Y;c[P+4>>2]=aB;c[as>>2]=U}aB=Q+40|0;P=aB;Y=c[K>>2]|0;w=Tu(68)|0;c[o>>2]=w;ac=Y+4|0;ay=c[ac>>2]|0;if((ay|0)==(c[Y+8>>2]|0)){fr(Y|0,o);aU=c[o>>2]|0}else{if((ay|0)==0){aV=0}else{c[ay>>2]=w;aV=c[ac>>2]|0}c[ac>>2]=aV+4;aU=w}w=aU;L184:do{if((a[R]&1)==0){ay=E;c[ay>>2]=c[R>>2];c[ay+4>>2]=c[R+4>>2];c[ay+8>>2]=c[R+8>>2];S=144}else{ay=c[b+36>>2]|0;V=c[b+32>>2]|0;do{if(V>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(V>>>0<11>>>0){a[E]=V<<1;aW=E+1|0}else{ad=V+16&-16;Z=(z=0,av(316,ad|0)|0);if(z){z=0;break}c[E+8>>2]=Z;c[E>>2]=ad|1;c[E+4>>2]=V;aW=Z}TF(aW|0,ay|0,V)|0;a[aW+V|0]=0;S=144;break L184}}while(0);V=b$(-1,-1)|0;aY=V;aZ=M}}while(0);do{if((S|0)==144){U=n;c[U>>2]=c[T>>2];c[U+4>>2]=c[T+4>>2];c[U+8>>2]=c[T+8>>2];U=b+56|0;z=0;aq(14,aU|0,E|0,n|0,U|0,0);do{if(!z){aa=aU;c[m>>2]=aa;V=aB+16|0;c[V>>2]=0;ay=aB+8|0;Z=c[ay>>2]|0;ad=Z;ax=aB+12|0;if((Z|0)==(c[ax>>2]|0)){z=0;at(14,aB+4|0,m|0);if(z){z=0;a_=0;break}a$=c[m>>2]|0}else{if((Z|0)==0){a0=0}else{c[ad>>2]=aa;a0=c[ay>>2]|0}c[ay>>2]=a0+4;a$=aa}z=0;at(c[c[aB>>2]>>2]|0,P|0,a$|0);if(z){z=0;a_=0;break}if((a[E]&1)!=0){Tw(c[E+8>>2]|0)}if((Fj(Ej(c[as>>2]|0)|0)|0)!=0){aa=zZ(b)|0;c[l>>2]=aa;c[V>>2]=0;ad=c[ay>>2]|0;Z=ad;if((ad|0)==(c[ax>>2]|0)){fL(aB+4|0,l);a1=c[l>>2]|0}else{if((ad|0)==0){a2=0}else{c[Z>>2]=aa;a2=c[ay>>2]|0}c[ay>>2]=a2+4;a1=aa}cK[c[c[aB>>2]>>2]&1023](P,a1);a3=Q;i=d;return a3|0}if((zy(b)|0)==0){AE(b)|0;aa=c[K>>2]|0;Z=Tu(68)|0;c[g>>2]=Z;ad=aa+4|0;aA=c[ad>>2]|0;if((aA|0)==(c[aa+8>>2]|0)){fr(aa|0,g);a4=c[g>>2]|0}else{if((aA|0)==0){a5=0}else{c[aA>>2]=Z;a5=c[ad>>2]|0}c[ad>>2]=a5+4;a4=Z}Z=a4;L233:do{if((a[R]&1)==0){aA=J;c[aA>>2]=c[R>>2];c[aA+4>>2]=c[R+4>>2];c[aA+8>>2]=c[R+8>>2];S=240}else{aA=c[b+36>>2]|0;a6=c[b+32>>2]|0;do{if(a6>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(a6>>>0<11>>>0){a[J]=a6<<1;a7=J+1|0}else{a8=a6+16&-16;a9=(z=0,av(316,a8|0)|0);if(z){z=0;break}c[J+8>>2]=a9;c[J>>2]=a8|1;c[J+4>>2]=a6;a7=a9}TF(a7|0,aA|0,a6)|0;a[a7+a6|0]=0;S=240;break L233}}while(0);a6=b$(-1,-1)|0;ba=a6;bb=M}}while(0);do{if((S|0)==240){a6=f;c[a6>>2]=c[T>>2];c[a6+4>>2]=c[T+4>>2];c[a6+8>>2]=c[T+8>>2];z=0;aq(14,a4|0,J|0,f|0,U|0,0);do{if(!z){a6=a4;c[e>>2]=a6;c[V>>2]=0;aA=c[ay>>2]|0;a9=aA;if((aA|0)==(c[ax>>2]|0)){z=0;at(14,aB+4|0,e|0);if(z){z=0;bc=0;break}bd=c[e>>2]|0}else{if((aA|0)==0){be=0}else{c[a9>>2]=a6;be=c[ay>>2]|0}c[ay>>2]=be+4;bd=a6}z=0;at(c[c[aB>>2]>>2]|0,P|0,bd|0);if(z){z=0;bc=0;break}if((a[J]&1)==0){a3=Q;i=d;return a3|0}Tw(c[J+8>>2]|0);a3=Q;i=d;return a3|0}else{z=0;bc=1}}while(0);a6=b$(-1,-1)|0;a9=a6;a6=M;if((a[J]&1)==0){if(bc){ba=a9;bb=a6;break}else{aj=a6;ak=a9}al=ak;am=0;an=al;ao=aj;bj(an|0)}else{Tw(c[J+8>>2]|0);if(bc){ba=a9;bb=a6;break}else{aj=a6;ak=a9}al=ak;am=0;an=al;ao=aj;bj(an|0)}}}while(0);a9=c[aa>>2]|0;a6=c[ad>>2]|0;L270:do{if((a9|0)==(a6|0)){bf=a9}else{aA=a9;while(1){a8=aA+4|0;if((c[aA>>2]|0)==(a4|0)){bf=aA;break L270}if((a8|0)==(a6|0)){bf=a6;break}else{aA=a8}}}}while(0);aa=bf-a9>>2;aA=a9+(aa+1<<2)|0;a8=a6-aA|0;TG(a9+(aa<<2)|0,aA|0,a8|0)|0;aA=a9+((a8>>2)+aa<<2)|0;aa=c[ad>>2]|0;if((aA|0)!=(aa|0)){c[ad>>2]=aa+(~((aa-4+(-aA|0)|0)>>>2)<<2)}Tw(Z);aj=bb;ak=ba;al=ak;am=0;an=al;ao=aj;bj(an|0)}aA=c[K>>2]|0;aa=Tu(56)|0;c[k>>2]=aa;a8=aA+4|0;bg=c[a8>>2]|0;if((bg|0)==(c[aA+8>>2]|0)){fr(aA|0,k);bh=c[k>>2]|0}else{if((bg|0)==0){bi=0}else{c[bg>>2]=aa;bi=c[a8>>2]|0}c[a8>>2]=bi+4;bh=aa}aa=bh;bg=bh;L287:do{if((a[R]&1)==0){bk=F;c[bk>>2]=c[R>>2];c[bk+4>>2]=c[R+4>>2];c[bk+8>>2]=c[R+8>>2];S=187}else{bk=c[b+36>>2]|0;bl=c[b+32>>2]|0;do{if(bl>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(bl>>>0<11>>>0){a[F]=bl<<1;bm=F+1|0}else{bn=bl+16&-16;bo=(z=0,av(316,bn|0)|0);if(z){z=0;break}c[F+8>>2]=bo;c[F>>2]=bn|1;c[F+4>>2]=bl;bm=bo}TF(bm|0,bk|0,bl)|0;a[bm+bl|0]=0;S=187;break L287}}while(0);bl=b$(-1,-1)|0;bp=bl;bq=M}}while(0);do{if((S|0)==187){Z=G;c[Z>>2]=c[T>>2];c[Z+4>>2]=c[T+4>>2];c[Z+8>>2]=c[T+8>>2];ad=c[U>>2]|0;a9=(c[b+60>>2]|0)-ad|0;do{if(a9>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;S=210;break}return 0}else{if(a9>>>0<11>>>0){a[I]=a9<<1;br=I+1|0}else{a6=a9+16&-16;bl=(z=0,av(316,a6|0)|0);if(z){z=0;S=210;break}c[I+8>>2]=bl;c[I>>2]=a6|1;c[I+4>>2]=a9;br=bl}TF(br|0,ad|0,a9)|0;a[br+a9|0]=0;z=0;at(856,H|0,I|0);do{if(!z){bl=j;c[bl>>2]=c[Z>>2];c[bl+4>>2]=c[Z+4>>2];c[bl+8>>2]=c[Z+8>>2];z=0;aq(44,bg|0,F|0,j|0,0,H|0);do{if(!z){bl=bh;c[h>>2]=bl;c[V>>2]=0;a6=c[ay>>2]|0;bk=a6;if((a6|0)==(c[ax>>2]|0)){z=0;at(14,aB+4|0,h|0);if(z){z=0;bs=0;break}bt=c[h>>2]|0}else{if((a6|0)==0){bu=0}else{c[bk>>2]=bl;bu=c[ay>>2]|0}c[ay>>2]=bu+4;bt=bl}z=0;at(c[c[aB>>2]>>2]|0,P|0,bt|0);if(z){z=0;bs=0;break}if((a[H]&1)!=0){Tw(c[H+8>>2]|0)}if((a[I]&1)!=0){Tw(c[I+8>>2]|0)}if((a[F]&1)==0){a3=Q;i=d;return a3|0}Tw(c[F+8>>2]|0);a3=Q;i=d;return a3|0}else{z=0;bs=1}}while(0);bl=b$(-1,-1)|0;bk=bl;bl=M;if((a[H]&1)==0){bv=bs;bw=bl;bx=bk;break}Tw(c[H+8>>2]|0);bv=bs;bw=bl;bx=bk}else{z=0;bk=b$(-1,-1)|0;bv=1;bw=M;bx=bk}}while(0);if((a[I]&1)==0){by=bv;bz=bw;bA=bx;break}Tw(c[I+8>>2]|0);by=bv;bz=bw;bA=bx}}while(0);if((S|0)==210){Z=b$(-1,-1)|0;by=1;bz=M;bA=Z}if((a[F]&1)==0){if(by){bp=bA;bq=bz;break}else{aj=bz;ak=bA}al=ak;am=0;an=al;ao=aj;bj(an|0)}else{Tw(c[F+8>>2]|0);if(by){bp=bA;bq=bz;break}else{aj=bz;ak=bA}al=ak;am=0;an=al;ao=aj;bj(an|0)}}}while(0);ay=c[aA>>2]|0;ax=c[a8>>2]|0;L348:do{if((ay|0)==(ax|0)){bB=ay}else{V=ay;while(1){bg=V+4|0;if((c[V>>2]|0)==(bh|0)){bB=V;break L348}if((bg|0)==(ax|0)){bB=ax;break}else{V=bg}}}}while(0);aA=bB-ay>>2;V=ay+(aA+1<<2)|0;bg=ax-V|0;TG(ay+(aA<<2)|0,V|0,bg|0)|0;V=ay+((bg>>2)+aA<<2)|0;aA=c[a8>>2]|0;if((V|0)!=(aA|0)){c[a8>>2]=aA+(~((aA-4+(-V|0)|0)>>>2)<<2)}Tw(aa);aj=bq;ak=bp;al=ak;am=0;an=al;ao=aj;bj(an|0)}else{z=0;a_=1}}while(0);U=b$(-1,-1)|0;V=U;U=M;if((a[E]&1)==0){if(a_){aY=V;aZ=U;break}else{aj=U;ak=V}al=ak;am=0;an=al;ao=aj;bj(an|0)}else{Tw(c[E+8>>2]|0);if(a_){aY=V;aZ=U;break}else{aj=U;ak=V}al=ak;am=0;an=al;ao=aj;bj(an|0)}}}while(0);P=c[Y>>2]|0;aB=c[ac>>2]|0;L364:do{if((P|0)==(aB|0)){bC=P}else{T=P;while(1){as=T+4|0;if((c[T>>2]|0)==(aU|0)){bC=T;break L364}if((as|0)==(aB|0)){bC=aB;break}else{T=as}}}}while(0);Y=bC-P>>2;T=P+(Y+1<<2)|0;as=aB-T|0;TG(P+(Y<<2)|0,T|0,as|0)|0;T=P+((as>>2)+Y<<2)|0;Y=c[ac>>2]|0;if((T|0)!=(Y|0)){c[ac>>2]=Y+(~((Y-4+(-T|0)|0)>>>2)<<2)}Tw(w);aj=aZ;ak=aY;al=ak;am=0;an=al;ao=aj;bj(an|0)}}while(0);aY=c[L>>2]|0;L=c[O>>2]|0;L374:do{if((aY|0)==(L|0)){bD=aY}else{aZ=aY;while(1){bC=aZ+4|0;if((c[aZ>>2]|0)==(Q|0)){bD=aZ;break L374}if((bC|0)==(L|0)){bD=L;break}else{aZ=bC}}}}while(0);Q=bD-aY>>2;bD=aY+(Q+1<<2)|0;aZ=L-bD|0;TG(aY+(Q<<2)|0,bD|0,aZ|0)|0;bD=aY+((aZ>>2)+Q<<2)|0;Q=c[O>>2]|0;if((bD|0)!=(Q|0)){c[O>>2]=Q+(~((Q-4+(-bD|0)|0)>>>2)<<2)}Tw(N);aj=W;ak=X;al=ak;am=0;an=al;ao=aj;bj(an|0);return 0}function Aj(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,as=0,au=0,aw=0,ax=0,ay=0,az=0,aA=0,aB=0,aC=0,aD=0,aE=0,aF=0,aG=0,aH=0,aI=0,aJ=0,aL=0,aM=0,aN=0,aP=0,aQ=0,aR=0,aS=0,aU=0;d=i;i=i+248|0;e=d|0;f=d+16|0;g=d+24|0;h=d+32|0;j=d+48|0;k=d+56|0;l=d+72|0;m=d+80|0;n=d+112|0;o=d+128|0;p=d+144|0;q=d+160|0;r=d+168|0;s=d+184|0;t=d+200|0;u=d+216|0;v=d+232|0;y8(b)|0;w=b+56|0;x=c[w>>2]|0;y=(c[b+60>>2]|0)-x|0;if(y>>>0>4294967279>>>0){L4(0);return 0}if(y>>>0<11>>>0){A=y<<1&255;a[m]=A;B=m+1|0;C=A}else{A=y+16&-16;D=Tu(A)|0;c[m+8>>2]=D;E=A|1;c[m>>2]=E;c[m+4>>2]=y;B=D;C=E&255}TF(B|0,x|0,y)|0;a[B+y|0]=0;y=d+96|0;B=b+44|0;c[y>>2]=c[B>>2];c[y+4>>2]=c[B+4>>2];c[y+8>>2]=c[B+8>>2];x=b+20|0;E=(z=0,av(76,c[x>>2]|0)|0);L8:do{if(!z){D=(a[E]|0)==40?E+1|0:0;if((D|0)==0){F=c[x>>2]|0}else{A=b+48|0;G=c[A>>2]|0;H=c[x>>2]|0;L13:do{if(H>>>0<D>>>0){I=H;J=0;while(1){K=a[I]|0;if((K<<24>>24|0)==0){L=J;break L13}else if((K<<24>>24|0)==10){N=J+1|0}else{N=J}K=I+1|0;if(K>>>0<D>>>0){I=K;J=N}else{L=N;break}}}else{L=0}}while(0);c[A>>2]=L+G;J=E-1|0;L20:do{if(J>>>0<H>>>0){O=0}else{I=0;K=J;while(1){P=I+1|0;if((a[K]|0)==10){O=I;break L20}Q=K-1|0;if(Q>>>0<H>>>0){O=P;break}else{I=P;K=Q}}}}while(0);H=b+40|0;if((L|0)==0){R=c[H>>2]|0}else{c[H>>2]=1;R=1}c[b+52>>2]=R+O;J=D;G=E;c[H>>2]=J-G+O+R;H=w;c[H>>2]=G;c[H+4>>2]=J;c[x>>2]=D;F=D}J=n;c[J>>2]=c[B>>2];c[J+4>>2]=c[B+4>>2];c[J+8>>2]=c[B+8>>2];z=0,av(226,b|0)|0;if(z){z=0;S=119;break}H=c[x>>2]|0;G=(z=0,av(76,H|0)|0);if(z){z=0;S=119;break}A=(a[G]|0)==41?G+1|0:0;if((A|0)!=0){K=b+48|0;I=c[K>>2]|0;Q=c[x>>2]|0;L34:do{if(Q>>>0<A>>>0){P=Q;T=0;while(1){U=a[P]|0;if((U<<24>>24|0)==10){V=T+1|0}else if((U<<24>>24|0)==0){W=T;break L34}else{V=T}U=P+1|0;if(U>>>0<A>>>0){P=U;T=V}else{W=V;break}}}else{W=0}}while(0);c[K>>2]=W+I;D=G-1|0;L41:do{if(D>>>0<Q>>>0){X=0}else{T=0;P=D;while(1){U=T+1|0;if((a[P]|0)==10){X=T;break L41}Y=P-1|0;if(Y>>>0<Q>>>0){X=U;break}else{T=U;P=Y}}}}while(0);Q=b+40|0;if((W|0)==0){Z=c[Q>>2]|0}else{c[Q>>2]=1;Z=1}c[b+52>>2]=Z+X;D=A;I=G;c[Q>>2]=D-I+X+Z;Q=w;c[Q>>2]=I;c[Q+4>>2]=D;c[x>>2]=A}D=b|0;Q=c[D>>2]|0;I=(z=0,av(316,60)|0);if(z){z=0;S=119;break}K=I;c[l>>2]=K;I=Q+4|0;P=c[I>>2]|0;if((P|0)==(c[Q+8>>2]|0)){z=0;at(498,Q|0,l|0);if(z){z=0;S=119;break}_=c[l>>2]|0}else{if((P|0)==0){$=0}else{c[P>>2]=K;$=c[I>>2]|0}c[I>>2]=$+4;_=K}K=_;P=_;T=b+28|0;L60:do{if((a[T]&1)==0){Y=o;c[Y>>2]=c[T>>2];c[Y+4>>2]=c[T+4>>2];c[Y+8>>2]=c[T+8>>2];S=51}else{Y=c[b+36>>2]|0;U=c[b+32>>2]|0;do{if(U>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(U>>>0<11>>>0){a[o]=U<<1;aa=o+1|0}else{ab=U+16&-16;ac=(z=0,av(316,ab|0)|0);if(z){z=0;break}c[o+8>>2]=ac;c[o>>2]=ab|1;c[o+4>>2]=U;aa=ac}TF(aa|0,Y|0,U)|0;a[aa+U|0]=0;S=51;break L60}}while(0);U=b$(-1,-1)|0;ad=U;ae=M}}while(0);do{if((S|0)==51){A=p;c[A>>2]=c[J>>2];c[A+4>>2]=c[J+4>>2];c[A+8>>2]=c[J+8>>2];c[q>>2]=F;c[q+4>>2]=H;G=(z=0,aO(572,b|0,q|0)|0);do{if(!z){U=r;a[U]=0;a[r+1|0]=0;Y=k;c[Y>>2]=c[A>>2];c[Y+4>>2]=c[A+4>>2];c[Y+8>>2]=c[A+8>>2];z=0;aK(60,P|0,o|0,k|0,G|0,r|0,0,0);if(z){z=0;Y=b$(-1,-1)|0;ac=Y;Y=M;if((a[U]&1)==0){af=ac;ag=Y;break}Tw(c[r+8>>2]|0);af=ac;ag=Y;break}if((a[U]&1)!=0){Tw(c[r+8>>2]|0)}if((a[o]&1)!=0){Tw(c[o+8>>2]|0)}U=c[D>>2]|0;Y=(z=0,av(316,60)|0);if(z){z=0;S=119;break L8}ac=Y;c[j>>2]=ac;Y=U+4|0;ab=c[Y>>2]|0;if((ab|0)==(c[U+8>>2]|0)){z=0;at(498,U|0,j|0);if(z){z=0;S=119;break L8}ah=c[j>>2]|0}else{if((ab|0)==0){ai=0}else{c[ab>>2]=ac;ai=c[Y>>2]|0}c[Y>>2]=ai+4;ah=ac}ac=ah;ab=ah;L96:do{if((a[T]&1)==0){aj=s;c[aj>>2]=c[T>>2];c[aj+4>>2]=c[T+4>>2];c[aj+8>>2]=c[T+8>>2];S=74}else{aj=c[b+36>>2]|0;ak=c[b+32>>2]|0;do{if(ak>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(ak>>>0<11>>>0){a[s]=ak<<1;al=s+1|0}else{am=ak+16&-16;an=(z=0,av(316,am|0)|0);if(z){z=0;break}c[s+8>>2]=an;c[s>>2]=am|1;c[s+4>>2]=ak;al=an}TF(al|0,aj|0,ak)|0;a[al+ak|0]=0;S=74;break L96}}while(0);ak=b$(-1,-1)|0;ao=ak;ap=M}}while(0);do{if((S|0)==74){ak=h;c[ak>>2]=c[J>>2];c[ak+4>>2]=c[J+4>>2];c[ak+8>>2]=c[J+8>>2];z=0;aT(48,ab|0,s|0,h|0);if(z){z=0;ak=b$(-1,-1)|0;aj=ak;ak=M;if((a[s]&1)==0){ao=aj;ap=ak;break}Tw(c[s+8>>2]|0);ao=aj;ap=ak;break}if((a[s]&1)!=0){Tw(c[s+8>>2]|0)}ak=ah+36|0;aj=ak;c[g>>2]=P;c[ak+16>>2]=0;an=ak+8|0;am=an;as=c[am>>2]|0;if((as|0)==(c[ak+12>>2]|0)){z=0;at(924,ak+4|0,g|0);if(z){z=0;S=119;break L8}au=c[g>>2]|0}else{if((as|0)==0){aw=0}else{c[as>>2]=P;aw=c[am>>2]|0}c[an>>2]=aw+4;au=P}z=0;at(c[c[ak>>2]>>2]|0,aj|0,au|0);if(z){z=0;S=119;break L8}aj=c[D>>2]|0;ak=(z=0,av(316,60)|0);if(z){z=0;S=119;break L8}an=ak;c[f>>2]=an;ak=aj+4|0;am=c[ak>>2]|0;if((am|0)==(c[aj+8>>2]|0)){z=0;at(498,aj|0,f|0);if(z){z=0;S=119;break L8}ax=c[f>>2]|0}else{if((am|0)==0){ay=0}else{c[am>>2]=an;ay=c[ak>>2]|0}c[ak>>2]=ay+4;ax=an}an=ax;am=ax;L136:do{if((a[T]&1)==0){as=t;c[as>>2]=c[T>>2];c[as+4>>2]=c[T+4>>2];c[as+8>>2]=c[T+8>>2];S=101}else{as=c[b+36>>2]|0;az=c[b+32>>2]|0;do{if(az>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(az>>>0<11>>>0){a[t]=az<<1;aA=t+1|0}else{aB=az+16&-16;aC=(z=0,av(316,aB|0)|0);if(z){z=0;break}c[t+8>>2]=aC;c[t>>2]=aB|1;c[t+4>>2]=az;aA=aC}TF(aA|0,as|0,az)|0;a[aA+az|0]=0;S=101;break L136}}while(0);az=b$(-1,-1)|0;aD=az;aE=M}}while(0);do{if((S|0)==101){az=u;c[az>>2]=c[y>>2];c[az+4>>2]=c[y+4>>2];c[az+8>>2]=c[y+8>>2];L151:do{if((C&1)==0){as=m;aC=v;c[aC>>2]=c[as>>2];c[aC+4>>2]=c[as+4>>2];c[aC+8>>2]=c[as+8>>2];S=111}else{as=c[m+8>>2]|0;aC=c[m+4>>2]|0;do{if(aC>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(aC>>>0<11>>>0){a[v]=aC<<1;aF=v+1|0}else{aB=aC+16&-16;aG=(z=0,av(316,aB|0)|0);if(z){z=0;break}c[v+8>>2]=aG;c[v>>2]=aB|1;c[v+4>>2]=aC;aF=aG}TF(aF|0,as|0,aC)|0;a[aF+aC|0]=0;S=111;break L151}}while(0);aC=b$(-1,-1)|0;aH=aC;aI=M}}while(0);do{if((S|0)==111){aC=e;c[aC>>2]=c[az>>2];c[aC+4>>2]=c[az+4>>2];c[aC+8>>2]=c[az+8>>2];z=0;aq(12,am|0,t|0,e|0,v|0,ab|0);if(z){z=0;aC=b$(-1,-1)|0;as=aC;aC=M;if((a[v]&1)==0){aH=as;aI=aC;break}Tw(c[v+8>>2]|0);aH=as;aI=aC;break}if((a[v]&1)!=0){Tw(c[v+8>>2]|0)}if((a[t]&1)!=0){Tw(c[t+8>>2]|0)}if((C&1)==0){i=d;return am|0}Tw(c[m+8>>2]|0);i=d;return am|0}}while(0);if((a[t]&1)==0){aD=aH;aE=aI;break}Tw(c[t+8>>2]|0);aD=aH;aE=aI}}while(0);am=c[aj>>2]|0;az=c[ak>>2]|0;L183:do{if((am|0)==(az|0)){aJ=am}else{aC=am;while(1){as=aC+4|0;if((c[aC>>2]|0)==(ax|0)){aJ=aC;break L183}if((as|0)==(az|0)){aJ=az;break}else{aC=as}}}}while(0);aj=aJ-am>>2;aC=am+(aj+1<<2)|0;as=az-aC|0;TG(am+(aj<<2)|0,aC|0,as|0)|0;aC=am+((as>>2)+aj<<2)|0;aj=c[ak>>2]|0;if((aC|0)!=(aj|0)){c[ak>>2]=aj+(~((aj-4+(-aC|0)|0)>>>2)<<2)}Tw(an);aL=aD;aM=aE;break L8}}while(0);ab=c[U>>2]|0;aC=c[Y>>2]|0;L192:do{if((ab|0)==(aC|0)){aN=ab}else{aj=ab;while(1){as=aj+4|0;if((c[aj>>2]|0)==(ah|0)){aN=aj;break L192}if((as|0)==(aC|0)){aN=aC;break}else{aj=as}}}}while(0);U=aN-ab>>2;aj=ab+(U+1<<2)|0;an=aC-aj|0;TG(ab+(U<<2)|0,aj|0,an|0)|0;aj=ab+((an>>2)+U<<2)|0;U=c[Y>>2]|0;if((aj|0)!=(U|0)){c[Y>>2]=U+(~((U-4+(-aj|0)|0)>>>2)<<2)}Tw(ac);aL=ao;aM=ap;break L8}else{z=0;aj=b$(-1,-1)|0;af=aj;ag=M}}while(0);if((a[o]&1)==0){ad=af;ae=ag;break}Tw(c[o+8>>2]|0);ad=af;ae=ag}}while(0);T=c[Q>>2]|0;D=c[I>>2]|0;L204:do{if((T|0)==(D|0)){aP=T}else{P=T;while(1){J=P+4|0;if((c[P>>2]|0)==(_|0)){aP=P;break L204}if((J|0)==(D|0)){aP=D;break}else{P=J}}}}while(0);Q=aP-T>>2;P=T+(Q+1<<2)|0;J=D-P|0;TG(T+(Q<<2)|0,P|0,J|0)|0;P=T+((J>>2)+Q<<2)|0;Q=c[I>>2]|0;if((P|0)!=(Q|0)){c[I>>2]=Q+(~((Q-4+(-P|0)|0)>>>2)<<2)}Tw(K);aL=ad;aM=ae}else{z=0;S=119}}while(0);if((S|0)==119){S=b$(-1,-1)|0;aL=S;aM=M}if((C&1)==0){aQ=aL;aR=0;aS=aQ;aU=aM;bj(aS|0)}Tw(c[m+8>>2]|0);aQ=aL;aR=0;aS=aQ;aU=aM;bj(aS|0);return 0}function Ak(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0;d=i;i=i+104|0;e=d|0;f=d+16|0;g=d+32|0;h=d+48|0;j=d+72|0;k=d+88|0;l=zk(b)|0;m=d+56|0;n=b+44|0;c[m>>2]=c[n>>2];c[m+4>>2]=c[n+4>>2];c[m+8>>2]=c[n+8>>2];n=c[b>>2]|0;o=Tu(44)|0;c[h>>2]=o;p=n+4|0;q=c[p>>2]|0;if((q|0)==(c[n+8>>2]|0)){fr(n|0,h);r=c[h>>2]|0}else{if((q|0)==0){s=0}else{c[q>>2]=o;s=c[p>>2]|0}c[p>>2]=s+4;r=o}o=r;s=r;q=b+28|0;L8:do{if((a[q]&1)==0){h=j;c[h>>2]=c[q>>2];c[h+4>>2]=c[q+4>>2];c[h+8>>2]=c[q+8>>2];t=16}else{h=c[b+36>>2]|0;u=c[b+32>>2]|0;do{if(u>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(u>>>0<11>>>0){a[j]=u<<1;v=j+1|0}else{w=u+16&-16;x=(z=0,av(316,w|0)|0);if(z){z=0;break}c[j+8>>2]=x;c[j>>2]=w|1;c[j+4>>2]=u;v=x}TF(v|0,h|0,u)|0;a[v+u|0]=0;t=16;break L8}}while(0);u=b$(-1,-1)|0;y=M;A=u}}while(0);do{if((t|0)==16){v=k;c[v>>2]=c[m>>2];c[v+4>>2]=c[m+4>>2];c[v+8>>2]=c[m+8>>2];q=(z=0,av(26,b|0)|0);do{if(!z){u=g;c[u>>2]=c[v>>2];c[u+4>>2]=c[v+4>>2];c[u+8>>2]=c[v+8>>2];h=e;x=f;w=r;B=j;C=a[B]|0;D=(C&1)==0;if(D){c[h>>2]=c[B>>2];c[h+4>>2]=c[B+4>>2];c[h+8>>2]=c[B+8>>2]}else{B=c[j+8>>2]|0;E=c[j+4>>2]|0;if(E>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;t=36;break}return 0}if(E>>>0<11>>>0){a[h]=E<<1;F=e+1|0}else{G=E+16&-16;H=(z=0,av(316,G|0)|0);if(z){z=0;t=36;break}c[e+8>>2]=H;c[e>>2]=G|1;c[e+4>>2]=E;F=H}TF(F|0,B|0,E)|0;a[F+E|0]=0}c[x>>2]=c[u>>2];c[x+4>>2]=c[u+4>>2];c[x+8>>2]=c[u+8>>2];z=0;aK(10,w|0,e|0,f|0,0,0,0,0);if(z){z=0;w=b$(-1,-1)|0;u=M;if((a[h]&1)==0){I=u;J=w;K=C;break}Tw(c[e+8>>2]|0);I=u;J=w;K=C;break}if((a[h]&1)!=0){Tw(c[e+8>>2]|0)}c[r>>2]=25016;c[r+36>>2]=l;c[r+40>>2]=q;c[r+32>>2]=4;if(D){i=d;return s|0}Tw(c[j+8>>2]|0);i=d;return s|0}else{z=0;t=36}}while(0);if((t|0)==36){q=b$(-1,-1)|0;I=M;J=q;K=a[j]|0}q=J;v=I;if((K&1)==0){y=v;A=q;break}Tw(c[j+8>>2]|0);y=v;A=q}}while(0);j=c[n>>2]|0;n=c[p>>2]|0;L54:do{if((j|0)==(n|0)){L=j}else{K=j;while(1){I=K+4|0;if((c[K>>2]|0)==(r|0)){L=K;break L54}if((I|0)==(n|0)){L=n;break}else{K=I}}}}while(0);r=L-j>>2;L=j+(r+1<<2)|0;K=n-L|0;TG(j+(r<<2)|0,L|0,K|0)|0;L=j+((K>>2)+r<<2)|0;r=c[p>>2]|0;if((L|0)==(r|0)){Tw(o);N=A;O=0;P=N;Q=y;bj(P|0)}c[p>>2]=r+(~((r-4+(-L|0)|0)>>>2)<<2);Tw(o);N=A;O=0;P=N;Q=y;bj(P|0);return 0}function Al(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0;d=i;i=i+120|0;e=d|0;f=d+16|0;g=d+24|0;h=d+40|0;j=d+56|0;k=d+72|0;l=d+88|0;m=d+104|0;y8(b)|0;n=c[b+56>>2]|0;o=(c[b+60>>2]|0)-n|0;if(o>>>0>4294967279>>>0){L4(0);return 0}if(o>>>0<11>>>0){a[h]=o<<1;p=h+1|0}else{q=o+16&-16;r=Tu(q)|0;c[h+8>>2]=r;c[h>>2]=q|1;c[h+4>>2]=o;p=r}TF(p|0,n|0,o)|0;a[p+o|0]=0;z=0;at(74,g|0,h|0);if(z){z=0;o=b$(-1,-1)|0;p=o;o=M;if((a[h]&1)==0){s=p;t=o;u=s;v=0;w=u;x=t;bj(w|0)}Tw(c[h+8>>2]|0);s=p;t=o;u=s;v=0;w=u;x=t;bj(w|0)}if((a[h]&1)!=0){Tw(c[h+8>>2]|0)}h=j;j=b+44|0;c[h>>2]=c[j>>2];c[h+4>>2]=c[j+4>>2];c[h+8>>2]=c[j+8>>2];j=c[b>>2]|0;o=(z=0,av(316,60)|0);do{if(!z){p=o;c[f>>2]=p;n=j+4|0;r=c[n>>2]|0;if((r|0)==(c[j+8>>2]|0)){z=0;at(498,j|0,f|0);if(z){z=0;y=47;break}A=c[f>>2]|0}else{if((r|0)==0){B=0}else{c[r>>2]=p;B=c[n>>2]|0}c[n>>2]=B+4;A=p}p=A;r=A;q=b+28|0;L28:do{if((a[q]&1)==0){C=k;c[C>>2]=c[q>>2];c[C+4>>2]=c[q+4>>2];c[C+8>>2]=c[q+8>>2];y=26}else{C=c[b+36>>2]|0;D=c[b+32>>2]|0;do{if(D>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(D>>>0<11>>>0){a[k]=D<<1;E=k+1|0}else{F=D+16&-16;G=(z=0,av(316,F|0)|0);if(z){z=0;break}c[k+8>>2]=G;c[k>>2]=F|1;c[k+4>>2]=D;E=G}TF(E|0,C|0,D)|0;a[E+D|0]=0;y=26;break L28}}while(0);D=b$(-1,-1)|0;H=D;I=M}}while(0);do{if((y|0)==26){q=l;c[q>>2]=c[h>>2];c[q+4>>2]=c[h+4>>2];c[q+8>>2]=c[h+8>>2];D=g;L43:do{if((a[D]&1)==0){C=m;c[C>>2]=c[D>>2];c[C+4>>2]=c[D+4>>2];c[C+8>>2]=c[D+8>>2];y=36}else{C=c[g+8>>2]|0;G=c[g+4>>2]|0;do{if(G>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(G>>>0<11>>>0){a[m]=G<<1;J=m+1|0}else{F=G+16&-16;K=(z=0,av(316,F|0)|0);if(z){z=0;break}c[m+8>>2]=K;c[m>>2]=F|1;c[m+4>>2]=G;J=K}TF(J|0,C|0,G)|0;a[J+G|0]=0;y=36;break L43}}while(0);G=b$(-1,-1)|0;L=G;N=M}}while(0);do{if((y|0)==36){G=(z=0,av(26,b|0)|0);do{if(!z){C=e;c[C>>2]=c[q>>2];c[C+4>>2]=c[q+4>>2];c[C+8>>2]=c[q+8>>2];z=0;aq(12,r|0,k|0,e|0,m|0,G|0);if(z){z=0;break}if((a[m]&1)!=0){Tw(c[m+8>>2]|0)}if((a[k]&1)!=0){Tw(c[k+8>>2]|0)}if((a[D]&1)==0){i=d;return r|0}Tw(c[g+8>>2]|0);i=d;return r|0}else{z=0}}while(0);G=b$(-1,-1)|0;C=G;G=M;if((a[m]&1)==0){L=C;N=G;break}Tw(c[m+8>>2]|0);L=C;N=G}}while(0);if((a[k]&1)==0){H=L;I=N;break}Tw(c[k+8>>2]|0);H=L;I=N}}while(0);r=c[j>>2]|0;D=c[n>>2]|0;L76:do{if((r|0)==(D|0)){O=r}else{q=r;while(1){G=q+4|0;if((c[q>>2]|0)==(A|0)){O=q;break L76}if((G|0)==(D|0)){O=D;break}else{q=G}}}}while(0);q=O-r>>2;G=r+(q+1<<2)|0;C=D-G|0;TG(r+(q<<2)|0,G|0,C|0)|0;G=r+((C>>2)+q<<2)|0;q=c[n>>2]|0;if((G|0)!=(q|0)){c[n>>2]=q+(~((q-4+(-G|0)|0)>>>2)<<2)}Tw(p);P=H;Q=I}else{z=0;y=47}}while(0);if((y|0)==47){y=b$(-1,-1)|0;P=y;Q=M}if((a[g]&1)==0){s=P;t=Q;u=s;v=0;w=u;x=t;bj(w|0)}Tw(c[g+8>>2]|0);s=P;t=Q;u=s;v=0;w=u;x=t;bj(w|0);return 0}function Am(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=(a[e]|0)==43?e+1|0:0;if((f|0)==0){g=0;return g|0}h=Ej(f)|0;if((h|0)==0){g=0;return g|0}f=(EX(h)|0)!=0;i=f?0:h;if((i|0)==0){g=0;return g|0}h=b+48|0;f=c[h>>2]|0;j=c[d>>2]|0;L10:do{if(j>>>0<i>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L10}else{n=l}m=k+1|0;if(m>>>0<i>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[h>>2]=f+o;f=e-1|0;L17:do{if(f>>>0<j>>>0){p=0}else{h=0;n=f;while(1){l=h+1|0;if((a[n]|0)==10){p=h;break L17}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=i;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=i;g=i;return g|0}function An(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;h=i;i=i+48|0;j=e;e=i;i=i+12|0;i=i+7&-8;c[e>>2]=c[j>>2];c[e+4>>2]=c[j+4>>2];c[e+8>>2]=c[j+8>>2];j=h|0;k=h+16|0;l=h+32|0;TF(l|0,e|0,12)|0;e=j;m=k;n=b|0;o=d;if((a[o]&1)==0){c[e>>2]=c[o>>2];c[e+4>>2]=c[o+4>>2];c[e+8>>2]=c[o+8>>2]}else{o=c[d+8>>2]|0;p=c[d+4>>2]|0;if(p>>>0>4294967279>>>0){L4(0)}if(p>>>0<11>>>0){a[e]=p<<1;q=j+1|0}else{d=p+16&-16;r=Tu(d)|0;c[j+8>>2]=r;c[j>>2]=d|1;c[j+4>>2]=p;q=r}TF(q|0,o|0,p)|0;a[q+p|0]=0}c[m>>2]=c[l>>2];c[m+4>>2]=c[l+4>>2];c[m+8>>2]=c[l+8>>2];z=0;aK(10,n|0,j|0,k|0,0,0,0,0);if(!z){if((a[e]&1)==0){s=b|0;c[s>>2]=26064;t=b+36|0;c[t>>2]=f;u=b+40|0;c[u>>2]=g;v=12;w=0;x=12;y=0;i=h;return}Tw(c[j+8>>2]|0);s=b|0;c[s>>2]=26064;t=b+36|0;c[t>>2]=f;u=b+40|0;c[u>>2]=g;v=12;w=0;x=12;y=0;i=h;return}else{z=0;h=b$(-1,-1)|0;if((a[e]&1)==0){bj(h|0)}Tw(c[j+8>>2]|0);bj(h|0)}}function Ao(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=(a[e]|0)==45?e+1|0:0;if((f|0)==0){g=0;return g|0}h=Ej(f)|0;if((h|0)==0){g=0;return g|0}f=(EX(h)|0)!=0;i=f?0:h;if((i|0)==0){g=0;return g|0}h=b+48|0;f=c[h>>2]|0;j=c[d>>2]|0;L10:do{if(j>>>0<i>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==0){n=l;break L10}else if((m<<24>>24|0)==10){o=l+1|0}else{o=l}m=k+1|0;if(m>>>0<i>>>0){k=m;l=o}else{n=o;break}}}else{n=0}}while(0);c[h>>2]=f+n;f=e-1|0;L17:do{if(f>>>0<j>>>0){p=0}else{h=0;o=f;while(1){l=h+1|0;if((a[o]|0)==10){p=h;break L17}k=o-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;o=k}}}}while(0);j=b+40|0;if((n|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=i;n=e;c[b+40>>2]=j-n+p+q;q=b+56|0;c[q>>2]=n;c[q+4>>2]=j;c[d>>2]=i;g=i;return g|0}function Ap(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=Fo(e)|0;if((f|0)==0){g=0;return g|0}h=Ej(f)|0;if((h|0)==0){g=0;return g|0}f=b+48|0;i=c[f>>2]|0;j=c[d>>2]|0;L7:do{if(j>>>0<h>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L7}else{n=l}m=k+1|0;if(m>>>0<h>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[f>>2]=i+o;i=e-1|0;L14:do{if(i>>>0<j>>>0){p=0}else{f=0;n=i;while(1){l=f+1|0;if((a[n]|0)==10){p=f;break L14}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{f=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=h;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=h;g=h;return g|0}function Aq(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=E2(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L4}else{n=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[h>>2]=i+o;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;n=i;while(1){l=h+1|0;if((a[n]|0)==10){p=h;break L11}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function Ar(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=E3(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L4}else{n=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[h>>2]=i+o;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;n=i;while(1){l=h+1|0;if((a[n]|0)==10){p=h;break L11}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function As(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=Ep(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==0){n=l;break L4}else if((m<<24>>24|0)==10){o=l+1|0}else{o=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=o}else{n=o;break}}}else{n=0}}while(0);c[h>>2]=i+n;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;o=i;while(1){l=h+1|0;if((a[o]|0)==10){p=h;break L11}k=o-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;o=k}}}}while(0);j=b+40|0;if((n|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;n=e;c[b+40>>2]=j-n+p+q;q=b+56|0;c[q>>2]=n;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function At(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0,ah=0,ai=0,aj=0,ak=0,al=0,am=0,an=0,ao=0,ap=0,as=0,au=0,aw=0,ax=0,ay=0,az=0,aA=0,aB=0,aC=0,aD=0,aE=0,aF=0,aG=0,aH=0,aI=0,aJ=0,aL=0,aM=0,aN=0,aO=0,aP=0,aQ=0,aR=0,aS=0,aU=0,aV=0,aW=0,aY=0,aZ=0,a_=0,a$=0,a0=0,a1=0,a2=0,a3=0,a4=0,a5=0,a6=0,a7=0,a8=0,a9=0,ba=0,bb=0,bc=0,bd=0,be=0,bf=0,bg=0,bh=0,bi=0,bk=0,bl=0,bm=0,bn=0,bo=0,bp=0,bq=0,br=0,bs=0,bt=0,bu=0,bv=0,bw=0,bx=0,by=0,bz=0,bA=0,bB=0,bC=0,bD=0,bE=0,bF=0,bG=0,bH=0,bI=0,bJ=0,bK=0,bL=0,bM=0,bN=0,bO=0,bP=0,bQ=0,bR=0,bS=0,bT=0,bU=0,bV=0,bW=0,bX=0,bY=0,bZ=0,b_=0,b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0,b7=0,b8=0,b9=0,ca=0,cb=0,cc=0,cd=0,ce=0,cf=0,cg=0,ch=0,ci=0,cj=0,ck=0,cl=0,cm=0,cn=0,co=0,cp=0,cq=0,cr=0,cs=0,ct=0,cu=0,cv=0,cw=0,cx=0,cy=0,cz=0,cA=0,cB=0,cC=0,cD=0,cE=0,cF=0,cG=0,cH=0,cI=0,cJ=0,cL=0,cM=0,cN=0,cO=0,cP=0,cQ=0,cR=0,cS=0,cT=0,cU=0,cV=0,cW=0,cX=0,cY=0,cZ=0,c_=0,c$=0,c0=0,c1=0,c2=0,c3=0,c4=0,c5=0,c6=0,c7=0,c8=0,c9=0,da=0,db=0,dc=0,dd=0,de=0,df=0,dg=0,dh=0,di=0,dj=0,dk=0,dl=0,dm=0,dn=0,dp=0,dq=0,dr=0,ds=0,dt=0,du=0,dv=0,dw=0,dx=0,dy=0,dz=0,dA=0,dB=0,dC=0,dD=0,dE=0,dF=0,dG=0,dH=0,dI=0,dJ=0,dK=0,dL=0,dM=0,dN=0,dO=0,dP=0,dQ=0,dR=0,dS=0,dT=0,dU=0,dV=0,dW=0,dX=0,dY=0,dZ=0,d_=0,d$=0,d0=0,d1=0,d2=0,d3=0,d4=0,d5=0,d6=0,d7=0,d8=0,d9=0,ea=0,eb=0,ec=0,ed=0,ee=0,ef=0,eg=0,eh=0,ei=0,ej=0,ek=0,el=0,em=0,en=0,eo=0,ep=0,eq=0,er=0,es=0,et=0,eu=0,ev=0,ew=0,ex=0,ey=0,ez=0,eA=0,eB=0,eC=0,eD=0,eE=0,eF=0,eG=0,eH=0,eI=0,eJ=0,eK=0,eL=0,eM=0,eN=0,eO=0,eP=0,eQ=0,eR=0,eS=0,eT=0,eU=0,eV=0,eW=0,eX=0,eY=0,eZ=0,e_=0,e$=0,e0=0,e1=0;d=i;i=i+384|0;e=d|0;f=d+8|0;g=d+24|0;h=d+32|0;j=d+40|0;k=d+56|0;l=d+64|0;m=d+72|0;n=d+88|0;o=d+96|0;p=d+104|0;q=d+120|0;r=d+128|0;s=d+136|0;t=d+152|0;u=d+160|0;v=d+168|0;w=d+184|0;x=d+192|0;y=d+200|0;A=d+216|0;B=d+224|0;C=d+232|0;D=d+248|0;E=d+256|0;F=d+264|0;G=d+280|0;H=d+288|0;I=d+304|0;J=d+376|0;K=J;L=i;i=i+12|0;i=i+7&-8;N=i;i=i+12|0;i=i+7&-8;O=i;i=i+12|0;i=i+7&-8;P=i;i=i+12|0;i=i+7&-8;Q=i;i=i+12|0;i=i+7&-8;R=i;i=i+12|0;i=i+7&-8;S=i;i=i+12|0;i=i+7&-8;T=i;i=i+12|0;i=i+7&-8;U=i;i=i+12|0;i=i+7&-8;V=i;i=i+12|0;i=i+7&-8;W=i;i=i+12|0;i=i+7&-8;X=i;i=i+12|0;i=i+7&-8;Y=i;i=i+12|0;i=i+7&-8;Z=i;i=i+12|0;i=i+7&-8;_=i;i=i+12|0;i=i+7&-8;$=i;i=i+12|0;i=i+7&-8;aa=i;i=i+12|0;i=i+7&-8;ab=i;i=i+12|0;i=i+7&-8;ac=i;i=i+12|0;i=i+7&-8;ad=i;i=i+12|0;i=i+7&-8;ae=i;i=i+12|0;i=i+7&-8;af=i;i=i+12|0;i=i+7&-8;ag=i;i=i+12|0;i=i+7&-8;ah=b|0;ai=c[ah>>2]|0;aj=Tu(68)|0;c[G>>2]=aj;ak=ai+4|0;al=c[ak>>2]|0;if((al|0)==(c[ai+8>>2]|0)){fr(ai|0,G);am=c[G>>2]|0}else{if((al|0)==0){an=0}else{c[al>>2]=aj;an=c[ak>>2]|0}c[ak>>2]=an+4;am=aj}aj=am;an=am;al=b+28|0;L8:do{if((a[al]&1)==0){G=H;c[G>>2]=c[al>>2];c[G+4>>2]=c[al+4>>2];c[G+8>>2]=c[al+8>>2];ao=16}else{G=c[b+36>>2]|0;ap=c[b+32>>2]|0;do{if(ap>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(ap>>>0<11>>>0){a[H]=ap<<1;as=H+1|0}else{au=ap+16&-16;aw=(z=0,av(316,au|0)|0);if(z){z=0;break}c[H+8>>2]=aw;c[H>>2]=au|1;c[H+4>>2]=ap;as=aw}TF(as|0,G|0,ap)|0;a[as+ap|0]=0;ao=16;break L8}}while(0);ap=b$(-1,-1)|0;ax=ap;ay=M}}while(0);do{if((ao|0)==16){as=b+44|0;ap=F;c[ap>>2]=c[as>>2];c[ap+4>>2]=c[as+4>>2];c[ap+8>>2]=c[as+8>>2];z=0;aK(14,an|0,H|0,F|0,0,0,0,0);if(z){z=0;ap=b$(-1,-1)|0;G=ap;ap=M;if((a[H]&1)==0){ax=G;ay=ap;break}Tw(c[H+8>>2]|0);ax=G;ay=ap;break}if((a[H]&1)!=0){Tw(c[H+8>>2]|0)}ap=b+20|0;G=b+24|0;if((c[ap>>2]|0)>>>0>=(c[G>>2]|0)>>>0){i=d;return an|0}aw=af+8|0;au=af|0;az=af+4|0;aA=ag|0;aB=ag+4|0;aC=ag+8|0;aD=af;aE=am+40|0;aF=aE;aG=ab;aH=ac;aI=b+56|0;aJ=b+60|0;aL=ae;aM=ae+1|0;aN=f;aO=aE+16|0;aP=aE+8|0;aQ=aE+12|0;aR=aE+4|0;aS=ad;aU=ab+8|0;aV=ae+8|0;aW=ad+8|0;aY=ae|0;aZ=ae+4|0;a_=b+36|0;a$=b+32|0;a0=ab+1|0;a1=ab|0;a2=ab+4|0;a3=aa;a4=b+56|0;a5=a4|0;a6=am+60|0;a7=aa+8|0;a8=aa+1|0;a9=aa|0;ba=aa+4|0;bb=Z;bc=_;bd=$;be=$+1|0;bf=m;bg=Z+8|0;bh=$+8|0;bi=$|0;bk=$+4|0;bl=Z+1|0;bm=Z|0;bn=Z+4|0;bo=W;bp=X;bq=Y;br=Y+1|0;bs=p;bt=W+8|0;bu=Y+8|0;bv=Y|0;bw=Y+4|0;bx=W+1|0;by=W|0;bz=W+4|0;bA=T;bB=U;bC=V;bD=V+1|0;bE=s;bF=T+8|0;bG=V+8|0;bH=V|0;bI=V+4|0;bJ=T+1|0;bK=T|0;bL=T+4|0;bM=Q;bN=R;bO=S;bP=S+1|0;bQ=v;bR=Q+8|0;bS=S+8|0;bT=S|0;bU=S+4|0;bV=Q+1|0;bW=Q|0;bX=Q+4|0;bY=P;bZ=P+8|0;b_=P+1|0;b0=P|0;b1=P+4|0;b2=b+48|0;b3=b+40|0;b4=b+52|0;b5=a4;b6=O;b7=O+8|0;b8=O+1|0;b9=O|0;ca=O+4|0;cb=L;cc=N;cd=I+28|0;ce=I+4|0;cf=L+8|0;cg=I+8|0;ch=I+36|0;ci=L+1|0;cj=L|0;ck=L+4|0;cl=0;L33:while(1){do{if((AF(b)|0)==0){cm=Ej(c[ap>>2]|0)|0;cn=(a[cm]|0)==37?cm+1|0:0;if((cn|0)!=0){co=c[b2>>2]|0;cp=c[ap>>2]|0;L39:do{if(cp>>>0<cn>>>0){cq=cp;cr=0;while(1){cs=a[cq]|0;if((cs<<24>>24|0)==0){ct=cr;break L39}else if((cs<<24>>24|0)==10){cu=cr+1|0}else{cu=cr}cs=cq+1|0;if(cs>>>0<cn>>>0){cq=cs;cr=cu}else{ct=cu;break}}}else{ct=0}}while(0);c[b2>>2]=ct+co;cr=cm-1|0;L46:do{if(cr>>>0<cp>>>0){cv=0}else{cq=0;cs=cr;while(1){cw=cq+1|0;if((a[cs]|0)==10){cv=cq;break L46}cx=cs-1|0;if(cx>>>0<cp>>>0){cv=cw;break}else{cq=cw;cs=cx}}}}while(0);if((ct|0)==0){cy=c[b3>>2]|0}else{c[b3>>2]=1;cy=1}c[b4>>2]=cy+cv;cp=cn;cr=cm;c[b3>>2]=cp-cr+cv+cy;c[b5>>2]=cr;c[b5+4>>2]=cp;c[ap>>2]=cn;cz=c[ah>>2]|0;cp=Tu(68)|0;c[D>>2]=cp;cA=cz+4|0;cr=c[cA>>2]|0;if((cr|0)==(c[cz+8>>2]|0)){fr(cz|0,D);cB=c[D>>2]|0}else{if((cr|0)==0){cC=0}else{c[cr>>2]=cp;cC=c[cA>>2]|0}c[cA>>2]=cC+4;cB=cp}cD=cB;if((a[al]&1)==0){c[b6>>2]=c[al>>2];c[b6+4>>2]=c[al+4>>2];c[b6+8>>2]=c[al+8>>2]}else{cp=c[a_>>2]|0;cr=c[a$>>2]|0;if(cr>>>0>4294967279>>>0){ao=83;break L33}if(cr>>>0<11>>>0){a[b6]=cr<<1;cE=b8}else{co=cr+16&-16;cs=(z=0,av(316,co|0)|0);if(z){z=0;ao=100;break L33}c[b7>>2]=cs;c[b9>>2]=co|1;c[ca>>2]=cr;cE=cs}TF(cE|0,cp|0,cr)|0;a[cE+cr|0]=0}cr=C;c[cr>>2]=c[as>>2];c[cr+4>>2]=c[as+4>>2];c[cr+8>>2]=c[as+8>>2];z=0;aq(14,cB|0,O|0,C|0,a4|0,0);if(z){z=0;cF=1;ao=103;break L33}cr=cB;c[B>>2]=cr;c[aO>>2]=0;cp=c[aP>>2]|0;cs=cp;if((cp|0)==(c[aQ>>2]|0)){z=0;at(14,aR|0,B|0);if(z){z=0;cF=0;ao=103;break L33}cG=c[B>>2]|0}else{if((cp|0)==0){cH=0}else{c[cs>>2]=cr;cH=c[aP>>2]|0}c[aP>>2]=cH+4;cG=cr}z=0;at(c[c[aE>>2]>>2]|0,aF|0,cG|0);if(z){z=0;cF=0;ao=103;break L33}if((a[b6]&1)==0){break}Tw(c[b7>>2]|0);break}if((y8(b)|0)!=0){cI=c[ah>>2]|0;cr=Tu(68)|0;c[A>>2]=cr;cJ=cI+4|0;cs=c[cJ>>2]|0;if((cs|0)==(c[cI+8>>2]|0)){fr(cI|0,A);cL=c[A>>2]|0}else{if((cs|0)==0){cM=0}else{c[cs>>2]=cr;cM=c[cJ>>2]|0}c[cJ>>2]=cM+4;cL=cr}cN=cL;if((a[al]&1)==0){c[bY>>2]=c[al>>2];c[bY+4>>2]=c[al+4>>2];c[bY+8>>2]=c[al+8>>2]}else{cr=c[a_>>2]|0;cs=c[a$>>2]|0;if(cs>>>0>4294967279>>>0){ao=121;break L33}if(cs>>>0<11>>>0){a[bY]=cs<<1;cO=b_}else{cp=cs+16&-16;co=(z=0,av(316,cp|0)|0);if(z){z=0;ao=138;break L33}c[bZ>>2]=co;c[b0>>2]=cp|1;c[b1>>2]=cs;cO=co}TF(cO|0,cr|0,cs)|0;a[cO+cs|0]=0}cs=y;c[cs>>2]=c[as>>2];c[cs+4>>2]=c[as+4>>2];c[cs+8>>2]=c[as+8>>2];z=0;aq(14,cL|0,P|0,y|0,a4|0,0);if(z){z=0;cP=1;ao=141;break L33}cs=cL;c[x>>2]=cs;c[aO>>2]=0;cr=c[aP>>2]|0;co=cr;if((cr|0)==(c[aQ>>2]|0)){z=0;at(14,aR|0,x|0);if(z){z=0;cP=0;ao=141;break L33}cQ=c[x>>2]|0}else{if((cr|0)==0){cR=0}else{c[co>>2]=cs;cR=c[aP>>2]|0}c[aP>>2]=cR+4;cQ=cs}z=0;at(c[c[aE>>2]>>2]|0,aF|0,cQ|0);if(z){z=0;cP=0;ao=141;break L33}if((a[bY]&1)==0){break}Tw(c[bZ>>2]|0);break}if((Ax(b)|0)!=0){cS=c[ah>>2]|0;cs=Tu(56)|0;c[w>>2]=cs;cT=cS+4|0;co=c[cT>>2]|0;if((co|0)==(c[cS+8>>2]|0)){fr(cS|0,w);cU=c[w>>2]|0}else{if((co|0)==0){cV=0}else{c[co>>2]=cs;cV=c[cT>>2]|0}c[cT>>2]=cV+4;cU=cs}cW=cU;cs=cU;if((a[al]&1)==0){c[bM>>2]=c[al>>2];c[bM+4>>2]=c[al+4>>2];c[bM+8>>2]=c[al+8>>2]}else{co=c[a_>>2]|0;cr=c[a$>>2]|0;if(cr>>>0>4294967279>>>0){ao=159;break L33}if(cr>>>0<11>>>0){a[bM]=cr<<1;cX=bV}else{cp=cr+16&-16;cq=(z=0,av(316,cp|0)|0);if(z){z=0;ao=185;break L33}c[bR>>2]=cq;c[bW>>2]=cp|1;c[bX>>2]=cr;cX=cq}TF(cX|0,co|0,cr)|0;a[cX+cr|0]=0}c[bN>>2]=c[as>>2];c[bN+4>>2]=c[as+4>>2];c[bN+8>>2]=c[as+8>>2];cr=c[aI>>2]|0;co=(c[aJ>>2]|0)-cr|0;if(co>>>0>4294967279>>>0){ao=167;break L33}if(co>>>0<11>>>0){a[bO]=co<<1;cY=bP}else{cq=co+16&-16;cp=(z=0,av(316,cq|0)|0);if(z){z=0;ao=188;break L33}c[bS>>2]=cp;c[bT>>2]=cq|1;c[bU>>2]=co;cY=cp}TF(cY|0,cr|0,co)|0;a[cY+co|0]=0;c[bQ>>2]=c[bN>>2];c[bQ+4>>2]=c[bN+4>>2];c[bQ+8>>2]=c[bN+8>>2];z=0;aq(44,cs|0,Q|0,v|0,1,S|0);if(z){z=0;cZ=1;ao=191;break L33}cs=cU;c[u>>2]=cs;c[aO>>2]=0;co=c[aP>>2]|0;cr=co;if((co|0)==(c[aQ>>2]|0)){z=0;at(14,aR|0,u|0);if(z){z=0;cZ=0;ao=191;break L33}c_=c[u>>2]|0}else{if((co|0)==0){c$=0}else{c[cr>>2]=cs;c$=c[aP>>2]|0}c[aP>>2]=c$+4;c_=cs}z=0;at(c[c[aE>>2]>>2]|0,aF|0,c_|0);if(z){z=0;cZ=0;ao=191;break L33}if((a[bO]&1)!=0){Tw(c[bS>>2]|0)}if((a[bM]&1)==0){break}Tw(c[bR>>2]|0);break}if((Ay(b)|0)!=0){c0=c[ah>>2]|0;cs=Tu(56)|0;c[t>>2]=cs;c1=c0+4|0;cr=c[c1>>2]|0;if((cr|0)==(c[c0+8>>2]|0)){fr(c0|0,t);c2=c[t>>2]|0}else{if((cr|0)==0){c3=0}else{c[cr>>2]=cs;c3=c[c1>>2]|0}c[c1>>2]=c3+4;c2=cs}c4=c2;cs=c2;if((a[al]&1)==0){c[bA>>2]=c[al>>2];c[bA+4>>2]=c[al+4>>2];c[bA+8>>2]=c[al+8>>2]}else{cr=c[a_>>2]|0;co=c[a$>>2]|0;if(co>>>0>4294967279>>>0){ao=211;break L33}if(co>>>0<11>>>0){a[bA]=co<<1;c5=bJ}else{cp=co+16&-16;cq=(z=0,av(316,cp|0)|0);if(z){z=0;ao=237;break L33}c[bF>>2]=cq;c[bK>>2]=cp|1;c[bL>>2]=co;c5=cq}TF(c5|0,cr|0,co)|0;a[c5+co|0]=0}c[bB>>2]=c[as>>2];c[bB+4>>2]=c[as+4>>2];c[bB+8>>2]=c[as+8>>2];co=c[aI>>2]|0;cr=(c[aJ>>2]|0)-co|0;if(cr>>>0>4294967279>>>0){ao=219;break L33}if(cr>>>0<11>>>0){a[bC]=cr<<1;c6=bD}else{cq=cr+16&-16;cp=(z=0,av(316,cq|0)|0);if(z){z=0;ao=240;break L33}c[bG>>2]=cp;c[bH>>2]=cq|1;c[bI>>2]=cr;c6=cp}TF(c6|0,co|0,cr)|0;a[c6+cr|0]=0;c[bE>>2]=c[bB>>2];c[bE+4>>2]=c[bB+4>>2];c[bE+8>>2]=c[bB+8>>2];z=0;aq(44,cs|0,T|0,s|0,2,V|0);if(z){z=0;c7=1;ao=243;break L33}cs=c2;c[r>>2]=cs;c[aO>>2]=0;cr=c[aP>>2]|0;co=cr;if((cr|0)==(c[aQ>>2]|0)){z=0;at(14,aR|0,r|0);if(z){z=0;c7=0;ao=243;break L33}c8=c[r>>2]|0}else{if((cr|0)==0){c9=0}else{c[co>>2]=cs;c9=c[aP>>2]|0}c[aP>>2]=c9+4;c8=cs}z=0;at(c[c[aE>>2]>>2]|0,aF|0,c8|0);if(z){z=0;c7=0;ao=243;break L33}if((a[bC]&1)!=0){Tw(c[bG>>2]|0)}if((a[bA]&1)==0){break}Tw(c[bF>>2]|0);break}if((zy(b)|0)!=0){da=c[ah>>2]|0;cs=Tu(56)|0;c[q>>2]=cs;db=da+4|0;co=c[db>>2]|0;if((co|0)==(c[da+8>>2]|0)){fr(da|0,q);dc=c[q>>2]|0}else{if((co|0)==0){dd=0}else{c[co>>2]=cs;dd=c[db>>2]|0}c[db>>2]=dd+4;dc=cs}de=dc;cs=dc;if((a[al]&1)==0){c[bo>>2]=c[al>>2];c[bo+4>>2]=c[al+4>>2];c[bo+8>>2]=c[al+8>>2]}else{co=c[a_>>2]|0;cr=c[a$>>2]|0;if(cr>>>0>4294967279>>>0){ao=263;break L33}if(cr>>>0<11>>>0){a[bo]=cr<<1;df=bx}else{cp=cr+16&-16;cq=(z=0,av(316,cp|0)|0);if(z){z=0;ao=289;break L33}c[bt>>2]=cq;c[by>>2]=cp|1;c[bz>>2]=cr;df=cq}TF(df|0,co|0,cr)|0;a[df+cr|0]=0}c[bp>>2]=c[as>>2];c[bp+4>>2]=c[as+4>>2];c[bp+8>>2]=c[as+8>>2];cr=c[aI>>2]|0;co=(c[aJ>>2]|0)-cr|0;if(co>>>0>4294967279>>>0){ao=271;break L33}if(co>>>0<11>>>0){a[bq]=co<<1;dg=br}else{cq=co+16&-16;cp=(z=0,av(316,cq|0)|0);if(z){z=0;ao=292;break L33}c[bu>>2]=cp;c[bv>>2]=cq|1;c[bw>>2]=co;dg=cp}TF(dg|0,cr|0,co)|0;a[dg+co|0]=0;c[bs>>2]=c[bp>>2];c[bs+4>>2]=c[bp+4>>2];c[bs+8>>2]=c[bp+8>>2];z=0;aq(44,cs|0,W|0,p|0,0,Y|0);if(z){z=0;dh=1;ao=295;break L33}cs=dc;c[o>>2]=cs;c[aO>>2]=0;co=c[aP>>2]|0;cr=co;if((co|0)==(c[aQ>>2]|0)){z=0;at(14,aR|0,o|0);if(z){z=0;dh=0;ao=295;break L33}di=c[o>>2]|0}else{if((co|0)==0){dj=0}else{c[cr>>2]=cs;dj=c[aP>>2]|0}c[aP>>2]=dj+4;di=cs}z=0;at(c[c[aE>>2]>>2]|0,aF|0,di|0);if(z){z=0;dh=0;ao=295;break L33}if((a[bq]&1)!=0){Tw(c[bu>>2]|0)}if((a[bo]&1)==0){break}Tw(c[bt>>2]|0);break}if((Az(b)|0)!=0){dk=c[ah>>2]|0;cs=Tu(56)|0;c[n>>2]=cs;dl=dk+4|0;cr=c[dl>>2]|0;if((cr|0)==(c[dk+8>>2]|0)){fr(dk|0,n);dm=c[n>>2]|0}else{if((cr|0)==0){dn=0}else{c[cr>>2]=cs;dn=c[dl>>2]|0}c[dl>>2]=dn+4;dm=cs}dp=dm;cs=dm;if((a[al]&1)==0){c[bb>>2]=c[al>>2];c[bb+4>>2]=c[al+4>>2];c[bb+8>>2]=c[al+8>>2]}else{cr=c[a_>>2]|0;co=c[a$>>2]|0;if(co>>>0>4294967279>>>0){ao=315;break L33}if(co>>>0<11>>>0){a[bb]=co<<1;dq=bl}else{cp=co+16&-16;cq=(z=0,av(316,cp|0)|0);if(z){z=0;ao=341;break L33}c[bg>>2]=cq;c[bm>>2]=cp|1;c[bn>>2]=co;dq=cq}TF(dq|0,cr|0,co)|0;a[dq+co|0]=0}c[bc>>2]=c[as>>2];c[bc+4>>2]=c[as+4>>2];c[bc+8>>2]=c[as+8>>2];co=c[aI>>2]|0;cr=(c[aJ>>2]|0)-co|0;if(cr>>>0>4294967279>>>0){ao=323;break L33}if(cr>>>0<11>>>0){a[bd]=cr<<1;dr=be}else{cq=cr+16&-16;cp=(z=0,av(316,cq|0)|0);if(z){z=0;ao=344;break L33}c[bh>>2]=cp;c[bi>>2]=cq|1;c[bk>>2]=cr;dr=cp}TF(dr|0,co|0,cr)|0;a[dr+cr|0]=0;c[bf>>2]=c[bc>>2];c[bf+4>>2]=c[bc+4>>2];c[bf+8>>2]=c[bc+8>>2];z=0;aq(44,cs|0,Z|0,m|0,3,$|0);if(z){z=0;ds=1;ao=347;break L33}cs=dm;c[l>>2]=cs;c[aO>>2]=0;cr=c[aP>>2]|0;co=cr;if((cr|0)==(c[aQ>>2]|0)){z=0;at(14,aR|0,l|0);if(z){z=0;ds=0;ao=347;break L33}dt=c[l>>2]|0}else{if((cr|0)==0){du=0}else{c[co>>2]=cs;du=c[aP>>2]|0}c[aP>>2]=du+4;dt=cs}z=0;at(c[c[aE>>2]>>2]|0,aF|0,dt|0);if(z){z=0;ds=0;ao=347;break L33}if((a[bd]&1)!=0){Tw(c[bh>>2]|0)}if((a[bb]&1)==0){break}Tw(c[bg>>2]|0);break}if((y_(b)|0)!=0){dv=c[ah>>2]|0;cs=Tu(68)|0;c[k>>2]=cs;dw=dv+4|0;co=c[dw>>2]|0;if((co|0)==(c[dv+8>>2]|0)){fr(dv|0,k);dx=c[k>>2]|0}else{if((co|0)==0){dy=0}else{c[co>>2]=cs;dy=c[dw>>2]|0}c[dw>>2]=dy+4;dx=cs}dz=dx;if((a[al]&1)==0){c[a3>>2]=c[al>>2];c[a3+4>>2]=c[al+4>>2];c[a3+8>>2]=c[al+8>>2]}else{cs=c[a_>>2]|0;co=c[a$>>2]|0;if(co>>>0>4294967279>>>0){ao=367;break L33}if(co>>>0<11>>>0){a[a3]=co<<1;dA=a8}else{cr=co+16&-16;cp=(z=0,av(316,cr|0)|0);if(z){z=0;ao=386;break L33}c[a7>>2]=cp;c[a9>>2]=cr|1;c[ba>>2]=co;dA=cp}TF(dA|0,cs|0,co)|0;a[dA+co|0]=0}co=j;c[co>>2]=c[as>>2];c[co+4>>2]=c[as+4>>2];c[co+8>>2]=c[as+8>>2];z=0;aq(14,dx|0,aa|0,j|0,a4|0,0);if(z){z=0;dB=1;ao=389;break L33}co=dx;c[h>>2]=co;c[aO>>2]=0;cs=c[aP>>2]|0;cp=cs;if((cs|0)==(c[aQ>>2]|0)){z=0;at(14,aR|0,h|0);if(z){z=0;dB=0;ao=389;break L33}dC=c[h>>2]|0}else{if((cs|0)==0){dD=0}else{c[cp>>2]=co;dD=c[aP>>2]|0}c[aP>>2]=dD+4;dC=co}z=0;at(c[c[aE>>2]>>2]|0,aF|0,dC|0);if(z){z=0;dB=0;ao=389;break L33}if((a[a3]&1)!=0){Tw(c[a7>>2]|0)}if((cl|0)!=0){break}a[a6]=a[c[a5>>2]|0]|0;break}if((zc(b)|0)==0){co=Tu(48)|0;c[aw>>2]=co;c[au>>2]=49;c[az>>2]=32;TF(co|0,4104,32)|0;a[co+32|0]=0;c[aA>>2]=0;c[aB>>2]=0;c[aC>>2]=0;z=0;aT(362,b|0,af|0,ag|0);if(z){z=0;ao=459;break L33}if((a[aD]&1)==0){break}Tw(c[aw>>2]|0);break}dE=c[ah>>2]|0;co=Tu(48)|0;c[g>>2]=co;dF=dE+4|0;cp=c[dF>>2]|0;if((cp|0)==(c[dE+8>>2]|0)){fr(dE|0,g);dG=c[g>>2]|0}else{if((cp|0)==0){dH=0}else{c[cp>>2]=co;dH=c[dF>>2]|0}c[dF>>2]=dH+4;dG=co}dI=dG;co=dG;if((a[al]&1)==0){c[aG>>2]=c[al>>2];c[aG+4>>2]=c[al+4>>2];c[aG+8>>2]=c[al+8>>2]}else{cp=c[a_>>2]|0;cs=c[a$>>2]|0;if(cs>>>0>4294967279>>>0){ao=407;break L33}if(cs>>>0<11>>>0){a[aG]=cs<<1;dJ=a0}else{cr=cs+16&-16;cq=(z=0,av(316,cr|0)|0);if(z){z=0;ao=436;break L33}c[aU>>2]=cq;c[a1>>2]=cr|1;c[a2>>2]=cs;dJ=cq}TF(dJ|0,cp|0,cs)|0;a[dJ+cs|0]=0}c[aH>>2]=c[as>>2];c[aH+4>>2]=c[as+4>>2];c[aH+8>>2]=c[as+8>>2];cs=c[aI>>2]|0;cp=(c[aJ>>2]|0)-cs|0;if(cp>>>0>4294967279>>>0){ao=415;break L33}if(cp>>>0<11>>>0){a[aL]=cp<<1;dK=aM}else{cq=cp+16&-16;cr=(z=0,av(316,cq|0)|0);if(z){z=0;ao=439;break L33}c[aV>>2]=cr;c[aY>>2]=cq|1;c[aZ>>2]=cp;dK=cr}TF(dK|0,cs|0,cp)|0;a[dK+cp|0]=0;z=0;at(74,ad|0,ae|0);if(z){z=0;ao=442;break L33}c[aN>>2]=c[aH>>2];c[aN+4>>2]=c[aH+4>>2];c[aN+8>>2]=c[aH+8>>2];z=0;aX(2,co|0,ab|0,f|0,ad|0);if(z){z=0;dL=1;ao=443;break L33}co=dG;c[e>>2]=co;c[aO>>2]=0;cp=c[aP>>2]|0;cs=cp;if((cp|0)==(c[aQ>>2]|0)){z=0;at(14,aR|0,e|0);if(z){z=0;dL=0;ao=443;break L33}dM=c[e>>2]|0}else{if((cp|0)==0){dN=0}else{c[cs>>2]=co;dN=c[aP>>2]|0}c[aP>>2]=dN+4;dM=co}z=0;at(c[c[aE>>2]>>2]|0,aF|0,dM|0);if(z){z=0;dL=0;ao=443;break L33}if((a[aS]&1)!=0){Tw(c[aW>>2]|0)}if((a[aL]&1)!=0){Tw(c[aV>>2]|0)}if((a[aG]&1)==0){break}Tw(c[aU>>2]|0)}else{co=(c[aJ>>2]|0)-1|0;c[J>>2]=(c[aI>>2]|0)+2;c[J+4>>2]=co;co=c[ah>>2]|0;if((a[al]&1)==0){c[cb>>2]=c[al>>2];c[cb+4>>2]=c[al+4>>2];c[cb+8>>2]=c[al+8>>2]}else{cs=c[a_>>2]|0;cp=c[a$>>2]|0;if(cp>>>0>4294967279>>>0){ao=25;break L33}if(cp>>>0<11>>>0){a[cb]=cp<<1;dO=ci}else{cr=cp+16&-16;cq=Tu(cr)|0;c[cf>>2]=cq;c[cj>>2]=cr|1;c[ck>>2]=cp;dO=cq}TF(dO|0,cs|0,cp)|0;a[dO+cp|0]=0}c[cc>>2]=c[as>>2];c[cc+4>>2]=c[as+4>>2];c[cc+8>>2]=c[as+8>>2];z=0;aq(18,I|0,K|0,co|0,L|0,N|0);if(z){z=0;ao=55;break L33}co=(z=0,av(226,I|0)|0);if(z){z=0;ao=56;break L33}if((a[cd]&1)!=0){Tw(c[ch>>2]|0)}cp=c[ce>>2]|0;cs=cp;if((cp|0)!=0){cq=c[cg>>2]|0;if((cp|0)!=(cq|0)){c[cg>>2]=cq+(~((cq-4+(-cs|0)|0)>>>2)<<2)}Tw(cp)}if((a[cb]&1)!=0){Tw(c[cf>>2]|0)}a[co+30|0]=1;c[E>>2]=co;c[aO>>2]=0;cp=c[aP>>2]|0;cs=cp;if((cp|0)==(c[aQ>>2]|0)){fL(aR,E);dP=c[E>>2]|0}else{if((cp|0)==0){dQ=0}else{c[cs>>2]=co;dQ=c[aP>>2]|0}c[aP>>2]=dQ+4;dP=co}cK[c[c[aE>>2]>>2]&1023](aF,dP);}}while(0);if((c[ap>>2]|0)>>>0<(c[G>>2]|0)>>>0){cl=cl+1|0}else{ao=465;break}}do{if((ao|0)==56){cl=b$(-1,-1)|0;G=cl;cl=M;if((a[cd]&1)!=0){Tw(c[ch>>2]|0)}ap=c[ce>>2]|0;if((ap|0)==0){dR=G;dS=cl;ao=62;break}aF=c[cg>>2]|0;if((ap|0)!=(aF|0)){c[cg>>2]=aF+(~((aF-4+(-ap|0)|0)>>>2)<<2)}Tw(ap);dR=G;dS=cl;ao=62}else if((ao|0)==103){cl=b$(-1,-1)|0;G=cl;cl=M;if((a[b6]&1)==0){if(cF){dT=cl;dU=G;ao=106;break}else{dV=G;dW=cl}dX=dV;dY=0;dZ=dX;d_=dW;bj(dZ|0)}else{Tw(c[b7>>2]|0);if(cF){dT=cl;dU=G;ao=106;break}else{dV=G;dW=cl}dX=dV;dY=0;dZ=dX;d_=dW;bj(dZ|0)}}else if((ao|0)==100){cl=b$(-1,-1)|0;d$=M;d0=cl;ao=102}else if((ao|0)==323){z=0;ar(106,0);if(!z){return 0}else{z=0;cl=b$(-1,-1)|0;d1=M;d2=cl;ao=346;break}}else if((ao|0)==271){z=0;ar(106,0);if(!z){return 0}else{z=0;cl=b$(-1,-1)|0;d3=M;d4=cl;ao=294;break}}else if((ao|0)==386){cl=b$(-1,-1)|0;d5=M;d6=cl;ao=388}else if((ao|0)==389){cl=b$(-1,-1)|0;G=cl;cl=M;if((a[a3]&1)==0){if(dB){d7=cl;d8=G;ao=392;break}else{dV=G;dW=cl}dX=dV;dY=0;dZ=dX;d_=dW;bj(dZ|0)}else{Tw(c[a7>>2]|0);if(dB){d7=cl;d8=G;ao=392;break}else{dV=G;dW=cl}dX=dV;dY=0;dZ=dX;d_=dW;bj(dZ|0)}}else if((ao|0)==465){i=d;return an|0}else if((ao|0)==138){cl=b$(-1,-1)|0;d9=M;ea=cl;ao=140}else if((ao|0)==211){z=0;ar(106,0);if(!z){return 0}else{z=0;cl=b$(-1,-1)|0;eb=M;ec=cl;ao=239;break}}else if((ao|0)==341){cl=b$(-1,-1)|0;ed=M;ee=cl;ao=343}else if((ao|0)==344){cl=b$(-1,-1)|0;d1=M;d2=cl;ao=346}else if((ao|0)==407){z=0;ar(106,0);if(!z){return 0}else{z=0;cl=b$(-1,-1)|0;ef=M;eg=cl;ao=438;break}}else if((ao|0)==415){z=0;ar(106,0);if(!z){return 0}else{z=0;cl=b$(-1,-1)|0;eh=M;ei=cl;ao=441;break}}else if((ao|0)==240){cl=b$(-1,-1)|0;ej=M;ek=cl;ao=242}else if((ao|0)==243){cl=b$(-1,-1)|0;G=cl;cl=M;if((a[bC]&1)==0){el=c7;em=G;en=cl;ao=245;break}Tw(c[bG>>2]|0);el=c7;em=G;en=cl;ao=245}else if((ao|0)==436){cl=b$(-1,-1)|0;ef=M;eg=cl;ao=438}else if((ao|0)==439){cl=b$(-1,-1)|0;eh=M;ei=cl;ao=441}else if((ao|0)==442){cl=b$(-1,-1)|0;eo=1;ep=cl;eq=M;ao=445}else if((ao|0)==443){cl=b$(-1,-1)|0;G=cl;cl=M;if((a[aS]&1)==0){eo=dL;ep=G;eq=cl;ao=445;break}Tw(c[aW>>2]|0);eo=dL;ep=G;eq=cl;ao=445}else if((ao|0)==219){z=0;ar(106,0);if(!z){return 0}else{z=0;cl=b$(-1,-1)|0;ej=M;ek=cl;ao=242;break}}else if((ao|0)==459){cl=b$(-1,-1)|0;G=cl;cl=M;if((a[aD]&1)==0){dV=G;dW=cl;dX=dV;dY=0;dZ=dX;d_=dW;bj(dZ|0)}Tw(c[aw>>2]|0);dV=G;dW=cl;dX=dV;dY=0;dZ=dX;d_=dW;bj(dZ|0)}else if((ao|0)==83){z=0;ar(106,0);if(!z){return 0}else{z=0;cl=b$(-1,-1)|0;d$=M;d0=cl;ao=102;break}}else if((ao|0)==367){z=0;ar(106,0);if(!z){return 0}else{z=0;cl=b$(-1,-1)|0;d5=M;d6=cl;ao=388;break}}else if((ao|0)==159){z=0;ar(106,0);if(!z){return 0}else{z=0;cl=b$(-1,-1)|0;er=M;es=cl;ao=187;break}}else if((ao|0)==315){z=0;ar(106,0);if(!z){return 0}else{z=0;cl=b$(-1,-1)|0;ed=M;ee=cl;ao=343;break}}else if((ao|0)==289){cl=b$(-1,-1)|0;et=M;eu=cl;ao=291}else if((ao|0)==141){cl=b$(-1,-1)|0;G=cl;cl=M;if((a[bY]&1)==0){if(cP){ev=cl;ew=G;ao=144;break}else{dV=G;dW=cl}dX=dV;dY=0;dZ=dX;d_=dW;bj(dZ|0)}else{Tw(c[bZ>>2]|0);if(cP){ev=cl;ew=G;ao=144;break}else{dV=G;dW=cl}dX=dV;dY=0;dZ=dX;d_=dW;bj(dZ|0)}}else if((ao|0)==121){z=0;ar(106,0);if(!z){return 0}else{z=0;cl=b$(-1,-1)|0;d9=M;ea=cl;ao=140;break}}else if((ao|0)==188){cl=b$(-1,-1)|0;ex=M;ey=cl;ao=190}else if((ao|0)==25){L4(0);return 0}else if((ao|0)==292){cl=b$(-1,-1)|0;d3=M;d4=cl;ao=294}else if((ao|0)==347){cl=b$(-1,-1)|0;G=cl;cl=M;if((a[bd]&1)==0){ez=ds;eA=G;eB=cl;ao=349;break}Tw(c[bh>>2]|0);ez=ds;eA=G;eB=cl;ao=349}else if((ao|0)==191){cl=b$(-1,-1)|0;G=cl;cl=M;if((a[bO]&1)==0){eC=cZ;eD=G;eE=cl;ao=193;break}Tw(c[bS>>2]|0);eC=cZ;eD=G;eE=cl;ao=193}else if((ao|0)==237){cl=b$(-1,-1)|0;eb=M;ec=cl;ao=239}else if((ao|0)==185){cl=b$(-1,-1)|0;er=M;es=cl;ao=187}else if((ao|0)==55){cl=b$(-1,-1)|0;dR=cl;dS=M;ao=62}else if((ao|0)==167){z=0;ar(106,0);if(!z){return 0}else{z=0;cl=b$(-1,-1)|0;ex=M;ey=cl;ao=190;break}}else if((ao|0)==295){cl=b$(-1,-1)|0;G=cl;cl=M;if((a[bq]&1)==0){eF=dh;eG=G;eH=cl;ao=297;break}Tw(c[bu>>2]|0);eF=dh;eG=G;eH=cl;ao=297}else if((ao|0)==263){z=0;ar(106,0);if(!z){return 0}else{z=0;cl=b$(-1,-1)|0;et=M;eu=cl;ao=291;break}}}while(0);do{if((ao|0)==102){dT=d$;dU=d0;ao=106}else if((ao|0)==388){d7=d5;d8=d6;ao=392}else if((ao|0)==343){eI=ed;eJ=ee;ao=352}else if((ao|0)==242){el=1;em=ek;en=ej;ao=245}else if((ao|0)==438){eK=ef;eL=eg;ao=450}else if((ao|0)==441){eM=1;eN=ei;eO=eh;ao=447}else if((ao|0)==445){if((a[aL]&1)==0){eM=eo;eN=ep;eO=eq;ao=447;break}Tw(c[aV>>2]|0);eM=eo;eN=ep;eO=eq;ao=447}else if((ao|0)==140){ev=d9;ew=ea;ao=144}else if((ao|0)==187){eP=er;eQ=es;ao=196}else if((ao|0)==291){eR=et;eS=eu;ao=300}else if((ao|0)==294){eF=1;eG=d4;eH=d3;ao=297}else if((ao|0)==346){ez=1;eA=d2;eB=d1;ao=349}else if((ao|0)==190){eC=1;eD=ey;eE=ex;ao=193}else if((ao|0)==62){if((a[cb]&1)==0){dV=dR;dW=dS;dX=dV;dY=0;dZ=dX;d_=dW;bj(dZ|0)}Tw(c[cf>>2]|0);dV=dR;dW=dS;dX=dV;dY=0;dZ=dX;d_=dW;bj(dZ|0)}else if((ao|0)==239){eT=eb;eU=ec;ao=248}}while(0);do{if((ao|0)==106){cf=c[cz>>2]|0;cb=c[cA>>2]|0;L521:do{if((cf|0)==(cb|0)){eV=cf}else{aV=cf;while(1){aL=aV+4|0;if((c[aV>>2]|0)==(cB|0)){eV=aV;break L521}if((aL|0)==(cb|0)){eV=cb;break}else{aV=aL}}}}while(0);aV=eV-cf>>2;cn=cf+(aV+1<<2)|0;cm=cb-cn|0;TG(cf+(aV<<2)|0,cn|0,cm|0)|0;cn=cf+((cm>>2)+aV<<2)|0;aV=c[cA>>2]|0;if((cn|0)!=(aV|0)){c[cA>>2]=aV+(~((aV-4+(-cn|0)|0)>>>2)<<2)}Tw(cD);dV=dU;dW=dT;dX=dV;dY=0;dZ=dX;d_=dW;bj(dZ|0)}else if((ao|0)==447){if((a[aG]&1)==0){if(eM){eK=eO;eL=eN;ao=450;break}else{dV=eN;dW=eO}dX=dV;dY=0;dZ=dX;d_=dW;bj(dZ|0)}else{Tw(c[aU>>2]|0);if(eM){eK=eO;eL=eN;ao=450;break}else{dV=eN;dW=eO}dX=dV;dY=0;dZ=dX;d_=dW;bj(dZ|0)}}else if((ao|0)==144){cn=c[cI>>2]|0;aV=c[cJ>>2]|0;L537:do{if((cn|0)==(aV|0)){eW=cn}else{cm=cn;while(1){aL=cm+4|0;if((c[cm>>2]|0)==(cL|0)){eW=cm;break L537}if((aL|0)==(aV|0)){eW=aV;break}else{cm=aL}}}}while(0);cf=eW-cn>>2;cb=cn+(cf+1<<2)|0;cm=aV-cb|0;TG(cn+(cf<<2)|0,cb|0,cm|0)|0;cb=cn+((cm>>2)+cf<<2)|0;cf=c[cJ>>2]|0;if((cb|0)!=(cf|0)){c[cJ>>2]=cf+(~((cf-4+(-cb|0)|0)>>>2)<<2)}Tw(cN);dV=ew;dW=ev;dX=dV;dY=0;dZ=dX;d_=dW;bj(dZ|0)}else if((ao|0)==349){if((a[bb]&1)==0){if(ez){eI=eB;eJ=eA;ao=352;break}else{dV=eA;dW=eB}dX=dV;dY=0;dZ=dX;d_=dW;bj(dZ|0)}else{Tw(c[bg>>2]|0);if(ez){eI=eB;eJ=eA;ao=352;break}else{dV=eA;dW=eB}dX=dV;dY=0;dZ=dX;d_=dW;bj(dZ|0)}}else if((ao|0)==193){if((a[bM]&1)==0){if(eC){eP=eE;eQ=eD;ao=196;break}else{dV=eD;dW=eE}dX=dV;dY=0;dZ=dX;d_=dW;bj(dZ|0)}else{Tw(c[bR>>2]|0);if(eC){eP=eE;eQ=eD;ao=196;break}else{dV=eD;dW=eE}dX=dV;dY=0;dZ=dX;d_=dW;bj(dZ|0)}}else if((ao|0)==245){if((a[bA]&1)==0){if(el){eT=en;eU=em;ao=248;break}else{dV=em;dW=en}dX=dV;dY=0;dZ=dX;d_=dW;bj(dZ|0)}else{Tw(c[bF>>2]|0);if(el){eT=en;eU=em;ao=248;break}else{dV=em;dW=en}dX=dV;dY=0;dZ=dX;d_=dW;bj(dZ|0)}}else if((ao|0)==392){cb=c[dv>>2]|0;cf=c[dw>>2]|0;L565:do{if((cb|0)==(cf|0)){eX=cb}else{cm=cb;while(1){aL=cm+4|0;if((c[cm>>2]|0)==(dx|0)){eX=cm;break L565}if((aL|0)==(cf|0)){eX=cf;break}else{cm=aL}}}}while(0);cn=eX-cb>>2;aV=cb+(cn+1<<2)|0;cm=cf-aV|0;TG(cb+(cn<<2)|0,aV|0,cm|0)|0;aV=cb+((cm>>2)+cn<<2)|0;cn=c[dw>>2]|0;if((aV|0)!=(cn|0)){c[dw>>2]=cn+(~((cn-4+(-aV|0)|0)>>>2)<<2)}Tw(dz);dV=d8;dW=d7;dX=dV;dY=0;dZ=dX;d_=dW;bj(dZ|0)}else if((ao|0)==297){if((a[bo]&1)==0){if(eF){eR=eH;eS=eG;ao=300;break}else{dV=eG;dW=eH}dX=dV;dY=0;dZ=dX;d_=dW;bj(dZ|0)}else{Tw(c[bt>>2]|0);if(eF){eR=eH;eS=eG;ao=300;break}else{dV=eG;dW=eH}dX=dV;dY=0;dZ=dX;d_=dW;bj(dZ|0)}}}while(0);if((ao|0)==450){bt=c[dE>>2]|0;bo=c[dF>>2]|0;L582:do{if((bt|0)==(bo|0)){eY=bt}else{bF=bt;while(1){bA=bF+4|0;if((c[bF>>2]|0)==(dG|0)){eY=bF;break L582}if((bA|0)==(bo|0)){eY=bo;break}else{bF=bA}}}}while(0);bF=eY-bt>>2;cb=bt+(bF+1<<2)|0;cf=bo-cb|0;TG(bt+(bF<<2)|0,cb|0,cf|0)|0;cb=bt+((cf>>2)+bF<<2)|0;bF=c[dF>>2]|0;if((cb|0)!=(bF|0)){c[dF>>2]=bF+(~((bF-4+(-cb|0)|0)>>>2)<<2)}Tw(dI);dV=eL;dW=eK;dX=dV;dY=0;dZ=dX;d_=dW;bj(dZ|0)}else if((ao|0)==352){cb=c[dk>>2]|0;bF=c[dl>>2]|0;L592:do{if((cb|0)==(bF|0)){eZ=cb}else{cf=cb;while(1){bA=cf+4|0;if((c[cf>>2]|0)==(dm|0)){eZ=cf;break L592}if((bA|0)==(bF|0)){eZ=bF;break}else{cf=bA}}}}while(0);bt=eZ-cb>>2;bo=cb+(bt+1<<2)|0;cf=bF-bo|0;TG(cb+(bt<<2)|0,bo|0,cf|0)|0;bo=cb+((cf>>2)+bt<<2)|0;bt=c[dl>>2]|0;if((bo|0)!=(bt|0)){c[dl>>2]=bt+(~((bt-4+(-bo|0)|0)>>>2)<<2)}Tw(dp);dV=eJ;dW=eI;dX=dV;dY=0;dZ=dX;d_=dW;bj(dZ|0)}else if((ao|0)==196){bo=c[cS>>2]|0;bt=c[cT>>2]|0;L602:do{if((bo|0)==(bt|0)){e_=bo}else{cf=bo;while(1){bA=cf+4|0;if((c[cf>>2]|0)==(cU|0)){e_=cf;break L602}if((bA|0)==(bt|0)){e_=bt;break}else{cf=bA}}}}while(0);cb=e_-bo>>2;bF=bo+(cb+1<<2)|0;cf=bt-bF|0;TG(bo+(cb<<2)|0,bF|0,cf|0)|0;bF=bo+((cf>>2)+cb<<2)|0;cb=c[cT>>2]|0;if((bF|0)!=(cb|0)){c[cT>>2]=cb+(~((cb-4+(-bF|0)|0)>>>2)<<2)}Tw(cW);dV=eQ;dW=eP;dX=dV;dY=0;dZ=dX;d_=dW;bj(dZ|0)}else if((ao|0)==248){bF=c[c0>>2]|0;cb=c[c1>>2]|0;L612:do{if((bF|0)==(cb|0)){e$=bF}else{cf=bF;while(1){bA=cf+4|0;if((c[cf>>2]|0)==(c2|0)){e$=cf;break L612}if((bA|0)==(cb|0)){e$=cb;break}else{cf=bA}}}}while(0);bo=e$-bF>>2;bt=bF+(bo+1<<2)|0;cf=cb-bt|0;TG(bF+(bo<<2)|0,bt|0,cf|0)|0;bt=bF+((cf>>2)+bo<<2)|0;bo=c[c1>>2]|0;if((bt|0)!=(bo|0)){c[c1>>2]=bo+(~((bo-4+(-bt|0)|0)>>>2)<<2)}Tw(c4);dV=eU;dW=eT;dX=dV;dY=0;dZ=dX;d_=dW;bj(dZ|0)}else if((ao|0)==300){bt=c[da>>2]|0;bo=c[db>>2]|0;L622:do{if((bt|0)==(bo|0)){e0=bt}else{cf=bt;while(1){bA=cf+4|0;if((c[cf>>2]|0)==(dc|0)){e0=cf;break L622}if((bA|0)==(bo|0)){e0=bo;break}else{cf=bA}}}}while(0);bF=e0-bt>>2;cb=bt+(bF+1<<2)|0;cf=bo-cb|0;TG(bt+(bF<<2)|0,cb|0,cf|0)|0;cb=bt+((cf>>2)+bF<<2)|0;bF=c[db>>2]|0;if((cb|0)!=(bF|0)){c[db>>2]=bF+(~((bF-4+(-cb|0)|0)>>>2)<<2)}Tw(de);dV=eS;dW=eR;dX=dV;dY=0;dZ=dX;d_=dW;bj(dZ|0)}}}while(0);eR=c[ai>>2]|0;ai=c[ak>>2]|0;L632:do{if((eR|0)==(ai|0)){e1=eR}else{eS=eR;while(1){de=eS+4|0;if((c[eS>>2]|0)==(am|0)){e1=eS;break L632}if((de|0)==(ai|0)){e1=ai;break}else{eS=de}}}}while(0);am=e1-eR>>2;e1=eR+(am+1<<2)|0;eS=ai-e1|0;TG(eR+(am<<2)|0,e1|0,eS|0)|0;e1=eR+((eS>>2)+am<<2)|0;am=c[ak>>2]|0;if((e1|0)!=(am|0)){c[ak>>2]=am+(~((am-4+(-e1|0)|0)>>>2)<<2)}Tw(aj);dV=ax;dW=ay;dX=dV;dY=0;dZ=dX;d_=dW;bj(dZ|0);return 0}function Au(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=Fk(e)|0;if((f|0)==0){g=0;return g|0}h=(Ek(f)|0)!=0;i=h?0:f;if((i|0)==0){g=0;return g|0}f=b+48|0;h=c[f>>2]|0;j=c[d>>2]|0;L7:do{if(j>>>0<i>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L7}else{n=l}m=k+1|0;if(m>>>0<i>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[f>>2]=h+o;h=e-1|0;L14:do{if(h>>>0<j>>>0){p=0}else{f=0;n=h;while(1){l=f+1|0;if((a[n]|0)==10){p=f;break L14}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{f=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=i;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=i;g=i;return g|0}function Av(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=Fl(e)|0;if((f|0)==0){g=0;return g|0}h=(Ek(f)|0)!=0;i=h?0:f;if((i|0)==0){g=0;return g|0}f=b+48|0;h=c[f>>2]|0;j=c[d>>2]|0;L7:do{if(j>>>0<i>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==0){n=l;break L7}else if((m<<24>>24|0)==10){o=l+1|0}else{o=l}m=k+1|0;if(m>>>0<i>>>0){k=m;l=o}else{n=o;break}}}else{n=0}}while(0);c[f>>2]=h+n;h=e-1|0;L14:do{if(h>>>0<j>>>0){p=0}else{f=0;o=h;while(1){l=f+1|0;if((a[o]|0)==10){p=f;break L14}k=o-1|0;if(k>>>0<j>>>0){p=l;break}else{f=l;o=k}}}}while(0);j=b+40|0;if((n|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=i;n=e;c[b+40>>2]=j-n+p+q;q=b+56|0;c[q>>2]=n;c[q+4>>2]=j;c[d>>2]=i;g=i;return g|0}function Aw(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=EM(e)|0;if((f|0)==0){g=0;return g|0}h=(Ek(f)|0)!=0;i=h?0:f;if((i|0)==0){g=0;return g|0}f=b+48|0;h=c[f>>2]|0;j=c[d>>2]|0;L7:do{if(j>>>0<i>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==0){n=l;break L7}else if((m<<24>>24|0)==10){o=l+1|0}else{o=l}m=k+1|0;if(m>>>0<i>>>0){k=m;l=o}else{n=o;break}}}else{n=0}}while(0);c[f>>2]=h+n;h=e-1|0;L14:do{if(h>>>0<j>>>0){p=0}else{f=0;o=h;while(1){l=f+1|0;if((a[o]|0)==10){p=f;break L14}k=o-1|0;if(k>>>0<j>>>0){p=l;break}else{f=l;o=k}}}}while(0);j=b+40|0;if((n|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=i;n=e;c[b+40>>2]=j-n+p+q;q=b+56|0;c[q>>2]=n;c[q+4>>2]=j;c[d>>2]=i;g=i;return g|0}function Ax(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=E$(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L4}else{n=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[h>>2]=i+o;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;n=i;while(1){l=h+1|0;if((a[n]|0)==10){p=h;break L11}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function Ay(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=E0(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==0){n=l;break L4}else if((m<<24>>24|0)==10){o=l+1|0}else{o=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=o}else{n=o;break}}}else{n=0}}while(0);c[h>>2]=i+n;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;o=i;while(1){l=h+1|0;if((a[o]|0)==10){p=h;break L11}k=o-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;o=k}}}}while(0);j=b+40|0;if((n|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;n=e;c[b+40>>2]=j-n+p+q;q=b+56|0;c[q>>2]=n;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function Az(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=E1(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L4}else{n=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[h>>2]=i+o;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;n=i;while(1){l=h+1|0;if((a[n]|0)==10){p=h;break L11}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function AA(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=(a[e]|0)==37?e+1|0:0;if((f|0)==0){g=0;return g|0}h=E$(f)|0;i=(h|0)!=0?h:f;if((i|0)==0){g=0;return g|0}f=b+48|0;h=c[f>>2]|0;j=c[d>>2]|0;L7:do{if(j>>>0<i>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L7}else{n=l}m=k+1|0;if(m>>>0<i>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[f>>2]=h+o;h=e-1|0;L14:do{if(h>>>0<j>>>0){p=0}else{f=0;n=h;while(1){l=f+1|0;if((a[n]|0)==10){p=f;break L14}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{f=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=i;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=i;g=i;return g|0}function AB(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=FB(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L4}else{n=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[h>>2]=i+o;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;n=i;while(1){l=h+1|0;if((a[n]|0)==10){p=h;break L11}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function AC(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=Fw(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==0){n=l;break L4}else if((m<<24>>24|0)==10){o=l+1|0}else{o=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=o}else{n=o;break}}}else{n=0}}while(0);c[h>>2]=i+n;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;o=i;while(1){l=h+1|0;if((a[o]|0)==10){p=h;break L11}k=o-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;o=k}}}}while(0);j=b+40|0;if((n|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;n=e;c[b+40>>2]=j-n+p+q;q=b+56|0;c[q>>2]=n;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function AD(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=Eo(e)|0;do{if((f|0)==0){g=Ek(e)|0;if((g|0)==0){h=0}else{i=g;break}return h|0}else{i=f}}while(0);f=b+48|0;g=c[f>>2]|0;j=c[d>>2]|0;L5:do{if(j>>>0<i>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==0){n=l;break L5}else if((m<<24>>24|0)==10){o=l+1|0}else{o=l}m=k+1|0;if(m>>>0<i>>>0){k=m;l=o}else{n=o;break}}}else{n=0}}while(0);c[f>>2]=g+n;g=e-1|0;L12:do{if(g>>>0<j>>>0){p=0}else{f=0;o=g;while(1){l=f+1|0;if((a[o]|0)==10){p=f;break L12}k=o-1|0;if(k>>>0<j>>>0){p=l;break}else{f=l;o=k}}}}while(0);j=b+40|0;if((n|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=i;n=e;c[b+40>>2]=j-n+p+q;q=b+56|0;c[q>>2]=n;c[q+4>>2]=j;c[d>>2]=i;h=i;return h|0}function AE(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=Eo(e)|0;do{if((f|0)==0){g=Ek(e)|0;if((g|0)!=0){h=g;break}g=EX(e)|0;if((g|0)!=0){h=g;break}g=E1(e)|0;if((g|0)==0){i=0}else{h=g;break}return i|0}else{h=f}}while(0);f=b+48|0;g=c[f>>2]|0;j=c[d>>2]|0;L7:do{if(j>>>0<h>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==0){n=l;break L7}else if((m<<24>>24|0)==10){o=l+1|0}else{o=l}m=k+1|0;if(m>>>0<h>>>0){k=m;l=o}else{n=o;break}}}else{n=0}}while(0);c[f>>2]=g+n;g=e-1|0;L14:do{if(g>>>0<j>>>0){p=0}else{f=0;o=g;while(1){l=f+1|0;if((a[o]|0)==10){p=f;break L14}k=o-1|0;if(k>>>0<j>>>0){p=l;break}else{f=l;o=k}}}}while(0);j=b+40|0;if((n|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=h;n=e;c[b+40>>2]=j-n+p+q;q=b+56|0;c[q>>2]=n;c[q+4>>2]=j;c[d>>2]=h;i=h;return i|0}function AF(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=Eh(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L4}else{n=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[h>>2]=i+o;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;n=i;while(1){l=h+1|0;if((a[n]|0)==10){p=h;break L11}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function AG(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=(a[e]|0)==42?e+1|0:e;if((f|0)==0){g=0;return g|0}h=Eo(f)|0;if((h|0)==0){g=0;return g|0}f=b+48|0;i=c[f>>2]|0;j=c[d>>2]|0;L7:do{if(j>>>0<h>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L7}else{n=l}m=k+1|0;if(m>>>0<h>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[f>>2]=i+o;i=e-1|0;L14:do{if(i>>>0<j>>>0){p=0}else{f=0;n=i;while(1){l=f+1|0;if((a[n]|0)==10){p=f;break L14}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{f=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=h;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=h;g=h;return g|0}function AH(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=EA(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L4}else{n=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[h>>2]=i+o;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;n=i;while(1){l=h+1|0;if((a[n]|0)==10){p=h;break L11}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function AI(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=a[45304]|0;L1:do{if(f<<24>>24==0){g=e;h=0}else{i=e;j=45304;k=f;while(1){if((a[i]|0)!=k<<24>>24){g=i;h=k;break L1}l=i+1|0;m=j+1|0;n=a[m]|0;if(n<<24>>24==0){g=l;h=0;break}else{i=l;j=m;k=n}}}}while(0);f=h<<24>>24!=0?0:g;if((f|0)==0){o=0;return o|0}g=b+48|0;h=c[g>>2]|0;k=c[d>>2]|0;L9:do{if(k>>>0<f>>>0){j=k;i=0;while(1){n=a[j]|0;if((n<<24>>24|0)==10){p=i+1|0}else if((n<<24>>24|0)==0){q=i;break L9}else{p=i}n=j+1|0;if(n>>>0<f>>>0){j=n;i=p}else{q=p;break}}}else{q=0}}while(0);c[g>>2]=h+q;h=e-1|0;L16:do{if(h>>>0<k>>>0){r=0}else{g=0;p=h;while(1){i=g+1|0;if((a[p]|0)==10){r=g;break L16}j=p-1|0;if(j>>>0<k>>>0){r=i;break}else{g=i;p=j}}}}while(0);k=b+40|0;if((q|0)==0){s=c[k>>2]|0}else{c[k>>2]=1;s=1}c[b+52>>2]=s+r;k=f;q=e;c[b+40>>2]=k-q+r+s;s=b+56|0;c[s>>2]=q;c[s+4>>2]=k;c[d>>2]=f;o=f;return o|0}function AJ(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=EB(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==0){n=l;break L4}else if((m<<24>>24|0)==10){o=l+1|0}else{o=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=o}else{n=o;break}}}else{n=0}}while(0);c[h>>2]=i+n;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;o=i;while(1){l=h+1|0;if((a[o]|0)==10){p=h;break L11}k=o-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;o=k}}}}while(0);j=b+40|0;if((n|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;n=e;c[b+40>>2]=j-n+p+q;q=b+56|0;c[q>>2]=n;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function AK(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=EC(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==0){n=l;break L4}else if((m<<24>>24|0)==10){o=l+1|0}else{o=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=o}else{n=o;break}}}else{n=0}}while(0);c[h>>2]=i+n;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;o=i;while(1){l=h+1|0;if((a[o]|0)==10){p=h;break L11}k=o-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;o=k}}}}while(0);j=b+40|0;if((n|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;n=e;c[b+40>>2]=j-n+p+q;q=b+56|0;c[q>>2]=n;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function AL(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=ED(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L4}else{n=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[h>>2]=i+o;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;n=i;while(1){l=h+1|0;if((a[n]|0)==10){p=h;break L11}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function AM(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=EF(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==0){n=l;break L4}else if((m<<24>>24|0)==10){o=l+1|0}else{o=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=o}else{n=o;break}}}else{n=0}}while(0);c[h>>2]=i+n;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;o=i;while(1){l=h+1|0;if((a[o]|0)==10){p=h;break L11}k=o-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;o=k}}}}while(0);j=b+40|0;if((n|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;n=e;c[b+40>>2]=j-n+p+q;q=b+56|0;c[q>>2]=n;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function AN(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=EE(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L4}else{n=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[h>>2]=i+o;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;n=i;while(1){l=h+1|0;if((a[n]|0)==10){p=h;break L11}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function AO(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=EG(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==0){n=l;break L4}else if((m<<24>>24|0)==10){o=l+1|0}else{o=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=o}else{n=o;break}}}else{n=0}}while(0);c[h>>2]=i+n;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;o=i;while(1){l=h+1|0;if((a[o]|0)==10){p=h;break L11}k=o-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;o=k}}}}while(0);j=b+40|0;if((n|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;n=e;c[b+40>>2]=j-n+p+q;q=b+56|0;c[q>>2]=n;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function AP(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=EH(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==0){n=l;break L4}else if((m<<24>>24|0)==10){o=l+1|0}else{o=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=o}else{n=o;break}}}else{n=0}}while(0);c[h>>2]=i+n;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;o=i;while(1){l=h+1|0;if((a[o]|0)==10){p=h;break L11}k=o-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;o=k}}}}while(0);j=b+40|0;if((n|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;n=e;c[b+40>>2]=j-n+p+q;q=b+56|0;c[q>>2]=n;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function AQ(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=EI(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L4}else{n=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[h>>2]=i+o;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;n=i;while(1){l=h+1|0;if((a[n]|0)==10){p=h;break L11}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function AR(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=Es(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==0){n=l;break L4}else if((m<<24>>24|0)==10){o=l+1|0}else{o=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=o}else{n=o;break}}}else{n=0}}while(0);c[h>>2]=i+n;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;o=i;while(1){l=h+1|0;if((a[o]|0)==10){p=h;break L11}k=o-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;o=k}}}}while(0);j=b+40|0;if((n|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;n=e;c[b+40>>2]=j-n+p+q;q=b+56|0;c[q>>2]=n;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function AS(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0;d=i;i=i+56|0;e=d|0;f=d+8|0;g=d+16|0;h=d+32|0;j=d+40|0;k=c[b>>2]|0;l=Tu(64)|0;c[h>>2]=l;m=k+4|0;n=c[m>>2]|0;if((n|0)==(c[k+8>>2]|0)){fr(k|0,h);o=c[h>>2]|0}else{if((n|0)==0){p=0}else{c[n>>2]=l;p=c[m>>2]|0}c[m>>2]=p+4;o=l}l=o;p=o;n=b+28|0;L8:do{if((a[n]&1)==0){h=j;c[h>>2]=c[n>>2];c[h+4>>2]=c[n+4>>2];c[h+8>>2]=c[n+8>>2];q=16}else{h=c[b+36>>2]|0;r=c[b+32>>2]|0;do{if(r>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(r>>>0<11>>>0){a[j]=r<<1;s=j+1|0}else{t=r+16&-16;u=(z=0,av(316,t|0)|0);if(z){z=0;break}c[j+8>>2]=u;c[j>>2]=t|1;c[j+4>>2]=r;s=u}TF(s|0,h|0,r)|0;a[s+r|0]=0;q=16;break L8}}while(0);r=b$(-1,-1)|0;v=M;w=r}}while(0);do{if((q|0)==16){s=b+44|0;n=g;c[n>>2]=c[s>>2];c[n+4>>2]=c[s+4>>2];c[n+8>>2]=c[s+8>>2];z=0;aE(34,p|0,j|0,g|0,0,1,0);if(z){z=0;s=b$(-1,-1)|0;n=s;s=M;if((a[j]&1)==0){v=s;w=n;break}Tw(c[j+8>>2]|0);v=s;w=n;break}if((a[j]&1)!=0){Tw(c[j+8>>2]|0)}n=b+20|0;if((a[Ej(c[n>>2]|0)|0]|0)!=123){s=o+36|0;r=s;h=AT(b)|0;c[f>>2]=h;c[s+16>>2]=0;u=s+8|0;t=u;x=c[t>>2]|0;if((x|0)==(c[s+12>>2]|0)){fL(s+4|0,f);y=c[f>>2]|0}else{if((x|0)==0){A=0}else{c[x>>2]=h;A=c[t>>2]|0}c[u>>2]=A+4;y=h}cK[c[c[s>>2]>>2]&1023](r,y);}r=Ej(c[n>>2]|0)|0;if((a[r]|0)!=44){i=d;return p|0}s=b+48|0;h=b+40|0;u=b+52|0;t=b+56|0;x=o+36|0;B=x;C=x+16|0;D=x+8|0;E=D;F=x+12|0;G=x+4|0;H=x;x=r;I=r;while(1){r=I+1|0;J=c[s>>2]|0;K=c[n>>2]|0;L45:do{if(K>>>0<r>>>0){L=K;N=0;while(1){O=a[L]|0;if((O<<24>>24|0)==0){P=N;break L45}else if((O<<24>>24|0)==10){Q=N+1|0}else{Q=N}if((L|0)<(I|0)){L=L+1|0;N=Q}else{P=Q;break}}}else{P=0}}while(0);c[s>>2]=P+J;N=x-1|0;L52:do{if(N>>>0<K>>>0){R=0}else{L=0;O=N;while(1){S=L+1|0;if((a[O]|0)==10){R=L;break L52}T=O-1|0;if(T>>>0<K>>>0){R=S;break}else{L=S;O=T}}}}while(0);if((P|0)==0){U=c[h>>2]|0}else{c[h>>2]=1;U=1}c[u>>2]=U+R;K=r;N=x;c[h>>2]=K-N+R+U;c[t>>2]=N;c[t+4>>2]=K;c[n>>2]=r;if(0){q=57;break}K=AT(b)|0;c[e>>2]=K;c[C>>2]=0;N=c[E>>2]|0;if((N|0)==(c[F>>2]|0)){fL(G,e);V=c[e>>2]|0}else{if((N|0)==0){W=0}else{c[N>>2]=K;W=c[E>>2]|0}c[D>>2]=W+4;V=K}cK[c[c[H>>2]>>2]&1023](B,V);K=Ej(c[n>>2]|0)|0;if((a[K]|0)==44){x=K;I=K}else{q=59;break}}if((q|0)==59){i=d;return p|0}else if((q|0)==57){i=d;return p|0}}}while(0);p=c[k>>2]|0;k=c[m>>2]|0;L73:do{if((p|0)==(k|0)){X=p}else{d=p;while(1){q=d+4|0;if((c[d>>2]|0)==(o|0)){X=d;break L73}if((q|0)==(k|0)){X=k;break}else{d=q}}}}while(0);o=X-p>>2;X=p+(o+1<<2)|0;d=k-X|0;TG(p+(o<<2)|0,X|0,d|0)|0;X=p+((d>>2)+o<<2)|0;o=c[m>>2]|0;if((X|0)==(o|0)){Tw(l);Y=w;Z=0;_=Y;$=v;bj(_|0)}c[m>>2]=o+(~((o-4+(-X|0)|0)>>>2)<<2);Tw(l);Y=w;Z=0;_=Y;$=v;bj(_|0);return 0}function AT(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0;d=i;i=i+96|0;e=d|0;f=d+8|0;g=d+16|0;h=d+32|0;j=d+40|0;k=d+56|0;l=d+64|0;m=d+80|0;n=b|0;o=c[n>>2]|0;p=Tu(64)|0;c[k>>2]=p;q=o+4|0;r=c[q>>2]|0;if((r|0)==(c[o+8>>2]|0)){fr(o|0,k);s=c[k>>2]|0}else{if((r|0)==0){t=0}else{c[r>>2]=p;t=c[q>>2]|0}c[q>>2]=t+4;s=p}p=s;t=s;r=b+28|0;L8:do{if((a[r]&1)==0){k=l;c[k>>2]=c[r>>2];c[k+4>>2]=c[r+4>>2];c[k+8>>2]=c[r+8>>2];u=16}else{k=c[b+36>>2]|0;v=c[b+32>>2]|0;do{if(v>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(v>>>0<11>>>0){a[l]=v<<1;w=l+1|0}else{x=v+16&-16;y=(z=0,av(316,x|0)|0);if(z){z=0;break}c[l+8>>2]=y;c[l>>2]=x|1;c[l+4>>2]=v;w=y}TF(w|0,k|0,v)|0;a[w+v|0]=0;u=16;break L8}}while(0);v=b$(-1,-1)|0;A=M;B=v}}while(0);do{if((u|0)==16){w=b+44|0;v=j;c[v>>2]=c[w>>2];c[v+4>>2]=c[w+4>>2];c[v+8>>2]=c[w+8>>2];z=0;aK(100,t|0,l|0,j|0,0,0,0,0);if(z){z=0;v=b$(-1,-1)|0;k=v;v=M;if((a[l]&1)==0){A=v;B=k;break}Tw(c[l+8>>2]|0);A=v;B=k;break}if((a[l]&1)!=0){Tw(c[l+8>>2]|0)}do{if((AU(b)|0)==0){if((AV(b)|0)==0){break}a[t+61|0]=1}else{a[s+60|0]=1}}while(0);L35:do{if((Eo(Ej(c[b+20>>2]|0)|0)|0)==0){if((y8(b)|0)==0){k=s+36|0;v=k;y=AW(b)|0;c[f>>2]=y;c[k+16>>2]=0;x=k+8|0;C=x;D=c[C>>2]|0;if((D|0)==(c[k+12>>2]|0)){k1(k+4|0,f);E=c[f>>2]|0}else{if((D|0)==0){F=0}else{c[D>>2]=y;F=c[C>>2]|0}c[x>>2]=F+4;E=y}cK[c[c[k>>2]>>2]&1023](v,E);break}v=c[n>>2]|0;k=Tu(68)|0;c[h>>2]=k;y=v+4|0;x=c[y>>2]|0;if((x|0)==(c[v+8>>2]|0)){fr(v|0,h);G=c[h>>2]|0}else{if((x|0)==0){H=0}else{c[x>>2]=k;H=c[y>>2]|0}c[y>>2]=H+4;G=k}k=G;L55:do{if((a[r]&1)==0){x=m;c[x>>2]=c[r>>2];c[x+4>>2]=c[r+4>>2];c[x+8>>2]=c[r+8>>2];u=50}else{x=c[b+36>>2]|0;C=c[b+32>>2]|0;do{if(C>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(C>>>0<11>>>0){a[m]=C<<1;I=m+1|0}else{D=C+16&-16;J=(z=0,av(316,D|0)|0);if(z){z=0;break}c[m+8>>2]=J;c[m>>2]=D|1;c[m+4>>2]=C;I=J}TF(I|0,x|0,C)|0;a[I+C|0]=0;u=50;break L55}}while(0);C=b$(-1,-1)|0;K=M;L=C}}while(0);do{if((u|0)==50){C=g;c[C>>2]=c[w>>2];c[C+4>>2]=c[w+4>>2];c[C+8>>2]=c[w+8>>2];z=0;aq(14,G|0,m|0,g|0,b+56|0,0);if(!z){c[s+56>>2]=G;if((a[m]&1)==0){break L35}Tw(c[m+8>>2]|0);break L35}else{z=0;C=b$(-1,-1)|0;x=C;C=M;if((a[m]&1)==0){K=C;L=x;break}Tw(c[m+8>>2]|0);K=C;L=x;break}}}while(0);x=c[v>>2]|0;C=c[y>>2]|0;L76:do{if((x|0)==(C|0)){N=x}else{J=x;while(1){D=J+4|0;if((c[J>>2]|0)==(G|0)){N=J;break L76}if((D|0)==(C|0)){N=C;break}else{J=D}}}}while(0);v=N-x>>2;J=x+(v+1<<2)|0;D=C-J|0;TG(x+(v<<2)|0,J|0,D|0)|0;J=x+((D>>2)+v<<2)|0;v=c[y>>2]|0;if((J|0)!=(v|0)){c[y>>2]=v+(~((v-4+(-J|0)|0)>>>2)<<2)}Tw(k);O=K;P=L;Q=P;R=0;S=Q;T=O;bj(S|0)}else{c[s+56>>2]=zk(b)|0}}while(0);if((AX(b)|0)==0){i=d;return t|0}w=s+36|0;J=w;v=w+16|0;D=w+8|0;U=D;V=w+12|0;W=w+4|0;X=w;do{w=AW(b)|0;c[e>>2]=w;c[v>>2]=0;Y=c[U>>2]|0;if((Y|0)==(c[V>>2]|0)){k1(W,e);Z=c[e>>2]|0}else{if((Y|0)==0){_=0}else{c[Y>>2]=w;_=c[U>>2]|0}c[D>>2]=_+4;Z=w}cK[c[c[X>>2]>>2]&1023](J,Z);}while((AX(b)|0)!=0);i=d;return t|0}}while(0);t=c[o>>2]|0;o=c[q>>2]|0;L100:do{if((t|0)==(o|0)){$=t}else{d=t;while(1){b=d+4|0;if((c[d>>2]|0)==(s|0)){$=d;break L100}if((b|0)==(o|0)){$=o;break}else{d=b}}}}while(0);s=$-t>>2;$=t+(s+1<<2)|0;d=o-$|0;TG(t+(s<<2)|0,$|0,d|0)|0;$=t+((d>>2)+s<<2)|0;s=c[q>>2]|0;if(($|0)!=(s|0)){c[q>>2]=s+(~((s-4+(-$|0)|0)>>>2)<<2)}Tw(p);O=A;P=B;Q=P;R=0;S=Q;T=O;bj(S|0);return 0}function AU(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=a[45192]|0;L1:do{if(f<<24>>24==0){g=e;h=0}else{i=e;j=45192;k=f;while(1){if((a[i]|0)!=k<<24>>24){g=i;h=k;break L1}l=i+1|0;m=j+1|0;n=a[m]|0;if(n<<24>>24==0){g=l;h=0;break}else{i=l;j=m;k=n}}}}while(0);f=h<<24>>24!=0?0:g;if((f|0)==0){o=0;return o|0}g=b+48|0;h=c[g>>2]|0;k=c[d>>2]|0;L9:do{if(k>>>0<f>>>0){j=k;i=0;while(1){n=a[j]|0;if((n<<24>>24|0)==0){p=i;break L9}else if((n<<24>>24|0)==10){q=i+1|0}else{q=i}n=j+1|0;if(n>>>0<f>>>0){j=n;i=q}else{p=q;break}}}else{p=0}}while(0);c[g>>2]=h+p;h=e-1|0;L16:do{if(h>>>0<k>>>0){r=0}else{g=0;q=h;while(1){i=g+1|0;if((a[q]|0)==10){r=g;break L16}j=q-1|0;if(j>>>0<k>>>0){r=i;break}else{g=i;q=j}}}}while(0);k=b+40|0;if((p|0)==0){s=c[k>>2]|0}else{c[k>>2]=1;s=1}c[b+52>>2]=s+r;k=f;p=e;c[b+40>>2]=k-p+r+s;s=b+56|0;c[s>>2]=p;c[s+4>>2]=k;c[d>>2]=f;o=f;return o|0}function AV(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=a[45112]|0;L1:do{if(f<<24>>24==0){g=e;h=0}else{i=e;j=45112;k=f;while(1){if((a[i]|0)!=k<<24>>24){g=i;h=k;break L1}l=i+1|0;m=j+1|0;n=a[m]|0;if(n<<24>>24==0){g=l;h=0;break}else{i=l;j=m;k=n}}}}while(0);f=h<<24>>24!=0?0:g;if((f|0)==0){o=0;return o|0}g=b+48|0;h=c[g>>2]|0;k=c[d>>2]|0;L9:do{if(k>>>0<f>>>0){j=k;i=0;while(1){n=a[j]|0;if((n<<24>>24|0)==10){p=i+1|0}else if((n<<24>>24|0)==0){q=i;break L9}else{p=i}n=j+1|0;if(n>>>0<f>>>0){j=n;i=p}else{q=p;break}}}else{q=0}}while(0);c[g>>2]=h+q;h=e-1|0;L16:do{if(h>>>0<k>>>0){r=0}else{g=0;p=h;while(1){i=g+1|0;if((a[p]|0)==10){r=g;break L16}j=p-1|0;if(j>>>0<k>>>0){r=i;break}else{g=i;p=j}}}}while(0);k=b+40|0;if((q|0)==0){s=c[k>>2]|0}else{c[k>>2]=1;s=1}c[b+52>>2]=s+r;k=f;q=e;c[b+40>>2]=k-q+r+s;s=b+56|0;c[s>>2]=q;c[s+4>>2]=k;c[d>>2]=f;o=f;return o|0}function AW(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0,af=0,ag=0;d=i;i=i+176|0;e=d|0;f=d+8|0;g=d+16|0;h=d+32|0;j=d+48|0;k=d+64|0;l=d+80|0;m=d+96|0;n=d+112|0;o=d+128|0;p=d+144|0;q=d+160|0;r=b+20|0;if((Eo(Ej(c[r>>2]|0)|0)|0)!=0){s=zk(b)|0;t=c[b>>2]|0;u=Tu(48)|0;c[f>>2]=u;v=t+4|0;w=c[v>>2]|0;if((w|0)==(c[t+8>>2]|0)){fr(t|0,f);x=c[f>>2]|0}else{if((w|0)==0){y=0}else{c[w>>2]=u;y=c[v>>2]|0}c[v>>2]=y+4;x=u}u=x;y=x;w=b+28|0;L10:do{if((a[w]&1)==0){f=g;c[f>>2]=c[w>>2];c[f+4>>2]=c[w+4>>2];c[f+8>>2]=c[w+8>>2];A=17}else{f=c[b+36>>2]|0;B=c[b+32>>2]|0;do{if(B>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(B>>>0<11>>>0){a[g]=B<<1;C=g+1|0}else{D=B+16&-16;E=(z=0,av(316,D|0)|0);if(z){z=0;break}c[g+8>>2]=E;c[g>>2]=D|1;c[g+4>>2]=B;C=E}TF(C|0,f|0,B)|0;a[C+B|0]=0;A=17;break L10}}while(0);B=b$(-1,-1)|0;F=M;G=B}}while(0);do{if((A|0)==17){C=h;w=b+44|0;c[C>>2]=c[w>>2];c[C+4>>2]=c[w+4>>2];c[C+8>>2]=c[w+8>>2];z=0;aE(36,y|0,g|0,h|0,s|0,0,1);if(z){z=0;w=b$(-1,-1)|0;C=w;w=M;if((a[g]&1)==0){F=w;G=C;break}Tw(c[g+8>>2]|0);F=w;G=C;break}if((a[g]&1)==0){H=y;i=d;return H|0}Tw(c[g+8>>2]|0);H=y;i=d;return H|0}}while(0);y=c[t>>2]|0;t=c[v>>2]|0;L34:do{if((y|0)==(t|0)){I=y}else{g=y;while(1){s=g+4|0;if((c[g>>2]|0)==(x|0)){I=g;break L34}if((s|0)==(t|0)){I=t;break}else{g=s}}}}while(0);x=I-y>>2;I=y+(x+1<<2)|0;g=t-I|0;TG(y+(x<<2)|0,I|0,g|0)|0;I=y+((g>>2)+x<<2)|0;x=c[v>>2]|0;if((I|0)!=(x|0)){c[v>>2]=x+(~((x-4+(-I|0)|0)>>>2)<<2)}Tw(u);J=F;K=G;L=K;N=0;O=L;P=J;bj(O|0)}G=Ej(c[r>>2]|0)|0;F=(a[G]|0)==40?G+1|0:0;do{if((F|0)==0){u=Tu(48)|0;I=j+8|0;c[I>>2]=u;c[j>>2]=49;c[j+4>>2]=42;TF(u|0,2360,42)|0;a[u+42|0]=0;c[k>>2]=0;c[k+4>>2]=0;c[k+8>>2]=0;z=0;aT(362,b|0,j|0,k|0);if(!z){if((a[j]&1)==0){break}Tw(c[I>>2]|0);break}else{z=0}u=b$(-1,-1)|0;x=u;u=M;if((a[j]&1)==0){J=u;K=x;L=K;N=0;O=L;P=J;bj(O|0)}Tw(c[I>>2]|0);J=u;K=x;L=K;N=0;O=L;P=J;bj(O|0)}else{x=b+48|0;u=c[x>>2]|0;I=c[r>>2]|0;L46:do{if(I>>>0<F>>>0){v=I;g=0;while(1){y=a[v]|0;if((y<<24>>24|0)==10){Q=g+1|0}else if((y<<24>>24|0)==0){R=g;break L46}else{Q=g}y=v+1|0;if(y>>>0<F>>>0){v=y;g=Q}else{R=Q;break}}}else{R=0}}while(0);c[x>>2]=R+u;g=G-1|0;L53:do{if(g>>>0<I>>>0){S=0}else{v=0;y=g;while(1){t=v+1|0;if((a[y]|0)==10){S=v;break L53}s=y-1|0;if(s>>>0<I>>>0){S=t;break}else{v=t;y=s}}}}while(0);I=b+40|0;if((R|0)==0){T=c[I>>2]|0}else{c[I>>2]=1;T=1}c[b+52>>2]=T+S;g=F;u=G;c[I>>2]=g-u+S+T;I=b+56|0;c[I>>2]=u;c[I+4>>2]=g;c[r>>2]=F}}while(0);do{if((a[Ej(c[r>>2]|0)|0]|0)==41){F=Tu(64)|0;T=l+8|0;c[T>>2]=F;c[l>>2]=65;c[l+4>>2]=48;TF(F|0,2216,48)|0;a[F+48|0]=0;c[m>>2]=0;c[m+4>>2]=0;c[m+8>>2]=0;z=0;aT(362,b|0,l|0,m|0);if(!z){if((a[l]&1)==0){break}Tw(c[T>>2]|0);break}else{z=0}F=b$(-1,-1)|0;S=F;F=M;if((a[l]&1)==0){J=F;K=S;L=K;N=0;O=L;P=J;bj(O|0)}Tw(c[T>>2]|0);J=F;K=S;L=K;N=0;O=L;P=J;bj(O|0)}}while(0);l=z4(b)|0;m=Ej(c[r>>2]|0)|0;S=(a[m]|0)==58?m+1|0:0;if((S|0)==0){U=0}else{F=b+48|0;T=c[F>>2]|0;G=c[r>>2]|0;L85:do{if(G>>>0<S>>>0){R=G;Q=0;while(1){j=a[R]|0;if((j<<24>>24|0)==10){V=Q+1|0}else if((j<<24>>24|0)==0){W=Q;break L85}else{V=Q}j=R+1|0;if(j>>>0<S>>>0){R=j;Q=V}else{W=V;break}}}else{W=0}}while(0);c[F>>2]=W+T;T=m-1|0;L92:do{if(T>>>0<G>>>0){X=0}else{F=0;V=T;while(1){Q=F+1|0;if((a[V]|0)==10){X=F;break L92}R=V-1|0;if(R>>>0<G>>>0){X=Q;break}else{F=Q;V=R}}}}while(0);G=b+40|0;if((W|0)==0){Y=c[G>>2]|0}else{c[G>>2]=1;Y=1}c[b+52>>2]=Y+X;W=S;T=m;c[G>>2]=W-T+X+Y;Y=b+56|0;c[Y>>2]=T;c[Y+4>>2]=W;c[r>>2]=S;U=zZ(b)|0}S=Ej(c[r>>2]|0)|0;W=(a[S]|0)==41?S+1|0:0;do{if((W|0)==0){Y=Tu(48)|0;T=n+8|0;c[T>>2]=Y;c[n>>2]=49;c[n+4>>2]=46;TF(Y|0,2008,46)|0;a[Y+46|0]=0;c[o>>2]=0;c[o+4>>2]=0;c[o+8>>2]=0;z=0;aT(362,b|0,n|0,o|0);if(!z){if((a[n]&1)==0){break}Tw(c[T>>2]|0);break}else{z=0}Y=b$(-1,-1)|0;X=Y;Y=M;if((a[n]&1)==0){J=Y;K=X;L=K;N=0;O=L;P=J;bj(O|0)}Tw(c[T>>2]|0);J=Y;K=X;L=K;N=0;O=L;P=J;bj(O|0)}else{X=b+48|0;Y=c[X>>2]|0;T=c[r>>2]|0;L104:do{if(T>>>0<W>>>0){G=T;m=0;while(1){V=a[G]|0;if((V<<24>>24|0)==10){Z=m+1|0}else if((V<<24>>24|0)==0){_=m;break L104}else{Z=m}V=G+1|0;if(V>>>0<W>>>0){G=V;m=Z}else{_=Z;break}}}else{_=0}}while(0);c[X>>2]=_+Y;m=S-1|0;L111:do{if(m>>>0<T>>>0){$=0}else{G=0;V=m;while(1){F=G+1|0;if((a[V]|0)==10){$=G;break L111}R=V-1|0;if(R>>>0<T>>>0){$=F;break}else{G=F;V=R}}}}while(0);T=b+40|0;if((_|0)==0){aa=c[T>>2]|0}else{c[T>>2]=1;aa=1}c[b+52>>2]=aa+$;m=W;Y=S;c[T>>2]=m-Y+$+aa;T=b+56|0;c[T>>2]=Y;c[T+4>>2]=m;c[r>>2]=W}}while(0);W=c[b>>2]|0;r=Tu(48)|0;c[e>>2]=r;aa=W+4|0;$=c[aa>>2]|0;if(($|0)==(c[W+8>>2]|0)){fr(W|0,e);ab=c[e>>2]|0}else{if(($|0)==0){ac=0}else{c[$>>2]=r;ac=c[aa>>2]|0}c[aa>>2]=ac+4;ab=r}r=ab;ac=ab;$=b+28|0;L137:do{if((a[$]&1)==0){e=p;c[e>>2]=c[$>>2];c[e+4>>2]=c[$+4>>2];c[e+8>>2]=c[$+8>>2];A=96}else{e=c[b+36>>2]|0;S=c[b+32>>2]|0;do{if(S>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(S>>>0<11>>>0){a[p]=S<<1;ad=p+1|0}else{_=S+16&-16;Z=(z=0,av(316,_|0)|0);if(z){z=0;break}c[p+8>>2]=Z;c[p>>2]=_|1;c[p+4>>2]=S;ad=Z}TF(ad|0,e|0,S)|0;a[ad+S|0]=0;A=96;break L137}}while(0);S=b$(-1,-1)|0;ae=M;af=S}}while(0);do{if((A|0)==96){ad=q;b=l+16|0;c[ad>>2]=c[b>>2];c[ad+4>>2]=c[b+4>>2];c[ad+8>>2]=c[b+8>>2];z=0;aE(36,ac|0,p|0,q|0,l|0,U|0,0);if(z){z=0;b=b$(-1,-1)|0;ad=b;b=M;if((a[p]&1)==0){ae=b;af=ad;break}Tw(c[p+8>>2]|0);ae=b;af=ad;break}if((a[p]&1)==0){H=ac;i=d;return H|0}Tw(c[p+8>>2]|0);H=ac;i=d;return H|0}}while(0);H=c[W>>2]|0;W=c[aa>>2]|0;L161:do{if((H|0)==(W|0)){ag=H}else{d=H;while(1){ac=d+4|0;if((c[d>>2]|0)==(ab|0)){ag=d;break L161}if((ac|0)==(W|0)){ag=W;break}else{d=ac}}}}while(0);ab=ag-H>>2;ag=H+(ab+1<<2)|0;d=W-ag|0;TG(H+(ab<<2)|0,ag|0,d|0)|0;ag=H+((d>>2)+ab<<2)|0;ab=c[aa>>2]|0;if((ag|0)!=(ab|0)){c[aa>>2]=ab+(~((ab-4+(-ag|0)|0)>>>2)<<2)}Tw(r);J=ae;K=af;L=K;N=0;O=L;P=J;bj(O|0);return 0}function AX(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=a[45208]|0;L1:do{if(f<<24>>24==0){g=e;h=0}else{i=e;j=45208;k=f;while(1){if((a[i]|0)!=k<<24>>24){g=i;h=k;break L1}l=i+1|0;m=j+1|0;n=a[m]|0;if(n<<24>>24==0){g=l;h=0;break}else{i=l;j=m;k=n}}}}while(0);f=h<<24>>24!=0?0:g;if((f|0)==0){o=0;return o|0}g=b+48|0;h=c[g>>2]|0;k=c[d>>2]|0;L9:do{if(k>>>0<f>>>0){j=k;i=0;while(1){n=a[j]|0;if((n<<24>>24|0)==10){p=i+1|0}else if((n<<24>>24|0)==0){q=i;break L9}else{p=i}n=j+1|0;if(n>>>0<f>>>0){j=n;i=p}else{q=p;break}}}else{q=0}}while(0);c[g>>2]=h+q;h=e-1|0;L16:do{if(h>>>0<k>>>0){r=0}else{g=0;p=h;while(1){i=g+1|0;if((a[p]|0)==10){r=g;break L16}j=p-1|0;if(j>>>0<k>>>0){r=i;break}else{g=i;p=j}}}}while(0);k=b+40|0;if((q|0)==0){s=c[k>>2]|0}else{c[k>>2]=1;s=1}c[b+52>>2]=s+r;k=f;q=e;c[b+40>>2]=k-q+r+s;s=b+56|0;c[s>>2]=q;c[s+4>>2]=k;c[d>>2]=f;o=f;return o|0}function AY(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0;j=i;i=i+48|0;k=e;e=i;i=i+12|0;i=i+7&-8;c[e>>2]=c[k>>2];c[e+4>>2]=c[k+4>>2];c[e+8>>2]=c[k+8>>2];k=j|0;l=j+16|0;m=j+32|0;TF(m|0,e|0,12)|0;e=k;n=l;o=b|0;p=d;if((a[p]&1)==0){c[e>>2]=c[p>>2];c[e+4>>2]=c[p+4>>2];c[e+8>>2]=c[p+8>>2]}else{p=c[d+8>>2]|0;q=c[d+4>>2]|0;if(q>>>0>4294967279>>>0){L4(0)}if(q>>>0<11>>>0){a[e]=q<<1;r=k+1|0}else{d=q+16&-16;s=Tu(d)|0;c[k+8>>2]=s;c[k>>2]=d|1;c[k+4>>2]=q;r=s}TF(r|0,p|0,q)|0;a[r+q|0]=0}c[n>>2]=c[m>>2];c[n+4>>2]=c[m+4>>2];c[n+8>>2]=c[m+8>>2];z=0;aK(10,o|0,k|0,l|0,0,0,0,0);if(!z){if((a[e]&1)==0){t=b|0;c[t>>2]=24864;u=b+36|0;c[u>>2]=f;v=b+40|0;c[v>>2]=g;w=b+44|0;x=h&1;a[w]=x;y=12;A=0;B=12;C=0;i=j;return}Tw(c[k+8>>2]|0);t=b|0;c[t>>2]=24864;u=b+36|0;c[u>>2]=f;v=b+40|0;c[v>>2]=g;w=b+44|0;x=h&1;a[w]=x;y=12;A=0;B=12;C=0;i=j;return}else{z=0;j=b$(-1,-1)|0;if((a[e]&1)==0){bj(j|0)}Tw(c[k+8>>2]|0);bj(j|0)}}function AZ(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=Et(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L4}else{n=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[h>>2]=i+o;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;n=i;while(1){l=h+1|0;if((a[n]|0)==10){p=h;break L11}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function A_(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0,$=0,aa=0,ab=0,ac=0,ad=0,ae=0;d=i;i=i+128|0;e=d|0;f=d+8|0;g=d+16|0;h=d+32|0;j=d+40|0;k=d+56|0;l=d+64|0;m=d+80|0;n=d+96|0;o=d+112|0;p=b|0;q=c[p>>2]|0;r=Tu(56)|0;c[k>>2]=r;s=q+4|0;t=c[s>>2]|0;if((t|0)==(c[q+8>>2]|0)){fr(q|0,k);u=c[k>>2]|0}else{if((t|0)==0){v=0}else{c[t>>2]=r;v=c[s>>2]|0}c[s>>2]=v+4;u=r}r=u;v=u;t=b+28|0;L8:do{if((a[t]&1)==0){k=l;c[k>>2]=c[t>>2];c[k+4>>2]=c[t+4>>2];c[k+8>>2]=c[t+8>>2];w=16}else{k=c[b+36>>2]|0;x=c[b+32>>2]|0;do{if(x>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(x>>>0<11>>>0){a[l]=x<<1;y=l+1|0}else{A=x+16&-16;B=(z=0,av(316,A|0)|0);if(z){z=0;break}c[l+8>>2]=B;c[l>>2]=A|1;c[l+4>>2]=x;y=B}TF(y|0,k|0,x)|0;a[y+x|0]=0;w=16;break L8}}while(0);x=b$(-1,-1)|0;C=x;D=M}}while(0);do{if((w|0)==16){y=b+44|0;x=j;c[x>>2]=c[y>>2];c[x+4>>2]=c[y+4>>2];c[x+8>>2]=c[y+8>>2];z=0;aX(8,v|0,l|0,j|0,0);if(z){z=0;x=b$(-1,-1)|0;k=x;x=M;if((a[l]&1)==0){C=k;D=x;break}Tw(c[l+8>>2]|0);C=k;D=x;break}if((a[l]&1)!=0){Tw(c[l+8>>2]|0)}x=c[p>>2]|0;k=Tu(72)|0;c[h>>2]=k;B=x+4|0;A=c[B>>2]|0;if((A|0)==(c[x+8>>2]|0)){fr(x|0,h);E=c[h>>2]|0}else{if((A|0)==0){F=0}else{c[A>>2]=k;F=c[B>>2]|0}c[B>>2]=F+4;E=k}k=E;A=E;L37:do{if((a[t]&1)==0){G=m;c[G>>2]=c[t>>2];c[G+4>>2]=c[t+4>>2];c[G+8>>2]=c[t+8>>2];w=34}else{G=c[b+36>>2]|0;H=c[b+32>>2]|0;do{if(H>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(H>>>0<11>>>0){a[m]=H<<1;I=m+1|0}else{J=H+16&-16;K=(z=0,av(316,J|0)|0);if(z){z=0;break}c[m+8>>2]=K;c[m>>2]=J|1;c[m+4>>2]=H;I=K}TF(I|0,G|0,H)|0;a[I+H|0]=0;w=34;break L37}}while(0);H=b$(-1,-1)|0;L=H;N=M}}while(0);do{if((w|0)==34){H=g;c[H>>2]=c[y>>2];c[H+4>>2]=c[y+4>>2];c[H+8>>2]=c[y+8>>2];z=0;aD(6,A|0,m|0,g|0,0,0,0,0,0);if(z){z=0;H=b$(-1,-1)|0;G=H;H=M;if((a[m]&1)==0){L=G;N=H;break}Tw(c[m+8>>2]|0);L=G;N=H;break}if((a[m]&1)!=0){Tw(c[m+8>>2]|0)}a[E+68|0]=1;H=b+20|0;L59:do{if((a[Ej(c[H>>2]|0)|0]|0)!=41){G=E+36|0;K=G;J=G+16|0;O=G+8|0;P=O;Q=G+12|0;R=G+4|0;S=G;do{if((a[Ej(c[H>>2]|0)|0]|0)==123){break L59}G=A$(b)|0;c[f>>2]=G;c[J>>2]=0;T=c[P>>2]|0;if((T|0)==(c[Q>>2]|0)){k2(R,f);U=c[f>>2]|0}else{if((T|0)==0){V=0}else{c[T>>2]=G;V=c[P>>2]|0}c[O>>2]=V+4;U=G}cK[c[c[S>>2]>>2]&1023](K,U);}while((a[Ej(c[H>>2]|0)|0]|0)!=41)}}while(0);H=u+36|0;K=H;c[e>>2]=A;c[H+16>>2]=0;S=H+8|0;O=S;P=c[O>>2]|0;if((P|0)==(c[H+12>>2]|0)){R=H+4|0;k2(R,e);W=c[e>>2]|0;X=R}else{if((P|0)==0){Y=0}else{c[P>>2]=A;Y=c[O>>2]|0}c[S>>2]=Y+4;W=A;X=H+4|0}cK[c[c[H>>2]>>2]&1023](K,W);if((c[X>>2]|0)!=(c[O>>2]|0)){i=d;return v|0}O=Tu(64)|0;K=n+8|0;c[K>>2]=O;c[n>>2]=65;c[n+4>>2]=54;TF(O|0,1760,54)|0;a[O+54|0]=0;c[o>>2]=0;c[o+4>>2]=0;c[o+8>>2]=0;z=0;aT(362,b|0,n|0,o|0);if(!z){if((a[n]&1)==0){i=d;return v|0}Tw(c[K>>2]|0);i=d;return v|0}else{z=0;O=b$(-1,-1)|0;H=O;O=M;if((a[n]&1)==0){Z=H;_=O;$=Z;aa=0;ab=$;ac=_;bj(ab|0)}Tw(c[K>>2]|0);Z=H;_=O;$=Z;aa=0;ab=$;ac=_;bj(ab|0)}}}while(0);A=c[x>>2]|0;y=c[B>>2]|0;L94:do{if((A|0)==(y|0)){ad=A}else{O=A;while(1){H=O+4|0;if((c[O>>2]|0)==(E|0)){ad=O;break L94}if((H|0)==(y|0)){ad=y;break}else{O=H}}}}while(0);x=ad-A>>2;O=A+(x+1<<2)|0;H=y-O|0;TG(A+(x<<2)|0,O|0,H|0)|0;O=A+((H>>2)+x<<2)|0;x=c[B>>2]|0;if((O|0)!=(x|0)){c[B>>2]=x+(~((x-4+(-O|0)|0)>>>2)<<2)}Tw(k);Z=L;_=N;$=Z;aa=0;ab=$;ac=_;bj(ab|0)}}while(0);N=c[q>>2]|0;q=c[s>>2]|0;L104:do{if((N|0)==(q|0)){ae=N}else{L=N;while(1){ad=L+4|0;if((c[L>>2]|0)==(u|0)){ae=L;break L104}if((ad|0)==(q|0)){ae=q;break}else{L=ad}}}}while(0);u=ae-N>>2;ae=N+(u+1<<2)|0;L=q-ae|0;TG(N+(u<<2)|0,ae|0,L|0)|0;ae=N+((L>>2)+u<<2)|0;u=c[s>>2]|0;if((ae|0)!=(u|0)){c[s>>2]=u+(~((u-4+(-ae|0)|0)>>>2)<<2)}Tw(r);Z=C;_=D;$=Z;aa=0;ab=$;ac=_;bj(ab|0);return 0}function A$(b){b=b|0;var d=0,e=0,f=0;d=b+20|0;if((Fo(Ej(c[d>>2]|0)|0)|0)!=0){A2(b)|0;e=A$(b)|0;c[e+64>>2]=3;return e|0}if((Fm(Ej(c[d>>2]|0)|0)|0)!=0){A3(b)|0;e=A$(b)|0;c[e+64>>2]=1;return e|0}if((Fn(Ej(c[d>>2]|0)|0)|0)!=0){A4(b)|0;e=A$(b)|0;c[e+64>>2]=2;return e|0}if((a[Ej(c[d>>2]|0)|0]|0)==40){f=A0(b)|0;return f|0}else{f=A1(b)|0;return f|0}return 0}function A0(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0,Q=0,R=0,S=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=0,_=0;d=i;i=i+112|0;e=d|0;f=d+8|0;g=d+24|0;h=d+32|0;j=d+48|0;k=d+64|0;l=d+80|0;m=d+96|0;n=c[b>>2]|0;o=Tu(72)|0;c[g>>2]=o;p=n+4|0;q=c[p>>2]|0;if((q|0)==(c[n+8>>2]|0)){fr(n|0,g);r=c[g>>2]|0}else{if((q|0)==0){s=0}else{c[q>>2]=o;s=c[p>>2]|0}c[p>>2]=s+4;r=o}o=r;s=r;q=b+28|0;L8:do{if((a[q]&1)==0){g=h;c[g>>2]=c[q>>2];c[g+4>>2]=c[q+4>>2];c[g+8>>2]=c[q+8>>2];t=16}else{g=c[b+36>>2]|0;u=c[b+32>>2]|0;do{if(u>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(u>>>0<11>>>0){a[h]=u<<1;v=h+1|0}else{w=u+16&-16;x=(z=0,av(316,w|0)|0);if(z){z=0;break}c[h+8>>2]=x;c[h>>2]=w|1;c[h+4>>2]=u;v=x}TF(v|0,g|0,u)|0;a[v+u|0]=0;t=16;break L8}}while(0);u=b$(-1,-1)|0;y=M;A=u}}while(0);do{if((t|0)==16){v=b+44|0;q=f;c[q>>2]=c[v>>2];c[q+4>>2]=c[v+4>>2];c[q+8>>2]=c[v+8>>2];z=0;aD(6,s|0,h|0,f|0,0,0,0,0,0);if(z){z=0;v=b$(-1,-1)|0;q=v;v=M;if((a[h]&1)==0){y=v;A=q;break}Tw(c[h+8>>2]|0);y=v;A=q;break}if((a[h]&1)!=0){Tw(c[h+8>>2]|0)}q=b+20|0;v=Ej(c[q>>2]|0)|0;u=v+1|0;g=(a[v]|0)==40?u:0;do{if((g|0)==0){x=Tu(48)|0;w=j+8|0;c[w>>2]=x;c[j>>2]=49;c[j+4>>2]=34;TF(x|0,1608,34)|0;a[x+34|0]=0;c[k>>2]=0;c[k+4>>2]=0;c[k+8>>2]=0;z=0;aT(362,b|0,j|0,k|0);if(!z){if((a[j]&1)==0){t=45;break}Tw(c[w>>2]|0);t=45;break}else{z=0}x=b$(-1,-1)|0;B=x;x=M;if((a[j]&1)==0){C=x;D=B;E=D;F=0;G=E;H=C;bj(G|0)}Tw(c[w>>2]|0);C=x;D=B;E=D;F=0;G=E;H=C;bj(G|0)}else{B=b+48|0;x=c[B>>2]|0;w=c[q>>2]|0;L32:do{if(w>>>0<g>>>0){I=w;J=0;while(1){K=a[I]|0;if((K<<24>>24|0)==10){L=J+1|0}else if((K<<24>>24|0)==0){N=J;break L32}else{L=J}K=I+1|0;if(K>>>0<g>>>0){I=K;J=L}else{N=L;break}}}else{N=0}}while(0);c[B>>2]=N+x;J=v-1|0;L39:do{if(J>>>0<w>>>0){O=0}else{I=0;K=J;while(1){P=I+1|0;if((a[K]|0)==10){O=I;break L39}Q=K-1|0;if(Q>>>0<w>>>0){O=P;break}else{I=P;K=Q}}}}while(0);w=b+40|0;if((N|0)==0){R=c[w>>2]|0}else{c[w>>2]=1;R=1}c[b+52>>2]=R+O;J=g;x=v;c[w>>2]=J-x+O+R;w=b+56|0;c[w>>2]=x;c[w+4>>2]=J;c[q>>2]=g;S=u}}while(0);while(1){if((t|0)==45){t=0;S=c[q>>2]|0}if((a[Ej(S)|0]|0)==41){break}if((a[Ej(c[q>>2]|0)|0]|0)==123){break}u=r+36|0;g=u;v=A$(b)|0;c[e>>2]=v;c[u+16>>2]=0;J=u+8|0;w=J;x=c[w>>2]|0;if((x|0)==(c[u+12>>2]|0)){k2(u+4|0,e);T=c[e>>2]|0}else{if((x|0)==0){U=0}else{c[x>>2]=v;U=c[w>>2]|0}c[J>>2]=U+4;T=v}cK[c[c[u>>2]>>2]&1023](g,T);t=45}g=Ej(c[q>>2]|0)|0;u=(a[g]|0)==41?g+1|0:0;do{if((u|0)==0){v=Tu(48)|0;J=l+8|0;c[J>>2]=v;c[l>>2]=49;c[l+4>>2]=45;TF(v|0,1448,45)|0;a[v+45|0]=0;c[m>>2]=0;c[m+4>>2]=0;c[m+8>>2]=0;z=0;aT(362,b|0,l|0,m|0);if(!z){if((a[l]&1)==0){break}Tw(c[J>>2]|0);break}else{z=0}v=b$(-1,-1)|0;w=v;v=M;if((a[l]&1)==0){C=v;D=w;E=D;F=0;G=E;H=C;bj(G|0)}Tw(c[J>>2]|0);C=v;D=w;E=D;F=0;G=E;H=C;bj(G|0)}else{w=b+48|0;v=c[w>>2]|0;J=c[q>>2]|0;L82:do{if(J>>>0<u>>>0){x=J;B=0;while(1){K=a[x]|0;if((K<<24>>24|0)==10){V=B+1|0}else if((K<<24>>24|0)==0){W=B;break L82}else{V=B}K=x+1|0;if(K>>>0<u>>>0){x=K;B=V}else{W=V;break}}}else{W=0}}while(0);c[w>>2]=W+v;B=g-1|0;L89:do{if(B>>>0<J>>>0){X=0}else{x=0;K=B;while(1){I=x+1|0;if((a[K]|0)==10){X=x;break L89}Q=K-1|0;if(Q>>>0<J>>>0){X=I;break}else{x=I;K=Q}}}}while(0);J=b+40|0;if((W|0)==0){Y=c[J>>2]|0}else{c[J>>2]=1;Y=1}c[b+52>>2]=Y+X;B=u;v=g;c[J>>2]=B-v+X+Y;J=b+56|0;c[J>>2]=v;c[J+4>>2]=B;c[q>>2]=u}}while(0);u=r+36|0;q=c[u+4>>2]|0;if(((c[u+8>>2]|0)-q|0)!=4){Z=s;i=d;return Z|0}Z=c[q>>2]|0;i=d;return Z|0}}while(0);Z=c[n>>2]|0;n=c[p>>2]|0;L104:do{if((Z|0)==(n|0)){_=Z}else{d=Z;while(1){s=d+4|0;if((c[d>>2]|0)==(r|0)){_=d;break L104}if((s|0)==(n|0)){_=n;break}else{d=s}}}}while(0);r=_-Z>>2;_=Z+(r+1<<2)|0;d=n-_|0;TG(Z+(r<<2)|0,_|0,d|0)|0;_=Z+((d>>2)+r<<2)|0;r=c[p>>2]|0;if((_|0)!=(r|0)){c[p>>2]=r+(~((r-4+(-_|0)|0)>>>2)<<2)}Tw(o);C=y;D=A;E=D;F=0;G=E;H=C;bj(G|0);return 0}function A1(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0;d=i;i=i+40|0;e=d|0;f=d+16|0;g=d+24|0;h=zU(b)|0;j=c[b>>2]|0;b=Tu(72)|0;c[f>>2]=b;k=j+4|0;l=c[k>>2]|0;if((l|0)==(c[j+8>>2]|0)){fr(j|0,f);m=c[f>>2]|0}else{if((l|0)==0){n=0}else{c[l>>2]=b;n=c[k>>2]|0}c[k>>2]=n+4;m=b}b=m;n=m;l=h+4|0;L8:do{if((a[l]&1)==0){f=g;c[f>>2]=c[l>>2];c[f+4>>2]=c[l+4>>2];c[f+8>>2]=c[l+8>>2];o=16}else{f=c[h+12>>2]|0;p=c[h+8>>2]|0;do{if(p>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(p>>>0<11>>>0){a[g]=p<<1;q=g+1|0}else{r=p+16&-16;s=(z=0,av(316,r|0)|0);if(z){z=0;break}c[g+8>>2]=s;c[g>>2]=r|1;c[g+4>>2]=p;q=s}TF(q|0,f|0,p)|0;a[q+p|0]=0;o=16;break L8}}while(0);p=b$(-1,-1)|0;t=M;u=p}}while(0);do{if((o|0)==16){q=h+16|0;l=e;c[l>>2]=c[q>>2];c[l+4>>2]=c[q+4>>2];c[l+8>>2]=c[q+8>>2];z=0;aD(6,n|0,g|0,e|0,1,c[h+28>>2]|0,c[h+32>>2]|0,0,0);if(z){z=0;q=b$(-1,-1)|0;l=q;q=M;if((a[g]&1)==0){t=q;u=l;break}Tw(c[g+8>>2]|0);t=q;u=l;break}if((a[g]&1)==0){i=d;return n|0}Tw(c[g+8>>2]|0);i=d;return n|0}}while(0);n=c[j>>2]|0;j=c[k>>2]|0;L32:do{if((n|0)==(j|0)){v=n}else{d=n;while(1){g=d+4|0;if((c[d>>2]|0)==(m|0)){v=d;break L32}if((g|0)==(j|0)){v=j;break}else{d=g}}}}while(0);m=v-n>>2;v=n+(m+1<<2)|0;d=j-v|0;TG(n+(m<<2)|0,v|0,d|0)|0;v=n+((d>>2)+m<<2)|0;m=c[k>>2]|0;if((v|0)==(m|0)){Tw(b);w=u;x=0;y=w;A=t;bj(y|0)}c[k>>2]=m+(~((m-4+(-v|0)|0)>>>2)<<2);Tw(b);w=u;x=0;y=w;A=t;bj(y|0);return 0}function A2(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=Fo(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L4}else{n=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[h>>2]=i+o;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;n=i;while(1){l=h+1|0;if((a[n]|0)==10){p=h;break L11}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function A3(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=Fm(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L4}else{n=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[h>>2]=i+o;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;n=i;while(1){l=h+1|0;if((a[n]|0)==10){p=h;break L11}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function A4(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=Fn(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L4}else{n=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[h>>2]=i+o;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;n=i;while(1){l=h+1|0;if((a[n]|0)==10){p=h;break L11}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function A5(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=Eq(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L4}else{n=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[h>>2]=i+o;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;n=i;while(1){l=h+1|0;if((a[n]|0)==10){p=h;break L11}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function A6(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=EJ(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L4}else{n=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[h>>2]=i+o;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;n=i;while(1){l=h+1|0;if((a[n]|0)==10){p=h;break L11}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function A7(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=EK(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L4}else{n=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[h>>2]=i+o;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;n=i;while(1){l=h+1|0;if((a[n]|0)==10){p=h;break L11}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function A8(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;d=b+20|0;e=Ej(c[d>>2]|0)|0;f=EL(e)|0;if((f|0)==0){g=0;return g|0}h=b+48|0;i=c[h>>2]|0;j=c[d>>2]|0;L4:do{if(j>>>0<f>>>0){k=j;l=0;while(1){m=a[k]|0;if((m<<24>>24|0)==10){n=l+1|0}else if((m<<24>>24|0)==0){o=l;break L4}else{n=l}m=k+1|0;if(m>>>0<f>>>0){k=m;l=n}else{o=n;break}}}else{o=0}}while(0);c[h>>2]=i+o;i=e-1|0;L11:do{if(i>>>0<j>>>0){p=0}else{h=0;n=i;while(1){l=h+1|0;if((a[n]|0)==10){p=h;break L11}k=n-1|0;if(k>>>0<j>>>0){p=l;break}else{h=l;n=k}}}}while(0);j=b+40|0;if((o|0)==0){q=c[j>>2]|0}else{c[j>>2]=1;q=1}c[b+52>>2]=q+p;j=f;o=e;c[b+40>>2]=j-o+p+q;q=b+56|0;c[q>>2]=o;c[q+4>>2]=j;c[d>>2]=f;g=f;return g|0}function A9(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;d=a+4|0;e=a|0;f=c[e>>2]|0;g=f;h=(c[d>>2]|0)-g|0;i=h>>2;j=i+1|0;if(j>>>0>1073741823>>>0){QU(0)}k=a+8|0;a=(c[k>>2]|0)-g|0;if(a>>2>>>0>536870910>>>0){l=1073741823;m=5}else{g=a>>1;a=g>>>0<j>>>0?j:g;if((a|0)==0){n=0;o=0}else{l=a;m=5}}if((m|0)==5){n=Tu(l<<2)|0;o=l}l=n+(i<<2)|0;if((l|0)!=0){c[l>>2]=c[b>>2]}b=f;TF(n|0,b|0,h)|0;c[e>>2]=n;c[d>>2]=n+(j<<2);c[k>>2]=n+(o<<2);if((f|0)==0){return}Tw(b);return}function Ba(a,b){a=a|0;b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0;d=a+4|0;e=a|0;f=c[e>>2]|0;g=f;h=(c[d>>2]|0)-g|0;i=h>>2;j=i+1|0;if(j>>>0>1073741823>>>0){QU(0)}k=a+8|0;a=(c[k>>2]|0)-g|0;if(a>>2>>>0>536870910>>>0){l=1073741823;m=5}else{g=a>>1;a=g>>>0<j>>>0?j:g;if((a|0)==0){n=0;o=0}else{l=a;m=5}}if((m|0)==5){n=Tu(l<<2)|0;o=l}l=n+(i<<2)|0;if((l|0)!=0){c[l>>2]=c[b>>2]}b=f;TF(n|0,b|0,h)|0;c[e>>2]=n;c[d>>2]=n+(j<<2);c[k>>2]=n+(o<<2);if((f|0)==0){return}Tw(b);return}function Bb(b){b=b|0;c[b>>2]=21728;if((a[b+4|0]&1)==0){return}Tw(c[b+12>>2]|0);return}function Bc(b){b=b|0;var d=0;c[b>>2]=21728;if((a[b+4|0]&1)==0){d=b;Tw(d);return}Tw(c[b+12>>2]|0);d=b;Tw(d);return}function Bd(a,b){a=a|0;b=b|0;cK[c[(c[b>>2]|0)+60>>2]&1023](b,a);return}function Be(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+60>>2]&2047](b,a)|0}function Bf(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+60>>2]&2047](b,a)|0}function Bg(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+60>>2]&2047](b,a)|0}function Bh(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+60>>2]&2047](b,a)|0}function Bi(a,b,d){a=a|0;b=b|0;d=d|0;c8[c[(c[d>>2]|0)+60>>2]&511](a,d,b);return}function Bj(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+60>>2]&2047](b,a)|0}function Bk(b){b=b|0;c[b>>2]=21728;if((a[b+4|0]&1)==0){return}Tw(c[b+12>>2]|0);return}function Bl(b){b=b|0;var d=0;c[b>>2]=21728;if((a[b+4|0]&1)==0){d=b;Tw(d);return}Tw(c[b+12>>2]|0);d=b;Tw(d);return}function Bm(a,b){a=a|0;b=b|0;cK[c[(c[b>>2]|0)+56>>2]&1023](b,a);return}function Bn(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+56>>2]&2047](b,a)|0}function Bo(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+56>>2]&2047](b,a)|0}function Bp(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+56>>2]&2047](b,a)|0}function Bq(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+56>>2]&2047](b,a)|0}function Br(a,b,d){a=a|0;b=b|0;d=d|0;c8[c[(c[d>>2]|0)+56>>2]&511](a,d,b);return}function Bs(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+56>>2]&2047](b,a)|0}function Bt(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;h=i;i=i+32|0;j=e;e=i;i=i+12|0;i=i+7&-8;c[e>>2]=c[j>>2];c[e+4>>2]=c[j+4>>2];c[e+8>>2]=c[j+8>>2];j=h|0;k=h+16|0;l=b|0;m=d;if((a[m]&1)==0){n=j;c[n>>2]=c[m>>2];c[n+4>>2]=c[m+4>>2];c[n+8>>2]=c[m+8>>2]}else{m=c[d+8>>2]|0;n=c[d+4>>2]|0;if(n>>>0>4294967279>>>0){L4(0)}if(n>>>0<11>>>0){a[j]=n<<1;o=j+1|0}else{d=n+16&-16;p=Tu(d)|0;c[j+8>>2]=p;c[j>>2]=d|1;c[j+4>>2]=n;o=p}TF(o|0,m|0,n)|0;a[o+n|0]=0}n=k;o=e;c[n>>2]=c[o>>2];c[n+4>>2]=c[o+4>>2];c[n+8>>2]=c[o+8>>2];z=0;aX(4,l|0,j|0,k|0,g|0);if(!z){if((a[j]&1)==0){q=b|0;c[q>>2]=23416;r=b+32|0;c[r>>2]=f;i=h;return}Tw(c[j+8>>2]|0);q=b|0;c[q>>2]=23416;r=b+32|0;c[r>>2]=f;i=h;return}else{z=0;h=b$(-1,-1)|0;if((a[j]&1)==0){bj(h|0)}Tw(c[j+8>>2]|0);bj(h|0)}}function Bu(b){b=b|0;c[b>>2]=21728;if((a[b+4|0]&1)==0){return}Tw(c[b+12>>2]|0);return}function Bv(b){b=b|0;var d=0;c[b>>2]=21728;if((a[b+4|0]&1)==0){d=b;Tw(d);return}Tw(c[b+12>>2]|0);d=b;Tw(d);return}function Bw(a,b){a=a|0;b=b|0;cK[c[(c[b>>2]|0)+80>>2]&1023](b,a);return}function Bx(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+80>>2]&2047](b,a)|0}function By(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+80>>2]&2047](b,a)|0}function Bz(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+80>>2]&2047](b,a)|0}function BA(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+80>>2]&2047](b,a)|0}function BB(a,b,d){a=a|0;b=b|0;d=d|0;c8[c[(c[d>>2]|0)+80>>2]&511](a,d,b);return}function BC(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+80>>2]&2047](b,a)|0}function BD(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;j=i;i=i+32|0;k=e;e=i;i=i+12|0;i=i+7&-8;c[e>>2]=c[k>>2];c[e+4>>2]=c[k+4>>2];c[e+8>>2]=c[k+8>>2];k=j|0;l=j+16|0;m=b|0;n=d;if((a[n]&1)==0){o=k;c[o>>2]=c[n>>2];c[o+4>>2]=c[n+4>>2];c[o+8>>2]=c[n+8>>2]}else{n=c[d+8>>2]|0;o=c[d+4>>2]|0;if(o>>>0>4294967279>>>0){L4(0)}if(o>>>0<11>>>0){a[k]=o<<1;p=k+1|0}else{d=o+16&-16;q=Tu(d)|0;c[k+8>>2]=q;c[k>>2]=d|1;c[k+4>>2]=o;p=q}TF(p|0,n|0,o)|0;a[p+o|0]=0}o=l;p=e;c[o>>2]=c[p>>2];c[o+4>>2]=c[p+4>>2];c[o+8>>2]=c[p+8>>2];z=0;aX(4,m|0,k|0,l|0,h|0);if(z){z=0;h=b$(-1,-1)|0;l=h;h=M;if((a[k]&1)==0){r=h;s=l;t=s;u=0;v=t;w=r;bj(v|0)}Tw(c[k+8>>2]|0);r=h;s=l;t=s;u=0;v=t;w=r;bj(v|0)}if((a[k]&1)!=0){Tw(c[k+8>>2]|0)}k=b|0;c[k>>2]=24472;z=0;at(504,b+32|0,f|0);if(!z){c[b+44>>2]=g;i=j;return}else{z=0}j=b$(-1,-1)|0;g=j;j=M;c[k>>2]=21728;if((a[b+4|0]&1)==0){r=j;s=g;t=s;u=0;v=t;w=r;bj(v|0)}Tw(c[b+12>>2]|0);r=j;s=g;t=s;u=0;v=t;w=r;bj(v|0)}function BE(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0;d=b|0;c[d>>2]=24472;e=b+32|0;f=c[e>>2]|0;if((f|0)!=0){g=b+36|0;h=c[g>>2]|0;if((f|0)==(h|0)){i=f}else{j=h;while(1){h=j-12|0;c[g>>2]=h;if((a[h]&1)==0){k=h}else{Tw(c[j-12+8>>2]|0);k=c[g>>2]|0}if((f|0)==(k|0)){break}else{j=k}}i=c[e>>2]|0}Tw(i)}c[d>>2]=21728;if((a[b+4|0]&1)==0){return}Tw(c[b+12>>2]|0);return}function BF(b){b=b|0;var d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0;d=b|0;c[d>>2]=24472;e=b+32|0;f=c[e>>2]|0;if((f|0)!=0){g=b+36|0;h=c[g>>2]|0;if((f|0)==(h|0)){i=f}else{j=h;while(1){h=j-12|0;c[g>>2]=h;if((a[h]&1)==0){k=h}else{Tw(c[j-12+8>>2]|0);k=c[g>>2]|0}if((f|0)==(k|0)){break}else{j=k}}i=c[e>>2]|0}Tw(i)}c[d>>2]=21728;if((a[b+4|0]&1)==0){l=b;Tw(l);return}Tw(c[b+12>>2]|0);l=b;Tw(l);return}function BG(a,b){a=a|0;b=b|0;cK[c[(c[b>>2]|0)+76>>2]&1023](b,a);return}function BH(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+76>>2]&2047](b,a)|0}function BI(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+76>>2]&2047](b,a)|0}function BJ(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+76>>2]&2047](b,a)|0}function BK(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+76>>2]&2047](b,a)|0}function BL(a,b,d){a=a|0;b=b|0;d=d|0;c8[c[(c[d>>2]|0)+76>>2]&511](a,d,b);return}function BM(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+76>>2]&2047](b,a)|0}function BN(b,d,e,f,g,h,j,k){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;k=k|0;var l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0;l=i;i=i+32|0;m=e;e=i;i=i+12|0;i=i+7&-8;c[e>>2]=c[m>>2];c[e+4>>2]=c[m+4>>2];c[e+8>>2]=c[m+8>>2];m=l|0;n=l+16|0;o=b|0;p=d;if((a[p]&1)==0){q=m;c[q>>2]=c[p>>2];c[q+4>>2]=c[p+4>>2];c[q+8>>2]=c[p+8>>2]}else{p=c[d+8>>2]|0;q=c[d+4>>2]|0;if(q>>>0>4294967279>>>0){L4(0)}if(q>>>0<11>>>0){a[m]=q<<1;r=m+1|0}else{d=q+16&-16;s=Tu(d)|0;c[m+8>>2]=s;c[m>>2]=d|1;c[m+4>>2]=q;r=s}TF(r|0,p|0,q)|0;a[r+q|0]=0}q=n;r=e;c[q>>2]=c[r>>2];c[q+4>>2]=c[r+4>>2];c[q+8>>2]=c[r+8>>2];z=0;aX(4,o|0,m|0,n|0,j|0);if(z){z=0;j=b$(-1,-1)|0;n=j;j=M;if((a[m]&1)==0){t=j;u=n;v=u;w=0;x=v;y=t;bj(x|0)}Tw(c[m+8>>2]|0);t=j;u=n;v=u;w=0;x=v;y=t;bj(x|0)}if((a[m]&1)!=0){Tw(c[m+8>>2]|0)}m=b|0;c[m>>2]=24640;n=b+32|0;j=f;if((a[j]&1)==0){o=n;c[o>>2]=c[j>>2];c[o+4>>2]=c[j+4>>2];c[o+8>>2]=c[j+8>>2];A=b+44|0;c[A>>2]=g;B=b+48|0;c[B>>2]=h;C=b+52|0;D=k&1;a[C]=D;i=l;return}j=c[f+8>>2]|0;o=c[f+4>>2]|0;do{if(o>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}}else{if(o>>>0<11>>>0){a[n]=o<<1;E=n+1|0}else{f=o+16&-16;r=(z=0,av(316,f|0)|0);if(z){z=0;break}c[b+40>>2]=r;c[n>>2]=f|1;c[b+36>>2]=o;E=r}TF(E|0,j|0,o)|0;a[E+o|0]=0;A=b+44|0;c[A>>2]=g;B=b+48|0;c[B>>2]=h;C=b+52|0;D=k&1;a[C]=D;i=l;return}}while(0);l=b$(-1,-1)|0;D=l;l=M;c[m>>2]=21728;if((a[b+4|0]&1)==0){t=l;u=D;v=u;w=0;x=v;y=t;bj(x|0)}Tw(c[b+12>>2]|0);t=l;u=D;v=u;w=0;x=v;y=t;bj(x|0)}function BO(b){b=b|0;var d=0;d=b|0;c[d>>2]=24640;if((a[b+32|0]&1)!=0){Tw(c[b+40>>2]|0)}c[d>>2]=21728;if((a[b+4|0]&1)==0){return}Tw(c[b+12>>2]|0);return}function BP(b){b=b|0;var d=0,e=0;d=b|0;c[d>>2]=24640;if((a[b+32|0]&1)!=0){Tw(c[b+40>>2]|0)}c[d>>2]=21728;if((a[b+4|0]&1)==0){e=b;Tw(e);return}Tw(c[b+12>>2]|0);e=b;Tw(e);return}function BQ(a,b){a=a|0;b=b|0;cK[c[(c[b>>2]|0)+72>>2]&1023](b,a);return}function BR(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+72>>2]&2047](b,a)|0}function BS(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+72>>2]&2047](b,a)|0}function BT(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+72>>2]&2047](b,a)|0}function BU(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+72>>2]&2047](b,a)|0}function BV(a,b,d){a=a|0;b=b|0;d=d|0;c8[c[(c[d>>2]|0)+72>>2]&511](a,d,b);return}function BW(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+72>>2]&2047](b,a)|0}function BX(b){b=b|0;c[b>>2]=21728;if((a[b+4|0]&1)==0){return}Tw(c[b+12>>2]|0);return}function BY(b){b=b|0;var d=0;c[b>>2]=21728;if((a[b+4|0]&1)==0){d=b;Tw(d);return}Tw(c[b+12>>2]|0);d=b;Tw(d);return}function BZ(a,b){a=a|0;b=b|0;cK[c[(c[b>>2]|0)+68>>2]&1023](b,a);return}function B_(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+68>>2]&2047](b,a)|0}function B$(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+68>>2]&2047](b,a)|0}function B0(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+68>>2]&2047](b,a)|0}function B1(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+68>>2]&2047](b,a)|0}function B2(a,b,d){a=a|0;b=b|0;d=d|0;c8[c[(c[d>>2]|0)+68>>2]&511](a,d,b);return}function B3(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+68>>2]&2047](b,a)|0}function B4(b){b=b|0;c[b>>2]=21728;if((a[b+4|0]&1)==0){return}Tw(c[b+12>>2]|0);return}function B5(b){b=b|0;var d=0;c[b>>2]=21728;if((a[b+4|0]&1)==0){d=b;Tw(d);return}Tw(c[b+12>>2]|0);d=b;Tw(d);return}function B6(a,b){a=a|0;b=b|0;cK[c[(c[b>>2]|0)+124>>2]&1023](b,a);return}function B7(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+124>>2]&2047](b,a)|0}function B8(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+124>>2]&2047](b,a)|0}function B9(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+124>>2]&2047](b,a)|0}function Ca(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+124>>2]&2047](b,a)|0}function Cb(a,b,d){a=a|0;b=b|0;d=d|0;c8[c[(c[d>>2]|0)+124>>2]&511](a,d,b);return}function Cc(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+124>>2]&2047](b,a)|0}function Cd(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;g=i;i=i+32|0;h=e;e=i;i=i+12|0;i=i+7&-8;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];c[e+8>>2]=c[h+8>>2];h=g|0;j=g+16|0;k=b|0;l=d;if((a[l]&1)==0){m=h;c[m>>2]=c[l>>2];c[m+4>>2]=c[l+4>>2];c[m+8>>2]=c[l+8>>2]}else{l=c[d+8>>2]|0;m=c[d+4>>2]|0;if(m>>>0>4294967279>>>0){L4(0)}if(m>>>0<11>>>0){a[h]=m<<1;n=h+1|0}else{d=m+16&-16;o=Tu(d)|0;c[h+8>>2]=o;c[h>>2]=d|1;c[h+4>>2]=m;n=o}TF(n|0,l|0,m)|0;a[n+m|0]=0}m=j;n=e;c[m>>2]=c[n>>2];c[m+4>>2]=c[n+4>>2];c[m+8>>2]=c[n+8>>2];z=0;aK(10,k|0,h|0,j|0,0,0,0,0);if(z){z=0;j=b$(-1,-1)|0;k=j;j=M;if((a[h]&1)==0){p=j;q=k;r=q;s=0;t=r;u=p;bj(t|0)}Tw(c[h+8>>2]|0);p=j;q=k;r=q;s=0;t=r;u=p;bj(t|0)}if((a[h]&1)!=0){Tw(c[h+8>>2]|0)}h=b|0;c[h>>2]=21504;k=b+36|0;j=f;if((a[j]&1)==0){n=k;c[n>>2]=c[j>>2];c[n+4>>2]=c[j+4>>2];c[n+8>>2]=c[j+8>>2];i=g;return}j=c[f+8>>2]|0;n=c[f+4>>2]|0;do{if(n>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}}else{if(n>>>0<11>>>0){a[k]=n<<1;v=k+1|0}else{f=n+16&-16;m=(z=0,av(316,f|0)|0);if(z){z=0;break}c[b+44>>2]=m;c[k>>2]=f|1;c[b+40>>2]=n;v=m}TF(v|0,j|0,n)|0;a[v+n|0]=0;i=g;return}}while(0);g=b$(-1,-1)|0;n=g;g=M;c[h>>2]=21728;if((a[b+4|0]&1)==0){p=g;q=n;r=q;s=0;t=r;u=p;bj(t|0)}Tw(c[b+12>>2]|0);p=g;q=n;r=q;s=0;t=r;u=p;bj(t|0)}function Ce(b){b=b|0;var d=0;d=b|0;c[d>>2]=21504;if((a[b+36|0]&1)!=0){Tw(c[b+44>>2]|0)}c[d>>2]=21728;if((a[b+4|0]&1)==0){return}Tw(c[b+12>>2]|0);return}function Cf(b){b=b|0;var d=0,e=0;d=b|0;c[d>>2]=21504;if((a[b+36|0]&1)!=0){Tw(c[b+44>>2]|0)}c[d>>2]=21728;if((a[b+4|0]&1)==0){e=b;Tw(e);return}Tw(c[b+12>>2]|0);e=b;Tw(e);return}function Cg(a,b){a=a|0;b=b|0;cK[c[(c[b>>2]|0)+128>>2]&1023](b,a);return}function Ch(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+128>>2]&2047](b,a)|0}function Ci(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+128>>2]&2047](b,a)|0}function Cj(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+128>>2]&2047](b,a)|0}function Ck(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+128>>2]&2047](b,a)|0}function Cl(a,b,d){a=a|0;b=b|0;d=d|0;c8[c[(c[d>>2]|0)+128>>2]&511](a,d,b);return}function Cm(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+128>>2]&2047](b,a)|0}function Cn(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0;e=i;i=i+32|0;f=e|0;g=e+16|0;h=Th(d,38880,37464,0)|0;L1:do{if((h|0)==0){z=0;aI(6);if(z){z=0;j=49;break}return 0}else{d=(z=0,av(c[(c[h>>2]|0)+36>>2]|0,h|0)|0);if(z){z=0;j=49;break}if(!d){k=0;i=e;return k|0}d=b+36|0;if((a[d]&1)==0){l=f;c[l>>2]=c[d>>2];c[l+4>>2]=c[d+4>>2];c[l+8>>2]=c[d+8>>2]}else{d=c[b+44>>2]|0;l=c[b+40>>2]|0;if(l>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;j=49;break}return 0}if(l>>>0<11>>>0){a[f]=l<<1;m=f+1|0}else{n=l+16&-16;o=(z=0,av(316,n|0)|0);if(z){z=0;j=49;break}c[f+8>>2]=o;c[f>>2]=n|1;c[f+4>>2]=l;m=o}TF(m|0,d|0,l)|0;a[m+l|0]=0}l=h+36|0;L22:do{if((a[l]&1)==0){d=g;c[d>>2]=c[l>>2];c[d+4>>2]=c[l+4>>2];c[d+8>>2]=c[l+8>>2]}else{d=c[h+44>>2]|0;o=c[h+40>>2]|0;do{if(o>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(o>>>0<11>>>0){a[g]=o<<1;p=g+1|0}else{n=o+16&-16;q=(z=0,av(316,n|0)|0);if(z){z=0;break}c[g+8>>2]=q;c[g>>2]=n|1;c[g+4>>2]=o;p=q}TF(p|0,d|0,o)|0;a[p+o|0]=0;break L22}}while(0);o=b$(-1,-1,35480,0)|0;d=o;o=M;if((a[f]&1)==0){r=o;s=d;break L1}Tw(c[f+8>>2]|0);r=o;s=d;break L1}}while(0);l=f;d=a[f]|0;o=d&255;if((o&1|0)==0){t=o>>>1}else{t=c[f+4>>2]|0}o=g;q=a[g]|0;n=q&255;if((n&1|0)==0){u=n>>>1}else{u=c[g+4>>2]|0}L45:do{if((t|0)==(u|0)){n=(d&1)==0;if(n){v=l+1|0}else{v=c[f+8>>2]|0}w=q&1;if(w<<24>>24==0){x=o+1|0}else{x=c[g+8>>2]|0}if(!n){y=(TH(v|0,x|0,t|0)|0)==0;A=w;break}if((t|0)==0){y=1;A=w;break}else{B=x;C=v;D=t}while(1){if((a[C]|0)!=(a[B]|0)){y=0;A=w;break L45}n=D-1|0;if((n|0)==0){y=1;A=w;break}else{B=B+1|0;C=C+1|0;D=n}}}else{y=0;A=q&1}}while(0);if(A<<24>>24!=0){Tw(c[g+8>>2]|0)}if((d&1)==0){k=y;i=e;return k|0}Tw(c[f+8>>2]|0);k=y;i=e;return k|0}}while(0);if((j|0)==49){j=b$(-1,-1,35480,0)|0;r=M;s=j}j=(r|0)==(cA(35480)|0);bI(s|0)|0;if(j){a1();k=0;i=e;return k|0}z=0;aI(8);if(!z){return 0}else{z=0}k=b$(-1,-1)|0;z=0;aI(2);if(!z){bj(k|0)}else{z=0;k=b$(-1,-1,0)|0;fi(k);return 0}return 0}function Co(b){b=b|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0;e=i;i=i+16|0;f=e|0;g=b+36|0;if((a[g]&1)==0){h=f;c[h>>2]=c[g>>2];c[h+4>>2]=c[g+4>>2];c[h+8>>2]=c[g+8>>2];j=a[h]|0;k=h}else{h=c[b+44>>2]|0;g=c[b+40>>2]|0;if(g>>>0>4294967279>>>0){L4(0);return 0}if(g>>>0<11>>>0){b=g<<1&255;l=f;a[l]=b;m=f+1|0;n=b;o=l}else{l=g+16&-16;b=Tu(l)|0;c[f+8>>2]=b;p=l|1;c[f>>2]=p;c[f+4>>2]=g;m=b;n=p&255;o=f}TF(m|0,h|0,g)|0;a[m+g|0]=0;j=n;k=o}if((j&1)==0){q=f+1|0}else{q=c[f+8>>2]|0}o=j&255;if((o&1|0)==0){r=o>>>1}else{r=c[f+4>>2]|0}if(r>>>0>3>>>0){o=r;j=q;n=r;while(1){g=j;m=ai(d[g]|d[g+1|0]<<8|d[g+2|0]<<16|d[g+3|0]<<24|0,1540483477)|0;g=(ai(m>>>24^m,1540483477)|0)^(ai(o,1540483477)|0);m=j+4|0;h=n-4|0;if(h>>>0>3>>>0){o=g;j=m;n=h}else{s=g;t=m;u=h;break}}}else{s=r;t=q;u=r}if((u|0)==3){v=(d[t+2|0]|0)<<16^s;w=19}else if((u|0)==2){v=s;w=19}else if((u|0)==1){x=s;w=20}else{y=s}if((w|0)==19){x=(d[t+1|0]|0)<<8^v;w=20}if((w|0)==20){y=ai((d[t]|0)^x,1540483477)|0}x=ai(y>>>13^y,1540483477)|0;y=x>>>15^x;if((a[k]&1)==0){i=e;return y|0}Tw(c[f+8>>2]|0);i=e;return y|0}function Cp(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;h=i;i=i+32|0;j=e;e=i;i=i+12|0;i=i+7&-8;c[e>>2]=c[j>>2];c[e+4>>2]=c[j+4>>2];c[e+8>>2]=c[j+8>>2];j=h|0;k=h+16|0;l=b|0;m=d;if((a[m]&1)==0){n=j;c[n>>2]=c[m>>2];c[n+4>>2]=c[m+4>>2];c[n+8>>2]=c[m+8>>2]}else{m=c[d+8>>2]|0;n=c[d+4>>2]|0;if(n>>>0>4294967279>>>0){L4(0)}if(n>>>0<11>>>0){a[j]=n<<1;o=j+1|0}else{d=n+16&-16;p=Tu(d)|0;c[j+8>>2]=p;c[j>>2]=d|1;c[j+4>>2]=n;o=p}TF(o|0,m|0,n)|0;a[o+n|0]=0}n=k;o=e;c[n>>2]=c[o>>2];c[n+4>>2]=c[o+4>>2];c[n+8>>2]=c[o+8>>2];z=0;aK(10,l|0,j|0,k|0,1,0,0,0);if(z){z=0;k=b$(-1,-1)|0;l=k;k=M;if((a[j]&1)==0){q=k;r=l;s=r;t=0;u=s;v=q;bj(u|0)}Tw(c[j+8>>2]|0);q=k;r=l;s=r;t=0;u=s;v=q;bj(u|0)}if((a[j]&1)!=0){Tw(c[j+8>>2]|0)}j=b|0;c[j>>2]=21848;c[b+36>>2]=f;f=b+40|0;l=g;if((a[l]&1)==0){k=f;c[k>>2]=c[l>>2];c[k+4>>2]=c[l+4>>2];c[k+8>>2]=c[l+8>>2];w=b+52|0;c[w>>2]=0;i=h;return}l=c[g+8>>2]|0;k=c[g+4>>2]|0;do{if(k>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}}else{if(k>>>0<11>>>0){a[f]=k<<1;x=f+1|0}else{g=k+16&-16;o=(z=0,av(316,g|0)|0);if(z){z=0;break}c[b+48>>2]=o;c[f>>2]=g|1;c[b+44>>2]=k;x=o}TF(x|0,l|0,k)|0;a[x+k|0]=0;w=b+52|0;c[w>>2]=0;i=h;return}}while(0);h=b$(-1,-1)|0;w=h;h=M;c[j>>2]=21728;if((a[b+4|0]&1)==0){q=h;r=w;s=r;t=0;u=s;v=q;bj(u|0)}Tw(c[b+12>>2]|0);q=h;r=w;s=r;t=0;u=s;v=q;bj(u|0)}function Cq(b){b=b|0;var d=0;d=b|0;c[d>>2]=21848;if((a[b+40|0]&1)!=0){Tw(c[b+48>>2]|0)}c[d>>2]=21728;if((a[b+4|0]&1)==0){return}Tw(c[b+12>>2]|0);return}function Cr(b){b=b|0;var d=0,e=0;d=b|0;c[d>>2]=21848;if((a[b+40|0]&1)!=0){Tw(c[b+48>>2]|0)}c[d>>2]=21728;if((a[b+4|0]&1)==0){e=b;Tw(e);return}Tw(c[b+12>>2]|0);e=b;Tw(e);return}function Cs(a,b){a=a|0;b=b|0;cK[c[(c[b>>2]|0)+132>>2]&1023](b,a);return}function Ct(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+132>>2]&2047](b,a)|0}function Cu(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+132>>2]&2047](b,a)|0}function Cv(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+132>>2]&2047](b,a)|0}function Cw(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+132>>2]&2047](b,a)|0}function Cx(a,b,d){a=a|0;b=b|0;d=d|0;c8[c[(c[d>>2]|0)+132>>2]&511](a,d,b);return}function Cy(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+132>>2]&2047](b,a)|0}function Cz(b,d){b=b|0;d=d|0;var e=0,f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0;e=i;i=i+32|0;f=e|0;g=e+16|0;h=Th(d,38880,37536,0)|0;L1:do{if((h|0)==0){z=0;aI(6);if(z){z=0;j=50;break}return 0}else{d=(z=0,av(c[(c[h>>2]|0)+36>>2]|0,h|0)|0);if(z){z=0;j=50;break}if(!d){k=0;i=e;return k|0}d=b+40|0;if((a[d]&1)==0){l=f;c[l>>2]=c[d>>2];c[l+4>>2]=c[d+4>>2];c[l+8>>2]=c[d+8>>2]}else{d=c[b+48>>2]|0;l=c[b+44>>2]|0;if(l>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;j=50;break}return 0}if(l>>>0<11>>>0){a[f]=l<<1;m=f+1|0}else{n=l+16&-16;o=(z=0,av(316,n|0)|0);if(z){z=0;j=50;break}c[f+8>>2]=o;c[f>>2]=n|1;c[f+4>>2]=l;m=o}TF(m|0,d|0,l)|0;a[m+l|0]=0}l=h+40|0;L20:do{if((a[l]&1)==0){d=g;c[d>>2]=c[l>>2];c[d+4>>2]=c[l+4>>2];c[d+8>>2]=c[l+8>>2]}else{d=c[h+48>>2]|0;o=c[h+44>>2]|0;do{if(o>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}return 0}else{if(o>>>0<11>>>0){a[g]=o<<1;p=g+1|0}else{n=o+16&-16;q=(z=0,av(316,n|0)|0);if(z){z=0;break}c[g+8>>2]=q;c[g>>2]=n|1;c[g+4>>2]=o;p=q}TF(p|0,d|0,o)|0;a[p+o|0]=0;break L20}}while(0);o=b$(-1,-1,35480,0)|0;d=o;o=M;if((a[f]&1)==0){r=o;s=d;break L1}Tw(c[f+8>>2]|0);r=o;s=d;break L1}}while(0);l=f;d=a[f]|0;o=d&255;if((o&1|0)==0){t=o>>>1}else{t=c[f+4>>2]|0}o=g;q=a[g]|0;n=q&255;if((n&1|0)==0){u=n>>>1}else{u=c[g+4>>2]|0}L43:do{if((t|0)==(u|0)){n=(d&1)==0;if(n){v=l+1|0}else{v=c[f+8>>2]|0}w=q&1;if(w<<24>>24==0){x=o+1|0}else{x=c[g+8>>2]|0}do{if(n){if((t|0)==0){break}else{y=x;A=v;B=t}while(1){if((a[A]|0)!=(a[y]|0)){C=0;D=w;break L43}E=B-1|0;if((E|0)==0){break}else{y=y+1|0;A=A+1|0;B=E}}}else{if((TH(v|0,x|0,t|0)|0)!=0){C=0;D=w;break L43}}}while(0);C=(c[b+36>>2]|0)==(c[h+36>>2]|0);D=w}else{C=0;D=q&1}}while(0);if(D<<24>>24!=0){Tw(c[g+8>>2]|0)}if((d&1)==0){k=C;i=e;return k|0}Tw(c[f+8>>2]|0);k=C;i=e;return k|0}}while(0);if((j|0)==50){j=b$(-1,-1,35480,0)|0;r=M;s=j}j=(r|0)==(cA(35480)|0);bI(s|0)|0;if(j){a1();k=0;i=e;return k|0}z=0;aI(8);if(!z){return 0}else{z=0}k=b$(-1,-1)|0;z=0;aI(2);if(!z){bj(k|0)}else{z=0;k=b$(-1,-1,0)|0;fi(k);return 0}return 0}function CA(b){b=b|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0;e=b+52|0;f=c[e>>2]|0;if((f|0)!=0){g=f;return g|0}f=b+40|0;h=a[f]|0;if((h&1)==0){i=f+1|0}else{i=c[b+48>>2]|0}f=h&255;if((f&1|0)==0){j=f>>>1}else{j=c[b+44>>2]|0}if(j>>>0>3>>>0){f=j;h=i;k=j;while(1){l=h;m=ai(d[l]|d[l+1|0]<<8|d[l+2|0]<<16|d[l+3|0]<<24|0,1540483477)|0;l=(ai(m>>>24^m,1540483477)|0)^(ai(f,1540483477)|0);m=h+4|0;n=k-4|0;if(n>>>0>3>>>0){f=l;h=m;k=n}else{o=l;p=m;q=n;break}}}else{o=j;p=i;q=j}if((q|0)==2){r=o;s=12}else if((q|0)==3){r=(d[p+2|0]|0)<<16^o;s=12}else if((q|0)==1){t=o;s=13}else{u=o}if((s|0)==12){t=(d[p+1|0]|0)<<8^r;s=13}if((s|0)==13){u=ai((d[p]|0)^t,1540483477)|0}t=ai(u>>>13^u,1540483477)|0;u=t^c[b+36>>2]^t>>>15;c[e>>2]=u;g=u;return g|0}function CB(b){b=b|0;c[b>>2]=21728;if((a[b+4|0]&1)==0){return}Tw(c[b+12>>2]|0);return}function CC(b){b=b|0;var d=0;c[b>>2]=21728;if((a[b+4|0]&1)==0){d=b;Tw(d);return}Tw(c[b+12>>2]|0);d=b;Tw(d);return}function CD(a,b){a=a|0;b=b|0;cK[c[(c[b>>2]|0)+116>>2]&1023](b,a);return}function CE(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+116>>2]&2047](b,a)|0}function CF(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+116>>2]&2047](b,a)|0}function CG(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+116>>2]&2047](b,a)|0}function CH(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+116>>2]&2047](b,a)|0}function CI(a,b,d){a=a|0;b=b|0;d=d|0;c8[c[(c[d>>2]|0)+116>>2]&511](a,d,b);return}function CJ(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+116>>2]&2047](b,a)|0}function CK(b){b=b|0;c[b>>2]=21728;if((a[b+4|0]&1)==0){return}Tw(c[b+12>>2]|0);return}function CL(b){b=b|0;var d=0;c[b>>2]=21728;if((a[b+4|0]&1)==0){d=b;Tw(d);return}Tw(c[b+12>>2]|0);d=b;Tw(d);return}function CM(a,b){a=a|0;b=b|0;cK[c[(c[b>>2]|0)+112>>2]&1023](b,a);return}function CN(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+112>>2]&2047](b,a)|0}function CO(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+112>>2]&2047](b,a)|0}function CP(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+112>>2]&2047](b,a)|0}function CQ(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+112>>2]&2047](b,a)|0}function CR(a,b,d){a=a|0;b=b|0;d=d|0;c8[c[(c[d>>2]|0)+112>>2]&511](a,d,b);return}function CS(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+112>>2]&2047](b,a)|0}function CT(b){b=b|0;c[b>>2]=21728;if((a[b+4|0]&1)==0){return}Tw(c[b+12>>2]|0);return}function CU(b){b=b|0;var d=0;c[b>>2]=21728;if((a[b+4|0]&1)==0){d=b;Tw(d);return}Tw(c[b+12>>2]|0);d=b;Tw(d);return}function CV(a,b){a=a|0;b=b|0;cK[c[(c[b>>2]|0)+92>>2]&1023](b,a);return}function CW(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+92>>2]&2047](b,a)|0}function CX(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+92>>2]&2047](b,a)|0}function CY(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+92>>2]&2047](b,a)|0}function CZ(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+92>>2]&2047](b,a)|0}function C_(a,b,d){a=a|0;b=b|0;d=d|0;c8[c[(c[d>>2]|0)+92>>2]&511](a,d,b);return}function C$(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+92>>2]&2047](b,a)|0}function C0(b){b=b|0;c[b>>2]=21728;if((a[b+4|0]&1)==0){return}Tw(c[b+12>>2]|0);return}function C1(b){b=b|0;var d=0;c[b>>2]=21728;if((a[b+4|0]&1)==0){d=b;Tw(d);return}Tw(c[b+12>>2]|0);d=b;Tw(d);return}function C2(a,b){a=a|0;b=b|0;cK[c[(c[b>>2]|0)+88>>2]&1023](b,a);return}function C3(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+88>>2]&2047](b,a)|0}function C4(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+88>>2]&2047](b,a)|0}function C5(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+88>>2]&2047](b,a)|0}function C6(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+88>>2]&2047](b,a)|0}function C7(a,b,d){a=a|0;b=b|0;d=d|0;c8[c[(c[d>>2]|0)+88>>2]&511](a,d,b);return}function C8(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+88>>2]&2047](b,a)|0}function C9(b){b=b|0;c[b>>2]=21728;if((a[b+4|0]&1)==0){return}Tw(c[b+12>>2]|0);return}function Da(b){b=b|0;var d=0;c[b>>2]=21728;if((a[b+4|0]&1)==0){d=b;Tw(d);return}Tw(c[b+12>>2]|0);d=b;Tw(d);return}function Db(a,b){a=a|0;b=b|0;cK[c[(c[b>>2]|0)+84>>2]&1023](b,a);return}function Dc(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+84>>2]&2047](b,a)|0}function Dd(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+84>>2]&2047](b,a)|0}function De(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+84>>2]&2047](b,a)|0}function Df(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+84>>2]&2047](b,a)|0}function Dg(a,b,d){a=a|0;b=b|0;d=d|0;c8[c[(c[d>>2]|0)+84>>2]&511](a,d,b);return}function Dh(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+84>>2]&2047](b,a)|0}function Di(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0;j=i;i=i+32|0;k=e;e=i;i=i+12|0;i=i+7&-8;c[e>>2]=c[k>>2];c[e+4>>2]=c[k+4>>2];c[e+8>>2]=c[k+8>>2];k=j|0;l=j+16|0;m=b|0;n=d;if((a[n]&1)==0){o=k;c[o>>2]=c[n>>2];c[o+4>>2]=c[n+4>>2];c[o+8>>2]=c[n+8>>2]}else{n=c[d+8>>2]|0;o=c[d+4>>2]|0;if(o>>>0>4294967279>>>0){L4(0)}if(o>>>0<11>>>0){a[k]=o<<1;p=k+1|0}else{d=o+16&-16;q=Tu(d)|0;c[k+8>>2]=q;c[k>>2]=d|1;c[k+4>>2]=o;p=q}TF(p|0,n|0,o)|0;a[p+o|0]=0}o=l;p=e;c[o>>2]=c[p>>2];c[o+4>>2]=c[p+4>>2];c[o+8>>2]=c[p+8>>2];z=0;aT(224,m|0,k|0,l|0);if(z){z=0;l=b$(-1,-1)|0;m=l;l=M;if((a[k]&1)==0){r=l;s=m;t=s;u=0;v=t;w=r;bj(v|0)}Tw(c[k+8>>2]|0);r=l;s=m;t=s;u=0;v=t;w=r;bj(v|0)}if((a[k]&1)!=0){Tw(c[k+8>>2]|0)}k=b|0;c[k>>2]=25496;m=b+32|0;l=f;L22:do{if((a[l]&1)==0){p=m;c[p>>2]=c[l>>2];c[p+4>>2]=c[l+4>>2];c[p+8>>2]=c[l+8>>2];x=22}else{p=c[f+8>>2]|0;o=c[f+4>>2]|0;do{if(o>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}}else{if(o>>>0<11>>>0){a[m]=o<<1;y=m+1|0}else{e=o+16&-16;n=(z=0,av(316,e|0)|0);if(z){z=0;break}c[b+40>>2]=n;c[m>>2]=e|1;c[b+36>>2]=o;y=n}TF(y|0,p|0,o)|0;a[y+o|0]=0;x=22;break L22}}while(0);o=b$(-1,-1)|0;A=M;B=o}}while(0);do{if((x|0)==22){y=b+44|0;f=g;if((a[f]&1)==0){l=y;c[l>>2]=c[f>>2];c[l+4>>2]=c[f+4>>2];c[l+8>>2]=c[f+8>>2];C=b+56|0;c[C>>2]=h;i=j;return}f=c[g+8>>2]|0;l=c[g+4>>2]|0;do{if(l>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}}else{if(l>>>0<11>>>0){a[y]=l<<1;D=y+1|0}else{o=l+16&-16;p=(z=0,av(316,o|0)|0);if(z){z=0;break}c[b+52>>2]=p;c[y>>2]=o|1;c[b+48>>2]=l;D=p}TF(D|0,f|0,l)|0;a[D+l|0]=0;C=b+56|0;c[C>>2]=h;i=j;return}}while(0);l=b$(-1,-1)|0;f=l;l=M;if((a[m]&1)==0){A=l;B=f;break}Tw(c[b+40>>2]|0);A=l;B=f}}while(0);c[k>>2]=21728;if((a[b+4|0]&1)==0){r=A;s=B;t=s;u=0;v=t;w=r;bj(v|0)}Tw(c[b+12>>2]|0);r=A;s=B;t=s;u=0;v=t;w=r;bj(v|0)}function Dj(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0;f=i;i=i+32|0;g=e;e=i;i=i+12|0;i=i+7&-8;c[e>>2]=c[g>>2];c[e+4>>2]=c[g+4>>2];c[e+8>>2]=c[g+8>>2];g=f|0;h=f+16|0;j=b|0;k=d;if((a[k]&1)==0){l=g;c[l>>2]=c[k>>2];c[l+4>>2]=c[k+4>>2];c[l+8>>2]=c[k+8>>2]}else{k=c[d+8>>2]|0;l=c[d+4>>2]|0;if(l>>>0>4294967279>>>0){L4(0)}if(l>>>0<11>>>0){a[g]=l<<1;m=g+1|0}else{d=l+16&-16;n=Tu(d)|0;c[g+8>>2]=n;c[g>>2]=d|1;c[g+4>>2]=l;m=n}TF(m|0,k|0,l)|0;a[m+l|0]=0}l=h;m=e;c[l>>2]=c[m>>2];c[l+4>>2]=c[m+4>>2];c[l+8>>2]=c[m+8>>2];z=0;aq(22,j|0,g|0,h|0,0,0);if(!z){if((a[g]&1)==0){o=b|0;c[o>>2]=26288;i=f;return}Tw(c[g+8>>2]|0);o=b|0;c[o>>2]=26288;i=f;return}else{z=0;f=b$(-1,-1)|0;if((a[g]&1)==0){bj(f|0)}Tw(c[g+8>>2]|0);bj(f|0)}}function Dk(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;h=i;i=i+32|0;j=e;e=i;i=i+12|0;i=i+7&-8;c[e>>2]=c[j>>2];c[e+4>>2]=c[j+4>>2];c[e+8>>2]=c[j+8>>2];j=h|0;k=h+16|0;l=b|0;m=d;if((a[m]&1)==0){n=j;c[n>>2]=c[m>>2];c[n+4>>2]=c[m+4>>2];c[n+8>>2]=c[m+8>>2]}else{m=c[d+8>>2]|0;n=c[d+4>>2]|0;if(n>>>0>4294967279>>>0){L4(0)}if(n>>>0<11>>>0){a[j]=n<<1;o=j+1|0}else{d=n+16&-16;p=Tu(d)|0;c[j+8>>2]=p;c[j>>2]=d|1;c[j+4>>2]=n;o=p}TF(o|0,m|0,n)|0;a[o+n|0]=0}n=k;o=e;c[n>>2]=c[o>>2];c[n+4>>2]=c[o+4>>2];c[n+8>>2]=c[o+8>>2];z=0;aT(224,l|0,j|0,k|0);if(z){z=0;k=b$(-1,-1)|0;l=k;k=M;if((a[j]&1)==0){q=k;r=l;s=r;t=0;u=s;v=q;bj(u|0)}Tw(c[j+8>>2]|0);q=k;r=l;s=r;t=0;u=s;v=q;bj(u|0)}if((a[j]&1)!=0){Tw(c[j+8>>2]|0)}j=b|0;c[j>>2]=26424;l=b+32|0;k=f;if((a[k]&1)==0){o=l;c[o>>2]=c[k>>2];c[o+4>>2]=c[k+4>>2];c[o+8>>2]=c[k+8>>2];w=b+44|0;c[w>>2]=g;i=h;return}k=c[f+8>>2]|0;o=c[f+4>>2]|0;do{if(o>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}}else{if(o>>>0<11>>>0){a[l]=o<<1;x=l+1|0}else{f=o+16&-16;n=(z=0,av(316,f|0)|0);if(z){z=0;break}c[b+40>>2]=n;c[l>>2]=f|1;c[b+36>>2]=o;x=n}TF(x|0,k|0,o)|0;a[x+o|0]=0;w=b+44|0;c[w>>2]=g;i=h;return}}while(0);h=b$(-1,-1)|0;g=h;h=M;c[j>>2]=21728;if((a[b+4|0]&1)==0){q=h;r=g;s=r;t=0;u=s;v=q;bj(u|0)}Tw(c[b+12>>2]|0);q=h;r=g;s=r;t=0;u=s;v=q;bj(u|0)}function Dl(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0;g=i;i=i+32|0;h=e;e=i;i=i+12|0;i=i+7&-8;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];c[e+8>>2]=c[h+8>>2];h=g|0;j=g+16|0;k=b|0;l=d;if((a[l]&1)==0){m=h;c[m>>2]=c[l>>2];c[m+4>>2]=c[l+4>>2];c[m+8>>2]=c[l+8>>2]}else{l=c[d+8>>2]|0;m=c[d+4>>2]|0;if(m>>>0>4294967279>>>0){L4(0)}if(m>>>0<11>>>0){a[h]=m<<1;n=h+1|0}else{d=m+16&-16;o=Tu(d)|0;c[h+8>>2]=o;c[h>>2]=d|1;c[h+4>>2]=m;n=o}TF(n|0,l|0,m)|0;a[n+m|0]=0}m=j;n=e;c[m>>2]=c[n>>2];c[m+4>>2]=c[n+4>>2];c[m+8>>2]=c[n+8>>2];z=0;aT(224,k|0,h|0,j|0);if(z){z=0;j=b$(-1,-1)|0;k=j;j=M;if((a[h]&1)==0){p=j;q=k;r=q;s=0;t=r;u=p;bj(t|0)}Tw(c[h+8>>2]|0);p=j;q=k;r=q;s=0;t=r;u=p;bj(t|0)}if((a[h]&1)!=0){Tw(c[h+8>>2]|0)}h=b|0;c[h>>2]=24944;k=b+32|0;j=f;if((a[j]&1)==0){n=k;c[n>>2]=c[j>>2];c[n+4>>2]=c[j+4>>2];c[n+8>>2]=c[j+8>>2];v=b+29|0;a[v]=1;i=g;return}j=c[f+8>>2]|0;n=c[f+4>>2]|0;do{if(n>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}}else{if(n>>>0<11>>>0){a[k]=n<<1;w=k+1|0}else{f=n+16&-16;m=(z=0,av(316,f|0)|0);if(z){z=0;break}c[b+40>>2]=m;c[k>>2]=f|1;c[b+36>>2]=n;w=m}TF(w|0,j|0,n)|0;a[w+n|0]=0;v=b+29|0;a[v]=1;i=g;return}}while(0);g=b$(-1,-1)|0;v=g;g=M;c[h>>2]=21728;if((a[b+4|0]&1)==0){p=g;q=v;r=q;s=0;t=r;u=p;bj(t|0)}Tw(c[b+12>>2]|0);p=g;q=v;r=q;s=0;t=r;u=p;bj(t|0)}function Dm(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;g=i;i=i+32|0;h=e;e=i;i=i+12|0;i=i+7&-8;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];c[e+8>>2]=c[h+8>>2];h=g|0;j=g+16|0;k=b|0;l=d;if((a[l]&1)==0){m=h;c[m>>2]=c[l>>2];c[m+4>>2]=c[l+4>>2];c[m+8>>2]=c[l+8>>2]}else{l=c[d+8>>2]|0;m=c[d+4>>2]|0;if(m>>>0>4294967279>>>0){L4(0)}if(m>>>0<11>>>0){a[h]=m<<1;n=h+1|0}else{d=m+16&-16;o=Tu(d)|0;c[h+8>>2]=o;c[h>>2]=d|1;c[h+4>>2]=m;n=o}TF(n|0,l|0,m)|0;a[n+m|0]=0}m=j;n=e;c[m>>2]=c[n>>2];c[m+4>>2]=c[n+4>>2];c[m+8>>2]=c[n+8>>2];z=0;aT(224,k|0,h|0,j|0);if(z){z=0;j=b$(-1,-1)|0;k=j;j=M;if((a[h]&1)==0){p=j;q=k;r=q;s=0;t=r;u=p;bj(t|0)}Tw(c[h+8>>2]|0);p=j;q=k;r=q;s=0;t=r;u=p;bj(t|0)}if((a[h]&1)!=0){Tw(c[h+8>>2]|0)}h=b|0;c[h>>2]=25424;k=b+32|0;j=f;if((a[j]&1)==0){n=k;c[n>>2]=c[j>>2];c[n+4>>2]=c[j+4>>2];c[n+8>>2]=c[j+8>>2];i=g;return}j=c[f+8>>2]|0;n=c[f+4>>2]|0;do{if(n>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}}else{if(n>>>0<11>>>0){a[k]=n<<1;v=k+1|0}else{f=n+16&-16;m=(z=0,av(316,f|0)|0);if(z){z=0;break}c[b+40>>2]=m;c[k>>2]=f|1;c[b+36>>2]=n;v=m}TF(v|0,j|0,n)|0;a[v+n|0]=0;i=g;return}}while(0);g=b$(-1,-1)|0;n=g;g=M;c[h>>2]=21728;if((a[b+4|0]&1)==0){p=g;q=n;r=q;s=0;t=r;u=p;bj(t|0)}Tw(c[b+12>>2]|0);p=g;q=n;r=q;s=0;t=r;u=p;bj(t|0)}function Dn(b){b=b|0;c[b>>2]=21728;if((a[b+4|0]&1)==0){return}Tw(c[b+12>>2]|0);return}function Do(b){b=b|0;var d=0;c[b>>2]=21728;if((a[b+4|0]&1)==0){d=b;Tw(d);return}Tw(c[b+12>>2]|0);d=b;Tw(d);return}function Dp(a,b){a=a|0;b=b|0;cK[c[(c[b>>2]|0)+192>>2]&1023](b,a);return}function Dq(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+192>>2]&2047](b,a)|0}function Dr(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+192>>2]&2047](b,a)|0}function Ds(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+192>>2]&2047](b,a)|0}function Dt(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+192>>2]&2047](b,a)|0}function Du(a,b,d){a=a|0;b=b|0;d=d|0;c8[c[(c[d>>2]|0)+192>>2]&511](a,d,b);return}function Dv(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+192>>2]&2047](b,a)|0}function Dw(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0;h=i;i=i+32|0;j=e;e=i;i=i+12|0;i=i+7&-8;c[e>>2]=c[j>>2];c[e+4>>2]=c[j+4>>2];c[e+8>>2]=c[j+8>>2];j=h|0;k=h+16|0;l=b|0;m=d;if((a[m]&1)==0){n=j;c[n>>2]=c[m>>2];c[n+4>>2]=c[m+4>>2];c[n+8>>2]=c[m+8>>2]}else{m=c[d+8>>2]|0;n=c[d+4>>2]|0;if(n>>>0>4294967279>>>0){L4(0)}if(n>>>0<11>>>0){a[j]=n<<1;o=j+1|0}else{d=n+16&-16;p=Tu(d)|0;c[j+8>>2]=p;c[j>>2]=d|1;c[j+4>>2]=n;o=p}TF(o|0,m|0,n)|0;a[o+n|0]=0}n=k;o=e;c[n>>2]=c[o>>2];c[n+4>>2]=c[o+4>>2];c[n+8>>2]=c[o+8>>2];z=0;aX(4,l|0,j|0,k|0,g|0);if(!z){if((a[j]&1)==0){q=b|0;c[q>>2]=21992;r=b+32|0;c[r>>2]=f;i=h;return}Tw(c[j+8>>2]|0);q=b|0;c[q>>2]=21992;r=b+32|0;c[r>>2]=f;i=h;return}else{z=0;h=b$(-1,-1)|0;if((a[j]&1)==0){bj(h|0)}Tw(c[j+8>>2]|0);bj(h|0)}}function Dx(b){b=b|0;c[b>>2]=21728;if((a[b+4|0]&1)==0){return}Tw(c[b+12>>2]|0);return}function Dy(b){b=b|0;var d=0;c[b>>2]=21728;if((a[b+4|0]&1)==0){d=b;Tw(d);return}Tw(c[b+12>>2]|0);d=b;Tw(d);return}function Dz(a,b){a=a|0;b=b|0;cK[c[(c[b>>2]|0)+20>>2]&1023](b,a);return}function DA(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+20>>2]&2047](b,a)|0}function DB(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+20>>2]&2047](b,a)|0}function DC(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+20>>2]&2047](b,a)|0}function DD(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+20>>2]&2047](b,a)|0}function DE(a,b,d){a=a|0;b=b|0;d=d|0;c8[c[(c[d>>2]|0)+20>>2]&511](a,d,b);return}function DF(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+20>>2]&2047](b,a)|0}function DG(b,d,e,f,g){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;var h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0;h=i;i=i+48|0;j=e;e=i;i=i+12|0;i=i+7&-8;c[e>>2]=c[j>>2];c[e+4>>2]=c[j+4>>2];c[e+8>>2]=c[j+8>>2];j=h|0;k=h+16|0;l=h+32|0;m=l;n=b|0;o=d;if((a[o]&1)==0){p=j;c[p>>2]=c[o>>2];c[p+4>>2]=c[o+4>>2];c[p+8>>2]=c[o+8>>2]}else{o=c[d+8>>2]|0;p=c[d+4>>2]|0;if(p>>>0>4294967279>>>0){L4(0)}if(p>>>0<11>>>0){a[j]=p<<1;q=j+1|0}else{d=p+16&-16;r=Tu(d)|0;c[j+8>>2]=r;c[j>>2]=d|1;c[j+4>>2]=p;q=r}TF(q|0,o|0,p)|0;a[q+p|0]=0}p=k;q=e;c[p>>2]=c[q>>2];c[p+4>>2]=c[q+4>>2];c[p+8>>2]=c[q+8>>2];z=0;aq(10,n|0,j|0,k|0,g|0,1);if(z){z=0;g=b$(-1,-1)|0;k=g;g=M;if((a[j]&1)==0){s=g;t=k;u=t;v=0;w=u;x=s;bj(w|0)}Tw(c[j+8>>2]|0);s=g;t=k;u=t;v=0;w=u;x=s;bj(w|0)}if((a[j]&1)!=0){Tw(c[j+8>>2]|0)}j=b|0;c[j>>2]=26208;k=b+40|0;g=c[f>>2]|0;n=c[f+4>>2]|0;f=g;q=n-f|0;do{if(q>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;y=32;break}}else{if(q>>>0<11>>>0){a[k]=q<<1;A=k+1|0}else{p=q+16&-16;e=(z=0,av(316,p|0)|0);if(z){z=0;y=32;break}c[b+48>>2]=e;c[k>>2]=p|1;c[b+44>>2]=q;A=e}if((g|0)==(n|0)){B=A}else{e=n+(-f|0)|0;p=A;o=g;while(1){a[p]=a[o]|0;r=o+1|0;if((r|0)==(n|0)){break}else{p=p+1|0;o=r}}B=A+e|0}a[B]=0;o=b+52|0;TI(b+52|0,0,16)|0;z=0;at(224,l|0,k|0);if(z){z=0;p=b$(-1,-1)|0;r=p;p=M;if((a[o]&1)!=0){Tw(c[b+60>>2]|0)}if((a[k]&1)==0){C=p;D=r;break}Tw(c[b+48>>2]|0);C=p;D=r;break}r=o;if((a[r]&1)==0){a[o+1|0]=0;a[r]=0}else{a[c[b+60>>2]|0]=0;c[b+56>>2]=0}z=0;at(774,o|0,0);if(!z){c[r>>2]=c[m>>2];c[r+4>>2]=c[m+4>>2];c[r+8>>2]=c[m+8>>2];i=h;return}else{z=0;r=b$(-1,-1,0)|0;fi(r)}}}while(0);if((y|0)==32){y=b$(-1,-1)|0;C=M;D=y}c[j>>2]=21728;if((a[b+4|0]&1)==0){s=C;t=D;u=t;v=0;w=u;x=s;bj(w|0)}Tw(c[b+12>>2]|0);s=C;t=D;u=t;v=0;w=u;x=s;bj(w|0)}function DH(b,d,e,f,g,h,j){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;j=j|0;var k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0;k=i;i=i+32|0;l=e;e=i;i=i+12|0;i=i+7&-8;c[e>>2]=c[l>>2];c[e+4>>2]=c[l+4>>2];c[e+8>>2]=c[l+8>>2];l=k|0;m=k+16|0;n=b|0;o=d;if((a[o]&1)==0){p=l;c[p>>2]=c[o>>2];c[p+4>>2]=c[o+4>>2];c[p+8>>2]=c[o+8>>2]}else{o=c[d+8>>2]|0;p=c[d+4>>2]|0;if(p>>>0>4294967279>>>0){L4(0)}if(p>>>0<11>>>0){a[l]=p<<1;q=l+1|0}else{d=p+16&-16;r=Tu(d)|0;c[l+8>>2]=r;c[l>>2]=d|1;c[l+4>>2]=p;q=r}TF(q|0,o|0,p)|0;a[q+p|0]=0}p=m;q=e;c[p>>2]=c[q>>2];c[p+4>>2]=c[q+4>>2];c[p+8>>2]=c[q+8>>2];z=0;aT(306,n|0,l|0,m|0);if(z){z=0;m=b$(-1,-1)|0;n=m;m=M;if((a[l]&1)==0){s=m;t=n;u=t;v=0;w=u;x=s;bj(w|0)}Tw(c[l+8>>2]|0);s=m;t=n;u=t;v=0;w=u;x=s;bj(w|0)}if((a[l]&1)!=0){Tw(c[l+8>>2]|0)}l=b|0;c[l>>2]=28336;n=b+28|0;m=f;if((a[m]&1)==0){q=n;c[q>>2]=c[m>>2];c[q+4>>2]=c[m+4>>2];c[q+8>>2]=c[m+8>>2];y=b+40|0;c[y>>2]=g;A=b+44|0;B=h&1;a[A]=B;C=b+45|0;D=j&1;a[C]=D;i=k;return}m=c[f+8>>2]|0;q=c[f+4>>2]|0;do{if(q>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}}else{if(q>>>0<11>>>0){a[n]=q<<1;E=n+1|0}else{f=q+16&-16;p=(z=0,av(316,f|0)|0);if(z){z=0;break}c[b+36>>2]=p;c[n>>2]=f|1;c[b+32>>2]=q;E=p}TF(E|0,m|0,q)|0;a[E+q|0]=0;y=b+40|0;c[y>>2]=g;A=b+44|0;B=h&1;a[A]=B;C=b+45|0;D=j&1;a[C]=D;i=k;return}}while(0);k=b$(-1,-1)|0;D=k;k=M;c[l>>2]=21728;if((a[b+4|0]&1)==0){s=k;t=D;u=t;v=0;w=u;x=s;bj(w|0)}Tw(c[b+12>>2]|0);s=k;t=D;u=t;v=0;w=u;x=s;bj(w|0)}function DI(b){b=b|0;var d=0;d=b|0;c[d>>2]=28336;if((a[b+28|0]&1)!=0){Tw(c[b+36>>2]|0)}c[d>>2]=21728;if((a[b+4|0]&1)==0){return}Tw(c[b+12>>2]|0);return}function DJ(b){b=b|0;var d=0,e=0;d=b|0;c[d>>2]=28336;if((a[b+28|0]&1)!=0){Tw(c[b+36>>2]|0)}c[d>>2]=21728;if((a[b+4|0]&1)==0){e=b;Tw(e);return}Tw(c[b+12>>2]|0);e=b;Tw(e);return}function DK(a,b){a=a|0;b=b|0;cK[c[(c[b>>2]|0)+40>>2]&1023](b,a);return}function DL(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+40>>2]&2047](b,a)|0}function DM(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+40>>2]&2047](b,a)|0}function DN(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+40>>2]&2047](b,a)|0}function DO(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+40>>2]&2047](b,a)|0}function DP(a,b,d){a=a|0;b=b|0;d=d|0;c8[c[(c[d>>2]|0)+40>>2]&511](a,d,b);return}function DQ(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+40>>2]&2047](b,a)|0}function DR(b,d,e,f,g,h){b=b|0;d=d|0;e=e|0;f=f|0;g=g|0;h=h|0;var j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,N=0,O=0,P=0;j=i;i=i+80|0;k=e;e=i;i=i+12|0;i=i+7&-8;c[e>>2]=c[k>>2];c[e+4>>2]=c[k+4>>2];c[e+8>>2]=c[k+8>>2];k=j|0;l=j+16|0;m=j+32|0;n=j+48|0;o=j+64|0;p=d;if((a[p]&1)==0){q=l;c[q>>2]=c[p>>2];c[q+4>>2]=c[p+4>>2];c[q+8>>2]=c[p+8>>2];r=a[q]|0;s=q}else{q=c[d+8>>2]|0;p=c[d+4>>2]|0;if(p>>>0>4294967279>>>0){L4(0)}if(p>>>0<11>>>0){d=p<<1&255;t=l;a[t]=d;u=l+1|0;v=d;w=t}else{t=p+16&-16;d=Tu(t)|0;c[l+8>>2]=d;x=t|1;c[l>>2]=x;c[l+4>>2]=p;u=d;v=x&255;w=l}TF(u|0,q|0,p)|0;a[u+p|0]=0;r=v;s=w}w=e;e=k;c[e>>2]=c[w>>2];c[e+4>>2]=c[w+4>>2];c[e+8>>2]=c[w+8>>2];w=k;k=b|0;c[k>>2]=21728;e=b+4|0;L12:do{if((r&1)==0){v=e;c[v>>2]=c[s>>2];c[v+4>>2]=c[s+4>>2];c[v+8>>2]=c[s+8>>2]}else{v=c[l+8>>2]|0;p=c[l+4>>2]|0;do{if(p>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}}else{if(p>>>0<11>>>0){a[e]=p<<1;y=e+1|0}else{u=p+16&-16;q=(z=0,av(316,u|0)|0);if(z){z=0;break}c[b+12>>2]=q;c[e>>2]=u|1;c[b+8>>2]=p;y=q}TF(y|0,v|0,p)|0;a[y+p|0]=0;break L12}}while(0);p=b$(-1,-1)|0;q=p;p=M;if((a[s]&1)==0){A=p;B=q;C=B;D=0;E=C;F=A;bj(E|0)}Tw(v);A=p;B=q;C=B;D=0;E=C;F=A;bj(E|0)}}while(0);y=b+16|0;c[y>>2]=c[w>>2];c[y+4>>2]=c[w+4>>2];c[y+8>>2]=c[w+8>>2];if((a[s]&1)!=0){Tw(c[l+8>>2]|0)}c[k>>2]=21216;l=b+28|0;s=f;L33:do{if((a[s]&1)==0){w=l;c[w>>2]=c[s>>2];c[w+4>>2]=c[s+4>>2];c[w+8>>2]=c[s+8>>2];G=31}else{w=c[f+8>>2]|0;r=c[f+4>>2]|0;do{if(r>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}}else{if(r>>>0<11>>>0){a[l]=r<<1;H=l+1|0}else{q=r+16&-16;p=(z=0,av(316,q|0)|0);if(z){z=0;break}c[b+36>>2]=p;c[l>>2]=q|1;c[b+32>>2]=r;H=p}TF(H|0,w|0,r)|0;a[H+r|0]=0;G=31;break L33}}while(0);r=b$(-1,-1)|0;I=M;J=r}}while(0);do{if((G|0)==31){c[b+40>>2]=g;a[b+44|0]=h&1;if((g|0)==0|h^1){i=j;return}H=(z=0,av(316,64)|0);do{if(!z){f=m+8|0;c[f>>2]=H;c[m>>2]=65;c[m+4>>2]=54;TF(H|0,16608,54)|0;a[H+54|0]=0;s=e;L54:do{if((a[s]&1)==0){r=n;c[r>>2]=c[s>>2];c[r+4>>2]=c[s+4>>2];c[r+8>>2]=c[s+8>>2];G=43}else{r=c[b+12>>2]|0;w=c[b+8>>2]|0;do{if(w>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}}else{if(w>>>0<11>>>0){a[n]=w<<1;K=n+1|0}else{v=w+16&-16;p=(z=0,av(316,v|0)|0);if(z){z=0;break}c[n+8>>2]=p;c[n>>2]=v|1;c[n+4>>2]=w;K=p}TF(K|0,r|0,w)|0;a[K+w|0]=0;G=43;break L54}}while(0);w=b$(-1,-1)|0;L=M;N=w}}while(0);do{if((G|0)==43){s=o;c[s>>2]=c[y>>2];c[s+4>>2]=c[y+4>>2];c[s+8>>2]=c[y+8>>2];z=0;aT(272,m|0,n|0,o|0);if(z){z=0;s=b$(-1,-1)|0;w=s;s=M;if((a[n]&1)==0){L=s;N=w;break}Tw(c[n+8>>2]|0);L=s;N=w;break}if((a[n]&1)!=0){Tw(c[n+8>>2]|0)}if((a[m]&1)==0){i=j;return}Tw(c[f>>2]|0);i=j;return}}while(0);if((a[m]&1)==0){O=L;P=N;break}Tw(c[f>>2]|0);O=L;P=N}else{z=0;w=b$(-1,-1)|0;O=M;P=w}}while(0);if((a[l]&1)==0){I=O;J=P;break}Tw(c[b+36>>2]|0);I=O;J=P}}while(0);c[k>>2]=21728;if((a[e]&1)==0){A=I;B=J;C=B;D=0;E=C;F=A;bj(E|0)}Tw(c[b+12>>2]|0);A=I;B=J;C=B;D=0;E=C;F=A;bj(E|0)}function DS(b){b=b|0;var d=0;d=b|0;c[d>>2]=21216;if((a[b+28|0]&1)!=0){Tw(c[b+36>>2]|0)}c[d>>2]=21728;if((a[b+4|0]&1)==0){return}Tw(c[b+12>>2]|0);return}function DT(b){b=b|0;var d=0,e=0;d=b|0;c[d>>2]=21216;if((a[b+28|0]&1)!=0){Tw(c[b+36>>2]|0)}c[d>>2]=21728;if((a[b+4|0]&1)==0){e=b;Tw(e);return}Tw(c[b+12>>2]|0);e=b;Tw(e);return}function DU(a,b){a=a|0;b=b|0;cK[c[(c[b>>2]|0)+176>>2]&1023](b,a);return}function DV(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+176>>2]&2047](b,a)|0}function DW(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+176>>2]&2047](b,a)|0}function DX(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+176>>2]&2047](b,a)|0}function DY(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+176>>2]&2047](b,a)|0}function DZ(a,b,d){a=a|0;b=b|0;d=d|0;c8[c[(c[d>>2]|0)+176>>2]&511](a,d,b);return}function D_(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+176>>2]&2047](b,a)|0}function D$(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0;g=i;i=i+32|0;h=e;e=i;i=i+12|0;i=i+7&-8;c[e>>2]=c[h>>2];c[e+4>>2]=c[h+4>>2];c[e+8>>2]=c[h+8>>2];h=g|0;j=g+16|0;k=b|0;l=d;if((a[l]&1)==0){m=h;c[m>>2]=c[l>>2];c[m+4>>2]=c[l+4>>2];c[m+8>>2]=c[l+8>>2]}else{l=c[d+8>>2]|0;m=c[d+4>>2]|0;if(m>>>0>4294967279>>>0){L4(0)}if(m>>>0<11>>>0){a[h]=m<<1;n=h+1|0}else{d=m+16&-16;o=Tu(d)|0;c[h+8>>2]=o;c[h>>2]=d|1;c[h+4>>2]=m;n=o}TF(n|0,l|0,m)|0;a[n+m|0]=0}m=j;n=e;c[m>>2]=c[n>>2];c[m+4>>2]=c[n+4>>2];c[m+8>>2]=c[n+8>>2];z=0;aT(306,k|0,h|0,j|0);if(z){z=0;j=b$(-1,-1)|0;k=j;j=M;if((a[h]&1)==0){p=j;q=k;r=q;s=0;t=r;u=p;bj(t|0)}Tw(c[h+8>>2]|0);p=j;q=k;r=q;s=0;t=r;u=p;bj(t|0)}if((a[h]&1)!=0){Tw(c[h+8>>2]|0)}h=b|0;c[h>>2]=27664;k=b+28|0;j=f;if((a[j]&1)==0){n=k;c[n>>2]=c[j>>2];c[n+4>>2]=c[j+4>>2];c[n+8>>2]=c[j+8>>2];i=g;return}j=c[f+8>>2]|0;n=c[f+4>>2]|0;do{if(n>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}}else{if(n>>>0<11>>>0){a[k]=n<<1;v=k+1|0}else{f=n+16&-16;m=(z=0,av(316,f|0)|0);if(z){z=0;break}c[b+36>>2]=m;c[k>>2]=f|1;c[b+32>>2]=n;v=m}TF(v|0,j|0,n)|0;a[v+n|0]=0;i=g;return}}while(0);g=b$(-1,-1)|0;n=g;g=M;c[h>>2]=21728;if((a[b+4|0]&1)==0){p=g;q=n;r=q;s=0;t=r;u=p;bj(t|0)}Tw(c[b+12>>2]|0);p=g;q=n;r=q;s=0;t=r;u=p;bj(t|0)}function D0(b){b=b|0;var d=0;d=b|0;c[d>>2]=27664;if((a[b+28|0]&1)!=0){Tw(c[b+36>>2]|0)}c[d>>2]=21728;if((a[b+4|0]&1)==0){return}Tw(c[b+12>>2]|0);return}function D1(b){b=b|0;var d=0,e=0;d=b|0;c[d>>2]=27664;if((a[b+28|0]&1)!=0){Tw(c[b+36>>2]|0)}c[d>>2]=21728;if((a[b+4|0]&1)==0){e=b;Tw(e);return}Tw(c[b+12>>2]|0);e=b;Tw(e);return}function D2(a,b){a=a|0;b=b|0;cK[c[(c[b>>2]|0)+48>>2]&1023](b,a);return}function D3(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+48>>2]&2047](b,a)|0}function D4(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+48>>2]&2047](b,a)|0}function D5(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+48>>2]&2047](b,a)|0}function D6(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+48>>2]&2047](b,a)|0}function D7(a,b,d){a=a|0;b=b|0;d=d|0;c8[c[(c[d>>2]|0)+48>>2]&511](a,d,b);return}function D8(a,b){a=a|0;b=b|0;return c3[c[(c[b>>2]|0)+48>>2]&2047](b,a)|0}function D9(b,d,e,f){b=b|0;d=d|0;e=e|0;f=f|0;var g=0,h=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,A=0,B=0,C=0,D=0;g=i;i=i+8|0;h=f;f=i;i=i+12|0;i=i+7&-8;c[f>>2]=c[h>>2];c[f+4>>2]=c[h+4>>2];c[f+8>>2]=c[h+8>>2];h=g|0;c[b>>2]=d;d=b+4|0;j=d|0;k=b+8|0;l=b+12|0;m=b+28|0;n=e;TI(d|0,0,24)|0;L1:do{if((a[n]&1)==0){o=m;c[o>>2]=c[n>>2];c[o+4>>2]=c[n+4>>2];c[o+8>>2]=c[n+8>>2];p=0;q=0;r=11}else{o=c[e+8>>2]|0;s=c[e+4>>2]|0;do{if(s>>>0>4294967279>>>0){z=0;ar(106,0);if(z){z=0;break}}else{if(s>>>0<11>>>0){a[m]=s<<1;t=m+1|0}else{u=s+16&-16;v=(z=0,av(316,u|0)|0);if(z){z=0;break}c[b+36>>2]=v;c[m>>2]=u|1;c[b+32>>2]=s;t=v}TF(t|0,o|0,s)|0;a[t+s|0]=0;p=c[k>>2]|0;q=c[l>>2]|0;r=11;break L1}}while(0);s=b$(-1,-1)|0;w=M;x=s}}while(0);do{if((r|0)==11){c[b+40>>2]=1;l=b+44|0;t=f;c[l>>2]=c[t>>2];c[l+4>>2]=c[t+4>>2];c[l+8>>2]=c[t+8>>2];c[b+56>>2]=0;c[b+60>>2]=0;a[b+64|0]=0;c[h>>2]=0;if(p>>>0<q>>>0){if((p|0)==0){y=0}else{c[p>>2]=0;y=c[k>>2]|0}c[k>>2]=y+4;i=g;return}else{z=0;at(76,d|0,h|0);if(!z){i=g;return}else{z=0}t=b$(-1,-1)|0;l=t;t=M;if((a[m]&1)==0){w=t;x=l;break}Tw(c[b+36>>2]|0);w=t;x=l;break}}}while(0);b=c[j>>2]|0;if((b|0)==0){A=x;B=0;C=A;D=w;bj(C|0)}j=c[k>>2]|0;if((b|0)!=(j|0)){c[k>>2]=j+(~((j-4+(-b|0)|0)>>>2)<<2)}Tw(b);A=x;B=0;C=A;D=w;bj(C|0)}function Ea(b){b=b|0;var c=0,d=0;if((a8(a[b]|0)|0)==0){c=0;return c|0}d=b+1|0;while(1){b=(a8(a[d]|0)|0)==0;if(b){c=d;break}else{d=b?0:d+1|0}}return c|0}function Eb(b){b=b|0;var c=0,d=0;if(((a[b]|0)-48|0)>>>0>9>>>0){c=0;return c|0}else{d=b}while(1){b=d+1|0;if(((a[b]|0)-48|0)>>>0>9>>>0){c=b;break}else{d=b}}return c|0}function Ec(b){b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0;c=a[45552]|0;L1:do{if(c<<24>>24==0){d=b;e=0}else{f=b;g=45552;h=c;while(1){if((a[f]|0)!=h<<24>>24){d=f;e=h;break L1}i=f+1|0;j=g+1|0;k=a[j]|0;if(k<<24>>24==0){d=i;e=0;break}else{f=i;g=j;h=k}}}}while(0);c=e<<24>>24!=0?0:d;if((c|0)==0){l=0;return l|0}else{m=c}while(1){c=a[m]|0;if((c<<24>>24|0)==10|(c<<24>>24|0)==0){l=m;break}m=m+1|0}return l|0}function Ed(b){b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0;c=a[45552]|0;L1:do{if(c<<24>>24==0){d=b;e=0}else{f=b;g=45552;h=c;while(1){if((a[f]|0)!=h<<24>>24){d=f;e=h;break L1}i=f+1|0;j=g+1|0;k=a[j]|0;if(k<<24>>24==0){d=i;e=0;break}else{f=i;g=j;h=k}}}}while(0);return(e<<24>>24!=0?0:d)|0}function Ee(b){b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;if((a8(a[b]|0)|0)==0){c=0}else{d=b+1|0;while(1){e=(a8(a[d]|0)|0)==0;if(e){c=d;break}else{d=e?0:d+1|0}}}d=(c|0)!=0?c:b;if((d|0)==0){f=0;return f|0}b=a[45648]|0;L9:do{if(b<<24>>24==0){g=d;h=0}else{c=d;e=45648;i=b;while(1){if((a[c]|0)!=i<<24>>24){g=c;h=i;break L9}j=c+1|0;k=e+1|0;l=a[k]|0;if(l<<24>>24==0){g=j;h=0;break}else{c=j;e=k;i=l}}}}while(0);b=h<<24>>24!=0?0:g;if((b|0)==0){f=0;return f|0}g=a[b]|0;if(g<<24>>24==0){f=0;return f|0}h=a[45632]|0;if(h<<24>>24==0){d=b;while(1){i=d+1|0;if((d|0)!=0){f=d;m=20;break}if((a[i]|0)==0){f=0;m=25;break}else{d=i}}if((m|0)==25){return f|0}else if((m|0)==20){return f|0}}else{n=b;o=g}while(1){L29:do{if(o<<24>>24==h<<24>>24){g=45632;b=n;while(1){d=b+1|0;i=g+1|0;e=a[i]|0;if(e<<24>>24==0){p=d;q=0;break L29}if((a[d]|0)==e<<24>>24){g=i;b=d}else{p=d;q=e;break}}}else{p=n;q=h}}while(0);b=q<<24>>24!=0?0:p;g=n+1|0;if((b|0)!=0){f=b;m=19;break}b=a[g]|0;if(b<<24>>24==0){f=0;m=24;break}else{n=g;o=b}}if((m|0)==24){return f|0}else if((m|0)==19){return f|0}return 0}function Ef(b){b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0;c=a[45648]|0;L1:do{if(c<<24>>24==0){d=b;e=0}else{f=b;g=45648;h=c;while(1){if((a[f]|0)!=h<<24>>24){d=f;e=h;break L1}i=f+1|0;j=g+1|0;k=a[j]|0;if(k<<24>>24==0){d=i;e=0;break}else{f=i;g=j;h=k}}}}while(0);return(e<<24>>24!=0?0:d)|0}function Eg(b){b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0;c=a[b]|0;d=b+1|0;if((c<<24>>24|0)==39){b=a[d]|0;if(b<<24>>24==0){e=0;return e|0}else{f=d;g=b}while(1){b=f+1|0;h=g<<24>>24==92?b:0;if((h|0)==0){i=11}else{j=(a[h]|0)!=0?h+1|0:h;if((j|0)==0){i=11}else{k=j}}if((i|0)==11){i=0;if(g<<24>>24==39){e=b;i=17;break}else{k=b}}b=a[k]|0;if(b<<24>>24==0){e=0;i=16;break}else{f=k;g=b}}if((i|0)==16){return e|0}else if((i|0)==17){return e|0}}else if((c<<24>>24|0)==34){c=a[d]|0;if(c<<24>>24==0){e=0;return e|0}else{l=d;m=c}while(1){c=l+1|0;d=m<<24>>24==92?c:0;if((d|0)==0){i=6}else{g=(a[d]|0)!=0?d+1|0:d;if((g|0)==0){i=6}else{n=g}}if((i|0)==6){i=0;if(m<<24>>24==34){e=c;i=19;break}else{n=c}}c=a[n]|0;if(c<<24>>24==0){e=0;i=13;break}else{l=n;m=c}}if((i|0)==13){return e|0}else if((i|0)==19){return e|0}}else{e=0;return e|0}return 0}function Eh(b){b=b|0;var c=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,l=0,m=0,n=0,o=0,p=0,q=0;c=a[45576]|0;L1:do{if(c<<24>>24==0){d=b;e=0}else{f=b;g=45576;h=c;while(1){if((a[f]|0)!=h<<24>>24){d=f;e=h;break L1}i=f+1|0;j=g+1|0;k=a[j]|0;if(k<<24>>24==0){d=i;e=0;break}else{f=i;g=j;h=k}}}}while(0);c=e<<24>>24!=0?0:d;if((c|0)==0){l=0;return l|0}d=a[c]|0;if(d<<24>>24==0){l=0;return l|0}e=a[45224]|0;if(e<<24>>24==0){b=c;while(1){h=b+1|0;if((b|0)!=0){l=b;m=19;break}if((a[h]|0)==0){l=0;m=18;break}else{b=h}}if((m|0)==18){return l|0}else if((m|0)==19){return l|0}}else{n=c;o=d}while(1){L21:do{if(o<<24>>24==e<<24>>24){d=45224;c=n;while(1){b=c+1|0;h=d+1|0;g=a[h]|0;if(g<<24>>24==0){p=b;q=0;break L21}if((a[b]|0)==g<<24>>24){d=h;c=b}else{p=b;q=g;break}}}else{p=n;q=e}}while(0);c=q<<24>>24!=0?0:p;d=n+1|0;if((c|0)!=0){l=c;m=15;break}c=a[d]|0;if(c<<24>>24==0){l=0;m=17;break}else{n=d;o=c}}if((m|0)==17){return l|0}else if((m|0)==15){return l|0}return 0}function Ei(b){b=b|0;var c=0,d=0,e=0;if((a8(a[b]|0)|0)==0){c=0}else{d=b+1|0;while(1){e=(a8(a[d]|0)|0)==0;if(e){c=d;break}else{d=e?0:d+1|0}}}return((c|0)!=0?c:b)|0}
// EMSCRIPTEN_END_FUNCS
var cF=[UV,UV,t4,UV,up,UV,uM,UV,tZ,UV,u_,UV,t2,UV,uN,UV,ui,UV,t_,UV,uw,UV,ur,UV,uS,UV,uv,UV,tU,UV,tW,UV,uZ,UV,uJ,UV,tX,UV,t3,UV,tY,UV,uK,UV,uq,UV,uV,UV,tN,UV,ul,UV,uy,UV,uT,UV,uC,UV,ue,UV,uX,UV,uO,UV,uI,UV,uR,UV,uo,UV,uj,UV,t5,UV,uW,UV,uY,UV,Oa,UV,uA,UV,tT,UV,uz,UV,t7,UV,t0,UV,uH,UV,ug,UV,uE,UV,uu,UV,ud,UV,uB,UV,u$,UV,uF,UV,t8,UV,uG,UV,u0,UV,t1,UV,tS,UV,tI,UV,tR,UV,NN,UV,uQ,UV,uP,UV,um,UV,t$,UV,uf,UV,un,UV,ub,UV,ua,UV,tO,UV,uc,UV,t6,UV,u1,UV,uD,UV,uk,UV,us,UV,tP,UV,t9,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV,UV];var cG=[UW,UW,tK,UW];var cH=[UX,UX,yC,UX,qK,UX,Tk,UX,q3,UX,l4,UX,mF,UX,DG,UX,jr,UX,yD,UX,Dk,UX,fw,UX,jE,UX,Dw,UX,r8,UX,Tj,UX,Bt,UX,hP,UX,mR,UX,qz,UX,L9,UX,Ti,UX,Cp,UX,r1,UX,m2,UX,st,UX,An,UX,UX,UX,UX,UX,UX,UX,UX,UX,UX,UX];var cI=[UY,UY,QO,UY,fh,UY,tD,UY,NF,UY,LB,UY,np,UY,Qx,UY,Li,UY,lF,UY,RJ,UY,mi,UY,jK,UY,CK,UY,NA,UY,h9,UY,lC,UY,OC,UY,pq,UY,lt,UY,Q4,UY,OQ,UY,l0,UY,PV,UY,xK,UY,C1,UY,mh,UY,fS,UY,FY,UY,mT,UY,S4,UY,R5,UY,Qk,UY,LG,UY,NG,UY,rc,UY,LK,UY,R4,UY,jj,UY,B5,UY,OB,UY,HG,UY,oT,UY,Cf,UY,tf,UY,hS,UY,Ps,UY,qX,UY,CB,UY,mr,UY,tM,UY,SJ,UY,SK,UY,L4,UY,MO,UY,pY,UY,li,UY,fG,UY,BE,UY,S1,UY,pf,UY,KY,UY,Nq,UY,IK,UY,ez,UY,BX,UY,xF,UY,jt,UY,Qq,UY,eL,UY,QE,UY,Rj,UY,h8,UY,Pg,UY,CL,UY,qf,UY,l6,UY,ep,UY,pB,UY,LW,UY,Dn,UY,pP,UY,Na,UY,lT,UY,Da,UY,O2,UY,S7,UY,rb,UY,Rk,UY,KH,UY,hR,UY,LJ,UY,Nw,UY,LG,UY,mG,UY,eA,UY,BO,UY,nD,UY,M1,UY,jR,UY,HY,UY,wa,UY,fg,UY,Ta,UY,sv,UY,hC,UY,Nu,UY,lD,UY,R8,UY,Lx,UY,QD,UY,M9,UY,gL,UY,Bl,UY,LB,UY,R6,UY,DT,UY,Lx,UY,B4,UY,hi,UY,f5,UY,wA,UY,PW,UY,Pf,UY,PK,UY,Mz,UY,qY,UY,S8,UY,eX,UY,Rt,UY,Nv,UY,Qf,UY,wq,UY,ms,UY,lQ,UY,L0,UY,qL,UY,QX,UY,pO,UY,pG,UY,S0,UY,Pt,UY,L5,UY,mC,UY,Nz,UY,eK,UY,BY,UY,Qp,UY,wH,UY,KI,UY,Nf,UY,L_,UY,gE,UY,M$,UY,mH,UY,Lc,UY,BP,UY,g5,UY,gO,UY,Mw,UY,Ne,UY,Q_,UY,nE,UY,C0,UY,P5,UY,DI,UY,SI,UY,CT,UY,KZ,UY,S3,UY,KG,UY,Qy,UY,Ma,UY,LF,UY,CC,UY,LI,UY,HK,UY,wz,UY,N7,UY,KL,UY,f4,UY,BF,UY,hh,UY,gQ,UY,No,UY,C9,UY,QK,UY,Bc,UY,QU,UY,ok,UY,qM,UY,pF,UY,e7,UY,Q6,UY,jQ,UY,S6,UY,Ny,UY,K4,UY,s3,UY,Pv,UY,tr,UY,i7,UY,ef,UY,Dx,UY,Bk,UY,Ng,UY,Ty,UY,xE,UY,i8,UY,vc,UY,Bu,UY,ts,UY,go,UY,P4,UY,DS,UY,D0,UY,qA,UY,S5,UY,eW,UY,d6,UY,pp,UY,Lb,UY,hk,UY,qp,UY,to,UY,FX,UY,Q0,UY,gk,UY,Pz,UY,OP,UY,CU,UY,NB,UY,K_,UY,KN,UY,eZ,UY,lP,UY,G6,UY,Mn,UY,N8,UY,hg,UY,S1,UY,S9,UY,vb,UY,wB,UY,fU,UY,KJ,UY,Nn,UY,Bb,UY,QJ,UY,Cq,UY,QT,UY,Lj,UY,nF,UY,no,UY,oj,UY,MN,UY,Nd,UY,IL,UY,QP,UY,Pw,UY,l$,UY,DJ,UY,SN,UY,NK,UY,p6,UY,MA,UY,Q5,UY,HZ,UY,K5,UY,LA,UY,LG,UY,LS,UY,eg,UY,ls,UY,Tz,UY,LB,UY,Q3,UY,S$,UY,qq,UY,kz,UY,Np,UY,qB,UY,fR,UY,fV,UY,mS,UY,m5,UY,mD,UY,QY,UY,qg,UY,tu,UY,D1,UY,hl,UY,ji,UY,gj,UY,oU,UY,PA,UY,Tp,UY,PL,UY,lG,UY,Ce,UY,hB,UY,SG,UY,eY,UY,RU,UY,jJ,UY,G5,UY,M0,UY,hj,UY,Nx,UY,pZ,UY,Dy,UY,Cr,UY,M2,UY,nG,UY,M4,UY,Bv,UY,SM,UY,wC,UY,gp,UY,Lq,UY,l5,UY,wG,UY,Qi,UY,SL,UY,tq,UY,Nb,UY,e6,UY,RB,UY,R7,UY,NL,UY,eq,UY,pA,UY,p7,UY,m4,UY,d7,UY,L1,UY,fT,UY,g4,UY,jG,UY,lj,UY,Do,UY,lS,UY,k7,UY,pg,UY,tp,UY,T_,UY,fW,UY,LZ,UY,gD,UY,O1,UY,wp,UY,GR,UY,js,UY,fQ,UY,R3,UY,Qg,UY,M8,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY,UY];var cJ=[UZ,UZ,nU,UZ];var cK=[U_,U_,xH,U_,Sh,U_,hD,U_,K$,U_,sH,U_,pQ,U_,fL,U_,xT,U_,vN,U_,FW,U_,K6,U_,xP,U_,nC,U_,nk,U_,vE,U_,e8,U_,rq,U_,w7,U_,x7,U_,lu,U_,wO,U_,q6,U_,vf,U_,xB,U_,qN,U_,vd,U_,GN,U_,GI,U_,vC,U_,GB,U_,gq,U_,ya,U_,eB,U_,ye,U_,dQ,U_,xO,U_,KP,U_,Ba,U_,r5,U_,P0,U_,vL,U_,FP,U_,D2,U_,xI,U_,wj,U_,vl,U_,xR,U_,x5,U_,Q$,U_,k8,U_,F_,U_,u6,U_,HH,U_,w1,U_,yy,U_,mE,U_,Ld,U_,GH,U_,yx,U_,GG,U_,LD,U_,rD,U_,xp,U_,vk,U_,dV,U_,GE,U_,x9,U_,nP,U_,v_,U_,rH,U_,w8,U_,xX,U_,wZ,U_,ys,U_,xc,U_,xV,U_,gZ,U_,Lz,U_,PR,U_,Dz,U_,va,U_,xd,U_,ru,U_,mt,U_,lO,U_,f6,U_,BQ,U_,rN,U_,MB,U_,vX,U_,Gi,U_,Go,U_,xa,U_,DU,U_,yc,U_,xS,U_,QS,U_,Cs,U_,rV,U_,rR,U_,vu,U_,v3,U_,ft,U_,w0,U_,Gg,U_,Gd,U_,er,U_,rp,U_,xk,U_,s8,U_,PE,U_,vP,U_,SH,U_,rv,U_,eU,U_,rI,U_,Bm,U_,xM,U_,yo,U_,eh,U_,xN,U_,My,U_,x_,U_,nn,U_,xb,U_,vI,U_,r_,U_,P9,U_,p_,U_,f0,U_,vg,U_,rm,U_,vq,U_,sI,U_,l7,U_,rQ,U_,rE,U_,GJ,U_,rK,U_,xG,U_,vA,U_,rS,U_,CD,U_,fB,U_,qC,U_,Gk,U_,GM,U_,rn,U_,xx,U_,Gz,U_,QV,U_,rM,U_,Se,U_,wK,U_,xt,U_,nx,U_,rk,U_,Mr,U_,Sd,U_,vF,U_,vG,U_,Gn,U_,QN,U_,F7,U_,gN,U_,P_,U_,Lk,U_,xq,U_,F3,U_,Gy,U_,IJ,U_,PF,U_,th,U_,s$,U_,i9,U_,wF,U_,wQ,U_,Qb,U_,xj,U_,v0,U_,x1,U_,gX,U_,yz,U_,GV,U_,Gw,U_,rr,U_,pz,U_,v$,U_,vs,U_,rO,U_,sl,U_,vz,U_,pa,U_,HL,U_,w5,U_,o3,U_,xy,U_,fz,U_,gC,U_,wy,U_,LE,U_,Gm,U_,xZ,U_,kk,U_,rY,U_,wW,U_,jk,U_,xl,U_,F9,U_,vU,U_,GK,U_,Sf,U_,F4,U_,PT,U_,h_,U_,yq,U_,yh,U_,vp,U_,Mx,U_,yv,U_,py,U_,xi,U_,re,U_,G_,U_,vm,U_,o7,U_,xL,U_,FT,U_,v5,U_,Mv,U_,rZ,U_,PZ,U_,w4,U_,FZ,U_,fs,U_,o8,U_,q7,U_,lU,U_,PJ,U_,Gp,U_,sm,U_,rC,U_,o6,U_,sP,U_,qZ,U_,rX,U_,wN,U_,w2,U_,fr,U_,w9,U_,P$,U_,g8,U_,vh,U_,dW,U_,Cg,U_,yp,U_,vQ,U_,rA,U_,xe,U_,hq,U_,eV,U_,xo,U_,Gv,U_,wS,U_,CV,U_,BZ,U_,L$,U_,Qa,U_,x$,U_,Gj,U_,w$,U_,x2,U_,rg,U_,Lw,U_,wR,U_,F$,U_,Gc,U_,lB,U_,vS,U_,rs,U_,P3,U_,pH,U_,ph,U_,nB,U_,xn,U_,dZ,U_,eM,U_,yg,U_,qV,U_,GD,U_,wX,U_,ju,U_,rf,U_,wv,U_,Bd,U_,rG,U_,x0,U_,yw,U_,xs,U_,xU,U_,F8,U_,Dp,U_,vM,U_,Gh,U_,Ge,U_,PD,U_,yj,U_,mU,U_,q5,U_,m6,U_,F5,U_,hz,U_,xg,U_,xJ,U_,oV,U_,rh,U_,F2,U_,vB,U_,Sg,U_,wJ,U_,vi,U_,tg,U_,gM,U_,Ga,U_,wI,U_,yk,U_,x4,U_,Gb,U_,ge,U_,r9,U_,v6,U_,wY,U_,PO,U_,dP,U_,wV,U_,P2,U_,xv,U_,ym,U_,xf,U_,x3,U_,s1,U_,Mq,U_,rj,U_,gK,U_,ky,U_,A9,U_,Bw,U_,m$,U_,g$,U_,q9,U_,vW,U_,ri,U_,hT,U_,rt,U_,m3,U_,gB,U_,me,U_,yf,U_,e_,U_,vn,U_,fP,U_,vK,U_,rW,U_,qW,U_,v7,U_,sQ,U_,HJ,U_,gx,U_,pc,U_,Mg,U_,MP,U_,Gs,U_,GA,U_,x6,U_,r$,U_,xm,U_,lk,U_,vo,U_,ry,U_,PQ,U_,ra,U_,mI,U_,rx,U_,vw,U_,mj,U_,l1,U_,Mf,U_,mB,U_,qh,U_,v1,U_,wL,U_,xw,U_,wU,U_,GF,U_,w_,U_,xu,U_,vj,U_,lf,U_,vx,U_,pE,U_,vV,U_,fq,U_,Gx,U_,wP,U_,FV,U_,yi,U_,rw,U_,wn,U_,fl,U_,GC,U_,PU,U_,vR,U_,FR,U_,x8,U_,i6,U_,PG,U_,ne,U_,Gr,U_,Qd,U_,Gu,U_,F0,U_,w6,U_,B6,U_,rJ,U_,FQ,U_,yA,U_,yl,U_,KQ,U_,gF,U_,v9,U_,d8,U_,vZ,U_,wT,U_,Gl,U_,rB,U_,rz,U_,w3,U_,lH,U_,GU,U_,C2,U_,xW,U_,DK,U_,PP,U_,mA,U_,vt,U_,BG,U_,Qe,U_,nH,U_,vH,U_,rF,U_,nq,U_,u7,U_,p8,U_,pr,U_,xA,U_,P8,U_,q8,U_,Gf,U_,tv,U_,Gt,U_,kA,U_,k4,U_,yr,U_,vD,U_,v2,U_,xh,U_,Si,U_,wM,U_,yb,U_,pb,U_,vT,U_,xr,U_,xY,U_,yu,U_,Db,U_,yt,U_,F1,U_,CM,U_,ta,U_,r6,U_,vy,U_,KR,U_,v4,U_,M6,U_,yn,U_,PI,U_,td,U_,rd,U_,pC,U_,vr,U_,vJ,U_,rl,U_,xz,U_,rL,U_,vO,U_,Gq,U_,xQ,U_,ro,U_,GL,U_,yd,U_,rP,U_,jh,U_,F6,U_,vY,U_,rU,U_,qr,U_,kx,U_,rT,U_,U_,U_,U_,U_,U_,U_];var cL=[U$,U$,tQ,U$,tL,U$,ut,U$,uh,U$,ia,U$,ux,U$,U$,U$];var cM=[U0,U0,Sw,U0,Sm,U0,zG,U0,Su,U0,Le,U0,T$,U0,PM,U0,Hp,U0,m1,U0,zJ,U0,O3,U0,Lm,U0,zg,U0,d5,U0,MW,U0,nf,U0,nA,U0,Sc,U0,dS,U0,T0,U0,zo,U0,dU,U0,gA,U0,zL,U0,Sa,U0,zI,U0,Kx,U0,K0,U0,dJ,U0,zn,U0,dR,U0,P6,U0,Sj,U0,zO,U0,M3,U0,Ns,U0,G8,U0,Ej,U0,z2,U0,MT,U0,Sb,U0,PS,U0,Sv,U0,hK,U0,MU,U0,wf,U0,dH,U0,T1,U0,Hx,U0,dO,U0,Ph,U0,tH,U0,Ss,U0,Tv,U0,mg,U0,z$,U0,gf,U0,z3,U0,ey,U0,KM,U0,So,U0,qU,U0,S2,U0,LH,U0,Qc,U0,Sr,U0,E5,U0,PN,U0,RQ,U0,G3,U0,nh,U0,nd,U0,gg,U0,T2,U0,d4,U0,SW,U0,y9,U0,PH,U0,mQ,U0,lh,U0,Eb,U0,K8,U0,CA,U0,gm,U0,RP,U0,LQ,U0,AN,U0,nO,U0,HC,U0,y8,U0,jg,U0,g2,U0,PY,U0,P7,U0,Ho,U0,E6,U0,zc,U0,R2,U0,Hy,U0,G7,U0,AP,U0,Ad,U0,Hj,U0,EW,U0,MJ,U0,R$,U0,ff,U0,z0,U0,zK,U0,dT,U0,zh,U0,Nc,U0,zZ,U0,zb,U0,R9,U0,MF,U0,LT,U0,Rx,U0,zX,U0,gd,U0,EZ,U0,y2,U0,K7,U0,Ea,U0,g6,U0,zH,U0,G2,U0,nR,U0,RG,U0,AL,U0,MG,U0,z4,U0,tA,U0,qJ,U0,y_,U0,Ll,U0,Ek,U0,PB,U0,Sl,U0,PC,U0,PX,U0,RI,U0,LC,U0,Sk,U0,St,U0,Co,U0,zi,U0,KA,U0,MI,U0,Ry,U0,KK,U0,KW,U0,qy,U0,gy,U0,eT,U0,MX,U0,za,U0,Tu,U0,zr,U0,jC,U0,R_,U0,Sq,U0,Hi,U0,TM,U0,Sp,U0,tz,U0,eo,U0,hL,U0,At,U0,nT,U0,zq,U0,Ag,U0,gi,U0,T3,U0,T4,U0,nQ,U0,zj,U0,zd,U0,h0,U0,yE,U0,Hf,U0,ze,U0,AM,U0,EX,U0,tn,U0,eI,U0,RA,U0,e5,U0,TA,U0,eJ,U0,P1,U0,Sn,U0,ny,U0,RF,U0,KO,U0,Ac,U0,fZ,U0,T5,U0,Ef,U0,Hh,U0,RT,U0,qo,U0,Ed,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0,U0];var cN=[U1,U1,tV,U1];var cO=[U2,U2,wg,U2];var cP=[U3,U3,Qs,U3,Qj,U3,U3,U3];var cQ=[U4,U4,hQ,U4];var cR=[U5,U5,SO,U5,Tc,U5,Q7,U5,ws,U5,dX,U5,K1,U5,LO,U5,QL,U5,NE,U5,Kz,U5,Rr,U5,j8,U5,Rh,U5,MQ,U5,T6,U5,j9,U5,Rc,U5,dB,U5,dC,U5,jS,U5,Re,U5,dA,U5,Rm,U5,dy,U5,SS,U5,NJ,U5,ML,U5,dD,U5,QQ,U5,Tg,U5,Ro,U5,T7,U5,Qu,U5,ST,U5,M5,U5,Qm,U5,Me,U5,LN,U5,MH,U5,Mh,U5,tw,U5,Tb,U5,MV,U5,MC,U5,Lf,U5,MZ,U5,U5,U5,U5,U5,U5,U5,U5,U5,U5,U5,U5,U5,U5,U5,U5,U5,U5,U5,U5,U5,U5,U5,U5,U5,U5,U5,U5,U5,U5,U5,U5,U5,U5,U5];var cS=[U6,U6,QB,U6,QH,U6,U6,U6];var cT=[U7,U7,ON,U7,OK,U7,O_,U7,OY,U7,U7,U7,U7,U7,U7,U7];var cU=[U8,U8,Px,U8,hA,U8,lE,U8,Pu,U8,Qt,U8,Qh,U8,Ql,U8,BN,U8,Qr,U8,U8,U8,U8,U8,U8,U8,U8,U8,U8,U8,U8,U8];var cV=[U9,U9,zW,U9,Tm,U9,sa,U9,p5,U9,MR,U9,BD,U9,Ab,U9,Tn,U9,fv,U9,MD,U9,fD,U9,DR,U9,fX,U9,Di,U9,Tl,U9,tx,U9,gn,U9,AY,U9,pd,U9,OW,U9,OD,U9,OI,U9,OE,U9,nV,U9,OS,U9,OR,U9,O$,U9,QM,U9,su,U9,OO,U9,QR,U9];var cW=[Va,Va,T8,Va,jL,Va,jN,Va,jM,Va,jO,Va,Va,Va,Va,Va];var cX=[Vb,Vb,Sz,Vb];var cY=[Vc,Vc,Hg,Vc,Hk,Vc,Hn,Vc,Hl,Vc,Hm,Vc,Vc,Vc,Vc,Vc];var cZ=[Vd,Vd,Ug,Vd,TB,Vd,Uh,Vd,Ui,Vd,Uj,Vd,Uk,Vd,Vd,Vd];var c_=[Ve,Ve,Nk,Ve];var c$=[Vf,Vf,O8,Vf,pD,Vf,NM,Vf,sz,Vf,f3,Vf,Pl,Vf,l3,Vf,Or,Vf,Ol,Vf,Od,Vf,QC,Vf,Of,Vf,Oj,Vf,Ob,Vf,N9,Vf,Op,Vf,On,Vf,Pm,Vf,NY,Vf,NQ,Vf,NS,Vf,NW,Vf,NO,Vf,N2,Vf,N0,Vf,Pk,Vf,QI,Vf,Mj,Vf,OT,Vf,f2,Vf,O6,Vf,OU,Vf,N_,Vf,fN,Vf,h7,Vf,NU,Vf,q0,Vf,Pi,Vf,O4,Vf,O7,Vf,Ot,Vf,OZ,Vf,OV,Vf,OJ,Vf,OH,Vf,N4,Vf,OG,Vf,OX,Vf,OM,Vf,lr,Vf,DH,Vf,Oh,Vf,Pj,Vf,O5,Vf,Vf,Vf,Vf,Vf,Vf,Vf,Vf,Vf,Vf,Vf,Vf,Vf,Vf,Vf,Vf,Vf,Vf,Vf];var c0=[Vg,Vg,Qz,Vg,QF,Vg,Vg,Vg];var c1=[Vh,Vh,O9,Vh,Pn,Vh,Vh,Vh];var c2=[Vi,Vi,QG,Vi,Qn,Vi,u8,Vi,Qv,Vi,QA,Vi,Vi,Vi,Vi,Vi];var c3=[Vj,Vj,DO,Vj,Ii,Vj,Cj,Vj,ln,Vj,eP,Vj,d$,Vj,p4,Vj,lV,Vj,De,Vj,n9,Vj,nY,Vj,te,Vj,el,Vj,Cn,Vj,j3,Vj,kU,Vj,gl,Vj,oR,Vj,iI,Vj,im,Vj,f8,Vj,hJ,Vj,ns,Vj,mM,Vj,p2,Vj,DV,Vj,H4,Vj,qE,Vj,jo,Vj,eN,Vj,mK,Vj,jf,Vj,B$,Vj,lJ,Vj,Cm,Vj,kN,Vj,gr,Vj,HT,Vj,mW,Vj,jA,Vj,kJ,Vj,qt,Vj,qD,Vj,D4,Vj,oM,Vj,T9,Vj,qG,Vj,i0,Vj,Io,Vj,k9,Vj,e1,Vj,jl,Vj,m0,Vj,j2,Vj,dv,Vj,iQ,Vj,ko,Vj,j0,Vj,oE,Vj,hb,Vj,kX,Vj,qx,Vj,n_,Vj,kn,Vj,oZ,Vj,D8,Vj,lg,Vj,ks,Vj,Ca,Vj,ij,Vj,l2,Vj,H3,Vj,mY,Vj,iO,Vj,iM,Vj,fE,Vj,ov,Vj,oC,Vj,pn,Vj,GQ,Vj,nZ,Vj,oG,Vj,hU,Vj,kZ,Vj,l9,Vj,Bh,Vj,mO,Vj,jT,Vj,Bz,Vj,qa,Vj,os,Vj,H2,Vj,om,Vj,hF,Vj,DY,Vj,i4,Vj,DC,Vj,Hu,Vj,B_,Vj,en,Vj,iz,Vj,ej,Vj,op,Vj,od,Vj,DD,Vj,Bq,Vj,MM,Vj,Bf,Vj,If,Vj,DL,Vj,Ua,Vj,jv,Vj,Ch,Vj,Bj,Vj,BU,Vj,Q1,Vj,nW,Vj,oh,Vj,fI,Vj,oW,Vj,iy,Vj,iP,Vj,Dd,Vj,d1,Vj,DQ,Vj,p9,Vj,mJ,Vj,n4,Vj,CS,Vj,C6,Vj,qI,Vj,jU,Vj,Dh,Vj,Q2,Vj,qu,Vj,nN,Vj,pI,Vj,In,Vj,ic,Vj,Ix,Vj,HX,Vj,ql,Vj,eH,Vj,kS,Vj,kO,Vj,iV,Vj,oi,Vj,CO,Vj,ex,Vj,Ie,Vj,Mo,Vj,oP,Vj,ee,Vj,Ib,Vj,pT,Vj,e9,Vj,II,Vj,B7,Vj,lK,Vj,Dt,Vj,on,Vj,BT,Vj,sq,Vj,CY,Vj,CP,Vj,Nl,Vj,eQ,Vj,mp,Vj,j_,Vj,lY,Vj,kp,Vj,MY,Vj,BM,Vj,CG,Vj,qe,Vj,BJ,Vj,pL,Vj,kf,Vj,Ik,Vj,gR,Vj,i2,Vj,Lg,Vj,ow,Vj,oH,Vj,pv,Vj,iJ,Vj,qT,Vj,iH,Vj,HR,Vj,eO,Vj,jb,Vj,nS,Vj,hG,Vj,fc,Vj,f$,Vj,gc,Vj,kG,Vj,DA,Vj,ip,Vj,fb,Vj,H6,Vj,kq,Vj,jw,Vj,uU,Vj,ig,Vj,oB,Vj,Ic,Vj,nJ,Vj,oI,Vj,ox,Vj,CN,Vj,qc,Vj,Nj,Vj,Ni,Vj,es,Vj,i1,Vj,Ir,Vj,lA,Vj,kg,Vj,oL,Vj,dI,Vj,Bg,Vj,qk,Vj,H7,Vj,qP,Vj,kR,Vj,pN,Vj,tm,Vj,eb,Vj,HV,Vj,iT,Vj,qi,Vj,ir,Vj,HW,Vj,jy,Vj,Cw,Vj,Bs,Vj,ku,Vj,Mb,Vj,DB,Vj,qj,Vj,nc,Vj,BK,Vj,ek,Vj,qQ,Vj,H1,Vj,pS,Vj,oz,Vj,j$,Vj,ou,Vj,oa,Vj,Dr,Vj,id,Vj,ie,Vj,k_,Vj,hW,Vj,KD,Vj,ol,Vj,eF,Vj,Df,Vj,jX,Vj,le,Vj,Cz,Vj,o0,Vj,iR,Vj,D_,Vj,oc,Vj,B8,Vj,Is,Vj,BS,Vj,ih,Vj,nr,Vj,nt,Vj,i5,Vj,mb,Vj,l_,Vj,IE,Vj,C3,Vj,lW,Vj,n1,Vj,f_,Vj,Cy,Vj,BW,Vj,CQ,Vj,px,Vj,yI,Vj,pi,Vj,DN,Vj,By,Vj,iA,Vj,iY,Vj,B1,Vj,pU,Vj,H9,Vj,ob,Vj,ec,Vj,IH,Vj,gt,Vj,mv,Vj,kI,Vj,kL,Vj,eE,Vj,oX,Vj,mP,Vj,mn,Vj,HQ,Vj,ii,Vj,Bn,Vj,iL,Vj,B3,Vj,jW,Vj,IB,Vj,oN,Vj,pk,Vj,Cc,Vj,p1,Vj,ki,Vj,iw,Vj,Ln,Vj,e0,Vj,kl,Vj,kC,Vj,iW,Vj,hV,Vj,jm,Vj,BR,Vj,qv,Vj,m7,Vj,CZ,Vj,Iq,Vj,iN,Vj,d0,Vj,CF,Vj,iF,Vj,IG,Vj,ml,Vj,C5,Vj,kw,Vj,l8,Vj,wb,Vj,oJ,Vj,kF,Vj,Rp,Vj,jc,Vj,dz,Vj,lq,Vj,i$,Vj,It,Vj,ng,Vj,DF,Vj,hH,Vj,ot,Vj,gz,Vj,nu,Vj,iU,Vj,Ae,Vj,D6,Vj,jx,Vj,Rb,Vj,wu,Vj,e4,Vj,Cu,Vj,j5,Vj,nX,Vj,gU,Vj,ly,Vj,Ig,Vj,md,Vj,kW,Vj,iu,Vj,pR,Vj,CX,Vj,pu,Vj,mL,Vj,Iv,Vj,oy,Vj,qn,Vj,ei,Vj,KC,Vj,kH,Vj,pW,Vj,C4,Vj,hZ,Vj,dM,Vj,kK,Vj,d_,Vj,iG,Vj,jn,Vj,Be,Vj,Mc,Vj,of,Vj,CE,Vj,pl,Vj,CH,Vj,ev,Vj,n7,Vj,mw,Vj,kE,Vj,jV,Vj,HU,Vj,n6,Vj,Iw,Vj,Id,Vj,k$,Vj,oF,Vj,HD,Vj,pt,Vj,p0,Vj,mz,Vj,mu,Vj,BA,Vj,kB,Vj,iE,Vj,DX,Vj,M_,Vj,gs,Vj,Bp,Vj,nL,Vj,zm,Vj,ID,Vj,d9,Vj,eD,Vj,qb,Vj,n5,Vj,lm,Vj,p$,Vj,iZ,Vj,DW,Vj,oq,Vj,oQ,Vj,oo,Vj,ea,Vj,oY,Vj,dE,Vj,KB,Vj,Ct,Vj,Dq,Vj,lL,Vj,iv,Vj,qF,Vj,lx,Vj,eu,Vj,eS,Vj,HP,Vj,iD,Vj,lb,Vj,oA,Vj,qO,Vj,mX,Vj,og,Vj,hX,Vj,Ck,Vj,n2,Vj,kV,Vj,MK,Vj,K2,Vj,BH,Vj,gu,Vj,qs,Vj,nK,Vj,j6,Vj,or,Vj,DM,Vj,IF,Vj,n8,Vj,ps,Vj,iK,Vj,lN,Vj,lv,Vj,k0,Vj,IC,Vj,oD,Vj,Dv,Vj,lw,Vj,Ds,Vj,h$,Vj,Ij,Vj,Rl,Vj,Dc,Vj,nz,Vj,kj,Vj,m_,Vj,j1,Vj,Ip,Vj,ll,Vj,f9,Vj,Lv,Vj,oK,Vj,na,Vj,D3,Vj,et,Vj,hE,Vj,BI,Vj,H$,Vj,Rf,Vj,H8,Vj,fa,Vj,km,Vj,Im,Vj,fH,Vj,Ci,Vj,Cv,Vj,ib,Vj,HS,Vj,ga,Vj,jY,Vj,Iz,Vj,ma,Vj,K9,Vj,iB,Vj,gS,Vj,D5,Vj,eC,Vj,mf,Vj,H0,Vj,IA,Vj,BC,Vj,HO,Vj,e2,Vj,pK,Vj,m8,Vj,ix,Vj,i3,Vj,pj,Vj,it,Vj,qR,Vj,jd,Vj,oO,Vj,kT,Vj,d3,Vj,gw,Vj,Ia,Vj,is,Vj,la,Vj,mm,Vj,kY,Vj,B9,Vj,iS,Vj,m9,Vj,tB,Vj,iq,Vj,lo,Vj,kP,Vj,Rn,Vj,iC,Vj,n$,Vj,gh,Vj,nw,Vj,ik,Vj,ja,Vj,fe,Vj,il,Vj,mV,Vj,Bx,Vj,mk,Vj,dw,Vj,kQ,Vj,jq,Vj,C8,Vj,kM,Vj,i_,Vj,lX,Vj,f7,Vj,kv,Vj,H5,Vj,Iy,Vj,Rd,Vj,o$,Vj,nI,Vj,dL,Vj,lI,Vj,mx,Vj,C$,Vj,j4,Vj,kD,Vj,CW,Vj,Bo,Vj,lc,Vj,wx,Vj,n3,Vj,H_,Vj,CJ,Vj,n0,Vj,io,Vj,kr,Vj,tC,Vj,B0,Vj,Iu,Vj,Ih,Vj,fF,Vj,kt,Vj,pJ,Vj,e$,Vj,Il,Vj,iX,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj,Vj];var c4=[Vk,Vk,Sx,Vk,Sy,Vk,Vk,Vk];var c5=[Vl,Vl,Ky,Vl];var c6=[Vm,Vm,Ub,Vm,wi,Vm,QZ,Vm,Uc,Vm,Ud,Vm,wh,Vm,Vm,Vm];var c7=[Vn,Vn,Ri,Vn,SQ,Vn,Rs,Vn,Rz,Vn,RH,Vn,R0,Vn,RR,Vn,SU,Vn,RO,Vn,NH,Vn,NC,Vn,kh,Vn,RZ,Vn,Rw,Vn,RE,Vn];var c8=[Vo,Vo,IY,Vo,mo,Vo,eR,Vo,I7,Vo,q2,Vo,g7,Vo,Js,Vo,xD,Vo,sD,Vo,ti,Vo,Mu,Vo,IR,Vo,lM,Vo,JC,Vo,jZ,Vo,B2,Vo,eG,Vo,fC,Vo,wr,Vo,q4,Vo,fp,Vo,DE,Vo,Ji,Vo,mq,Vo,IO,Vo,CR,Vo,jI,Vo,IW,Vo,sL,Vo,lz,Vo,Ml,Vo,JB,Vo,fn,Vo,wo,Vo,GP,Vo,BB,Vo,IU,Vo,C_,Vo,Md,Vo,IQ,Vo,mN,Vo,IT,Vo,L7,Vo,Br,Vo,Qw,Vo,L3,Vo,IV,Vo,je,Vo,ed,Vo,I4,Vo,q_,Vo,IX,Vo,mc,Vo,Jv,Vo,g0,Vo,Jf,Vo,IM,Vo,Jh,Vo,BV,Vo,I0,Vo,I5,Vo,k5,Vo,Uf,Vo,Jj,Vo,sB,Vo,I3,Vo,I2,Vo,HI,Vo,mZ,Vo,pM,Vo,IS,Vo,tj,Vo,Cb,Vo,qH,Vo,nb,Vo,CI,Vo,Jx,Vo,sA,Vo,Ja,Vo,Hd,Vo,q$,Vo,Je,Vo,lp,Vo,ss,Vo,s9,Vo,oe,Vo,C7,Vo,IP,Vo,I9,Vo,sC,Vo,Jc,Vo,qS,Vo,qd,Vo,Jo,Vo,Jk,Vo,nM,Vo,LX,Vo,jp,Vo,my,Vo,IZ,Vo,QW,Vo,LU,Vo,qm,Vo,sE,Vo,qw,Vo,Hr,Vo,v8,Vo,Jy,Vo,Dg,Vo,JE,Vo,DP,Vo,Dj,Vo,Jg,Vo,pV,Vo,nv,Vo,I8,Vo,Jw,Vo,Jn,Vo,D7,Vo,lZ,Vo,sM,Vo,I6,Vo,GO,Vo,sJ,Vo,Jb,Vo,Jz,Vo,I_,Vo,pm,Vo,LM,Vo,y3,Vo,Jp,Vo,jz,Vo,dY,Vo,u5,Vo,e3,Vo,jF,Vo,Cl,Vo,gP,Vo,IN,Vo,JD,Vo,Jl,Vo,I$,Vo,Jr,Vo,hd,Vo,hY,Vo,LV,Vo,Cx,Vo,d2,Vo,he,Vo,fj,Vo,ew,Vo,wk,Vo,hM,Vo,hI,Vo,fd,Vo,nj,Vo,o_,Vo,zT,Vo,Jq,Vo,LY,Vo,Ju,Vo,gY,Vo,JA,Vo,Jt,Vo,DZ,Vo,Jm,Vo,Jd,Vo,Du,Vo,Bi,Vo,ww,Vo,g3,Vo,I1,Vo,gb,Vo,po,Vo,gv,Vo,dK,Vo,Nt,Vo,tk,Vo,ld,Vo,BL,Vo,yL,Vo,pw,Vo,LR,Vo,em,Vo,p3,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo,Vo];var c9=[Vp,Vp,HA,Vp];var da=[Vq,Vq,RV,Vq,Rv,Vq,RX,Vq,Ru,Vq,RC,Vq,RM,Vq,RK,Vq,RD,Vq,Vq,Vq,Vq,Vq,Vq,Vq,Vq,Vq,Vq,Vq,Vq,Vq,Vq,Vq];var db=[Vr,Vr,Mk,Vr,SC,Vr,SE,Vr,SD,Vr,Q9,Vr,kb,Vr,Ra,Vr,SP,Vr,fA,Vr,r0,Vr,SR,Vr,SA,Vr,N6,Vr,kc,Vr,Q8,Vr,M7,Vr,OL,Vr,SB,Vr,z1,Vr,Ue,Vr,Rg,Vr,SF,Vr,Rq,Vr,kd,Vr,Af,Vr,Vr,Vr,Vr,Vr,Vr,Vr,Vr,Vr,Vr,Vr,Vr,Vr];var dc=[Vs,Vs,Cd,Vs,pe,Vs,wE,Vs,lR,Vs,sy,Vs,gV,Vs,sr,Vs,NI,Vs,MS,Vs,o1,Vs,ND,Vs,j7,Vs,fY,Vs,He,Vs,tl,Vs,Te,Vs,Tf,Vs,q1,Vs,ME,Vs,r3,Vs,jB,Vs,Dm,Vs,gT,Vs,yJ,Vs,ty,Vs,fy,Vs,D$,Vs,D9,Vs,nm,Vs,jH,Vs,Td,Vs,Dl,Vs,jP,Vs,r7,Vs,zp,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs,Vs];return{__GLOBAL__I_a785:u9,_memcmp:TH,_strlen:TJ,_tolower:TM,_free:Tp,__GLOBAL__I_a1698:Lp,_realloc:Tr,_sass_compile_emscripten:jD,_memmove:TG,__GLOBAL__I_a:h6,_memset:TI,__GLOBAL__I_a1328:GY,_malloc:To,_memcpy:TF,_llvm_ctlz_i32:TL,__GLOBAL__I_a324:tE,_strcpy:TK,_calloc:Tq,runPostSets:du,stackAlloc:dd,stackSave:de,stackRestore:df,setThrew:dg,setTempRet0:dj,setTempRet1:dk,setTempRet2:dl,setTempRet3:dm,setTempRet4:dn,setTempRet5:dp,setTempRet6:dq,setTempRet7:dr,setTempRet8:ds,setTempRet9:dt,dynCall_iiiiiiii:Ul,dynCall_iiiiiiddi:Um,dynCall_viiiii:Un,dynCall_vi:Uo,dynCall_viiidii:Up,dynCall_vii:Uq,dynCall_iiiiiii:Ur,dynCall_ii:Us,dynCall_iddddiii:Ut,dynCall_id:Uu,dynCall_iiiiiiiiiiii:Uv,dynCall_viiiddddii:Uw,dynCall_iiii:Ux,dynCall_viiiiiiiiiiiiiii:Uy,dynCall_viiiiid:Uz,dynCall_viiiiiiii:UA,dynCall_viiiiii:UB,dynCall_ddd:UC,dynCall_fiii:UD,dynCall_di:UE,dynCall_v:UF,dynCall_iid:UG,dynCall_viiiiiii:UH,dynCall_viiiiiid:UI,dynCall_viiiiiiiii:UJ,dynCall_viiiiiiiiii:UK,dynCall_iii:UL,dynCall_diii:UM,dynCall_dii:UN,dynCall_i:UO,dynCall_iiiiii:UP,dynCall_viii:UQ,dynCall_idi:UR,dynCall_iiiiiiiii:US,dynCall_iiiii:UT,dynCall_viiii:UU}})
// EMSCRIPTEN_END_ASM
({ "Math": Math, "Int8Array": Int8Array, "Int16Array": Int16Array, "Int32Array": Int32Array, "Uint8Array": Uint8Array, "Uint16Array": Uint16Array, "Uint32Array": Uint32Array, "Float32Array": Float32Array, "Float64Array": Float64Array }, { "abort": abort, "assert": assert, "asmPrintInt": asmPrintInt, "asmPrintFloat": asmPrintFloat, "min": Math_min, "invoke_iiiiiiii": invoke_iiiiiiii, "invoke_iiiiiiddi": invoke_iiiiiiddi, "invoke_viiiii": invoke_viiiii, "invoke_vi": invoke_vi, "invoke_viiidii": invoke_viiidii, "invoke_vii": invoke_vii, "invoke_iiiiiii": invoke_iiiiiii, "invoke_ii": invoke_ii, "invoke_iddddiii": invoke_iddddiii, "invoke_id": invoke_id, "invoke_iiiiiiiiiiii": invoke_iiiiiiiiiiii, "invoke_viiiddddii": invoke_viiiddddii, "invoke_iiii": invoke_iiii, "invoke_viiiiiiiiiiiiiii": invoke_viiiiiiiiiiiiiii, "invoke_viiiiid": invoke_viiiiid, "invoke_viiiiiiii": invoke_viiiiiiii, "invoke_viiiiii": invoke_viiiiii, "invoke_ddd": invoke_ddd, "invoke_fiii": invoke_fiii, "invoke_di": invoke_di, "invoke_v": invoke_v, "invoke_iid": invoke_iid, "invoke_viiiiiii": invoke_viiiiiii, "invoke_viiiiiid": invoke_viiiiiid, "invoke_viiiiiiiii": invoke_viiiiiiiii, "invoke_viiiiiiiiii": invoke_viiiiiiiiii, "invoke_iii": invoke_iii, "invoke_diii": invoke_diii, "invoke_dii": invoke_dii, "invoke_i": invoke_i, "invoke_iiiiii": invoke_iiiiii, "invoke_viii": invoke_viii, "invoke_idi": invoke_idi, "invoke_iiiiiiiii": invoke_iiiiiiiii, "invoke_iiiii": invoke_iiiii, "invoke_viiii": invoke_viiii, "_llvm_lifetime_end": _llvm_lifetime_end, "_lseek": _lseek, "__scanString": __scanString, "_fclose": _fclose, "_pthread_mutex_lock": _pthread_mutex_lock, "___cxa_end_catch": ___cxa_end_catch, "_strtoull": _strtoull, "_fflush": _fflush, "_strtol": _strtol, "__isLeapYear": __isLeapYear, "_fwrite": _fwrite, "_send": _send, "_isspace": _isspace, "_read": _read, "_ceil": _ceil, "___cxa_bad_cast": ___cxa_bad_cast, "_fsync": _fsync, "___cxa_guard_abort": ___cxa_guard_abort, "_newlocale": _newlocale, "___gxx_personality_v0": ___gxx_personality_v0, "_pthread_cond_wait": _pthread_cond_wait, "___cxa_rethrow": ___cxa_rethrow, "_fmod": _fmod, "___resumeException": ___resumeException, "_round": _round, "_memchr": _memchr, "_llvm_va_end": _llvm_va_end, "_vsscanf": _vsscanf, "_snprintf": _snprintf, "_fgetc": _fgetc, "_ceilf": _ceilf, "__getFloat": __getFloat, "_atexit": _atexit, "___cxa_free_exception": ___cxa_free_exception, "_close": _close, "___setErrNo": ___setErrNo, "_isxdigit": _isxdigit, "_ftell": _ftell, "_exit": _exit, "_sprintf": _sprintf, "_asprintf": _asprintf, "___ctype_b_loc": ___ctype_b_loc, "_freelocale": _freelocale, "_catgets": _catgets, "___cxa_is_number_type": ___cxa_is_number_type, "_getcwd": _getcwd, "___cxa_does_inherit": ___cxa_does_inherit, "___cxa_guard_acquire": ___cxa_guard_acquire, "___cxa_begin_catch": ___cxa_begin_catch, "_recv": _recv, "__parseInt64": __parseInt64, "_trunc": _trunc, "__ZSt18uncaught_exceptionv": __ZSt18uncaught_exceptionv, "___cxa_call_unexpected": ___cxa_call_unexpected, "___cxa_get_exception_ptr": ___cxa_get_exception_ptr, "__exit": __exit, "_strftime": _strftime, "___cxa_throw": ___cxa_throw, "_llvm_eh_exception": _llvm_eh_exception, "_toupper": _toupper, "_pread": _pread, "_fopen": _fopen, "_open": _open, "__arraySum": __arraySum, "_sysconf": _sysconf, "_isalnum": _isalnum, "_isalpha": _isalpha, "___cxa_find_matching_catch": ___cxa_find_matching_catch, "_strdup": _strdup, "__formatString": __formatString, "_pthread_cond_broadcast": _pthread_cond_broadcast, "__ZSt9terminatev": __ZSt9terminatev, "_isascii": _isascii, "_pthread_mutex_unlock": _pthread_mutex_unlock, "_sbrk": _sbrk, "___errno_location": ___errno_location, "_strerror": _strerror, "_catclose": _catclose, "_llvm_lifetime_start": _llvm_lifetime_start, "__parseInt": __parseInt, "___cxa_guard_release": ___cxa_guard_release, "_ungetc": _ungetc, "_uselocale": _uselocale, "_vsnprintf": _vsnprintf, "_sscanf": _sscanf, "___assert_fail": ___assert_fail, "_fread": _fread, "_abort": _abort, "_isdigit": _isdigit, "_strtoll": _strtoll, "__reallyNegative": __reallyNegative, "__addDays": __addDays, "_fabs": _fabs, "_floor": _floor, "_fseek": _fseek, "___cxa_bad_typeid": ___cxa_bad_typeid, "_write": _write, "___cxa_allocate_exception": ___cxa_allocate_exception, "_stat": _stat, "___cxa_pure_virtual": ___cxa_pure_virtual, "_vasprintf": _vasprintf, "_catopen": _catopen, "___ctype_toupper_loc": ___ctype_toupper_loc, "___ctype_tolower_loc": ___ctype_tolower_loc, "_llvm_eh_typeid_for": _llvm_eh_typeid_for, "_pwrite": _pwrite, "_strerror_r": _strerror_r, "_time": _time, "STACKTOP": STACKTOP, "STACK_MAX": STACK_MAX, "tempDoublePtr": tempDoublePtr, "ABORT": ABORT, "cttz_i8": cttz_i8, "ctlz_i8": ctlz_i8, "NaN": NaN, "Infinity": Infinity, "___fsmu8": ___fsmu8, "__ZTIc": __ZTIc, "_stdout": _stdout, "__ZTVN10__cxxabiv119__pointer_type_infoE": __ZTVN10__cxxabiv119__pointer_type_infoE, "___dso_handle": ___dso_handle, "__ZTVN10__cxxabiv117__class_type_infoE": __ZTVN10__cxxabiv117__class_type_infoE, "_stdin": _stdin, "__ZTVN10__cxxabiv120__si_class_type_infoE": __ZTVN10__cxxabiv120__si_class_type_infoE, "_stderr": _stderr }, buffer);
var __GLOBAL__I_a785 = Module["__GLOBAL__I_a785"] = asm["__GLOBAL__I_a785"];
var _memcmp = Module["_memcmp"] = asm["_memcmp"];
var _strlen = Module["_strlen"] = asm["_strlen"];
var _tolower = Module["_tolower"] = asm["_tolower"];
var _free = Module["_free"] = asm["_free"];
var __GLOBAL__I_a1698 = Module["__GLOBAL__I_a1698"] = asm["__GLOBAL__I_a1698"];
var _realloc = Module["_realloc"] = asm["_realloc"];
var _sass_compile_emscripten = Module["_sass_compile_emscripten"] = asm["_sass_compile_emscripten"];
var _memmove = Module["_memmove"] = asm["_memmove"];
var __GLOBAL__I_a = Module["__GLOBAL__I_a"] = asm["__GLOBAL__I_a"];
var _memset = Module["_memset"] = asm["_memset"];
var __GLOBAL__I_a1328 = Module["__GLOBAL__I_a1328"] = asm["__GLOBAL__I_a1328"];
var _malloc = Module["_malloc"] = asm["_malloc"];
var _memcpy = Module["_memcpy"] = asm["_memcpy"];
var _llvm_ctlz_i32 = Module["_llvm_ctlz_i32"] = asm["_llvm_ctlz_i32"];
var __GLOBAL__I_a324 = Module["__GLOBAL__I_a324"] = asm["__GLOBAL__I_a324"];
var _strcpy = Module["_strcpy"] = asm["_strcpy"];
var _calloc = Module["_calloc"] = asm["_calloc"];
var runPostSets = Module["runPostSets"] = asm["runPostSets"];
var dynCall_iiiiiiii = Module["dynCall_iiiiiiii"] = asm["dynCall_iiiiiiii"];
var dynCall_iiiiiiddi = Module["dynCall_iiiiiiddi"] = asm["dynCall_iiiiiiddi"];
var dynCall_viiiii = Module["dynCall_viiiii"] = asm["dynCall_viiiii"];
var dynCall_vi = Module["dynCall_vi"] = asm["dynCall_vi"];
var dynCall_viiidii = Module["dynCall_viiidii"] = asm["dynCall_viiidii"];
var dynCall_vii = Module["dynCall_vii"] = asm["dynCall_vii"];
var dynCall_iiiiiii = Module["dynCall_iiiiiii"] = asm["dynCall_iiiiiii"];
var dynCall_ii = Module["dynCall_ii"] = asm["dynCall_ii"];
var dynCall_iddddiii = Module["dynCall_iddddiii"] = asm["dynCall_iddddiii"];
var dynCall_id = Module["dynCall_id"] = asm["dynCall_id"];
var dynCall_iiiiiiiiiiii = Module["dynCall_iiiiiiiiiiii"] = asm["dynCall_iiiiiiiiiiii"];
var dynCall_viiiddddii = Module["dynCall_viiiddddii"] = asm["dynCall_viiiddddii"];
var dynCall_iiii = Module["dynCall_iiii"] = asm["dynCall_iiii"];
var dynCall_viiiiiiiiiiiiiii = Module["dynCall_viiiiiiiiiiiiiii"] = asm["dynCall_viiiiiiiiiiiiiii"];
var dynCall_viiiiid = Module["dynCall_viiiiid"] = asm["dynCall_viiiiid"];
var dynCall_viiiiiiii = Module["dynCall_viiiiiiii"] = asm["dynCall_viiiiiiii"];
var dynCall_viiiiii = Module["dynCall_viiiiii"] = asm["dynCall_viiiiii"];
var dynCall_ddd = Module["dynCall_ddd"] = asm["dynCall_ddd"];
var dynCall_fiii = Module["dynCall_fiii"] = asm["dynCall_fiii"];
var dynCall_di = Module["dynCall_di"] = asm["dynCall_di"];
var dynCall_v = Module["dynCall_v"] = asm["dynCall_v"];
var dynCall_iid = Module["dynCall_iid"] = asm["dynCall_iid"];
var dynCall_viiiiiii = Module["dynCall_viiiiiii"] = asm["dynCall_viiiiiii"];
var dynCall_viiiiiid = Module["dynCall_viiiiiid"] = asm["dynCall_viiiiiid"];
var dynCall_viiiiiiiii = Module["dynCall_viiiiiiiii"] = asm["dynCall_viiiiiiiii"];
var dynCall_viiiiiiiiii = Module["dynCall_viiiiiiiiii"] = asm["dynCall_viiiiiiiiii"];
var dynCall_iii = Module["dynCall_iii"] = asm["dynCall_iii"];
var dynCall_diii = Module["dynCall_diii"] = asm["dynCall_diii"];
var dynCall_dii = Module["dynCall_dii"] = asm["dynCall_dii"];
var dynCall_i = Module["dynCall_i"] = asm["dynCall_i"];
var dynCall_iiiiii = Module["dynCall_iiiiii"] = asm["dynCall_iiiiii"];
var dynCall_viii = Module["dynCall_viii"] = asm["dynCall_viii"];
var dynCall_idi = Module["dynCall_idi"] = asm["dynCall_idi"];
var dynCall_iiiiiiiii = Module["dynCall_iiiiiiiii"] = asm["dynCall_iiiiiiiii"];
var dynCall_iiiii = Module["dynCall_iiiii"] = asm["dynCall_iiiii"];
var dynCall_viiii = Module["dynCall_viiii"] = asm["dynCall_viiii"];
Runtime.stackAlloc = function(size) { return asm['stackAlloc'](size) };
Runtime.stackSave = function() { return asm['stackSave']() };
Runtime.stackRestore = function(top) { asm['stackRestore'](top) };
// TODO: strip out parts of this we do not need
//======= begin closure i64 code =======
// Copyright 2009 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
/**
 * @fileoverview Defines a Long class for representing a 64-bit two's-complement
 * integer value, which faithfully simulates the behavior of a Java "long". This
 * implementation is derived from LongLib in GWT.
 *
 */
var i64Math = (function() { // Emscripten wrapper
  var goog = { math: {} };
  /**
   * Constructs a 64-bit two's-complement integer, given its low and high 32-bit
   * values as *signed* integers.  See the from* functions below for more
   * convenient ways of constructing Longs.
   *
   * The internal representation of a long is the two given signed, 32-bit values.
   * We use 32-bit pieces because these are the size of integers on which
   * Javascript performs bit-operations.  For operations like addition and
   * multiplication, we split each number into 16-bit pieces, which can easily be
   * multiplied within Javascript's floating-point representation without overflow
   * or change in sign.
   *
   * In the algorithms below, we frequently reduce the negative case to the
   * positive case by negating the input(s) and then post-processing the result.
   * Note that we must ALWAYS check specially whether those values are MIN_VALUE
   * (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
   * a positive number, it overflows back into a negative).  Not handling this
   * case would often result in infinite recursion.
   *
   * @param {number} low  The low (signed) 32 bits of the long.
   * @param {number} high  The high (signed) 32 bits of the long.
   * @constructor
   */
  goog.math.Long = function(low, high) {
    /**
     * @type {number}
     * @private
     */
    this.low_ = low | 0;  // force into 32 signed bits.
    /**
     * @type {number}
     * @private
     */
    this.high_ = high | 0;  // force into 32 signed bits.
  };
  // NOTE: Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the
  // from* methods on which they depend.
  /**
   * A cache of the Long representations of small integer values.
   * @type {!Object}
   * @private
   */
  goog.math.Long.IntCache_ = {};
  /**
   * Returns a Long representing the given (32-bit) integer value.
   * @param {number} value The 32-bit integer in question.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromInt = function(value) {
    if (-128 <= value && value < 128) {
      var cachedObj = goog.math.Long.IntCache_[value];
      if (cachedObj) {
        return cachedObj;
      }
    }
    var obj = new goog.math.Long(value | 0, value < 0 ? -1 : 0);
    if (-128 <= value && value < 128) {
      goog.math.Long.IntCache_[value] = obj;
    }
    return obj;
  };
  /**
   * Returns a Long representing the given value, provided that it is a finite
   * number.  Otherwise, zero is returned.
   * @param {number} value The number in question.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromNumber = function(value) {
    if (isNaN(value) || !isFinite(value)) {
      return goog.math.Long.ZERO;
    } else if (value <= -goog.math.Long.TWO_PWR_63_DBL_) {
      return goog.math.Long.MIN_VALUE;
    } else if (value + 1 >= goog.math.Long.TWO_PWR_63_DBL_) {
      return goog.math.Long.MAX_VALUE;
    } else if (value < 0) {
      return goog.math.Long.fromNumber(-value).negate();
    } else {
      return new goog.math.Long(
          (value % goog.math.Long.TWO_PWR_32_DBL_) | 0,
          (value / goog.math.Long.TWO_PWR_32_DBL_) | 0);
    }
  };
  /**
   * Returns a Long representing the 64-bit integer that comes by concatenating
   * the given high and low bits.  Each is assumed to use 32 bits.
   * @param {number} lowBits The low 32-bits.
   * @param {number} highBits The high 32-bits.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromBits = function(lowBits, highBits) {
    return new goog.math.Long(lowBits, highBits);
  };
  /**
   * Returns a Long representation of the given string, written using the given
   * radix.
   * @param {string} str The textual representation of the Long.
   * @param {number=} opt_radix The radix in which the text is written.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromString = function(str, opt_radix) {
    if (str.length == 0) {
      throw Error('number format error: empty string');
    }
    var radix = opt_radix || 10;
    if (radix < 2 || 36 < radix) {
      throw Error('radix out of range: ' + radix);
    }
    if (str.charAt(0) == '-') {
      return goog.math.Long.fromString(str.substring(1), radix).negate();
    } else if (str.indexOf('-') >= 0) {
      throw Error('number format error: interior "-" character: ' + str);
    }
    // Do several (8) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = goog.math.Long.fromNumber(Math.pow(radix, 8));
    var result = goog.math.Long.ZERO;
    for (var i = 0; i < str.length; i += 8) {
      var size = Math.min(8, str.length - i);
      var value = parseInt(str.substring(i, i + size), radix);
      if (size < 8) {
        var power = goog.math.Long.fromNumber(Math.pow(radix, size));
        result = result.multiply(power).add(goog.math.Long.fromNumber(value));
      } else {
        result = result.multiply(radixToPower);
        result = result.add(goog.math.Long.fromNumber(value));
      }
    }
    return result;
  };
  // NOTE: the compiler should inline these constant values below and then remove
  // these variables, so there should be no runtime penalty for these.
  /**
   * Number used repeated below in calculations.  This must appear before the
   * first call to any from* function below.
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_16_DBL_ = 1 << 16;
  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_24_DBL_ = 1 << 24;
  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_32_DBL_ =
      goog.math.Long.TWO_PWR_16_DBL_ * goog.math.Long.TWO_PWR_16_DBL_;
  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_31_DBL_ =
      goog.math.Long.TWO_PWR_32_DBL_ / 2;
  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_48_DBL_ =
      goog.math.Long.TWO_PWR_32_DBL_ * goog.math.Long.TWO_PWR_16_DBL_;
  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_64_DBL_ =
      goog.math.Long.TWO_PWR_32_DBL_ * goog.math.Long.TWO_PWR_32_DBL_;
  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_63_DBL_ =
      goog.math.Long.TWO_PWR_64_DBL_ / 2;
  /** @type {!goog.math.Long} */
  goog.math.Long.ZERO = goog.math.Long.fromInt(0);
  /** @type {!goog.math.Long} */
  goog.math.Long.ONE = goog.math.Long.fromInt(1);
  /** @type {!goog.math.Long} */
  goog.math.Long.NEG_ONE = goog.math.Long.fromInt(-1);
  /** @type {!goog.math.Long} */
  goog.math.Long.MAX_VALUE =
      goog.math.Long.fromBits(0xFFFFFFFF | 0, 0x7FFFFFFF | 0);
  /** @type {!goog.math.Long} */
  goog.math.Long.MIN_VALUE = goog.math.Long.fromBits(0, 0x80000000 | 0);
  /**
   * @type {!goog.math.Long}
   * @private
   */
  goog.math.Long.TWO_PWR_24_ = goog.math.Long.fromInt(1 << 24);
  /** @return {number} The value, assuming it is a 32-bit integer. */
  goog.math.Long.prototype.toInt = function() {
    return this.low_;
  };
  /** @return {number} The closest floating-point representation to this value. */
  goog.math.Long.prototype.toNumber = function() {
    return this.high_ * goog.math.Long.TWO_PWR_32_DBL_ +
           this.getLowBitsUnsigned();
  };
  /**
   * @param {number=} opt_radix The radix in which the text should be written.
   * @return {string} The textual representation of this value.
   */
  goog.math.Long.prototype.toString = function(opt_radix) {
    var radix = opt_radix || 10;
    if (radix < 2 || 36 < radix) {
      throw Error('radix out of range: ' + radix);
    }
    if (this.isZero()) {
      return '0';
    }
    if (this.isNegative()) {
      if (this.equals(goog.math.Long.MIN_VALUE)) {
        // We need to change the Long value before it can be negated, so we remove
        // the bottom-most digit in this base and then recurse to do the rest.
        var radixLong = goog.math.Long.fromNumber(radix);
        var div = this.div(radixLong);
        var rem = div.multiply(radixLong).subtract(this);
        return div.toString(radix) + rem.toInt().toString(radix);
      } else {
        return '-' + this.negate().toString(radix);
      }
    }
    // Do several (6) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = goog.math.Long.fromNumber(Math.pow(radix, 6));
    var rem = this;
    var result = '';
    while (true) {
      var remDiv = rem.div(radixToPower);
      var intval = rem.subtract(remDiv.multiply(radixToPower)).toInt();
      var digits = intval.toString(radix);
      rem = remDiv;
      if (rem.isZero()) {
        return digits + result;
      } else {
        while (digits.length < 6) {
          digits = '0' + digits;
        }
        result = '' + digits + result;
      }
    }
  };
  /** @return {number} The high 32-bits as a signed value. */
  goog.math.Long.prototype.getHighBits = function() {
    return this.high_;
  };
  /** @return {number} The low 32-bits as a signed value. */
  goog.math.Long.prototype.getLowBits = function() {
    return this.low_;
  };
  /** @return {number} The low 32-bits as an unsigned value. */
  goog.math.Long.prototype.getLowBitsUnsigned = function() {
    return (this.low_ >= 0) ?
        this.low_ : goog.math.Long.TWO_PWR_32_DBL_ + this.low_;
  };
  /**
   * @return {number} Returns the number of bits needed to represent the absolute
   *     value of this Long.
   */
  goog.math.Long.prototype.getNumBitsAbs = function() {
    if (this.isNegative()) {
      if (this.equals(goog.math.Long.MIN_VALUE)) {
        return 64;
      } else {
        return this.negate().getNumBitsAbs();
      }
    } else {
      var val = this.high_ != 0 ? this.high_ : this.low_;
      for (var bit = 31; bit > 0; bit--) {
        if ((val & (1 << bit)) != 0) {
          break;
        }
      }
      return this.high_ != 0 ? bit + 33 : bit + 1;
    }
  };
  /** @return {boolean} Whether this value is zero. */
  goog.math.Long.prototype.isZero = function() {
    return this.high_ == 0 && this.low_ == 0;
  };
  /** @return {boolean} Whether this value is negative. */
  goog.math.Long.prototype.isNegative = function() {
    return this.high_ < 0;
  };
  /** @return {boolean} Whether this value is odd. */
  goog.math.Long.prototype.isOdd = function() {
    return (this.low_ & 1) == 1;
  };
  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long equals the other.
   */
  goog.math.Long.prototype.equals = function(other) {
    return (this.high_ == other.high_) && (this.low_ == other.low_);
  };
  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long does not equal the other.
   */
  goog.math.Long.prototype.notEquals = function(other) {
    return (this.high_ != other.high_) || (this.low_ != other.low_);
  };
  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is less than the other.
   */
  goog.math.Long.prototype.lessThan = function(other) {
    return this.compare(other) < 0;
  };
  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is less than or equal to the other.
   */
  goog.math.Long.prototype.lessThanOrEqual = function(other) {
    return this.compare(other) <= 0;
  };
  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is greater than the other.
   */
  goog.math.Long.prototype.greaterThan = function(other) {
    return this.compare(other) > 0;
  };
  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is greater than or equal to the other.
   */
  goog.math.Long.prototype.greaterThanOrEqual = function(other) {
    return this.compare(other) >= 0;
  };
  /**
   * Compares this Long with the given one.
   * @param {goog.math.Long} other Long to compare against.
   * @return {number} 0 if they are the same, 1 if the this is greater, and -1
   *     if the given one is greater.
   */
  goog.math.Long.prototype.compare = function(other) {
    if (this.equals(other)) {
      return 0;
    }
    var thisNeg = this.isNegative();
    var otherNeg = other.isNegative();
    if (thisNeg && !otherNeg) {
      return -1;
    }
    if (!thisNeg && otherNeg) {
      return 1;
    }
    // at this point, the signs are the same, so subtraction will not overflow
    if (this.subtract(other).isNegative()) {
      return -1;
    } else {
      return 1;
    }
  };
  /** @return {!goog.math.Long} The negation of this value. */
  goog.math.Long.prototype.negate = function() {
    if (this.equals(goog.math.Long.MIN_VALUE)) {
      return goog.math.Long.MIN_VALUE;
    } else {
      return this.not().add(goog.math.Long.ONE);
    }
  };
  /**
   * Returns the sum of this and the given Long.
   * @param {goog.math.Long} other Long to add to this one.
   * @return {!goog.math.Long} The sum of this and the given Long.
   */
  goog.math.Long.prototype.add = function(other) {
    // Divide each number into 4 chunks of 16 bits, and then sum the chunks.
    var a48 = this.high_ >>> 16;
    var a32 = this.high_ & 0xFFFF;
    var a16 = this.low_ >>> 16;
    var a00 = this.low_ & 0xFFFF;
    var b48 = other.high_ >>> 16;
    var b32 = other.high_ & 0xFFFF;
    var b16 = other.low_ >>> 16;
    var b00 = other.low_ & 0xFFFF;
    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 + b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 + b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 + b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 + b48;
    c48 &= 0xFFFF;
    return goog.math.Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32);
  };
  /**
   * Returns the difference of this and the given Long.
   * @param {goog.math.Long} other Long to subtract from this.
   * @return {!goog.math.Long} The difference of this and the given Long.
   */
  goog.math.Long.prototype.subtract = function(other) {
    return this.add(other.negate());
  };
  /**
   * Returns the product of this and the given long.
   * @param {goog.math.Long} other Long to multiply with this.
   * @return {!goog.math.Long} The product of this and the other.
   */
  goog.math.Long.prototype.multiply = function(other) {
    if (this.isZero()) {
      return goog.math.Long.ZERO;
    } else if (other.isZero()) {
      return goog.math.Long.ZERO;
    }
    if (this.equals(goog.math.Long.MIN_VALUE)) {
      return other.isOdd() ? goog.math.Long.MIN_VALUE : goog.math.Long.ZERO;
    } else if (other.equals(goog.math.Long.MIN_VALUE)) {
      return this.isOdd() ? goog.math.Long.MIN_VALUE : goog.math.Long.ZERO;
    }
    if (this.isNegative()) {
      if (other.isNegative()) {
        return this.negate().multiply(other.negate());
      } else {
        return this.negate().multiply(other).negate();
      }
    } else if (other.isNegative()) {
      return this.multiply(other.negate()).negate();
    }
    // If both longs are small, use float multiplication
    if (this.lessThan(goog.math.Long.TWO_PWR_24_) &&
        other.lessThan(goog.math.Long.TWO_PWR_24_)) {
      return goog.math.Long.fromNumber(this.toNumber() * other.toNumber());
    }
    // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
    // We can skip products that would overflow.
    var a48 = this.high_ >>> 16;
    var a32 = this.high_ & 0xFFFF;
    var a16 = this.low_ >>> 16;
    var a00 = this.low_ & 0xFFFF;
    var b48 = other.high_ >>> 16;
    var b32 = other.high_ & 0xFFFF;
    var b16 = other.low_ >>> 16;
    var b00 = other.low_ & 0xFFFF;
    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 * b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 * b00;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c16 += a00 * b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 * b00;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a16 * b16;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a00 * b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
    c48 &= 0xFFFF;
    return goog.math.Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32);
  };
  /**
   * Returns this Long divided by the given one.
   * @param {goog.math.Long} other Long by which to divide.
   * @return {!goog.math.Long} This Long divided by the given one.
   */
  goog.math.Long.prototype.div = function(other) {
    if (other.isZero()) {
      throw Error('division by zero');
    } else if (this.isZero()) {
      return goog.math.Long.ZERO;
    }
    if (this.equals(goog.math.Long.MIN_VALUE)) {
      if (other.equals(goog.math.Long.ONE) ||
          other.equals(goog.math.Long.NEG_ONE)) {
        return goog.math.Long.MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
      } else if (other.equals(goog.math.Long.MIN_VALUE)) {
        return goog.math.Long.ONE;
      } else {
        // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
        var halfThis = this.shiftRight(1);
        var approx = halfThis.div(other).shiftLeft(1);
        if (approx.equals(goog.math.Long.ZERO)) {
          return other.isNegative() ? goog.math.Long.ONE : goog.math.Long.NEG_ONE;
        } else {
          var rem = this.subtract(other.multiply(approx));
          var result = approx.add(rem.div(other));
          return result;
        }
      }
    } else if (other.equals(goog.math.Long.MIN_VALUE)) {
      return goog.math.Long.ZERO;
    }
    if (this.isNegative()) {
      if (other.isNegative()) {
        return this.negate().div(other.negate());
      } else {
        return this.negate().div(other).negate();
      }
    } else if (other.isNegative()) {
      return this.div(other.negate()).negate();
    }
    // Repeat the following until the remainder is less than other:  find a
    // floating-point that approximates remainder / other *from below*, add this
    // into the result, and subtract it from the remainder.  It is critical that
    // the approximate value is less than or equal to the real value so that the
    // remainder never becomes negative.
    var res = goog.math.Long.ZERO;
    var rem = this;
    while (rem.greaterThanOrEqual(other)) {
      // Approximate the result of division. This may be a little greater or
      // smaller than the actual value.
      var approx = Math.max(1, Math.floor(rem.toNumber() / other.toNumber()));
      // We will tweak the approximate result by changing it in the 48-th digit or
      // the smallest non-fractional digit, whichever is larger.
      var log2 = Math.ceil(Math.log(approx) / Math.LN2);
      var delta = (log2 <= 48) ? 1 : Math.pow(2, log2 - 48);
      // Decrease the approximation until it is smaller than the remainder.  Note
      // that if it is too large, the product overflows and is negative.
      var approxRes = goog.math.Long.fromNumber(approx);
      var approxRem = approxRes.multiply(other);
      while (approxRem.isNegative() || approxRem.greaterThan(rem)) {
        approx -= delta;
        approxRes = goog.math.Long.fromNumber(approx);
        approxRem = approxRes.multiply(other);
      }
      // We know the answer can't be zero... and actually, zero would cause
      // infinite recursion since we would make no progress.
      if (approxRes.isZero()) {
        approxRes = goog.math.Long.ONE;
      }
      res = res.add(approxRes);
      rem = rem.subtract(approxRem);
    }
    return res;
  };
  /**
   * Returns this Long modulo the given one.
   * @param {goog.math.Long} other Long by which to mod.
   * @return {!goog.math.Long} This Long modulo the given one.
   */
  goog.math.Long.prototype.modulo = function(other) {
    return this.subtract(this.div(other).multiply(other));
  };
  /** @return {!goog.math.Long} The bitwise-NOT of this value. */
  goog.math.Long.prototype.not = function() {
    return goog.math.Long.fromBits(~this.low_, ~this.high_);
  };
  /**
   * Returns the bitwise-AND of this Long and the given one.
   * @param {goog.math.Long} other The Long with which to AND.
   * @return {!goog.math.Long} The bitwise-AND of this and the other.
   */
  goog.math.Long.prototype.and = function(other) {
    return goog.math.Long.fromBits(this.low_ & other.low_,
                                   this.high_ & other.high_);
  };
  /**
   * Returns the bitwise-OR of this Long and the given one.
   * @param {goog.math.Long} other The Long with which to OR.
   * @return {!goog.math.Long} The bitwise-OR of this and the other.
   */
  goog.math.Long.prototype.or = function(other) {
    return goog.math.Long.fromBits(this.low_ | other.low_,
                                   this.high_ | other.high_);
  };
  /**
   * Returns the bitwise-XOR of this Long and the given one.
   * @param {goog.math.Long} other The Long with which to XOR.
   * @return {!goog.math.Long} The bitwise-XOR of this and the other.
   */
  goog.math.Long.prototype.xor = function(other) {
    return goog.math.Long.fromBits(this.low_ ^ other.low_,
                                   this.high_ ^ other.high_);
  };
  /**
   * Returns this Long with bits shifted to the left by the given amount.
   * @param {number} numBits The number of bits by which to shift.
   * @return {!goog.math.Long} This shifted to the left by the given amount.
   */
  goog.math.Long.prototype.shiftLeft = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
      return this;
    } else {
      var low = this.low_;
      if (numBits < 32) {
        var high = this.high_;
        return goog.math.Long.fromBits(
            low << numBits,
            (high << numBits) | (low >>> (32 - numBits)));
      } else {
        return goog.math.Long.fromBits(0, low << (numBits - 32));
      }
    }
  };
  /**
   * Returns this Long with bits shifted to the right by the given amount.
   * @param {number} numBits The number of bits by which to shift.
   * @return {!goog.math.Long} This shifted to the right by the given amount.
   */
  goog.math.Long.prototype.shiftRight = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
      return this;
    } else {
      var high = this.high_;
      if (numBits < 32) {
        var low = this.low_;
        return goog.math.Long.fromBits(
            (low >>> numBits) | (high << (32 - numBits)),
            high >> numBits);
      } else {
        return goog.math.Long.fromBits(
            high >> (numBits - 32),
            high >= 0 ? 0 : -1);
      }
    }
  };
  /**
   * Returns this Long with bits shifted to the right by the given amount, with
   * the new top bits matching the current sign bit.
   * @param {number} numBits The number of bits by which to shift.
   * @return {!goog.math.Long} This shifted to the right by the given amount, with
   *     zeros placed into the new leading bits.
   */
  goog.math.Long.prototype.shiftRightUnsigned = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
      return this;
    } else {
      var high = this.high_;
      if (numBits < 32) {
        var low = this.low_;
        return goog.math.Long.fromBits(
            (low >>> numBits) | (high << (32 - numBits)),
            high >>> numBits);
      } else if (numBits == 32) {
        return goog.math.Long.fromBits(high, 0);
      } else {
        return goog.math.Long.fromBits(high >>> (numBits - 32), 0);
      }
    }
  };
  //======= begin jsbn =======
  var navigator = { appName: 'Modern Browser' }; // polyfill a little
  // Copyright (c) 2005  Tom Wu
  // All Rights Reserved.
  // http://www-cs-students.stanford.edu/~tjw/jsbn/
  /*
   * Copyright (c) 2003-2005  Tom Wu
   * All Rights Reserved.
   *
   * Permission is hereby granted, free of charge, to any person obtaining
   * a copy of this software and associated documentation files (the
   * "Software"), to deal in the Software without restriction, including
   * without limitation the rights to use, copy, modify, merge, publish,
   * distribute, sublicense, and/or sell copies of the Software, and to
   * permit persons to whom the Software is furnished to do so, subject to
   * the following conditions:
   *
   * The above copyright notice and this permission notice shall be
   * included in all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS-IS" AND WITHOUT WARRANTY OF ANY KIND, 
   * EXPRESS, IMPLIED OR OTHERWISE, INCLUDING WITHOUT LIMITATION, ANY 
   * WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.  
   *
   * IN NO EVENT SHALL TOM WU BE LIABLE FOR ANY SPECIAL, INCIDENTAL,
   * INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY KIND, OR ANY DAMAGES WHATSOEVER
   * RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER OR NOT ADVISED OF
   * THE POSSIBILITY OF DAMAGE, AND ON ANY THEORY OF LIABILITY, ARISING OUT
   * OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   * In addition, the following condition applies:
   *
   * All redistributions must retain an intact copy of this copyright notice
   * and disclaimer.
   */
  // Basic JavaScript BN library - subset useful for RSA encryption.
  // Bits per digit
  var dbits;
  // JavaScript engine analysis
  var canary = 0xdeadbeefcafe;
  var j_lm = ((canary&0xffffff)==0xefcafe);
  // (public) Constructor
  function BigInteger(a,b,c) {
    if(a != null)
      if("number" == typeof a) this.fromNumber(a,b,c);
      else if(b == null && "string" != typeof a) this.fromString(a,256);
      else this.fromString(a,b);
  }
  // return new, unset BigInteger
  function nbi() { return new BigInteger(null); }
  // am: Compute w_j += (x*this_i), propagate carries,
  // c is initial carry, returns final carry.
  // c < 3*dvalue, x < 2*dvalue, this_i < dvalue
  // We need to select the fastest one that works in this environment.
  // am1: use a single mult and divide to get the high bits,
  // max digit bits should be 26 because
  // max internal value = 2*dvalue^2-2*dvalue (< 2^53)
  function am1(i,x,w,j,c,n) {
    while(--n >= 0) {
      var v = x*this[i++]+w[j]+c;
      c = Math.floor(v/0x4000000);
      w[j++] = v&0x3ffffff;
    }
    return c;
  }
  // am2 avoids a big mult-and-extract completely.
  // Max digit bits should be <= 30 because we do bitwise ops
  // on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
  function am2(i,x,w,j,c,n) {
    var xl = x&0x7fff, xh = x>>15;
    while(--n >= 0) {
      var l = this[i]&0x7fff;
      var h = this[i++]>>15;
      var m = xh*l+h*xl;
      l = xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);
      c = (l>>>30)+(m>>>15)+xh*h+(c>>>30);
      w[j++] = l&0x3fffffff;
    }
    return c;
  }
  // Alternately, set max digit bits to 28 since some
  // browsers slow down when dealing with 32-bit numbers.
  function am3(i,x,w,j,c,n) {
    var xl = x&0x3fff, xh = x>>14;
    while(--n >= 0) {
      var l = this[i]&0x3fff;
      var h = this[i++]>>14;
      var m = xh*l+h*xl;
      l = xl*l+((m&0x3fff)<<14)+w[j]+c;
      c = (l>>28)+(m>>14)+xh*h;
      w[j++] = l&0xfffffff;
    }
    return c;
  }
  if(j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
    BigInteger.prototype.am = am2;
    dbits = 30;
  }
  else if(j_lm && (navigator.appName != "Netscape")) {
    BigInteger.prototype.am = am1;
    dbits = 26;
  }
  else { // Mozilla/Netscape seems to prefer am3
    BigInteger.prototype.am = am3;
    dbits = 28;
  }
  BigInteger.prototype.DB = dbits;
  BigInteger.prototype.DM = ((1<<dbits)-1);
  BigInteger.prototype.DV = (1<<dbits);
  var BI_FP = 52;
  BigInteger.prototype.FV = Math.pow(2,BI_FP);
  BigInteger.prototype.F1 = BI_FP-dbits;
  BigInteger.prototype.F2 = 2*dbits-BI_FP;
  // Digit conversions
  var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
  var BI_RC = new Array();
  var rr,vv;
  rr = "0".charCodeAt(0);
  for(vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
  rr = "a".charCodeAt(0);
  for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
  rr = "A".charCodeAt(0);
  for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
  function int2char(n) { return BI_RM.charAt(n); }
  function intAt(s,i) {
    var c = BI_RC[s.charCodeAt(i)];
    return (c==null)?-1:c;
  }
  // (protected) copy this to r
  function bnpCopyTo(r) {
    for(var i = this.t-1; i >= 0; --i) r[i] = this[i];
    r.t = this.t;
    r.s = this.s;
  }
  // (protected) set from integer value x, -DV <= x < DV
  function bnpFromInt(x) {
    this.t = 1;
    this.s = (x<0)?-1:0;
    if(x > 0) this[0] = x;
    else if(x < -1) this[0] = x+DV;
    else this.t = 0;
  }
  // return bigint initialized to value
  function nbv(i) { var r = nbi(); r.fromInt(i); return r; }
  // (protected) set from string and radix
  function bnpFromString(s,b) {
    var k;
    if(b == 16) k = 4;
    else if(b == 8) k = 3;
    else if(b == 256) k = 8; // byte array
    else if(b == 2) k = 1;
    else if(b == 32) k = 5;
    else if(b == 4) k = 2;
    else { this.fromRadix(s,b); return; }
    this.t = 0;
    this.s = 0;
    var i = s.length, mi = false, sh = 0;
    while(--i >= 0) {
      var x = (k==8)?s[i]&0xff:intAt(s,i);
      if(x < 0) {
        if(s.charAt(i) == "-") mi = true;
        continue;
      }
      mi = false;
      if(sh == 0)
        this[this.t++] = x;
      else if(sh+k > this.DB) {
        this[this.t-1] |= (x&((1<<(this.DB-sh))-1))<<sh;
        this[this.t++] = (x>>(this.DB-sh));
      }
      else
        this[this.t-1] |= x<<sh;
      sh += k;
      if(sh >= this.DB) sh -= this.DB;
    }
    if(k == 8 && (s[0]&0x80) != 0) {
      this.s = -1;
      if(sh > 0) this[this.t-1] |= ((1<<(this.DB-sh))-1)<<sh;
    }
    this.clamp();
    if(mi) BigInteger.ZERO.subTo(this,this);
  }
  // (protected) clamp off excess high words
  function bnpClamp() {
    var c = this.s&this.DM;
    while(this.t > 0 && this[this.t-1] == c) --this.t;
  }
  // (public) return string representation in given radix
  function bnToString(b) {
    if(this.s < 0) return "-"+this.negate().toString(b);
    var k;
    if(b == 16) k = 4;
    else if(b == 8) k = 3;
    else if(b == 2) k = 1;
    else if(b == 32) k = 5;
    else if(b == 4) k = 2;
    else return this.toRadix(b);
    var km = (1<<k)-1, d, m = false, r = "", i = this.t;
    var p = this.DB-(i*this.DB)%k;
    if(i-- > 0) {
      if(p < this.DB && (d = this[i]>>p) > 0) { m = true; r = int2char(d); }
      while(i >= 0) {
        if(p < k) {
          d = (this[i]&((1<<p)-1))<<(k-p);
          d |= this[--i]>>(p+=this.DB-k);
        }
        else {
          d = (this[i]>>(p-=k))&km;
          if(p <= 0) { p += this.DB; --i; }
        }
        if(d > 0) m = true;
        if(m) r += int2char(d);
      }
    }
    return m?r:"0";
  }
  // (public) -this
  function bnNegate() { var r = nbi(); BigInteger.ZERO.subTo(this,r); return r; }
  // (public) |this|
  function bnAbs() { return (this.s<0)?this.negate():this; }
  // (public) return + if this > a, - if this < a, 0 if equal
  function bnCompareTo(a) {
    var r = this.s-a.s;
    if(r != 0) return r;
    var i = this.t;
    r = i-a.t;
    if(r != 0) return (this.s<0)?-r:r;
    while(--i >= 0) if((r=this[i]-a[i]) != 0) return r;
    return 0;
  }
  // returns bit length of the integer x
  function nbits(x) {
    var r = 1, t;
    if((t=x>>>16) != 0) { x = t; r += 16; }
    if((t=x>>8) != 0) { x = t; r += 8; }
    if((t=x>>4) != 0) { x = t; r += 4; }
    if((t=x>>2) != 0) { x = t; r += 2; }
    if((t=x>>1) != 0) { x = t; r += 1; }
    return r;
  }
  // (public) return the number of bits in "this"
  function bnBitLength() {
    if(this.t <= 0) return 0;
    return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));
  }
  // (protected) r = this << n*DB
  function bnpDLShiftTo(n,r) {
    var i;
    for(i = this.t-1; i >= 0; --i) r[i+n] = this[i];
    for(i = n-1; i >= 0; --i) r[i] = 0;
    r.t = this.t+n;
    r.s = this.s;
  }
  // (protected) r = this >> n*DB
  function bnpDRShiftTo(n,r) {
    for(var i = n; i < this.t; ++i) r[i-n] = this[i];
    r.t = Math.max(this.t-n,0);
    r.s = this.s;
  }
  // (protected) r = this << n
  function bnpLShiftTo(n,r) {
    var bs = n%this.DB;
    var cbs = this.DB-bs;
    var bm = (1<<cbs)-1;
    var ds = Math.floor(n/this.DB), c = (this.s<<bs)&this.DM, i;
    for(i = this.t-1; i >= 0; --i) {
      r[i+ds+1] = (this[i]>>cbs)|c;
      c = (this[i]&bm)<<bs;
    }
    for(i = ds-1; i >= 0; --i) r[i] = 0;
    r[ds] = c;
    r.t = this.t+ds+1;
    r.s = this.s;
    r.clamp();
  }
  // (protected) r = this >> n
  function bnpRShiftTo(n,r) {
    r.s = this.s;
    var ds = Math.floor(n/this.DB);
    if(ds >= this.t) { r.t = 0; return; }
    var bs = n%this.DB;
    var cbs = this.DB-bs;
    var bm = (1<<bs)-1;
    r[0] = this[ds]>>bs;
    for(var i = ds+1; i < this.t; ++i) {
      r[i-ds-1] |= (this[i]&bm)<<cbs;
      r[i-ds] = this[i]>>bs;
    }
    if(bs > 0) r[this.t-ds-1] |= (this.s&bm)<<cbs;
    r.t = this.t-ds;
    r.clamp();
  }
  // (protected) r = this - a
  function bnpSubTo(a,r) {
    var i = 0, c = 0, m = Math.min(a.t,this.t);
    while(i < m) {
      c += this[i]-a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    if(a.t < this.t) {
      c -= a.s;
      while(i < this.t) {
        c += this[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += this.s;
    }
    else {
      c += this.s;
      while(i < a.t) {
        c -= a[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c -= a.s;
    }
    r.s = (c<0)?-1:0;
    if(c < -1) r[i++] = this.DV+c;
    else if(c > 0) r[i++] = c;
    r.t = i;
    r.clamp();
  }
  // (protected) r = this * a, r != this,a (HAC 14.12)
  // "this" should be the larger one if appropriate.
  function bnpMultiplyTo(a,r) {
    var x = this.abs(), y = a.abs();
    var i = x.t;
    r.t = i+y.t;
    while(--i >= 0) r[i] = 0;
    for(i = 0; i < y.t; ++i) r[i+x.t] = x.am(0,y[i],r,i,0,x.t);
    r.s = 0;
    r.clamp();
    if(this.s != a.s) BigInteger.ZERO.subTo(r,r);
  }
  // (protected) r = this^2, r != this (HAC 14.16)
  function bnpSquareTo(r) {
    var x = this.abs();
    var i = r.t = 2*x.t;
    while(--i >= 0) r[i] = 0;
    for(i = 0; i < x.t-1; ++i) {
      var c = x.am(i,x[i],r,2*i,0,1);
      if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1)) >= x.DV) {
        r[i+x.t] -= x.DV;
        r[i+x.t+1] = 1;
      }
    }
    if(r.t > 0) r[r.t-1] += x.am(i,x[i],r,2*i,0,1);
    r.s = 0;
    r.clamp();
  }
  // (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
  // r != q, this != m.  q or r may be null.
  function bnpDivRemTo(m,q,r) {
    var pm = m.abs();
    if(pm.t <= 0) return;
    var pt = this.abs();
    if(pt.t < pm.t) {
      if(q != null) q.fromInt(0);
      if(r != null) this.copyTo(r);
      return;
    }
    if(r == null) r = nbi();
    var y = nbi(), ts = this.s, ms = m.s;
    var nsh = this.DB-nbits(pm[pm.t-1]);	// normalize modulus
    if(nsh > 0) { pm.lShiftTo(nsh,y); pt.lShiftTo(nsh,r); }
    else { pm.copyTo(y); pt.copyTo(r); }
    var ys = y.t;
    var y0 = y[ys-1];
    if(y0 == 0) return;
    var yt = y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);
    var d1 = this.FV/yt, d2 = (1<<this.F1)/yt, e = 1<<this.F2;
    var i = r.t, j = i-ys, t = (q==null)?nbi():q;
    y.dlShiftTo(j,t);
    if(r.compareTo(t) >= 0) {
      r[r.t++] = 1;
      r.subTo(t,r);
    }
    BigInteger.ONE.dlShiftTo(ys,t);
    t.subTo(y,y);	// "negative" y so we can replace sub with am later
    while(y.t < ys) y[y.t++] = 0;
    while(--j >= 0) {
      // Estimate quotient digit
      var qd = (r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);
      if((r[i]+=y.am(0,qd,r,j,0,ys)) < qd) {	// Try it out
        y.dlShiftTo(j,t);
        r.subTo(t,r);
        while(r[i] < --qd) r.subTo(t,r);
      }
    }
    if(q != null) {
      r.drShiftTo(ys,q);
      if(ts != ms) BigInteger.ZERO.subTo(q,q);
    }
    r.t = ys;
    r.clamp();
    if(nsh > 0) r.rShiftTo(nsh,r);	// Denormalize remainder
    if(ts < 0) BigInteger.ZERO.subTo(r,r);
  }
  // (public) this mod a
  function bnMod(a) {
    var r = nbi();
    this.abs().divRemTo(a,null,r);
    if(this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r,r);
    return r;
  }
  // Modular reduction using "classic" algorithm
  function Classic(m) { this.m = m; }
  function cConvert(x) {
    if(x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
    else return x;
  }
  function cRevert(x) { return x; }
  function cReduce(x) { x.divRemTo(this.m,null,x); }
  function cMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }
  function cSqrTo(x,r) { x.squareTo(r); this.reduce(r); }
  Classic.prototype.convert = cConvert;
  Classic.prototype.revert = cRevert;
  Classic.prototype.reduce = cReduce;
  Classic.prototype.mulTo = cMulTo;
  Classic.prototype.sqrTo = cSqrTo;
  // (protected) return "-1/this % 2^DB"; useful for Mont. reduction
  // justification:
  //         xy == 1 (mod m)
  //         xy =  1+km
  //   xy(2-xy) = (1+km)(1-km)
  // x[y(2-xy)] = 1-k^2m^2
  // x[y(2-xy)] == 1 (mod m^2)
  // if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
  // should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
  // JS multiply "overflows" differently from C/C++, so care is needed here.
  function bnpInvDigit() {
    if(this.t < 1) return 0;
    var x = this[0];
    if((x&1) == 0) return 0;
    var y = x&3;		// y == 1/x mod 2^2
    y = (y*(2-(x&0xf)*y))&0xf;	// y == 1/x mod 2^4
    y = (y*(2-(x&0xff)*y))&0xff;	// y == 1/x mod 2^8
    y = (y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;	// y == 1/x mod 2^16
    // last step - calculate inverse mod DV directly;
    // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
    y = (y*(2-x*y%this.DV))%this.DV;		// y == 1/x mod 2^dbits
    // we really want the negative inverse, and -DV < y < DV
    return (y>0)?this.DV-y:-y;
  }
  // Montgomery reduction
  function Montgomery(m) {
    this.m = m;
    this.mp = m.invDigit();
    this.mpl = this.mp&0x7fff;
    this.mph = this.mp>>15;
    this.um = (1<<(m.DB-15))-1;
    this.mt2 = 2*m.t;
  }
  // xR mod m
  function montConvert(x) {
    var r = nbi();
    x.abs().dlShiftTo(this.m.t,r);
    r.divRemTo(this.m,null,r);
    if(x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r,r);
    return r;
  }
  // x/R mod m
  function montRevert(x) {
    var r = nbi();
    x.copyTo(r);
    this.reduce(r);
    return r;
  }
  // x = x/R mod m (HAC 14.32)
  function montReduce(x) {
    while(x.t <= this.mt2)	// pad x so am has enough room later
      x[x.t++] = 0;
    for(var i = 0; i < this.m.t; ++i) {
      // faster way of calculating u0 = x[i]*mp mod DV
      var j = x[i]&0x7fff;
      var u0 = (j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;
      // use am to combine the multiply-shift-add into one call
      j = i+this.m.t;
      x[j] += this.m.am(0,u0,x,i,0,this.m.t);
      // propagate carry
      while(x[j] >= x.DV) { x[j] -= x.DV; x[++j]++; }
    }
    x.clamp();
    x.drShiftTo(this.m.t,x);
    if(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
  }
  // r = "x^2/R mod m"; x != r
  function montSqrTo(x,r) { x.squareTo(r); this.reduce(r); }
  // r = "xy/R mod m"; x,y != r
  function montMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }
  Montgomery.prototype.convert = montConvert;
  Montgomery.prototype.revert = montRevert;
  Montgomery.prototype.reduce = montReduce;
  Montgomery.prototype.mulTo = montMulTo;
  Montgomery.prototype.sqrTo = montSqrTo;
  // (protected) true iff this is even
  function bnpIsEven() { return ((this.t>0)?(this[0]&1):this.s) == 0; }
  // (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
  function bnpExp(e,z) {
    if(e > 0xffffffff || e < 1) return BigInteger.ONE;
    var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e)-1;
    g.copyTo(r);
    while(--i >= 0) {
      z.sqrTo(r,r2);
      if((e&(1<<i)) > 0) z.mulTo(r2,g,r);
      else { var t = r; r = r2; r2 = t; }
    }
    return z.revert(r);
  }
  // (public) this^e % m, 0 <= e < 2^32
  function bnModPowInt(e,m) {
    var z;
    if(e < 256 || m.isEven()) z = new Classic(m); else z = new Montgomery(m);
    return this.exp(e,z);
  }
  // protected
  BigInteger.prototype.copyTo = bnpCopyTo;
  BigInteger.prototype.fromInt = bnpFromInt;
  BigInteger.prototype.fromString = bnpFromString;
  BigInteger.prototype.clamp = bnpClamp;
  BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
  BigInteger.prototype.drShiftTo = bnpDRShiftTo;
  BigInteger.prototype.lShiftTo = bnpLShiftTo;
  BigInteger.prototype.rShiftTo = bnpRShiftTo;
  BigInteger.prototype.subTo = bnpSubTo;
  BigInteger.prototype.multiplyTo = bnpMultiplyTo;
  BigInteger.prototype.squareTo = bnpSquareTo;
  BigInteger.prototype.divRemTo = bnpDivRemTo;
  BigInteger.prototype.invDigit = bnpInvDigit;
  BigInteger.prototype.isEven = bnpIsEven;
  BigInteger.prototype.exp = bnpExp;
  // public
  BigInteger.prototype.toString = bnToString;
  BigInteger.prototype.negate = bnNegate;
  BigInteger.prototype.abs = bnAbs;
  BigInteger.prototype.compareTo = bnCompareTo;
  BigInteger.prototype.bitLength = bnBitLength;
  BigInteger.prototype.mod = bnMod;
  BigInteger.prototype.modPowInt = bnModPowInt;
  // "constants"
  BigInteger.ZERO = nbv(0);
  BigInteger.ONE = nbv(1);
  // jsbn2 stuff
  // (protected) convert from radix string
  function bnpFromRadix(s,b) {
    this.fromInt(0);
    if(b == null) b = 10;
    var cs = this.chunkSize(b);
    var d = Math.pow(b,cs), mi = false, j = 0, w = 0;
    for(var i = 0; i < s.length; ++i) {
      var x = intAt(s,i);
      if(x < 0) {
        if(s.charAt(i) == "-" && this.signum() == 0) mi = true;
        continue;
      }
      w = b*w+x;
      if(++j >= cs) {
        this.dMultiply(d);
        this.dAddOffset(w,0);
        j = 0;
        w = 0;
      }
    }
    if(j > 0) {
      this.dMultiply(Math.pow(b,j));
      this.dAddOffset(w,0);
    }
    if(mi) BigInteger.ZERO.subTo(this,this);
  }
  // (protected) return x s.t. r^x < DV
  function bnpChunkSize(r) { return Math.floor(Math.LN2*this.DB/Math.log(r)); }
  // (public) 0 if this == 0, 1 if this > 0
  function bnSigNum() {
    if(this.s < 0) return -1;
    else if(this.t <= 0 || (this.t == 1 && this[0] <= 0)) return 0;
    else return 1;
  }
  // (protected) this *= n, this >= 0, 1 < n < DV
  function bnpDMultiply(n) {
    this[this.t] = this.am(0,n-1,this,0,0,this.t);
    ++this.t;
    this.clamp();
  }
  // (protected) this += n << w words, this >= 0
  function bnpDAddOffset(n,w) {
    if(n == 0) return;
    while(this.t <= w) this[this.t++] = 0;
    this[w] += n;
    while(this[w] >= this.DV) {
      this[w] -= this.DV;
      if(++w >= this.t) this[this.t++] = 0;
      ++this[w];
    }
  }
  // (protected) convert to radix string
  function bnpToRadix(b) {
    if(b == null) b = 10;
    if(this.signum() == 0 || b < 2 || b > 36) return "0";
    var cs = this.chunkSize(b);
    var a = Math.pow(b,cs);
    var d = nbv(a), y = nbi(), z = nbi(), r = "";
    this.divRemTo(d,y,z);
    while(y.signum() > 0) {
      r = (a+z.intValue()).toString(b).substr(1) + r;
      y.divRemTo(d,y,z);
    }
    return z.intValue().toString(b) + r;
  }
  // (public) return value as integer
  function bnIntValue() {
    if(this.s < 0) {
      if(this.t == 1) return this[0]-this.DV;
      else if(this.t == 0) return -1;
    }
    else if(this.t == 1) return this[0];
    else if(this.t == 0) return 0;
    // assumes 16 < DB < 32
    return ((this[1]&((1<<(32-this.DB))-1))<<this.DB)|this[0];
  }
  // (protected) r = this + a
  function bnpAddTo(a,r) {
    var i = 0, c = 0, m = Math.min(a.t,this.t);
    while(i < m) {
      c += this[i]+a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    if(a.t < this.t) {
      c += a.s;
      while(i < this.t) {
        c += this[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += this.s;
    }
    else {
      c += this.s;
      while(i < a.t) {
        c += a[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += a.s;
    }
    r.s = (c<0)?-1:0;
    if(c > 0) r[i++] = c;
    else if(c < -1) r[i++] = this.DV+c;
    r.t = i;
    r.clamp();
  }
  BigInteger.prototype.fromRadix = bnpFromRadix;
  BigInteger.prototype.chunkSize = bnpChunkSize;
  BigInteger.prototype.signum = bnSigNum;
  BigInteger.prototype.dMultiply = bnpDMultiply;
  BigInteger.prototype.dAddOffset = bnpDAddOffset;
  BigInteger.prototype.toRadix = bnpToRadix;
  BigInteger.prototype.intValue = bnIntValue;
  BigInteger.prototype.addTo = bnpAddTo;
  //======= end jsbn =======
  // Emscripten wrapper
  var Wrapper = {
    abs: function(l, h) {
      var x = new goog.math.Long(l, h);
      var ret;
      if (x.isNegative()) {
        ret = x.negate();
      } else {
        ret = x;
      }
      HEAP32[tempDoublePtr>>2] = ret.low_;
      HEAP32[tempDoublePtr+4>>2] = ret.high_;
    },
    ensureTemps: function() {
      if (Wrapper.ensuredTemps) return;
      Wrapper.ensuredTemps = true;
      Wrapper.two32 = new BigInteger();
      Wrapper.two32.fromString('4294967296', 10);
      Wrapper.two64 = new BigInteger();
      Wrapper.two64.fromString('18446744073709551616', 10);
      Wrapper.temp1 = new BigInteger();
      Wrapper.temp2 = new BigInteger();
    },
    lh2bignum: function(l, h) {
      var a = new BigInteger();
      a.fromString(h.toString(), 10);
      var b = new BigInteger();
      a.multiplyTo(Wrapper.two32, b);
      var c = new BigInteger();
      c.fromString(l.toString(), 10);
      var d = new BigInteger();
      c.addTo(b, d);
      return d;
    },
    stringify: function(l, h, unsigned) {
      var ret = new goog.math.Long(l, h).toString();
      if (unsigned && ret[0] == '-') {
        // unsign slowly using jsbn bignums
        Wrapper.ensureTemps();
        var bignum = new BigInteger();
        bignum.fromString(ret, 10);
        ret = new BigInteger();
        Wrapper.two64.addTo(bignum, ret);
        ret = ret.toString(10);
      }
      return ret;
    },
    fromString: function(str, base, min, max, unsigned) {
      Wrapper.ensureTemps();
      var bignum = new BigInteger();
      bignum.fromString(str, base);
      var bigmin = new BigInteger();
      bigmin.fromString(min, 10);
      var bigmax = new BigInteger();
      bigmax.fromString(max, 10);
      if (unsigned && bignum.compareTo(BigInteger.ZERO) < 0) {
        var temp = new BigInteger();
        bignum.addTo(Wrapper.two64, temp);
        bignum = temp;
      }
      var error = false;
      if (bignum.compareTo(bigmin) < 0) {
        bignum = bigmin;
        error = true;
      } else if (bignum.compareTo(bigmax) > 0) {
        bignum = bigmax;
        error = true;
      }
      var ret = goog.math.Long.fromString(bignum.toString()); // min-max checks should have clamped this to a range goog.math.Long can handle well
      HEAP32[tempDoublePtr>>2] = ret.low_;
      HEAP32[tempDoublePtr+4>>2] = ret.high_;
      if (error) throw 'range error';
    }
  };
  return Wrapper;
})();
//======= end closure i64 code =======
// === Auto-generated postamble setup entry stuff ===
if (memoryInitializer) {
  function applyData(data) {
    HEAPU8.set(data, STATIC_BASE);
  }
  if (ENVIRONMENT_IS_NODE || ENVIRONMENT_IS_SHELL) {
    applyData(Module['readBinary'](memoryInitializer));
  } else {
    addRunDependency('memory initializer');
    Browser.asyncLoad(memoryInitializer, function(data) {
      applyData(data);
      removeRunDependency('memory initializer');
    }, function(data) {
      throw 'could not load memory initializer ' + memoryInitializer;
    });
  }
}
function ExitStatus(status) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + status + ")";
  this.status = status;
};
ExitStatus.prototype = new Error();
ExitStatus.prototype.constructor = ExitStatus;
var initialStackTop;
var preloadStartTime = null;
var calledMain = false;
dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!Module['calledRun'] && shouldRunNow) run();
  if (!Module['calledRun']) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
}
Module['callMain'] = Module.callMain = function callMain(args) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on __ATMAIN__)');
  assert(__ATPRERUN__.length == 0, 'cannot call main when preRun functions remain to be called');
  args = args || [];
  if (ENVIRONMENT_IS_WEB && preloadStartTime !== null) {
    Module.printErr('preload time: ' + (Date.now() - preloadStartTime) + ' ms');
  }
  ensureInitRuntime();
  var argc = args.length+1;
  function pad() {
    for (var i = 0; i < 4-1; i++) {
      argv.push(0);
    }
  }
  var argv = [allocate(intArrayFromString("/bin/this.program"), 'i8', ALLOC_NORMAL) ];
  pad();
  for (var i = 0; i < argc-1; i = i + 1) {
    argv.push(allocate(intArrayFromString(args[i]), 'i8', ALLOC_NORMAL));
    pad();
  }
  argv.push(0);
  argv = allocate(argv, 'i32', ALLOC_NORMAL);
  initialStackTop = STACKTOP;
  try {
    var ret = Module['_main'](argc, argv, 0);
    // if we're not running an evented main loop, it's time to exit
    if (!Module['noExitRuntime']) {
      exit(ret);
    }
  }
  catch(e) {
    if (e instanceof ExitStatus) {
      // exit() throws this once it's done to make sure execution
      // has been stopped completely
      return;
    } else if (e == 'SimulateInfiniteLoop') {
      // running an evented main loop, don't immediately exit
      Module['noExitRuntime'] = true;
      return;
    } else {
      if (e && typeof e === 'object' && e.stack) Module.printErr('exception thrown: ' + [e, e.stack]);
      throw e;
    }
  } finally {
    calledMain = true;
  }
}
function run(args) {
  args = args || Module['arguments'];
  if (preloadStartTime === null) preloadStartTime = Date.now();
  if (runDependencies > 0) {
    Module.printErr('run() called, but dependencies remain, so not running');
    return;
  }
  preRun();
  if (runDependencies > 0) {
    // a preRun added a dependency, run will be called later
    return;
  }
  function doRun() {
    ensureInitRuntime();
    preMain();
    Module['calledRun'] = true;
    if (Module['_main'] && shouldRunNow) {
      Module['callMain'](args);
    }
    postRun();
  }
  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      if (!ABORT) doRun();
    }, 1);
  } else {
    doRun();
  }
}
Module['run'] = Module.run = run;
function exit(status) {
  ABORT = true;
  EXITSTATUS = status;
  STACKTOP = initialStackTop;
  // exit the runtime
  exitRuntime();
  // TODO We should handle this differently based on environment.
  // In the browser, the best we can do is throw an exception
  // to halt execution, but in node we could process.exit and
  // I'd imagine SM shell would have something equivalent.
  // This would let us set a proper exit status (which
  // would be great for checking test exit statuses).
  // https://github.com/kripken/emscripten/issues/1371
  // throw an exception to halt the current execution
  throw new ExitStatus(status);
}
Module['exit'] = Module.exit = exit;
function abort(text) {
  if (text) {
    Module.print(text);
    Module.printErr(text);
  }
  ABORT = true;
  EXITSTATUS = 1;
  throw 'abort() at ' + stackTrace();
}
Module['abort'] = Module.abort = abort;
// {{PRE_RUN_ADDITIONS}}
if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}
// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;
if (Module['noInitialRun']) {
  shouldRunNow = false;
}
run();
// {{POST_RUN_ADDITIONS}}
// {{MODULE_ADDITIONS}}

/*global Module, FS, ALLOC_STACK*/
/*jshint strict:false*/
var Sass = {
  style: {
    nested: 0,
    expanded: 1,
    compact: 2,
    compressed: 3
  },
  comments: {
    'none': 0,
    'default': 1
  },
  _options: {
    style: 0,
    comments: 0
  },
  _files: {},
  _path: '/sass/',

  options: function(options) {
    if (typeof options !== 'object') {
      return;
    }

    Object.keys(options).forEach(function(key) {
      switch (key) {
        case 'style':
          Sass._options[key] = Number(options[key]);
          break;
        case 'comments':
          Sass._options[key] = Number(!!options[key]);
          break;
      }
    });
  },

  _absolutePath: function(filename) {
    return Sass._path + (filename.slice(0, 1) === '/' ? filename.slice(1) : filename);
  },

  _createPath: function(parts) {
    var base = [];

    while (parts.length) {
      var directory = parts.shift();
      try {
        FS.createFolder(base.join('/'), directory, true, true);
      } catch(e) {
        // IGNORE file exists errors
      }

      base.push(directory);
    }
  },

  _ensurePath: function(filename) {
    var parts = filename.split('/');
    parts.pop();
    if (!parts.length) {
      return;
    }

    try {
      FS.stat(parts.join('/'));
      return;
    } catch(e) {
      Sass._createPath(parts);
    }
  },

  writeFile: function(filename, text) {
    var _absolute = filename.slice(0, 1) === '/';
    var path = Sass._absolutePath(filename);
    try {
      Sass._ensurePath(path);
      FS.writeFile(path, text);
      Sass._files[path] = filename;
      // create symlink for absolute path resolution
      if (_absolute) {
        Sass._ensurePath(filename);
        FS.symlink(path, filename)
      }
      return true;
    } catch(e) {
      return false;
    }
  },

  readFile: function(filename) {
    var path = Sass._absolutePath(filename);
    try {
      return FS.readFile(path, {encoding: 'utf8'});
    } catch(e) {
      return undefined;
    }
  },

  listFiles: function() {
    return Object.keys(Sass._files).map(function(path) {
      return Sass._files[path];
    });
  },

  removeFile: function(filename) {
    var _absolute = filename.slice(0, 1) === '/';
    var path = Sass._absolutePath(filename);
    try {
      FS.unlink(path);
      delete Sass._files[path];

      // undo symlink for absolute path resolution
      if (_absolute && FS.lstat(filename)) {
        FS.unlink(filename);
      }

      return true;
    } catch(e) {
      return false;
    }
  },

  compile: function(text) {
    try {
      // in C we would use char *ptr; foo(&ptr) - in EMScripten this is not possible,
      // so we allocate a pointer to a pointer on the stack by hand
      var errorPointerPointer = Module.allocate([0], 'i8', ALLOC_STACK);
      var result = Module.ccall(
        // C/++ function to call
        'sass_compile_emscripten',
        // return type
        'string',
        // parameter types
        ['string', 'number', 'number', 'string', 'i8'],
        // arguments for invocation
        [text, Sass._options.style, Sass._options.comments, Sass._path, errorPointerPointer]
      );
      // this is equivalent to *ptr
      var errorPointer = Module.getValue(errorPointerPointer, '*');
      // error string set? if not, it would be NULL and therefore 0
      if (errorPointer) {
        // pull string from pointer

        /*jshint camelcase:false*/
        errorPointer = Module.Pointer_stringify(errorPointer);
        /*jshint camelcase:true*/

        var error = errorPointer.match(/^source string:(\d+):/);
        var message = errorPointer.slice(error[0].length).replace(/(^\s+)|(\s+$)/g, '');
        // throw new Error(message, 'string', error[1]);
        return {
          line: Number(error[1]),
          message: message
        };
      }

      return result;
    } catch(e) {
      // in case libsass.js was compiled without exception support
      return {
        line: null,
        message: 'Unknown Error: you need to compile libsass.js with exceptions to get proper error messages'
      };
    }
  }
};
return Sass;
}));