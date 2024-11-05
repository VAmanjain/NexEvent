import React, { ChangeEvent, useState } from 'react'
import { Button } from 'react-bootstrap'

interface MyButtonProps{
    text:string | number | boolean ;
    onClick?: ()=>void;
}

type props = {text:string};

interface book {
    name: string,
    price: number,
}

const MyButton :React.FC<MyButtonProps> = (props) => {
    // const { text, onClick} =props;
    const [value, setValue] = useState<string | undefined> ();

    const handleNameChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
        setValue(e.target.value)
    }
  return (
    <div>
        {/* <h3>Name:{value.name} Price:{value?.price}</h3>
        <Button onClick={()=>setValue({name:"Make", price:30})}>{text}</Button> */}

        <input onChange={handleNameChange} type="text" placeholder='Enter you name' value={value} />
        <h3>{value}</h3>
    </div>
  )
}

export default MyButton