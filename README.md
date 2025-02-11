🔹 1. Clonar el Repositorio

Abre una terminal y ejecuta:

git clone https://github.com/andress1014/MarketPlaceClientMagicLog.git
cd MarketPlaceClientMagicLog

🔹 2. Instalar Dependencias

Asegúrate de tener Node.js 16+ instalado y ejecuta:

npm install

🔹 3. Configurar Variables de Entorno

Crea un archivo .env en la raíz del proyecto y agrega:

VITE_API_URL=https://marketplaceservermagiclog-production.up.railway.app

Esto configurará la URL del backend.
🔹 4. Levantar el Servidor

Ejecuta:

npm run dev

Esto iniciará Vite y verás algo como:

  VITE vX.X.X  ready in XX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose

Abre http://localhost:5173/ en tu navegador.
🔹 5. Acceder con Usuarios de Prueba
Rol	Correo	Contraseña
Admin	admin@admin.com	123456
Seller 1	seller@seller.com	123456
Seller 2	seller2@gmail.com	123456
🔹 6. Solución de Problemas

Si tienes errores, prueba:

    Verificar versión de Node.js

node -v

Se recomienda Node.js 16 o superior.

Borrar y reinstalar dependencias

rm -rf node_modules package-lock.json
npm install

Si hay problemas con Vite, asegúrate de que está instalado

npm list vite

Si no está, instálalo con:

    npm install vite

🚀 Listo para Desarrollo

Con estos pasos, tu entorno estará listo para trabajar con React + TypeScript + Vite. 🎉 ¡Déjame saber si necesitas ayuda! 🚀