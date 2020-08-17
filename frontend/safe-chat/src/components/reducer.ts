import actions from "./actions";
import { userInfoType } from "./store";
import { buildNewMessage } from "./util";

interface SendMessageAction {
  type: string;
  sender?: number;
  text: string;
  date: Date;
}

export type ActionType = SendMessageAction;

export function reducer(state: userInfoType, action: ActionType) {
  switch (action.type) {
    case "ADD_CHAT":
      if (action.text) {
        return {
          messages: state.messages.push(buildNewMessage(action)),
          ...state,
        };
      }
      return { ...state };
    default:
      return state;
  }
}

export function mapUserReducer(dispatch: any) {
  return {
    send_message: (text: string) => dispatch({ type: "SEND_CHAT", text: text }),
    add_message: (text: string, sender: number, date: string) =>
      dispatch({ type: "ADD_CHAT", text: text, sender: sender, date: date }),
  };
}
