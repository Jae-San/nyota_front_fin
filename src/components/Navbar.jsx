import { Avatar } from "primereact/avatar";

export default function Navbar() {

  return (

    <div className="flex justify-content-between align-items-center p-3 shadow-1">

      <h2>Dashboard</h2>

      <Avatar icon="pi pi-user" shape="circle" />

    </div>

  );

}