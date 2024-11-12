import {MantineProvider} from '@mantine/core'
import MyCollapseComponent from "./components/MaxAndMin"
import Aggregate from './components/Aggregate';
import '@mantine/core/styles.css';
import Nav from './components/Nav';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import './App.css'

function App() {
  return (
    <>
    <Nav/>
    <LandingPage/>
      <MantineProvider>
        <MyCollapseComponent/>
        <Aggregate/>
      </MantineProvider>
    <Footer/>
    </>
  )
}

export default App
