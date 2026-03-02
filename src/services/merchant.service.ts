import Merchant from "../models/merchant.model";

import User from "../models/user.model";
import { FileService } from "./file.service";

export class MerchantService {

  private fileService: FileService;

  constructor(fileService: FileService) {
    this.fileService = fileService;
  }

  public async createMerchant(merchantData: 
    {
      merchantName: string, 
      description: string, 
      address: string,
      city: string;
      province: string;
      postalCode: string;
      openTime: string, 
      closeTime: string,
      daysOpen: string;
      locationCoord: string, 
      code: string, 
      updatedBy: string,
      email: string,
      contactNumber: string;
    }, logo: any, banner: any) {
      const merchant = await  Merchant.create(merchantData, {include: {model: User}});
      const logourl = await this.fileService.uploadFile(logo[0], merchant.id);
      const bannerurl = await this.fileService.uploadFile(banner[0], merchant.id);
      console.log("kensh banner", bannerurl)
      console.log("kensh logo", logourl)
      merchant.logoURL = logourl?.url;
      merchant.bannerURL = bannerurl?.url;
      merchant.save()
      return merchant;
    // return Merchant.create(merchantData, {include: {model: User}});
  }

  public getMerchantById(id: number) {
    return Merchant.findByPk(id);
  }

    public deleteMerchantById(id: number) {
    return Merchant.destroy({where: { id } });
  }
}