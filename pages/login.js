/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Head from "next/head";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: { destination: "/", permanent: false },
    };
  }
  return { props: {} };
}

export default function LoginPage() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
    fullname: "",
    confirmPassword: "",
    mobile: "",
  });

  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [isForgotPasswordActive, setIsForgotPasswordActive] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpSending, setOtpSending] = useState(false);

  const toastOpt = { position: "top-center", autoClose: 3000 };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setLoginDetails({ ...loginDetails, [id]: value });
  };

  /* ---------------- LOGIN ---------------- */
  const loginHandler = async (e) => {
    e.preventDefault();
    const { email, password } = loginDetails;

    if (!email || !password) {
      toast.warning("Please enter email and password", toastOpt);
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) toast.error("Invalid credentials", toastOpt);
    else toast.success("Sign-in successful", toastOpt);
  };

  /* ---------------- GOOGLE ---------------- */
  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  /* ---------------- OTP ---------------- */
  const sendOtp = async () => {
    if (!loginDetails.email) {
      toast.error("Enter email first", toastOpt);
      return;
    }
    setOtpSending(true);
    const res = await fetch("/api/registrationOtp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loginDetails.email }),
    });
    const data = await res.json();
    setOtpSending(false);

    if (res.ok) {
      toast.success(data.message, toastOpt);
      setOtpSent(true);
    } else toast.error(data.message, toastOpt);
  };

  const verifyOtp = async () => {
    const res = await fetch("/api/OtpVerify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loginDetails.email, otp }),
    });
    const data = await res.json();

    if (res.ok) {
      setEmailVerified(true);
      toast.success(data.message, toastOpt);
    } else toast.error(data.message, toastOpt);
  };

  /* ---------------- REGISTER ---------------- */
  const registerHandler = async (e) => {
    e.preventDefault();
    const { fullname, email, mobile, password, confirmPassword } = loginDetails;

    if (!emailVerified) {
      toast.warning("Please verify your email", toastOpt);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", toastOpt);
      return;
    }

    const res = await fetch("/api/users/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullname, email, mobile, password }),
    });

    const data = await res.json();
    if (data.error) toast.error(data.error, toastOpt);
    else toast.success("Registration successful!", toastOpt);
  };

  return (
    <>
      <Head>
        <title>Login / Signup</title>
      </Head>

      <ToastContainer />

      <div className="min-h-screen flex items-center justify-center bg-green-200 px-4">
        {/* SAME CARD DESIGN */}
        <div className="w-full max-w-sm bg-green-800 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-white text-center">
            {isForgotPasswordActive
              ? "Reset Password"
              : isSignUpActive
              ? "Create Account"
              : "Sign In"}
          </h2>

          {/* ---------- FORGOT PASSWORD ---------- */}
          {isForgotPasswordActive ? (
            <form>
              <input
                type="email"
                className="w-full p-2 rounded mb-3"
                placeholder="Enter your email"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
              />
              <button className="w-full bg-[#2d241b] text-white p-2 rounded">
                Send Reset Link
              </button>
            </form>
          ) : isSignUpActive ? (
            /* ---------- SIGN UP ---------- */
            <form onSubmit={registerHandler}>
              {!emailVerified && (
                <>
                  <input
                    id="email"
                    className="w-full p-2 rounded mb-3"
                    placeholder="Email"
                    onChange={handleInputChange}
                  />
                  {!otpSent ? (
                    <button
                      type="button"
                      onClick={sendOtp}
                      className="w-full bg-[#2d241b] text-white p-2 rounded mb-3"
                    >
                      {otpSending ? "Sending..." : "Continue"}
                    </button>
                  ) : (
                    <>
                      <input
                        placeholder="Enter OTP"
                        className="w-full p-2 rounded mb-3"
                        onChange={(e) => setOtp(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={verifyOtp}
                        className="w-full bg-[#2d241b] text-white p-2 rounded mb-3"
                      >
                        Verify OTP
                      </button>
                    </>
                  )}
                </>
              )}

              {emailVerified && (
                <>
                  <input
                    id="fullname"
                    placeholder="Full Name"
                    className="w-full p-2 rounded mb-3"
                    onChange={handleInputChange}
                  />
                  <input
                    id="mobile"
                    placeholder="Mobile"
                    className="w-full p-2 rounded mb-3"
                    onChange={handleInputChange}
                  />
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 rounded mb-3"
                    onChange={handleInputChange}
                  />
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full p-2 rounded mb-3"
                    onChange={handleInputChange}
                  />
                  <button className="w-full bg-[#2d241b] text-white p-2 rounded">
                    Sign Up
                  </button>
                </>
              )}
            </form>
          ) : (
            /* ---------- LOGIN ---------- */
            <form onSubmit={loginHandler}>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="w-full p-2 rounded mb-3"
                onChange={handleInputChange}
              />
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="w-full p-2 rounded mb-3"
                onChange={handleInputChange}
              />
              <button className="w-full bg-[#2d241b] text-white p-2 rounded">
                Sign In
              </button>
            </form>
          )}

          {/* ---------- GOOGLE ---------- */}
          <button
            onClick={handleGoogleLogin}
            className="mt-4 w-full flex items-center justify-center gap-3 bg-white rounded p-2"
          >
            <Image
              src="/images/logo/google-logo.png"
              alt="Google"
              width={50}
              height={24}
            />
            <span className="text-gray-700">Sign in with Google</span>
          </button>

          {/* ---------- SWITCH ---------- */}
          <div className="mt-4 text-center text-white">
            <button
              onClick={() => {
                setIsSignUpActive(!isSignUpActive);
                setIsForgotPasswordActive(false);
              }}
              className="text-blue-400"
            >
              {isSignUpActive ? "Sign In" : "Create Account"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
