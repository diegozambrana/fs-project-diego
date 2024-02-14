import { DashboardPackages } from "@/components/dashboardDownloads";
import { Card } from "@mantine/core";

export default function CompareDownloads() {
  return (
    <main>
      <Card shadow="sm" padding="md" radius="md">
        <DashboardPackages />
      </Card>
    </main>
  );
}
