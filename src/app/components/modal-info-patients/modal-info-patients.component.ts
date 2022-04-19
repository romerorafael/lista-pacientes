import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Patient } from 'src/app/models/patient.models';

@Component({
  selector: 'modal-info-patients',
  templateUrl: './modal-info-patients.component.html',
  styleUrls: ['./modal-info-patients.component.css']
})
export class ModalInfoPatientsComponent implements OnInit {

  constructor() { }

  @Input() infoPatient: any;
  @Output() closeModalEvent = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.infoPatient.dob.date = new Date(this.infoPatient.dob.date);
    this.infoPatient.nat = this.infoPatient.nat === "BR" ? "Brasileira" : "Outro";
  }

  closeModal(){
    this.closeModalEvent.emit(true);
  }

  copyUrl(){
    const url = `localhost:4200/?id=${this.infoPatient.login.username}`
    navigator.clipboard.writeText(url);
  }

}
