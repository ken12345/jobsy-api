import Merchant from "../models/merchant.model";

import User from "../models/user.model";

export class MerchantService {

  public async createMerchant(merchantData: 
    {
      merchantName: string, 
      description: string, 
      address: string,
      openTime: string, 
      closeTime: string,
      locationCoord: string, 
      availabilty: boolean, 
      logo: string, 
      code: string, 
      updatedBy: string
    }) {
    return Merchant.create(merchantData, {include: {model: User}});
  }

  public getMerchantById(id: number) {
    return Merchant.findByPk(id);
  }
}