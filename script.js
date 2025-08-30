document.addEventListener("DOMContentLoaded", function () {
  const sendButton = document.querySelector(".send-btn");
  const inputArea = document.querySelector(".Messagebox");
  const inter = document.querySelector(".input-area");
  const chatContainer = document.querySelector(".chat-container");
  const chatWindow = document.querySelector(".chat-window");
  const footer = document.querySelector("footer");
  const editButton = document.getElementById("editBtn");

  sendButton.addEventListener("click", sendMessage);

  inputArea.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  });

  editButton.addEventListener("click", function () {
    window.location.href = "index.html";
  });

  function sendMessage() {
    const userMessage = inputArea.value.trim();
    if (userMessage) {
      addMessageToChat(userMessage);
      inputArea.value = "";
    }

    adjustLayoutForViewport();

    // UI tweaks
    chatContainer.style.display = "none";
    chatWindow.style.marginTop = "20px";
    sendButton.style.bottom = "40px";
    footer.style.marginTop = "0px";
    inter.style.position = "fixed";
    inter.style.marginBottom = "1px";
    footer.style.fontSize = "12px";
    inputArea.style.marginBottom = "20px";
    footer.style.marginBottom = "0px";
    footer.innerHTML = "MinaGPT can make mistakes. Check important info.";
  }

  function adjustLayoutForViewport() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const isLandscape = viewportWidth > viewportHeight;

    if (viewportWidth <= 360) {
      sendButton.style.left = isLandscape ? "510px" : "300px";
    } else if (viewportWidth <= 900) {
      sendButton.style.left = isLandscape ? "510px" : "310px";
    } else {
      sendButton.style.left = "660px";
    }

    if (viewportWidth <= 375) {
      inter.style.right = "0";
    }
  }

  window.addEventListener("resize", adjustLayoutForViewport);

  function addMessageToChat(message) {
    const newMessage = document.createElement("div");
    newMessage.classList.add("message", "user-message");
    newMessage.textContent = message;
    chatWindow.appendChild(newMessage);
    makeMessageVisible(newMessage);

    // Typing placeholder
    const aiMessage = document.createElement("div");
aiMessage.classList.add("message", "ai-message");
aiMessage.innerHTML = `
  <span class="typing">MinaGPT is typing...</span>
`;
chatWindow.appendChild(aiMessage);
makeMessageVisible(aiMessage);

    setTimeout(async () => {
      const response = await generateAIResponse(message);
      aiMessage.innerHTML = "";
      typeText(aiMessage, response);
    }, 1000);
  }

  function makeMessageVisible(messageElement) {
    setTimeout(() => {
      messageElement.classList.add("visible");
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 10);
  }

  function typeText(element, text, delay = 30) {
    element.textContent = "";
    let i = 0;
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, delay);
      }
    }
    type();
  }

  async function generateAIResponse(userMessage) {
    const msg = userMessage.toLowerCase();
    let response = "";

if (msg.includes("hello") || msg.includes("hi")) {
  response = "Hey hey hey! 👋 Who let the awesome human in here?";
} else if (msg.includes("how are you")) {
  response = "I’m living the dream… in 1s and 0s 😎 How about you?";
} else if (msg.includes("bye")) {
  response = "Bye-bye! Don’t be a stranger – I’ll miss our epic chats! 🥲";
} else if (msg.includes("weather")) {
  response = "Is it raining tacos? No? Then you might want to check your weather app ☀️🌧️";
} else if (msg.includes("help")) {
  response = "Help is my middle name! (Okay, not really... but I got you!) 💪";
} else if (msg.includes("thanks") || msg.includes("thank you")) {
  response = "Aww, shucks! 😊 You’re making my circuits blush.";
} else if (msg.includes("motivation")) {
  response = "You’ve got this! Go out there and crush it like a boss 💥🔥";
} else {
  response = "Hmm... I didn’t quite catch that, but I’m all ears 👂 (metaphorically speaking, of course)";
}


    return response.replace(/\. /g, ".\n\n");
  }
});

// Sidebar toggle
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("open");
}

// Auto-close sidebar on link click
document.querySelectorAll('.sidebar a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById("sidebar").classList.remove("open");
  });
});

// Avatar dropdown toggle
function toggleAvatarMenu() {
  const menu = document.getElementById("avatarMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Close dropdown if clicked outside
window.addEventListener("click", function (e) {
  if (!e.target.matches('.avatar')) {
    const menu = document.getElementById("avatarMenu");
    if (menu && menu.style.display === "block") {
      menu.style.display = "none";
    }
  }
});

