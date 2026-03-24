-- limpieza_usuario_un_negocio.sql
-- Uso: reemplaza los valores marcados y ejecuta cada bloque en orden, revisando los PREVIEW antes de correr los DELETE.

-- 1. Verifica el usuario que debe quedarse con un solo negocio.
select
  id as user_id,
  email,
  raw_user_meta_data,
  created_at,
  last_sign_in_at
from auth.users
where lower(email) = lower('tropellacoffee@gmail.com');

-- 2. Confirma el negocio que quieres conservar (por dominio o business_id).
select
  id as business_id,
  business_name,
  branch_name,
  domain,
  owner_id,
  status,
  created_at
from public.businesses
where domain = 'tropellacoffee.mangopos.do';

-- 3. PREVIEW: qué rows mantiene el usuario en user_businesses excepto el esperado.
select
  ub.*,
  b.domain,
  b.business_name,
  b.branch_name
from public.user_businesses ub
left join public.businesses b on b.id = ub.business_id
where ub.user_id = (
  select id
  from auth.users
  where lower(email) = lower('tropellacoffee@gmail.com')
)
  and ub.business_id <> (
    select id
    from public.businesses
    where domain = 'tropellacoffee.mangopos.do'
  );

-- 4. PREVIEW: memberships sobrantes.
select
  m.*,
  b.domain,
  b.business_name,
  b.branch_name
from public.memberships m
left join public.businesses b on b.id = m.business_id
where m.user_id = (
  select id
  from auth.users
  where lower(email) = lower('tropellacoffee@gmail.com')
)
  and m.business_id <> (
    select id
    from public.businesses
    where domain = 'tropellacoffee.mangopos.do'
  );

-- 5. DELETE: elimina user_businesses extras (ejecuta solo si las previews se ven bien).
delete from public.user_businesses
where user_id = (
  select id
  from auth.users
  where lower(email) = lower('tropellacoffee@gmail.com')
)
  and business_id <> (
    select id
    from public.businesses
    where domain = 'tropellacoffee.mangopos.do'
  );

-- 6. DELETE: elimina memberships sobrantes.
delete from public.memberships
where user_id = (
  select id
  from auth.users
  where lower(email) = lower('tropellacoffee@gmail.com')
)
  and business_id <> (
    select id
    from public.businesses
    where domain = 'tropellacoffee.mangopos.do'
  );

-- 7. VERIFICACIÓN FINAL: el usuario solo tiene el negocio esperado.
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
where ub.user_id = (
  select id
  from auth.users
  where lower(email) = lower('tropellacoffee@gmail.com')
)
order by b.domain;

select
  m.user_id,
  m.business_id,
  b.domain,
  m.plan_type,
  m.status
from public.memberships m
left join public.businesses b on b.id = m.business_id
where m.user_id = (
  select id
  from auth.users
  where lower(email) = lower('tropellacoffee@gmail.com')
)
order by b.domain;
