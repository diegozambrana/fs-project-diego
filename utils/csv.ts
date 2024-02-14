import { SerieType } from "@/components/dashboardRepository/DashboardTypes";

export const generateCSVDataFromSeries = (series: SerieType[]): string => {
  const csvData = series.map((serie: SerieType) => {
    return serie.data.map((data) => {
      return `${serie.name},${data.date},${data.count}`;
    }).join('\n');
  }).join('\n');
  
  return `name,date,count\n${csvData}`;
}