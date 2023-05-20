# Run guide

- `npm install`
- `docker-compose up -d`
- `cp .env.template .env`
- `npm run compile`
- `npm run start`

### GET /movies

|            Name | Required |               Type               | Description                                                                                              |
| --------------: | :------: | :------------------------------: | -------------------------------------------------------------------------------------------------------- |
|       `perPage` | required |              number              | Number of movies returned in pagination                                                                  |
|        `sortBy` | required |           asc or desc            | Determine ascending or descending sorting                                                                |
|     `sortValue` | required | createdAt or \_id or releaseDate | Field on which we are doing sorting                                                                      |
|   `lastMovieId` | optional |              string              | Last movie \_id in previous request                                                                      |
| `lastSortValue` | optional |              string              | Last createdAt value if we are sorting by createdAt or last releaseDate if we are sorting by releaseDate |

**Example request**

`http://localhost:3001/movies?perPage=2&sortBy=createdAt&lastMovieId=63aa029d209070de2a49db5a&sortValue=asc&lastSortValue=1998-08-08T05:01:22.599Z`

**Example response**

```
{
    "movies": [
        {
            "_id": "6468f44d61d54c339559f92f",
            "title": "Avatar: The Way of Water",
            "language": "en",
            "releaseDate": "2022-12-14T00:00:00.000Z",
            "overview": "Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
            "createdAt": "2018-09-04T04:43:55.902Z"
        },
        {
            "_id": "6468f44d61d54c339559f938",
            "title": "Battle for Saipan",
            "language": "en",
            "releaseDate": "2022-11-25T00:00:00.000Z",
            "overview": "On July 7, 1944, a U.S. Army hospital on the remote island of Saipan is overrun by Japanese forces during a relentless attack. Outgunned and surrounded by the enemy, a lone medic puts it all on the line to lead a band of wounded soldiers to safety.",
            "createdAt": "2019-04-30T17:54:45.530Z"
        }
    ]
}
```
