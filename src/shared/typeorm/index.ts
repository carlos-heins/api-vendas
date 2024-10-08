import 'reflect-metadata'

import { AppDataSource } from './data-source'

AppDataSource.initialize()
  .then(() => {
    console.log('---------->Data Source has been initialized!')
  })
  .catch(err => {
    console.log(`Erro: ${err}`)
  })
