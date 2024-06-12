// NOTE: `idOrSlug` is `yyyymm/dd/hhmmss`.
// `post-v1.id` and `post-v2.slug` are same format.

export const toPath = (idOrSlug: string) => {
  const yyyymmddhhmmss = idOrSlug.replaceAll("/", "");

  return [
    yyyymmddhhmmss.slice(0, 4), // yyyy
    yyyymmddhhmmss.slice(4, 6), // mm
    yyyymmddhhmmss.slice(6, 8), // dd
    yyyymmddhhmmss.slice(8), // hhmmss
  ].join("/");
};

export const toDate = (idOrSlug: string) => {
  const yyyymmddhhmmss = idOrSlug.replaceAll("/", "");
  const [yyyy, mm, dd, hh, mm_, ss] = [
    yyyymmddhhmmss.slice(0, 4),
    yyyymmddhhmmss.slice(4, 6),
    yyyymmddhhmmss.slice(6, 8),
    yyyymmddhhmmss.slice(8, 10),
    yyyymmddhhmmss.slice(10, 12),
    yyyymmddhhmmss.slice(12, 14),
  ];

  // `idOrSlug` is JST date string, add timezone offset
  return new Date(`${yyyy}-${mm}-${dd}T${hh}:${mm_}:${ss}+09:00`);
};
