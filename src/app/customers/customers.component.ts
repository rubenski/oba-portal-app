import {Component, OnInit} from '@angular/core';
import {Customer} from '../customer';
import {CustomerService} from '../customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: Customer[];


  constructor(private customerService: CustomerService) {
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe(customers => this.customers = customers);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.customerService.addCustomer({name} as Customer)
      .subscribe(hero => {
        this.customers.push(hero);
      });
  }

  delete(customer: Customer): void {
    this.customers = this.customers.filter(h => h !== customer);
    this.customerService.deleteCustomer(customer).subscribe();
  }

  ngOnInit() {
    this.getCustomers();
  }

}
