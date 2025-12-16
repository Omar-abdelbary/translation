import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateService } from '../../core/services/translate.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { Itranslatetext } from '../../core/interfaces/itranslatetext';

@Component({
  selector: 'app-traslator',
  standalone: true,
  imports: [
    ReactiveFormsModule ,
    // NgClass ,
  ],
  templateUrl: './traslator.component.html',
  styleUrl: './traslator.component.css'
})
export class TraslatorComponent implements OnInit {


  //  injection service here
  private readonly _FormBuilder = inject(FormBuilder) ;
  private readonly _TranslateService = inject(TranslateService) ;
  private readonly _ToastrService = inject(ToastrService) ;

// veriabale to hold output text
  outputText:WritableSignal<Itranslatetext | null> = signal( null) ;
  languages: WritableSignal<string[]> = signal([]) ;

  //  form translate
  translateForm : FormGroup = this._FormBuilder.group({
    text : [null , [Validators.required , Validators.minLength(5) , Validators.maxLength(600)]] ,
    targetLanguage : ["" , [Validators.required]]  ,
  }) ;





//  life cycle hook component
ngOnInit(): void {


        // get languages from service
  this._TranslateService.getLanguages().subscribe({
    next:(res)=>{

      this.languages.set(res) ;

    },

    // error:(err:HttpErrorResponse)=>{
    //   console.log(err);

    // }
  })






  // call function to listen to form changes
  this.listenToTranslateChanges();
}


listenToTranslateChanges() {
  this.translateForm.valueChanges.pipe(

    debounceTime(450),               // يستنى المستخدم يوقف كتابة
    filter(() => this.translateForm.valid), // لو الفورم غلط متترجمش
    distinctUntilChanged(
      (prev, curr) =>
        prev.text === curr.text &&
        prev.targetLanguage === curr.targetLanguage
    ),

    switchMap(formValue =>
      this._TranslateService.translate(formValue)
    )

  ).subscribe({
    next: (res) => {
      // console.log(res);
       this.outputText.set(res);
      this._ToastrService.success('Translation successful', 'Trtanslated');
    },
    // error: (err:HttpErrorResponse) => {
    //   console.log(err);

    //   this._ToastrService.error('Translation failed', 'Error');
    // }
  });
}





swapText() {
  const translated = this.outputText();

  if (!translated) return;

  this.translateForm.patchValue({
    text: translated.translatedText
  });

  this.outputText.set(null);
}


















}
