export function EnumToArray(sourceEnum: any) {
  return Object.keys(sourceEnum)
    .filter(value => isNaN(Number(value)) === false)
    .map(key => sourceEnum[key]);
}
