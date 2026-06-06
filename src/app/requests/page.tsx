export default function RequestsPage() {
  const requests = [
    {
      id: 1,
      student: "Ankit",
      book: "Java Programming",
    },
    {
      id: 2,
      student: "Kartik",
      book: "Python Basics",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">Requests</h1>

      {requests.map((request) => (
        <div key={request.id} className="border p-3 mb-3 rounded">
          <h2>{request.student}</h2>
          <p>{request.book}</p>
        </div>
      ))}
    </div>
  );
}
