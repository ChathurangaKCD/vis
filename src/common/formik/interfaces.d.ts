interface FormikInput {
  name: string;
  label: string;
  isRequired?: boolean;
  validate?: (value: any) => string | undefined;
}

interface RadioInputItem {
  label: string;
  value: string | number;
}
interface RadioInputProps extends FormikInput {
  items: RadioInputItem[];
  validate?: (value: string) => string | undefined;
}
interface CheckBoxInputProps extends FormikInput {
  items: RadioInputItem[];
  validate?: (value: (string | number)[]) => string | undefined;
}
