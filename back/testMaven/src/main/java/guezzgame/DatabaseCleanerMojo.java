package guezzgame;

import org.apache.maven.plugin.AbstractMojo;
import org.apache.maven.plugin.MojoExecutionException;
import org.apache.maven.plugins.annotations.Mojo;
import org.apache.maven.plugins.annotations.Parameter;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

@Mojo(name = "clean-database")
public class DatabaseCleanerMojo extends AbstractMojo {

    @Parameter(property = "db.url", required = true)
    private String dbUrl;

    @Parameter(property = "db.user", required = true)
    private String dbUser;

    @Parameter(property = "db.password", required = true)
    private String dbPassword;

    public void execute() throws MojoExecutionException {
        Connection connection = null;
        Statement statement = null;
        try {
            // Establish the connection
            connection = DriverManager.getConnection(dbUrl, dbUser, dbPassword);
            statement = connection.createStatement();

            // Disable foreign key checks (MySQL specific, adapt as needed)
            statement.execute("SET FOREIGN_KEY_CHECKS = 0");
            List<String> tableNames = List.of("user", "friendship", "party", "inventory", "game", "user_parties",
                    "item",
                    "party", "games_parties");
            // Truncate each table
            for (String tableName : tableNames) {
                String sql = "TRUNCATE TABLE " + tableName;
                statement.execute(sql);
                System.out.println("Truncated table: " + tableName);
            }

            // Enable foreign key checks (MySQL specific, adapt as needed)
            statement.execute("SET FOREIGN_KEY_CHECKS = 1");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

}
