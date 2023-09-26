"use client";
import { Sets } from "@/app/calculadora-de-conjuntos/page";
import { ActionIcon, TagsInput, em, rem } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconArrowsShuffle } from "@tabler/icons-react";
import clsx from "clsx";
import React, { Dispatch, FC, SetStateAction, useState } from "react";

interface SetInputProps {
  className?: string;
  universe: string[];
  set: string[];
  onGenerateSet: (set: Sets) => void;
  label: string;
  onChange: Dispatch<SetStateAction<string[]>>;
  setLabel: "a" | "b";
}

const SetInput: FC<SetInputProps> = ({
  className,
  set,
  onChange,
  onGenerateSet,
  label,
  setLabel,
  universe,
}) => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  return (
    <div className={clsx("flex flex-col items-center", className)}>
      {label}
      <div
        className={clsx(
          !isMobile ? "flex " : "flex-col items-center place-items-center",
          "justify-center align-center content-center"
        )}
      >
        <TagsInput
          data={universe}
          value={set}
          onChange={onChange}
          styles={{
            input: {
              overflowY: "scroll",
              maxHeight: rem("250px"),
              width: !isMobile ? rem("500px") : "100%",
            },
          }}
        />
        <div className={clsx("my-auto pl-5", isMobile && "pt-4")}>
          <ActionIcon
            className="mt-auto"
            onClick={() => onGenerateSet(setLabel)}
          >
            <IconArrowsShuffle className="m-auto" />
          </ActionIcon>
        </div>
      </div>
    </div>
  );
};

export default SetInput;
