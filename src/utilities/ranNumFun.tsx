
// #region ranNumFun

/**
 * hasKeyFun = Has Key Function
 *
 * @summary
 * This custom function will generate a random number between the provided
 * minimum and maximum values. This is inclusive of both the minimum and maximum
 * values. It utilizes JavaScript's built in Math.random() function to generate
 * the random number, and Math.round() to round the result to the nearest whole
 * number.
 *
 * @author z4ntao <https://github.com/z4nta0>
 * 
 * @param maxNum - The maximum value of the random number.
 * @param minNum - The minimum value of the random number.
 * 
 * @returns A random number between, and including, the minimum and maximum values.
 * 
 * @example
 * ```ts
 * ranNumFun( { maxNum : 10, minNum : 1 } ) // returns a random number between 1 and 10, inclusive.
 * ```
 *
*/


// #region Function Type Declarations


/**
 * RanNumFunPar = Random Number Function Parameter will store the maximum and minimum number constraints (inclusive) for generating a random number.
 *
 * @property maxNum = Maximum Number will store the number for establishing the maximum value constraint for the random number, inclusive.
 * @property minNum = Minimum Number will store the number for establishing the minimum value constraint for the random number, inclusive.
 *
*/

type RanNumFunPar = {

    maxNum : number;
    minNum : number;

};

/** Random Number Function = This function will generate and return a random number using the provided parameters as its constraints. */
type RanNumFun             = ( ranNumFunPar : RanNumFunPar ) => number;


// #endregion Function Type Declarations



// #region Function Body

const ranNumFun : RanNumFun = ( { maxNum, minNum } ) => {

    /** The Math.round() function is a Javascript static method that returns the value of a number rounded to the nearest integer. Numbers with a fractional part of 0.5 or greater are rounded up, and numbers less than 0.5 are rounded down. */
    /** The Math.random() function is Javascript static method that generates a pseudo random floating point number that is greater than or equal to 0 and less than 1 (inclusive of 0, but exclusive of 1). */
    /** minNum is added at the beginning so that even the smallest random number that is generated will evaluate to at least minNum (example, 0.001 will be added to minNum and then rounded down to minNum). */
    /** The expression ( maxNum - minNum ) is multiplied to Math.random() so that it scales the random number that is generated (it will always a floating point number between 0 and 1) to the desired range. */
    return Math.round( minNum  + Math.random() * ( maxNum - minNum ) );

};

// #endregion Function Body


// #endregion ranNumFun



export default ranNumFun;


