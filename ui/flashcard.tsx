"use client";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CardArray } from "@/types/card";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

interface BgObject {
  priority1: string;
  priority2: string;
  priority3: string;
  priority4: string;
  reset: string;
}

interface FlashcardProps extends Omit<CardArray, "id"> {
  cards: CardArray[];
  setCards: React.Dispatch<React.SetStateAction<CardArray[]>>;
}

export default function Flashcard({
  cards,
  setCards,
  value,
  pending,
  completed,
  selectedBg,
}: FlashcardProps) {
  const [inputValue, setInputValue] = useState("");
  const [background, setBackground] = useState("");

  // handle background change on priority select
  const handleValueChange = (value: string) => {
    const bgObject: BgObject = {
      priority1: "bg-red-500",
      priority2: "bg-orange-500",
      priority3: "bg-blue-500",
      priority4: "bg-white",
      reset: "background",
    };

    setBackground(bgObject[value as keyof BgObject] || "background");
  };

  // handle form submit
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (pending) {
      const updatedCards = cards.map((card) => {
        const matches = card.value === value;

        if (matches) {
          return { ...card, pending: false, completed: true };
        }
        return card;
      });

      setCards(updatedCards);
    } else {
      setCards([
        ...cards,
        {
          id: cards.length === 0 ? 1 : cards[cards.length - 1].id + 1,
          value: inputValue,
          pending: true,
          completed: false,
          selectedBg: background,
        },
      ]);
    }
    setBackground("");
    setInputValue("");
  };
  return (
    <Card className={`w-full mx-auto max-w-sm ${selectedBg || background}`}>
      <CardContent>
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-6">
            <div>
              {pending || completed ? (
                <p className="text-center">{value}</p>
              ) : (
                <Input
                  className="placeholder:text-gray-500"
                  id="task"
                  type="text"
                  placeholder="✏️"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  required
                />
              )}
            </div>
            <div className="flex justify-around gap-2">
              <div className={!pending && !completed ? "visible" : "invisible"}>
                <ToggleGroupSpacing handleValueChange={handleValueChange} />
              </div>
            </div>
            <div className="flex flex-col gap-4 items-center">
              <Button
                type="submit"
                onClick={(e) => handleFormSubmit(e)}
                className="w-full"
              >
                <Send />
              </Button>
              <div className={!pending && !completed ? "visible" : "invisible"}>
                <Button
                  value="reset"
                  type="button"
                  onClick={() => setBackground("background")}
                  className="w-2 h-8"
                >
                  <RotateCcw />
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
}

export function EmptyCard() {
  return (
    <Card className="w-full mx-auto max-w-sm invisible">
      <CardHeader className="opacity-0">
        <CardTitle>Hidden</CardTitle>
      </CardHeader>
      <CardContent className="opacity-0">
        <div className="h-32" />
      </CardContent>
      <CardFooter className="opacity-0">
        <div className="h-10" />
      </CardFooter>
    </Card>
  );
}

import { Flag, Send, RotateCcw } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";

export function ToggleGroupSpacing({
  handleValueChange,
}: {
  handleValueChange: (value: string) => void;
}) {
  return (
    <ToggleGroup
      type="single"
      variant="default"
      spacing={1}
      size="sm"
      onValueChange={handleValueChange}
    >
      <ToggleGroupItem
        value="priority1"
        aria-label="Toggle priority 1"
        className={cn(
          buttonVariants({ variant: "neutral", size: "sm" }),
          "data-[state=on]:*:[svg]:fill-white-500 data-[state=off]:*:[svg]:fill-red-500  data-[state=on]:*:[svg]:stroke-black-800"
        )}
      >
        <Flag />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="priority2"
        aria-label="Toggle priority 2"
        className={cn(
          buttonVariants({ variant: "neutral", size: "sm" }),
          "data-[state=off]:*:[svg]:fill-orange-500 data-[state=on]:*:[svg]:fill-white-500  data-[state=on]:*:[svg]:stroke-black-800"
        )}
      >
        <Flag />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="priority3"
        aria-label="Toggle priority 3"
        className={cn(
          buttonVariants({ variant: "neutral", size: "sm" }),
          "data-[state=off]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:fill-white-500  data-[state=on]:*:[svg]:stroke-black-800"
        )}
      >
        <Flag />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="priority4"
        aria-label="Toggle priority 4"
        className={cn(
          buttonVariants({ variant: "neutral", size: "sm" }),
          "data-[state=off]:*:[svg]:fill-white-500 data-[state=on]:*:[svg]:fill-white-500 data-[state=on]:*:[svg]:stroke-black-800"
        )}
      >
        <Flag />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
