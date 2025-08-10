"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import useAiChats from "@/features/projects/useAiChats";
import { FileItem } from "@/mock/data/datasource";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import ChatItem from "@/components/ui/chat-item";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface FormElements extends HTMLFormControlsCollection {
  chatInput: HTMLTextAreaElement;
}
interface ChatFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function ChatsOverview() {
  const params = useParams<{ fileid: FileItem["id"] }>();

  const { chatList, postChat } = useAiChats({ fileid: params.fileid });

  const chats = useMemo(() => {
    return chatList.data?.pages == null
      ? []
      : chatList.data.pages
          .flat()
          .map((item) => item?.chats.flat())
          .filter((item) => item != null)
          .flat();
  }, [chatList.data?.pages]);

  function handleSubmit(event: React.FormEvent<ChatFormElement>) {
    event.preventDefault();
    const value = event.currentTarget.elements.chatInput.value;
    if (value.trim() === "") return;
    event.currentTarget.elements.chatInput.value = "";
    postChat.mutate(value);
  }

  if (chatList.isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
  }
  if (chatList.isError) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Error loading chats: {chatList.error.message}</p>
      </div>
    );
  }
  if (chatList.data?.pages == null || chatList.data.pages.length === 0) {
    return null;
  }

  const hasMore = chatList.data.pages[chatList.data.pages.length - 1].hasMore;

  return (
    <>
      <div
        id="scrollableDiv"
        className="h-full overflow-y-auto flex flex-col-reverse"
      >
        <InfiniteScroll
          dataLength={chats.length}
          next={chatList.fetchNextPage}
          className="flex flex-col-reverse p-4"
          inverse={true}
          hasMore={hasMore}
          loader={<h4 className="text-center">Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          {chats.map((chat) => (
            <ChatItem key={chat.id} data={chat} />
          ))}
          {!hasMore && (
            <>
              <br />
              <br />
              <hr />
              <p className="text-center text-xs text-gray-500">Chat Start</p>
              <br />
              <br />
            </>
          )}
        </InfiniteScroll>
      </div>

      <form
        className="w-full h-1/6 flex items-center p-4 gap-3 shadow-2xl"
        style={{ height: 100 }}
        onSubmit={handleSubmit}
      >
        <AutosizeTextarea
          id="chatInput"
          placeholder="Start typing..."
          maxHeight={120}
          minHeight={30}
        />
        <Button type="submit">Send</Button>
      </form>
    </>
  );
}
