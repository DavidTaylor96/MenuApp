import express, { Request, Response } from 'express';
import { Server } from 'socket.io';
import http from 'http';

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

const app = express();
const httpServer = http.createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Express with Socket.io and TypeScript!');
});

io.on('connection', (socket) => {
  socket.emit('noArg');
  socket.emit('basicEmit', 1, '2', Buffer.from([3]));
  socket.emit('withAck', '4', (e) => {});

  socket.on('hello', () => {
    console.log('Hello received from client.');
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
