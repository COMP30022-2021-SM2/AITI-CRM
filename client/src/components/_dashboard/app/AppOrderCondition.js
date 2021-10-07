import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
// material
import { useTheme, styled } from '@material-ui/core/styles';
import { Card, CardHeader } from '@material-ui/core';
import axios from '../../../commons/axios';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

// ----------------------------------------------------------------------

export default function AppOrderCondition() {
  const orderStatus = new Set();
  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    colors: [theme.palette.primary.main, theme.palette.primary.lighter],
    labels: ['Finished Orders', 'Unfinished Orders'],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } }
    }
  });

  const [orders, setOrders] = useState([]);
  const [finished, setFinished] = useState(0);
  const [unfinished, setUnfinished] = useState(0);
  // Get all orders
  useEffect(() => {
    if (Cookies.get('token')) {
      axios
        .get('/order', {
          headers: { Authorization: `Bearer ${Cookies.get('token')}` }
        })
        .then((response) => {
          if (response.status === 200) {
            setOrders(response.data);
          }
        })
        .catch(() => {
          console.log('get orders failed');
        });
    }
    console.log(orders.length);
    let j = 0;
    for (let i = 0; i < orders.length; i += 1) {
      if (orders[i].status === 'completed') {
        // console.log('flag!');
        j += 1;
        // console.log(j);
      }
    }
    setFinished(j);
    setUnfinished(orders.length - j);
    console.log(finished);
    console.log(unfinished);
    orderStatus.add(finished);
    orderStatus.add(unfinished);
  }, []);

  return (
    <Card>
      <CardHeader title="Order Condition" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="pie" series={orderStatus} options={chartOptions} height={280} />
      </ChartWrapperStyle>
    </Card>
  );
}
