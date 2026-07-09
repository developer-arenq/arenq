import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordConstraints, setPasswordConstraints] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    digit: false
  });
  const router = useRouter();
  const { token } = router.query;

  // Debugging: Log token on component mount and when it changes
  useEffect(() => {
    console.log("Token from router query:", token);
  }, [token]);

  const validatePassword = (pwd) => {
    const constraints = {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      digit: /\d/.test(pwd)
    };
    
    console.log("Password Constraints:", constraints);
    setPasswordConstraints(constraints);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Debugging: Log form submission details
    console.log("Form Submission Details:", {
      passwordLength: password.length,
      passwordsMatch: password === confirmPassword,
      constraints: passwordConstraints
    });

    if (password === "") {
      toast.error("Please enter password");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password and confirm password do not match");
      return;
    }

    const allConstraintsPassed = Object.values(passwordConstraints).every(Boolean);
    if (!allConstraintsPassed) {
      toast.error("Please enter a valid password");
      return;
    }

    try {
      console.log("Sending reset password request with:", {
        token,
        passwordLength: password.length
      });

      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, token }),
      });

      console.log("Response status:", response.status);
      
      const res = await response.json();
      console.log("Response body:", res);

      if (response.ok) {
        toast.success("Password successfully reset");
        router.push("/");
      } else {
        toast.error(res.error || "Failed to reset password");
      }
    } catch (error) {
      console.error("Reset Password Catch Error:", error);
      toast.error("Something went wrong");
    }
  };

  const handleClose = () => {
    
    router.push("/");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-4">Reset Password</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="password"
              className="w-full p-2 border rounded mb-3"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
              required
            />

            {password.length > 0 && (
              <div className="mb-3 text-xs text-gray-600">
                <p>Password must contain:</p>
                <ul className="pl-4 list-disc">
                  <li className={passwordConstraints.length ? 'text-green-600' : 'text-red-600'}>
                    At least 8 characters long
                  </li>
                  <li className={passwordConstraints.uppercase ? 'text-green-600' : 'text-red-600'}>
                    At least one uppercase letter
                  </li>
                  <li className={passwordConstraints.lowercase ? 'text-green-600' : 'text-red-600'}>
                    At least one lowercase letter
                  </li>
                  <li className={passwordConstraints.digit ? 'text-green-600' : 'text-red-600'}>
                    At least one digit
                  </li>
                </ul>
              </div>
            )}

            <input
              type="password"
              className="w-full p-2 border rounded mb-3"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button
              className="w-full bg-indigo-500 text-white p-2 rounded"
              type="submit"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;