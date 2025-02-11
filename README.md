## 1. Clonar el Repositorio

Abre una terminal y ejecuta:

cd MarketPlaceClientMagicLog
🔹 2. Instalar Dependencias

## 2. Instalar Dependencias

npm install


Crea un archivo .env en la raíz del proyecto y agrega:
## 3. Configurar Variables de Entorno
VITE_API_URL=https://marketplaceservermagiclog-production.up.railway.app

Esto configurará la URL del backend.

Ejecuta:

## 4. Levantar el Servidor

Esto iniciará Vite y verás algo como:


  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose

🔹 5. Acceder con Usuarios de Prueba
Rol	Correo	Contraseña
Admin	admin@admin.com	123456
Seller 1	seller@seller.com	123456
Seller 2	seller2@gmail.com	123456
🔹 6. Solución de Problemas
## 5. Acceder con Usuarios de Prueba

| Rol      | Correo             | Contraseña |
|----------|--------------------|------------|
| Admin    | admin@admin.com    | 123456     |
## 6. Solución de Problemas
| Seller 2 | seller2@gmail.com  | 123456     |
node -v

Se recomienda Node.js 16 o superior.


rm -rf node_modules package-lock.json
npm install

Si hay problemas con Vite, asegúrate de que está instalado


Si no está, instálalo con:

    npm install vite


Con estos pasos, tu entorno estará listo para trabajar con React + TypeScript + Vite. 🎉 ¡Déjame saber si necesitas ayuda! 🚀