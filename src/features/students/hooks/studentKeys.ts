export const studentKeys = {
  all: ["students"] as const,

  archived: ["students", "archived"] as const,

  detail: (id: string) => ["students", id] as const,
};
