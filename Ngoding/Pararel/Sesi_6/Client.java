import java.rmi.Naming;

public class Client {
    public static void main(String[] args) {
        try {
            TiketService service = (TiketService) Naming.lookup("rmi://localhost:1099/TiketService");
            String konfirmasi = service.pesanTiket("Avengers: Endgame", 2);
            System.out.println(konfirmasi);
        } catch (Exception e) {
            System.err.println("Client exception: " + e.toString());
            e.printStackTrace();
        }
    }
}