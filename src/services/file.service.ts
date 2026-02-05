

export class FileService {


  public async uploadFile(file: any, merchantId: any) {
    try {
   
      if (!merchantId || !file) {
        return;
      }
      const form = new FormData();
      form.append("merchantId", merchantId);
      form.append(
        "file",
        new Blob([new Uint8Array(file.buffer)], { type: file.mimetype }),
        file.originalname
      );

      return await fetch("https://bucket.bitezy.online/upload", {
        method: "POST",
        headers: {
          "x-service-key": process.env.SERVICE_KEY || "", // REFERENCE FROM ENV VARIABLES OR DATABASE TABLE
          },
        body: form as any
      }).then(res => res.json())
    
	} catch (error) {
      throw error;
    }
  }
}
