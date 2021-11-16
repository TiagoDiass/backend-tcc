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

  /**
   * verifica se a UF informada é válida
   */
  static brazilianUF(uf: string) {
    if (uf.length != 2) return false;
    let re = new RegExp(
      /AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO/i
    );
    return re.test(uf);
  }

  /**
   * verifica se o email informado é válido
   */
  static email(email: string) {
    let re = new RegExp(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi
    );
    return re.test(email);
  }

  /**
   * verifica se o CNPJ informado é válido
   */
  static cnpj(cnpj: string) {
    if (!cnpj) {
      return false;
    }

    var i, add, rev, cnpjj;
    cnpjj = cnpj.replace(/[^\d]+/g, '');
    if (cnpjj == '') return false;
    if (cnpjj.length != 14) return false;
    if (
      cnpjj == '00000000000000' ||
      cnpjj == '11111111111111' ||
      cnpjj == '22222222222222' ||
      cnpjj == '33333333333333' ||
      cnpjj == '44444444444444' ||
      cnpjj == '55555555555555' ||
      cnpjj == '66666666666666' ||
      cnpjj == '77777777777777' ||
      cnpjj == '88888888888888' ||
      cnpjj == '99999999999999'
    )
      return false;
    let tamanho = cnpjj.length - 2;
    let numeros = cnpjj.substring(0, tamanho);
    let digitos = cnpjj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += (numeros.charAt(tamanho - i) as any) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != (digitos.charAt(0) as any)) return false;
    tamanho = tamanho + 1;
    numeros = cnpjj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += (numeros.charAt(tamanho - i) as any) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != (digitos.charAt(1) as any)) return false;
    return true;
  }

  static phone(phone: string) {
    let r;
    // 99?99999999
    let re = new RegExp(/^[0-9]{10,11}$/);
    try {
      r = re.test(phone);
    } catch (e) {
      r = false;
    }
    return r;
  }
}
