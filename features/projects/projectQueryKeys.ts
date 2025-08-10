import ProjectModel from "@/data/models/ProjectModel";
import { FileItem } from "@/mock/data/datasource";

const projectQueryKeys = Object.freeze({
  scope: [{ scope: "project" }] as const,
  chatList: (options: { fileId: FileItem["id"] }) =>
    [{ ...projectQueryKeys.scope[0], type: "chat-list", ...options }] as const,
  postMessage: (options: { fileId: FileItem["id"] }) =>
    [
      { ...projectQueryKeys.scope[0], type: "post-message", ...options },
    ] as const,
  filesList: (options: { projectId: ProjectModel["id"] }) =>
    [{ ...projectQueryKeys.scope[0], type: "files-list", ...options }] as const,
});

export default projectQueryKeys;
