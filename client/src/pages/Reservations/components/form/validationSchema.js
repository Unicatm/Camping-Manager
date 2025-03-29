import * as yup from "yup";
import { numbersRegex } from "../../../../utils/regex";

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

export default { validationSchemaRezervare };
