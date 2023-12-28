import "./Card.css"

const Card = (props)=>
{
    return(
        <div className = {`form-card + ${props.class}`}>
            {props.children}
        </div>
    )
}
export default Card