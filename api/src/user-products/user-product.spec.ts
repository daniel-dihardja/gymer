import { UserProductEntity } from './user-product';

describe('UserProduct', () => {
    it('should be defined', () => {
        expect(new UserProductEntity()).toBeDefined();
    });
});
