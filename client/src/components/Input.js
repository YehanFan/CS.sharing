import { decode as base64_decode, encode as base64_encode } from "base-64";
import axios from "axios";
import { Buffer } from "buffer";
import {
  DropdownMenu,
  DropdownItem,
  Dropdown,
  DropdownToggle,
} from "reactstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faBarsStaggered,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from 'react';

import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/vs2015.css'; // choose your preferred style


const Code = styled.div`
  border: 2px solid #101010;
  border-radius: 4px;
  position: relative;
  background-color: #ffffff;
  width: 85%;
  @media (max-width: 400px) {
    width: 90%;
  }
`;

const ToolKit = styled.div`
  border-bottom: 1px solid #101010;
  position: relative;
`;

const RunButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: transparent;
  padding: 6px 18px;
  border: 1.6px solid #101010;
  font-size: calc(14px + 1px);
  font-weight: 700;
  border-radius: 4px;
`;

const Input = (props) => {
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const mycode = localStorage.getItem('mycode');
  // console.log("props.dropValue");
  // console.log(props.dropValue);
  const [dropValue, setDropValue] = useState(props.dropValue||"C"); 
  // console.log(dropValue);
  const [activeLan, setActiveLan] = useState(0);

  useEffect(() => {
    if (dropValue === "Python") {
      setActiveLan(71);
    } else if (dropValue === "Java") {
      setActiveLan(62);
    } else if (dropValue === "C") {
      setActiveLan(50);
    } else if (dropValue === "Cpp") {
      setActiveLan(54);
    }
  }, [dropValue]);

  const toggle = () => {
    setDropDownOpen(!dropdownOpen);
  };

  
  const runCode = async () => {
    window.scrollTo(0, document.body.scrollHeight);
    props.setOutput("Compiling! This may take a while please wait");
    var check = "";
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key": "20858d247amshd135131c376d1e8p173f4fjsn1640ccd1b841",
      },
      data: `{"language_id":${activeLan},"source_code":"${base64_encode(
        props.code
      )}","stdin":"${base64_encode(props.input)}"}`,
    };

    await axios
      .request(options)
      .then(function (response) {
        check = response.data;
      })
      .catch(function (error) {
        console.error(error);
      });

    const options2 = {
      method: "GET",
      url: `https://judge0-ce.p.rapidapi.com/submissions/${check.token}`,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key": "20858d247amshd135131c376d1e8p173f4fjsn1640ccd1b841",
      },
    };

    await axios
      .request(options2)
      .then(function (response) {
        if (response.data.status.id === 6) {
          props.setOutput(
            Buffer.from(response.data.compile_output, "base64").toString()
          );
          props.setError(true);
        } else if (response.data.status.id === 3) {
          props.setOutput(base64_decode(response.data.stdout));
          props.setError(false);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div
      className="row justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <Code
        className="col-12 px-0"
        style={{
          transition: "0.5s ease-in-out",
          backgroundColor: `${!props.dark ? "#333333" : "#ffffff"}`,
          color: `${!props.dark ? "white" : "black"}`,
        }}
      >
        <ToolKit
          className="row justify-content-between px-4 py-3 mx-0"
          style={{
            backgroundColor: `${!props.dark ? "#333333" : "white"}`,
          }}
        >
          <div className="col-lg-auto col-md-auto col-sm-auto my-auto">
            <p
              className="my-0"
              style={{ fontSize: `14px`, fontWeight: 500 }}
            >
              <FontAwesomeIcon
                icon={faBarsStaggered}
                style={{ cursor: "pointer" }}
              />{" "}
              &nbsp; CODE HERE
            </p>
          </div>
          <div className="col-lg-auto col-md-auto col-sm-auto my-3 my-lg-0 my-md-0 my-sm-0">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto">
                <Dropdown
                  isOpen={dropdownOpen}
                  toggle={toggle}
                  className="w-100"
                >
                  <DropdownToggle
                    caret
                    style={{
                      background: `white`,
                      fontWeight: 500,
                      fontSize: `14px`,
                      transition: "0.5s ease-in-out",
                      backgroundColor: `${!props.dark ? "#575757" : "#ffffff"}`,
                      color: `${!props.dark ? "white" : "black"}`,
                    }}
                  >
                    {dropValue}
                  </DropdownToggle>

                  <DropdownMenu style={{ fontSize: `14px` }}>
                    <DropdownItem
                      value={50}
                      onClick={() => {
                        setDropValue("C");
                        setActiveLan(50);
                        props.setCode(mycode);
                        // props.setDropValue(dropValue);
                      }}
                    >
                      C
                    </DropdownItem>
                    <DropdownItem
                      value={54}
                      onClick={() => {
                        setDropValue("Cpp");
                        setActiveLan(54);
                        props.setCode(mycode);
                        props.setDropValue(dropValue);
                      }}
                    >
                      Cpp
                    </DropdownItem>
                    <DropdownItem
                      value={62}
                      onClick={() => {
                        setDropValue("Java");
                        setActiveLan(62);
                        props.setCode(mycode);
                        props.setDropValue(dropValue);
                      }}
                    >
                      Java
                    </DropdownItem>
                    <DropdownItem
                      value={71}
                      onClick={() => {
                        setDropValue("Python");
                        setActiveLan(71);
                        props.setCode(mycode);
                        props.setDropValue(dropValue);
                      }}
                    >
                      Python
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div className="col-auto">
                <FontAwesomeIcon
                  icon={props.dark ? faSun : faMoon}
                  style={{ cursor: "pointer" }}
                  onClick={() => props.setDark(!props.dark)}
                />
              </div>
            </div>
          </div>
        </ToolKit>
        <textarea
          name=""
          id=""
          cols="auto"
          rows="auto"
          className="my-auto form-control shadow-none"
          value={props.code}
          onChange={({ target }) => props.setCode(target.value)}
          spellCheck={false}
          style={{
            width: "100%",
            minHeight: "50vh",
            outline: "none",
            border: "none",
            padding: "10px",
            fontSize: "14px",
            resize: "none",
            transition: "0.5s ease-in-out",
            backgroundColor: `${!props.dark ? "#575757" : "#ffffff"}`,
            color: `${!props.dark ? "white" : "black"}`,
          }}
        ></textarea>
        <RunButton
          onClick={runCode}
          style={{
            transition: "0.5s ease-in-out",
            backgroundColor: `${!props.dark ? "#333333" : "#ffffff"}`,
            color: `${!props.dark ? "white" : "black"}`,
            border: `1.6px solid ${!props.dark ? "white" : "black"}`,
          }}
        >
          Run
        </RunButton>
      </Code>
    </div>
  );
};

export default Input;
