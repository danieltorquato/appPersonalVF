/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule-c',
  templateUrl: './schedule-c.component.html',
  styleUrls: ['./schedule-c.component.scss'],
})
export class ScheduleCComponent implements OnInit {
  dateHour: string;
  data: string;
  horario: string;
  pickerOptions: any;
  constructor() {
   }

  ngOnInit() {
    this.pickerOptions = {
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      }, {
        text: 'Ok',
        handler: (value: any) => {
          const minutos = new Date(value.year.value, value.month.value, value.day.value, value.hour.value, value.minute.value).getMinutes();
          if (minutos !== 0 && minutos !== 30) {
            // Invalid minutes selected, reset to 00
            value.minute.value = 0;
            value.minute.text = '00';
          }
        }
      }],
      minuteValues: '0,30' // Definir as opções de minutos disponíveis
    };
  }

 async getSelectedDate() {
  const dataObj = new Date(this.dateHour);

  this.data = this.getDateFormat(dataObj);
  this.horario = this.getHourFormat(dataObj);

  console.log('Data:', this.data);
  console.log('Horário:', this.horario);
  }

  getDateFormat(data: Date): string {
    const dia = data.getUTCDate();
    const mes = data.getUTCMonth() + 1; // Os meses são indexados de 0 a 11
    const ano = data.getUTCFullYear();

    return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
  }

  getHourFormat(data: Date): string {
    let horas = data.getHours();
    let minutos = data.getMinutes();

    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;

  }
}
