//AQUÍ SE INTRODUCE LA PARTE DEL "CLIENTE"
const username = document.getElementById('user').getAttribute('data-username');
const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    if(input.value){
        socket.emit('chat', { message: input.value, user: username }); //así añado tb el nombre del usuario que lo manda
        input.value = '';
    }
});

socket.on('chat', (msg) => {
    console.log("Mensaje recibido"); //hago un callback
    const item = document.createElement("li"); //me creo la lista para introducir los mensajes
    item.textContent = msg.user + ": " + msg.message; //muestro el nombre del usuario junto con el mensaje
    messages.appendChild(item); //y los añado
});

//socket.emit -> envio msjs ; socket.on -> recibir / enviar msjs (defino el callback para ambas)