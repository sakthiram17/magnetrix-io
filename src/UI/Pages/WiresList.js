import Row from "./Row"
import Wire from "../Wire"


const WiresList = ()=>{

    return(
        <div className = "logs">
      <table class="styled-table">
         <thead>
          <tr>
              <th>Wire </th>
              <th>Crossection <h6 style  = {{display : "inline"}}>
                mm<sup>2</sup>
                </h6> </th>
                <th>Current <h6 style  = {{display : "inline"}}>
                Amps
                </h6> </th>           
          </tr>
      </thead>
      <tbody>
      {Wire.map((ele)=>{
        return (
        <Row
        c1 = {ele.name}
        c2 = {ele.Area}
        c3 = {ele.Current}
        c4 = {parseInt(ele['Window Area']*ele['Core Area'])}
        m = {3}
        key = {Math.random().toString(36).substring(2,7)}
        >

        </Row>)
      })}
      </tbody>
      </table>
      </div>
    )

}
export default WiresList;