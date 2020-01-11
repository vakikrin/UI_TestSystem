import React from 'react'
import {
    Link
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import OneOfFourQuestion from './OneOfFourQuestion'
import ChooseOfFormula from "./ChooseOfFormula";
import InputNumber from "./InputNumber";


class Test extends React.Component {


    state = {
        question: {
            id: 0,
            q: "",
            o1: "",
            o2: "",
            o3: "",
            o4: "",
            answer: ""
        },
        answers: {
            answered: [false, false, false, false, false, false, false, false, false, false]
        },
        nameTest: ""
    };
    masOfQ = [];

    componentDidMount() {
        let idTest = localStorage.getItem('idTest');
        let nameTestLocal = "";
        fetch("http://127.0.0.1:5000/testsystem/api/v1.0/labs/questions", {
            method: 'POST',
            body: JSON.stringify({"idTest": idTest}),
            headers: {'Content-Type': 'application/json'}

        })
            .then(response => response.json())
            .then(data => console.log(data));
        fetch("http://127.0.0.1:5000/testsystem/api/v1.0/labs/" + idTest)
            .then(response => response.json())
            .then(data => {
                nameTestLocal = data.labs[0].name
            })
            .then(() => {
                let property = this.state;
                property.nameTest = nameTestLocal;
                this.setState({property})
            })

    }

    setMasOfQ(array) {
        console.log(array);
        this.masOfQ = array;
        console.log(this.masOfQ);
        let property = this.state;
        property.question = this.masOfQ[0];
        this.setState(property)

    }

    transformDataFromServer(value, index, array) {

        return {
            id: index + 1, q: value.textOfQuestion, o1: value.incorrectOptions1,
            o2: value.incorrectOptions2, o3: value.incorrectOptions3,
            o4: value.correctAnswer, answer: "", correctAnswer: value.correctAnswer, typeQuestion: 1
        };

    }

    changeQuestion = event => {
        this.masOfQ[this.state.question.id - 1] = this.state.question;
        this.setState({question: this.masOfQ[event.target.value - 1]});
        console.log(this.masOfQ);
    };


    handleChange = event => {
        var property = this.state;
        property.question.answer = event.target.value;
        if (property.question.answer === "") {
            property.answers.answered[this.state.question.id - 1] = false

        } else {
            property.answers.answered[this.state.question.id - 1] = true

        }
        this.setState(property);
        console.log(this.state)
    };

    render() {
        var listItems = this.masOfQ.map((Q) =>
            this.state.answers.answered[Q.id - 1] ?
                <li className="liAnswered" onClick={this.changeQuestion.bind(this)} value={Q.id}>{Q.id}</li>

                :
                <li onClick={this.changeQuestion.bind(this)} value={Q.id}>{Q.id}</li>
        );
        var formQuestion = "";

        switch (this.state.question.typeQuestion) {
            case 1:
                formQuestion = <OneOfFourQuestion question={this.state.question} handleChange={this.handleChange}/>;
                break;
            case 2:
                formQuestion = <InputNumber question={this.state.question} handleChange={this.handleChange}/>;
                break;
            case 3:
                formQuestion = <ChooseOfFormula question={this.state.question} handleChange={this.handleChange}/>;
                break;
            default:
                formQuestion = <OneOfFourQuestion question={this.state.question} handleChange={this.handleChange}/>;
                break

        }

        return (
            <div className="container">
                <div><Link to="/chooseTest">Главная</Link>
                    <h1> {this.state.nameTest} </h1>
                    <h4>{this.state.question.id}. {this.state.question.q}?</h4>
                    {formQuestion}
                    <div className="buttonContainer">
                        <Button variant="outlined" size='large'>Назад</Button>
                        <Button variant="outlined" size='large' color="primary">
                            Далі
                        </Button>
                    </div>
                    <div className="paginationMenu">
                        <ul>
                            {listItems}
                        </ul>
                    </div>
                </div>


            </div>
        );

    }
}

export default Test