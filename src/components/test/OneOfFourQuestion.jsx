import React from 'react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';



class OneOfFourQuestion extends React.Component {


    render() {
        return (
            <FormControl component="fieldset" className="formControl" mx="auto">

                <RadioGroup value={this.props.question.answer}
                            onChange={this.props.handleChange}>
                    <FormControlLabel value={this.props.question.o1} control={<Radio color="primary"/>}
                                      label={this.props.question.o1}/>
                    <FormControlLabel value={this.props.question.o2} control={<Radio color="primary"/>}
                                      label={this.props.question.o2}/>
                    <FormControlLabel value={this.props.question.o3} control={<Radio color="primary"/>}
                                      label={this.props.question.o3}/>
                    <FormControlLabel value={this.props.question.o4} control={<Radio color="primary"/>}
                                      label={this.props.question.o4}/>
                </RadioGroup>
            </FormControl>

        );

    }
}

export default OneOfFourQuestion