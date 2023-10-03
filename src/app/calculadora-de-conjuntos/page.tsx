import React, { FC } from 'react';
import { Metadata } from 'next';

import SetCalculator from '@/components/SetCalculator';

export const metadata: Metadata = {
  title: "Monopolo11's Website - Calculadora de Conjuntos",
  description: "Monopolo11's calculadora de conjuntos",
};

const SetCalculatorPage: FC = () => <SetCalculator />;

export default SetCalculatorPage;
