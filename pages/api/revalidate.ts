import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Check for secret to confirm this is a valid request
    if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' })
    }

    const paths = req.query.paths;

    if (!paths) {
        return res.status(400).json({ message: 'No path to revalidate' });
    }

    try {
        // this should be the actual path not a rewritten path
        // e.g. for "/blog/[slug]" this should be "/blog/post-1"
        if(Array.isArray(paths)){
            const revalidates = paths.map((path) => res.revalidate(path));
            await Promise.all(revalidates);
        }else{
            await res.revalidate(paths);
        }

        return res.json({ revalidated: true })
    } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).send('Error revalidating')
    }
}