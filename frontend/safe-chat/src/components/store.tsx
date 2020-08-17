import React, { useReducer, createContext, useContext } from "react";
import { reducer, mapUserReducer } from "./reducer";

export type messageType = {
  sender?: number;
  message: string;
  date: string;
  time: string;
};

export type userInfoType = {
  name: string;
  avatar: string;
  messages: Array<messageType>;
};

export type UserProviderType = {
  children: Node;
};

const initialState: userInfoType = {
  name: "Guest",
  avatar: "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png",
  messages: [
    {
      sender: 2,
      message: "I am watching Tiger King, it's awesome",
      date: "June 9",
      time: "11:01 AM",
    },
    {
      sender: 1,
      message: "I did too! it was epic",
      date: "June 9",
      time: "11:03 AM",
    },
    {
      sender: 2,
      message: "Hey, what are you doing this weekend?",
      date: "Yesterday",
      time: "12:09 PM",
    },
  ],
};

const userActions: Object = {};
const initialContext = { initialState, userActions };
const Context = createContext<any>(initialContext);

export const useUserStore = () => {
  return useContext(Context);
};

export function UserProvider(props: UserProviderType) {
  const [userState, dispatch] = useReducer(reducer, initialState);
  const userActions = mapUserReducer(dispatch);

  return (
    <Context.Provider value={{ userState, userActions }}>
      <>{props.children}</>
    </Context.Provider>
  );
}
