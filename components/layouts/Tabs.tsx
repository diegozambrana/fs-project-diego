'use client'
import {
  Container,
  Group,
  Tabs,
} from '@mantine/core';
import classes from './Tabs.module.css';


const tabs = [
  'Repositories',
  'Organizations',
];

export default function TabsBase() {
    return (
      <Tabs
      defaultValue="Repositories"
      variant="outline"
      visibleFrom="sm"
      classNames={{
        root: classes.tabs,
        list: classes.tabsList,
        tab: classes.tab,
      }}
    >
      <Tabs.List>
        {tabs.map((tab) => (
          <Tabs.Tab value={tab} key={tab}>
            {tab}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs>
    );
}