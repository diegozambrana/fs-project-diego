import { DashboardOrganization } from "@/components/dashboardOrganization";
import { Card } from "@mantine/core";

export default function CompareOrg() {
  return (
    <main>
      <Card shadow="sm" padding="md" radius="md">
        <DashboardOrganization />
      </Card>
    </main>
  );
}
