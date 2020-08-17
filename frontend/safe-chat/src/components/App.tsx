import React, { useEffect, useState } from "react";
import ConnectToFireBase from "./firebase/firebase.jsx";
import { useUserStore, UserProvider, messageType } from "./store";
import actions from "./actions";
import "./App.css";

type chatListItemType = {
  date: string;
  name: string;
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
        <p>{props.message}</p>
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
          <p>{props.message}</p>
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
  const { userState, userActions } = useUserStore();
  const [text, setText] = useState("");
  const [user, setUser] = useState(1);
  const handleSendMessage = () => {
    userActions.send_message(text);
    const ws = actions.getWs(user)
    ws.send(text);
    userActions.add_message(text, user, new Date());
  };
  useEffect(() => {
    // connect to websocket
    actions.subscribe(userActions, user);
  }, [user]);
  return (
    <div className="container">
      <div>
        <UserInfo name={userState.name} />
        <div className="col-sm-1">
        <input
          className="form-control form-control-sm"
          name="username"
          onChange={(e) => {
            setUser(parseInt(e.target.value));
          }}
        />
        </div>
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
              {userState.messages.map((msg: messageType) =>
                msg.sender === 1 ? (
                  <SentMessage
                    message={msg.message}
                    date={msg.date}
                    time={msg.time}
                  />
                ) : (
                  <ReceivedMessage
                    message={msg.message}
                    date={msg.date}
                    time={msg.time}
                  />
                )
              )}
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
                    handleSendMessage();
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
};

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
