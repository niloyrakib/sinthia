"use client";

import { useEffect, useState } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import PostForm from "@/components/admin/PostForm";
import { getContentById } from "@/lib/admin-queries";
import type { Post } from "@/lib/types";

export default function EditPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null | undefined>(undefined);

  useEffect(() => {
    getContentById<Post>("posts", params.id).then(setPost);
  }, [params.id]);

  if (post === undefined) return <div className="p-8 text-sm text-muted">Loading...</div>;
  if (post === null) return <div className="p-8 text-sm text-muted">Post not found.</div>;

  return (
    <>
      <AdminPageHeader title="Edit Post" description={post.title} />
      <PostForm postId={params.id} initial={post} />
    </>
  );
}
