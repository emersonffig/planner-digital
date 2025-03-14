"use client";
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <Link href="/">Início</Link>
      <Link href="/tasks">Planejamento Diário</Link>
      <Link href="/calendar">Calendário</Link>
      <Link href="/goals">Metas</Link>
      <Link href="/reminders">Lembretes</Link>
    </nav>
  );
} 