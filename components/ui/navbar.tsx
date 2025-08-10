import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="flex justify-between px-6 py-4 bg-white shadow sticky top-0">
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/logo.jpeg"
          alt="Logo"
          width={40}
          height={40}
          className="mr-4"
          priority
        />
      </Link>
      <Link href="/profile">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
      </Link>
    </nav>
  );
}
