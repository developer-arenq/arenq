// pages/policy.js
import React, { useEffect, useState } from "react";
import Head from "next/head";

const Policy = () => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/policy/list`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setPolicies(data);
      } catch (err) {
        console.error("Error fetching policies:", err.message);
      }
    };

    fetchPolicies();
  }, []);

  return (
    <>
      <Head>
        <title>Policies | Arenq</title>
      </Head>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Our Policies</h1>
        {policies.length === 0 ? (
          <p>Loading policies...</p>
        ) : (
          <ul className="space-y-4">
            {policies.map((policy) => (
              <li key={policy._id}>
                <h2 className="font-semibold">{policy.title}</h2>
                <p>{policy.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Policy;
