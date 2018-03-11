import React from 'react';
import Highcharts from 'highcharts';
import { array } from 'prop-types';

import Highchart from '../Highchart/Highchart';

const ReviewsTypePiechart = (props) => {
  const { reviews } = props;

  let positiveCounter = 0;
  let negativeCounter = 0;
  reviews.forEach((review) => {
    if (review.positive) {
      positiveCounter += 1;
    } else {
      negativeCounter += 1;
    }
  });

  const positiveReviews = {
    name: 'Положительные отзывы',
    y: positiveCounter,
    color: '#26A65B'
  };
  const negativeReviews = {
    name: 'Отрицательные отзывы',
    y: negativeCounter,
    color: '#C0392B'
  };

  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: 'Соотношение положительных и отрицательных отзывов'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          style: {
            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
          }
        }
      }
    },
    series: [{
      name: 'Отзывы',
      colorByPoint: true,
      data: [positiveReviews, negativeReviews]
    }],
    credits: {
      enabled: false
    }
  };

  return (
    <div className="reviews-type-piechart">
      <Highchart
        container="reviewsTypePiechart"
        options={options}
      />
    </div>
  );
};

ReviewsTypePiechart.propTypes = {
  reviews: array.isRequired
};

export default ReviewsTypePiechart;