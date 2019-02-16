import io from 'socket.io-client';
// const socket =  io.connect('http://localhost:9090');
// export default socket;

export function socket() {
  return (socket = io.connect('http://192.168.1.160:9090?userId=1'));
}
