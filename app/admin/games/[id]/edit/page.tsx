"use client";

import { useEffect, useState } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import GameForm from "@/components/admin/GameForm";
import { getContentById } from "@/lib/admin-queries";
import type { Game } from "@/lib/types";

export default function EditGamePage({ params }: { params: { id: string } }) {
  const [game, setGame] = useState<Game | null | undefined>(undefined);

  useEffect(() => {
    getContentById<Game>("games", params.id).then(setGame);
  }, [params.id]);

  if (game === undefined) return <div className="p-8 text-sm text-muted">Loading...</div>;
  if (game === null) return <div className="p-8 text-sm text-muted">Game not found.</div>;

  return (
    <>
      <AdminPageHeader title="Edit Game" description={game.title} />
      <GameForm gameId={params.id} initial={game} />
    </>
  );
}
