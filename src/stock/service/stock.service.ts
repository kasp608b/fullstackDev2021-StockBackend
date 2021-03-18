import { Injectable } from '@nestjs/common';
import { Stock } from '../shared/stock.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StockService {
  public stocks: Stock[] = [];

  createStock(stock: Stock): Stock {
    // const id = uuidv4();
    // Validering Af Data navn okay?
    if (stock.name.length < 2) {
      throw new Error('Stock name must be more then 2 chars');
    }
    stock.id = uuidv4();
    this.stocks.push(stock);
    return stock;
  }
}
