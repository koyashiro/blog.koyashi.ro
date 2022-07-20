import { useEffect } from "react";

const useUrlFragmentScroll = () => {
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash).replace("#", "");
    const element = document.getElementById(hash);
    element?.scrollIntoView();
  });
};

export default useUrlFragmentScroll;
