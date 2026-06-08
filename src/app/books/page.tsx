import Sidebar from "@/components/dashboard/Sidebar";
import { books } from "../../../data/books";

export default function BooksPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-3xl font-bold">Books</h1>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search books..."
              className="border rounded-lg px-3 py-2"
            />

            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">
              + Add Book
            </button>
          </div>
        </div>

        <table className="w-full border rounded-lg overflow-hidden">
          <thead>
            <tr className="border-b bg-black-100">
              <th className="text-left p-3">ID</th>
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">Author</th>
              <th className="text-left p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="border-b">
                <td className="p-3">{book.id}</td>
                <td className="p-3">{book.title}</td>
                <td className="p-3">{book.author}</td>

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
