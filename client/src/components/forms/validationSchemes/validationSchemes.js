import * as yup from "yup";
import {
  phoneRegex,
  numbersLettersRegex,
  numbersRegex,
  lettersRegex,
} from "../../../utils/regex";

export const validationSchemaRezervare = yup
  .object({
    idClient: yup.string().required("Selectează un client!"),
    adulti: yup.string().required("Introdu un număr adulți!"),
    copii: yup
      .string()
      .matches(numbersRegex, "Trebuie să conțină numai cifre")
      .notRequired()
      .transform((value) => (value === "" ? null : value)),
    tipAuto: yup.string().required("Selectează cel puțin un tip auto!"),
    idLoc: yup.string().required("Trebuie să selectezi un loc!"),
    // .transform((value) => (value === "" ? null : value)),
    hasElectricity: yup.bool().notRequired(),
  })
  .required();

export const validationSchemaClient = yup
  .object({
    cnp: yup
      .string()
      .required("CNP lipsă!")
      .matches(numbersLettersRegex, "Trebuie să conțină numere și litere!"),
    nume: yup
      .string(lettersRegex, "Trebuie sa contina numai litere")
      .required("Nume lipsă!"),
    nationalitate: yup.string().optional(),
    email: yup.string().email("Trebuie să fie un email valid!").optional(),
    nrTelefon: yup
      .string()
      .nullable()
      .notRequired()
      .matches(phoneRegex, "Invalid")
      .transform((value) => (value === "" ? null : value)),
  })
  .required();

export default { validationSchemaClient, validationSchemaRezervare };
