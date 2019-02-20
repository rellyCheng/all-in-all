import io from 'socket.io-client';
import token from '@/utils/token';
// const socket =  io.connect('http://localhost:9090');
// export default socket;

export function socket() {
  let SOCKET_SERVER = 'http://118.24.218.25:9090';
  if(process.env.API_ENV=='dev'){
    SOCKET_SERVER = 'http://192.168.1.160:9090';
  }    
  return socket = io.connect(`${SOCKET_SERVER}?token=${token.get()}`);
}
