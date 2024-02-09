import { Box, Card } from "@mantine/core";
import { Text } from '@mantine/core';
import Help from "@/components/ui/Help";
import SearchModal from "@/components/modal/SearchModal";

export default function CompareRepo() {
  return (
    <main>
      <Card shadow="sm" padding="md" radius="md">
        <Box ta="right">
          <Help content={"Help Text"}/>
        </Box>
        <Text my="1rem" ta="center">
          You must to search a repository or library to compare.
        </Text>
        <Box ta="center" my="1rem">
          <SearchModal typeData="repo" />
        </Box>
      </Card>
    </main>
  );
}