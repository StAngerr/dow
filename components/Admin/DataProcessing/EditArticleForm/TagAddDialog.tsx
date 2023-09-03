import React, { useCallback, useState } from "react";
import Modal from "../../../common/Modal/Modal";
import { Tag } from "../../../../types/tags";
import { Button } from "../../../common/Button/Button";
import { Heading } from "../../../common/Heading/Heading";
import { TagComp } from "../../../common/TagComp/TagComp";
import {
  SearchInput,
  SearchInputItem,
} from "../../../common/SearchInput/SearchInput";
import { createNewTag, getAllTags } from "../../../../api/tags/tags.api";

interface Props {
  currentTags: Tag[];
  handleSave: (tags: Tag[]) => void;
  handleClose: () => void;
}

export const TagAddDialog = ({
  currentTags,
  handleSave,
  handleClose,
}: Props) => {
  const [tags, setTags] = useState<Tag[]>(currentTags);
  const [isCreateNewTag, setIsCreateNewTag] = useState(false);
  const [createNewTagError, setCreateNewTagError] = useState<string | null>(
    null
  );
  const [newTagLabel, setNewTagLabel] = useState<string>("");
  const handleDeleteTag = useCallback((tag: Tag) => {
    setTags((prev) => prev.filter((i) => i.id !== tag.id));
  }, []);

  const handleSaveTags = useCallback(() => {
    handleSave(tags);
  }, [handleSave, tags]);

  const handleCreateNewTag = useCallback(() => {
    if (newTagLabel) {
      createNewTag(newTagLabel)
        .then(() => {
          setIsCreateNewTag(false);
        })
        .catch((e) => {
          setCreateNewTagError(e);
        });
    }
  }, [newTagLabel]);

  const handleValueChange = (q: string) => {
    if (!q) return Promise.resolve([]);

    return getAllTags(q);
  };

  const handleAddTag = useCallback((item: SearchInputItem) => {
    setTags((prev) => [...prev, item]);
  }, []);

  const handleCreateAndAddTag = useCallback(() => {
    if (newTagLabel) {
      createNewTag(newTagLabel)
        .then((tag: Tag) => {
          setTags((prev) => [...prev, tag]);
          setIsCreateNewTag(false);
        })
        .catch((e) => {
          setCreateNewTagError(e);
        });
    }
  }, [newTagLabel]);

  return (
    <Modal className={"p-6 w-2/4 h-3/5"} onClose={handleClose}>
      <Heading level={"2"} className={"mb-5"}>
        Mange Tags
      </Heading>
      <div className={""}>
        <div className={" p-2"}>
          <Heading className={"border-b mb-3"} level={"4"}>
            Find existing
          </Heading>
          <SearchInput onSearch={handleValueChange} onSelect={handleAddTag} />
          <Heading className={"border-b mb-3"} level={"4"}>
            Create New
          </Heading>
          <div className={"flex"}>
            {!isCreateNewTag ? (
              <Button
                onClick={() => setIsCreateNewTag(true)}
                color={"secondary"}
              >
                Create new
              </Button>
            ) : (
              <>
                <input
                  className={"p-2 border"}
                  type={"text"}
                  onChange={(e) => setNewTagLabel(e.target.value)}
                />
                {createNewTagError ? (
                  <p className={"text-red-500"}>{createNewTagError}</p>
                ) : null}
                <Button
                  onClick={() => setIsCreateNewTag(false)}
                  color={"secondary"}
                >
                  Cancel
                </Button>
                <Button color={"secondary"} onClick={handleCreateNewTag}>
                  Create new
                </Button>
                <Button color={"secondary"} onClick={handleCreateAndAddTag}>
                  Create new and Add
                </Button>
              </>
            )}
          </div>
        </div>
        <div>
          <Heading className={"mt-5"} level={"3"}>
            Current Tags
          </Heading>
          <div className={"flex flex-nowrap"}>
            {tags.map((tag) => (
              <TagComp key={tag.id} tag={tag} onDeleteTag={handleDeleteTag} />
            ))}
          </div>
        </div>
        <Button className={"mt-5"} onClick={handleSaveTags} color={"primary"}>
          Save
        </Button>
      </div>
    </Modal>
  );
};
