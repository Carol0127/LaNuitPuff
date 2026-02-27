import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToHash from "../hooks/scrollToHash";

function FrontendLayout() {
  return (
    <>
      <div className="layout-container">
        <ScrollToHash />
        <Header />
        <main style={{ width: "100%", minWidth: 0, display: "block" }}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default FrontendLayout;
