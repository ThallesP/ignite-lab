import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreatePurchaseParams {
  customerId: string;
  productId: string;
}

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService) {}

  listAllPurchases() {
    return this.prisma.purchase.findMany({ orderBy: { createdAt: 'desc' } });
  }

  listAllPurchasesFromCustomer(customerId: string) {
    return this.prisma.purchase.findMany({
      where: { customerId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createPurchase({ productId, customerId }: CreatePurchaseParams) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error("Product doesn't exists");
    }

    return this.prisma.purchase.create({ data: { productId, customerId } });
  }
}
