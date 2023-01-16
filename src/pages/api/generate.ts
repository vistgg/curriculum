// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getGeneratedCV } from "@lightbringer/utils/getGeneratedCV";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = req.body;

    const cvHTML = await getGeneratedCV(data, "default");

    return res.json(cvHTML);
  } else {
    return res.json("Method Not Allowed");
  }
}
