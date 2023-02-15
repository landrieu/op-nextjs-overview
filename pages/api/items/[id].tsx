import { NextApiRequest, NextApiResponse } from "next";
import { fetchItemByName } from "../../../services/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id: itemId } = req.query;

    const item = await fetchItemByName(itemId as string);

    if (!item) {
        return res.status(404).send(false);
    }

    return res.status(200).send(item);
}