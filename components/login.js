/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { XMarkIcon } from "@heroicons/react/24/outline";
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";

const login = ({ onClose, headerHeight }) => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
    fullname: "",
    confirmPassword: "",
    mobile: "",
  });
  const [loading, setLoading] = useState(false);
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [isForgotPasswordActive, setIsForgotPasswordActive] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [forgotPasswordSubmitting, setForgotPasswordSubmitting] = useState(false);

  const router = useRouter();

  // Configure default toast options to always be top-center
  const defaultToastOptions = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };


  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' }); // Replace '/' with your desired callback URL
  };

  const handleSignUpClick = () => {
    setIsSignUpActive(true);
    setIsForgotPasswordActive(false);
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
    setIsForgotPasswordActive(false);
  };

  const handleForgotPasswordClick = () => {
    setIsForgotPasswordActive(true);
    setIsSignUpActive(false);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setLoginDetails({ ...loginDetails, [id]: value });
  };

  const validateMobile = (mobile) => {
    const indianMobileRegex = /^[6-9]\d{9}$/;
    return indianMobileRegex.test(mobile);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotPasswordEmail) {
      toast.error("Please enter your email address", defaultToastOptions);
      return;
    }

    setForgotPasswordSubmitting(true);
    try {
      const response = await fetch("/api/forgotpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: forgotPasswordEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Password reset link has been sent to your email", defaultToastOptions);
        setIsForgotPasswordActive(false);
      } else {
        toast.error(data.message || "Failed to send reset link", defaultToastOptions);
      }
    } catch (error) {
      toast.error("Something went wrong", defaultToastOptions);
    } finally {
      setForgotPasswordSubmitting(false);
    }
  };

  const sendOtp = async () => {
    if (!loginDetails.email) {
      toast.error("Please enter the email address", defaultToastOptions);
      return;
    }
    setOtpSending(true);
    try {
      const res = await fetch("/api/registrationOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginDetails.email }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message, defaultToastOptions);
        setOtpSent(true);
      } else {
        toast.error(data.message, defaultToastOptions);
      }
    } catch (error) {
      toast.error("Something went wrong", defaultToastOptions);
    } finally {
      setOtpSending(false);
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await fetch('/api/OtpVerify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: loginDetails.email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        setEmailVerified(true);
        toast.success(data.message, defaultToastOptions);
      } else {
        toast.error(data.message, defaultToastOptions);
      }
    } catch (error) {
      toast.error('Something went wrong', defaultToastOptions);
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = loginDetails;

    if (email && password) {
      signIn("credentials", {
        redirect: false,
        email,
        password,
      }).then((res) => {
        setLoading(false);
        if (!res.ok) {
          toast.error("Invalid credentials", defaultToastOptions);
        } else {
          toast.success("Sign-in successful", {
            ...defaultToastOptions,
            onClose: () => {
              onClose();
            }
          });
        }
      });
    } else {
      setLoading(false);
      toast.warning("Please enter email and password", defaultToastOptions);
    }
  };

  const registerSubmitHandler = (e) => {
    e.preventDefault();
    const { fullname, email, mobile, password, confirmPassword } = loginDetails;

    if (fullname && email && mobile && password && confirmPassword && emailVerified) {
      if (password === confirmPassword && emailVerified) {
        if (validateMobile(mobile)) {
          fetch("/api/users/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullname, email, mobile, password }),
          })
            .then((res) => res.json())
            .then((response) => {
              if (response.error) {
                toast.error(response.error, defaultToastOptions);
              } else {
                toast.success("Registration Successful!", {
                  ...defaultToastOptions,
                  onClose: () => {
                    onClose();
                  }
                });
              }
            })
            .catch(() => toast.error("Something went wrong", defaultToastOptions));
        } else {
          toast.error("Please enter a valid Indian mobile number", defaultToastOptions);
        }
      } else {
        toast.error("Passwords do not match or email not verified", defaultToastOptions);
      }
    } else if (emailVerified == false) {
      toast.warning("Please Verify your mail!", defaultToastOptions);
    } else {
      toast.warning("Fill all fields", defaultToastOptions);
    }
  };

  return (
    <div
      className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      style={{
        top: `${headerHeight}px`,
        height: `calc(100vh - ${headerHeight}px)`,
      }}
    >
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div style={{ background: '#0A528F', color: 'hsl(36 28% 96%)' }} className="mx-2 p-8 rounded-xl w-96  shadow-lg">

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-white hover:text-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>


        <h2 className="text-2xl font-bold mb-4 mt-2 text-white">
          {isForgotPasswordActive
            ? "Reset Password"
            : isSignUpActive
              ? "Create Account"
              : "Sign In"}
        </h2>


        {isForgotPasswordActive ? (
          // Reset Password Form
          <form onSubmit={handleForgotPassword}>
            <input
              type="email"
              className="w-full p-2 border rounded mb-3"
              placeholder="Enter your email"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
              required
            />
            <button
              className="w-full bg-white text-black p-2 rounded mb-3"
              type="submit"
              disabled={forgotPasswordSubmitting}
            >
              {forgotPasswordSubmitting ? "Sending..." : "Send Reset Link"}
            </button>
            <button
              className="w-full text-blue-600 p-2 rounded"
              onClick={handleSignInClick}
              type="button"
            >
              Back to Sign In
            </button>
          </form>
        ) : isSignUpActive ? (
          <form onSubmit={registerSubmitHandler} className="w-80">
            {!emailVerified && (
              <div className="flex flex-col gap-3 mb-3" >
                <label className="-mb-2 ml-1 font-bold text-white">Email</label>
                <input
                  id="email"
                  type="email"
                  className="flex-grow p-2 border rounded text-black"
                  placeholder="Email"
                  onChange={handleInputChange}
                  required
                />
                {!otpSent && (
                  <button
                    type="button"
                    className="w-full bg-white text-black p-2 rounded mb-3"
                    disabled={otpSending}
                    onClick={sendOtp}
                  >
                    {otpSending ? "Sending..." : "Continue"}
                  </button>
                )}



                {otpSent && (
                  <>
                    <input
                      type="text"
                      className="flex-grow p-2 border rounded text-black"
                      placeholder="Enter OTP"
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    <div className="flex justify-between gap-3">
                      <button
                        type="button"
                        className="flex-1 bg-white text-black px-1 py-2 rounded-full"
                        onClick={verifyOtp}
                      >
                        Verify OTP
                      </button>
                      <button
                        type="button"
                        className="flex-1 bg-gray-500 text-white px-1 py-2 rounded-full"
                        disabled={otpSending}
                        onClick={sendOtp}
                      >
                        Resend OTP
                      </button>
                    </div>
                  </>
                )}

              </div>
            )}

            {/* Show remaining fields only if email is verified */}
            {emailVerified && (
              <>
                <input
                  id="fullname"
                  type="text"
                  className="w-full p-2 border rounded mb-3 text-black"
                  placeholder="Full Name"
                  onChange={handleInputChange}
                  required
                />
                <input
                  id="mobile"
                  type="number"
                  className="w-full p-2 border rounded mb-3 text-black"
                  placeholder="Mobile Number (10 digits)"
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="password"
                  id="password"
                  className="w-full p-2 border rounded mb-3 text-black"
                  placeholder="Password"
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full p-2 border rounded mb-3 text-black"
                  placeholder="Confirm Password"
                  onChange={handleInputChange}
                  required
                />
                <button
                  className="w-full bg-white text-black p-2 rounded"
                  type="submit"
                >
                  Sign Up
                </button>
              </>
            )}
          </form>


        ) : (
          // Sign In Form
          <form onSubmit={loginHandler}>
            <input
              id="email"
              type="email"
              className="w-full p-2 border rounded mb-3 text-black"
              placeholder="Email"
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded mb-3 text-black"
              placeholder="Password"
              onChange={handleInputChange}
              required
            />
            <button
            
              className="w-full bg-white text-gray-700  p-2 rounded mb-3 font-medium"
              type="submit"
            >
              Sign In
            </button>
          </form>
        )}
        {/* <button
          onClick={() => signIn("google")}
          className=" w-full flex items-center justify-center gap-3 border border-gray-300 rounded-md p-1 shadow-sm hover:shadow-md transition duration-150 ease-in-out bg-white"
        >
          <img
            src="/images/logo/google-logo.png"
            alt="Google"
            width={60}
            height={30}
            className="inline-block"
          />
          <span className="text-gray-700 font-medium">Sign in with Google</span>
        </button> */}
        <button
          className="w-full text-white text-sm p-2"
          onClick={handleForgotPasswordClick}
          type="button"
        >
          Forgot your password?
        </button>

        {!isForgotPasswordActive && (
          <div className="mt-4 text-center">
            <p className="text-white">
              {isSignUpActive
                ? "Already have an account?"
                : "Don't have an account?"}
            </p>
            <button
              className="text-[#FFB600] font-medium"
              onClick={isSignUpActive ? handleSignInClick : handleSignUpClick}
            >
              {isSignUpActive ? "Sign In" : "Create Account"}
            </button>


          </div>


        )}



      </div>


    </div>
  );
};

export default login;