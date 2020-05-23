export const isObject = o => o === Object(o) && !Array.isArray(o);

export const isArray = arr => Array.isArray(arr);

export const mergeObject = (o = {}, ...objects) => {
  const tgt = { ...o };
  if (!objects.length) return tgt;
  const [src, ...rest] = objects;
  for (const key in src) {
    if (isObject(tgt[key]) && isObject(src[key])) {
      tgt[key] = mergeObject(tgt[key], src[key]);
    } else if (isArray(tgt[key]) && isArray(src[key])) {
      tgt[key] = [...new Set([...tgt[key], ...src[key]])];
    } else {
      tgt[key] = src[key];
    }
  }
  return mergeObject(tgt, ...rest);
};

export const toObject = keys => {
  if (keys.length === 1) return keys[0];
  const o = {};
  const [head, ...rest] = keys;
  o[head] = toObject(rest);
  return o;
};
