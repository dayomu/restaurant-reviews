import { chibbisAPI } from '../utils/api';
import handleApiError from '../utils/handleApiError';

import {
  FETCH_REVIEWS,
  SWITCH_PAGINATION_PAGE,
  SWITCH_SORT_ORDER,
  SET_SEARCH_FILTER
} from '../constants/reviews';

export const fetchReviews = () => (dispatch) => {
  dispatch({ type: FETCH_REVIEWS.REQUEST });

  chibbisAPI
    .get('reviews')
    .then((response) => dispatch({ type: FETCH_REVIEWS.SUCCESS, payload: response.data }))
    .catch((error) => dispatch({ type: FETCH_REVIEWS.FAILURE, payload: handleApiError(error) }))
};

export const switchPaginationPage = (pageNumber) => ({ type: SWITCH_PAGINATION_PAGE, payload: pageNumber });

export const switchSortOrder = (sort) => ({ type: SWITCH_SORT_ORDER, payload: sort });

export const setSearchFilter = (searchString) => ({ type: SET_SEARCH_FILTER, payload: searchString });