import { getCollection } from "./index";
import { PaginationProps } from "./types";
import { ObjectId } from "mongodb";

const comments_collection = getCollection();

export const getComments = async ({
  perPage = 10,
  lastCommentId,
  parentId,
  sortBy = "createdAt",
  sortValue = 1,
  lastSortValue,
}: PaginationProps) => {
  const mongoDbSortValue = sortValue === 1 ? "$gt" : "$lt";

  const aggregations = [
    // Find records that match the parentId
    {
      $match: {
        parentId,
      },
    },
    // Filter those comments based on lastCommentId
    lastCommentId
      ? sortBy === "createdAt" && !!lastSortValue
        ? {
            $match: {
              $or: [
                {
                  createdAt: {
                    [mongoDbSortValue]: new Date(lastSortValue),
                  },
                },
                {
                  $and: [
                    {
                      createdAt: {
                        $eq: new Date(lastSortValue),
                      },
                    },
                    {
                      _id: {
                        [mongoDbSortValue]: new ObjectId(lastCommentId),
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
                [mongoDbSortValue]: new ObjectId(lastCommentId),
              },
            },
          }
      : null,
    // Sort it based on mongoDbSortValue
    {
      $sort:
        sortBy === "createdAt"
          ? {
              createdAt: sortValue,
              _id: sortValue,
            }
          : {
              [sortBy]: sortValue,
            },
    },
    // Limit our query
    {
      $limit: perPage,
    },

    // // We can append a filed to all of our records
    {
      $addFields: {
        id: {
          $toString: "$_id",
        },
      },
    },
    {
      $graphLookup: {
        from: "comments",
        startWith: "$id",
        connectFromField: "id",
        connectToField: "parentId",
        as: "children",
      },
    },
    // Delete $id
    {
      $project: {
        id: 0,
      },
    },
  ];

  return comments_collection
    .aggregate(aggregations.filter((aggregation) => !!aggregation))
    .toArray();
};
