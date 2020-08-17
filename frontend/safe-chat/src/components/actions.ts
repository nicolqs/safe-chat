import axios from "axios";

type chatMessageType = {
  uid_src: number;
  uid_dest: number;
  message: string;
};

export async function sendChatMessage(text: string) {
  try {
    const payload: chatMessageType = {
      uid_src: 1, // TODO use Firebase auth to get user id
      uid_dest: 2,
      message: text,
    };
    const res: Response = await axios.post(
      "http://localhost:8000/send_chat",
      payload
    );
    return await res.json();
  } catch (e) {
    console.error(e);
  }
}

export default {
  sendChatMessage,
};
