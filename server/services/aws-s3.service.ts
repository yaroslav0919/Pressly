import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';
import { AWSError } from 'aws-sdk/lib/error';
import { ManagedUpload } from 'aws-sdk/lib/s3/managed_upload';
import { Readable } from 'stream';

import configEnv from '@server/configs/env';

interface File {
  /** file name */
  name: string;
  /** A function to move the file elsewhere on your server */
  mv(path: string, callback: (err: any) => void): void;
  mv(path: string): Promise<void>;
  /** Encoding type of the file */
  encoding: string;
  /** The mimetype of your file */
  mimetype: string;
  /** A buffer representation of your file, returns empty buffer in case useTempFiles option was set to true. */
  data: Buffer;
  /** A path to the temporary file in case useTempFiles option was set to true. */
  tempFilePath: string;
  /** A boolean that represents if the file is over the size limit */
  truncated: boolean;
  /** Uploaded size in bytes */
  size: number;
  /** MD5 checksum of the uploaded file */
  md5: string;
}

class AWSS3Service {
  private s3: S3;
  private readonly bucketName: string;
  private readonly region: string;

  constructor() {
    this.bucketName = `${configEnv.AWS.AWS_BUCKET_NAME}`;
    this.region = `${configEnv.AWS.AWS_REGION}`;
    this.s3 = new AWS.S3({ region: this.region });
  }

  private generateFileKey(file: File, timestamp: number): string {
    return `${file.name}-${timestamp}`;
  }

  async uploadFile(file: File): Promise<string> {
    const fileStream: Readable = Readable.from(file.data);

    const timestamp = Date.now();
    const fileKey = this.generateFileKey(file, timestamp);

    const params: S3.Types.PutObjectRequest = {
      Bucket: this.bucketName,
      Key: fileKey,
      ContentType: file.mimetype,
      Body: fileStream,
    };

    const uploadingFile: ManagedUpload = this.s3.upload(params);

    return new Promise((resolve, reject) => {
      uploadingFile.send((err: AWSError, data: S3.ManagedUpload.SendData) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.Location);
        }
      });
    });
  }

  async uploadBulkFiles(files: File[]): Promise<string[]> {
    try {
      if (Array.isArray(files)) {
        const promises = files.map((file) => this.uploadFile(file));
        const results = await Promise.all(promises);
        return results;
      }

      return [];
    } catch (error) {
      throw error;
    }
  }
}

const AWSS3ServiceInstance = new AWSS3Service();

export default AWSS3ServiceInstance;
