import React from 'react'
import Input from './Input'
import ButtonSubmit from './ButtonSubmit'
import SelectTestForm from './SecectTestForm'

function validateDataForm(value) {
    return value !== ""
}

class chooseTest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name: "", secondname: "", group: "", numberOfTest: "", labs: "", externalData: null};
        this.tests = ""

    }


    componentDidMount() {
        fetch('http://127.0.0.1:5000/testsystem/api/v1.0/labs')
            .then(response => response.json())
            .then(data => this.setState({
                labs: data.labs,
                externalData: true,
                numberOfTest: data.labs[0].id
            })).then(console.log(this.state))

    }


    updateUserName = (value) => {
        this.setState({name: value})
    };
    updateSecondName = (value) => {
        this.setState({secondname: value})
    };

    updateGroup = (value) => {
        this.setState({group: value})
    };

    handleSubmit(e) {
        console.log("handleSubmit");
        console.log(this.state);

        let name = this.state.name;
        let secondname = this.state.secondname;
        let group = this.state.group;
        let idTest = this.state.numberOfTest;
        if (validateDataForm(name) && validateDataForm(secondname) && validateDataForm(group) && validateDataForm(idTest)) {
            localStorage.setItem('name', name);
            localStorage.setItem('secondname', secondname);
            localStorage.setItem('group', group);
            localStorage.setItem('idTest', idTest);
            window.location.href = '/test'
        }
        e.preventDefault();
    }

    onChangeSelect = (e) => {
        this.setState({numberOfTest: e.target.value})
    };

    render() {
        let code;
        if (this.state.externalData === null) {
            code = <h2>Loading...</h2>
        } else {
            code =
                <div className="form">
                    <div className="formName">
                        Ввести дані
                    </div>
                    <div className="formInfo">Ведіть особисті дані та оберіть номер тесту</div>

                    <form className="login-form" onSubmit={this.handleSubmit.bind(this)}>
                        <Input key="Input_Name" value="" type='text' placeholder="Ім'я"
                               onChange={this.updateUserName}/>
                        <Input key="Input_SecondName" value="" type='text' placeholder='Прізвище'
                               onChange={this.updateSecondName}/>
                        <Input key="Input_Group" value="" type='text' placeholder='Номер групи'
                               onChange={this.updateGroup}/>

                        <SelectTestForm key="SelectTestForm2" tests={this.state.labs} onchange={this.onChangeSelect}/>
                        <ButtonSubmit title={"Далі"}/>
                    </form>
                </div>
        }
        return (
            <div>{code}</div>

        )
            ;

    }
}

export default chooseTest