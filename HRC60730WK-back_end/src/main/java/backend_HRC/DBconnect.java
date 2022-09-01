package backend_HRC;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
public class DBconnect {
    private static String url = "jdbc:mysql://localhost:3306/grey_goose";    
    private static String driverName = "com.mysql.cj.jdbc.Driver";   
    private static String username = "root";   
    private static String password = "root@123";
    private static Connection con;
    private static String urlstring;

    public static Connection getConnect() throws ClassNotFoundException {
           Class.forName(driverName);                                    //Registering the jdbc driver                
            try {
               con = DriverManager.getConnection(url, username, password);//formulating the database url and establishing the connection
            } catch (SQLException ex) {
                System.out.println("Failed to create the database connection."); 
            }
        return con;
    }
}