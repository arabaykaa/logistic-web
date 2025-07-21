
export interface CargoRequestType {
  clientName: string;
  containerNumber: string;
  // expeditor: string;
  isRented: string | null;
  deliveryDate: Date | null;
  portEntryDate: Date | null;
  // documentDeadline: Date | null;
  documentReceivedDate: Date | null;
  etd: Date | null;
  atd: Date | null;
  portStorageDays: string | null;
  extraCosts: string | null;
  chinaArrivalDate: Date | null;
  inlandDepartureDate: Date | null;
  kashgarArrivalDate: Date | null;
  // positionStatus: string;
  delayReason: string | null;
  finalArrivalDate: Date | null;
}

export interface CargoResponseType extends CargoRequestType {
  _id: string;
}

export interface CargoResponseTypeForTable {
  data: CargoResponseType[];
  currentPage: number;
  totalCount: number;
  totalPages: number;
}
