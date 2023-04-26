const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const connectToDatabase = require('./src/database/connect');
const ChatModel = require('./src/models/chat.model')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

dotenv.config();
connectToDatabase();

app.use(express.static(path.join(__dirname, 'src/public')));
app.set('views', path.join(__dirname, 'src/public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
    res.render('index.html');
});
let messages = [];
messagesChat();

io.on('connection', socket => {

    console.log(`Socket conectado: ${socket.id}`);

    socket.emit('previousMessages', messages);

    socket.on('sendMessage', data => {

        const chat = ChatModel.create(data);
        socket.broadcast.emit('receivedMessage', data);

        messages.push(data);

    })

})

server.listen(8080, () => console.log("Server is Running"));

async function messagesChat() {

    const chatMessages = await ChatModel.find({});
    chatMessagesResult = [];

    for(let i = 0; i <= Object.values(chatMessages).length -1; i++) {

        console.log(i);

        let author = Object.values(chatMessages)[i].author;
        let message = Object.values(chatMessages)[i].message;

        chatMessagesResult.push({ author, message, });

    }

    console.log(chatMessagesResult)

    messages = chatMessagesResult;
    
    return chatMessagesResult;

}