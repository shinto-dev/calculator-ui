import {Icon,Table} from "semantic-ui-react";
import React from "react";

export default function CalculationList({calculations}) {
    return (
        <Table basic='very' celled>
            <Table.Body>
                {
                    calculations.map((exp, i) =>
                        <Table.Row key={`${exp}-${i}`}>
                            <Table.Cell>
                                {exp.value}
                            </Table.Cell>
                            <Table.Cell><Icon disabled name='clock' />{exp.time}</Table.Cell>
                        </Table.Row>)
                }

            </Table.Body>
        </Table>
    )
}
