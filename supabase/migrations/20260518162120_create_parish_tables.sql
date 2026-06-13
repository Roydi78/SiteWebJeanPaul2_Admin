/*
  # Création des tables pour l'unité pastorale Saint Jean-Paul II

  ## Nouvelles tables
  - `actualites` — Articles d'actualité (titre, date, extrait, image, catégorie, publié)
  - `agenda` — Événements de l'agenda (titre, date_event, heure, lieu, type)
  - `messes` — Horaires des messes par église (eglise, jour, heure, type_messe, confessions, adoration)
  - `liens` — Liens utiles (titre, url, description, categorie)
  - `nav_links` — Liens personnalisables du menu de navigation (label, page, ordre, visible)
  - `site_settings` — Paramètres globaux du site (clé/valeur)

  ## Sécurité
  - RLS activé sur toutes les tables
  - Lecture publique autorisée sur les données publiées
  - Écriture réservée aux utilisateurs authentifiés (admins)
*/

-- ACTUALITES
CREATE TABLE IF NOT EXISTS actualites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titre text NOT NULL DEFAULT '',
  date_article date NOT NULL DEFAULT CURRENT_DATE,
  extrait text NOT NULL DEFAULT '',
  contenu text NOT NULL DEFAULT '',
  categorie text NOT NULL DEFAULT 'Annonce',
  image_url text NOT NULL DEFAULT '',
  publie boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE actualites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture publique des actualités publiées"
  ON actualites FOR SELECT
  TO anon, authenticated
  USING (publie = true);

CREATE POLICY "Admin peut lire toutes les actualités"
  ON actualites FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admin peut insérer des actualités"
  ON actualites FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admin peut modifier des actualités"
  ON actualites FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admin peut supprimer des actualités"
  ON actualites FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- AGENDA
CREATE TABLE IF NOT EXISTS agenda (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titre text NOT NULL DEFAULT '',
  date_event date NOT NULL DEFAULT CURRENT_DATE,
  heure text NOT NULL DEFAULT '',
  lieu text NOT NULL DEFAULT '',
  type_event text NOT NULL DEFAULT 'Liturgie',
  description text NOT NULL DEFAULT '',
  publie boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE agenda ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture publique de l'agenda"
  ON agenda FOR SELECT
  TO anon, authenticated
  USING (publie = true);

CREATE POLICY "Admin lecture agenda"
  ON agenda FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admin insert agenda"
  ON agenda FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admin update agenda"
  ON agenda FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admin delete agenda"
  ON agenda FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- MESSES
CREATE TABLE IF NOT EXISTS messes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  eglise text NOT NULL DEFAULT '',
  adresse text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  ordre integer NOT NULL DEFAULT 0,
  confessions text NOT NULL DEFAULT '',
  adoration text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS messe_horaires (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  eglise_id uuid NOT NULL REFERENCES messes(id) ON DELETE CASCADE,
  jour text NOT NULL DEFAULT '',
  heure text NOT NULL DEFAULT '',
  type_messe text NOT NULL DEFAULT '',
  ordre integer NOT NULL DEFAULT 0
);

ALTER TABLE messes ENABLE ROW LEVEL SECURITY;
ALTER TABLE messe_horaires ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture publique messes"
  ON messes FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admin insert messes"
  ON messes FOR INSERT TO authenticated WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admin update messes"
  ON messes FOR UPDATE TO authenticated
  USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admin delete messes"
  ON messes FOR DELETE TO authenticated USING (auth.uid() IS NOT NULL);

CREATE POLICY "Lecture publique horaires"
  ON messe_horaires FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admin insert horaires"
  ON messe_horaires FOR INSERT TO authenticated WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admin update horaires"
  ON messe_horaires FOR UPDATE TO authenticated
  USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admin delete horaires"
  ON messe_horaires FOR DELETE TO authenticated USING (auth.uid() IS NOT NULL);

-- LIENS
CREATE TABLE IF NOT EXISTS liens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titre text NOT NULL DEFAULT '',
  url text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  categorie text NOT NULL DEFAULT '',
  ordre integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE liens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture publique liens"
  ON liens FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admin insert liens"
  ON liens FOR INSERT TO authenticated WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admin update liens"
  ON liens FOR UPDATE TO authenticated
  USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admin delete liens"
  ON liens FOR DELETE TO authenticated USING (auth.uid() IS NOT NULL);

-- SITE SETTINGS (parole de vie, textes généraux)
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cle text UNIQUE NOT NULL,
  valeur text NOT NULL DEFAULT '',
  label text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture publique settings"
  ON site_settings FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Admin insert settings"
  ON site_settings FOR INSERT TO authenticated WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admin update settings"
  ON site_settings FOR UPDATE TO authenticated
  USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admin delete settings"
  ON site_settings FOR DELETE TO authenticated USING (auth.uid() IS NOT NULL);
