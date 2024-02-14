'use client';
import { Autocomplete, Group, Burger, rem } from '@mantine/core';
import classes from './Nav.module.css';
import Link from 'next/link';

const links = [
  {label: 'Repositories', path: '/compareRepo'},
  {label: 'Organizations', path: '/compareOrg'},
  {label: 'Package Downloads', path: '/compareDownloads'},
];

export default function Nav() {
  return (
    <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.path}
          className={classes.link}
         
        >
          {link.label}
        </Link>
      ))}
    </Group>
  )
}