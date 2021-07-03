import client from "../../client"

export default {
    Query: {
        seePhoto: async (_: any, { id }: { id: number }) => {
            return client.photo.findUnique({
                where: { id }
            })
        }
    }
}