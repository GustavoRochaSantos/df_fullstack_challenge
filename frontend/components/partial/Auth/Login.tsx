import { Button, Checkbox, Input } from "@/components";
import { AuthService } from "@/service";
import { MutationError } from "@/service/baseApi";
import { useUserStore } from "@/store";
import { LockKey, User } from "@phosphor-icons/react/dist/ssr";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

type Inputs = {
  login: string;
  password: string;
};

const Login = () => {
  const [inputLogin, setInputLogin] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);

  const { loginModalToggle, setLogin } = useUserStore((state) => state);

  const meMutate = useMutation({
    mutationFn: AuthService.me,
    onSuccess: (data: any, variables, context) => {
      setLogin({
        id: data.sub,
        fullName: data.fullName,
        name: data.name,
      });
    },
  });

  const loginMutate = useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data, variables, context) => {
      localStorage.setItem("tokens", JSON.stringify(data));
      meMutate.mutate();
      loginModalToggle();
    },
    onError: (error: MutationError) => {
      if (error.response.data.statusCode === 401) {
        setError("Usuário/Senha inválidos! Verifique!");
      }
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    loginMutate.mutate({ login: inputLogin, password: inputPassword });
  };

  const handleCancel = () => {
    loginModalToggle();
  };
  return (
    <div className="bg-white border-2 rounded-lg p-10">
      <h1 className="font-bold ">Bem vindo novamente!</h1>
      <h4>Estavamos com saudades </h4>
      <form className="w-72 pt-5" onSubmit={handleSubmit}>
        <Input
          id="login"
          icon={<User size={24} color="gray" />}
          value={inputLogin}
          onChange={(e) => setInputLogin(e.target.value)}
        />
        <Input
          id="password"
          icon={<LockKey size={24} color="gray" />}
          type="password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
        />
        <div className="flex justify-between gap-2 mb-2">
          <Checkbox id="remember-me" label="Lembrar-me" />
          <a href="#">Esqueci a senha</a>
        </div>
        {error && (
          <small className="text-red-400 font-bold py-10 mb-5">{error}</small>
        )}
        <div className="flex mt-4">
          <Button fullSize type="submit">
            Login
          </Button>
          <Button type="secondary" fullSize onClick={handleCancel}>
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
