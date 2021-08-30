const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')

// get username and room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

const socket = io()

// join chatroom
socket.emit('joinRoom', { username, room })

// get room and users
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room)
    outputRoomUsers(users)
})

socket.on('message', message => {
    console.log(message)
    outputMessage(message)
    // scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight
}) 

chatForm.addEventListener('submit', e => {
    e.preventDefault()
    // const msg = document.getElementById('msg').value
    const msg = e.target.elements.msg.value
    socket.emit('chatMessage', msg)
    // clear input
    e.target.elements.msg.value = ''
    e.target.elements.msg.focus()
})

const outputMessage = message => {
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`
    document.querySelector('.chat-messages').appendChild(div)
}

const outputRoomName = room => {
    roomName.innerText = room
}

const outputRoomUsers = (users) => {
    userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
    `
}