import { getMovies } from "../db/movies";
import { PaginationProps } from "../db/types";
import Express, { Request } from "express";

const router = Express.Router();

router.get(
  "/movies",
  async (req: Request<{}, {}, {}, PaginationProps>, res) => {
    try {
      const { lastMovieId, perPage, sortBy, sortValue, lastSortValue } =
        req.query;
      const movies = await getMovies({
        lastMovieId,
        perPage: perPage ? +perPage : perPage,
        sortBy,
        sortValue,
        lastSortValue,
      });

      res.status(200).json({ movies });
    } catch (error) {
      res.status(500).json({ error: "Internal error" });
    }
  }
);

export { router };
