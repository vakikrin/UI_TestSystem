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
            answered: []
        },
        nameTest: ""
    };
    masOfQ = [];

    componentDidMount() {
        /*
        * Функия выполняеться перед загрузкой компонента
        * Здесь сразу происходит запрос к БД для получения вопроса
        * */
        let idTest = localStorage.getItem('idTest');
        let nameTestLocal = "";

        // Запрос на получение всех вопросов
        fetch(
            "http://127.0.0.1:5000/testsystem/api/v1.0/labs/questions", {
                method: 'POST',
                body: JSON.stringify({"idTest": idTest}),
                headers: {'Content-Type': 'application/json'}
            }
        )
            .then(response => response.json())
            .then(data => this.setMasOfQ(data));

        // Запрос для получения названия теста (можно убрать и сделать из локалльного хранилища
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
        /*
        * Метод используеться для преобразования полученных вопросов в формат теста
        * masOfQ - основной массив, где храняться вопросы*/
        function transformDataFromServer_input_number(value, index, array) {
            return {
                id: null,
                q: value.textOfQuestion,
                answer: "",
                correctAnswer: value.correctAnswer,
                typeQuestion: value.typeQuestion
            };
        }

        function transformDataFromServer_one_of_four(value, index, array) {
            let answers = [value.incorrectOptions1, value.incorrectOptions2, value.incorrectOptions3, value.correctAnswer];
            return {
                id: null,
                q: value.textOfQuestion,
                o1: answers.splice(new Date() % answers.length, 1)[0], //Для случайного расспределение ответов в вопросе
                o2: answers.splice(new Date() % answers.length, 1)[0],
                o3: answers.splice(new Date() % answers.length, 1)[0],
                o4: answers.splice(new Date() % answers.length, 1)[0],
                answer: "",
                correctAnswer: value.correctAnswer,
                typeQuestion: value.typeQuestion
            };

        }

        function transformDataFromServer_choose_of_formula(value, index, array) {
            let answers = [value.incorrectOptions1, value.incorrectOptions2, value.incorrectOptions3, value.correctFormula];

            return {
                id: null,
                q: value.textOfQuestion,
                o1: answers.splice(new Date() % answers.length, 1)[0],
                o2: answers.splice(new Date() % answers.length, 1)[0],
                o3: answers.splice(new Date() % answers.length, 1)[0],
                o4: answers.splice(new Date() % answers.length, 1)[0],
                answer: "",
                correctAnswer:
                value.correctFormula,
                typeQuestion: value.typeQuestion
            };

        }

        let Questions_choose_of_formula = array[0].Questions_choose_of_formula;
        let Questions_one_of_four = array[1].Questions_one_of_four;
        let Questions_input_number = array[2].Questions_input_number;

        //Обработаем отдельный формат вопроса и добавим в общий массив
        this.masOfQ = this.masOfQ.concat(Questions_choose_of_formula.map(transformDataFromServer_choose_of_formula));
        this.masOfQ = this.masOfQ.concat(Questions_one_of_four.map(transformDataFromServer_one_of_four));
        this.masOfQ = this.masOfQ.concat(Questions_input_number.map(transformDataFromServer_input_number));

        //Перемешаем массив чтобы вопросы в тесте были в случайном порядке
        function makeRandomArr(a, b) {
            return Math.random() - 0.5;
        }

        this.masOfQ.sort(makeRandomArr);

        //Добавим к вопросу свой id, чтобы можно было между ними переключаться
        this.masOfQ = this.masOfQ.map((value, index, array) => {
            value.id = index + 1;
            return value
        });

        //Изменим состояние теста
        let property = this.state;
        property.question = this.masOfQ[0];
        property.answers.answered = [].fill(this.masOfQ.length, false);
        this.setState(property)

    }


    changeQuestion = event => {
        /*Метод перехода между вопросами*/
        this.masOfQ[this.state.question.id - 1] = this.state.question; // Запишем в массив ответ пользователя
        this.setState({question: this.masOfQ[event.target.value - 1]}); // Изменим состояние теста
    };


    handleChange = event => {
        /*Метод который связывает выбор или ответ пользователя
        * с состоянием. Передаеться в дочерние компоненты*/
        var property = this.state;

        property.question.answer = event.target.value;

        if (property.question.answer === "") {
            property.answers.answered[this.state.question.id - 1] = false
        } else {
            property.answers.answered[this.state.question.id - 1] = true
        }

        this.setState(property);
    };

    render() {
        var listItems = this.masOfQ.map((Q) =>
            this.state.answers.answered[Q.id - 1] ?
                <li className="liAnswered" onClick={this.changeQuestion.bind(this)} value={Q.id}>{Q.id}</li>
                :
                <li onClick={this.changeQuestion.bind(this)} value={Q.id}>{Q.id}</li>
        ); // listItems - собираеться полоска в низу с номерами вопроса

        var formQuestion = ""; // переменная в которой от типа вопроса будет создаваться форма ответа

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
                    <h4>{this.state.question.id}. {this.state.question.q}</h4>
                    {formQuestion}
                    <div>
                        <Button variant="contained" size='large' classess="ButtonInTestBack">Назад</Button>

                        <Button variant="contained" size='large' className="ButtonInTestNext" color="primary">
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