import React, { useRef, useEffect } from "react";
import Moment from "react-moment";

const Message = ({ msg, authUserId }) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);
  return (
    <div
      className={`message_wrapper ${msg.from === authUserId ? "own" : ""}`}
      ref={scrollRef}
    >
      <p className={msg.from === authUserId ? "me" : "friend"}>
        {msg.media ? <img src={msg.media} alt={msg.text} /> : null}
        {msg.text}
        <br />
        <small>
          <Moment fromNow>{msg.createdAt?.toDate()}</Moment>
        </small>
      </p>
    </div>
  );
};

export default Message;
