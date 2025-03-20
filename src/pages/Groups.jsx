import React, { useState, useEffect } from "react";

const Groups = () => {
  // Local Storage Keys
  const JOINED_GROUPS_KEY = "joinedGroups";
  const CHAT_MESSAGES_KEY = "chatMessages";

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
    const messageInput = e.target.elements["chat-input"];
    const message = messageInput.value.trim();

    if (message && activeGroup) {
      const updatedMessages = {
        ...chatMessages,
        [activeGroup]: [
          ...(chatMessages[activeGroup] || []),
          { sender: "You", content: message },
        ],
      };
      setChatMessages(updatedMessages);
      localStorage.setItem(CHAT_MESSAGES_KEY, JSON.stringify(updatedMessages));
      messageInput.value = "";
    }
  };

  // Render joined groups
  const renderJoinedGroups = () => {
    return joinedGroups.map((group) => (
      <div
        key={group}
        className={`p-4 mb-2 bg-blue-100 rounded-lg cursor-pointer hover:bg-blue-500 hover:text-white transition-all ${
          activeGroup === group ? "bg-blue-500 text-white" : ""
        }`}
        onClick={() => loadChat(group)}
      >
        <h5 className="font-bold">{group}</h5>
        <p className="text-sm text-gray-600 hover:text-gray-200">Click to view chat.</p>
      </div>
    ));
  };

  // Render chat messages
  const renderChatMessages = () => {
    if (!activeGroup || !chatMessages[activeGroup]) {
      return (
        <div className="text-gray-500 text-center py-8">
          No messages yet. Start the conversation!
        </div>
      );
    }
    return chatMessages[activeGroup].map((msg, index) => (
      <div
        key={index}
        className="message mb-3 p-3 bg-white rounded-lg shadow-sm"
      >
        <div className="message-sender font-bold text-blue-500">{msg.sender}</div>
        <div className="message-content text-gray-700">{msg.content}</div>
      </div>
    ));
  };

  return (
    <div className="font-sans bg-gray-100 min-h-screen p-4">
      {/* Group Chat Section */}
      <section className="group-chat py-8 bg-white rounded-lg shadow-md">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">Group Chat</h2>
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-50 rounded-lg shadow-inner">
              <div className="p-4 border-b border-gray-200">
                <h5 className="text-xl font-bold text-gray-800">
                  {activeGroup || "Select a Group"}
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
                    className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type a message..."
                    disabled={!activeGroup}
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all disabled:bg-gray-400"
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
          <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
            Community Groups
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Joined Groups Section */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Joined Groups</h3>
              <div className="space-y-2">
                {joinedGroups.length > 0 ? (
                  renderJoinedGroups()
                ) : (
                  <div className="text-gray-500 text-center py-4">
                    You haven't joined any groups yet.
                  </div>
                )}
              </div>
            </div>

            {/* Discover Groups Section */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Discover Groups</h3>
              <div className="space-y-2">
                {/* Group 1 */}
                <div className="p-4 bg-gray-100 rounded-lg hover:bg-blue-500 hover:text-white transition-all">
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-bold">Book Lovers Club</h5>
                      <p className="text-sm text-gray-600 hover:text-gray-200">
                        A group for book enthusiasts to discuss their favorite reads.
                      </p>
                    </div>
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-all"
                      onClick={() => joinGroup("Book Lovers Club")}
                    >
                      Join
                    </button>
                  </div>
                </div>
                {/* Group 2 */}
                <div className="p-4 bg-gray-100 rounded-lg hover:bg-blue-500 hover:text-white transition-all">
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-bold">Fitness Freaks</h5>
                      <p className="text-sm text-gray-600 hover:text-gray-200">
                        Join this group to share fitness tips and motivate each other.
                      </p>
                    </div>
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-all"
                      onClick={() => joinGroup("Fitness Freaks")}
                    >
                      Join
                    </button>
                  </div>
                </div>
                {/* Group 3 */}
                <div className="p-4 bg-gray-100 rounded-lg hover:bg-blue-500 hover:text-white transition-all">
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-bold">Local Foodies</h5>
                      <p className="text-sm text-gray-600 hover:text-gray-200">
                        A community for food lovers to share recipes and restaurant
                        recommendations.
                      </p>
                    </div>
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-all"
                      onClick={() => joinGroup("Local Foodies")}
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