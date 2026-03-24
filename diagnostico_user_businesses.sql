-- diagnostico_user_businesses.sql
-- Uso:
-- 1) Reemplaza TU_CORREO_AQUI por el correo real
-- 2) Ejecuta la consulta 1 para obtener el user_id
-- 3) Reemplaza USER_ID_AQUI por ese UUID
-- 4) Identifica el BUSINESS_ID_CORRECTO
-- 5) Antes de borrar nada, ejecuta siempre los preview


-- 1. Ver qué usuario está usando ese correo
select
  id,
  email,
  raw_user_meta_data,
  created_at,
  last_sign_in_at
from auth.users
where lower(email) = lower('TU_CORREO_AQUI');


-- 2. Ver todos los negocios asociados a ese user_id
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
where ub.user_id = 'USER_ID_AQUI'
order by b.domain, ub.role;


-- 3. Ver memberships del mismo usuario
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
where m.user_id = 'USER_ID_AQUI'
order by b.domain;


-- 4. Ver cuáles negocios tiene como owner
select
  id as business_id,
  business_name,
  branch_name,
  domain,
  owner_id,
  status,
  created_at
from public.businesses
where owner_id = 'USER_ID_AQUI'
order by domain;


-- 5. Consulta consolidada para diagnóstico rápido
with target_user as (
  select id, email
  from auth.users
  where lower(email) = lower('TU_CORREO_AQUI')
)
select
  tu.id as user_id,
  tu.email,
  ub.business_id,
  ub.role,
  ub.created_at as user_business_linked_at,
  m.plan_type,
  m.status as membership_status,
  b.business_name,
  b.branch_name,
  b.domain,
  b.owner_id,
  case when b.owner_id = tu.id then true else false end as is_owner
from target_user tu
left join public.user_businesses ub on ub.user_id = tu.id
left join public.memberships m
  on m.user_id = tu.id
 and m.business_id = ub.business_id
left join public.businesses b on b.id = ub.business_id
order by b.domain, ub.role;


-- 6. Preview de lo que se borraría en user_businesses
select
  ub.*
from public.user_businesses ub
where ub.user_id = 'USER_ID_AQUI'
  and ub.business_id <> 'BUSINESS_ID_CORRECTO';


-- 7. Borrar asociaciones incorrectas en user_businesses
-- OJO: ejecuta esto solo después de revisar previews y confirmar el business correcto
-- delete from public.user_businesses
-- where user_id = 'USER_ID_AQUI'
--   and business_id <> 'BUSINESS_ID_CORRECTO';


-- 8. Preview de memberships sobrantes
select
  *
from public.memberships
where user_id = 'USER_ID_AQUI'
  and business_id <> 'BUSINESS_ID_CORRECTO';


-- 9. Borrar memberships sobrantes
-- OJO: descomenta solo cuando estés seguro
-- delete from public.memberships
-- where user_id = 'USER_ID_AQUI'
--   and business_id <> 'BUSINESS_ID_CORRECTO';


-- 10. Verificar si el usuario figura como owner en varios negocios
select
  id,
  domain,
  owner_id
from public.businesses
where owner_id = 'USER_ID_AQUI'
order by domain;


-- 11. Resumen final recomendado antes de limpiar
-- Si aparece como owner de varios negocios, NO borres a ciegas.
-- Primero decide si esos negocios:
-- - son pruebas
-- - deben reasignarse a otro owner
-- - o deben permanecer
