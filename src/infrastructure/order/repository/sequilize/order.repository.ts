import Order from "../../../../domain/checkout/entity/order";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderRepositoryInterface from '../../../../domain/checkout/repository/order-repository.interface';
import OrderItem from '../../../../domain/checkout/entity/order_item';

export default class OrderRepository implements OrderRepositoryInterface {
  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
      },
      {
        where: { id: entity.id },
      });

    await OrderItemModel.destroy({
      where: { order_id: entity.id },
    });

    entity.items.forEach(async (item) => {
      await OrderItemModel.upsert(
        {
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
          order_id: entity.id,
        });
    });
  }

  find(id: string): Promise<Order> {
    throw new Error("Method not implemented.");
  }
  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    });
    return orderModels.map((orderModels) => {
      return new Order(
        orderModels.id,
        orderModels.customer_id,
        orderModels.items.map(item => {
          return new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity
          );
        })
      );
    });
  }
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
}
