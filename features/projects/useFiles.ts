import { useInfiniteQuery } from "@tanstack/react-query";
import projectQueryKeys from "./projectQueryKeys";
import ProjectModel from "@/data/models/ProjectModel";
import projectsNetworkAdapter from "./projectsNetworkAdapter";

export default function useFiles(options: { projectId: ProjectModel["id"] }) {
  const files = useInfiniteQuery({
    queryKey: projectQueryKeys.filesList({ projectId: options.projectId }),
    queryFn: async ({ pageParam }) =>
      projectsNetworkAdapter.getProjectFileList({
        projectId: options.projectId,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,
  });

  return { files };
}
