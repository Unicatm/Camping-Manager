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
    tipAuto: yup
      .object()
      .default({})
      .test(
        "not-empty",
        "Selectează cel puțin un tip auto!",
        (value) => value && Object.keys(value).length > 0
      ),
    idLoc: yup.string().required("Trebuie să selectezi un loc!"),
    hasElectricity: yup.bool().notRequired(),
  })
  .required();

export default { validationSchemaRezervare };
