/*global define*/

//load module via AMD if present, commonJS if present, and browser global
//https://github.com/umdjs/umd/blob/master/commonjsStrictGlobal.js
(function(root, factory) {
  'use strict';
  
  if(typeof define === 'function' && define.amd) {
    //AMD. Register as an anonymous module.
    define(['exports'], function(exports) {
      //also export browser global
      factory((root.roman = exports));
    });
  }
  else if(typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    //CommonJS
    factory(exports);
  }
  else {
    //Browser globals
    factory((root.roman = {}));
  }
}(this, function(exports) {
	'use strict';
	
	//default numerals used for conversion, basic latin letters where possible
	//number forms unicode for higher values that do not have a basic latin equivalent
	var baseNumerals = ['I', 'V', 'X', 'L', 'C', 'D', 'M', 'ↁ', 'ↂ', 'ↇ', 'ↈ'];
	//numerals used for full number forms unicode conversion
	var numeralsUnicode = ['Ⅰ', 'Ⅴ', 'Ⅹ', 'Ⅼ', 'Ⅽ', 'Ⅾ', 'Ⅿ', 'ↁ', 'ↂ', 'ↇ', 'ↈ'];
	//special thousands identifier that is consistent with higher numbers, used optionally
	var specialThousand = 'ↀ';
	//single-glyph representations of 1-12
	var combinedNumerals = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ', 'Ⅷ', 'Ⅸ', 'Ⅹ', 'Ⅺ', 'Ⅻ'];
	
	//convert a single decimal digit to its' roman equivalent
	//nums should be a 3-element array containing the numerals for "1", "5", and "10" for the current decimal digit
	//for example ['I', 'V', 'X'] or ['X', 'L', 'C']
	function digitToRoman(digit, nums) {
		//4 and 9 are special cases, just handle them individually
		if(digit === 4) {
			return nums[0] + nums[1];
		}
		else if(digit === 9) {
			return nums[0] + nums[2];
		}
		
		//anything other than 4 and 9 can be handlded by fairly similar logic
		//note that 0 also falls through here and comes back as an empty string
		else {
			var result = '';
			//5-8 are treated as 0-3 with an extra "5" character at the front
			if(digit >= 5) {
				result = nums[1];
				digit -= 5;
			}
			
			//append "1" numerals onto the end as necessary
			while(digit > 0) {
				result += nums[0];
				digit--;
			}
			return result;
		}
	}
	
	//find the index in the numeral array corresponding to the supplied character
	//will find the value in the base numerals array, the number forms unicode array, or the special 1000 character
	function getNumeralIndex(character) {
		//special thousand character handling
		if(character === 'ↀ') {
			return 6;
		}
		//check for base numeral value
		var index = baseNumerals.indexOf(character);
		if(index !== -1) {
			return index;
		}
		//return number forms numeral value, which will fall back to -1 if not found
		return numeralsUnicode.indexOf(character);
	}

	//Public functions
	
	//convert a number to its' roman numeral representation
	//accepted options:
	//	combined: will combine numbers 1-2 to their corresponding single-glyph unicode representation
	//	forms: will use exclusively glyphs from the number forms unicode block
	//	thousand: will use the special character ↀ to represent 1000 for consistency with larger glyphs
	function toRoman(number, options) {
		options = options || {};
		//assumed the largest glyph will be of the "1 or 10" not the "5" variety
		//max value is then the number that is 4 times the largest glyph, because it would need the next "5" value to display
		//note that max value is actually the smallest value that CANNOT be displayed. The maximum value that can be displayed is maxValue - 1
		var maxValue = Math.pow(10, baseNumerals.length / 2 - 0.5) * 4;
		//ensure that we are actually dealing with an integer and that it is positive and less than the max value
		if(number >= maxValue || number <= 0 || Math.floor(number) !== number) {
			return NaN;
		}
		
		//display combined glyph if specified in options and the number is small enough to have a combined glyph
		if(options.combined && number <= 12) {
			return combinedNumerals[number - 1];
		}
		
		//select either basic or number forms glyph set based on options provided
		var numerals;
		if(options.forms) {
			numerals = numeralsUnicode;
		}
		else {
			numerals = baseNumerals;
		}
		
		//if the special thousand option is specified, swap out the 1000 glyph in the requested character set
		if(options.thousand) {
			numerals = numerals.slice(0);
			numerals[6] = specialThousand;
		}
		
		var result = '';
		var numeralIndex = 0;
		
		//convert one digit at a time it's roman numeral representation
		while(number > 0) {
			result = digitToRoman(number % 10, numerals.slice(numeralIndex, numeralIndex + 3)) + result;
			number = Math.floor(number / 10);
			//advance 2 spots through the numeral array each time so that we are dealing with the correct next 1/5/10 set
			numeralIndex += 2;
		}
		return result;
	}
	
	//parse a roman numeral into its' numeric representation
	//accepts basic latin letters as well as glyphs from the unicode number forms block,
	//both individual number forms glyphs and the combined 1-12 versions
	function parseRoman(numeral) {
		//null/undefined check (other falsy values like empty string and zero are also invalid and return NaN so this check is fine)
		if(!numeral) {
			return NaN;
		}
		//normalize any input value to its' upper-case string representation
		numeral = numeral.toString().toUpperCase();
		
		//check if the value passed in was one of the 1-12 combined glyphs, if so return the corresponding value
		var combinedIndex = combinedNumerals.indexOf(numeral);
		if(combinedIndex !== -1) {
			return combinedIndex + 1;
		}
		
		//initialize index to the length of the numeral array, this is because the parsing logic ensures we are
		//always dealing with descending numerals (IIIX is invalid, not 13) so we want to ensure we start off
		//with a larger index than is possible
		var numeralIndex = baseNumerals.length;
		var result = 0;
		var digit;
		
		while(numeral.length) {
			//check that we're dealing with numerals in descending order, otherwise the number is invalid
			var lastIndex = numeralIndex;
			numeralIndex = getNumeralIndex(numeral[0]);
			if(numeralIndex > lastIndex) {
				return NaN;
			}
			
			if(numeralIndex === -1) {
				//invalid character
				return NaN;
			}
			
      var nextIndex;
      var oneIndex;
			numeral = numeral.substring(1);
      if(numeralIndex %2 === 0) {
        //"1" (or "10") digit
        nextIndex = getNumeralIndex(numeral[0]);
        
        //handle 9 special case and set oneIndex flag to -1 so that we don't grab more ones after
        if(nextIndex === numeralIndex + 2) {
          digit = 9;
          numeral = numeral.substring(1);
          oneIndex = -1;
        }
        
        //handle 4 special case and set oneIndex flag to -1 so that we don't grab more ones after
        else if(nextIndex === numeralIndex + 1) {
          digit = 4;
          numeral = numeral.substring(1);
          oneIndex = -1;
        }
        
        //not a 4 or a 9, so this is a 1, 2, 3
        else {
          digit = 1;
          oneIndex = numeralIndex;
        }
      }
      else {
        //"5" digit
        digit = 5;
        numeralIndex--;
        oneIndex = numeralIndex;
      }
      
      //going from a 1 or 5, grab any subsequent 1s and increment the digit
      if(oneIndex !== -1 && numeral.length) {
        do {
          nextIndex = getNumeralIndex(numeral[0]);
          
          if(nextIndex === numeralIndex) {
            digit++;
            numeral = numeral.substring(1);
          }
          
          //if we've reached 4 or 9 there were 4 ones in a row which is invalid
          if(digit === 4 || digit === 9) {
            return NaN;
          }
        }while (nextIndex === numeralIndex && numeral.length);
      }
      
      //the current digit has been determined, add it to the result with the proper power of 10
      result += digit * Math.pow(10, numeralIndex / 2);
		}
	
		return result;
	}
	
  exports.toRoman = toRoman;
  exports.parseRoman = parseRoman;
}));