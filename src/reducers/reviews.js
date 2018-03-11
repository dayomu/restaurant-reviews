import {
  FETCH_REVIEWS,
  SWITCH_PAGINATION_PAGE,
  SWITCH_SORT_ORDER,
  SET_SEARCH_FILTER
} from '../constants/reviews';

const initialState = {
  isFetchingReviews: false,
  fetchReviewsError: '',
  reviews: [],
  currentPage: 1,
  itemsPerPage: 10,
  sortOrder: 'newer',
  searchFilter: ''
};

const reviews = (state = initialState, action) => {
  const {
    type,
    payload
  } = action;

  switch (type) {
    case FETCH_REVIEWS.REQUEST:
      return {
        ...state,
        isFetchingReviews: true
      };
    case FETCH_REVIEWS.SUCCESS:
      return {
        ...state,
        isFetchingReviews: false,
        reviews: Object.keys(payload).map((key) => {
          return {
            ...payload[key],
            id: key
          };
        })
      };
    case FETCH_REVIEWS.FAILURE:
      return {
        ...state,
        isFetchingReviews: false,
        fetchReviewsError: payload
      };
    case SWITCH_PAGINATION_PAGE:
      return {
        ...state,
        currentPage: payload
      };
    case SWITCH_SORT_ORDER:
      return {
        ...state,
        sortOrder: payload,
        currentPage: 1
      };
    case SET_SEARCH_FILTER:
      return {
        ...state,
        searchFilter: payload,
        currentPage: 1
      };
    default:
      return state
  }
};

export default reviews;