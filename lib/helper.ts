import { AnyObject } from './types';

export const isEmpty = (obj: object): boolean => {
  return Object.keys(obj || {}).length === 0 && obj.constructor === Object;
};

export const get = <T = object>(
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
