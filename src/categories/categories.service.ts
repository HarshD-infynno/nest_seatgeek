import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma.service';
import { Categories } from '../utils/const';
import * as fs from 'fs';
import * as FormData from 'form-data';
import { Blob } from 'buffer';

@Injectable()
export class CategoriesService {
  constructor(
    private httpService: HttpService,
    private prisma: PrismaService,
    private readonly categories: Categories,
  ) {}
  async signature() {
    try {
      const string = `curl -i \
     -X GET \
     -H "X-Signature: ${process.env.TE_API_SECRET}" \
     -H "X-Token: ${process.env.TE_API_TOKEN}" \
     --url '${process.env.TE_BASE_URL}/v${process.env.TE_API_VERSION}/categories'`;
      const hash = crypto
        .createHmac('SHA256', '123456')
        .update(string)
        .digest('hex');

      // const file = fs.readFileSync(
      //   'C:/Users/kkrut/Downloads/Twilio Requirements.pdf',
      // );
      // const Form = new FormData();
      // Form.append('file', file, 'test.pdf');
      // let response = [];
      // await this.httpService
      //   .post('http://5ce6-103-106-22-193.ngrok.io', Form, {
      //     headers: {
      //       ...Form.getHeaders(),
      //     },
      //   })
      //   .toPromise()
      //   .then((res) => {
      //     response = res.data.data;
      //   })
      //   .catch((error) => {
      //     console.log('error >>>> ', error.response);
      //   });

      let data = null;
      // x-Signature
      await this.httpService
        .get(
          `${process.env.TE_BASE_URL}/v${process.env.TE_API_VERSION}/categories`,
          {
            params: {
              'X-Signature': hash,
            },
            headers: {
              'X-Token': process.env.TE_API_TOKEN,
              'X-Signature': process.env.TE_API_SECRET,
            },
          },
        )
        .toPromise()
        .then(async (res) => {
          data = res.data;
          for (let i = 0; i < data.categories.length; i++) {
            const mainCategory = data.categories[i];
            let categories = mainCategory;
            while (categories) {
              const data = {
                name: categories.name,
                id: parseInt(categories.id),
                slug: categories.slug,
                url: categories.url,
                slug_url: categories.slug_url,
                updated_at: categories.updated_at,
                parent: categories.parent
                  ? parseInt(categories.parent.id)
                  : null,
              };
              await this.prisma.category.upsert({
                create: data,
                update: data,
                where: {
                  id: parseInt(categories.id),
                },
              });
              categories = categories.parent;
            }
          }
        })
        .catch((err) => {
          console.error(err);
        });

      return { message: 'success', data };
    } catch (e) {
      console.log(e);
      return { message: 'error', error: e };
    }
  }
}
