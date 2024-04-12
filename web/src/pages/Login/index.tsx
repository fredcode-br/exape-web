import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../common/contexts/authContext";
import Label from "../../components/Form/Label";
import Input from "../../components/Form/Input";
import Button from "../../components/Button";

function Login() {
  const { signed, error, signIn } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (signed) {
      navigate("/");
    }
  }, [signed, navigate]);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await signIn({ email, password });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, name: string) {
    if (name === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">


        <form className="w-full" onSubmit={handleLogin}>
          <h1 className="text-center text-2xl font-bold mb-4">Login</h1>
          {error && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-300" role="alert">
              <span className="font-medium">{error}</span>
            </div>
          )}
          <div className="mb-4">
            <Label
              customClass="text-gray-700 text-sm font-bold"
              htmlFor="email"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={email}
              handleChange={(e) => handleChange(e, "email")}
              placeholder="Digite seu endereço de email"
            />
          </div>
          <div className="mb-6">
            <Label
              customClass="text-gray-700 text-sm font-bold"
              htmlFor="password"
            >
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={password}
              handleChange={(e) => handleChange(e, "password")}
              placeholder="Digite sua senha"
            />
          </div>
          <div className="flex items-center justify-center mb-4">
            <Button type="submit">Entrar</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
