"use client";

import { useEffect, useState } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ToolForm from "@/components/admin/ToolForm";
import { getContentById } from "@/lib/admin-queries";
import type { Tool } from "@/lib/types";

export default function EditToolPage({ params }: { params: { id: string } }) {
  const [tool, setTool] = useState<Tool | null | undefined>(undefined);

  useEffect(() => {
    getContentById<Tool>("tools", params.id).then(setTool);
  }, [params.id]);

  if (tool === undefined) return <div className="p-8 text-sm text-muted">Loading...</div>;
  if (tool === null) return <div className="p-8 text-sm text-muted">Tool not found.</div>;

  return (
    <>
      <AdminPageHeader title="Edit Tool" description={tool.title} />
      <ToolForm toolId={params.id} initial={tool} />
    </>
  );
}
