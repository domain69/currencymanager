import React, { useState, useContext, useEffect, useCallback } from 'react'
import { InputNumber, Skeleton, Button, Card, Form, Alert } from 'antd'

import { CurrencyContext } from '../utils';
import FormItem from 'antd/lib/form/FormItem';

const initialState = {}

export default () => {
    const [loading, setLoading] = useState(true);
    const { currency, value } = useContext(CurrencyContext)
    const [billAmount, setAmount] = useState(0)
    const [paidAmount, setPaidAmount] = useState({})
    const [totalAmount, setTotalAmount] = useState(0)
    const [result, setResult] = useState({ display: false, message: '', description: '', type: '' })
    const setupCurrency = useCallback(() => {
        currency.map((value) => initialState[value] = 0)
    }, [currency])
    useEffect(() => {
        setupCurrency();
        setPaidAmount(initialState)
        setLoading(false)
    }, [setupCurrency])
    const calculateTotal = (array) => {
        let total = 0;
        currency.map((value) => total = total + value * array[value])
        return total
    }
    const onChange = (e, el) => {
        const temp = paidAmount
        temp[el] = e
        setPaidAmount(temp)
        setTotalAmount(calculateTotal(paidAmount))

    }
    const calculateChange = () => {
        let totalCurrency = {}
        currency.map((el) => totalCurrency[el] = value[el] + paidAmount[el])
        if (billAmount - totalAmount < 0) {
            let remainingAmount = totalAmount - billAmount
            let result = []
            currency.map((el) => {
                while (remainingAmount >= el && totalCurrency[el] > 0 && remainingAmount > 0) {
                    remainingAmount -= el
                    result.push(el)
                    totalCurrency[el] -= 1
                }
                return null
            })
            if (remainingAmount === 0) {
                const aCount = new Map([...new Set(result)].map(
                    x => [x, result.filter(y => y === x).length]
                ));
                let resultString = 'Return '
                currency.map((el) => {
                    if (aCount.get(el)) {
                        resultString += `Rs ${el} x ${aCount.get(el)}, `
                    }
                    return null
                })
                setResult({ display: true, message: 'Change Available', description: resultString, type: 'success' })

            }
            else {
                setResult({ display: true, message: 'No Change Available', description: 'Not enough money for transaction', type: 'error' })
            }
        }
        else if (billAmount === totalAmount) {
            setResult({ display: true, message: 'Exact Amount', description: 'No change to be returned', type: 'success' })
        }
        else {
            setResult({ display: true, message: 'Please Pay more', description: 'Bill Amount is larger than Amount Recieved', type: 'error' })

        }
    }
    if (loading) {
        return <Skeleton />
    }
    else {
        return (<div>
            {result.display ? <Alert
                message={result.message}
                description={result.description}
                type={result.type}
                showIcon
                closable
                onClose={(e) => { setResult({ display: false, message: '', description: '', type: '' }) }}
            /> : ''}

            <Form style={{ padding: '24px', paddingBottom: '0px' }}>
                <FormItem label='Bill Amount'>
                    <InputNumber min={0} defaultValue={0} onChange={(event) => { setAmount(event) }}></InputNumber>
                </FormItem>
            </Form>
            <Card title={`Amount Received  ${totalAmount}`}>
                <Form>
                    {
                        currency.map((el) => {
                            return (
                                <Card.Grid key={el}>
                                    <Form.Item label={el}>
                                        <InputNumber min={0} defaultValue={0} onChange={(event) => { onChange(event, el) }}>
                                        </InputNumber>
                                    </Form.Item>
                                </Card.Grid>
                            )
                        })
                    }
                </Form>
            </Card>
            <div className='center'>
                <Button onClick={calculateChange}>Calculate Change</Button>
            </div>

        </div>)
    }

}