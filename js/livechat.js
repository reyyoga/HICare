// Function to open/close the live chat window
function toggleChatWindow() {
  const chatWindow = document.getElementById('chat-window');
  const livechatButton = document.getElementById('livechat-button');
  
  if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
    chatWindow.style.display = 'flex';
    livechatButton.style.display = 'none'; // Hide the Livechat button when chat is open
  } else {
    chatWindow.style.display = 'none';
    livechatButton.style.display = 'block'; // Show the Livechat button when chat is closed
  }
}

// Function to handle user input
function handleInput(event) {
  const inputField = document.getElementById('user-input');
  const message = inputField.value.trim();

  // If the user presses enter, send the message
  if (event.key === 'Enter' && message) {
    sendMessage();
  }
}

// Function to send a user message
function sendMessage() {
  const inputField = document.getElementById('user-input');
  const message = inputField.value.trim();

  if (!message) return;

  // Display the user message
  const chatMessages = document.getElementById('chat-messages');
  const userMessage = document.createElement('div');
  userMessage.classList.add('chat-message', 'user');
  userMessage.textContent = message;
  chatMessages.appendChild(userMessage);

  // List of medical responses with options
  const botResponses = [
    {
      text: "Do you need medical assistance? I can provide basic information.",
      options: [
        "About disease symptoms",
        "How to care for yourself at home",
        "The importance of regular check-ups"
      ]
    },
    {
      text: "I'm here to help. What can I assist you with?",
      options: [
        "Heart disease",
        "Diabetes",
        "Mental health"
      ]
    },
    {
      text: "Hi, how can I assist your health today?",
      options: [
        "Respiratory infections",
        "Autoimmune diseases",
        "Healthy lifestyle"
      ]
    }
  ];

  // Function to pick a random bot response
  function getRandomBotResponse() {
    const randomIndex = Math.floor(Math.random() * botResponses.length);
    return botResponses[randomIndex];
  }

  // Send bot's automatic response with options
  setTimeout(() => {
    const response = getRandomBotResponse();
    
    // Display the bot's message
    const botMessage = document.createElement('div');
    botMessage.classList.add('chat-message', 'bot');
    botMessage.textContent = response.text; // Display the main message
    chatMessages.appendChild(botMessage);

    // Display options for the user to choose from
    const optionsContainer = document.createElement('div');
    response.options.forEach(option => {
      const optionButton = document.createElement('button');
      optionButton.classList.add('chat-option');
      optionButton.textContent = option;
      optionButton.onclick = () => handleOptionClick(option);
      optionsContainer.appendChild(optionButton);
    });
    chatMessages.appendChild(optionsContainer);

    // Scroll down after the new message
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 1000);

  // Clear the input field after sending the message
  inputField.value = '';
  inputField.focus();

  // Scroll down after the new message
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to handle option click
function handleOptionClick(option) {
  const chatMessages = document.getElementById('chat-messages');

  // Display the user's selected option
  const userMessage = document.createElement('div');
  userMessage.classList.add('chat-message', 'user');
  userMessage.textContent = option;
  chatMessages.appendChild(userMessage);

  // List of medical responses based on options
  const medicalResponses = {
    "About disease symptoms": "Symptoms of diseases can vary greatly depending on the type. Are there any specific symptoms you'd like to know about?",
    "How to care for yourself at home": "Some tips for self-care at home include getting enough rest, drinking plenty of fluids, and maintaining a healthy diet.",
    "The importance of regular check-ups": "Regular check-ups can help detect diseases early and prevent more serious health problems.",
    "Heart disease": "Heart disease is one of the leading causes of death worldwide. Maintaining a healthy diet and regular exercise can reduce the risk.",
    "Diabetes": "Diabetes is a metabolic disorder that affects blood sugar levels. Proper care is essential in managing this condition.",
    "Mental health": "Mental health is just as important as physical health. Consulting a professional can help you maintain mental well-being.",
    "Respiratory infections": "Respiratory infections are often caused by viruses or bacteria. Symptoms can include cough, shortness of breath, and fever.",
    "Autoimmune diseases": "Autoimmune diseases occur when the immune system attacks the body. Proper management is crucial.",
    "Healthy lifestyle": "A healthy lifestyle includes a good diet, regular physical activity, and adequate sleep. All of these help maintain both physical and mental health."
  };

  // Send the bot's response based on the selected option
  setTimeout(() => {
    const botMessage = document.createElement('div');
    botMessage.classList.add('chat-message', 'bot');
    botMessage.textContent = medicalResponses[option] || "Sorry, I can't provide more information on this.";
    chatMessages.appendChild(botMessage);

    // Scroll down after the new message
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 1000);
}
