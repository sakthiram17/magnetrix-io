import Row from "./Row"

const data = [
  {
    "SKU": "ETD-29/16/10",
    "Core Area": 76,
    "Window Area": 95,
    "Area Product": 14440,
    "Mean Turn Length": 53
  },
  {
    "SKU": "ETD 34/17/11",
    "Core Area": 97.1,
    "Window Area": 123,
    "Area Product": 23800,
    "Mean Turn Length": 60
  },
  {
    "SKU": "ETD 39/20/13",
    "Core Area": 123,
    "Window Area": 177,
    "Area Product": 44420,
    "Mean Turn Length": 69
  },
  {
    "SKU": "ETD 44/22/15",
    "Core Area": 173,
    "Window Area": 214,
    "Area Product": 74000,
    "Mean Turn Length": 77
  },
  {
    "SKU": "ETD 49/25/16",
    "Core Area": 221,
    "Window Area": 273,
    "Area Product": 115200,
    "Mean Turn Length": 85
  },
  {
    "SKU": "ETD 54/28/19",
    "Core Area": 280,
    "Window Area": 316,
    "Area Product": 176736,
    "Mean Turn Length": 96
  },
  {
    "SKU": "ETD 59/31/22",
    "Core Area": 368,
    "Window Area": 366,
    "Area Product": 27000,
    "Mean Turn Length": 106
  }

]








const CoreList = ()=>{

    return(
        <div className = "logs">
      <table className="styled-table">
         <thead>
          <tr>
              <th>Core</th>
              <th>Core Area <h6 style  = {{display : "inline"}}>
                mm<sup>2</sup>
                </h6> </th>
                <th>Window Area <h6 style  = {{display : "inline"}}>
                mm<sup>2</sup>
                </h6> </th>
                <th>Area Product <h6 style  = {{display : "inline"}}>
                mm<sup>4</sup>
                </h6> </th>                
          </tr>
      </thead>
      <tbody>
      {data.map((ele)=>{
        return (
        <Row
        c1 = {ele['SKU']}
        c2 = {ele['Core Area']}
        c3 = {ele['Window Area']}
        c4 = {parseInt(ele['Window Area']*ele['Core Area']*2)}
        m = {4}
        key = {Math.random().toString(36).substring(2,7)}
        >

        </Row>)
      })}
      </tbody>
      </table>
      </div>
    )

}
export default CoreList;