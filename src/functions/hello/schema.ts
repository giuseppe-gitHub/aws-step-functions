export default {
  type: "object",
  properties: {
    name: { type: 'string' },
    surname: {type: 'string'}
  },
  required: ['name', 'surname']
} as const;
