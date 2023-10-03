'use client';

import { Container, Title, Text, Button, Group } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LEGACY_ROUTES } from '@/constants';
import { Illustration404 } from '@/components/Illustration404';
import classes from './not-found.module.css';

const LEGACY_TEXT =
  "Sorry, we couldn't find what you were looking for. You are probably looking for a page that was moved to a legacy page.";

const NOT_FOUND_TEXT =
  'Page you are trying to open does not exist. You may have mistyped the address, or thepage has been moved to another URL. If you think this is an error contact support.';

const NOT_FOUND_TITLE = 'Nothing to see here';

const LEGACY_TITLE = 'The page has moved';

function NotFoundPage() {
  const pathname = usePathname();
  const cleanPathname = pathname.slice(1);
  const isLegacy = LEGACY_ROUTES.includes(cleanPathname);

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration404 className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>{isLegacy ? LEGACY_TITLE : NOT_FOUND_TITLE}</Title>
          <Text c="dimmed" size="lg" ta="center" className={classes.description}>
            {isLegacy ? LEGACY_TEXT : NOT_FOUND_TEXT}
          </Text>
          <Group justify="center">
            <Link href="/">
              <Button size="md">Take me back to home page</Button>
            </Link>
            {isLegacy && (
              <Link href={`https://legacy.monopolo11.com/${pathname}`}>
                <Button size="md">Take me to legacy page</Button>
              </Link>
            )}
          </Group>
        </div>
      </div>
    </Container>
  );
}

export default NotFoundPage;
