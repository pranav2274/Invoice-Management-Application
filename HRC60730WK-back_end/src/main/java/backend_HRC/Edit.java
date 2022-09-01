package backend_HRC;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/Edit")
public class Edit extends HttpServlet {
		
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.addHeader("Access-Control-Allow-Origin", "*");
		
		try {
					                            		
			String i_curr = request.getParameter("invoice_currency");                               
			String cust_pay_terms = request.getParameter("cust_payment_terms");
			String sl_no = request.getParameter("sl_no");             
			
			
			Connection con = DBconnect.getConnect();
			String query = "UPDATE winter_internship SET cust_payment_terms = ?, invoice_currency= ? where sl_no= ?";
			PreparedStatement st = con.prepareStatement(query);
			
			st.setString(1, cust_pay_terms);
			st.setString(2, i_curr);
			st.setString(3, sl_no);
			st.executeUpdate();
			System.out.print("Edit succesful");
			st.close();
			con.close();
		}
		catch(Exception e) {
			e.printStackTrace();
		
		}
	}

}
