import { format } from 'date-fns';

export default class Validations {
  /**
   * verifica se o id informado está no padrão UUID
   */
  static id(uuid: string) {
    const regex = new RegExp(
      /^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$/
    );
    return regex.test(uuid);
  }

  /**
   * verifica se a data informada está no padrão YYYY-MM-DD
   */
  static date_YYYY_MM_DD(date: string) {
    const regex = new RegExp(/^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/);

    if (!regex.test(date)) return false;

    try {
      format(new Date(`${date} 12:00:00`), 'yyyy-MM-dd');

      return true;
    } catch (error: any) {
      console.log(error);
      return false;
    }
  }

  /**
   * verifica se a URL informada é válida
   */
  static url(url: string) {
    let re = new RegExp(/^[a-zA-Z0-9-_]+[:./\\]+([a-zA-Z0-9 -_./:=&"'?%+@#$!])+$/g);
    return re.test(url);
  }

  /**
   * verifica se o CEP informado é válido
   */
  static cep(cep: string) {
    const pattern = /^[0-9]{5}-[0-9]{3}$/;
    return pattern.test(cep);
  }
}
