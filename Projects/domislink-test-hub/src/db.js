import * as Automerge from "@automerge/automerge";
import localforage from "localforage";

// Configure local storage
localforage.config({ name: "domislink-test-hub" });

// Load document from storage or initialize new one
export async function loadDoc() {
  const saved = await localforage.getItem("doc");
  return saved ? Automerge.load(saved) : Automerge.init();
}

// Save document back to storage
export async function saveDoc(doc) {
  await localforage.setItem("doc", Automerge.save(doc));
}

// Apply a change and persist it
export async function applyChange(changeFn, message = "update") {
  let doc = await loadDoc();
  doc = Automerge.change(doc, message, changeFn);
  await saveDoc(doc);
  return doc;
}

// Example usage: add a message
export async function addMessage(text) {
  return applyChange(d => {
    d.messages = d.messages || [];
    d.messages.push({ text, timestamp: Date.now() });
  }, "Add message");
}
