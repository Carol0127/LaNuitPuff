import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { checkLogin } from "../services/admin";
import AdminHeader from "../components/admin/AdminHeader";
import AdminCheckLoading from "../components/admin/AdminCheckLoading";
import AdminFooter from "../components/admin/AdminFooter";

function AdminLayout() {
  const navigate = useNavigate();
  const [isCheck, setIsCheck] = useState(false);

  useEffect(() => {
    const auth = async () => {
      const res = await checkLogin();
      if (res && res.success) {
        setIsCheck(true);
      } else {
        navigate("/admin-login");
      }
    };
    auth();
  }, [navigate]);

  if (!isCheck) return <AdminCheckLoading />;
  return (
    <>
      <div className="layout-container">
        <AdminHeader />
        <main style={{ width: "100%", minWidth: 0, display: "block" }}>
          <Outlet />
        </main>
        <AdminFooter />
      </div>
    </>
  );
}

export default AdminLayout;
