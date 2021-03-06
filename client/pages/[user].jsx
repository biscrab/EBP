import * as S from '../styles/User'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { useRouter } from 'next/router'

const User = () => {

  const router = useRouter();
  const { user } = router.query;
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [onStream, setOnStream] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(()=>{
    socket.emit("count");
  })

  useEffect(() => {
    socket.emit("join_room", user);
  },[])

  const sendMessage = () => {
    socket.emit("message", input);
  } 
    
  let videoRef = useRef();

  let socket = io.connect('http://localhost:5000');

  socket.on("chat", (data) => {
    console.log(data);
    setList(list => [...list, data]);
  })

  socket.on("video", (data) => {
    //videoRef.current.srcObject = data;
  })

  socket.on("c", (data) => {
    setCount(data);
  })

  const pcConfig = {
    'iceServers': [{
      urls: 'stun:stun.l.goole.com:19302'
    },
    {urls: 'turn:numb.viagenie.ca',
     credential: "mazkh",
     username: "webrtc@live.com"
    }
  ]};

  const stream = () => {
    const localStream = navigator.mediaDevices.getUserMedia({video: true, audio: true});
    createPeerConection();
    var pc = new RTCPeerConnection(pcConfig)
    /*
    videoRef.current.srcObject.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
    });
    const s = navigator.mediaDevices.getUserMedia(CONSTRAINTS);
    if (videoRef && videoRef.current && !videoRef.current.srcObject) {
      videoRef.current.srcObject = s;
      //console.log(typeof(s));
      socket.emit("stream", s)
    }*/
  }

  return(
      <S.Body>
          <S.Div>
          <S.VideoDiv>
            <video autoPlay ref={videoRef} id="video"/>
            <S.MenuDiv>
              <i className="fa fa-volume fa-lg" style={{color:"white"}}></i>
              <i className="fa fa-expand-wide fa-lg" style={{color:"white"}}></i>
            </S.MenuDiv>
          </S.VideoDiv>
          <S.ChatBorder>
            <S.ChatList>
            {list.map(
              i => {
                return(
                  <li>{i}</li>
                )
              }
            )}
            </S.ChatList>
            <S.InputDiv>
              <input onChange={(e)=>setInput(e.target.value)} value={input} placeholder='????????? ?????????'/>
              <button onClick={()=>sendMessage()}>??????</button>
              <button onClick={()=>stream()}>??????</button>
              <spam>{count}</spam>
            </S.InputDiv>
          </S.ChatBorder>
          </S.Div>
          <S.InfoDiv>
            <img src="https://yt3.ggpht.com/ytc/AKedOLQf9XARnp2yzFCo9D8hFKckDRRtCXDJTcYLY2wwRw=s88-c-k-c0x00ffffff-no-rj"/>
            <h2>??????</h2>
          </S.InfoDiv>
      </S.Body>
  )
}

export default User

    //let newPC = new RTCPeerConnection();
/*
    newSocket.on('all_users', (allUsers) => {
      let len = allUsers.length;   
      if (len > 0) {
        createOffer();
      }
    });
  
    newSocket.on('getOffer', (sdp) => {
      //console.log(sdp);
      console.log('get offer');
      createAnswer(sdp);
    });
    
    newSocket.on('getAnswer', (sdp) => {
      console.log('get answer');
      newPC.setRemoteDescription(new RTCSessionDescription(sdp));
      //console.log(sdp);
    });
    
    newSocket.on('getCandidate', (candidate) => {
      newPC.addIceCandidate(new RTCIceCandidate(candidate)).then(() => {
        console.log('candidate add success');
      })
    });*/
/*
    setSocket(newSocket);
    setPc(newPC);

    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
    
      // ????????? video, audio track??? ?????? ????????? RTCPeerConnection??? ????????????.
      stream.getTracks().forEach(track => {
        newPC.addTrack(track, stream);
      })
      newPC.onicecandidate = (e) => {
        if (e.candidate) {
          console.log('onicecandidate');
          newSocket.emit('candidate', e.candidate);
        }
      }
      newPC.oniceconnectionstatechange = (e) => {
        console.log(e);
      }
          
      newPC.ontrack = (ev) => {
        console.log('add remotetrack success');
        if(remoteVideoRef.current) remoteVideoRef.current.srcObject = ev.streams[0];
      } 
    
      // ????????? video, audio track??? ?????? ????????? RTCPeerConnection??? ????????? ?????? room??? ??????????????? Signaling Server??? ?????????.
      // ???????????? offer or answer??? ???????????? ?????? RTCSessionDescription??? ?????? video, audio track??? ?????? ????????? ?????? ?????? ????????? 
      // ????????? ????????? ???????????? MediaStream??? ?????? ??? ??????
      newSocket.emit('join_room', {room: '1234', email: 'sample@naver.com'});
          
    }).catch(error => {
      console.log(`getUserMedia error: ${error}`);
    });

  const createOffer = () => {
    console.log('create offer');
    newPC.createOffer({offerToReceiveAudio: true, offerToReceiveVideo: true})
      .then(sdp => {
        newPC.setLocalDescription(new RTCSessionDescription(sdp));
        newSocket.emit('offer', sdp);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const createAnswer = (sdp) => {
    newPC.setRemoteDescription(new RTCSessionDescription(sdp)).then(() => {
      console.log('answer set remote description success');
      newPC.createAnswer({offerToReceiveVideo: true, offerToReceiveAudio: true})
        .then(sdp1 => {
              
           console.log('create answer');
           newPC.setLocalDescription(new RTCSessionDescription(sdp1));
           newSocket.emit('answer', sdp1);
        })
        .catch(error => {
           console.log(error);
        });
      });
        
  }
 
    const CONSTRAINTS = { video: true };
    const videoRef = useRef(null);

    socket.on("video", (v) => {
        videoRef.current.srcObject = v;
    })
*/