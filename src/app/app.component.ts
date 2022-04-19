import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
//Services
import { PatientService } from './services/pactient.services';
//Models
import { Patient } from './models/patient.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'pacientes';

  public patient = {} as Patient;
  public patients = Array<Patient>();
  public backUpList = Array<Patient>();
  public page: number = 1;
  public infoPatient: Patient | null = null;
  public searchWord: string = '';
  public id: string | null = null;

  constructor(
    private pacienteService: PatientService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.patients = new Array;
    this.backUpList = new Array;

    this.route.queryParamMap.subscribe(params => {
      if(params.get('id') != null){
        this.id = params.get('id');
      }
    })

    this.getPatientsPagination();
  }

  getPatientsPagination(page:number=0, results:number=50){
    this.pacienteService.getPatientsPagination(page,results).subscribe((data)=>{
      if(data != null){
        console.log(data.results);
        this.patients = data.results;
        this.backUpList = [...this.patients];
        //Caso venha de uma url com username ele vai buscar nos primeiros 50 resultados. 
        if(this.id != null){
          this.lookingForId();
        }
        //Vai tentar buscar mais três vezes e tentar novamente até encontrar
        if(this.id != null && this.infoPatient == null){
          for (let i = 0; i < 3; i++) {
            this.page++;
            this.getPatientsPagination(this.page);
          }
        }
        
      }
    })
  }

  chargeMore(){
    this.patients = [...this.backUpList];
    let tempResponse = new Array<Patient>();
    this.page++;
    this.pacienteService.getPatientsPagination(this.page).subscribe((data)=>{
      if(data != null){
        tempResponse = data.results;
        this.patients = this.patients.concat(tempResponse);
        this.backUpList = [...this.patients];
      }
    })
  }

  showDetails(patient: Patient){
    this.infoPatient = patient;
  }

  closeModal(close: boolean){
    if(close)
      this.infoPatient = null;  
  }

  searchText(e: any){
    let searchList = new Array<Patient>();
    this.searchWord = e.target.value.toLocaleLowerCase();
    if( this.searchWord.length > 0)
    {
      this.patients.forEach(looking=>{
        if(looking.name.first.toLocaleLowerCase().includes(this.searchWord) || looking.name.last.toLocaleLowerCase().includes(this.searchWord)){
          searchList.push(looking);
        }
      });
      this.patients = [...searchList];
    }else if(this.searchWord.length == 0){
      this.patients = [...this.backUpList];
    }
  }

  lookingForId(){
    this.patients.forEach(patient=>{
      if(patient.login.username == this.id){
        this.infoPatient = patient;
      }
    })
  }
}
