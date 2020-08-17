import React, { useState } from "react";
import ConnectToFireBase from "./firebase/firebase.jsx";
import {useUserStore, UserProvider} from "./store";
import "./App.css";

type chatListItemType = {
  date: string;
  name: string;
  text: string;
};

type messageType = {
  date: string;
  time: string;
  text: string;
};

function ChatListItem(props: chatListItemType) {
  return (
    <div className="chat_list active_chat">
      <div className="chat_people">
        <div className="chat_img">
          <img
            src="https://ptetutorials.com/images/user-profile.png"
            alt="john"
          />
        </div>
        <div className="chat_ib">
          <h5>
            {props.name} <span className="chat_date">{props.date}</span>
          </h5>
          <p>{props.text}</p>
        </div>
      </div>
    </div>
  );
}

function SentMessage(props: messageType) {
  return (
    <div className="outgoing_msg">
      <div className="sent_msg">
        <p>{props.text}</p>
        <span className="time_date">
          {props.time} | {props.date}
        </span>
      </div>
    </div>
  );
}

function ReceivedMessage(props: messageType) {
  return (
    <div className="incoming_msg">
      <div className="incoming_msg_img">
        <img
          src="https://ptetutorials.com/images/user-profile.png"
          alt="john"
        />
      </div>
      <div className="received_msg">
        <div className="received_withd_msg">
          <p>{props.text}</p>
          <span className="time_date">
            {props.time} | {props.date}
          </span>
        </div>
      </div>
    </div>
  );
}

function UserInfo(props: any) {
  return props.name;
}

const ChatContainer = (): any => {
  const {userState, userActions} = useUserStore();
  const [text, setText] = useState("");
  return (
    <div className="container">
      <div>
        <UserInfo name={userState.name} />
        <h3 className="text-center">Messaging</h3>
      </div>
      <div className="messaging">
        <div className="inbox_msg">
          <div className="inbox_people">
            <div className="headind_srch">
              <div className="recent_heading">
                <h4>Recent</h4>
              </div>
              <div className="srch_bar">
                <div className="stylish-input-group">
                  <input
                    type="text"
                    className="search-bar"
                    placeholder="Search"
                  />
                  <span className="input-group-addon">
                    <button type="button">
                      <i className="fa fa-search" aria-hidden="true" />
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <div className="inbox_chat">
              <ChatListItem
                name={"John Vincent"}
                date={"July 25"}
                text={"Hey, what are you doing this weekend?"}
              />
            </div>
          </div>
          <div className="mesgs">
            <div className="msg_history">
              <ReceivedMessage
                text={"I am watching Tiger King, it's awesome"}
                date={"June 9"}
                time={"11:01 AM"}
              />
              <SentMessage
                text={"I did too! it was epic"}
                date={"June 9"}
                time={"11:03 AM"}
              />
              <ReceivedMessage
                text={"Hey, what are you doing this weekend?"}
                date={"Yesterday"}
                time={"12:09 PM"}
              />
            </div>
            <div className="type_msg">
              <div className="input_msg_write">
                <input
                  type="text"
                  className="write_msg"
                  placeholder="Type a message"
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                />
                <button
                  className="msg_send_btn"
                  type="button"
                  onClick={() => {
                    userActions.send_message(text);
                  }}
                >
                  <i className="fa fa-paper-plane-o" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConnectToFireBase />
    </div>
  );
}


function App() {
  return (
    <>
      {/*
      // @ts-ignore */}
    <UserProvider>
      {/*
      // @ts-ignore */}
      <ChatContainer />
    </UserProvider>
      </>
  );
}

export default App;
