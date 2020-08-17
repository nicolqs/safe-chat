import axios from "axios";

type chatMessageType = {
  uid_src: number;
  uid_dest: number;
  message: string;
};

export function getWs(user: number) {
  console.log('connecting')
  return new WebSocket("ws://localhost:8000/subscribe/" + user);
}

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
  const ws = getWs(user);

  ws.onopen = function () {
    console.log("Websocket opened");
  };

  ws.onmessage = function (evt) {
    const receivedMsg = evt.data;
    console.log("Message is received...", receivedMsg);
    userActions.add_message(receivedMsg, user, new Date());
  };

  ws.onclose = function () {
    console.log("Websocket is closed...");
  };
}

export default {
  sendChatMessage,
  subscribe,
  getWs,
};
