import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthServiceService} from '../../services/auth-service.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
    signInForm: FormGroup;
  constructor( private formBuilder: FormBuilder,
               private authService: AuthServiceService,
               private router: Router) { }

  ngOnInit(): void {
      this.signInForm = this.formBuilder.group({
          usernameOrEmail: ['', Validators.required],
          password: ['', Validators.required],
      });
  }
}
