export interface MeteoData {
  Datum: number;
  Standort: string;
  Standortname: string;
  WGS84_lat: number;
  WGS84_lng: number;
  RainDur: number;
  StrGlo: number | null;
  T: number;
  T_max_h1: number;
  p: number;
}