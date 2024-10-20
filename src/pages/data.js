import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSmile, FaMeh, FaFrown } from "react-icons/fa"; // Importing icons
import Navbar from "./Navbar";

const Data = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(10); // 10 items per page
  const [filter, setFilter] = useState("This week"); // Default filter

  useEffect(() => {
    fetchResults();
  }, [filter, currentPage]);

  const fetchResults = () => {
    axios
      .get(`https://ai.oigetit.com/AI71/Articles?json=%7B`)
      .then((response) => {
        const data = response.data.result; // Sesuaikan dengan struktur respons dari API
        console.log(data);

        setSearchResults(data || []); // Mengambil properti result dari respons
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1); // Reset ke halaman 1 saat filter berubah
  };

  // Function to render sentiment icons
  const renderSentimentIcons = (sentimentValue) => {
    if (sentimentValue >= 3) {
      return (
        <>
          <FaSmile className="text-green-500" />
          <FaSmile className="text-green-500" />
          <FaSmile className="text-green-500" />
        </>
      );
    } else if (sentimentValue === 2) {
      return (
        <>
          <FaSmile className="text-green-500" />
          <FaSmile className="text-green-500" />
        </>
      );
    } else if (sentimentValue === 1) {
      return <FaSmile className="text-green-500" />;
    } else if (sentimentValue === 0) {
      return <FaMeh className="text-yellow-500" />;
    } else if (sentimentValue <= -1) {
      return <FaFrown className="text-red-500" />;
    }
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-4">
          <a href="/" className="text-blue-500 hover:underline">
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
            <tbody className="border">
              {searchResults.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage).map((result, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border-b ps-4 py-3 flex gap-2 h-full">{renderSentimentIcons(result.happiness)}</td>
                  <td className="border px-4 py-2">{result.title || "No description available"}</td>
                  <td className="border px-4 py-2">{result.feed}</td>
                  <td className="border px-4 py-2">{result.pubdate}</td>
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
    </>
  );
};

export default Data;
