import { supabase } from "../utils/supabase";
import { definitions } from "../types/supabase";

type Props = {
  lesson: definitions["lessons"];
};

const Id = ({ lesson }: Props) => {
  console.log(lesson);

  return (
    <div className="w-full max-w-3xl mx-auto py-16 px-8 rounded border-zinc-400">
      <h1 className="text-3xl mb-6">{lesson.title}</h1>
      <p>{lesson.description} </p>
    </div>
  );
};

export default Id;

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
