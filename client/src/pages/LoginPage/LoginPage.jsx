import { useState } from "react";
import { BsShieldLockFill } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import Input from "../../components/ui/inputs/Input";
import PasswordInput from "../../components/ui/inputs/PasswordInput";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/acasa");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="h-screen grow bg-blue-50/90 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 bg-white p-6 rounded-lg w-1/4 min-w-80 m-auto border border-slate-200"
      >
        <div className="flex flex-col items-center gap-4">
          <BsShieldLockFill className="w-10 h-10 text-blue-700" />
          <div className="text-center">
            <h1 className="text-xl font-bold text-blue-950 pb-1">
              Bine ai venit înapoi
            </h1>
            <p className="text-sm text-blue-700">
              Conectează-te pentru a continua
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Input
            id="userEmail"
            name="userEmail"
            label="Adresa de email"
            placeholder="ceva@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<HiOutlineMail className="text-blue-700 w-4.5 h-4.5" />}
          />
          <PasswordInput
            id="password"
            name="password"
            label="Parola"
            placeholder="*********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<HiOutlineMail className="text-blue-700" />}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 mt-4 rounded-md transition cursor-pointer"
          >
            Conectează-te
          </button>
        </div>
      </form>
    </div>
  );
}
