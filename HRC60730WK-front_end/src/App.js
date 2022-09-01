import logo from './logo.svg';
import './App.css';

import Header from './components/Header';
//import NavbarComponent from './components/Navbar/NavbarComponent';
//import Datagrid from './components/Datagrid/Datagrid';
import Dashboard from "./components/Dashboard";
import Footer from "./components/footer"

const App = () =>{
 return (
     <div>
      <Header />  
     {/* <NavbarComponent />
       <Datagrid /> */}
      <Dashboard />; 
      <Footer />
    </div>
 )
}
export default App;
