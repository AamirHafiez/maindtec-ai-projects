"use client";

import { SidebarMenuButton as ComponentSidebarMenuButton } from "@/components/ui/sidebar";
import { FileItem } from "@/mock/data/datasource";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SideBarMenuButton(props: {
  name: string;
  href: string;
  fileId: FileItem["id"];
}) {
  const params = useParams();

  return (
    <ComponentSidebarMenuButton
      isActive={params.fileid === props.fileId}
      asChild
    >
      <Link href={props.href}>
        <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md transition-colors duration-200">
          <Image
            src="/file.svg"
            alt="File Icon"
            width={20}
            height={20}
            priority
          />
          <p>{props.name}</p>
        </div>
      </Link>
    </ComponentSidebarMenuButton>
  );
}
