import { useContext, useState } from "react";
import Channelbar from "../components/ChannelBar";
import ContentContainer from "../components/ContentContainer";
import SideBar from "../components/SideBar";
import { Navigate } from "react-router-dom";

import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/userAuth";

const Messenger = () => {
  const { user } = useContext(AuthContext);
  const [chat, setChat] = useState(null);
  const [msgs, setMsgs] = useState([]);

  const selectUser = (userChat) => {
    setChat(userChat);

    const authUser = user.uid;
    const selectedUser = userChat.uid;

    const id =
      authUser > selectedUser
        ? `${authUser + selectedUser}`
        : `${selectedUser + authUser}`;

    const msgsRef = collection(db, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
      console.log(msgs, "msgs1");
    });
    console.log(msgs, "msgs2");
  };

  return user ? (
    <div className="flex">
      <SideBar />
      <Channelbar selectUser={selectUser} />
      <ContentContainer chat={chat} msgs={msgs} />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Messenger;
