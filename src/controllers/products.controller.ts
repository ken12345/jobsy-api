import { Request, Response } from 'express';
import { ProductsService } from '../services/products.service';
import type { IProducts } from '../interfaces/products.interface';
import { FileService } from '../services/file.service';

class ProductController {

  private productsService: ProductsService;
  private fileService: FileService

  constructor(productsService: ProductsService, fileService: FileService) {
    this.productsService = productsService;
    this.fileService = fileService;
  }

  public async createProduct (req:Request, res: Response) {
    try {
      const imageUrl = await this.fileService.uploadFile(req?.file, req.body.merchantId);
      req.body.imageUrl = imageUrl?.url;
      const result = await this.productsService.createProduct(req?.body);
      res.status(201).json({ message: 'Product created successfully', result});
    } catch (error) {
       res.status(500).json({ message: 'Prodduct unsuccessful' });
      throw error;
    }
  }
  public async getProductById(req: Request, res: Response) {
    try {
      const id: number = Number(req?.params?.id);
      const result = await this.productsService.getProductById(id);
       res.status(200).json(result);
    } catch (error) {
      res.status(500).json({error });
       throw error;
    }
  }
}

/**
* @swagger
 * /products:
 *   post:
 *     summary: Create a product
 *     description: create a product
 *     tags: [Products]
 *     requestBody:
 *        required: true
 *        content:
 *           multipart/form-data:
 *            schema:
 *              type: object
 *              required:
 *                - name
 *                - price
 *                - isAvailable
 *                - merchantId
 *                - eta
 *              properties:
 *                name:
 *                  type: string
 *                  example: 'Bagoong'
 *                description:
 *                  type: string
 *                  example: 'mga patay na isda na tinapaktapakan ng mga badjao, matapos balahurain, ilalagay sa palayok upang uurin'
 *                price:
 *                  type: number
 *                  example: 20.00
 *                isAvailable:
 *                  type: boolean
 *                  example: true
 *                merchantId:
 *                  type: number
 *                  example: 1
 *                eta:
 *                  type: string
 *                  example: '00:00:00'
 *                bestSeller:
 *                  type: number
 *                  sample: 1
 *                createdBy:
 *                  type: string
 *                  example: 'ken joe'
 *                updatedBy:
 *                  type: string
 *                  example: 'Boyong Manyalak'
 *                file:
 *                  type: string
 *                  format: binary
 *                  description: The file to upload
 *     responses:
 *       201:
 *        description: Get merchant by ID successful
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 */

/**
 * @swagger
 *  /products/{id}:
 *   get:
 *     summary: Get Product by ID
 *     description: Retrieve a product using its id from db.
 *     tags: [Products]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *            required: true
 *            description: Numeric ID of the product to get
  *     responses:
 *       200:
 *        description: product found
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 */

const productsInstance = new ProductsService();
const fileInstance = new FileService()
export default new ProductController(productsInstance, fileInstance);