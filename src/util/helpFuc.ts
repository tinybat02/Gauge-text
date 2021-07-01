export const processData = (buffer: number[]) => {
  return buffer.reduce((total, elm) => total + elm, 0);
};
