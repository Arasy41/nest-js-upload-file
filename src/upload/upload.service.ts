import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

@Injectable()
export class UploadService {
    private supabase;

    constructor() {
    dotenv.config();
    this.supabase = createClient(
        process.env.SUPABASE_URL as string,
        process.env.SUPABASE_KEY as string,
    );
    }

  async uploadImage(file: Express.Multer.File): Promise<any> {
    
    const fileBuffer = Buffer.from(file.buffer);
    const fileName = file.originalname;

    // Upload the file to Supabase
    const { data, error } = await this.supabase.storage
      .from('images')
      .upload(fileName, fileBuffer, {
        contentType: file.mimetype,
      });

    if (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }

    // Get the public URL of the uploaded file
    const { data: image, error: urlError } = this.supabase.storage
      .from('images')
      .getPublicUrl(data.path);

    if (urlError) {
      throw new Error(`Failed to get public URL: ${urlError.message}`);
    }

    return {
        message: "Upload file successfully",
        file_url: image.publicUrl
    }
  }
}
