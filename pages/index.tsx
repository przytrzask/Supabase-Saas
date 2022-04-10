import { PostgrestResponse } from "@supabase/supabase-js";

import { supabase } from "../utils/supabase";

import { definitions } from "../types/supabase";

type Props = {
  lessons: PostgrestResponse<definitions["lessons"]>;
};

export default function Home({ lessons }: Props) {
  console.log({ lessons });
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {lessons.body.map((lesson) => (
        <p>
          {lesson.title}
          {lesson.description}
        </p>
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
