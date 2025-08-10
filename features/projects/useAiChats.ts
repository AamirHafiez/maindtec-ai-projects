import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
} from "@tanstack/react-query";
import projectQueryKeys from "./projectQueryKeys";
import projectsNetworkAdapter from "./projectsNetworkAdapter";
import { FileItem } from "@/mock/data/datasource";
import { browserQueryClient } from "@/providers/providers";
import ChatModel from "@/data/models/ChatModel";

export default function useAiChats(options: { fileid: FileItem["id"] }) {
  const chatList = useInfiniteQuery({
    queryKey: projectQueryKeys.chatList({ fileId: options.fileid }),
    queryFn: async ({ pageParam }) =>
      projectsNetworkAdapter.getFileChats({
        fileId: options.fileid,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,
  });

  const postChat = useMutation({
    mutationKey: projectQueryKeys.chatList({ fileId: options.fileid }),
    mutationFn: (content: string) =>
      projectsNetworkAdapter.postChat({
        fileId: options.fileid,
        content,
      }),
    onMutate: async (newChats) => {
      if (!browserQueryClient) return;

      await browserQueryClient.cancelQueries({
        queryKey: projectQueryKeys.chatList({ fileId: options.fileid }),
      });

      const previousData = browserQueryClient.getQueryData<
        InfiniteData<ChatModel>
      >(projectQueryKeys.chatList({ fileId: options.fileid }));

      if (previousData) {
        const newData: InfiniteData<ChatModel> = {
          ...previousData,
          pages: previousData.pages.map((page, idx) => {
            if (idx === 0) {
              return {
                ...page,
                chats: [
                  {
                    content: newChats,
                    sender: "user",
                    id: Date.now().toString(),
                    timestamp: new Date().toISOString(),
                  },
                  ...page.chats,
                ],
              };
            }
            return page;
          }),
        };

        browserQueryClient.setQueryData(
          projectQueryKeys.chatList({ fileId: options.fileid }),
          newData
        );
      }
      return { previousData };
    },
    onError: (err, newChats, context) => {
      if (context?.previousData && browserQueryClient) {
        browserQueryClient.setQueryData(
          projectQueryKeys.chatList({ fileId: options.fileid }),
          context.previousData
        );
      }
    },
    onSuccess: () => {
      if (browserQueryClient) {
        browserQueryClient.invalidateQueries({
          queryKey: projectQueryKeys.chatList({ fileId: options.fileid }),
        });
      }
    },
  });

  return {
    chatList,
    postChat,
  };
}
