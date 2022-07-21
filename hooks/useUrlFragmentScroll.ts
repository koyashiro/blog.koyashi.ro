import { useEffect } from "react";

const useUrlFragmentScroll = () => {
  useEffect(() => {
    let hash = decodeURIComponent(window.location.hash);
    if (hash.startsWith("#")) {
      hash = hash.slice(1);
    }
    const element = document.getElementById(hash);
    element?.scrollIntoView();
  });
};

export default useUrlFragmentScroll;
