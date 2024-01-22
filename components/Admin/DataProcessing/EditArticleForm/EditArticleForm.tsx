import { Field, Form, Formik } from "formik";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Article, ArticleDTO } from "../../../../types";
import { ToggleSwitch } from "../../../common/Switch";
import { Button } from "../../../common/Button/Button";
import { TagAddDialog } from "./TagAddDialog";
import { TagComp } from "../../../common/TagComp/TagComp";
import { Tag } from "../../../../types/tags";
import { updateArticle } from "../../../../api/articles/articles.api";

interface Props {
  article: Article | null;
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
  const [formState, setFormState] = useState<FormState | null>(null);
  const [editTagsOpened, setEditTagsOpened] = useState(false);

  const handleUpdateArticle = useCallback(() => {
    updateArticle({
      ...article,
      ...formState,
      tags: formState!.tags.map((i) => i.id) as string[],
    } as ArticleDTO);
  }, [formState, article]);

  const handleUpdateArticleTags = useCallback((tags: Tag[]) => {
    setEditTagsOpened(false);
    setFormState((prev) => ({ ...prev!, tags }));
  }, []);

  const handleDeleteTagFromArticle = useCallback(({ id }: Tag) => {
    setFormState((prev) => ({
      ...prev!,
      tags: prev!.tags.filter((i) => i.id !== id),
    }));
  }, []);

  useEffect(() => {
    if (!article) return;

    setFormState({
      title: article.title,
      level: article.level,
      source: article.source,
      url: article.url,
      visible: true,
      tags: article.tags,
    });
  }, [article]);

  if (!article || !formState) {
    return (
      <div className="w-1/2">
        <p>Select article to edit</p>
      </div>
    );
  }

  return (
    <div className="w-1/2">
      <Formik
        enableReinitialize
        initialValues={formState}
        onSubmit={handleUpdateArticle}
      >
        <Form className={"w-full h-full flex-col p-4"}>
          <label
            className={
              "flex w-full shadow-md bg-bg1 justify-center mb-2 p-2 rounded"
            }
          >
            <span className={"w-2/5 text-xl align-middle"}>Title</span>
            <Field
              as={"textarea"}
              rows={3}
              className={"border-2 w-full p-1 w-3/5"}
              type="text"
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
            <Field
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
            <Field
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
            <Field
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
            <Field
              name={"visible"}
              component={ToggleSwitch<Article>}
              label={"Visible"}
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
              {formState.tags.map((i) => (
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
        </Form>
      </Formik>
    </div>
  );
};
