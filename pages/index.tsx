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
      {lessons.body.map((lesson) => (
        <Link href={lesson.id.toString()}>
          <a
            key={lesson.id}
            className="bg-indigo-600 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg"
          >
            {lesson.title}
            {lesson.description}
          </a>
        </Link>
      ))}
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
