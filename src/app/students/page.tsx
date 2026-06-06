export default function StudentsPage() {
  const students = [
    {
      id: 1,
      name: "Ankit",
      course: "BCA",
    },
    {
      id: 2,
      name: "Kartik",
      course: "BCA",
    },
    {
      id: 3,
      name: "Ashish",
      course: "BCA",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">Students</h1>

      {students.map((student) => (
        <div key={student.id} className="border p-3 mb-3 rounded">
          <h2>{student.name}</h2>
          <p>{student.course}</p>
        </div>
      ))}
    </div>
  );
}
