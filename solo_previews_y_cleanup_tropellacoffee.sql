-- solo_previews_y_cleanup_tropellacoffee.sql
-- Objetivo:
-- dejar al usuario tropellacoffee@gmail.com con acceso solo a:
--   tropellacoffee.mangopos.do
--
-- user_id correcto:
--   82cbe945-f108-424f-991f-2f18957fab60
-- business_id correcto:
--   38a0dfd6-f342-4e8c-b9d6-daf9e07d60da


-- =========================================================
-- PREVIEW 1: accesos sobrantes en user_businesses
-- =========================================================
select
  ub.user_id,
  ub.business_id,
  ub.role,
  ub.created_at,
  b.domain,
  b.business_name,
  b.branch_name,
  b.owner_id
from public.user_businesses ub
left join public.businesses b on b.id = ub.business_id
where ub.user_id = '82cbe945-f108-424f-991f-2f18957fab60'
  and ub.business_id <> '38a0dfd6-f342-4e8c-b9d6-daf9e07d60da'
order by b.domain, ub.role;


-- =========================================================
-- PREVIEW 2: memberships sobrantes
-- =========================================================
select
  m.user_id,
  m.business_id,
  m.plan_type,
  m.status,
  m.created_at,
  b.domain,
  b.business_name,
  b.branch_name,
  b.owner_id
from public.memberships m
left join public.businesses b on b.id = m.business_id
where m.user_id = '82cbe945-f108-424f-991f-2f18957fab60'
  and m.business_id <> '38a0dfd6-f342-4e8c-b9d6-daf9e07d60da'
order by b.domain;


-- =========================================================
-- LIMPIEZA 1: dejar solo Tropella en user_businesses
-- DESCOMENTA CUANDO CONFIRMES EL PREVIEW
-- =========================================================
-- delete from public.user_businesses
-- where user_id = '82cbe945-f108-424f-991f-2f18957fab60'
--   and business_id <> '38a0dfd6-f342-4e8c-b9d6-daf9e07d60da';


-- =========================================================
-- LIMPIEZA 2: dejar solo Tropella en memberships
-- DESCOMENTA CUANDO CONFIRMES EL PREVIEW
-- =========================================================
-- delete from public.memberships
-- where user_id = '82cbe945-f108-424f-991f-2f18957fab60'
--   and business_id <> '38a0dfd6-f342-4e8c-b9d6-daf9e07d60da';


-- =========================================================
-- VERIFICACIÓN FINAL 1: user_businesses
-- =========================================================
select
  ub.user_id,
  ub.business_id,
  ub.role,
  b.domain,
  b.business_name,
  b.branch_name
from public.user_businesses ub
left join public.businesses b on b.id = ub.business_id
where ub.user_id = '82cbe945-f108-424f-991f-2f18957fab60'
order by b.domain;


-- =========================================================
-- VERIFICACIÓN FINAL 2: memberships
-- =========================================================
select
  m.user_id,
  m.business_id,
  m.plan_type,
  m.status,
  b.domain
from public.memberships m
left join public.businesses b on b.id = m.business_id
where m.user_id = '82cbe945-f108-424f-991f-2f18957fab60'
order by b.domain;
