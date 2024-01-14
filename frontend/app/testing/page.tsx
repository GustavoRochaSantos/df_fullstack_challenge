import { Button } from "@/components";
import { FloppyDisk, Disc } from "@phosphor-icons/react/dist/ssr";
import React from "react";

interface Params {}

const TestingPage = ({}: Params) => {
  return (
    <div>
      <h1>Teste basico</h1>
      <div className="flex ">
        <Button>Teste</Button>
        <Button loading>Teste</Button>
        <Button icon={<FloppyDisk />} iconPosition="before">
          Teste
        </Button>
        <Button type="secondary">Testefsdaf dfas adfasf</Button>
      </div>
    </div>
  );
};

export default TestingPage;
