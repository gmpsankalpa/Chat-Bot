from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer

# Create a new chatbot
chatbot = ChatBot('MyBot')

# Create a new trainer for the chatbot
trainer = ChatterBotCorpusTrainer(chatbot)

# Train the chatbot on the English language corpus data
trainer.train('chatterbot.corpus.english')

# Simple loop to take user input and generate responses
while True:
    user_input = input("You: ")
    
    # Break the loop if the user types 'exit'
    if user_input.lower() == 'exit':
        break
    
    # Get the chatbot's response
    response = chatbot.get_response(user_input)
    
    print("Bot:", response)
