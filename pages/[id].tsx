import { supabase } from "../utils/supabase";
import { definitions } from "../types/supabase";
import { useEffect, useState } from "react";

type Props = {
  lesson: definitions["lessons"];
};

const Lesson = ({ lesson }: Props) => {
  const [url, setUrl] = useState(null);
  const getPremiumContent = async () => {
    const { data: url } = await supabase
      .from<definitions["premium_content"]>("premium_content")
      .select("video_url")
      .eq("id", lesson.id)
      .single();

    setUrl(url?.video_url);
  };

  useEffect(() => {
    getPremiumContent();
  }, []);
  return (
    <div className="w-full max-w-3xl mx-auto py-16 px-8 rounded border-zinc-400">
      <h1 className="text-3xl mb-6">{lesson.title}</h1>
      <p>{lesson.description} </p>

      {url && <p>{url}</p>}
    </div>
  );
};

export default Lesson;

export async function getStaticPaths({ id }) {
  const { data: lessons } = await supabase
    .from<definitions["lessons"]>("lessons")
    .select("id");

  const paths = lessons.map(({ id }) => ({
    params: {
      id: id.toString(),
    },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params: { id } }) {
  const { data: lesson } = await supabase
    .from<definitions["lessons"]>("lessons")
    .select("*")
    .eq("id", id)
    .single();

  return {
    props: {
      lesson,
    },
  };
}
