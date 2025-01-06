using { BOOKS, AUTHORS, CUSTOMER, BORROWEDBOOKS} from '../db/data-model';

service Library {

entity book as projection on BOOKS;
entity author as projection on AUTHORS; 
entity customer as projection on CUSTOMER;
entity borrowedbooks as projection on BORROWEDBOOKS;
}