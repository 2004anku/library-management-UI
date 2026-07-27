export interface Profile {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  gender?: string;
  role: string;
  isActive: boolean;

  collegeId: {
    _id: string;
    collegeName: string;
    collegeCode: string;
    email: string;
    phone: string;
    website?: string;
    establishedYear?: number;
  };

  libraryId: {
    _id: string;
    libraryName: string;
    email: string;
    phone: string;

    workingHours: {
      open: string;
      close: string;
    };

    status: string;
    plan: string;
  };

  createdAt: string;
  updatedAt: string;
}
