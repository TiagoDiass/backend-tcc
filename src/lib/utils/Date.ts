import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default class DateUtils {
  static currentDate() {
    return format(new Date(), 'yyyy-MM-dd', {
      locale: ptBR,
    });
  }
}
