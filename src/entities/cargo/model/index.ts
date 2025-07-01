export interface CargoRequestType {
  clientName: string;
  containerNumber: string;
  expeditor: string;
  isRented: string;
  deliveryDate: Date | null;
  portEntryDate: Date | null;
  documentDeadline: Date | null;
  documentReceivedDate: Date | null;
  etd: Date | null;
  atd: Date | null;
  portStorageDays: string;
  extraCosts: string;
  chinaArrivalDate: Date | null;
  inlandDepartureDate: Date | null;
  kashgarArrivalDate: Date | null;
  positionStatus: string;
  delayReason: string;
  finalArrivalDate: Date | null;
  notes: string;
  latitude: number;
  longitude: number;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface CargoResponseType extends CargoRequestType {
  _id: string;
}
