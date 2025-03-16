import * as yup from "yup";
import {
  phoneRegex,
  numbersLettersRegex,
  lettersRegex,
} from "../../../utils/regex";

const validationSchemaClient = yup
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

export default validationSchemaClient;
