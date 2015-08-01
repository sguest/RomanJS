/*global QUnit, roman, requirejs*/
requirejs(['roman'], function(romanAmd) {
  'use strict';
  
  QUnit.test('Loaded via AMD', function(assert) {
    var result = romanAmd.toRoman(1);
    assert.deepEqual(result, 'I', 'Expect result to be I');
    result = romanAmd.parseRoman('I');
    assert.deepEqual(result, 1, 'Expect result to be 1');
  });
  
  QUnit.test('Global still works in the presence of AMD', function(assert) {
    var result = roman.toRoman(1);
    assert.deepEqual(result, 'I', 'Expect result to be I');
    result = roman.parseRoman('I');
    assert.deepEqual(result, 1, 'Expect result to be 1');
  });
});