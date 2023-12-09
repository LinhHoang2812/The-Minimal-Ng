import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  BottomSize,
  SingleProduct,
  TopSize,
} from 'src/app/models/database.model';
import { FirebaseServiceService } from 'src/app/service/firebase-service.service';
import { DataSource } from '@angular/cdk/collections';
import { MatTabGroup } from '@angular/material/tabs';

const topTable: TopSize[] = [
  { measure: 'S', chest: 90, length: 46, shoulder: 40 },
  { measure: 'M', chest: 92, length: 48, shoulder: 42 },
  { measure: 'L', chest: 94, length: 48, shoulder: 44 },
  { measure: 'XL', chest: 96, length: 50, shoulder: 46 },
];

const bottomTable: BottomSize[] = [
  { measure: 'S', waist: 56, length: 95, hip: 90 },
  { measure: 'M', waist: 60, length: 98, hip: 92 },
  { measure: 'L', waist: 64, length: 100, hip: 94 },
  { measure: 'XL', waist: 70, length: 102, hip: 96 },
];

@Component({
  selector: 'app-product-tab',
  templateUrl: './product-tab.component.html',
  styleUrls: ['./product-tab.component.css'],
})
export class ProductTabComponent {
  @Input() id: string;
  @ViewChild('tab') tab: MatTabGroup;
  description: string;
  displayedColumns: string[];
  dataSource: any;
  constructor(public firebase: FirebaseServiceService) {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['id'].previousValue) {
      this.tab.selectedIndex = 0;
    }
  }
  ngOnInit() {
    this.firebase.product.subscribe((value: SingleProduct) => {
      if (value) {
        this.description = value.des;

        if (value.category === 'pants' || value.category === 'skirt') {
          this.displayedColumns = ['measure', 'waist', 'length', 'hip'];
          this.dataSource = new ExampleDataSource(bottomTable);
        } else {
          this.displayedColumns = ['measure', 'chest', 'length', 'shoulder'];
          this.dataSource = new ExampleDataSource(topTable);
        }
      }
    });
  }
  // ngAfterViewInit() {
  //   this.tab.selectedIndex = 1;
  // }
}

export class ExampleDataSource extends DataSource<TopSize | BottomSize> {
  data = new BehaviorSubject<TopSize[] | BottomSize[]>(null);
  /** Stream of data that is provided to the table. */
  constructor(table: TopSize[] | BottomSize[]) {
    super();

    this.data.next(table);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<TopSize[] | BottomSize[]> {
    return this.data;
  }

  disconnect() {}
}
