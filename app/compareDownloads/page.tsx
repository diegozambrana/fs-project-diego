import { DashboardPackages } from "@/components/dashboardDownloads";
import { PackageHelp } from "@/components/helps/PackagesHelp";
import Help from "@/components/ui/Help";
import { Box, Card } from "@mantine/core";

export default function CompareDownloads() {
  return (
    <main>
      <Card shadow="sm" padding="md" radius="md">
        <Box ta="right">
          <Help content={<PackageHelp />}/>
        </Box>
        <DashboardPackages />
      </Card>
    </main>
  );
}
