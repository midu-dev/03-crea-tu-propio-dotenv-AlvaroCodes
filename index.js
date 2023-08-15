// reference: https://www.npmjs.com/package/dotenv

/* Aunque muchas veces recomendamos usar métodos asíncronos para leer ficheros,
en este caso seguramente no sea la opción. ¿Te imaginas por qué?

+ Es un recurso imprescindible del que dependen otras funcionalidades de la app,
por lo que hacerlo de manera asíncrona daría errores.
Por ejemplo, si se levanta un servidor, es necesario el PORT nada más inicializar la app.
Si falta,la app petaría...
*/

const fs = require('node:fs')
const path = require('node:path')

function config (options = {}) {
  const path = (typeof options === 'string') ? options : options.path
  const content = readEnv(path)
  addEnv(content)
}

function readEnv (url = path.resolve(__dirname, '.env')) {
  try {
    const contenido = fs.readFileSync(url, 'utf-8').split('\n')
    return contenido
  } catch (error) {
    return false
  }
}

function addEnv (content) {
  if (!content || content.length === 0) return
  content.forEach(e => {
    const [key, value] = e.split('=')
    process.env[key] = value
  })
}

// config()
// config({path: './.envPrueba'})
// config('./.envPrueba')
// console.log(process.env.OPINION_CURSO)

module.exports = { config }
