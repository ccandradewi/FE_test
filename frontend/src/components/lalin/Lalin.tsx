"use client";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios.config";

const DataTable = () => {
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);
  const [pageGroup, setPageGroup] = useState<number>(0);
  const fetchData = async (page: number) => {
    try {
      const response = await axiosInstance().get(
        `http://localhost:8080/api/lalins?limit=${limit}&page=${page}`
      );
      console.log("testt", response);

      setData(response.data.data.rows.rows);
      setTotalPages(response.data.data.total_pages);
      console.log("Total Pages:", response.data.data.total_pages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const handleNextGroup = () => {
    if (pageGroup + 5 < totalPages) {
      setPageGroup(pageGroup + 5);
      setCurrentPage(pageGroup + 6);
    }
  };

  const handlePreviousGroup = () => {
    if (pageGroup - 5 >= 0) {
      setPageGroup(pageGroup - 5);
      setCurrentPage(pageGroup);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = pageGroup + 1;
    const endPage = Math.min(pageGroup + 5, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Data Table</h1>
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr>
            <th className="border-b">ID</th>
            <th className="border-b">IdCabang</th>
            <th className="border-b">IdGerbang</th>
            <th className="border-b">Tanggal</th>
            <th className="border-b">Shift</th>
            <th className="border-b">Golongan</th>
            <th className="border-b">Tunai</th>
            <th className="border-b">eMandiri</th>
            {/* Tambahkan kolom lain sesuai kebutuhan */}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td className="border-b">{row.id}</td>
              <td className="border-b">{row.IdCabang}</td>
              <td className="border-b">{row.IdGerbang}</td>
              <td className="border-b">
                {new Date(row.Tanggal).toLocaleDateString()}
              </td>
              <td className="border-b">{row.Shift}</td>
              <td className="border-b">{row.Golongan}</td>
              <td className="border-b">{row.Tunai}</td>
              <td className="border-b">{row.eMandiri}</td>
              {/* Tambahkan data lain sesuai kebutuhan */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center mt-4 space-x-2">
        {/* Tombol Previous Group */}
        <button
          onClick={handlePreviousGroup}
          className={`px-4 py-2 mx-1 text-white rounded ${
            pageGroup === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
          }`}
          disabled={pageGroup === 0}
        >
          Previous
        </button>

        {renderPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`px-4 py-2 mx-1 text-white rounded ${
              currentPage === pageNumber ? "bg-blue-700" : "bg-blue-500"
            }`}
          >
            {pageNumber}
          </button>
        ))}

        <button
          onClick={handleNextGroup}
          className={`px-4 py-2 mx-1 text-white rounded ${
            pageGroup + 5 >= totalPages
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500"
          }`}
          disabled={pageGroup + 5 >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
