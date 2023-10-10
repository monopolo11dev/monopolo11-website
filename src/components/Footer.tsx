'use client';

import { Anchor, Group, ActionIcon, rem, Flex } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';
import clsx from 'clsx';
import Link from 'next/link';
import classes from './Footer.module.css';
import packageInfo from '../../package.json';
import { AppRoutes } from '@/constants';

export function Footer() {
  const links = AppRoutes.filter((link) => !link.headerOnly);
  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      href={link.link}
      lh={1}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={clsx(classes.footer, 'px-16')}>
      <div className={classes.inner}>
        <Group className={classes.links}>{items}</Group>

        <Flex className="space-x-4">
          <p>Copyright {new Date().getFullYear()}. Monopolo11</p>

          <Link href="/changelog">
            <p>Version:{packageInfo.version}</p>
          </Link>
        </Flex>

        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <ActionIcon
            component="a"
            target="_blank"
            size="lg"
            variant="default"
            radius="xl"
            href="https://github.com/monopolo11/monopolo11-website"
          >
            <IconBrandGithub style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}
