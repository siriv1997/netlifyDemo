/* Import faunaDB sdk */
const faunadb = require('faunadb')
const q = faunadb.query


exports.handler = async (event, context) => {


    /* configure faunaDB Client with our secret */
    const client = new faunadb.Client({
      secret: 'fnAEQkI4q1ACRtpZtd9E6qnl2-HWaofbO1s-lFfW'
    }) 
    
    let data = await client.query( q.Map(
      q.Paginate(q.Documents(q.Collection('create'))),
      q.Lambda(x => q.Get(x)))
    ).then((response)=>{
      // console.log(response.data)
      return {
        statusCode: 200,
        body: JSON.stringify(response.data)
      }
    })
    .catch((error)=>{
      console.log(error)
      return {
        statusCode: 400,
        data: JSON.stringify(error)
      }
    })

    // console.log(data,'data')
    return data;
}
