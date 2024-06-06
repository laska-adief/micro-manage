import { Component, ElementRef, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  ngOnInit(): void {
    const dom = document.getElementById('chart-container');
    const myChart = echarts.init(dom as HTMLDivElement, null, {
      renderer: 'canvas',
      useDirtyRect: false,
    });

    const option = {
      title: {
        text: 'Posts',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      xAxis: {
        type: 'category',
        data: ['2020', '2021', '2022', '2023', '2024'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Posts',
          data: [10, 20, 15, 35, 20],
          type: 'bar',
          barWidth: '40%',
        },
      ],
    };

    if (option && typeof option === 'object') {
      myChart.setOption(option);
    }

    window.addEventListener('resize', () => myChart.resize());
  }
}
