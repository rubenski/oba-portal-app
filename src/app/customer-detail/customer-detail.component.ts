import {Component, OnInit, Input} from '@angular/core';
import {Customer} from '../customer';
import {CustomerService} from '../customer.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  @Input() customer: Customer;

  constructor(private route: ActivatedRoute,
              private customerService: CustomerService,
              private location: Location) {
  }

  ngOnInit(): void {
    this.getCustomer();
  }

  save(): void {
    this.customerService.updateCustomer(this.customer)
      .subscribe(() => this.goBack());
  }

  getCustomer(): void {
    console.log("check");
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.customerService.getCustomer(id)
      .subscribe(customer => this.customer = customer);
  }

  goBack(): void {
    this.location.back();
  }

}
