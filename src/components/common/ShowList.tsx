type ShowListProps<T> = {
  list: T[];
  renderItem: (item: T) => React.ReactNode;
};

const ShowList = <T,>({ list, renderItem }: ShowListProps<T>) => {
  return <>{list.map((item) => renderItem(item))}</>;
};

export default ShowList;
