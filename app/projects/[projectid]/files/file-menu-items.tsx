"use client";

import { SidebarMenuItem, SidebarMenuSkeleton } from "@/components/ui/sidebar";
import React, { useMemo } from "react";
import SideBarMenuButton from "./side-bar-menu-button";
import useFiles from "@/features/projects/useFiles";
import ProjectModel from "@/data/models/ProjectModel";
import InfiniteScroll from "react-infinite-scroll-component";

type FileMenuItemsProps = {
  projectId: ProjectModel["id"];
};

export default function FileMenuItems(props: FileMenuItemsProps) {
  const { files } = useFiles({ projectId: props.projectId });

  const filesData = useMemo(() => {
    return files.data?.pages == null
      ? []
      : files.data.pages
          .flat()
          .map((item) => item?.files.flat())
          .filter((item) => item != null)
          .flat();
  }, [files.data?.pages]);

  if (files.isLoading) {
    return (
      <>
        {Array.from({ length: 5 }).map((_, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuSkeleton />
          </SidebarMenuItem>
        ))}
      </>
    );
  }
  return (
    <InfiniteScroll
      dataLength={filesData.length}
      next={files.fetchNextPage}
      hasMore={files.hasNextPage}
      loader={<h4 className="text-center">Loading...</h4>}
      className="flex flex-col space-y-2"
    >
      {filesData.map((item) => (
        <SidebarMenuItem key={item.id}>
          <SideBarMenuButton
            href={`/projects/${props.projectId}/files/${item.id}`}
            name={item.name}
            fileId={item.id}
          />
        </SidebarMenuItem>
      ))}
    </InfiniteScroll>
  );
}
