"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function FlippyLanding() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="min-h-screen bg-background text-foreground antialiased"
    >
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </motion.div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-secondary-background border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="text-main-foreground px-4 py-1  font-heading tracking-tight text-5xl">
          Flippy.
        </div>
        <nav className="hidden sm:flex gap-6 font-bold">
          <Button className="relative bg-color-white">
            <Link href="https://github.com/leemasdeef/flippy">
              <Image
                src="/github-mark.svg"
                alt="GitHub"
                width={25}
                height={25}
              ></Image>
            </Link>
          </Button>
          <Button className="bg-color-white">
            <a href="#features">Features</a>
          </Button>
          <Button className="bg-color-white">
            <a href="#how">How it works</a>
          </Button>
          <Button>
            <Link href="/application">Try Flippy.</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="border-b-4 border-black bg-cross-weave-white min-h-[80vh] flex items-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="max-w-3xl mx-auto px-6 text-center"
      >
        <div className="text-sm mb-3">Build focus.</div>
        <h1 className="text-6xl font-heading leading-tight">
          Your <span className="italic">tasks</span>.
          <span className="block">
            On <span className="italic">flipcards.</span>
          </span>
        </h1>
        <p className="mt-4 text-lg">
          Flippy is a minimalist to‑do app inspired by physical cards. Flip to
          complete task, focus only on what matters, and avoid clutter.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button className="text-md">
            <a href="#cta">Get started</a>
          </Button>
          <Button className="bg-secondary-background text-md">
            <a href="#how">See how it works</a>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

function Features() {
  return (
    <section className="py-24 bg-cross-weave-pink">
      <motion.section
        id="features"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ type: "spring", stiffness: 100, damping: 7 }}
        className="max-w-7xl mx-auto px-6"
      >
        <h2 className="text-4xl font-heading  mb-12">Designed for focus</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          <Feature
            title="Flipcard UI"
            desc="Every to‑do sits on its own bold card — flip it to ship it."
          />
          <Feature
            title="Blazing fast"
            desc="No bloat or distractions. Your tasks load instantly."
          />
          <Feature
            title="Hyper focus"
            desc="5 tasks everyday. Focus on what is important."
          />
        </div>
      </motion.section>
    </section>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-secondary-background border-2 border-border p-6 shadow-shadow">
      <h3 className="font-heading text-xl mb-2 ">{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

function HowItWorks() {
  return (
    <section className="border-y-4 border-black bg-cross-weave-white py-24">
      <motion.section
        id="how"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ type: "spring", stiffness: 100, damping: 7 }}
        className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center"
      >
        <div className="relative border-2 border-border shadow-shadow h-72 flex items-center justify-center font-bold">
          <Image src="/flippy-demo.png" alt="Demo" fill={true}></Image>
        </div>
        <div>
          <h2 className="text-4xl font-heading  mb-6">How Flippy works</h2>
          <ol className="space-y-3 text-lg">
            <li>1. Write your task on a card.</li>
            <li>2. Choose the priority.</li>
            <li>3. You have 5 tasks to complete every day.</li>
            <li>4. Swipe.</li>
          </ol>
        </div>
      </motion.section>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 text-center bg-cross-weave-pink">
      <motion.section
        id="cta"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ type: "spring", stiffness: 100, damping: 8 }}
      >
        <h2 className="text-5xl font-heading  mb-4">Stay focused.</h2>
        <p className="text-lg mb-6">Try the minimal to‑do experience today.</p>
        <Button className="text-md">
          <Link href="/application">Launch Flippy.</Link>
        </Button>
      </motion.section>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t-4 border-black py-10 bg-secondary-background">
      <div className="max-w-7xl mx-auto px-6 flex justify-between font-bold">
        <div>© {new Date().getFullYear()} Flippy</div>
        <div className="flex gap-6">
          <span>Privacy</span>
          <span>Terms</span>
        </div>
      </div>
    </footer>
  );
}
