import {
  ArcElement,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';

export const MiddlewareChartJSInit = () => {
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
  );
};
