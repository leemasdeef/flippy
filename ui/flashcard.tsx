import { Button } from "@/components/ui/button";
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

export default function Flashcard() {
  return (
    <Card className="w-full mx-auto max-w-sm">
      <CardHeader className="text-center">
        <CardTitle>Flippy</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div>
              <Input id="email" type="email" placeholder="✏️" required />
            </div>
            <div className="flex justify-around">
              <ToggleGroupSpacing />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          <Send />
        </Button>
      </CardFooter>
    </Card>
  );
}

import { Flag, Send, Pencil } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function ToggleGroupSpacing() {
  return (
    <ToggleGroup type="multiple" variant="outline" spacing={10} size="sm">
      <ToggleGroupItem
        value="priority1"
        aria-label="Toggle priority 1"
        className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-red-500 data-[state=on]:*:[svg]:stroke-black-500"
      >
        <Flag />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="priority2"
        aria-label="Toggle priority 2"
        className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-orange-400 data-[state=on]:*:[svg]:stroke-black-500"
      >
        <Flag />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="priority3"
        aria-label="Toggle priority 3"
        className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-black-800"
      >
        <Flag />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="priority4"
        aria-label="Toggle priority 4"
        className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-white data-[state=on]:*:[svg]:stroke-black-800"
      >
        <Flag />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
