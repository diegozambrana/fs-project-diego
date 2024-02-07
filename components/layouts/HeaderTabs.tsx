import {
  Container,
  Group,
} from '@mantine/core';
import Tabs from './Tabs';

import classes from './HeaderTabs.module.css';



export function HeaderTabs() {

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="md">
        <Group justify="space-between">
          <h1>Nixtla Tracker</h1>
        </Group>
      </Container>
      <Container size="md">
        <Tabs />
      </Container>
    </div>
  );
}