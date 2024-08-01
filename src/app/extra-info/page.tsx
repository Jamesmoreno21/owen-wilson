import { WowsVisualizer } from "@/components/WowVisualizer";
import { getAllWows } from "@/lib/queries";
import { Wow } from "@/lib/types";

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

const sortWowsByReleaseDate = (wows: Wow[]) => {
  return wows.sort((a, b) => {
    return (
      new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
    );
  });
};

const sortWowsByTimestamp = (wows: Wow[]) => {
  return wows.sort((a, b) => parseDurationToSeconds(a.timestamp) - parseDurationToSeconds(b.timestamp));
}

const getMedianWows = (wows: Wow[]) => {
  const sortedWows = sortWowsByReleaseDate(wows);
  const medianWows = [];
  if (sortedWows.length % 2 === 0) {
    medianWows.push(sortedWows[sortedWows.length / 2 - 1]);
    medianWows.push(sortedWows[sortedWows.length / 2]);
  } else {
    medianWows.push(sortedWows[Math.floor(sortedWows.length / 2)]);
  }
  return medianWows;
};

const getMovieWows = (wows: Wow[], movie: string) => {
  return wows.filter((wow) => wow.movie === movie);
}

const getFirstAndLastWows = (wows: Wow[]) => {
  const sortedWows = sortWowsByReleaseDate(wows);
  const firstMovie = sortedWows[0].movie
  const lastMovie = sortedWows[sortedWows.length - 1].movie
  const firstMovieWows = getMovieWows(wows, firstMovie)
  const lastMovieWows = getMovieWows(wows, lastMovie)
  const firstWow = sortWowsByTimestamp(firstMovieWows)[0]
  const lastWow = sortWowsByTimestamp(lastMovieWows)[lastMovieWows.length - 1]
  return [firstWow, lastWow]
};

const getLongerMovieWow = (wows: Wow[]) => {
  const sortedWows = sortWowsByDuration(wows);
  return sortedWows[sortedWows.length - 1];
};

export default async function ExtraInfoPage() {
  const wows = await getAllWows();
  const medianWows = getMedianWows(wows);
  const firstAndLasWows = getFirstAndLastWows(wows);
  const longestMovieWow = getLongerMovieWow(wows);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-2 ">
      <h1 className="text-4xl font-bold">Extra Information</h1>
      <div className="flex flex-col items-center justify-center gap-4 w-full my-4">
        <WowsVisualizer wows={[longestMovieWow]} title="Longest Movie" />
        <WowsVisualizer
          wows={firstAndLasWows}
          title="First and Last Wow respectively"
        />
        <WowsVisualizer wows={medianWows} title="Median Wows" />
      </div>
    </div>
  );
}
