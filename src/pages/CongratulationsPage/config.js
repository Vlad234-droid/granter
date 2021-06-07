import React from 'react';
import { CongrCard1, CongrCard2, CongrCard3 } from '../../components/icons';

export const config = [
  {
    nameClass: 'card card1',
    title: '400 000 £ ',
    text: 'Final benefit amount',
    circleSVG: <CongrCard1 />,
  },
  {
    nameClass: 'card card2',
    title: '4 days ',
    text: 'Time taken to complete report',
    circleSVG: <CongrCard2 />,
  },
  {
    nameClass: 'card card3',
    title: '08/08/2021',
    text: 'Estimated payment date',
    circleSVG: <CongrCard3 />,
  },
];
