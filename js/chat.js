const eventSource = new EventSource("http://localhost:8080/sender/leo/receiver/bob");

eventSource.onmessage = (e) =>{
    const data = JSON.parse(e.data);
    initMsg(data);
}

// 메세지 박스
function getSendMsgBox(msg, time){
    return `<div class="sent_msg">
                <p>${msg}</p>
                <span class="time_date">${time}</span>
            </div>`;
}

// 메세지 출력
function initMsg(data){
    let chatBox = document.querySelector("#chat-box");
    let msgInput = document.querySelector("#chat-outgoing-msg");

    let chatOutgoingBox = document.createElement("div");
    chatOutgoingBox.className = "outgoing_msg";

    let md = data.createdAt.substring(5,10)
    let tm = data.createdAt.substring(11,16)
    convertTime = tm + " | " + md

    chatOutgoingBox.innerHTML = getSendMsgBox(data.msg, convertTime);
    chatBox.append(chatOutgoingBox);
    msgInput.value = "";
}

// 메세지 생성
async function makeMsg(){
    let chatBox = document.querySelector("#chat-box");
    let msgInput = document.querySelector("#chat-outgoing-msg");

    let chatOutgoingBox = document.createElement("div");
    chatOutgoingBox.className = "outgoing_msg";

    let date = new Date();
    let now = date.getHours() + ":" + date.getMinutes() + "|" + date.getMonth() + "/" + date.getDate();

    let chat = {
        sender: "leo",
        receiver: "bob",
        msg: msgInput.value
    };

    let response = await fetch("http://localhost:8080/chat", {
        method: "post",
        body: JSON.stringify(chat),
        headers:{
            "Content-Type":"application/json; charset=utf-8"
        }
    });

    let parseResponse = await response.json();
    // console.log(parseResponse);

    chatOutgoingBox.innerHTML = getSendMsgBox(msgInput.value, now);
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