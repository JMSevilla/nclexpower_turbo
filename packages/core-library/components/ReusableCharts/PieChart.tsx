
export const PieChart = ({ data }: any) => {
    return <PieChart
        series={[
            {
                data: data,
                innerRadius: 30,
                outerRadius: 100,
                paddingAngle: 5,
                cornerRadius: 5,
                startAngle: -90,
                endAngle: 180,
                cx: 150,
                cy: 150,
            }
        ]}
    />
}
