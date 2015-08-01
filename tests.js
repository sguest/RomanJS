/*global QUnit, roman*/
(function() {
	'use strict';

	function numberToRomanTest(number, numeral, options) {
		QUnit.test('Number ' + number + ' to Roman ' + numeral, function(assert) {
			var result = roman.toRoman(number, options);
			assert.deepEqual(result, numeral, 'Expect result to be ' + numeral);
		});
	}
	
	function romanToNumberTest(numeral, number) {
		QUnit.test('Roman ' + numeral + ' to Number ' + number, function(assert) {
			var result = roman.parseRoman(numeral);
			assert.deepEqual(result, number, 'Expect result to be ' + number);
		});
	}
	
	QUnit.module('Number to Roman basic');
	numberToRomanTest(1, 'I');
	numberToRomanTest(2, 'II');
	numberToRomanTest(3, 'III');
	numberToRomanTest(4, 'IV');
	numberToRomanTest(5, 'V');
	numberToRomanTest(6, 'VI');
	numberToRomanTest(7, 'VII');
	numberToRomanTest(8, 'VIII');
	numberToRomanTest(9, 'IX');
	numberToRomanTest(10, 'X');
	numberToRomanTest(11, 'XI');
	numberToRomanTest(12, 'XII');
	numberToRomanTest(13, 'XIII');
	numberToRomanTest(14, 'XIV');
	numberToRomanTest(15, 'XV');
	numberToRomanTest(16, 'XVI');
	numberToRomanTest(17, 'XVII');
	numberToRomanTest(18, 'XVIII');
	numberToRomanTest(19, 'XIX');
	numberToRomanTest(20, 'XX');
	numberToRomanTest(21, 'XXI');
	numberToRomanTest(40, 'XL');
	numberToRomanTest(41, 'XLI');
	numberToRomanTest(50, 'L');
	numberToRomanTest(88, 'LXXXVIII');
	numberToRomanTest(90, 'XC');
	numberToRomanTest(100, 'C');
	numberToRomanTest(400, 'CD');
	numberToRomanTest(500, 'D');
	numberToRomanTest(900, 'CM');
	numberToRomanTest(1000, 'M');
	numberToRomanTest(3999, 'MMMCMXCIX');
	numberToRomanTest(5000, 'ↁ');
	numberToRomanTest(10000, 'ↂ');
	numberToRomanTest(50000, 'ↇ');
	numberToRomanTest(100000, 'ↈ');
	numberToRomanTest(399999, 'ↈↈↈↂↈMↂCMXCIX');
	
	QUnit.module('Number to Roman invalid values');
	numberToRomanTest(400000, NaN);
	numberToRomanTest(0, NaN);
	numberToRomanTest(-1, NaN);
	numberToRomanTest('a', NaN);
	numberToRomanTest(5.5, NaN);
	numberToRomanTest(undefined, NaN);
	numberToRomanTest('5', NaN);
	numberToRomanTest('ⅦI', NaN);
	
	QUnit.module('Number to Roman combined glyphs');
	numberToRomanTest(1, 'Ⅰ', {combined: true});
	numberToRomanTest(2, 'Ⅱ', {combined: true});
	numberToRomanTest(3, 'Ⅲ', {combined: true});
	numberToRomanTest(4, 'Ⅳ', {combined: true});
	numberToRomanTest(5, 'Ⅴ', {combined: true});
	numberToRomanTest(6, 'Ⅵ', {combined: true});
	numberToRomanTest(7, 'Ⅶ', {combined: true});
	numberToRomanTest(8, 'Ⅷ', {combined: true});
	numberToRomanTest(9, 'Ⅸ', {combined: true});
	numberToRomanTest(10, 'Ⅹ', {combined: true});
	numberToRomanTest(11, 'Ⅺ', {combined: true});
	numberToRomanTest(12, 'Ⅻ', {combined: true});
	numberToRomanTest(13, 'XIII', {combined: true});
	
	QUnit.module('Number to Roman number forms');
	numberToRomanTest(1, 'Ⅰ', {forms: true});
	numberToRomanTest(2, 'ⅠⅠ', {forms: true});
	numberToRomanTest(3, 'ⅠⅠⅠ', {forms: true});
	numberToRomanTest(4, 'ⅠⅤ', {forms: true});
	numberToRomanTest(5, 'Ⅴ', {forms: true});
	numberToRomanTest(10, 'Ⅹ', {forms: true});
	numberToRomanTest(20, 'ⅩⅩ', {forms: true});
	numberToRomanTest(50, 'Ⅼ', {forms: true});
	numberToRomanTest(100, 'Ⅽ', {forms: true});
	numberToRomanTest(500, 'Ⅾ', {forms: true});
	numberToRomanTest(1000, 'Ⅿ', {forms: true});
	
	QUnit.module('Number to Roman special 1000');
	numberToRomanTest(1000, 'ↀ', {thousand: true});
	numberToRomanTest(1011, 'ↀXI', {thousand: true});
	
	QUnit.module('Number to Roman multiple options');
	numberToRomanTest(1, 'Ⅰ', {combined: true, forms: true, thousand: true});
	numberToRomanTest(4, 'Ⅳ', {combined: true, forms: true, thousand: true});
	numberToRomanTest(20, 'ⅩⅩ', {combined: true, forms: true, thousand: true});
	numberToRomanTest(1000, 'ↀ', {combined: true, forms: true, thousand: true});
	numberToRomanTest(1011, 'ↀⅩⅠ', {combined: true, forms: true, thousand: true});
	
	QUnit.module('Parse Roman basic');
	romanToNumberTest('I', 1);
	romanToNumberTest('II', 2);
	romanToNumberTest('III', 3);
	romanToNumberTest('IV', 4);
	romanToNumberTest('V', 5);
	romanToNumberTest('VI', 6);
	romanToNumberTest('VII', 7);
	romanToNumberTest('VIII', 8);
	romanToNumberTest('IX', 9);
	romanToNumberTest('X', 10);
	romanToNumberTest('XI', 11);
	romanToNumberTest('XII', 12);
	romanToNumberTest('XIII', 13);
	romanToNumberTest('XIV', 14);
	romanToNumberTest('XV', 15);
	romanToNumberTest('XVI', 16);
	romanToNumberTest('XVII', 17);
	romanToNumberTest('XVIII', 18);
	romanToNumberTest('XIX', 19);
	romanToNumberTest('XX', 20);
	romanToNumberTest('XXI', 21);
	romanToNumberTest('XL', 40);
	romanToNumberTest('XLI', 41);
	romanToNumberTest('L', 50);
	romanToNumberTest('LXXXVIII', 88);
	romanToNumberTest('XC', 90);
	romanToNumberTest('C', 100);
	romanToNumberTest('CD', 400);
	romanToNumberTest('D', 500);
	romanToNumberTest('CM', 900);
	romanToNumberTest('M', 1000);
	romanToNumberTest('MMMCMXCIX', 3999);
	romanToNumberTest('ↁ', 5000);
	romanToNumberTest('ↂ', 10000);
	romanToNumberTest('ↇ', 50000);
	romanToNumberTest('ↈ', 100000);
	romanToNumberTest('ↈↈↈↂↈMↂCMXCIX', 399999);
	romanToNumberTest('viii', 8);
	
	QUnit.module('Parse Roman invalid values');
	romanToNumberTest('IIII', NaN);
	romanToNumberTest('IC', NaN);
	romanToNumberTest('VIIII', NaN);
	romanToNumberTest('IIV', NaN);
	romanToNumberTest('IIIX', NaN);
	romanToNumberTest('IIIC', NaN);
	romanToNumberTest('A', NaN);
	romanToNumberTest('IA', NaN);
	romanToNumberTest(undefined, NaN);
	
	QUnit.module('Parse Roman combined glyphs');
	romanToNumberTest('Ⅰ', 1);
	romanToNumberTest('Ⅱ', 2);
	romanToNumberTest('Ⅲ', 3);
	romanToNumberTest('Ⅳ', 4);
	romanToNumberTest('Ⅴ', 5);
	romanToNumberTest('Ⅵ', 6);
	romanToNumberTest('Ⅶ', 7);
	romanToNumberTest('Ⅷ', 8);
	romanToNumberTest('Ⅸ', 9);
	romanToNumberTest('Ⅹ', 10);
	romanToNumberTest('Ⅺ', 11);
	romanToNumberTest('Ⅻ', 12);
	romanToNumberTest('ⅶ', 7);
	
	QUnit.module('Parse Roman extended glyphs');
	romanToNumberTest('ⅠⅠ', 2);
	romanToNumberTest('ⅤⅠⅠⅠ', 8);
	romanToNumberTest('Ⅼ', 50);
	romanToNumberTest('Ⅽ', 100);
	romanToNumberTest('Ⅾ', 500);
	romanToNumberTest('Ⅿ', 1000);
	romanToNumberTest('ⅾ', 500);
	
	QUnit.module('Parse Roman special 1000');
	romanToNumberTest('ↀ', 1000);
	romanToNumberTest('ↀↀDXI', 2511);
	
	QUnit.module('Parse Roman mixed system');
	romanToNumberTest('ⅯMↀCⅯXⅭVⅠI', 3997);
}());