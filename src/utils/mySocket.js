import io from 'socket.io-client';
import token from '@/utils/token';
// const socket =  io.connect('http://localhost:9090');
// export default socket;

export function socket() {
  
  return socket = io.connect(SERVER_IP.SOCKET+`?token=${token.get()}`);
}
