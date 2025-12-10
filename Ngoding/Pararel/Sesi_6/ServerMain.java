import java.rmi.Naming;
 public class ServerMain {
    public static void main(String[] args) {
        try {
            TiketService service = new TiketServicelmpl();
            Naming.rebind("rmi://localhost:1099/TiketService", service);
            System.out.println("Server siap!");
        } catch (Exception e) {
            System.err.println("Server exception: " + e.toString());
            e.printStackTrace();
        }
    }

 }