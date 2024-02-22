import {formatCurrency} from '../../script/util/money.js';


  describe('test suite: formatcurrency', () =>{

    it('concerts cents into doller', () => {
      expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('work with 0', () => {
      expect(formatCurrency(0)).toEqual('0.00');
    });

    it('round up to the nearest cents', () => {
      expect(formatCurrency(2000.5)).toEqual('20.01');
    });

  });
