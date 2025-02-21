// Local Storage Keys
const JOINED_GROUPS_KEY = "joinedGroups";
const CHAT_MESSAGES_KEY = "chatMessages";

// Load joined groups and chat messages from local storage
let joinedGroups = JSON.parse(localStorage.getItem(JOINED_GROUPS_KEY)) || [];
let chatMessages = JSON.parse(localStorage.getItem(CHAT_MESSAGES_KEY)) || {};

// Function to join a group
function joinGroup(groupName) {
  if (!joinedGroups.includes(groupName)) {
    joinedGroups.push(groupName);
    localStorage.setItem(JOINED_GROUPS_KEY, JSON.stringify(joinedGroups));
    renderJoinedGroups();
  }
}

// Function to render joined groups
function renderJoinedGroups() {
  const joinedGroupsContainer = document.getElementById("joined-groups");
  if (joinedGroupsContainer) {
    joinedGroupsContainer.innerHTML = joinedGroups
      .map(
        (group) => `
        <a href="#" class="list-group-item list-group-item-action" onclick="loadChat('${group}')">
          <h5 class="mb-1">${group}</h5>
          <p class="mb-1 text-muted">Click to view chat.</p>
        </a>
      `
      )
      .join("");
  }
}

// Function to load chat for a specific group
function loadChat(groupName) {
  const chatGroupName = document.getElementById("chat-group-name");
  const chatWindow = document.getElementById("chat-window");

  if (chatGroupName && chatWindow) {
    chatGroupName.textContent = groupName;
    chatWindow.innerHTML = (chatMessages[groupName] || [])
      .map(
        (msg) => `
        <div class="message mb-3">
          <div class="message-sender">${msg.sender}</div>
          <div class="message-content">${msg.content}</div>
        </div>
      `
      )
      .join("");
  }
}

// Function to send a message
function setupChatFormListener() {
  const chatForm = document.getElementById("chat-form");
  if (chatForm) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const groupName = document.getElementById("chat-group-name").textContent;
      const messageInput = document.getElementById("chat-input");
      const message = messageInput.value.trim();

      if (message) {
        if (!chatMessages[groupName]) {
          chatMessages[groupName] = []; // Initialize the chat messages array for the group if it doesn't exist
        }
        chatMessages[groupName].push({ sender: "You", content: message }); // Add the new message
        localStorage.setItem(CHAT_MESSAGES_KEY, JSON.stringify(chatMessages)); // Save to local storage
        loadChat(groupName); // Reload the chat for the current group
        messageInput.value = ""; // Clear the input field
      }
    });
  }
}

// Initial render
document.addEventListener("DOMContentLoaded", () => {
  renderJoinedGroups();
  if (joinedGroups.length > 0) {
    loadChat(joinedGroups[0]);
  }
  setupChatFormListener();
});