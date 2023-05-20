import { getCollection } from "./index";
import { PaginationProps, SortByFilter, SortValueFilter } from "./types";
import { ObjectId } from "mongodb";

const movieCollection = getCollection();

export const getMovies = async ({
  perPage = 10,
  lastMovieId,
  sortBy = SortByFilter.ID,
  sortValue = SortValueFilter.ASC,
  lastSortValue,
}: PaginationProps) => {
  const mongoDbComparison = sortValue === SortValueFilter.ASC ? "$gt" : "$lt";
  const mongoSortByValue = sortValue === SortValueFilter.ASC ? 1 : -1;

  const aggregations = [
    // Filter those comments based on lastCommentId
    lastMovieId
      ? sortBy !== SortByFilter.ID && !!lastSortValue
        ? {
            $match: {
              $or: [
                {
                  [sortBy]: {
                    [mongoDbComparison]: new Date(lastSortValue),
                  },
                },
                {
                  $and: [
                    {
                      [sortBy]: {
                        $eq: new Date(lastSortValue),
                      },
                    },
                    {
                      _id: {
                        [mongoDbComparison]: new ObjectId(lastMovieId),
                      },
                    },
                  ],
                },
              ],
            },
          }
        : {
            $match: {
              _id: {
                [mongoDbComparison]: new ObjectId(lastMovieId),
              },
            },
          }
      : null,
    // Sort it based on mongoDbSortValue
    {
      $sort:
        sortBy === SortByFilter.ID
          ? {
              _id: mongoSortByValue,
            }
          : {
              [sortBy]: mongoSortByValue,
              _id: mongoSortByValue,
            },
    },
    // Limit our query
    {
      $limit: perPage,
    },
  ];

  return movieCollection
    .aggregate(aggregations.filter((aggregation) => !!aggregation))
    .toArray();
};
