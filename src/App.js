import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {List, Container, Grid, Header} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import CalculationForm from "./CalculationForm";
import CalculationList from "./CalculationList";

export default function App() {
    const [calculations, setCalculations] = useState([])
    const webSocket = useRef({});

    useEffect(() => {
        webSocket.current = new WebSocket("ws://localhost:8080/ws");

        webSocket.current.onopen = () => {
            console.log('connected')
        }

        webSocket.current.onclose = () => {
            console.log('disconnected')
        }
        return () => webSocket.current.close();
    }, []);


    useEffect(() => {
        webSocket.current.onmessage = (evt) => {
            setCalculations([{
                value: evt.data,
                time: new Date().toLocaleString()
            }, ...calculations].slice(0, 10))
        };
    }, [calculations])


    const addNewCalculation = (expr) => {
        webSocket.current.send(expr)
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
