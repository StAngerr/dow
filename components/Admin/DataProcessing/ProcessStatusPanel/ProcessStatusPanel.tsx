import React from "react";
import { Heading } from "../../../common/Heading/Heading";

export interface ProcessingStats {
  totalArticles: number;
  processedArticles: number;
}

interface Props {
  stats: ProcessingStats;
}

export const ProcessStatusPanel = ({ stats }: Props) => {
  const percentage = (stats.processedArticles * 100) / stats.totalArticles;
  return (
    <div className="absolute left-0 bg-bg2 text-center p-2 rounded-md shadow-md">
      <Heading className={"!text-xl"} level={"3"}>
        {`${percentage}%`}
      </Heading>
      <Heading className={"text-text"} level={"4"}>
        <span className={"text-xs "}>Processed / Total</span>
        {` ${stats.processedArticles}/${stats.totalArticles}`}
      </Heading>
    </div>
  );
};
