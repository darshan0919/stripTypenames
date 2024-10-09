export const FORM_CONFIG = [
  {
    id: 'fileName',
    type: 'TEXT',
    label: 'First Name',
    placeholder: 'Enter first name',
  },
  {
    id: 'size',
    type: 'NUMBER',
    label: 'Size',
    collapsibleConfig: {
      title: 'Allow Age Selection',
      initialValue: 45,
    },
  },
];
