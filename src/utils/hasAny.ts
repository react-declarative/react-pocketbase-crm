export const hasAny = (
  data: Record<string, any> | Set<string>,
  ...keys: string[]
) => {
  let isShow = false;
  if (data instanceof Set) {
    for (const key of keys) {
      if (data.has(key)) {
        isShow = true;
        break;
      }
    }
  } else {
    for (const key of keys) {
      if (
        !!String(typeof data[key] === "boolean" ? data[key] : data[key] || "")
          .length
      ) {
        isShow = true;
        break;
      }
    }
  }
  return isShow;
};

export default hasAny;
