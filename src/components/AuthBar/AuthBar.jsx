import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuth,
  getRedirectResult,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { toast } from "react-toastify";
import { app, googleAuthProvider } from "../../firebase";
import { logIn, logOut } from "../../redux/userSlice";
import { getIsLoggedIn, getUser } from "../../redux/selectors";
import avatar from "../../assets/user_avatar.png";
import css from "./AuthBar.module.css";

const AuthBar = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const user = useSelector(getUser);
  const auth = getAuth(app);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((hypotheticalUser) => {
      if (hypotheticalUser !== null) {
        return dispatch(
          logIn({
            login: hypotheticalUser.displayName,
            uid: hypotheticalUser.uid,
          })
        );
      }
    });
    return unsub;
  }, [auth, dispatch]);

  function clickHandler() {
    if (!isLoggedIn) {
      googleAuthProvider.setCustomParameters({
        prompt: "select_account",
      });
      signInWithPopup(auth, googleAuthProvider);
      getRedirectResult(auth).catch((error) => {
        console.log(error.message);
      });
    } else {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          dispatch(logOut());
        })
        .catch((error) => {
          toast.error("Something went wrong :(");
          console.log(error);
        });
    }
  }

  return (
    <div className={css.auth_container}>
      {!isLoggedIn && (
        <button className={css.auth_button} onClick={clickHandler}>
          Log In with Google
        </button>
      )}
      {isLoggedIn && (
        <div className={css.auth_container}>
          <img src={avatar} width={28} height={28} aria-label="user avatar"></img>
          <p className={css.user_name}>{user}</p>
          <button
            type="button"
            onClick={clickHandler}
            className={css.auth_button}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthBar;
