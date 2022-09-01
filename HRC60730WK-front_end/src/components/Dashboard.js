import React, { useState } from "react";
import { Button } from "@material-ui/core";
import Navbar from './Navbar';
import Datagrid from './Datagrid';
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from 'axios';

const inival={
  doc_id:0,
  invoice_id:0,
  cust_number:0,
  business_year:"",
}
const Dashboard = () => {

  // States and methods for Managing Add Dialog
  const [openAdd, setOpenAdd] = useState(false);
  const addClick = () =>setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const [values, setValues] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }
  const addData =async () =>{
    console.log(values)
    
    try {  
      if(values.business_code===undefined || values.cust_number===undefined || values.clear_date===undefined || 
        values.due_date===undefined || values.doc_id===undefined || values.total_open_amt===undefined ||
        values.business_year===undefined || values.document_create_date===undefined || values.invoice_currency===undefined
        ||values.doc_type===undefined ||values.posting_date===undefined || values.posting_id===undefined || values.baseline_create_date===undefined ||
         values.cust_payment_terms===undefined || values.invoice_id===undefined)
        {alert('PLease enter all the fields')}
      else{
     const response = await axios.get(`http://localhost:8080/backend_HRC/Add?business_code=${values.business_code}&cust_number=${values.cust_number}&clear_date=${values.clear_date}&business_year=${values.business_year}&doc_id=${values.doc_id}&posting_date=${values.posting_date}&document_create_date=${values.document_create_date}&due_date=${values.due_date}&invoice_currency=${values.invoice_currency}&doc_type=${values.doc_type}&posting_id=${values.posting_id}&total_open_amt=${values.total_open_amt}&baseline_create_date=${values.baseline_create_date}&invoice_id=${values.invoice_id}&cust_payment_terms=${values.cust_payment_terms}`
     );
     if(response.status!==200)
      {alert("The record is not added!")}
      else
      {alert("Record successfully added")}
      }
    }
       catch(error){
         console.log(error);
       }
  }

  // States and methods for Managing Delete Dialog
  const [selectionModel, setSelectionModel] = useState([]);
  //console.log(selectionModel);
    const [openDelete, setOpenDelete] = useState(false);
    const deleteClick = () => {
      for (let i in selectionModel) {
        if (i >= 0) {
          setOpenDelete(true);
        }
      }
    }
    const handleCloseDelete = () => setOpenDelete(false);
    const opDelete = () => {
      for (let i in selectionModel) {
        const response= axios.get(`http://localhost:8080/backend_HRC/Delete?sl_no=${selectionModel[i]}`)
      }
};

  // States and methods for Managing Edit Dialog
  const [openEdit, setOpenEdit] = useState(false);
  const editClick = () => {
    if (selectionModel > 0) {
      setOpenEdit(true);
    }
  }
  const handleCloseEdit = () => setOpenEdit(false);
  const [edtvalues, setEdtvalues] = useState({});

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEdtvalues({
      ...edtvalues,
      [name]: value,
    });
  };
  const editData = async () => {
    if(edtvalues.invoice_currency===undefined || edtvalues.cust_payment_terms==undefined){
      alert("Please enter both the fields.")}
   else{
    const response=await axios.post(`http://localhost:8080/backend_HRC/Edit?sl_no=${selectionModel}&invoice_currency=${edtvalues.invoice_currency}&cust_payment_terms=${edtvalues.cust_payment_terms}`);
      if (response.status === 200) 
      { alert("Fields edited successfully") }
      else
      { alert("Field not added")}
    }
  }
  // States and methods for managing Advance Search Dialog
  const [openSearch, setOpenSearch] = useState(false);
  const adSearchClick = () => setOpenSearch(true);
  const handleCloseSearch = () => setOpenSearch(false);
  const [adsval, setADSval] = useState(inival);
 const [showsearch,setShowsearch]=useState(false);
  const handleshowsearch = () => setShowsearch(true);
  const handleClosesearch= () => setShowsearch(false);
  const [data,setData]=useState([]);
   const handleADChange = (e) => {
    const { name, value } = e.target;
    setADSval({
      ...adsval,
      [name]: value,
    });
  }
  const adsData =async () =>{
  
    try {  
     const response = await axios.get(`http://localhost:8080/backend_HRC/Adsearch?doc_id=${adsval.doc_id}&cust_number=${adsval.cust_number}&invoice_id=${adsval.invoice_id}&business_year=${adsval.business_year}`
     );
     //if(response.status!==200)
     //  {alert("Wrong Input")}
     console.log(response.data);
     setData(response.data);
     handleshowsearch();
    }
       catch(error){
         console.log(error);
       }
  }

