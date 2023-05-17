import { getComments } from "../db/comments";
import Express from "express";

const router = Express.Router();

router.get("/comments", async (req, res) => {
  try {
    const {
      parentId,
      lastCommentId,
      perPage,
      sortBy,
      sortValue,
      lastSortValue,
    } = req.body;
    const comments = await getComments({
      parentId,
      lastCommentId,
      perPage,
      sortBy,
      sortValue,
      lastSortValue,
    });

    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ error: "Internal error" });
  }
});

export { router };
