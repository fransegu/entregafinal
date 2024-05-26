const socketClient = io();

const h4Name = document.getElementById("name");
const form = document.getElementById("chatForm");
const inputMessage = document.getElementById("message");
const divChat = document.getElementById("chat");


let user;

Swal.fire({
    title: "Bienvenido",
    text: "Cual es tu nombre?",
    input: "text",
    inputValidator: (value) => {
        if (!value) {
        return "Nombre es requerido";
        }
    },
    confirmButtonText: "Enviar",
    }).then((input) => {
    user = input.value;
    h4Name.innerText = user;
    socketClient.emit("newUser", user);
});


socketClient.on("userConnected", (user) => {
    Toastify({
        text: `${user} connected`,
        style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        duration: 5000,
    }).showToast();
});

socketClient.on("connected", () => {
    Toastify({
        text: "Estas en linea",
        style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        duration: 5000,
    }).showToast();
});


    form.onsubmit = (e) => {
        e.preventDefault();
        const infoMessage = {
            name: user,
            message: inputMessage.value,
        };
        socketClient.emit("message", infoMessage);  
        form.reset()
    };


    socketClient.on("chat", (messages) => {
        const chat = messages
            .map((m) => {
            return `<p>${m.name}: ${m.message}</p>`;
            })
            .join(" ");
        divChat.innerHTML = chat;
    });