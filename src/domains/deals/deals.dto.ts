export type CreateDealDto = {
  title: string;
  content: string;
  price: string;
  location: string;
  imgSrc?: string;
};

export type UpdateDealDto = CreateDealDto;
