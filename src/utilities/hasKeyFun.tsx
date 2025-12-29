
// #region hasKeyFun

/**
 * hasKeyFun = Has Key Function
 *
 * @summary
 * This custom function is designed to check if an object has a specific key.
 * It utilizes TypeScript's type guards to ensure type safety when accessing
 * object properties, especially for nested type narrowing checks. A good
 * example for this is checking that a particular object's keys match specific
 * keys of another object. The function takes an object and a key as parameters
 * and returns a boolean indicating whether the key exists in the object.
 *
 * @author z4ntao <https://github.com/z4nta0>
 * 
 * @param obj - The object to check for the presence of the key.
 * @param key - The key to check for in the object.
 * 
 * @returns A boolean indicating whether the key exists in the object.
 * 
 * @example
 * ```ts
 * hasKeyFun( someObj, 'someKey' ) // returns true if 'someKey' exists in someObj, false otherwise.
 * ```
 *
*/


// #region Function Body

const hasKeyFun = <T extends object, K extends PropertyKey> ( obj: T, key: K ) : obj is T & Record < K, unknown > => {

        return Object.prototype.hasOwnProperty.call( obj, key );

};

// #endregion Function Body


// #endregion hasKeyFun



export default hasKeyFun


