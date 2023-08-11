export const toPath = (idOrSlug: string) => {
  const yyyymmddhhmmss = idOrSlug.replaceAll("/", "");
  return [
    yyyymmddhhmmss.slice(0, 4),
    yyyymmddhhmmss.slice(4, 6),
    yyyymmddhhmmss.slice(6, 8),
    yyyymmddhhmmss.slice(8),
  ].join("/");
};

export const toDate = (idOrSlug: string) => {
  const yyyymmddhhmmss = idOrSlug.replaceAll("/", "");

  return new Date(
    `${yyyymmddhhmmss.slice(0, 4)}-${yyyymmddhhmmss.slice(
      4,
      6,
    )}-${yyyymmddhhmmss.slice(6, 8)}T${yyyymmddhhmmss.slice(
      8,
      10,
    )}:${yyyymmddhhmmss.slice(10, 12)}:${yyyymmddhhmmss.slice(12, 14)}`,
  );
};
