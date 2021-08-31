import './StartStream.css';
import axios from 'axios';

import React from 'react';

export default function StartStream() {
  async function startStream() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    document.getElementById('video').srcObject = stream;
    const peer = createPeer();
    stream.getTracks().forEach((track) => peer.addTrack(track, stream));
  }

  function createPeer() {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.stunprotocol.org',
        },
      ],
    });
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer);

    return peer;
  }

  async function handleNegotiationNeededEvent(peer) {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    const payload = {
      sdp: peer.localDescription,
    };

    const { data } = await axios.post('/broadcast', payload);
    const desc = new RTCSessionDescription(data.sdp);
    peer.setRemoteDescription(desc).catch((e) => console.log(e));
  }
  return (
    <div className='stream'>
      <button className='stream__btn' onClick={startStream} />
    </div>
  );
}
