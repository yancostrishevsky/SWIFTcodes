import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SwiftCodeService } from '../../services/swift-code.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-swift-code',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  swiftForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private swiftCodeService: SwiftCodeService,
    private router: Router
  ) {
    this.swiftForm = this.fb.group({
      swiftCode: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]{8,11}$/)]],
      bankName: ['', Validators.required],
      address: [''],
      countryISO2: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      countryName: ['', Validators.required],
      isHeadquarter: [false]
    });
  }

  addSwiftCode() {
    if (this.swiftForm.valid) {
      this.swiftCodeService.addSwiftCode(this.swiftForm.value).subscribe(() => {
        alert('SWIFT Code added successfully!');
        this.router.navigate(['/swift-codes']);
      });
    } else {
      alert('Formularz zawiera błędy. Popraw dane.');
    }
  }
}
