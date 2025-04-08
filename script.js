document.addEventListener("DOMContentLoaded", function() {
  const sendButton = document.querySelector(".send-btn");
  const inputArea = document.querySelector(".Messagebox");
  const inter = document.querySelector(".input-area");
  const chatContainer = document.querySelector(".chat-container");
  const chatWindow = document.querySelector(".chat-window");
  const footer = document.querySelector("footer");

  // Send message when the "Send" button is clicked
  sendButton.addEventListener("click", sendMessage);

  // Send message when the "Enter" key is pressed
  inputArea.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission or newline
      sendMessage();
    }
  });

  // Function to handle message send
  function sendMessage() {
    const userMessage = inputArea.value.trim();
    if (userMessage) {
      addMessageToChat(userMessage);
      inputArea.value = "";
    }

    adjustLayoutForViewport();

    // Update the chat and footer UI
    chatContainer.style.display = "none";
    chatWindow.style.marginTop = "20px";
    sendButton.style.bottom = "40px";
    footer.style.marginTop = "0px";
    footer.style.fontSize = "12px";
    inputArea.style = "margin-bottom: 20px";
    footer.style.marginBottom = "0px";
    footer.innerHTML = "MinaGPT can make mistakes. Check important info.";
  }

  // Adjust the layout based on the viewport width
  function adjustLayoutForViewport() {
    const viewportWidth = window.innerWidth;

    if (viewportWidth <= 375) {
      inter.style.marginTop = "450px";
      chatWindow.style = "height:410px";
    } else if (viewportWidth <= 400) {
      inter.style.marginTop = "540px";
      chatWindow.style = "height:500px";
    } else if (viewportWidth <= 769) {
      inter.style.marginTop = "720px";
      chatWindow.style = "height:680px";
    } else if (viewportWidth <= 900) {
      inter.style.marginTop = "920px";
      chatWindow.style = "height:880px";
    } else if (viewportWidth <= 2000) {
      inter.style.marginTop = "540px";
      chatWindow.style = "height:500px";
    } else {
      inter.style.marginTop = "540px";
      chatWindow.style = "height:500px";
    }
  }

  // Function to add the user message to the chat
  function addMessageToChat(message) {
    const newMessage = document.createElement("div");
    newMessage.classList.add("message", "user-message");
    newMessage.textContent = message;
    chatWindow.appendChild(newMessage);

    makeMessageVisible(newMessage);

    // Simulate AI response with a delay
    setTimeout(async () => {
      const aiMessage = document.createElement("div");
      aiMessage.classList.add("message", "ai-message");
      const response = await generateAIResponse(message) || "Sorry, I couldn't process your request.";
      aiMessage.textContent = response;
      chatWindow.appendChild(aiMessage);

      makeMessageVisible(aiMessage);
    }, 1000);
  }

  // Helper function to animate visibility and scroll
  function makeMessageVisible(messageElement) {
    setTimeout(() => {
      messageElement.classList.add("visible");
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 10);
  }

  // Function to generate an AI response based on user input (with API call to Gemini AI)
  function generateAIResponse(userMessage) {
    // Lowercase the user message to make case-insensitive matching easier
    const userMessageLower = userMessage.toLowerCase();

    // Define response rules
    if (userMessageLower.includes("hello") || userMessageLower.includes("hi")) {
        return "Hello! How can I assist you today?";
    } else if (userMessageLower.includes("how are you")) {
        return "I'm doing great, thank you for asking! How about you?";
    } else if (userMessageLower.includes("bye")) {
        return "Goodbye! Feel free to come back anytime!";
    } else if (userMessageLower.includes("weather")) {
        return "I can't provide the weather at the moment, but check your local weather service!";
    } else if (userMessageLower.includes("help")) {
        return "Sure, I'm here to help! What do you need assistance with?";
    } else if (userMessageLower.includes("thanks") || userMessageLower.includes("thank you")) {
        return "You're welcome! 😊 Let me know if you need anything else!";
    } else {
        return "I'm sorry, I didn't quite understand that.";
    }
}
  
});
