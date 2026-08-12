export type ImportPreviewRow = {
  rowNumber: number;
  data: Record<string, unknown>;
  errors: string[];
  valid: boolean;
};

export type ImportPreviewResponse = {
  success: boolean;
  totalRows: number;
  validRows: number;
  invalidRows: number;
  data: ImportPreviewRow[];
};

export type ImportResponse = {
  success: boolean;
  message: string;
  summary: {
    totalRows: number;
    inserted: number;
    skipped: number;
  };
  skippedBooks?: unknown[];
  skippedStudents?: unknown[];
};
