'use client'

import {
    AnimatedAxis,
    AnimatedGrid,
    AnimatedLineSeries,
    XYChart,
    Tooltip,
} from '@visx/xychart';
import { FC } from 'react';

import { LegendOrdinal } from '@visx/legend';
import { scaleOrdinal } from '@visx/scale';
import { Loading } from '../ui/Loading';
import { COLORS, COLORS_FORECAST } from '@/utils/constants';


interface TimeSerieChartType{
  series: {
    name: string;
    data: {count: number, date: string}[];
  }[],
  predictions: {
    name: string;
    data: {count: number, date: string}[];
  }[]
}

export const TimeSerieChart: FC<TimeSerieChartType> = ({series, predictions}) => {
  const accessors = {
    xAccessor: (d: any) => d ? new Date(`${d.date}T00:00:00`) : null,
    yAccessor: (d: any) => d.count,
  };

  if (!series && !predictions) {
    return <Loading height='400px' />;
  }

  const ordinalColorScale = scaleOrdinal({
    domain: series.map((s) => s['name']),
    range: COLORS.slice(0, series.length),
  });

  return (
    <div style={{position: 'relative'}}>
      <XYChart height={400} xScale={{ type: "time" }} yScale={{ type: "linear" }}>
        <AnimatedAxis orientation="bottom" numTicks={4} />
        <AnimatedAxis orientation="left" numTicks={4} />
        <AnimatedGrid columns={false} numTicks={4} />
        {series.map((serie, index) => (
          <AnimatedLineSeries
            key={serie.name}
            dataKey={serie.name}
            data={serie.data}
            stroke={COLORS[index]}
            {...accessors}
          />
        ))}
        {predictions.map((prediction, index) => (
          <AnimatedLineSeries
            key={`p_${prediction.name}`}
            dataKey={`p_${prediction.name}`}
            data={prediction.data}
            stroke={COLORS_FORECAST[index]}
            {...accessors}
          />
        ))}
        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          renderTooltip={({ tooltipData, colorScale }) => {
            if(tooltipData?.nearestDatum === undefined || !colorScale) return <></>
            return (
              <div>
                <div>
                  {tooltipData.nearestDatum.key}
                </div>
                {accessors.xAccessor(tooltipData.nearestDatum.datum)?.toISOString().split('T')[0]}
                {", "}
                {accessors.yAccessor(tooltipData.nearestDatum.datum)}
              </div>
            )
          }}
        />
        
      </XYChart>
      <div style={{
        position: 'absolute',
        top: 0,
        left: '4rem',
      }}>
        <LegendOrdinal
          scale={ordinalColorScale}
          direction="column-reverse"
          itemDirection="row-reverse"
          labelMargin="0 20px 0 0"
          shapeMargin="1px 0 0"
        />
      </div>
    </div>
  )
}