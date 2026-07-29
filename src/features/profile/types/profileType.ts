export interface College {
  _id: string;
  collegeName: string;
  collegeCode: string;
  email: string;
  phone: string;
  website?: string;
  establishedYear?: number;
}

export interface Library {
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
}

export interface Profile {
  _id: string;

  fullName: string;
  email: string;
  phone?: string;

  gender?: "male" | "female" | "other";

  role: "library-admin";

  isActive: boolean;

  collegeId: College;

  libraryId: Library;

  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfilePayload {
  fullName: string;

  phone?: string;

  gender?: "male" | "female" | "other";
}
