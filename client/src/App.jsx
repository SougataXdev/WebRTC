import { Route, Routes } from "react-router-dom";
import Hero from "./pages/Hero";
import { SocketProvider } from "./providers/Socket";
import Room from "./pages/Room";
import { PeerProvider } from "./providers/Peer";

function App() {
  return (
    <SocketProvider>
      <PeerProvider>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/room/:roomId" element={<Room />} />
        </Routes>
      </PeerProvider>
    </SocketProvider>
  );
}

export default App;
