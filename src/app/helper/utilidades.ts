export class Utilidades {

    public static toArray(id: any) {
        const lstData = (id == null) ? null : (id.length == undefined) ? id : id.split(",");
        let arrResult = lstData == null ? [] : Array.isArray(lstData) == true ? lstData.map((x: any) => parseInt(x)) : lstData;

        let arrData = [];
        if (Array.isArray(arrResult) == false) {
            arrData.push(lstData);
            arrResult = arrData;
        }

        return arrResult;
    }

    public static replace(input: string) {
        var newline = String.fromCharCode(13, 10);
        return this.replaceAll(input, "<br />", newline.toString());
    }
      
    public static replaceAll(str: any, find: any, replace: any) {
        return str.replace(new RegExp(find, 'g'), replace);
    }

    public static getUniqueId(parts: number): string {
        const stringArr = [];
        for (let i = 0; i < parts; i++) {
          // tslint:disable-next-line:no-bitwise
          const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
          stringArr.push(S4);
        }
        return stringArr.join('-');
    }

    public static pad(num: any, length: any) {
        return String(num).padStart(length, '0');
      }
}
