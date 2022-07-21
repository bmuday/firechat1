import TopNavigation from "./TopNavigation";
import { useContext, useEffect, useRef, useState } from "react";
import BottomBar from "./BottomBar";
import { AuthContext } from "../context/userAuth";
import { db, storage } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Message from "./Message";
import Img from "../media/img1.jpg";
import { Link } from "react-router-dom";

const ContentContainer = ({ chat, msgs }) => {
  const [text, setText] = useState("");
  const [img, setImg] = useState("");

  const { user } = useContext(AuthContext);
  const authUserId = user.uid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedUserId = chat?.uid;

    const id =
      authUserId > selectedUserId
        ? `${authUserId + selectedUserId}`
        : `${selectedUserId + authUserId}`;

    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }

    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: authUserId,
      to: selectedUserId,
      createdAt: serverTimestamp(),
      media: url || "",
    });
    setText("");
  };

  const scrollRef = useRef();
  const msg = "";

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  return (
    <div className="content-container">
      <TopNavigation />
      <div className="messages_container">
        {chat ? (
          <>
            <div className="messages_user">
              <div className="flex items-center justify-center">
                <img src={user.avatar || Img} alt="avatar" className="avatar" />
                <h3>{chat.name}</h3>
              </div>
              <Link
                to={`/profile/${user.name}`}
                className="hover:text-blue-700"
              >
                Voir son profil
              </Link>
            </div>
            <div className="messages">
              {msgs.length
                ? msgs.map((msg, i) => (
                    <Message key={i} msg={msg} authUserId={authUserId} />
                  ))
                : null}
            </div>
            <BottomBar
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              setImg={setImg}
            />
          </>
        ) : (
          <h3 className="no_conv">Welcome ! Select a channel.</h3>
        )}
      </div>
      {/* <Post
        name="Rebecca"
        timestamp="3 hours ago"
        text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
          amet consectetur adipisicing elit.`}
      /> */}
    </div>
  );
};

// const Post = ({ name, timestamp, text }) => {
//   const seed = Math.round(Math.random() * 100);
//   return (
//     <div className={"post"}>
//       <div className="avatar-wrapper">
//         <img
//           src={`https://avatars.dicebear.com/api/open-peeps/${seed}.svg`}
//           alt=""
//           className="avatar"
//         />
//       </div>

//       <div className="post-content">
//         <p className="post-owner">
//           {name}
//           <small className="timestamp">{timestamp}</small>
//         </p>
//         <p className="post-text">{text}</p>
//       </div>
//     </div>
//   );
// };

export default ContentContainer;
