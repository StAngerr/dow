import React, { useCallback, useState } from "react";
import Modal from "../../../common/Modal/Modal";
import { Tag } from "../../../../types/tags";
import { Button } from "../../../common/Button/Button";
import { Heading } from "../../../common/Heading/Heading";
import { TagComp } from "../../../common/TagComp/TagComp";
import { SearchInput } from "../../../common/SearchInput/SearchInput";

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
  const [tags, setTags] = useState(currentTags);
  const [isCreateNewTag, setIsCreateNewTag] = useState(false);
  const handleDeleteTag = useCallback((tag: Tag) => {
    setTags((prev) => prev.filter((i) => i.id !== tag.id));
  }, []);

  const handleSaveTags = useCallback(() => {
    handleSave(tags);
  }, [handleSave, tags]);

  const handleCreateNewTag = useCallback(() => {
    setIsCreateNewTag(false);
  }, []);

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
          <SearchInput />
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
                <input className={"p-2 border"} type={"text"} />
                <Button
                  onClick={() => setIsCreateNewTag(false)}
                  color={"secondary"}
                >
                  Cancel
                </Button>
                <Button color={"secondary"} onClick={handleCreateNewTag}>
                  Create new
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
            {currentTags.map((tag) => (
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
