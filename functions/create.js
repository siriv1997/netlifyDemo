/* Import faunaDB sdk */
const faunadb = require('faunadb')
const q = faunadb.query


exports.handler = async (event, context) => {
    /* configure faunaDB Client with our secret */
    const client = new faunadb.Client({
      secret:'fnAEQkI4q1ACRtpZtd9E6qnl2-HWaofbO1s-lFfW'
    })  
    /* parse the string body into a useable JS object */
    const data = JSON.parse(event.body)
    console.log('Function `todo-create` invoked', data)
    const todoItem = {
      data: data
    }
    /* construct the fauna query */
    return client.query(q.Create(q.Ref('crud/create'), todoItem))
      .then((response) => {
        console.log('success', response)
        /* Success! return the response with statusCode 200 */
        return {
          statusCode: 200,
          body: JSON.stringify(response)
        }
      }).catch((error) => {
        console.log('error', error)
        /* Error! return the error with statusCode 400 */
        return {
          statusCode: 400,
          body: JSON.stringify(error)
        }
      })
  }
