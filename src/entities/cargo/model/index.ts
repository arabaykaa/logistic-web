export type CargoRequestType = {
  name: string;
  clientName: string;
  latitude: number;
  longitude: number;
  positionStatus: string;
};

export type CargoResponseType = {
  clientName: string;
  createdAt: string;
  latitude: number;
  longitude: number;
  name: string;
  owner: string;
  positionStatus: string;
  updatedAt: string;
  __v: number;
  _id: string;
};
