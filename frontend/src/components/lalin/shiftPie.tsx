"use client";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { axiosInstance } from "@/lib/axios.config";

Chart.register(ArcElement, Tooltip, Legend);

const ShiftPieChart = () => {
  const [shiftCounts, setShiftCounts] = useState<number[]>([0, 0]);

  const fetchShiftData = async () => {
    try {
      const response = await axiosInstance().get(
        `http://localhost:8080/api/lalins`
      );
      const rows = response.data.data.rows.rows;
      const counts = [0, 0];
      rows.forEach((row: any) => {
        if (row.Shift === 1) {
          counts[0] += 1;
        } else if (row.Shift === 2) {
          counts[1] += 1;
        }
      });

      setShiftCounts(counts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchShiftData();
  }, []);

  const pieData = {
    labels: ["Shift 1", "Shift 2"],
    datasets: [
      {
        data: shiftCounts,
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Shift Distribution</h2>
      <div className="w-full md:w-1/2 lg:w-1/3 mx-auto">
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default ShiftPieChart;
