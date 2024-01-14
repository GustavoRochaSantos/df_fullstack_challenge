"use client";
import { NewPostSection, PostSection, Tabs } from "@/components";
import { PostService } from "@/service";
import { useEffect } from "react";

export default function Home() {
  const postsData = [
    {
      id: "12334342",
      userId: "12344",
      userAvatar: undefined,
      userName: "Zanfa",
      userFullName: "Zanfa",
      createdAt: "12 de jan",
      text: (
        <>
          <div>
            Aqui o instrutor ficou de xereca
            <video width="320" height="240" controls>
              <source
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </>
      ),
    },
    {
      id: "123343o23i",
      userId: "123443",
      userAvatar: undefined,
      userName: "DeFI",
      userFullName: "De.Fi 2.0",
      createdAt: "",
      text: (
        <>
          🚨 The only way to make a fortune in web3 is by being an early
          adopter. The early adopters of Uniswap, Aptos, Arbitrum, or Blur have
          received some lucrative rewards! The best part? @DeFi might be no
          different!
        </>
      ),
    },
  ];

  const loadData = async () => {
    const response = await PostService.findAll();
    console.log(response);
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col p-3">
      <Tabs
        tabs={[
          {
            title: "Pra você",
            content: (
              <>
                <NewPostSection />
                <div id="posts">
                  {postsData?.map((post) => (
                    <PostSection key={post.id} data={post} />
                  ))}
                </div>
              </>
            ),
          },
          {
            title: "Seguindo",
            content: <>Ainda em construção</>,
          },
        ]}
      />
    </main>
  );
}
