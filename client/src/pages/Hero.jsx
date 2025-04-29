import React, { useEffect, useState } from 'react'
import { useSocket } from '../providers/Socket';
import { useNavigate } from "react-router-dom"

const Hero = () => {
    const socket = useSocket();
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [roomId, setRoomId] = useState();


    const handleRoomJoined = ({roomId}) => {
        console.log(roomId)
        navigate(`/room/${roomId}`);
    };
    
    useEffect(() => {
        socket.on("joined-room", handleRoomJoined);
    
        return () => {
            socket.off("joined-room", handleRoomJoined); // 
        };
    }, [socket, navigate]);
    


    const handleJoinRoom = () => {
        socket.emit("join-room", {
            emailId: email,
            roomId: roomId
        })
    }

    return (
        <div className="h-[100vh] w-full flex flex-col gap-10 justify-center items-center bg-[#0f0f0f] text-white">
            <h1 className="text-4xl text-center">Welcome to newCaller</h1>
            <div className="flex flex-col sm:flex-row gap-6">
                <input onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#1f1f1f] text-white placeholder-gray-400 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    type="email"
                    placeholder="Enter your email here"
                />
                <input onChange={(e) => setRoomId(e.target.value)}
                    className="bg-[#1f1f1f] text-white placeholder-gray-400 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    type="text"
                    placeholder="Enter room code"
                />
                <button onClick={handleJoinRoom} className="px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">
                    Enter Room
                </button>
            </div>
        </div>
    );


}

export default Hero