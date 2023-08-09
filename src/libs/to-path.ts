export const toPath = (idOrSlug: string) => {
  const yyyymmddhhmmss = idOrSlug.replaceAll("/", "");
  return [
    yyyymmddhhmmss.slice(0, 4),
    yyyymmddhhmmss.slice(4, 6),
    yyyymmddhhmmss.slice(6, 8),
    yyyymmddhhmmss.slice(8),
  ].join("/");
};
