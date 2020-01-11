import React from 'react'
import Input from "./Input";
import ButtonSubmit from "./ButtonSubmit"


class Login extends React.Component {

    state = {
        credential: {
            username: "",
            password: ""
        },
    };

    checkLogIn(data) {
        if (data['error'] && data['log_in'] === 'Successfully') {
            console.log('Не зашли')
        }
        else {
            console.log('Зашли');
            localStorage.setItem('user', this.state.username);
            window.location.href = '/chooseTest'
        }
    }

    log_in = () => {
        fetch('http://127.0.0.1:5000/testsystem/api/v1.0/users/' + this.state.username + '/' + this.state.password)
            .then(response => response.json())
            .then(data => this.checkLogIn(data))

    };
    updateUserName = (value) => {
        this.setState({username: value})
    };
    updatePassword = (value) => {
        this.setState({password: value})
    };

    handleSubmit(e) {
        console.log("handleSubmit");
        console.log(this.state);
        this.log_in();
        e.preventDefault();
    }

    render() {
        return (

            <div className="form">
                <div className="formName">
                    Увійти
                </div>
                <div className="formInfo">
                    Для проходження тесту вчитель має увійти до системи
                </div>

                <form className="login-form" onSubmit={this.handleSubmit.bind(this)}>
                    <Input key="Input_Component_username" value="" type='text' placeholder='Логін'
                           onChange={this.updateUserName}/>

                    <Input key="Input_Component_pass" value="" type='password' placeholder='Пароль'
                           onChange={this.updatePassword}/>
                    <ButtonSubmit title={"Далі"}/>
                    <p className="message">Не зарегестрирован? Спроси данные у преподавателя или администратора)</p>
                </form>
            </div>

        );

    }
}

export default Login