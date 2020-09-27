import React, {useState} from 'react';
import {Form} from "semantic-ui-react";

export default function CalculationForm({onSubmit}) {
    const [exp, setExp] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(exp)
        setExp("");
    };

    const handleChange = event => setExp(event.target.value);

    return (
        <React.Fragment>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Input
                        type="text"
                        // width={10}
                        size={"massive"}
                        placeholder='Enter expression'
                        required
                        value={exp}
                        onChange={handleChange}
                        pattern="^(\d|[1-9][0-9]+)([\+\-\/\*](\d|[1-9][0-9]+))+$"
                    />
                    <Form.Button content='Submit' />
                </Form.Group>
            </Form>
        </React.Fragment>
    )
}