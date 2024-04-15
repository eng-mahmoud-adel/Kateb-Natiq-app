import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Home = () => {
    return (
        <div className={styles.container}>
            <div className={styles.text}>This Kateb-Natiq service will help you displaying and reading your audios</div>

            <Link to={"/echo"} style={{ outline: "none" }}>
                <button className={styles.button}>Go to Echo page</button>
            </Link>
        </div>
    );
};

export default Home;
