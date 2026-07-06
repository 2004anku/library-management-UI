export const requestKeys = {
  all: ["requests"] as const,

  detail: (id: string) => ["requests", id] as const,
};
