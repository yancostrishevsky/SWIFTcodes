import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SwiftCodeService, SwiftCode } from '../../services/swift-code.service';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-swift-details',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  swiftCode?: SwiftCode;
  isLoading = true;
  error?: string;

  constructor(
    private route: ActivatedRoute,
    private swiftCodeService: SwiftCodeService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('swiftCode');
    if (code) {
      this.swiftCodeService.getSwiftCodeDetails(code).subscribe({
        next: (data) => {
          this.swiftCode = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Could not load SWIFT code details.';
          this.isLoading = false;
          console.error(err);
        }
      });
    } else {
      this.error = 'No SWIFT code provided in route.';
      this.isLoading = false;
    }
  }
  goBack() {
    this.router.navigate(['/swift-codes']);
  }
  
}
