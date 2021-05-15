export default class Validations {
  static id(uuid: string) {
    let re = new RegExp(
      /^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$/
    );
    return re.test(uuid);
  }
}
