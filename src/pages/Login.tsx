import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Navbar from "../components/Navbar/Navbar";
import TextField from "../components/TextField/TextField";
import AxiosInstance from "../utils/axios/instance";
import SocialMediaOptions from "./SocialMediaOptions/SocialMediaOptions";

const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().email("Please enter a valid mail").required("Required"),
  password: Yup.string().required("Required"),
});
export const saveProfile = async ({ accessToken, refreshToken }: any) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  const { data: profileData } = await AxiosInstance.get("auth/profile");
  localStorage.setItem("user", JSON.stringify(profileData?.data));
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useSearchParams();
  const login = async (payload: any) => {
    try {
      const { data: tokenData } = await AxiosInstance.post(
        "auth/login",
        payload
      );

      await saveProfile({
        accessToken: tokenData?.data?.accessToken,
        refreshToken: tokenData?.data?.refreshToken,
      }).then(() => {
        navigate("/");
      });
    } catch (error: any) {
      toast(error?.response?.data?.message ?? "Something went wrong");
    }
  };

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

      <Formik
        onSubmit={async (val, { resetForm }) => {
          try {
            if (val.checked.find((yes) => val.checked.includes(yes))) {
              return localStorage.setItem("Email", JSON.stringify(val));
            }
            const payload: any = {
              email: val?.email,
              password: val?.password,
            };

            login(payload);
          } catch (error: any) {
            toast(error?.response.data.message);
          }
        }}
        initialValues={{ email: "", password: "", checked: [] }}
        validationSchema={FORM_VALIDATION}
        validateOnMount
      >
        {({ values, isSubmitting }) => (
          <Form>
            <div>
              <h3
                style={{
                  fontSize: "20px",
                }}
              >
                Login to your Account
              </h3>

              <div>
                <TextField
                  name="email"
                  label="Email"
                  placeholder="Enter your Email address"
                />
              </div>
              <div>
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
              <div>
                <button
                  type="submit"
                  // isSubmitting={isSubmitting}
                >
                  <span>Login</span>
                </button>
              </div>
              <h6>Or Login in</h6>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1em",
                }}
              >
                {/*  */}
                <a href={`${import.meta.env.VITE_BASE_URL}google`}>
                  <SocialMediaOptions
                    logo={"google.png"}
                    title="Google"
                    onClick={() => {
                      // navigate('/api/google');
                    }}
                  />
                </a>

                <a href={`${import.meta.env.VITE_BASE_URL}facebook`}>
                  <SocialMediaOptions
                    logo={"facebook.png"}
                    title="Facebook"
                    onClick={() => {
                      // navigate('/api/facebook');
                    }}
                  />
                </a>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default React.memo(Login);
