function RatingCal(ratings) {
    // Extract the 'Rating' values from the input array
    let allRatings = ratings.map(d => Math.floor(d.Rating));
    // console.log("Extracted Ratings:", allRatings);
  
    // Calculate the sum of all ratings
    let sumRatings = allRatings.reduce((acc, curr) => acc + curr, 0);
    // console.log("Sum of Ratings:", sumRatings);
  
    // Calculate the average rating
    let averageRating = (sumRatings / allRatings.length).toFixed(2); // Rounded to 2 decimal places
    // console.log("Average Rating:", averageRating);
  
    // console.log(averageRating)
    return averageRating
  }
  

module.exports= {RatingCal}