export type Profile = {
  id: string;
  name: string;
  email: string;
  username?: string;
  bio?: string;
  location?: string;
  website?: string;
  phone?: string;
  jobTitle?: string;
  company?: string;
  joinedDate?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    facebook?: string;
  };
};

export type Project = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};
export type FileItem = {
  id: string;
  name: string;
  sizeKb: number;
  type: string;
  createdAt: string;
};
export type ChatMessage = {
  id: string;
  sender: "user" | "ai";
  content: string;
  timestamp: string;
};
// Control variables for counts
const GENERATE_PROJECTS = true;
const GENERATE_FILES = true;
const GENERATE_CHATS = true;
const PROJECT_COUNT = 30;
const FILES_PER_PROJECT = 100;
const CHATS_PER_FILE = 100;

export const profile: Profile = {
  id: "user1",
  name: "Jane Doe",
  username: "janedoe",
  email: "jane.doe@example.com",
  bio: "Software engineer passionate about fintech and AI.",
  location: "San Francisco, CA",
  website: "https://janedoe.dev",
  phone: "+1 (555) 123-4567",
  jobTitle: "Senior Frontend Engineer",
  company: "Innovative Fintech Co.",
  joinedDate: "2022-04-15T10:00:00Z",
  socialLinks: {
    twitter: "https://twitter.com/janedoe",
    linkedin: "https://linkedin.com/in/janedoe",
    github: "https://github.com/janedoe",
  },
};
// Utility function for ISO dates offset by days
function isoDateOffset(daysAgo: number) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString();
}
// Generate projects
export const projects: Project[] = GENERATE_PROJECTS
  ? Array.from({ length: PROJECT_COUNT }).map((_, i) => ({
      id: `project${i + 1}`,
      name: `Project ${String.fromCharCode(65 + (i % 26))}${
        Math.floor(i / 26) + 1
      }`,
      description: `Overview for Project ${String.fromCharCode(65 + (i % 26))}${
        Math.floor(i / 26) + 1
      }.`,
      createdAt: isoDateOffset(365 - i * 3),
      updatedAt: isoDateOffset(i * 2),
    }))
  : [];
// File extensions/types to randomly assign
const fileTypes = ["js", "ts", "py", "md", "json", "css", "html"];
export const projectFiles: Record<string, FileItem[]> = {};
if (GENERATE_FILES) {
  for (let pIdx = 1; pIdx <= PROJECT_COUNT; pIdx++) {
    const files: FileItem[] = Array.from({ length: FILES_PER_PROJECT }).map(
      (_, fIdx) => {
        const ext = fileTypes[fIdx % fileTypes.length];
        return {
          id: `file-p${pIdx}-f${fIdx + 1}`,
          name: ext === "md" ? "README.md" : `file${fIdx + 1}.${ext}`,
          sizeKb: parseFloat((Math.random() * 50 + 1).toFixed(2)),
          type: ext,
          createdAt: isoDateOffset(300 - fIdx * 7),
        };
      }
    );
    projectFiles[`project${pIdx}`] = files;
  }
}
export const chats: Record<string, ChatMessage[]> = {};
const userMessages = [
  "Could you explain this file?",
  "What purpose does this file serve?",
  "Any dependencies to note?",
  "How is this file related to others?",
  "Is this the main entry point?",
  "Can you summarize this content?",
  "Are there any known bugs here?",
  "What technologies does this use?",
  "What coding style is applied?",
  "Is this file tested well?",
];
const aiReplies = [
  "This file contains core business logic.",
  "It's primarily responsible for data processing.",
  "No external dependencies required.",
  "It interacts closely with related helper files.",
  "Yes, this is the main app entry point.",
  "This file includes configuration settings.",
  "There are some edge cases to watch.",
  "Technologies used include React and Node.",
  "The code follows consistent style guidelines.",
  "Unit tests cover most important cases.",
];
if (GENERATE_CHATS && GENERATE_FILES) {
  for (let pIdx = 1; pIdx <= PROJECT_COUNT; pIdx++) {
    const files = projectFiles[`project${pIdx}`];
    files.forEach((file) => {
      const chatMsgs: ChatMessage[] = [];
      for (let i = 0; i < CHATS_PER_FILE; i++) {
        const isUser = i % 2 === 0;
        const message = {
          id: `chat-${file.id}-${i + 1}`,
          sender: isUser ? "user" : ("ai" as "user" | "ai"),
          content: isUser
            ? userMessages[i % userMessages.length]
            : aiReplies[i % aiReplies.length],
          timestamp: isoDateOffset(1 + i),
        };
        chatMsgs.unshift(message); // Prepend to have latest first
      }
      chats[file.id] = chatMsgs;
    });
  }
}
