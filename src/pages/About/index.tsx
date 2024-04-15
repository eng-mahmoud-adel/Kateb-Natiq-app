import styles from "./styles.module.css";

const About = () => {
    return (
        <div className={styles.container}>
            <div className={styles.text}>
                <h3>Kateb</h3>
                <p>This service will take your Arabic audio data and convert it to text</p>
            </div>

            <div className={styles.text}>
                <h3>Natiq</h3>
                <p>This service will take text and speak it.</p>
            </div>
        </div>
    );
};

export default About;
