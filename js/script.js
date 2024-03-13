const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

// Simulating initial bot message
appendMessage("Hello! How can I assist you today?", false);

// Function to send user message
function sendMessage() {
    const message = userInput.value.trim();
    if (message !== "") {
        appendMessage(message, true);
        userInput.value = "";
        showTypingIndicator();
        setTimeout(() => {
            autoReply(message);
        }, 1000);
    }
}

// Function to display bot message
function appendMessage(message, isUser) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    if (isUser) {
        messageElement.classList.add("user-message");
    } else {
        messageElement.classList.add("bot-message");
    }
    messageElement.innerText = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to simulate bot typing indicator
function showTypingIndicator() {
    const typingIndicator = document.createElement("div");
    typingIndicator.classList.add("typing-indicator");
    typingIndicator.innerText = "Bot is typing...";
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to fetch full content of a Wikipedia page using a proxy server
async function fetchFullContentFromWikipedia(query) {
    console.log("Querying Wikipedia API for full content of:", query);

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Proxy server URL
    const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${query}`;

    try {
        console.log("Sending request to API:", apiUrl);

        const response = await fetch(proxyUrl + apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch data from Wikipedia. Response status: ' + response.status);
        }

        console.log("Received response:", response);

        const data = await response.json();
        console.log("Parsed JSON data:", data);

        if (data.extract) {
            console.log("Extract found:", data.extract);
            return data.extract; // Extracting the full content of the page
        } else {
            console.log("No extract found");
            return "Sorry, I couldn't find information on that topic.";
        }
    } catch (error) {
        console.error("Error fetching data from Wikipedia:", error);
        return "An error occurred while fetching information from Wikipedia. Please try again later.";
    }
}



// Function to simulate bot reply based on user input
async function autoReply(message) {
    let reply;

    if (message.toLowerCase().includes("what is")) {
        const query = message.replace(/what is/i, "").trim();
        reply = await fetchFullContentFromWikipedia(query);
    } else {
        // Handle other types of queries or greetings
        // For now, let's keep the existing logic
        const hiRegex = /hi|hello|hey/i;
        const howAreYouRegex = /how are you\??/i;

        if (hiRegex.test(message)) {
            reply = "Hello there! How can I help you?";
        } else if (howAreYouRegex.test(message)) {
            reply = "I'm just a bot, but I'm functioning perfectly fine!";
        } else {
            reply = "I'm sorry, I didn't quite catch that. Could you please rephrase?";
        }
    }

    setTimeout(() => {
        chatBox.removeChild(chatBox.lastChild); // Remove typing indicator
        appendMessage(reply, false);
    }, 1000);
}

