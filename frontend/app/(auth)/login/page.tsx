import { Button, Checkbox, Input } from "@/components";

import { LockKey, User } from "@phosphor-icons/react/dist/ssr";
import React from "react";

interface Params {}

const LoginPage = ({}: Params) => {
  return (
    <div className="container h-full m-auto">
      <h1>Bem vindo novamente!</h1>
      <h4>Estavamos com saudades </h4>
      <div className="w-72">
        <Input
          id="user"
          icon={<User size={24} color="gray" />}
          type="email"
          required
        />
        <Input
          id="password"
          icon={<LockKey size={24} color="gray" />}
          type="password"
          required
        />
        <div className="flex justify-between gap-2 mb-2">
          <Checkbox id="remember-me" label="Lembrar-me" />
          <a href="#">Esqueci a senha</a>
        </div>
        <Button fullSize>Login</Button>
        <Button type="secondary" fullSize>
          Secondary
        </Button>
        <Button type="danger" fullSize>
          Login Exclusão
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
