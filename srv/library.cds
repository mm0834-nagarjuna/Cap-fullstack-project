using { BOOKS, AUTHORS} from '../db/data-model';

service Library {

entity book as projection on BOOKS;
entity author as projection on AUTHORS; 

}