import { Component, OnInit, ElementRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  addForm: FormGroup;
  isEditable = false;
  isAddable = true;
  isRemovable = false;
  isCancelable = false;
  selectedId: string;
  productCount = 0;
  products: any = [];
  constructor(
    private elem: ElementRef,
    private snack: MatSnackBar,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      rating: ['', Validators.required]
    });
    this.authService.getAllProducts().subscribe(pro => {
      this.products = pro.data;
      this.productCount = Object.keys(pro.data).length;
    });
  }

  add() {
    this.authService.addProduct(this.addForm.value).subscribe(added => {
      if (added.success) {
        this.snack.open(added.message, 'OK', {
          duration: 3600
        });
        this.addForm.reset(true);
        this.authService.getAllProducts().subscribe(pro => {
          this.products = pro.data;
          this.productCount = Object.keys(pro.data).length;
        });
      } else {
        this.snack.open(added.message, 'OK', {
          duration: 3600
        });
      }
    });
  }

  edit() {
    this.isAddable = true;
    this.isEditable = false;
    this.isRemovable = false;
    this.isCancelable = false;
    const pdata = {
      name: this.addForm.get('name').value,
      price: this.addForm.get('price').value,
      rating: this.addForm.get('rating').value,
      id: this.selectedId
    }
    this.authService.updateProduct(pdata).subscribe(data => {
      if (data.success) {
        this.snack.open(data.message, 'OK', {
          duration: 3600
        });
        this.selectedId = '';
        this.addForm.reset(true);
        this.authService.getAllProducts().subscribe(pro => {
          this.products = pro.data;
          this.productCount = Object.keys(pro.data).length;
        });
      } else {
        this.snack.open(data.message, 'OK', {
          duration: 3600
        });
      }
    });
  }

  delete() {
    this.isAddable = true;
    this.isEditable = false;
    this.isRemovable = false;
    this.isCancelable = false;
    this.authService.deleteProduct(this.selectedId).subscribe(data => {
      if (data.success) {
        this.snack.open(data.message, 'OK', {
          duration: 3600
        });
        this.addForm.reset(true);
        this.authService.getAllProducts().subscribe(pro => {
          this.products = pro.data;
          this.productCount = Object.keys(pro.data).length;
        });
      } else {
        this.snack.open(data.message, 'OK', {
          duration: 3600
        });
      }
    });
  }

  cancel() {
    this.isAddable = true;
    this.isEditable = false;
    this.isRemovable = false;
    this.isCancelable = false;
    this.selectedId = '';
    this.addForm.setValue({
      name: '',
      price: '',
      rating: ''
    });
  }

  selectProduct(pro: any) {
    this.isAddable = false;
    this.isEditable = true;
    this.isRemovable = true;
    this.isCancelable = true;
    this.selectedId = pro._id;
    this.addForm.setValue({
      name: pro.name,
      price: pro.price,
      rating: pro.rating
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
