"use client";

import React, { useState, useEffect } from "react";
import { axiosInstance } from "@/lib/axios.config";
import { IoMdAdd } from "react-icons/io";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";

interface Gerbang {
  id: number;
  IdCabang: number;
  NamaCabang: string;
  NamaGerbang: string;
}

const GerbangTable: React.FC = () => {
  const [data, setData] = useState<Gerbang[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance().get("/gerbangs");
        const responseData = response.data.data.rows.rows;
        setData(responseData);
        console.log("dataa", responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const handleDelete = async (id: number, IdCabang: number) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (confirmed.isConfirmed) {
      try {
        await axiosInstance().delete("/gerbangs", {
          data: { id, IdCabang },
        });
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Gerbang has been deleted.",
        });
        window.location.reload();
      } catch (error) {
        console.error("Error deleting data:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete Gerbang.",
        });
      }
    }
  };

  const handleAddGerbang = () => {
    router.push("/dashboard/gerbang/create");
  };
  const handleEditGerbang = (id: number, IdCabang: number) => {
    router.push(`/dashboard/gerbang/edit?id=${id}&IdCabang=${IdCabang}`);
  };
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Master Data Gerbang</h1>
      <div className="mb-4 flex flex-row justify-between">
        <div className="flex flex-row">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-md p-2"
          />
          <button className="ml-4 bg-blue-500 text-white p-2 rounded-md">
            Search
          </button>
        </div>
        <button className="ml-4 bg-blue-500 text-white p-2 rounded-md">
          <IoMdAdd onClick={handleAddGerbang} />
        </button>
      </div>

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">No.</th>
            <th className="py-2 px-4 border-b">Nama Cabang</th>
            <th className="py-2 px-4 border-b">Gerbang</th>
            <th className="py-2 px-4 border-b">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{item.NamaCabang}</td>{" "}
              <td className="py-2 px-4 border-b">{item.NamaGerbang}</td>{" "}
              <td className="py-2 px-4 border-b">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => handleEditGerbang(item.id, item.IdCabang)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-500 hover:underline ml-2"
                  onClick={() => handleDelete(item.id, item.IdCabang)}
                >
                  <MdDelete />
                </button>
                <button className="text-green-500 hover:underline ml-2">
                  <FaEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GerbangTable;
