import React, { useReducer, createContext, useContext } from 'react';
import {reducer, mapUserReducer} from "./reducer";

export type userInfoType = {
  name: string;
  avatar: string;
};

export type UserProviderType = {
    children: Node;
};

const initialState: userInfoType = {
    name: 'Guest',
    avatar: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
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
