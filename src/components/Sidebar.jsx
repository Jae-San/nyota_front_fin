import { Menu } from "primereact/menu";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {

  const navigate = useNavigate();

  const items = [

    {
      label: "Dashboard",
      icon: "pi pi-home",
      command: () => navigate("/dashboard")
    },

    {
      label: "Profil",
      icon: "pi pi-user",
      command: () => navigate("/profile")
    },

    {
      label: "CV",
      icon: "pi pi-file",
      command: () => navigate("/cv")
    },

    {
      label: "Test",
      icon: "pi pi-chart-bar",
      command: () => navigate("/test")
    }

  ];

  return (

    <div style={{ width: "250px" }} className="p-3 shadow-2 min-h-screen">

      <h3>NYOTA</h3>

      <Menu model={items} />

    </div>

  );

}