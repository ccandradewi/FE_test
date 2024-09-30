import GolonganChart from "@/components/lalin/chartGolongan";
import PembayaranChart from "@/components/lalin/chartPembayaran";
import ShiftPieChart from "@/components/lalin/shiftPie";
import React from "react";

export default function dasboard() {
  return (
    <div>
      <PembayaranChart />
      <GolonganChart />
      <ShiftPieChart />
    </div>
  );
}
