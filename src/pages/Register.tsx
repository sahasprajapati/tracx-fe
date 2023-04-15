import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Navbar from "../components/Navbar/Navbar";
import TextField from "../components/TextField/TextField";
import AxiosInstance from "../utils/axios/instance";
import { saveProfile } from "./Login";
import SocialMediaOptions from "./SocialMediaOptions/SocialMediaOptions";

const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().email("Please enter a valid mail").required("Required"),
  password: Yup.string()
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/,
      "Password must be at least one alpha numeric character, 8 character long, at least one numeric and up to."
    )
    .required("Required"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  name: Yup.string()
    .min(3, "Name must be at least 3 character long")
    .required("Required"),
});

const Register: React.FC = () => {
  const [search, setSearch] = useSearchParams();

  const [errorText, setErrorText] = React.useState("");
  const navigate = useNavigate();
  const handleRegister = async (
    val: {
      email: string;
      password: string;
      name: string;
      cpassword: string;
    },
    { resetForm }: any
  ) => {
    try {
      const payload = {
        email: val?.email,
        password: val?.password,
        name: val?.name,
        confirmPassword: val?.cpassword,
      };

      const res = await AxiosInstance.post("auth/register", payload);
      if (res?.data?.data?.status) {
        toast(res?.data?.data?.message);
      } else {
        toast("User registered");
        resetForm({
          email: "",
          password: "",
          cpassword: "",
          name: "",
        });
      }
    } catch (err: any) {
      toast("Something went wrong");
    }
  };

  //   if (userData?.authenticate && userData?.userData && userData?.role) {
  //     if (userData?.role === "student") {
  //       navigate("/student-dashboard");
  //     }  
  //     if (userData?.role === "super") {
  //       navigate("/admin");
  //     }
  //     if (userData?.role === "instructor") {
  //       navigate("/teacher");
  //     }
  //   }

  useEffect(() => {
    if (search.get("accessToken") && search.get("refreshToken")) {
      saveProfile({
        accessToken: search.get("accessToken") ?? "",
        refreshToken: search.get("refreshToken") ?? "",
      }).then(() => {
        navigate("/");
      });
    }
    if (
      localStorage.getItem("accessToken") &&
      localStorage.getItem("refreshToken")
    ) {
      saveProfile({
        accessToken: localStorage.getItem("accessToken") ?? "",
        refreshToken: localStorage.getItem("refreshToken") ?? "",
      }).then(() => {
        navigate("/");
      });
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="col-lg-6 register__image__banner">
        <div className="d-flex align-items-center">
          <Formik
            onSubmit={handleRegister}
            initialValues={{
              email: "",
              password: "",
              cpassword: "",
              name: "",
            }}
            validationSchema={FORM_VALIDATION}
            validateOnMount
          >
            {({ values, isSubmitting, resetForm }) => (
              <Form className="row position-relative">
                <div className="my-5">
                  <h3
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    Create your Account
                  </h3>
                </div>

                <p className="text-center text-danger"> {errorText} </p>
                <div className="col-md-6">
                  <TextField
                    name="name"
                    label="Full Name"
                    placeholder="Full name"
                  />
                </div>

                <div className="col-12">
                  <TextField
                    name="email"
                    label="Email"
                    type=""
                    placeholder="Email address"
                  />
                </div>
                <div className="col-md-6">
                  <TextField
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Create password"
                  />
                  {/* <Icon name="eye" /> */}
                </div>
                <div className="col-md-6">
                  <TextField
                    name="cpassword"
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm Password"
                  />
                </div>
                {/* <label className="mb-2">
                  <div className="flex">
                    <Field
                      type="checkbox"
                      name="checked"
                      value="yes"
                      id="checkbox"
                    />
                    <p className="ms-3 login__qn">I Aggree with all of your</p>{' '}
                    <Link to="/terms-conditions" className="primary-color">
                      Terms & conditions.
                    </Link>
                  </div>
                </label> */}
                <div>
                  <button type="submit">
                    <span>Register</span>
                  </button>
                </div>
                <h6 c>Or Sign Up</h6>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1em",
                  }}
                >
                  <a href={`${import.meta.env.VITE_BASE_URL}google`}>
                    <SocialMediaOptions logo={"google.png"} title="Google" />
                  </a>
                  <a href={`${import.meta.env.VITE_BASE_URL}facebook`}>
                    <SocialMediaOptions
                      logo={"facebook.png"}
                      title="Facebook"
                    />
                  </a>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Register);
