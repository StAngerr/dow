import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Heading } from "../../common/Heading/Heading";
import { useAtom } from "jotai";
import { daysAtom } from "../../../atoms/daysAtom";
import { addDays, format, subDays } from "date-fns";
import { DEFAULT_DATE_FORMAT } from "../../../constants";
import { getArticlesByDate } from "../../../api/articles/articles.api";
import { ArticlesTable } from "./ArticlesTable/ArticlesTable";
import { EditArticleForm } from "./EditArticleForm/EditArticleForm";
import {
  ProcessingStats,
  ProcessStatusPanel,
} from "./ProcessStatusPanel/ProcessStatusPanel";
import { Article } from "../../../types";

interface Props {}

export const DataProcessing = () => {
  const [days] = useAtom(daysAtom);
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentDate, setCurrentDate] = useState(
    format(new Date(), DEFAULT_DATE_FORMAT)
  );
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  //TODO: add min first day of war
  const goBackwards = useCallback(() => {
    const date = new Date(currentDate);
    const prevDay = subDays(date, 1);
    setCurrentDate(format(prevDay, DEFAULT_DATE_FORMAT));
    setArticles([]);
  }, [currentDate]);
  //TODO: add max day today
  const goForward = useCallback(() => {
    const date = new Date(currentDate);
    const prevDay = addDays(date, 1);
    setCurrentDate(format(prevDay, DEFAULT_DATE_FORMAT));
    setArticles([]);
  }, [currentDate]);

  const stats: ProcessingStats = useMemo(() => {
    return {
      // TODO: fix statistics
      processedArticles: 0,
      // articles.filter(
      //   (i: Article) => i.config && i.config.lastUpdate
      // ).length,
      totalArticles: articles.length,
    };
  }, [articles]);

  useEffect(() => {
    if (days.includes(currentDate)) {
      getArticlesByDate(currentDate).then((data: Article[]) =>
        setArticles(data)
      );
    }
  }, [currentDate, days]);

  useEffect(() => {
    setCurrentDate(days[days.length - 1]);
  }, [days]);

  return (
    <div className="flex h-full flex-col">
      <div
        className={
          "mt-4 relative flex justify-center items-center border-y-2 py-5"
        }
      >
        <ProcessStatusPanel stats={stats} />
        <button className={"text-3xl"} onClick={goBackwards}>
          {"<"}
        </button>
        <Heading className={"mx-10"} level={"2"}>
          {currentDate}
        </Heading>
        <button className={"text-3xl"} onClick={goForward}>
          {">"}
        </button>
      </div>

      <div className={"flex grow overflow-y-hidden"}>
        <ArticlesTable
          selectedId={selectedArticle?.id}
          articles={articles}
          handleRowSelected={setSelectedArticle}
        />
        {selectedArticle && <EditArticleForm article={selectedArticle} />}
      </div>
    </div>
  );
};
