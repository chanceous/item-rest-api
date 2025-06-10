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

Al momento de subir esto tengo 81,81%:
```
---------------------------------------|---------|----------|---------|---------|-------------------
File                                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
---------------------------------------|---------|----------|---------|---------|-------------------
All files                              |   81.81 |    85.71 |   93.75 |   81.81 |                   
src                                   |       0 |      100 |       0 |       0 |                   
app.module.ts                        |       0 |      100 |     100 |       0 | 1-24              
main.ts                              |       0 |      100 |       0 |       0 | 1-21              
src/common/exceptions                 |     100 |      100 |     100 |     100 |                   
rate-limit.exception.ts              |     100 |      100 |     100 |     100 |                   
src/common/filters                    |     100 |      100 |     100 |     100 |                   
http-exception.filter.ts             |     100 |      100 |     100 |     100 |                   
src/common/guards                     |    87.5 |        0 |      50 |   83.33 |                   
api-throttler.guard.ts               |    87.5 |        0 |      50 |   83.33 | 14                
src/common/interceptors               |     100 |      100 |     100 |     100 |                   
transform-response.interceptor.ts    |     100 |      100 |     100 |     100 |                   
src/items                             |       0 |      100 |     100 |       0 |                   
items.module.ts                      |       0 |      100 |     100 |       0 | 1-19              
src/items/application/use-cases       |     100 |      100 |     100 |     100 |                   
get-item.use-case.ts                 |     100 |      100 |     100 |     100 |                   
get-items.use-case.ts                |     100 |      100 |     100 |     100 |                   
src/items/domain/entities             |     100 |      100 |     100 |     100 |                   
item.entity.ts                       |     100 |      100 |     100 |     100 |                   
src/items/domain/exceptions           |     100 |      100 |     100 |     100 |                   
item-out-of-stock.exception.ts       |     100 |      100 |     100 |     100 |                   
src/items/domain/repositories         |     100 |      100 |     100 |     100 |                   
item.repository.ts                   |     100 |      100 |     100 |     100 |                   
src/items/infrastructure/repositories |     100 |      100 |     100 |     100 |                   
json-item.repository.ts              |     100 |      100 |     100 |     100 |                   
src/items/presentation/controllers    |     100 |      100 |     100 |     100 |                   
items.controller.ts                  |     100 |      100 |     100 |     100 |                   
src/items/presentation/dto            |     100 |      100 |     100 |     100 |                   
item-response.dto.ts                 |     100 |      100 |     100 |     100 |                   
---------------------------------------|---------|----------|---------|---------|-------------------
```