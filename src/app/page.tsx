import Flashcard from "../../ui/flashcard";
export default function Home() {
  return (
    <>
      <div className="text-center mt-3">
        <h1 className="text-5xl">Flippy.</h1>
      </div>
      <section className="flex mx-auto my-40  gap-10">
        <Flashcard />
        <Flashcard />
        <Flashcard />
      </section>
    </>
  );
}
