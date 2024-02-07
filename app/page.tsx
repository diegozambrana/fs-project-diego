import styles from "./page.module.css";
import { Box, Card } from "@mantine/core";
import { Text } from '@mantine/core';
import ButtonBase from "@/components/ui/Button";
import Help from "@/components/ui/Help";

export default function Home() {
  return (
    <main className={styles.main}>
      <Card shadow="sm" padding="md" radius="md">
        <Box ta="right">
          <Help />
        </Box>
        <Text my="1rem" ta="center">
          You must to search a repository or library to compare.
        </Text>
        <Box ta="center" my="1rem">
          <ButtonBase>Add repository</ButtonBase>
        </Box>
      </Card>
    </main>
  );
}
