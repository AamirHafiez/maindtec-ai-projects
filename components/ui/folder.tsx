"use client";

import Image from "next/image";
import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";

type FolderProps = {
  data: {
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
  onClick?: () => void;
};

function Folder(props: FolderProps) {
  const { data, onClick } = props;
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div
          onClick={onClick}
          className="flex flex-col items-center justify-center p-4 border rounded-lg shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
        >
          <Image
            src={"/folder.svg"}
            alt="Folder Icon"
            width={100}
            height={100}
            priority
          />
          <p className="text-center">{data.name}</p>
        </div>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-col">
          <p className="font-semibold text-bra">{data.name}</p>
          <p className="text-sm text-gray-500">{data.description}</p>
          <p className="text-xs text-gray-400">
            Created at: {new Date(data.createdAt).toLocaleDateString()}
          </p>
          <p className="text-xs text-gray-400">
            Updated at: {new Date(data.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default Folder;
