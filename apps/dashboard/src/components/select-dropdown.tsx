import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/ui/select';

export type SelectDropdownItem = {
  label: string;
  value: string;
  disabled?: boolean;
};

export function SelectDropdown({
  value,
  onValueChange,
  placeholder,
  items,
  disabled,
  className,
}: {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  items: SelectDropdownItem[];
  disabled?: boolean;
  className?: string;
}) {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem
            key={item.value}
            value={item.value}
            disabled={item.disabled}
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
