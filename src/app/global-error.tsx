'use client';

import { Container, Title, Text, Group, Button } from '@mantine/core';
import { useEffect } from 'react';
import classes from './error.module.css';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>Something bad just happened...</Title>
          <Text c="dimmed" size="lg" ta="center" className={classes.description}>
            Our servers could not handle your request. Don&apos;t worry, our development team was
            already notified. Try refreshing the page.
          </Text>
          <Group justify="center">
            <Button size="md" onClick={reset}>
              Refresh the page
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  );
}
