import api from "@/lib/axios/axios";

// ==========================================
// BOOK IMPORT
// ==========================================

export const previewBooksApi = async (file: File) => {
  const formData = new FormData();

  formData.append("file", file);

  return api.post("/admin/data-transfer/books/preview", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const importBooksApi = async (data: unknown[]) => {
  return api.post("/admin/data-transfer/books/import", {
    data,
  });
};

// ==========================================
// STUDENT IMPORT
// ==========================================

export const previewStudentsApi = async (file: File) => {
  const formData = new FormData();

  formData.append("file", file);

  return api.post("/admin/data-transfer/students/preview", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const importStudentsApi = async (data: unknown[]) => {
  return api.post("/admin/data-transfer/students/import", {
    data,
  });
};

// ==========================================
// EXPORT
// ==========================================

export const exportBooksApi = async () => {
  return api.get("/admin/data-transfer/books/export", {
    responseType: "blob",
  });
};

export const exportStudentsApi = async () => {
  return api.get("/admin/data-transfer/students/export", {
    responseType: "blob",
  });
};
