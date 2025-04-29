import React, { useMemo } from 'react'

const peerContext = React.createContext(null);


export const usePeer = ()=> React.useContext(peerContext);

export const PeerProvider = (props) => {

    const peer = useMemo(() => new RTCPeerConnection({
        iceServers: [
            {
                urls: [
                    "stun:stun.l.google.com:19302",
                    "stun:global.stun.twilio.com:3478"
                ]
            }
        ]
    }), []);


    const createOffer = async () => {
        const offer = await peer.createOffer(peer);
        await peer.setLocalDescription(offer);
        return offer;
    }

    return (
        <peerContext.Provider value={{peer , createOffer }}>
            {props.children}
        </peerContext.Provider>
    )
}
