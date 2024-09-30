"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userLogin } from "@/redux/authMiddleware";
import { useAppDispatch } from "@/app/hook";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username wajib diisi"),
      password: Yup.string().required("Password wajib diisi"),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const result = await dispatch(userLogin(values));
        console.log("tesss", result);

        if (result?.success) {
          formik.resetForm();
          router.push("/dashboard");
        } else {
          toast.error(
            result?.message || "Login gagal. Periksa username atau password."
          );
        }
      } catch (error) {
        toast.error("Terjadi kesalahan saat masuk. Silakan coba lagi.");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center">
        {/* Desktop View */}
        <div className="hidden lg:flex w-screen h-screen">
          <div className="flex flex-row items-center justify-between w-full">
            {/* BANNER */}
            <div className="h-full w-2/5 mx-8 lg:flex justify-center sm:hidden md:hidden">
              <img
                src="https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/11/2023/05/31/WhatsApp-Image-2023-05-31-at-081842-373293609.jpeg"
                alt=""
                className="h-screen object-cover lg:flex sm:hidden md:hidden"
              />
            </div>

            {/* FORM LOGIN */}
            <div className="flex flex-col items-center justify-center w-3/5">
              {/* HEADER SECTION */}
              <div className="mb-3 flex items-center justify-center flex-col">
                <Link href="/">
                  <img
                    src="https://cdn.antaranews.com/cache/1200x800/2022/03/21/20160830jasamarga-001logo.jpg"
                    alt=""
                    className="w-72"
                  />
                </Link>
                <h2 className="font-bold">Welcome back</h2>
                <div className="text-zinc-400">
                  Sign in to continue see dasboard
                </div>
              </div>
              <div>
                {/* FORM SUBMIT EMAIL */}
                <form
                  onSubmit={formik.handleSubmit}
                  className="flex flex-col w-60 lg:w-[500px] "
                >
                  <div className="form-floating w-full">
                    <input
                      type="text"
                      className="form-control mb-2"
                      id="floatingInput"
                      placeholder="Username"
                      name="username"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label htmlFor="floatingInput">Username</label>
                  </div>
                  {formik.touched.username && formik.errors.username ? (
                    <div className="text-red-700 text-xs mb-3">
                      {formik.errors.username}
                    </div>
                  ) : null}

                  <div className="form-floating w-full">
                    <input
                      type="password"
                      className="form-control mb-2"
                      id="floatingPassword"
                      placeholder="•••••••"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-700 text-xs mb-3">
                      {formik.errors.password}
                    </div>
                  ) : null}

                  <button
                    className="btn bsb-btn-xl btn-dark w-full my-3"
                    type="submit"
                    disabled={!formik.isValid || isSubmitting}
                  >
                    {isSubmitting ? (
                      <Spinner
                        animation="border"
                        role="status"
                        size="sm"
                        className="me-2"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    ) : (
                      "Sign in"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden flex flex-col items-center justify-center w-full">
          {/* HEADER SECTION */}
          <div className="mb-3 flex items-center justify-center flex-col">
            <Link href="/">
              <img
                src="https://cdn.antaranews.com/cache/1200x800/2022/03/21/20160830jasamarga-001logo.jpg"
                alt=""
                className="w-40"
              />
            </Link>
            <h2 className="font-bold">Welcome back</h2>
            <div className="text-zinc-400">
              Sign in to continue see dashboard
            </div>
          </div>
          {/* FORM SUBMIT EMAIL */}
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col w-60 lg:w-[500px]"
          >
            <div className="form-floating w-full">
              <input
                type="text"
                className="form-control mb-2"
                id="floatingInput"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="floatingInput">Username</label>
            </div>
            {formik.touched.username && formik.errors.username ? (
              <div className="text-red-700 text-xs mb-3">
                {formik.errors.username}
              </div>
            ) : null}

            <div className="form-floating w-full">
              <input
                type="password"
                className="form-control mb-2"
                id="floatingPassword"
                placeholder="•••••••"
                {...formik.getFieldProps("password")}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-700 text-xs mb-3">
                {formik.errors.password}
              </div>
            ) : null}

            <button
              className="btn bsb-btn-xl btn-dark w-full my-3"
              type="submit"
              disabled={!formik.isValid || isSubmitting}
            >
              {isSubmitting ? (
                <Spinner
                  animation="border"
                  role="status"
                  size="sm"
                  className="me-2"
                >
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
