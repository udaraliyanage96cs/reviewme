import React, { useState, useEffect, CSSProperties } from "react";
import ReactStars from "react-rating-stars-component";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, addDoc, collection, Timestamp } from "firebase/firestore";
import Cookies from "js-cookie";
import db from "../firebase";
import BounceLoader from "react-spinners/BounceLoader";
import toast, { Toaster } from "react-hot-toast";

export default function review() {
  const provider = new GoogleAuthProvider();

  const [quality, setQuality] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const [satify, setSatify] = useState(0);
  const [yourName, setYourName] = useState("");
  const [proName, setProName] = useState("");
  const [message, setMessage] = useState("");

  const [signup, setSignup] = useState(false);
  const [user, setUser] = useState([]);
  const [isInputDisabled, setInputDisabled] = useState(true);

  let [submitting, setSubmitting] = useState(false);
  let [color, setColor] = useState("#ffa500");

  const workQualitty = {
    size: 30,
    value: 0,
    edit: true,
    onChange: (newValue) => {
      setQuality(newValue);
      console.log(`Quality ${newValue}`);
    },
  };

  const fastDelivery = {
    size: 30,
    value: 0,
    edit: true,
    onChange: (newValue) => {
      setDelivery(newValue);
      console.log(`Delivery ${newValue}`);
    },
  };

  const satisfaction = {
    size: 30,
    value: 0,
    edit: true,
    onChange: (newValue) => {
      setSatify(newValue);
      console.log(`Satify ${newValue}`);
    },
  };

  const CSSProperties = {
    display: "block",
    borderColor: "red",
  };

  const clearStates = () => {
    setQuality(0);
    setDelivery(0);
    setSatify(0);
    setYourName("");
    setProName("");
    setMessage("");
  };

  const onSubmitHandler = async () => {
    setSubmitting(true);
    await addDoc(collection(db, "review"), {
      quality: quality,
      delivery: delivery,
      satify: satify,
      yourName: yourName,
      proName: proName,
      message: message,
      createdBy: user.email,
      createdAt: Timestamp.fromDate(new Date()),
    }).then(() => {
      console.log("done");
      setSubmitting(false);
      clearStates();
      notify();
    });
  };

  const googlesignin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setUser(user);
        console.log(user);
        setSignup(true);
        setInputDisabled(false);
        Cookies.set("user", JSON.stringify(user), { expires: 1 });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  const notify = () => toast.success("Thank you, Your Review Submitted Successfully!",{duration: 4000});

  useEffect(() => {
    const savedUser = Cookies.get("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      console.log(parsedUser);
      setUser(parsedUser);
      setSignup(true);
      setInputDisabled(false);
    } else {
      setSignup(false);
      setInputDisabled(true);
    }
  }, []);

  return (
    <div className="container">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="row justify-content-center ">
        <div className="col-md-12">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-12 p-2">
              <h3 className="heading mb-4 text-center">Hi I'm Udara!</h3>
              <p className="text-center mb-4">
                Experienced Software Engineer with a demonstrated history of
                working in the Software Development industry. Skilled in
                different ares like Software/Web Development & Design , Robotics
                and IoT. Strong engineering professional with a Bachelor of
                Science – BSc focused on Mathematics and computer science.
              </p>
              <div className="d-flex justify-content-center">
                <img
                  src="images/udarax.png"
                  alt="Image"
                  className="img-fluid mb-4 w-100 mobi-80"
                />
              </div>
              <div className="Social-media mt-4">
                <a
                  href="https://www.linkedin.com/in/udara-liyanage-6ba408133/"
                  target="_blank"
                >
                  <font color="#007cc4">
                    <i className="fab fa-linkedin"></i>
                  </font>
                </a>
                <a
                  href="https://web.facebook.com/udara.priyadarshana.1/"
                  target="_blank"
                >
                  <font color="#007cc4">
                    <i className="fab fa-facebook"></i>
                  </font>
                </a>

                <a
                  href="https://www.instagram.com/ldudaraliyanage/"
                  target="_blank"
                >
                  <font color="#007cc4">
                    <i className="fab fa-instagram"></i>
                  </font>
                </a>
                <a href="https://github.com/udaraliyanage96cs" target="_blank">
                  <font color="#007cc4">
                    <i className="fab fa-github"></i>
                  </font>
                </a>
              </div>
            </div>
            <div className="col-lg-7 col-md-12 p-2 d-flex align-items-center justify-content-center form-section">
              <div className="w-80" id="contactForm" noValidate="novalidate">
                <div>
                  <h3 className="mobi-text-center">Review Me Here!</h3>
                  <p className="mobi-text-center">
                    I'd love to hear about your experience with me. Your
                    feedback helps me improve. Could you take a moment to share
                    your thoughts? Thanks for choosing me!
                  </p>
                  <div className="star-rating mb-2 mt-4">
                    <label>Quality of Work</label>
                    <div className="startclass">
                      <ReactStars {...workQualitty} value={quality} />
                    </div>
                  </div>
                  <div className="star-rating mb-2">
                    <label>Fast Delivery</label>
                    <div className="startclass">
                      <ReactStars {...fastDelivery} value={delivery} />
                    </div>
                  </div>
                  <div className="star-rating mb-2">
                    <label>Overall Satisfaction</label>
                    <div className="startclass">
                      <ReactStars {...satisfaction} value={satify} />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 form-group mb-4">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="name"
                      placeholder="Your name"
                      value={yourName}
                      disabled={isInputDisabled}
                      onChange={(e) => setYourName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 form-group mb-4">
                    <input
                      type="text"
                      className="form-control"
                      name="pname"
                      id="pname"
                      placeholder="Project name"
                      value={proName}
                      disabled={isInputDisabled}
                      onChange={(e) => setProName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 form-group mb-4">
                    <textarea
                      className="form-control"
                      name="message"
                      id="message"
                      cols="30"
                      rows="7"
                      placeholder="Write your message"
                      value={message}
                      disabled={isInputDisabled}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="row">
                  {signup && (
                    <div className="col-12 d-flex justify-content-end">
                      {!submitting && (
                        <input
                          type="submit"
                          value="Submit"
                          className="btn btn-primary rounded-0 py-2 px-4"
                          onClick={() => onSubmitHandler()}
                        />
                      )}
                      <BounceLoader
                        color={color}
                        loading={submitting}
                        cssOverride={CSSProperties}
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                      <span className="submitting"></span>
                    </div>
                  )}
                </div>
                <div className="row">
                  {!signup && (
                    <div className="col-12 d-flex justify-content-end">
                      <button
                        className="loginBtn loginBtn--google btn w-auto"
                        onClick={googlesignin}
                      >
                        Login with Google
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
