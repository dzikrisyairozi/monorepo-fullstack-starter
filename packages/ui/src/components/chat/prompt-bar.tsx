'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import { Paperclip } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '../ui/command';
import { Popover, PopoverAnchor, PopoverContent } from '../ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { cn } from '../../lib/utils';

export type PromptBarItem = {
  id: string;
  label: string;
};

type MenuMode = 'none' | 'source' | 'command';

export function PromptBar({
  value,
  onValueChange,
  onSend,
  sourceItems = [],
  commandItems = [],
  models = [],
  model,
  onModelChange,
  onAttach,
  maxHeight = 200,
  placeholder = 'Ask anything...',
  className,
}: {
  value: string;
  onValueChange: (value: string) => void;
  onSend: (value: string) => void;
  sourceItems?: PromptBarItem[];
  commandItems?: PromptBarItem[];
  models?: PromptBarItem[];
  model?: string;
  onModelChange?: (id: string) => void;
  onAttach?: () => void;
  maxHeight?: number;
  placeholder?: string;
  className?: string;
}) {
  const [menuMode, setMenuMode] = useState<MenuMode>('none');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const menuItems = menuMode === 'source' ? sourceItems : commandItems;

  function resizeTextarea(el: HTMLTextAreaElement) {
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
  }

  function handleChange(next: string) {
    onValueChange(next);
    const trigger = next.at(-1);
    const before = next.at(-2);
    const atWordStart = before === undefined || /\s/.test(before);

    if (trigger === '@' && atWordStart) {
      setMenuMode('source');
    } else if (trigger === '/' && atWordStart) {
      setMenuMode('command');
    } else if (menuMode !== 'none' && (trigger === ' ' || next === '')) {
      setMenuMode('none');
    }
  }

  function selectItem(item: PromptBarItem) {
    const prefix = menuMode === 'source' ? '@' : '/';
    onValueChange(`${value.slice(0, -1)}${prefix}${item.label} `);
    setMenuMode('none');
    textareaRef.current?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Escape' && menuMode !== 'none') {
      event.preventDefault();
      setMenuMode('none');
      return;
    }

    if (event.key === 'Enter' && menuMode !== 'none') {
      event.preventDefault();
      if (menuItems[0]) {
        selectItem(menuItems[0]);
      }
      return;
    }

    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      const trimmed = value.trim();
      if (trimmed) {
        onSend(trimmed);
      }
    }
  }

  return (
    <div className={cn('rounded-lg border bg-background p-2', className)}>
      <Popover
        open={menuMode !== 'none'}
        onOpenChange={(open) => {
          if (!open) setMenuMode('none');
        }}
      >
        <PopoverAnchor asChild>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(event) => {
              handleChange(event.target.value);
              resizeTextarea(event.target);
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            style={{ maxHeight }}
            className="block max-h-[200px] w-full resize-none overflow-y-auto bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </PopoverAnchor>
        <PopoverContent
          align="start"
          className="w-56 p-0"
          onOpenAutoFocus={(event) => event.preventDefault()}
        >
          <Command>
            <CommandList>
              <CommandEmpty>No results.</CommandEmpty>
              <CommandGroup>
                {menuItems.map((item) => (
                  <CommandItem key={item.id} onSelect={() => selectItem(item)}>
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="mt-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button type="button" variant="ghost" size="icon" onClick={onAttach}>
            <Paperclip />
            <span className="sr-only">Attach file</span>
          </Button>
          {models.length > 0 && (
            <Select value={model} onValueChange={onModelChange}>
              <SelectTrigger className="h-8 w-auto text-xs">
                <SelectValue placeholder="Model" />
              </SelectTrigger>
              <SelectContent>
                {models.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        <Button
          type="button"
          size="sm"
          onClick={() => {
            const trimmed = value.trim();
            if (trimmed) onSend(trimmed);
          }}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
