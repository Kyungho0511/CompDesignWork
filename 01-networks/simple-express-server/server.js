// grab the main Express module from package installed
const http = request('http')

// create the app variable and call the Express function
const app = express()

// establish which port you’d like to use
const port = 3000

// define route handler for GET requests to the server
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})