"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "@/lib/axios.config";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

interface GerbangFormData {
  id: number;
  IdCabang: number;
  NamaCabang: string;
  NamaGerbang: string;
}

const CreateGerbangForm: React.FC = () => {
  const router = useRouter();
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
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await axiosInstance().post("/gerbangs", values);
        console.log(values);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Gerbang created successfully!",
        });
        router.push("/dashboard/gerbang");
        resetForm();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Id Gerbang and Id Cabang Already Exist",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Create New Gerbang</h1>

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
            className={`mt-1 block w-full border ${
              formik.touched.id && formik.errors.id
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md p-2`}
          />
          {formik.touched.id && formik.errors.id ? (
            <div className="text-red-500 text-sm">{formik.errors.id}</div>
          ) : null}
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

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className={`bg-blue-500 text-white p-2 rounded-md ${
            formik.isSubmitting ? "opacity-50" : ""
          }`}
        >
          {formik.isSubmitting ? "Saving..." : "Create Gerbang"}
        </button>
      </form>
    </div>
  );
};

export default CreateGerbangForm;
