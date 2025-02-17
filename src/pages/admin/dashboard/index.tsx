import Dashboard from "../../../../components/Admin/Dashbord/dashboard";
import Footer from "../../../../components/Footer/Footer";
import Navbar from "../../../../components/Navbar/Navbar";
import "../../../../components/Navbar/Navbar.css"


function DashboardPage (){
  return (
    <div>
    <Navbar/>
    <Dashboard/>
    <Footer/>
    
    </div>
  );
}

export default DashboardPage;
