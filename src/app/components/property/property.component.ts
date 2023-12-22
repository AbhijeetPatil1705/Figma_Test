import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/interface';
import { FigmaServiceService } from 'src/app/services/figma-service.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  userName: string = 'Mr.Steve-Jobs';
  CurrentDate = new Date()
  propertyForm!: FormGroup;
  propertyData: any = [];
  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private figmaService: FigmaServiceService,
    private route: ActivatedRoute
  ) { }
  propertyName = ["House", "Flate", "Car"];
  statusName = ["Available", "Sold", "Under Offer"];
  file: any;
  receivedData: any;
  ngOnInit(): void {
    const dataString = this.route.snapshot.queryParams['data'];
    this.receivedData = dataString ? JSON.parse(dataString) : null;
    this.propertyForm = this.fb.group({
      amount: ['', Validators.required],
      property: ['', Validators.required],
      rating: [''],
      status: ['', Validators.required]
    })
    if (this.receivedData) {
      this.setValusInForm();
    }
  }

  onSubmitProperty(val: Property) {
    console.log(this.propertyForm)
    if (!this.receivedData) {
      //New record
      this.propertyData = val;
      const toSendFormData = {
        ...val, rating: this.rating, postedDate: new Date(),
        imagee: this.selectedImage
      }
      this.figmaService.setTableData(toSendFormData);
      alert("Record is created successfully");
    } else {
      // Edit record
      const ind = this.receivedData.ind;
      const localData = this.figmaService.getTableData();
      localData[ind].amount = val.amount;
      localData[ind].property = val.property;
      localData[ind].status = val.status;
      localData[ind].rating = this.rating;
      localData[ind].postedDate = new Date();
      this.figmaService.saveEditedData(localData);
      alert("Record is updated successfully")
    }
  }

  getFile(event: any) {
    this.file = event.target.files[0]
    if (this.file) {
      this.readImage(this.file);
    }
  }

  uploadDocs() {
    this.file ? alert("document uploaded") : alert("Please drag and drop image first");
  }

  rating = 0;
  rateStar(givenStar: number) {
    this.rating = givenStar;
  }

  selectedImage: string | ArrayBuffer | null | undefined = null;
  readImage(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.selectedImage = e.target?.result;
    };
    reader.readAsDataURL(file);
  }

  setValusInForm() {
    this.propertyForm.patchValue({
      amount: this.receivedData.amount,
      property: this.receivedData.property,
      status: this.receivedData.status,
    })
    this.rating = this.receivedData.rating;
  }
}
