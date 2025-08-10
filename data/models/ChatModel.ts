import { z } from "zod";

export const ChatMessageSchema = z.object({
  id: z.string(),
  sender: z.enum(["user", "ai"]),
  content: z.string(),
  timestamp: z.string(),
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export const ChatMessagesArraySchema = z.array(ChatMessageSchema);

export const ChatsModelSchema = z.object({
  page: z.number(),
  total: z.number(),
  limit: z.number(),
  hasMore: z.boolean(),
  chats: ChatMessagesArraySchema,
});

type ChatModel = z.infer<typeof ChatsModelSchema>;

export const ChatPostSchema = z.object({
  messages: z.array(ChatMessageSchema),
});

export type ChatPostModel = z.infer<typeof ChatPostSchema>;

export default ChatModel;
