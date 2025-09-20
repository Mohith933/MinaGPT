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

  // Short greetings
  if(msg.includes("hello")||msg.includes("hi")){
    response = `<p class="short-reply">👋 Hey there! Ready to explore knowledge and code magic? 💻✨</p>`;
  } else if(msg.includes("how are you")){
    response = `<p class="short-reply">🤖 I’m fully compiled and running smoothly! How’s your learning today? 😎</p>`;
  }

  // ================= PROGRAMMING LANGUAGES =================

  // C Language
  else if(msg.includes("c language")){
    response = `<h1>💻 C Language</h1><h2>Definition</h2><p>C is a procedural programming language, widely used for system programming and embedded devices.</p><h2>Key Points</h2><ul><li>Created by Dennis Ritchie in 1972</li><li>Used for OS, embedded systems, high-performance apps</li><li>Basis for many modern languages</li></ul><h2>Example</h2><pre><code>#include &lt;stdio.h&gt;\nint main(){\n  printf("Hello, World!\\n");\n  return 0;\n}</code></pre>`;
  }

  // C++
  else if(msg.includes("c++")){
    response = `<h1>💻 C++ Language</h1><h2>Definition</h2><p>C++ is an object-oriented extension of C, great for games and high-performance applications.</p><h2>Key Points</h2><ul><li>Created by Bjarne Stroustrup in 1985</li><li>Supports classes, inheritance, polymorphism</li><li>Used in games, simulations, system software</li></ul><h2>Example</h2><pre><code>#include &lt;iostream&gt;\nusing namespace std;\nint main(){\n  cout &lt;&lt; "Hello, C++ World!" &lt;&lt; endl;\n  return 0;\n}</code></pre>`;
  }

  // Python
  else if(msg.includes("python")){
    response = `<h1>🐍 Python</h1><h2>Definition</h2><p>Python is high-level, interpreted, and known for readability. Great for AI, web dev, automation, and scripting.</p><h2>Key Points</h2><ul><li>Created by Guido van Rossum in 1991</li><li>Supports procedural, OOP, and functional programming</li><li>Used in AI, data science, web dev</li></ul><h2>Example</h2><pre><code>print("Hello, Python World!")</code></pre>`;
  }

  // Java
  else if(msg.includes("java")){
    response = `<h1>☕ Java</h1><h2>Definition</h2><p>Java is object-oriented, runs on JVM, and widely used for enterprise apps and Android development.</p><h2>Key Points</h2><ul><li>Created by James Gosling in 1995</li><li>"Write Once, Run Anywhere"</li><li>Strongly typed and widely used in large-scale apps</li></ul><h2>Example</h2><pre><code>public class Main{\n  public static void main(String[] args){\n    System.out.println("Hello, Java World!");\n  }\n}</code></pre>`;
  }

  // JavaScript
  else if(msg.includes("javascript")||msg.includes("js")){
    response = `<h1>✨ JavaScript</h1><h2>Definition</h2><p>JavaScript is the programming language of the web for dynamic websites and Node.js apps.</p><h2>Key Points</h2><ul><li>Created by Brendan Eich in 1995</li><li>Supports front-end and back-end development</li><li>Event-driven, functional, and OOP</li></ul><h2>Example</h2><pre><code>console.log("Hello, JavaScript World!");</code></pre>`;
  }

  // C#
  else if(msg.includes("c#")||msg.includes("c sharp")){
    response = `<h1>🎯 C#</h1><h2>Definition</h2><p>C# is a modern, object-oriented language by Microsoft for .NET applications and game development (Unity).</p><h2>Key Points</h2><ul><li>Created in 2000</li><li>Part of .NET framework</li><li>Used in desktop apps, games, and web services</li></ul><h2>Example</h2><pre><code>using System;\nclass Program{\n  static void Main(){\n    Console.WriteLine("Hello, C# World!");\n  }\n}</code></pre>`;
  }

  // PHP
  else if(msg.includes("php")){
    response = `<h1>🌐 PHP</h1><h2>Definition</h2><p>PHP is a server-side scripting language mainly used for web development.</p><h2>Key Points</h2><ul><li>Created by Rasmus Lerdorf in 1994</li><li>Powers WordPress, Facebook (initially)</li><li>Good for dynamic websites</li></ul><h2>Example</h2><pre><code>&lt;?php\necho "Hello, PHP World!";\n?&gt;</code></pre>`;
  }

  // Ruby
  else if(msg.includes("ruby")){
    response = `<h1>💎 Ruby</h1><h2>Definition</h2><p>Ruby is simple, dynamic, and object-oriented. Famous for Ruby on Rails web framework.</p><h2>Key Points</h2><ul><li>Created by Yukihiro Matsumoto in 1995</li><li>Focuses on simplicity & productivity</li><li>Great for web apps</li></ul><h2>Example</h2><pre><code>puts "Hello, Ruby World!"</code></pre>`;
  }

  // Go
  else if(msg.includes("go language")||msg.includes("golang")){
    response = `<h1>🚀 Go (Golang)</h1><h2>Definition</h2><p>Go is a statically typed, compiled language by Google, designed for efficiency and concurrency.</p><h2>Key Points</h2><ul><li>Created in 2009</li><li>Great for cloud services and networking</li><li>Built-in concurrency (goroutines)</li></ul><h2>Example</h2><pre><code>package main\nimport "fmt"\nfunc main(){\n  fmt.Println("Hello, Go World!")\n}</code></pre>`;
  }

  // Rust
  else if(msg.includes("rust")){
    response = `<h1>🦀 Rust</h1><h2>Definition</h2><p>Rust is a systems programming language focused on safety, speed, and concurrency.</p><h2>Key Points</h2><ul><li>Created in 2010 by Mozilla</li><li>Memory-safe without garbage collector</li><li>Used in system tools, web assembly</li></ul><h2>Example</h2><pre><code>fn main(){\n  println!("Hello, Rust World!");\n}</code></pre>`;
  }

  // ================= SUBJECTS =================

  // Operating System
  else if(msg.includes("os")||msg.includes("operating system")){
    response = `<h1>🖥️ Operating System</h1><h2>Definition</h2><p>An OS manages computer hardware, software, and provides services for programs.</p><h2>Key Points</h2><ul><li>Manages memory, processes, and I/O</li><li>Examples: Windows, Linux, macOS</li><li>Provides user interface & resource management</li></ul>`;
  }

  // System Testing
  else if(msg.includes("system testing")){
    response = `<h1>🧪 System Testing</h1><h2>Definition</h2><p>System testing validates the complete and integrated software product.</p><h2>Key Points</h2><ul><li>Performed after integration testing</li><li>Tests functional and non-functional requirements</li><li>Ensures product works end-to-end</li></ul>`;
  }

  // DBMS
  else if(msg.includes("dbms")||msg.includes("database")){
    response = `<h1>🗄️ DBMS</h1><h2>Definition</h2><p>Database Management System (DBMS) is software to store, manage, and retrieve data efficiently.</p><h2>Key Points</h2><ul><li>Examples: MySQL, PostgreSQL, Oracle</li><li>Supports CRUD operations</li><li>Ensures data integrity & security</li></ul>`;
  }

  // ================= MOTIVATION =================
  else if(msg.includes("motivation")||msg.includes("inspire")){
    response = `<h1>💡 Motivation</h1><p>"The best way to predict the future is to invent it." – Alan Kay</p><p>Keep coding, keep growing 🚀🔥</p>`;
  }
  // ================= PRACTICE PROGRAMS =================

