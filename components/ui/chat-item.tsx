import { ChatMessage } from "@/data/models/ChatModel";
import { selectChatClass } from "@/utils/chatutils";
import React from "react";

type ChatItemProps = {
  data: ChatMessage;
};

export default function ChatItem(props: ChatItemProps) {
  const { data } = props;

  return (
    <div
      className={`flex gap-2 mb-4 w-full md:w-3/4 shadow border-1 rounded-3xl p-4 ${selectChatClass(
        data.sender,
        {
          ai: "self-start",
          user: "self-end",
        }
      )}`}
    >
      <div
        className={`w-8 h-8 rounded-full  ${selectChatClass(data.sender, {
          ai: "bg-primary",
          user: "bg-chart-3",
        })}
         flex items-center justify-center text-white`}
      >
        {data.sender === "user" ? "U" : "A"}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold">{data.sender}</span>
        <p className="text-gray-700">{data.content}</p>
        <span className="text-xs text-gray-500 mt-2">{data.timestamp}</span>
      </div>
    </div>
  );
}
