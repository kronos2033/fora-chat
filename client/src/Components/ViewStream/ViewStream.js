import axios from 'axios';
import React from 'react';
import './ViewStream.css';

export default function ViewStream() {
  async function startView() {
    const peer = createPeer();
    peer.addTransceiver('video', { direction: 'recvonly' });
  }

  function createPeer() {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.stunprotocol.org',
        },
      ],
    });
    peer.ontrack = handleTrackEvent;
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer);

    return peer;
  }

  async function handleNegotiationNeededEvent(peer) {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    const payload = {
      sdp: peer.localDescription,
    };

    const { data } = await axios.post('/consumer', payload);
    const desc = new RTCSessionDescription(data.sdp);
    peer.setRemoteDescription(desc).catch((e) => console.log(e));
  }

  function handleTrackEvent(e) {
    document.getElementById('video').srcObject = e.streams[0];
  }
  return (
    <div className='view-stream'>
      <button id='my-button' className='view-stream__btn' onClick={startView} />
    </div>
  );
}
