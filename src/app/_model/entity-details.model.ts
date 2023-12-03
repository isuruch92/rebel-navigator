export interface EntityDetails {
  id: number;
  name: string;
  height: number;
  mass: number;
  gender: string;
  homeworld: string;
  wiki: string;
  image: string;
  born?: number;
  bornLocation?: string;
  died?: number;
  diedLocation?: string;
  species?: string;
  hairColor?: string;
  eyeColor?: string;
  skinColor?: string;
  cybernetics?: string;
  affiliations?: string[];
  masters?: string[];
  apprentices?: string[];
  formerAffiliations?: string[];
}
