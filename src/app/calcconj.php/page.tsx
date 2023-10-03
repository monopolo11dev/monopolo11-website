'use client';

import { push } from '@socialgouv/matomo-next';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

const CalcConjRedirect = () => {
  useEffect(() => push(['trackEvent', 'calc-conj-redirect']));
  redirect('/calculadora-de-conjuntos');
};

export default CalcConjRedirect;
