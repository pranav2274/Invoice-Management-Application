import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';

function Datagrid(props) {
const [isLoaded,setIsLoaded] = useState(false);
  const [data,setData] = useState([]);
  const [pageSize, setPageSize] = useState(5);
 

  useEffect(() => {
    
    if(props.showsearch===true)
    {setData(props.data);}
    else{
      axios.post('http://localhost:8080/backend_HRC/Receive').then((response) => {
        setIsLoaded(true);
        console.log(response.data);
        setData(response.data);
        response.data.forEach(user => {
        });
      });}
  }, [props.showsearch,props.refresh]);

  const columns = [
  { field: "sl_no", headerName: "Sl no", width: 110 },
  { field: "business_code", headerName: "Business Code", width: 180 },
  { field: "cust_number", headerName: "Customer Number", width: 200 },
  { field: "clear_date", headerName: "Clear Date", width: 150 },
  { field: "business_year", headerName: "Business Year", width: 200 },
  { field: "doc_id", headerName: "Document ID", width: 200 },
  { field: "posting_date", headerName: "Posting Date", width: 200 },
  { field: "document_create_date", headerName: "Document Create Date", width: 180 },
  { field: "due_in_date", headerName: "Due Date", width: 150 },
  { field: "invoice_currency", headerName: "Invoice Currency", width: 180 },
  { field: "document_type", headerName: "Document Type", width: 200 },
  { field: "posting_id", headerName: "Posting ID", width: 150 },
  { field: "total_open_amount", headerName: "Total Open Amount", width: 150 },
  { field: "baseline_create_date", headerName: "Baseline Create Date", width: 150 },
  { field: "cust_payment_terms", headerName: "Customer Payment Terms", width: 200 },
  { field: "invoice_id", headerName: "Invoice ID", width: 150 },
  { field: "isOpen", headerName: "isOpen", width: 150 },
  { field: "aging_bucket", headerName: "Aging bucket", width: 150 }
  ];

  
  return (
    <div style={{ height: 400, width: "100%", marginTop: "7vh"}} >
      <DataGrid
        rows={data}
        getRowId={(row) => row.sl_no}
        columns={columns}
        checkboxSelection
        onSelectionModelChange={props.setSelectionModel}
          selectionModel={props.selectionModel}
        disableSelectionOnClick
        style={{ color: "white", border:'none'}}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 15, 20]}
        pagination
      />
    </div>
  );
  }

export default Datagrid;