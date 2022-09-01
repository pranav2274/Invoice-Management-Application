package backend_HRC;

import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Servlet implementation class getrowsbyid
 */
@WebServlet("/getrowsbyid")
public class getrowsbyid extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.addHeader("Access-Control-Allow-Origin", "*");

		//int rowToGet = 11;
		
		try {
			//String pageInURL = request.getParameter("page");
			//int page = Integer.parseInt(pageInURL) * rowToGet; 
			int slno=Integer.parseInt(request.getParameter("sl_no"));
			Connection con = DBconnect.getConnect();
			Statement st = con.createStatement();
			String query = "SELECT * from winter_internship where sl_no="+"'"+slno+"'";
			ResultSet rs = st.executeQuery(query);
			ArrayList<Pojoclass> data = new ArrayList<>();
			while(rs.next())
			{
				Pojoclass inv = new Pojoclass();
				//inv.setSl_no(rs.getInt("sl_no"));
				inv.setBusiness_code(rs.getString("business_code"));
				inv.setCust_number(rs.getInt("cust_number"));
				inv.setClear_date(rs.getString("clear_date"));
				inv.setBusiness_year(rs.getString("buisness_year"));
				inv.setDoc_id(rs.getString("doc_id"));
				inv.setPosting_date(rs.getString("posting_date"));
				inv.setDocument_create_date(rs.getString("document_create_date"));
				inv.setDocument_create_date1(rs.getString("document_create_date1"));
				inv.setDue_in_date(rs.getString("due_in_date"));
				inv.setInvoice_currency(rs.getString("invoice_currency"));
				inv.setDocument_type(rs.getString("document_type"));
				inv.setPosting_id(rs.getInt("posting_id"));
				//inv.setArea_business(rs.getString("area_business"));
				//inv.setTotal_open_amount(rs.getDouble("total_open_amount"));
				inv.setBaseline_create_date(rs.getString("baseline_create_date"));
				inv.setCust_payment_terms(rs.getString("cust_payment_terms"));
				inv.setInvoice_id(rs.getInt("invoice_id"));
				inv.setIsOpen(rs.getInt("isOpen"));
				inv.setCust_name(" ");
				inv.setConvertedusd("USD");
			    //inv.setaging_bucket(rs.getString("aging_bucket"));
				
				data.add(inv);
			}
			Gson gson = new GsonBuilder().serializeNulls().create();
			String invoices  = gson.toJson(data);
			response.setContentType("application/json");
			try {
				response.getWriter().write(invoices);//getWriter() returns a PrintWriter object that can send character text to the client. 
				System.out.print("sent\n");			
				}
			catch(IOException e)
			{
				e.printStackTrace();
              
			}
			rs.close();
			st.close();
			con.close();
			
		}
		catch(SQLException e) {
			e.printStackTrace();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	}
}
