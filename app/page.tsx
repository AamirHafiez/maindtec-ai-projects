import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/maindtec.png"
          alt="logo"
          width={500}
          height={38}
          priority
        />
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Checkout the Latest Projects Created.
          </li>
          <li className="tracking-[-.01em]">
            Chat with AI for your created files.
          </li>
        </ol>
        <div className="flex justify-center items-center self-center">
          <Button asChild>
            <Link href="/projects">See Projects</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
