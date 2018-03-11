import React, { Component } from 'react';
import { Row, Col, Input, Icon, Radio, Tooltip } from 'antd';
import { string, func } from 'prop-types';

import { switchSortOrder, setSearchFilter } from '../../actions/reviews';

import './ReviewsSortAndFilters.css';

class ReviewsSortAndFilters extends Component {
  handleSortOrderChange = (e) => {
    this.props.dispatch(switchSortOrder(e.target.value));
  };

  handleSearchInputChange = (e) => {
    this.props.dispatch(setSearchFilter(e.target.value));
  };

  render() {
    const {
      sortOrder,
      searchFilter
    } = this.props;

    return (
      <Row gutter={30}>
        <Col className="gutter-row" xs={24} lg={17}>
          <div className="gutter-box reviews-search">
            <Input
              addonBefore="Поиск по отзывам"
              addonAfter={<Icon type="search" />}
              placeholder="Начните вводить текст отзыва"
              onChange={this.handleSearchInputChange}
              value={searchFilter}
            />
          </div>
        </Col>
        <Col className="gutter-row" xs={24} lg={7}>
          <div className="gutter-box reviews-sort">
            <Radio.Group
              value={sortOrder}
              onChange={this.handleSortOrderChange}
            >
              <Radio.Button value="newer">
                <Tooltip title="Сначала новые">
                  <Icon type="down-circle-o" />
                </Tooltip>
              </Radio.Button>
              <Radio.Button value="older">
                <Tooltip title="Сначала старые">
                  <Icon type="up-circle-o" />
                </Tooltip>
              </Radio.Button>
              <Radio.Button value="positive">
                <Tooltip title="Сначала положительные">
                  <Icon type="like-o" />
                </Tooltip>
              </Radio.Button>
              <Radio.Button value="negative">
                <Tooltip title="Сначала отрицательные">
                  <Icon type="dislike-o" />
                </Tooltip>
              </Radio.Button>
            </Radio.Group>
          </div>
        </Col>
      </Row>
    );
  }
}

ReviewsSortAndFilters.propTypes = {
  dispatch: func.isRequired,
  sortOrder: string.isRequired,
  searchFilter: string.isRequired
};

export default ReviewsSortAndFilters;