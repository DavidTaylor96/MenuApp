import create from 'zustand';
import { io } from 'socket.io-client';
import { MenuItem } from '../types/menu';

// Define the shape of our store state and actions
interface SocketStoreState {
  data: string | null;
  basket: MenuItem[];
  addToBasket: (item: MenuItem) => void;
  removeFromBasket: (item: MenuItem) => void;
  sendData: (data: string) => void; 
}

const useSocketStore = create<SocketStoreState>((set) => {
  // Socket.io instance; replace 'localhost' with your computer's IP if testing on mobile devices or emulators
  const socket = io('http://0.0.0.0:3000');

  // Event listeners for Socket.io
  socket.on('connect', () => {
    console.log("Connected to Socket.io server");
  });

  socket.on('basketUpdate', (updatedBasket: MenuItem[]) => {
    set({ basket: updatedBasket });
  });

  socket.on('message', (data: string) => {
    set({ data });
  });

  socket.on('connect_error', (error: any) => {
    console.error("Socket.io connection error:", error);
  });

  socket.on('disconnect', (reason: string) => {
    if (reason === 'io server disconnect') {
      console.log('Disconnected by server');
    } else {
      console.error('Connection died:', reason);
    }
  });

  // Expose a function to send data via Socket.io
  const sendData = (data: string) => {
    socket.emit('message', data);
  };

    // Modify sendData to add/remove items from basket
    const addToBasket = (item: MenuItem) => {
      socket.emit('addToBasket', item);
    };
  
    const removeFromBasket = (item: MenuItem) => {
      socket.emit('removeFromBasket', item);
    };

    return {
      data: null,
      basket: [],
      addToBasket,
      removeFromBasket,
      sendData
    };
});

export default useSocketStore;
