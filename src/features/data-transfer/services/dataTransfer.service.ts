import {
  previewBooksApi,
  importBooksApi,
  previewStudentsApi,
  importStudentsApi,
  exportBooksApi,
  exportStudentsApi,
} from "../api/dataTransferApi";

// ==========================================
// BOOKS
// ==========================================

export const previewBooks = async (file: File) => {
  const response = await previewBooksApi(file);

  return response.data;
};

export const importBooks = async (data: unknown[]) => {
  const response = await importBooksApi(data);

  return response.data;
};

// ==========================================
// STUDENTS
// ==========================================

export const previewStudents = async (file: File) => {
  const response = await previewStudentsApi(file);

  return response.data;
};

export const importStudents = async (data: unknown[]) => {
  const response = await importStudentsApi(data);

  return response.data;
};

// ==========================================
// EXPORT
// ==========================================

export const exportBooks = async () => {
  const response = await exportBooksApi();

  return response.data;
};

export const exportStudents = async () => {
  const response = await exportStudentsApi();

  return response.data;
};
