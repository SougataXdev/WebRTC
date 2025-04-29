import { useCallback, useEffect } from 'react';
import { useSocket } from '../providers/Socket';
import { usePeer } from '../providers/Peer';

const Room = () => {
    const socket = useSocket();
    console.log("Socket connected:", socket.connected);

    const { peer, createOffer } = usePeer();

    const newUserJoined = useCallback(async (data) => {
        const { emailId } = data;
        console.log("New User Joined Room:", emailId);
        const offer = await createOffer();
        socket.emit("call-user", { emailId, offer });
        console.log("calling user" , emailId)
    }, [createOffer, socket]);


    const handleIncomingCall = useCallback((data) => {
        console.log("Incoming call received from:", data.from);
    }, []); // No dependencies to ensure stability

    useEffect(() => {
        console.log("Registering event listeners");
        socket.on('user-joined', newUserJoined);

        return () => {
            console.log("Cleaning up event listeners");
            socket.off('user-joined', newUserJoined);
        };
    }, [socket, newUserJoined]);

    useEffect(() => {
        console.log("Registering 'incoming-call' event listener");
        socket.off('incoming-call'); 
        socket.on('incoming-call', handleIncomingCall);

        return () => {
            console.log("Cleaning up 'incoming-call' event listener");
            socket.off('incoming-call', handleIncomingCall);
        };
    }, [socket, handleIncomingCall]);

    return (
        <>
            <div>Room Component</div>
        </>
    );
};

export default Room;
