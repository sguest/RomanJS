RomanJS
=

Javascript roman numeral library with robust unicode support.

**Usage**

Download and use [roman.js](https://github.com/sguest/RomanJS/blob/master/roman.js)

A global object `roman` will be created with functions `toRoman` and `parseRoman`.

```JavaScript
roman.parseRoman('I');  //1
roman.toRoman(1);       //I
```

These functions will also be available exported as an AMD module or a CommonJS module if those environments are present.

**parseRoman(numeral)**

Takes a string representing a roman numeral and converts to its' number representation. Returns `NaN` on any invalid input.

Supports basic latin letters as well as symbols from the Unicode Number Forms block (U+2160 - U+2188).

Wikipedia has a handy [Reference](https://en.wikipedia.org/wiki/Numerals_in_Unicode#Roman_numerals) on Unicode roman numerals.

Supports both multiple number forms glyphs, as well as the combined-symbol glyphs from 1-12 (U+1260 - U+216B).

Parsing is case-insensitive, lower-case input works the same as uppercase.

```JavaScript
roman.parseRoman('VIII');   //8
roman.parseRoman('ⅤⅠⅠⅠ');    //8
roman.parseRoman('Ⅷ');     //8
roman.parseRoman('viii');   //8
```

**toRoman(number, [options])**

Convert a number to its' roman numeral representation. Default behavior is to use basic latin letters where possible
for maximum compatibility. The exception is for symbols for 5,000 and greater which do not have basic latin letter
representations and therefore use symbols from the Unicode Number Forms block.

```Javascript
roman.toRoman(8);     //VIII
roman.toRoman(11111); //ↂMCXI
```

Maximum value that can be converted is 399,999 because any higher value would require a symbol for 500,000
which does not have a commonly-accepted representation and therefore does not have a unicode glyph.

Any provided value that is not an integer from 1 to 399,999 inclusive will return `NaN`

This function will also accept an optional options hash, which supports 3 boolean options: `thousand`, `combined`, and `forms`

`thousand`: Uses the symbol `ↀ` (U+2180)  instead of `M` for the thousands indicator for consistency with the 5000+ symbols

```Javascript
roman.toRoman(1111, {thousand: true});  //ↀCXI
```

`combined`: Uses the combined glyphs (U+1260 - U+216B) for numbers 1-12

```Javascript
roman.toRoman(8, {combined: true});   //Ⅷ
```

`forms`: Uses symbols from the Unicode Number Forms block instead of basic latin letters for all values.
This option has a lower precedence than `thousand` or `combined` in cases where both could apply.

```Javascript
roman.toRoman(8, {forms: true});  //ⅤⅠⅠⅠ
```

`toRoman()` will always return upper-case results. In order to get a lower-case representation, simply call `toLowerCase()` on the result.
`toLowerCase()` behaves as expected even when using symbols from the Number Forms block.

```Javascript
roman.toRoman(8, {forms: true}).toLowerCase();    //ⅴⅰⅰⅰ
roman.toRoman(8, {combined: true}).toLowerCase(); //ⅷ
```

**Environment/Browser support**

The library has no dependencies and should work across a variety of environments (including Node) and all modern browsers.

The library does make use of `Array#indexOf` and some old browsers (such as IE8 and below) do not support this method,
therefore such browsers will need a polyfill, which is not part of this library. 
[MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) has an
example polyfill for this function.

**License**

[MIT License] (http://opensource.org/licenses/MIT)
