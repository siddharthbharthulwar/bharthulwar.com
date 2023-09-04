import React from 'react'
import { useState, forwardRef, useImperativeHandle } from 'react'


String.prototype.encodeDecode = function()
{
   var nstr=''

   for (var i=0; i <  this.length; i++) {
       nstr += String.fromCharCode(this.charCodeAt(i) ^ 1);
   }

    return nstr;
};

const Entry = forwardRef((props, ref) => {

    const [text, setText] = useState(props.input_text)

    useImperativeHandle(ref, () => ({

        decrypt() {
            for (var i = 0; i < props.num; i++) {
                setText(text.encodeDecode())
            }
        }
    }));


    return (
        <div>
            <p>{text}</p>
        </div>
    )
})

export default Entry