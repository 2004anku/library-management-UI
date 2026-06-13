export type Request = {
  _id: string;
  status: string;
  studentId?: {
    studentName?: string;
  };
  bookId?: {
    bookName?: string;
  };
};
