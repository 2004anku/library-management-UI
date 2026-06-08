import Sidebar from "@/components/dashboard/Sidebar";
import { students } from "../../../data/student";

export default function StudentsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-3xl font-bold">Students</h1>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search students..."
              className="border rounded-lg px-3 py-2"
            />

            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">
              + Add Student
            </button>
          </div>
        </div>

        <table className="w-full border rounded-lg overflow-hidden">
          <thead>
            <tr className="border-b ">
              <th className="text-left p-3">ID</th>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Course</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Phone</th>
              <th className="text-left p-3">Semester</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b">
                <td className="p-3">{student.id}</td>
                <td className="p-3">{student.name}</td>
                <td className="p-3">{student.course}</td>
                <td className="p-3">{student.email}</td>
                <td className="p-3">{student.phone}</td>
                <td className="p-3">{student.semester}</td>

                <td className="p-3">
                  <div className="flex gap-2">
                    <button className="border px-3 py-1 rounded ">Edit</button>

                    <button className="border px-3 py-1 rounded ">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
