import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Article, ArticleDTO } from "../../../../types";
import { ToggleSwitch } from "../../../common/Switch";
import { Button } from "../../../common/Button/Button";
import { TagAddDialog } from "./TagAddDialog";
import { TagComp } from "../../../common/TagComp/TagComp";
import { Tag } from "../../../../types/tags";
import { updateArticle } from "../../../../api/articles/articles.api";
import { Controller, useForm } from "react-hook-form";

interface Props {
  article: Article;
}

interface FormState {
  title: string;
  level: number;
  source: string;
  url: string;
  visible: boolean;
  tags: Tag[];
}

export const EditArticleForm = ({ article }: Props) => {
  const [tags, setTags] = useState<Tag[]>(article.tags);
  const { handleSubmit, register, reset, control } = useForm<FormState>({
    defaultValues: {
      title: article.title,
      level: article.level,
      source: article.source,
      url: article.url,
      visible: article.visible,
      tags: article.tags,
    },
  });
  const [editTagsOpened, setEditTagsOpened] = useState(false);

  const handleUpdateArticle = useCallback(
    (fState: FormState) => updateArticle({ ...article, ...fState, tags }),
    [article, tags]
  );

  const handleUpdateArticleTags = useCallback((tags: Tag[]) => {
    setEditTagsOpened(false);
    setTags(tags);
  }, []);

  const handleDeleteTagFromArticle = useCallback(
    ({ id }: Tag) => setTags((prev) => prev.filter((i: Tag) => i.id !== id)),
    []
  );

  useEffect(() => {
    // Reset the form with new data when formData changes
    const { title, level, source, url, visible, tags } = article;
    reset({
      title,
      level,
      source,
      url,
      visible,
      tags,
    });
    setTags(article.tags);
  }, [article, reset]);

  if (!article) {
    return (
      <div className="w-1/2">
        <p>Select article to edit</p>
      </div>
    );
  }

  return (
    <div className="w-1/2">
      <form
        className={"w-full h-full flex-col p-4"}
        onSubmit={handleSubmit(handleUpdateArticle)}
      >
        <label
          className={
            "flex w-full shadow-md bg-bg1 justify-center mb-2 p-2 rounded"
          }
        >
          <span className={"w-2/5 text-xl align-middle"}>Title</span>
          <input
            {...register("title")}
            type={"textarea"}
            rows={"3"}
            className={"border-2 w-full p-1 w-3/5"}
            name="title"
            disabled
          />
        </label>
        <label
          className={
            "flex w-full shadow-md bg-bg1 justify-center mb-2 p-2 rounded"
          }
        >
          <span className={"w-2/5 text-xl align-middle"}>Importance</span>
          <input
            {...register("level")}
            type={"number"}
            name={"level"}
            className={"border-2 w-full p-1 w-3/5"}
            disabled
          />
        </label>
        <label
          className={
            "flex w-full shadow-md bg-bg1 justify-center mb-2 p-2 rounded"
          }
        >
          <span className={"w-2/5 text-xl align-middle"}>Source</span>
          <input
            {...register("source")}
            className={"border-2 w-full p-1 w-3/5"}
            type="text"
            name="source"
            disabled
          />
        </label>

        <label
          className={
            "flex w-full shadow-md bg-bg1 justify-center mb-2 p-2 rounded"
          }
        >
          <span className={"w-2/5 text-xl align-middle"}>Url</span>
          <input
            {...register("url")}
            className={"border-2 w-full p-1 w-3/5"}
            type="text"
            name="url"
            disabled
          />
        </label>
        <label
          className={
            "flex w-fit shadow-md bg-bg1 justify-center mb-2 p-2 rounded"
          }
        >
          <span className={"w-2/5 text-xl align-middle  mr-4 "}>Visible</span>
          <Controller
            name="visible"
            control={control}
            render={({ field }) => (
              <ToggleSwitch value={field.value} onChange={field.onChange} />
            )}
          />
        </label>
        <div
          className={
            "flex w-full flex-col shadow-md bg-bg1 justify-center mb-2 p-2 rounded"
          }
        >
          <span className={"w-2/5 text-xl align-middle  mr-4 "}>Tags</span>
          {editTagsOpened ? (
            <TagAddDialog
              handleSave={handleUpdateArticleTags}
              currentTags={article.tags}
              handleClose={() => setEditTagsOpened(false)}
            />
          ) : null}
          <div className={"p-2 flex-nowrap mb-4"}>
            {tags.map((i) => (
              <TagComp
                key={i.id}
                tag={i}
                onDeleteTag={handleDeleteTagFromArticle}
              />
            ))}
          </div>

          <Button
            className={"m-auto"}
            color={"secondary"}
            type={"button"}
            onClick={() => setEditTagsOpened(true)}
          >
            Edit
          </Button>
        </div>
        <Button color={"primary"} type={"submit"}>
          Save
        </Button>
      </form>
    </div>
  );
};
