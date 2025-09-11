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

  function typeText(element, html, delay = 30) {
  element.innerHTML = ""; 

  // Convert HTML string into DOM nodes
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  const nodes = Array.from(tempDiv.childNodes);

  function typeNode(node, parent, callback) {
    if (node.nodeType === Node.TEXT_NODE) {
      // Type text character by character
      let text = node.textContent;
      let i = 0;
      function typeChar() {
        if (i < text.length) {
          parent.appendChild(document.createTextNode(text.charAt(i)));
          i++;
          setTimeout(typeChar, delay);
        } else {
          callback();
        }
      }
      typeChar();
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Create the element, then type inside
      const newEl = document.createElement(node.tagName.toLowerCase());

      // Copy attributes (like class)
      for (let attr of node.attributes) {
        newEl.setAttribute(attr.name, attr.value);
      }

      parent.appendChild(newEl);

      const children = Array.from(node.childNodes);
      let idx = 0;
      function nextChild() {
        if (idx < children.length) {
          typeNode(children[idx], newEl, () => {
            idx++;
            nextChild();
          });
        } else {
          callback();
        }
      }
      nextChild();
    } else {
      callback();
    }
  }

  let idx = 0;
  function nextNode() {
    if (idx < nodes.length) {
      typeNode(nodes[idx], element, () => {
        idx++;
        nextNode();
      });
    }
  }
  nextNode();
}


 async function generateAIResponse(userMessage) {
  const msg = userMessage.toLowerCase();
  let response = "";

  // Short greetings
  if(msg.includes("hello")||msg.includes("hi")){
    response = `<p class="short-reply">👋 Hey there! Ready to explore knowledge and code magic? 💻✨</p>`;
  } else if(msg.includes("how are you")){
    response = `<p class="short-reply">🤖 I’m fully compiled and running smoothly! How’s your learning today? 😎</p>`;
  }

  // C Language
  else if(msg.includes("what is c language?")){
    response = `<h1>💻 C Language</h1><h2>Definition</h2><p>C is a procedural programming language, widely used for system programming and embedded devices.</p><h2>Key Points</h2><ul><li>Created by Dennis Ritchie in 1972</li><li>Used for OS, embedded systems, high-performance apps</li><li>Basis for many modern languages</li></ul><h2>Example Program</h2><pre><code>#include &lt;stdio.h&gt;\nint main(){\n  printf("Hello, World!\\n");\n  return 0;\n}</code></pre>`;

  }

  // Python
  else if(msg.includes("what is python?")||msg.includes("python program example")||msg.includes("py")){
    response = `<h1>🐍 Python</h1><h2>Definition</h2><p>Python is high-level, interpreted, and known for readability. Great for AI, web dev, automation, and scripting.</p><h2>Key Points</h2><ul><li>Created by Guido van Rossum in 1991</li><li>Supports procedural, OOP, and functional programming</li><li>Used in AI, data science, web dev</li></ul><h2>Example Program</h2><pre><code>print("Hello, Python World!")</code></pre>`;

  }

  // Java
  else if(msg.includes("what is java?")){
    response = `<h1>☕ Java</h1><h2>Definition</h2><p>Java is object-oriented, runs on JVM, and widely used for enterprise apps and Android development.</p><h2>Key Points</h2><ul><li>Created by James Gosling in 1995</li><li>"Write Once, Run Anywhere"</li><li>Strongly typed and widely used in large-scale apps</li></ul><h2>Example Program</h2><pre><code>public class Main{\n  public static void main(String[] args){\n    System.out.println("Hello, Java World!");\n  }\n}</code></pre>`;

  }

  // JavaScript
  else if(msg.includes("what is javascript?")){
    response = `<h1>✨ JavaScript</h1><h2>Definition</h2><p>JavaScript is the programming language of the web for dynamic websites and Node.js apps.</p><h2>Key Points</h2><ul><li>Created by Brendan Eich in 1995</li><li>Supports front-end and back-end development</li><li>Event-driven, functional, and OOP</li></ul><h2>Example Program</h2><pre><code>console.log("Hello, JavaScript World!");</code></pre>`;

  }

  // OS subject
  else if(msg.includes("what is os")){
    response = `<h1>🖥️ Operating System (OS)</h1><h2>Definition</h2><p>An OS manages computer hardware, software, and provides services for computer programs.</p><h2>Key Points</h2><ul><li>Handles memory, processes, and storage</li><li>Examples: Windows, Linux, macOS</li><li>Provides user interface and resource management</li></ul>`;

  }

  // System Testing
  else if(msg.includes("system testing")){
    response = `<h1>🧪 System Testing</h1><h2>Definition</h2><p>System testing is a level of software testing that validates the complete and integrated software product.</p><h2>Key Points</h2><ul><li>Tests functional and non-functional requirements</li><li>Performed after integration testing</li><li>Ensures software works as intended</li></ul>`;

  }

  // Motivational Quote
  else if(msg.includes("motivation")||msg.includes("inspire")){
    response = `<h1>💡 Motivation</h1><p>"The only way to do great work is to love what you do." - Steve Jobs</p><p>Keep learning and coding every day! 🚀</p>`;

  }

  // Default / unknown
  else{
    response = `<h1>💡 Programming & Knowledge Helper</h1><p>I can explain programming languages, subjects like OS, system testing, and also share motivational quotes.</p><h2>Try asking about:</h2><ul><li>C, C++</li><li>Python, Java</li><li>JavaScript, C#</li><li>PHP, Ruby</li><li>Go, Rust</li><li>Operating System (OS)</li><li>System Testing</li><li>Motivation & Inspiration</li></ul><p>Which one would you like to explore first? 😎</p>`;
  }

  return `<div class="ai-message">${response}</div>`;
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



