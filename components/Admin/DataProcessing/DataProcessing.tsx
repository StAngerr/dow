import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Heading } from "../../common/Heading/Heading";
import { useAtom } from "jotai";
import { articlesAtom } from "../../../atoms/articles.atom";
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
  const [days] = useAtom(articlesAtom);
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentDate, setCurrentDate] = useState(days[days.length - 1]);
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
      processedArticles: articles.filter(
        (i: Article) => i.config && i.config.lastUpdate
      ).length,
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
          articles={articles}
          handleRowSelected={setSelectedArticle}
        />
        <EditArticleForm article={selectedArticle} />
      </div>
    </div>
  );
};
