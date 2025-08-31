export default {
  routes: [
    {
      method: 'GET',
      path: '/courses',
      handler: 'course.find',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/courses/:id',
      handler: 'course.findOne',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
