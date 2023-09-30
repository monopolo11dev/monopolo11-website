import React, { FC } from "react";

import SetCalculator from "@/components/SetCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monopolo11's Website - Calculadora de Conjuntos",
  description: "Monopolo11's calculadora de conjuntos",
};

const SetCalculatorPage: FC = () => {
  return <SetCalculator />;
};

export default SetCalculatorPage;
