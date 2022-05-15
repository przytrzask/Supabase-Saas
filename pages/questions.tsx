import { useState } from "react";
import Answer from "../components/answer";
import { definitions } from "../types/supabase";

import { supabase } from "../utils/supabase";

type AnswerType = { text: string; id: number };

type Question = {
  id: number;
  title: string;
  answers: AnswerType[];
};

const defaultQuestion = {
  id: 1,
  title: "Jak się nazywają koty Ani",
  answers: [
    { id: 1, text: "Timon i Pumba" },
    { id: 2, text: "Zenon i Anelka" },
    { id: 3, text: "Miś i Pyś" },
    { text: "Zelda i Welda", id: 4 },
  ],
} as const;

const Questions = (props) => {
  console.log(props);
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <>
      <main className="layout-max mx-auto flex justify-center align-center flex-col">
        <h1 className="mt-1 text-2xl font-semibold  md:text-2xl ">
          {defaultQuestion.title}
        </h1>
        <ul>
          {defaultQuestion.answers.map((answer, idx) => (
            <li className="py-4 flex" key={answer.id}>
              <Answer
                onSelect={setSelected}
                copy={`${idx + 1}. ${answer.text}`}
                id={answer.id}
                isSelected={selected === answer.id}
              />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export async function getStaticProps() {
  const { data } = await supabase
    .from<definitions["questions"]>("questions")
    .select("*");

  return { props: { questions: data } };
}

export default Questions;
