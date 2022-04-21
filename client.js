const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let image=document.getElementById('img');
let messageArea = document.querySelector('.message__area');
let form=document.getElementById("send_container");
do {
    name = prompt('Please enter your name: ')
} while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        if(image.files[0]!=null){
            var f=URL.createObjectURL(image.files[0]);
            image.files[0]=null;
            document.getElementById("img").value = "";
        }
        else{
            f=null;
        }
        sendMessage(e.target.value,f)
        textarea.value="";
        console.log(f);
    }
    //extra 
})



function sendMessage(message,img) {
    console.log("hello");
    let msg = {
        user: name,
        message: message.trim(),
        image: img
    }
    
    appendMessage(msg, 'outgoing')
    if(img!=null){
        appendImage(msg,'outgoing')
    }
    scrollToBottom()
    // Send to server 
    socket.emit('message', msg)
}

function appendMessage(msg, type) {
    if(msg.message.length!=0){
        let mainDiv = document.createElement('div')
        let className = type
        mainDiv.classList.add(className, 'message')
        let markup = `
            <h4>${msg.user}</h4>
            <p>${msg.message}</p>
        `
        mainDiv.innerHTML = markup
        messageArea.appendChild(mainDiv)
    }
}
function appendImage(msg,type){
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');
    let markup=document.createElement('h4')
    markup.innerHTML=msg.user;
    mainDiv.append(markup);
    let i=document.createElement('img');
    i.src=msg.image;
    i.id='img';
    mainDiv.append(i);
    // let markup=`<h4>${msg.user}</h4>
    //             <img src="${msg.image}" id="img"></img>`;
    // mainDiv.innerHTML=markup;
    messageArea.appendChild(mainDiv);

}
// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    if(msg.image!=null)
    appendImage(msg,'incoming');
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}


