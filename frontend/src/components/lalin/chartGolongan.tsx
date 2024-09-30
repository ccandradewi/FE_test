"use client";

import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { axiosInstance } from "@/lib/axios.config";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DataRow {
  id: number;
  Golongan: number;
}

const BarChart: React.FC = () => {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance().get("/lalins");
        const rows: DataRow[] = response.data.data.rows.rows;
        const golonganCount: { [key: number]: number } = {};
        rows.forEach((row) => {
          const golongan = row.Golongan;
          if (golonganCount[golongan]) {
            golonganCount[golongan]++;
          } else {
            golonganCount[golongan] = 1;
          }
        });

        const labels = Array.from({ length: 5 }, (_, i) => `Golongan ${i + 1}`);
        const data = labels.map((_, index) => golonganCount[index + 1] || 0);

        setChartData({
          labels,
          datasets: [
            {
              label: "Total Data per Golongan",
              data,
              backgroundColor: [
                "rgba(75, 192, 192, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(255, 99, 132, 0.6)",
                "rgba(153, 102, 255, 0.6)",
              ],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Total Data per Golongan</h1>
      <div className="w-full lg:w-2/3 mx-auto">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: "top" as const,
              },
              title: {
                display: true,
                text: "Total Data per Golongan",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default BarChart;
