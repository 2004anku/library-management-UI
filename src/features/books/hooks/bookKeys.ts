export const bookKeys = {
  all: ["books"] as const,

  archived: ["books", "archived"] as const,

  detail: (bookId: string) => ["books", bookId] as const,
};
