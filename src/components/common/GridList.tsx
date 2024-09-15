import { cn } from "@/lib/utils";
import LottieHandler from "@/utils/LottieHandler";

type GridListProps<T> = {
  records: T[] | null;
  renderItem: (record: T) => React.ReactNode;
  SkeletonComponent?: React.ComponentType<any>;
  SkeletonComponentProps?: Record<string, any>;
  className?: string;
};

const GridList = <T extends { id?: string }>({
  records,
  renderItem,
  SkeletonComponent,
  SkeletonComponentProps,
  className,
}: GridListProps<T>) => {
  const isRecordsExist = records != null && records.length > 0;

  const recordsList = isRecordsExist ? (
    records.map((record) => renderItem(record))
  ) : records != null && !records.length ? (
    <LottieHandler type="emptyCart" message="There is no items !" />
  ) : null;

  return (
    <div
      className={cn(
        "grid gap-4",
        records != null && !records.length
          ? "grid-cols-1"
          : className
          ? className
          : "xl:grid-cols-3 lg:grid-cols-2"
      )}
    >
      {recordsList == null && SkeletonComponent ? (
        <>
          <SkeletonComponent {...SkeletonComponentProps} />
          <SkeletonComponent {...SkeletonComponentProps} />
          <SkeletonComponent {...SkeletonComponentProps} />
        </>
      ) : (
        recordsList
      )}
    </div>
  );
};

export default GridList;
