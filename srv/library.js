const cds = require('@sap/cds');
const { RatingCal } = require('./handlers/ratings')
const { func } = cds.ql
const events = require('events');
events.EventEmitter.defaultMaxListeners = 100000; 
const { CUSTOMERREVIEWS, BOOKS } = cds.entities;
module.exports = cds.service.impl(async function () {
    

    this.on('getAverageRating', async (req) => {
        const { bookISBN } = req.data;

        // Validate the input
        if (!bookISBN) {
            req.reject(400, 'Book ISBN is required');
        }

        // Query the database to calculate average rating and total reviews
        const result = await cds.run(
            SELECT.from(CUSTOMERREVIEWS)
                .where({ BookISBN: bookISBN })
        );

        AverageRating = await RatingCal(result)

        return {
            BookISBN: bookISBN,
            AverageRating: AverageRating,
            TotalReviews: result.length
        }



    });

    this.before('READ', 'book', async (req) => {
       if (req.data.BookID){
        const bookID = req.data.BookID
        const bookDetails = await SELECT.from(BOOKS).where({BookID:bookID})
        const AvgRating =bookDetails[0].ISBN ? await cds.run(`SELECT AVG(Rating) as avgRating from ${CUSTOMERREVIEWS} where BookISBN = '${bookDetails[0].ISBN}'`) : false
        // console.log(AvgRating)
        await UPDATE `BOOKS` .set `AverageRating = ${AvgRating[0].AVGRATING}` .where `BookID=${bookID}`
        // console.log(req)
       }
        
            
    });
    
});
