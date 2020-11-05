import { Component, OnInit } from '@angular/core';
import {JobService} from '../services/job.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
    jobs : []= []
    tareasEjecutandose : boolean=true;
    constructor(private _jobService: JobService) {}

    ngOnInit() {
        this.cargarJobs();
    }

    cargarJobs() {
        this._jobService.getJobs().subscribe(
            jobs => {
                this.jobs = jobs
                if(this.jobs.length>0)
                    this.tareasEjecutandose=true;
            }, err=>{
                this.tareasEjecutandose=false;
                console.log(err)
            }
        );
    }

    pararTareas(){
        this._jobService.stopJobs().subscribe(
            data => {
                this.tareasEjecutandose=false;
                this.jobs=[]
                Swal.fire('', data, 'success')
            }, err =>{
                console.log(err);
            }
        );
    }
    iniciarTareas(){
        this._jobService.startJobs().subscribe(
            data => {
                this.tareasEjecutandose=false;
                this.cargarJobs();
                Swal.fire('', data, 'success')
            }, err =>{
                console.log(err);
            }
        );
    }
}
