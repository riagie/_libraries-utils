import { PhoneNumberUtil } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

const PHONE_TYPE_LABELS = [
  "Fixed-line",
  "Mobile",
  "Toll-free",
  "Premium Rate",
  "Shared Cost",
  "VoIP",
  "Personal Numbers (whenever feasible)",
];

export function phoneNumber(phone: string, country = "ID") {
  const phoneObject = phoneUtil.parse(String(phone), String(country).toUpperCase());

  const regionCode = phoneUtil.getRegionCodeForNumber(phoneObject);
  const countryCode = phoneObject.getCountryCode();
  const national = phoneObject.getNationalNumber();

  const possibleNumber = phoneUtil.isPossibleNumber(phoneObject);
  const validNumber = phoneUtil.isValidNumber(phoneObject);
  const typeLabel = PHONE_TYPE_LABELS[phoneUtil.getNumberType(phoneObject)] ?? "UNKNOWN";

  return {
    regionCode: regionCode ?? "",
    numberType: typeLabel,
    providerNumber: "",
    countryCode: countryCode ?? "",
    number: national !== undefined ? String(national) : "",
    possibleNumber,
    validNumber,
  };
}
