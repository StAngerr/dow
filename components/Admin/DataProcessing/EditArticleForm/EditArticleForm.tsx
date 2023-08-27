import { Field, Form, Formik } from "formik";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Article } from "../../../../types";
import { ToggleSwitch } from "../../../common/Switch";
import { Button } from "../../../common/Button/Button";
import { TagAddDialog } from "./TagAddDialog";
import { TagComp } from "../../../common/TagComp/TagComp";

interface Props {
  article: Article | null;
}

export const EditArticleForm = ({ article }: Props) => {
  const [initialValues, setInitialValues] = useState<null>(null);
  const [editTagsOpened, setEditTagsOpened] = useState(false);

  const handleUpdateArticle = useCallback(() => {
    console.log();
  }, []);

  useEffect(() => {
    setInitialValues({
      title: article?.title,
      level: article?.level,
      source: article?.source,
      url: article?.url,
      visible: true,
    });
  }, [article]);
  console.log(initialValues);
  return (
    <div className="w-1/2">
      {!article || !initialValues ? (
        <p>Select article to edit</p>
      ) : (
        <Formik
          enableReinitialize
          initialValues={initialValues}
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
              <span className={"w-2/5 text-xl align-middle  mr-4 "}>
                Visible
              </span>
              <Field
                name={"visible"}
                component={ToggleSwitch}
                label={"Visible"}
              />
            </label>

            <label
              className={
                "flex w-full flex-col shadow-md bg-bg1 justify-center mb-2 p-2 rounded"
              }
            >
              <span className={"w-2/5 text-xl align-middle  mr-4 "}>Tags</span>
              {editTagsOpened ? (
                <TagAddDialog
                  handleSave={console.log}
                  currentTags={[
                    { id: "1", label: "test" },
                    { id: "2", label: "suppepr dupper" },
                  ]}
                  handleClose={() => setEditTagsOpened(false)}
                />
              ) : null}
              <div className={"p-2 flex-nowrap mb-4"}>
                {[
                  { id: "1", label: "test" },
                  { id: "2", label: "suppepr dupper" },
                ].map((i) => (
                  <TagComp key={i.id} tag={i} onDeleteTag={console.log} />
                ))}
              </div>

              <Button
                className={"w-fit m-auto"}
                color={"secondary"}
                onClick={() => setEditTagsOpened(true)}
              >
                Edit
              </Button>
            </label>

            <Button color={"primary"} type={"submit"}>
              Save
            </Button>
          </Form>
        </Formik>
      )}
    </div>
  );
};
