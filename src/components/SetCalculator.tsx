'use client';

import {
  Alert,
  Button,
  Code,
  ComboboxItem,
  Container,
  CopyButton,
  Flex,
  LoadingOverlay,
  NumberInput,
  OptionsFilter,
  SegmentedControl,
  Select,
  Title,
  em,
  rem,
} from '@mantine/core';
import clsx from 'clsx';
import React, { FC, useEffect, useState } from 'react';

import { IconInfoCircle } from '@tabler/icons-react';
import Link from 'next/link';
import { useLocalStorage, useMediaQuery } from '@mantine/hooks';

import {
  SetFunction,
  SingleSetFunction,
  generateRandomSet,
  generateRange,
  setCardinality,
  setCartesianProduct,
  setDifference,
  setIntersection,
  setPower,
  setSymmetricDifference,
  setUnion,
} from '@/lib';
import SetInput from '@/components/inputs/SetInput';

export type Sets = 'a' | 'b' | 'universe';
export type SetsWOUniverse = Exclude<Sets, 'universe'>;

type Operation = {
  name: string;
  function: SetFunction | SingleSetFunction;
  singleSet?: boolean;
  withUniverse?: boolean;
  canBeSame?: boolean;
};

const OPERATIONS: Operation[] = [
  {
    name: 'Interseccion',
    function: setIntersection,
  },
  { name: 'Union', function: setUnion },
  { name: 'Diferencia', function: setDifference },
  {
    name: 'Diferencia Simetrica',
    function: setSymmetricDifference,
  },
  {
    name: 'Complemento',
    function: setDifference,
    singleSet: true,
    withUniverse: true,
  },
  {
    name: 'Producto Cartesiano',
    function: setCartesianProduct,
    canBeSame: true,
  },
  { name: 'Potencia', function: setPower, singleSet: true },
  { name: 'Cardinalidad', function: setCardinality, singleSet: true },
];

