"use client";
import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
} from "react";
import axios from "axios";
import jwt, { JwtPayload } from "jsonwebtoken";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
interface DataContext {
  name: string;
  balance: number;
  fetchData: () => void;
}
interface JwtPayloadExtended extends JwtPayload {
  id: string; // Adjust type based on your token structure
}
export const navbarContext = createContext<DataContext>({
  name: "",
  balance: 0,
  fetchData: () => {},
});
export const NavbarProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);
  const [decood, setDecood] = useState<JwtPayloadExtended | null>(null);
  const router = useRouter();

  const fetchData = async () => {
    const res = await axios.post("/api/navbar", { userId: decood?.id });
    setName(res.data.name);
    setBalance(res.data.balance);
  };
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.replace("login");
    }
    const decood = jwt.decode(token!) as JwtPayload | null;
    if (decood && typeof decood === "object" && "id" in decood) {
      // Type assertion only after checking
      const extendedPayload = decood as JwtPayloadExtended;
      setDecood(extendedPayload);
      fetchData(); // Call fetchData after setting decood
    } else {
      // Handle cases where the token doesn't have an id
      console.error("Invalid token structure");
      router.replace("login"); // Redirect to login if token is invalid
    }
    fetchData();
  }, []);
  return (
    <navbarContext.Provider value={{ name, balance, fetchData }}>
      {children}
    </navbarContext.Provider>
  );
};
export const navbarHook = () => {
  const context = useContext(navbarContext);
  if (!context) {
    throw new Error("useCustomContext must be used within a CustomProvider");
  }
  return context;
};
