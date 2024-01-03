export const EXCLUDE_FIELDS_SET = new Set([
  "id",
  "collectionId",
  "collectionName",
  "created",
  "updated"
]);

export const writeTransform = <Result extends object>(data: Result) => {
  return Object.entries(data)
    .filter(([key]) => !EXCLUDE_FIELDS_SET.has(key))
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return [key, value.length ? value : null] as const;
      }
      return [key, value] as const;
    })
    .reduce((acm, [key, value]) => ({ ...acm, [key]: value }), {} as Result);
};

export default writeTransform;
