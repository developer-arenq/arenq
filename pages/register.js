import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Head from "next/head";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return { props: {} };
}

const Register = () => {
  const initialValues = {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  };

  const [userDetails, setUserDetails] = useState(initialValues);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [retypePasswordVisible, setRetypePasswordVisible] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handleMobileChange = (value) => {
    setUserDetails((prev) => ({ ...prev, mobile: value }));
  };

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);
  const toggleRetypePasswordVisibility = () => setRetypePasswordVisible((prev) => !prev);

  const registerSubmitHandler = async (e) => {
    e.preventDefault();

    const { fullname, email, mobile, password, confirmPassword } = userDetails;

    if (!fullname || !email || !mobile || !password || !confirmPassword) {
      toast.warning("Please fill all the fields", { autoClose: 3000, position: "top-right" });
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password must be same", { autoClose: 3000, position: "top-right" });
      return;
    }

    try {
      const res = await fetch("/api/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, email, mobile, password }),
      });

      const data = await res.json();

      if (data.error) {
        toast.error(data.error, { autoClose: 3000, position: "top-right" });
      } else {
        toast.success("Registration successful! Welcome to apnnehatti.", {
          autoClose: 3000,
          position: "top-right",
        });
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { autoClose: 3000, position: "top-right" });
    }
  };

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
          <h1 className="text-3xl font-semibold text-center mb-6 text-green-600">Create Account</h1>

          <form onSubmit={registerSubmitHandler} className="space-y-5">
            {/* Fullname */}
            <input
              type="text"
              id="fullname"
              placeholder="Full Name"
              pattern="^[a-zA-Z ]+$"
              title="Only alphabets and spaces allowed"
              value={userDetails.fullname}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            {/* Email */}
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={userDetails.email}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            {/* Mobile */}
            <PhoneInput
              country={"in"}
              value={userDetails.mobile}
              onChange={handleMobileChange}
              inputProps={{
                name: "mobile",
                required: true,
                autoFocus: false,
                placeholder: "Mobile Number",
              }}
              containerClass="w-full"
              inputClass="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="Password"
                minLength={8}
                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                title="Minimum 8 characters, including uppercase, lowercase, and a number"
                value={userDetails.password}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3 text-gray-600 hover:text-green-600"
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={retypePasswordVisible ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm Password"
                minLength={8}
                pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                title="Minimum 8 characters, including uppercase, lowercase, and a number"
                value={userDetails.confirmPassword}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                type="button"
                onClick={toggleRetypePasswordVisibility}
                className="absolute right-3 top-3 text-gray-600 hover:text-green-600"
              >
                {retypePasswordVisible ? "Hide" : "Show"}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#2d241b] text-white py-3 rounded-md hover:bg-[#524232] transition"
            >
              Register New Account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-700">
            Already have an account?{" "}
            <Link href="/login" className="text-green-600 hover:underline">
              Sign in
            </Link>
          </p>

          <p className="mt-4 text-xs text-gray-500 text-center">
            By continuing, you agree to Apneehatti&apos;s{" "}
            <a href="#" className="underline text-green-600">
              Conditions of Use
            </a>{" "}
            and{" "}
            <a href="#" className="underline text-green-600">
              Privacy Notice
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
