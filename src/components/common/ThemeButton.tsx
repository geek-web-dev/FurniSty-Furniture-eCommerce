"use client";
import { useAppContext } from "@/context/useAppContext";
import { cn } from "@/lib/utils";
import { MoonStar, Sun } from "lucide-react";
import { useEffect } from "react";

const ThemeButton = ({
  className,
  isCoverd = false,
}: {
  className?: string;
  isCoverd?: boolean;
}) => {
  const { isDark, setIsDark } = useAppContext();

  const check = () => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  };

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleHander = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div
      className={cn(
        isCoverd ? "p-2 rounded-md bg-[#555] dark:bg-[#333]" : "",
        className
      )}
    >
      {isDark ? (
        <Sun
          className={cn(
            "w-5 h-5 mr-auto text-orange-500/75 hover:text-orange-500 cursor-pointer hover:scale-105 duration-75"
          )}
          onClick={toggleHander}
        />
      ) : (
        <MoonStar
          className={cn(
            "w-5 h-5 mr-auto text-white/75 hover:text-white cursor-pointer hover:scale-105 duration-75"
          )}
          onClick={toggleHander}
        />
      )}
    </div>
  );
};

export default ThemeButton;
