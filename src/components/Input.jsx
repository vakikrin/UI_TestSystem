import React from 'react'
import TextField from '@material-ui/core/TextField';


class Input extends React.Component {
    constructor(props) {
        super(props);
        console.log("Input is created");
        this.handleChangeInput = this.handleChangeInput.bind(this)
    }


    static
    defaultProps = {"placeholder": "", "type": "text"};
    state = {"value": ""};

    handleChangeInput(e) {
        console.log("changed input");
        this.setState({"value": e.target.value});
        this.props.onChange(e.target.value)
    }

    render() {
        return (
            <TextField
                id="outlined-input"
                label={this.props.placeholder}
                type={this.props.type}
                variant="outlined"
                value={this.state.value}
                onChange={this.handleChangeInput}
                margin='dense'
                size='small'
                fullWidth={true}
                autoComplete="off"
            />

        )

    }
}

export default Input