"use client";

import type { Wow } from "@/lib/types";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import Image from "next/image";

const Wow = ({ wow }: { wow: Wow }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      <div className="flex flex-row justify-between gap-4 w-full">
        <Image
          src={wow.poster}
          alt={wow.movie}
          className="rounded-lg w-96"
          width={400}
          height={600}
        />
        <div className="flex flex-col items-start justify-center gap-4 w-full">
          <h3 className="text-xl font-bold">Title: {wow.movie}</h3>
          <p className="text-lg">Duration: {wow.movie_duration}</p>
          <p className="text-lg">Year: {wow.year}</p>
          <p className="text-lg">Full wow line: {wow.full_line}</p>
          <p className="text-lg">Character saying wow: {wow.character}</p>
          <p className="text-lg">Movie director: {wow.director}</p>
          <p className="text-lg">Release date: {wow.release_date}</p>
          <p className="text-lg">Wow timestamp: {wow.timestamp}</p>
          <div className="flex flex-row items-center justify-start gap-4">
            <p className="text-lg">Wow count: {wow.current_wow_in_movie}</p>
            <p className="text-lg">Total wows: {wow.total_wows_in_movie}</p>
          </div>
          <div className="flex flex-row items-center justify-start gap-4">
            <p className="text-lg">Audio: </p>
            <audio controls>
              <source src={wow.audio} type="audio/mpeg" />
              Your browser does not support the audio tag.
            </audio>
          </div>
        </div>
      </div>

      <video controls>
        <source src={wow.video["1080p"]} type="video/mp4" width={400} />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export const WowsVisualizer = ({
  wows,
  title,
}: {
  wows: Wow[];
  title: string;
}) => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <DisclosureButton className="border-2 border-gray-300 rounded-lg p-4 w-full flex items-start justify-between gap-4">
            <h2 className="text-2xl font-bold">{title}</h2>
            {open ? (
              <ChevronUpIcon className="w-6 h-6" />
            ) : (
              <ChevronDownIcon className="w-6 h-6" />
            )}
          </DisclosureButton>

          <DisclosurePanel className="flex flex-col items-center justify-center gap-4 w-full">
            {wows.map((wow) => (
              <Wow key={wow.movie} wow={wow} />
            ))}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};
