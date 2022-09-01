package backend_HRC;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/Delete")
public class Delete extends HttpServlet {
	
	
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.addHeader("Access-Control-Allow-Origin", "*");
		
		try {
			int sl_no = Integer.parseInt(request.getParameter("sl_no"));             
			
			
			Connection con = DBconnect.getConnect();
			String query = "DELETE FROM winter_internship WHERE sl_no= ?";
			PreparedStatement st = con.prepareStatement(query);
			st.setInt(1, sl_no);
			
			st.executeUpdate();
			System.out.print("Delete successful");
			st.close();
			con.close();
		}
		catch(Exception e) {
			e.printStackTrace();
		
		}
	}

}
