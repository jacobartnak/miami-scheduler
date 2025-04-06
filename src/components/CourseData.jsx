import { forwardRef } from "react";
import styled from "styled-components";
import SectionCard from "./SectionCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle as plus } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  background-color: #f6f6f6;
  color: var(--dark-black);
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius);
  padding: 15px;
  flex-direction: column;
  overflow-y: scroll;

  .top-data {
    display: flex;
    font-size: 0.9rem;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    color: gray;
  }

  .subject {
    font-size: 1.1rem;
    font-weight: 500;
  }

  .title {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .description {
    font-size: 1rem;
    margin-bottom: 10px;
  }

  .sections-container {
    padding: 5px;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 5px;

    overflow-x: auto;
    overflow-y: hidden;
  }

  .bottom {
    display: flex;
    justify-content: flex-end;

    .add {
      display: flex;
      justify-content: center;
      color: white;
      align-items: center;
      background-color: #990100;
      border-radius: var(--border-radius);
      padding: 0.6rem;
      text-align: center;
      width: 10%;
      .icon {
        margin-right: 5px;
      }
    }

    .add:hover {
      background-color: #770100;
    }
  }
`;
const CourseData = ({ courseData, addCourse }) => {
  if (!courseData) return null;
  const sections = courseData.Sections || [];

  const compareFn = (a, b) => {
    //a = a.Section.substring(1, a.Section.length);
    //b = b.Section.substring(1, b.Section.length);

    a = a.Section;
    b = b.Section;
    if (a < b) return -1;

    if (a > b) return 1;

    return 0;
  };

  sections.sort(compareFn);

  let description = courseData.Description || "";

  if (description.indexOf(")") !== -1) description = description.split(")")[1];
  if (description.indexOf("Prerequisite") !== -1)
    description = description.split("Prerequisite")[0];

  //description = description.replace("\\n", "");
  return (
    <Wrapper className="course-data">
      <>
        <div className="top-data">
          <div className="subject">{`${courseData.Subject} ${courseData.Number}`}</div>
          <div className="credits">{`Credit Hours: ${courseData["Credit Hours"]}`}</div>
        </div>

        <div className="title">{`${courseData.Title}`}</div>

        {description !== null && (
          <div className="description">{`${
            description //.split(")")[1]
          }`}</div>
        )}

        <div className="sections-container">
          {sections.map((sectionData, index) => {
            return <SectionCard key={index} sectionData={sectionData} />;
          })}
        </div>

        <div className="bottom">
          <button className="add" onClick={() => addCourse(courseData)}>
            <FontAwesomeIcon className="icon" icon={plus} />
            <div>Add</div>
          </button>
        </div>
      </>
    </Wrapper>
  );
};
export default CourseData;
