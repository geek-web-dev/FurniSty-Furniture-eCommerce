import styles from "./styles.module.css";
const { loader } = styles;

const Loading = () => {
  return (
    <div className="bg-[--background] h-screen">
      <div className={loader}></div>
    </div>
  );
};

export default Loading;
