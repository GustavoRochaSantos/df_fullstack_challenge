import Link from "next/link";
import React from "react";

interface Params {}

const NewsSection = ({}: Params) => {
  const data = [
    {
      subtitle: "Programas e competição - Assunto do momento",
      title: "Yasmin",
      text: "Assunto do Momento: Vanessa",
    },
    {
      subtitle: "Programas e competição - Assunto do momento",
      title: "Bin Laden",
      text: "28.8 mil posts",
    },
    {
      subtitle: "Política - Assunto do momento",
      title: "China",
      text: "324 mil posts",
    },
    {
      subtitle: "Brasil - Assunto do momento",
      title: "Vampeta",
      text: "",
    },
  ];
  return (
    <section className="flex flex-col gap-2 card-gray">
      <h3 className="h3">O que está acontecendo?</h3>
      <div>
        {data.map((item) => (
          <div className="mb-3" key={Math.random() * 20}>
            <div className="text-gray-small">{item.subtitle}</div>
            <div className="font-bold">{item.title}</div>
            <div className="text-gray-small">{item.text}</div>
          </div>
        ))}
      </div>

      <Link href={"#"}>Mostrar mais</Link>
    </section>
  );
};

export default NewsSection;
