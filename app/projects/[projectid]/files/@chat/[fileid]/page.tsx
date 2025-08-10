import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Button } from "@/components/ui/button";
import projectsNetworkAdapter from "@/features/projects/projectsNetworkAdapter";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ChatsOverview from "./ChatsOverview";
import projectQueryKeys from "@/features/projects/projectQueryKeys";

type Params = Promise<{
  fileid: string;
}>;

export default async function ChatContainer({ params }: { params: Params }) {
  const { fileid } = await params;

  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: projectQueryKeys.chatList({ fileId: fileid }),
    queryFn: () =>
      projectsNetworkAdapter.getFileChats({
        fileId: fileid,
        page: 1,
      }),
  });

  return (
    <div className="h-full w-full flex flex-col">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ChatsOverview />
      </HydrationBoundary>
    </div>
  );
}
