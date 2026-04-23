'use strict';

var ES = require('./index.js');

var iterations = 1000000;

function benchmark(name, fn) {
	var start = Date.now();
	for (var i = 0; i < iterations; i++) {
		fn();
	}
	var end = Date.now();
	var elapsed = (end - start) / 1000;
	var opsPerSec = iterations / elapsed;
	return { name: name, opsPerSec: opsPerSec };
}

var tests = [
	{ name: 'Type(number)', fn: function () { ES.Type(42); } },
	{ name: 'Type(string)', fn: function () { ES.Type('hello'); } },
	{ name: 'Type(object)', fn: function () { ES.Type({}); } },
	{ name: 'Type(null)', fn: function () { ES.Type(null); } },
	{ name: 'ToString(number)', fn: function () { ES.ToString(42); } },
	{ name: 'ToString(string)', fn: function () { ES.ToString('hello'); } },
	{ name: 'ToNumber(number)', fn: function () { ES.ToNumber(42); } },
	{ name: 'ToNumber(string)', fn: function () { ES.ToNumber('123'); } },
	{ name: 'IsCallable(function)', fn: function () { ES.IsCallable(function () {}); } },
	{ name: 'IsCallable(object)', fn: function () { ES.IsCallable({}); } }
];

var results = tests.map(function (test) {
	return benchmark(test.name, test.fn);
});

var totalOps = 0;
results.forEach(function (result) {
	totalOps += result.opsPerSec;
});

var avgOpsPerSec = totalOps / results.length;

// eslint-disable-next-line no-console
console.log('METRIC=' + avgOpsPerSec);
