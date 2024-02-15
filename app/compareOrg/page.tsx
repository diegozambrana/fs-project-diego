import { DashboardOrganization } from "@/components/dashboardOrganization";
import { OrganizationHelp } from "@/components/helps/OrganizationHelp";
import Help from "@/components/ui/Help";
import { Box, Card } from "@mantine/core";

export default function CompareOrg() {
  return (
    <main>
      <Card shadow="sm" padding="md" radius="md">
        <Box ta="right">
          <Help content={<OrganizationHelp />}/>
        </Box>
        <DashboardOrganization />
      </Card>
    </main>
  );
}
