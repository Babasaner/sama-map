import { Cancel, Room } from "@material-ui/icons";
import {axiosInstance} from "../config";
import { useRef, useState } from "react";
import "./login.css";


export default function Login({ setShowLogin, setCurrentUsername,myStorage }) {
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = await axiosInstance.post("/users/login", user);
      setCurrentUsername(res.data.username);
      myStorage.setItem('user', res.data.username);
      setShowLogin(false)
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="loginContainer">
      <div className="logo">
        <Room className="logoIcon" />
        <span>Projet Map</span>
      </div>
      <form  onSubmit={handleSubmit}>
        <input autoFocus placeholder="username" ref={usernameRef} />
        <input
          type="password"
          min="6"
          placeholder="password"
          ref={passwordRef}
        />
        <button className="btn btn-success" type="submit">
          Connexion
        </button>
        {error && <span className="failure">Erreur lors de votre identifiant!</span>}
      </form>
      <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
}