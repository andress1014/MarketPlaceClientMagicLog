## 1. Clonar el Repositorio

Abre una terminal y ejecuta:

```sh
git clone https://github.com/andress1014/MarketPlaceClientMagicLog.git
cd MarketPlaceClientMagicLog
```

## 2. Instalar Dependencias

```sh
npm install
```

Crea un archivo `.env` en la raíz del proyecto y agrega:

## 3. Configurar Variables de Entorno

```env
VITE_API_URL=https://marketplaceservermagiclog-production.up.railway.app
```

Esto configurará la URL del backend.

## 4. Levantar el Servidor

Ejecuta:

```sh
npm run dev
```

Esto iniciará Vite y verás algo como:

```
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

## 5. Acceder con Usuarios de Prueba

| Rol      | Correo             | Contraseña |
|----------|--------------------|------------|
| Admin    | admin@admin.com    | 123456     |
| Seller 1 | seller@seller.com  | 123456     |
| Seller 2 | seller2@gmail.com  | 123456     |

## 6. Solución de Problemas

Se recomienda Node.js 16 o superior.

Si tienes problemas, elimina `node_modules` y `package-lock.json` y reinstala las dependencias:

```sh
rm -rf node_modules package-lock.json
npm install
```

Si hay problemas con Vite, asegúrate de que está instalado:

```sh
npm install vite
```

Con estos pasos, tu entorno estará listo para trabajar con React + TypeScript + Vite. 🎉 ¡Déjame saber si necesitas ayuda! 🚀