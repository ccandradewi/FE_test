"use client";

import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "@/lib/axios.config";
import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";

interface GerbangFormData {
  id: number;
  IdCabang: number;
  NamaCabang: string;
  NamaGerbang: string;
}

const EditGerbangForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isEditable, setIsEditable] = useState(false);
  const [loading, setLoading] = useState(true);
  const gerbangId = searchParams.get("id");
  const cabangId = searchParams.get("IdCabang");

  const validationSchema = Yup.object().shape({
    id: Yup.number()
      .required("Id Gerbang is required")
      .min(1, "Invalid Id Gerbang"),
    IdCabang: Yup.number()
      .required("Id Cabang is required")
      .min(1, "Invalid Id Cabang"),
    NamaCabang: Yup.string()
      .required("Nama Cabang is required")
      .min(3, "Nama Cabang must be at least 3 characters"),
    NamaGerbang: Yup.string()
      .required("Nama Gerbang is required")
      .min(3, "Nama Gerbang must be at least 3 characters"),
  });

  const formik = useFormik<GerbangFormData>({
    initialValues: {
      id: 0,
      IdCabang: 0,
      NamaCabang: "",
      NamaGerbang: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await axiosInstance().put(`/gerbangs`, values);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Gerbang updated successfully!",
        });
        router.push("/dashboard/gerbang");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update Gerbang.",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const fetchGerbang = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance().get(`/gerbangs`, {
          params: {
            id: gerbangId,
            IdCabang: cabangId,
          },
        });
        console.log("data sebelum", response);

        const gerbangData = response.data.data.rows.rows[0];
        formik.setValues({
          id: gerbangData.id,
          IdCabang: gerbangData.IdCabang,
          NamaCabang: gerbangData.NamaCabang,
          NamaGerbang: gerbangData.NamaGerbang,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch Gerbang data.",
        });
      } finally {
        setLoading(false);
      }
    };

    if (gerbangId && cabangId) {
      fetchGerbang();
    }
  }, [gerbangId, cabangId]);

  const toggleEdit = () => setIsEditable(!isEditable);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Edit Gerbang</h1>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="id"
            className="block text-sm font-medium text-gray-700"
          >
            Id Gerbang
          </label>
          <input
            type="number"
            name="id"
            id="id"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.id}
            disabled
            className={`mt-1 block w-full border border-gray-300 rounded-md p-2`}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="IdCabang"
            className="block text-sm font-medium text-gray-700"
          >
            Id Cabang
          </label>
          <input
            type="number"
            name="IdCabang"
            id="IdCabang"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.IdCabang}
            readOnly={!isEditable}
            className={`mt-1 block w-full border ${
              formik.touched.IdCabang && formik.errors.IdCabang
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md p-2`}
          />
          {formik.touched.IdCabang && formik.errors.IdCabang ? (
            <div className="text-red-500 text-sm">{formik.errors.IdCabang}</div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="NamaCabang"
            className="block text-sm font-medium text-gray-700"
          >
            Nama Cabang
          </label>
          <input
            type="text"
            name="NamaCabang"
            id="NamaCabang"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.NamaCabang}
            readOnly={!isEditable}
            className={`mt-1 block w-full border ${
              formik.touched.NamaCabang && formik.errors.NamaCabang
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md p-2`}
          />
          {formik.touched.NamaCabang && formik.errors.NamaCabang ? (
            <div className="text-red-500 text-sm">
              {formik.errors.NamaCabang}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <label
            htmlFor="NamaGerbang"
            className="block text-sm font-medium text-gray-700"
          >
            Nama Gerbang
          </label>
          <input
            type="text"
            name="NamaGerbang"
            id="NamaGerbang"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.NamaGerbang}
            readOnly={!isEditable}
            className={`mt-1 block w-full border ${
              formik.touched.NamaGerbang && formik.errors.NamaGerbang
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md p-2`}
          />
          {formik.touched.NamaGerbang && formik.errors.NamaGerbang ? (
            <div className="text-red-500 text-sm">
              {formik.errors.NamaGerbang}
            </div>
          ) : null}
        </div>

        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={toggleEdit}
            className={`p-2 rounded-md text-white ${
              isEditable ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {isEditable ? "Disable Edit" : "Enable Edit"}
          </button>

          <button
            type="submit"
            disabled={formik.isSubmitting || !isEditable}
            className={`bg-blue-500 text-white p-2 rounded-md ${
              formik.isSubmitting || !isEditable ? "opacity-50" : ""
            }`}
          >
            {formik.isSubmitting ? "Saving..." : "Update Gerbang"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditGerbangForm;
