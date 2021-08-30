const socket = io()
const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')

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
    div.innerHTML = `<p class="meta">Mary <span>9:15pm</span></p>
    <p class="text">
        ${message}
    </p>`
    document.querySelector('.chat-messages').appendChild(div)
}