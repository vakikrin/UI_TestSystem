import React from 'react'

class SecectTestForm extends React.Component {
    constructor(props) {
        super(props);
        console.log("dsa", this.props.tests);
        this.handlerChange = this.handlerChange.bind(this)
    }

    state = {value: this.props.tests[0].id};

    static defaultProps = {"tests": "Нету"};

    handlerChange(e) {
        this.setState({value: e.target.value});
        console.log(e.target.value);
        this.props.onchange(e)
    }

    render() {
        const listTests = this.props.tests.map(test => {
            return (<option key={test.id} value={test.id}>{test.name}</option>)
        });
        return (
            <p><select name="list1" onChange={this.handlerChange} value={this.state.value}>
                {listTests}
            </select></p>


        )

    }
}

export default SecectTestForm