const SetCalculator: FC = () => {
  const [setA, setSetA] = useState<string[]>([]);
  const [setB, setSetB] = useState<string[]>([]);
  const [universeSize, setUniverseSize] = useState<number>(10);
  const [universe, setUniverse] = useState<string[]>([]);
  const [operation, setOperation] = useState<Operation>(OPERATIONS[0]);
  const [selectedSet1, setSelectedSet1] = useState<string | null>(null);
  const [selectedSet2, setSelectedSet2] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string[] | string>([]);
  const [hideAlert, setHideAlert] = useLocalStorage({
    key: 'hideVersionAlert',
    defaultValue: false,
  });

  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  const operationNames = Object.values(OPERATIONS).map((item) => item.name);

  const [operationSelection, setOperationSelection] = useState<string>(operationNames[0]);

  const setOptions = ['A', 'B', 'Universo'];

  const handleGenerateSet = (set: Sets) => {
    if (set === 'a') return setSetA(generateRandomSet(universe));
    return setSetB(generateRandomSet(universe));
  };

  const handleOperationChange = (value: string | null) => {
		if(value === null) return;
    const operationRes = OPERATIONS.filter((item) => item.name === value);
    setOperationSelection(value);
    if (operationRes[0]) setOperation(operationRes[0]);
  };

  const optionsFilter: OptionsFilter = ({ options }) => {
    const newOptions = options.filter((option) => (option as ComboboxItem).value !== 'Universo');
    if (operation?.canBeSame) return newOptions;
    return newOptions.filter((option) => (option as ComboboxItem).value !== selectedSet2);
  };
  const optionsFilter2: OptionsFilter = ({ options }) => {
    const newOptions = options.filter((option) => (option as ComboboxItem).value !== 'Universo');
    if (operation?.canBeSame) return newOptions;
    return newOptions.filter((option) => (option as ComboboxItem).value !== selectedSet1);
  };

  const getSet1 = (noUniverse = false) => {
    if (operation?.withUniverse && !noUniverse) return universe;
    if (selectedSet1 === 'A') return setA;
    return setB;
  };
  const getSet2 = () => {
    if (operation?.withUniverse) return getSet1(true);
    if (selectedSet2 === 'B') return setB;
    return setA;
  };

  const handleCalculate = () => {
    if (!operation) return;
    setIsLoading(true);
  };

  const handleHideAlert = () => {
    console.log('hiding alert');
    setHideAlert(true);
  };

  useEffect(() => {
    const set1 = getSet1();
    const set2 = getSet2();
    const res = operation.function(set1, set2);
    setResult(res);
  }, [isLoading]);

  useEffect(() => {
    setIsLoading(false);
  }, [result]);

  const isButtonDisabled =
    selectedSet1 === null || !operation || (selectedSet2 === null && !operation.singleSet);

  const resetSelectedSets = () => {
    setSelectedSet1(null);
    setSelectedSet2(null);
  };

  const resetSets = () => {
    setSetA([]);
    setSetB([]);
  };

  useEffect(() => {
    setUniverse(generateRange(universeSize));
    resetSelectedSets();
    resetSets();
    setResult([]);
  }, [universeSize]);

  useEffect(() => {
    resetSelectedSets();
  }, [operation]);

  return (
    <div className={clsx('flex flex-col items-center')}>
      <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
      <Title order={1}>Calculadora de conjuntos</Title>
      {!hideAlert && (
        <Flex className="w-1/2 my-6">
          <Alert
            variant="light"
            color="blue"
            title="Nueva version"
            icon={<IconInfoCircle />}
            withCloseButton
            onClose={handleHideAlert}
          >
            Bienvenidos a la calculadora de conjuntos version 2.0. Viendo el trafico que estaba
            teniendo esta pagina asi como que el trafico venia de una pagina de una universidad
            decidi mejorar la pagina. Esta hecha con tecnologias mas nuevas y con un mejor diseño.
            El codigo de esta estara disponible en mi github que se encuentra en el footer de este
            sitio. Si deseas ir a la version anterior da click{' '}
            <Link href="https://legacy.monopolo11.com/calcconj.php" className="underline">
              aqui
            </Link>
          </Alert>
        </Flex>
      )}
      <Title order={3}>Configuracion de los conjuntos</Title>
      <Container>
        <Flex direction="column" align="center" className="space-y-4">
          <NumberInput
            label="Tamaño del universo"
            value={universeSize}
            onChange={(value) => setUniverseSize(value as number)}
            min={1}
            step={1}
          />
          <div className="overflow-auto">
            {!isMobile ? (
              <SegmentedControl
                data={operationNames}
                value={operationSelection}
                onChange={handleOperationChange}
                title="Operacion"
              />
            ) : (
              <Select
                label="Operacion"
                data={operationNames}
                value={operationSelection}
                onChange={handleOperationChange}
                allowDeselect={false}
              />
            )}
          </div>

          <Flex
            direction={isMobile ? 'column' : 'row'}
            className={clsx(!isMobile && 'w-full')}
            justify="space-around"
          >
            <Select
              label={operation?.singleSet ? 'Conjunto' : 'Primer conjunto'}
              data={setOptions}
              filter={optionsFilter}
              value={selectedSet1}
              onChange={setSelectedSet1}
            />
            {!operation?.singleSet && (
              <Select
                label="Segundo conjunto"
                data={setOptions}
                filter={optionsFilter2}
                value={selectedSet2}
                onChange={setSelectedSet2}
              />
            )}
          </Flex>
        </Flex>
      </Container>
      <Container className="space-y-8">
        <SetInput
          label="Conjunto A"
          set={setA}
          setLabel="a"
          onGenerateSet={handleGenerateSet}
          universe={universe}
          onChange={setSetA}
        />
        <SetInput
          label="Conjunto B"
          set={setB}
          setLabel="b"
          onGenerateSet={handleGenerateSet}
          universe={universe}
          onChange={setSetB}
        />
      </Container>

      <Button
        className="mt-8"
        variant="filled"
        onClick={handleCalculate}
        disabled={isButtonDisabled}
      >
        Calcular
      </Button>

      <Flex className="mt-8">
        {!!result.length && (
          <Flex direction="column" className="space-y-6 w-full align-center items-center">
            <CopyButton value={result.toString()}>
              {({ copied, copy }) => (
                <Button
                  variant="filled"
                  color={copied ? 'teal' : ''}
                  onClick={copy}
                  style={{ width: rem('185px') }}
                >
                  {copied ? 'Copiado' : 'Copiar Resultado'}
                </Button>
              )}
            </CopyButton>
            <Code style={{ maxWidth: rem('500px') }}>{result.toString()}</Code>
          </Flex>
        )}
      </Flex>
    </div>
  );
};

export default SetCalculator;
