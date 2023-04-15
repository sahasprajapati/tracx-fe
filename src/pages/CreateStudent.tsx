import { Form, Formik } from "formik";
import Navbar from "../components/Navbar/Navbar";
import TextField from "../components/TextField/TextField";
import AxiosInstance from "../utils/axios/instance";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./student-create.css";
import { toast } from "react-toastify";
const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().email("Please enter a valid mail").required("Required"),
  name: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  dob: Yup.string().required("Required"),
  about: Yup.string().required("Required"),
});

const CreateStudent = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />

      <div>
        <Formik
          onSubmit={async (val, { resetForm }) => {
            const payload: any = {
              email: val?.email,
              name: val?.name,
              address: val?.address,
              phone: val?.phone,
              dob: val?.dob,
              about: val?.about,
            };
            const { data: tokenData } = await AxiosInstance.post(
              "students",
              payload
            );
            navigate("/student");
            resetForm({
              email: "",
              name: "",
              address: "",
              phone: "",
              dob: "",
              about: "",
            });
            toast("Student Created");
            //   dispatch(authAction(payload));
          }}
          initialValues={{
            email: "",
            name: "",
            address: "",
            phone: "",
            dob: "",
            about: "",
          }}
          validationSchema={FORM_VALIDATION}
          validateOnMount
        >
          {({ values, isSubmitting }) => (
            <Form className="row">
              <div className="my-5">
                <h3
                  style={{
                    fontSize: "20px",
                  }}
                >
                  {" "}
                  Create student
                </h3>
              </div>
              {/* <p className="text-center text-danger"> {authError} </p> */}
              <div className="container">
                <div>
                  <TextField
                    name="name"
                    label="Name"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <TextField
                    name="email"
                    label="Email"
                    type="Email"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <TextField
                    name="address"
                    label="Email Address"
                    placeholder="Enter your address"
                  />
                </div>
                <div>
                  <TextField
                    name="phone"
                    label="Phone Number"
                    placeholder="Enter your phone"
                  />
                </div>
                <div>
                  <TextField
                    name="dob"
                    label="Date of Birth"
                    placeholder="Enter your date of birth"
                  />
                </div>
                <div>
                  <TextField
                    name="about"
                    label="About"
                    isTextArea={true}
                    placeholder="About yourself"
                    maxLength={300}
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

                    <p className="ms-3 login__qn">Remember me</p>
                  </div>
                </label> */}
                <div>
                  <button
                    type="submit"
                    // isSubmitting={isSubmitting}
                  >
                    <span>Create</span>
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CreateStudent;
