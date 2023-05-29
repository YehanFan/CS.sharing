import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglassEnd } from "@fortawesome/free-solid-svg-icons";

const OutputBox = styled.div`
  border: 2px solid #101010;
  border-radius: 4px;
  position: relative;
  background-color: #ffffff;
  width: 90%;
  margin: auto;
`;

const ToolKit = styled.div`
  border-bottom: 1px solid #101010;
  position: relative;
`;

const Output = (props) => {
  return (
    <OutputBox
      style={{
        transition: " 0.5s ease-in-out",
        backgroundColor: `${!props.dark ? "#333333" : "#ffffff"}`,
        color: `${!props.dark ? "white" : "black"}`,
      }}
    >
      <ToolKit
        className="row justify-content-between px-4 py-3 mx-0"
        style={{
          transition: "0.5s ease-in-out",
          backgroundColor: `${!props.dark ? "#333333" : "#ffffff"}`,
          color: `${!props.dark ? "white" : "black"}`,
        }}
      >
        <div className="col-auto my-auto">
          <p
            className="my-0"
            style={{ fontSize: `14px`, fontWeight: 500 }}
          >
            <FontAwesomeIcon icon={faHourglassEnd} />
            &nbsp; OUTPUT
          </p>
        </div>
        <div className="col-auto">
          <div className="row align-items-center">
            {/* <div className="col">
              <input type="range" />
            </div> */}
          </div>
        </div>
      </ToolKit>
      <textarea
        name=""
        id=""
        cols="auto"
        rows="auto"
        className="my-auto form-control shadow-none"
        readOnly={true}
        value={props.output}
        spellCheck={false}
        style={{
          width: "100%",
          minHeight: "30vh",
          outline: "none",
          border: "none",
          padding: "10px",
          fontSize: "14px",
          resize: "none",
          transition: "0.5s ease-in-out",
          color: `${props.error ? "red" : "black"}`,
        }}
      ></textarea>
    </OutputBox>
  );
};

export default Output;
