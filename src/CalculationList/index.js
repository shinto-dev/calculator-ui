import {Grid, List} from "semantic-ui-react";
import React from "react";

export default function CalculationList({calculations}) {
    return (
        <Grid columns={1}>
            <Grid.Row textAlign={"left"}>
                <List relaxed style={{padding: 5}}>
                    {
                        calculations.map(exp =>
                            <List.Item key={exp}>
                                {exp}
                            </List.Item>
                        )
                    }
                </List>
            </Grid.Row>
        </Grid>
    )
}
