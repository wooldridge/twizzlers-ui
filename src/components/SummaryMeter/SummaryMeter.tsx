import React, { useRef } from "react";
import Highcharts from 'highcharts'
import highchartsMore from "highcharts/highcharts-more.js"
import solidGauge from "highcharts/modules/solid-gauge.js";
import HighchartsReact from 'highcharts-react-official'
import styles from "./SummaryMeter.module.scss";

highchartsMore(Highcharts);
solidGauge(Highcharts);

type Props = {
  data?: any;
  config?: any
};

// TODO Add needle by overlaying a second chart: https://jsfiddle.net/doc_snyder/j5owogor/

const options = {
    chart: {
      type: "solidgauge",
      height: "160",
      borderWidth: "2px"
    },
    title: null,
    credits: {
        enabled: false
    },
    lang: {
        decimalPoint: '\u066B',
        thousandsSeparator: '\u066C'
    },
    pane: {
        center: ['50%', '75%'],
        size: '100%',
        startAngle: -90,
        endAngle: 90,
        background: {
            backgroundColor: '#eee',
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc',
            borderWidth: 0
        }
    },
    yAxis: {
      min: 0,
      max: 2756000,
      lineWidth: 0,
      tickPositions: [],
      minorTickInterval: null,
      majorTickInterval: null
    },
    plotOptions: {
      solidgauge: {
        dataLabels: {
          enabled: true
        },
        linecap: "round",
        stickyTracking: false,
        rounded: false
      }
    },
    tooltip: {
        enabled: false
    }, 
    series: [
      {
        name: "Move",
        type: "solidgauge",
        data: [
          {
            color: "#5fc9aa",
            radius: "100%",
            innerRadius: "60%",
            y: 1125000
          },
        ],
        dataLabels: {
            align: 'center',
            enabled: false,
            rotation: 0,
            x: 0,
            y: -5,
            borderWidth: 0,
            style: {
                color: '#999',
                fontSize: '14px',
            },
            formatter: function () {
                    var self: any = this;
                    return Highcharts.numberFormat(self.y, 0, '', ',')
            },
        },
        animation: {
          duration: 1000
        }
      }
    ]
  };

const SummaryMeter: React.FC<Props> = (props) => {

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  return (
    <div className={styles.meter}>
        <div className={styles.labelAll}>
            <div className={styles.block} />
            <div className={styles.text}>All results</div>
        </div>
        <div className={styles.labelFilters}>
            <div className={styles.block} />
            <div className={styles.text}>With filters applied</div>
        </div>
        <div className={styles.min}>0</div>
        <div className={styles.min}>0</div>
        <div className={styles.max}>2,756,000</div>
        
        <div className={styles.returned}>
            <div className={styles.separator} />
            <span>1,125,000</span>
        </div>
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            ref={chartComponentRef}
        />
    </div>
  );
};

export default SummaryMeter;
