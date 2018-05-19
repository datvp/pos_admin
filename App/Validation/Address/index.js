const Address = {
  type: 'object',
  additionalProperties: false,
  properties: {
    label: { type: 'string', minLength: 1 },
    houseNo: { type: 'string', minLength: 1 },
    landMark: { type: 'string', minLength: 1 },
    state: { type: 'string', minLength: 1 },
    city: { type: 'string', minLength: 1 },
    zipCode: { type: 'string', minLength: 1 },
  },
  required: ['label', 'houseNo', 'landMark', 'state', 'city', 'zipCode'],
  errorMessage: {
    properties: {
      label: 'Location required',
      houseNo: 'House number required',
      landMark: 'Land Mark required',
      state: 'State required',
      city: 'City required',
      zipCode: 'Zip code required',
    },
  },
};

export default Address;
