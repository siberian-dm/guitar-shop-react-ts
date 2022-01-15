import styles from './loader.module.css';

function Loader(): JSX.Element {
  return (
    <div
      className={styles.container}
    >
      <svg
        className={styles.spinner}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="100px" height="100px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        data-testid="svg-spinner"
      >
        <circle
          cx="50"
          cy="50"
          r="40"
          strokeWidth="5"
          stroke="#131212"
          strokeDasharray="62.83185307179586 62.83185307179586"
          fill="none"
          strokeLinecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="1s"
            repeatCount="indefinite"
            keyTimes="0;1"
            values="0 50 50;360 50 50"
          />
        </circle>
        <circle
          cx="50"
          cy="50"
          r="34"
          strokeWidth="5"
          stroke="#c90606"
          strokeDasharray="53.40707511102649 53.40707511102649"
          strokeDashoffset="53.40707511102649"
          fill="none" strokeLinecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="1s"
            repeatCount="indefinite"
            keyTimes="0;1"
            values="0 50 50;-360 50 50"
          />
        </circle>
      </svg>
    </div>
  );
}

export default Loader;
