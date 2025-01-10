using { BOOKS, AUTHORS, CUSTOMER, BORROWEDBOOKS, CUSTOMERREVIEWS} from '../db/data-model';

service Library {

entity book as projection on BOOKS;
entity author as projection on AUTHORS; 
entity customer as projection on CUSTOMER;
entity borrowedbooks as projection on BORROWEDBOOKS;
entity customerReviews as projection on CUSTOMERREVIEWS;


/**
     * Function to get the average rating of a book based on its ISBN.
    //  */
   
    action getAverageRating(bookISBN: String) returns String;
}