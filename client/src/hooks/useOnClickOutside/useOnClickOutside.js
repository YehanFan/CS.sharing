import { useEffect } from "react";

export default function useOnClickOutside(ref, handler, exceptions = []) {
  // calls handler if a click happens outside the ref current element

  useEffect(() => {
    function listener(e) {
      //if the element in the ref is being clicked or its children, do nothing
      //else if element is listed in the exceptions array, do nothing
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      } else if (exceptions.includes(e.target.tagName)) {
        return;
      }

      //else call the handler callback
      handler(e);
    }

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    //cleans up the the event listeners to prevent bloating the memory usage of the user
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, exceptions]);
}
