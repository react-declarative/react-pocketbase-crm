export const hasAll = (data: Record<string, any> | Set<string>, ...keys: string[]) => {
  let isShow = true;
  if (data instanceof Set) {
    for (const key of keys) {
      isShow = isShow && data.has(key);
    }
  } else {
    for (const key of keys) {
      isShow = isShow && !!String(data[key] || "").length;
    }
  }
  return isShow;
};

export default hasAll;
