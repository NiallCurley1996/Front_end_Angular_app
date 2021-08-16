
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable()
export class WebService {

    public books_private_list;
    public booksSubject = new Subject();
    book_list = this.booksSubject.asObservable();

    public book_private_list;
    public bookSubject = new Subject();
    book = this.bookSubject.asObservable();
    public reviews_private_list;
    public reviewsSubject = new Subject();
    list_of_reviews = this.reviewsSubject.asObservable();
    bookID;
    addBook;



 constructor(private http: HttpClient) {}
 
 getBooks(page) {
    return this.http.get(
        'http://localhost:5000/api/v1.0/books?pn=' + page)
        .subscribe(response => {
            this.books_private_list = response;
            this.booksSubject.next(
                this.books_private_list);
                this.addBook = page;
        });
 }



 DeleteBook(page, _id) {
    return this.http.delete(
        'http://localhost:5000/api/v1.0/books/'+ _id)
        .subscribe(response => {
            this.getBooks(page)
        });
 }


   getBook(id) {
      return this.http.get(
          'http://localhost:5000/api/v1.0/books/'+id)
             .subscribe(response => {
                 this.book_private_list = response;
            this.bookSubject.next(
                this.book_private_list);

            this.bookID = id;

})
}

    getBookReviews(id) {
        return this.http.get(
            'http://localhost:5000/api/v1.0/books/' + id + '/reader_reviews')
            .subscribe(
                response => {
                    this.reviews_private_list = response;
                    this.reviewsSubject.next(
                        this.reviews_private_list
                    );
                }
            ) 
        
}

DeleteBookReview(id, _id) {
    return this.http.delete(
        'http://localhost:5000/api/v1.0/books/'+ _id + '/reader_reviews/' + id)
        .subscribe(response => {
            this.getBookReviews(id)
            // this.getBook(_id)
            
            
        });
 }

postReview(review) {
    let postData = new FormData();
    postData.append("name", review.name);
    postData.append("comments", review.comments);
    postData.append("book_rating", review.book_rating);

    this.http.post(
        'http://localhost:5000/api/v1.0/books/' +
                     this.bookID + '/reader_reviews',
        postData).subscribe(
        response => {
        this.getBookReviews(this.bookID);
        } );
    

}




addNewBook(book) {
    let postData = new FormData();
    postData.append("author", book.author);
    postData.append("title", book.title);
    postData.append("country", book.country);
    postData.append("language", book.language);
    postData.append("cover_image", book.cover_image);
    postData.append("pages", book.pages);
    postData.append("year", book.year);


    this.http.post(
        'http://localhost:5000/api/v1.0/books',
        postData).subscribe(
            response => {
                this.getBooks(this.addBook);
            }
        )
}



// EditBookDetails(_id) {
//     let postData = new FormData();
//     postData.append("author", _id.author);
//     postData.append("title", _id.title);
//     postData.append("country", _id.country);
//     postData.append("language", _id.language);
//     postData.append("cover_image", _id.cover_image);
//     postData.append("pages", _id.pages);
//     postData.append("year", _id.year);

//     this.http.put(
//         'http://localhost:5000/api/v1.0/books',
//         postData).subscribe(
//             response => {
//                 this.getBooks(this.addBook);
//             }
//         )
// } 
//The intention of this webService function was to allow for editing of book details.
//Unable to implement
}
