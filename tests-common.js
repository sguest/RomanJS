/*global QUnit, exports*/
(function() {
  'use strict';
  
  QUnit.test('Loaded via common.js exports', function(assert) {
    var result = exports.toRoman(1);
    assert.deepEqual(result, 'I', 'Expect result to be I');
    result = exports.parseRoman('I');
    assert.deepEqual(result, 1, 'Expect result to be 1');
  });
  
  QUnit.test('Global should not be present', function(assert) {
    assert.deepEqual(typeof roman, 'undefined', 'global roman should be undefined');
  });
}());