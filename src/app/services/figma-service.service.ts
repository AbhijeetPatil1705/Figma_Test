import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FigmaServiceService {

  constructor() { }

  isLoggedIn() {
    return localStorage.getItem('Login') == 'true';
  }

  tableData: any[] = [];
  setTableData(formdata: any) {
    const tableData = [formdata, ...this.getTableData()];
    localStorage.setItem('tableData', JSON.stringify(tableData));
  }

  getTableData() {
    const localData = localStorage.getItem('tableData');
    const tabelData = localData ? JSON.parse(localData) : [];
    return tabelData;
  }

  saveEditedData(data: any[]) {
    localStorage.setItem('tableData', JSON.stringify(data));
  }
}
