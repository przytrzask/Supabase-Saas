import Head from "next/head";
import { supabase } from "../utils/supabase";

type Props = {
  lessons: any;
};

export default function Home({ lessons }: Props) {
  console.log({ lessons });
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      working
    </div>
  );
}

export async function getStaticProps() {
  const lessons = await supabase.from("lessons").select("*");

  return {
    props: {
      lessons,
    },
  };
}
