import { ReactElement } from "react";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: 'Necklace' | 'Bracelet' | 'Ring';
  belief: 'การงาน' | 'การเงิน' | 'ความรัก' | 'สุขภาพ' | 'ความสมดุล';
}

export type Page = 'Home' | 'Shop' | 'Workshop' | 'Our Story' | 'Custom Design';

export interface BeliefCategory {
  key: string;
  name: 'การงาน' | 'การเงิน' | 'ความรัก' | 'สุขภาพ' | 'ความสมดุล';
  icon: ReactElement;
  color: string;
  hoverColor: string;
}