function hasAllUniqueCharacters(str: string): boolean {
  const characters = str.split('');
  const uniqueCharacters = new Set(characters);
  return characters.length === uniqueCharacters.size;
}

export function tuningTrouble(
  input: string,
  charactersToBeDifferent: number,
): number {
  for (let i = charactersToBeDifferent; i < input.length; i++) {
    const substring = input.substring(i - charactersToBeDifferent, i);
    if (hasAllUniqueCharacters(substring)) {
      return i;
    }
  }
  return 0;
}
