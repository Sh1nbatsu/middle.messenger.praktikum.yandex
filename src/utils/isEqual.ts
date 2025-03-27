type PlainObject<T = unknown> = {
  [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === "object" &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
}

function isEqual(lhs: unknown, rhs: unknown): boolean {
  // Проверка на примитивы
  if (
    typeof lhs !== "object" ||
    lhs === null ||
    typeof rhs !== "object" ||
    rhs === null
  ) {
    return lhs === rhs;
  }

  // Проверка на массивы
  if (Array.isArray(lhs) && Array.isArray(rhs)) {
    if (lhs.length !== rhs.length) {
      return false;
    }

    for (let i = 0; i < lhs.length; i++) {
      if (!isEqual(lhs[i], rhs[i])) {
        return false;
      }
    }

    return true;
  }

  // Объекты проверяем только если оба значения - объекты
  if (isPlainObject(lhs) && isPlainObject(rhs)) {
    const lhsKeys = Object.keys(lhs);
    const rhsKeys = Object.keys(rhs);

    if (lhsKeys.length !== rhsKeys.length) {
      return false;
    }

    // Проверяем, что все ключи из lhs существуют в rhs
    if (!lhsKeys.every((key) => key in rhs)) {
      return false;
    }

    // Проверяем значения для каждого ключа
    for (const key of lhsKeys) {
      if (!isEqual(lhs[key], rhs[key])) {
        return false;
      }
    }

    return true;
  }

  // Если один объект, а другой массив - они не равны
  return false;
}

export default isEqual;
