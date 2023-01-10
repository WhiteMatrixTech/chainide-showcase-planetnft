export interface Metadata {
  tokenId: number;
  name: string;
  description: string;
  properties: Properties[];
}

export interface Properties {
  trait_type: string;
  value: string;
}
