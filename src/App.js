import {BrowserRouter as Router, Route} from 'react-router-dom';
import Files from  './Components/Files/Files';
import Upload from './Components/Upload/Upload';
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
          {<Route exact path="/" component={Files}/>}
          {<Route exact path="/Files" component={Files}/>}
          {<Route exact path="/Upload" component={Upload}/>}
      </div>
    </Router>

  );
}

export default App;
