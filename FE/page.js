// const ws = new WebSocket("ws://localhost:3000")
const ws = new WebSocket("wss://chat-sxdu.onrender.com")

window.onload = () => {
    const inputField = document.getElementById("inputField");
    const button = document.getElementById("submit");
    const messageDiv = document.getElementById("messageDiv");
    button.addEventListener("click",(event) => {
        OnSubmitHandler()
        event.preventDefault();
    })

    ws.addEventListener("message",(data) => {
        const array = JSON.parse(data.data)
        console.log(JSON.parse(data.data))
        emptyDiv();
        array.forEach(element => {
            console.log(element)
            const newParagraph = document.createElement("p");
            newParagraph.textContent = element;
            messageDiv.appendChild(newParagraph)
        });
    });

    ws.addEventListener("close",() => {
        emptyDiv();
        const newParagraph = document.createElement("p");
            newParagraph.textContent = "ERROR";
            messageDiv.appendChild(newParagraph)
    });

    const OnSubmitHandler = () => {
        console.log("send: ",inputField.value);
        ws.send(inputField.value);
    }

}

function emptyDiv() {
    while (messageDiv.firstChild) {
        messageDiv.removeChild(messageDiv.firstChild);
    }
}





