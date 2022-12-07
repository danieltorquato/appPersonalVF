import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor() {}
  ngOnInit(){

const view = 98;

  const ctx = document.getElementById('chart') as HTMLCanvasElement;
  const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ['1', '2-3', 'Yellow', 'Green', 'Purple'],
          datasets: [{
              label: '# of Votes',
              data: [view, 95, 93, 94, 90],
              backgroundColor: [
                  'rgba(1, 233, 0, 0.8)',
                  'rgba(225, 255, 0, 0.8)',
                  'rgba(218, 83, 0,0.8)',
                  'rgba(255, 2, 0, 0.8)',
                  'rgba(159, 3, 2, 0.8)',

              ],
              borderColor: [
                  'rgba(1, 233, 0, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(159, 3, 2, 1)',
                  'rgba(255, 2, 0, 0.8)',

              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}
}
