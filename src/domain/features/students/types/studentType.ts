export type Student = {
  _id: string;
  studentName: string;
  email: string;
  phone: string;
  course: string;
  semester: number;
  fine: number;
  status: "active" | "inactive";
};
