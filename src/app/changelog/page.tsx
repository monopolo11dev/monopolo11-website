import React, { FC } from 'react';
import Markdown from 'markdown-to-jsx';
import { readFileSync } from 'fs';
import { Title } from '@mantine/core';

const getData = () => {
  const markdown = readFileSync('CHANGELOG.md').toString();

  return markdown;
};

const Changelog: FC = () => {
  const markdown = getData();
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col">
        <Title order={1}>Changelog</Title>
        <Markdown>{markdown}</Markdown>
      </div>
    </div>
  );
};

export default Changelog;
