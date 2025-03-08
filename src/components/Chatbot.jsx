// import React, { useState } from "react";
// import axios from "axios";

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const API_KEY = "AIzaSyCcpZ8utOr8xCRTc-QufZWKSDPIbYz2v7Q";

//   const sendMessage = async () => {
//     if (!input.trim()) return;
    
//     const userMessage = { sender: "user", text: input };
//     setMessages([...messages, userMessage]);
//     setIsLoading(true);

//     try {
//       const response = await axios.post(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
//         {
//           contents: [{ role: "user", parts: [{ text: input }] }]
//         }
//       );

//       const botMessage = {
//         sender: "bot",
//         text: response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.",
//       };

//       setMessages((prevMessages) => [...prevMessages, botMessage]);
//     } catch (error) {
//       console.error("Error fetching response:", error);
//       setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: "Error fetching response." }]);
//     } finally {
//       setIsLoading(false);
//     }

//     setInput("");
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto h-screen flex flex-col bg-white">
//       {/* Header */}
//       <div className="px-4 py-3 border-b">
//         <h1 className="text-lg font-medium flex items-center gap-2">
//           <svg viewBox="0 0 24 24" className="w-6 h-6 text-purple-500" fill="currentColor">
//             <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
//           </svg>
//           Chat with Jochat
//         </h1>
//       </div>

