import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { Box, Grid, Container, Typography } from '@material-ui/core';
// components
import Cookies from 'js-cookie';
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppProduct,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppOrderCondition,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppEachProductsSales
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp(props) {
  const navigate = useNavigate();
  // // Get basic information when render this page
  useEffect(() => {
    if (Cookies.get('token')) {
      console.log('success');
      // get data here
    } else {
      navigate('/404', { replace: true });
    }
  }, []);

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppProduct />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppOrderCondition />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={12}>
            <AppEachProductsSales />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
