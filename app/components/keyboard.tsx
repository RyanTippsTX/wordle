import { twMerge } from 'tailwind-merge';

export function Keyboard() {
  return (
    <div
      className="flex w-full flex-col 
        items-center justify-center
        space-y-1
        "
    >
      <KeyboardRow>
        <KeyboardKey keyLabel="Q" />
        <KeyboardKey keyLabel="W" />
        <KeyboardKey keyLabel="E" />
        <KeyboardKey keyLabel="R" />
        <KeyboardKey keyLabel="T" />
        <KeyboardKey keyLabel="Y" />
        <KeyboardKey keyLabel="U" />
        <KeyboardKey keyLabel="I" />
        <KeyboardKey keyLabel="O" />
        <KeyboardKey keyLabel="P" />
      </KeyboardRow>
      <KeyboardRow>
        <KeyboardKey keyLabel="A" />
        <KeyboardKey keyLabel="S" />
        <KeyboardKey keyLabel="D" />
        <KeyboardKey keyLabel="F" />
        <KeyboardKey keyLabel="G" />
        <KeyboardKey keyLabel="H" />
        <KeyboardKey keyLabel="J" />
        <KeyboardKey keyLabel="K" />
        <KeyboardKey keyLabel="L" />
      </KeyboardRow>
      <KeyboardRow>
        <KeyboardKey keyLabel="ENTER" special />
        <KeyboardKey keyLabel="Z" />
        <KeyboardKey keyLabel="X" />
        <KeyboardKey keyLabel="C" />
        <KeyboardKey keyLabel="V" />
        <KeyboardKey keyLabel="B" />
        <KeyboardKey keyLabel="N" />
        <KeyboardKey keyLabel="M" />
        <KeyboardKey keyLabel="DELETE" special />
      </KeyboardRow>
    </div>
  );
}

const KeyboardRow = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex gap-x-1">{children}</div>;
};

const KeyboardKey = ({ keyLabel, special }: { keyLabel: string; special?: boolean }) => {
  return (
    <div
      //
      className={twMerge(
        special ? 'w-12' : 'w-8',
        special ? 'text-sm tracking-tighter' : 'text-lg',
        'flex h-12 items-center justify-center bg-gray-400 text-white',
      )}
    >
      {keyLabel}
    </div>
  );
};
