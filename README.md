# mango-onboard-flow

Portal de autenticación y onboarding para MangoPOS.

## Objetivo
Este proyecto cubre el flujo de:
- login
- registro
- configuración inicial de empresa
- verificación de correo
- selección de negocio
- redirección al tenant correcto

## Contexto
- `mangopos.do` / `www.mangopos.do` → landing comercial
- `app.mangopos.do` → portal central de acceso
- `*.mangopos.do` → sistema principal

## Configuración
Este proyecto reutiliza el mismo Supabase de `mangospos`.

Variables esperadas:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Próximos pasos
- conectar login con Supabase Auth
- validar subdominios reales
- conectar creación de tenant
- redirigir a `tenant.mangopos.do`
