import { io } from 'socket.io-client';

// Create a new socket instance by calling the 'io' function with the server URL and options
const socket = io((process.env.REACT_APP_SERVER_URL || 'http://localhost:8000'), {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 50
});

export default socket;