import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './component/Header/Header'
import './App.css';
import MainNav from './component/MainNav';
import { Container } from '@material-ui/core';
import Movies from './component/pages/Movies/Movies';
import Search from './component/pages/Search/Search';
import Series from './component/pages/Series/Series';
import Trending from './component/pages/Trending/Trebding';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className='App'>
      <Container>
        <Switch>
          <Route path='/' component={Trending} exact/>
          <Route path='/movies' component={Movies} />
          <Route path='/series' component={Series} />
          <Route path='/search' component={Search} />
        </Switch>
      </Container>
      </div>
      <MainNav />
    </BrowserRouter>
  );
}

export default App;
