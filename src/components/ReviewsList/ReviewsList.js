import React, { Component } from 'react';
import { Pagination, Row, Col, Icon } from 'antd';
import { array, string, number, func } from 'prop-types';
import moment from 'moment';

import { switchPaginationPage } from '../../actions/reviews';

import './ReviewsList.css';

class ReviewsList extends Component {
  getSortedAndFilteredReviews() {
    const {
      reviews,
      sortOrder,
      searchFilter
    } = this.props;

    let sortedReviews = reviews.slice(0);

    switch(sortOrder) {
      case 'positive':
        sortedReviews = sortedReviews.sort((a, b) => {
          return (a.positive === b.positive) ? 0 : a.positive ? -1 : 1;
        });
        break;
      case 'negative':
        sortedReviews = sortedReviews.sort((a, b) => {
          return (a.positive === b.positive) ? 0 : a.positive ? 1 : -1;
        });
        break;
      case 'older':
        sortedReviews = sortedReviews.sort((a, b) => {
          return moment(b.date, 'DD.MM.YYYY HH:mm').valueOf() - moment(a.date, 'DD.MM.YYYY HH:mm').valueOf();
        }).reverse();
        break;
      case 'newer':
      default:
        sortedReviews = sortedReviews.sort((a, b) => {
          return moment(b.date, 'DD.MM.YYYY HH:mm').valueOf() - moment(a.date, 'DD.MM.YYYY HH:mm').valueOf();
        });
        break;
    }

    if (searchFilter.length > 0) {
      return sortedReviews.filter(review => review.text.indexOf(searchFilter) > -1);
    }

    return sortedReviews;
  }

  getReviewsToRender = (reviews) => {
    const {
      currentPage,
      itemsPerPage,
    } = this.props;

    const startIndex = ((currentPage - 1) * itemsPerPage);
    return reviews.slice(startIndex, startIndex + 10);
  };

  handlePaginationChange = (page) => {
    this.props.dispatch(switchPaginationPage(page));
  };

  render() {
    const {
      currentPage,
      itemsPerPage
    } = this.props;

    const sortedAndFilteredReviews = this.getSortedAndFilteredReviews();
    const reviewsToRender = this.getReviewsToRender(sortedAndFilteredReviews);

    return (
      <div className="reviews-list">
        <ul className="reviews">
          {
            reviewsToRender.map((review) => {
              const statusClassName = (review.positive) ?
                "review__status review__status_positive" :
                "review__status review__status_negative";
              return (
                <li key={review.id} className="review">
                  <Row gutter={30}>
                    <Col className="gutter-row" xs={8} sm={4} md={3}>
                      <div className="review__avatar">
                        <Icon type="user" />
                      </div>
                    </Col>
                    <Col className="gutter-row" xs={16} sm={20} md={21}>
                      <div className="review__name">{review.name}</div>
                      <div className={statusClassName}>{
                        (review.positive) ?
                          <Icon type="like-o" /> :
                          <Icon type="dislike-o" />
                      }</div>
                      <div className="review__text">{review.text}</div>
                      <div className="review__date">{review.date}</div>
                        {
                          (Object.keys(review.comments).length > 0) ?
                            <div className="review__comments">
                              <div className="review__comments-label">Комментарии</div>
                              <ul className="review__comments-list">
                                {
                                  Object.keys(review.comments).map((key) => {
                                    const comment = review.comments[key];
                                    return <li key={key}>{comment.comment}</li>
                                  })
                                }
                              </ul>
                            </div>  :
                            null
                        }
                    </Col>
                  </Row>
                </li>
              );
            })
          }
        </ul>
        <div className="reviews-list__pagination-container">
          <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={sortedAndFilteredReviews.length}
            onChange={this.handlePaginationChange}
          />
        </div>
      </div>
    );
  }
}

ReviewsList.propTypes = {
  reviews: array.isRequired,
  currentPage: number.isRequired,
  itemsPerPage: number.isRequired,
  sortOrder: string.isRequired,
  searchFilter: string.isRequired,
  dispatch: func.isRequired
};

export default ReviewsList;