import Header from "./components/Header/main";
import styles from "./page.module.css";

export default function App() {
  return (
    <div className={styles.page}>
      <Header/>
      <p>Text</p>
    </div>
  );
}
