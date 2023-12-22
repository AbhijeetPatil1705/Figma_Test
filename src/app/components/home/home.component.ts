import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FigmaServiceService } from 'src/app/services/figma-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName: string = 'Mr.Steve-Jobs';
  CurrentDate = new Date();
  homeTableData: any = [];
  constructor(private router: Router, private figmaService: FigmaServiceService) { }

  ngOnInit(): void {
    this.homeTableData = this.figmaService.getTableData();
  }

  getButtonStyles(status: string) {
    const obj: any = {
      available: 'green',
      sold: 'red',
      'under offer': 'orange'
    }
    let key = '';
    if (status) {
      key = status.toLowerCase()
    }
    return obj[key];
  }

  editRecord(data: any, ind: number) {
    const d = { ...data, ind }
    this.router.navigate(['property'], {
      queryParams: { data: JSON.stringify(d) }
    })
  }
}
