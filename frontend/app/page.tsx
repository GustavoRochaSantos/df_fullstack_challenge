"use client";
import { PostsListSection, Tabs } from "@/components";
import { useUserStore } from "@/store";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    useUserStore.persist.rehydrate();
  }, []);

  return (
    <main className="flex min-h-screen flex-col p-3 scroll-my-0 scroll-smooth overflow-x-hidden overflow-y-auto max-h-screen">
      <Tabs
        tabs={[
          {
            title: "Pra você",
            content: (
              <>
                <PostsListSection />
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
