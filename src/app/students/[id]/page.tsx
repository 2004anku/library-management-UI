"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Sidebar from "@/components/dashboard/Sidebar";
import LoadingState from "@/components/ui/loadingState";
import ErrorState from "@/components/ui/errorState";

import { getStudentProfile } from "@/features/students/services/student.service";
import { handleApiError } from "@/utils/errorHandler";

type StudentProfileData = {
  student: {
    _id: string;
    studentName: string;
    email: string;
    phone: string;
    course: string;
    semester: number;
    fine: number;
    status: "active" | "inactive";
  };
  issuedBooks: any[];
  returnedBooks: any[];
  pendingBooks: any[];
};

export default function StudentProfilePage() {
  const params = useParams();
  const router = useRouter();

  const [data, setData] = useState<StudentProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getStudentProfile(String(params.id));

        setData(response);
      } catch (error) {
        setError(handleApiError(error));
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) {
      fetchProfile();
    }
  }, [params]);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!data) {
    return <ErrorState message="Student not found" />;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <button
          onClick={() => router.back()}
          className="mb-6 px-4 py-2 rounded-xl border border-[var(--border)]"
        >
          ← Back
        </button>

        {/* STUDENT INFO */}
        <div className="rounded-2xl border border-[var(--border)] p-6 mb-6">
          <h1 className="text-3xl font-bold mb-4">
            {data.student.studentName}
          </h1>

          <div className="grid grid-cols-2 gap-4">
            <p>
              <strong>Email:</strong> {data.student.email}
            </p>

            <p>
              <strong>Phone:</strong> {data.student.phone}
            </p>

            <p>
              <strong>Course:</strong> {data.student.course}
            </p>

            <p>
              <strong>Semester:</strong> {data.student.semester}
            </p>

            <p>
              <strong>Fine:</strong> ₹{data.student.fine}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                className={
                  data.student.status === "active"
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {data.student.status}
              </span>
            </p>
          </div>
        </div>

        {/* ISSUED BOOKS */}
        <BookSection title="Issued Books" books={data.issuedBooks} />

        {/* PENDING BOOKS */}
        <BookSection title="Pending Books" books={data.pendingBooks} />

        {/* RETURNED BOOKS */}
        <BookSection title="Returned Books" books={data.returnedBooks} />
      </main>
    </div>
  );
}

function BookSection({ title, books }: { title: string; books: any[] }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      {books.length === 0 ? (
        <div className="rounded-xl border border-[var(--border)] p-4">
          No books found
        </div>
      ) : (
        <div className="rounded-xl border border-[var(--border)] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="text-left p-4">Book</th>
                <th className="text-left p-4">Author</th>
                <th className="text-left p-4">Category</th>
                <th className="text-left p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {books.map((item) => (
                <tr key={item._id} className="border-b border-[var(--border)]">
                  <td className="p-4">{item.bookId?.bookName}</td>

                  <td className="p-4">{item.bookId?.author}</td>

                  <td className="p-4">{item.bookId?.category}</td>

                  <td className="p-4">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
