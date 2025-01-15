@cds.persistence.exists
entity BOOKS {
    key BookID        : String(36);
        Title         : String(255);
        ISBN          : String(13);
        Genre         : String(50);
        PublishedYear : String(255);
        Price         : Decimal(10, 2);
        Stock         : Integer default 0;
        AuthorID      : String(36);
        AuthorName    : String(225);
        Author        : Composition of one AUTHORS
                            on Author.AuthorID = $self.AuthorID;
        Reviews       : Composition of many CUSTOMERREVIEWS
                            on Reviews.BookISBN = $self.ISBN;
        AverageRating : Decimal(2, 1);
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

@cds.persistence.exists
entity CUSTOMER {
    key CustomerId    : Integer;
        Name          : String(255);
        Email         : String(255);
        Phone         : String(15);
        Address       : String(255);
        Gender        : String(8);
        CustomerType  : String(50);
        BorrowedBooks : Composition of many BORROWEDBOOKS
                            on BorrowedBooks.CustomerEmail = $self.Email;
        Reviews       : Composition of many CUSTOMERREVIEWS
                            on Reviews.CustomerID = $self.CustomerId;
}

@cds.persistence.exists
entity BORROWEDBOOKS {
    key ID               : Integer;
        CustomerName     : String(255);
        CustomerEmail    : String(255);
        BookISBN         : String(50);
        BookName         : String(255);
        BorrowedDate     : Date;
        ReturnDate       : Date;
        ActualReturnDate : Date;
        Quantity         : Integer;
        Remarks          : String(1000);
        BookDetails      : Association to one BOOKS
                               on BookDetails.ISBN = $self.BookISBN;
}

@cds.persistence.exists
entity CUSTOMERREVIEWS {
    key ID         : Integer;
        CustomerID : Integer;
        BorrowID   : Integer not null;
        BookISBN   : String(50);
        BookName   : String(255);
        Review     : String(5000);
        Rating     : Decimal(2, 1);
        ReviewDate : Date not null @cds.on.insert: $now;
}
