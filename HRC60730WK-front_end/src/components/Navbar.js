import React, {useState} from 'react'
import { Button, Icon, TextField} from "@material-ui/core";
import RefreshIcon from '@material-ui/icons/Refresh';
import axios from 'axios';
// import TableComponent from '../Table/TableComponent';



const Navbar = (props) => {

   const [sfvalues, setSfvalues] = useState({});
   const handleFieldValue = (e) => {
    const { name, value } = e.target;
     setSfvalues({
       ...sfvalues,
      [name]: value,
    });
  };
  const searchField = async () => {
    const response = await axios.post(`http://localhost:8080/backend_HRC/Search?cust_number=${sfvalues.cust_number}`)
         
         props.sdata(response.data)
         props.handleshowsearch()
   };




  //const [searchField, setSearchField] = useState("");
 //  const handleChange = e => {
   // setSearchField(e.target.value);
  //};

  //function refreshPage() {
  //  window.location.reload(false);
  //}
  

  return (

    <div className='navbar' >
      <div className='left'>
        {/*Predict button */}
        <Button
          onClick={props.predictClick}
          variant="outlined"
          style={{
            border: "2px solid #3f51b5", color: "white", borderRadius: '10px 0 0 10px',
            minWidth: "9.5rem", backgroundColor: '#14aff1'
          }}
        >
          Predict
        </Button>
        {/*Analytical view button */}
        <Button
          onClick={props.predictClick}
          variant="outlined"
          style={{
            borderBottom: '2px solid rgb(63, 81, 181)', borderTop: '2px solid rgb(63, 81, 181)', color: "white", borderRadius: '0px',
            minWidth: "9.5rem",
          }}
        >
          Analytics View
        </Button>
       {/*Advance Search Button*/}
        <Button
          onClick={props.adSearchClick}
          variant="outlined"
          style={{
            border: "2px solid #3f51b5", color: "white", borderRadius: '0 10px 10px 0',
            minWidth: "9.5rem"
          }}
        >
          Advance Search
        </Button>

{/* Refresh Button */}
    
        <Button
          onMouseDown={ ()=>{
               props.refreshClick();
               props.handleCloseserach();}}
          onMouseUp={props.refreshReset}
          variant="outlined"
          style={{
            border: "2px solid #3f51b5", color: "white", borderRadius: '10px',
            minWidth: "1rem", marginLeft: "10px"
          }}>
            <Icon component={RefreshIcon}/>
          
        </Button>
        
      </div>
   {/* Add button  */}
      <div className='right'>
        <Button
          onClick={props.addClick}
          variant="outlined"
          style={{
            border: "2px solid #3f51b5", color: "white", borderRadius: '10px 0 0 10px',
            minWidth: "9.5rem"
          }}
        >
          Add
        </Button>
        {/*Edit button */}
        <Button
          onClick={props.editClick}
          variant="outlined"
          style={{
            borderBottom: '2px solid rgb(63, 81, 181)',
            color: "white", borderTop: '2px solid rgb(63, 81, 181)', borderRadius: '0px',
            minWidth: "9.5rem"
          }}
        >
          Edit
        </Button>
        {/*Delete button */}
        <Button
          onClick={props.deleteClick}
          variant="outlined"
          style={{
            border: "2px solid #3f51b5", color: "white", borderRadius: '0 10px 10px 0',
            minWidth: "9.5rem"
          }}
        >
          Delete
        </Button>
      </div>

      <div className="search-box">
        <TextField className="search-txt" type="text" onChange = {handleFieldValue} name="cust_number" id="search-inv" placeholder="Search by Customer number"
         value={sfvalues.cust_number} 
          onKeyPress={(e) => {
          if (e.key === "Enter") {
             searchField();
          }
        }} />
      </div>

    </div>
  );
};

export default Navbar;