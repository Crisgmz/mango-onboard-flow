-- diagnostico_y_limpieza_tropellacoffee.sql
-- Proyecto esperado: supabase.mangopos.do
-- Usuario analizado:
--   email: tropellacoffee@gmail.com
--   user_id: 82cbe945-f108-424f-991f-2f18957fab60
-- Negocio correcto esperado:
--   business_id: 38a0dfd6-f342-4e8c-b9d6-daf9e07d60da
--   domain: tropellacoffee.mangopos.do
--
-- IMPORTANTE:
-- 1) Ejecuta primero las consultas de diagnóstico
-- 2) Revisa previews antes de borrar
-- 3) No descomentes DELETE/UPDATE hasta confirmar resultados


-- =========================================================
-- 1. Confirmar usuario
-- =========================================================
select
  id,
  email,
  raw_user_meta_data,
  created_at,
  last_sign_in_at
from auth.users
where id = '82cbe945-f108-424f-991f-2f18957fab60';


-- =========================================================
-- 2. Ver user_businesses reales del usuario en ESTA base
-- =========================================================
select
  ub.user_id,
  ub.business_id,
  ub.role,
  ub.created_at as linked_at,
  b.business_name,
  b.branch_name,
  b.domain,
  b.owner_id,
  b.status
from public.user_businesses ub
left join public.businesses b on b.id = ub.business_id
where ub.user_id = '82cbe945-f108-424f-991f-2f18957fab60'
order by b.domain, ub.role;


-- =========================================================
-- 3. Ver memberships del usuario
-- =========================================================
select
  m.user_id,
  m.business_id,
  m.plan_type,
  m.status,
  m.start_date,
  m.end_date,
  b.business_name,
  b.branch_name,
  b.domain
from public.memberships m
left join public.businesses b on b.id = m.business_id
where m.user_id = '82cbe945-f108-424f-991f-2f18957fab60'
order by b.domain;


-- =========================================================
-- 4. Ver negocios donde figura como owner
-- =========================================================
select
  id as business_id,
  business_name,
  branch_name,
  domain,
  owner_id,
  status,
  created_at
from public.businesses
where owner_id = '82cbe945-f108-424f-991f-2f18957fab60'
order by domain;


-- =========================================================
-- 5. Confirmar negocio correcto esperado
-- =========================================================
select
  id,
  business_name,
  branch_name,
  domain,
  owner_id,
  status,
  created_at
from public.businesses
where id = '38a0dfd6-f342-4e8c-b9d6-daf9e07d60da';


-- =========================================================
-- 6. Preview de asociaciones SOBRANTES en user_businesses
-- =========================================================
select
  ub.*,
  b.domain,
  b.business_name,
  b.branch_name
from public.user_businesses ub
left join public.businesses b on b.id = ub.business_id
where ub.user_id = '82cbe945-f108-424f-991f-2f18957fab60'
  and ub.business_id <> '38a0dfd6-f342-4e8c-b9d6-daf9e07d60da'
order by b.domain;


-- =========================================================
-- 7. Preview de memberships SOBRANTES
-- =========================================================
select
  m.*,
  b.domain,
  b.business_name,
  b.branch_name
from public.memberships m
left join public.businesses b on b.id = m.business_id
where m.user_id = '82cbe945-f108-424f-991f-2f18957fab60'
  and m.business_id <> '38a0dfd6-f342-4e8c-b9d6-daf9e07d60da'
order by b.domain;


-- =========================================================
-- 8. Preview de negocios donde es owner y NO son el correcto
-- =========================================================
select
  id,
  business_name,
  branch_name,
  domain,
  owner_id,
  status,
  created_at
from public.businesses
where owner_id = '82cbe945-f108-424f-991f-2f18957fab60'
  and id <> '38a0dfd6-f342-4e8c-b9d6-daf9e07d60da'
order by domain;


-- =========================================================
-- 9. LIMPIEZA: borrar user_businesses sobrantes
-- =========================================================
-- DESCOMENTA SOLO CUANDO HAYAS REVISADO EL PREVIEW
-- delete from public.user_businesses
-- where user_id = '82cbe945-f108-424f-991f-2f18957fab60'
--   and business_id <> '38a0dfd6-f342-4e8c-b9d6-daf9e07d60da';


-- =========================================================
-- 10. LIMPIEZA: borrar memberships sobrantes
-- =========================================================
-- DESCOMENTA SOLO CUANDO HAYAS REVISADO EL PREVIEW
-- delete from public.memberships
-- where user_id = '82cbe945-f108-424f-991f-2f18957fab60'
--   and business_id <> '38a0dfd6-f342-4e8c-b9d6-daf9e07d60da';


-- =========================================================
-- 11. OPCIONAL: quitar owner_id en negocios de prueba NO correctos
-- =========================================================
-- OJO: esto solo si confirmas que esos otros negocios no deben seguir siendo de este usuario.
-- Antes de ejecutar, revisa el preview de la sección 8.
--
-- DESCOMENTA SOLO SI ESTÁS SEGURO
-- update public.businesses
-- set owner_id = null
-- where owner_id = '82cbe945-f108-424f-991f-2f18957fab60'
--   and id <> '38a0dfd6-f342-4e8c-b9d6-daf9e07d60da';


-- =========================================================
-- 12. VERIFICACIÓN FINAL
-- =========================================================
select
  ub.user_id,
  ub.business_id,
  ub.role,
  b.domain,
  b.business_name,
  b.branch_name,
  b.owner_id
from public.user_businesses ub
left join public.businesses b on b.id = ub.business_id
where ub.user_id = '82cbe945-f108-424f-991f-2f18957fab60'
order by b.domain;

select
  m.user_id,
  m.business_id,
  b.domain,
  m.plan_type,
  m.status
from public.memberships m
left join public.businesses b on b.id = m.business_id
where m.user_id = '82cbe945-f108-424f-991f-2f18957fab60'
order by b.domain;

select
  id,
  domain,
  owner_id
from public.businesses
where owner_id = '82cbe945-f108-424f-991f-2f18957fab60'
order by domain;
