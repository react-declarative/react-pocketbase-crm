import readTransform from "./readTransform";

export const listTransform = <Result extends object>(
  documents: Result[]
): Result[] => {
  return documents.map((v) => readTransform<Result>(v));
};

export default listTransform;
