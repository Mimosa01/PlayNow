export class LocalStorage {
  constructor() {}

  static dataToJson(data: unknown): string {
    return JSON.stringify(data);
  }
  
  static jsonToData(data: string): unknown[] {
    return JSON.parse(data);
  }
  
  static getItemData(key: string): string | null {
    return localStorage.getItem(key);
  }
  
  static setItemData(key: string, data: unknown ): void {
    localStorage.setItem(key, this.dataToJson(data));
  }
 
  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  static getData(key: string): unknown[] | [] {
    const data = this.getItemData(key);
    return data ? this.jsonToData(data) : [];
  }  
}