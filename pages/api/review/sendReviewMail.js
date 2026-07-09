import main from "../../../database/conn";

import {
  sendReviewMailLogic,
} from "../../../utils/sendReviewMailLogic";

export default async function handler(
  req,
  res
) {

  if (req.method !== "POST") {

    res.status(405).json({
      error: "Method not allowed",
    });

    return;
  }

  try {

    await main();

    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({
        error: "Order ID is required",
      });
    }

    console.log("BODY:", req.body);

    const result =
      await sendReviewMailLogic(orderId);

    res.status(200).json({
      success: true,
      ...result,
    });

  } catch (err) {

    console.error(
      "SEND REVIEW MAIL ERROR:",
      err
    );

    res.status(500).json({
      error: err.message,
    });
  }
}