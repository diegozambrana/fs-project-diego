import {
  Container,
  Group,
} from '@mantine/core';
import classes from './Header.module.css';
import Nav from './Nav';
import Link from 'next/link';

export function Header() {

  return (
    <header className={classes.header}>
      <Container size="lg">
        <div className={classes.inner}>

          <Group>
            <Link className={classes.title} href="/">
              <h1>Nixtla Tracker</h1>
            </Link>
          </Group>

          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            <Nav />
          </Group>

        </div>
      </Container>
    </header>
  );
}