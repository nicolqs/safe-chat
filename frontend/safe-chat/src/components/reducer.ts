import actions from "./actions";
import {userInfoType} from "./store";


interface SendMessageAction {
  type: string
  text: string
}

type ActionType = SendMessageAction;

export function reducer(state: userInfoType, action: ActionType) {
    switch (action.type) {
    case 'SEND_CHAT':
        if (action.text) {
            actions.sendChatMessage(action.text).then((r) => console.log(r));
        }
        return {...state};
    default:
        return state;
    }
}

export function mapUserReducer(dispatch: any) {
    return {
        send_message: (text: string) => dispatch({ type: 'SEND_CHAT', text: text }),
    };
}
