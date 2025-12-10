import java.rmi.server.UnicastRemoteObject;
import java.rmi.RemoteException;

public class TiketServicelmpl  extends UnicastRemoteObject implements TiketService {
    protected TiketServiceImpl() throws RemoteException {
        super();

    }
    @Override
    public String pesanTiket(String film, int jumlah) throws RemoteException{
        return "Tiket " + jumlah + " untuk film '" + film + "' brthasil dipesan!";
    }
}