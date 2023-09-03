import { allTags } from "./tags.urls";
import { Tag } from "../../types/tags";

export const getAllTags = (q?: string) => {
  const query = q ? "?" + new URLSearchParams({ q }) : "";
  return fetch(allTags + query, { method: "get" }).then((res) => res.json());
};

export const createNewTag = (label: string) => {
  return fetch(allTags, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ label }),
  }).then(async (d): Promise<Tag> => {
    if (d.status !== 200) {
      const error = await d.json();
      return Promise.reject(error);
    }
    return await d.json();
  });
};
