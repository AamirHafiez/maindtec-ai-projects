import { ChatMessage } from "@/mock/data/datasource";

interface ClassSelector {
  user: string;
  ai: string;
}

export function selectChatClass(
  sender: ChatMessage["sender"],
  classes: ClassSelector
): string {
  return classes[sender];
}
