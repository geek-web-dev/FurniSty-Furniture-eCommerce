import { cn } from "@/lib/utils";
import { FontAwesomeIcon as FAI } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";

interface StarRatingProps {
  averageRate: number;
  starWidth?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ averageRate, starWidth }) => {
  const fullStars = Math.floor(averageRate);
  const halfStar = averageRate % 1 >= 0.4 ? 0.5 : 0;

  const emptyStars = 5 - fullStars - halfStar;
  const emptyFullStars = Math.floor(emptyStars);
  const emptyHalfStar = emptyStars % 1 >= 0.4 ? 0.5 : 0;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <FAI
          icon={faStar}
          key={i}
          className={cn("text-amber-500", starWidth ? starWidth : "w-3")}
        />
      ))}
      {halfStar === 0.5 && (
        <FAI
          icon={faStarHalf}
          className={cn(
            "text-amber-500 mr-[3px]",
            starWidth ? starWidth : "w-3"
          )}
        />
      )}
      {emptyHalfStar === 0.5 ? (
        <FAI
          icon={faStarHalf}
          className={cn(
            "text-[#ccc] dark:text-[#999] -ml-[15px] w-3",
            starWidth ? `${starWidth}` : "w-3"
          )}
          style={{ transform: "rotateY(180deg)" }}
        />
      ) : null}
      {[...Array(emptyFullStars)].map((_, i) => (
        <FAI
          icon={faStar}
          key={i}
          className={cn(
            "text-[#ccc] dark:text-[#999]",
            starWidth ? starWidth : "w-3"
          )}
        />
      ))}
    </div>
  );
};

export default StarRating;
