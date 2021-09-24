import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
import { Card, Stack, Link, Container, Typography } from '@material-ui/core';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { LoginForm } from '../components/authentication/login';
import background from './309344022557741423.png';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
  const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch('http://localhost:5000/testAPI')
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  return (
    <RootStyle title="Login" style={{ backgroundColor: '#fffef4' }}>
      {/* <div style={{ backgroundImage: `url(${background})` }} /> */}
      {/* <img src="./loginbackground.png" alt="background" /> */}
      {/* <AuthLayout>
        <b>Don’t have an account?</b> &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/register">
          <b>Get started</b>
        </Link>
      </AuthLayout> */}

      {/* <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            {!data ? 'Loading...' : data}
            Hi, Welcome Back
          </Typography>
          <img src="/static/illustrations/illustration_login.png" alt="login" />
        </SectionStyle>
      </MHidden> */}

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h1" gutterBottom sx={{ color: '#5d3b6b' }}>
              Sign in to
            </Typography>
            <Typography variant="h4" gutterBottom>
              AITI CRM :)
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
          </Stack>
          {/* <AuthSocial /> */}

          <LoginForm />

          {/* <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don’t have an account?&nbsp;
              <Link variant="subtitle2" component={RouterLink} to="register">
                Get started
              </Link>
            </Typography>
          </MHidden> */}
        </ContentStyle>
        {/* <AuthLayout>
          <b>Don’t have an account?</b> &nbsp;
          <Link underline="none" variant="subtitle2" component={RouterLink} to="/register">
            <b>Get started</b>
          </Link>
        </AuthLayout> */}
      </Container>
    </RootStyle>
  );
}
