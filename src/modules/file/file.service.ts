import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { IImageType } from 'src/types/file';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FileService {
  constructor(private readonly configService: ConfigService) {}

  async uploadImage(dataBuffer: Buffer, filename: string): Promise<string> {
    const s3 = new S3();
    const params = {
      Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
      Key: filename,
    };
    try {
      await s3.headObject(params).promise();
      const signedUrl = s3.getSignedUrl('getObject', params);
      return signedUrl;
    } catch (error) {
      if (error.name == 'NotFound') {
        try {
          const uploadResult = await s3
            .upload({
              ...params,
              Body: dataBuffer,
            })
            .promise();
          return uploadResult.Location;
        } catch (error) {
          console.log('ERROR: ', error);
          return error;
        }
      }
    }
  }

  async uploadMultiImage(imageInfo: IImageType[]): Promise<string[]> {
    const result: string[] = [];
    try {
      for (let i = 0; i < imageInfo.length; ++i) {
        const url = await this.uploadImage(
          imageInfo[i].data,
          imageInfo[i].name,
        );
        result.push(url);
      }
      return result;
    } catch (error) {
      console.log('ERROR: ', error);
      return [];
    }
  }

  async deleteImage(fileKey: string) {
    const s3 = new S3();
    await s3
      .deleteObject({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Key: fileKey,
      })
      .promise();
  }
}
