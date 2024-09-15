const VerticalLine = ({ color }: { color?: string }) => {
  return (
    <span
      className={`h-5 w-px mx-3 ${
        !color
          ? "bg-gray-200 dark:bg-[#333]"
          : color.startsWith("bg-")
          ? color
          : `bg-[${color}]`
      }`}
      aria-hidden="true"
    />
  );
};

export default VerticalLine;
