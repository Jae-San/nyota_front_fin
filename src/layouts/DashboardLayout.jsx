import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }) {

  return (

    <div className="flex">

      <Sidebar />

      <div className="flex flex-column flex-grow-1">

        <Navbar />

        <div className="p-4">
          {children}
        </div>

      </div>

    </div>

  );

}