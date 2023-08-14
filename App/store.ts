// store.ts (changing extension to .ts)
import create, { SetState } from 'zustand';

// Define the shape of our store state and actions
interface SocketStoreState {
  data: string | null;  // Assuming data received from WebSocket is a string; adjust as necessary
  sendData: (data: string) => void;  // Adjust the data type if needed
}

const useSocketStore = create<SocketStoreState>((set) => {
  // WebSocket instance
  const socket = new WebSocket('ws://localhost:3000');

  // Event listeners for the WebSocket
  socket.onopen = (event: Event) => {
    console.log("WebSocket connection opened:", event);
  };

  socket.onmessage = (event: MessageEvent) => {
    const data = event.data;
    set({ data });
  };

  socket.onerror = (error: Event) => {
    console.error("WebSocket error:", error);
  };

  socket.onclose = (event: CloseEvent) => {
    if (event.wasClean) {
      console.log(`Closed cleanly, code=${event.code}, reason=${event.reason}`);
    } else {
      console.error('Connection died');
    }
  };

  // Expose a function to send data via WebSocket
  const sendData = (data: string) => {  // Ensure data type matches your requirements
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(data);
    }
  };

  return {
    data: null,
    sendData
  };
});

export default useSocketStore;
