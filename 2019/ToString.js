'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');
var $TypeError = require('es-errors/type');

// https://262.ecma-international.org/6.0/#sec-tostring

module.exports = function ToString(argument) {
	var argType = typeof argument;
	// Fast path for common primitive types that don't need conversion
	if (argType === 'string') {
		return argument;
	}
	if (argType === 'number') {
		return $String(argument);
	}
	// Check for symbol before calling $String
	if (argType === 'symbol') {
		throw new $TypeError('Cannot convert a Symbol value to a string');
	}
	return $String(argument);
};
