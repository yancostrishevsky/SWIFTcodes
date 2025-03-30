import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/v1/swift-codes';

export interface SwiftCode {
  swiftCode: string;
  bankName: string;
  address: string;
  countryISO2: string;
  countryName: string;
  isHeadquarter: boolean;
  branches?: SwiftCode[];
}

@Injectable({
  providedIn: 'root'
})
export class SwiftCodeService {
  constructor(private http: HttpClient) {}

  getSwiftCodesByCountry(countryISO2: string): Observable<any> {
    console.log("country", countryISO2);
    return this.http.get(`${API_URL}/country/${countryISO2}`);
  }

  getSwiftCodeDetails(swiftCode: string): Observable<SwiftCode> {
    return this.http.get<SwiftCode>(`${API_URL}/${swiftCode}`);
  }

  addSwiftCode(swiftCode: SwiftCode): Observable<any> {
    return this.http.post(`${API_URL}`, swiftCode);
  }

  deleteSwiftCode(swiftCode: string): Observable<any> {
    return this.http.delete(`${API_URL}/${swiftCode}`);
  }

  getAllSwiftCodes(): Observable<any> {
    return this.http.get(`${API_URL}`);
  }
}
