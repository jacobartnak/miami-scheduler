import React, { useState } from "react";
import { styled, createGlobalStyle } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #dae9ed; 
  }
`;

const Wrapper = styled.div`
  padding: 10px;
  width: 30%;
  margin: 50px auto;
  background-color: white;
  border-radius: 7px;

  h3 {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    text-shadow: 1px 1px 2px rgb(0, 0, 0, 0.7);
    margin-bottom: 10px;
  }
  .inputGroup {
    margin: 10px 0px;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  label {
    margin-bottom: 5px;
  }

  input {
    padding: 0.3rem;
    outline: none;
    border: none;
    box-shadow: 0 2px 5px 0 rgb(0, 0, 0, 0.1);
    border-radius: 0.2rem;
  }

  .button {
    background-color: #7ec5e6;
    color: white;
    padding: 0.3rem;
    box-shadow: 0 2px 5px 0 rgb(0, 0, 0, 0.1);
    border-radius: 0.2rem;
    cursor: pointer;
    outline: none;
    border: none;
    margin-top: 5px;
  }

  .submitButton:hover {
    background-color: #629bb5;
  }

  .submitButton:active {
    background-color: #7ec5e6;
  }

  .backButton {
    background-color: gray;
    color: white;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20%;
  }

  .toggle-icon {
    margin-right: 2px;
  }
`;
const AddCourse = () => {
  const courses = {
    title: "",
    subject: "",
    number: "",
  };

  const [course, setCourse] = useState(courses);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setCourse((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const courseNew = {
      Term: "Fall 2024",
      Subject: "CS",
      Number: "102",
      Title: "Introduction to Computer Science",
      "Credit Hours": "3",
      Description:
        "This course introduces the fundamental concepts of computer science and programming.",
      Sections: [
        {
          CRN: "12345",
          Section: "001",
          Campus: "Main Campus",
          "Meeting Days": "MWF",
          "Meeting Times": "10:00 AM - 11:15 AM",
          "Meeting Locations": "Building A, Room 101",
          Instructors: "Dr. Jane Smith",
        },
        {
          CRN: "12346",
          Section: "002",
          Campus: "Main Campus",
          "Meeting Days": "TTh",
          "Meeting Times": "1:00 PM - 2:15 PM",
          "Meeting Locations": "Building B, Room 202",
          Instructors: "Prof. John Doe",
        },
      ],
    };

    console.log(courseNew);

    await axios
      .post("http://localhost:8000/api/courses/create", courseNew)
      .then((response) => {
        console.log("User created successfully.");
        toast.success(response.data.message, {
          position: "top-right",
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <GlobalStyle />
      <Wrapper className="addCourse">
        <Link to="/" type="button" className="button backButton">
          <FontAwesomeIcon className="toggle-icon" icon={faCaretLeft} />
          Back
        </Link>

        <h3>ADD NEW COURSE</h3>
        <form className="addCourseForm" onSubmit={submitForm}>
          <div className="inputGroup">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={course.title}
              onChange={inputHandler}
              autoComplete="off"
              placeholder="Enter title"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={course.subject}
              onChange={inputHandler}
              autoComplete="off"
              placeholder="Enter subject"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="number">Number:</label>
            <input
              type="text"
              id="number"
              name="number"
              value={course.number}
              onChange={inputHandler}
              autoComplete="off"
              placeholder="Enter number"
            />
          </div>

          <div className="inputGroup">
            <button type="submit" className="button submitButton">
              Submit
            </button>
          </div>
        </form>
      </Wrapper>
    </>
  );
};

export default AddCourse;
