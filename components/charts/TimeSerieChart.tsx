'use client'

import {
    AnimatedAxis,
    AnimatedGrid,
    AnimatedLineSeries,
    XYChart,
    Tooltip,
} from '@visx/xychart';
import { FC } from 'react';

interface TimeSerieChartType{
  series: {
    name: string;
    data: {count: number, date: string}[];
  }[]
}

export const TimeSerieChart: FC<TimeSerieChartType> = ({series}) => {
  const accessors = {
    xAccessor: (d: any) => new Date(`${d.date}T00:00:00`),
    yAccessor: (d: any) => d.count,
  };

  if (!series) {
    return <div>...</div>;
  }

  // TODO: Add a loading state and legends
  return (
    <XYChart height={450} xScale={{ type: "time" }} yScale={{ type: "linear" }}>
      <AnimatedAxis orientation="bottom" numTicks={4} />
      <AnimatedAxis orientation="left" numTicks={4} />
      <AnimatedGrid columns={false} numTicks={4} />
      {series.map((serie, index) => (
        <AnimatedLineSeries key={serie.name} dataKey={serie.name} data={serie.data} {...accessors} />
      ))}
      <Tooltip
        snapTooltipToDatumX
        snapTooltipToDatumY
        renderTooltip={({ tooltipData, colorScale }) => {
          if(tooltipData?.nearestDatum === undefined || !colorScale) return <></>
          return (
            <div>
              <div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>
                {tooltipData.nearestDatum.key}
              </div>
              {accessors.xAccessor(tooltipData.nearestDatum.datum).toISOString().split('T')[0]}
              {", "}
              {accessors.yAccessor(tooltipData.nearestDatum.datum)}
            </div>
          )
        }}
      />

    </XYChart>
  )
}