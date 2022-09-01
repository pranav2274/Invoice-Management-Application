package backend_HRC;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Map.Entry;
import java.sql.Date;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;


@WebServlet("/Add")
public class Add extends HttpServlet {
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.addHeader("Access-Control-Allow-Origin", "*");
		PrintWriter out = response.getWriter();
		System.out.print("AABB-1");
		try {
			String b_year = request.getParameter("business_year");
			//Date bu_year = Date.valueOf(b_year);
			String c_date = request.getParameter("clear_date");
			//Date cl_date = Date.valueOf(c_date);
			String p_date = request.getParameter("posting_date");
			//Date po_date = Date.valueOf(p_date);
			String doc_c_date = request.getParameter("document_create_date");
			//Date doc_cr_date = Date.valueOf(doc_c_date);
			String d_date = request.getParameter("due_date");
			//Date du_date = Date.valueOf(d_date);
			String b_c_date = request.getParameter("baseline_create_date");                      
			//Date baseline_cr_date = Date.valueOf(b_c_date);
			
			String business_code= request.getParameter("business_code");                                  
			String doc_id = request.getParameter("doc_id");                                     		
			String i_curr = request.getParameter("invoice_currency");                               
			String doc_type = request.getParameter("doc_type");       
			String cust_pay_terms = request.getParameter("cust_payment_terms");
			String p_id = request.getParameter("posting_id");                    
			String cust_number = request.getParameter("cust_number");  
			String t_o_amt = request.getParameter("total_open_amt");    
			String invoice_id =request.getParameter("invoice_id");             
			
			Connection con = DBconnect.getConnect();
			con.setAutoCommit(false);
			
			String q1="SELECT COUNT(*) FROM business where business_code="+"'"+business_code+"'";
			String q2="SELECT COUNT(*) FROM customer where cust_number="+"'"+cust_number+"'";
			Statement st = con.createStatement();
			ResultSet r=st.executeQuery(q1);
			 r.next();
		    int count = r.getInt(1);
		    ResultSet rr=st.executeQuery(q2);
		    rr.next();
		    int count2=rr.getInt(1);
			if(count==0 && count2==0) {
				String query1="INSERT Into business (business_code) values (?)";
			     PreparedStatement s=con.prepareStatement(query1);
				  s.setString(1,business_code);
				  s.executeUpdate();
				  String query2 ="INSERT Into Customer(cust_number) values (?)";
					PreparedStatement ss=con.prepareStatement(query2);
					ss.setString(1,cust_number);
					ss.executeUpdate();
			}
			else if(count2==0 && count!=0) {
				String query2 ="INSERT Into Customer(cust_number) values (?)";
				PreparedStatement ss=con.prepareStatement(query2);
				ss.setString(1,cust_number);
				ss.executeUpdate();
			}
			else if(count==0 && count2!=0)
			{
			 String query1="INSERT Into business (business_code) values (?)";
		     PreparedStatement s=con.prepareStatement(query1);
			  s.setString(1,business_code);
			  s.executeUpdate();
			}
		    String query3 = "INSERT INTO winter_internship (business_code, cust_number, clear_date, buisness_year, doc_id, posting_date, document_create_date, due_in_date, invoice_currency, document_type, posting_id, total_open_amount, baseline_create_date, cust_payment_terms, invoice_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
			PreparedStatement stt = con.prepareStatement(query3);
			stt.setString(1,business_code);
			stt.setString(2, cust_number);
			stt.setString(3, c_date);
			stt.setString(4, b_year);
			stt.setString(5,doc_id);
			stt.setString(6, p_date);
			stt.setString(7, doc_c_date);
			stt.setString(8,d_date);
			stt.setString(9, i_curr);
			stt.setString(10, doc_type);
			stt.setString(11, p_id);
			stt.setString(12, t_o_amt);
			stt.setString(13, b_c_date);
			stt.setString(14, cust_pay_terms);
			stt.setString(15,invoice_id);
			stt.executeUpdate();
			con.commit();
			System.out.println("Add successful");
			st.close();
			stt.close();
			con.close();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		}
		
	}