# Cómo probar mi código

Bueno, la idea es probar sin que la configuración tarde demasiado, así que deje todo para que simplemente usted deba:


1.  Clonar el repo.
3.  Levantar contenedores con Docker

    ```bash
    docker-compose up --build
    ```
    Nota: El `docker-compose.yml` está configurado para iniciar la aplicación en modo de dev.

4.  Una vez que el contenedor esté en funcionamiento, la API estará disponible en la siguiente URL:

    `http://localhost:3000`
## Endpoints
* **Obtener un item:** `GET /api/v1/items/{ITEM_ID}`
  * Item Funcional: `GET /api/v1/items/MLA1400921865`
  * Item Sin Stock: `GET /api/v1/items/MLA1574805028`
* **Obtener todos los items:** `GET /api/v1/items`
## Rate Limiting

Es importante tener en cuenta que la API implementa un límite de peticiones para simular casos reales de demanda.

* **Configuración:** Se permite un máximo de **50 peticiones por minuto** por cada dirección IP.

* Si se excede este límite, la API responderá con un código de estado `429 Too Many Requests` y un mensaje de error indicando que se ha superado el límite de solicitudes.

## Excepciones

Para este caso, maneje solamente dos casos, para posibles problemas:

* **Producto sin stock:** Cuando el stock es 0 simplemente lanzamos una `ItemOutOfStockException`.
* **Rate limit:** Además del código de estado `429 Too Many Requests` se handleara la excepción `RateLimitException`.


## Unit testing

Ejecuta el siguiente comando para correr las pruebas unitarias:

```bash
docker-compose exec mercadolibre-items npm run test
```

## E2E testing

Ejecuta el siguiente comando para correr los tests End-to-End:

```bash
docker-compose exec mercadolibre-items npm run test:e2e
```

## Coverage

Ejecuta el siguiente comando para obtener los resultados del coverage:

```bash
docker-compose exec mercadolibre-items npm run test:cov
```

Al momento de subir esto tengo 86,52%:
```
---------------------------------------|---------|----------|---------|---------|-------------------
File                                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
---------------------------------------|---------|----------|---------|---------|-------------------
All files                              |   86.52 |    83.33 |   87.17 |   86.06 |                   
 src                                   |   11.53 |      100 |       0 |    12.5 |                   
  app.module.ts                        |       0 |      100 |     100 |       0 | 1-26              
  config.ts                            |     100 |      100 |     100 |     100 |                   
  main.ts                              |       0 |      100 |       0 |       0 | 1-21              
 src/ai                                |     100 |      100 |     100 |     100 |                   
  ai.module.ts                         |     100 |      100 |     100 |     100 |                   
 src/ai/application/use-cases          |     100 |    77.77 |     100 |     100 |                   
  answer-question.use-case.ts          |     100 |    77.77 |     100 |     100 | 25-30             
 src/ai/presentation/controllers       |     100 |      100 |     100 |     100 |                   
  ai.controller.ts                     |     100 |      100 |     100 |     100 |                   
 src/ai/presentation/dto               |     100 |      100 |     100 |     100 |                   
  questions.dto.ts                     |     100 |      100 |     100 |     100 |                   
 src/common/exceptions                 |     100 |      100 |     100 |     100 |                   
  rate-limit.exception.ts              |     100 |      100 |     100 |     100 |                   
 src/common/filters                    |     100 |      100 |     100 |     100 |                   
  http-exception.filter.ts             |     100 |      100 |     100 |     100 |                   
 src/common/guards                     |    87.5 |        0 |      50 |   83.33 |                   
  api-throttler.guard.ts               |    87.5 |        0 |      50 |   83.33 | 14                
 src/common/interceptors               |     100 |      100 |     100 |     100 |                   
  transform-response.interceptor.ts    |     100 |      100 |     100 |     100 |                   
 src/items                             |     100 |      100 |     100 |     100 |                   
  items.module.ts                      |     100 |      100 |     100 |     100 |                   
 src/items/application/use-cases       |     100 |      100 |     100 |     100 |                   
  get-item.use-case.ts                 |     100 |      100 |     100 |     100 |                   
  get-items.use-case.ts                |     100 |      100 |     100 |     100 |                   
 src/items/domain/entities             |   86.11 |      100 |   85.71 |   86.11 |                   
  item.entity.ts                       |   86.11 |      100 |   85.71 |   86.11 | 30-34             
 src/items/domain/exceptions           |     100 |      100 |     100 |     100 |                   
  item-out-of-stock.exception.ts       |     100 |      100 |     100 |     100 |                   
 src/items/domain/repositories         |     100 |      100 |     100 |     100 |                   
  item.repository.ts                   |     100 |      100 |     100 |     100 |                   
 src/items/infrastructure/repositories |   96.29 |      100 |   88.88 |   95.65 |                   
  json-item.repository.ts              |   96.29 |      100 |   88.88 |   95.65 | 52                
 src/items/presentation/controllers    |     100 |      100 |     100 |     100 |                   
  items.controller.ts                  |     100 |      100 |     100 |     100 |                   
 src/items/presentation/dto            |   95.23 |      100 |   66.66 |     100 |                   
  item-response.dto.ts                 |   95.23 |      100 |   66.66 |     100 |                   
---------------------------------------|---------|----------|---------|---------|-------------------
```