//refresh part
const [refresh, setRefresh] = useState(false);
const refreshClick = () => { setRefresh(true) };
const refreshReset = () => setRefresh(false);

//predict part 
/*const predictClick=async () =>{
   console.log("hello")
   for (let i in selectionModel) {
    console.log(selectionModel[i])
     const response=await axios.get(`http://localhost:8080/backend_HRC/getrowsbyid?sl_no=${selectionModel[i]}`)
    console.log(response.data)
    const res=await axios.post('http://127.0.0.1:5000/',response.data[0])
    if(res.status==200){
      const r=await axios.get(`http://localhost:8080/backend_HRC/getrowsbyid?sl_no=${selectionModel[i]}&aging_bucket=${res.data.aging_bucket}`)
     }
   }
   setRefresh(true)
}*/


  return (
    <>
      <div>
        <Navbar
          addClick={addClick}
          deleteClick={deleteClick}
          editClick={editClick}
          adSearchClick={adSearchClick}
          refreshClick={refreshClick}
          refreshReset={refreshReset}
          handleshowsearch={handleshowsearch}
          handleCloseserach={handleClosesearch}
          sdata={setData}
        />
        <Datagrid 
            showsearch={showsearch}
            refresh={refresh}
            data={data}
            selectionModel={selectionModel}
            setSelectionModel={setSelectionModel}
            />
      </div>


      {/*Dialog Box for advance search*/}
      <Dialog open={openSearch} onClose={handleCloseSearch}>
        <div className="adsearchDialogBox" >
          <DialogTitle>Advance Search</DialogTitle>
          <DialogContent>

            
            <TextField id="ads" label="Document ID" variant="filled" value={adsval.doc_id} onChange={handleADChange}  name="doc_id" />
            <TextField id="ads" label="Invoice ID" variant="filled" value={adsval.invoice_id} onChange={handleADChange} name="invoice_id"/>
            <TextField id="ads" label="Customer Number" variant="filled" value={adsval.cust_number} onChange={handleADChange}  name="cust_number" />
            <TextField id="ads" label="Business Year" variant="filled" value={adsval.business_year} onChange={handleADChange} name="business_year"/>
            

          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseSearch} style={{
              border: '2px solid white',
              color: 'white',
              display: 'flex',
              flex: 'auto'
            }}>
              Cancel
            </Button>
            <Button onClick={(e) => {handleCloseSearch();adsData(); }} style={{
              border: '2px solid white',
              color: 'white',
              display: 'flex',
              flex: 'auto'
            }}>
              Search
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    
      {/* Dialog Box for Add Button */}
      <Dialog
        open={openAdd}
        onClose={handleCloseAdd}
        maxWidth={"xl"}>
        <div className="addDialogBox" >
          <DialogTitle >Add</DialogTitle>
          <DialogContent >

            
            <TextField id="Id" label="Buisness Code" variant="filled" value={values.business_code} onChange={handleInputChange}  name="business_code"/>
            <TextField id="Id" label="Customer Number" variant="filled"  value={values.cust_number} onChange={handleInputChange}  name="cust_number"/>
            <TextField id="Id" label="Clear Date" variant="filled" type={'date'} 
              InputLabelProps={{shrink: true,}} value={values.clear_date} onChange={handleInputChange} name="clear_date" />
            <TextField id="Id" label="Business Year" variant="filled" type={'year'} InputLabelProps={{
                        shrink: true,}}value={values.business_year} onChange={handleInputChange} name="business_year"/>
            <TextField id="Id" label="Document Id" variant="filled" value={values.doc_id} onChange={handleInputChange} name="doc_id" />
            <TextField id="Id" label="Document Create Date" variant="filled" type={'date'} InputLabelProps={{
                          shrink: true,}} value={values.document_create_date} onChange={handleInputChange} name="document_create_date"/>
            <TextField id="Id" label="Due Date" variant="filled" type={'date'} InputLabelProps={{
                        shrink: true,}}value={values.due_date} onChange={handleInputChange} name="due_date"/>
            <TextField id="Id" label="Invoice Currency" variant="filled" value={values.invoice_currency} onChange={handleInputChange} name="invoice_currency"/>
            <TextField id="Id" label="Document Type" variant="filled" value={values.doc_type} onChange={handleInputChange} name="doc_type"/>
            <TextField id="Id" label="Posting Date" variant="filled" type={'date'} InputLabelProps={{
                          shrink: true,}} value={values.posting_date} onChange={handleInputChange} name="posting_date"/>
            <TextField id="Id" label="Posting Id" variant="filled" value={values.posting_id} onChange={handleInputChange} name="posting_id"/>
            <TextField id="Id" label="Total open amount" variant="filled" value={values.total_open_amt} onChange={handleInputChange} name="total_open_amt"/>
            <TextField id="Id" label="Baseline Create Date" variant="filled" type={'date'} InputLabelProps={{
                          shrink: true,}} value={values.baseline_create_date} onChange={handleInputChange} name="baseline_create_date"/>
            <TextField id="Id" label="Customer Payment Terms" variant="filled" value={values.cust_payment_terms} onChange={handleInputChange} name="cust_payment_terms"/>
            <TextField id="Id" label="Invoice Id" variant="filled" value={values.invoice_id} onChange={handleInputChange} name="invoice_id"/>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAdd} style={{
              border: '2px solid white',
              color: 'white',
              display: 'flex',
              flex: 'auto'
            }}>
              Cancel
            </Button>
            <Button  onClick={(e) => { handleCloseAdd(); addData();}} style={{
              border: '2px solid white',
              color: 'white',
              display: 'flex',
              flex: 'auto'
            }}>
              Add
            </Button>
          </DialogActions>
        </div>
      </Dialog>

      {/* Dialog Box for Delete Button */}
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <div style={{ backgroundColor: '#263845' }}>
          <DialogTitle style={{color:'white'}}>Delete Records?</DialogTitle>
          <DialogContent>
            <DialogContentText style={{color:'white'}}>
              Are you sure you want to delete these record[s]?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { handleCloseDelete(); opDelete(); }} color="primary">
              Yes
            </Button>
            <Button onClick={handleCloseDelete} color="primary">
              No
            </Button>
          </DialogActions>
        </div>
      </Dialog>

      {/* Dialog Box for Edit Button */}
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <div className="editDialogBox" >
          <DialogTitle>Edit</DialogTitle>
          <DialogContent>

            <TextField id="Edt" label="Invoice Currency" variant="filled" value={edtvalues.invoice_currency}
                onChange={(e) => { handleEditChange(e) }}
                name="invoice_currency" /> 
            <TextField id="Edt" label="Customer Payment Terms" variant="filled" value={edtvalues.cust_payment_terms}
                onChange={(e) => { handleEditChange(e) }}
                name="cust_payment_terms" />
      
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit} style={{
              border: '2px solid white',
              color: 'white',
              display: 'flex',
              flex: 'auto'
            }}>
              Cancel
            </Button>
            <Button onClick={(e) => { handleCloseEdit(); editData(); }} style={{
              border: '2px solid white',
              color: 'white',
              display: 'flex',
              flex: 'auto'
            }}>
              Edit
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
}

export default Dashboard;