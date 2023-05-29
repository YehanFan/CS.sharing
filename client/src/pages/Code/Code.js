import styles from "./Code.module.scss";
import React from "react";
import Input from "../../../src/components/Input";
import { Row, Col } from "reactstrap";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserInput from "../../../src/components/UserInput";
import Output from "../../../src/components/Output";

import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/vs2015.css'; // choose your preferred style

// add the languages you want to support
// import javascript from 'highlight.js/lib/languages/javascript';
import Python from 'highlight.js/lib/languages/python';
import Java from 'highlight.js/lib/languages/java';
import C from 'highlight.js/lib/languages/c';
import Cpp from 'highlight.js/lib/languages/cpp';


// hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', Python);
hljs.registerLanguage('java', Java);
hljs.registerLanguage('c', C);
hljs.registerLanguage('cpp', Cpp);


function Code() {
    const [dark, setDark] = useState(true);
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    // console.log(localStorage)
    const mycode = localStorage.getItem('mycode');
    // console.log(mycode)
    const [code, setCode] = useState(mycode);
    const language = hljs.highlightAuto(mycode).language;
    // const capitalizedLanguage = language === 'python' ? 'Python' : language;
    const capitalizedLanguage = 
      language === 'python' ? 'Python' :
      language === 'java' ? 'Java' :
      language === 'c' ? 'C' :
      language === 'cpp' ? 'Cpp' :
      language;
    const [dropValue, setDropValue] = useState(capitalizedLanguage || 'C');
    // console.log(language)
    // console.log(dropValue)
    return (
      <main className={styles.wrapper}>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
      />
      <div className={styles.container}>
        <div className={styles.subcontainerone}>
          <Input
              dark={dark}
              setDark={setDark}
              code={code}
              input={input}
              setCode={setCode}
              dropValue={dropValue}
              setOutput={setOutput}
              setError={setError}
          />
        </div>
        <div className={styles.subcontainertwo}>
          <UserInput input={input} setInput={setInput} dark={dark} />
          <Output
            output={output}
            setOutput={setOutput}
            error={error}
            dark={dark}
          />
        </div>
      </div>
      </main>
    );
}

export default Code;