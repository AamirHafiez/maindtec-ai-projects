import type { ApiAdapterInstance } from "../adapters/types";
import ProfileModel, { ProfileSchema } from "../models/ProfileModel";
import ProjectModel, {
  ProjectModelListSchema,
  ProjectSchema,
} from "../models/ProjectModel";
import FileModel, { FileItem, FileModelSchema } from "../models/FileModel";
import ChatModel, {
  ChatPostModel,
  ChatPostSchema,
  ChatsModelSchema,
} from "../models/ChatModel";
import { schemaValidator } from "@/utils/schemaValidator";

const projectRepository = (apiAdapter: ApiAdapterInstance) => ({
  getProfile: () =>
    apiAdapter
      .get<ProfileModel>("/profile")
      .then((res) => schemaValidator(ProfileSchema, res.data)),
  getProjectList: () =>
    apiAdapter
      .get<ProjectModel[]>("/project/list")
      .then((res) => schemaValidator(ProjectModelListSchema, res.data)),
  getProjectById: (projectId: ProjectModel["id"]) =>
    apiAdapter
      .get<ProjectModel>(`/project/${projectId}`)
      .then((res) => schemaValidator(ProjectSchema, res.data)),
  getProjectFileList: (options: {
    projectId: ProjectModel["id"];
    page: number;
  }) =>
    apiAdapter
      .get<FileModel>(
        `/project/${options.projectId}/files/list?page=${options.page}&limit=30`
      )
      .then((res) => schemaValidator(FileModelSchema, res.data)),
  getFileChats: (options: { fileId: FileItem["id"]; page: number }) =>
    apiAdapter
      .get<ChatModel>(
        `files/chat/${options.fileId}?page=${options.page}&limit=10`
      )
      .then((res) => schemaValidator(ChatsModelSchema, res.data)),
  postChat: (options: { fileId: FileItem["id"]; content: string }) =>
    apiAdapter
      .post<ChatPostModel>(`/files/chat/${options.fileId}`, {
        content: options.content,
      })
      .then((res) => schemaValidator(ChatPostSchema, res.data)),
});

export default projectRepository;
