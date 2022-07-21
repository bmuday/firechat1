import React from "react";
import { BsPlusCircleFill } from "react-icons/bs";

const BottomBar = ({ handleSubmit, text, setText, setImg }) => {
  return (
    <form className="bottom-bar" onSubmit={handleSubmit}>
      <PlusIcon setImg={setImg} />
      <input
        type="text"
        placeholder="Enter message..."
        className="bottom-bar-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="btn">Send</button>
    </form>
  );
};

const PlusIcon = ({ setImg }) => (
  <div>
    <label htmlFor="img" className="img-label">
      <BsPlusCircleFill
        size="22"
        className="dark:text-primary mx-2 text-green-500 dark:shadow-lg"
      ></BsPlusCircleFill>
    </label>
    <input
      onChange={(e) => setImg(e.target.files[0])}
      type="file"
      id="img"
      accept="image/*"
      className="img-input"
    />
  </div>
);

export default BottomBar;
