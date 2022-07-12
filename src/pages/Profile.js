import React, { useState, useEffect } from "react";
import Img from "../media/img1.jpg";
import Camera from "../components/svg/Camera";
import Delete from "../components/svg/Delete";
import { storage, db, auth } from "../firebase";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [img, setImg] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });

    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        );

        try {
          if (user.avatarPath) {
            await deleteObject(ref(storage, user.avatarPath));
          }
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

          await updateDoc(doc(db, "users", user.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });
          setImg("");
        } catch (err) {
          console.log(err.message);
        }
      };
      uploadImg();
    }
  }, [img]);

  const deleteImg = async () => {
    try {
      const confirmation = window.confirm("Delete avatar ?");
      if (confirmation) {
        await deleteObject(ref(storage, user.avatarPath));
        await updateDoc(doc(db, "users", user.uid), {
          avatar: "",
          avatarPath: "",
        });
        navigate("/");
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return user ? (
    <section>
      <div className="profile_container">
        <div className="img_container">
          <img src={user.avatar || Img} alt="avatar" />
          <div className="overlay">
            <div className="flex items-center">
              <label htmlFor="photo">
                <Camera />
              </label>
              {user.avatar ? <Delete deleteImg={deleteImg} /> : null}
              <input
                type="file"
                accept="image/*"
                className="profile_photo"
                id="photo"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>
          </div>
        </div>
        <div className="text_container">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <hr />
          <small>Joined on: ...</small>
        </div>
      </div>
    </section>
  ) : null;
};

export default Profile;
