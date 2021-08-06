// verifica se o uuid é valido
export default function testValidUUID(uuid: string): boolean {
  if (
    !/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
      uuid,
    )
  )
    return false;

  return true;
}
