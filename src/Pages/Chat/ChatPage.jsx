import { useEffect } from "react";
import io from "socket.io-client";
import { useLocation, useNavigate } from "react-router-dom";
import { enterpreneur } from "../Dashboard/EnterpreneurDasboard.jsx"; // Adjust path as needed
import { investor } from "../Dashboard/InvestorDashboard.jsx"; // Adjust path as needed

const socket = io("http://localhost:5000", {
  withCredentials: true,
  transports: ["websocket", "polling"]
});

const ChatPage = () => {
  
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const fromUser = queryParams.get("from");
const chatWith = queryParams.get("with");

const currentUser = fromUser === "Investor" ? investor : enterpreneur;
const opponent = chatWith === "Investor" ? investor : enterpreneur;

  useEffect(() => {
    socket.on("displayMessage", function (message) {
      displayMessage(message, false); // Opponent message
    });
    return () => {
      socket.off("displayMessage");
    };
  }, []);

  function sendMessage() {
    const input = document.getElementById("message");
    const message = input.value.trim();
    if (message !== "") {
      const senderName = currentUser.name;
      const msgData = { sender: senderName, text: message, image: currentUser.image };
      socket.emit("sendMessage", msgData);
      displayMessage(msgData, true); // Show as my message
      input.value = "";
    }
  }

  function displayMessage({ sender, text, image }, isMine) {
    const msgContainer = document.getElementById("message-container");
  
    const wrapperDiv = document.createElement("div");
    wrapperDiv.classList.add("message-wrapper");
    wrapperDiv.style.alignItems = isMine ? "flex-end" : "flex-start";
  
    const nameWrapper = document.createElement("div");
    nameWrapper.style.display = "flex";
    nameWrapper.style.alignItems = "center";
    nameWrapper.style.gap = "8px"; // space between image and name
  
    const imageEl = document.createElement("img");
    imageEl.src = image;
    imageEl.alt = sender;
    imageEl.style.width = "30px";
    imageEl.style.height = "30px";
    imageEl.style.borderRadius = "50%";
    imageEl.style.objectFit = "cover";
  
    const nameDiv = document.createElement("div");
    nameDiv.classList.add("sender-name");
    nameDiv.innerText = sender;
  
    nameWrapper.appendChild(nameDiv);
    nameWrapper.appendChild(imageEl); // name on left, image on right
    if (!isMine) {
      nameWrapper.insertBefore(imageEl, nameDiv); // flip for opponent: image on left
    }
  
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", isMine ? "mine" : "other");
    messageDiv.innerText = text;
  
    wrapperDiv.appendChild(nameWrapper);
    wrapperDiv.appendChild(messageDiv);
    msgContainer.appendChild(wrapperDiv);
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }

  return (
    <div style={{ padding: "20px" }}>
      <button className="back-btn" onClick={() => navigate(-2)}>⬅ Back</button>
      <h2>Chat with {opponent.name}</h2>

      <div
        id="message-container"
        style={{
          height: "300px",
          overflowY: "scroll",
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
          width: "850px",
          marginLeft: "230px",
          marginTop: "5px",
        }}
      ></div>

      <input
        type="text"
        id="message"
        placeholder="Type your message"
        style={{ width: "60%", marginRight: "10px", marginLeft: "230px", height: '30px', marginTop: '-12px' }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default behavior of Enter (new line in text field)
            sendMessage();
          }
        }}
      />
      <button className="send-btn" onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatPage;
