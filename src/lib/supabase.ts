import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Actualite = {
  id: string;
  titre: string;
  date_article: string;
  extrait: string;
  contenu: string;
  categorie: string;
  image_url: string;
  publie: boolean;
  created_at: string;
  updated_at: string;
};

export type AgendaEvent = {
  id: string;
  titre: string;
  date_event: string;
  heure: string;
  lieu: string;
  type_event: string;
  description: string;
  publie: boolean;
  created_at: string;
};

export type Eglise = {
  id: string;
  eglise: string;
  adresse: string;
  image_url: string;
  ordre: number;
  confessions: string;
  adoration: string;
  horaires?: MesseHoraire[];
};

export type MesseHoraire = {
  id: string;
  eglise_id: string;
  jour: string;
  heure: string;
  type_messe: string;
  ordre: number;
};

export type Lien = {
  id: string;
  titre: string;
  url: string;
  description: string;
  categorie: string;
  ordre: number;
};

export type SiteSetting = {
  id: string;
  cle: string;
  valeur: string;
  label: string;
  updated_at: string;
};
