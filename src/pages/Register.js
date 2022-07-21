import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    loading: false,
  });

  const navigate = useNavigate();

  const { name, email, password, error, loading } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, loading: true });
    if (!name || !email || !password) {
      setData({ ...data, error: "All fields are required!" });
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        password,
        createdAt: serverTimestamp(),
        isOnline: true,
      });
      setData({ name: "", email: "", password: "", error: "", loading: false });
      navigate("/messenger");
    } catch (err) {
      setData({ ...data, error: err.message, loading: false });
    }
  };
  return (
    <section className="register_section">
      <h3>Create an account</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input_container">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Enter your name"
            autoFocus
          />
        </div>
        <div className="input_container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="input_container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>
        {error ? <p className="error">{error}</p> : null}
        <div className="btn_container">
          <button className="btn" disabled={loading}>
            {loading ? "Creating..." : "Register"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Register;
