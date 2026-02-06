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

  public async updateProduct(req: Request, res: Response) {
    try {
       const id: number = Number(req?.params?.id);
      const updated = await this.productsService.updateProductById(id, req.body);
      res.status(200).json(updated);
    } catch (error) {
       res.status(500).json({error });
       throw error;
    }
    
  }

  public async deleteProduct(req: Request, res: Response) {
     try {
       const id: number = Number(req?.params?.id);
      const removed = await this.productsService.deleteProduct(id);
      res.status(200).json(removed);
    } catch (error) {
       res.status(500).json({error });
       throw error;
    }
  }
}

const productsInstance = new ProductsService();
const fileInstance = new FileService();
export default new ProductController(productsInstance, fileInstance);


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
 *        description: Create product successful!
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


/**
 * @swagger
 * /products/{id}:
 *   post:
 *     summary: Update product by id
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the product to update the product item
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The product name
 *               desciption:
 *                 type: string
 *                 description: A short description of product
 *               price:
 *                 type: number
 *                 description: Pirce of the product
 *               isAvailable:
 *                 type: boolean
 *                 description: toogle to set product's availability
 *               eta:
 *                 type: string
 *                 description: duration time of product before it served
 *               bestSeller:
 *                 type: number
 *                 description: range from 1-5 to know how good the product is
 *               updatedBy:
 *                 type: string
 *                 description: tao ito
 *             example:
 *               name: Alamang
 *               description: Kumunidad ng mga hipong pinaglaro sa mainit na kawala. Pinagsayaw sa kumukulong mantika hanggang mamula
 *               price: 400
 *               isAvailable: false
 *               eta: 00:30:10
 *               bestSeller: 3
 *               updatedBy: Pakialamerong Palaka
  *     responses:
 *       200:
 *        description: product found
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 */

/**
 * @swagger
 *  /products/{id}:
 *   delete:
 *     summary: Delete product by id
 *     description: removing a product using its id from db.
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
 *        description: Product deleted success
 */
