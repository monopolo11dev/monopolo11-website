'use client';

import { Menu, Group, Center, Container, Title, em } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import Link from 'next/link';
import classes from './HeaderMenu.module.css';
import { AppRoutes } from '@/constants';

export function HeaderMenu() {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  const links = AppRoutes.filter((link) => !link.footerOnly);

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <Link href={link.link} className={classes.link}>
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </Link>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link key={link.label} href={link.link} className={classes.link}>
        {link.label}
      </Link>
    );
  });

  return (
    <header className={classes.header}>
      <Container size="85%">
        <div className={classes.inner}>
          <Link href="/">
            <Title order={1} size={isMobile ? '24' : '30'}>
              Monopolo11&apos;s Website
            </Title>
          </Link>
          <Group gap={5} visibleFrom="sm" className="ml-8">
            {items}
          </Group>
        </div>
      </Container>
    </header>
  );
}
