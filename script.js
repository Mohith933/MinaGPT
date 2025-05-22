document.addEventListener("DOMContentLoaded", function () {
  const sendButton = document.querySelector(".send-btn");
  const inputArea = document.querySelector(".Messagebox");
  const inter = document.querySelector(".input-area");
  const chatContainer = document.querySelector(".chat-container");
  const chatWindow = document.querySelector(".chat-window");
  const footer = document.querySelector("footer");
  const editButton = document.getElementById("editBtn");
  

  // Send message on button click
  sendButton.addEventListener("click", sendMessage);

  // Send message on Enter key press
  inputArea.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  });

  // Edit button click event
  editButton.addEventListener("click", function () {
    window.location.href = "index.html";
  });

  // Send message handler
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

  // Adjust layout for screen size
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
     window.addEventListener("resize", adjustLayoutForViewport);
  }

  // Call initially and on resize

 

  // Add message to chat
  function addMessageToChat(message) {
    const newMessage = document.createElement("div");
    newMessage.classList.add("message", "user-message");
    newMessage.textContent = message;
    chatWindow.appendChild(newMessage);
    makeMessageVisible(newMessage);

    setTimeout(async () => {
      const aiMessage = document.createElement("div");
      aiMessage.classList.add("message", "ai-message");
      const response = await generateAIResponse(message);
      aiMessage.textContent = response;
      chatWindow.appendChild(aiMessage);
      makeMessageVisible(aiMessage);
    }, 1000);
  }

  // Animate and scroll chat
  function makeMessageVisible(messageElement) {
    setTimeout(() => {
      messageElement.classList.add("visible");
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 10);
  }

  // Fake AI logic
 function generateAIResponse(userMessage) {  
    const msg = userMessage.toLowerCase();  

    let response = "";  

    if (msg.includes("hello") || msg.includes("hi")) {  
        response = "Hello there! It's wonderful to connect with you. I’m here to assist with anything you need, whether it’s answering questions, sharing insights, or just engaging in a friendly chat. Conversations always feel better when shared, so let’s keep it going!";  
    } else if (msg.includes("how are you")) {  
        response = "Thank you for asking! As an AI, I don’t experience emotions in the same way humans do, but I always enjoy being helpful and engaged in conversations. What about you? How’s your day going so far? I’d love to hear about anything exciting or even something you need advice on.";  
    } else if (msg.includes("bye")) {  
        response = "Goodbye for now! It’s been great chatting with you, and I truly appreciate the time we’ve spent together. If you ever need anything—insights, motivation, or just a casual talk—don’t hesitate to return. Take care and stay awesome!";  
    } else if (msg.includes("weather")) {  
        response = "Weather plays such a huge role in our day! Whether it’s sunny skies that lift your mood or cozy rainy days that make you want to stay in, it’s always good to check a local weather service for the most accurate forecast. I hope the day treats you kindly, no matter the weather!";  
    } else if (msg.includes("help")) {  
        response = "Of course! Helping is what I do best. Whether you need guidance, recommendations, or just someone to bounce ideas off, I’m here for you. Tell me how I can assist, and I’ll do my very best to provide valuable support or information.";  
    } else if (msg.includes("thanks") || msg.includes("thank you")) {  
        response = "You're very welcome! 😊 I truly appreciate our conversation, and I’m always happy to help in any way I can. If there’s anything else on your mind, feel free to ask. No matter what, I’m here to make things easier and more enjoyable for you!";  
    } else if (msg.includes("motivation")) {  
        response = "You are capable of incredible things! Every challenge you face is a step toward growth and success. The road may not always be smooth, but each obstacle you overcome makes you stronger. Keep pushing forward, stay positive, and trust in yourself—you’ve got this! No matter where you are in your journey, believe in your ability to achieve greatness.";  
    } else {  
        response = "Hmm, that’s an interesting thought! I’m not quite sure how to respond, but I’d love to hear more. Could you clarify or ask in a different way? I’m always here to make sure you get the best possible answer, and I’m excited to continue our conversation!";  
    }  

    return response.replace(/\. /g, ".\n\n"); // Adds paragraph spacing for better readability  
}
});
