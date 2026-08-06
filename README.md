# AndresSoft LAB para Vercel

Código fuente listo para publicar en Vercel. Incluye la landing page, el minijuego de asteroides y el ranking global con los tres mejores tiempos.

## Publicación rápida

1. Descomprime este paquete y súbelo a un repositorio nuevo de GitHub.
2. En Vercel, selecciona **Add New → Project** e importa el repositorio.
3. Crea una base PostgreSQL compatible, por ejemplo Neon, y copia su cadena de conexión.
4. En **Project Settings → Environment Variables**, crea:

   ```text
   DATABASE_URL=tu_cadena_de_conexion_postgresql
   ```

5. Presiona **Deploy**. La tabla del ranking se crea automáticamente en la primera partida.

## Desarrollo local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre `http://localhost:3000`.

## Nota sobre el ranking

Sin `DATABASE_URL`, el sitio y el juego siguen funcionando, pero el ranking global aparecerá vacío y no conservará tiempos.


Proyecto conectado y desplegado automáticamente con Vercel.
