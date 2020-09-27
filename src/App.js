import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {Container, Grid, Header} from 'semantic-ui-react'
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
            console.log('disconnected') //todo: try to reconnect incase of connection loss

        }
        return () => webSocket.current.close();
    }, []);


    useEffect(() => {
        webSocket.current.onmessage = (evt) => {
            setCalculations([evt.data, ...calculations].slice(0, 10))
        };
    }, [calculations])


    const addNewCalculation = (expr) => {
        webSocket.current.send(expr)
    }

    return (
        <div className="App">
            <Container>
                <Header as='h1' textAlign={"left"}> Calculations </Header>
                <Grid>
                    <Grid.Row>
                        <CalculationForm onSubmit={addNewCalculation}/>
                    </Grid.Row>
                    <Grid.Row style={{height: 500}} color={"blue"}>
                        <CalculationList calculations={calculations}/>
                    </Grid.Row>
                </Grid>
            </Container>
        </div>
    );

}
