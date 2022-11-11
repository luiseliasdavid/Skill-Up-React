import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const GraphBalance = ({ dataGraph }) => {
   console.log(dataGraph);
   return <Doughnut data={dataGraph} />;
};
