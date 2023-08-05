export const serialize = function(obj: any = {}) {
  const str: string[] = [];
  Object.keys(obj).forEach((key: string) => {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
      str.push(`${encodeURIComponent(key)  }=${  encodeURIComponent(obj[key])}`);
    }
  });
  return str.join("&");
};
