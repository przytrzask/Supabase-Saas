type Props = {
  copy: string;
  id: number;
  onSelect: (idx: number) => void;
  isSelected: boolean;
};

const Answer = ({ copy, onSelect, id, isSelected }: Props) => {
  const border = isSelected ? "border-2 border-gray-600" : "";

  return (
    <button
      aria-aria-pressed={isSelected}
      onClick={() => onSelect(id)}
      className={`bg-gray-100 text-left font-semibold rounded-2xl w-full h-12 pl-4 ${border}`}
    >
      {copy}
    </button>
  );
};

export default Answer;
