package backend_HRC;

import java.io.IOException;
import java.io.PrintWriter;
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



@WebServlet("/Adsearch")
public class Adsearch extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
 
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		/*response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		
		PrintWriter out = response.getWriter();
		
		int rowCount = 12;*/
		response.addHeader("Access-Control-Allow-Origin", "*");
		try {
			
			
			Connection con = DBconnect.getConnect();
			
			String invoice_id = request.getParameter("invoice_id");
			String doc_id = request.getParameter("doc_id");
			String cust_no=request.getParameter("cust_number");
            String b_year=request.getParameter("business_year");
			
			Statement st = con.createStatement();
			String sql_statement = "SELECT * FROM winter_internship WHERE invoice_id=" + "'"+invoice_id+"'"+"AND doc_id="+"'"+doc_id+"'"+" AND cust_number="+"'"+cust_no+"'"+" AND buisness_year="+"'"+b_year+"'";    
			ResultSet rs = st.executeQuery(sql_statement);

			ArrayList<Pojoclass> data = new ArrayList<>();
			while(rs.next())
			{
				Pojoclass inv = new Pojoclass();
				inv.setSl_no(rs.getInt("sl_no"));
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
				inv.setTotal_open_amount(rs.getDouble("total_open_amount"));
				inv.setBaseline_create_date(rs.getString("baseline_create_date"));
				inv.setCust_payment_terms(rs.getString("cust_payment_terms"));
				inv.setInvoice_id(rs.getInt("invoice_id"));
				inv.setIsOpen(rs.getInt("isOpen"));
			   //inv.setaging_bucket(rs.getString("aging_bucket"));
				
				data.add(inv);
			}
			Gson gson = new GsonBuilder().serializeNulls().create();
			String invoices  = gson.toJson(data);
			response.setContentType("application/json");
			try {
				response.getWriter().write(invoices);//getWriter() returns a PrintWriter object that can send character text to the client. 
				System.out.print("Search successful\n");			
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