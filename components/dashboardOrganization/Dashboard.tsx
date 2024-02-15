'use client';
import { FC, useState, useContext, useCallback, useRef } from "react";
import { Grid, GridCol, Box, Button, Flex, SegmentedControl } from "@mantine/core";
import { notifications } from '@mantine/notifications';
import { IconDownload, IconPhoto, IconLink } from "@tabler/icons-react";


import AddNewOrg from "@/components/modal/AddNewOrg";
import CleanOrg from "@/components/modal/CleanOrg";
import { DashboardOrganizationContext } from "./DashboardContext";
import { TimeSerieChart } from "../charts/TimeSerieChart";
import { generateCSVDataFromSeries } from "@/utils/csv";
import { toPng } from 'html-to-image';
import { Loading } from "../ui/Loading";
import { DashboardElement } from "../dashboard/DashboardElement";
import { SEGMENT_VALUES } from "@/utils/constants";


const Dashboard: FC = () => {
  const [ copied, setCopied ] = useState(false);
  const {
    organizations,
    removeOrganization,
    toggleVisibility,
    series,
    filteredSeries,
    filteredPredictions,
    loadingSeries,
    segmentFilter,
    setSegmentFilter,
  } = useContext(DashboardOrganizationContext);

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
              <SegmentedControl
                value={segmentFilter}
                onChange={setSegmentFilter}
                data={SEGMENT_VALUES}
              />
            </Box>

            {organizations.map((org, index) => (
              <DashboardElement
                key={org.name}
                element={org}
                onToggleVisibility={(org: any) => toggleVisibility(org)}
                onRemove={(org: any) => removeOrganization(org)}
              />
            ))}

            <Box>
              <Flex justify="space-between">
                <CleanOrg />
                <AddNewOrg />
              </Flex>
            </Box>
            
          </Box>
        </GridCol>
      </Grid>
    </Box>
  );
}

export default Dashboard;