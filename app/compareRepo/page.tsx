import { Box, Card } from "@mantine/core";
import { DashboardRepository } from "@/components/dashboardRepository";
import Help from "@/components/ui/Help";
import { PackageHelp } from "@/components/helps/PackagesHelp";


export default function CompareRepo() {
  return (
    <main>
      <Card shadow="sm" padding="md" radius="md">
        <Box ta="right">
          <Help content={<PackageHelp />}/>
        </Box>
        <DashboardRepository />
      </Card>
    </main>
  );
}
