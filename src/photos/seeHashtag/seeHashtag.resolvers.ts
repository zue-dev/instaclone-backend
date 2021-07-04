import client from "../../client";

interface SeeHashtagParams {
    hashtag: string;
}

export default {
    Query: {
        seeHashtag: (_: any, { hashtag }: SeeHashtagParams) => client.hashtag.findUnique({ where: { hashtag } })
    }
}