// styles
import "./arrow.css";

type Props = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

const Arrow: React.FC<Props> = (props) => {
  const { x1, y1, x2, y2 } = props;
  const markerId = "arrow-head";

  return (
    <svg className="arrow" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker
          id={markerId}
          markerWidth="10"
          markerHeight="10"
          refX="10"
          refY="5"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 Z" fill="black" />
        </marker>
      </defs>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="black"
        strokeWidth="2"
        markerEnd={`url(#${markerId})`}
      />
    </svg>
  );
};

export default Arrow;
