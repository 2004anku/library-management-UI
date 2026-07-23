export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;

  collegeId: string | null;
  libraryId: string | null;

  collegeName: string;
  libraryName: string;
}
