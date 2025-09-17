import { AnyObject } from './types';

/**
 * Checks if an object is empty (has no own enumerable properties and is a plain object).
 *
 * @param obj - The object to check
 * @returns True if the object is empty, false otherwise
 */
export const isEmpty = (obj: object): boolean => {
  return Object.keys(obj || {}).length === 0 && obj.constructor === Object;
};

/**
 * Gets a value from an object using a dot-separated path string.
 * Supports nested objects and arrays with bracket notation.
 *
 * @param obj - The object to traverse
 * @param path - The path to the property (e.g., 'a.b[0].c')
 * @param defaultValue - Value to return if path is not found
 * @returns The value at the path or the default value
 */
export const get = <T = unknown>(
  obj: AnyObject,
  path: string,
  defaultValue: T | undefined = undefined,
): T | undefined => {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res: AnyObject, key: string) =>
          res !== null && res !== undefined ? res[key] : res,
        obj,
      );
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return (result === undefined || result === obj ? defaultValue : result) as T;
};
