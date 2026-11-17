function deepClone(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;

  if (map.has(obj)) return map.get(obj);

  if (obj instanceof Date) return new Date(obj);
  
  if (obj instanceof Map) {
    const mapCopy = new Map();
    map.set(obj, mapCopy);
    obj.forEach((value, key) => {
      mapCopy.set(deepClone(key, map), deepClone(value, map));
    });
    return mapCopy;
  }

  if (obj instanceof Set) {
    const setCopy = new Set();
    map.set(obj, setCopy);
    obj.forEach(value => {
      setCopy.add(deepClone(value, map));
    });
    return setCopy;
  }

  const clone = Object.create(Object.getPrototypeOf(obj));
  map.set(obj, clone);

  Reflect.ownKeys(obj).forEach(key => {
    clone[key] = deepClone(obj[key], map);
  });

  return clone;
}