// Factorial Program
else if(msg.includes("factorial")){
  response = `<h1>🧮 Factorial Program</h1><h2>Definition</h2><p>Factorial of a number n (n!) is the product of all numbers from 1 to n.</p><h2>Examples in Different Languages</h2><h3>C</h3><pre><code>#include &lt;stdio.h&gt;
int main(){
  int n=5,fact=1;
  for(int i=1;i&lt;=n;i++){fact*=i;}
  printf("Factorial = %d",fact);
  return 0;
}</code></pre><h3>Python</h3><pre><code>n=5
fact=1
for i in range(1,n+1):
    fact*=i
print("Factorial =",fact)</code></pre><h3>Java</h3><pre><code>public class Main{
  public static void main(String[] args){
    int n=5,fact=1;
    for(int i=1;i&lt;=n;i++){fact*=i;}
    System.out.println("Factorial = "+fact);
  }
}</code></pre>`;
}

// Fibonacci Program
else if(msg.includes("fibonacci")){
  response = `<h1>🔢 Fibonacci Program</h1><h2>Definition</h2><p>Fibonacci sequence starts with 0,1 and every next number is sum of previous two.</p><h2>Examples</h2><h3>C</h3><pre><code>#include &lt;stdio.h&gt;
int main(){
  int n=5,a=0,b=1,c;
  for(int i=0;i&lt;n;i++){
    printf("%d ",a);
    c=a+b;a=b;b=c;
  }
  return 0;
}</code></pre><h3>Python</h3><pre><code>n=5
a,b=0,1
for i in range(n):
    print(a,end=" ")
    a,b=b,a+b</code></pre>`;
}

// Palindrome Program
else if(msg.includes("palindrome")){
  response = `<h1>🔄 Palindrome Program</h1><h2>Definition</h2><p>A palindrome is a word or number that reads the same backward and forward.</p><h2>Examples</h2><h3>Python</h3><pre><code>s="level"
if s==s[::-1]:
    print("Palindrome")
else:
    print("Not Palindrome")</code></pre><h3>Java</h3><pre><code>public class Main{
  public static void main(String[] args){
    String s="madam";
    String rev=new StringBuilder(s).reverse().toString();
    if(s.equals(rev))System.out.println("Palindrome");
    else System.out.println("Not Palindrome");
  }
}</code></pre>`;
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
