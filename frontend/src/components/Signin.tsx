import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Para redirecionamento

interface SignupProps {
  toggleAuthPage: () => void;
}

const styles = {
  icon: "absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm group-focus-within:text-purple-600",
  input:
    "w-[90%] bg-gray-200 outline-none p-2 rounded-sm m-auto my-3 pl-8 placeholder-gray-400 placeholder-text-sm",
  inputContainer: "relative flex justify-center group",
  formContainer: "bg-[#f0f4f8] max-w-sm w-[90%] p-4 shadow-lg rounded-lg",
};

export default function Signin({ toggleAuthPage }: SignupProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook para navegação

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const response = await axios.post("http://localhost:3000/auth/login", {
      email,
      password,
    });

    console.log("Login bem-sucedido:", response.data);

    // 🔹 Pegando o token corretamente
    const token = response.data.access_token.access_token; // 🔥 Pegando a string do token corretamente

    const userId = response.data.userId;

    // 🔹 Salvando no localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId.toString()); // Garante que userId seja string

    console.log("Token salvo no localStorage:", token);
    console.log("User ID salvo no localStorage:", userId);

    navigate("/todolist");
  } catch (error) {
    console.error("Erro ao fazer login:", error);
  } finally {
    setLoading(false);
  }
};



  return (
    <div className={styles.formContainer}>
      <div className="text-center my-4">
        <h2 className="text-2xl font-bold mb-2 text-purple-900">Sign in</h2>
        <div className="w-[10%] h-1 bg-purple-900 mx-auto rounded-full"></div>
      </div>

      <form onSubmit={handleLogin}>
        <div className={styles.inputContainer}>
          <FaEnvelope className={styles.icon} />
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="bg-purple-800 w-full py-2 rounded-full text-white font-semibold mt-4"
          disabled={loading}
        >
          {loading ? "Carregando..." : "Sign In"}
        </button>
      </form>

      <div className="flex width-[90%] justify-center my-2">
        <p className="text-sm">Don't have an account?</p>
        <p
          className="text-sm font-bold ml-1 text-purple-800 cursor-pointer"
          onClick={toggleAuthPage}
        >
          Sign up
        </p>
      </div>
    </div>
  );
}
