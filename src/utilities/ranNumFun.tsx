// #region ranNumFun

/**
 ** This will generate a random number between the provided minimum and maximum values.
 ** 
 ** @param maxNum = The maximum value of the random number
 ** @param minNum = The minimum value of the random number
 ** @returns      = The generated random number
 **
 **/

// #region Type Declarations

// random number function parameters = parameters provided to this function when called
type RanNumFunPar = {

    maxNum : number; // maximum number = number for establishing the maximum value of the random number, exclusive
    minNum : number; // minimum number = number for establishing the minimum value of the random number, inclusive

};

type RanNumFun    = ( ranNumFunPar : RanNumFunPar ) => RanNumFunRet; // random number function        = generate and return a random number using the provided parameters
type RanNumFunRet = number;                                          // random number function return = number generated randomly between a minimum and maximum value

// #endregion Type Declarations



// #region Function Body

export const ranNumFun : RanNumFun = ( { maxNum, minNum } ) => {

    return Math.round( minNum  + Math.random() * ( maxNum - minNum ) );

};

// #endregion Function Body

// #endregion ranNumFun