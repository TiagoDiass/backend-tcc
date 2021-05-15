import { format } from 'date-fns';
import { enUS, ptBR } from 'date-fns/locale';

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
    const regex = new RegExp(
      /^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/
    );

    if (!regex.test(date)) return false;

    try {
      format(new Date(`${date} 12:00:00`), 'yyyy-MM-dd');

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
