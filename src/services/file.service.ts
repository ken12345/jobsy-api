

export class FileService {


  public async uploadFile(file: any, merchantId: any) {
    try {

      if (!merchantId || !file) {
        return "";
      }
      const form = new FormData();
      form.append("merchantId", merchantId);
      form.append(
        "file",
        new Blob([new Uint8Array(file.buffer)], { type: file.mimetype }),
        file.originalname
      );

      const isDev = process.env.NODE_ENV === "development";

      const uploadUrl = isDev
        ? "https://services.bitezy.online/bucket/upload"
        : "http://127.0.0.1:3200/bucket/upload";

      return fetch(uploadUrl, {
        method: "POST",
        headers: {
          "x-service-key": process.env.SERVICE_KEY || "",
        },
        body: form,
      }).then(res => res.json());

    } catch (error) {
      throw error;
    }
  }
}
