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
import { axiosInstance } from "@/lib/axios.config"; // Ubah sesuai dengan konfigurasi axios-mu

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
  eMandiri: number;
  eBri: number;
  eBni: number;
  eBca: number;
  eNobu: number;
  eDKI: number;
  eMega: number;
  eFlo: number;
}

const PembayaranChart: React.FC = () => {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance().get("/lalins");
        const rows: DataRow[] = response.data.data.rows.rows;
        console.log("isi row", rows);

        const totalMandiri = rows.reduce((sum, row) => sum + row.eMandiri, 0);
        const totalBri = rows.reduce((sum, row) => sum + row.eBri, 0);
        const totalBni = rows.reduce((sum, row) => sum + row.eBni, 0);
        const totalBca = rows.reduce((sum, row) => sum + row.eBca, 0);
        const totalNobu = rows.reduce((sum, row) => sum + row.eNobu, 0);
        const totalDKI = rows.reduce((sum, row) => sum + row.eDKI, 0);
        const totalMega = rows.reduce((sum, row) => sum + row.eMega, 0);
        const totalFlo = rows.reduce((sum, row) => sum + row.eFlo, 0);

        setChartData({
          labels: [
            "Mandiri",
            "BRI",
            "BNI",
            "BCA",
            "Nobu",
            "DKI",
            "Mega",
            "Flo",
          ],
          datasets: [
            {
              label: "Total Transaksi",
              data: [
                totalMandiri,
                totalBri,
                totalBni,
                totalBca,
                totalNobu,
                totalDKI,
                totalMega,
                totalFlo,
              ],
              backgroundColor: [
                "rgba(75, 192, 192, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(255, 99, 132, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
                "rgba(199, 199, 199, 0.6)",
                "rgba(255, 99, 255, 0.6)",
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
      <h1 className="text-2xl font-bold mb-4">Total Transaksi per E-Banking</h1>
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
                text: "Total Transaksi per Bank",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default PembayaranChart;
