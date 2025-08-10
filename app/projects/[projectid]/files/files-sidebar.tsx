import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import ProjectModel from "@/data/models/ProjectModel";
import Link from "next/link";
import Image from "next/image";
import FileMenuItems from "./file-menu-items";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import projectQueryKeys from "@/features/projects/projectQueryKeys";
import projectsNetworkAdapter from "@/features/projects/projectsNetworkAdapter";

type FilesSidebarProps = {
  // data: FileModel;
  projectId: ProjectModel["id"];
};

export default function FilesSidebar(props: FilesSidebarProps) {
  const { projectId } = props;

  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: projectQueryKeys.filesList({ projectId: props.projectId }),
    queryFn: () =>
      projectsNetworkAdapter.getProjectFileList({
        projectId: projectId,
        page: 1,
      }),
  });

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex items-center px-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.jpeg"
              alt="Logo"
              width={40}
              height={40}
              className="mr-4"
              priority
            />
            <h1 className="text-2xl font-bold p-3">Your Files</h1>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="cursor-pointer">
              <HydrationBoundary state={dehydrate(queryClient)}>
                <FileMenuItems projectId={projectId} />
              </HydrationBoundary>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
