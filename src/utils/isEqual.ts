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
  if (
    typeof lhs !== "object" ||
    lhs === null ||
    typeof rhs !== "object" ||
    rhs === null
  ) {
    return lhs === rhs;
  }

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

  if (isPlainObject(lhs) && isPlainObject(rhs)) {
    const lhsKeys = Object.keys(lhs);
    const rhsKeys = Object.keys(rhs);

    if (lhsKeys.length !== rhsKeys.length) {
      return false;
    }

    if (!lhsKeys.every((key) => key in rhs)) {
      return false;
    }

    for (const key of lhsKeys) {
      if (!isEqual(lhs[key], rhs[key])) {
        return false;
      }
    }

    return true;
  }

  return false;
}

export default isEqual;
