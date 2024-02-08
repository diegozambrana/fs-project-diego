'use client';
import { LineChart } from "@mantine/charts";
import { data } from "./data";

// TODO: if the library is not enough for the project, we can to d3.js

export default function LineChartBase () {
  return (
    <LineChart
      h={300}
      data={data}
      dataKey="date"
      series={[
        { name: 'Apples', color: 'indigo.6' },
        { name: 'Oranges', color: 'blue.6' },
        { name: 'Tomatoes', color: 'teal.6' },
      ]}
      curveType="linear"
      tickLine="x"
      withDots={false}
    />
  )
}