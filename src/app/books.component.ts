import { Component } from '@angular/core';
import { WebService } from './web.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';


@Component({
  selector: 'books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent { 
  

  addNewBookForm;

  constructor(public webService: WebService,
    public formBuilder: FormBuilder,
    public authService: AuthService) {}

  ngOnInit() {

    this.addNewBookForm = this.formBuilder.group({
      author:['', Validators.required],
      title:['', Validators.required],
      country:['', Validators.required],
      language:['', Validators.required],
      cover_image:['', Validators.required],
      pages:['', Validators.required],
      year:['', Validators.required]

    });


    if (sessionStorage.page) {
      this.page = sessionStorage.page;
  }
  this.webService.getBooks(this.page);
}

nextPage() {
  this.page = Number(this.page) + 1;
  sessionStorage.page = Number(this.page);
  this.webService.getBooks(this.page);
 }

 onSubmit() {
   this.webService.addNewBook(this.addNewBookForm.value);
   this.addNewBookForm.reset();   
 }


 DeleteBook(_id) {
  this.webService.DeleteBook(this.page, _id);
 this.webService.getBooks(this.page);
 }



// EditBook(_id) {
//   this.webService.EditBookDetails(this.addNewBookForm);
//   this.webService.getBooks(this.addNewBookForm)
// } Proposed function to call for editing a book



previousPage() {
 if (this.page > 1) {
 this.page = Number(this.page) - 1;
 sessionStorage.page = Number(this.page);
 this.webService.getBooks(this.page);
 }

}

isInvalid(control) {
  return this.addNewBookForm.controls[control].invalid &&
         this.addNewBookForm.controls[control].touched;
}

isUnTouched() {
  return this.addNewBookForm.controls.author.pristine ||
         this.addNewBookForm.controls.title.pristine ||
         this.addNewBookForm.controls.country.pristine ||
         this.addNewBookForm.controls.language.pristine ||
         this.addNewBookForm.controls.cover_image.pristine ||
         this.addNewBookForm.controls.pages.pristine ||
         this.addNewBookForm.controls.year.pristine;
  }

  isInComplete() {
    return this.isInvalid('author') ||
           this.isInvalid('title') ||
           this.isInvalid('country') ||
           this.isInvalid('language') ||
           this.isInvalid('cover_image') ||
           this.isInvalid('pages') ||
           this.isInvalid('year') ||
           this.isUnTouched();
   

  }


page = 1;
}