//       {/* Chat Area */}
//       <div className="flex-1 overflow-y-auto p-4">
//         {messages.length === 0 ? (
//           <div className="h-full flex flex-col items-center justify-center text-center px-4">
//             <svg viewBox="0 0 24 24" className="w-16 h-16 text-purple-500 mb-6" fill="currentColor">
//               <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
//             </svg>
//             <h2 className="text-xl font-medium mb-2">Start a conversation with Gemini AI</h2>
//             <p className="text-gray-600 max-w-md">
//               Ask questions, get creative responses, solve problems, or just chat about anything you're curious about.
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {messages.map((msg, index) => (
//               <div 
//                 key={index} 
//                 className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
//               >
//                 <div 
//                   className={`max-w-[80%] px-4 py-2 rounded-lg ${
//                     msg.sender === "user" 
//                       ? "bg-purple-500 text-white" 
//                       : "bg-gray-100 text-gray-800"
//                   }`}
//                 >
//                   {msg.text}
//                 </div>
//               </div>
//             ))}
//             {isLoading && (
//               <div className="flex justify-start">
//                 <div className="bg-gray-100 rounded-lg px-4 py-2">
//                   <div className="flex space-x-2">
//                     <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
//                     <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
//                     <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Input Area */}
//       <div className="border-t p-4">
//         <div className="relative">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyPress={handleKeyPress}
//             className="w-full px-4 py-2 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500"
//             placeholder="Type your message..."
//           />
//           <button 
//             onClick={sendMessage}
//             disabled={isLoading || !input.trim()}
//             className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-white bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-90" viewBox="0 0 20 20" fill="currentColor">
//               <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [chats, setChats] = useState([]);
//   const [currentChatId, setCurrentChatId] = useState(null);

//   const API_KEY = "AIzaSyCcpZ8utOr8xCRTc-QufZWKSDPIbYz2v7Q";

//   // Load chats from localStorage on component mount
//   useEffect(() => {
//     const storedChats = JSON.parse(localStorage.getItem("chats")) || [];
//     setChats(storedChats);
//   }, []);

//   // Save the updated chats to localStorage
//   const saveChats = (updatedChats) => {
//     localStorage.setItem("chats", JSON.stringify(updatedChats));
//     setChats(updatedChats);
//   };

//   // Start a new chat session
//   const startNewChat = () => {
//     const newChat = { id: Date.now(), messages: [] };
//     setMessages([]);
//     setCurrentChatId(newChat.id);
//     saveChats([...chats, newChat]);
//   };

//   // Load a chat session
//   const loadChat = (chatId) => {
//     const selectedChat = chats.find((chat) => chat.id === chatId);
//     if (selectedChat) {
//       setMessages(selectedChat.messages);
//       setCurrentChatId(chatId);
//     }
//   };

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { sender: "user", text: input };
//     const updatedMessages = [...messages, userMessage];
//     setMessages(updatedMessages);
//     setIsLoading(true);

//     try {
//       const response = await axios.post(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
//         { contents: [{ role: "user", parts: [{ text: input }] }] }
//       );

//       const botMessage = {
//         sender: "bot",
//         text: response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.",
//       };

//       const finalMessages = [...updatedMessages, botMessage];
//       setMessages(finalMessages);

//       // Update the current chat messages in the chat history
//       const updatedChats = chats.map((chat) =>
//         chat.id === currentChatId ? { ...chat, messages: finalMessages } : chat
//       );
//       saveChats(updatedChats);
//     } catch (error) {
//       console.error("Error fetching response:", error);
//     } finally {
//       setIsLoading(false);
//     }

//     setInput("");
//   };

//   return (
//     <div className="flex h-screen w-screen">
//       {/* Sidebar for Chat History */}
//       <div className="w-64 bg-gray-800 text-white p-4">
//         <h2 className="text-lg font-bold mb-4">Chat History</h2>
//         <button
//           onClick={startNewChat}
//           className="bg-purple-500 text-white w-full py-2 mb-4 rounded"
//         >
//           + New Chat
//         </button>
//         <div className="space-y-2">
//           {chats.map((chat) => (
//             <button
//               key={chat.id}
//               onClick={() => loadChat(chat.id)}
//               className={`w-full text-left px-2 py-1 rounded ${
//                 chat.id === currentChatId ? "bg-purple-600" : "hover:bg-gray-700"
//               }`}
//             >
//               Chat {new Date(chat.id).toLocaleTimeString()}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Chat Area */}
//       <div className="flex-1 flex flex-col bg-white">
//         <div className="px-4 py-3 border-b">
//           <h1 className="text-lg font-medium">Chat with Jochat</h1>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-4">
//           {messages.length === 0 ? (
//             <div className="h-full flex items-center justify-center text-gray-600">
//               Start a conversation...
//             </div>
//           ) : (
//             messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
//               >
//                 <div
//                   className={`max-w-[80%] px-4 py-2 rounded-lg ${
//                     msg.sender === "user" ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-800"
//                   }`}
//                 >
//                   {msg.text}
//                 </div>
//               </div>
//             ))
//           )}
//           {isLoading && (
//                <div className="flex justify-start">
//                  <div className="bg-gray-100 rounded-lg px-4 py-2">
//                    <div className="flex space-x-2">
//                      <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
//                     <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
//                    <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.4s" }}></div>                   </div>
//                 </div>
//               </div>
//            )}
//         </div>

//         {/* Input */}
//         <div className="border-t p-4">
//           <div className="relative">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => {
//         if (e.key === "Enter" && !isLoading && input.trim()) {
//           sendMessage();
//         }
//       }}
//               className="w-full px-4 py-2 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500"
//               placeholder="Type your message..."
//             />
//             <button 
//             onClick={sendMessage}
//             disabled={isLoading || !input.trim()}
//             className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-white bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
//          >
//            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-90" viewBox="0 0 20 20" fill="currentColor">
//             <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
//           </svg>
//           </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [chats, setChats] = useState([]);
//   const [currentChatId, setCurrentChatId] = useState(null);

//   const API_KEY = "AIzaSyCcpZ8utOr8xCRTc-QufZWKSDPIbYz2v7Q";

//   useEffect(() => {
//     const storedChats = JSON.parse(localStorage.getItem("chats")) || [];
//     setChats(storedChats);
//   }, []);

//   const saveChats = (updatedChats) => {
//     localStorage.setItem("chats", JSON.stringify(updatedChats));
//     setChats(updatedChats);
//   };

// const startNewChat = () => {
//   const newChat = { 
//     id: Date.now(), 
//     messages: [], 
//     name: ""  // Add a name property to store the chat name
//   };
  
//   setMessages([]);
//   setCurrentChatId(newChat.id);
//   saveChats([...chats, newChat]);
// };

//   const loadChat = (chatId) => {
//     const selectedChat = chats.find((chat) => chat.id === chatId);
//     if (selectedChat) {
//       setMessages(selectedChat.messages);
//       setCurrentChatId(chatId);
//     }
//   };

// const sendMessage = async () => {
//   if (!input.trim()) return;

//   const userMessage = { sender: "user", text: input };
//   const updatedMessages = [...messages, userMessage];
//   setMessages(updatedMessages);
//   setIsLoading(true);

//   const currentChat = chats.find(chat => chat.id === currentChatId);

//   // Only set the name if it's not already set
//   if (currentChat && !currentChat.name) {
//     const updatedChats = chats.map(chat =>
//       chat.id === currentChatId
//         ? { ...chat, name: input, messages: updatedMessages } // Set name to user's message when sending first message
//         : chat
//     );
//     saveChats(updatedChats);
//   } else {
//     // If name is already set, just update the messages (don't change name)
//     const updatedChats = chats.map(chat =>
//       chat.id === currentChatId
//         ? { ...chat, messages: updatedMessages } // Don't touch the name
//         : chat
//     );
//     saveChats(updatedChats);
//   }

//   try {
//     const response = await axios.post(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
//       { contents: [{ role: "user", parts: [{ text: input }] }] }
//     );

//     const botMessage = {
//       sender: "bot",
//       text: response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.",
//     };

//     const finalMessages = [...updatedMessages, botMessage];
//     setMessages(finalMessages);

//     // Update the chat with the bot's response without changing the name
//     const updatedChats = chats.map(chat =>
//       chat.id === currentChatId
//         ? { ...chat,name: input, messages: finalMessages } // Keep the same name as before
//         : chat
//     );
//     saveChats(updatedChats);
//   } catch (error) {
//     console.error("Error fetching response:", error);
//   } finally {
//     setIsLoading(false);
//   }

//   setInput("");
// };





//   return (
//     <div className="flex h-screen bg-gray-50 w-screen">
//       {/* Sidebar */}
//       <div className="w-80 bg-gray-900 text-white overflow-hidden flex flex-col">
//         <div className="p-4 border-b border-gray-800">
//           <h2 className="text-xl font-semibold flex items-center gap-2">
//             <svg viewBox="0 0 24 24" className="w-6 h-6 text-purple-400" fill="currentColor">
//               <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
//             </svg>
//             Chat History
//           </h2>
//         </div>
        
//         <div className="p-4">
//           <button
//             onClick={startNewChat}
//             className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-3 px-4 flex items-center justify-center gap-2 transition-colors duration-200"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
//             </svg>
//             New Chat
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto">
//           <div className="px-2 space-y-1">
//   {chats.map((chat) => (
//     <button
//       key={chat.id}
//       onClick={() => loadChat(chat.id)}
//       className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3
//         ${chat.id === currentChatId 
//           ? "bg-purple-600 text-white" 
//           : "text-gray-300 hover:bg-gray-800"}`}
//     >
//       {/* <svg className="w-5 h-5 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
//       </svg> */}
//       <span className="truncate">{chat.name || "New Chat"}</span> {/* Display the custom name or timestamp */}
//     </button>
//   ))}
// </div>

//         </div>
//       </div>

//       {/* Main Chat Area */}
//       <div className="flex-1 flex flex-col bg-white">
//         <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
//           <h1 className="text-xl font-semibold flex items-center gap-2">
//             <svg viewBox="0 0 24 24" className="w-6 h-6 text-purple-600" fill="currentColor">
//               <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
//             </svg>
//             Chat with Jochat
//           </h1>
//         </div>

//         <div className="flex-1 overflow-y-auto p-6">
//           {messages.length === 0 ? (
//             <div className="h-full flex flex-col items-center justify-center text-center px-4">
//               <svg viewBox="0 0 24 24" className="w-16 h-16 text-purple-500 mb-6" fill="currentColor">
//                 <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/>
//               </svg>
//               <h2 className="text-2xl font-semibold mb-2">Start a conversation</h2>
//               <p className="text-gray-600 max-w-md">
//                 Ask questions, get creative responses, or just chat about anything you're curious about.
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {messages.map((msg, index) => (
//                 <div
//                   key={index}
//                   className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
//                 >
//                   <div
//                     className={`max-w-[80%] px-6 py-3 rounded-2xl shadow-sm
//                       ${msg.sender === "user" 
//                         ? "bg-purple-600 text-white" 
//                         : "bg-gray-100 text-gray-800"}`}
//                   >
//                     <p className="whitespace-pre-wrap">{msg.text}</p>
//                   </div>
//                 </div>
//               ))}
//               {isLoading && (
//                 <div className="flex justify-start">
//                   <div className="bg-gray-100 rounded-2xl px-6 py-3 shadow-sm">
//                     <div className="flex space-x-2">
//                       {[0, 1, 2].map((i) => (
//                         <div
//                           key={i}
//                           className="h-2 w-2 rounded-full bg-purple-400 animate-bounce"
//                           style={{ animationDelay: `${i * 0.2}s` }}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         <div className="border-t border-gray-100 p-6">
//           <div className="max-w-4xl mx-auto relative">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" && !e.shiftKey && !isLoading && input.trim()) {
//                   e.preventDefault();
//                   sendMessage();
//                 }
//               }}
//               className="w-full px-6 py-4 pr-16 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
//               placeholder="Type your message..."
//               disabled={isLoading}
//             />
          //   <button
          //     onClick={sendMessage}
          //     disabled={isLoading || !input.trim()}
          //     className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          //   >
          //     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-90" viewBox="0 0 20 20" fill="currentColor">
          //    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          //  </svg>
          //   </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [chats, setChats] = useState([]);
//   const [currentChatId, setCurrentChatId] = useState(null);

//   const API_KEY = "AIzaSyCcpZ8utOr8xCRTc-QufZWKSDPIbYz2v7Q";

//   useEffect(() => {
//     const storedChats = JSON.parse(localStorage.getItem("chats")) || [];
//     setChats(storedChats);
//   }, []);

//   const saveChats = (updatedChats) => {
//     localStorage.setItem("chats", JSON.stringify(updatedChats));
//     setChats(updatedChats);
//   };

//   const startNewChat = () => {
//     const newChat = { id: Date.now(), messages: [], name: "" };
//     setMessages([]);
//     setCurrentChatId(newChat.id);
//     saveChats([...chats, newChat]);
//   };

//   const loadChat = (chatId) => {
//     const selectedChat = chats.find((chat) => chat.id === chatId);
//     if (selectedChat) {
//       setMessages(selectedChat.messages);
//       setCurrentChatId(chatId);
//     }
//   };

//   const deleteChat = (chatId) => {
//     const updatedChats = chats.filter((chat) => chat.id !== chatId);
//     saveChats(updatedChats);
//     if (currentChatId === chatId) {
//       setMessages([]);
//       setCurrentChatId(null);
//     }
//   };

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { sender: "user", text: input };
//     const updatedMessages = [...messages, userMessage];
//     setMessages(updatedMessages);
//     setIsLoading(true);

//     const currentChat = chats.find(chat => chat.id === currentChatId);

//     if (currentChat && !currentChat.name) {
//       const updatedChats = chats.map(chat =>
//         chat.id === currentChatId ? { ...chat, name: input, messages: updatedMessages } : chat
//       );
//       saveChats(updatedChats);
//     } else {
//       const updatedChats = chats.map(chat =>
//         chat.id === currentChatId ? { ...chat, messages: updatedMessages } : chat
//       );
//       saveChats(updatedChats);
//     }

//     try {
//       const response = await axios.post(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
//         { contents: [{ role: "user", parts: [{ text: input }] }] }
//       );

//       const botMessage = {
//         sender: "bot",
//         text: response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.",
//       };

//       const finalMessages = [...updatedMessages, botMessage];
//       setMessages(finalMessages);

//       const updatedChats = chats.map(chat =>
//         chat.id === currentChatId ? { ...chat, name: input, messages: finalMessages } : chat
//       );
//       saveChats(updatedChats);
//     } catch (error) {
//       console.error("Error fetching response:", error);
//     } finally {
//       setIsLoading(false);
//     }

//     setInput("");
//   };

//   return (
//     <div className="flex h-screen bg-gray-50 w-screen">
//       {/* Sidebar */}
//       <div className="w-80 bg-gray-900 text-white overflow-hidden flex flex-col">
//         <div className="p-4 border-b border-gray-800">
//   <h2 className="text-xl font-semibold flex items-center gap-2">
//     <svg viewBox="0 0 24 24" className="w-6 h-6 text-purple-400" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
//       <path d="M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z" fill="currentColor"/>
//       <path d="M7 14C8.10457 14 9 13.1046 9 12C9 10.8954 8.10457 10 7 10C5.89543 10 5 10.8954 5 12C5 13.1046 5.89543 14 7 14Z" fill="currentColor"/>
//       <path d="M17 14C18.1046 14 19 13.1046 19 12C19 10.8954 18.1046 10 17 10C15.8954 10 15 10.8954 15 12C15 13.1046 15.8954 14 17 14Z" fill="currentColor"/>
//       <path d="M12 17C13.1046 17 14 16.1046 14 15C14 13.8954 13.1046 13 12 13C10.8954 13 10 13.8954 10 15C10 16.1046 10.8954 17 12 17Z" fill="currentColor"/>
//       <path d="M7 10L12 7M12 7L17 10M7 14L10 15M17 14L14 15" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
//     </svg>
//     Chat History
//   </h2>
// </div>

//         <div className="p-4">
//           <button
//             onClick={startNewChat}
//             className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-3 px-4 flex items-center justify-center gap-2 transition-colors duration-200"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
//             </svg>
//             New Chat
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto">
//           <div className="px-2 space-y-1">
//             {chats.map((chat) => (
//               <div key={chat.id} className="flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 bg-gray-800">
//                 <button
//                   onClick={() => loadChat(chat.id)}
//                   className={`flex-1 text-left truncate ${chat.id === currentChatId ? "text-purple-400" : "text-gray-300"}`}
//                 >
//                   {chat.name || "New Chat"}
//                 </button>
//                 <button
//                   onClick={() => deleteChat(chat.id)}
//                   className="text-purple-500 hover:text-purple-700 transition-colors duration-200"
//                 >
//                   <svg 
//     xmlns="http://www.w3.org/2000/svg" 
//     className="h-4 w-4" 
//     viewBox="0 0 20 20" 
//     fill="currentColor"
//   >
//     <path 
//       fillRule="evenodd" 
//       d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" 
//       clipRule="evenodd" 
//     />
//   </svg>
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Main Chat Area */}
//       <div className="flex-1 flex flex-col bg-white">
//         <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
//           <h1 className="text-xl font-semibold flex items-center gap-2">
//             <svg viewBox="0 0 24 24" className="w-6 h-6 text-purple-400" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
//       <path d="M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z" fill="currentColor"/>
//       <path d="M7 14C8.10457 14 9 13.1046 9 12C9 10.8954 8.10457 10 7 10C5.89543 10 5 10.8954 5 12C5 13.1046 5.89543 14 7 14Z" fill="currentColor"/>
//       <path d="M17 14C18.1046 14 19 13.1046 19 12C19 10.8954 18.1046 10 17 10C15.8954 10 15 10.8954 15 12C15 13.1046 15.8954 14 17 14Z" fill="currentColor"/>
//       <path d="M12 17C13.1046 17 14 16.1046 14 15C14 13.8954 13.1046 13 12 13C10.8954 13 10 13.8954 10 15C10 16.1046 10.8954 17 12 17Z" fill="currentColor"/>
//       <path d="M7 10L12 7M12 7L17 10M7 14L10 15M17 14L14 15" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
//     </svg>
//             Chat with Jochat
//           </h1>
//         </div>

//         <div className="flex-1 overflow-y-auto p-6">
//           {messages.length === 0 ? (
//             <div className="h-full flex flex-col items-center justify-center text-center px-4">
//               <h2 className="text-2xl font-semibold mb-2">Start a conversation</h2>
//               <p className="text-gray-600 max-w-md">
//                 Ask questions, get creative responses, or just chat about anything you're curious about.
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {messages.map((msg, index) => (
//                 <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
//                   <div className={`max-w-[80%] px-6 py-3 rounded-2xl shadow-sm ${msg.sender === "user" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-800"}`}>
//                     <p className="whitespace-pre-wrap">{msg.text}</p>
//                   </div>
//                 </div>
//               ))}
//               {isLoading && (
//                 <div className="flex justify-start">
//                   <div className="bg-gray-100 rounded-2xl px-6 py-3 shadow-sm animate-pulse">
//                     Typing...
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         <div className="border-t border-gray-100 p-6">
//           <div className="max-w-4xl mx-auto relative">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//               className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
//               placeholder="Type your message..."
//               disabled={isLoading}
//             />
//               <button
//               onClick={sendMessage}
//               disabled={isLoading || !input.trim()}
//               className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-90" viewBox="0 0 20 20" fill="currentColor">
//              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
//            </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;


import React, { useState, useEffect } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  // New state to manage sidebar open/close
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const API_KEY = "AIzaSyCcpZ8utOr8xCRTc-QufZWKSDPIbYz2v7Q";

  useEffect(() => {
    const storedChats = JSON.parse(localStorage.getItem("chats")) || [];
    setChats(storedChats);
  }, []);

  const saveChats = (updatedChats) => {
    localStorage.setItem("chats", JSON.stringify(updatedChats));
    setChats(updatedChats);
  };

  const startNewChat = () => {
    const newChat = { id: Date.now(), messages: [], name: "" };
    setMessages([]);
    setCurrentChatId(newChat.id);
    saveChats([...chats, newChat]);
  };

  const loadChat = (chatId) => {
    const selectedChat = chats.find((chat) => chat.id === chatId);
    if (selectedChat) {
      setMessages(selectedChat.messages);
      setCurrentChatId(chatId);
    }
  };

  const deleteChat = (chatId) => {
    const updatedChats = chats.filter((chat) => chat.id !== chatId);
    saveChats(updatedChats);
    if (currentChatId === chatId) {
      setMessages([]);
      setCurrentChatId(null);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    const currentChat = chats.find((chat) => chat.id === currentChatId);

    if (currentChat && !currentChat.name) {
      const updatedChats = chats.map((chat) =>
        chat.id === currentChatId ? { ...chat, name: input, messages: updatedMessages } : chat
      );
      saveChats(updatedChats);
    } else {
      const updatedChats = chats.map((chat) =>
        chat.id === currentChatId ? { ...chat, messages: updatedMessages } : chat
      );
      saveChats(updatedChats);
    }

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        { contents: [{ role: "user", parts: [{ text: input }] }] }
      );

      const botMessage = {
        sender: "bot",
        text:
          response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Sorry, I couldn't understand that.",
      };

      const finalMessages = [...updatedMessages, botMessage];
      setMessages(finalMessages);

      const updatedChats = chats.map((chat) =>
        chat.id === currentChatId ? { ...chat, name: input, messages: finalMessages } : chat
      );
      saveChats(updatedChats);
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setIsLoading(false);
    }

    setInput("");
  };

  // Function to toggle the sidebar open/close state
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-gray-50 w-screen">
      {/* Sidebar (conditionally rendered) */}
      {isSidebarOpen && (
        <div className="w-80 bg-gray-900 text-white overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-purple-400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                  fill="currentColor"
                />
                <path
                  d="M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z"
                  fill="currentColor"
                />
                <path
                  d="M7 14C8.10457 14 9 13.1046 9 12C9 10.8954 8.10457 10 7 10C5.89543 10 5 10.8954 5 12C5 13.1046 5.89543 14 7 14Z"
                  fill="currentColor"
                />
                <path
                  d="M17 14C18.1046 14 19 13.1046 19 12C19 10.8954 18.1046 10 17 10C15.8954 10 15 10.8954 15 12C15 13.1046 15.8954 14 17 14Z"
                  fill="currentColor"
                />
                <path
                  d="M12 17C13.1046 17 14 16.1046 14 15C14 13.8954 13.1046 13 12 13C10.8954 13 10 13.8954 10 15C10 16.1046 10.8954 17 12 17Z"
                  fill="currentColor"
                />
                <path
                  d="M7 10L12 7M12 7L17 10M7 14L10 15M17 14L14 15"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
              Chat History
            </h2>

            <button
              onClick={toggleSidebar}
              className="mr-4 p-2 rounded transition-colors duration-200 text-purple-400"
            >
              {isSidebarOpen && <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
                  >
                    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                    <line x1="9" y1="4" x2="9" y2="20" stroke="currentColor" strokeWidth="2" />
                  </svg>}
                      </button>
          </div>

          <div className="p-4">
            <button
              onClick={startNewChat}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-3 px-4 flex items-center justify-center gap-2 transition-colors duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New Chat
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="px-2 space-y-1">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className="flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 bg-gray-800"
                >
                  <button
                    onClick={() => loadChat(chat.id)}
                    className={`flex-1 text-left truncate ${
                      chat.id === currentChatId ? "text-purple-400" : "text-gray-300"
                    }`}
                  >
                    {chat.name || "New Chat"}
                  </button>
                  <button
                    onClick={() => deleteChat(chat.id)}
                    className="text-purple-500 hover:text-purple-700 transition-colors duration-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          {/* Sidebar toggle button */}
          <button
              onClick={toggleSidebar}
              className="mr-4 p-2 rounded transition-colors duration-200 text-purple-400"
            >
              {!isSidebarOpen && <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
                  >
                    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                    <line x1="9" y1="4" x2="9" y2="20" stroke="currentColor" strokeWidth="2" />
                  </svg>}
                      </button>
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 text-purple-400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                fill="currentColor"
              />
              <path
                d="M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z"
                fill="currentColor"
              />
              <path
                d="M7 14C8.10457 14 9 13.1046 9 12C9 10.8954 8.10457 10 7 10C5.89543 10 5 10.8954 5 12C5 13.1046 5.89543 14 7 14Z"
                fill="currentColor"
              />
              <path
                d="M17 14C18.1046 14 19 13.1046 19 12C19 10.8954 18.1046 10 17 10C15.8954 10 15 10.8954 15 12C15 13.1046 15.8954 14 17 14Z"
                fill="currentColor"
              />
              <path
                d="M12 17C13.1046 17 14 16.1046 14 15C14 13.8954 13.1046 13 12 13C10.8954 13 10 13.8954 10 15C10 16.1046 10.8954 17 12 17Z"
                fill="currentColor"
              />
              <path
                d="M7 10L12 7M12 7L17 10M7 14L10 15M17 14L14 15"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
            Chat with Jochat
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-2xl font-semibold mb-2">Start a conversation</h2>
              <p className="text-gray-600 max-w-md">
                Ask questions, get creative responses, or just chat about anything you're curious about.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-6 py-3 rounded-2xl shadow-sm ${
                      msg.sender === "user"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl px-6 py-3 shadow-sm animate-pulse">
                    Typing...
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 p-6">
          <div className="max-w-4xl mx-auto relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 rotate-90"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
