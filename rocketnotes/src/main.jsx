import React from 'react'
import ReactDOM from 'react-dom/client'
import { Details } from './pages/Details'
import { ThemeProvider } from 'styled-components'
import theme from './styles/theme'

import GlobalStyles from './styles/global'
import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { Profile } from './pages/Profile'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {/* <Details /> */}
      {/* <Home /> */}
      {/* <SignIn /> */}
      {/* <SignUp /> */}
      <Profile />
    </ThemeProvider>
  </React.StrictMode>
)
