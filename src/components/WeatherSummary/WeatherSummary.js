import styles from './WeatherSummary.module.scss';

const WeatherSummary = props => {
  return (
    <section className={styles.weatherSummary}>
      <img
        className={styles.weatherIcon}
        alt={props.data.description}
        src={`${process.env.PUBLIC_URL}/images/weather-icons/${props.data.icon}.png`} />
      <div className={styles.weatherInfo}>
        <h2>{props.data.city}</h2>
        <p>
          <strong>Temp:</strong> {props.data.temp}
        </p>
      </div>
    </section>
  );
};

export default WeatherSummary;