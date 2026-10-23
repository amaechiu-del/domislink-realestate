import { addMessage, loadDoc } from "./db.js";

// Simple UI hook
const form = document.getElementById("messageForm");
const input = document.getElementById("messageInput");
const output = document.getElementById("messages");

async function renderMessages() {
  const doc = await loadDoc();
  output.innerHTML = "";
  if (doc.messages) {
    doc.messages.forEach(m => {
      const li = document.createElement("li");
      li.textContent = `${new Date(m.timestamp).toLocaleString()}: ${m.text}`;
      output.appendChild(li);
    });
  }
}

// Handle form submit
form.addEventListener("submit", async e => {
  e.preventDefault();
  await addMessage(input.value);
  input.value = "";
  await renderMessages();
});

// Initial render
renderMessages();
