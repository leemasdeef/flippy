"use client";

interface Card {
  id: number;
  value?: string;
  pending: boolean;
}

import { useState } from "react";
import Flashcard, { EmptyCard } from "../../ui/flashcard";

export default function Home() {
  const [cards, setCards] = useState<Card[]>([]);
  console.log(cards);
  return (
    <>
      <div className="text-center mt-3">
        <h1 className="text-5xl">Flippy.</h1>
      </div>
      <section className="flex mx-20 my-40 gap-10">
        <div>
          <Flashcard
            cards={cards}
            setCards={setCards}
            key={0}
            value=""
            pending={false}
          />
        </div>
        <div className="relative">
          {/* bottom card */}
          <EmptyCard />
          {cards.length > 0 &&
            cards.map((card, index) => (
              <div
                key={index}
                className="absolute top-4 left-4 transition-all duration-300 ease-out hover:scale-105 hover:z-50 hover:-translate hover:rotate-2 hover:shadow-2xl cursor-pointer"
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
                />
              </div>
            ))}
        </div>
        <div>
          <EmptyCard />
        </div>
      </section>
    </>
  );
}
