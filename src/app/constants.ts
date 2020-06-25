import { environment as env } from '../environments/environment';

export class Constants {

  static readonly STOCK_CLOSE_HOURS = 17;
  static readonly DAYS = new Set().add(0).add(6);
  static readonly API_KEY = env.api_token;
  static readonly BASE_URL = env.base_url;
  static readonly VERSION = env.version;
  static readonly SYMBOL =  env.symbol_stock;
  static readonly MARKET_SYMBOL = env.symbol_market;
  static readonly API_QUOTE = env.api_001;
  static readonly API_COMPANY = env.api_002;
}
