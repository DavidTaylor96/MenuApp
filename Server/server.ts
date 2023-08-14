import express, { Request, Response } from 'express';
import { Server, Socket } from 'socket.io';
import http from 'http';
import { MenuItem} from '../types/menu'

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",  // Adjust as needed, '*' allows any origin but is not recommended for production.
    methods: ["GET", "POST"]
  }
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express with Socket.io and TypeScript!');
});

let basket: MenuItem[] = [];
io.on('connection', (socket: Socket) => {
  console.log('Client connected:', socket.id);

  // Listening for the 'message' event (matching the client-side)
  socket.on('message', (data: string) => {
    console.log('Received message from client:', data);

    // Broadcasting to all clients (including the sender)
    io.emit('message', data);
  });

  socket.on('addToBasket', (item: MenuItem) => {
    basket.push(item);
    io.emit('basketUpdate', basket);  // Send updated basket to all clients
  });
  
  socket.on('removeFromBasket', (item: MenuItem) => {
    basket = basket.filter(basketItem => basketItem.name !== item.name);
    io.emit('basketUpdate', basket);  // Send updated basket to all clients
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
