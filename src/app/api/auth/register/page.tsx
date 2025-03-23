"use client";
import { useState } from "react";
import userRegister from "@/libs/userRegister";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [userName, setUserName] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState<string | null>(null); 
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await userRegister(userName, telephoneNumber, userEmail, userPassword);
      console.log("User registered successfully:", response);
      router.push("/api/auth/signin"); 
    } catch (err) {
      setError("Registration failed. Please try again."); 
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-black">Register</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" className="w-full p-2 mb-2 border" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full p-2 mb-2 border" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} required />
        <input type="text" placeholder="Username" className="w-full p-2 mb-2 border" value={userName} onChange={(e) => setUserName(e.target.value)} required />
        <input type="tel" placeholder="Telephone" className="w-full p-2 mb-2 border" value={telephoneNumber} onChange={(e) => setTelephoneNumber(e.target.value)} required />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 mt-2">Register</button>
      </form>
    </div>
  );
}
