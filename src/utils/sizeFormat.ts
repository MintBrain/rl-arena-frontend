export const formatFileSize = (sizeInBytes: number): string => {
  if (sizeInBytes === 0) return "0 Байт";

  const units = ["Байт", "КБ", "МБ", "ГБ", "ТБ"];
  const i = Math.floor(Math.log(sizeInBytes) / Math.log(1024));
  const formattedSize = parseFloat((sizeInBytes / Math.pow(1024, i)).toFixed(2));

  return `${formattedSize} ${units[i]}`;
};
