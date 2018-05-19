const Review = {
  type: 'object',
  additionalProperties: false,
  properties: {
    rating: { type: 'number' },
    description: { type: 'string', minLength: 1 },
  },
  required: ['rating', 'description'],
  errorMessage: {
    properties: {
      rating: 'rating required',
      description: 'description required',
    },
  },
};

export default Review;
