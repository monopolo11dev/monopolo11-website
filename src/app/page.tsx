import { IconBrandGithub } from '@tabler/icons-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="h-3/5 flex flex-col items-center justify-between p-12">
      <Link href="https://github.com/monopolo11">
        <IconBrandGithub size="85%" />
      </Link>
    </main>
  );
}
