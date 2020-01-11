import React from 'react'

class ButtonSubmit extends React.Component {
    constructor(props) {
        super(props);
        console.log("Button is created")
    }


    static defaultProps = {"title": "Login"};


    render() {
        return (

            <button type="submit">{this.props.title}</button>
        )

    }
}

export default ButtonSubmit