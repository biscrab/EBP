const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors())

const server = app.listen(process.env.PORT || 5000, () => {
    const port = server.address().port;
    console.log(`Express is working on port ${port}`);
})

const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
});

let users = {};
let socketToRoom = {};
const maximum = 2;

io.on('connection', socket => {
    // 1:1 에서는 이런 식으로 구현하지 않아도 되지만 글쓴이는 1:N을 먼저 구현해서 이 형태로 남겨뒀습니다.
    // email 부분은 무시하셔도 무방합니다.
    var roomName = null;

    socket.on('join_room', (data) => {
        roomName = data;
        socket.join(data);
        console.log(data);
    });

    socket.on('message', (data) => {
        socket.in(roomName).emit('chat', data)
    })

    socket.on('stream', (data) => {
		console.log("stream");
        console.log(typeof(data));
		socket.in(roomName).emit('video', data);
	});

    socket.on('count', ()=>{
        console.log(socket.adapter.rooms[socket.id]);
        //socket.emit("c", io.rooms[roomName].length);
    })

    /*
    // 다른 user들에게 offer를 보냄 (자신의 RTCSessionDescription)
    socket.on('offer', sdp => {
        console.log('offer: ' + socket.id);
        // room에는 두 명 밖에 없으므로 broadcast 사용해서 전달
        // 여러 명 있는 처리는 다음 포스트 1:N에서...
        socket.broadcast.emit('getOffer', sdp);
    });

    // offer를 보낸 user에게 answer을 보냄 (자신의 RTCSessionDescription)
    socket.on('answer', sdp => {
        console.log('answer: ' + socket.id);
        // room에는 두 명 밖에 없으므로 broadcast 사용해서 전달
        // 여러 명 있는 처리는 다음 포스트 1:N에서...
        socket.broadcast.emit('getAnswer', sdp);
    });

    // 자신의 ICECandidate 정보를 signal(offer 또는 answer)을 주고 받은 상대에게 전달
    socket.on('candidate', candidate => {
        console.log('candidate: ' + socket.id);
        // room에는 두 명 밖에 없으므로 broadcast 사용해서 전달
        // 여러 명 있는 처리는 다음 포스트 1:N에서...
        socket.broadcast.emit('getCandidate', candidate);
    })*/

    // user가 연결이 끊겼을 때 처리
    socket.on('disconnect', () => {
        console.log(`[${socketToRoom[socket.id]}]: ${socket.id} exit`);
        // disconnect한 user가 포함된 roomID
        const roomID = socketToRoom[socket.id];
        // room에 포함된 유저
        let room = users[roomID];
        // room이 존재한다면(user들이 포함된)
        if (room) {
            // disconnect user를 제외
            room = room.filter(user => user.id !== socket.id);
            users[roomID] = room;
        }
        // 어떤 user가 나갔는 지 room의 다른 user들에게 통보
        socket.broadcast.to(room).emit('user_exit', {id: socket.id});
        console.log(users);
    })
});

app.get('/', function(req, res){
    res.send("test")
})
