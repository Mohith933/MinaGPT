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
    chatWindow.scrollHeight - chatWindow.scrollTo
  }, 10);
}



function typeText(element, htmlContent, speed = 50) {
  let i = 0;
  let tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;
  let text = tempDiv.innerText; // strip tags for typing effect

  element.innerHTML = ""; // clear first

  function typeChar() {
    if (i < text.length) {
      element.innerHTML = text.substring(0, i + 1);

      // keep formatting (like <h2>, <p>, <ul>) by restoring htmlContent
      let partial = htmlContent.substring(0, i + 1);
      element.innerHTML = partial;

      i++;
      chatWindow.scrollTop = chatWindow.scrollHeight; // auto scroll
      setTimeout(typeChar, speed);
    } else {
      // once finished, insert full content with formatting
      element.innerHTML = htmlContent;
      chatWindow.scrollTop = chatWindow.scrollHeight; // final scroll
    }
  }

  typeChar();
}

async function generateAIResponse(userMessage) {
  const msg = userMessage.toLowerCase();
  let response = "";

  // --- motivational quote pools ---
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

  // ================= GREETINGS & ROUTINES =================
  if (msg.includes("good morning") || msg.includes("morning")) {
    const quote = pickRandom(morningQuotes);
    response = `
      <h1>🌅 Good Morning!</h1>
      <p>Wishing you a morning full of <span style="color:#2563eb; font-weight:600;">energy</span> and focus.<br>
      <span style="color:#6b7280;">${quote}</span></p>
      <h2>💡 Quick Morning Routine</h2>
      <ul>
        <li>Hydrate: drink a glass of water 💧</li>
        <li>Move: 5–10 minutes of light stretching 🧘</li>
        <li>Plan: pick 3 main goals for today ✍️</li>
      </ul>
    `;
  } else if (msg.includes("good evening") || msg.includes("evening")) {
    const quote = pickRandom(eveningQuotes);
    response = `
      <h1>🌇 Good Evening!</h1>
      <p>Hope today treated you well. Time to unwind and reflect.<br>
      <span style="color:#6b7280;">${quote}</span></p>
      <h2>🌙 Evening Checklist</h2>
      <table border="1" cellpadding="8" style="border-collapse:collapse;">
        <tr><th>Task</th><th>Status</th></tr>
        <tr><td>Dinner & relax</td><td>Planned</td></tr>
        <tr><td>Tidy workspace</td><td>Optional</td></tr>
        <tr><td>Reflect & jot 1 win</td><td>Recommended</td></tr>
      </table>
    `;
  } else if (msg.includes("good night") || msg.includes("night")) {
    const quote = pickRandom(nightQuotes);
    response = `
      <h1>🌙 Good Night!</h1>
      <p>Rest well — great ideas grow from rested minds.<br>
      <span style="color:#6b7280;">${quote}</span></p>
      <h2>🛌 Night Routine</h2>
      <ul>
        <li>Power down screens 30 min before bed 📵</li>
        <li>Write one thing you’re grateful for ✨</li>
        <li>Light stretch / breathing for 5 minutes 😌</li>
      </ul>
    `;
  } else if (msg.includes("hello") || msg.includes("hi")) {
    response = `
      <h1>👋 Hello!</h1>
      <p>Great to see you! Ready to explore <span style="color:#2563eb; font-weight:600;">knowledge</span> or build something awesome today?</p>
      <h2>Quick Options</h2>
      <ul>
        <li>Ask me to explain a concept</li>
        <li>Request code examples</li>
        <li>Get a daily routine or focused task list</li>
      </ul>
    `;
  } else if (msg.includes("how are you")) {
    response = `
      <h1>🤖 I'm Running Smoothly!</h1>
      <p>Compiled and ready. How’s your day going?</p>
      <h2>Mood Check</h2>
      <ul>
        <li>Feeling focused? Ask for a coding challenge.</li>
        <li>Feeling stuck? Share the error and I'll help debug.</li>
        <li>Need motivation? I’ll give a quick pep talk.</li>
      </ul>
    `;
  } else {
    // ================= PROGRAMMING LANGUAGES =================
    if (msg.includes("c language")) {
      response = `<h1>💻 C Language</h1><h2>Definition</h2><p>C is a procedural programming language...</p><pre><code>#include &lt;stdio.h&gt;\nint main(){\n  printf("Hello, World!\\n");\n  return 0;\n}</code></pre>`;
    } else if (msg.includes("c++")) {
      response = `<h1>💻 C++ Language</h1><p>Created by Bjarne Stroustrup in 1985...</p><pre><code>#include &lt;iostream&gt;\nusing namespace std;\nint main(){\n  cout &lt;&lt; "Hello, C++ World!" &lt;&lt; endl;\n}</code></pre>`;
    } else if (msg.includes("python")) {
      response = `<h1>🐍 Python</h1><p>Python is high-level, interpreted...</p><pre><code>print("Hello, Python World!")</code></pre>`;
    } else if (msg.includes("java")) {
      response = `<h1>☕ Java</h1><p>Java is object-oriented...</p><pre><code>public class Main{\n  public static void main(String[] args){\n    System.out.println("Hello, Java World!");\n  }\n}</code></pre>`;
    } else if (msg.includes("javascript") || msg.includes("js")) {
      response = `<h1>✨ JavaScript</h1><p>Language of the web...</p><pre><code>console.log("Hello, JavaScript World!");</code></pre>`;
    } else if (msg.includes("c#") || msg.includes("c sharp")) {
      response = `<h1>🎯 C#</h1><p>Created by Microsoft in 2000...</p><pre><code>using System;\nclass Program{\n  static void Main(){\n    Console.WriteLine("Hello, C# World!");\n  }\n}</code></pre>`;
    } else if (msg.includes("php")) {
      response = `<h1>🌐 PHP</h1><p>Server-side scripting language...</p><pre><code>&lt;?php\necho "Hello, PHP World!";\n?&gt;</code></pre>`;
    } else if (msg.includes("ruby")) {
      response = `<h1>💎 Ruby</h1><p>Dynamic and simple...</p><pre><code>puts "Hello, Ruby World!"</code></pre>`;
    } else if (msg.includes("go language") || msg.includes("golang")) {
      response = `<h1>🚀 Go (Golang)</h1><p>Efficient, concurrent language...</p><pre><code>package main\nimport "fmt"\nfunc main(){\n  fmt.Println("Hello, Go World!")\n}</code></pre>`;
    } else if (msg.includes("rust")) {
      response = `<h1>🦀 Rust</h1><p>Safe and fast systems language...</p><pre><code>fn main(){\n  println!("Hello, Rust World!");\n}</code></pre>`;
    }

    // ================= SUBJECTS =================
    else if (msg.includes("os") || msg.includes("operating system")) {
      response = `<h1>🖥️ Operating System</h1><p>An OS manages computer hardware, software, and provides services...</p>`;
    } else if (msg.includes("system testing")) {
      response = `<h1>🧪 System Testing</h1><p>System testing validates the complete and integrated product...</p>`;
    } else if (msg.includes("dbms") || msg.includes("database")) {
      response = `<h1>🗄️ DBMS</h1><p>DBMS stores, manages, and retrieves data efficiently...</p>`;
    }

    // ================= PRACTICE PROGRAMS =================
    else if (msg.includes("factorial")) {
      response = `<h1>🧮 Factorial Program</h1><p>Factorial of n (n!) is product of 1..n</p><pre><code>// Python\nn=5\nfact=1\nfor i in range(1,n+1):\n    fact*=i\nprint("Factorial =",fact)</code></pre>`;
    } else if (msg.includes("fibonacci")) {
      response = `<h1>🔢 Fibonacci Program</h1><p>Sequence starts 0,1 and adds prev two.</p><pre><code>// Python\nn=5\na,b=0,1\nfor i in range(n):\n    print(a,end=" ")\n    a,b=b,a+b</code></pre>`;
    } else if (msg.includes("palindrome")) {
      response = `<h1>🔄 Palindrome Program</h1><p>Reads same forward and backward.</p><pre><code>// Python\ns="level"\nif s==s[::-1]:\n    print("Palindrome")\nelse:\n    print("Not Palindrome")</code></pre>`;
    }

    // ================= MOTIVATION =================
    else if (msg.includes("motivation") || msg.includes("inspire")) {
      const mot = pickRandom([
        "The best way to predict the future is to invent it. — Alan Kay",
        "Don’t stop until you’re proud.",
        "Small daily improvements lead to stunning results."
      ]);
      response = `<h1>💡 Motivation</h1><p>${mot}</p>`;
    } else {
      response = `<p>I couldn’t find a match — ask me about programming, routines, or type 'motivation'.</p>`;
    }
  }

  return `<div class="ai-message">${response}</div>`;
}


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

