'use client';
import { FC, useState, useContext, useCallback, useRef } from "react";
import { Grid, GridCol, Box, Button, Flex, Switch } from "@mantine/core";
import { notifications } from '@mantine/notifications';
import { IconDownload, IconPhoto, IconLink } from "@tabler/icons-react";

import { DashboardPackagesContext } from "./DashboardContext";
import { TimeSerieChart } from "../charts/TimeSerieChart";
import { generateCSVDataFromSeries } from "@/utils/csv";
import { toPng } from 'html-to-image';
import AddNewPackage from "../modal/AddNewPackage";
import CleanPackage from "../modal/CleanPackage";
import { Loading } from "../ui/Loading";
import { DashboardElement } from "../dashboard/DashboardElement";


const Dashboard: FC = () => {
  const [ checked, setChecked ] = useState(false);
  const [ copied, setCopied ] = useState(false);
  const {
    packages,
    removePackage,
    toggleVisibility,
    series,
    filteredSeries,
    filteredPredictions,
    loadingSeries,
  } = useContext(DashboardPackagesContext);

  const chartRef = useRef<HTMLDivElement>(null)

  const onDownloadCSV = () => {
    const element = document.createElement("a");
    const csvData = generateCSVDataFromSeries(series);
    const file = new Blob([csvData], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    const currentDate = (new Date()).toISOString();
    element.download = `nixtla_tracker_${currentDate}.csv`;
    document.body.appendChild(element);
    element.click();
  }

  const onDownloadPNG = useCallback(() => {
    if (chartRef.current === null) {
      return
    }

    toPng(chartRef.current, { cacheBust: true, })
      .then((dataUrl) => {
        const link = document.createElement('a')
        const currentDate = (new Date()).toISOString();
        link.download = `nixtla_tracker_${currentDate}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err)
      })
  }, [chartRef])

  const onCopyUrl = () => {
    if(!copied){
      const el = document.createElement('input');
      el.value = window.location.href;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      notifications.show({
        message: 'Copied to clipboard',
      });
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 5000);
    }
  }

  return (
    <Box>
      <Flex
        mih={50}
        gap="md"
        justify="flex-start"
        align="flex-start"
        direction="row"
        wrap="wrap"
      >
        <Box>
          <input id="myInput" hidden/>
          <Button
            rightSection={<IconDownload size={14} />}
            onClick={onDownloadCSV}
          >Download CSV</Button>
        </Box>
        <Box>
          <Button
            rightSection={<IconPhoto size={14} />}
            onClick={onDownloadPNG}
          >Download PNG</Button>
        </Box>
        <Box>
          <Button
            rightSection={<IconLink size={14} />}
            onClick={onCopyUrl}
            disabled={copied}
          >{copied ? 'Copied Link' :`Copy Link`}</Button>
        </Box>
      </Flex>
      <Grid mt="2rem">
        <GridCol span={8}>
          <div>
            {loadingSeries
              ? <Loading height="18rem" />
              : (
                <div ref={chartRef}>
                  <TimeSerieChart
                    series={filteredSeries}
                    predictions={filteredPredictions}
                  />
                </div>
              )
            }
          </div>          
        </GridCol>
        <GridCol span={4}>
          <Box>
            <Box my="1rem">
              <Switch
                label="Align Timeline"
                checked={checked}
                onChange={(event) => setChecked(event.currentTarget.checked)}
              />
            </Box>

            {packages.map((pack, index) => (
              <DashboardElement
                key={pack.name}
                element={pack}
                onToggleVisibility={toggleVisibility}
                onRemove={removePackage}
              />
            ))}

            <Box>
              <Flex justify="space-between">
                <CleanPackage />
                <AddNewPackage/>
              </Flex>
            </Box>
            
          </Box>
        </GridCol>
      </Grid>
    </Box>
  );
}

export default Dashboard;