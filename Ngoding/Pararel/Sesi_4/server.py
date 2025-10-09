import socket

server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
host = '127.0.0.1'
port = 8080

server_socket.bind((host, port))
server_socket.listen(1)
print(f"Server berjalan di {host}:{port}, menunggu koneksi...")

conn, addr = server_socket.accept()
print(f"Terhubung dengan client dari {addr}")

while True:
    data = conn.recv(1024).decode()
    if not data:
        print("Client menutup koneksi.")
        break

    print(f"\nPesan dari client: {data}")

    balasan = input("Ketik balasan untuk client: ")

    conn.send(balasan.encode())

conn.close()
server_socket.close()
print("Server berhenti.")
