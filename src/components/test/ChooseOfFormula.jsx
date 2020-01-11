import React from 'react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import MathJax from 'react-mathjax'

class ChooseOfFormula extends React.Component {

    render() {
        return (
            <FormControl component="fieldset" className="formControl">
                <FormLabel component="legend"></FormLabel>
                <MathJax.Provider>
                    <RadioGroup aria-label="gender" name="gender1" value={this.props.question.answer}
                                onChange={this.props.handleChange}>
                        <FormControlLabel value={this.props.question.o1} control={<Radio/>}
                                          label={<MathJax.Node formula={this.props.question.o1}/>}/>
                        <FormControlLabel value={this.props.question.o2} control={<Radio/>}
                                          label={<MathJax.Node formula={this.props.question.o2}/>}/>
                        <FormControlLabel value={this.props.question.o3} control={<Radio/>}
                                          label={<MathJax.Node formula={this.props.question.o3}/>}/>
                        <FormControlLabel value={this.props.question.o4} control={<Radio/>}
                                          label={<MathJax.Node formula={this.props.question.o4}/>}/>
                    </RadioGroup>
                </MathJax.Provider>
            </FormControl>

        );

    }
}

export default ChooseOfFormula