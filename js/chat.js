function getMsg(msg){
    return `<div class="sent_msg">
                <p>${msg}</p>
                <span class="time_date"> 11:18 | Today</span>
            </div>`;
}

function makeMsg(){
    let chatBox = document.querySelector("#chat-box");
    let msgInput = document.querySelector("#chat-outgoing-msg");

    let chatOutgoingBox = document.createElement("div");
    chatOutgoingBox.className = "outgoing_msg";

    chatOutgoingBox.innerHTML = getMsg(msgInput.value);
    chatBox.append(chatOutgoingBox);
    msgInput.value = "";
}


document.querySelector("#chat-outgoing-button").addEventListener("click", ()=>{
    makeMsg();
});

document.querySelector("#chat-outgoing-msg").addEventListener("keydown", (e)=>{
    if(e.keyCode == 13){
        makeMsg();
    }
});