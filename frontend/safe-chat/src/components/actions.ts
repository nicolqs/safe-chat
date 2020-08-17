import axios from "axios";

declare global {
    interface Window { websocket: any; }
}

window.websocket = window.websocket || {};

type chatMessageType = {
  uid_src: number;
  uid_dest: number;
  message: string;
};

const host = "http://localhost:8000";

export async function sendChatMessage(text: string) {
  try {
    const payload: chatMessageType = {
      uid_src: 1, // TODO use Firebase auth to get user id
      uid_dest: 2,
      message: text,
    };
    // await axios.post(host + "/send_chat", payload);
  } catch (e) {
    console.error(e);
  }
}

export async function subscribe(userActions: any, user: number) {
  window.websocket = new WebSocket("ws://localhost:8000/ws");

  window.websocket.onopen = function () {
    console.log("Websocket opened");
  };

  window.websocket.onmessage = function(evt: any) {
    const receivedMsg = evt.data;
    console.log("Message is received...", receivedMsg);
    userActions.add_message(receivedMsg, 2, new Date());
  };

  window.websocket.onclose = function () {
    console.log("Websocket is closed...");
  };
}

export default {
  sendChatMessage,
  subscribe,
};
