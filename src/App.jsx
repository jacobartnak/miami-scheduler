import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Search from "./components/Search";
import styled from "styled-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CourseOption from "./components/CourseOption.jsx";
import AddCourse from "./pages/addcourse/AddCourse.jsx";
import Header from "./components/Header.jsx";
import SelectionContainer from "./components/SelectionContainer.jsx";

function App() {
  const [formData, setFormData] = useState({
    courseName: "",
    term: null,
    campus: null,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const setFormKey = (name, value) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  useEffect(() => {}, [formData]);
  const route = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header />

          <Search
            formData={formData}
            setFormKey={setFormKey}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />

          <SelectionContainer />
        </>
      ),
    },
    {
      path: "/add",
      element: <AddCourse />,
    },
  ]);

  return <RouterProvider router={route}></RouterProvider>;
}

export default App;
