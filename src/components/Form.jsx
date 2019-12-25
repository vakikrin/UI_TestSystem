import React from 'react'

class Form extends React.Component {
    state = {username: "", password: "", sign_in: false};

    checkUserResponse(response) {
        if (response['error']) {
            console.log("Беда")
        } else {
            //          let login = response['users'][0]['login']
            let pass = response['users'][0]['password'];
//            let access_lvl = response['users'][0]['access_level']
            console.log("heh");
            console.log(pass, this.state.password);
            if (pass === this.state.password) {
                this.setState({sign_in: true}, () => console.log(this.state.sign_in))
            }
        }
    }

    getUsersFetch = () => {
        fetch('http://127.0.0.1:5000/testsystem/api/v1.0/users_name/' + this.state.username)
            .then(response => response.json())
            .then(data => this.checkUserResponse(data))

    };
    handleSumbit = event => {
        event.preventDefault();
        this.getUsersFetch(this.state.username, this.state.password);
        this.setState();
    };

    handleUsernameChange(event) {
        this.setState({username: event.target.value})
        //console.log(this.state.username)
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value})
        //console.log(this.state.password)
    }

    render() {
        return (
            <div className="form">

                <form className="login-form" onSubmit={this.handleSumbit}>
                    <input type="text" placeholder="username" value={this.state.username}
                           onChange={this.handleUsernameChange.bind(this)}/>
                    <input type="password" placeholder="password" value={this.state.password}
                           onChange={this.handlePasswordChange.bind(this)}/>
                    <button type="submit">Login</button>
                    <p className="message">Не зарегестрирован? Спроси данные у преподавателя или администратора)</p>
                </form>
            </div>
        );

    }
}

export default Form