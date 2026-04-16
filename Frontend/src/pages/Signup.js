import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/user/userSlice";

let signUpSchema = yup.object({
  firstname: yup.string().required("First Name is Required"),
  lastname: yup.string().required("Last Name is Required"),
  email: yup
    .string()
    .required("Email is Required")
    .email("Email Should be valid"),
  mobile: yup.number().required().positive().integer("Mobile No is Required"),
  password: yup.string().required("Password is Required"),
  usertype: yup.string().required("User Type is Required"),
});

const Signup = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
      usertype: "customer",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  // useEffect(() => {
  //   if (authState.createdUser !== null && authState.isError === false) {
  //     navigate("/login");
  //   }
  // }, [authState]);

  return (
    <>
      <Meta title={"Sign Up"} />
      
      {/* Header with Breadcrumb and Login Button */}
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
            <span style={{ color: "#999" }}>Sign Up</span>
          </p>
        </div>
        <div style={{ position: "absolute", right: "20px" }}>
          <Link
            to="/login"
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
            Login
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
                👤 Create Your Account
              </h3>
              <form
                action=""
                className="d-flex flex-column gap-15"
                onSubmit={formik.handleSubmit}
              >
                <CustomInput
                  type="text"
                  name="firstname"
                  placeholder="FirstName"
                  value={formik.values.firstname}
                  onChange={formik.handleChange("firstname")}
                  onBlur={formik.handleBlur("firstname")}
                />
                <div className="error" style={{ fontSize: "12px", color: "#dc3545", marginTop: "-10px" }}>
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
                <CustomInput
                  type="text"
                  name="lastname"
                  placeholder="LastName"
                  value={formik.values.lastname}
                  onChange={formik.handleChange("lastname")}
                  onBlur={formik.handleBlur("lastname")}
                />
                <div className="error" style={{ fontSize: "12px", color: "#dc3545", marginTop: "-10px" }}>
                  {formik.touched.lastname && formik.errors.lastname}
                </div>
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
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formik.values.mobile}
                  onChange={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur("mobile")}
                />
                <div className="error" style={{ fontSize: "12px", color: "#dc3545", marginTop: "-10px" }}>
                  {formik.touched.mobile && formik.errors.mobile}
                </div>
                
                {/* User Type Dropdown */}
                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontSize: "13px", color: "#666", fontWeight: "500" }}>
                    User Type
                  </label>
                  <select
                    name="usertype"
                    value={formik.values.usertype}
                    onChange={formik.handleChange("usertype")}
                    onBlur={formik.handleBlur("usertype")}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "14px",
                      color: "#333",
                      backgroundColor: "#f9f9f9",
                      fontFamily: "inherit",
                      cursor: "pointer",
                      appearance: "none",
                      backgroundImage: "url('data:image/svg+xml;utf8,<svg fill=\"%23333\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z\"/></svg>')",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 8px center",
                      backgroundSize: "20px",
                      paddingRight: "32px"
                    }}
                  >
                    <option value="customer">👤 Customer</option>
                    <option value="seller">🏪 Seller</option>
                  </select>
                </div>
                <div className="error" style={{ fontSize: "12px", color: "#dc3545", marginTop: "-10px" }}>
                  {formik.touched.usertype && formik.errors.usertype}
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
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
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
                      Sign Up
                    </button>
                  </div>
                  <p style={{ textAlign: "center", marginTop: "15px", fontSize: "14px", color: "#666" }}>
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      style={{ color: "#ffd333", textDecoration: "none", fontWeight: "600" }}
                    >
                      Login here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;
