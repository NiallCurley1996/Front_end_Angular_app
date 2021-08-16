import { Component } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent { 

  reviewForm;

  constructor(public webService: WebService,
              private route: ActivatedRoute,
              public formBuilder: FormBuilder,
              public authService: AuthService) {}

  ngOnInit() {

      this.reviewForm = this.formBuilder.group({
        name: ['', Validators.required],
        comments: ['', Validators.required],
        book_rating: '1'
      });

    

    this.webService.getBook(
          this.route.snapshot.params.id);
    this.webService.getBookReviews(
            this.route.snapshot.params.id);
          
          this.webService.book
            .subscribe(book => {
              this.book = book
            })

           
    }

  book;

  onSubmit() {
    this.webService.postReview(this.reviewForm.value)
    this.reviewForm.reset();
  }

 
 
  isInvalid(control) {
    return this.reviewForm.controls[control].invalid &&
           this.reviewForm.controls[control].touched;
  }

  isUnTouched() {
    return this.reviewForm.controls.name.pristine ||
           this.reviewForm.controls.comments.pristine;
           
  }

  isIncomplete() {
    return this.isInvalid('name') ||
           this.isInvalid('comments') ||
           this.isUnTouched();
    }


}


