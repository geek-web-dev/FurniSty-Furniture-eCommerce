"use client";
import notFound from "../../public/lotties/notFound.json";
import emptyCart from "../../public/lotties/emptyCart.json";
import placeOrderCart from "../../public/lotties/placeOrderCart.json";
import networkError from "../../public/lotties/networkError.json";
import loading from "../../public/lotties/loading.json";
import Lottie from "lottie-react";

const lottieFilesMap = {
  notFound,
  emptyCart,
  placeOrderCart,
  networkError,
  loading,
};

type LottieProps = {
  type: keyof typeof lottieFilesMap;
  message?: string;
  width?: string;
};

const LottieHandler = ({ type, message, width = "300px" }: LottieProps) => {
  return (
    <div className="flex flex-col justify-center items-center mt-6">
      <Lottie animationData={lottieFilesMap[type]} style={{ width }} />
      {message && (
        <div className="text-xl font-semibold text-center text-[--sub-title]">
          {message}
        </div>
      )}
    </div>
  );
};

export default LottieHandler;
