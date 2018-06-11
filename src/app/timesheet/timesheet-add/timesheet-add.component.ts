import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-timesheet-add',
  templateUrl: './timesheet-add.component.html',
  styleUrls: ['./timesheet-add.component.css']
})
export class TimesheetAddComponent implements OnInit {
    timesheetForm: FormGroup;

  constructor() { }

  ngOnInit() {
      this.timesheetForm = new FormGroup({
        'records': new FormArray([
            new FormGroup({
                'recordDate': new FormControl(null, Validators.required),
                'recordProject': new FormControl(null, Validators.required),
                'recordTask': new FormControl(null, Validators.required),
                'recordHours': new FormControl(null, [Validators.min(1), Validators.required]),
                'recordComment': new FormControl(null)
            })
        ])
      });
  }

  onAddRecord() {
      // const control = new FormControl(null, Validators.required);
      const control = new FormGroup({
          'recordDate': new FormControl(null, Validators.required),
          'recordProject': new FormControl(null, Validators.required),
          'recordTask': new FormControl(null, Validators.required),
          'recordHours': new FormControl(null, [Validators.min(1), Validators.required]),
          'recordComment': new FormControl(null)
      });
      (<FormArray>this.timesheetForm.get('records')).push(control);
  }

  onRemoveRecord(i) {
      console.log(i);
      console.log(this.timesheetForm.get('records'));
      (<FormArray>this.timesheetForm.get('records')).removeAt(i);
  }

    onSubmit() {
        console.log(this.timesheetForm);
    }

}
