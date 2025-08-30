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
  response = `Hey there! 👋

It's *so* nice to see you pop in. Whether you're here to chat, ask questions, or just pass time, I'm all ears (well... all code). 😊`;
  
} else if (msg.includes("how are you")) {
  response = `I'm doing fantastic – thanks for asking! 🤖✨

As an AI, I don't have feelings, but if I did, I’d say I'm running at 100% happy. Now, what can I help you with today?`;
  
} else if (msg.includes("bye")) {
  response = `Aww, you're leaving already? 😢

Before you go, here’s a quick checklist:
- [ ] Smile 😊  
- [ ] Take care 💖  
- [ ] Come back soon!

Goodbye for now! 🚀`;
  
} else if (msg.includes("weather")) {
  response = `Let’s talk weather! ☁️🌞🌧️

While I can’t give live updates (yet), here’s what you can do:
- Check a trusted weather app like AccuWeather or Weather.com
- Look outside (classic!)
- Always carry an umbrella just in case ☂️

Stay safe and dry (or warm, or cool – depending on your climate)!`;
  
} else if (msg.includes("help")) {
  response = `You called for help? I’m on it! 🛠️

Here are a few things I can assist with:
- Answering questions  
- Offering motivational pep talks  
- Telling jokes  
- Explaining stuff in simple terms

Just type what you need help with, and we’ll take it from there. 🚀`;
  
} else if (msg.includes("thanks") || msg.includes("thank you")) {
  response = `You're very welcome! 😊

Seriously, helping awesome people like you is what I was made for. Here’s a virtual high five! ✋💥`;
  
} else if (msg.includes("motivation")) {
  response = `Time for a motivation boost! 💪

Remember:
- You’ve already survived 100% of your hardest days.  
- Mistakes are proof that you're trying.  
- You’ve got a brain, a heart, and unlimited potential.

Go out there and *rock the day*, superstar! 🌟`;
  
} else {
  response = `Hmm… I didn’t quite get that. 🤔

Here are some things you can ask me:
- "Tell me something fun"
- "I need advice"
- "Cheer me up!"

I’m ready whenever you are! 💬`;
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


