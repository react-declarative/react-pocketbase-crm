export const readTransform = <Result extends object>(data: Result) => {
  return Object.entries(data)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return [key, value.length ? value : null] as const;
      }
      return [key, value] as const;
    })
    .reduce((acm, [key, value]) => ({ ...acm, [key]: value }), {} as Result);
};

export default readTransform;
