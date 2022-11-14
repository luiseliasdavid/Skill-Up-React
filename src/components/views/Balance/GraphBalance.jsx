import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const GraphBalance = ({ topup, payments }) => {
    const dataGraph = {
        labels: ["Cargas", "Transferencias"],
        datasets: [
            {
                label: "# of Votes",
                data: [topup, payments],
                backgroundColor: [
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                ],
                borderColor: [
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 206, 86, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    return <Doughnut data={dataGraph} />;
};

export default GraphBalance;
