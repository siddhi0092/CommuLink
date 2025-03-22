import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../App'; // Import ThemeContext

const Groups = () => {
  const { isDarkMode } = useContext(ThemeContext); // Access theme state

  // Local Storage Keys
  const JOINED_GROUPS_KEY = 'joinedGroups';
  const CHAT_MESSAGES_KEY = 'chatMessages';

  // State for joined groups and chat messages
  const [joinedGroups, setJoinedGroups] = useState(
    JSON.parse(localStorage.getItem(JOINED_GROUPS_KEY)) || []
  );
  const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem(CHAT_MESSAGES_KEY)) || {}
  );
  const [activeGroup, setActiveGroup] = useState(
    joinedGroups.length > 0 ? joinedGroups[0] : null
  );

  // Function to join a group
  const joinGroup = (groupName) => {
    if (!joinedGroups.includes(groupName)) {
      const updatedGroups = [...joinedGroups, groupName];
      setJoinedGroups(updatedGroups);
      localStorage.setItem(JOINED_GROUPS_KEY, JSON.stringify(updatedGroups));
      setActiveGroup(groupName); // Automatically load the chat for the newly joined group
    }
  };

  // Function to load chat for a specific group
  const loadChat = (groupName) => {
    setActiveGroup(groupName);
  };

  // Function to send a message
  const handleSendMessage = (e) => {
    e.preventDefault();
    const messageInput = e.target.elements['chat-input'];
    const message = messageInput.value.trim();

    if (message && activeGroup) {
      const updatedMessages = {
        ...chatMessages,
        [activeGroup]: [
          ...(chatMessages[activeGroup] || []),
          { sender: 'You', content: message },
        ],
      };
      setChatMessages(updatedMessages);
      localStorage.setItem(CHAT_MESSAGES_KEY, JSON.stringify(updatedMessages));
      messageInput.value = '';
    }
  };

  // Render joined groups
  const renderJoinedGroups = () => {
    return joinedGroups.map((group) => (
      <div
        key={group}
        className={`p-4 mb-2 rounded-lg cursor-pointer transition-all ${
          activeGroup === group
            ? isDarkMode
              ? 'bg-blue-700 text-white shadow-lg' // Active group in dark mode
              : 'bg-blue-500 text-white shadow-lg' // Active group in light mode
            : isDarkMode
            ? 'bg-gray-800 text-gray-200 hover:bg-blue-700 hover:text-white' // Inactive group in dark mode
            : 'bg-blue-100 hover:bg-blue-500 hover:text-white' // Inactive group in light mode
        }`}
        onClick={() => loadChat(group)}
      >
        <h5 className="font-bold">{group}</h5>
        <p className="text-sm">Click to view chat.</p>
      </div>
    ));
  };

  // Render chat messages
  const renderChatMessages = () => {
    if (!activeGroup || !chatMessages[activeGroup]) {
      return (
        <div className={`text-center py-8 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          No messages yet. Start the conversation!
        </div>
      );
    }
    return chatMessages[activeGroup].map((msg, index) => (
      <div
        key={index}
        className={`message mb-3 p-3 rounded-lg shadow-sm ${
          isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'
        }`}
      >
        <div className="message-sender font-bold text-blue-400">{msg.sender}</div>
        <div className="message-content">{msg.content}</div>
      </div>
    ));
  };

  return (
    <div className={`font-sans min-h-screen p-4 ${
      isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'
    }`}>
      {/* Group Chat Section */}
      <section className="group-chat py-8 rounded-lg shadow-md">
        <div className="container mx-auto px-4">
          <h2 className={`text-center text-3xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Group Chat
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className={`rounded-lg shadow-inner ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <div className={`p-4 border-b ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <h5 className={`text-xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {activeGroup || 'Select a Group'}
                </h5>
              </div>
              <div className="chat-window p-4 h-64 overflow-y-auto">
                {renderChatMessages()}
              </div>
              <div className="p-4">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    id="chat-input"
                    className={`flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      isDarkMode
                        ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500'
                        : 'bg-white border-gray-300 text-gray-800 focus:ring-blue-500'
                    }`}
                    placeholder="Type a message..."
                    disabled={!activeGroup}
                  />
                  <button
                    type="submit"
                    className={`px-4 py-2 rounded-lg transition-all ${
                      isDarkMode
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                    disabled={!activeGroup}
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Groups Section */}
      <section className="community-groups py-8">
        <div className="container mx-auto px-4">
          <h2 className={`text-center text-3xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Community Groups
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Joined Groups Section */}
            <div>
              <h3 className={`text-xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Joined Groups
              </h3>
              <div className="space-y-2">
                {joinedGroups.length > 0 ? (
                  renderJoinedGroups()
                ) : (
                  <div className={`text-center py-4 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    You haven't joined any groups yet.
                  </div>
                )}
              </div>
            </div>

            {/* Discover Groups Section */}
            <div>
              <h3 className={`text-xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Discover Groups
              </h3>
              <div className="space-y-2">
                {/* Group 1 */}
                <div
                  className={`p-4 rounded-lg transition-all ${
                    isDarkMode
                      ? 'bg-gray-800 text-gray-200 hover:bg-blue-700 hover:text-white'
                      : 'bg-gray-100 hover:bg-blue-500 hover:text-white'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-bold">Book Lovers Club</h5>
                      <p className="text-sm">A group for book enthusiasts to discuss their favorite reads.</p>
                    </div>
                    <button
                      className={`px-3 py-1 rounded-lg transition-all ${
                        isDarkMode
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                      onClick={() => joinGroup('Book Lovers Club')}
                    >
                      Join
                    </button>
                  </div>
                </div>
                {/* Group 2 */}
                <div
                  className={`p-4 rounded-lg transition-all ${
                    isDarkMode
                      ? 'bg-gray-800 text-gray-200 hover:bg-blue-700 hover:text-white'
                      : 'bg-gray-100 hover:bg-blue-500 hover:text-white'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-bold">Fitness Freaks</h5>
                      <p className="text-sm">Join this group to share fitness tips and motivate each other.</p>
                    </div>
                    <button
                      className={`px-3 py-1 rounded-lg transition-all ${
                        isDarkMode
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                      onClick={() => joinGroup('Fitness Freaks')}
                    >
                      Join
                    </button>
                  </div>
                </div>
                {/* Group 3 */}
                <div
                  className={`p-4 rounded-lg transition-all ${
                    isDarkMode
                      ? 'bg-gray-800 text-gray-200 hover:bg-blue-700 hover:text-white'
                      : 'bg-gray-100 hover:bg-blue-500 hover:text-white'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-bold">Local Foodies</h5>
                      <p className="text-sm">A community for food lovers to share recipes and restaurant recommendations.</p>
                    </div>
                    <button
                      className={`px-3 py-1 rounded-lg transition-all ${
                        isDarkMode
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                      onClick={() => joinGroup('Local Foodies')}
                    >
                      Join
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Groups;