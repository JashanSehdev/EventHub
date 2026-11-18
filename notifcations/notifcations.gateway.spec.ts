import { Test, TestingModule } from '@nestjs/testing';
import { NotifcationsGateway } from './notifcations.gateway';

describe('NotifcationsGateway', () => {
  let gateway: NotifcationsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotifcationsGateway],
    }).compile();

    gateway = module.get<NotifcationsGateway>(NotifcationsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
