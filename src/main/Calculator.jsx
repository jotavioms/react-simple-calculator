import React, { Component } from 'react';
import './Calculator.css';
import Button from '../components/Button';
import Display from '../components/Display';

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    currentIndexOnUse: 0,
};

export default class Calculator extends Component {
    state = { ...initialState };

    calculateValues = (values, operation) => {
        try {
            return eval(`${values[0]} ${operation} ${values[1]}`);
        } catch(e) {
            return this.state.values[0];
        }
    };
    
    firstIndexOnUse = () => {
        return this.state.currentIndexOnUse === 0;
    };
    
    hasPeriod = (num) => {
        return num === '.' && this.state.displayValue.includes('.')
    };

    setNewValue = (newValue) => {
        const index = this.state.currentIndexOnUse;
        const values = [ ...this.state.values ];
        
        values[index] = newValue;

        this.setState({ values });
    };
    
    clearMemory = () => {
        this.setState({ ...initialState })
    };

    setOperation = operation => {
        if (this.firstIndexOnUse()) {
            this.setState({ operation, currentIndexOnUse: 1, clearDisplay: true });
        } else {
            const isEqual = operation === '=';
            const currentOperation = this.state.operation;
            const values = [ ...this.state.values ];

            values[0] = this.calculateValues(values, currentOperation);
            values[1] = 0;

            this.setState({
                displayValue: values[0],
                operation: isEqual ? null : operation,
                currentIndexOnUse: isEqual ? 0 : 1,
                clearDisplay: !isEqual,
                values,
            })
        }
    };

    addDigit = num => {
        if (this.hasPeriod(num)) {
            return;
        }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;
        const currentValue = clearDisplay ? '' : this.state.displayValue;
        const displayValue = currentValue + num;

        this.setState({ displayValue, clearDisplay: false });

        if (num !== '.') {
            const newValue = parseFloat(displayValue);
            this.setNewValue(newValue);
        }
    };

    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={this.clearMemory} triple />
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation />
            </div>
        );
    };
};