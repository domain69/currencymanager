import React, { useContext } from 'react';
import { InputNumber, Button, Form, Card } from 'antd';
import { Link } from 'react-router-dom';

import { CurrencyContext } from '../utils';
const gridStyle = {
    width: '25%',
    textAlign: 'center',
};


export default () => {
    const { value, setValue, currency } = useContext(CurrencyContext);
    const onChange = (e, el) => {
        const temp = value
        temp[el] = e
        setValue(temp)
    }
    return (
        <div>
            <Card title='Add Initial Amount' style={{ textAlign: 'center', paddingBottom: '20px' }}>
                <Form >{
                    currency.map((el) => {
                        return (

                            <Card.Grid style={gridStyle} key={el}>
                                <Form.Item label={el} >
                                    <InputNumber min={0} defaultValue={value[el]} onChange={(event) => { onChange(event, el) }}>
                                    </InputNumber>
                                </Form.Item>
                            </Card.Grid>


                        )
                    })

                }
                </Form>
            </Card>
            <div className='center'>
                <Button className='center'><Link to='/transaction'>Next</Link></Button>
            </div>

        </div>
    )


}