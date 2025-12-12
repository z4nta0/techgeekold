// #region hasKeyFun

/**
 ** This is a custom type guard function to check if an object has a specific key.
 ** It helps TypeScript understand the types better when accessing object properties dynamically,
 ** because the hasOwnProperty() method does not provide enough type information.
 **
 ** @param obj = The object to check for the key
 ** @param key = The key to check for in the object
 ** @returns   = True if the object has the key, false otherwise
 **
 **/

// #region Function Body

export const hasKeyFun = <T extends object, K extends PropertyKey> ( obj: T, key: K ) : obj is T & Record < K, unknown > => {

        return Object.prototype.hasOwnProperty.call( obj, key );

};

// #endregion Function Body

// #endregion hasKeyFun


