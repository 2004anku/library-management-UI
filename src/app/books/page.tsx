export default function BooksPage() {
  const books = [
    {
      id: 1,
      title: "Java Programming",
      author: "James Gosling",
    },
    {
      id: 2,
      title: "Python Basics",
      author: "Guido",
    },
    {
      id: 3,
      title: "React Guide",
      author: "Meta",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">Books</h1>

      {books.map((book) => (
        <div key={book.id} className="border p-3 mb-3 rounded">
          <h2>{book.title}</h2>
          <p>{book.author}</p>
        </div>
      ))}
    </div>
  );
}
