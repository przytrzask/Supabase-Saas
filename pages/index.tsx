import { PostgrestResponse } from "@supabase/supabase-js";
import Link from "next/link";

import { supabase } from "../utils/supabase";

import { definitions } from "../types/supabase";

type Props = {
  lessons: PostgrestResponse<definitions["lessons"]>;
};

export default function Home({ lessons }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      Dashboard
    </div>
  );
}

export async function getStaticProps() {
  const lessons = await supabase
    .from<definitions["lessons"]>("lessons")
    .select("*");

  return {
    props: {
      lessons,
    },
  };
}
