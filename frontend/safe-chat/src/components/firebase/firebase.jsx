import React from "react";

import * as firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
} from "@react-firebase/auth";

function ConnectToFireBase() {
  const config = {
    apiKey: "AIzaSyA22682MdzbbHrpgzGi9mrckrhAYjU7X2k",
    authDomain: "neptune-4be30.firebaseapp.com",
    databaseURL: "https://neptune-4be30.firebaseio.com",
    projectId: "neptune-4be30",
    storageBucket: "neptune-4be30.appspot.com",
    messagingSenderId: "879468977485",
    appId: "1:879468977485:web:1eba5f5e62f112f1b22b04",
    measurementId: "G-LCWJ5P1906",
  };

  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <div>
        <FirebaseAuthConsumer>
          {({ isSignedIn, user, providerId }) => {
            if (user) {
              const userInfo = {
                name: user.displayName,
                avatar: user.photoURL,
              };
              // props.setUserInfo(userInfo);
            }
            if (!isSignedIn) {
              return (
                <button
                  className="btn btn-light btn-secondary btn-sm"
                  onClick={() => {
                    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                    firebase.auth().signInWithPopup(googleAuthProvider);
                  }}
                >
                  Sign In with Google
                </button>
              );
            }
            return (
              <>
                <button
                  className="btn btn-light btn-secondary btn-sm"
                  onClick={() => {
                    firebase.auth().signOut();
                  }}
                >
                  Sign Out
                </button>
                {/*<pre style={{ height: 300, overflow: "auto" }}>*/}
                {/*  {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}*/}
                {/*</pre>*/}
              </>
            );
          }}
        </FirebaseAuthConsumer>
      </div>
    </FirebaseAuthProvider>
  );
}

export default ConnectToFireBase;
