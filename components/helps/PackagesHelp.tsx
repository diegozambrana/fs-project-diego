import { Badge, Box, Code, Text, Title, ThemeIcon } from "@mantine/core";
import { IconExternalLink, IconX, IconEye } from '@tabler/icons-react';

export const PackageHelp = () => {
  return (
    <Box>
      <Title order={2} mb="1rem">
        Welcome to the Dashboard for comparing downloads of packages.
      </Title>
      
      <Text mb="1rem">
        To add a new package, simply click on the <Badge color="blue">+ Add New</Badge>{' '}
        button and provide the full name of the package in the following format:
        <Code>nixtlats</Code>.
      </Text>
      
      <Text mb="1rem">
        In the list of repositories on the right, you will find several useful
        actions. You can click on the package link
        <ThemeIcon variant="light" radius="lg" color="gray">
          <IconExternalLink style={{ width: '70%', height: '70%' }} />
        </ThemeIcon>
        to visit it, show or hide 
        <ThemeIcon variant="light" radius="lg" color="gray">
          <IconEye style={{ width: '70%', height: '70%' }} />
        </ThemeIcon>
        the package on the chart, and delete it
        <ThemeIcon variant="light" radius="lg" color="gray">
          <IconX style={{ width: '70%', height: '70%' }} />
        </ThemeIcon> from the list.
      </Text>
      
      <Text mb="1rem">
        Additionally, you have the option to download a file in .csv format by
        clicking the <Badge color="blue">Download CSV</Badge> button, as well as obtain an image in PNG
        format with the <Badge color="blue">Download PNG</Badge> button. You can also copy the dashboard
        link to easily share it with others.
      </Text>
      
      <Text>Enjoy exploring and comparing the Stargazers of your favorite repositories!</Text>

    </Box>
  );
}