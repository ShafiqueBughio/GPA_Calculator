import React from 'react'

const BUtton = ({type,onAdd,OnRemove,text,className}) => {

    const HandleClick = ()=>{
        if(onAdd) onAdd();
        if(OnRemove) OnRemove();
    }
  return (
   <button type={type} onClick={HandleClick} className={className}>
    {text}
   </button>
  )
}

export default BUtton