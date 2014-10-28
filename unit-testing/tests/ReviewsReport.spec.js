describe('ReviewsReport', function() {
  var reviewsData;
  var reviewsReportA;
  var reviewsReportB;

  beforeEach(function() {
    reviewsData = {};
    reviewsData.restaurantA = [
      {
        title: '',
        stars: 4,
        cost: 2,
        description: ''
      },
      {
        title: '',
        stars: 3,
        cost: 1,
        description: ''
      },
      {
        title: '',
        stars: 4,
        cost: 3,
        description: ''
      },
      {
        title: '',
        stars: 4,
        cost: 3,
        description: ''
      },
      {
        title: '',
        stars: 5,
        cost: 2,
        description: ''
      },
      {
        title: '',
        stars: 3,
        cost: 2,
        description: ''
      }
    ];
    reviewsData.restaurantB = [
      {
        title: '',
        stars: 5,
        cost: 3,
        description: ''
      },
      {
        title: '',
        stars: 3,
        cost: 4,
        description: ''
      },
      {
        title: '',
        stars: 4,
        cost: 4,
        description: ''
      },
      {
        title: '',
        stars: 5,
        cost: 4,
        description: ''
      },
      {
        title: '',
        stars: 2,
        cost: 3,
        description: ''
      },
      {
        title: '',
        stars: 5,
        cost: 4,
        description: ''
      },
      {
        title: '',
        stars: 5,
        cost: 5,
        description: ''
      }
    ];

    reviewsReportA = new ReviewsReport('Restaurant A 2014', reviewsData.restaurantA);
    reviewsReportB = new ReviewsReport('Restaurant B 2014', reviewsData.restaurantB);
  });

  describe('getAverageRating', function() {
    it('should return the average rating for the restaurant', function() {
      expect(reviewsReportA.getAverageRating()).toEqual(3.8333333333333335);
      expect(reviewsReportB.getAverageRating()).toEqual(4.142857142857143);
    });
  });

  describe('findWithLowestRating', function() {
    it('should return an array with reviews with >= the number of stars', function() {
      expect(reviewsReportA.findWithLowestRating(4)).toEqual([
        {
          title: '',
          stars: 4,
          cost: 2,
          description: ''
        },
        {
          title: '',
          stars: 4,
          cost: 3,
          description: ''
        },
        {
          title: '',
          stars: 4,
          cost: 3,
          description: ''
        },
        {
          title: '',
          stars: 5,
          cost: 2,
          description: ''
        }
      ]);
      expect(reviewsReportB.findWithLowestRating(0)).toEqual(reviewsReportB.data);
    });
  });

  describe('getAverageCost', function() {
    it('should return the average cost score for the restaurant', function() {
      expect(reviewsReportA.getAverageCost()).toEqual(2.1666666666666665);
      expect(reviewsReportB.getAverageCost()).toEqual(3.857142857142857);
    });
  });

  describe('convertCostToDollarSign', function() {
    it('should covert a cost score to a string of dollar signs $', function() {
      expect(reviewsReportA.convertCostToDollarSign(2.1666666666666665)).toEqual('$$');
      expect(reviewsReportB.convertCostToDollarSign(3.857142857142857)).toEqual('$$$$');
    });
  });

  describe('summarize', function() {
    it('should return an object with all of the report data', function() {
      expect(reviewsReportA.summarize()).toEqual({
        name: "Restaurant A 2014",
        averageStarRating: 3.8333333333333335,
        totalReviews: 6,
        averageCost: {
            numeric: 2.1666666666666665,
            symbol: "$$"
        }
      });
      expect(reviewsReportB.summarize()).toEqual({
        name: "Restaurant B 2014",
        averageStarRating: 4.142857142857143,
        totalReviews: 7,
        averageCost: {
            numeric: 3.857142857142857,
            symbol: "$$$$"
        }
      });
    });
  });
});