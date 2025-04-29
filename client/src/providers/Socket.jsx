import React, { useMemo } from 'react';
import { io } from 'socket.io-client';

const SocketContext = React.createContext(null);

export const SocketProvider = (props) => {
  const socket = useMemo(() => io('http://localhost:8002'), []);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const socket = React.useContext(SocketContext);
  if (!socket) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return socket;
};
