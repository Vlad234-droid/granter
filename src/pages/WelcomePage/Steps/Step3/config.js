import { validZero, validWithZero } from '../../../../core/constants';

export const firstRow = [
  {
    label: 'What are your approximate internal staffing costs per year?',
    name: 'staffing_costs',
    // rules: [
    //   {
    //     required: true,
    //     message: 'Please select your approximate internal staffing costs!',
    //   },
    //   {
    //     required: true,
    //     pattern: validZero,
    //     message: 'The minimum value is one',
    //   },
    // ],
    placeholder: 'Enter the number',
    type: 'number',
    suffix: '£',
  },
  {
    label: 'What are your approximate consumed materials costs per year?',
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
    label: 'What are your approximate subcontracting costs per year?',
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
    label: 'What are your approximate software costs per year?',
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
