import { useState, useEffect } from "react"
import { CiHeart } from "react-icons/ci";

export default function BookList() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("https://openlibrary.org/search.json?q=the+lord+of+the+rings")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.docs)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching books:", error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="text-center p-8">Loading books...</div>
  }

  return (
    <div className="container mx-auto py-6">
      <table className="min-w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-4 px-4 w-[300px]">Title</th>
            <th className="text-left py-4 px-4">Ratings</th>
            <th className="text-left py-4 px-4">Category</th>
            <th className="text-left py-4 px-4">Availability</th>
            <th className="text-left py-4 px-4">Status</th>
            <th className="text-right py-4 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, idx) => (
            <tr key={idx} className="border-b">
              <td className="py-4 px-4">
                <div className="flex items-center gap-4">
                  {book.cover_i ? (
                    <img
                      src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                      alt={book.title}
                      className="h-16 w-12 object-cover rounded"
                    />
                  ) : (
                    <div className="h-16 w-12 bg-gray-200 flex items-center justify-center rounded">
                      No cover
                    </div>
                  )}
                  <div>
                    <div className="font-medium">{book.title}</div>
                    <div className="text-sm text-gray-500">
                      {book.author_name?.[0]} {book.first_publish_year && `, ${book.first_publish_year}`}
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4">
                {book.ratings_average ? book.ratings_average.toFixed(1) : "0"}/<span className="text-[12px]">5</span>
              </td>
              <td className="py-4 px-4">Computer Science</td>
              <td className="py-4 px-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    Hard Copy
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    E-Book
                  </div>
                </div>
              </td>
              <td className="py-4 px-4">
                <span className="px-2 py-1 rounded-full text-sm bg-green-100 text-green-600">
                  In-Shelf
                </span>
              </td>
              <td className="py-4 px-4 text-right">
                <div className="flex justify-end gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <CiHeart className="h-4 w-4" />
                  </button>
                  <button className="text-blue-500 hover:text-blue-600">
                    Preview
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}