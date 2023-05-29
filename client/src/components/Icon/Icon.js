import React from "react";

function Icon({ icon, ...rest }) {
  switch (icon) {
    case "bookmark-filled":
      return (
        <svg
          {...rest}
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          width="24"
          fill="currentColor"
        >
          <path d="M5.5 20.25V5.3q0-.75.525-1.275Q6.55 3.5 7.3 3.5h9.4q.75 0 1.275.525.525.525.525 1.275v14.95l-6.5-2.8Z" />
        </svg>
      );
    case "bookmark-add":
      return (
        <svg
          {...rest}
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          width="24"
          fill="currentColor"
        >
          <path d="M5.5 20.25V5.3q0-.75.525-1.275Q6.55 3.5 7.3 3.5H13V5H7.3q-.1 0-.2.1t-.1.2v12.65l5-2.15 5 2.15V11h1.5v9.25l-6.5-2.8ZM7 5h6-1Zm10 4V7h-2V5.5h2v-2h1.5v2h2V7h-2v2Z" />
        </svg>
      );
    case "chat-bubble":
      return (
        <svg
          {...rest}
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          width="24"
          fill="currentColor"
        >
          <path d="M2.5 21.05V4.3q0-.75.525-1.275Q3.55 2.5 4.3 2.5h15.4q.75 0 1.275.525.525.525.525 1.275v11.4q0 .75-.525 1.275-.525.525-1.275.525H6.05ZM4 17.425 5.425 16H19.7q.125 0 .213-.088.087-.087.087-.212V4.3q0-.125-.087-.213Q19.825 4 19.7 4H4.3q-.125 0-.212.087Q4 4.175 4 4.3ZM4 4.3V4v13.425Z" />
        </svg>
      );
    case "drafts":
      return (
        <svg
          {...rest}
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          width="24"
          fill="currentColor"
        >
          <path d="M7.25 16.75h6.5v-1.5h-6.5Zm0-4h9.5v-1.5h-9.5Zm0-4h9.5v-1.5h-9.5ZM5.3 20.5q-.75 0-1.275-.525Q3.5 19.45 3.5 18.7V5.3q0-.75.525-1.275Q4.55 3.5 5.3 3.5h13.4q.75 0 1.275.525.525.525.525 1.275v13.4q0 .75-.525 1.275-.525.525-1.275.525Zm0-1.5h13.4q.1 0 .2-.1t.1-.2V5.3q0-.1-.1-.2t-.2-.1H5.3q-.1 0-.2.1t-.1.2v13.4q0 .1.1.2t.2.1ZM5 5v14V5Z" />
        </svg>
      );
    case "edit":
      return (
        <svg
          {...rest}
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          width="24"
          fill="currentColor"
        >
          <path d="M5.3 23.2q-.75 0-1.275-.525Q3.5 22.15 3.5 21.4V8q0-.75.525-1.275Q4.55 6.2 5.3 6.2h8.55l-1.5 1.5H5.3q-.1 0-.2.1T5 8v13.4q0 .1.1.2t.2.1h13.4q.1 0 .2-.1t.1-.2v-7.075l1.5-1.5V21.4q0 .75-.525 1.275-.525.525-1.275.525Zm6.7-8.5Zm4.525-8.075 1.075 1.05-6.6 6.6V15.7h1.4l6.65-6.625 1.05 1.05-7.05 7.075H9.5v-3.55Zm3.575 3.5-3.575-3.5 2.3-2.3q.525-.525 1.288-.525.762 0 1.287.55l.975.975q.5.525.5 1.275 0 .75-.525 1.275Z" />
        </svg>
      );
    case "eye":
      return (
        <svg
          {...rest}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      );
    case "eye-off":
      return (
        <svg
          {...rest}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
          <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>
      );
    case "home":
      return (
        <svg
          {...rest}
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          width="24"
          fill="currentColor"
        >
          <path d="M4.5 20.5V9.25L12 3.625l7.5 5.625V20.5h-5.575v-6.7h-3.85v6.7ZM6 19h2.575v-6.7h6.85V19H18v-9l-6-4.5L6 10Zm6-6.75Z" />
        </svg>
      );
    case "lists":
      return (
        <svg
          {...rest}
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          width="24"
          fill="currentColor"
        >
          <path d="M3.75 22.25V7.3q0-.75.525-1.275Q4.8 5.5 5.55 5.5h9.4q.75 0 1.275.525.525.525.525 1.275v14.95l-6.5-2.8Zm1.5-2.3 5-2.15 5 2.15V7.3q0-.1-.1-.2t-.2-.1h-9.4q-.1 0-.2.1t-.1.2Zm13.5-.7V3.8q0-.1-.1-.2t-.2-.1H6.75V2h11.7q.75 0 1.275.525.525.525.525 1.275v15.45ZM5.25 7h10-5Z" />
        </svg>
      );
    case "more":
      return (
        <svg
          {...rest}
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          width="24"
          fill="currentColor"
        >
          <path d="M6.225 13.5q-.625 0-1.062-.438-.438-.437-.438-1.062t.438-1.062Q5.6 10.5 6.225 10.5t1.063.438q.437.437.437 1.062t-.437 1.062q-.438.438-1.063.438Zm5.775 0q-.625 0-1.062-.438Q10.5 12.625 10.5 12t.438-1.062Q11.375 10.5 12 10.5t1.062.438q.438.437.438 1.062t-.438 1.062q-.437.438-1.062.438Zm5.775 0q-.625 0-1.062-.438-.438-.437-.438-1.062t.438-1.062q.437-.438 1.062-.438t1.063.438q.437.437.437 1.062t-.437 1.062q-.438.438-1.063.438Z" />
        </svg>
      );
    case "notifications":
      return (
        <svg
          {...rest}
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          width="24"
          fill="currentColor"
        >
          <path d="M4.25 18.875v-1.5h2v-7.25q0-2.05 1.263-3.613Q8.775 4.95 10.75 4.5v-.7q0-.525.363-.888.362-.362.887-.362t.887.362q.363.363.363.888v.7q1.975.45 3.238 2.012 1.262 1.563 1.262 3.613v7.25h2v1.5Zm7.75-7.25ZM12 21.8q-.75 0-1.275-.525Q10.2 20.75 10.2 20h3.6q0 .75-.525 1.275-.525.525-1.275.525Zm-4.25-4.425h8.5v-7.25q0-1.775-1.238-3.013Q13.775 5.875 12 5.875T8.988 7.112Q7.75 8.35 7.75 10.125Z" />
        </svg>
      );
    case "search":
      return (
        <svg
          {...rest}
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          width="24"
          fill="currentColor"
        >
          <path d="m19.55 20.575-6.3-6.275q-.75.625-1.725.975-.975.35-2 .35-2.575 0-4.35-1.775Q3.4 12.075 3.4 9.5q0-2.55 1.775-4.338 1.775-1.787 4.35-1.787 2.55 0 4.325 1.775 1.775 1.775 1.775 4.35 0 1.075-.35 2.05-.35.975-.95 1.7l6.275 6.275Zm-10.025-6.45q1.925 0 3.263-1.35 1.337-1.35 1.337-3.275 0-1.925-1.337-3.275-1.338-1.35-3.263-1.35-1.95 0-3.287 1.35Q4.9 7.575 4.9 9.5q0 1.925 1.338 3.275 1.337 1.35 3.287 1.35Z" />
        </svg>
      );
    case "thumbs-up":
      return (
        <svg
          {...rest}
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          width="24"
          fill="currentColor"
        >
          <path d="M17.725 20.5H7.2v-12l6.65-6.6.85.85q.15.15.25.412.1.263.1.488v.25L14 8.5h6.7q.7 0 1.25.55t.55 1.25v1.625q0 .15-.038.337-.037.188-.087.338L19.5 19.35q-.2.5-.712.825-.513.325-1.063.325ZM8.7 19h9.025q.1 0 .213-.062.112-.063.187-.188L21 12v-1.7q0-.125-.087-.213Q20.825 10 20.7 10h-8.6l1.25-5.475L8.7 9.15Zm0-9.85V19ZM7.2 8.5V10H4v9h3.2v1.5H2.5v-12Z" />
        </svg>
      );
    case "thumbs-up-filled":
      return (
        <svg
          {...rest}
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          width="24"
          fill="currentColor"
        >
          <path d="M17.725 20.5h-9.9v-12l6.625-6.6.85.85q.175.15.275.412.1.263.1.488v.25L14.6 8.5h6.1q.7 0 1.25.55t.55 1.25v1.625q0 .15-.038.337-.037.188-.087.338L19.5 19.35q-.2.5-.712.825-.513.325-1.063.325Zm-11.4-12v12H2.5v-12Z" />
        </svg>
      );
    case "x":
      return (
        <svg {...rest} fill="currentColor" width="29" height="29">
          <path
            d="M20.13 8.11l-5.61 5.61-5.6-5.61-.81.8 5.61 5.61-5.61 5.61.8.8 5.61-5.6 5.61 5.6.8-.8-5.6-5.6 5.6-5.62"
            fillRule="evenodd"
          ></path>
        </svg>
      );
    default:
      break;
  }
}

export default Icon;
