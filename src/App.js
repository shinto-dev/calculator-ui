import React, {useEffect, useState} from 'react';
import './App.css';
import {Container, Grid, Header, List} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import CalculationForm from "./CalculationForm";
import CalculationList from "./CalculationList";
import {closeConnection, registerOnMessageCallback, sendMessage, startWebsocketConnection} from "./websocket";

export default function App() {
    const [calculations, setCalculations] = useState([])

    useEffect(() => {
        startWebsocketConnection();
        return () => closeConnection();
    }, []);

    useEffect(() => {
        const receiveNewCalculation = (data) => {
            console.log(data)
            setCalculations([{
                value: data,
                time: new Date().toLocaleString()
            }, ...calculations].slice(0, 10))
        }
        registerOnMessageCallback(receiveNewCalculation)
    }, [calculations])


    const addNewCalculation = (expr) => {
        sendMessage(expr)
    }

    return (
        <div className="App">
            <Container>
                <Grid>
                    <Grid.Row>
                        <CalculationForm onSubmit={addNewCalculation}/>
                    </Grid.Row>
                    <Grid.Row>
                        <List bulleted>
                            <List.Item> Supports only integers.</List.Item>
                            <List.Item> Supported operations: +, -, /, *</List.Item>
                            <List.Item> Example: 5+3 </List.Item>
                        </List>
                    </Grid.Row>
                    <Grid.Row>
                        <Header as={"h2"}>Last 10 calculations</Header>
                    </Grid.Row>
                    <Grid.Row style={{height: 500}}>
                        <CalculationList calculations={calculations}/>
                    </Grid.Row>
                </Grid>
            </Container>
        </div>
    );

}
