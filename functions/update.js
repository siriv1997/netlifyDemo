/* Import faunaDB sdk */
const faunadb = require('faunadb')
const q = faunadb.query


exports.handler = async (event, context) => {

    /* configure faunaDB Client with our secret */
    const client = new faunadb.Client({
      secret: 'fnAEQkI4q1ACRtpZtd9E6qnl2-HWaofbO1s-lFfW'
    }) 
    
    const data = JSON.parse(event.body)
    console.log('Function `todo-create` invoked', data.id)


    return client.query(
      q.Update(
        q.Ref(q.Collection('create'), `${data.id}`),
        {
          data
        },
      )
    )
    .then((response) =>{
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      }
    })
    .catch((error) => {
      console.log('error', error)
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    }) 
}
