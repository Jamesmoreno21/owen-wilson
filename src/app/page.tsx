import Image from "next/image";
import owenWilson from "../../public/owen-wilson.webp";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/16/solid";

interface LinkCardProps {
  href: string;
  title: string;
  description: string;
}

const LinkCard = ({ href, title, description }: LinkCardProps) => {
  return (
    <Link
      href={href}
      className="flex flex-col items-start w-full justify-center rounded-lg p-4 bg-white hover:bg-gray-200  shadow-lg"
    >
      <div className="flex flex-row items-center justify-between w-full gap-4">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="mt-3 text-lg">{description}</p>
        </div>
        <PlusIcon className="size-10 text-gray-500" />
      </div>
    </Link>
  );
};

export default function Home() {
  const linksInfo = [
    {
      href: "/movies",
      title: "Movies",
      description: "Check out the movies that Owen Wilson has said wow in.",
    },
    {
      href: "/directors",
      title: "Directors",
      description:
        "Check out the directors that have directed Owen Wilson movies where he says wow.",
    },
    {
      href: "/extra-info",
      title: "Extra Information",
      description:
        "Check out the longest movie, the first and last wow and which is the median wow.",
    },
  ];

  return (
    <div className="flex flex-row w-full justify-between px-40 gap-4 flex-wrap ">
      <div className="flex flex-col grow justify-center items-center w-full">
        <Image
          src={owenWilson}
          alt="Owen Wilson"
          className="rounded-lg min-w-96"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold">Owen Wilson</h1>
          <p className="mt-3 text-2xl">Saying wow</p>
        </div>
        {linksInfo.map((linkInfo) => (
          <LinkCard
            key={linkInfo.title}
            href={linkInfo.href}
            title={linkInfo.title}
            description={linkInfo.description}
          />
        ))}
      </div>
    </div>
  );
}
