'use strict';

var isObject = require('es-object-atoms/isObject');

// https://262.ecma-international.org/5.1/#sec-8

module.exports = function Type(x) {
	// Fast-path for most common primitives using typeof
	var t = typeof x;
	if (t === 'number') {
		return 'Number';
	}
	if (t === 'string') {
		return 'String';
	}
	if (t === 'undefined') {
		return 'Undefined';
	}
	if (t === 'boolean') {
		return 'Boolean';
	}
	// null check after primitives
	if (x === null) {
		return 'Null';
	}
	// Object check last (requires function call)
	if (isObject(x)) {
		return 'Object';
	}
};
