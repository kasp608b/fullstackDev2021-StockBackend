import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { CreateStockDto } from '../dto/create-stock.dto';
import { Socket } from 'socket.io';
import { StockService } from '../service/stock.service';
import { Stock } from '../shared/stock.model';

@WebSocketGateway()
export class StockGateway {
  constructor(private stockService: StockService) {}
  @SubscribeMessage('create-stock')
  handleMessage(
    @MessageBody() data: CreateStockDto,
    @ConnectedSocket() client: Socket,
  ): void {
    const stock: Stock = {
      name: data.name,
      description: data.description,
      value: data.value,
    };
    try {
      this.stockService.createStock(stock);
      client.emit('stock-created-success', stock);
    } catch (e) {
      client.emit('stock-created-error', e.message);
    }
  }
}
