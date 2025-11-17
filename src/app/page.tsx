"use client";

import { useState } from "react";
import Flashcard, { EmptyCard } from "../../ui/flashcard";
import { CardArray } from "@/types/card";

export default function Home() {
  const [cards, setCards] = useState<CardArray[]>([]);
  console.log("Cards array:", cards);
  return (
    <>
      <div className="text-center mt-3">
        <h1 className="text-5xl">Flippy.</h1>
      </div>
      <section className="flex animate-in spin-in zoom-in duration-500 justify-evenly mx-auto my-40 ">
        {/* Column 1: Create cards */}
        <div>
          <Flashcard
            cards={cards}
            setCards={setCards}
            value=""
            pending={false}
            completed={false}
          />
        </div>

        {/* Column 2: Pending cards */}
        <div className="relative w-59">
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
                  className="absolute animate-in spin-in zoom-in transition-all duration-500 ease-out hover:scale-105 hover:z-50 hover:-translate hover:rotate-2 hover:shadow-2xl cursor-pointer"
                  style={{
                    top: `${index * 40}px`,
                    zIndex: index + 1,
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
        <div className="relative w-59">
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
