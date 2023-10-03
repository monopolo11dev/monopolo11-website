'use client';

import { Button, Title } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LEGACY_ROUTES } from '@/constants';

const LEGACY_TEXT =
  "Sorry, we couldn't find what you were looking for. You are probably looking for a page that was moved to a legacy page.";

const NOT_FOUND_TEXT = "Sorry, we couldn't find what you were looking for.";

function NotFoundPage() {
  const pathname = usePathname();
  const cleanPathname = pathname.slice(1);
  const isLegacy = LEGACY_ROUTES.includes(cleanPathname);

  return (
    <div className="w-1/2 flex flex-col items-center m-auto">
      <Title order={1}>Page not found</Title>
      <p>
        {isLegacy ? LEGACY_TEXT : NOT_FOUND_TEXT}
        <p>{pathname}</p>
      </p>
      {isLegacy && (
        <Button component={Link} href={`https://legacy.monopolo11.com${pathname}`}>
          Click here to try and redirect
        </Button>
      )}
    </div>
  );
}

export default NotFoundPage;
