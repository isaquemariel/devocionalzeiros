/**
 * DDIs aceitos no WhatsApp do cadastro.
 *
 * Mora aqui, e não dentro de uma tela, porque o formulário de cadastro e a
 * jornada de boas-vindas pedem o mesmo número: duas listas divergiriam na
 * primeira vez que alguém acrescentasse um país numa só.
 *
 * `maxDigits` é o número NACIONAL, sem o DDI — é o que limita o campo.
 */
export interface Ddi {
  code: string;
  country: string;
  flag: string;
  maxDigits: number;
  placeholder: string;
}

export const DDIS: Ddi[] = [
  { code: "+55",  country: "BR", flag: "🇧🇷", maxDigits: 11, placeholder: "(11) 99999-9999" },
  { code: "+1",   country: "US", flag: "🇺🇸", maxDigits: 10, placeholder: "(555) 555-5555" },
  { code: "+351", country: "PT", flag: "🇵🇹", maxDigits: 9,  placeholder: "912 345 678" },
  { code: "+34",  country: "ES", flag: "🇪🇸", maxDigits: 9,  placeholder: "612 345 678" },
  { code: "+39",  country: "IT", flag: "🇮🇹", maxDigits: 10, placeholder: "312 345 6789" },
  { code: "+44",  country: "UK", flag: "🇬🇧", maxDigits: 10, placeholder: "7911 123456" },
  { code: "+33",  country: "FR", flag: "🇫🇷", maxDigits: 9,  placeholder: "6 12 34 56 78" },
  { code: "+49",  country: "DE", flag: "🇩🇪", maxDigits: 11, placeholder: "1512 3456789" },
  { code: "+81",  country: "JP", flag: "🇯🇵", maxDigits: 10, placeholder: "90-1234-5678" },
  { code: "+86",  country: "CN", flag: "🇨🇳", maxDigits: 11, placeholder: "139 1234 5678" },
  { code: "+54",  country: "AR", flag: "🇦🇷", maxDigits: 10, placeholder: "11 1234-5678" },
  { code: "+56",  country: "CL", flag: "🇨🇱", maxDigits: 9,  placeholder: "9 1234 5678" },
  { code: "+57",  country: "CO", flag: "🇨🇴", maxDigits: 10, placeholder: "312 345 6789" },
  { code: "+52",  country: "MX", flag: "🇲🇽", maxDigits: 10, placeholder: "55 1234 5678" },
  { code: "+595", country: "PY", flag: "🇵🇾", maxDigits: 9,  placeholder: "961 456789" },
  { code: "+598", country: "UY", flag: "🇺🇾", maxDigits: 8,  placeholder: "94 123 456" },
];
