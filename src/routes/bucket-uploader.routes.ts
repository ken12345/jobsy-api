import express, { Request, Response } from "express";
import multer from "multer";

const router = express.Router();

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload file to server, return public url of the image
 *     tags: [Image Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - merchantId
 *               - menuName
 *               - file
 *             properties:
 *               merchantId:
 *                 type: string
 *               menuName:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Upload successful
 */


const upload = multer({
	storage: multer.memoryStorage(),
});

router.post("/", upload.single("file"), async (req: Request, res: Response) => {
	try {
		const { merchantId } = req.body;
		const file = req.file;

		if (!merchantId || !file) {
			return res.status(400).json({
				message: "merchantId and file required",
			});
		}

		// build formdata for bucket API
		const form = new FormData();
		form.append("merchantId", merchantId);
		form.append(
			"file",
			new Blob([new Uint8Array(file.buffer)], { type: file.mimetype }),
			file.originalname
		);

		// forward request
		const bucketRes = await fetch("https://bucket.bitezy.online/upload", {
			method: "POST",
			headers: {
				"x-service-key": process.env.SERVICE_KEY || "", // REFERENCE FROM ENV VARIABLES OR DATABASE TABLE
			},
			body: form as any
		});

		// copy status + headers
		res.status(bucketRes.status);

		bucketRes.headers.forEach((value, key) => {
			res.setHeader(key, value);
		});

		// send body exactly as-is
		const buffer = Buffer.from(await bucketRes.arrayBuffer());
		res.send(buffer);

	} catch (err) {
		console.error("Proxy upload error:", err);

		res.status(500).json({
			message: "Upload proxy failed",
		});
	}
});

export default router;
