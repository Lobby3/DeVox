import { hexadecimalize } from ".";

export const fixDaohausUrl = (url?: string) =>
  url
    ?.replace(".fun", ".club")
    .replace(
      /(?<=molochv3\/)(\d+)/,   
      (_matched, capture: string, _index, _input) => hexadecimalize(capture) ?? capture
    );
