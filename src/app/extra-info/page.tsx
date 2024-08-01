import { WowsVisualizer } from "@/components/WowVisualizer";
import { getAllWows } from "@/lib/queries";
import { Wow } from "@/lib/types";

export const runtime = 'edge';

const parseDurationToSeconds = (duration: string) => {
  // Duration format is HH:MM:SS
  const durationArray = duration.split(":");
  return (
    parseInt(durationArray[0]) * 3600 +
    parseInt(durationArray[1]) * 60 +
    parseInt(durationArray[2])
  );
};

const sortWowsByDuration = (wows: Wow[]) => {
  return wows.sort((a, b) => {
    return (
      parseDurationToSeconds(a.movie_duration) -
      parseDurationToSeconds(b.movie_duration)
    );
  });
};

const sortWowsByReleaseDateAndCurrentWow = (wows: Wow[]) => {
  return wows.sort((a, b) => {
    if (a.release_date === b.release_date) {
      return a.current_wow_in_movie - b.current_wow_in_movie;
    }
    return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
  });
};

const getMedianWows = (wows: Wow[]) => {
  const sortedWows = sortWowsByReleaseDateAndCurrentWow(wows);
  const medianWows = [];
  if (sortedWows.length % 2 === 0) {
    medianWows.push(sortedWows[sortedWows.length / 2 - 1]);
    medianWows.push(sortedWows[sortedWows.length / 2]);
  } else {
    medianWows.push(sortedWows[Math.floor(sortedWows.length / 2)]);
  }
  return medianWows;
};

export default async function ExtraInfoPage() {
  const wows = await getAllWows();
  const medianWows = getMedianWows(wows);
  const sortedWowsByYearAndCurrentWow = sortWowsByReleaseDateAndCurrentWow(wows);
  const firstWow = sortedWowsByYearAndCurrentWow[0];
  const lastWow = sortedWowsByYearAndCurrentWow[sortedWowsByYearAndCurrentWow.length - 1];
  const sortedWowsByDuration = sortWowsByDuration(wows);
  const longerMovieWow = sortedWowsByDuration[sortedWowsByDuration.length - 1];

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-2 ">
      <h1 className="text-4xl font-bold">Extra Information</h1>
      <div className="flex flex-col items-center justify-center gap-4 w-full my-4">
        <WowsVisualizer wows={[longerMovieWow]} title="Longest Movie" />
        <WowsVisualizer wows={[firstWow, lastWow]} title="First and Last Wow respectively" />
        <WowsVisualizer wows={medianWows} title="Median Wows" />
      </div>
    </div>
  );
}
