import React from 'react';
import './App.css';
import Login from './components/Login';
import chooseTest from './components/chooseTest'
import Test from './components/test/Test'
import {
    BrowserRouter as Router,
    Switch,
    Route,

} from "react-router-dom";


class NotFound extends React.Component {
    render() {
        return <h2>Ресурс не найден</h2>;
    }
}


class App extends React.Component {


    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route exact path="/chooseTest" component={chooseTest}/>
                    <Route path="/Test" component={Test}/>
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        )
    }
}

export default App;
