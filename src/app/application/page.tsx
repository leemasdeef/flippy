"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Flashcard, { EmptyCard } from "@/components/ui/flashcard";
import { CardArray } from "@/types/card";
import confetti from "canvas-confetti";

import AuthDialog from "@/components/auth/auth-dialog";
import { authClient } from "@/server/auth-client";
import ProfileCard from "@/components/auth/profile-card";
import { Spinner } from "@/components/ui/spinner";

// Motion preset
const stackItem = {
  initial: { opacity: 0, scale: 0.9, rotateY: -90 },
  animate: { opacity: 1, scale: 1, rotateY: 0 },
  exit: { opacity: 0, scale: 0.85, rotateY: 90 },
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 26,
  },
} as const;

export default function Home() {
  const [cards, setCards] = useState<CardArray[]>([]);
  const { data: session, isPending, error, refetch } = authClient.useSession();

  const isReady = cards.length === 5;
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
    );

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

      {/* Perspective enables true 3D flips */}
      <section
        className="flex flex-col gap-4 my-5 md:flex-row justify-evenly mx-auto md:my-40"
        style={{ perspective: 1400 }}
      >
        {/*Column 1 – Create Card */}
        {!isReady && (
          <motion.div layout {...stackItem}>
            <Flashcard
              cards={cards}
              setCards={setCards}
              value=""
              pending={false}
              completed={false}
            />
          </motion.div>
        )}

        {/* Column 2 – Pending Stack */}
        <div className="relative w-59 ml-30 md:ml-0">
          <EmptyCard />

          <AnimatePresence>
            {cards
              .filter((card) => card.pending)
              .sort((b, a) => {
                const colourPriority: Record<string, number> = {
                  "bg-red-500": 1,
                  "bg-orange-500": 2,
                  "bg-blue-500": 3,
                  "bg-white-500": 4,
                  "": 5,
                };

                return (
                  (colourPriority[a.selectedBg || ""] || 999) -
                  (colourPriority[b.selectedBg || ""] || 999)
                );
              })
              .map((card, index) => (
                <motion.div
                  key={card.id}
                  layout
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, info) => {
                    if (info.offset.x > 120) {
                      setCards((prev) =>
                        prev.map((c) =>
                          c.id === card.id
                            ? {
                                ...c,
                                pending: false,
                                completed: true,
                              }
                            : c
                        )
                      );
                    }
                  }}
                  {...stackItem}
                  whileHover={{
                    scale: 1.05,
                    rotate: 2,
                    zIndex: 50,
                  }}
                  transition={{
                    ...stackItem.transition,
                    delay: index * 0.05,
                  }}
                  className="absolute cursor-grab"
                  style={{
                    top: `${index * 40}px`,
                    scale: 1 - index * 0.015,
                    zIndex: index + 1,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <Flashcard {...card} cards={cards} setCards={setCards} />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        {/* Column 3 – Completed Stack */}
        <div className="relative w-59 ml-40 md:ml-0">
          <EmptyCard />

          <AnimatePresence>
            {cards
              .filter((card) => card.completed)
              .map((card, index) => (
                <motion.div
                  key={card.id}
                  layout
                  {...stackItem}
                  whileHover={{
                    scale: 1.05,
                    rotate: 2,
                    zIndex: 50,
                  }}
                  transition={{
                    ...stackItem.transition,
                    delay: index * 0.05,
                  }}
                  onClick={() => {
                    setCards((prev) => {
                      const next = prev.filter((c) => c.id !== card.id);
                      return [...next, card];
                    });
                  }}
                  className="absolute cursor-pointer"
                  style={{
                    top: `${index * 40}px`,
                    zIndex: index + 1,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <Flashcard
                    {...card}
                    cards={cards}
                    setCards={setCards}
                    selectedBg="bg-green-500"
                  />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
