import React, {useState} from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


let dataSequence = [
    {
        name: 'Week 1',
        data: [1, 2, 2, 1, 1, 2, 2]
    }, {
        name: 'Week 2',
        data: [6, 12, 2, 3, 3, 2, 2]
    }, {
        name: 'Week 3',
        data: [4, 5, 6, 5, 5, 4, 9]
    }, {
        name: 'Week 4',
        data: [5, 5, 6, 6, 5, 6, 6]
    }, {
        name: 'Week 5',
        data: [6, 7, 7, 6, 6, 6, 7]
    }, {
        name: 'Week 6',
        data: [8, 9, 9, 8, 8, 8, 9]
    }, {
        name: 'Week 7',
        data: [9, 10, 4, 10, 9, 9, 9]
    }, {
        name: 'Week 8',
        data: [1, 10, 10, 10, 10, 11, 11]
    }, {
        name: 'Week 9',
        data: [11, 11, 12, 12, 12, 11, 11]
    }
];

let options = {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Highcharts with time control - weeks'
    },
    subtitle: {
        text: 'Fruit consumption during a week'
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 50,
        y: 50,
        floating: true,
        borderWidth: 1,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
    },
    xAxis: {
        categories: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ]
    },
    yAxis: {
        title: {
            text: 'Fruit units'
        }
    },
    tooltip: {
        shared: true,
        valueSuffix: ' units'
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        areaspline: {
            fillOpacity: 0.5
        }
    },
    series: [{
        name: 'By week',
        data: dataSequence[0].data.slice()
    }, {
        name: 'Average week',
        data: [6, 8, 6, 7, 7, 7, 6]
    }]
}


  

const BarChart = () => {
    const [rangeValue, setRangeValue] = useState(0);
    const [playBtnText, setPlayBtnText] = useState("Play");
    const [chartOptions, setChartOptions] = useState(options);
    
    let minRange=0, maxRange=8;

    
    const updateChartData = (index) => {
        if(index >= maxRange) {
            pauseSlider();
        }
        setChartOptions({
            series: [{
                name: 'By week',
                data: dataSequence[index].data
            }, {
                name: 'Average week',
                data: [6, 8, 6, 7, 7, 7, 6]
            }]
        })

    }
    
    const updateChart = (increment) => {
        console.log('updateChart');
        if(increment) {
            setRangeValue(rangeValue => {
                let value = rangeValue + increment;
                updateChartData(value);
                return value;
            });
        } else {
            updateChartData(rangeValue);
        }
    
    }

    const rangeChange = (e) => {
        setRangeValue(parseInt(e.target.value));
        updateChart();
    }

    const playSlider = () => {
        setPlayBtnText("Pause");
        Highcharts.sequenceTimer = setInterval (() => {
            console.log("interval");
            updateChart(1);
        }, 1000);
    }

    const pauseSlider = () => {
        setPlayBtnText("Play");
        clearTimeout(Highcharts.sequenceTimer);
        Highcharts.sequenceTimer = undefined;
    }

    const sliderClick = () => {
        if(Highcharts.sequenceTimer === undefined) {
            playSlider();
        } else {
            pauseSlider();
        }

    }
    
    return(
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
            />
            <div>
                <button onClick={sliderClick}>{playBtnText}</button>
                <span>{minRange}</span> 
                <input 
                    type="range"
                    min={0}
                    max={8}
                    value={rangeValue}
                    onChange={rangeChange}
                />
                <span>{maxRange}</span> 
                <div>{rangeValue}</div>
            </div>
        </div>
    )
} 

export default BarChart;