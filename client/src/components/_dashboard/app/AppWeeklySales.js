import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import androidFilled from '@iconify/icons-ant-design/android-filled';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// material
import { alpha, styled } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
import axios from '../../../commons/axios';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 714000;

export default function AppTotalSales() {
  const [orders, setOrders] = useState([]);
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
  }, []);
  
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon="ant-design:dollar-outlined" width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Total Sales
      </Typography>
    </RootStyle>
  );
}
