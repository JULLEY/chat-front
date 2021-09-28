// 메세지 박스
function getMsg(msg){
    return `<div class="sent_msg">
                <p>${msg}</p>
                <span class="time_date"> 11:18 | Today</span>
            </div>`;
}

// 메세지 생성
function makeMsg(){
    let chatBox = document.querySelector("#chat-box");
    let msgInput = document.querySelector("#chat-outgoing-msg");

    let chatOutgoingBox = document.createElement("div");
    chatOutgoingBox.className = "outgoing_msg";

    chatOutgoingBox.innerHTML = getMsg(msgInput.value);
    chatBox.append(chatOutgoingBox);
    msgInput.value = "";
}

// 보내기 버튼 클릭
document.querySelector("#chat-outgoing-button").addEventListener("click", ()=>{
    makeMsg();
});

// 보내기 엔터
document.querySelector("#chat-outgoing-msg").addEventListener("keydown", (e)=>{
    if(e.keyCode == 13){
        makeMsg();
    }
});