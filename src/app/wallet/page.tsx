import Card from "@/components/Card/Card";
import Main from "@/components/Main/Main";
import TokenAddressInput from "@/components/Token/Client/TokenAddressInput/TokenAddressInput";
import styles from "./styles/token.module.scss";
import { RedirectType, redirect } from "next/navigation";
const wallet = () => {
  redirect("/search", RedirectType.replace);
};

export default wallet;
