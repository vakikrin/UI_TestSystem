import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';

class InputNumber extends React.Component {


    render() {
        return (
            <FormControl component="fieldset" className="formControl">
                <FormLabel component="legend"></FormLabel>

                <TextField
                    id="standard-number"
                    label="Number"
                    type="number"
                    value={this.props.question.answer}
                    onChange={this.props.handleChange}
                />
            </FormControl>

        );

    }
}

export default InputNumber