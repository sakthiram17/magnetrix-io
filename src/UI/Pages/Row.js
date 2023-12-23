import react from "react"
import "./CoresList.css"
const Row = (props)=>{

    if(props.m==3)
    {
        return (
  
            <tr class="active-row">
                <td>{props.c1}</td>
                <td>{props.c2}</td>
                <td>{props.c3}</td>
            </tr>
            )
    }
    else{
        return(
            (
  
                <tr class="active-row">
                    <td>{props.c1}</td>
                    <td>{props.c2}</td>
                    <td>{props.c3}</td>
                    <td>{props.c4}</td>
                </tr>
                )
        )
    }



    
}

export default Row;