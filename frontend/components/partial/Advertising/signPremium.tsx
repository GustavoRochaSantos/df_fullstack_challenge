import { Button } from "@/components";
import React from "react";

const SignPremiumSection = () => {
  return (
    <section className="flex flex-col gap-2 card-gray">
      <h3 className="h3">Assine o Premium</h3>
      <article>
        Assine para desbloquear novos recursos e, se elegível, receba uma parte
        da receita dos anúncios.
      </article>
      <Button id="signin" type="secondary">
        Inscrever-se
      </Button>
    </section>
  );
};

export default SignPremiumSection;
