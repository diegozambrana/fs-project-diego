import styles from "./page.module.css";
import { Box, Card, Title } from "@mantine/core";
import { Text } from '@mantine/core';
import Help from "@/components/ui/Help";
import SearchModal from "@/components/modal/SearchModal";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <Card shadow="sm" padding="md" radius="md">
        <Title>Search repositories or organization data</Title>
        <Text>
          If you want to search stargazers data history from a repository need
          to redirect to the search repository Dashboard.
        </Text>
        <Box my="1rem">
          <Link href="/compareRepo">Dashboard to compare repositories</Link>
        </Box>
        <Text>
          If you want to search stargazers data history from an organization need
          to redirect to the search organization Dashboard.
        </Text>
        <Box mt="1rem">
          <Link href="/compareOrg">Dashboard to compare organizations</Link>
        </Box>
        <Text mt="1rem">
          If you want to search download data history from an package need
          to redirect to the search Download Package Dashboard.
        </Text>
        <Box mt="1rem">
          <Link href="/compareDownloads">Dashboard to compare Downloads Data</Link>
        </Box>
      </Card>
    </main>
  );
}
