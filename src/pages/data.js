import React, { useState, useEffect } from "react";

const Data = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(10); // 10 items per page
  const [filter, setFilter] = useState("This week"); // Default filter

  // Fungsi untuk mengambil data hasil pencarian
  useEffect(() => {
    fetchResults();
  }, [filter, currentPage]);

  const fetchResults = async () => {
    // Contoh pengambilan data dari API, bisa diubah sesuai kebutuhan
    const response = await fetch(`API_URL?page=${currentPage}&filter=${filter}`);
    const data = await response.json();
    setSearchResults(data.results); // Asumsikan response berupa data.results
  };

  // Fungsi untuk mengubah halaman
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Fungsi untuk mengubah filter tanggal
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1); // Reset ke halaman 1 saat filter berubah
  };

  return (
    <div className="p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-4">
        <a href="/dashboard" className="text-blue-500 hover:underline">
          Back to Falcon AI Dashboard
        </a>
        <h2 className="text-xl font-semibold">Search Results for: Dogs</h2>
      </header>

      {/* Filter Tanggal */}
      <div className="mb-6 space-x-4">
        <button className={`px-4 py-2 rounded ${filter === "This week" ? "bg-blue-500 text-white" : "bg-gray-200"}`} onClick={() => handleFilterChange("This week")}>
          This week
        </button>
        <button className={`px-4 py-2 rounded ${filter === "This month" ? "bg-blue-500 text-white" : "bg-gray-200"}`} onClick={() => handleFilterChange("This month")}>
          This month
        </button>
        <button className={`px-4 py-2 rounded ${filter === "Custom" ? "bg-blue-500 text-white" : "bg-gray-200"}`} onClick={() => handleFilterChange("Custom")}>
          Choose Date
        </button>
      </div>

      {/* Tabel Hasil Pencarian */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Sentiment</th>
              <th className="border px-4 py-2 text-left">Article</th>
              <th className="border px-4 py-2 text-left">Source</th>
              <th className="border px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((result, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{result.sentiment}</td>
                <td className="border px-4 py-2">
                  <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {result.article}
                  </a>
                </td>
                <td className="border px-4 py-2">{result.source}</td>
                <td className="border px-4 py-2">{result.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {[1, 2, 3, 4].map((page) => (
          <button key={page} className={`px-4 py-2 rounded ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"}`} onClick={() => handlePageChange(page)}>
            {page}
          </button>
        ))}
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Data;
