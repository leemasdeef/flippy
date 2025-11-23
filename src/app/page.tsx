"use client";

import { useEffect, useState } from "react";
import Flashcard, { EmptyCard } from "../../ui/flashcard";
import { CardArray } from "@/types/card";
import confetti from "canvas-confetti";

import AuthDialog from "@/components/auth/auth-dialog";
import { authClient } from "@/server/auth-client";
import ProfileCard from "@/components/auth/profile-card";
import { Spinner } from "@/components/ui/spinner";

export default function Home() {
  const [cards, setCards] = useState<CardArray[]>([]);
  const { data: session, isPending, error, refetch } = authClient.useSession(); // check for logged in user
  const isReady = cards.length === 5; // set max to-do of 5.
  // check if all to-dos complete
  const isComplete =
    cards.filter((card) => card.completed === true).length === 5;
  useEffect(() => {
    if (isComplete) {
      confetti({
        particleCount: 300,
        spread: 120,
        startVelocity: 40,
        origin: { y: 0.7 },
      });
    }
  }, [isComplete]);

  if (isPending)
    return (
      <div className="flex h-dvh justify-center items-center">
        <Spinner className="size-6 text-red-500" />
      </div>
    ); // wait for session
  if (error) return <div>Error</div>;

  return (
    <>
      <div className="text-center mt-3">
        <h1 className="text-5xl">Flippy.</h1>
      </div>
      <div className="flex justify-center items-center mt-5">
        {!session && <AuthDialog onLoginSuccess={() => refetch()} />}
        {session && <ProfileCard />}
      </div>
      <section className="flex flex-col gap-4 my-5 md:animate-in md:flex-row spin-in zoom-in duration-500 justify-evenly mx-auto md:my-40 ">
        {/* Column 1: Create cards */}

        {!isReady && (
          <div>
            <Flashcard
              cards={cards}
              setCards={setCards}
              value=""
              pending={false}
              completed={false}
            />
          </div>
        )}

        {/* Column 2: Pending cards */}
        <div className="relative w-59 ml-30 md:ml-0">
          {/* bottom card for stacking visual effect*/}
          <EmptyCard />
          {cards.length > 0 &&
            cards
              .filter((card) => card.pending)
              .sort((b, a) => {
                const colourPriority: Record<string, number> = {
                  "bg-red-500": 1,
                  "bg-orange-500": 2,
                  "bg-blue-500": 3,
                  "bg-white-500": 4,
                  "": 5,
                };
                const priorityA = colourPriority[a.selectedBg || ""] || 999;
                const priorityB = colourPriority[b.selectedBg || ""] || 999;
                return priorityA - priorityB;
              })
              .map((card, index) => (
                <div
                  key={card.id}
                  className="absolute animate-in spin-in zoom-in transition-all duration-300 ease-out hover:scale-105 hover:z-50 hover:-translate hover:rotate-2 hover:shadow-2xl cursor-pointer"
                  style={{
                    top: `${index * 40}px`,
                    zIndex: index + 1,
                  }}
                  onAnimationEnd={() => {
                    if (card.justCreated) {
                      setCards((prev) =>
                        prev.map((c) =>
                          c.id === card.id ? { ...c, justCreated: false } : c
                        )
                      );
                    }
                  }}
                >
                  <Flashcard
                    cards={cards}
                    setCards={setCards}
                    value={card.value}
                    pending={card.pending}
                    completed={card.completed}
                    selectedBg={card.selectedBg}
                  />
                </div>
              ))}
        </div>
        {/* Column 3: Completed cards */}
        <div className="relative w-59 ml-40 md:ml-0">
          {/* bottom card for stacking visual effect */}
          <EmptyCard />
          {cards.length > 0 &&
            cards
              .filter((card) => card.completed)
              .map((card, index) => (
                <div
                  key={card.id}
                  className="absolute animate-in spin-in zoom-in transition-all duration-300 ease-out hover:scale-105 hover:z-50 hover:-translate hover:rotate-2 hover:shadow-2xl cursor-pointer"
                  style={{
                    top: `${index * 40}px`,
                    zIndex: index + 1,
                  }}
                  onClick={() => {
                    // Move clicked card to end of array (front of stack)
                    setCards((prev) => {
                      const newCards = prev.filter((c) => c.id !== card.id);
                      return [...newCards, card];
                    });
                  }}
                >
                  <Flashcard
                    cards={cards}
                    setCards={setCards}
                    value={card.value}
                    pending={card.pending}
                    completed={card.completed}
                    selectedBg="bg-green-500"
                  />
                </div>
              ))}
        </div>
      </section>
    </>
  );
}
