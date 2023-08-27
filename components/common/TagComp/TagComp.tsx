import { Tag } from "../../../types/tags";
import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";
interface Props {
  tag: Tag;
  onDeleteTag: (tag: Tag) => void;
}
export const TagComp = ({ tag, onDeleteTag }: Props) => {
  return (
    <div
      className={
        "py-1 px-4 rounded-3xl bg-bg2 shadow m-1 w-fit inline-flex justify-center items-center"
      }
    >
      {tag.label}
      <XMarkIcon className={"app-icon-size"} onClick={() => onDeleteTag(tag)} />
    </div>
  );
};
