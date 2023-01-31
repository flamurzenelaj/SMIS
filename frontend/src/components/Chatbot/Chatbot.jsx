import "./Chatbot.scss";
import React, { useEffect, useRef, useState } from "react";
import { images } from "../../constants";
import axios from "axios";

function Chatbot() {
  const [conversation, setConversation] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [popQuestions, setPopQuestions] = useState(true);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("https://localhost:7255/api/Chatbot");
      setQuestions(result.data);
    };
    fetchData();
  }, []);

  const [popularQuestions, setPopularQuestions] = useState([
    {
      question: "How can I log into SMIS?",
      response:
        "You can log into the SMIS by using your login credentials (e.g. username and password).",
    },
    {
      question: "How can I check my grades?",
      response:
        "You can check your grades by logging into the Student management system and navigating to the Transcript tab.",
    },
    {
      question: "What departments does our university have?",
      response:
        "Our Departments are: Computer-Science, Business, Education, Engineering, Law, Medicine, Nursing, etc.",
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation, isBotTyping]);

  useEffect(() => {
    setConversation([
      ...conversation,
      {
        type: "bot",
        message: "Hello! How can I help you today?",
      },
    ]);
  }, []);

  const getBotResponse = (message) => {
    let response =
      "I'm sorry, I didn't understand your message. Can you please rephrase it?";

    questions.forEach((item) => {
      if (message.toLowerCase().includes(item.question)) {
        response = item.response;
      }
    });
    return response;
  };
  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();

    const newUserMessage = {
      type: "user",
      message: userMessage,
      className: "new-message",
    };

    setUserMessage("");

    setConversation([
      ...conversation,
      {
        type: "user",
        message: newUserMessage,
      },
    ]);
    setTimeout(() => {
      setIsBotTyping(true);
    }, 500);
    setConversation([...conversation, newUserMessage]);

    setTimeout(() => {
      const botResponse = getBotResponse(userMessage);
      const newBotMessage = {
        type: "bot",
        message: botResponse,
      };

      setConversation([...conversation, newUserMessage, newBotMessage]);
      setIsBotTyping(false);
    }, 1000);
  };

  const handleChange = (e) => {
    setUserMessage(e.target.value);
  };

  const handlePopularQuestion = (question, response, index) => {
    if (popularQuestions.length === 1) {
      setPopQuestions(false);
    }
    popularQuestions.splice(index, 1);
    setPopularQuestions([...popularQuestions]);

    popularQuestions.pop();

    const newUserMessage = {
      type: "user",
      message: question,
      className: "new-message",
    };

    setConversation([...conversation, newUserMessage]);

    setTimeout(() => {
      setIsBotTyping(true);
    }, 500);

    setTimeout(() => {
      const newBotMessage = {
        type: "bot",
        message: response,
      };

      setConversation([...conversation, newUserMessage, newBotMessage]);
      setIsBotTyping(false);
      setUserMessage("");
    }, 1500);
  };
  return (
    <div>
      <button
        className={`chat-button ${isChatbotVisible ? "open" : ""}`}
        onClick={() => setIsChatbotVisible(!isChatbotVisible)}
      >
       
          <img src={images.bot} alt="bot" />
      </button>

      <div id="chatbot" className={isChatbotVisible ? "open" : ""}>
        <div className="chatbot-header">
          <h2>SMIS BOT</h2>
          <button
            className="close-button"
            onClick={() => setIsChatbotVisible(false)}
          >
            Close
          </button>
        </div>
        <div id="chatbot-conversation">
          <div className="chat-messages">
            {conversation.map((message, index) => (
              <div
                key={index}
                className={`message-bubble ${message.type} ${message.className}`}
              >
                <p>{message.message}</p>
              </div>
            ))}
            {isBotTyping && (
              <div className="message-bubble bot">
                <p>Typing...</p>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>

        <div className={`popular-questions ${popQuestions ? "" : "close"} `}>
          {popularQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => {
                handlePopularQuestion(
                  question.question,
                  question.response,
                  index
                );
              }}
            >
              {question.question}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <input
            id="chatbot-message"
            type="text"
            value={userMessage}
            onChange={handleChange}
            placeholder="Type your message here"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;
