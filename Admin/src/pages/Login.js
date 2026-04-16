import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showError, setShowError] = React.useState(false);
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      setShowError(false);
      dispatch(login(values));
    },
  });
  const authState = useSelector((state) => state);

  const { user, isError, isSuccess, isLoading, message } = authState.auth;

  useEffect(() => {
    if (isSuccess && user) {
      navigate("/admin");
    } else if (isError) {
      setShowError(true);
    }
  }, [user, isSuccess, isError, navigate]);
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4" style={{ boxShadow: "0 0 20px rgba(0,0,0,0.1)" }}>
        <h3 className="text-center title mb-2">Login</h3>
        <p className="text-center text-muted mb-4">Login to your account to continue.</p>
        {showError && isError && message && (
          <div className="alert alert-danger text-center mb-3" style={{ marginTop: "10px", fontWeight: "500" }}>
            ⚠️ {message && typeof message === "string" ? message : "Invalid Credentials"}
          </div>
        )}
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Email Address"
            id="email"
            name="email"
            onChng={(e) => {
              formik.handleChange("email")(e);
              setShowError(false);
            }}
            onBlr={formik.handleBlur("email")}
            val={formik.values.email}
          />
          <div className="error mt-2 text-danger" style={{ fontSize: "12px" }}>
            {formik.touched.email && formik.errors.email}
          </div>
          <CustomInput
            type="password"
            label="Password"
            id="pass"
            name="password"
            onChng={(e) => {
              formik.handleChange("password")(e);
              setShowError(false);
            }}
            onBlr={formik.handleBlur("password")}
            val={formik.values.password}
          />
          <div className="error mt-2 text-danger" style={{ fontSize: "12px" }}>
            {formik.touched.password && formik.errors.password}
          </div>
          <div className="mb-3 text-end"></div>
          <button
            className="border-0 px-3 py-2 text-dark fw-bold w-100 text-center text-decoration-none fs-5"
            style={{ 
              background: "#ffd333",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
              transition: "all 0.3s ease"
            }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
