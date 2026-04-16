import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/user/userSlice";

let loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is Required")
    .email("Email Should be valid"),

  password: yup.string().required("Password is Required"),
});

const Login = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));

      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
    },
  });
  useEffect(() => {
    if (authState.user !== null && authState.isError === false) {
      window.location.href = "/";
    }
  }, [authState]);

  return (
    <>
      <Meta title={"Login"} />
      
      {/* Header with Breadcrumb and Sign Up Button */}
      <div style={{
        background: "#f5f5f5",
        borderBottom: "1px solid #e0e0e0",
        padding: "16px 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div style={{ flex: 1 }}>
          <p style={{
            textAlign: "center",
            margin: 0,
            fontSize: "14px",
            color: "#666"
          }}>
            <Link to="/" style={{ textDecoration: "none", color: "#333", fontWeight: "500" }}>
              Home
            </Link>
            &nbsp;/&nbsp;
            <span style={{ color: "#999" }}>Login</span>
          </p>
        </div>
        <div style={{ position: "absolute", right: "20px" }}>
          <Link
            to="/signup"
            style={{
              textDecoration: "none",
              color: "#333",
              fontSize: "14px",
              fontWeight: "600",
              background: "#ffd333",
              padding: "8px 16px",
              borderRadius: "6px",
              display: "inline-block",
              transition: "all 0.3s ease"
            }}
          >
            Sign Up
          </Link>
        </div>
      </div>

      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card" style={{
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              border: "1px solid #f0f0f0",
              borderRadius: "8px",
              padding: "30px"
            }}>
              <h3 className="text-center mb-4" style={{ fontSize: "24px", fontWeight: "600", color: "#333" }}>
                🔐 Welcome Back
              </h3>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-15"
              >
                <CustomInput
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                />
                <div className="error" style={{ fontSize: "12px", color: "#dc3545", marginTop: "-10px" }}>
                  {formik.touched.email && formik.errors.email}
                </div>
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                />
                <div className="error" style={{ fontSize: "12px", color: "#dc3545", marginTop: "-10px" }}>
                  {formik.touched.password && formik.errors.password}
                </div>
                <div>
                  <Link
                    to="/forgot-password"
                    style={{
                      color: "#ffd333",
                      textDecoration: "none",
                      fontSize: "13px",
                      fontWeight: "500"
                    }}
                  >
                    Forgot Password?
                  </Link>

                  <div className="mt-4 d-flex justify-content-center gap-15 align-items-center">
                    <button
                      className="button border-0"
                      type="submit"
                      style={{
                        background: "#ffd333",
                        color: "#333",
                        padding: "10px 30px",
                        border: "none",
                        borderRadius: "6px",
                        fontWeight: "600",
                        cursor: "pointer",
                        fontSize: "15px",
                        transition: "all 0.3s ease"
                      }}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </form>
              <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#666" }}>
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  style={{ color: "#ffd333", textDecoration: "none", fontWeight: "600" }}
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
