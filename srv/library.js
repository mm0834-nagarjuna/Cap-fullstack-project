const cds = require('@sap/cds');
const { RatingCal } = require('./handlers/ratings')
const { func } = cds.ql
const events = require('events');
events.EventEmitter.defaultMaxListeners = 100000; 

module.exports = cds.service.impl(async function () {
    const { CUSTOMERREVIEWS, BOOKS } = this.entities;

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

    this.after('READ', 'book', async (books) => {
        if (Array.isArray(books)) {
            const results = await Promise.all(
                books.map(async (book) => {
                    const sqlCommand = `SELECT AVG("RATING") as AverageRating FROM ${CUSTOMERREVIEWS} WHERE BookISBN = ?`;
                    const [result] = await cds.run(sqlCommand, [book.ISBN]);
                    // console.log(result)
                    book.AverageRating = result?.AVERAGERATING || null;
                    return book;
                })
            );
            console.log('Enhanced API Response:', results);
        }
    });
    
    
    
});
