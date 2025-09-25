document.addEventListener("DOMContentLoaded", function () {
  const sendButton = document.querySelector(".send-btn");
  const inputArea = document.querySelector(".Messagebox");
  const inter = document.querySelector(".input-area");
  const chatContainer = document.querySelector(".chat-container");
  const chatWindow = document.querySelector(".chat-window");
  const footer = document.querySelector("footer");
  const editButton = document.getElementById("editBtn");

  // --- Event Listeners ---
  sendButton.addEventListener("click", sendMessage);
  inputArea.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  });

  if (editButton) {
    editButton.addEventListener("click", function () {
      window.location.href = "index.html";
    });
  }

  // --- Send Message ---
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

  // --- Responsive Adjustments ---
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

  // --- Chat Message Handling ---
  function addMessageToChat(message) {
    // User message
    const newMessage = document.createElement("div");
    newMessage.classList.add("message", "user-message");
    newMessage.textContent = message;
    chatWindow.appendChild(newMessage);
    makeMessageVisible(newMessage);

    // AI typing placeholder
    const aiMessage = document.createElement("div");
    aiMessage.classList.add("message", "ai-message");
    aiMessage.innerHTML = `<span class="typing">MinaGPT is typing...</span>`;
    chatWindow.appendChild(aiMessage);
    makeMessageVisible(aiMessage);

    // Simulate AI thinking
    setTimeout(async () => {
      const response = await generateAIResponse(message);
      aiMessage.innerHTML = "";
      typeText(aiMessage, response);
    }, 1000);
  }

  function makeMessageVisible(messageElement) {
    setTimeout(() => {
      messageElement.classList.add("visible");
      chatWindow.scrollTop = chatWindow.scrollHeight; // ✅ fixed scroll
    }, 10);
  }

  // --- Typing Effect ---
  function typeText(element, htmlContent, speed = 40) {
    let i = 0;
    const plainText = htmlContent.replace(/<[^>]+>/g, ""); // strip tags for typing

    element.innerHTML = ""; // start empty

    function typeChar() {
      if (i < plainText.length) {
        element.textContent = plainText.substring(0, i + 1);
        i++;
        chatWindow.scrollTop = chatWindow.scrollHeight;
        setTimeout(typeChar, speed);
      } else {
        element.innerHTML = htmlContent; // restore formatting
        chatWindow.scrollTop = chatWindow.scrollHeight;
      }
    }

    typeChar();
  }

  // --- AI Response Generator ---
  async function generateAIResponse(userMessage) {
    const msg = userMessage.toLowerCase();
    let response = "";

    // Quotes for greetings
    const morningQuotes = [
      "The early morning has gold in its mouth. — Benjamin Franklin",
      "Every morning we are born again. What we do today matters most. — Buddha",
      "Wake up with determination. Go to bed with satisfaction.",
      "Success comes to those who take action. Make today count."
    ];
    const eveningQuotes = [
      "The day is over, the work is done; relax and be proud of what you've begun.",
      "Evenings are proof that endings can be beautiful too.",
      "Review, breathe, and be grateful for the small wins today.",
      "Wind down — the best ideas often come when you rest."
    ];
    const nightQuotes = [
      "Sleep is the best meditation. — Dalai Lama",
      "Good night. Reset. Recharge. Repeat.",
      "Let go of today so tomorrow can surprise you.",
      "Rest now — tomorrow you'll be stronger."
    ];

    function pickRandom(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    // --- GREETINGS ---
    if (msg.includes("good morning")) {
      response = `<h1>🌅 Good Morning!</h1><p>${pickRandom(morningQuotes)}</p>`;
    } else if (msg.includes("good evening")) {
      response = `<h1>🌇 Good Evening!</h1><p>${pickRandom(eveningQuotes)}</p>`;
    } else if (msg.includes("good night")) {
      response = `<h1>🌙 Good Night!</h1><p>${pickRandom(nightQuotes)}</p>`;
    } else if (msg.includes("hello") || msg.includes("hi")) {
      response = `<h1>👋 Hello!</h1><p>I’m MinaGPT, ready to chat.</p>`;
    } else if (msg.includes("how are you")) {
      response = `<h1>🤖 I'm Running Smoothly!</h1><p>How’s your day going?</p>`;
    }

    // --- PROGRAMMING HELP ---
    else if (msg.includes("python")) {
      response = `<h1>🐍 Python</h1><pre><code>print("Hello, Python World!")</code></pre>`;
    } else if (msg.includes("c language")) {
      response = `<h1>💻 C Language</h1><pre><code>#include &lt;stdio.h&gt;\nint main(){\n  printf("Hello, World!\\n");\n}</code></pre>`;
    } else if (msg.includes("c++")) {
      response = `<h1>💻 C++ Language</h1><pre><code>#include &lt;iostream&gt;\nusing namespace std;\nint main(){\n  cout &lt;&lt; "Hello, C++!" &lt;&lt; endl;\n}</code></pre>`;
    } else if (msg.includes("java")) {
      response = `<h1>☕ Java</h1><pre><code>public class Main{\n  public static void main(String[] args){\n    System.out.println("Hello, Java!");\n  }\n}</code></pre>`;
    } else if (msg.includes("javascript") || msg.includes("js")) {
      response = `<h1>✨ JavaScript</h1><pre><code>console.log("Hello, JavaScript!");</code></pre>`;
    } else {
      response = `<p>I couldn’t find a match — try greetings, motivation, or ask about programming languages.</p>`;
    }

    return `<div class="ai-message">${response}</div>`;
  }

  // --- Sidebar Toggle ---
  window.toggleSidebar = function () {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) sidebar.classList.toggle("open");
  };

  // Auto-close sidebar on link click
  document.querySelectorAll(".sidebar a").forEach(link => {
    link.addEventListener("click", () => {
      document.getElementById("sidebar").classList.remove("open");
    });
  });

  // --- Avatar Menu ---
  window.toggleAvatarMenu = function () {
    const menu = document.getElementById("avatarMenu");
    if (menu) menu.style.display = menu.style.display === "block" ? "none" : "block";
  };

  // Close dropdown when clicked outside
  window.addEventListener("click", function (e) {
    if (!e.target.matches(".avatar")) {
      const menu = document.getElementById("avatarMenu");
      if (menu && menu.style.display === "block") {
        menu.style.display = "none";
      }
    }
  });
});
