import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import AOS from "aos";

export function useScroll() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }, [pathname, hash]);

  const scrollToAnchor = (id) => {
    if (pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return { scrollToAnchor };
}
