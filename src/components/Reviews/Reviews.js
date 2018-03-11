import React, { Component } from 'react';
import { connect } from 'react-redux';
import { array, bool, string, number, object, func, oneOfType } from 'prop-types';
import { Row, Col, Spin, Icon } from 'antd';

import { fetchReviews } from '../../actions/reviews';

import ReviewsList from '../ReviewsList/ReviewsList';
import ReviewsSortAndFilters from '../ReviewsSortAndFilters/ReviewsSortAndFilters';
import ReviewsGrowthChart from '../ReviewsGrowthChart/ReviewsGrowthChart';
import ReviewsTypePiechart from '../ReviewsTypePiechart/ReviewsTypePiechart';

class Reviews extends Component {
  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(fetchReviews());
  }

  render() {
    const {
      reviews,
      currentPage,
      itemsPerPage,
      dispatch,
      isFetchingReviews,
      sortOrder,
      searchFilter,
    } = this.props;

    const loaderIcon = <Icon type="loading" className="loader" spin />;

    return (
      <Row gutter={30}>
        <Col className="gutter-row" xs={24} xl={14}>
          <div className="gutter-box">
            <h1>Отзывы</h1>
            {
              (isFetchingReviews || reviews.length === 0) ?
                <div className="loader-container">
                  <Spin indicator={loaderIcon} className="loader" />
                </div> :
                <div>
                  <ReviewsSortAndFilters
                    sortOrder={sortOrder}
                    searchFilter={searchFilter}
                    dispatch={dispatch}
                  />
                  <ReviewsList
                    reviews={reviews}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    sortOrder={sortOrder}
                    searchFilter={searchFilter}
                    dispatch={dispatch}
                  />
                </div>
            }
          </div>
        </Col>
        <Col className="gutter-row" xs={24} xl={10}>
          <div className="gutter-box">
            <h1>Графики</h1>
            {
              (isFetchingReviews || reviews.length === 0) ?
                <div className="loader-container">
                  <Spin indicator={loaderIcon} className="loader" />
                </div> :
                <div>
                  <ReviewsGrowthChart
                    reviews={reviews}
                  />
                  <ReviewsTypePiechart
                    reviews={reviews}
                  />
                </div>
            }
          </div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    reviews,
    isFetchingReviews,
    fetchReviewsError,
    currentPage,
    itemsPerPage,
    sortOrder,
    searchFilter
  } = state.reviews;

  return {
    reviews,
    isFetchingReviews,
    fetchReviewsError,
    currentPage,
    itemsPerPage,
    sortOrder,
    searchFilter
  }
};

Reviews.propTypes = {
  dispatch: func.isRequired,
  reviews: array.isRequired,
  currentPage: number.isRequired,
  itemsPerPage: number.isRequired,
  isFetchingReviews: bool.isRequired,
  sortOrder: string.isRequired,
  searchFilter: string.isRequired,
  fetchReviewsError: oneOfType([
    string,
    object
  ]).isRequired
};

export default connect(mapStateToProps)(Reviews);