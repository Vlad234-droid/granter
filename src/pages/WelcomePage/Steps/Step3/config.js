import { validZero } from '../../../../core/constants';

export const firstRow = [
  {
    label: 'Internal staffing costs',
    name: 'staffing_costs',
    rules: [
      //   {
      //     required: true,
      //     message: 'Please select your approximate internal staffing costs!',
      //   },
      {
        pattern: validZero,
        message: 'The minimum value is one',
      },
    ],
    placeholder: 'Enter the number',
    type: 'number',
    suffix: '£',
  },
  {
    label: 'Subcontracting costs',
    name: 'materials_costs',
    // rules: [
    //   {
    //     required: true,
    //     message: 'Please select your approximate consumed materials costs!',
    //   },
    //   {
    //     required: true,
    //     pattern: validWithZero,
    //     message: 'Allow only numbers',
    //   },
    // ],
    placeholder: 'Enter the number',
    type: 'number',
    suffix: '£',
  },
];
export const secondRow = [
  {
    label: 'Consumable costs',
    name: 'subcontracting_costs',
    // rules: [
    //   {
    //     required: true,
    //     message: 'Please select your approximate subcontracting costs!',
    //   },
    //   {
    //     required: true,
    //     pattern: validWithZero,
    //   },
    // ],
    placeholder: 'Enter the number',
    type: 'number',
    suffix: '£',
  },
  {
    label: 'Software costs',
    name: 'software_costs',
    // rules: [
    //   {
    //     required: true,
    //     message: 'Please select your approximate software costs!',
    //   },
    //   {
    //     required: true,
    //     pattern: validWithZero,
    //   },
    // ],
    placeholder: 'Enter the number',
    type: 'number',
    suffix: '£',
  },
];
