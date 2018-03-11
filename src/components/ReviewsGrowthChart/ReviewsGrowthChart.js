import React from 'react';
import moment from 'moment';
import { array } from 'prop-types';

import Highchart from '../Highchart/Highchart';

const ReviewsGrowthChart = (props) => {
  const { reviews } = props;
  const sortedByDateReviews = reviews.sort((a, b) => {
    return moment(b.date, 'DD.MM.YYYY HH:mm').valueOf() - moment(a.date, 'DD.MM.YYYY HH:mm').valueOf();
  }).reverse();

  const data = [];
  let counter = 1;
  for (let i = 0; i < sortedByDateReviews.length; i++) {
    const currentReview = sortedByDateReviews[i];
    const currentReviewDay = moment.utc(currentReview.date, 'DD.MM.YYYY HH:mm').format('YYYY-MM-DD 00:00');

    if (i < (sortedByDateReviews.length - 1)) {
      const nextReview = sortedByDateReviews[i + 1];
      const nextReviewDay = moment.utc(nextReview.date, 'DD.MM.YYYY HH:mm').format('YYYY-MM-DD 00:00');

      if (currentReviewDay === nextReviewDay) {
        counter += 1;
      } else {
        data.push([
          moment.utc(currentReviewDay, 'YYYY-MM-DD HH:mm').valueOf(),
          counter
        ]);
        counter = 1;
      }
    } else {
      data.push([
        moment.utc(currentReviewDay, 'YYYY-MM-DD HH:mm').valueOf(),
        counter
      ]);
    }
  }

  const options = {
    title: {
      text: 'Рост количества отзывов со временем'
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: {
      title: {
        text: 'Количество отзывов'
      }
    },
    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'bottom'
    },
    series: [{
      name: 'Отзывы',
      data: data
    }],
    credits: {
      enabled: false
    }
  };

  return (
    <div className="reviews-growth-chart">
      <Highchart
        container="reviewsGrowthChart"
        options={options}
      />
    </div>
  );
};

ReviewsGrowthChart.propTypes = {
  reviews: array.isRequired
};

export default ReviewsGrowthChart;