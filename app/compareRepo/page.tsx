import { Box, Card } from "@mantine/core";
import Help from "@/components/ui/Help";
import { DashboardRepository } from "@/components/dashboardRepository";


export default function CompareRepo() {
  return (
    <main>
      <Card shadow="sm" padding="md" radius="md">
        <DashboardRepository />
      </Card>
    </main>
  );
}
