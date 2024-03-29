import React, { useMemo } from "react";
import { Article } from "../../../../types";
import classNames from "classnames";

interface Props {
  articles: Article[];
  selectedId?: string;
  handleRowSelected: (article: Article) => void;
}

const columns = [
  {
    label: "id",
  },
  {
    label: "Title",
  },
  {
    label: "Last update",
  },
];

const priorityColorMap: { [key: number]: string } = {
  5: "accent3",
  4: "accent2",
  3: "accent1",
};

export const ArticlesTable = ({
  articles,
  handleRowSelected,
  selectedId,
}: Props) => {
  const renderColumns = useMemo(() => {
    return columns.map((i) => (
      <th className="p-2 text-center font-bold  text-text" key={i.label}>
        {i.label}
      </th>
    ));
  }, []);

  const renderRows = useMemo(() => {
    return articles.map((a) => {
      const priorityColor: string = priorityColorMap[a.level];
      return (
        <tr
          onClick={() => handleRowSelected(a)}
          key={a.id}
          className={classNames(
            "cursor-pointer hover:bg-button-hoverLighten",
            selectedId === a.id && "bg-button-hoverLighten"
          )}
        >
          <td
            className={`p-2 border-l-4  border-${priorityColor} text-${priorityColor}`}
          >
            {a.id}
          </td>
          <td className="p-2">{a.title}</td>
          <td className="p-2">{"-"}</td>
        </tr>
      );
    });
  }, [articles, handleRowSelected, selectedId]);

  return (
    <div className="w-1/2 h-full">
      <div className="w-full overflow-y-scroll h-full">
        <table className="w-full table-auto mt-2.5">
          <thead>
            <tr className="text-left bg-accent1">{renderColumns}</tr>
          </thead>
          <tbody className={"bg-bg2"}>{renderRows}</tbody>
        </table>
      </div>
    </div>
  );
};
