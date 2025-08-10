import FilesSidebar from "@/app/projects/[projectid]/files/files-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

type Params = Promise<{
  projectid: string;
}>;

export default async function Files({ params }: { params: Params }) {
  const { projectid } = await params;
  return (
    <>
      <FilesSidebar projectId={projectid} />
      <SidebarTrigger className="pt-3" />
    </>
  );
}
