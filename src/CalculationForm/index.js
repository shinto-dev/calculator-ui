import React, {useState} from 'react';
import {Button, Grid} from "semantic-ui-react";

export default function CalculationForm({onSubmit}) {
    const [exp, setExp] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(exp)
        setExp("");
    };


    return (
        <form onSubmit={handleSubmit}>
            <Grid columns={2}>
                <Grid.Column width={10} stretched={true}>
                    <input
                        value={exp}
                        placeholder='Enter expression'
                        onChange={(event) => setExp(event.target.value)}
                    />
                    {/*<Input size={"large"} placeholder='Enter expression' value={exp}/>*/}
                </Grid.Column>
                <Grid.Column width={2}>
                    <Button content='Submit'/>
                </Grid.Column>
            </Grid>
        </form>
    )
}