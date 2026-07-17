/* eslint-disable react-hooks/rules-of-hooks */
import Head from "next/head";
import { useState } from "react";
import { signOut, getSession } from "next-auth/react";
import Link from "next/link";
import { HiUserCircle, HiOutlineExclamationCircle } from "react-icons/hi";
import { TbLogout } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ================= SSR AUTH ================= */
export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/users/id/${session.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    }
  );

  const user = res.ok ? await res.json() : null;

  return {
    props: {
      profile: user
        ? {
          fullname: user?.fullname ?? null,
          email: user?.email ?? null,
          mobile: user?.mobile ?? null,
        }
        : null,
    },
  };
}

/* ================= COMPONENT ================= */
export default function MyProfile({ profile }) {
  const [form, setForm] = useState({
    fullname: profile?.fullname || "",
    email: profile?.email || "",
    mobile: profile?.mobile || "",
  });

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  /* ================= UPDATE PROFILE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/users/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>My Profile</title>
      </Head>


      <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-100 py-10 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[280px_1fr] gap-8">
          {/* LEFT COLUMN */}
          <aside className="space-y-6">
            <div className="bg-white shadow rounded-2xl p-6 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-[#2d241b] flex items-center justify-center text-white text-3xl">
                <FaUser />
              </div>
              <p className="mt-3 text-gray-600">Hello,</p>
              <h2 className="text-lg font-semibold text-gray-900 capitalize">
                {form.fullname.split(" ")[0] || "User"}
              </h2>
            </div>

            <div className="bg-white shadow rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Account Settings
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="font-medium text-green-600">My Profile</li>
                <li>
                  <Link href="/myorders" className="hover:text-green-600">
                    My Orders
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium"
                  >
                    <TbLogout /> Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </aside>

          {/* RIGHT COLUMN */}
          <section className="bg-white shadow rounded-2xl p-8">
            <h1 className="text-2xl font-bold text-green-700 flex items-center gap-2 mb-6">
              <HiUserCircle className="text-3xl" /> My Profile
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  id="fullname"
                  type="text"
                  value={form.fullname}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Mobile Number
                </label>
                <input
                  id="mobile"
                  type="tel"
                  pattern="^[0-9]{8,15}$"
                  value={form.mobile}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#2d241b] text-white px-6 py-2 rounded-lg hover:bg-[#524232]"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </section>
        </div>

        {/* SIGN OUT MODAL */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-3 h-12 w-12 text-orange-500" />
              <h2 className="text-lg font-semibold mb-4">
                Are you sure you want to sign out?
              </h2>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="px-2 py-1 rounded-lg bg-[#2d241b] text-white"
                >
                  Sign Out
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-2 py-1 rounded-lg border"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
