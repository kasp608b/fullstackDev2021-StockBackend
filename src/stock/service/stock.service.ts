import { Injectable } from '@nestjs/common';
import { Stock } from '../shared/stock.model';
import { StockRepository } from '../infrastructure/mongo/stock.repository';

@Injectable()
export class StockService {
  public stocks: Stock[] = [];

  constructor(private stockRepository: StockRepository) {}

  async createStock(stock: Stock): Promise<Stock> {
    // const id = uuidv4();
    // Validering Af Data navn okay?
    if (stock.name.length < 2) {
      throw new Error('Stock name must be more then 2 chars');
    }
    const stockCreated = this.stockRepository.addStock(stock);
    return stockCreated;
  }
}
