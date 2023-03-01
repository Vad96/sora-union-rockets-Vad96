import mapKeys from "lodash/mapKeys";
import camelCase from "lodash/camelCase";

export const convertToCamelCase = (obj: Record<string, string | number>) => {
  return mapKeys(obj, (value, key) => camelCase(key));
};
