@cds.persistence.exists
entity BOOKS {
    key BookID        : String(36);
        Title         : String(255);
        ISBN          : String(13);
        Genre         : String(50);
        PublishedYear : Integer;
        Price         : Decimal(10, 2);
        Stock         : Integer default 0;
        AuthorID      : String(36);
        AuthorName    : String(225);
}

@cds.persistence.exists
entity AUTHORS {
    key AuthorID    : String(36);
        Name        : String(255);
        DateOfBirth : Date;
        Nationality : String(100);
        Bio         : String(1000);
        Books       : Composition of many BOOKS
                          on Books.AuthorID = $self.AuthorID;
}

context CDSViews {
    define view Genres as 
    select  distinct key Genre from BOOKS 
    
}