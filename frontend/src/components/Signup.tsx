import axios from "axios";
import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";

interface SignupProps {
  toggleAuthPage: () => void;
}

const styles = {
  icon: "absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm",
  input:
    "w-[90%] bg-gray-200 outline-none p-2 rounded-sm m-auto my-3 pl-8 placeholder-gray-400 placeholder-text-sm",
  inputContainer: "relative flex justify-center",
  formContainer: "bg-[#f0f4f8] max-w-sm w-[90%] p-4 shadow-lg rounded-lg",
};

export default function Signup({ toggleAuthPage }: SignupProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

const handleSignup = async () => {
  setLoading(true);
  setError(null);

  try {
    const response = await axios.post("http://localhost:3000/users/register", {
      email,
      password,
    });

    console.log("data ->", response.data);
    alert("Conta criada com sucesso!");

    // Você pode redirecionar para a tela de login aqui
    toggleAuthPage();
  } catch (err) {
    if (axios.isAxiosError(err)) {
      setError(err.response?.data?.message || "Erro ao criar conta. Verifique seus dados.");
    } else {
      setError("Erro ao conectar ao servidor.");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className={styles.formContainer}>
      <div className="text-center my-4">
        <h2 className="text-2xl font-bold mb-2 text-purple-900">Sign Up</h2>
        <div className="w-[10%] h-1 bg-purple-900 mx-auto rounded-full"></div>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className={styles.inputContainer}>
          <FaEnvelope className={styles.icon} />
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <FaLock className={styles.icon} />
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </form>

      <div className="my-6 flex justify-center gap-3">
        <button
          onClick={handleSignup}
          disabled={loading}
          className="bg-purple-800 px-10 py-2 cursor-pointer rounded-full text-white font-semibold"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <button
          onClick={toggleAuthPage}
          className="bg-gray-200 px-10 py-2 cursor-pointer rounded-full text-gray-600"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
