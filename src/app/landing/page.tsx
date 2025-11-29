"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function FlippyLanding() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
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
        <div className="bg-main text-main-foreground px-4 py-1  font-heading tracking-tight text-5xl">
          Flippy.
        </div>
        <nav className="hidden sm:flex gap-6 font-bold">
          <Button>
            <a href="#features">Features</a>
          </Button>
          <Button>
            <a href="#how">How it works</a>
          </Button>
          <a
            href="#cta"
            className="border-2 border-border px-4 py-2 bg-main text-main-foreground shadow-shadow hover:translate-x-[--spacing-reverseBoxShadowX] hover:translate-y-[--spacing-reverseBoxShadowY] transition"
          >
            Try Flippy
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-b-4 border-black bg-secondary-background"
    >
      <div className="max-w-7xl mx-auto px-6 py-24 grid gap-12 lg:grid-cols-2 items-center">
        <div>
          <h1 className="text-6xl font-heading  leading-tight">
            Your tasks.
            <span className="block">On flipcards.</span>
          </h1>
          <p className="mt-4 text-lg max-w-xl">
            Flippy is a minimalist to‑do app inspired by physical cards. Flip to
            reveal details, focus only on what matters, and avoid clutter.
          </p>
          <div className="mt-6 flex gap-4">
            <Button>
              <a href="#cta">Get started</a>
            </Button>
            <a
              href="#how"
              className="border-2 border-border px-6 py-3 bg-secondary-background shadow-shadow hover:translate-x-[--spacing-reverseBoxShadowX] hover:translate-y-[--spacing-reverseBoxShadowY] transition"
            >
              See how it works
            </a>
          </div>
        </div>

        <div className="border-2 border-border bg-secondary-background h-80 flex items-center justify-center shadow-shadow text-xl font-bold">
          App preview
        </div>
      </div>
    </motion.section>
  );
}

function Features() {
  return (
    <motion.section
      id="features"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-24"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-heading  mb-12">Designed for focus</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          <Feature
            title="Flipcard UI"
            desc="Every to‑do sits on its own bold card — flip it for details only when needed."
          />
          <Feature
            title="Blazing fast"
            desc="No bloat or distractions. Your tasks load instantly."
          />
          <Feature
            title="Private by default"
            desc="Your data never leaves your device without permission."
          />
        </div>
      </div>
    </motion.section>
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
    <motion.section
      id="how"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-y-4 border-black bg-secondary-background py-24"
    >
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="border-2 border-border bg-secondary-background shadow-shadow h-72 flex items-center justify-center font-bold">
          Flip demo
        </div>
        <div>
          <h2 className="text-4xl font-heading  mb-6">How Flippy works</h2>
          <ol className="space-y-3 text-lg">
            <li>1. Write your task on a card.</li>
            <li>2. Tap to flip and add details.</li>
            <li>3. Complete it. Clear it. Repeat.</li>
          </ol>
        </div>
      </div>
    </motion.section>
  );
}

function CTA() {
  return (
    <motion.section
      id="cta"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-24 text-center"
    >
      <h2 className="text-5xl font-heading  mb-4">Stay focused.</h2>
      <p className="text-lg mb-6">Try the minimal to‑do experience today.</p>
      <a
        href="#"
        className="inline-block border-2 border-border px-10 py-4 bg-main text-main-foreground shadow-shadow hover:translate-x-[--spacing-reverseBoxShadowX] hover:translate-y-[--spacing-reverseBoxShadowY] transition text-lg"
      >
        Launch Flippy
      </a>
    </motion.section>
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
