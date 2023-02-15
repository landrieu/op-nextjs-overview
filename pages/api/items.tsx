import { NextApiRequest, NextApiResponse } from "next";
import { fetchItems } from "../../services/db";

export default async function handler(_req: NextApiRequest,res: NextApiResponse) {
    const items = await fetchItems();

    return res.status(200).json(items);
}