import AdminPageHeader from "@/components/admin/AdminPageHeader";
import PostForm from "@/components/admin/PostForm";

export default function NewPostPage() {
  return (
    <>
      <AdminPageHeader title="New Post" />
      <PostForm />
    </>
  );
}
