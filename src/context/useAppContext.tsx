"use client";
import useLocalStorage from "@/hooks/use-local-storage";
import { Product } from "@prisma/client";
import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { User } from "@prisma/client";

type AppContextProps = {
  user: User | null;
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  truckItems: Product[] | null;
  setTruckItems: React.Dispatch<React.SetStateAction<Product[] | null>>;
  totalQuantity: number;
  setTotalQuantity: React.Dispatch<React.SetStateAction<number>>;
  wishlistItems: Product[] | null;
  setWishlistItems: React.Dispatch<React.SetStateAction<Product[] | null>>;
};

export const AppContext = createContext({} as AppContextProps);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useLocalStorage<boolean>("isDark", false); // note initialState
  const [truckItems, setTruckItems] = useState<Product[] | null>(null);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [wishlistItems, setWishlistItems] = useState<Product[] | null>(null);

  const [user, setUser] = useState<User | null>(null);

  return (
    <AppContext.Provider
      value={{
        user,
        isDark,
        setIsDark,
        truckItems,
        setTruckItems,
        totalQuantity,
        setTotalQuantity,
        wishlistItems,
        setWishlistItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
