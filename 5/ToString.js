'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	// Fast path for strings - no conversion needed
	if (typeof value === 'string') {
		return value;
	}
	return $String(value);
};

