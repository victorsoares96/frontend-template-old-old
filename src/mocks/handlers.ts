import { rest } from 'msw';

import * as mainMocks from '@/mocks/data/main.mock';

const mainApi = import.meta.env.VITE_MAIN_API;

export const handlers = [
  /* rest.post(`${authenticationUrl}/signUp`, (req, res, ctx) => {
    return res(ctx.status(200));
  }), */
  rest.post(`${mainApi}/sessions`, (req, res, ctx) => {
    return res(ctx.json(mainMocks.signInRequestResponse));
  }),
  /* rest.get(`${mainApi}/food-types`, (req, res, ctx) => {
    return res(ctx.json(foodMocks.getFoodTypesResponse));
  }),
  rest.get(`${mainApi}/foods`, (req, res, ctx) => {
    const { foodTypeId } = req.params;

    switch (foodTypeId) {
      case '1':
        return res(ctx.json(foodMocks.getFoodsResponse));
      case '2':
        return res(ctx.json(foodMocks.getFoodsResponse));
      case '3':
        return res(ctx.json(foodMocks.getFoodsResponse));
      case '4':
        return res(ctx.json(foodMocks.getFoodsResponse));
      default:
        return res(ctx.json([]));
    }
  }), */
];
