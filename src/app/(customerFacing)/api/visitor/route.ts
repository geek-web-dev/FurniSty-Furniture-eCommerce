// pages/api/visitor.ts

import { NextApiRequest, NextApiResponse } from "next";
import db from "@/db/db";

const visitorHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // console.log("method", req.method);

  if (req.method === "GET") {
    // let visitor = await db.visitor.findFirst();
    console.log("REQUEST-------");

    // if (!visitor) {
    //   visitor = await db.visitor.create({
    //     data: {
    //       count: 1,
    //     },
    //   });
    // } else {
    //   visitor = await db.visitor.update({
    //     where: { id: visitor.id },
    //     data: { count: visitor.count + 1 },
    //   });
    // }

    // res.status(200).json({ count: visitor.count });
  } else {
    // res.status(405).json({ message: "Method not allowed" });
  }
};

export default visitorHandler;
