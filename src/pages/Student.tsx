import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import Navbar from "../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import AxiosInstance from "../utils/axios/instance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./student.css";
const StudentList = () => {
  const navigate = useNavigate();
  // const [rows, setRows] = useState(initialRows);
  const columns = [
    { key: "name", name: "Name" },
    { key: "address", name: "Address" },
    { key: "dob", name: "Date of Birth" },
    { key: "phone", name: "Phone number" },
    { key: "about", name: "About yourself" },
    {
      name: "Teacher",
      key: "name",
      formatter: ({ row }: any) => {
        return row.user.name;
      },
    },
  ];

  const [students, setStudents] = useState([]);
  useEffect(() => {
    AxiosInstance.get("/students")
      .then((data) => {
        setStudents(data?.data?.data);
      })
      .catch((err) => {
        toast("Something went wrong");
        console.error(err);
      });
  }, []);
  return (
    <>
      <Navbar />
      <div className="container">
        <button
        style={{
          marginTop: "1em",
          marginBottom: "1em"
        }}
          onClick={() => {
            navigate("/create-student");
          }}
        >
          Create Student
        </button>
      </div>
      <DataGrid columns={columns} rows={students} style={{height: "100%", maxHeight: "80vh"}}/>
    </>
  );
};

export default StudentList;
