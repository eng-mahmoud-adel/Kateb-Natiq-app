import { Link, Outlet } from "react-router-dom";
import styles from "./styles.module.css";

const Layout = () => {
    return (
        <>
            <nav>
                <ul className={styles.navbar}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/echo">Echo</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    );
};

export default Layout;
