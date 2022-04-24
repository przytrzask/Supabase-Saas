import type { NextApiRequest, NextApiResponse } from "next";
import initStripe from "stripe";
import { supabase } from "../../utils/supabase";
import { definitions } from "../../types/supabase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
    return res.status(401).send("you are not authorized to call this API");
  }
  const stripe = new initStripe(process.env.STRIPE_SECRET_KEY);

  const customer = await stripe.customers.create({
    email: req.body.record.email,
  });

  await supabase
    .from<definitions["profile"]>("profile")
    .update({ stripe_customer_id: customer.id })
    .eq("id", req.body.record.id);

  res.status(200).send(`created customer ${customer}`);
};

export default handler;
