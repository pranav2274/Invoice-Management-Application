package backend_HRC;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Updateaging_bucket
 */
@WebServlet("/Updateaging_bucket")
public class Updateaging_bucket extends HttpServlet {
	
    
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
response.addHeader("Access-Control-Allow-Origin", "*");
		
		try {
					                            		
			String sl_no = request.getParameter("sl_no");                               
			String aging_bucket = request.getParameter("aging_bucket");  
			Connection con = DBconnect.getConnect();
			String query = "UPDATE winter_internship SET aging_bucket = ?  where sl_no= ?";
			PreparedStatement st = con.prepareStatement(query);
			st.setString(1, aging_bucket);
			st.setString(2, sl_no);
			st.executeUpdate();
			st.close();
			con.close();
		}
		catch(Exception e) {
			e.printStackTrace();
		
		}
		
	}

	
}
