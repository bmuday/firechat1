import React, { useState, useEffect, useContext } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import User from "./User";

const UsersBar = ({ user, selectUser }) => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");

  useEffect(() => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "not-in", [auth.currentUser.uid]));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub();
  }, []);

  return (
    <div className="users_container">
      {users.map((user) => (
        <User key={user.uid} user={user} selectUser={selectUser} chat={chat} />
      ))}
    </div>
  );
};

export default UsersBar;
