import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { StockEntity } from './stock.entity';
import { Stock } from '../../shared/stock.model';

@Injectable()
export class StockRepository {
  constructor(
    @Inject('STOCK_MODEL')
    private stockDBModel: Model<StockEntity>,
  ) {}

  async addStock(stock: Stock): Promise<Stock> {
    //Convert to Entity
    const createdCat = new this.stockDBModel(stock);
    const stockEntitySaved = await createdCat.save();
    const stockToReturn: Stock = {
      id: stockEntitySaved._id,
      name: stockEntitySaved.name,
      description: stockEntitySaved.description,
      value: stockEntitySaved.value,
    };
    console.log('entiy saved', stockToReturn);
    return stockToReturn;
  }
}
