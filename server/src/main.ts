import createServer from './utils/createServer';
async function main(){
const app = createServer()

try{
  const url = await app.listen(4000, '0.0.0.0')
  console.log(`Server listening on ${url}`)
}
catch(err){
  console.error(err)
  process.exit(1)
}
}

main()