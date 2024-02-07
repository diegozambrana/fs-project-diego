import { Card, Title, List, ListItem } from "@mantine/core";


export default function Sidebar() {
  return (
    <Card shadow="sm" padding="md" radius="md">
        <Title order={4}>Recent search</Title>
        <List>
            <ListItem>Link 1</ListItem>
            <ListItem>Link 2</ListItem>
            <ListItem>Link 3</ListItem>
        </List>
    </Card>
  );
}