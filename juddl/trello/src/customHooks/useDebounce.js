import React, { useContext } from "react";

const useDebounce = (cb, delay) => {
  let timer = 0;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb();
    }, delay);
  };
};

export default useDebounce;
