import React, { useState } from "react";
import { Button, Switch, Modal, Box, IconButton, TextField, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import Settings from "./Settings";

export default function Infobar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I'm LinkUp Chatbot. Ask me anything about this website!" },
  ]);
  const [input, setInput] = useState("");

  const handleOpenChat = () => setChatOpen(true);
  const handleCloseChat = () => setChatOpen(false);

  // Simple rule-based bot response
   const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();

    // Website navigation
    if (msg.includes("login")) return "To login, just click the login button and enter your username and password.";
    if (msg.includes("signup") || msg.includes("register")) return "You can sign up by clicking the signup button and filling the form. It's quick!";
    if (msg.includes("profile")) return "You can see your profile info and update it from the settings section.";
    if (msg.includes("logout")) return "Click the red logout button at the top right to sign out safely.";
    if (msg.includes("dark mode")) return "You can switch between dark and light mode using the toggle on the sidebar.";

    // Fun/engagement
    if (msg.includes("game") || msg.includes("tic tac toe")) return "You can play Tic Tac Toe by clicking the 'Play Tic Tac Toe' button! Have fun!";
    if (msg.includes("fun") || msg.includes("something fun")) return "You can try our game or explore other features on the website. 😊";

    // Help/assistance
    if (msg.includes("help") || msg.includes("support")) return "I'm here to help! You can ask me about logging in, playing games, updating your profile, or using dark mode.";
    if (msg.includes("contact")) return "You can contact us through the contact page or feedback form. We'd love to hear from you!";

    // Friendly conversation
    if (msg.includes("hello") || msg.includes("hi")) return "Hello! How's your day going? 😊";
    if (msg.includes("how are you")) return "I'm just a friendly bot, always ready to help you!";
    if (msg.includes("thanks") || msg.includes("thank you")) return "You're welcome! Glad I could help!";
    if (msg.includes("bye") || msg.includes("see you")) return "Goodbye! Have a wonderful day! 🌟";

    // Guidance/tips
    if (msg.includes("tips") || msg.includes("advice")) return "Try exploring the sidebar for features like dark mode, games, and settings. It's all easy to use!";
    if (msg.includes("explore") || msg.includes("features")) return "You can explore your profile, play games, toggle dark mode, and chat with me anytime!";

    // Fallback
    return "I'm not sure about that, but I can help you with logging in, playing games, checking your profile, using dark mode, or general website tips. Try asking about those!";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const botReply = { sender: "bot", text: getBotResponse(input) };
    setTimeout(() => {
      setMessages((prev) => [...prev, botReply]);
    }, 500); // simulate delay

    setInput("");
  };

  // Assign different colors based on first letter
  const getColorForLetter = (letter) => {
    const colors = [
      "#e57373", "#f06292", "#ba68c8", "#64b5f6",
      "#4db6ac", "#81c784", "#ffd54f", "#ffb74d",
      "#a1887f", "#90a4ae", "#f06292", "#4dd0e1",
      "#7986cb", "#aed581", "#ff8a65", "#dce775",
      "#4fc3f7", "#f48fb1", "#ce93d8", "#81c784",
      "#ffd54f", "#ffb74d", "#a1887f", "#90a4ae",
      "#4db6ac", "#64b5f6"
    ];
    const index = (letter.toUpperCase().charCodeAt(0) - 65) % colors.length;
    return colors[index] || "#777"; // fallback color
  };

  return (
    <>
      <div
        style={{
          width: "20%",
          height: "100vh",
          padding: "20px",
          backgroundColor: darkMode ? "#000" : "#f5f5f5",
          color: darkMode ? "#fff" : "#000",
          borderLeft: "1px solid #222",
          overflow: "hidden",
        }}
      >
        {/* User info */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                color: "#fff",
                backgroundColor: getColorForLetter(username?.[0] || "A"),
              }}
            >
              {username?.[0]?.toUpperCase()}
            </div>
            <h3>{username}</h3>
          </div>
          <Button
            color="error"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            <LogoutIcon />
          </Button>
        </div>

        {/* Dark Mode */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <span>Dark Mode</span>
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </div>

        {/* Settings Component */}
        <Settings darkMode={darkMode} />

        {/* Tic Tac Toe Button */}
        <Button
          variant="contained"
          startIcon={<SportsEsportsIcon />}
          sx={{ marginTop: "20px" }}
          onClick={() => navigate("/game")}
        >
          Play Tic Tac Toe
        </Button>

        {/* Chat with Us Button */}
        <Button
          variant="contained"
          startIcon={<ChatIcon />}
          sx={{ marginTop: "20px", backgroundColor: "#1976d2" }}
          onClick={handleOpenChat}
        >
          Chat with Us
        </Button>
      </div>

      {/* Chat Modal */}
      <Modal
        open={chatOpen}
        onClose={handleCloseChat}
        closeAfterTransition
        BackdropProps={{
          style: { backdropFilter: "blur(5px)", backgroundColor: "rgba(0,0,0,0.5)" },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: darkMode ? "#222" : "#fff",
            color: darkMode ? "#fff" : "#000",
            borderRadius: 2,
            p: 3,
            boxShadow: 24,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
            <h3>Chatbot</h3>
            <IconButton onClick={handleCloseChat}>
              <CloseIcon sx={{ color: darkMode ? "#fff" : "#000" }} />
            </IconButton>
          </div>

          <Box
            sx={{
              minHeight: "300px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              overflowY: "auto",
              mb: 2,
              bgcolor: darkMode ? "#333" : "#f9f9f9",
            }}
          >
            {messages.map((msg, index) => (
              <Typography
                key={index}
                sx={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  mb: 1,
                  bgcolor: msg.sender === "user" ? "#1976d2" : "#888",
                  color: "#fff",
                  borderRadius: "10px",
                  p: 1,
                  maxWidth: "80%",
                  marginLeft: msg.sender === "bot" ? 0 : "auto",
                }}
              >
                {msg.text}
              </Typography>
            ))}
          </Box>

          <div style={{ display: "flex" }}>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <Button variant="contained" onClick={handleSend} sx={{ ml: 1 }}>
              Send
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
