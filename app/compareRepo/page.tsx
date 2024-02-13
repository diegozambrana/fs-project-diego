import { Card } from "@mantine/core";
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
