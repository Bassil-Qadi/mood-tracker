import ReactApexChart from "react-apexcharts";

export default function Chart({ data, options }: { data: any, options: any }) {
    return (
        <ReactApexChart type="bar" series={data} options={options} height={300} />
    );
}