import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiftCode, SwiftCodeService } from '../../services/swift-code.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-swift-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  swiftCodes: SwiftCode[] = [];
  countryISO2: string = '';

  constructor(private swiftCodeService: SwiftCodeService, private router: Router) {}

  ngOnInit(): void {
    this.loadSwiftCodes();
  }

  loadSwiftCodes() {
    this.swiftCodeService.getAllSwiftCodes().subscribe(data => {
      this.swiftCodes = data;
    });
  }

  loadISOCodes() {
    if (this.countryISO2.length !== 2) {
      alert('Country ISO2 must be exactly 2 letters!');
      return;
    }
    this.swiftCodeService.getSwiftCodesByCountry(this.countryISO2).subscribe(data => {
      this.swiftCodes = data.swiftCodes;
    })
  }

  goToDetails(swiftCode: string) {
    if (!swiftCode) {
      alert('Please enter a SWIFT Code!');
      return;
    }

    this.router.navigate(['/swift-codes', swiftCode]);
  }

  deleteSwiftCode(swiftCode: string) {
    if (confirm(`Are you sure you want to delete SWIFT Code: ${swiftCode}?`)) {
      this.swiftCodeService.deleteSwiftCode(swiftCode).subscribe(() => {
        this.swiftCodes = this.swiftCodes.filter(code => code.swiftCode !== swiftCode);
      });
    }
  }
}
