import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, axisClasses } from '@mui/x-charts';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useState,useEffect } from 'react';
import axios from 'axios';

let amount1;let amount2;let amount3;let amount4;let amount5;let amount6;let amount7;let amount8;
// Generate Sales Data
function createData(time, amount) {
  return { time, amount: amount ?? null };
}
export default function Chart() {
  const theme = useTheme();
  const [hour,setHour]=useState([]);
  const [time1,setTime1]=useState(0);
  const [time2,setTime2]=useState(0);
  const [time3,setTime3]=useState(0);
  const [time4,setTime4]=useState(0);
  const [time5,setTime5]=useState(0);
  const [time6,setTime6]=useState(0);
  const [time7,setTime7]=useState(0);
  const [time8,setTime8]=useState(0);
  useEffect(()=>
{
  axios.get('http://localhost:8000/api/sales').then((response)=>{
    
  setHour(response.data)
  response.data.forEach(item => {
    // const d = new Date();
    // let hour = d.getUTCHours()+5;
    // if(hour===23)
    // {
    //   await axios.delete('http://localhost:8000/deletesales'{}).
    // }
    if (item.Time >= 0 && item.Time <= 3) {
      setTime1(prevTime1 => prevTime1 +Number(item.Amount)*0.012);
    }
    if(item.Time>=3&&item.Time<=6)
  {
    setTime2(prevTime1 => prevTime1 + Number(item.Amount)*0.012)
    amount2+=time2;
  }
  if(item.Time>=6&&item.Time<=9)
  {
    setTime3(prevTime1 => prevTime1 + Number(item.Amount)*0.012)
    amount3+=time3;
  }
  if(item.Time>=9&&item.Time<=12)
  {
    setTime4(prevTime1 => prevTime1 + Number(item.Amount)*0.012)
    amount4+=time4;
  }
  if(item.Time>=12&&item.Time<=15)
  {
    setTime5(prevTime1 => prevTime1 +Number(item.Amount)*0.012)
    amount5+=time5;
  }
  if(item.Time>=15&&item.Time<=18)
  {
    setTime6(prevTime1 => prevTime1 + Number(item.Amount)*0.012)
    amount6+=time6;
  }
  if(item.Time>=18&&item.Time<=21)
  {
    setTime7(prevTime1 => prevTime1 + Number(item.Amount)*0.012)
    amount7+=time7;
  }
  if(item.Time>=21&&item.Time<=24)
  {
    setTime8(prevTime1 => prevTime1 + Number(item.Amount)*0.012)
    amount8+=time8;
  }
    
  });
}).catch((err)=>console.log(err));
},[])

  const data = [
    createData('00:00', 0),
    createData('03:00', time1),
    createData('06:00', time2),
    createData('09:00', time3),
    createData('12:00', time4),
    createData('15:00', time5),
    createData('18:00', time6),
    createData('21:00', time7),
    createData('24:00',time8),
  ];
  console.log(time1)
  console.log(time2)
  console.log(time3)
  console.log(time4)
  console.log(time5)
  console.log(time6)
  console.log(time7)
  console.log(time8)
  return (
    <>
    <React.Fragment >
      <Title>Today</Title>
      <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
        <LineChart
          dataset={data}
          margin={{
            top: 16,
            right: 20,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: 'point',
              dataKey: 'time',
              tickNumber: 2,
              tickLabelStyle: theme.typography.body2,
            },
          ]}
          yAxis={[
            {
              label: 'Sales ( $)',
              labelStyle: {
                ...theme.typography.body1,
                fill: theme.palette.text.primary,
              },
              tickLabelStyle: theme.typography.body2,
              max: 20000,
              tickNumber: 1,
            },
          ]}
          series={[
            {
              dataKey: 'amount',
              showMark: false,
              color: theme.palette.primary.light,
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
            [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: 'translateX(-25px)',
            },
          }}
        />
      </div>
    </React.Fragment>
    </>
  );
}