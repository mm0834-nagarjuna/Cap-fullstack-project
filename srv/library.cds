using { BOOKS, AUTHORS, CUSTOMER, BORROWEDBOOKS} from '../db/data-model';

service Library {

entity book as projection on BOOKS;
entity author as projection on AUTHORS; 
entity customer as projection on CUSTOMER;
entity borrowedbooks as projection on BORROWEDBOOKS;


/**
     * Function to get the average rating of a book based on its ISBN.
    //  */
   
    action getAverageRating(bookISBN: String) returns String;
}